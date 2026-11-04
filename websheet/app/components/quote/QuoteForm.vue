<script setup lang="ts">
import { quoteOptions, budgets } from '~/data/plans'
import { quoteSummary } from '~/utils/quote-summary'
import QuoteDialog from './QuoteDialog.vue'
const draft = useQuoteDraft()
const { locale, t } = useLocale()
const route = useRoute()
const { applyQuery } = useQuoteSelection()
const ready = ref(false)
const form = ref<HTMLFormElement | null>(null)
const dialog = ref<InstanceType<typeof QuoteDialog> | null>(null)
const summary = ref('')
function applySelection() { applyQuery(route.query.plan, route.query.concept) }
onMounted(() => { applySelection(); ready.value = true })
watch(() => [route.query.plan, route.query.concept], () => { if (ready.value) applySelection() })
function clearValidity(event: Event) { (event.target as HTMLInputElement | HTMLTextAreaElement).setCustomValidity('') }
async function submit() {
    draft.value.name = draft.value.name.trim()
    draft.value.message = draft.value.message.trim()
    for (const key of ['name', 'message'] as const) {
        const input = form.value?.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement | null
        input?.setCustomValidity(draft.value[key].length < (key === 'name' ? 1 : 10) ? t(key === 'name' ? 'quote.form.pleaseEnterYourName' : 'quote.form.pleaseDescribeYourProjectInAtLeast') : '')
    }
    if (!form.value?.reportValidity()) return
    summary.value = quoteSummary(draft.value, locale.value)
    await nextTick()
    dialog.value?.open()
}
</script>

<template>
    <form v-reveal ref="form" @submit.prevent="submit" class="contact-form" id="quote-form" tabindex="-1"
        aria-labelledby="quote-form-title">
        <h3 id="quote-form-title">{{ $t("quote.form.projectDetails") }}</h3>
        <p class="form-intro">{{ $t("quote.form.createARequestToCopyOrSend") }}</p>
        <div class="form-row">
            <div class="field"><label for="name">{{ $t("quote.form.yourName") }} <span>*</span></label><input id="name" v-model="draft.name"
                    name="name" @input="clearValidity" autocomplete="name" :placeholder="$t('quote.form.alexNguyen')" required
                    maxlength="100">
            </div>
            <div class="field"><label for="company">{{ $t("quote.fields.company") }}</label><input id="company" v-model="draft.company"
                    name="company" autocomplete="organization" :placeholder="$t('quote.form.companyName')" maxlength="150"></div>
        </div>
        <div class="field"><label for="email">{{ $t("quote.form.contactEmail") }} <span>*</span></label><input id="email"
                v-model="draft.email" name="email" type="email" autocomplete="email" placeholder="ban@doanhnghiep.vn"
                required maxlength="150"></div>
        <div class="form-row">
            <div class="field"><label for="plan">{{ $t("quote.form.iMInterestedIn") }}</label><select id="plan" v-model="draft.plan"
                    name="plan">
                    <option v-for="option in quoteOptions" :key="option.id" :value="option.id">{{ $t(option.label) }}
                    </option>
                </select></div>
            <div class="field"><label for="budget">{{ $t("quote.fields.estimatedBudget") }}</label><select id="budget" v-model="draft.budget"
                    name="budget">
                    <option v-for="budget in budgets" :key="budget" :value="budget">{{ $t(budget) }}</option>
                </select></div>
        </div>
        <div class="field"><label for="message">{{ $t("quote.form.projectDescription") }} <span>*</span></label><textarea id="message"
                v-model="draft.message" name="message" @input="clearValidity" rows="3"
                :placeholder="$t('quote.form.whatWebsiteAppOrWorkflowAutomationDo')" required minlength="10"
                maxlength="3000"></textarea></div>
        <p class="form-privacy">{{ $t("quote.form.yourInformationIsOnlyUsedToPrepare") }}</p>
        <button class="button button-dark" type="submit" :disabled="!ready">{{ $t("quote.form.createConsultationRequest") }} <span
                aria-hidden="true">↗</span></button>
        <noscript>
            {{ $t("quote.form.enableJavascriptToCreateAConsultationRequest") }}
        </noscript>
    </form>
    <QuoteDialog ref="dialog" :summary="summary" :name="draft.name" />
</template>
