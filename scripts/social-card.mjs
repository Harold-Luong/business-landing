import { createServer } from 'vite'
import { withBrowser, poll } from '../tests/browser-helper.mjs'
import { resolve } from 'node:path'

const server = await createServer({ server: { host: '127.0.0.1', port: 5187, strictPort: true } })
try {
    await server.listen()
    await withBrowser(async ({ send, evaluate, screenshot }) => {
        await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false })
        await send('Page.navigate', { url: 'http://127.0.0.1:5187/scripts/social-card.html' })
        await poll(() => evaluate(`document.readyState === 'complete'`))
        await evaluate('document.fonts.ready')
        await screenshot(resolve('public/social-card.png'))
    })
    console.log('Generated public/social-card.png (1200 × 630).')
} finally {
    await server.close()
}
