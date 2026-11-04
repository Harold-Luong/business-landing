<script setup lang="ts">
import { contactDetails, emailLink } from '~~/shared/contact'
const email = useRuntimeConfig().public.contactEmail.trim()
const emailHref = emailLink(email)
</script>

<template>
<section class="section contact" id="lien-he">
            <div class="container contact-grid">
                <div v-reveal class="contact-copy">
                    <p class="eyebrow">{{ $t("quote.section.contactConsultation") }}</p>
                    <h2>{{ $t("quote.form.projectDescription") }}<br>{{ $t("quote.section.andTheFeatures") }}<br><span>{{ $t("quote.section.youNeed") }}</span><span class="contact-spark" aria-hidden="true">✳</span></h2>
                    <p>{{ $t("quote.section.contactUsByEmailZaloOrPhone") }}</p>
                    <address class="contact-channels" :aria-label="$t('quote.section.contactWebsheet')">
                        <a v-if="emailHref" :href="emailHref">
                            <span class="contact-channel-label">Email</span>
                            <span class="contact-channel-value">{{ $t(email) }}</span>
                        </a>
                        <a :href="contactDetails.zalo.href" target="_blank" rel="noopener noreferrer">
                            <span class="contact-channel-label">{{ $t("quote.section.connectOnZalo") }} <span aria-hidden="true">↗</span></span>
                            <span class="contact-channel-value">{{ $t(contactDetails.zalo.label) }}</span>
                            <span class="sr-only"> {{ $t("quote.section.opensANewTab") }}</span>
                        </a>
                        <a :href="`tel:${contactDetails.hotline.number}`">
                            <span class="contact-channel-label">Hotline</span>
                            <span class="contact-channel-value">{{ $t(contactDetails.hotline.label) }}</span>
                        </a>
                    </address>
                    <div class="contact-promise"><span aria-hidden="true">↗</span>
                        <div><strong>{{ $t("quote.section.noDetailedBriefYet") }}</strong>
                            <p>{{ $t("quote.section.tellUsAboutYourBusiness") }}<br>{{ $t("quote.section.andTheProblemYouWantToSolve") }}</p>
                        </div>
                    </div>
                </div>
                <QuoteForm></QuoteForm>
            </div>
        </section>
</template>
