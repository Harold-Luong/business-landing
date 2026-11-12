<script setup lang="ts">
import { websitePlans } from '~/data/plans'
</script>
<template>
  <div class="detail-card-grid">
    <article v-for="(plan, index) in websitePlans" v-reveal="index * 80" :id="`goi-${plan.id}`" :key="plan.id" class="detail-card">
      <h3>{{ $t(plan.name) }} {{ $t("services.plans.from") }} {{ $priceMillions(plan.startingPriceVnd) }} {{ $t("pricing.google.million") }}</h3>
      <p>{{ $t("services.plans.timeline") }} {{ $t(plan.delivery) }}.</p>
      <ul class="detail-package-features"><li v-for="feature in plan.features" :key="feature">{{ $t(feature) }}</li></ul>
      <NuxtLink class="text-link" :to="$localePath(`/?plan=${plan.id}#lien-he`)">{{ $t('links.choosePlan', { name: $t(plan.name) }) }} <span aria-hidden="true">→</span></NuxtLink>
    </article>
  </div>
</template>
