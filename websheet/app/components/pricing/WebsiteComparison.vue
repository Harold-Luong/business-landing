<script setup lang="ts">
import { websitePlans } from '~/data/plans'
const rows = [
    { key: 'scope', label: 'pricing.comparison.scope' }, { key: 'management', label: 'pricing.comparison.contentManagement' },
    { key: 'delivery', label: 'pricing.comparison.estimatedTimeline' }, { key: 'warranty', label: 'pricing.comparison.bugFixWarranty' },
] as const
</script>
<template>
    <section v-reveal id="bang-gia-website" class="website-pricing" aria-labelledby="website-pricing-title">
        <div class="pricing-group-heading">
            <p class="eyebrow">{{ $t("pricing.comparison.webDesign") }}</p>
            <h2 id="website-pricing-title">{{ $t("pricing.comparison.compareLaunchBusinessCustom") }}</h2>
        </div>
        <div class="comparison-plans">
            <article v-for="plan in websitePlans" :key="plan.id" class="comparison-card"
                :class="{ 'recommended-column': plan.recommended }" :aria-labelledby="`compare-${plan.id}`">
                <div class="price-card comparison-plan" :class="{ featured: plan.recommended }">
                    <p class="plan-kicker" :class="{ recommended: plan.recommended }">{{ $t(plan.kicker) }}</p>
                    <h3 :id="`compare-${plan.id}`">{{ $t(plan.name) }}</h3>
                    <div class="price"><span>{{ $t("pricing.google.from") }}</span><strong>{{ $priceMillions(plan.startingPriceVnd)
                            }}<span> {{ $t("pricing.google.million") }}</span></strong><small>{{ $t("pricing.google.vndProject") }}</small></div>
                    <NuxtLink class="button" :class="plan.recommended ? 'button-dark' : 'button-outline'"
                        :to="$localePath('#lien-he')">{{ $t('links.choosePlan', { name: $t(plan.name) }) }} <span aria-hidden="true">↗</span>
                    </NuxtLink>
                </div>
                <dl class="comparison-facts">
                    <div v-for="row in rows" :key="row.key" class="comparison-cell">
                        <dt class="comparison-criterion">{{ $t(row.label) }}</dt>
                        <dd>{{ $t(plan[row.key]) }}</dd>
                    </div>
                </dl>
                <div class="comparison-cell">
                    <p class="comparison-criterion">{{ $t("pricing.comparison.featuresDeliverables") }}</p>
                    <details class="plan-details">
                        <summary>{{ $t("pricing.google.viewDetails") }}<span class="sr-only"> {{ $t("pricing.comparison.plan") }} {{ $t(plan.name) }}</span></summary>
                        <ul class="feature-list">
                            <li v-for="feature in plan.features" :key="feature">{{ $t(feature) }}</li>
                        </ul>
                        <NuxtLink class="price-detail-link" :to="$localePath(plan.detailHref)"><span class="link-label">{{ $t("pricing.comparison.planDetails", { name: $t(plan.name) }) }}</span> <span
                                aria-hidden="true">→</span></NuxtLink>
                    </details>
                </div>
            </article>
        </div>
        <p class="pricing-note">{{ $t("pricing.comparison.excludesDomainHostingContentThirdPartyLicenses") }}</p>
    </section>
</template>
