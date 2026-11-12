# Aster S5 — Demo WebSheet

Project HTML/CSS/JavaScript độc lập, có sẵn ảnh và font. Không cần cài dependency npm; dùng Node.js 22.12+.

## Xem cùng website

Tại thư mục `websheet`, chạy `npm run build:production` rồi `npm run preview`.
Mở `http://localhost:4174/demos/aster/`. Nút “Xem demo” trên trang thiết kế website mở mẫu ở tab mới. Khi deploy production, demo được đóng kèm tại `https://websheet.shop/demos/aster/`.

Nút quay lại dẫn về `/dich-vu/thiet-ke-website/#mau-giao-dien`; nút chọn mẫu dẫn về `/?concept=aster#lien-he`. Demo luôn `noindex` và không nằm trong sitemap.

## Chạy độc lập

Tại `demos/aster`, chạy `npm run dev` để mở `http://localhost:5177/`.
Chạy `npm run build` rồi `npm run preview` để mở `http://localhost:4177/`.
Dev trỏ về Nuxt tại cổng 3000; preview trỏ về WebSheet tại cổng 4174.

Nếu host demo riêng, chạy `COREBRISK_URL=https://websheet.shop/ npm run build`, rồi deploy nội dung `dist/`.
`COREBRISK_URL` là tên biến tương thích từ phiên bản cũ, nhận từ shell/CI.
Đặt URL HTTPS của demo vào `NUXT_PUBLIC_ASTER_DEMO_URL` của WebSheet rồi build/deploy lại website. Để trống biến này để dùng demo đóng kèm.

## Tương tác

- Standard: 649.000.000₫; Premium: 749.000.000₫. Giá giả định, chưa bao gồm các chi phí khác.
- Chọn màu Trắng ngọc hoặc Xám graphite để đổi ảnh. Phiên bản và màu đồng bộ với form.
- Chọn báo giá hoặc lái thử; kiểm tra họ tên, số điện thoại và email nếu nhập.
- Tạo phiếu yêu cầu, sao chép với phương án dự phòng hoặc tải TXT. Không gửi mạng, lưu dữ liệu hoặc xử lý thanh toán.
- Khi tắt JavaScript, vẫn xem nội dung và bảng so sánh; form và lựa chọn tương tác không hoạt động.

Xe, nhân viên, giá và thông số đều minh họa. Khi dùng website thật cần thay dữ liệu, thông tin tư vấn và kết nối form. Demo luôn noindex.

## Ảnh

Ảnh xe được tạo bằng công cụ imagegen tích hợp. Prompt và đường dẫn tài nguyên ghi tại `IMAGE-PROMPTS.md`. Font Be Vietnam Pro có giấy phép tại `site/assets/fonts/OFL.txt`.
