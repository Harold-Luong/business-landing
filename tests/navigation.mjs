import assert from 'node:assert/strict'
import { poll } from './browser-helper.mjs'

export async function testNavigation({ send, evaluate, screenshot }) {
  const current = () => evaluate(`document.querySelector('#navigation a[aria-current="location"]')?.hash || null`)
  await evaluate(`document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0)`)
  await poll(async () => (await current()) === null)
  for (const width of [1440, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 601 })
    for (const id of ['dich-vu', 'giao-dien', 'bang-gia', 'quy-trinh', 'lien-he']) {
      await evaluate(`document.getElementById('${id}').scrollIntoView({ behavior:'instant', block:'start' })`)
      await poll(async () => (await current()) === `#${id}`)
      assert.equal(await evaluate(`document.querySelectorAll('#navigation a[aria-current]').length`), 1)
    }
    // Scrolling into an unlisted section must not retain an unrelated nav marker.
    await evaluate(`document.getElementById('cau-hoi').scrollIntoView({ behavior:'instant', block:'start' })`)
    await poll(async () => (await current()) === null)
    await evaluate(`window.scrollTo({ top:document.documentElement.scrollHeight, behavior:'instant' })`)
    await poll(async () => (await current()) === '#lien-he')
    // Nested service/pricing anchors still highlight the corresponding main section.
    for (const [target, expected] of [['dich-vu-google', '#dich-vu'], ['bang-gia-website', '#bang-gia']]) {
      await evaluate(`document.getElementById('${target}').scrollIntoView({ behavior:'instant', block:'start' })`)
      await poll(async () => (await current()) === expected)
    }
    if (width < 601) await evaluate(`document.querySelector('.menu-toggle').click()`)
    await evaluate(`document.querySelector('#navigation a[href="#giao-dien"]').click()`)
    await poll(async () => (await current()) === '#giao-dien')
    if (width < 601) {
      assert.equal(await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')`), 'false')
      await evaluate(`document.querySelector('.menu-toggle').click()`)
      await screenshot('/tmp/corebrisk-nav-mobile.png')
      await evaluate(`document.querySelector('.menu-toggle').click()`)
    } else {
      await screenshot('/tmp/corebrisk-nav-desktop.png')
    }
  }
  await send('Page.navigate', { url:'http://127.0.0.1:4187/#bang-gia-google' })
  await poll(async () => (await current()) === '#bang-gia')
  await send('Page.navigate', { url:'http://127.0.0.1:4187/' })
  await poll(() => evaluate(`document.readyState === 'complete' && !document.querySelector('#quote-form button[type="submit"]').disabled`))
  await evaluate('document.fonts.ready')
  await send('Emulation.setDeviceMetricsOverride', { width:1440, height:1050, deviceScaleFactor:1, mobile:false })
  await evaluate(`document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0,0)`)
  await poll(async () => (await current()) === null)
  console.log('PASS: Active navigation on scroll, clicks, nested anchors, deep links, page bottom and mobile menu.')
}
