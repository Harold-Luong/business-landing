<script setup lang="ts">
const year = useState('copyright-year', () => new Date().getFullYear())
</script>

<template>
    <footer class="site-footer">
        <div class="container">
            <div class="footer-main">
                <BrandMark :to="$localePath('#')"></BrandMark>
                <p>{{ $t("hero.title") }}<br>{{ $t("footer.customDevelopment") }}</p>
                <div>
                    <NuxtLink :to="$localePath('#dich-vu')">{{ $t("links.footerServices") }}</NuxtLink>
                    <NuxtLink :to="$localePath('#bang-gia')">{{ $t("links.footerPricing") }}</NuxtLink>
                    <NuxtLink :to="$localePath('#cau-hoi')">{{ $t("footer.frequentlyAskedQuestions") }}</NuxtLink>
                </div>
                <NuxtLink class="footer-top" :to="$localePath('#')" :aria-label="$t('footer.backToTop')">↑</NuxtLink>
            </div>
            <ServiceLinks />
            <div class="footer-bottom"><span>© <span id="year">{{ year }}</span> WebSheet.</span><span>{{ $t("footer.designDevelopmentWebsiteMaintenance") }}</span></div>
        </div>
    </footer>
</template>
