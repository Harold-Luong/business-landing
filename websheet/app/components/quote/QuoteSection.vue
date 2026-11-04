<script setup lang="ts">
import { contactDetails, emailLink } from '~~/shared/contact'
const email = useRuntimeConfig().public.contactEmail.trim()
const emailHref = emailLink(email)
</script>

<template>
    <section class="section contact" id="lien-he" tabindex="-1" aria-labelledby="contact-title">
        <div class="container contact-grid">
            <div v-reveal class="contact-copy">
                <p class="eyebrow">{{ $t("quote.section.contactConsultation") }}</p>
                <h2 id="contact-title">{{ $t("quote.form.projectDescription") }}<br>{{ $t("quote.section.andTheFeatures") }}<br><span>{{ $t("quote.section.youNeed") }}</span><span class="contact-spark" aria-hidden="true">✳</span></h2>
                <p>{{ $t("quote.section.contactUsByEmailZaloOrPhone") }}</p>
                <div class="contact-promise"><span aria-hidden="true">↗</span>
                    <div><strong>{{ $t("quote.section.noDetailedBriefYet") }}</strong>
                        <p>{{ $t("quote.section.tellUsAboutYourBusiness") }}<br>{{ $t("quote.section.andTheProblemYouWantToSolve") }}</p>
                    </div>
                </div>
            </div>
            <address v-reveal class="contact-channels" :aria-label="$t('quote.section.contactWebsheet')">
                <a v-if="emailHref" :href="emailHref">
                    <span class="contact-channel-icon" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="m3 7 9 6 9-6" />
                        </svg>
                    </span>
                    <span class="contact-channel-text">
                        <span class="contact-channel-label">Email</span>
                        <span class="contact-channel-value">{{ email }}</span>
                    </span>
                </a>
                <a :href="contactDetails.zalo.href" target="_blank" rel="noopener noreferrer">
                    <span class="contact-channel-icon contact-channel-icon-zalo" aria-hidden="true">
                        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" focusable="false">
                            <path d="M20 5C10.6 5 4 11 4 19c0 4.1 1.8 7.5 5 10l-1 6 7-3c1.6.5 3.3.7 5 .7 9.4 0 16-5.8 16-13.7S29.4 5 20 5Z" fill="currentColor" />
                            <text x="20" y="23" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="700">Zalo</text>
                        </svg>
                    </span>
                    <span class="contact-channel-text">
                        <span class="contact-channel-label">{{ $t("quote.section.connectOnZalo") }} <span aria-hidden="true">↗</span></span>
                        <span class="contact-channel-value">{{ contactDetails.zalo.label }}</span>
                        <span class="sr-only"> {{ $t("quote.section.opensANewTab") }}</span>
                    </span>
                </a>
                <a :href="`tel:${contactDetails.hotline.number}`">
                    <span class="contact-channel-icon" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false">
                            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
                        </svg>
                    </span>
                    <span class="contact-channel-text">
                        <span class="contact-channel-label">Hotline</span>
                        <span class="contact-channel-value">{{ contactDetails.hotline.label }}</span>
                    </span>
                </a>
            </address>
        </div>
    </section>
</template>
