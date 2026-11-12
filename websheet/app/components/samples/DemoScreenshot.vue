<script setup lang="ts">
import type { bundledDemoUrls } from '~~/shared/demos'
const props = defineProps<{ sampleId: keyof typeof bundledDemoUrls }>()
const names = { aster: 'Aster S5', 'an-studio': 'An Studio', orbit: 'Orbit' }
</script>

<template>
    <img class="demo-screenshot" :src="`/previews/${props.sampleId}-desktop.webp`"
        :alt="$t('preview.demoScreenshot', { name: names[props.sampleId] })"
        width="1440" height="1000" loading="lazy" decoding="async">
</template>

<style scoped>
.demo-screenshot {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 36 / 25;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: #f5f5f0;
}
</style>
