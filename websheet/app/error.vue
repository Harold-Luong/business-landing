<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
useSeoMeta({ title: 'Không tìm thấy trang | WebSheet', robots: 'noindex, follow' })
</script>
<template>
  <main class="container section error-page">
    <BrandMark />
    <p class="eyebrow">{{ error.statusCode }}</p>
    <h1>{{ error.statusCode === 404 ? 'Trang bạn tìm chưa có ở đây.' : 'Không thể mở trang lúc này.' }}</h1>
    <p>Khám phá dịch vụ thiết kế website và Google Sheets theo yêu cầu.</p>
    <a class="button button-dark" href="/">Về trang chủ <span aria-hidden="true">↗</span></a>
  </main>
</template>
