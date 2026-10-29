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
function applySelection() { applyQuery(route.query.plan, route.query.concept) }
onMounted(() => { applySelection(); ready.value = true })
watch(() => [route.query.plan, route.query.concept], () => { if (ready.value) applySelection() })
function clearValidity(event: Event) { (event.target as HTMLInputElement | HTMLTextAreaElement).setCustomValidity('') }
async function submit() {
    draft.value.name = draft.value.name.trim()
    draft.value.message = draft.value.message.trim()
    for (const key of ['name', 'message'] as const) {
        const input = form.value?.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement | null
        input?.setCustomValidity(draft.value[key].length < (key === 'name' ? 1 : 10) ? (key === 'name' ? 'Vui lòng nhập tên của bạn.' : 'Vui lòng mô tả dự án ít nhất 10 ký tự.') : '')
    }
    if (!form.value?.reportValidity()) return
    summary.value = quoteSummary(draft.value)
    await nextTick()
    dialog.value?.open()
}
</script>

<template>
    <form v-reveal ref="form" @submit.prevent="submit" class="contact-form" id="quote-form" tabindex="-1"
        aria-labelledby="quote-form-title">
        <h3 id="quote-form-title">Thông tin dự án</h3>
        <p class="form-intro">Tạo bản yêu cầu để sao chép hoặc gửi qua email.</p>
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
        <p class="form-privacy">Thông tin chỉ dùng để tạo bản yêu cầu trên thiết bị của bạn. Chưa có dữ liệu
            nào được gửi khi nhấn nút bên dưới.</p>
        <button class="button button-dark" type="submit" :disabled="!ready">Tạo yêu cầu tư vấn <span
                aria-hidden="true">↗</span></button>
        <noscript>
            <p>Hãy bật JavaScript để tạo bản yêu cầu tư vấn. Nội dung dịch vụ và bảng giá vẫn có thể xem
                bình thường.</p>
        </noscript>
    </form>
    <QuoteDialog ref="dialog" :summary="summary" :name="draft.name" />
</template>
