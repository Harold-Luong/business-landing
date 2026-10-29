# CoreBrisk — Google Sheets, AppSheet & thiết kế website

Đặc tả UI, nội dung, hành vi, SEO và kế hoạch chuyển sang Nuxt/Vue 3: [NUXT_VUE3_DESIGN.md](NUXT_VUE3_DESIGN.md). Đây là tài liệu chuẩn bị migration; mã nguồn hiện tại vẫn dùng Vite. Thương hiệu đích đã chốt là **WebSheet**, tên miền **websheet.shop** đã mua theo xác nhận của người dùng (DNS/HTTPS và triển khai chưa xác nhận); mã nguồn hiện còn tên CoreBrisk. Phạm vi vẫn là website tĩnh giới thiệu dịch vụ, chưa có API bán hàng.

Project **độc lập** dùng Vite + HTML + CSS + JavaScript. Có `package.json`, lockfile và quy trình build riêng; có thể chuyển cả thư mục này sang repository khác. Không cần Vue hoặc các file của project cha.

Nội dung chính được viết sẵn trong HTML, có thể đọc khi tắt JavaScript. JavaScript bổ sung menu di động và tiện ích tạo yêu cầu tư vấn. Project demo An Studio có thêm bộ lọc và xem chi tiết công trình. Orbit mở trực tiếp ứng dụng quản lý công việc với tổng quan, dự án và thành viên. Không có backend, CMS hay dịch vụ gửi email trong project này.

Hướng dẫn cho AI triển khai hệ thống mới: [AI_CODING_GUIDE.md](AI_CODING_GUIDE.md), gồm cấu trúc thư mục, quy tắc code, màu sắc, font, responsive và checklist kiểm tra.

## Chạy local

Yêu cầu Node.js 20.19+ hoặc 22.12+; khuyến nghị Node.js 24. Các tiện ích kiểm thử trình duyệt yêu cầu Node.js 22.12+ và Google Chrome.

```bash
cd business-landing
npm ci
npm run dev
```

Mở **http://localhost:5174**. Port riêng giúp chạy cùng project hiện có.

```bash
npm run build
npm run preview
```

Bản production nằm trong `dist/`; bản preview ở **http://localhost:4174**. Có thể đưa toàn bộ nội dung `dist/` lên hosting tĩnh hỗ trợ HTTPS. Project hiện hỗ trợ triển khai tại **thư mục gốc của tên miền**, không phải subfolder.

## Những phần đã có

- Giao diện tiếng Việt cho desktop, tablet, mobile; font Be Vietnam Pro WOFF2 tự lưu trữ và giấy phép đi kèm.
- Hai nhóm dịch vụ Google Sheets/ứng dụng nội bộ và website, sáu gói giá, ba mẫu concept, quy trình và FAQ.
- Nút chọn gói điền sẵn gói tư vấn; nút chọn concept bổ sung mô tả mà vẫn giữ nội dung đã nhập.
- Demo An Studio độc lập, mở từ nút **Xem demo**; nút **Chọn mẫu này** quay về form và điền sẵn tên mẫu.
- Form kiểm tra dữ liệu, tạo bản yêu cầu, sao chép với phương án dự phòng và tải `.txt` có dấu tiếng Việt.
- Hộp thoại native với quản lý focus, phím Escape, thông báo đọc được bởi screen reader; skip link và hỗ trợ giảm chuyển động.
- HTML tĩnh, `lang="vi"`, một H1, meta description, Open Graph, Twitter Card và JSON-LD `ProfessionalService`.
- Canonical, `robots.txt`, sitemap và ảnh chia sẻ PNG 1200 × 630 theo cấu hình tên miền.
- Năm trang dịch vụ riêng với title/description, canonical, schema `Service` và breadcrumb; liên kết từ trang chủ và giữa các dịch vụ.

## Nội dung trang chủ

