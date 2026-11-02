# Gửi yêu cầu tư vấn qua email

Form giữ bước xem lại. Khi khách nhấn **Gửi yêu cầu**, trình duyệt gọi `POST /api/quote` trên cùng hostname. Cloudflare Worker gửi email qua Resend; các trang Nuxt vẫn được prerender và phục vụ bằng Static Assets.

## Cấu hình Resend và Cloudflare

1. Trong [Resend Domains](https://resend.com/docs/dashboard/domains/introduction), thêm `websheet.shop` và xác minh các bản ghi DNS mà Resend cung cấp. Chỉ dùng địa chỉ gửi thuộc domain đã xác minh.
2. Tạo API key có quyền gửi email, giới hạn ở domain đó nếu có thể.
3. Tại thư mục `websheet`, cấu hình **Worker runtime secrets** theo môi trường (không phải biến build public):

```bash
npx wrangler login
npx wrangler secret put RESEND_API_KEY --env dev
npx wrangler secret put MAIL_FROM --env dev
npx wrangler secret put MAIL_TO --env dev
```

Nhập key tại prompt; `MAIL_FROM` có dạng `WebSheet <contact@websheet.shop>`. `MAIL_TO` là địa chỉ nhận đơn, ví dụ `ductrong.luongnguyen@gmail.com`. Nếu không đặt `MAIL_TO`, Worker dùng email trong `shared/contact.ts`; biến `NUXT_PUBLIC_CONTACT_EMAIL` chỉ điều khiển link liên hệ hiển thị, không điều khiển người nhận API.

Lặp lại ba lệnh `secret put` với `--env production` khi bật production. Secrets được cấu hình riêng cho từng Worker; không đặt key trong `.env.production`, `.env.example`, `runtimeConfig.public` hoặc Git. Có thể nhập secrets trong Cloudflare Dashboard → Worker tương ứng → Settings → Variables and Secrets.

```bash
npm run deploy:dev
# Sau khi kiểm tra dev và cấu hình secrets production:
npm run deploy:production
```

Deploy chạy kiểm thử API, build và kiểm thử output trước khi upload. CI kết nối GitHub cũng dùng các lệnh deploy này. Dev thêm `[DEV]` vào tiêu đề email. API vẫn gửi mail thật ở dev nếu đã có secrets; nên đặt `MAIL_TO` dev là hộp thư thử nghiệm của bạn.

## Chạy local

`npm run dev` và `npm run preview` chỉ phục vụ giao diện Nuxt/static, không chạy API Worker. Để thử toàn bộ luồng local:

1. Tạo file **không commit** `.dev.vars.dev` trong `websheet`:

```dotenv
RESEND_API_KEY=your_resend_key
MAIL_FROM="WebSheet <contact@websheet.shop>"
MAIL_TO=your_test_inbox@example.com
```

2. Chạy:

```bash
npm run build:dev
npm run preview:worker:dev
```

Mở URL Wrangler in ra. Gửi từ form này sẽ gọi Resend thật. `npm run test:mail` và `npm run test:browser` dùng dữ liệu giả/mô phỏng, không gửi email ra ngoài.

## Hành vi và giới hạn

- API chỉ nhận JSON cùng origin, giới hạn body 16 KiB và kiểm tra lại độ dài, email, ký tự xuống dòng ở server.
- Người nhận và người gửi lấy từ cấu hình server. Email khách chỉ dùng làm `reply_to`. Nội dung là plain text, không thực thi HTML do khách nhập.
- Có trường bẫy bot và [Cloudflare rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/): 3 yêu cầu/phút/IP theo từng Cloudflare location, không phải giới hạn toàn cầu tuyệt đối. Namespace `1001` (dev), `1002` (production); đổi nếu tài khoản đang dùng các namespace này cho ứng dụng khác. Đây là chống spam cơ bản, không thay thế CAPTCHA khi bị tấn công phân tán.
- Dùng [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys) để retry cùng payload trong 24 giờ không gửi trùng. UI khóa nút khi đang gửi và sau khi thành công. Tải lại trang/tạo yêu cầu mới sinh khóa mới.
- Chỉ báo đã chuyển yêu cầu khi Resend trả thành công kèm email ID. Điều này chưa chứng minh email đã vào inbox; kiểm tra trạng thái delivery/bounce trên Resend khi cần.
- Thiếu secrets trả HTTP 503; lỗi provider/timeout trả 502; vượt giới hạn trả 429. UI giữ nội dung để thử lại hoặc dùng link email/Zalo. Không trả lỗi nội bộ/API key cho trình duyệt và không ghi nội dung form vào log của ứng dụng.
- Chưa lưu yêu cầu vào database; dữ liệu được chuyển qua Cloudflare và Resend đến hộp thư nhận. Người dùng xác nhận gửi ở bước xem lại.

Tham khảo: [Resend Send Email](https://resend.com/docs/api-reference/emails/send-email), [Cloudflare Static Assets + Worker](https://developers.cloudflare.com/workers/static-assets/binding/), [Cloudflare secrets](https://developers.cloudflare.com/workers/configuration/secrets/).
