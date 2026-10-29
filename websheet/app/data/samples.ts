import type { SampleId, ServicePlanId } from '~/types/content'
export const samples: { id: SampleId, name: string, description: string, plan: ServicePlanId }[] = [
  { id: 'aster', name: 'Aster S5', description: 'Landing page ô tô', plan: 'launch' },
  { id: 'an-studio', name: 'An Studio', description: 'Kiến trúc & nội thất', plan: 'business' },
  { id: 'orbit', name: 'Orbit', description: 'Công nghệ & SaaS', plan: 'custom' },
  { id: 'sheetflow', name: 'SheetFlow', description: 'Quản lý đơn hàng trên Google Sheets', plan: 'apps-script' },
]
export const sampleQuoteHref = (sample: typeof samples[number]) => `/?concept=${sample.id}&plan=${sample.plan}#quote-form`
