<script setup lang="ts">
import { planById, priceMillions } from '~/data/plans'
</script>

<template>
<div>
<section class="container detail-section" aria-labelledby="giai-phap">
            <div class="detail-copy"><p class="eyebrow">HIỂU GIẢI PHÁP</p><h2 id="giai-phap">Apps Script giải quyết phần việc nào?</h2><p>Apps Script là công cụ lập trình của Google để tự động hóa và mở rộng các ứng dụng như Sheets, Drive hoặc Gmail. Giải pháp phù hợp khi dữ liệu có cấu trúc và các bước xử lý có thể mô tả bằng quy tắc. Bạn vẫn dùng bảng tính quen thuộc, còn chương trình đảm nhận các thao tác được thống nhất.</p></div>
            <div class="detail-card-grid"><article class="detail-card"><h3>Tổng hợp báo cáo</h3><p>Gom dữ liệu từ các bảng đã thống nhất, kiểm tra cột bắt buộc và tạo bảng tổng hợp theo ngày hoặc theo nhóm phụ trách.</p></article><article class="detail-card"><h3>Đối soát dữ liệu</h3><p>Đánh dấu dòng thiếu thông tin, tìm dữ liệu trùng hoặc so sánh trạng thái giữa hai bảng theo mã đơn hàng.</p></article><article class="detail-card"><h3>Nhắc việc theo lịch</h3><p>Tạo luồng kiểm tra hạn xử lý và gửi thông báo theo điều kiện. Nội dung, người nhận và thời điểm chạy được chốt trước.</p></article></div>
        </section>
<section class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div><p class="eyebrow">PHẠM VI &amp; BÀN GIAO</p><h2 id="pham-vi">Những hạng mục<br>được thống nhất trước.</h2><p>Kết nối API bên ngoài, nhiều nguồn dữ liệu hoặc quy tắc nghiệp vụ phức tạp được khảo sát và báo giá bổ sung. Khả năng chạy phụ thuộc giới hạn của tài khoản và dịch vụ Google sử dụng.</p></div>
                <ul><li>01 quy trình tự động hóa trên tối đa 2 file Google Sheets.</li><li>Làm sạch, đối soát hoặc tổng hợp dữ liệu theo quy tắc đã chốt.</li><li>Chạy theo lịch hoặc từ nút bấm, kèm ghi nhận kết quả và lỗi cơ bản.</li><li>Bàn giao mã nguồn, cấu hình và hướng dẫn; bảo hành lỗi trong phạm vi 1 tháng.</li></ul>
            </div>
        </section>
<section class="container detail-section" aria-labelledby="trien-khai">
            <p class="eyebrow">TỪ YÊU CẦU ĐẾN SỬ DỤNG</p><h2 id="trien-khai">Cách triển khai dự án.</h2>
            <ol class="detail-card-grid detail-process"><li><span class="detail-step">01</span><h3>Mô tả đầu vào và đầu ra</h3><p>Chuẩn bị bảng mẫu cùng một kết quả mong muốn. Chỉ rõ cột khóa, các điều kiện xử lý và lịch chạy.</p></li><li><span class="detail-step">02</span><h3>Kiểm thử trên dữ liệu mẫu</h3><p>Chạy thử các trường hợp đúng, thiếu và trùng dữ liệu; cùng xác nhận cách xử lý trước khi dùng thật.</p></li><li><span class="detail-step">03</span><h3>Bàn giao và hướng dẫn</h3><p>Hướng dẫn cấp quyền, đổi lịch chạy, xem kết quả và xử lý lỗi thường gặp theo phạm vi dự án.</p></li></ol>
        </section>
</div>
</template>
