<script setup lang="ts">
import type { Faq } from '~/types/content'
defineProps<{ items: Faq[] }>()
</script>
<template>
  <section class="container detail-section detail-faq" aria-labelledby="giai-dap"><div v-reveal><p class="eyebrow">TRƯỚC KHI BẮT ĐẦU</p><h2 id="giai-dap">Câu hỏi thường gặp.</h2></div><FaqList :items="items" /></section>
</template>
