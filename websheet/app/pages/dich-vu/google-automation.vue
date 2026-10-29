<script setup lang="ts">
import { services } from '~/data/services'
import { serviceMeta } from '~~/shared/site'
const service = services['google-automation']
useSiteSeo(serviceMeta.find(page => page.path === '/dich-vu/google-automation/')!)
definePageMeta({ layout: 'service' })
</script>
<template>
    <main id="noi-dung">
        <ServiceHero :service="service" />

        <GoogleAutomationContent />
        <ServiceFaq :items="service.faqs" />
        <ServiceClosing :service="service" />
    </main>
</template>
