import { spawn } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export async function poll(fn) {
  let lastError
  for (let i = 0; i < 100; i++) {
    try { const result = await fn(); if (result) return result } catch (error) { lastError = error }
    await delay(100)
  }
  throw new Error(`Timed out waiting for browser/server. ${lastError?.message || ''}`)
}

export async function withBrowser(callback) {
  const profile = await mkdtemp(join(tmpdir(), 'corebrisk-chrome-'))
  const chrome = spawn(process.env.CHROME_BIN || '/usr/bin/google-chrome', [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
    '--no-first-run', '--no-default-browser-check', '--remote-debugging-address=127.0.0.1',
    '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
  ], { stdio: 'pipe' })
  let output = '', spawnError, ws
  chrome.stderr.on('data', (chunk) => { output += chunk })
  chrome.on('error', (error) => { spawnError = error })
  try {
    await poll(() => { if (spawnError) throw spawnError; return /DevTools listening on ws:\/\/127.0.0.1:(\d+)/.test(output) })
    const port = output.match(/DevTools listening on ws:\/\/127.0.0.1:(\d+)/)[1]
    const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
    ws = new WebSocket(pages.find((page) => page.type === 'page').webSocketDebuggerUrl)
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject })
    let seq = 0
    const pending = new Map(), errors = []
    ws.onmessage = ({ data }) => {
      const message = JSON.parse(data)
      if (message.id) {
        const handler = pending.get(message.id)
        if (!handler) return
        pending.delete(message.id)
        clearTimeout(handler.timer)
        if (message.error) handler.reject(new Error(JSON.stringify(message.error)))
        else handler.resolve(message.result)
      }
      if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text)
    }
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const id = ++seq
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timed out: ${method}`)) }, 15000)
      pending.set(id, { resolve, reject, timer })
      ws.send(JSON.stringify({ id, method, params }))
    })
    const evaluate = async (expression) => {
      const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text)
      return result.result.value
    }
    const screenshot = async (path, fullPage = false) => {
      let clip
      if (fullPage) {
        const { cssContentSize } = await send('Page.getLayoutMetrics')
        clip = { x: 0, y: 0, width: cssContentSize.width, height: cssContentSize.height, scale: 1 }
      }
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: fullPage, ...(clip ? { clip } : {}) })
      await writeFile(path, Buffer.from(shot.data, 'base64'))
    }
    await send('Runtime.enable')
    await send('Page.enable')
    await callback({ send, evaluate, screenshot, errors })
  } finally {
    ws?.close()
    chrome.kill('SIGTERM')
    await delay(250)
    await rm(profile, { recursive: true, force: true, maxRetries: 4, retryDelay: 100 }).catch(() => {})
  }
}
