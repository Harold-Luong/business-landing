<template>
    <div>
        <section class="container detail-section" aria-labelledby="giai-phap">
            <div v-reveal class="detail-copy">
                <p class="eyebrow">GÓI THIẾT KẾ THEO YÊU CẦU</p>
                <h2 id="giai-phap">So sánh phạm vi ba gói website.</h2>
                <p>
                    Launch dành cho một landing page; Business dành cho website có CMS và blog;
                    Custom dành cho tài khoản, phân quyền và nghiệp vụ riêng.
                    Đây là giá thiết kế theo yêu cầu, không phải giá mua các demo phía trên.
                </p>
            </div>
            <ServicePlanCards></ServicePlanCards>
        </section>
        <section v-reveal class="detail-scope" aria-labelledby="pham-vi">
            <div class="container detail-scope-grid">
                <div>
                    <p class="eyebrow">HẠNG MỤC NGOÀI GÓI</p>
                    <h2 id="pham-vi">Khi nào cần mở rộng phạm vi?</h2>
                    <p>
                        Giá chưa gồm tên miền, hosting, sản xuất nội dung, bản quyền bên thứ ba và
                        thuế nếu áp dụng. Tiến độ tính từ khi nhận đủ nội dung và duyệt thiết kế. Chức
                        năng CMS, backend và tích hợp được ghi cụ thể trong báo giá.
                    </p>
                </div>
                <ul>
                    <li>Launch cần CMS để tự cập nhật nội dung: báo giá bổ sung hoặc chọn Business.</li>
                    <li>Số section hoặc số trang vượt giới hạn gói: xác định thêm khối lượng nội dung và thiết kế.</li>
                    <li>Tài khoản, phân quyền, kết nối API/CRM: khảo sát theo nghiệp vụ trong phạm vi Custom.</li>
                    <li>Viết nội dung, chụp ảnh và bản quyền tài nguyên: thống nhất chi phí riêng nếu cần.</li>
                </ul>
            </div>
        </section>
    </div>
</template>
