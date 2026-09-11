import { readdir, readFile } from 'node:fs/promises'

export const siteDirectory = new URL('../site/', import.meta.url)
export const contentTypes = {
  html: 'text/html; charset=utf-8', css: 'text/css; charset=utf-8',
  js: 'text/javascript; charset=utf-8', svg: 'image/svg+xml',
  jpg: 'image/jpeg', woff2: 'font/woff2', txt: 'text/plain; charset=utf-8',
}

export function contactUrl(value = '/?concept=an-studio#lien-he') {
  const url = new URL(value, 'https://local.invalid')
  if (url.protocol !== 'https:' || url.username || url.password || (url.origin === 'https://local.invalid' && !value.startsWith('/'))) {
    throw new Error('COREBRISK_URL phải là URL HTTPS hoặc đường dẫn bắt đầu bằng /.')
  }
  url.searchParams.set('concept', 'an-studio')
  url.hash = 'lien-he'
  return url.origin === 'https://local.invalid' ? url.pathname + url.search + url.hash : url.href
}

export function backUrl(value) {
  const url = new URL(contactUrl(value), 'https://local.invalid')
  url.searchParams.delete('concept')
  url.hash = 'giao-dien'
  return url.origin === 'https://local.invalid' ? url.pathname + url.search + url.hash : url.href
}

export async function siteFiles(directory = siteDirectory, corebriskUrl) {
  const files = new Map()
  async function walk(dir, prefix = '') {
    for (const item of await readdir(dir, { withFileTypes: true })) {
      const path = prefix + item.name
      if (item.isDirectory()) await walk(new URL(item.name + '/', dir), path + '/')
      else {
        let source = await readFile(new URL(item.name, dir))
        if (path === 'index.html') {
          const href = contactUrl(corebriskUrl).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
          const backHref = backUrl(corebriskUrl).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
          source = Buffer.from(source.toString().replaceAll('<!-- CONTACT_URL -->', href).replaceAll('<!-- BACK_URL -->', backHref))
        }
        files.set(path, source)
      }
    }
  }
  await walk(directory)
  return files
}

export function serveFiles(files, prefix = '/') {
  return (req, res, next = () => { res.writeHead(404); res.end('Not found') }) => {
    let pathname
    try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname) }
    catch { res.writeHead(400); res.end('Bad request'); return }
    if (prefix !== '/' && pathname === prefix.slice(0, -1)) {
      res.writeHead(308, { Location: prefix }); res.end(); return
    }
    if (!pathname.startsWith(prefix)) return next()
    const key = pathname.slice(prefix.length) || 'index.html'
    const source = files.get(key)
    if (!source) return next()
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return }
    res.writeHead(200, { 'Content-Type': contentTypes[key.split('.').pop()] || 'application/octet-stream', 'Cache-Control': 'no-cache' })
    res.end(req.method === 'HEAD' ? undefined : source)
  }
}
