# An Studio — Demo kiến trúc & nội thất

Project độc lập bằng HTML, CSS và JavaScript, không có dependency npm. Node.js 22.12+ để chạy các script. Có thể chuyển nguyên thư mục này sang repository khác, build và host riêng. Font và ảnh nằm trong project; trình duyệt không cần tải tài nguyên từ bên thứ ba.

## Chạy riêng

```bash
cd demos/an-studio
npm run dev
```

Mở http://localhost:5175. Nút chọn mẫu quay về CoreBrisk tại http://localhost:5174 và điền tên An Studio vào form.

```bash
npm run build
npm run preview
```

Preview tại http://localhost:4175; khi chưa cấu hình URL riêng, nút chọn mẫu quay về bản preview CoreBrisk tại http://localhost:4174. Không cần `npm install` vì chỉ dùng module tích hợp của Node.js. Máy chủ local đọc lại file mỗi request, refresh trình duyệt sau khi sửa.

## Chạy cùng CoreBrisk (mặc định)

Từ thư mục gốc `business-landing`, chạy `npm run dev`, mở http://localhost:5174/demos/an-studio/. Nút **Xem demo** trên landing page mở đường dẫn này ở tab mới.

Build CoreBrisk tự đóng gói nội dung `site/` vào `dist/demos/an-studio/`. Chỉ cần deploy toàn bộ `business-landing/dist/` là cả landing page và demo hoạt động. Không cần chạy thêm máy chủ Node trên hosting.

## Host riêng

Build với URL CoreBrisk thật để các nút chọn mẫu quay về đúng website (ví dụ dưới đây phải thay bằng tên miền của bạn):

```bash
COREBRISK_URL=https://ten-mien-cua-ban.vn npm run build
```

Script nhận biến môi trường từ shell/hosting, không tự đọc `.env`. Đưa nội dung `demos/an-studio/dist/` lên hosting tĩnh. Các đường dẫn tài nguyên tương đối nên demo hỗ trợ cả tên miền riêng và subfolder có dấu `/` cuối.

Trong `.env` của CoreBrisk, đặt `AN_STUDIO_DEMO_URL` bằng URL HTTPS vừa triển khai, sau đó build và deploy lại CoreBrisk. Nếu để trống thì dùng demo đóng kèm. Landing page vẫn đóng kèm demo để đường dẫn mặc định tiếp tục hoạt động.

## Nội dung và tương tác

- Trang giới thiệu, bộ sưu tập 3 concept, dịch vụ, quy trình và CTA.
- Lọc nhà ở/nội thất; xem chi tiết trong dialog, đóng bằng nút hoặc Escape; menu mobile.
- Không JavaScript vẫn đọc được toàn bộ nội dung và mở phần mô tả công trình.
- Các CTA đi về form CoreBrisk với `concept=an-studio`, không giả lập đặt lịch/gửi form thành công.
- Luôn có `noindex, follow` vì đây là concept demo. Không dùng các ảnh này để tuyên bố là công trình thực tế đã thực hiện.

## Cấu trúc

```text
site/                 # HTML, CSS, JS và tài nguyên tĩnh
  assets/             # Ảnh và font tự lưu trữ
scripts/site.mjs       # Đọc file, cấu hình CTA, phục vụ tài nguyên
scripts/build.mjs      # Xuất dist/
scripts/serve.mjs      # Máy chủ dev/preview local
```

Ảnh tham khảo tải từ Unsplash ngày 09/09/2026; dùng theo [Unsplash License](https://unsplash.com/license). Không có liên hệ hay xác nhận hợp tác với chủ ảnh:

- `living.jpg`: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0
- `house.jpg`: https://images.unsplash.com/photo-1600596542815-ffad4c1539a9
- `room.jpg`: https://images.unsplash.com/photo-1600607687920-4e2a09cf159d

Font Be Vietnam Pro: giấy phép đi kèm tại `site/assets/fonts/OFL.txt`.
