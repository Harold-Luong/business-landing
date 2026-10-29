export function validateUrl(value: string = '', key = 'URL', rootOnly = false) {
  if (!value.trim()) return ''
  let url: URL
  try { url = new URL(value.trim()) } catch { throw new Error(`${key}: cần URL HTTPS hợp lệ.`) }
  if (url.protocol !== 'https:' || url.username || url.password || (rootOnly && (url.pathname !== '/' || url.search || url.hash))) {
    throw new Error(`${key}: cần HTTPS, không tài khoản/mật khẩu${rootOnly ? ', tại root và không query/hash' : ''}.`)
  }
  return rootOnly ? `${url.origin}/` : url.href
}
export function publicConfig(env: Record<string, string | undefined>) {
  return {
    siteUrl: validateUrl(env.NUXT_PUBLIC_SITE_URL, 'NUXT_PUBLIC_SITE_URL', true),
    contactEmail: (env.NUXT_PUBLIC_CONTACT_EMAIL || '').trim(),
    asterDemoUrl: validateUrl(env.NUXT_PUBLIC_ASTER_DEMO_URL, 'NUXT_PUBLIC_ASTER_DEMO_URL'),
    anStudioDemoUrl: validateUrl(env.NUXT_PUBLIC_AN_STUDIO_DEMO_URL, 'NUXT_PUBLIC_AN_STUDIO_DEMO_URL'),
    orbitDemoUrl: validateUrl(env.NUXT_PUBLIC_ORBIT_DEMO_URL, 'NUXT_PUBLIC_ORBIT_DEMO_URL'),
    sheetsDemoUrl: validateUrl(env.NUXT_PUBLIC_SHEETS_DEMO_URL, 'NUXT_PUBLIC_SHEETS_DEMO_URL'),
  }
}
export function robots(siteUrl: string) {
  return `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}sitemap.xml\n` : '# Preview: HTML contains noindex.\n'}`
}
const escapeXml = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
export function sitemap(siteUrl: string, routes: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(path => `<url><loc>${escapeXml(new URL(path, siteUrl).href)}</loc></url>`).join('')}</urlset>\n`
}
