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

`build` và `generate` là alias cho `build:production`, xuất HTML tĩnh vào `.output/production/public/`. Dev xuất riêng vào `.output/dev/public/`; build môi trường này không xóa output của môi trường kia. `preview`/`preview:dev` phục vụ output tương ứng tại cổng 4174, gồm trang 404. `test:browser` cần Google Chrome tại `/usr/bin/google-chrome` hoặc biến `CHROME_BIN`; test tự mở server local trên cổng trống, chụp ảnh vào `/tmp/websheet-preview/`.

## Cấu hình

Copy `.env.example` thành `.env` để chạy local bằng `npm run dev`. Các lệnh build/test/deploy dùng `.env.development` cho dev và `.env.production` cho production; cả hai file đã commit và chỉ chứa cấu hình public. Script `scripts/environment.mjs` cố định URL theo môi trường, kể cả khi CI có biến `NUXT_PUBLIC_SITE_URL` cũ. Email và URL demo có thể được truyền riêng từ shell/CI cho từng môi trường; các lệnh này không tự đọc `.env` local. Không thêm secret vào file đã commit.

| Biến | Công dụng |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | Dev: trống, không canonical/sitemap. Production: `https://websheet.shop/`. Được cố định bởi lệnh môi trường, không ghi đè bằng biến CI |
| `NUXT_PUBLIC_CONTACT_EMAIL` | Email nhận bản yêu cầu qua ứng dụng email của khách; để trống thì ẩn nút email |
| `NUXT_PUBLIC_ASTER_DEMO_URL` | URL HTTPS demo Aster được triển khai riêng |
| `NUXT_PUBLIC_AN_STUDIO_DEMO_URL` | URL HTTPS demo An Studio được triển khai riêng |
| `NUXT_PUBLIC_ORBIT_DEMO_URL` | URL HTTPS demo Orbit được triển khai riêng |
| `NUXT_PUBLIC_SHEETS_DEMO_URL` | URL HTTPS demo Sheets được triển khai riêng |

URL demo trống hiển thị “Demo đang chuẩn bị”; thẻ mẫu và CTA tư vấn vẫn hoạt động. URL sai làm build thất bại. Không có fallback `/demos/`, không copy source hoặc build demo cùng landing. Thay biến cần generate lại vì đây là SSG.

SEO production đã cấu hình cho `websheet.shop`. Lần kiểm tra ngày 30/10/2026, domain vẫn phục vụ trang giữ chỗ Hostinger; cần gắn domain vào deployment WebSheet trước khi đưa bản production vào sử dụng. URL demo thật chưa được cung cấp.

Thông tin liên hệ đã được xác nhận: email `ductrong.luongnguyen@gmail.com`, Zalo `0975 6666 14` (`https://zalo.me/0975666614`), hotline `0947787904`. Dữ liệu chung ở `shared/contact.ts`; email mặc định có trong cả hai môi trường và `.env.example`. Biến `NUXT_PUBLIC_CONTACT_EMAIL` vẫn có thể ghi đè (chuỗi rỗng ẩn link email). Khu vực Liên hệ có link email/Zalo/gọi điện; dialog mở ứng dụng email kèm bản yêu cầu, người dùng tự xác nhận gửi. Không tự gửi tin nhắn hoặc gọi điện.

Để build và kiểm tra dev:

```bash
npm run build:dev
npm run test:output:dev
npm run preview:dev
```

Dev có `noindex, follow` trong HTML và header `X-Robots-Tag` qua file `_headers` của Cloudflare. Robots cho phép crawl để đọc noindex và không khai báo sitemap. Production có canonical/sitemap và không có header noindex của dev. Dùng đúng lệnh `:dev` hoặc `:production`, không dùng cách ghi đè URL thành chuỗi rỗng ở các hướng dẫn cũ.

## Các phần đã dựng

