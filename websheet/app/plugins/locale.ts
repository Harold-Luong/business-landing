export default defineNuxtPlugin(() => {
  const { t, localePath, priceMillions } = useLocale()
  return { provide: { t, localePath, priceMillions } }
})
