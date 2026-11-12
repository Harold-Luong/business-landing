<template>
    <div>
        <section class="container detail-section" aria-labelledby="giai-phap">
            <div v-reveal class="detail-copy">
                <p class="eyebrow">{{ $t("website.customWebDesignPlans") }}</p>
                <h2 id="giai-phap">{{ $t("website.compareTheThreeWebsitePlans") }}</h2>
                <p> {{ $t("website.launchCoversASingleLandingPageBusiness") }} </p>
            </div>
            <ServicePlanCards></ServicePlanCards>
        </section>
        <section class="container detail-section" aria-labelledby="trien-khai-website">
            <div v-reveal class="detail-copy">
                <h2 id="trien-khai-website">{{ $t('website.deliveryTitle') }}</h2>
                <p>{{ $t('website.deliveryIntro') }}</p>
            </div>
            <ol class="detail-card-grid">
                <li v-for="(step, index) in ['discovery', 'build', 'handover']" :key="step" v-reveal class="detail-card">
                    <h3>{{ index + 1 }}. {{ $t(`website.${step}Title`) }}</h3>
                    <p>{{ $t(`website.${step}Text`) }}</p>
                </li>
            </ol>
        </section>
        <section v-reveal class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div>
                    <p class="eyebrow">{{ $t("website.additionalScope") }}</p>
                    <h2 id="pham-vi">{{ $t("website.whenMightYouNeedMore") }}</h2>
                    <p> {{ $t("website.excludesDomainHostingContentCreationThirdParty") }} </p>
                </div>
                <ul>
                    <li>{{ $t("website.needACmsWithLaunchToEdit") }}</li>
                    <li>{{ $t("website.moreSectionsOrPagesThanThePlan") }}</li>
                    <li>{{ $t("website.accountsPermissionsAndApiCrmConnectionsAre") }}</li>
                    <li>{{ $t("website.copywritingPhotographyAndAssetLicensesCanBe") }}</li>
                </ul>
            </div>
        </section>
    </div>
</template>
