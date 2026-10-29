<script setup lang="ts">
import { services } from '~/data/services'
import { serviceMeta } from '~~/shared/site'
const service = services['thiet-ke-website']
useSiteSeo(serviceMeta.find(page => page.path === '/dich-vu/thiet-ke-website/')!)
definePageMeta({ layout: 'service' })
</script>
<template>
    <main id="noi-dung">
        <ServiceHero :service="service" />
        <WebsiteGallery />
        <ThietKeWebsiteContent />
        <ServiceFaq :items="service.faqs" />
        <ServiceClosing :service="service" />
    </main>
</template>
