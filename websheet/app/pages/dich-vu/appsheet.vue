<script setup lang="ts">
import { services } from '~/data/services'
import { serviceMeta } from '~~/shared/site'
const service = services['appsheet']
useSiteSeo(serviceMeta.find(page => page.path === '/dich-vu/appsheet/')!)
definePageMeta({ layout: 'service' })
</script>
<template>
  <main id="noi-dung">
    <ServiceHero :service="service" />
    
    <AppsheetContent />
    <ServiceFaq :items="service.faqs" />
    <ServiceClosing :service="service" />
  </main>
</template>
