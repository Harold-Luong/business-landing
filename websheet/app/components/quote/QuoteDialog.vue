<script setup lang="ts">
const props = defineProps<{ summary: string, name: string }>()
const dialog = ref<HTMLDialogElement | null>(null)
const textarea = ref<HTMLTextAreaElement | null>(null)
const status = ref('')
const email = useRuntimeConfig().public.contactEmail.trim()
const emailHref = computed(() => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Yêu cầu tư vấn dự án — ' + props.name.trim())}&body=${encodeURIComponent(props.summary)}` : '')
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
        status.value = 'Đã sao chép. Bạn có thể dán nội dung vào email hoặc ứng dụng nhắn tin.'
    } catch {
        textarea.value?.focus(); textarea.value?.select()
        status.value = 'Nội dung đã được chọn. Nhấn Ctrl+C (hoặc ⌘C) để sao chép, hoặc tải file bên dưới.'
    }
}
function download() {
    const url = URL.createObjectURL(new Blob(['\uFEFF' + props.summary], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url; link.download = 'yeu-cau-tu-van-du-an.txt'
    document.body.append(link); link.click(); link.remove()
    downloads.set(url, setTimeout(() => { URL.revokeObjectURL(url); downloads.delete(url) }, 1000))
    status.value = 'Đã tạo file yêu cầu để trình duyệt tải xuống. Thông tin chưa được gửi đi.'
}
onBeforeUnmount(() => {
    dialog.value?.close()
    for (const [url, timer] of downloads) { clearTimeout(timer); URL.revokeObjectURL(url) }
})
</script>

<template>
    <dialog ref="dialog" @click="onBackdrop" id="quote-dialog" aria-labelledby="quote-title">
        <div class="dialog-top">
            <p class="eyebrow">BẢN YÊU CẦU CỦA BẠN</p><button class="dialog-close" @click="dialog?.close()"
                type="button" aria-label="Đóng bản yêu cầu">×</button>
        </div>
        <h2 id="quote-title">Bản yêu cầu tư vấn</h2>
        <p>Bản yêu cầu đã được tạo, <strong>chưa được gửi</strong>. Sao chép nội dung để chia sẻ với đơn vị tư vấn.</p>
        <label class="sr-only" for="quote-summary">Nội dung yêu cầu</label><textarea id="quote-summary" ref="textarea"
            :value="summary" rows="10" readonly></textarea>
        <div class="dialog-actions"><button class="button button-dark" type="button" id="copy-quote" @click="copy">Sao
                chép yêu cầu
                <span aria-hidden="true">↗</span></button><a class="button button-outline" id="email-quote"
                v-if="emailHref" :href="emailHref">Mở
                ứng dụng email</a><button class="text-link" id="download-quote" @click="download" type="button">Tải file
                .txt ↓</button>
        </div>
        <p id="copy-status" role="status" aria-live="polite">{{ status }}</p>
    </dialog>
</template>
