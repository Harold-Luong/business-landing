<script setup lang="ts">
import { planById, priceMillions } from '~/data/plans'
</script>

<template>
<div>
<section class="container detail-section" aria-labelledby="giai-phap">
            <div class="detail-copy"><p class="eyebrow">HIỂU GIẢI PHÁP</p><h2 id="giai-phap">Từ dữ liệu bảng tính đến ứng dụng nội bộ</h2><p>AppSheet là nền tảng tạo ứng dụng của Google mà không cần viết mã theo cách truyền thống. Dữ liệu như Google Sheets được kết nối với màn hình thao tác để nhân viên nhập liệu và theo dõi công việc. Người dùng không cần biết lập trình; cấu trúc dữ liệu, quy tắc và quyền truy cập cần được thiết kế theo quy trình.</p></div>
            <div class="detail-card-grid"><article class="detail-card"><h3>Quản lý đơn hàng</h3><p>Nhập đơn từ biểu mẫu, theo dõi trạng thái xử lý và phân công người phụ trách. Các trường cần điền được xác định theo nghiệp vụ.</p></article><article class="detail-card"><h3>Theo dõi nhập xuất kho</h3><p>Ghi nhận giao dịch nhập, xuất và xem báo cáo tồn kho theo cấu trúc dữ liệu đã thống nhất.</p></article><article class="detail-card"><h3>Điều phối công việc</h3><p>Tập hợp đầu việc, hạn xử lý và người phụ trách; bổ sung luồng thông báo hoặc phê duyệt cơ bản theo yêu cầu.</p></article></div>
        </section>
<section class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div><p class="eyebrow">PHẠM VI &amp; BÀN GIAO</p><h2 id="pham-vi">Những hạng mục<br>được thống nhất trước.</h2><p>Giá là chi phí triển khai, chưa gồm phí bản quyền AppSheet/Google Workspace. Gói tài khoản được xem xét theo số người dùng, tính năng và quyền truy cập; tích hợp ngoài hoặc quy trình nhiều bước được báo giá riêng.</p></div>
                <ul><li>01 ứng dụng với tối đa 5 bảng dữ liệu Google Sheets.</li><li>Tối đa 5 màn hình nhập liệu, danh sách hoặc báo cáo.</li><li>Tối đa 2 vai trò người dùng và 01 luồng thông báo hoặc phê duyệt cơ bản.</li><li>Bàn giao cấu hình, hướng dẫn quản trị; bảo hành lỗi trong phạm vi 1 tháng.</li></ul>
            </div>
        </section>
<section class="container detail-section" aria-labelledby="trien-khai">
            <p class="eyebrow">TỪ YÊU CẦU ĐẾN SỬ DỤNG</p><h2 id="trien-khai">Cách triển khai dự án.</h2>
            <ol class="detail-card-grid detail-process"><li><span class="detail-step">01</span><h3>Chuẩn hóa dữ liệu</h3><p>Thống nhất bảng, cột, mã định danh và mối liên hệ giữa đơn hàng, khách hàng hoặc sản phẩm trước khi dựng app.</p></li><li><span class="detail-step">02</span><h3>Thử quy trình theo vai trò</h3><p>Dùng tài khoản thử để kiểm tra nhập liệu, quyền xem và thao tác của từng nhóm; điều chỉnh cùng người sử dụng.</p></li><li><span class="detail-step">03</span><h3>Chuyển giao quản trị</h3><p>Bàn giao cấu hình app, hướng dẫn quản lý người dùng và cập nhật các mục dữ liệu đã thống nhất.</p></li></ol>
        </section>
</div>
</template>
