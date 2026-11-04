<script setup lang="ts">
import { planById } from '~/data/plans'
</script>

<template>
    <div>
        <section class="container detail-section" aria-labelledby="giai-phap">
            <div v-reveal class="detail-copy">
                <p class="eyebrow">{{ $t("automation.googleSheetsToolsTwoApproaches") }}</p>
                <h2 id="giai-phap">{{ $t("automation.whichTasksWouldYouLikeToAutomate") }}</h2>
                <p>{{ $t("automation.googleSheetsToolsIncludeAppsScriptAnd") }}</p>
            </div>
            <div class="detail-card-grid-gg automation-solutions">
                <article v-reveal class="detail-card">
                    <h3>Google Apps Script</h3>
                    <p>{{ $t("automation.suitableForConsolidatingDataCreatingReportsOr") }}</p>
                    <ul class="detail-package-features">
                        <li>{{ $t("automation.customBuiltFrom") }} {{ $priceMillions(planById['apps-script'].startingPriceVnd) }} {{ $t("automation.millionVndProject") }}</li>
                        <li>{{ $t(planById['apps-script'].scope) }}</li>
                        <li>{{ $t("pricing.google.estimated") }} {{ $t(planById['apps-script'].delivery) }}</li>
                    </ul>
                    <NuxtLink class="text-link" :to="$localePath('/dich-vu/google-apps-script/')">{{ $t("automation.exploreAppsScript") }} <span
                            aria-hidden="true">↗</span></NuxtLink>
                </article>
                <article v-reveal class="detail-card">
                    <h3>{{ $t("automation.appsheetApps") }}</h3>
                    <p>{{ $t("automation.suitableWhenTeamsNeedDataEntryScreens") }}</p>
                    <ul class="detail-package-features">
                        <li>{{ $t("automation.customBuiltFrom") }} {{ $priceMillions(planById['appsheet'].startingPriceVnd) }} {{ $t("automation.millionVndProject") }}</li>
                        <li>{{ $t(planById['appsheet'].scope) }}</li>
                        <li>{{ $t("pricing.google.estimated") }} {{ $t(planById['appsheet'].delivery) }}</li>
                    </ul>
                    <NuxtLink class="text-link" :to="$localePath('/dich-vu/appsheet/')">{{ $t("automation.exploreAppsheet") }} <span
                            aria-hidden="true">↗</span></NuxtLink>
                </article>
            </div>
        </section>
        <section v-reveal class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div>
                    <p class="eyebrow">{{ $t("automation.limitsAdditionalCosts") }}</p>
                    <h2 id="pham-vi">{{ $t("automation.whatShapes") }}<br>{{ $t("automation.yourChoiceOfSolution") }}</h2>
                    <p>{{ $t("automation.indicativePricesExcludeAppsheetGoogleWorkspaceLicenses") }}</p>
                </div>
                <ul>
                    <li>{{ $t("automation.appsScriptDataVolumeExecutionFrequencyAnd") }}</li>
                    <li>{{ $t("automation.appsheetUserNumbersScreensAndAccessPermissions") }}</li>
                    <li>{{ $t("automation.combiningSolutionsOrConnectingExternalApisRequires") }}</li>
                </ul>
            </div>
        </section>
    </div>
</template>
