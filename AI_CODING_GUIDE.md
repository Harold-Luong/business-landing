# WebSheet — Hướng dẫn cấu trúc, code và giao diện cho AI

> Đọc file này trước khi viết code cho hệ thống Nuxt mới. Đặc tả nội dung, nghiệp vụ, URL và hành vi đầy đủ nằm trong [NUXT_VUE3_DESIGN.md](NUXT_VUE3_DESIGN.md).
>
> Đây là quy ước triển khai đích; repository hiện vẫn là Vite/HTML/CSS/JavaScript. Việc có tài liệu này không có nghĩa migration đã hoàn tất. Khi chuyển sang repo mới, mang theo cả hai tài liệu.

## 1. Phạm vi và thứ tự áp dụng

1. Làm theo yêu cầu mới nhất đã được người dùng xác nhận.
2. Dùng `NUXT_VUE3_DESIGN.md` làm nguồn cho nội dung, giá, route, SEO và tương tác.
3. Dùng file này cho cách tổ chức code và triển khai giao diện. Các quy ước mới là lựa chọn của project, không phải yêu cầu bắt buộc của framework.
4. Đối chiếu HTML/CSS nguồn khi cần chi tiết hình ảnh; không lấy `dist/` làm nguồn chuẩn.
5. Khi có mâu thuẫn, xác định đó là hiện trạng cũ hay yêu cầu đích; không tự đổi nghiệp vụ để khớp code cũ.

Các quyết định phải giữ:

- Thương hiệu **WebSheet**; mô tả **Thiết kế website & Google Sheets theo yêu cầu.**
- `websheet.shop` đã mua; DNS/HTTPS/deployment chưa xác nhận. URL production đích là `https://websheet.shop/` khi đã cấu hình hoạt động.
- Website tĩnh giới thiệu dịch vụ; chưa có API bán hàng, tài khoản, CMS, giỏ hàng, checkout hoặc lưu yêu cầu lên server.
- Apps Script/AppSheet là dịch vụ thiết kế riêng. Template làm sẵn là hướng tương lai, chưa có giá bán cụ thể.
- Demo build/deploy riêng. Nuxt chỉ giữ metadata, preview và URL ngoài; không copy hoặc build ứng dụng demo.
- Giữ thiết kế sáng, bảng màu xanh dịu, font và bố cục đã có; thay nhận diện CoreBrisk bằng WebSheet.
- Logo WebSheet chưa chốt. Không coi favicon chữ C hiện tại là logo mới đã hoàn thành.

## 2. Công nghệ và cấu trúc thư mục

Hướng triển khai trong đặc tả: Nuxt 4, Vue 3, Vite (qua Nuxt builder), TypeScript, Composition API, `<script setup lang="ts">`, SSG. Pin phiên bản dependency/Node tương thích khi bắt đầu; không đoán phiên bản mới nhất. Đối chiếu tài liệu chính thức được liên kết trong đặc tả khi triển khai.

```text
app/
  app.vue                         # Ghép layout/page, head chung
  error.vue                       # Giao diện lỗi và đường về trang chủ
  layouts/
    default.vue                   # Khung trang chủ
    service.vue                   # Khung dịch vụ, wrapper .service-detail
  pages/
    index.vue
    dich-vu/
      google-automation.vue
      google-apps-script.vue
      appsheet.vue
      tien-ich-google-sheets.vue
      thiet-ke-website.vue
  components/
    common/                       # BrandMark, BaseButton, SectionHeading
    navigation/                   # SiteHeader, ServiceHeader, SiteFooter
    home/                         # HeroSection, ServiceGroups, SampleTeasers
    pricing/                      # GooglePricing, WebsiteComparison
    samples/                      # WebsiteGallery, SheetFlowPreview
    services/                     # ServiceHero, ServiceScope, ServiceRelated
    quote/                        # QuoteForm, QuoteDialog
  composables/
    useSiteSeo.ts
    useActiveSection.ts
    useQuoteDraft.ts
    useQuoteSelection.ts
  data/
    site.ts                       # Brand, route registry, navigation
    services.ts                   # Nội dung, FAQ và SEO theo dịch vụ
    plans.ts                      # Giá, phạm vi, label form
    samples.ts                    # Concept, preview, liên kết tư vấn
  types/
    content.ts
  utils/
    site-url.ts                   # Normalize/validate origin
    demo-url.ts                   # Validate URL ngoài; không fetch
    quote-summary.ts              # Tạo text thuần
  assets/css/
    main.css                      # Điểm vào, thứ tự import rõ ràng
    fonts.css
    tokens.css
    base.css
    sections/                     # CSS chuyển từ các section hiện tại
    responsive/
public/
  fonts/                          # WOFF2 và giấy phép
  favicon.svg
  favicon.png
  apple-touch-icon.png
  logo.png
  social-card.png
  aster-preview-480.webp
  aster-preview-960.webp
scripts/
  generate-seo.mjs                 # Sinh robots/sitemap cùng route registry
  icons.mjs
  social-card.mjs
nuxt.config.ts
wrangler.jsonc
tests/
```

