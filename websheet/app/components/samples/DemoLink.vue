<script setup lang="ts">
import type { SampleId } from '~/types/content'
withDefaults(defineProps<{ sampleId: SampleId, label?: string }>(), { label: 'Xem demo' })
const urls = useDemoUrls()
</script>
<template>
    <a v-if="urls[sampleId]" class="text-link" :href="urls[sampleId]" target="_blank" rel="noopener noreferrer"
        :aria-label="`${label}, mở trong tab mới`">{{ label }} <span aria-hidden="true">↗</span></a>
    <span v-else class="demo-pending">Demo đang chuẩn bị</span>
</template>
