<template>
  <div>
    <section class="container detail-section" aria-labelledby="giai-phap">
      <div v-reveal class="detail-copy">
        <p class="eyebrow">CÔNG CỤ NGAY TRONG BẢNG TÍNH</p>
        <h2 id="giai-phap">Menu, nút bấm hay thanh bên?</h2>
        <p>Tiện ích được thiết kế quanh thao tác cần rút gọn. Bạn vẫn làm việc với dữ liệu trong Sheets; giao diện và cách kích hoạt phụ thuộc công việc cụ thể.</p>
      </div>
      <div class="detail-card-grid">
        <article v-reveal class="detail-card"><h3>Menu &amp; nút thao tác</h3><p>Chạy một bước xử lý như làm sạch dữ liệu, đối soát hoặc tạo báo cáo khi người dùng chủ động chọn lệnh.</p></article>
        <article v-reveal class="detail-card"><h3>Thanh bên trong Sheets</h3><p>Gom các tùy chọn và thao tác vào một giao diện cạnh bảng tính, theo phạm vi Apps Script đã thống nhất.</p></article>
        <article v-reveal class="detail-card"><h3>Luồng chạy theo lịch</h3><p>Tổng hợp báo cáo hoặc nhắc việc theo thời điểm và điều kiện đã cấu hình, không cần bấm lệnh mỗi lần.</p></article>
      </div>
    </section>
    <section v-reveal class="detail-scope" aria-labelledby="pham-vi">
      <div class="container detail-scope-grid">
        <div>
          <p class="eyebrow">CHỌN CÁCH TRIỂN KHAI</p>
          <h2 id="pham-vi">Khi nào cần một ứng dụng riêng?</h2>
          <p>Nếu nhiều người cần màn hình nhập liệu, danh sách và quyền truy cập theo vai trò, hãy xem AppSheet. Tiện ích Sheets là nhóm giải pháp, không có gói phí thứ ba độc lập.</p>
        </div>
        <ul>
          <li><NuxtLink class="text-link" to="/dich-vu/google-apps-script/">Apps Script: công cụ trong bảng tính và xử lý tự động →</NuxtLink></li>
          <li><NuxtLink class="text-link" to="/dich-vu/appsheet/">AppSheet: giao diện nhập liệu và quản lý cho nhóm →</NuxtLink></li>
          <li>Extension trình duyệt là loại tiện ích khác; không mặc định nằm trong phạm vi các công cụ trên.</li>
        </ul>
      </div>
    </section>
  </div>
</template>
