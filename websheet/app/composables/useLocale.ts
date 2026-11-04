import { basePath, localeFromPath, localizedPath, translate, type Locale, type MessageParams } from '~~/shared/i18n'

export function useLocale() {
  const route = useRoute()
  const locale = computed(() => localeFromPath(route.path))
  const t = (value: string | number | null | undefined, params?: MessageParams) => translate(value, locale.value, params)
  const localePath = (path: string) => localizedPath(path, locale.value)
  const switchLocale = (language: Locale, preserveContext = false) => ({
    path: localizedPath(route.path, language),
    query: preserveContext ? route.query : {}, hash: preserveContext ? route.hash : '',
  })
  const priceMillions = (price: number) => new Intl.NumberFormat(locale.value === 'en' ? 'en-US' : 'vi-VN', { maximumFractionDigits: 1 }).format(price / 1000000)
  return { locale, t, localePath, switchLocale, priceMillions, homePath: computed(() => localizedPath('/', locale.value)), isHome: computed(() => basePath(route.path) === '/') }
}
