# Orbit — Demo ứng dụng quản lý công việc

Orbit là mẫu giao diện web app của CoreBrisk, dùng HTML/CSS/JavaScript thuần và font local. Bấm **Xem demo** trên thẻ Orbit ở CoreBrisk để vào thẳng ứng dụng.

## Chạy cùng CoreBrisk

Từ thư mục gốc: `npm run dev`, mở **http://localhost:5174/demos/orbit/**. Build gốc đóng kèm vào `dist/demos/orbit/`.

## Chạy độc lập

Tại `demos/orbit`, chạy `npm run dev` rồi mở **http://localhost:5176/**. `npm run build` tạo bản triển khai trong `dist/`; `npm run preview` phục vụ tại cổng 4176. Không cần cài dependency riêng.

Các nút **Về trang CoreBrisk** quay về khu vực chọn mẫu; **Chọn mẫu này** quay về form tư vấn và điền sẵn Orbit. Khi chạy riêng, các link này trỏ đến CoreBrisk tại cổng 5174 (dev) hoặc 4174 (preview).

Khi host riêng, build với `COREBRISK_URL=https://ten-mien-corebrisk-thuc-te.vn/ npm run build`, rồi deploy thư mục `dist/` của demo. `COREBRISK_URL` nhận URL HTTPS hoặc đường dẫn bắt đầu bằng `/`. Ở CoreBrisk, đặt `ORBIT_DEMO_URL` thành URL HTTPS mở trực tiếp ứng dụng rồi build lại.

## Các màn hình

- **Tổng quan:** số công việc, tiến độ dự án, việc sắp đến hạn và hoạt động trong phiên.
- **Công việc:** bảng ba trạng thái hoặc danh sách; tìm theo tên/mô tả, lọc theo dự án và thành viên.
- **Chi tiết công việc:** tạo hoặc sửa tên, mô tả, dự án, người phụ trách, trạng thái, ưu tiên và ngày đến hạn.
- **Dự án:** tiến độ tính từ công việc; mở bảng đã lọc theo dự án.
- **Thành viên:** vai trò và số việc được giao; mở danh sách theo thành viên.

Ứng dụng dùng dữ liệu mẫu và cần JavaScript để tương tác. Thay đổi chỉ nằm trong bộ nhớ của trang, đặt lại khi tải lại; không đăng nhập, gọi API hay gửi thông báo. Demo luôn noindex.

## Mã nguồn và đường dẫn

Giao diện chính: `site/index.html`, `site/app.css`, `site/app.js`. Trang `/` và `/index.html` mở thẳng ứng dụng. Đường dẫn cũ `/app.html` được tạo khi build/phục vụ để các link đã chia sẻ vẫn hoạt động.

Trang giới thiệu cũ được giữ tại `/presentation.html` cùng `site/style.css` và `site/main.js`; không nằm trong luồng **Xem demo**. Build độc lập và build CoreBrisk đều dùng cùng cấu trúc này.
