import { homeMeta } from '~~/shared/site'
import { validateUrl } from '~~/shared/config'

type PageMeta = { path: string, name: string, title: string, description: string }
export function useSiteSeo(page?: PageMeta) {
  const siteUrl = validateUrl(useRuntimeConfig().public.siteUrl, 'siteUrl', true)
  const title = page?.title || homeMeta.title
  const description = page?.description || homeMeta.description
  const canonical = siteUrl ? new URL(page?.path || '/', siteUrl).href : ''
  useSeoMeta({
    title, description,
    robots: siteUrl ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    ogType: 'website', ogLocale: 'vi_VN', ogSiteName: 'WebSheet', ogTitle: title, ogDescription: description,
    ogUrl: canonical || undefined,
    ogImage: siteUrl ? `${siteUrl}social-card.png` : undefined,
    ogImageWidth: siteUrl ? 1200 : undefined, ogImageHeight: siteUrl ? 630 : undefined,
    ogImageAlt: siteUrl ? 'WebSheet — Thiết kế website & Google Sheets theo yêu cầu.' : undefined,
    twitterCard: 'summary_large_image', twitterTitle: title, twitterDescription: description,
    twitterImage: siteUrl ? `${siteUrl}social-card.png` : undefined,
  })
  const provider = { '@type': 'Organization', name: 'WebSheet', ...(siteUrl ? { '@id': `${siteUrl}#business`, url: siteUrl } : {}) }
  const schema = page ? {
    '@context': 'https://schema.org', '@type': 'Service', name: page.name, serviceType: page.name,
    description, provider, areaServed: { '@type': 'Country', name: 'Việt Nam' },
    ...(canonical ? { url: canonical } : {}),
  } : {
    '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'WebSheet', description,
    areaServed: { '@type': 'Country', name: 'Việt Nam' },
    knowsAbout: ['Thiết kế website', 'Google Apps Script', 'AppSheet', 'Tiện ích Google Sheets'],
    ...(siteUrl ? { '@id': `${siteUrl}#business`, url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}logo.png`, width: 512, height: 512 } } : {}),
  }
  const schemas: Record<string, unknown>[] = [schema]
  if (siteUrl) schemas.push(page ? {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: page.name, item: canonical },
    ],
  } : {
    '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteUrl}#website`, name: 'WebSheet',
    alternateName: 'websheet.shop', url: siteUrl, inLanguage: 'vi-VN', publisher: { '@id': `${siteUrl}#business` },
  })
  useHead({
    link: canonical ? [{ key: 'canonical', rel: 'canonical', href: canonical }] : [],
    meta: !page ? [{ name: 'google-site-verification', content: 'jYo3q4x3jwfkLa3G-WR4HrwH42O8FYxWdQarBhN2nas' }] : [],
    script: schemas.map((data, i) => ({ key: `site-schema-${i}`, type: 'application/ld+json', innerHTML: JSON.stringify(data).replaceAll('<', '\\u003c') })),
  })
}
