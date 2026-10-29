<script setup lang="ts">
import type { Faq } from '~/types/content'
defineProps<{ items: Faq[], firstOpen?: boolean }>()
</script>
<template>
  <div class="faq-list">
    <details v-for="(item, index) in items" :key="item.question" :open="firstOpen && index === 0">
      <summary>{{ item.question }}</summary>
      <p v-for="(paragraph, i) in item.paragraphs" :key="i"><template v-for="(segment, j) in paragraph" :key="j"><NuxtLink v-if="segment.href" :to="segment.href">{{ segment.text }}</NuxtLink><template v-else>{{ segment.text }}</template></template></p>
    </details>
  </div>
</template>
