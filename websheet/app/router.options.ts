import type { RouterConfig } from '@nuxt/schema'
export default <RouterConfig>{
  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // A bare hash means page top, not an element to wait for during navigation.
    if (to.hash === '#') return { top: 0, left: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }
    if (!to.hash) return to.path !== from.path ? { top: 0 } : undefined
    // Page/layout DOM can mount after the route changes during hydration or navigation.
    for (let attempt = 0; attempt < 40; attempt++) {
      const target = document.getElementById(to.hash === '#quote-form' ? 'lien-he' : decodeURIComponent(to.hash.slice(1)))
      if (target) {
        if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true })
        return { el: target, top: parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 100, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }
      }
      await new Promise(resolve => setTimeout(resolve, 25))
    }
    return { top: 0 }
  },
}
