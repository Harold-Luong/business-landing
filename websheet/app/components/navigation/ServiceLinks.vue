<script setup lang="ts">
import { serviceMeta } from '~~/shared/site'
const route = useRoute()
const { isHome, localePath } = useLocale()
const links = computed(() => serviceMeta.filter(service =>
    localePath(service.path).replace(/\/$/, '') !== route.path.replace(/\/$/, ''),
))
</script>

<template>
    <nav class="footer-services" :aria-label="$t(isHome ? 'nav.services' : 'services.closing.relatedServices')">
        <p class="eyebrow">{{ $t(isHome ? 'nav.services' : 'services.closing.exploreOtherServices') }}</p>
        <ul>
            <li v-for="service in links" :key="service.path">
                <NuxtLink :to="$localePath(service.path)">{{ $t(service.name) }}</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.footer-services {
    border-top: 1px solid var(--line);
    padding-block: 24px;
}

.footer-services ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 28px;
    list-style: none;
    margin: 12px 0 0;
    padding: 0;
}

.footer-services a {
    display: inline-block;
    padding-block: 10px;
    font-size: 13px;
    color: var(--ink);
    text-underline-offset: 4px;
}

.footer-services a:hover,
.footer-services a:focus-visible {
    color: var(--accent);
    text-decoration: underline;
}
</style>
