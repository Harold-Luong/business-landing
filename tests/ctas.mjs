import assert from 'node:assert/strict'
import { poll } from './browser-helper.mjs'

export async function testCtas({ send, evaluate, screenshot }) {
  const primary = '.hero-actions .button'
  const secondary = '.hero-actions .text-link'
  const label = (selector) => evaluate(`document.querySelector('${selector}').childNodes[0].textContent.trim()`)
  assert.equal(await label(primary), 'Trao đổi dự án')
  assert.equal(await label(secondary), 'Xem dự án mẫu')
  assert.deepEqual(await evaluate(`[...document.querySelectorAll('.service-family .service-detail-link')].map(a => a.pathname)`), ['/dich-vu/google-automation/', '/dich-vu/thiet-ke-website/'])
  await evaluate(`document.documentElement.style.scrollBehavior = 'auto'`)
  for (const width of [1440, 1024, 768, 600, 390, 320]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height:844, deviceScaleFactor:1, mobile:width <= 600 })
    await evaluate('window.scrollTo(0,0)')
    const paths = await evaluate(`[...document.querySelectorAll('.service-family')].map(el => { const r = el.getBoundingClientRect(); return { top:r.top, bottom:r.bottom, left:r.left, right:r.right }; })`)
    assert.equal(paths.length, 2)
    if (width > 850) {
      assert.equal(paths[0].top, paths[1].top, 'Service groups should sit side by side on desktop')
      assert(paths[0].right <= paths[1].left)
    } else {
      assert(paths[0].bottom <= paths[1].top, 'Service groups must stack without overlap on mobile/tablet')
    }
    assert.equal(await evaluate(`[...document.querySelectorAll('.service-detail-link')].every(a => a.getBoundingClientRect().height >= 44)`), true)
    const bounds = await evaluate(`[...document.querySelectorAll('.hero-actions a, .service-detail-link')].map(el => {
      const { left, right, height } = el.getBoundingClientRect(); return { left, right, height };
    })`)
    assert.equal(bounds.length, 4)
    for (const rect of bounds) {
      assert(rect.left >= 0 && rect.right <= width, `CTA clipped at ${width}px`)
      assert(rect.height >= 44, `CTA touch target is too small at ${width}px`)
    }
    if (width <= 600) {
      assert.equal(await evaluate(`document.querySelector('${primary}').getBoundingClientRect().bottom < innerHeight`), true)
      assert.equal(await evaluate(`document.querySelector('${primary}').getBoundingClientRect().width === document.querySelector('.hero-actions').getBoundingClientRect().width`), true)
    }
  }
  await evaluate(`document.querySelector('#name').value = 'Khách tư vấn'; document.querySelector('#email').value = 'khach@example.test'; document.querySelector('#message').value = 'Tôi muốn trao đổi nhu cầu của nhóm.'`)
  for (const [group, text] of [['automation', 'Tiện ích Sheets · Apps Script & AppSheet'], ['website', 'Website · Cần tư vấn chọn gói']]) {
    await evaluate(`document.querySelector('#plan').value = '${group}'; document.querySelector('${primary}').click(); document.querySelector('#quote-form button[type="submit"]').click()`)
    assert.equal(await evaluate(`document.querySelector('#quote-dialog').open`), true)
    assert.equal(await evaluate(`document.querySelector('#quote-summary').value.includes(${JSON.stringify(text)})`), true)
    assert.equal(await evaluate(`document.querySelector('#message').value`), 'Tôi muốn trao đổi nhu cầu của nhóm.')
    await evaluate(`document.querySelector('.dialog-close').click()`)
  }
  // The general hero CTA preserves a previously selected package and entered data.
  await evaluate(`document.querySelector('#plan').value = 'appsheet'; document.querySelector('${primary}').focus()`)
  await send('Input.dispatchKeyEvent', { type:'keyDown', key:'Enter', code:'Enter', windowsVirtualKeyCode:13 })
  await send('Input.dispatchKeyEvent', { type:'keyUp', key:'Enter', code:'Enter', windowsVirtualKeyCode:13 })
  await poll(() => evaluate(`document.activeElement.id === 'quote-form'`))
  assert.equal(await evaluate(`document.querySelector('#plan').value`), 'appsheet')
  assert.equal(await evaluate(`document.querySelector('#name').value`), 'Khách tư vấn')
  await evaluate(`document.querySelector('${secondary}').click()`)
  assert.equal(await evaluate('location.hash'), '#giao-dien')
  await send('Emulation.setDeviceMetricsOverride', { width:390, height:844, deviceScaleFactor:1, mobile:true })
  await evaluate(`document.querySelector('#dich-vu').scrollIntoView({ behavior:'instant' })`)
  await screenshot('/tmp/corebrisk-cta-mobile.png')
  await evaluate(`document.querySelector('#quote-form').reset(); history.replaceState(null, '', '/'); window.scrollTo(0,0)`)
  await send('Emulation.setDeviceMetricsOverride', { width:1440, height:1050, deviceScaleFactor:1, mobile:false })
  await evaluate(`document.querySelector('#dich-vu').scrollIntoView({ behavior:'instant' })`)
  await screenshot('/tmp/corebrisk-service-groups-desktop.png')
  await evaluate('window.scrollTo(0,0)')
  console.log('PASS: Hero CTA and service links, mobile touch targets, preserved input, summary content and keyboard navigation.')
}
