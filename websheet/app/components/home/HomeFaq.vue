<script setup lang="ts">
import { homeFaqs } from '~/data/home'
</script>

<template>
<section class="section faq" id="cau-hoi">
            <div class="container faq-grid">
                <div v-reveal>
                    <p class="eyebrow">{{ $t("homeFaq.eyebrow") }}</p>
                    <h2>{{ $t("homeFaq.frequentlyAsked") }}<br>{{ $t("homeFaq.questions") }}</h2>
                    <p>{{ $t("homeFaq.understandTheServicesChooseTheRightSolution") }}<br>{{ $t("homeFaq.andKnowTheCostsBeforeYouStart") }}</p><NuxtLink class="text-link text-link--icon" :to="$localePath('#lien-he')"><span class="link-label">{{ $t("homeFaq.letSTalk") }}</span> <span aria-hidden="true">↗</span></NuxtLink>
                </div>
                <FaqList :items="homeFaqs" first-open></FaqList>
            </div>
        </section>
</template>
