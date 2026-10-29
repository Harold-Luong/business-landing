export const title = 'Google Sheets, AppSheet & thiết kế website | CoreBrisk'
export const description = 'CoreBrisk thiết kế website và xây tiện ích Google Sheets bằng Apps Script, AppSheet. Xem phạm vi dịch vụ, quy trình và báo giá tham khảo theo dự án.'

export const servicePages = [
    {
        path: '/dich-vu/google-automation/',
        name: 'Google Automation',
        title: 'Google Automation: tiện ích Sheets với Apps Script & AppSheet | CoreBrisk',
        description: 'Thiết kế tiện ích Google Sheets theo yêu cầu bằng Apps Script hoặc AppSheet. So sánh giải pháp và chi phí triển khai riêng theo quy trình doanh nghiệp.',
        plan: 'automation',
    },
    {
        path: '/dich-vu/google-apps-script/',
        name: 'Google Apps Script',
        title: 'Lập trình Google Apps Script, tự động hóa Sheets | CoreBrisk',
        description: 'Lập trình Apps Script theo yêu cầu để tự động hóa Google Sheets, báo cáo và nhắc việc. Chi phí thiết kế riêng từ 2,9 triệu/dự án, tùy phạm vi triển khai.',
        plan: 'apps-script',
    },
    {
        path: '/dich-vu/appsheet/',
        name: 'Ứng dụng AppSheet',
        title: 'Thiết kế ứng dụng AppSheet cho doanh nghiệp | CoreBrisk',
        description: 'Thiết kế AppSheet theo yêu cầu để quản lý đơn hàng, kho và công việc từ Google Sheets. Chi phí triển khai riêng từ 7,9 triệu/dự án, tùy phạm vi.',
        plan: 'appsheet',
    },
    {
        path: '/dich-vu/tien-ich-google-sheets/',
        name: 'Tiện ích Google Sheets',
        title: 'Tiện ích Google Sheets: chọn Apps Script hay AppSheet | CoreBrisk',
        description: 'Tiện ích Google Sheets được thiết kế theo yêu cầu bằng Apps Script hoặc AppSheet. Tìm hiểu giải pháp và phạm vi triển khai riêng theo quy trình của bạn.',
        plan: 'automation',
    },
    {
        path: '/dich-vu/thiet-ke-website/',
        name: 'Thiết kế website',
        title: 'Thiết kế website doanh nghiệp & landing page | CoreBrisk',
        description: 'Thiết kế landing page, website doanh nghiệp và web app theo yêu cầu. So sánh gói Launch, Business, Custom và quy trình triển khai. Giá từ 6,9 triệu.',
        plan: 'launch',
    },
]

export function pageForPath(path = '/') {
    const pathname = path.split('?')[0].replace(/index\.html$/, '').replace(/\/?$/, '/')
    return servicePages.find((page) => page.path === pathname)
}

export function normalizeSiteUrl(value = '') {
    if (!value.trim()) return ''
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
        throw new Error('SITE_URL phải là URL HTTPS tại thư mục gốc, ví dụ https://your-domain.vn (không query/hash).')
    }
    return url.origin + '/'
}

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

export function seoHead(siteUrl, page) {
    const pageTitle = page?.title || title
    const pageDescription = page?.description || description
    const pageUrl = siteUrl ? new URL(page?.path || '/', siteUrl).href : ''
    const business = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        ...(siteUrl ? { '@id': `${siteUrl}#business` } : {}),
        name: 'CoreBrisk',
        description,
        ...(siteUrl ? {
            url: siteUrl,
            logo: { '@type': 'ImageObject', url: `${siteUrl}logo.png`, width: 512, height: 512 },
        } : {}),
        areaServed: { '@type': 'Country', name: 'Việt Nam' },
        knowsAbout: ['Thiết kế website doanh nghiệp', 'Lập trình web', 'Thiết kế landing page', 'Google Apps Script', 'AppSheet', 'Tiện ích Google Sheets'],
    }
    const schema = page ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: page.name,
        serviceType: page.name,
        description: pageDescription,
        ...(pageUrl ? { url: pageUrl } : {}),
        provider: siteUrl ? { '@id': `${siteUrl}#business`, '@type': 'Organization', name: 'CoreBrisk', url: siteUrl } : { '@type': 'Organization', name: 'CoreBrisk' },
        areaServed: { '@type': 'Country', name: 'Việt Nam' },
    } : business
    const breadcrumb = page && siteUrl ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: page.name, item: pageUrl },
        ],
    } : null
    const website = !page && siteUrl ? {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        name: 'CoreBrisk',
        alternateName: 'CoreBrisk Digital Studio',
        url: siteUrl,
        inLanguage: 'vi-VN',
        publisher: { '@id': `${siteUrl}#business` },
    } : null
    const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`
    return `
    <title>${escapeHtml(pageTitle)}</title>
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <meta name="description" content="${escapeHtml(pageDescription)}">
    <meta name="robots" content="${siteUrl ? 'index, follow, max-image-preview:large' : 'noindex, follow'}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="vi_VN">
    <meta property="og:site_name" content="CoreBrisk">
    <meta property="og:title" content="${escapeHtml(pageTitle)}">
    <meta property="og:description" content="${escapeHtml(pageDescription)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
    <meta name="twitter:description" content="${escapeHtml(pageDescription)}">
    ${siteUrl ? `<link rel="canonical" href="${escapeHtml(pageUrl)}">
    <meta property="og:url" content="${escapeHtml(pageUrl)}">
    <meta property="og:image" content="${escapeHtml(siteUrl)}social-card.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="CoreBrisk — Google Sheets, AppSheet và thiết kế website.">
    <meta name="twitter:image" content="${escapeHtml(siteUrl)}social-card.png">` : ''}
    ${jsonLd(schema)}
    ${website ? jsonLd(website) : ''}
    ${breadcrumb ? jsonLd(breadcrumb) : ''}`
}

export function robots(siteUrl) {
    return siteUrl ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n` : 'User-agent: *\nAllow: /\n# Preview: HTML contains noindex until SITE_URL is configured.\n'
}

export function sitemap(siteUrl) {
    const paths = ['/', ...servicePages.map((page) => page.path)]
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${escapeHtml(new URL(path, siteUrl).href)}</loc></url>`).join('')}</urlset>\n`
}
