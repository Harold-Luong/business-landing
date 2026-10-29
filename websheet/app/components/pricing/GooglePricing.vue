<script setup lang="ts">
import { googlePlans, priceMillions } from '~/data/plans'
const { selectPlan } = useQuoteSelection()
</script>
<template>
    <section id="bang-gia-google" class="automation-pricing" aria-labelledby="google-pricing-title">
        <div class="pricing-group-heading">
            <p class="eyebrow">GOOGLE AUTOMATION</p>
            <h2 id="google-pricing-title">Thiết kế Google Sheets & AppSheet theo yêu cầu</h2>
        </div>
        <div class="custom-service-note"><strong>Chi phí thiết kế riêng cho quy trình của bạn</strong>
            <p>Giá dưới đây dành cho khảo sát, xây dựng và bàn giao giải pháp theo yêu cầu khách hàng; không phải giá
                mua mẫu có sẵn.</p>
            <p>Mẫu làm sẵn có giá thấp hơn; giá và phạm vi sử dụng sẽ được công bố riêng theo từng sản phẩm. Các demo
                hiện tại chỉ minh họa giao diện để tham khảo khi trao đổi yêu cầu.</p>
        </div>
        <div class="pricing-grid automation-grid">
            <article v-for="plan in googlePlans" :key="plan.id" class="price-card"
                :aria-labelledby="`price-${plan.id}`">
                <p class="plan-kicker">{{ plan.kicker }}</p>
                <h3 :id="`price-${plan.id}`">{{ plan.name }}</h3>
                <div class="price"><span>Từ</span><strong>{{ priceMillions(plan.startingPriceVnd) }}<span>
                            triệu</span></strong><small>VNĐ / dự án</small></div>
                <p class="plan-scope">{{ plan.scope }}</p>
                <p class="delivery">Dự kiến {{ plan.delivery }}</p>
                <NuxtLink class="button button-outline" to="#quote-form" :aria-label="`Trao đổi yêu cầu ${plan.name}`"
                    @click="selectPlan(plan.id)">Trao đổi yêu cầu <span aria-hidden="true">↗</span></NuxtLink>
                <details class="plan-details">
                    <summary>Xem chi tiết<span class="sr-only"> {{ plan.name }}</span></summary>
                    <ul class="feature-list">
                        <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
                    </ul>
                    <NuxtLink class="price-detail-link" :to="plan.detailHref">Trang dịch vụ <span
                            aria-hidden="true">→</span></NuxtLink>
                </details>
            </article>
        </div>
        <p class="pricing-note">Chưa gồm bản quyền AppSheet/Google Workspace, API, dịch vụ bên thứ ba và thuế nếu áp
            dụng. Tiến độ tính từ khi chốt yêu cầu và nhận đủ dữ liệu mẫu; yêu cầu ngoài phạm vi được báo giá riêng.</p>
    </section>
</template>
