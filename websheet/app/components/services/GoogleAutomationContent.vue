<script setup lang="ts">
import { planById, priceMillions } from '~/data/plans'
</script>

<template>
<div>
<section class="container detail-section" aria-labelledby="giai-phap">
            <div class="detail-copy">
                <p class="eyebrow">TIỆN ÍCH GOOGLE SHEETS · HAI HƯỚNG TRIỂN KHAI</p>
                <h2 id="giai-phap">Bạn cần tự động hóa phần việc nào?</h2>
                <p>Tiện ích Google Sheets là nhóm dịch vụ bao gồm Apps Script và AppSheet. Hai giải pháp được thiết kế theo yêu cầu và có thể kết hợp; chi phí dành cho triển khai riêng theo quy trình khách hàng, không phải giá mua mẫu có sẵn.</p>
            </div>
            <div class="detail-card-grid automation-solutions">
                <article class="detail-card">
                    <h3>Google Apps Script</h3>
                    <p>Phù hợp khi cần tổng hợp dữ liệu, tạo báo cáo hoặc gửi nhắc việc tự động theo lịch mà vẫn dùng bảng tính quen thuộc.</p>
                    <ul class="detail-package-features"><li>Thiết kế theo yêu cầu · từ {{ priceMillions(planById['apps-script'].startingPriceVnd) }} triệu / dự án</li><li>01 quy trình, tối đa 2 file Sheets</li><li>Dự kiến 3–5 ngày làm việc</li></ul>
                    <NuxtLink class="text-link" to="/dich-vu/google-apps-script/">Khám phá Apps Script <span aria-hidden="true">↗</span></NuxtLink>
                </article>
                <article class="detail-card">
                    <h3>Ứng dụng AppSheet</h3>
                    <p>Phù hợp khi nhiều người cần màn hình nhập liệu, quản lý đơn hàng, kho hoặc công việc với quyền truy cập theo vai trò.</p>
                    <ul class="detail-package-features"><li>Thiết kế theo yêu cầu · từ {{ priceMillions(planById['appsheet'].startingPriceVnd) }} triệu / dự án</li><li>Tối đa 5 bảng dữ liệu và 5 màn hình</li><li>Dự kiến 7–12 ngày làm việc</li></ul>
                    <NuxtLink class="text-link" to="/dich-vu/appsheet/">Khám phá AppSheet <span aria-hidden="true">↗</span></NuxtLink>
                </article>
            </div>
        </section>
<section class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div>
                    <p class="eyebrow">TRƯỚC KHI TRIỂN KHAI</p>
                    <h2 id="pham-vi">Thống nhất phạm vi<br>từ nhu cầu thực tế.</h2>
                    <p>Giá tham khảo chưa gồm bản quyền AppSheet/Google Workspace, API, dịch vụ bên thứ ba và thuế nếu áp dụng. Tiến độ tính từ khi chốt yêu cầu và nhận đủ dữ liệu mẫu. Yêu cầu ngoài phạm vi được báo giá riêng.</p>
                </div>
                <ul>
                    <li>Xác định dữ liệu đầu vào, quy tắc xử lý và kết quả cần nhận.</li>
                    <li>Chốt số file, màn hình, người dùng và quyền truy cập cần thiết.</li>
                    <li>Thử trên dữ liệu mẫu trước khi đưa vào sử dụng thực tế.</li>
                    <li>Bàn giao mã nguồn hoặc cấu hình cùng hướng dẫn; bảo hành lỗi trong phạm vi các gói cơ bản 1 tháng.</li>
                </ul>
            </div>
        </section>
</div>
</template>
