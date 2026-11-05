# WebSheet — bộ logo sage

Mẫu chuẩn: `websheet-logo-sage.png`, sao chép nguyên bản từ
`output/imagegen/websheet-logo-sage.png` theo lựa chọn của chủ dự án.

Giữ nguyên chữ WS, góc gấp tài liệu, sáu ô bảng, hình vuông bo góc và màu
của mẫu. Không dùng phương án W ghép ô trong bản concept v2.

Chạy `npm run generate:brand` tại thư mục `websheet` để xuất:

- `public/logo.png`: logo 512 × 512, dùng cho schema SEO và xuất bản.
- `public/brand/websheet-mark.png`: 96 × 96, dùng ở header/footer để tải nhanh.
- `public/favicon.png`: 192 × 192.
- `public/favicon.ico`: các kích thước 16, 32 và 48 px.
- `public/favicon.svg`: SVG nhúng ảnh thu nhỏ, không phải vector đã chuyển nét.
- `public/apple-touch-icon.png`: 180 × 180.
- `public/brand/websheet-horizontal-light.png`: logo ngang trên nền sáng, 1200 × 360.
- `public/brand/websheet-horizontal-dark.png`: logo ngang trên nền tối, 1200 × 360.
- `public/social-card.png`: ảnh chia sẻ 1200 × 630.

Ảnh gốc được giữ lại để đối chiếu. `websheet-logo-sage-trimmed.svg` dùng
khung cắt sát khối xanh và clip bo góc để loại bỏ nền trắng bên ngoài;
các góc ngoài trong suốt, chữ WS và chi tiết bên trong vẫn nguyên bản.
SVG này nhúng ảnh gốc, không phải bản vector đã chuyển nét.
Mọi bản xuất dùng chung khung cắt này. Chữ ở bản ngang dùng Be Vietnam Pro
có sẵn trong dự án.
