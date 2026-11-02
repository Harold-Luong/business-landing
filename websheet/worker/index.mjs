import { contactDetails } from '../shared/contact.ts'

const MAX_BODY_BYTES = 16_384
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/
const unavailable = 'Chưa gửi được yêu cầu. Vui lòng thử lại hoặc liên hệ qua email/Zalo.'
const json = (status, data, headers = {}) => Response.json(data, {
  status,
  headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
})

async function readBody(request) {
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) throw new RangeError()
  if (!request.body) throw new SyntaxError()
  const reader = request.body.getReader()
  const chunks = []
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BODY_BYTES) { await reader.cancel(); throw new RangeError() }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
  return JSON.parse(new TextDecoder().decode(bytes))
}

function validate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const limits = { name: [1, 100], company: [0, 150], email: [3, 150], plan: [1, 150], budget: [1, 100], message: [10, 3000], website: [0, 200] }
  const data = {}
  for (const [field, [min, max]] of Object.entries(limits)) {
    if (typeof input[field] !== 'string') return null
    const value = input[field].trim()
    if (value.length < min || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) return null
    if (field !== 'message' && /[\r\n]/.test(value)) return null
    data[field] = value
  }
  if (!emailPattern.test(data.email) || typeof input.id !== 'string'
      || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.id)) return null
  return { ...data, id: input.id }
}

export async function handleQuote(request, env, send = fetch) {
  if (request.method !== 'POST') return json(405, { error: 'Chỉ hỗ trợ POST.' }, { Allow: 'POST' })
  const origin = new URL(request.url).origin
  if (request.headers.get('origin') !== origin) return json(403, { error: 'Vui lòng gửi yêu cầu từ website WebSheet.' })
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return json(415, { error: 'Định dạng yêu cầu không hợp lệ.' })
  }
  let data
  try { data = validate(await readBody(request)) }
  catch (error) { return json(error instanceof RangeError ? 413 : 400, { error: 'Nội dung yêu cầu không hợp lệ hoặc quá dài.' }) }
  if (!data || data.website) return json(400, { error: 'Vui lòng kiểm tra lại thông tin yêu cầu.' })
  const recipient = (env.MAIL_TO || contactDetails.email).trim()
  if (!env.RESEND_API_KEY || !env.MAIL_FROM || /[\r\n]/.test(env.MAIL_FROM)
      || !emailPattern.test(recipient) || !env.QUOTE_RATE_LIMITER) return json(503, { error: unavailable })
  try {
    // Cloudflare supplies this header; do not trust a client-provided IP in JSON.
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const { success } = await env.QUOTE_RATE_LIMITER.limit({ key: `quote:${ip}` })
    if (!success) return json(429, { error: 'Bạn đã gửi nhiều yêu cầu. Vui lòng chờ một phút rồi thử lại.' }, { 'Retry-After': '60' })
    const text = [
      'YÊU CẦU TƯ VẤN DỰ ÁN — WebSheet', '',
      `Họ tên: ${data.name}`, `Doanh nghiệp: ${data.company || 'Chưa cung cấp'}`,
      `Email: ${data.email}`, `Gói quan tâm: ${data.plan}`, `Ngân sách: ${data.budget}`,
      '', 'Mô tả dự án:', data.message, '', `Nguồn: ${origin}`,
    ].join('\n')
    const response = await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `websheet-quote/${data.id}`,
      },
      body: JSON.stringify({
        from: env.MAIL_FROM, to: [recipient], reply_to: data.email,
        subject: `${env.MAIL_SUBJECT_PREFIX || ''}Yêu cầu tư vấn dự án — ${data.name}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) return json(502, { error: unavailable })
    const result = await response.json()
    if (typeof result.id !== 'string' || !result.id) return json(502, { error: unavailable })
    // Accepted by the mail provider; delivery to the inbox is not guaranteed here.
    return json(200, { ok: true })
  } catch { return json(502, { error: unavailable }) }
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname
    if (path === '/api/quote') return handleQuote(request, env)
    if (path === '/api' || path.startsWith('/api/')) return json(404, { error: 'Không tìm thấy API.' })
    return env.ASSETS.fetch(request)
  },
}
