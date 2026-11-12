<script setup lang="ts">
const urls = useDemoUrls()
</script>

<template>
    <figure class="hero-demo">
        <span class="hero-demo-label">{{ $t('hero.desktopAndMobileLayouts') }}</span>
        <a class="hero-demo-desktop" :href="urls['an-studio']" target="_blank" rel="noopener noreferrer"
            :aria-label="`${$t('common.viewDemo')} An Studio, ${$t('common.opensInNewTab')}`">
            <span class="hero-demo-bar" aria-hidden="true"><span>● ● ●</span><span>An Studio</span><span>↗</span></span>
            <img src="/previews/an-studio-desktop.webp" :alt="$t('preview.demoScreenshot', { name: 'An Studio' })"
                width="1440" height="1000" fetchpriority="high" decoding="async">
        </a>
        <div class="hero-demo-phone" aria-hidden="true">
            <img src="/previews/an-studio-mobile.webp" alt="" width="390" height="960" decoding="async">
        </div>
        <figcaption>{{ $t('hero.conceptPreviewDesignedByWebsheet') }}</figcaption>
    </figure>
</template>

<style scoped>
.hero-demo {
    position: relative;
    width: 100%;
    max-width: 640px;
    aspect-ratio: 6 / 5;
    margin: 0 auto 24px;
    align-self: center;
}
.hero-demo-label {
    position: absolute;
    top: 2%;
    right: 5%;
    padding: 9px 14px;
    border: 1px solid var(--line);
    border-radius: 4px;
    background: #fff;
    color: var(--muted);
    font-size: 11px;
}
.hero-demo-desktop {
    display: block;
    position: absolute;
    top: 14%;
    left: 1%;
    width: 91%;
    overflow: hidden;
    border: 2px solid var(--line-strong);
    border-radius: 10px;
    background: #eeece5;
    box-shadow: 0 24px 55px var(--shadow-soft);
    transform: rotate(-3deg);
}
.hero-demo-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 12px;
    background: var(--surface);
    color: var(--muted);
    font-size: 9px;
}
.hero-demo img {
    display: block;
    width: 100%;
    height: auto;
}
.hero-demo-phone {
    position: absolute;
    width: 25%;
    right: 1%;
    bottom: 7%;
    overflow: hidden;
    border: 5px solid var(--ink);
    border-radius: 17px;
    background: #eeece5;
    box-shadow: 0 16px 36px var(--shadow-strong);
    transform: rotate(5deg);
    pointer-events: none;
}
.hero-demo figcaption {
    position: absolute;
    bottom: -24px;
    left: 0;
    right: 0;
    color: var(--muted);
    font-size: 10px;
    text-align: center;
}
@media (max-width: 600px) {
    .hero-demo { max-width: 420px; }
    .hero-demo-label { font-size: 9px; padding: 6px 10px; }
    .hero-demo-bar { padding: 6px 8px; font-size: 7px; }
    .hero-demo-phone { border-width: 3px; border-radius: 10px; }
    .hero-demo figcaption { font-size: 9px; }
}
</style>
