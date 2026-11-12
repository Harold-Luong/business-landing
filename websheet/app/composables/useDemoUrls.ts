import type { SampleId } from '~/types/content'
import { validateUrl } from '~~/shared/config'
import { bundledDemoUrls } from '~~/shared/demos'
export function useDemoUrls() {
  const config = useRuntimeConfig().public
  return computed<Record<SampleId, string>>(() => ({
    aster: validateUrl(config.asterDemoUrl, 'NUXT_PUBLIC_ASTER_DEMO_URL') || bundledDemoUrls.aster,
    'an-studio': validateUrl(config.anStudioDemoUrl, 'NUXT_PUBLIC_AN_STUDIO_DEMO_URL') || bundledDemoUrls['an-studio'],
    orbit: validateUrl(config.orbitDemoUrl, 'NUXT_PUBLIC_ORBIT_DEMO_URL') || bundledDemoUrls.orbit,
    sheetflow: validateUrl(config.sheetsDemoUrl, 'NUXT_PUBLIC_SHEETS_DEMO_URL'),
  }))
}
