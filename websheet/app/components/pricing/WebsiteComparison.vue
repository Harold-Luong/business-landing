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
        <p id="comparison-hint" class="comparison-hint">{{ $t("pricing.comparison.swipeHorizontallyOrUseTheArrowKeys") }} <span aria-hidden="true">↔</span></p>
        <div class="comparison-scroll" role="region" aria-labelledby="website-pricing-title"
            aria-describedby="comparison-hint" tabindex="0">
            <table class="comparison-table">
                <caption class="sr-only">{{ $t("pricing.comparison.comparePricingScopeContentManagementTimelinesAnd") }}</caption>
                <colgroup>
                    <col>
                    <col>
                    <col>
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="plan in websitePlans" :id="`compare-${plan.id}`" :key="plan.id" scope="col"
                            :class="{ 'recommended-column': plan.recommended }">
                            <div class="price-card comparison-plan" :class="{ featured: plan.recommended }">
                                <p class="plan-kicker" :class="{ recommended: plan.recommended }">{{ $t(plan.kicker) }}</p>
                                <h3>{{ $t(plan.name) }}</h3>
                                <div class="price"><span>{{ $t("pricing.google.from") }}</span><strong>{{ $priceMillions(plan.startingPriceVnd)
                                        }}<span> {{ $t("pricing.google.million") }}</span></strong><small>{{ $t("pricing.google.vndProject") }}</small></div>
                                <NuxtLink class="button" :class="plan.recommended ? 'button-dark' : 'button-outline'"
                                    :to="$localePath('#lien-he')" :aria-label="`${$t('pricing.comparison.chooseThisPlan')}: ${$t(plan.name)}`">{{ $t("pricing.comparison.chooseThisPlan") }} <span aria-hidden="true">↗</span>
                                </NuxtLink>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in rows" :key="row.key">
                        <td v-for="plan in websitePlans" :key="plan.id" :headers="`compare-${plan.id}`"
                            :class="{ 'recommended-column': plan.recommended }"><span class="comparison-criterion">{{
                                $t(row.label) }}</span>{{ $t(plan[row.key]) }}</td>
                    </tr>
                    <tr>
                        <td v-for="plan in websitePlans" :key="plan.id" :headers="`compare-${plan.id}`"
                            :class="{ 'recommended-column': plan.recommended }"><span class="comparison-criterion">{{ $t("pricing.comparison.featuresDeliverables") }}</span>
                            <details class="plan-details">
                                <summary>{{ $t("pricing.google.viewDetails") }}<span class="sr-only"> {{ $t("pricing.comparison.plan") }} {{ $t(plan.name) }}</span></summary>
                                <ul class="feature-list">
                                    <li v-for="feature in plan.features" :key="feature">{{ $t(feature) }}</li>
                                </ul>
                                <NuxtLink class="price-detail-link" :to="$localePath(plan.detailHref)">{{ $t("pricing.google.servicePage") }} <span
                                        aria-hidden="true">→</span></NuxtLink>
                            </details>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="pricing-note">{{ $t("pricing.comparison.excludesDomainHostingContentThirdPartyLicenses") }}</p>
    </section>
</template>
