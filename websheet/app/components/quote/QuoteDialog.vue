<script setup lang="ts">
import { emailLink } from '~~/shared/contact'
const props = defineProps<{ summary: string, name: string }>()
const { t } = useLocale()
const dialog = ref<HTMLDialogElement | null>(null)
const textarea = ref<HTMLTextAreaElement | null>(null)
const status = ref('')
const email = useRuntimeConfig().public.contactEmail.trim()
const emailHref = computed(() => emailLink(email) ? `${emailLink(email)}?subject=${encodeURIComponent(t('quote.emailSubject') + ' ' + props.name.trim())}&body=${encodeURIComponent(props.summary)}` : '')
const downloads = new Map<string, ReturnType<typeof setTimeout>>()
function open() { status.value = ''; dialog.value?.showModal() }
defineExpose({ open })
function onBackdrop(event: MouseEvent) {
    const bounds = dialog.value?.getBoundingClientRect()
    if (bounds && event.target === dialog.value && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.value?.close()
}
async function copy() {
    try {
        await navigator.clipboard.writeText(props.summary)
        status.value = 'quote.dialog.copiedYouCanPasteThisIntoAn'
    } catch {
        textarea.value?.focus(); textarea.value?.select()
        status.value = 'quote.dialog.theTextIsSelectedPressCtrlC'
    }
}
function download() {
    const url = URL.createObjectURL(new Blob(['\uFEFF' + props.summary], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url; link.download = 'yeu-cau-tu-van-du-an.txt'
    document.body.append(link); link.click(); link.remove()
    downloads.set(url, setTimeout(() => { URL.revokeObjectURL(url); downloads.delete(url) }, 1000))
    status.value = 'quote.dialog.yourRequestFileIsReadyToDownload'
}
onBeforeUnmount(() => {
    dialog.value?.close()
    for (const [url, timer] of downloads) { clearTimeout(timer); URL.revokeObjectURL(url) }
})
</script>

<template>
    <dialog ref="dialog" @click="onBackdrop" id="quote-dialog" aria-labelledby="quote-title">
        <div class="dialog-top">
            <p class="eyebrow">{{ $t("quote.dialog.yourProjectRequest") }}</p><button class="dialog-close" @click="dialog?.close()"
                type="button" :aria-label="$t('quote.dialog.closeProjectRequest')">×</button>
        </div>
        <h2 id="quote-title">{{ $t("quote.dialog.projectConsultationRequest") }}</h2>
        <p>{{ $t("quote.dialog.yourRequestHasBeenCreated") }} <strong>{{ $t("quote.dialog.butNotSent") }}</strong>{{ $t("quote.dialog.copyTheTextToShareItWith") }}</p>
        <label class="sr-only" for="quote-summary">{{ $t("quote.dialog.requestDetails") }}</label><textarea id="quote-summary" ref="textarea"
            :value="summary" rows="10" readonly></textarea>
        <div class="dialog-actions"><button class="button button-dark" type="button" id="copy-quote" @click="copy">{{ $t("quote.dialog.copyRequest") }} <span aria-hidden="true">↗</span></button><a class="button button-outline" id="email-quote"
                v-if="emailHref" :href="emailHref">{{ $t("quote.dialog.openEmailApp") }}</a><button class="text-link" id="download-quote" @click="download" type="button">{{ $t("quote.dialog.downloadTxt") }}</button>
        </div>
        <p id="copy-status" role="status" aria-live="polite">{{ $t(status) }}</p>
    </dialog>
</template>
