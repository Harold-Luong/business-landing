<template>
    <section class="hero" aria-labelledby="hero-title">
        <div class="container hero-grid">
            <div class="hero-copy">
                <p class="eyebrow light"><span class="status-dot"></span> WEBSITE · GOOGLE SHEETS · APPSHEET</p>
                <h1 id="hero-title">{{ $t("hero.title") }}<br>{{ $t("hero.automation") }}<br><span class="lime">{{ $t("hero.work") }}</span><span
                        class="hero-spark" aria-hidden="true">✳</span></h1>
                <p class="hero-description">{{ $t("hero.description") }}</p>
                <div class="hero-actions">
                    <NuxtLink class="button button-dark" :to="$localePath('#lien-he')">{{ $t("common.discussProject") }} <span aria-hidden="true">↗</span>
                    </NuxtLink>
                </div>
                <p class="hero-cta-note">{{ $t("hero.consultationNote") }}</p>
                <div class="hero-checks"><span><i aria-hidden="true">✓</i> {{ $t("hero.builtForYourNeeds") }}</span><span><i
                            aria-hidden="true">✓</i> {{ $t("hero.handoverGuidance") }}</span></div>
            </div>
            <div class="hero-visual" role="img"
                :aria-label="$t('hero.illustrationOfAResponsiveArchitectureWebsiteOn')">
                <div class="orbit orbit-one"></div>
                <div class="orbit orbit-two"></div>
                <div class="floating-label"><span class="mini-icon">⌘</span> {{ $t("hero.desktopAndMobileLayouts") }}</div>
                <div class="browser-mock">
                    <div class="browser-bar"><span class="browser-dots">● ● ●</span><span>an.studio /
                            architecture</span><span>↗</span></div>
                    <div class="mock-site">
                        <div class="mock-nav"><strong>an.</strong><span>{{ $t("hero.spacesProjectsStudio") }}</span><b>{{ $t("hero.contact") }}</b></div>
                        <div class="mock-heading"><span>{{ $t("hero.architectureInteriors") }}</span><strong>{{ $t("hero.residentialDesign") }}<br>{{ $t("hero.architectureAndInteriors") }}</strong><small>{{ $t("hero.spacesDesignedAroundYourNeeds") }}</small></div>
                        <div class="architecture">
                            <div class="sun"></div>
                            <div class="building building-back"></div>
                            <div class="building building-front"><span></span><span></span><span></span></div>
                            <div class="building-shadow"></div>
                            <div class="tree"></div><span class="architecture-caption">THE LIGHT HOUSE  
                                ↗<small>RESIDENTIAL · 2026</small></span>
                        </div>
                        <div class="mock-bottom"><span>01 / 03</span><span>{{ $t("hero.residentialInteriorDesign") }}</span><span>↗</span></div>
                    </div>
                </div>
                <div class="phone-mock">
                    <div class="phone-camera"></div>
                    <div class="phone-logo">an. <span>☰</span></div><strong>{{ $t("hero.interior") }}<br>{{ $t("hero.design") }}</strong>
                    <div class="phone-art">
                        <div></div>
                    </div><small>{{ $t("hero.livingRoomConcept") }}</small>
                    <div class="phone-button">{{ $t("hero.viewConcept") }}</div>
                </div>
                <div class="quality-badge"><span class="quality-icon" aria-hidden="true">✓</span>
                    <div><strong>{{ $t("hero.technicalEssentials") }}</strong><span>SEO · Responsive · Performance</span></div>
                </div>
                <span class="visual-footnote">{{ $t("hero.conceptPreviewDesignedByWebsheet") }}</span>
            </div>
        </div>
        <div class="container hero-bottom"><span>{{ $t("hero.ourServices") }}</span>
            <div><span>Google Apps Script</span><b aria-hidden="true">✳</b><span>AppSheet</span><b aria-hidden="true">✳</b><span>{{ $t("hero.webDesign") }}</span></div>
        </div>
    </section>
</template>
