import { mkdir, writeFile } from 'node:fs/promises'
import { withBrowser, poll } from '../tests/browser-helper.mjs'
import { startServer } from '../tests/static-server.mjs'
import { bundledDemoUrls } from '../shared/demos.ts'

// Capture the built demo pages themselves. Run build:production first.
const output = new URL('../public/previews/', import.meta.url)
await mkdir(output, { recursive: true })
const server = await startServer('.output/production/public')
try {
  await withBrowser(async ({ send, evaluate, errors }) => {
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    for (const [id, path] of Object.entries(bundledDemoUrls)) {
      for (const [variant, width, height] of [['desktop', 1440, 1000], ...(id === 'an-studio' ? [['mobile', 390, 960]] : [])]) {
        await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
        await send('Page.navigate', { url: server.url + path })
        await poll(() => evaluate(`document.readyState === 'complete' && location.pathname === ${JSON.stringify(path)}`))
        await evaluate(`(async () => {
          await document.fonts.ready;
          await Promise.all([...document.images].map(image => { image.loading = 'eager'; return image.decode(); }));
          window.scrollTo(0, 0);
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        })()`)
        const { data } = await send('Page.captureScreenshot', { format: 'webp', quality: 85, captureBeyondViewport: false })
        await writeFile(new URL(`${id}-${variant}.webp`, output), Buffer.from(data, 'base64'))
        console.log(`Captured ${path} → ${id}-${variant}.webp (${width} × ${height})`)
      }
    }
    if (errors.length) throw new Error(errors.join('\n'))
  })
} finally {
  await server.close()
}
