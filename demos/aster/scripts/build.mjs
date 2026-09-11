import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { siteFiles } from './site.mjs'

const files = await siteFiles(undefined, process.env.COREBRISK_URL)
const output = new URL('../dist/', import.meta.url)
await rm(output, { recursive: true, force: true })
for (const [path, source] of files) {
  const target = new URL(path, output)
  await mkdir(dirname(fileURLToPath(target)), { recursive: true })
  await writeFile(target, source)
}
console.log(`Built Aster S5: ${files.size} files in demos/aster/dist/`)
