<script setup lang="ts">
withDefaults(defineProps<{ to?: string }>(), { to: '/' })
</script>
<template>
  <NuxtLink class="brand" :to="$localePath(to)" :aria-label="$t('brand.websheetHome')">
    <img class="websheet-mark" src="/brand/websheet-mark.png" width="39" height="39" alt="" decoding="async">
    <span>WebSheet<span class="brand-sub">WEBSITE & GOOGLE SHEETS</span></span>
  </NuxtLink>
</template>
