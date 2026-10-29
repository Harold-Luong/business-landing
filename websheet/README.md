# WebSheet — Nuxt / Vue 3

Website tĩnh giới thiệu dịch vụ thiết kế website, Google Sheets, Apps Script và AppSheet. Đã dựng trang chủ và năm trang dịch vụ bằng Nuxt 4 + Vue 3 + Vite + TypeScript, giữ giao diện và nội dung theo [đặc tả](NUXT_VUE3_DESIGN.md) và [hướng dẫn code](AI_CODING_GUIDE.md).

## Chạy local

Dùng Node.js 24 (môi trường đã kiểm tra: 24.19.0), npm và lockfile trong thư mục này.

```bash
cd websheet
npm ci
npm run dev
```

Dev server mặc định tại `http://localhost:3000`. Project này độc lập với Vite ở thư mục cha; build không đọc source, CSS hay demo từ project cha.

```bash
npm run typecheck
npm run generate
npm run test:output
npm run test:browser
npm run preview
```

`generate` xuất HTML tĩnh và assets vào `.output/public/`. `preview` phục vụ output tĩnh tại cổng 4174, gồm trang 404. `test:browser` cần Google Chrome tại `/usr/bin/google-chrome` hoặc biến `CHROME_BIN`; test tự mở server local trên cổng trống, chụp ảnh vào `/tmp/websheet-preview/`.

## Cấu hình

Copy `.env.example` thành `.env`, chỉ điền các thông tin đã có. Tất cả biến `NUXT_PUBLIC_*` đều là public.

| Biến | Công dụng |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | Trống: preview/noindex, không canonical/sitemap. Khi tên miền đã phục vụ HTTPS: đặt `https://websheet.shop/` rồi generate lại |
| `NUXT_PUBLIC_CONTACT_EMAIL` | Email nhận bản yêu cầu qua ứng dụng email của khách; để trống thì ẩn nút email |
| `NUXT_PUBLIC_ASTER_DEMO_URL` | URL HTTPS demo Aster được triển khai riêng |
| `NUXT_PUBLIC_AN_STUDIO_DEMO_URL` | URL HTTPS demo An Studio được triển khai riêng |
| `NUXT_PUBLIC_ORBIT_DEMO_URL` | URL HTTPS demo Orbit được triển khai riêng |
| `NUXT_PUBLIC_SHEETS_DEMO_URL` | URL HTTPS demo Sheets được triển khai riêng |

URL demo trống hiển thị “Demo đang chuẩn bị”; thẻ mẫu và CTA tư vấn vẫn hoạt động. URL sai làm build thất bại. Không có fallback `/demos/`, không copy source hoặc build demo cùng landing. Thay biến cần generate lại vì đây là SSG.

Tên miền `websheet.shop` đã mua; project chưa xác minh DNS/HTTPS hoặc deploy. Không có email liên hệ hay URL demo thật được tự đặt vào cấu hình.

## Các phần đã dựng

- Sáu route public, layout trang chủ/dịch vụ, menu mobile và đánh dấu section đang xem.
- Hai sample teaser ở trang chủ, gallery Website và SheetFlow ở trang dịch vụ.
- Năm gói giá, lấy giá/nhãn/features từ registry; giá Google là thiết kế riêng theo yêu cầu.
- Form có validation; query chọn plan/concept, giữ draft trong bộ nhớ khi chuyển trang, không lưu localStorage.
- Dialog tạo bản yêu cầu, sao chép, tải TXT UTF-8 BOM và `mailto:` có điều kiện. **Không gọi API, không tự gửi email hoặc nhận đơn hàng.**
- Head riêng theo trang, JSON-LD, canonical/robots/sitemap theo cùng cấu hình site URL. Giữ token Search Console cũ để đối chiếu; cần xác minh property domain mới riêng.
- Font Be Vietnam Pro local, ảnh preview tối ưu và nhận diện WebSheet.

Biểu tượng chữ W và ảnh chia sẻ là phương án nhận diện tạm để thay bộ CoreBrisk; có thể thay khi chốt logo. Các ảnh đã sinh sẵn nằm trong `public/`; build/Cloudflare không cần Chrome. Tái tạo bằng `npm run generate:brand` khi cần.

## Cấu trúc

- `app/pages/`: trang chủ và năm trang dịch vụ.
- `app/components/`: header/footer, home, pricing, preview, service, form/dialog.
- `app/data/`: giá, FAQ, nội dung dịch vụ, mẫu và navigation.
- `app/composables/`: head, active section, draft/query và URL demo.
- `app/assets/css/`: CSS/font đã chuyển vào project này.
- `shared/site.ts`: metadata và route registry; `shared/config.ts`: validate URL, robots/sitemap.
- `nuxt.config.ts`: Vite builder, prerender và xuất robots/sitemap sau generate.
- `tests/`: kiểm thử HTML/assets/SEO và trình duyệt; không kiểm thử ứng dụng nội bộ của demo.

Các module UI/editor có sẵn trong scaffold không được bật trong `nuxt.config.ts`; giao diện dùng CSS của WebSheet. Bộ dependency scaffold được giữ; chỉ bổ sung công cụ typecheck cần thiết.

## Triển khai

`wrangler.jsonc` trỏ tới `.output/public` và dùng `404-page`. Chạy generate với biến public thực tế, kiểm tra output rồi mới deploy. Tên Worker đề xuất là `websheet`; file cấu hình này chưa thực hiện tạo Worker, gắn domain hay redirect host cũ.

Nguồn ảnh Aster: preview từ concept demo hiện có, xe và thông số giả định; không phải dự án khách hàng thật. Giấy phép font đi kèm `public/fonts/OFL.txt`.
