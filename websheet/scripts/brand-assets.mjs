import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { withBrowser } from '../tests/browser-helper.mjs'

// Approved WS master: keep its lettering, document fold, grid and colors intact.
const master = await readFile(new URL('../brand/websheet-logo-sage.png', import.meta.url))
const masterUrl = `data:image/png;base64,${master.toString('base64')}`
// Crop the existing SVG image viewport to the sage square. A rounded clip keeps
// the exterior corners transparent without touching the opaque WS artwork.
const trimmedSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1060" height="1060" viewBox="0 0 1060 1060"><defs><clipPath id="sage-square"><rect width="1060" height="1060" rx="235"/></clipPath></defs><image x="-97" y="-99" width="1254" height="1254" href="${masterUrl}" clip-path="url(#sage-square)"/></svg>\n`
await writeFile(new URL('../brand/websheet-logo-sage-trimmed.svg', import.meta.url), trimmedSvg)
const imageUrl = `data:image/svg+xml;base64,${Buffer.from(trimmedSvg).toString('base64')}`
await mkdir(new URL('../public/brand/', import.meta.url), { recursive: true })
const fonts = await Promise.all(['latin', 'vietnamese'].map(async subset => ({ name: `WebSheet-${subset}`, source: `data:font/woff2;base64,${(await readFile(new URL(`../public/fonts/be-vietnam-pro-400-${subset}.woff2`, import.meta.url))).toString('base64')}` })))
await withBrowser(async ({ evaluate }) => {
  const icoImages = []
  for (const [file, size] of [['favicon.png', 192], ['apple-touch-icon.png', 180], ['logo.png', 512], ['brand/websheet-mark.png', 96]]) {
    const data = await evaluate(`(async () => {
      const image = new Image(); image.src = ${JSON.stringify(imageUrl)}; await image.decode();
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = ${size};
      const ctx = canvas.getContext('2d'); ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(image, 0, 0, ${size}, ${size});
      return canvas.toDataURL('image/png').split(',')[1];
    })()`)
    await writeFile(new URL(`../public/${file}`, import.meta.url), Buffer.from(data, 'base64'))
    if (file === 'favicon.png') {
      // Embed the resized raster, keeping this compatibility SVG small. Not traced vector art.
      await writeFile(new URL('../public/favicon.svg', import.meta.url), `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192"><image width="192" height="192" href="data:image/png;base64,${data}"/></svg>\n`)
    }
  }
  for (const size of [16, 32, 48]) {
    const data = await evaluate(`(async () => {
      const image = new Image(); image.src = ${JSON.stringify(imageUrl)}; await image.decode();
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = ${size};
      const ctx = canvas.getContext('2d'); ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(image, 0, 0, ${size}, ${size});
      return canvas.toDataURL('image/png').split(',')[1];
    })()`)
    icoImages.push({ size, png: Buffer.from(data, 'base64') })
  }
  const icoHeader = Buffer.alloc(6 + 16 * icoImages.length)
  icoHeader.writeUInt16LE(1, 2)
  icoHeader.writeUInt16LE(icoImages.length, 4)
  let offset = icoHeader.length
  for (const [index, { size, png }] of icoImages.entries()) {
    const entry = 6 + index * 16
    icoHeader[entry] = icoHeader[entry + 1] = size
    icoHeader.writeUInt16LE(1, entry + 4)
    icoHeader.writeUInt16LE(32, entry + 6)
    icoHeader.writeUInt32LE(png.length, entry + 8)
    icoHeader.writeUInt32LE(offset, entry + 12)
    offset += png.length
  }
  await writeFile(new URL('../public/favicon.ico', import.meta.url), Buffer.concat([icoHeader, ...icoImages.map(({ png }) => png)]))
  const data = await evaluate(`(async () => {
    for (const font of ${JSON.stringify(fonts)}) { const face = new FontFace(font.name, 'url(' + font.source + ')'); await face.load(); document.fonts.add(face); }
    const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 630;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fdfefb'; ctx.fillRect(0,0,1200,630);
    ctx.fillStyle = '#edf5e6'; ctx.beginPath(); ctx.arc(1150,550,330,0,Math.PI*2); ctx.fill();
    const image = new Image(); image.src = ${JSON.stringify(imageUrl)}; await image.decode(); ctx.drawImage(image,64,52,80,80);
    ctx.fillStyle = '#293e33'; ctx.font = '38px WebSheet-latin, WebSheet-vietnamese'; ctx.fillText('WebSheet',148,109);
    ctx.font = '58px WebSheet-latin, WebSheet-vietnamese'; ctx.fillText('Thiết kế website.',70,258);
    ctx.fillStyle = '#527449'; ctx.fillText('Google Sheets theo yêu cầu.',70,341);
    ctx.fillStyle = '#657469'; ctx.font = '23px WebSheet-latin, WebSheet-vietnamese'; ctx.fillText('WEBSITE  ·  APPS SCRIPT  ·  APPSHEET',70,430);
    ctx.font = '22px WebSheet-latin, WebSheet-vietnamese'; ctx.fillText('websheet.shop',70,550);
    return canvas.toDataURL('image/png').split(',')[1];
  })()`)
  await writeFile(new URL('../public/social-card.png', import.meta.url), Buffer.from(data, 'base64'))
  for (const [variant, background, foreground] of [['light', '#fdfefb', '#293e33'], ['dark', '#293e33', '#fdfefb']]) {
    const data = await evaluate(`(async () => {
      const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 360;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = ${JSON.stringify(background)}; ctx.fillRect(0, 0, 1200, 360);
      const image = new Image(); image.src = ${JSON.stringify(imageUrl)}; await image.decode();
      ctx.imageSmoothingQuality = 'high'; ctx.drawImage(image, 56, 56, 248, 248);
      ctx.fillStyle = ${JSON.stringify(foreground)}; ctx.font = '100px WebSheet-latin'; ctx.fillText('WebSheet', 346, 193);
      ctx.font = '23px WebSheet-latin'; ctx.fillText('WEBSITE & GOOGLE SHEETS', 352, 244);
      return canvas.toDataURL('image/png').split(',')[1];
    })()`)
    await writeFile(new URL(`../public/brand/websheet-horizontal-${variant}.png`, import.meta.url), Buffer.from(data, 'base64'))
  }
})
console.log('Generated sage WS logo, horizontal variants, favicon (SVG/PNG/ICO), Apple icon and social card.')
