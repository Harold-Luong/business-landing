import assert from 'node:assert/strict'
import { poll } from './browser-helper.mjs'

export async function testPricing({ send, evaluate, screenshot }) {
  const table = '.comparison-scroll'
  const disclosures = '.pricing .plan-details'
  assert.equal(await evaluate(`document.querySelectorAll('${disclosures}').length`), 5)
  assert.equal(await evaluate(`document.querySelectorAll('${disclosures}[open]').length`), 0)
  // Cells reference their plan; each criterion is included in the cell content.
  assert.deepEqual(await evaluate(`[...document.querySelectorAll('.comparison-table td')].flatMap(el => el.headers.split(' ')).filter(id => !document.getElementById(id))`), [])
  for (const width of [1440, 1024, 768, 600, 390, 320]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height:900, deviceScaleFactor:1, mobile:width <= 600 })
    assert.equal(await evaluate(`document.documentElement.scrollWidth <= ${width}`), true, `Pricing overflow at ${width}px`)
    if (width <= 600) {
      assert.equal(await evaluate(`document.querySelector('${table}').scrollWidth > document.querySelector('${table}').clientWidth`), true)
      await evaluate(`document.querySelector('${table}').scrollLeft = 200`)
      assert(await evaluate(`document.querySelector('${table}').scrollLeft > 0`), 'Comparison must scroll horizontally')
    }
    for (const plan of ['launch', 'business', 'custom']) {
      const selector = `.comparison-table [data-select-plan="${plan}"]`
      await evaluate(`document.querySelector('${selector}').focus(); document.querySelector('${selector}').scrollIntoView({ behavior:'instant', block:'center', inline:'nearest' })`)
      const bounds = await evaluate(`(() => { const r = document.querySelector('${selector}').getBoundingClientRect(); return { left:r.left, right:r.right, height:r.height } })()`)
      assert(bounds.height >= 44 && bounds.left >= 0 && bounds.right <= width, `Package CTA inaccessible at ${width}px`)
      await evaluate(`document.querySelector('${selector}').click()`)
      assert.equal(await evaluate(`document.querySelector('#plan').value`), plan)
      assert.equal(await evaluate('location.hash'), '#quote-form')
    }
  }
  // Native disclosures are keyboard operable, independently expandable and reversible.
  for (let i = 0; i < 5; i++) {
    await evaluate(`document.querySelectorAll('${disclosures} summary')[${i}].focus()`)
    await send('Input.dispatchKeyEvent', { type:'keyDown', key:'Enter', code:'Enter', windowsVirtualKeyCode:13, text:'\r' })
    await send('Input.dispatchKeyEvent', { type:'keyUp', key:'Enter', code:'Enter', windowsVirtualKeyCode:13 })
    await poll(() => evaluate(`document.querySelectorAll('${disclosures}')[${i}].open`))
    assert.equal(await evaluate(`document.querySelectorAll('${disclosures}[open]').length`), 1)
    assert.equal(await evaluate(`document.documentElement.scrollWidth <= 320`), true)
    assert.equal(await evaluate(`document.querySelectorAll('${disclosures} .feature-list')[${i}].getBoundingClientRect().height > 0`), true)
    await evaluate(`document.querySelectorAll('${disclosures} summary')[${i}].click()`)
    assert.equal(await evaluate(`document.querySelectorAll('${disclosures}')[${i}].open`), false)
  }
  for (const width of [1440, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height:1050, deviceScaleFactor:1, mobile:width < 601 })
    await evaluate(`document.querySelector('${table}').scrollLeft = 0; document.querySelector('#bang-gia-website').scrollIntoView({ behavior:'instant' })`)
    await screenshot(`/tmp/corebrisk-pricing-${width}.png`)
  }
  await send('Emulation.setScriptExecutionDisabled', { value:true })
  try {
    await send('Page.navigate', { url:'http://127.0.0.1:4187/#bang-gia' })
    await poll(() => evaluate(`document.readyState === 'complete' && document.querySelector('${disclosures}')`))
    for (let i = 0; i < 5; i++) {
      await evaluate(`document.querySelectorAll('${disclosures} summary')[${i}].click()`)
      assert.equal(await evaluate(`document.querySelectorAll('${disclosures}')[${i}].open`), true)
    }
  } finally {
    await send('Emulation.setScriptExecutionDisabled', { value:false })
  }
  await send('Page.navigate', { url:'http://127.0.0.1:4187/' })
  await poll(() => evaluate(`document.readyState === 'complete' && !document.querySelector('#quote-form button[type="submit"]').disabled`))
  await evaluate('document.fonts.ready')
  await send('Emulation.setDeviceMetricsOverride', { width:1440, height:1050, deviceScaleFactor:1, mobile:false })
  console.log('PASS: Pricing disclosures with keyboard and without JavaScript, comparison cells, mobile scrolling, all website plan CTAs at six widths.')
}
