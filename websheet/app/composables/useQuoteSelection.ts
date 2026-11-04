import { quoteOptions } from '~/data/plans'
import { samples } from '~/data/samples'
import type { QuotePlanId } from '~/types/content'
import { translate } from '~~/shared/i18n'
export function useQuoteSelection() {
  const draft = useQuoteDraft()
  const { locale } = useLocale()
  function selectPlan(value: unknown) {
    if (typeof value === 'string' && quoteOptions.some(plan => plan.id === value)) draft.value.plan = value as QuotePlanId
  }
  function applyQuery(plan: unknown, concept: unknown) {
    selectPlan(plan)
    const sample = typeof concept === 'string' ? samples.find(sample => sample.id === concept) : undefined
    if (!sample) return
    draft.value.plan = sample.plan
    const sentence = (language: 'vi' | 'en') => translate('quote.conceptInterest', language, {
      name: sample.name,
      description: translate(sample.description, language),
    })
    const sentences = { vi: sentence('vi'), en: sentence('en') }
    if (!Object.values(sentences).some(sentence => draft.value.message.includes(sentence))) {
      draft.value.message = `${draft.value.message.trim()}${draft.value.message.trim() ? '\n' : ''}${sentences[locale.value]}`.slice(0, 3000)
    }
  }
  return { selectPlan, applyQuery }
}
