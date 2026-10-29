import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { build } from 'vite'
import { normalizeSiteUrl, pageForPath, servicePages } from '../src/seo.mjs'
import { asterDemo } from '../scripts/aster-plugin.mjs'
import { contactUrl as asterContactUrl } from '../demos/aster/scripts/site.mjs'
import { orbitDemo } from '../scripts/orbit-plugin.mjs'
import { anStudioDemo } from '../scripts/an-studio-plugin.mjs'
import { contactUrl, siteFiles } from '../demos/an-studio/scripts/site.mjs'

test('demo links validate external URLs and preserve the selected concept', async () => {
  assert.equal(contactUrl(), '/?concept=an-studio#lien-he')
  assert.equal(contactUrl('https://corebrisk.test/?source=demo'), 'https://corebrisk.test/?source=demo&concept=an-studio#lien-he')
  for (const input of ['javascript:alert(1)', 'http://example.test', 'https://user:secret@example.test']) {
    assert.throws(() => contactUrl(input))
    assert.throws(() => anStudioDemo(input))
    assert.throws(() => asterDemo(input))
    assert.throws(() => asterContactUrl(input))
  }
  assert.match(orbitDemo('https://demo.example.test/orbit/').transformIndexHtml('<a href="<!-- ORBIT_DEMO_URL -->">Demo</a>'), /href="https:\/\/demo.example.test\/orbit\/"/)
  assert.equal(asterContactUrl(), '/?concept=aster#lien-he')
  const plugin = anStudioDemo('https://demo.example.test/?a=1&b=2')
  assert.match(plugin.transformIndexHtml('<a href="<!-- AN_STUDIO_DEMO_URL -->">Demo</a>'), /href="https:\/\/demo.example.test\/\?a=1&amp;b=2"/)
  const files = await siteFiles(undefined, 'https://corebrisk.test/')
  assert.match(files.get('index.html').toString(), /href="https:\/\/corebrisk.test\/\?concept=an-studio#lien-he"/)
})

test('canonical configuration rejects unsafe or unsupported deployment URLs', () => {
  assert.equal(normalizeSiteUrl(''), '')
  assert.equal(normalizeSiteUrl(' https://corebrisk.test '), 'https://corebrisk.test/')
  for (const input of ['http://corebrisk.test', 'javascript:alert(1)', 'https://user:secret@corebrisk.test', 'https://corebrisk.test/subpath', 'https://corebrisk.test/?tracking=1', 'https://corebrisk.test/#home']) {
    assert.throws(() => normalizeSiteUrl(input), undefined, input)
  }
})

test('service URLs resolve to the same metadata for directory and index paths', () => {
  for (const page of servicePages) {
    assert.equal(pageForPath(page.path), page)
    assert.equal(pageForPath(`${page.path}index.html`), page)
    assert.equal(pageForPath(`${page.path.slice(0, -1)}?source=nav`), page)
  }
  assert.equal(pageForPath('/'), undefined)
  assert.equal(pageForPath('/index.html'), undefined)
  assert.equal(pageForPath('/dich-vu/unknown/'), undefined)
})

