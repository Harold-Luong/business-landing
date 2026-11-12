<script setup lang="ts">
import { googlePlans } from '~/data/plans'
</script>
<template>
    <section id="bang-gia-google" class="automation-pricing" aria-labelledby="google-pricing-title">
        <div v-reveal class="pricing-group-heading">
            <p class="eyebrow">GOOGLE AUTOMATION</p>
            <h2 id="google-pricing-title">{{ $t("pricing.google.customGoogleSheetsAppsheetSolutions") }}</h2>
        </div>
        <div v-reveal class="custom-service-note"><strong>{{ $t("pricing.google.customDevelopmentForYourWorkflow") }}</strong>
            <p>{{ $t("pricing.google.thePricesBelowCoverDiscoveryDevelopmentAnd") }}</p>
            <p>{{ $t("pricing.google.readyMadeTemplatesCostLessPricingAnd") }}</p>
        </div>
        <div class="pricing-grid automation-grid">
            <article v-for="(plan, index) in googlePlans" v-reveal="index * 80" :key="plan.id" class="price-card"
                :aria-labelledby="`price-${plan.id}`">
                <p class="plan-kicker">{{ $t(plan.kicker) }}</p>
                <h3 :id="`price-${plan.id}`">{{ $t(plan.name) }}</h3>
                <div class="price"><span>{{ $t("pricing.google.from") }}</span><strong>{{ $priceMillions(plan.startingPriceVnd) }}<span> {{ $t("pricing.google.million") }}</span></strong><small>{{ $t("pricing.google.vndProject") }}</small></div>
                <p class="plan-scope">{{ $t(plan.scope) }}</p>
                <p class="delivery">{{ $t("pricing.google.estimated") }} {{ $t(plan.delivery) }}</p>
                <NuxtLink class="button button-outline" :to="$localePath('#lien-he')">{{ $t('links.discussService', { name: $t(plan.name) }) }} <span aria-hidden="true">↗</span></NuxtLink>
                <details class="plan-details">
                    <summary>{{ $t("pricing.google.viewDetails") }}<span class="sr-only"> {{ $t(plan.name) }}</span></summary>
                    <ul class="feature-list">
                        <li v-for="feature in plan.features" :key="feature">{{ $t(feature) }}</li>
                    </ul>
                    <NuxtLink class="price-detail-link" :to="$localePath(plan.detailHref)"><span class="link-label">{{ $t("pricing.google.serviceDetails", { name: $t(plan.name) }) }}</span> <span
                            aria-hidden="true">→</span></NuxtLink>
                </details>
            </article>
        </div>
        <p class="pricing-note">{{ $t("pricing.google.excludesAppsheetGoogleWorkspaceLicensesApisThird") }}</p>
    </section>
</template>
