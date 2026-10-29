export const homeMeta = {
  "title": "Google Sheets, AppSheet & thiết kế website | WebSheet",
  "description": "WebSheet thiết kế website và xây tiện ích Google Sheets bằng Apps Script, AppSheet. Xem phạm vi dịch vụ, quy trình và báo giá tham khảo theo dự án."
}
export const serviceMeta = [
  {
    "path": "/dich-vu/google-automation/",
    "name": "Google Automation",
    "title": "Google Automation: tiện ích Sheets với Apps Script & AppSheet | WebSheet",
    "description": "Thiết kế tiện ích Google Sheets theo yêu cầu bằng Apps Script hoặc AppSheet. So sánh giải pháp và chi phí triển khai riêng theo quy trình doanh nghiệp.",
    "plan": "automation"
  },
  {
    "path": "/dich-vu/google-apps-script/",
    "name": "Google Apps Script",
    "title": "Lập trình Google Apps Script, tự động hóa Sheets | WebSheet",
    "description": "Lập trình Apps Script theo yêu cầu để tự động hóa Google Sheets, báo cáo và nhắc việc. Chi phí thiết kế riêng từ 0,9 triệu/dự án, tùy phạm vi triển khai.",
    "plan": "apps-script"
  },
  {
    "path": "/dich-vu/appsheet/",
    "name": "Ứng dụng AppSheet",
    "title": "Thiết kế ứng dụng AppSheet cho doanh nghiệp | WebSheet",
    "description": "Thiết kế AppSheet theo yêu cầu để quản lý đơn hàng, kho và công việc từ Google Sheets. Chi phí triển khai riêng từ 7,9 triệu/dự án, tùy phạm vi.",
    "plan": "appsheet"
  },
  {
    "path": "/dich-vu/tien-ich-google-sheets/",
    "name": "Tiện ích Google Sheets",
    "title": "Tiện ích Google Sheets: chọn Apps Script hay AppSheet | WebSheet",
    "description": "Tiện ích Google Sheets được thiết kế theo yêu cầu bằng Apps Script hoặc AppSheet. Tìm hiểu giải pháp và phạm vi triển khai riêng theo quy trình của bạn.",
    "plan": "automation"
  },
  {
    "path": "/dich-vu/thiet-ke-website/",
    "name": "Thiết kế website",
    "title": "Thiết kế website doanh nghiệp & landing page | WebSheet",
    "description": "Thiết kế landing page, website doanh nghiệp và web app theo yêu cầu. So sánh gói Launch, Business, Custom và quy trình triển khai. Giá từ 6,9 triệu.",
    "plan": "launch"
  }
]
export const routes = ['/', ...serviceMeta.map(page => page.path)]

