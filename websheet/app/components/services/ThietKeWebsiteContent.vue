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
