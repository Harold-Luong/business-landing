<script setup lang="ts">
import { websitePlans, priceMillions } from '~/data/plans'
</script>
<template>
  <div class="detail-card-grid">
    <article v-for="plan in websitePlans" :id="`goi-${plan.id}`" :key="plan.id" class="detail-card">
      <h3>{{ plan.name }} · từ {{ priceMillions(plan.startingPriceVnd) }} triệu</h3>
      <p>Tiến độ: {{ plan.delivery }}.</p>
      <ul class="detail-package-features"><li v-for="feature in plan.features" :key="feature">{{ feature }}</li></ul>
      <NuxtLink class="text-link" :to="`/?plan=${plan.id}#lien-he`" :aria-label="`Chọn gói này: ${plan.name}`">Chọn gói này <span aria-hidden="true">→</span></NuxtLink>
    </article>
  </div>
</template>
