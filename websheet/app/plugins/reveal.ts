import type { Directive } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const elements = new Set<HTMLElement>()
  let observer: IntersectionObserver | undefined
  let motion: MediaQueryList | undefined

  function reveal(element: HTMLElement, animate = true) {
    observer?.unobserve(element)
    element.dataset.revealState = animate ? 'visible' : 'done'
  }

  if (import.meta.client) {
    motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (typeof window.IntersectionObserver === 'function') {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement
          if (entry.isIntersecting && element.dataset.revealState === 'pending') reveal(element, !motion?.matches)
        }
      }, { threshold: 0 })
    }

    const reduceMotion = () => {
      if (motion?.matches) for (const element of elements) reveal(element, false)
    }
    // Keyboard navigation must never focus an invisible link or form control.
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return
      for (const element of elements) {
        if (element.contains(event.target)) reveal(element, false)
      }
    }
    motion.addEventListener('change', reduceMotion)
    document.addEventListener('focusin', focus)
    const dispose = () => {
      observer?.disconnect()
      motion?.removeEventListener('change', reduceMotion)
      document.removeEventListener('focusin', focus)
      for (const element of elements) {
        delete element.dataset.revealState
        element.style.removeProperty('--reveal-delay')
      }
      elements.clear()
    }
    nuxtApp.vueApp.onUnmount(dispose)
    if (import.meta.hot) import.meta.hot.dispose(dispose)
  }

  const directive: Directive<HTMLElement, number | undefined> = {
    // Prerendered/no-JS content stays visible; only mounted elements can be hidden.
    getSSRProps: () => ({}),
    mounted(element, binding) {
      if (!observer || motion?.matches) return
      elements.add(element)
      // Keep the initial viewport, restored scroll position and focused content visible.
      if (element.getBoundingClientRect().top < window.innerHeight || element.contains(document.activeElement)) return
      const delay = Number.isFinite(binding.value) ? Math.min(180, Math.max(0, binding.value!)) : 0
      element.style.setProperty('--reveal-delay', `${delay}ms`)
      element.dataset.revealState = 'pending'
      observer.observe(element)
    },
    beforeUnmount(element) {
      observer?.unobserve(element)
      elements.delete(element)
      delete element.dataset.revealState
      element.style.removeProperty('--reveal-delay')
    },
  }
  nuxtApp.vueApp.directive('reveal', directive)
})
