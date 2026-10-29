import type { ServicePlan } from '~/types/content'
export const plans: ServicePlan[] = [
  {
    "id": "apps-script",
    "name": "Google Apps Script",
    "category": "google",
    "startingPriceVnd": 900000,
    "formLabel": "Google Apps Script · từ 0,9 triệu · Theo yêu cầu",
    "kicker": "LẬP TRÌNH THEO YÊU CẦU",
    "features": [
      "01 quy trình tự động hóa trên tối đa 2 file Google Sheets.",
      "Làm sạch, đối soát hoặc tổng hợp dữ liệu theo quy tắc đã chốt.",
      "Chạy theo lịch hoặc từ nút bấm, kèm ghi nhận kết quả và lỗi cơ bản.",
      "Bàn giao mã nguồn, cấu hình và hướng dẫn; bảo hành lỗi trong phạm vi 1 tháng."
    ],
    "detailHref": "/dich-vu/google-apps-script/#pham-vi",
    "recommended": false,
    "scope": "01 quy trình · tối đa 2 file Sheets",
    "delivery": "3–5 ngày làm việc",
    "warranty": "1 tháng"
  },
  {
    "id": "appsheet",
    "name": "AppSheet",
    "category": "google",
    "startingPriceVnd": 3900000,
    "formLabel": "AppSheet · từ 7,9 triệu · Theo yêu cầu",
    "kicker": "ỨNG DỤNG THEO YÊU CẦU",
    "features": [
      "01 ứng dụng với tối đa 5 bảng dữ liệu Google Sheets.",
      "Tối đa 5 màn hình nhập liệu, danh sách hoặc báo cáo.",
      "Tối đa 2 vai trò người dùng và 01 luồng thông báo hoặc phê duyệt cơ bản.",
      "Bàn giao cấu hình, hướng dẫn quản trị; bảo hành lỗi trong phạm vi 1 tháng."
    ],
    "detailHref": "/dich-vu/appsheet/#pham-vi",
    "recommended": false,
    "scope": "Tối đa 5 bảng dữ liệu và 5 màn hình",
    "delivery": "7–12 ngày làm việc",
    "warranty": "1 tháng"
  },
  {
    "id": "launch",
    "name": "Launch",
    "category": "website",
    "startingPriceVnd": 4900000,
    "formLabel": "Launch · từ 6,9 triệu",
    "kicker": "MỘT TRANG",
    "features": [
      "01 landing page, tối đa 8 section",
      "Thiết kế theo nhận diện thương hiệu",
      "Tương thích điện thoại, tablet, desktop",
      "SEO kỹ thuật cơ bản",
      "Tích hợp form, Zalo hoặc hotline",
      "Bàn giao mã nguồn & hướng dẫn",
      "Bảo hành lỗi trong phạm vi: 3 tháng"
    ],
    "detailHref": "/dich-vu/thiet-ke-website/#goi-launch",
    "recommended": false,
    "scope": "01 trang đích Tối đa 8 section",
    "management": "Trang tĩnh CMS báo giá riêng",
    "delivery": "5–7 ngày làm việc",
    "warranty": "3 tháng"
  },
  {
    "id": "business",
    "name": "Business",
    "category": "website",
    "startingPriceVnd": 14900000,
    "formLabel": "Business · từ 14,9 triệu",
    "kicker": "ĐỀ XUẤT",
    "features": [
      "Bao gồm các hạng mục của gói Launch",
      "Tối đa 10 trang nội dung",
      "CMS quản trị bài viết, dịch vụ, dự án",
      "Blog với cấu trúc hỗ trợ SEO",
      "Thiết lập đo lường theo yêu cầu",
      "Hướng dẫn quản trị trực tiếp",
      "Bảo hành lỗi trong phạm vi: 6 tháng"
    ],
    "detailHref": "/dich-vu/thiet-ke-website/#goi-business",
    "recommended": true,
    "scope": "Website doanh nghiệp Tối đa 10 trang",
    "management": "Có CMS & blog",
    "delivery": "15–20 ngày làm việc",
    "warranty": "6 tháng"
  },
  {
    "id": "custom",
    "name": "Custom",
    "category": "website",
    "startingPriceVnd": 29900000,
    "formLabel": "Custom · từ 29,9 triệu",
    "kicker": "THEO YÊU CẦU",
    "features": [
      "Khảo sát & phân tích yêu cầu",
      "Thiết kế UI/UX theo nghiệp vụ",
      "Tài khoản & phân quyền người dùng",
      "Tích hợp API, CRM theo thỏa thuận",
      "Kiến trúc hỗ trợ nâng cấp về sau",
      "Tài liệu kỹ thuật & bàn giao mã nguồn",
      "Bảo hành theo hợp đồng dự án"
    ],
    "detailHref": "/dich-vu/thiet-ke-website/#goi-custom",
    "recommended": false,
    "scope": "Website / web app Theo nghiệp vụ",
    "management": "Theo yêu cầu",
    "delivery": "Theo phạm vi dự án",
    "warranty": "Theo hợp đồng"
  }
]
export const googlePlans = plans.filter(p => p.category === 'google')
export const websitePlans = plans.filter(p => p.category === 'website')
export const planById = Object.fromEntries(plans.map(p => [p.id, p])) as Record<ServicePlan['id'], ServicePlan>
export const priceMillions = (price: number) => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 }).format(price / 1000000)
export const quoteOptions = [{ id: 'unsure', label: 'Cần tư vấn thêm' }, { id: 'automation', label: 'Tiện ích Sheets · Apps Script & AppSheet' }, { id: 'website', label: 'Website · Cần tư vấn chọn gói' }, ...['launch', 'business', 'custom', 'apps-script', 'appsheet'].map(id => ({ id, label: plans.find(p => p.id === id)!.formLabel }))]
export const budgets = ['Chưa xác định', 'Dưới 10 triệu', '10–20 triệu', '20–50 triệu', 'Trên 50 triệu']
