import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { bundledDemoUrls } from '../shared/demos.ts'

const output = process.env.WEBSHEET_OUTPUT_DIR
if (!output) throw new Error('WEBSHEET_OUTPUT_DIR is required to bundle demos.')
for (const [id, path] of Object.entries(bundledDemoUrls)) {
  const { siteFiles } = await import(`../../demos/${id}/scripts/site.mjs`)
  const files = await siteFiles(undefined, '/')
  for (const [name, content] of files) {
    const target = resolve(output, path.slice(1), name)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, content)
  }
  console.log(`Bundled ${id}: ${files.size} files at ${path}`)
}
