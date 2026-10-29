import assert from 'node:assert/strict'
import { readFile, readdir, access } from 'node:fs/promises'
import { routes, homeMeta, serviceMeta } from '../shared/site.ts'
import { publicConfig, validateUrl, robots, sitemap } from '../shared/config.ts'
const config = publicConfig(process.env)
const root = process.env.WEBSHEET_OUTPUT_DIR || '.output/production/public'
const read = path => readFile(`${root}/${path}`, 'utf8')
for (const path of routes) {
  const html = await read(path.slice(1) + 'index.html')
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, path + ' H1')
  assert.equal((html.match(/<title>/g) || []).length, 1)
  assert.ok(html.includes('WebSheet'))
  assert.ok(!html.includes('CoreBrisk'))
  assert.ok(!html.includes('/demos/'))
  assert.ok(!html.includes('NuxtWelcome'))
  const meta = serviceMeta.find(page => page.path === path) || homeMeta
  const title = html.match(/<title>(.*?)<\/title>/)[1].replaceAll('&amp;', '&')
  assert.equal(title, meta.title)
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]))
  assert.equal(schemas[0]['@type'], path === '/' ? 'ProfessionalService' : 'Service')
  if (config.siteUrl) {
    const canonical = new URL(path, config.siteUrl).href
    const canonicalTags = html.match(/<link\b[^>]*rel="canonical"[^>]*>/g) || []
    assert.equal(canonicalTags.length, 1, path + ' exactly one canonical')
    assert.ok(canonicalTags[0].includes(`href="${canonical}"`), path + ' canonical')
    assert.ok(html.includes(`property="og:url" content="${canonical}"`), path + ' Open Graph URL')
    assert.ok(!/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html), path + ' must be indexable')
    assert.ok(html.includes('index, follow, max-image-preview:large'))
    assert.equal(schemas.length, 2)
    assert.equal(schemas[1]['@type'], path === '/' ? 'WebSite' : 'BreadcrumbList')
    assert.ok(html.includes(`${config.siteUrl}social-card.png`))
    if (path === '/') {
      assert.equal(schemas[1].name, 'WebSheet')
      assert.equal(schemas[1].url, config.siteUrl)
      assert.equal(schemas[0].logo.url, `${config.siteUrl}logo.png`)
    } else {
      assert.equal(schemas[0].url, canonical)
      assert.equal(schemas[1].itemListElement[1].item, canonical)
    }
  } else {
    assert.ok(html.includes('noindex, follow'))
    assert.ok(!html.includes('rel="canonical"'))
    assert.equal(schemas.length, 1)
  }
}
assert.equal(await read('robots.txt'), robots(config.siteUrl))
if (config.siteUrl) assert.equal(await read('sitemap.xml'), sitemap(config.siteUrl, routes))
else await assert.rejects(access(`${root}/sitemap.xml`))
if (process.env.WEBSHEET_DEPLOY_ENV === 'dev') {
  assert.equal(config.siteUrl, '', 'dev must not have a canonical origin')
  assert.ok((await read('_headers')).includes('X-Robots-Tag: noindex, follow'))
} else if (process.env.WEBSHEET_DEPLOY_ENV === 'production') {
  assert.equal(config.siteUrl, 'https://websheet.shop/')
  await assert.rejects(access(`${root}/_headers`), 'production must not inherit the dev noindex header')
}
await access(`${root}/404.html`) // Hosting serves this fallback with HTTP 404; checked by test:browser.
await assert.rejects(access(`${root}/demos`))
await assert.rejects(access(`${root}/aster-preview-480.webp`))
await assert.rejects(access(`${root}/aster-preview-960.webp`))
for (const [file,width,height] of [['favicon.png',192,192], ['apple-touch-icon.png',180,180], ['logo.png',512,512], ['social-card.png',1200,630]]) {
  const png = await readFile(`${root}/${file}`)
  assert.equal(png.readUInt32BE(16),width);assert.equal(png.readUInt32BE(20),height)
}
assert.equal((await readdir(`${root}/fonts`)).filter(file => file.endsWith('.woff2')).length, 12)
const home = await read('index.html')
assert.equal((home.match(/class="plan-details"/g) || []).length, 5)
assert.ok(!home.includes('comparison-label'))
assert.ok(home.includes('An Studio · Mẫu website kiến trúc &amp; nội thất'))
assert.ok(!home.includes('Aster S5 · Mẫu landing page ô tô'))
assert.ok(/type="submit"[^>]*disabled/.test(home))
const gallery = await read('dich-vu/thiet-ke-website/index.html')
if (config.asterDemoUrl) assert.ok(gallery.includes(config.asterDemoUrl))
else assert.ok(gallery.includes('Demo đang chuẩn bị'))
assert.equal(validateUrl('', 'demo'), '')
assert.throws(() => validateUrl('http://example.test', 'demo'))
assert.throws(() => validateUrl('https://user:pass@example.test', 'demo'))
assert.throws(() => validateUrl('https://example.test/path', 'site', true))
assert.equal(validateUrl(' https://websheet.shop ', 'site', true), 'https://websheet.shop/')
console.log(`PASS: six prerendered pages, metadata/schema, ${config.siteUrl ? 'production' : 'preview'} SEO, assets, demo isolation and URL validation.`)
