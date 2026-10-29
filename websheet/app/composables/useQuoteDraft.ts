import type { QuoteDraft } from '~/types/content'
export function useQuoteDraft() {
  return useState<QuoteDraft>('quote-draft', () => ({ name: '', company: '', email: '', plan: 'unsure', budget: 'Chưa xác định', message: '' }))
}
