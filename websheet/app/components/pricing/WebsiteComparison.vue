<script setup lang="ts">
import { websitePlans, priceMillions } from '~/data/plans'
const { selectPlan } = useQuoteSelection()
const rows = [
    { key: 'scope', label: 'Phạm vi' }, { key: 'management', label: 'Quản trị nội dung' },
    { key: 'delivery', label: 'Thời gian dự kiến' }, { key: 'warranty', label: 'Bảo hành lỗi' },
] as const
</script>
<template>
    <section v-reveal id="bang-gia-website" class="website-pricing" aria-labelledby="website-pricing-title">
        <div class="pricing-group-heading">
            <p class="eyebrow">THIẾT KẾ WEBSITE</p>
            <h2 id="website-pricing-title">So sánh Launch / Business / Custom</h2>
        </div>
        <p id="comparison-hint" class="comparison-hint">Vuốt ngang hoặc dùng phím mũi tên khi chọn bảng để so sánh 3 gói
            <span aria-hidden="true">↔</span></p>
        <div class="comparison-scroll" role="region" aria-labelledby="website-pricing-title"
            aria-describedby="comparison-hint" tabindex="0">
            <table class="comparison-table">
                <caption class="sr-only">So sánh giá, phạm vi, quản trị nội dung, thời gian và bảo hành của Launch,
                    Business, Custom.</caption>
                <colgroup>
                    <col>
                    <col>
                    <col>
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="plan in websitePlans" :id="`compare-${plan.id}`" :key="plan.id" scope="col"
                            :class="{ 'recommended-column': plan.recommended }">
                            <div class="price-card comparison-plan" :class="{ featured: plan.recommended }">
                                <p class="plan-kicker" :class="{ recommended: plan.recommended }">{{ plan.kicker }}</p>
                                <h3>{{ plan.name }}</h3>
                                <div class="price"><span>Từ</span><strong>{{ priceMillions(plan.startingPriceVnd)
                                        }}<span> triệu</span></strong><small>VNĐ / dự án</small></div>
                                <NuxtLink class="button" :class="plan.recommended ? 'button-dark' : 'button-outline'"
                                    to="#quote-form" :aria-label="`Chọn gói này: ${plan.name}`"
                                    @click="selectPlan(plan.id)">Chọn gói này <span aria-hidden="true">↗</span>
                                </NuxtLink>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in rows" :key="row.key">
                        <td v-for="plan in websitePlans" :key="plan.id" :headers="`compare-${plan.id}`"
                            :class="{ 'recommended-column': plan.recommended }"><span class="comparison-criterion">{{
                                row.label }}</span>{{ plan[row.key] }}</td>
                    </tr>
                    <tr>
                        <td v-for="plan in websitePlans" :key="plan.id" :headers="`compare-${plan.id}`"
                            :class="{ 'recommended-column': plan.recommended }"><span class="comparison-criterion">Tính
                                năng & bàn giao</span>
                            <details class="plan-details">
                                <summary>Xem chi tiết<span class="sr-only"> gói {{ plan.name }}</span></summary>
                                <ul class="feature-list">
                                    <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
                                </ul>
                                <NuxtLink class="price-detail-link" :to="plan.detailHref">Trang dịch vụ <span
                                        aria-hidden="true">→</span></NuxtLink>
                            </details>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="pricing-note">Chưa gồm tên miền, hosting, nội dung, bản quyền bên thứ ba và thuế nếu áp dụng. Tiến độ
            tính từ khi nhận đủ nội dung và duyệt thiết kế.</p>
    </section>
</template>
