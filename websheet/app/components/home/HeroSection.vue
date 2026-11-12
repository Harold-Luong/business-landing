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
            <HeroDemo />
        </div>
        <div class="container hero-bottom"><span>{{ $t("hero.ourServices") }}</span>
            <div><span>Google Apps Script</span><span class="hero-separator" aria-hidden="true">✳</span><span>AppSheet</span><span class="hero-separator" aria-hidden="true">✳</span><span>{{ $t("hero.webDesign") }}</span></div>
        </div>
    </section>
</template>
