import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml' }
export async function startServer(directory = '.output/public', port = 0) {
  const root = resolve(directory)
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost')
      let file = resolve(root, '.' + decodeURIComponent(url.pathname))
      if (file !== root && !file.startsWith(root + sep)) throw new Error('Invalid path')
      const info = await stat(file)
      if (info.isDirectory()) {
        if (!url.pathname.endsWith('/')) { res.writeHead(308, { Location: url.pathname + '/' + url.search }); res.end(); return }
        file = resolve(file, 'index.html')
      }
      res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' })
      res.end(await readFile(file))
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(await readFile(resolve(root, '404.html')))
    }
  })
  await new Promise((done, fail) => { server.on('error', fail); server.listen(port, '127.0.0.1', done) })
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise(resolve => server.close(resolve)) }
}
