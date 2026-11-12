/**
 * WebSheet example: send approved rows from a bound Google Sheet.
 * Start with dryRun: true and your own email address.
 * Do not sort or edit the sheet while the script is running.
 */
const EMAIL_CONFIG = { sheetName: 'Emails', dryRun: true, maxPerRun: 20 }

function runEmailQueue() {
  const lock = LockService.getDocumentLock()
  if (!lock || !lock.tryLock(1000)) throw new Error('Another run is active. Try again later.')
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(EMAIL_CONFIG.sheetName)
    if (!sheet) throw new Error('Create a sheet named Emails first.')
    const rows = sheet.getDataRange().getValues()
    const headers = ['Email', 'Name', 'Subject', 'Message', 'Approved', 'Status', 'SentAt', 'Error']
    if (headers.some((name, i) => String(rows[0][i]).trim() !== name)) {
      throw new Error('Use the eight CSV headers in their original order.')
    }
    let quota = EMAIL_CONFIG.dryRun ? Infinity : MailApp.getRemainingDailyQuota()
    let processed = 0
    const started = Date.now()
    for (let i = 1; i < rows.length; i++) {
      if (processed >= EMAIL_CONFIG.maxPerRun || Date.now() - started > 240000) break
      const [email, name, subject, message, approved, status] = rows[i]
      if (String(approved).trim().toUpperCase() !== 'TRUE' || String(status).trim()) continue
      const recipient = String(email).trim()
      const title = String(subject).trim()
      const body = String(message).replace(/\{\{name\}\}/g, () => String(name))
      const result = sheet.getRange(i + 1, 6, 1, 3)
      if (!/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(recipient) || !title || !body.trim()) {
        if (!EMAIL_CONFIG.dryRun) result.setValues([['ERROR', '', 'Check Email, Subject and Message.']])
        console.log('Invalid row: ' + (i + 1))
        continue
      }
      if (EMAIL_CONFIG.dryRun) {
        console.log(JSON.stringify({ row: i + 1, to: recipient, subject: title, body }))
        processed++
        continue
      }
      if (quota < 1) {
        console.log('Email quota exhausted; remaining rows were not sent.')
        break
      }
      // Record intent before sending. Interrupted rows require manual review.
      result.setValues([['IN_PROGRESS', '', '']])
      SpreadsheetApp.flush()
      try {
        MailApp.sendEmail({ to: recipient, subject: title, body })
        result.setValues([['SENT', new Date(), '']])
        SpreadsheetApp.flush()
        processed++
        quota--
      } catch (error) {
        result.setValues([['REVIEW', '', 'Check delivery before retrying: ' + String(error.message || error)]])
        SpreadsheetApp.flush()
        throw error
      }
    }
    console.log((EMAIL_CONFIG.dryRun ? 'Previewed: ' : 'Sent: ') + processed)
  } finally {
    lock.releaseLock()
  }
}
