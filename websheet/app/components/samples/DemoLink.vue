<script setup lang="ts">
import type { SampleId } from '~/types/content'
withDefaults(defineProps<{ sampleId: SampleId, label?: string }>(), { label: 'common.viewDemo' })
const urls = useDemoUrls()
</script>
<template>
    <a v-if="urls[sampleId]" class="text-link" :href="urls[sampleId]" target="_blank" rel="noopener noreferrer"
        :aria-label="`${$t(label)}, ${$t('common.opensInNewTab')}`">{{ $t(label) }} <span aria-hidden="true">↗</span></a>
    <span v-else class="demo-pending">{{ $t("demo.demoComingSoon") }}</span>
</template>
