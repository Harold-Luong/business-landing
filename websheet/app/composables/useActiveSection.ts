import { navigation } from '~/data/site'
export function useActiveSection(header: Ref<HTMLElement | null>) {
  const active = ref('')
  let dispose = () => {}
  onMounted(() => {
    let frame = 0
    let alive = true
    function update() {
      frame = 0
      const marker = (header.value?.getBoundingClientRect().bottom || 80) + 24
      const sections = navigation.map(item => ({ id: item.id, bounds: document.getElementById(item.id)?.getBoundingClientRect() }))
      active.value = sections.find(item => item.bounds && item.bounds.top <= marker && item.bounds.bottom > marker)?.id || ''
      const last = sections.at(-1)
      if (Math.ceil(window.scrollY + innerHeight) >= document.documentElement.scrollHeight - 2 && last?.bounds && last.bounds.top < innerHeight) active.value = last.id
    }
    const schedule = () => { if (alive && !frame) frame = requestAnimationFrame(update) }
    const events = ['scroll', 'resize', 'hashchange', 'pageshow', 'load']
    for (const event of events) window.addEventListener(event, schedule, { passive: true })
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    document.fonts.ready.then(schedule)
    schedule()
    dispose = () => {
      alive = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      for (const event of events) window.removeEventListener(event, schedule)
    }
  })
  onBeforeUnmount(() => dispose())
  return active
}
