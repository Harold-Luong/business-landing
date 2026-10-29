import assert from 'node:assert/strict'
import { mkdir, readFile, readdir, rm } from 'node:fs/promises'
import { withBrowser, poll, delay } from './browser-helper.mjs'
import { startServer } from './static-server.mjs'
import { routes } from '../shared/site.ts'
const server = await startServer()
const shots = '/tmp/websheet-preview'
await mkdir(shots, { recursive: true })
await rm(`${shots}/yeu-cau-tu-van-du-an.txt`, { force: true })
try {
  assert.equal((await fetch(server.url + '/missing-page/')).status, 404)
  await withBrowser(async ({ send, evaluate, screenshot, errors }) => {
    const navigate = async path => {
      await send('Page.navigate', { url: server.url + path })
      await poll(() => evaluate(`document.readyState === 'complete' && !!document.querySelector('h1') && !!document.querySelector('#__nuxt')?.__vue_app__`))
      await evaluate('document.fonts.ready')
      await delay(80)
    }
    for (const width of [1440,1024,768,600,390,320]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false })
      for (const path of routes) {
        await navigate(path)
        assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), `${path} overflows at ${width}`)
        assert.equal(await evaluate("document.querySelectorAll('h1').length"), 1)
        if ([1440,390].includes(width) && ['/', '/dich-vu/thiet-ke-website/', '/dich-vu/google-apps-script/'].includes(path)) {
          await evaluate(`Promise.all([...document.images].map(image => { image.loading = 'eager'; return image.decode().catch(() => {}) }))`)
          await screenshot(`${shots}/${path === '/' ? 'home' : path.split('/')[2]}-${width}.png`, true)
        }
      }
    }
    await navigate('/?plan=launch&concept=sheetflow#quote-form')
    await poll(() => evaluate("document.querySelector('#plan').value === 'apps-script'"))
    assert.ok(await evaluate("document.querySelector('#message').value.includes('SheetFlow')"))
    await evaluate(`window.__navigationMarker = 'preserved'; document.querySelector('#message').value = 'Quy trình đối soát đơn hàng mỗi ngày'; document.querySelector('#message').dispatchEvent(new Event('input', { bubbles: true })); document.querySelector('a[href="/dich-vu/thiet-ke-website/"]').click()`)
    await poll(() => evaluate("location.pathname === '/dich-vu/thiet-ke-website/' && document.querySelector('#mau-giao-dien') !== null"))
    assert.equal(await evaluate('window.__navigationMarker'), 'preserved', 'Navigation must stay client-side')
    if (process.env.NUXT_PUBLIC_SITE_URL) {
      assert.equal(await evaluate("document.querySelectorAll('link[rel=canonical]').length"), 1)
      assert.equal(await evaluate("document.querySelector('link[rel=canonical]').href"), new URL('/dich-vu/thiet-ke-website/', process.env.NUXT_PUBLIC_SITE_URL).href)
      assert.equal(await evaluate("[...document.querySelectorAll('script[type=\"application/ld+json\"]')].filter(s => JSON.parse(s.textContent)['@type'] === 'WebSite').length"), 0)
    }
    assert.ok(await evaluate("document.title.includes('Thiết kế website doanh nghiệp')"))
    assert.equal(await evaluate("JSON.parse(document.querySelector('script[type=\"application/ld+json\"]').textContent)['@type']"), 'Service')
    await evaluate("document.querySelector('a[href=\"/?concept=aster&plan=launch#quote-form\"]').click()")
    await poll(() => evaluate("!!document.querySelector('#plan') && document.querySelector('#plan').value === 'launch'"))
    assert.ok(await evaluate("document.querySelector('#message').value.includes('Quy trình đối soát') && document.querySelector('#message').value.includes('Aster S5')"))
    assert.equal(await evaluate('window.__navigationMarker'), 'preserved')
    // Query-only navigation must update selection without duplicating the sentence.
    await evaluate("document.querySelector('a[href=\"/dich-vu/thiet-ke-website/\"]').click()")
    await poll(() => evaluate("!!document.querySelector('#mau-giao-dien')"))
    await evaluate("document.querySelector('a[href=\"/?concept=aster&plan=launch#quote-form\"]').click()")
    await poll(() => evaluate("!!document.querySelector('#message')"))
    assert.equal(await evaluate("document.querySelector('#message').value.split('Tôi quan tâm đến hướng thiết kế Aster').length - 1"), 1)
    await evaluate(`for (const [id,value] of Object.entries({name:'Nguyễn Minh Anh',email:'anh@example.test',company:'WebSheet thử nghiệm'})) { const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event('input',{bubbles:true})); } document.querySelector('#quote-form').requestSubmit()`)
    await poll(() => evaluate("document.querySelector('#quote-dialog').open"))
    assert.ok(await evaluate("document.querySelector('#quote-summary').value.includes('WebSheet') && document.querySelector('#quote-summary').value.includes('Nguyễn Minh Anh')"))
    const expectedEmail = (process.env.NUXT_PUBLIC_CONTACT_EMAIL || '').trim()
    assert.equal(await evaluate("document.querySelector('#email-quote') !== null"), !!expectedEmail)
    if (expectedEmail) assert.ok((await evaluate("document.querySelector('#email-quote').href")).includes(encodeURIComponent(expectedEmail)))
    await evaluate("Object.defineProperty(navigator, 'clipboard', {configurable:true,value:{writeText:async(text)=>{window.__copiedQuote=text}}}); document.querySelector('#copy-quote').click()")
    await poll(() => evaluate("document.querySelector('#copy-status').textContent.includes('Đã sao chép')"))
    assert.ok(await evaluate("window.__copiedQuote.includes('Nguyễn Minh Anh')"))
    await evaluate("Object.defineProperty(navigator, 'clipboard', {configurable:true,value:{writeText:async()=>{throw new Error('denied')}}}); document.querySelector('#copy-quote').click()")
    await poll(() => evaluate("document.querySelector('#copy-status').textContent.includes('Ctrl+C')"))
    await send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: shots })
    await evaluate("document.querySelector('#download-quote').click()")
    await poll(async () => (await readdir(shots)).includes('yeu-cau-tu-van-du-an.txt'))
    const txt = await readFile(`${shots}/yeu-cau-tu-van-du-an.txt`)
    assert.equal(txt.subarray(0,3).toString('hex'), 'efbbbf')
    assert.ok(txt.toString().includes('Nguyễn Minh Anh'))
    await evaluate("document.querySelector('#quote-summary').focus()")
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
    await poll(() => evaluate("!document.querySelector('#quote-dialog').open"))
    await evaluate("document.querySelector('.menu-toggle').click()")
    assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'true')
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
    assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'false')
    assert.equal(await evaluate("document.activeElement.className"), 'menu-toggle')
    // Ignore repeated malformed query values rather than selecting an unintended plan.
    await navigate('/?plan=launch&plan=custom&concept=invalid')
    assert.equal(await evaluate("document.querySelector('#plan').value"), 'unsure')
    await send('Emulation.setScriptExecutionDisabled', { value: true })
    await send('Page.navigate', { url: server.url + '/' })
    await delay(500)
    assert.equal(await evaluate("document.querySelector('#quote-form button[type=submit]').disabled"), true)
    assert.ok(await evaluate("document.body.textContent.includes('Thiết kế website.')"))
    await send('Emulation.setScriptExecutionDisabled', { value: false })
    assert.deepEqual(errors, [], 'Browser console/hydration errors')
    console.log('PASS: 36 route/viewport checks; client navigation, query/plan/concept, draft, dialog, copy fallback, TXT, menu, no-JS and 404. Screenshots: ' + shots)
  })
} finally { await server.close() }
