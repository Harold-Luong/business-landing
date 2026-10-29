export function sheetsDemo(value = '') {
    const href = value.trim()
    if (href) {
        const url = new URL(href)
        if (url.protocol !== 'https:' || url.username || url.password) {
            throw new Error('SHEETS_DEMO_URL phải là URL HTTPS công khai.')
        }
    }
    const escaped = href.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    const link = href
        ? `<a class="button button-outline" href="${escaped}" target="_blank" rel="noopener noreferrer">Xem demo Sheets <span class="sr-only">(mở trong tab mới)</span><span aria-hidden="true">↗</span></a>`
        : '<span class="sheet-demo-pending">Demo đang chuẩn bị</span>'
    return {
        name: 'sheets-demo',
        transformIndexHtml(html) {
            return html.replace('<!-- SHEETS_DEMO_LINK -->', link)
        },
    }
}
