<script setup lang="ts">
import { quoteOptions, budgets } from '~/data/plans'
import { quoteSummary } from '~/utils/quote-summary'
import QuoteDialog from './QuoteDialog.vue'
const draft = useQuoteDraft()
const route = useRoute()
const { applyQuery } = useQuoteSelection()
const ready = ref(false)
const form = ref<HTMLFormElement | null>(null)
const dialog = ref<InstanceType<typeof QuoteDialog> | null>(null)
const summary = ref('')
const website = ref('')
const sending = ref(false)
const sent = ref(false)
const sendError = ref('')
const submission = ref<{ id: string, name: string, company: string, email: string, plan: string, budget: string, message: string, website: string } | null>(null)
function applySelection() { applyQuery(route.query.plan, route.query.concept) }
onMounted(() => { applySelection(); ready.value = true })
watch(() => [route.query.plan, route.query.concept], () => { if (ready.value) applySelection() })
function clearValidity(event: Event) { (event.target as HTMLInputElement | HTMLTextAreaElement).setCustomValidity('') }
async function submit() {
    if (sending.value) return
    draft.value.name = draft.value.name.trim()
    draft.value.message = draft.value.message.trim()
    for (const key of ['name', 'message'] as const) {
        const input = form.value?.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement | null
        input?.setCustomValidity(draft.value[key].length < (key === 'name' ? 1 : 10) ? (key === 'name' ? 'Vui lòng nhập tên của bạn.' : 'Vui lòng mô tả dự án ít nhất 10 ký tự.') : '')
    }
    if (!form.value?.reportValidity()) return
    const payload = {
        ...draft.value,
        email: draft.value.email.trim(),
        company: draft.value.company.trim(),
        plan: quoteOptions.find(option => option.id === draft.value.plan)?.label || 'Cần tư vấn thêm',
        website: website.value,
    }
    const previous = submission.value ? { ...submission.value, id: undefined } : null
    if (JSON.stringify(previous) !== JSON.stringify(payload)) {
        submission.value = { ...payload, id: crypto.randomUUID() }
        sent.value = false
        sendError.value = ''
    }
    summary.value = quoteSummary(draft.value)
    await nextTick()
    dialog.value?.open()
}
async function sendQuote() {
    if (!submission.value || sending.value || sent.value) return
    sending.value = true
    sendError.value = ''
    try {
        const result = await $fetch<{ ok: boolean }>('/api/quote', {
            method: 'POST', body: submission.value, retry: 0, timeout: 15_000,
        })
        if (result?.ok !== true) throw new Error('Request not accepted')
        sent.value = true
    } catch (error: unknown) {
        const status = (error as { statusCode?: number })?.statusCode
        sendError.value = status === 429
            ? 'Bạn đã gửi nhiều yêu cầu. Vui lòng chờ một phút rồi thử lại.'
            : status === 400 || status === 413
                ? 'Vui lòng đóng cửa sổ và kiểm tra lại thông tin yêu cầu.'
                : 'Chưa xác nhận được việc gửi. Bạn có thể thử lại hoặc liên hệ qua email/Zalo. Nội dung vẫn được giữ lại.'
    } finally { sending.value = false }
}
</script>

<template>
    <form v-reveal ref="form" @submit.prevent="submit" class="contact-form" id="quote-form" tabindex="-1"
        aria-labelledby="quote-form-title">
        <h3 id="quote-form-title">Thông tin dự án</h3>
        <p class="form-intro">Điền thông tin, xem lại và gửi yêu cầu trực tiếp cho WebSheet.</p>
        <div class="form-honeypot" aria-hidden="true">
            <label for="quote-website">Để trống trường này</label>
            <input id="quote-website" v-model="website" name="website" tabindex="-1" autocomplete="off" maxlength="200">
        </div>
        <div class="form-row">
            <div class="field"><label for="name">Tên của bạn <span>*</span></label><input id="name" v-model="draft.name"
                    name="name" @input="clearValidity" autocomplete="name" placeholder="Nguyễn Minh Anh" required
                    maxlength="100">
            </div>
            <div class="field"><label for="company">Doanh nghiệp</label><input id="company" v-model="draft.company"
                    name="company" autocomplete="organization" placeholder="Tên doanh nghiệp" maxlength="150"></div>
        </div>
        <div class="field"><label for="email">Email liên hệ <span>*</span></label><input id="email"
                v-model="draft.email" name="email" type="email" autocomplete="email" placeholder="ban@doanhnghiep.vn"
                required maxlength="150"></div>
        <div class="form-row">
            <div class="field"><label for="plan">Bạn quan tâm đến</label><select id="plan" v-model="draft.plan"
                    name="plan">
                    <option v-for="option in quoteOptions" :key="option.id" :value="option.id">{{ option.label }}
                    </option>
                </select></div>
            <div class="field"><label for="budget">Ngân sách dự kiến</label><select id="budget" v-model="draft.budget"
                    name="budget">
                    <option v-for="budget in budgets" :key="budget">{{ budget }}</option>
                </select></div>
        </div>
        <div class="field"><label for="message">Mô tả dự án <span>*</span></label><textarea id="message"
                v-model="draft.message" name="message" @input="clearValidity" rows="3"
                placeholder="Bạn cần website, ứng dụng hay tự động hóa công việc nào?" required minlength="10"
                maxlength="3000"></textarea></div>
        <p class="form-privacy">Thông tin sẽ được gửi qua email cho WebSheet để tư vấn dự án khi bạn xác nhận
            “Gửi yêu cầu” ở bước tiếp theo.</p>
        <button class="button button-dark" type="submit" :disabled="!ready || sending">Xem lại yêu cầu <span
                aria-hidden="true">↗</span></button>
        <noscript>
            <p>Hãy bật JavaScript để tạo bản yêu cầu tư vấn. Nội dung dịch vụ và bảng giá vẫn có thể xem
                bình thường.</p>
        </noscript>
    </form>
    <QuoteDialog ref="dialog" :summary="summary" :name="submission?.name || draft.name"
        :sending="sending" :sent="sent" :send-error="sendError" @send="sendQuote" />
</template>
