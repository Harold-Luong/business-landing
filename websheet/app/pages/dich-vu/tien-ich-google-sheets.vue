<script setup lang="ts">
import { services } from '~/data/services'
import { serviceMeta } from '~~/shared/site'
const service = services['tien-ich-google-sheets']
useSiteSeo(serviceMeta.find(page => page.path === '/dich-vu/tien-ich-google-sheets/')!)
definePageMeta({ layout: 'service' })
</script>
<template>
    <main id="noi-dung">
        <ServiceHero :service="service" />

        <TienIchGoogleSheetsContent />
        <ServiceFaq :items="service.faqs" />
        <ServiceClosing :service="service" />
    </main>
</template>
