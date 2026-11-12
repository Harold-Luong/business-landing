import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { withBrowser, poll, delay } from './browser-helper.mjs'
import { startServer } from './static-server.mjs'
import { vietnameseRoutes as routes } from '../shared/site.ts'
const server = await startServer()
const shots = '/tmp/websheet-preview'
await mkdir(shots, { recursive: true })
try {
  assert.equal((await fetch(server.url + '/missing-page/')).status, 404)
  await withBrowser(async ({ send, evaluate, screenshot, errors }) => {
    const navigate = async path => {
      await send('Page.navigate', { url: server.url + path })
      await poll(() => evaluate(`document.readyState === 'complete' && !!document.querySelector('h1') && !!document.querySelector('#__nuxt')?.__vue_app__`))
      await evaluate('document.fonts.ready')
      await delay(80)
    }
    const checkComparison = async width => {
      const layout = await evaluate(`(() => {
        const section = document.querySelector('#bang-gia-website');
        const cards = [...section.querySelectorAll('article')];
        cards.forEach(card => card.querySelector('details').open = true);
        const result = {
          fits: [section, ...cards].every(el => el.scrollWidth <= el.clientWidth + 1),
          cards: cards.map(card => {
            const rect = card.getBoundingClientRect();
            return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right };
          }),
        };
        cards.forEach(card => card.querySelector('details').open = false);
        return result;
      })()`)
      assert.equal(layout.cards.length, 3)
      assert.ok(layout.fits, `Expanded website plans must fit without horizontal scrolling at ${width}`)
      for (let i = 1; i < layout.cards.length; i++) {
        const previous = layout.cards[i - 1], current = layout.cards[i]
        if (width <= 850) assert.ok(current.top >= previous.bottom - 1 && Math.abs(current.left - previous.left) <= 1, `Website plans stack vertically at ${width}`)
        else assert.ok(current.left >= previous.right - 1 && Math.abs(current.top - previous.top) <= 1, `Website plans sit side by side at ${width}`)
      }
    }
    await send('Emulation.setFocusEmulationEnabled', { enabled: true })
    await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false })
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] })
    await navigate('/')
    await poll(() => evaluate("document.querySelector('.price-card')?.dataset.revealState === 'pending'"))
    assert.equal(await evaluate("getComputedStyle(document.querySelector('h1')).opacity"), '1', 'First viewport stays visible')
    await evaluate(`window.__revealCount = 0; const card = document.querySelector('.price-card'); card.addEventListener('animationstart', () => window.__revealCount++); card.scrollIntoView({block:'center', behavior:'instant'})`)
    await poll(() => evaluate("document.querySelector('.price-card').dataset.revealState === 'visible' && window.__revealCount === 1"))
    await poll(() => evaluate("document.querySelector('.price-card').getAnimations().length === 0"))
    assert.equal(await evaluate("getComputedStyle(document.querySelector('.price-card')).opacity"), '1')
    await screenshot(`${shots}/reveal-pricing.png`)
    await evaluate("window.scrollTo({top:0, behavior:'instant'})")
    await delay(80)
    await evaluate("document.querySelector('.price-card').scrollIntoView({block:'center', behavior:'instant'})")
    await delay(200)
    assert.equal(await evaluate('window.__revealCount'), 1, 'Reveal must not replay on scrolling back')
    await evaluate("document.querySelector('.contact-channels a').focus({preventScroll:true})")
    assert.deepEqual(await evaluate("({ opacity: getComputedStyle(document.querySelector('.contact-channels')).opacity, state: document.querySelector('.contact-channels').dataset.revealState, focused: !!document.activeElement.closest('.contact-channels') })"), { opacity: '1', state: 'done', focused: true }, 'Keyboard focus reveals contact channels immediately')
    await send('Emulation.setEmulatedMedia', { media: 'print' })
    assert.ok(await evaluate("[...document.querySelectorAll('[data-reveal-state]')].every(el => getComputedStyle(el).opacity === '1')"), 'Printing must include pending blocks')
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    await poll(() => evaluate("!document.querySelector('[data-reveal-state=pending]')"))
    await navigate('/dich-vu/thiet-ke-website/')
    assert.equal(await evaluate("document.querySelector('[data-reveal-state=pending]')"), null, 'Reduced motion starts with all content visible')
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] })
    for (const width of [1440,1024,768,600,390,320]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false })
      for (const path of routes) {
        await navigate(path)
        assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), `${path} overflows at ${width}`)
        assert.equal(await evaluate("document.querySelectorAll('h1').length"), 1)
        if (path === '/') await checkComparison(width)
        assert.deepEqual(await evaluate("[...document.querySelectorAll('#navigation > a')].map(a => a.textContent.replace('↗', '').trim())"), ['Dịch vụ', 'Bảng giá', 'Quy trình', 'Liên hệ'])
        if (path !== '/') {
          assert.deepEqual(await evaluate("[...document.querySelectorAll('#navigation > a')].map(a => a.getAttribute('href'))"), ['/#dich-vu', '/#bang-gia', '/#quy-trinh', '/#lien-he'])
          assert.equal(await evaluate("document.querySelector('#navigation [aria-current]')?.getAttribute('href')"), '/#dich-vu')
          assert.equal(await evaluate("document.querySelector('.detail-process')"), null)
        }
        if ([1440,390].includes(width) && ['/', '/dich-vu/thiet-ke-website/', '/dich-vu/google-apps-script/', '/huong-dan/gui-email-tu-google-sheets/'].includes(path)) {
          await evaluate(`Promise.all([...document.images].map(image => { image.loading = 'eager'; return image.decode().catch(() => {}) }))`)
          // Visit blocks before full-page capture; an offscreen block intentionally waits for scrolling.
          await evaluate(`(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.75) { window.scrollTo({top:y, behavior:'instant'}); await new Promise(resolve => setTimeout(resolve, 40)); } window.scrollTo({top:0, behavior:'instant'}); })()`)
          await poll(() => evaluate("!document.querySelector('[data-reveal-state=pending]') && document.getAnimations().every(animation => animation.animationName !== 'block-reveal')"))
          await screenshot(`${shots}/${path === '/' ? 'home' : path.split('/')[2]}-${width}.png`, true)
        }
      }
    }
    for (const language of ['', '/en']) {
      await navigate(language + '/huong-dan/gui-email-tu-google-sheets/')
      await evaluate("document.querySelector('.guide-code').open = true")
      assert.ok(await evaluate("document.querySelector('.guide-code code').textContent.includes('dryRun: true')"))
      assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), 'Expanded code fits mobile')
      await evaluate("Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.__copiedGuide = text } } })")
      await evaluate("document.querySelector('.guide-actions button').click()")
      await poll(() => evaluate("window.__copiedGuide?.includes('runEmailQueue') && !!document.querySelector('.copy-feedback').textContent.trim()"))
      await evaluate("Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('denied') } } })")
      await evaluate("document.querySelector('.guide-actions button').click()")
      await poll(() => evaluate("document.querySelector('.copy-feedback').textContent.includes('.gs')"))
    }
    for (const language of ['', '/en']) {
      await navigate(language + '/')
      const labels = await evaluate("[...document.querySelectorAll('.price-card > a.button')].map(a => a.textContent.replace('↗', '').trim())")
      assert.equal(labels.length, 5)
      assert.equal(new Set(labels).size, 5, 'Pricing CTA text identifies each plan or service')
    }
    // Shared mobile menu must navigate from a service back to landing anchors.
    await navigate('/dich-vu/google-automation/')
    await evaluate("window.__navigationMarker = 'shared-header'; document.querySelector('.menu-toggle').click()")
    assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'true')
    await evaluate("document.querySelector('#navigation a[href=\"/#quy-trinh\"]').click()")
    await poll(() => evaluate("location.pathname === '/' && location.hash === '#quy-trinh' && !!document.querySelector('#quy-trinh')"))
    await poll(() => evaluate("document.querySelector('#navigation [aria-current]')?.getAttribute('href') === '#quy-trinh'"))
    assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'false')
    assert.equal(await evaluate('window.__navigationMarker'), 'shared-header')
    for (const slug of ['google-automation', 'google-apps-script', 'appsheet', 'tien-ich-google-sheets', 'thiet-ke-website']) {
      await navigate(`/dich-vu/${slug}/`)
      await evaluate("document.querySelector('.detail-cta a').click()")
      await poll(() => evaluate("location.pathname === '/' && !!document.querySelector('#lien-he')"))
      assert.equal(await evaluate('location.hash'), '#lien-he')
    }
    // Old form bookmarks and current CTAs must still reach the contact information.
    await navigate('/?plan=launch&concept=sheetflow#quote-form')
    await poll(() => evaluate("document.activeElement.id === 'lien-he'"))
    assert.equal(await evaluate("document.querySelector('form, #quote-dialog')"), null)
    const expectedEmail = (process.env.NUXT_PUBLIC_CONTACT_EMAIL || '').trim()
    assert.equal(await evaluate("document.querySelector('.contact-channels a[href^=\"mailto:\"]') !== null"), !!expectedEmail)
    assert.equal(await evaluate("document.querySelector('.contact-channels a[href^=\"tel:\"]').getAttribute('href')"), 'tel:+84947787904')
    assert.equal(await evaluate("document.querySelector('.contact-channels a[href^=\"https://zalo.me/\"]').getAttribute('href')"), 'https://zalo.me/0975666614')
    await navigate('/')
    await evaluate("document.querySelector('.hero .button').click()")
    await poll(() => evaluate("location.hash === '#lien-he' && document.activeElement.id === 'lien-he'"))
    await evaluate("document.querySelector('.automation-pricing .button').click()")
    assert.equal(await evaluate("document.querySelector('.automation-pricing .button').getAttribute('href')"), '#lien-he')
    await navigate('/dich-vu/thiet-ke-website/')
    assert.ok(await evaluate("[...document.querySelectorAll('.work-card > a')].every(link => link.target === '_blank' && !!link.querySelector('img.demo-screenshot'))"), 'Gallery opens demos from actual screenshots')
    await evaluate("window.__navigationMarker = 'preserved'; document.querySelector('.detail-cta a').click()")
    await poll(() => evaluate("location.pathname === '/' && location.hash === '#lien-he' && document.activeElement.id === 'lien-he'"))
    assert.equal(await evaluate('window.__navigationMarker'), 'preserved')
    assert.equal(await evaluate("document.querySelector('form, #quote-dialog')"), null)
    await evaluate("document.querySelector('.menu-toggle').click()")
    assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'true')
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
    assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'false')
    assert.equal(await evaluate("document.activeElement.className"), 'menu-toggle')
    // English pages are directly addressable, translated and usable on desktop/mobile.
    for (const width of [1440, 768, 390, 320]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false })
      for (const path of routes) {
        await navigate('/en' + path)
        assert.equal(await evaluate('document.documentElement.lang'), 'en')
        if (path === '/') await checkComparison(width)
        assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), `/en${path} overflows at ${width}`)
        assert.deepEqual(await evaluate("[...document.querySelectorAll('#navigation > a')].map(a => a.textContent.replace('↗', '').trim())"), ['Services', 'Pricing', 'Process', 'Contact'])
        const links = await evaluate("[...document.querySelectorAll('a[href]')].filter(a => !a.closest('.language-switch')).map(a => a.getAttribute('href')).filter(href => href.startsWith('/') && !href.startsWith('//'))")
        assert.ok(links.every(href => href.startsWith('/en/') || /^\/demos\/(aster|an-studio|orbit)\/$/.test(href) || /^\/resources\/(email-queue\.csv|send-approved-emails\.gs)$/.test(href)), 'Internal links stay English; shared demos keep their own URLs: ' + links.join(', '))
      }
      await navigate('/en/')
      assert.equal(await evaluate("document.querySelector('.language-switch').open"), false)
      await evaluate("document.querySelector('.language-switch summary').focus()")
      await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r' })
      await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 })
      await poll(() => evaluate("document.querySelector('.language-switch').open"))
      assert.ok(await evaluate("document.querySelector('.language-options').getBoundingClientRect().left >= 0"), 'Language dropdown fits the viewport')
      assert.equal(await evaluate("document.querySelector('.language-options [aria-current]').lang"), 'en')
      if (width === 1440 || width === 390) await screenshot(`${shots}/language-menu-${width}.png`)
      await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
      await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
      assert.equal(await evaluate("document.querySelector('.language-switch').open"), false)
      assert.equal(await evaluate("document.activeElement === document.querySelector('.language-switch summary')"), true)
      await evaluate("document.querySelector('.language-switch summary').click(); document.querySelector('h1').click()")
      assert.equal(await evaluate("document.querySelector('.language-switch').open"), false)
      if (width === 1440 || width === 390) await screenshot(`${shots}/en-${width}.png`, true)
    }
    await navigate('/dich-vu/appsheet/?plan=appsheet#pham-vi')
    await evaluate("window.__localeMarker = 'kept'; document.querySelector('.language-switch summary').click(); document.querySelector('.language-switch a[lang=en]').click()")
    await poll(() => evaluate("location.pathname === '/en/dich-vu/appsheet/' && document.documentElement.lang === 'en'"))
    assert.equal(await evaluate('location.search + location.hash'), '?plan=appsheet#pham-vi')
    assert.equal(await evaluate('window.__localeMarker'), 'kept', 'Language switch stays client-side')
    assert.ok(await evaluate("document.title.includes('Custom AppSheet')"))
    if (process.env.NUXT_PUBLIC_SITE_URL) {
      assert.equal(await evaluate("document.querySelector('link[rel=canonical]').href"), process.env.NUXT_PUBLIC_SITE_URL + 'en/dich-vu/appsheet/')
      assert.equal(await evaluate("document.querySelectorAll('link[rel=alternate][hreflang]').length"), 3)
    }
    await evaluate("document.querySelector('.language-switch summary').click(); document.querySelector('.language-switch a[lang=vi]').click()")
    await poll(() => evaluate("location.pathname === '/dich-vu/appsheet/' && document.documentElement.lang === 'vi'"))
    assert.ok(await evaluate("document.title.includes('Thiết kế ứng dụng AppSheet')"))
    await navigate('/en/?plan=business#quote-form')
    await poll(() => evaluate("document.activeElement.id === 'lien-he'"))
    assert.equal(await evaluate("document.querySelector('form, #quote-dialog')"), null)
    assert.equal(await evaluate("document.querySelectorAll('.contact-channel-icon svg').length"), expectedEmail ? 3 : 2)
    assert.ok(await evaluate("document.querySelector('.contact-copy').textContent.includes('Contact us directly')"))
    await evaluate("document.querySelector('.language-switch summary').click(); document.querySelector('.language-switch a[lang=vi]').click()")
    await poll(() => evaluate("document.documentElement.lang === 'vi'"))
    assert.equal(await evaluate('location.search + location.hash'), '?plan=business#quote-form')
    assert.equal(await evaluate("document.querySelector('form, #quote-dialog')"), null)
    await send('Emulation.setScriptExecutionDisabled', { value: true })
    await send('Page.navigate', { url: server.url + '/en/' })
    await delay(500)
    assert.equal(await evaluate('document.documentElement.lang'), 'en')
    assert.ok(await evaluate("document.body.textContent.includes('Web design.')"))
    assert.equal(await evaluate("document.querySelector('.language-switch a[lang=vi]').getAttribute('href')"), '/')
    await send('Page.navigate', { url: server.url + '/' })
    await delay(500)
    assert.equal(await evaluate("document.querySelector('form, #quote-dialog')"), null)
    assert.equal(await evaluate("document.querySelectorAll('.contact-channels a').length"), expectedEmail ? 3 : 2)
    assert.ok(await evaluate("document.body.textContent.includes('Thiết kế website.')"))
    assert.equal(await evaluate("document.querySelector('[data-reveal-state=pending]')"), null, 'Prerendered/no-JS content must never be hidden')
    await send('Page.navigate', { url: server.url + '/huong-dan/gui-email-tu-google-sheets/' })
    await poll(() => evaluate("document.readyState === 'complete' && !!document.querySelector('.guide-code')"))
    assert.ok(await evaluate("document.querySelector('.guide-code code').textContent.includes('runEmailQueue')"), 'Guide code is readable without JS')
    await send('Emulation.setScriptExecutionDisabled', { value: false })
    for (const id of ['aster', 'an-studio', 'orbit']) {
      const response = await fetch(`${server.url}/demos/${id}/`)
      assert.equal(response.status, 200, id + ' demo is served')
      await send('Page.navigate', { url: `${server.url}/demos/${id}/` })
      await poll(() => evaluate(`document.readyState === 'complete' && !!document.querySelector('a[href="/?concept=${id}#lien-he"]')`))
      assert.ok(await evaluate(`document.querySelector('meta[name=robots]').content.includes('noindex')`))
      await evaluate(`Promise.all([...document.images].map(image => { image.loading = 'eager'; return image.decode(); }))`)
      assert.ok(await evaluate(`!document.body.textContent.includes('CoreBrisk')`))
      await evaluate(`document.querySelector('a[href="/dich-vu/thiet-ke-website/#mau-giao-dien"]').click()`)
      await poll(() => evaluate(`location.pathname === '/dich-vu/thiet-ke-website/' && location.hash === '#mau-giao-dien' && !!document.querySelector('#__nuxt')?.__vue_app__`))
    }
    assert.deepEqual(errors, [], 'Browser console/hydration errors')
    console.log('PASS: ' + (routes.length * 10) + ' VI/EN route/viewport checks; language switching, localized navigation/SEO, contact-only CTAs, direct contact icons/links, legacy form bookmarks, no-JS, reveal, keyboard, menu and 404. Screenshots: ' + shots)
  })
} finally { await server.close() }
