<script setup lang="ts">
import { planById, priceMillions } from '~/data/plans'
</script>

<template>
<div>
<section class="container detail-section" aria-labelledby="giai-phap">
            <div class="detail-copy"><p class="eyebrow">HIỂU NHÓM DỊCH VỤ</p><h2 id="giai-phap">Chọn theo cách bạn muốn làm việc.</h2><p>Apps Script phù hợp với các bước xử lý tự động hoặc công cụ thao tác trong Sheets. AppSheet phù hợp khi cần giao diện ứng dụng cho nhiều người nhập liệu và theo dõi công việc.</p></div>
            <div class="detail-card-grid automation-solutions">
                <article class="detail-card"><h3>Google Apps Script</h3><p>Tổng hợp dữ liệu, tạo báo cáo, chạy theo lịch hoặc xây menu, nút bấm và thanh bên theo yêu cầu.</p><NuxtLink class="text-link" to="/dich-vu/google-apps-script/">Xem dịch vụ Apps Script <span aria-hidden="true">→</span></NuxtLink></article>
                <article class="detail-card"><h3>AppSheet</h3><p>Ứng dụng nhập liệu, quản lý đơn hàng, kho và công việc từ dữ liệu Sheets với quyền truy cập theo vai trò.</p><NuxtLink class="text-link" to="/dich-vu/appsheet/">Xem dịch vụ AppSheet <span aria-hidden="true">→</span></NuxtLink></article>
            </div>
        </section>
<section class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div><p class="eyebrow">PHẠM VI THỰC HIỆN</p><h2 id="pham-vi">Báo giá theo giải pháp<br>và nhu cầu thực tế.</h2><p>Menu, thanh bên hoặc một luồng kết hợp được thống nhất trong phạm vi dự án. Bản quyền AppSheet/Google Workspace, API và dịch vụ bên thứ ba nếu cần được tính riêng.</p></div>
                <ul><li>Chốt dữ liệu đầu vào, thao tác cần rút gọn và kết quả mong muốn.</li><li>Chọn Apps Script, AppSheet hoặc kết hợp theo quy trình.</li><li>Xác định số file, màn hình, người dùng và quyền truy cập.</li><li>Bàn giao mã nguồn hoặc cấu hình và hướng dẫn theo gói đã chọn.</li></ul>
            </div>
        </section>
</div>
</template>