Ngay dưới Hero là hai thẻ **Google Automation** và **Website & Web App**, thay cho sáu thẻ dịch vụ riêng lẻ. Google Automation đứng trước; desktop hiển thị hai cột, tablet/mobile xếp dọc. Mỗi thẻ có một mô tả ngắn, **Khám phá dịch vụ** dẫn tới trang nhóm và nút tư vấn chọn sẵn `automation` hoặc `website`. Style cùng breakpoint nằm trong `src/styles/services.css`.

Trang tổng quan `/dich-vu/google-automation/` giúp chọn Apps Script, AppSheet hoặc tiện ích Sheets rồi mở trang chi tiết tương ứng. Nhóm Website dẫn tới `/dich-vu/thiet-ke-website/`. Phía dưới dùng chung mẫu Website, bảng giá, quy trình, sáu FAQ và form tư vấn; các demo hiện có được ghi rõ là mẫu Website.

Phạm vi đầy đủ, điều kiện triển khai và FAQ chuyên sâu được quản lý trong `dich-vu/*/index.html`. Phần kỹ thuật/bàn giao được gộp vào trang dịch vụ; các demo chỉ giới thiệu ở khu vực mẫu giao diện. Khi đổi giá hay phạm vi, đồng bộ thông tin tóm tắt trên trang chủ với trang chi tiết.

## Trang dịch vụ & SEO

Các trang là HTML tĩnh, có nội dung và điều hướng đầy đủ khi tắt JavaScript:

| Dịch vụ                       | URL                                | Mã nguồn                                    |
| ----------------------------- | ---------------------------------- | ------------------------------------------- |
| Google Automation (tổng quan) | `/dich-vu/google-automation/`      | `dich-vu/google-automation/index.html`      |
| Apps Script                   | `/dich-vu/google-apps-script/`     | `dich-vu/google-apps-script/index.html`     |
| AppSheet                      | `/dich-vu/appsheet/`               | `dich-vu/appsheet/index.html`               |
| Tiện ích Sheets               | `/dich-vu/tien-ich-google-sheets/` | `dich-vu/tien-ich-google-sheets/index.html` |
| Thiết kế website              | `/dich-vu/thiet-ke-website/`       | `dich-vu/thiet-ke-website/index.html`       |

Metadata và danh sách URL nằm trong `src/seo.mjs`; Vite build cả sáu trang qua `build.rolldownOptions.input`. CSS cho trang chi tiết nằm trong `src/service.css`. Nút tư vấn dẫn về `/?plan=...#lien-he` và chọn sẵn dịch vụ hợp lệ trong form.

Khi chưa có tên miền chính thức, để trống `SITE_URL`: **cả sáu trang giữ `noindex`**, không tạo canonical hoặc sitemap chứa tên miền giả. Khi đã có tên miền, điền `.env` rồi chạy `npm run build`; sitemap sẽ chứa trang chủ và năm trang dịch vụ, không chứa các demo. Canonical và `og:url` của từng trang trỏ về URL riêng có dấu `/` cuối.

Hosting cần phục vụ các thư mục con bằng `index.html` tương ứng, không rewrite mọi URL về trang chủ. Nếu hosting có thể phục vụ cả `/index.html` lẫn `/`, nên cấu hình chuyển hướng về dạng URL thư mục; canonical đã dùng dạng này. Cấu hình hostname/HTTPS và kiểm tra Core Web Vitals trên môi trường public thực hiện sau khi có tên miền.

Ảnh xem trước Aster trên trang chủ dùng WebP 480px (~12 KB) và 960px (~35 KB), có `srcset`, `sizes`, kích thước cố định và lazy loading. Nguồn gốc vẫn ở `demos/aster/site/assets/aster-white.png`; bản PNG trùng trong `public/` đã được thay thế. Các ảnh demo độc lập giữ nguyên.

## Báo giá Google Sheets & ứng dụng nội bộ

