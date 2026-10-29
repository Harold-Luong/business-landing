<script setup lang="ts">
import { serviceMeta } from '~~/shared/site'
const route = useRoute()
const page = computed(() => serviceMeta.find(page => page.path.replace(/\/$/, '') === route.path.replace(/\/$/, '')))
</script>
<template>
  <header class="detail-header">
    <div class="container detail-nav">
      <BrandMark />
      <nav aria-label="Điều hướng chính">
        <NuxtLink to="/#dich-vu" aria-current="true">Dịch vụ</NuxtLink>
        <NuxtLink :to="page?.plan === 'launch' ? '/#bang-gia-website' : '/#bang-gia-google'">Bảng giá</NuxtLink>
        <NuxtLink class="button button-small" :to="`/?plan=${page?.plan || 'unsure'}#lien-he`">Liên hệ <span aria-hidden="true">↗</span></NuxtLink>
      </nav>
    </div>
  </header>
</template>
