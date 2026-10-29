export type ServicePlanId = 'launch' | 'business' | 'custom' | 'apps-script' | 'appsheet'
export type QuotePlanId = ServicePlanId | 'unsure' | 'automation' | 'website'
export type SampleId = 'aster' | 'an-studio' | 'orbit' | 'sheetflow'
export type ServicePlan = {
  id: ServicePlanId
  name: string
  category: 'google' | 'website'
  startingPriceVnd: number
  formLabel: string
  kicker: string
  features: string[]
  detailHref: string
  recommended: boolean
  scope: string
  management?: string
  delivery: string
  warranty: string
}
export type Faq = { question: string, paragraphs: { text: string, href?: string }[][] }
export type ServiceContent = {
  name: string
  plan: string
  eyebrow: string
  title: string[]
  lead: string
  estimate: {
    label: string
    facts: { label: string, value: string }[]
    note: string
    pricePlan: ServicePlanId | null
    heading?: string[]
  }
  gallery: boolean
  faqs: Faq[]
  ctaTitle: string
  ctaText: string
  related: { label: string, href: string }[]
}
export type QuoteDraft = { name: string, company: string, email: string, plan: QuotePlanId, budget: string, message: string }
