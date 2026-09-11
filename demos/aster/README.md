# Aster S5 — Demo gói Launch

Landing page một trang dành cho nhân viên kinh doanh ô tô: giới thiệu một mẫu xe, so sánh phiên bản, chọn màu, tạo yêu cầu báo giá hoặc lái thử. Nội dung viết cụ thể, không có ưu đãi hay cam kết bán hàng giả.

## Chạy

- Cùng CoreBrisk: `npm run dev` ở thư mục gốc, mở http://localhost:5174/demos/aster/.
- Độc lập: tại `demos/aster`, chạy `npm run dev` (5177), `npm run build`, `npm run preview` (4177). Không cần dependency riêng.
- Build gốc đóng kèm demo vào `dist/demos/aster/`. Build riêng tạo `demos/aster/dist/`.
- Host riêng: `COREBRISK_URL=https://ten-mien-corebrisk.vn/ npm run build`; đặt `ASTER_DEMO_URL` ở CoreBrisk thành URL HTTPS của demo rồi build lại.

Nút **Về CoreBrisk** quay về khu vực chọn mẫu. **Chọn mẫu website này** quay về form tư vấn, điền Aster S5 và gói Launch. Dev/preview độc lập mặc định trỏ về CoreBrisk tại cổng 5174/4174.

## Tương tác

- Standard: 649.000.000₫; Premium: 749.000.000₫. Giá giả định, chưa bao gồm các chi phí khác.
- Chọn màu Trắng ngọc hoặc Xám graphite để đổi ảnh. Phiên bản và màu đồng bộ với form.
- Chọn báo giá hoặc lái thử; kiểm tra họ tên, số điện thoại và email nếu nhập.
- Tạo phiếu yêu cầu, sao chép với phương án dự phòng hoặc tải TXT. Không gửi mạng, lưu dữ liệu hoặc xử lý thanh toán.
- Khi tắt JavaScript, vẫn xem nội dung và bảng so sánh; form và lựa chọn tương tác không hoạt động.

Xe, nhân viên, giá và thông số đều minh họa. Khi dùng website thật cần thay dữ liệu, thông tin tư vấn và kết nối form. Demo luôn noindex.

## Ảnh

Ảnh xe được tạo bằng công cụ imagegen tích hợp. Prompt và đường dẫn tài nguyên ghi tại `IMAGE-PROMPTS.md`. Font Be Vietnam Pro có giấy phép tại `site/assets/fonts/OFL.txt`.
