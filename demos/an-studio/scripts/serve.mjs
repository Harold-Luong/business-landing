import { createServer } from 'node:http'
import { siteFiles, siteDirectory, serveFiles } from './site.mjs'

const preview = process.argv.includes('--preview')
const directory = preview ? new URL('../dist/', import.meta.url) : siteDirectory
const port = preview ? 4175 : 5175
const server = createServer(async (req, res) => {
  try {
    const files = await siteFiles(directory, process.env.COREBRISK_URL)
    if (!process.env.COREBRISK_URL) {
      const port = preview ? 4174 : 5174
      files.set('index.html', Buffer.from(files.get('index.html').toString().replaceAll('href="/#giao-dien"', `href="http://localhost:${port}/#giao-dien"`).replaceAll('href="/?concept=an-studio#lien-he"', `href="http://localhost:${port}/?concept=an-studio#lien-he"`)))
    }
    serveFiles(files)(req, res)
  } catch (error) { console.error(error); res.writeHead(500); res.end('Cannot load demo. Build first when using preview.') }
})
server.listen(port, '127.0.0.1', () => console.log(`An Studio: http://localhost:${port}`))
