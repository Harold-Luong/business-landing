import { quoteOptions } from '~/data/plans'
import { samples } from '~/data/samples'
import type { QuotePlanId } from '~/types/content'
export function useQuoteSelection() {
  const draft = useQuoteDraft()
  function selectPlan(value: unknown) {
    if (typeof value === 'string' && quoteOptions.some(plan => plan.id === value)) draft.value.plan = value as QuotePlanId
  }
  function applyQuery(plan: unknown, concept: unknown) {
    selectPlan(plan)
    const sample = typeof concept === 'string' ? samples.find(sample => sample.id === concept) : undefined
    if (!sample) return
    draft.value.plan = sample.plan
    const sentence = `Tôi quan tâm đến hướng thiết kế ${sample.name} — ${sample.description}.`
    if (!draft.value.message.includes(sentence)) draft.value.message = `${draft.value.message.trim()}${draft.value.message.trim() ? '\n' : ''}${sentence}`.slice(0, 3000)
  }
  return { selectPlan, applyQuery }
}
