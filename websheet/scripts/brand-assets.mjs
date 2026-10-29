import { readFile, writeFile } from 'node:fs/promises'
import { withBrowser } from '../tests/browser-helper.mjs'

// Code-native W mark; provisional WebSheet identity, no external image dependency.
const svg = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8')
const imageUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
const fonts = await Promise.all(['latin', 'vietnamese'].map(async subset => ({ name: `WebSheet-${subset}`, source: `data:font/woff2;base64,${(await readFile(new URL(`../public/fonts/be-vietnam-pro-400-${subset}.woff2`, import.meta.url))).toString('base64')}` })))
await withBrowser(async ({ evaluate }) => {
  for (const [file, size] of [['favicon.png', 192], ['apple-touch-icon.png', 180], ['logo.png', 512]]) {
    const data = await evaluate(`(async () => {
      const image = new Image(); image.src = ${JSON.stringify(imageUrl)}; await image.decode();
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = ${size};
      canvas.getContext('2d').drawImage(image, 0, 0, ${size}, ${size});
      return canvas.toDataURL('image/png').split(',')[1];
    })()`)
    await writeFile(new URL(`../public/${file}`, import.meta.url), Buffer.from(data, 'base64'))
  }
  const data = await evaluate(`(async () => {
    for (const font of ${JSON.stringify(fonts)}) { const face = new FontFace(font.name, 'url(' + font.source + ')'); await face.load(); document.fonts.add(face); }
    const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 630;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fdfefb'; ctx.fillRect(0,0,1200,630);
    ctx.fillStyle = '#edf5e6'; ctx.beginPath(); ctx.arc(1150,550,330,0,Math.PI*2); ctx.fill();
    const image = new Image(); image.src = ${JSON.stringify(imageUrl)}; await image.decode(); ctx.drawImage(image,70,65,58,58);
    ctx.fillStyle = '#293e33'; ctx.font = '38px WebSheet-latin, WebSheet-vietnamese'; ctx.fillText('WebSheet',148,109);
    ctx.font = '58px WebSheet-latin, WebSheet-vietnamese'; ctx.fillText('Thiết kế website.',70,258);
    ctx.fillStyle = '#527449'; ctx.fillText('Google Sheets theo yêu cầu.',70,341);
    ctx.fillStyle = '#657469'; ctx.font = '23px WebSheet-latin, WebSheet-vietnamese'; ctx.fillText('WEBSITE  ·  APPS SCRIPT  ·  APPSHEET',70,430);
    ctx.font = '22px WebSheet-latin, WebSheet-vietnamese'; ctx.fillText('websheet.shop',70,550);
    return canvas.toDataURL('image/png').split(',')[1];
  })()`)
  await writeFile(new URL('../public/social-card.png', import.meta.url), Buffer.from(data, 'base64'))
})
console.log('Generated WebSheet favicon, Apple icon, logo and social card.')
