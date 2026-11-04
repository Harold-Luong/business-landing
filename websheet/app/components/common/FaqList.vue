<script setup lang="ts">
import type { Faq } from '~/types/content'
defineProps<{ items: Faq[], firstOpen?: boolean }>()
</script>
<template>
  <div v-reveal class="faq-list">
    <details v-for="(item, index) in items" :key="item.question" :open="firstOpen && index === 0">
      <summary>{{ $t(item.question) }}</summary>
      <p v-for="(paragraph, i) in item.paragraphs" :key="i"><template v-for="(segment, j) in paragraph" :key="j">{{ j > 0 ? ' ' : '' }}<NuxtLink v-if="segment.href" :to="$localePath(segment.href)">{{ $t(segment.text) }}</NuxtLink><template v-else>{{ $t(segment.text) }}</template></template></p>
    </details>
  </div>
</template>
