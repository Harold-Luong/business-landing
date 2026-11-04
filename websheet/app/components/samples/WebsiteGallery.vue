<script setup lang="ts">
import { samples, sampleQuoteHref } from '~/data/samples'
import { planById } from '~/data/plans'
import AsterPreview from './AsterPreview.vue'
import AnStudioPreview from './AnStudioPreview.vue'
import OrbitPreview from './OrbitPreview.vue'
const cards = samples.filter(sample => sample.id !== 'sheetflow')
const previews = { aster: AsterPreview, 'an-studio': AnStudioPreview, orbit: OrbitPreview }
const urls = useDemoUrls()
</script>
<template>
    <section id="mau-giao-dien" class="container detail-section service-samples"
        aria-labelledby="website-samples-title">
        <div v-reveal class="section-heading">
            <div>
                <p class="eyebrow">{{ $t("gallery.websiteConcepts") }}</p>
                <h2 id="website-samples-title">{{ $t("gallery.findTheRightVisualDirection") }}</h2>
            </div>
            <p>{{ $t("gallery.exploreLandingPagesBusinessWebsitesAndWeb") }}</p>
        </div>
        <div class="work-grid">
            <article v-for="(sample, index) in cards" v-reveal="index * 80" :key="sample.id" class="work-card">
                <a v-if="urls[sample.id]" :href="urls[sample.id]" target="_blank" rel="noopener noreferrer"
                    :aria-label="`${$t('common.viewDemo')} ${sample.name}, ${$t('common.opensInNewTab')}`">
                    <component :is="previews[sample.id as keyof typeof previews]" />
                </a>
                <component :is="previews[sample.id as keyof typeof previews]" v-else />
                <div class="work-caption">
                    <div>
                        <h3>{{ $t(sample.name) }}</h3>
                        <p>{{ $t(sample.description) }}</p>
                    </div><span>{{ $t(planById[sample.plan].name) }}</span>
                </div>
                <div class="work-actions">
                    <DemoLink :sample-id="sample.id" />
                    <NuxtLink class="text-link" :to="$localePath(sampleQuoteHref(sample))">{{ $t("gallery.chooseThisConcept") }} <span
                            aria-hidden="true">→</span></NuxtLink>
                </div>
            </article>
        </div>
        <p class="showcase-note"><span aria-hidden="true">✳</span> {{ $t("gallery.websiteConceptsIllustrateTheDifferentPlansCms") }}</p>
    </section>
</template>
