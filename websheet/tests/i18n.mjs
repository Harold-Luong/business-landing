import assert from 'node:assert/strict'
import { test } from 'node:test'
import { basePath, localeFromPath, localizedPath, translate } from '../shared/i18n.ts'
import { routes, vietnameseRoutes } from '../shared/site.ts'
import vietnamese from '../shared/locales/vi.json' with { type: 'json' }
import english from '../shared/locales/en.json' with { type: 'json' }

test('locale paths preserve existing URLs, queries and anchors without rewriting external links', () => {
  assert.equal(localeFromPath('/en/'), 'en')
  assert.equal(localeFromPath('/en'), 'en')
  assert.equal(localeFromPath('/english/'), 'vi')
  assert.equal(basePath('/en/dich-vu/appsheet/'), '/dich-vu/appsheet/')
  assert.equal(localizedPath('/?plan=business#quote-form', 'en'), '/en/?plan=business#quote-form')
  assert.equal(localizedPath('/en/?plan=business#quote-form', 'vi'), '/?plan=business#quote-form')
  assert.equal(localizedPath('/en?plan=business', 'vi'), '/?plan=business')
  assert.equal(localizedPath('/en/dich-vu/appsheet/', 'en'), '/en/dich-vu/appsheet/')
  for (const path of ['#quote-form', 'https://example.com/demo', '//example.com/demo', 'mailto:test@example.com']) {
    assert.equal(localizedPath(path, 'en'), path)
  }
})

test('both locales use the same stable keys and interpolation parameters', () => {
  assert.deepEqual(Object.keys(vietnamese).sort(), Object.keys(english).sort())
  for (const key of Object.keys(vietnamese)) {
    assert.match(key, /^[a-z][a-zA-Z0-9]*(\.[a-z][a-zA-Z0-9]*)+$/)
    assert.ok(vietnamese[key].trim(), key)
    assert.ok(english[key].trim(), key)
    assert.deepEqual(vietnamese[key].match(/\{\w+\}/g) ?? [], english[key].match(/\{\w+\}/g) ?? [], key)
    assert.equal(translate(key, 'vi'), vietnamese[key])
    assert.equal(translate(key, 'en'), english[key])
  }
})

test('translations resolve stable keys and preserve unknown strings', () => {
  assert.equal(translate('nav.services', 'en'), 'Services')
  assert.equal(translate('nav.services', 'vi'), 'Dịch vụ')
  assert.equal(translate('Dịch vụ', 'en'), 'Dịch vụ')
  assert.equal(translate('toString', 'en'), 'toString')
  assert.equal(translate('Client project reference #123', 'en'), 'Client project reference #123')
  assert.equal(translate(undefined, 'en'), '')
  assert.equal(translate(2026, 'en'), '2026')
})

test('dynamic copy uses translated templates without reinterpreting parameter values', () => {
  const params = { name: 'An Studio', description: 'Architecture {name} $&' }
  assert.equal(translate('quote.conceptInterest', 'en', params), "I'm interested in the An Studio design concept — Architecture {name} $&.")
  assert.equal(translate('quote.conceptInterest', 'vi', params), 'Tôi quan tâm đến hướng thiết kế An Studio — Architecture {name} $&.')
})

test('every Vietnamese page has exactly one English variant', () => {
  assert.equal(routes.length, 12)
  assert.equal(new Set(routes).size, 12)
  for (const path of vietnameseRoutes) assert.ok(routes.includes(localizedPath(path, 'en')))
})
