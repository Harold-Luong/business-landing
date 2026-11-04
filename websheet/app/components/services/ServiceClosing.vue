<script setup lang="ts">
import type { ServiceContent } from '~/types/content'
defineProps<{ service: ServiceContent }>()
</script>
<template>
  <section v-reveal class="container detail-cta" aria-labelledby="tu-van"><div><h2 id="tu-van">{{ $t(service.ctaTitle) }}</h2><p>{{ $t(service.ctaText) }}</p></div><NuxtLink class="button button-dark" :to="$localePath(`/?plan=${service.plan}#lien-he`)">{{ $t("pricing.google.discussYourRequirements") }} <span aria-hidden="true">↗</span></NuxtLink></section>
  <nav class="container detail-related" :aria-label="$t('services.closing.relatedServices')"><p class="eyebrow">{{ $t("services.closing.exploreOtherServices") }}</p><div><NuxtLink v-for="link in service.related" :key="link.href" :to="$localePath(link.href)">{{ $t(link.label) }} <span aria-hidden="true">↗</span></NuxtLink></div></nav>
</template>
