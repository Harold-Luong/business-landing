import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'

const source = await readFile(new URL('../public/resources/send-approved-emails.gs', import.meta.url), 'utf8')
const headers = ['Email', 'Name', 'Subject', 'Message', 'Approved', 'Status', 'SentAt', 'Error']
const row = (overrides = {}) => Object.assign(['person@example.com', 'Alex', 'Reminder', 'Hello {{name}}', true, '', '', ''], overrides)
function harness(data, { dryRun = false, quota = 10, locked = false, failSend = false, failResult = false } = {}) {
  const rows = [headers.slice(), ...data.map(r => [...r])]
  const sent = [], logs = []
  let released = false
  const sheet = {
    getDataRange: () => ({ getValues: () => rows.map(r => [...r]) }),
    getRange: (r, c) => ({ setValues: ([values]) => {
      if (failResult && values[0] === 'SENT') throw new Error('Write interrupted')
      rows[r - 1].splice(c - 1, values.length, ...values)
    } }),
  }
  const context = vm.createContext({
    LockService: { getDocumentLock: () => ({ tryLock: () => !locked, releaseLock: () => { released = true } }) },
    SpreadsheetApp: { getActiveSpreadsheet: () => ({ getSheetByName: () => sheet }), flush: () => {} },
    MailApp: {
      getRemainingDailyQuota: () => quota,
      sendEmail: message => { if (failSend) throw new Error('Send interrupted'); sent.push(message) },
    },
    console: { log: value => logs.push(value) },
  })
  vm.runInContext(source, context)
  vm.runInContext(`EMAIL_CONFIG.dryRun = ${dryRun}`, context)
  return { rows, sent, logs, run: () => context.runEmailQueue(), released: () => released }
}

test('download defaults to preview; preview personalizes without sending or modifying the sheet', () => {
  assert.match(source, /dryRun: true/)
  const h = harness([row()], { dryRun: true })
  const before = structuredClone(h.rows)
  h.run()
  assert.equal(h.sent.length, 0)
  assert.deepEqual(h.rows, before)
  assert.ok(h.logs.some(log => log.includes('Hello Alex')))
  assert.ok(h.released())
})

test('only approved pending rows send; a second run does not resend', () => {
  const h = harness([row(), row({ 4: false }), row({ 5: 'SENT' }), row({ 5: 'REVIEW' }), row({ 5: 'IN_PROGRESS' })])
  h.run(); h.run()
  assert.equal(h.sent.length, 1)
  assert.equal(h.sent[0].body, 'Hello Alex')
  assert.equal(h.rows[1][5], 'SENT')
  assert.ok(h.rows[1][6])
})

test('quota and per-run limit leave unprocessed rows pending', () => {
  const limited = harness([row(), row()], { quota: 1 })
  limited.run()
  assert.equal(limited.sent.length, 1)
  assert.equal(limited.rows[2][5], '')
  const batch = harness(Array.from({ length: 21 }, () => row()), { quota: 50 })
  batch.run()
  assert.equal(batch.sent.length, 20)
  assert.equal(batch.rows[21][5], '')
})

test('invalid addresses and missing content do not send', () => {
  const h = harness([row({ 0: 'a@example.com,b@example.com' }), row({ 2: '' }), row({ 3: '' })])
  h.run()
  assert.equal(h.sent.length, 0)
  assert.ok(h.rows.slice(1).every(r => r[5] === 'ERROR'))
})

test('send and result-write failures require review and never retry automatically', () => {
  for (const options of [{ failSend: true }, { failResult: true }]) {
    const h = harness([row()], options)
    assert.throws(h.run, /interrupted/)
    assert.equal(h.rows[1][5], 'REVIEW')
    assert.ok(h.released())
    const sent = h.sent.length
    h.run()
    assert.equal(h.sent.length, sent)
  }
})

test('overlapping runs and incorrect headers fail before sending', () => {
  const locked = harness([row()], { locked: true })
  assert.throws(locked.run, /Another run/)
  assert.equal(locked.sent.length, 0)
  const invalid = harness([row()])
  invalid.rows[0][0] = 'Address'
  assert.throws(invalid.run, /headers/)
  assert.equal(invalid.sent.length, 0)
  assert.ok(invalid.released())
})

test('downloadable CSV matches the required headers and starts unapproved', async () => {
  const csv = await readFile(new URL('../public/resources/email-queue.csv', import.meta.url), 'utf8')
  const [header, sample] = csv.trim().split('\n')
  assert.deepEqual(header.split(','), headers)
  assert.equal(sample.split(',')[4], 'FALSE')
})
