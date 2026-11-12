import type { SampleId, ServicePlanId } from '~/types/content'
export const samples: { id: SampleId, name: string, description: string, plan: ServicePlanId, features?: string }[] = [
  { id: 'aster', features: 'gallery.asterFeatures', name: 'Aster S5', description: 'samples.automotiveLandingPage', plan: 'launch' },
  { id: 'an-studio', features: 'gallery.anStudioFeatures', name: 'An Studio', description: 'samples.architectureInteriors', plan: 'business' },
  { id: 'orbit', features: 'gallery.orbitFeatures', name: 'Orbit', description: 'samples.technologySaas', plan: 'custom' },
  { id: 'sheetflow', name: 'SheetFlow', description: 'samples.orderManagementInGoogleSheets', plan: 'apps-script' },
]
export const sampleQuoteHref = (sample: typeof samples[number]) => `/?concept=${sample.id}&plan=${sample.plan}#lien-he`
