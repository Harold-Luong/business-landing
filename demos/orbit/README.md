# Orbit — Demo WebSheet

Project HTML/CSS/JavaScript độc lập, có sẵn ảnh và font. Không cần cài dependency npm; dùng Node.js 22.12+.

## Xem cùng website

Tại thư mục `websheet`, chạy `npm run build:production` rồi `npm run preview`.
Mở `http://localhost:4174/demos/orbit/`. Nút “Xem demo” trên trang thiết kế website mở mẫu ở tab mới. Khi deploy production, demo được đóng kèm tại `https://websheet.shop/demos/orbit/`.

Nút quay lại dẫn về `/dich-vu/thiet-ke-website/#mau-giao-dien`; nút chọn mẫu dẫn về `/?concept=orbit#lien-he`. Demo luôn `noindex` và không nằm trong sitemap.

## Chạy độc lập

Tại `demos/orbit`, chạy `npm run dev` để mở `http://localhost:5176/`.
Chạy `npm run build` rồi `npm run preview` để mở `http://localhost:4176/`.
Dev trỏ về Nuxt tại cổng 3000; preview trỏ về WebSheet tại cổng 4174.

Nếu host demo riêng, chạy `COREBRISK_URL=https://websheet.shop/ npm run build`, rồi deploy nội dung `dist/`.
`COREBRISK_URL` là tên biến tương thích từ phiên bản cũ, nhận từ shell/CI.
Đặt URL HTTPS của demo vào `NUXT_PUBLIC_ORBIT_DEMO_URL` của WebSheet rồi build/deploy lại website. Để trống biến này để dùng demo đóng kèm.

## Các màn hình

- **Tổng quan:** số công việc, tiến độ dự án, việc sắp đến hạn và hoạt động trong phiên.
- **Công việc:** bảng ba trạng thái hoặc danh sách; tìm theo tên/mô tả, lọc theo dự án và thành viên.
- **Chi tiết công việc:** tạo hoặc sửa tên, mô tả, dự án, người phụ trách, trạng thái, ưu tiên và ngày đến hạn.
- **Dự án:** tiến độ tính từ công việc; mở bảng đã lọc theo dự án.
- **Thành viên:** vai trò và số việc được giao; mở danh sách theo thành viên.

Ứng dụng dùng dữ liệu mẫu và cần JavaScript để tương tác. Thay đổi chỉ nằm trong bộ nhớ của trang, đặt lại khi tải lại; không đăng nhập, gọi API hay gửi thông báo. Demo luôn noindex.

## Mã nguồn và đường dẫn

Giao diện chính: `site/index.html`, `site/app.css`, `site/app.js`. Trang `/` và `/index.html` mở thẳng ứng dụng. Đường dẫn cũ `/app.html` được tạo khi build/phục vụ để các link đã chia sẻ vẫn hoạt động.

Trang giới thiệu cũ được giữ tại `/presentation.html` cùng `site/style.css` và `site/main.js`; không nằm trong luồng **Xem demo**. Build độc lập và build WebSheet đều dùng cùng cấu trúc này.