Nhóm báo giá tại `/#bang-gia-google` gồm Google Apps Script (từ 0,9 triệu/dự án) và AppSheet (từ 7,9 triệu/dự án). Đây là chi phí thiết kế và triển khai theo yêu cầu riêng của khách hàng, không phải giá mua mẫu làm sẵn. Mẫu làm sẵn có giá thấp hơn và sẽ có bảng giá riêng theo từng sản phẩm. Demo hiện tại chỉ minh họa giao diện. Chi phí bản quyền, dịch vụ bên thứ ba và yêu cầu mở rộng được tách riêng.

Nút tư vấn chọn sẵn dịch vụ trong form. Bản yêu cầu dùng tiêu đề chung cho dự án và tải xuống dưới tên `yeu-cau-tu-van-du-an.txt`. Khi đổi giá, cập nhật bảng giá và option trong `index.html`, các trang `dich-vu/*/index.html` (gồm trang tổng quan Google Automation), metadata trong `src/seo.mjs` và kỳ vọng tương ứng trong `tests/browser.mjs`.

## Bảng giá và so sánh gói

Trang chủ giữ hai thẻ **Một số mẫu tham khảo**, dẫn đến `/dich-vu/thiet-ke-website/#mau-giao-dien` (Aster, An Studio, Orbit) và `/dich-vu/google-apps-script/#mau-giao-dien` (SheetFlow). Các nút chọn mẫu trên trang dịch vụ quay về form trang chủ qua query `concept` và `plan`.

Trang Google Apps Script có khung Google Sheets **SheetFlow** với bảng đơn hàng và số liệu minh họa bằng HTML/CSS. Đây là preview tĩnh, chưa kết nối Google Sheets. Đặt `SHEETS_DEMO_URL` thành URL HTTPS của demo bên ngoài rồi build lại để hiện nút **Xem demo Sheets**; để trống sẽ hiện **Demo đang chuẩn bị**. Nút **Trao đổi từ mẫu này** chọn Apps Script và điền tên mẫu vào form; phần ghi chú giải thích rõ đây là minh họa dịch vụ thiết kế riêng.

Hai nhóm **Google Automation** và **Website & web app** có liên kết chuyển nhanh ngay đầu bảng giá; Google Automation vẫn đứng trước. Thẻ Automation mặc định chỉ hiện giá, phạm vi chính, tiến độ và CTA. Bảng Website so sánh Launch / Business / Custom theo phạm vi, CMS, tiến độ và bảo hành, làm nổi bật cột Business được đề xuất.

Mỗi gói có **Xem chi tiết** bằng `details/summary` để mở/đóng tính năng ngay tại chỗ, dùng được bằng bàn phím và khi tắt JavaScript. CTA chọn sẵn gói rồi dẫn đến `#quote-form`. Nội dung tính năng trong phần mở rộng cần đồng bộ với trang dịch vụ khi thay đổi phạm vi.

Bảng Website gồm ba cột Launch, Business và Custom; tên tiêu chí nằm trong từng ô. Trên mobile, bảng cuộn ngang bên trong khung. Bảng có hướng dẫn cuộn, tiêu đề cột và tên vùng cho trình đọc màn hình. CSS bảng giá cùng breakpoint nằm trong `src/styles/pricing.css`. `tests/pricing.mjs` kiểm tra mở/đóng chi tiết, bàn phím, chế độ không JavaScript, cuộn mobile và chọn gói ở sáu độ rộng.

