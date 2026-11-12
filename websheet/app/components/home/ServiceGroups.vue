<template>
    <section id="dich-vu" class="section services" aria-labelledby="services-title">
        <!-- Preserve incoming links from independently deployed demos. -->
        <span id="giao-dien" class="service-samples-anchor" aria-hidden="true"></span>
        <div class="container">
            <p class="eyebrow">{{ $t("services.groups.eyebrow") }}</p>
            <h2 class="sr-only" id="services-title">{{ $t("services.groups.solutionsForYourNeeds") }}</h2>
            <div class="service-paths">
                <article v-reveal class="service-family" id="dich-vu-google" aria-labelledby="google-services-title">
                    <div class="service-family-top">
                        <span class="service-family-icon" aria-hidden="true">
                            <svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7" rx="2"></rect>
                                <rect x="14" y="14" width="7" height="7" rx="2"></rect>
                                <path d="M7 10v7h7M10 7h7v7"></path>
                            </svg>
                        </span>
                        <span class="service-family-label">{{ $t("services.groups.workflowAutomation") }}</span>
                    </div>
                    <h3 id="google-services-title">Google Automation</h3>
                    <p> {{ $t("services.groups.googleSheetsToolsBuiltWithAppsScript") }} </p>
                    <figure class="service-family-preview">
                        <div role="img" :aria-label="$t('services.groups.illustrationOfTheSheetflowOrderManagementInterface')">
                            <SheetTeaser aria-hidden="true" />
                        </div>
                        <figcaption>{{ $t("services.groups.sheetflowCustomInterfaceConcept") }}</figcaption>
                    </figure>
                    <div class="service-family-actions">
                        <NuxtLink class="service-detail-link" :to="$localePath('/dich-vu/google-automation/')"><span class="link-label">{{ $t("services.groups.exploreAutomationSolutions") }}</span> <span aria-hidden="true">↗</span></NuxtLink>
                    </div>
                </article>
                <article v-reveal="80" class="service-family" id="dich-vu-website" aria-labelledby="web-services-title">
                    <div class="service-family-top">
                        <span class="service-family-icon" aria-hidden="true">
                            <svg viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="9"></circle>
                                <ellipse cx="12" cy="12" rx="4" ry="9"></ellipse>
                                <path d="M3 12h18M5 6h14M5 18h14"></path>
                            </svg>
                        </span>
                        <span class="service-family-label">{{ $t("services.groups.websitesForBusinesses") }}</span>
                    </div>
                    <h3 id="web-services-title">Website &amp; Web App</h3>
                    <p> {{ $t("services.groups.landingPagesBusinessWebsitesAndWebApplications") }} </p>
                    <figure class="service-family-preview">
                        <AnStudioPreview />
                        <figcaption>{{ $t("services.groups.anStudioArchitectureInteriorDesignWebsiteConcept") }}</figcaption>
                    </figure>
                    <div class="service-family-actions">
                        <NuxtLink class="service-detail-link" :to="$localePath('/dich-vu/thiet-ke-website/')"><span class="link-label">{{ $t("services.groups.exploreWebDesignServices") }}</span> <span
                                aria-hidden="true">↗</span></NuxtLink>
                    </div>
                </article>
            </div>
            <p v-reveal class="service-samples-note"> {{ $t("services.groups.illustrativeInterfacesExploreConceptsOnEachService") }} </p>
        </div>
    </section>
</template>
