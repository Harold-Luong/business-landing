<template>
    <section id="bang-gia" class="section pricing">
        <div class="container">
            <div v-reveal class="center-heading">
                <p class="eyebrow">{{ $t("pricing.eyebrow") }}</p>
                <h2>{{ $t("pricing.chooseAPlanForYourNeeds") }}</h2>
                <p>{{ $t("pricing.startingPricesForTheScopeBelowA") }}</p>
            </div>
            <nav class="pricing-navigation" :aria-label="$t('pricing.pricingCategories')">
                <NuxtLink :to="$localePath('#bang-gia-google')">{{ $t("links.googlePricing") }} <span aria-hidden="true">↘</span></NuxtLink>
                <NuxtLink :to="$localePath('#bang-gia-website')">{{ $t("links.websitePricing") }} <span aria-hidden="true">↘</span></NuxtLink>
            </nav>
            <GooglePricing></GooglePricing>
            <WebsiteComparison></WebsiteComparison>
        </div>
    </section>
</template>
