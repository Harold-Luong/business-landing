<script setup lang="ts">
import { services } from '~/data/services'
import { serviceMeta } from '~~/shared/site'
const service = services['google-apps-script']
useSiteSeo(serviceMeta.find(page => page.path === '/dich-vu/google-apps-script/')!)
definePageMeta({ layout: 'service' })
</script>
<template>
  <main id="noi-dung">
    <ServiceHero :service="service" />
    <SheetFlowPreview />
    <GoogleAppsScriptContent />
    <ServiceFaq :items="service.faqs" />
    <ServiceClosing :service="service" />
  </main>
</template>
