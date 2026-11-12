<script setup lang="ts">
import type { ServiceContent } from '~/types/content'
defineProps<{ service: ServiceContent }>()
</script>
<template>
  <section v-reveal class="container detail-cta" aria-labelledby="tu-van"><div><h2 id="tu-van">{{ $t(service.ctaTitle) }}</h2><p>{{ $t(service.ctaText) }}</p></div><NuxtLink class="button button-dark" :to="$localePath(`/?plan=${service.plan}#lien-he`)">{{ $t('links.discussService', { name: $t(service.name) }) }} <span aria-hidden="true">↗</span></NuxtLink></section>
</template>
