<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
const { t, locale } = useLocale()
useSeoMeta({ title: () => t('error.pageNotFoundWebsheet'), robots: 'noindex, follow' })
useHead(() => ({ htmlAttrs: { lang: locale.value } }))
</script>
<template>
  <main class="container section error-page">
    <BrandMark />
    <p class="eyebrow">{{ error.status }}</p>
    <h1>{{ $t(error.status === 404 ? 'error.thisPageIsnTHereYet' : 'error.thisPageIsUnavailableRightNow') }}</h1>
    <p>{{ $t("error.exploreCustomWebsiteAndGoogleSheetsServices") }}</p>
    <a class="button button-dark" :href="$localePath('/')">{{ $t("error.backToHome") }} <span aria-hidden="true">↗</span></a>
  </main>
</template>
