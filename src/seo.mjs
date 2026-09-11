export const title = 'Google Sheets, AppSheet & thiết kế website | CoreBrisk'
export const description = 'CoreBrisk thiết kế website và xây tiện ích Google Sheets bằng Apps Script, AppSheet. Xem phạm vi dịch vụ, quy trình và báo giá tham khảo theo dự án.'

export const servicePages = [
    {
        path: '/dich-vu/google-automation/',
        name: 'Google Automation',
        title: 'Google Automation: tiện ích Sheets với Apps Script & AppSheet | CoreBrisk',
        description: 'Chọn giải pháp tiện ích Google Sheets với Apps Script hoặc AppSheet. So sánh nhu cầu phù hợp, giá khởi điểm và xem chi tiết từng dịch vụ.',
        plan: 'automation',
    },
    {
        path: '/dich-vu/google-apps-script/',
        name: 'Google Apps Script',
        title: 'Lập trình Google Apps Script, tự động hóa Sheets | CoreBrisk',
        description: 'Tự động hóa Google Sheets bằng Apps Script: tổng hợp dữ liệu, tạo báo cáo và nhắc việc. Xem phạm vi, quy trình bàn giao và giá tham khảo từ 2,9 triệu.',
        plan: 'apps-script',
    },
    {
        path: '/dich-vu/appsheet/',
        name: 'Ứng dụng AppSheet',
        title: 'Thiết kế ứng dụng AppSheet cho doanh nghiệp | CoreBrisk',
        description: 'Xây ứng dụng AppSheet quản lý đơn hàng, kho và công việc từ Google Sheets. Tìm hiểu phân quyền, bàn giao và chi phí triển khai tham khảo từ 7,9 triệu.',
        plan: 'appsheet',
    },
    {
        path: '/dich-vu/tien-ich-google-sheets/',
        name: 'Tiện ích Google Sheets',
        title: 'Tiện ích Google Sheets: chọn Apps Script hay AppSheet | CoreBrisk',
        description: 'Tìm hiểu nhóm tiện ích Google Sheets: tự động hóa bằng Apps Script hoặc xây ứng dụng AppSheet. Chọn giải pháp và phạm vi phù hợp với quy trình của bạn.',
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
        ...(siteUrl ? { url: siteUrl } : {}),
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
    const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`
    return `
    <title>${escapeHtml(pageTitle)}</title>
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
    ${breadcrumb ? jsonLd(breadcrumb) : ''}`
}

export function robots(siteUrl) {
    return siteUrl ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n` : 'User-agent: *\nAllow: /\n# Preview: HTML contains noindex until SITE_URL is configured.\n'
}

export function sitemap(siteUrl) {
    const paths = ['/', ...servicePages.map((page) => page.path)]
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${escapeHtml(new URL(path, siteUrl).href)}</loc></url>`).join('')}</urlset>\n`
}
