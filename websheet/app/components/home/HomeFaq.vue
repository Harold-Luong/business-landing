<script setup lang="ts">
import { homeFaqs } from '~/data/home'
</script>

<template>
<section class="section faq" id="cau-hoi">
            <div class="container faq-grid">
                <div v-reveal>
                    <p class="eyebrow">04 / GIẢI ĐÁP THẮC MẮC</p>
                    <h2>Câu hỏi<br>thường gặp.</h2>
                    <p>Hiểu dịch vụ, chọn giải pháp phù hợp<br>và nắm rõ chi phí trước khi bắt đầu.</p><NuxtLink class="text-link" to="#lien-he">Trao đổi thêm <span aria-hidden="true">↗</span></NuxtLink>
                </div>
                <FaqList :items="homeFaqs" first-open></FaqList>
            </div>
        </section>
</template>