> **Kiến trúc hệ thống Nuxt mới đã chốt:** chỉ nhận URL demo ngoài, không chứa mã demo hoặc build/copy demo cùng landing. Các hướng dẫn đóng kèm bên dưới mô tả project Vite hiện tại. Xem mục 9.3 trong [tài liệu thiết kế](NUXT_VUE3_DESIGN.md#93-quyết-định-đích-chỉ-nhận-url-demo-ngoài).

## Demo An Studio

Mã nguồn project riêng tại [`demos/an-studio/`](demos/an-studio/README.md). Khi chạy `npm run dev`, mở **http://localhost:5174/demos/an-studio/** hoặc bấm **Xem demo** trên thẻ An Studio. Nút **Chọn mẫu này** nằm trên trang dịch vụ Thiết kế website và dẫn về form trang chủ.

`npm run build` tự đóng kèm demo vào `dist/demos/an-studio/`; deploy toàn bộ `dist/` để link hoạt động. Demo luôn `noindex` và không có trong sitemap của CoreBrisk.

Nếu muốn host demo riêng, làm theo README của demo, sau đó đặt trong `.env` của landing page:

```dotenv
AN_STUDIO_DEMO_URL=https://url-demo-thuc-te-cua-ban.vn/
```

Để trống thì dùng demo đóng kèm. Sau khi đổi URL phải build lại landing page. Biến này chỉ nhận URL HTTPS, không chứa tài khoản/mật khẩu; không dùng URL localhost cho bản public. Orbit cũng có demo đóng kèm tại `/demos/orbit/`; có thể cấu hình host riêng bằng `ORBIT_DEMO_URL`.

## Cá nhân hóa trước khi sử dụng thật

Thương hiệu sử dụng trong project là **CoreBrisk**. **Giá, phạm vi và thời gian thực hiện là nội dung mẫu.** Ba mẫu Aster S5, An Studio và Orbit là concept minh họa, không phải dự án khách hàng đã triển khai. Chỉnh nội dung theo năng lực và chính sách dịch vụ thực tế trước khi xuất bản.

| Cần thay                                          | File                                                    |
| ------------------------------------------------- | ------------------------------------------------------- |
| Thương hiệu, dịch vụ, giá, thời gian, FAQ, footer | `index.html`                                            |
| Title, description và thông tin schema            | `src/seo.mjs`                                           |
| Tên thương hiệu trong bản yêu cầu và email        | `src/main.js`                                           |
| Thứ tự nạp CSS                                    | `src/style.css`                                         |
| Màu sắc, font, thành phần chung                   | `src/styles/base.css`                                   |
| Style từng section                                | `src/styles/hero.css`, `services.css`, `pricing.css`, … |
| Bố cục responsive                                 | `src/styles/responsive/`                                |
| Logo favicon                                      | `public/favicon.svg`                                    |
| Thiết kế ảnh chia sẻ                              | `scripts/social-card.html`                              |
| Tên miền và email liên hệ                         | `.env` (tạo từ `.env.example`)                          |

Khi sửa giá, cập nhật đồng bộ bảng giá, các option chọn gói trong `index.html`, các trang dịch vụ và description trong `src/seo.mjs`. Website chỉ giới thiệu dịch vụ; project này không triển khai hệ thống CMS, backend, Apps Script hoặc AppSheet cho khách hàng.

### Cấu hình public

```bash
cp .env.example .env
```

Điền tên miền HTTPS thật và email nhận tư vấn thật:

```dotenv
SITE_URL=https://ten-mien-cua-ban.vn
VITE_CONTACT_EMAIL=tu-van@ten-mien-cua-ban.vn
```

Giá trị trên chỉ là ví dụ. `.env` không được commit. Thông tin bắt đầu bằng `VITE_` được đưa vào frontend; **không đặt mật khẩu hoặc secret trong đó**.

`SITE_URL` phải là URL gốc, không có đường dẫn con, query, hash hoặc username/password. Khi biến này trống, bản build có **`noindex, follow`**, không sinh canonical và sitemap. Khi có tên miền, bản build chuyển sang `index, follow`, sinh canonical, URL ảnh chia sẻ và `sitemap.xml` khớp nhau. Cần **build lại** sau khi đổi `.env`; lưu ý cấu hình riêng cho preview/staging.

### Hành vi form tư vấn

CTA chính ở Hero là **Trao đổi dự án**, dẫn thẳng tới `#quote-form`; CTA phụ **Xem dự án mẫu** dẫn tới `#giao-dien`. Hai nhóm dịch vụ chỉ giữ liên kết **Khám phá dịch vụ**. Các mẫu có liên kết **Chọn mẫu này**, bảng giá website có nút **Chọn gói này**, còn Apps Script/AppSheet dùng **Trao đổi yêu cầu** để điền sẵn dịch vụ trong form. Header dùng **Liên hệ**; thông tin tư vấn ban đầu miễn phí chỉ xuất hiện dưới CTA Hero. CTA Hero giữ dịch vụ đã chọn và dữ liệu đã nhập. Trên mobile, nút chính toàn chiều ngang, cao tối thiểu 52px; CTA phụ có vùng bấm tối thiểu 44px.

Nút **Tạo yêu cầu tư vấn** chỉ tạo bản mô tả trên thiết bị. Dữ liệu không được gửi qua mạng, không lưu vào localStorage và không tự mở ứng dụng bên ngoài.

- **Sao chép:** copy nội dung; khi trình duyệt không cấp quyền clipboard, chọn sẵn văn bản để người dùng copy thủ công.
- **Tải file:** tải bản mô tả dạng `.txt`.
- **Mở ứng dụng email:** chỉ hiện khi `VITE_CONTACT_EMAIL` hợp lệ. Nút dùng `mailto:` để mở bản nháp; người dùng tự xác nhận gửi trong ứng dụng email. Yêu cầu dài có thể vượt giới hạn của ứng dụng email, khi đó dùng bản sao chép/file tải về.

Để nhận lead trực tiếp trên website, cần bổ sung endpoint backend hoặc dịch vụ form, xử lý thông báo thành công/thất bại, chống spam và chính sách dữ liệu phù hợp. Hiện giao diện không giả lập gửi thành công.

## Kiểm tra

```bash
npm test
npm run test:browser
```

`npm test` kiểm tra URL cấu hình và thực hiện hai build thực trong thư mục tạm: chế độ preview và chế độ tên miền public. Kiểm tra nội dung HTML, title/description riêng cho sáu trang, canonical, schema, breadcrumb, robots, đủ URL sitemap và tài nguyên của trang dịch vụ. Tên miền `corebrisk.test` chỉ dùng trong kiểm thử, không được cấu hình làm tên miền triển khai.

`npm run test:browser` build project rồi dùng Chrome headless kiểm tra 6 độ rộng 320–1440px, menu, chọn gói/concept, dữ liệu form, dialog, clipboard, tải TXT, FAQ và nội dung khi tắt JavaScript. Script dùng cổng 4187 và tự dừng máy chủ sau khi xong; `VITE_CONTACT_EMAIL` nên để trống khi chạy bộ kiểm tra này. Có thể đặt `CHROME_BIN` nếu Chrome ở vị trí khác. Bộ kiểm tra cũng xác minh An Studio ở 6 độ rộng, bộ lọc, dialog công trình, ảnh local, nội dung khi tắt JavaScript và luồng chọn mẫu quay về form. Ảnh kiểm tra được lưu vào `/tmp/corebrisk-*.png` và `/tmp/an-studio-*.png` trên Linux.

`tests/services.mjs` kiểm tra năm trang dịch vụ ở sáu độ rộng, liên kết từ trang chủ, FAQ, nội dung khi tắt JavaScript, chọn đúng dịch vụ khi quay về form và ảnh WebP responsive. Ảnh kiểm tra trang dịch vụ nằm ở `/tmp/corebrisk-service-*.png`.

```bash
# Sau khi thay thương hiệu trong scripts/social-card.html:
npm run generate:social
npm run build
```

Ảnh sinh ở `public/social-card.png`. Script tạo ảnh dùng Chrome và cổng localhost 5187. Ảnh đã được tạo sẵn, không cần Chrome trên máy chủ triển khai.

## SEO khi triển khai

Tên website `CoreBrisk` được khai báo một lần qua schema `WebSite` ở trang chủ và `og:site_name` trên các trang. URL trong schema dùng `SITE_URL` giống canonical. Logo doanh nghiệp dùng `/logo.png` (512 × 512); favicon dùng `/favicon.png` (192 × 192), cùng biểu tượng với `public/favicon.svg`. Khi đổi biểu tượng SVG, chạy `npm run generate:icons` (cần Chrome), rồi commit các PNG trong `public/`. Cloudflare chỉ cần build và phục vụ các file này, không cần chạy Chrome.

Sau triển khai, kiểm tra `/favicon.png`, `/logo.png` trả HTTP 200 rồi yêu cầu lập chỉ mục lại trang chủ trong Google Search Console. Tên website và favicon trên Google do hệ thống của Google lựa chọn, có thể mất vài ngày đến vài tuần để cập nhật; schema không đảm bảo hiển thị ngay.

1. Thay nội dung mẫu, thương hiệu, giá, phạm vi dịch vụ và email.
2. Cấu hình `SITE_URL` bằng tên miền thật và build lại; kiểm tra trang chủ cùng năm trang dịch vụ không còn `noindex`, canonical đúng từng URL.
3. Triển khai qua HTTPS; xác nhận trang chính, năm URL dịch vụ, `/robots.txt`, `/sitemap.xml` và `/social-card.png` trả HTTP 200 với đúng nội dung.
4. Nếu có nhiều biến thể tên miền, cấu hình chuyển hướng trên hosting về tên miền chuẩn.
5. Xác minh tên miền trên Google Search Console và gửi sitemap sau khi public.
6. Kiểm tra Core Web Vitals/Lighthouse trên hosting thật. Không có điểm PageSpeed hoặc cam kết thứ hạng được giả định trong project.

HTML có sẵn nội dung và canonical được thiết lập ở bước build, theo hướng dẫn [JavaScript SEO của Google](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) và [canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). Các bước kỹ thuật hỗ trợ thu thập dữ liệu, không đảm bảo thứ hạng tìm kiếm.

## Cấu trúc

`src/style.css` là file import chung; các trang HTML tiếp tục dùng đường dẫn này. Các module trong `src/styles/` được tách theo khu vực: `header`, `hero`, `services`, `showcase`, `pricing`, `process`, `faq`, `contact`, `footer` và `dialog`. `base.css` chứa biến màu, reset, typography, button và tiện ích dùng chung; `services.css` giữ cả `.section-heading` dùng cho nhiều section.

Các override responsive chung nằm trong `responsive/desktop.css`, `tablet.css`, `mobile.css` và `compact.css`. Những media query riêng của component vẫn ở module tương ứng. `reduced-motion.css` xử lý giảm chuyển động; `demo-previews.css` được nạp cuối cho các phần bổ sung của thẻ demo. Giữ thứ tự import hiện tại để bảo toàn thứ tự ưu tiên CSS. Vite gộp các import khi build, không tạo thêm từng yêu cầu mạng riêng cho các module này ở production.

```text
business-landing/
├── index.html              # Nội dung có thể thu thập trực tiếp
├── dich-vu/                # Năm trang dịch vụ HTML tĩnh
├── vite.config.js          # Inject metadata và xuất robots/sitemap
├── src/
│   ├── main.js             # Tương tác menu, chọn gói, form và dialog
│   ├── style.css           # Điểm vào, import các module CSS
│   ├── styles/             # CSS theo section và responsive/
│   ├── service.css         # Giao diện các trang dịch vụ
│   ├── fonts.css           # Font local, subset tiếng Việt
│   └── seo.mjs             # Metadata và kiểm tra tên miền
├── public/
│   ├── fonts/              # WOFF2 và OFL.txt
│   ├── favicon.svg
│   └── social-card.png
├── scripts/                # Source + script sinh ảnh chia sẻ
├── tests/                  # Kiểm tra SEO và trình duyệt
├── .env.example
└── package.json
```

### Demo Orbit

Mã nguồn độc lập tại [`demos/orbit/`](demos/orbit/README.md). Chạy `npm run dev`, mở **http://localhost:5174/demos/orbit/** hoặc bấm **Xem demo** trên thẻ Orbit để vào thẳng UI ứng dụng. `npm run build` đóng kèm vào `dist/demos/orbit/`.

Ứng dụng gồm tổng quan, bảng/danh sách công việc, tìm kiếm và bộ lọc, tạo/sửa công việc, dự án và thành viên. Tiến độ tính từ dữ liệu trong phiên; tải lại sẽ đặt lại dữ liệu mẫu. Không có backend hay đăng nhập. Demo dùng font local, luôn noindex và không nằm trong sitemap. Link cũ `/demos/orbit/app.html` vẫn mở cùng ứng dụng.

Các demo đều có nút **← Về trang CoreBrisk** hoặc **← Về trang chính** để quay lại khu vực mẫu giao diện. Nút **Chọn mẫu này** quay về form tư vấn với tên mẫu được điền sẵn. Khi host riêng, các link quay lại dùng `COREBRISK_URL`; cấu hình `ORBIT_DEMO_URL` ở CoreBrisk trỏ trực tiếp đến ứng dụng.

`npm run test:browser` kiểm tra Orbit ở 6 độ rộng, bảng/danh sách, bộ lọc kết hợp, tạo/sửa công việc, tiến độ và gán thành viên, cùng luồng mở demo và quay lại form. Ảnh UI lưu tại `/tmp/orbit-app-*.png`.

### Demo Launch — Aster S5

Chạy `npm run dev`, mở **http://localhost:5174/demos/aster/** hoặc bấm **Xem demo** trên thẻ Aster S5. Demo một trang cho nhân viên kinh doanh ô tô: ảnh xe, phiên bản/màu, giá minh họa, bảng thông số và form báo giá/lái thử. Form chỉ tạo phiếu mẫu để sao chép hoặc tải TXT, không gửi dữ liệu.

Ba mẫu được gắn với phạm vi: **Launch → Aster S5**, **Business → An Studio**, **Custom → Orbit**. Đây là minh họa giao diện; tính năng CMS/backend/tích hợp thực tế theo thỏa thuận. Chọn mẫu sẽ điền tên mẫu và gói tương ứng vào form CoreBrisk.

Mã nguồn tại [`demos/aster/`](demos/aster/README.md). Build gốc đóng kèm vào `dist/demos/aster/`. Khi host riêng, đặt `ASTER_DEMO_URL` ở CoreBrisk. Demo luôn noindex; ảnh xe tạo bằng AI, tên xe, nhân viên, thông số và giá đều giả định.

Kiểm tra Aster: `npm run test:browser` xác minh 6 độ rộng, chọn phiên bản/màu, form báo giá/lái thử, clipboard/TXT, luồng chọn mẫu Launch và nội dung khi tắt JavaScript. Ảnh kiểm tra lưu tại `/tmp/aster-*.png`.

Đề xuất
P0
Form chỉ tạo nội dung để sao chép hoặc gửi qua email thủ công
Tích hợp gửi yêu cầu trực tiếp và thông báo thành công
P0
Thiếu tín hiệu tin cậy từ dự án thực tế
Bổ sung case study hoặc sản phẩm đã triển khai, có xác thực
P1
Trang chủ dài và lặp nội dung dịch vụ
Rút gọn phần mô tả, đưa chi tiết sang trang riêng
P1
Hai nhóm khách hàng khác nhau cùng một hành trình
Tạo CTA riêng cho Website và Tự động hóa
P1
CTA đầu trang tập trung vào bảng giá và demo
Thử CTA chính “Trao đổi dự án”
P2
Các gói dịch vụ có rất nhiều thông tin
Dùng bản so sánh ngắn, mở rộng chi tiết khi cần