Không có `demos/`, `public/demos/`, script `package-demos` hoặc plugin phục vụ demo trong project mới. Chưa cần `server/api/` hay thư mục store khi phạm vi vẫn tĩnh.

### Vai trò của Vite trong Nuxt

**Stack đích: Nuxt 4 + Vue 3 + Vite + TypeScript + SSG.** Nuxt mặc định dùng Vite để bundle phần Vue; các tùy chỉnh được đặt trong `vite` của `nuxt.config.ts`. [Nguồn chính thức: Nuxt config — builder và vite](https://github.com/nuxt/nuxt/blob/main/docs/4.api/6.nuxt-config.md).

Quy ước của project:

- Dùng Vite thông qua Nuxt, chạy development bằng `nuxt dev` và xuất site tĩnh bằng `nuxt generate`. Không giữ pipeline `vite build` độc lập cho landing mới.
- `nuxt.config.ts` là điểm cấu hình chính. Không copy nguyên `vite.config.js` cũ hoặc tạo cấu hình Vite song song; chỉ chuyển những tùy chỉnh thực sự còn cần sang mục `vite`.
- Không giữ HTML multi-page entry cũ: route/page do Nuxt quản lý. SEO chuyển sang head/data/generator của Nuxt; plugin đóng gói demo bị loại bỏ.
- Không tự ép phiên bản Vite từ project cũ vào Nuxt. Dùng bộ dependency tương thích với phiên bản Nuxt đã chọn, giữ lockfile và chỉ override khi có lý do được kiểm chứng.
- Giữ cấu hình mặc định trước; chỉ thêm plugin/tối ưu chunk khi có nhu cầu cụ thể. Phần prerender và output SSG vẫn theo cấu hình Nuxt/Nitro trong đặc tả.

### Trách nhiệm của từng lớp

| Lớp | Trách nhiệm | Tránh |
|---|---|---|
| Page | Chọn data, khai báo SEO, ghép section | Nhét toàn bộ HTML và logic vào một file |
| Layout | Khung header/main/footer, wrapper trang | Chứa giá hoặc nội dung dịch vụ cụ thể |
| Component | Render props và phát sự kiện theo trách nhiệm | Mutate props, truy cập DOM component khác |
| Composable | State và tương tác dùng chung | State mutable toàn cục phía server |
| Data | Nội dung đã duyệt, registry có type | Lặp giá/FAQ/label ở nhiều template |
| Utility | Hàm thuần, validate, format | Side effect DOM hoặc request mạng |
| CSS | Token, layout, trạng thái, responsive | Override rộng làm đổi route khác |

## 3. Quy tắc code

- Component dùng tên PascalCase: `QuoteForm.vue`. Composable dùng `useX.ts`; utility/data dùng kebab-case hoặc tên đơn đã có trong cây thư mục.
- Type/interface PascalCase; biến/hàm camelCase; class CSS kebab-case, ưu tiên giữ class hiện có khi migration.
- Code mới dùng 2 space, single quote trong TypeScript, không semicolon; nếu repo mới đã có formatter thì theo cấu hình đó, không định dạng lại file không liên quan.
- Props/emits có type; tránh `any`. Input bên ngoài như route query phải normalize và kiểm tra allowlist trước khi dùng.
- Dùng `const` mặc định; hàm nhỏ theo một trách nhiệm. Comment giải thích lý do hoặc giới hạn, không diễn giải lại từng câu lệnh.
- Component lặp nội dung dùng props/data và `v-for` với key ổn định. Không tạo nhiều abstraction chỉ cho một đoạn markup ngắn.
- Dùng `v-model`, computed và event binding của Vue; không port `querySelector`/`addEventListener` hàng loạt từ code cũ để điều khiển nội dung Vue quản lý.
- Chọn quy ước import component rõ ràng để thư mục lồng nhau không tạo tên auto-import ngoài ý muốn.
- Giữ dependencies tối thiểu. Chưa thêm UI kit, Tailwind, icon pack, state library hoặc CMS chỉ để thay cách viết giao diện đã có.
- Không tự đổi giá, phạm vi dịch vụ, route hoặc nhãn CTA. Không tự thêm thông tin liên hệ, khách hàng, testimonial hay cam kết thứ hạng.
- Tài liệu và code mới dùng tên WebSheet. Tên CoreBrisk chỉ xuất hiện khi giải thích hiện trạng cũ hoặc biến tương thích của project demo riêng.

## 4. Dữ liệu và liên kết demo

Dữ liệu giá, nội dung và form phải dùng chung registry. Định dạng tiền bằng locale tiếng Việt; giá lưu dưới dạng số VNĐ. Các lựa chọn `unsure`, `automation`, `website` không phải gói giá 0.

Ví dụ type đích tối thiểu:

```ts
type ServicePlanId = 'launch' | 'business' | 'custom' | 'apps-script' | 'appsheet'
type QuotePlanId = ServicePlanId | 'unsure' | 'automation' | 'website'
type SampleId = 'aster' | 'an-studio' | 'orbit' | 'sheetflow'

type Sample = {
  id: SampleId
  name: string
  plan: ServicePlanId
  role: 'illustration'
  galleryHref: string
  demoUrl?: string // URL ngoài đã validate; undefined khi chưa cấu hình
  quoteHref: string
}
```

- Không có `fallbackPath` hoặc fallback về `/demos/.../`.
- Đọc URL từ `NUXT_PUBLIC_ASTER_DEMO_URL`, `NUXT_PUBLIC_AN_STUDIO_DEMO_URL`, `NUXT_PUBLIC_ORBIT_DEMO_URL`, `NUXT_PUBLIC_SHEETS_DEMO_URL`.
- Trim URL; giá trị rỗng là trạng thái hợp lệ “Demo đang chuẩn bị”. Giá trị khác rỗng phải là HTTPS tuyệt đối, không chứa tài khoản/mật khẩu; sai thì báo lỗi build chỉ rõ tên biến.
- Không fetch demo trong build. CI landing không phụ thuộc uptime hay chức năng nội bộ của demo.
- Link hợp lệ mở tab mới, `rel="noopener noreferrer"`; thông báo mở tab mới trong accessible name.
- CTA chọn mẫu/tư vấn vẫn hoạt động khi thiếu URL demo. Không dùng link `#` giả, không iframe toàn bộ demo.
- Chỉ copy ảnh preview cần thiết và giấy phép liên quan vào landing; không import ảnh từ source project demo trong pipeline.

## 5. Hệ màu

Nguồn đối chiếu: [base.css](src/styles/base.css), [hero.css](src/styles/hero.css), [pricing.css](src/styles/pricing.css). Khi mang tài liệu sang repo mới, bảng và CSS dưới đây là giá trị nền để triển khai.

| Token đích | Giá trị | Dùng cho |
|---|---|---|
| `--text` | `#34443c` | Chữ body |
| `--ink` | `#293e33` | Heading, chữ nhấn |
| `--muted` | `#657469` | Mô tả phụ |
| `--lime` | `#dcebcf` | Nền nút sáng, nền nhận diện |
| `--accent` | `#527449` | Nút chính, điểm nhấn |
| `--accent-hover` | `#41613a` | Hover nút chính |
| `--line` | `#e2e9df` | Viền, phân cách |
| `--paper` | `#fdfefb` | Nền trang |
| `--surface` | `#f3f7ef` | Nền thẻ/section nhẹ |
| `--focus` | `#648f25` | Focus ring |
| `--pricing-bg` | `#f7f9f3` | Nền bảng giá |
| `--contact-bg` | `#edf5e6` | Nền liên hệ |
| `--recommended-bg` | `#edf5e5` | Gói Business |
| `--sheet-preview-bg` | `#eaf2e6` | Preview SheetFlow |

Các tên token bổ sung như `--text`, `--focus` là cách gom giá trị hiện đang ghi trực tiếp trong CSS, không phải token đã tồn tại trong source.

```css
:root {
  --font-body: 'Be Vietnam Pro', sans-serif;
  --text: #34443c;
  --ink: #293e33;
  --muted: #657469;
  --lime: #dcebcf;
  --accent: #527449;
  --accent-hover: #41613a;
  --line: #e2e9df;
  --paper: #fdfefb;
  --surface: #f3f7ef;
  --focus: #648f25;
  --pricing-bg: #f7f9f3;
  --contact-bg: #edf5e6;
  --recommended-bg: #edf5e5;
  --sheet-preview-bg: #eaf2e6;
}
```

Hero giữ gradient nhẹ hiện có: `linear-gradient(125deg, #fdfefb 20%, #f0f6e9 100%)`. Không tự đổi sang dark theme, gradient rực, glass card hoặc đổ bóng mạnh. Màu riêng trong mockup Aster/An Studio/Orbit chỉ thuộc preview, không thay palette chung.

## 6. Font và typography

- Font duy nhất cho UI chính: **Be Vietnam Pro**, fallback `sans-serif`.
- Dùng 12 file WOFF2 local: 4 weight 400/500/600/700 × 3 subset latin/latin-ext/vietnamese.
- Copy khai báo `@font-face` và `unicode-range` từ [src/fonts.css](src/fonts.css); giữ `font-display: swap` và `font-synthesis: none`.
- Giữ giấy phép trong `public/fonts/`. Không đổi sang font từ CDN hoặc tải toàn bộ weight không sử dụng.

| Vai trò | Cấu hình nền |
|---|---|
| Body desktop | 14px, line-height 1.7 |
| Body mobile ≤600px | 13px |
| H1 trang chủ | `clamp(42px, 4.2vw, 60px)`, weight 400, line-height 1.2, tracking -2.7px |
| H2 chung | `clamp(30px, 3.1vw, 44px)`, weight 400, line-height 1.25, tracking -1.8px |
| H3 chung | weight 500, line-height 1.25; size theo section |
| Eyebrow chung | 10px, weight 500, line-height 1.8, tracking 1.7px, margin-bottom 22px |
| Mô tả hero | 13px, line-height 1.95, max-width 453px |
| Button | 13px, weight 500, line-height 1.5 |
| Text link | 12px, weight 500; hero có override |

Đây là giá trị nền; giữ các override responsive trong source. Không áp H1 hero vào mọi trang dịch vụ. Không dùng chữ quá nhỏ của mockup làm cỡ chữ nội dung thực. Kiểm tra dấu tiếng Việt, wrap, chiều cao dòng và không cắt nội dung bằng chiều cao cố định.

## 7. Layout, khoảng cách và responsive

| Breakpoint | Quy tắc |
|---|---|
| Mặc định | Container `min(1180px, calc(100% - 96px))`, section padding dọc 104px |
| ≥1450px | Hero mở rộng theo CSS desktop hiện tại |
| ≤1100px | Container `calc(100% - 64px)`; thu gap/size hero |
| ≤850px | Hero, service groups, contact xếp dọc; section padding dọc 74px |
| ≤600px | Container `calc(100% - 40px)`; menu mobile, sample teaser một cột |
| ≤360px | Container `calc(100% - 32px)`; thu mockup |

- Giữ thứ tự section: hero → chọn nhóm → hai mẫu tham khảo → bảng giá → quy trình → FAQ → liên hệ/footer.
- Homepage có hai sample teaser; gallery đầy đủ nằm ở trang dịch vụ. Không tự thêm carousel.
- Website gallery: 3 cột trên 1100px, 2 cột ở khoảng giữa, 1 cột mobile. Sample teaser: 2 cột trên 600px, 1 cột mobile, preview cao 300px.
- Header homepage sticky, min-height 80px, z-index 10; mobile theo source là 73px. Header dịch vụ có layout riêng.
- Bảng giá Website có ba cột, mobile min-width 624px trong wrapper cuộn. Không đưa lại cột `.comparison-label`, không sticky cột Launch.
- Dùng grid/flex, `min-width: 0` khi cần để nội dung co lại. Không dùng `overflow-x: hidden` toàn trang để che lỗi layout.
- Khoảng cách chung hiện có: gap hero 38px, header 24px, action hero 24px. Khi thêm chi tiết nhỏ, ưu tiên thang 4/8/12/16/24/32px; không ép đổi các khoảng cách nguồn chỉ để khớp thang này.
- Đối chiếu ở 1440, 1024, 768, 600, 390 và 320px; không có cuộn ngang toàn trang.

## 8. Style component và CSS

### Button và link

- Button chung: inline-flex, gap 28px, padding 14px 22px, radius 4px, border 1px.
- Primary: nền `--accent`, chữ trắng, hover `--accent-hover`.
- Nút sáng: nền `--lime`, chữ `--ink`, border `#c6d9b7`, hover `#cfe2bf`.
- Outline: nền trong, border `#ccd8c8`, hover `--surface`.
- Hover nâng 1px, transition 0.2s; giữ trạng thái focus rõ ràng. Tôn trọng reduced motion.
- Hero mobile: CTA chính full-width, min-height 52px; nút menu 44×44px, mục tiêu tương tác chính ít nhất 44px.
- Dùng link cho điều hướng; button cho thao tác. Nút phụ trong form đặt `type="button"`.
- CTA theo vai trò: “Trao đổi dự án”, “Khám phá dịch vụ”, “Chọn gói này”, “Trao đổi yêu cầu”, “Xem demo”. Không lặp nhiều CTA “Tư vấn miễn phí”.

### Card, form và overlay

- Card nền sáng, border mảnh, radius thường 5–8px; khung SheetFlow đầy đủ radius 12px.
- Gói Business có nền `--recommended-bg` và nhãn “ĐỀ XUẤT”; vẫn giữ nội dung và giá đúng registry.
- Form có label thật, lỗi đọc được và trạng thái disabled rõ. Không thay label bằng placeholder.
- FAQ dùng `details/summary`; mục đầu homepage mở, các mục khác đóng; không ép accordion chỉ mở một mục.
- Dialog dùng phần tử native, quản lý focus/scroll, Escape và backdrop. Không tự xây modal bằng div nếu không có nhu cầu mới.
- Icon nhất quán theo SVG/CSS hiện có; icon trang trí `aria-hidden`. Không dùng emoji thay hệ icon hoặc tải thêm cả thư viện cho vài biểu tượng.

### Tổ chức CSS

1. `fonts → tokens → base`.
2. Các section theo thứ tự hiện tại: header, hero, services, showcase, pricing, process, faq, contact, footer, dialog.
3. Responsive: desktop → tablet → mobile → compact.
4. Reduced motion → demo previews theo cascade nguồn; kiểm tra lại khi chuyển từng module.

Token/reset dùng global CSS. Quy tắc riêng của dịch vụ phải nằm dưới `.service-detail` hoặc được scoped phù hợp. Không để CSS route đã ghé làm đổi homepage. Không thêm selector `h1`, `.button`, `section` global chỉ để sửa một component. Tránh `!important`; xử lý bằng scope và thứ tự cascade. Giữ typography và class cũ trước, chỉ refactor khi đã đối chiếu giao diện.

## 9. Vue, form và hydration

- DOM API (`window`, `document`, clipboard, dialog, observer) chỉ chạy sau mount hoặc trong handler client; cleanup listener/observer/timer khi unmount.
- Với SSG, áp query `plan`/`concept` sau mount, sau đó watch khi client navigation; không tạo HTML server khác client dựa trên query hoặc viewport.
- `plan` áp trước, `concept` hợp lệ có quyền ưu tiên plan. Không xóa nội dung người dùng đã nhập hoặc thêm lặp câu chọn mẫu.
- Không dùng `v-html` cho dữ liệu form/query. Không đưa name/email/message vào URL, log, payload prerender hoặc analytics.
- Form chỉ tạo bản yêu cầu local, cho copy/TXT và mở `mailto:` khi có email cấu hình. Không thông báo “Đã gửi thành công”.
- Native validation, trim và giới hạn ký tự theo mục 10 đặc tả. Submit disabled cho tới khi handler sẵn sàng; tắt JS vẫn đọc nội dung và FAQ.
- Không tự lưu localStorage, gọi API hay thêm tracking. Draft trong bộ nhớ là tùy chọn đã nêu trong đặc tả.

## 10. SEO, build và accessibility

- Giữ sáu route và anchor theo đặc tả, HTML prerender có nội dung thật. Không chuyển thành SPA hoặc bọc toàn page trong `ClientOnly`.
- Head chung và head theo trang tách rõ. Một title, description, canonical theo route; `| WebSheet` xuất hiện một lần trong title.
- Dùng route registry để tạo canonical/sitemap; không dùng query/hash làm canonical. Schema theo mục 11, metadata theo mục 22 đặc tả.
- `NUXT_PUBLIC_SITE_URL` trống: noindex, không sitemap/canonical giả. Có URL hợp lệ: metadata/schema/sitemap dùng cùng origin. Không bật production chỉ vì tên miền đã mua.
- `runtimeConfig.public` chỉ chứa dữ liệu public; không đặt secret. SSG chốt config lúc generate, đổi URL demo/domain cần build lại.
- Output đích `.output/public/`; build không tải/build demo. Host trả 404 thật cho URL không tồn tại, không trả homepage với 200.
- Mỗi page một H1, heading có thứ bậc, skip link, landmark, accessible name và quan hệ label/field đầy đủ.
- Focus ring 3px `--focus`, offset mặc định 5px; không xóa outline mà không có thay thế.
- Bảng giá giữ caption, column header và quan hệ headers; vùng cuộn dùng được bằng bàn phím.
- Reduced motion tắt animation/transition/smooth scroll. Không dùng màu làm tín hiệu duy nhất cho trạng thái.

## 11. Quy trình làm việc và tiêu chí hoàn tất

1. Đọc đặc tả, xác định phần đang làm và các file liên quan; giữ thay đổi người dùng đã có trong workspace.
2. Tách data và component theo trách nhiệm, triển khai từng trang/luồng hoàn chỉnh.
3. Đối chiếu nội dung, ảnh desktop/mobile và trạng thái tương tác; không tự coi build thành công là đúng thiết kế.
4. Chạy typecheck/build và kiểm thử liên quan khi dự án Nuxt đã có. Tài liệu hiện tại không khẳng định các lệnh Nuxt đã được tạo hoặc chạy.
5. Ghi rõ thay đổi, kiểm thử thực sự đã chạy và việc còn thiếu. Không báo đã deploy, gửi form hay mua/cấu hình dịch vụ nếu chưa thực hiện.

Checklist khi nghiệm thu implementation:

- [ ] Không sai thương hiệu, giá, phạm vi hoặc route.
- [ ] Màu, font local, typography, breakpoint đúng đặc tả; không tràn ngang 320px.
- [ ] Chọn gói/mẫu, query và form/dialog hoạt động; no-JS vẫn đọc được nội dung.
- [ ] Keyboard/focus/reduced motion và bảng giá cuộn hoạt động.
- [ ] URL demo hợp lệ/rỗng/sai có hành vi rõ; output không chứa app demo.
- [ ] HTML tĩnh có metadata/schema đúng; preview noindex, production canonical/sitemap đồng bộ.
- [ ] Không lỗi console/hydration khi chuyển route và quay lại bằng Back/Forward.
- [ ] Không thêm backend, tracking, tài khoản hay chức năng bán hàng ngoài phạm vi.

## 12. Prompt giao việc mẫu cho AI

```text
Đọc AI_CODING_GUIDE.md và NUXT_VUE3_DESIGN.md trước khi viết code.
Triển khai phần: [trang hoặc luồng cụ thể].
Giữ phạm vi website tĩnh WebSheet, giá dịch vụ thiết kế riêng,
font Be Vietnam Pro và bảng màu/breakpoint đã quy định.
Demo chỉ dùng URL ngoài, không copy/build demo trong landing.
Dùng component, data và composable đúng trách nhiệm.
Kiểm tra responsive, accessibility, SEO và hydration liên quan.
Báo rõ file thay đổi, kiểm thử đã chạy và giới hạn còn lại.
```

File này là tài liệu được đọc qua prompt/liên kết; không mặc định mọi công cụ AI sẽ tự nạp. Nếu cần tự động áp dụng trong repo Nuxt mới, có thể đặt tham chiếu tới file này trong cấu hình hướng dẫn của công cụ đó.
