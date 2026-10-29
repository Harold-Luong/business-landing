import { readFile, writeFile } from 'node:fs/promises'
import { withBrowser } from '../tests/browser-helper.mjs'

// Rasterize the existing vector mark; no image service or build-time dependency.
const svg = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8')
const source = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
await withBrowser(async ({ evaluate }) => {
    for (const [name, size] of [['favicon.png', 192], ['apple-touch-icon.png', 180], ['logo.png', 512]]) {
        const data = await evaluate(`(async () => {
            const image = new Image();
            image.src = ${JSON.stringify(source)};
            await image.decode();
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = ${size};
            canvas.getContext('2d').drawImage(image, 0, 0, ${size}, ${size});
            return canvas.toDataURL('image/png').split(',')[1];
        })()`)
        await writeFile(new URL(`../public/${name}`, import.meta.url), Buffer.from(data, 'base64'))
        console.log(`Generated public/${name} (${size} × ${size}).`)
    }
})
