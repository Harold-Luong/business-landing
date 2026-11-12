# An Studio — Demo WebSheet

Project HTML/CSS/JavaScript độc lập, có sẵn ảnh và font. Không cần cài dependency npm; dùng Node.js 22.12+.

## Xem cùng website

Tại thư mục `websheet`, chạy `npm run build:production` rồi `npm run preview`.
Mở `http://localhost:4174/demos/an-studio/`. Nút “Xem demo” trên trang thiết kế website mở mẫu ở tab mới. Khi deploy production, demo được đóng kèm tại `https://websheet.shop/demos/an-studio/`.

Nút quay lại dẫn về `/dich-vu/thiet-ke-website/#mau-giao-dien`; nút chọn mẫu dẫn về `/?concept=an-studio#lien-he`. Demo luôn `noindex` và không nằm trong sitemap.

## Chạy độc lập

Tại `demos/an-studio`, chạy `npm run dev` để mở `http://localhost:5175/`.
Chạy `npm run build` rồi `npm run preview` để mở `http://localhost:4175/`.
Dev trỏ về Nuxt tại cổng 3000; preview trỏ về WebSheet tại cổng 4174.

Nếu host demo riêng, chạy `COREBRISK_URL=https://websheet.shop/ npm run build`, rồi deploy nội dung `dist/`.
`COREBRISK_URL` là tên biến tương thích từ phiên bản cũ, nhận từ shell/CI.
Đặt URL HTTPS của demo vào `NUXT_PUBLIC_AN_STUDIO_DEMO_URL` của WebSheet rồi build/deploy lại website. Để trống biến này để dùng demo đóng kèm.

## Nội dung và tương tác

- Trang giới thiệu, bộ sưu tập 3 concept, dịch vụ, quy trình và CTA.
- Lọc nhà ở/nội thất; xem chi tiết trong dialog, đóng bằng nút hoặc Escape; menu mobile.
- Không JavaScript vẫn đọc được toàn bộ nội dung và mở phần mô tả công trình.
- Các CTA đi về phần liên hệ WebSheet với `concept=an-studio`, không giả lập đặt lịch/gửi form thành công.
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
