import { homeMeta } from '~~/shared/site'
import { validateUrl } from '~~/shared/config'
import { contactDetails, emailLink } from '~~/shared/contact'
import { localizedPath } from '~~/shared/i18n'

type PageMeta = { path: string, name: string, title: string, description: string, kind?: 'article' }
export function useSiteSeo(page?: PageMeta) {
  const siteUrl = validateUrl(useRuntimeConfig().public.siteUrl, 'siteUrl', true)
  const email = useRuntimeConfig().public.contactEmail.trim()
  const { locale, t } = useLocale()
  const title = computed(() => t(page?.title || homeMeta.title))
  const description = computed(() => t(page?.description || homeMeta.description))
  const canonical = computed(() => siteUrl ? new URL(localizedPath(page?.path || '/', locale.value), siteUrl).href : '')
  useSeoMeta({
    title: () => title.value, description: () => description.value,
    robots: siteUrl ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    ogType: page?.kind === 'article' ? 'article' : 'website', ogLocale: () => locale.value === 'en' ? 'en_US' : 'vi_VN', ogSiteName: 'WebSheet',
    ogTitle: () => title.value, ogDescription: () => description.value,
    ogUrl: () => canonical.value || undefined,
    ogImage: siteUrl ? `${siteUrl}social-card.png` : undefined,
    ogImageWidth: siteUrl ? 1200 : undefined, ogImageHeight: siteUrl ? 630 : undefined,
    ogImageAlt: () => siteUrl ? t('seo.websheetCustomWebsitesGoogleSheetsSolutions') : undefined,
    twitterCard: 'summary_large_image', twitterTitle: () => title.value, twitterDescription: () => description.value,
    twitterImage: siteUrl ? `${siteUrl}social-card.png` : undefined,
  })
  useHead(() => {
    const language = locale.value === 'en' ? 'en' : 'vi-VN'
    const provider = { '@type': 'Organization', name: 'WebSheet', ...(siteUrl ? { '@id': `${siteUrl}#business`, url: siteUrl } : {}) }
    const schema = page?.kind === 'article' ? {
      '@context': 'https://schema.org', '@type': 'Article', headline: t(page.name),
      description: description.value, inLanguage: language,
      author: provider, publisher: provider,
      ...(canonical.value ? { url: canonical.value, mainEntityOfPage: canonical.value, image: `${siteUrl}social-card.png` } : {}),
    } : page ? {
      '@context': 'https://schema.org', '@type': 'Service', name: t(page.name), serviceType: t(page.name),
      description: description.value, provider, areaServed: { '@type': 'Country', name: t('seo.vietnam') },
      ...(canonical.value ? { url: canonical.value } : {}),
    } : {
      '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'WebSheet', description: description.value,
      telephone: contactDetails.hotline.number,
      ...(emailLink(email) ? { email } : {}),
      areaServed: { '@type': 'Country', name: t('seo.vietnam') },
      knowsAbout: [t('hero.webDesign'), 'Google Apps Script', 'AppSheet', t('seo.googleSheetsTools')],
      ...(siteUrl ? { '@id': `${siteUrl}#business`, url: canonical.value, logo: { '@type': 'ImageObject', url: `${siteUrl}logo.png`, width: 512, height: 512 } } : {}),
    }
    const schemas: Record<string, unknown>[] = [schema]
    if (siteUrl) schemas.push(page ? {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('services.hero.home'), item: new URL(localizedPath('/', locale.value), siteUrl).href },
        { '@type': 'ListItem', position: 2, name: t(page.name), item: canonical.value },
      ],
    } : {
      '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${canonical.value}#website`, name: 'WebSheet',
      alternateName: 'websheet.shop', url: canonical.value, inLanguage: language, publisher: { '@id': `${siteUrl}#business` },
    })
    return {
      htmlAttrs: { lang: locale.value },
      link: siteUrl ? [
        { key: 'canonical', rel: 'canonical', href: canonical.value },
        ...(['vi', 'en', 'x-default'] as const).map(code => ({
          key: `alternate-${code}`, rel: 'alternate' as const, type: 'text/html', hreflang: code,
          href: new URL(localizedPath(page?.path || '/', code === 'en' ? 'en' : 'vi'), siteUrl).href,
        })),
      ] : [],
      meta: !page ? [{ name: 'google-site-verification', content: 'jYo3q4x3jwfkLa3G-WR4HrwH42O8FYxWdQarBhN2nas' }] : [],
      script: schemas.map((data, i) => ({ key: `site-schema-${i}`, type: 'application/ld+json', innerHTML: JSON.stringify(data).replaceAll('<', '\\u003c') })),
    }
  })
}
