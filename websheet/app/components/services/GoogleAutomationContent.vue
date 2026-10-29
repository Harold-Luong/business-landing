<script setup lang="ts">
import { planById, priceMillions } from '~/data/plans'
</script>

<template>
    <div>
        <section class="container detail-section" aria-labelledby="giai-phap">
            <div v-reveal class="detail-copy">
                <p class="eyebrow">TIỆN ÍCH GOOGLE SHEETS · HAI HƯỚNG TRIỂN KHAI</p>
                <h2 id="giai-phap">Bạn cần tự động hóa phần việc nào?</h2>
                <p>Tiện ích Google Sheets là nhóm dịch vụ bao gồm Apps Script và AppSheet. Hai giải pháp được thiết kế
                    theo yêu cầu và có thể kết hợp; chi phí dành cho triển khai riêng theo quy trình khách hàng, không
                    phải giá mua mẫu có sẵn.</p>
            </div>
            <div class="detail-card-grid-gg automation-solutions">
                <article v-reveal class="detail-card">
                    <h3>Google Apps Script</h3>
                    <p>Phù hợp khi cần tổng hợp dữ liệu, tạo báo cáo hoặc gửi nhắc việc tự động theo lịch mà vẫn dùng
                        bảng tính quen thuộc.</p>
                    <ul class="detail-package-features">
                        <li>Thiết kế theo yêu cầu · từ {{ priceMillions(planById['apps-script'].startingPriceVnd) }}
                            triệu / dự án</li>
                        <li>{{ planById['apps-script'].scope }}</li>
                        <li>Dự kiến {{ planById['apps-script'].delivery }}</li>
                    </ul>
                    <NuxtLink class="text-link" to="/dich-vu/google-apps-script/">Khám phá Apps Script <span
                            aria-hidden="true">↗</span></NuxtLink>
                </article>
                <article v-reveal class="detail-card">
                    <h3>Ứng dụng AppSheet</h3>
                    <p>Phù hợp khi nhiều người cần màn hình nhập liệu, quản lý đơn hàng, kho hoặc công việc với quyền
                        truy cập theo vai trò.</p>
                    <ul class="detail-package-features">
                        <li>Thiết kế theo yêu cầu · từ {{ priceMillions(planById['appsheet'].startingPriceVnd) }} triệu
                            / dự án</li>
                        <li>{{ planById['appsheet'].scope }}</li>
                        <li>Dự kiến {{ planById['appsheet'].delivery }}</li>
                    </ul>
                    <NuxtLink class="text-link" to="/dich-vu/appsheet/">Khám phá AppSheet <span
                            aria-hidden="true">↗</span></NuxtLink>
                </article>
            </div>
        </section>
        <section v-reveal class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div>
                    <p class="eyebrow">GIỚI HẠN &amp; CHI PHÍ RIÊNG</p>
                    <h2 id="pham-vi">Những yếu tố ảnh hưởng<br>đến lựa chọn giải pháp.</h2>
                    <p>Giá tham khảo chưa gồm bản quyền AppSheet/Google Workspace, API, dịch vụ bên thứ ba và thuế nếu
                        áp dụng. Tiến độ tính từ khi chốt yêu cầu và nhận đủ dữ liệu mẫu. Yêu cầu ngoài phạm vi được báo
                        giá riêng.</p>
                </div>
                <ul>
                    <li>Apps Script: lượng dữ liệu, tần suất xử lý và giới hạn thời gian chạy cần được kiểm tra trước.</li>
                    <li>AppSheet: số người dùng, màn hình và quyền truy cập ảnh hưởng đến cấu hình và bản quyền cần dùng.</li>
                    <li>Kết hợp hai giải pháp hoặc nối API ngoài: xác định riêng luồng dữ liệu và phần tích hợp.</li>
                </ul>
            </div>
        </section>
    </div>
</template>
