<template>
  <section
    class="container detail-section service-samples"
    id="mau-giao-dien"
    aria-labelledby="sheets-showcase-title"
  >
    <div v-reveal class="sheets-showcase-heading">
      <p class="eyebrow">GOOGLE SHEETS · APPS SCRIPT</p>
      <h2 id="sheets-showcase-title">Một bảng tính. Gọn việc mỗi ngày.</h2>
      <p>Mẫu giao diện quản lý dữ liệu và theo dõi tiến độ ngay trong Google Sheets.</p>
    </div>
    <article class="sheet-demo-card">
      <div
        v-reveal
        class="sheet-preview"
        role="img"
        aria-label="Giao diện minh họa SheetFlow: bảng theo dõi đơn hàng, tổng doanh thu và trạng thái xử lý. Số liệu giả định."
      >
        <div class="sheet-window" aria-hidden="true">
          <div class="sheet-window-heading">
            <span class="sheet-file-icon">▦</span>
            <div>
              <strong>SheetFlow — Quản lý đơn hàng</strong
              ><small>Tệp   Chỉnh sửa   Xem   Tiện ích</small>
            </div>
            <span class="sheet-share">Chia sẻ</span>
          </div>
          <div class="sheet-toolbar">
            <span>↶   ↷   |   100%</span><span>Đồng bộ dữ liệu   ·   Tạo báo cáo</span>
          </div>
          <div class="sheet-formula">
            <span>A2</span><i>ƒx</i><span>=SUM(C5:C8)</span>
          </div>
          <div class="sheet-summary">
            <div>
              Doanh thu<strong>24,8 <small>triệu</small></strong>
            </div>
            <div>Đơn hàng<strong>32</strong></div>
            <div>
              Đã hoàn tất<strong>24 <small>/ 32</small></strong>
            </div>
          </div>
          <table class="sheet-data">
            <thead>
              <tr>
                <th></th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>4</th>
                <td>Mã đơn</td>
                <td>Khách hàng</td>
                <td>Giá trị</td>
                <td>Trạng thái</td>
              </tr>
              <tr>
                <th>5</th>
                <td>DH-001</td>
                <td>An Studio</td>
                <td>6.900.000</td>
                <td><span class="sheet-status done">Hoàn tất</span></td>
              </tr>
              <tr>
                <th>6</th>
                <td>DH-002</td>
                <td>Mộc Home</td>
                <td>8.500.000</td>
                <td><span class="sheet-status pending">Đang xử lý</span></td>
              </tr>
              <tr>
                <th>7</th>
                <td>DH-003</td>
                <td>Lá Coffee</td>
                <td>4.200.000</td>
                <td><span class="sheet-status done">Hoàn tất</span></td>
              </tr>
              <tr>
                <th>8</th>
                <td>DH-004</td>
                <td>Nắng Shop</td>
                <td>5.200.000</td>
                <td><span class="sheet-status new">Mới</span></td>
              </tr>
            </tbody>
          </table>
          <div class="sheet-tabs">
            <span>＋   ☰</span><strong>Đơn hàng ▾</strong><span>Khách hàng</span
            ><span>Báo cáo</span>
          </div>
        </div>
        <span class="sheet-preview-note">GIAO DIỆN &amp; SỐ LIỆU MINH HỌA</span>
      </div>
      <div v-reveal="80" class="sheet-demo-copy">
        <span class="sheet-demo-tag">MINH HỌA DỊCH VỤ THEO YÊU CẦU</span>
        <h3>SheetFlow</h3>
        <p>
          Theo dõi đơn hàng, khách hàng và báo cáo trong một giao diện bảng tính dễ dùng.
        </p>
        <ul>
          <li>Tổng quan số liệu ngay đầu bảng</li>
          <li>Trạng thái rõ ràng, dễ theo dõi</li>
          <li>Khung tiện ích đồng bộ và tạo báo cáo</li>
        </ul>
        <div class="sheet-demo-actions">
          <DemoLink sample-id="sheetflow" label="Xem demo Sheets"></DemoLink>
          <NuxtLink
            class="text-link"
            to="/?concept=sheetflow&amp;plan=apps-script#quote-form"
            >Trao đổi từ mẫu này <span aria-hidden="true">→</span></NuxtLink
          >
        </div>
        <p class="sheet-demo-note">
          SheetFlow là giao diện minh họa để trao đổi yêu cầu, không phải mẫu bán sẵn với
          giá 0,9 triệu. Chi phí thiết kế riêng được xác định theo quy trình và tính năng
          bạn cần.
        </p>
      </div>
    </article>
  </section>
</template>
