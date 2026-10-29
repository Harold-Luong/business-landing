<script setup lang="ts">
import type { ServiceContent } from '~/types/content'
defineProps<{ service: ServiceContent }>()
</script>
<template>
  <section class="detail-cta" aria-labelledby="tu-van"><div class="container"><div><h2 id="tu-van">{{ service.ctaTitle }}</h2><p>{{ service.ctaText }}</p></div><NuxtLink class="button button-dark" :to="`/?plan=${service.plan}#lien-he`">Tạo yêu cầu tư vấn <span aria-hidden="true">↗</span></NuxtLink></div></section>
  <nav class="container detail-related" aria-label="Dịch vụ liên quan"><p class="eyebrow">KHÁM PHÁ DỊCH VỤ KHÁC</p><div><NuxtLink v-for="link in service.related" :key="link.href" :to="link.href">{{ link.label }} <span aria-hidden="true">↗</span></NuxtLink></div></nav>
</template>
