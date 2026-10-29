<script setup lang="ts">
withDefaults(defineProps<{ to?: string }>(), { to: '/' })
</script>
<template>
  <NuxtLink class="brand" :to="to" aria-label="WebSheet — Trang chủ">
    <svg class="websheet-mark" width="39" height="39" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="7" fill="currentColor" /><path d="m8 12 5 17 7-12 7 12 5-17" fill="none" stroke="#fdfefb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
    <span>WebSheet<span class="brand-sub">WEBSITE & GOOGLE SHEETS</span></span>
  </NuxtLink>
</template>
