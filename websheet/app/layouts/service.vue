<template>
    <div class="service-detail">
        <a class="skip-link" href="#noi-dung">{{ $t("layout.skipToContent") }}</a>
        <SiteHeader />
        <slot />
        <footer class="container">
            <ServiceLinks />
            <div class="detail-footer">
                <span>{{ $t("service.websheetCustomDesignDevelopment") }}</span>
                <NuxtLink :to="$localePath('/')">{{ $t("service.backToHome") }}</NuxtLink>
            </div>
        </footer>
    </div>
</template>
