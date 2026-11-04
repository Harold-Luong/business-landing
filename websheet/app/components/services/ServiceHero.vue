<script setup lang="ts">
import type { ServiceContent } from '~/types/content'
import { planById } from '~/data/plans'
defineProps<{ service: ServiceContent }>()
</script>
<template>
  <div class="detail-intro"><div class="container">
    <nav class="breadcrumb" :aria-label="$t('services.hero.breadcrumb')"><NuxtLink :to="$localePath('/')">{{ $t("services.hero.home") }}</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">{{ $t(service.name) }}</span></nav>
    <div class="detail-hero-grid" :class="{ 'detail-hero-simple': !service.estimate }">
      <div v-reveal>
        <p class="eyebrow">{{ $t(service.eyebrow) }}</p>
        <h1><template v-for="(line, index) in service.title" :key="index"><br v-if="index">{{ $t(line) }}</template></h1>
        <p class="detail-lead">{{ $t(service.lead) }}</p>
        <div v-if="service.gallery" class="detail-intro-actions"><NuxtLink class="text-link" :to="$localePath('#mau-giao-dien')">{{ $t("services.hero.exploreDesignConcepts") }} <span aria-hidden="true">↓</span></NuxtLink></div>
      </div>
      <aside v-if="service.estimate" v-reveal class="detail-estimate" :aria-label="$t('services.hero.indicativeCostAndScope')">
        <p class="eyebrow">{{ $t(service.estimate.label) }}</p>
        <p class="detail-price">{{ $t("pricing.google.from") }} <strong>{{ $priceMillions(planById[service.estimate.pricePlan].startingPriceVnd) }} <span>{{ $t("pricing.google.million") }}</span></strong> {{ $t("pricing.google.vndProject") }}</p>
        <dl><div v-for="fact in service.estimate.facts" :key="fact.label"><dt>{{ $t(fact.label) }}</dt><dd>{{ $t(fact.value) }}</dd></div></dl>
        <p>{{ $t(service.estimate.note) }}</p>
      </aside>
    </div>
  </div></div>
</template>
