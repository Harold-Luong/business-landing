import assert from 'node:assert/strict'
import { servicePages } from '../src/seo.mjs'
import { poll } from './browser-helper.mjs'

export async function testServices({ send, evaluate, screenshot }) {
  for (const page of servicePages) {
    // Follow the homepage link, rather than bypassing the discoverability path.
    await send('Page.navigate', { url: 'http://127.0.0.1:4187/' })
    await poll(() => evaluate(`document.readyState === 'complete' && document.querySelector('.service-detail-link')`))
    await evaluate(`(() => {
      const link = document.querySelector('a[href="${page.path}"]');
      const disclosure = link.closest('details');
      if (disclosure) disclosure.open = true;
      link.click();
    })()`)
    await poll(() => evaluate(`location.pathname === '${page.path}' && document.readyState === 'complete' && document.querySelector('.detail-intro')`))
    await evaluate('document.fonts.ready')
    assert.equal(await evaluate('document.title'), page.title)
    assert.equal(await evaluate(`document.querySelector('.detail-nav nav a[aria-current]')?.textContent`), 'Dịch vụ')
    assert.equal(await evaluate(`document.querySelectorAll('h1').length`), 1)
    assert.deepEqual(await evaluate(`[...document.querySelectorAll('a[href^="#"]')].map(a => a.hash.slice(1)).filter(id => id && !document.getElementById(id))`), [])
    for (const width of [1440, 1024, 768, 600, 390, 320]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 601 })
      assert.equal(await evaluate(`document.documentElement.scrollWidth <= ${width}`), true, `${page.path} overflows at ${width}px`)
    }
    await evaluate(`document.querySelector('.faq-list summary').click()`)
    assert.equal(await evaluate(`document.querySelector('.faq-list details').open`), true)
    if (page.plan === 'apps-script') {
      await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
      await screenshot('/tmp/corebrisk-service-desktop.png')
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
      await screenshot('/tmp/corebrisk-service-mobile.png', true)
    }
    await evaluate(`document.querySelector('.detail-cta a').click()`)
    await poll(() => evaluate(`document.querySelector('#plan')?.value === '${page.plan}' && !document.querySelector('#quote-form button[type="submit"]').disabled`))
    assert.equal(await evaluate('location.hash'), '#lien-he')
    // The full service content and navigation must work without JavaScript.
    await send('Emulation.setScriptExecutionDisabled', { value: true })
    await send('Page.navigate', { url: `http://127.0.0.1:4187${page.path}` })
    await poll(() => evaluate(`document.readyState === 'complete' && document.querySelector('.detail-scope')`))
    assert.equal(await evaluate(`document.querySelectorAll('.detail-scope li').length`), 4)
    await send('Emulation.setScriptExecutionDisabled', { value: false })
  }
  await send('Page.navigate', { url: 'http://127.0.0.1:4187/?plan=invalid#lien-he' })
  await poll(() => evaluate(`document.querySelector('#plan') && !document.querySelector('#quote-form button[type="submit"]').disabled`))
  assert.equal(await evaluate(`document.querySelector('#plan').value`), 'unsure')
  await evaluate(`document.querySelector('.car-preview-image').loading = 'eager'; document.querySelector('.car-preview-image').decode()`)
  assert.match(await evaluate(`document.querySelector('.car-preview-image').currentSrc`), /aster-preview-(480|960)\.webp$/)
  console.log('PASS: Service pages, homepage links, six widths, FAQ, no-JavaScript content, consultation preselection and responsive WebP image.')
}
