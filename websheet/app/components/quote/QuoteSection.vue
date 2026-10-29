<script setup lang="ts">
import { contactDetails, emailLink } from '~~/shared/contact'
const email = useRuntimeConfig().public.contactEmail.trim()
const emailHref = emailLink(email)
</script>

<template>
<section class="section contact" id="lien-he">
            <div class="container contact-grid">
                <div v-reveal class="contact-copy">
                    <p class="eyebrow">LIÊN HỆ &amp; TƯ VẤN</p>
                    <h2>Mô tả dự án<br>và tính năng<br><span>bạn cần.</span><span class="contact-spark" aria-hidden="true">✳</span></h2>
                    <p>Liên hệ trực tiếp qua email, Zalo hoặc hotline. Bạn cũng có thể tạo bản yêu cầu bằng form bên cạnh để chia sẻ thông tin dự án.</p>
                    <address class="contact-channels" aria-label="Kênh liên hệ WebSheet">
                        <a v-if="emailHref" :href="emailHref">
                            <span class="contact-channel-label">Email</span>
                            <span class="contact-channel-value">{{ email }}</span>
                        </a>
                        <a :href="contactDetails.zalo.href" target="_blank" rel="noopener noreferrer">
                            <span class="contact-channel-label">Kết nối Zalo <span aria-hidden="true">↗</span></span>
                            <span class="contact-channel-value">{{ contactDetails.zalo.label }}</span>
                            <span class="sr-only"> (mở tab mới)</span>
                        </a>
                        <a :href="`tel:${contactDetails.hotline.number}`">
                            <span class="contact-channel-label">Hotline</span>
                            <span class="contact-channel-value">{{ contactDetails.hotline.label }}</span>
                        </a>
                    </address>
                    <div class="contact-promise"><span aria-hidden="true">↗</span>
                        <div><strong>Nếu chưa có yêu cầu chi tiết</strong>
                            <p>Bạn có thể nêu lĩnh vực kinh doanh<br>và công việc muốn giải quyết.</p>
                        </div>
                    </div>
                </div>
                <QuoteForm></QuoteForm>
            </div>
        </section>
</template>
