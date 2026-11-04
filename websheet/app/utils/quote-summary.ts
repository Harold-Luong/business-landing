import type { QuoteDraft } from '~/types/content'
import { quoteOptions } from '~/data/plans'
import { translate, type Locale } from '~~/shared/i18n'
export function quoteSummary(draft: QuoteDraft, locale: Locale = 'vi') {
  const t = (value: string) => translate(value, locale)
  return [
    t('quote.summary.title'), '',
    `${t('quote.fields.name')}: ${draft.name.trim()}`, `${t('quote.fields.company')}: ${draft.company.trim() || t('quote.notProvided')}`,
    `Email: ${draft.email.trim()}`, `${t('quote.fields.plan')}: ${t(quoteOptions.find(option => option.id === draft.plan)?.label || 'quote.plans.unsure')}`,
    `${t('quote.fields.budget')}: ${t(draft.budget)}`, '', t('quote.summary.description'), draft.message.trim(), '',
    t('quote.summary.closing'),
  ].join('\n')
}
