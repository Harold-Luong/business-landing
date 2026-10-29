<script setup lang="ts">
import { planById, priceMillions } from '~/data/plans'
</script>

<template>
<div>
<section class="container detail-section" aria-labelledby="giai-phap">
            <div class="detail-copy"><p class="eyebrow">HIỂU GIẢI PHÁP</p><h2 id="giai-phap">Chọn loại website theo mục tiêu sử dụng</h2><p>Một chiến dịch giới thiệu sản phẩm có thể chỉ cần landing page. Doanh nghiệp cần cập nhật bài viết và dự án thường cần website có quản trị nội dung. Khi có tài khoản, phân quyền và nghiệp vụ riêng, phạm vi phù hợp hơn là web app. Cần xác định mục tiêu và người sử dụng trước khi chốt số trang hay tính năng.</p></div>
            <ServicePlanCards></ServicePlanCards>
        </section>
<section class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div><p class="eyebrow">PHẠM VI &amp; BÀN GIAO</p><h2 id="pham-vi">Những hạng mục<br>được thống nhất trước.</h2><p>Giá chưa gồm tên miền, hosting, sản xuất nội dung, bản quyền bên thứ ba và thuế nếu áp dụng. Tiến độ tính từ khi nhận đủ nội dung và duyệt thiết kế. Chức năng CMS, backend và tích hợp được ghi cụ thể trong báo giá.</p></div>
                <ul><li>Thiết kế theo nhận diện và nội dung được thống nhất.</li><li>Bố cục tương thích điện thoại, tablet và desktop.</li><li>SEO kỹ thuật theo phạm vi: tiêu đề, mô tả, sitemap và cấu trúc nội dung.</li><li>Bàn giao mã nguồn, tài liệu và tài khoản thuộc phạm vi dự án; hướng dẫn sử dụng và xử lý lỗi trong thời gian bảo hành của gói.</li></ul>
            </div>
        </section>
<section class="container detail-section" aria-labelledby="trien-khai">
            <p class="eyebrow">TỪ YÊU CẦU ĐẾN SỬ DỤNG</p><h2 id="trien-khai">Cách triển khai dự án.</h2>
            <ServicePlanCards></ServicePlanCards>
        </section>
</div>
</template>