test('real production builds contain crawlable content and consistent SEO assets', async () => {
  const output = await mkdtemp(join(tmpdir(), 'corebrisk-seo-'))
  const previous = process.env.SITE_URL
  try {
    for (const siteUrl of ['', 'https://corebrisk.test/']) {
      process.env.SITE_URL = siteUrl
      await build({ logLevel: 'silent', build: { outDir: output, emptyOutDir: true } })
      const html = await readFile(join(output, 'index.html'), 'utf8')
      assert.equal((html.match(/<h1[ >]/g) || []).length, 1)
      assert.match(html, /<html lang="vi">/)
      assert.match(html, /Thiết kế website/)
      assert.match(html, /14,9/)
      assert.match(html, /<meta name="description"/)
      assert(!html.includes('<!-- SEO_HEAD -->'))
      assert(!html.includes('fonts.googleapis.com'))
      assert.match(html, /Google Sheets, AppSheet &amp; thiết kế website/)
      assert.equal((html.match(/property="og:site_name"/g) || []).length, 1)
      assert.match(html, /rel="icon" type="image\/png" sizes="192x192" href="\/favicon.png"/)
      for (const [file, size] of [['favicon.png', 192], ['apple-touch-icon.png', 180], ['logo.png', 512]]) {
        const png = await readFile(join(output, file))
        assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
        assert.equal(png.readUInt32BE(16), size)
        assert.equal(png.readUInt32BE(20), size)
      }
      const homeSchemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]))
      const websites = homeSchemas.filter((schema) => schema['@type'] === 'WebSite')
      assert.equal(websites.length, siteUrl ? 1 : 0)
      if (siteUrl) {
        assert.equal(websites[0].name, 'CoreBrisk')
        assert.equal(websites[0].url, siteUrl, 'Site name must use the configured canonical host')
        const business = homeSchemas.find((schema) => schema['@type'] === 'ProfessionalService')
        assert.equal(websites[0].publisher['@id'], business['@id'])
        assert.equal(business.logo.url, `${siteUrl}logo.png`)
      }
      assert(!html.includes('/aster-preview.png'))
      for (const width of [480, 960]) {
        const image = await readFile(join(output, `aster-preview-${width}.webp`))
        assert.equal(image.subarray(8, 12).toString(), 'WEBP')
        assert(image.length < 100_000, 'Preview image should stay below 100 KB')
      }
      const titles = new Set([html.match(/<title>(.*?)<\/title>/s)[1]])
      const descriptions = new Set([html.match(/name="description" content="([^"]+)"/)[1]])
      for (const page of servicePages) {
        assert(html.includes(`href="${page.path}"`), `Service must be discoverable: ${page.path}`)
        const detail = await readFile(join(output, page.path.slice(1), 'index.html'), 'utf8')
        assert.equal((detail.match(/<h1[ >]/g) || []).length, 1)
        assert(!detail.includes('<!-- SEO_HEAD -->'))
        assert.equal((detail.match(/property="og:site_name"/g) || []).length, 1)
        assert.match(detail, /rel="icon" type="image\/png" sizes="192x192" href="\/favicon.png"/)
        titles.add(detail.match(/<title>(.*?)<\/title>/s)[1])
        descriptions.add(detail.match(/name="description" content="([^"]+)"/)[1])
        assert(detail.includes(`href="/?plan=${page.plan}#lien-he"`))
        for (const [, asset] of detail.matchAll(/(?:href|src)="(\/assets\/[^"?#]+)"/g)) {
          assert((await readFile(join(output, asset.slice(1)))).length > 0, `Missing service asset: ${asset}`)
        }
        const structured = [...detail.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]))
        assert.equal(structured[0]['@type'], 'Service')
        assert.equal(structured[0].name, page.name)
        if (siteUrl) {
          const url = new URL(page.path, siteUrl).href
          assert(detail.includes(`rel="canonical" href="${url}"`))
          assert(detail.includes(`property="og:url" content="${url}"`))
          assert.match(detail, /name="robots" content="index, follow/)
          assert.equal(structured[0].url, url)
          assert.equal(structured[1]['@type'], 'BreadcrumbList')
          assert.equal(structured[1].itemListElement[1].item, url)
        } else {
          assert.match(detail, /name="robots" content="noindex, follow"/)
          assert(!detail.includes('rel="canonical"'))
          assert.equal(structured[0].url, undefined)
        }
      }
      assert.equal(titles.size, servicePages.length + 1, 'Every page needs a distinct title')
      assert.equal(descriptions.size, servicePages.length + 1, 'Every page needs a distinct description')
      const websiteSamples = await readFile(join(output, 'dich-vu/thiet-ke-website/index.html'), 'utf8')
      const sheetsSamples = await readFile(join(output, 'dich-vu/google-apps-script/index.html'), 'utf8')
      for (const path of ['thiet-ke-website', 'google-apps-script']) {
        assert(html.includes(`href="/dich-vu/${path}/#mau-giao-dien"`))
      }
      assert.equal((html.match(/class="work-card"/g) || []).length, 2)
      assert(!html.includes('sheet-demo-card'))
      assert(websiteSamples.includes('id="mau-giao-dien"'))
      assert(sheetsSamples.includes('id="mau-giao-dien"'))
      assert(sheetsSamples.includes('sheet-demo-card'))
      assert(!sheetsSamples.includes('<!-- SHEETS_DEMO_LINK -->'))
      assert(sheetsSamples.includes('/?concept=sheetflow&amp;plan=apps-script#quote-form'))
      assert.match(websiteSamples, /href="\/demos\/an-studio\/"\s+target="_blank"\s+rel="noopener"/)
      assert(!websiteSamples.includes('<!-- AN_STUDIO_DEMO_URL -->'))
      const demo = await readFile(join(output, 'demos/an-studio/index.html'), 'utf8')
      assert.match(demo, /name="robots" content="noindex, follow"/)
      assert.match(demo, /href="\/\?concept=an-studio#lien-he"/)
      assert(!demo.includes('<!-- CONTACT_URL -->'))
      for (const [, path] of demo.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) {
        assert((await readFile(join(output, 'demos/an-studio', path))).length > 0, `Missing demo asset: ${path}`)
      }
      assert.match(websiteSamples, /href="\/demos\/orbit\/"\s+target="_blank"\s+rel="noopener"/)
      assert(!websiteSamples.includes('<!-- ORBIT_DEMO_URL -->'))
      const orbit = await readFile(join(output, 'demos/orbit/index.html'), 'utf8')
      assert.match(orbit, /name="robots" content="noindex, nofollow"/)
      assert.match(orbit, /href="\/\?concept=orbit#lien-he"/)
      assert(!orbit.includes('<!-- CONTACT_URL -->'))
      for (const [, path] of orbit.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) {
        assert((await readFile(join(output, 'demos/orbit', path))).length > 0, `Missing Orbit asset: ${path}`)
      }
      const app = await readFile(join(output, 'demos/orbit/app.html'), 'utf8')
      assert.match(app, /name="robots" content="noindex, nofollow"/)
      assert(!app.includes('<!-- CONTACT_URL -->'))
      assert(!app.includes('<!-- BACK_URL -->'))
      assert.equal(app, orbit, 'Legacy app URL should serve the same application as the demo root')
      for (const [, path] of app.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) {
        assert((await readFile(join(output, 'demos/orbit', path))).length > 0, `Missing app asset: ${path}`)
      }
      assert.match(websiteSamples, /href="\/demos\/aster\/"\s+target="_blank"\s+rel="noopener"/)
      assert(!websiteSamples.includes('<!-- ASTER_DEMO_URL -->'))
      const aster = await readFile(join(output, 'demos/aster/index.html'), 'utf8')
      assert.match(aster, /name="robots" content="noindex, nofollow"/)
      assert.match(aster, /href="\/\?concept=aster#lien-he"/)
      assert(!aster.includes('<!-- CONTACT_URL -->'))
      assert(!aster.includes('<!-- BACK_URL -->'))
      for (const [, path] of aster.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) {
        assert((await readFile(join(output, 'demos/aster', path))).length > 0, `Missing Aster asset: ${path}`)
      }
      const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
      const robots = await readFile(join(output, 'robots.txt'), 'utf8')
      if (siteUrl) {
        assert.match(html, /name="robots" content="index, follow/)
        assert.match(html, /rel="canonical" href="https:\/\/corebrisk.test\/"/)
        assert.match(html, /property="og:image" content="https:\/\/corebrisk.test\/social-card.png"/)
        assert.equal(schema.url, siteUrl)
        assert.match(robots, /Sitemap: https:\/\/corebrisk.test\/sitemap.xml/)
        assert.match(await readFile(join(output, 'sitemap.xml'), 'utf8'), /<loc>https:\/\/corebrisk.test\/<\/loc>/)
        const sitemap = await readFile(join(output, 'sitemap.xml'), 'utf8')
        assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]), [siteUrl, ...servicePages.map((page) => new URL(page.path, siteUrl).href)])
      } else {
        assert.match(html, /name="robots" content="noindex, follow"/)
        assert(!html.includes('rel="canonical"'))
        assert.equal(schema.url, undefined)
        assert(!robots.includes('Sitemap:'))
        assert(!(await readdir(output)).includes('sitemap.xml'))
      }
    }
  } finally {
    if (previous === undefined) delete process.env.SITE_URL
    else process.env.SITE_URL = previous
    await rm(output, { recursive: true, force: true })
  }
})
