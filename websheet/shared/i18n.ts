import english from './locales/en.json' with { type: 'json' }
import vietnamese from './locales/vi.json' with { type: 'json' }

export type Locale = 'vi' | 'en'
export type MessageKey = keyof typeof vietnamese
export type MessageParams = Record<string, string | number>
const messages: Record<Locale, Record<MessageKey, string>> = { vi: vietnamese, en: english }

export function localeFromPath(path: string): Locale {
  return /^\/en(?:\/|$)/.test(path) ? 'en' : 'vi'
}

export function basePath(path: string) {
  return path.replace(/^\/en(?=\/|$)/, '') || '/'
}

export function localizedPath(path: string, locale: Locale) {
  // Hash links stay on the current page; external URLs are never rewritten.
  if (!path.startsWith('/') || path.startsWith('//')) return path
  const stripped = path.replace(/^\/en(?=\/|[?#]|$)/, '') || '/'
  const base = stripped.startsWith('/') ? stripped : '/' + stripped
  return locale === 'en' ? `/en${base}` : base
}

export function translate(value: string | number | null | undefined, locale: Locale, params: MessageParams = {}): string {
  const text = String(value ?? '')
  if (!Object.hasOwn(messages[locale], text)) return text
  return messages[locale][text as MessageKey].replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    Object.hasOwn(params, name) ? String(params[name]) : placeholder,
  )
}