- Sáu route public, hai layout dùng chung `SiteHeader` và menu mobile. Menu dịch vụ dẫn về các section trang chủ, đánh dấu Dịch vụ; homepage đánh dấu section đang xem.
- Nội dung chung (quy trình, liên hệ) ở landing; trang dịch vụ giữ giải pháp, phạm vi, demo và FAQ chuyên biệt. Website có một khu vực so sánh gói, gallery không lặp giá. Apps Script/AppSheet giữ panel giá thiết kế riêng. CTA cuối trang được rút gọn và chọn sẵn dịch vụ trong form.
- Hai thẻ chọn dịch vụ có preview HTML/CSS An Studio và SheetFlow ngay trong thẻ; không có section mẫu riêng trên trang chủ. Gallery đầy đủ nằm ở trang dịch vụ. Link cũ `/#giao-dien` đưa về nhóm dịch vụ.
- Năm gói giá, lấy giá/nhãn/features từ registry; giá Google là thiết kế riêng theo yêu cầu.
- Form có validation; query chọn plan/concept, giữ draft trong bộ nhớ khi chuyển trang, không lưu localStorage.
- Dialog tạo bản yêu cầu, sao chép, tải TXT UTF-8 BOM và `mailto:` có điều kiện. **Không gọi API, không tự gửi email hoặc nhận đơn hàng.**
- Head riêng theo trang, JSON-LD, canonical/robots/sitemap theo cùng cấu hình site URL. Giữ token Search Console cũ để đối chiếu; cần xác minh property domain mới riêng.
- Font Be Vietnam Pro local, ảnh preview tối ưu và nhận diện WebSheet.
- Hiệu ứng cuộn dùng `v-reveal` + một Intersection Observer chung: fade/slide nhẹ từng block, chạy một lần; giữ nội dung đầu màn hình, no-JS, reduced motion, focus bàn phím và bản in luôn đọc được. Không thêm thư viện animation.

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

Hai environment Wrangler dùng `404-page` và được chọn tường minh; lệnh `wrangler deploy` không có `--env` sẽ không có assets để deploy.

| | Dev | Production |
|---|---|---|
| Worker | `websheet-dev` | `websheet` |
| Địa chỉ | `https://websheet-dev.<account-subdomain>.workers.dev/` | `https://websheet.shop/` |
| Custom domain | Không | `websheet.shop` |
| Build | `npm run build:dev` | `npm run build:production` |
| Output | `.output/dev/public/` | `.output/production/public/` |
| Kiểm thử output | `npm run test:output:dev` | `npm run test:output` |
| Kiểm thử trình duyệt | `npm run test:browser:dev` | `npm run test:browser` |
| Deploy | `npm run deploy:dev` | `npm run deploy:production` |
| Google index | Tắt | Bật |

Wrangler được cài trong project này. Đăng nhập bằng `npx wrangler login`, hoặc cung cấp `CLOUDFLARE_API_TOKEN` và `CLOUDFLARE_ACCOUNT_ID` trong secret CI. `deploy:dev`/`deploy:production` tự build, kiểm thử output rồi mới upload; thêm `-- --dry-run` để kiểm tra đóng gói mà không deploy.

Cloudflare Git Builds: tạo hai Worker, chọn root directory `websheet`. Nhánh `dev` dùng build `npm run build:dev`, deploy `npm run deploy:dev`; nhánh production (ví dụ `main`) dùng build `npm run build:production`, deploy `npm run deploy:production`. Các lệnh deploy sẽ build/kiểm tra lại để tránh dùng output của môi trường khác. Repo không tự tạo nhánh, liên kết Git hoặc thiết lập trigger trên dashboard.

Production tắt URL `workers.dev` và version preview, chỉ phục vụ custom domain. Trước khi deploy production, zone `websheet.shop` phải hoạt động trong tài khoản Cloudflare; nếu DNS còn quản lý ở Hostinger, cần chuyển nameserver theo hướng dẫn Cloudflare. Wrangler đăng ký Custom Domain khi deploy nhưng không tự sửa nameserver tại nhà đăng ký. Dev không cần domain riêng. Xem [Cloudflare environments](https://developers.cloudflare.com/workers/wrangler/environments/) và [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

`robots.txt`/`sitemap.xml` được sinh từ cùng site URL/route registry khi build; không sửa output thủ công. Sau deploy, kiểm tra trang chủ, năm route dịch vụ, robots, sitemap, favicon và HTTP 404. Dev không có sitemap; production có XML chứa sáu URL `https://websheet.shop/…`.

Xác minh property `websheet.shop` trong Search Console rồi gửi `https://websheet.shop/sitemap.xml`; token cũ không chứng minh domain mới đã được xác minh. Nếu phục vụ hostname cũ hoặc `www`, cấu hình redirect 301/308 theo từng path sau khi domain chính hoạt động. Chưa đăng nhập Cloudflare trên máy tại thời điểm thiết lập; việc build/dry-run không có nghĩa đã deploy online.

Nguồn ảnh Aster: preview từ concept demo hiện có, xe và thông số giả định; không phải dự án khách hàng thật. Giấy phép font đi kèm `public/fonts/OFL.txt`.
