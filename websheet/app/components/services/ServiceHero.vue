<script setup lang="ts">
import type { ServiceContent } from '~/types/content'
import { planById, priceMillions } from '~/data/plans'
defineProps<{ service: ServiceContent }>()
</script>
<template>
  <div class="detail-intro"><div class="container">
    <nav class="breadcrumb" aria-label="Đường dẫn"><NuxtLink to="/">Trang chủ</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">{{ service.name }}</span></nav>
    <div class="detail-hero-grid" :class="{ 'detail-hero-simple': !service.estimate }">
      <div v-reveal>
        <p class="eyebrow">{{ service.eyebrow }}</p>
        <h1><template v-for="(line, index) in service.title" :key="index"><br v-if="index">{{ line }}</template></h1>
        <p class="detail-lead">{{ service.lead }}</p>
        <div v-if="service.gallery" class="detail-intro-actions"><NuxtLink class="text-link" to="#mau-giao-dien">Xem mẫu giao diện <span aria-hidden="true">↓</span></NuxtLink></div>
      </div>
      <aside v-if="service.estimate" v-reveal class="detail-estimate" aria-label="Chi phí và phạm vi tham khảo">
        <p class="eyebrow">{{ service.estimate.label }}</p>
        <p class="detail-price">Từ <strong>{{ priceMillions(planById[service.estimate.pricePlan].startingPriceVnd) }} <span>triệu</span></strong> VNĐ / dự án</p>
        <dl><div v-for="fact in service.estimate.facts" :key="fact.label"><dt>{{ fact.label }}</dt><dd>{{ fact.value }}</dd></div></dl>
        <p>{{ service.estimate.note }}</p>
      </aside>
    </div>
  </div></div>
</template>
