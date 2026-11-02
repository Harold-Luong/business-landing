import assert from 'node:assert/strict'
import { test } from 'node:test'
import worker, { handleQuote } from '../worker/index.mjs'

const payload = {
  id: '7ab731cf-3c2a-44dc-a78b-4304bf54cc21', name: 'Nguyễn Minh Anh',
  company: 'Công ty mẫu', email: 'anh@example.com', plan: 'Business', budget: '10–20 triệu',
  message: 'Tôi cần website giới thiệu doanh nghiệp.', website: '',
}
const request = (body = payload, headers = {}) => new Request('https://websheet.shop/api/quote', {
  method: 'POST', headers: { Origin: 'https://websheet.shop', 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1', ...headers },
  body: typeof body === 'string' ? body : JSON.stringify(body),
})
const environment = (extra = {}) => ({
  RESEND_API_KEY: 'test-key', MAIL_FROM: 'WebSheet <contact@websheet.shop>', MAIL_TO: 'owner@example.com',
  QUOTE_RATE_LIMITER: { limit: async () => ({ success: true }) }, ...extra,
})
const neverSend = () => { throw new Error('Provider must not be called') }

test('sends only to configured recipient, sets reply-to, plain text and stable idempotency', async () => {
  const calls = []
  const send = async (url, init) => { calls.push({ url, ...init }); return Response.json({ id: 'provider-id' }) }
  const env = environment({ MAIL_SUBJECT_PREFIX: '[DEV] ' })
  for (let i = 0; i < 2; i++) {
    const response = await handleQuote(request({ ...payload, to: 'attacker@example.com', from: 'attacker@example.com', html: '<script>alert(1)</script>' }), env, send)
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { ok: true })
    assert.equal(response.headers.get('cache-control'), 'no-store')
  }
  assert.equal(calls[0].url, 'https://api.resend.com/emails')
  assert.equal(calls[0].headers['Idempotency-Key'], calls[1].headers['Idempotency-Key'])
  assert.equal(calls[0].headers.Authorization, 'Bearer test-key')
  const mail = JSON.parse(calls[0].body)
  assert.deepEqual(mail.to, ['owner@example.com'])
  assert.equal(mail.from, env.MAIL_FROM)
  assert.equal(mail.reply_to, payload.email)
  assert.ok(mail.subject.startsWith('[DEV] '))
  assert.ok(mail.text.includes(payload.message))
  assert.equal(mail.html, undefined)
})

test('rejects foreign or missing Origin, wrong method and non-JSON', async () => {
  const env = environment()
  assert.equal((await handleQuote(new Request('https://websheet.shop/api/quote'), env, neverSend)).status, 405)
  for (const Origin of ['https://attacker.example', 'null', '']) {
    assert.equal((await handleQuote(request(payload, { Origin }), env, neverSend)).status, 403)
  }
  assert.equal((await handleQuote(request(payload, { 'Content-Type': 'text/plain' }), env, neverSend)).status, 415)
})

test('validates malformed, missing, oversized and injected fields on server', async () => {
  const invalid = ['{', 'null', '[]', { ...payload, name: ' ' }, { ...payload, email: 'invalid' },
    { ...payload, name: 'Name\r\nBcc: other@example.com' }, { ...payload, message: 'short' },
    { ...payload, message: 'a'.repeat(3001) }, { ...payload, company: 123 },
    { ...payload, website: 'https://spam.example' }, { ...payload, id: '../bad' }]
  for (const body of invalid) assert.equal((await handleQuote(request(body), environment(), neverSend)).status, 400)
  assert.equal((await handleQuote(request(' '.repeat(16_385)), environment(), neverSend)).status, 413)
  assert.equal((await handleQuote(request(payload, { 'Content-Length': '20000' }), environment(), neverSend)).status, 413)
})

test('fails closed without provider configuration or rate limiter', async () => {
  for (const extra of [{ RESEND_API_KEY: '' }, { MAIL_FROM: '' }, { MAIL_TO: 'invalid' }, { QUOTE_RATE_LIMITER: undefined }]) {
    assert.equal((await handleQuote(request(), environment(extra), neverSend)).status, 503)
  }
})

test('rate limit uses Cloudflare IP and returns retry guidance without sending', async () => {
  let key
  const env = environment({ QUOTE_RATE_LIMITER: { limit: async (args) => { key = args.key; return { success: false } } } })
  const response = await handleQuote(request({ ...payload, ip: 'spoofed' }), env, neverSend)
  assert.equal(key, 'quote:192.0.2.1')
  assert.equal(response.status, 429)
  assert.equal(response.headers.get('retry-after'), '60')
})

test('provider failures and timeouts never report success or expose provider details', async () => {
  for (const send of [
    async () => new Response('private provider details test-key', { status: 403 }),
    async () => { throw new DOMException('private provider details', 'TimeoutError') },
    async () => Response.json({}),
    async () => new Response('invalid json'),
  ]) {
    const response = await handleQuote(request(), environment(), send)
    assert.equal(response.status, 502)
    const body = await response.text()
    assert.ok(!body.includes('private provider details') && !body.includes('test-key'))
  }
})

test('keeps static asset/404 routing and returns JSON for unknown API paths', async () => {
  let path
  const env = { ASSETS: { fetch: async (req) => { path = new URL(req.url).pathname; return new Response('Not found', { status: 404 }) } } }
  assert.equal((await worker.fetch(new Request('https://websheet.shop/missing'), env)).status, 404)
  assert.equal(path, '/missing')
  for (const url of ['/api', '/api/missing']) {
    const response = await worker.fetch(new Request('https://websheet.shop' + url), env)
    assert.equal(response.status, 404)
    assert.ok(response.headers.get('content-type').includes('application/json'))
  }
})
