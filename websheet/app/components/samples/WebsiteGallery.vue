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
                <p class="eyebrow">MẪU WEBSITE</p>
                <h2 id="website-samples-title">Chọn hướng giao diện phù hợp.</h2>
            </div>
            <p>Khám phá landing page, website doanh nghiệp và web app theo từng phạm vi dịch vụ.</p>
        </div>
        <div class="work-grid">
            <article v-for="(sample, index) in cards" v-reveal="index * 80" :key="sample.id" class="work-card">
                <a v-if="urls[sample.id]" :href="urls[sample.id]" target="_blank" rel="noopener noreferrer"
                    :aria-label="`Xem demo ${sample.name}, mở trong tab mới`">
                    <component :is="previews[sample.id as keyof typeof previews]" />
                </a>
                <component :is="previews[sample.id as keyof typeof previews]" v-else />
                <div class="work-caption">
                    <div>
                        <h3>{{ sample.name }}</h3>
                        <p>{{ sample.description }}</p>
                    </div><span>{{ planById[sample.plan].name }}</span>
                </div>
                <div class="work-actions">
                    <DemoLink :sample-id="sample.id" />
                    <NuxtLink class="text-link" :to="sampleQuoteHref(sample)">Chọn mẫu này <span
                            aria-hidden="true">→</span></NuxtLink>
                </div>
            </article>
        </div>
        <p class="showcase-note"><span aria-hidden="true">✳</span> Các mẫu website minh họa theo từng gói. CMS, backend
            và tích hợp được triển khai theo phạm vi thỏa thuận.</p>
    </section>
</template>
