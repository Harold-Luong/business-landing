import type { ServiceContent } from '~/types/content'
export const services = {
  "google-automation": {
    "name": "Google Automation",
    "plan": "automation",
    "eyebrow": "GOOGLE SHEETS & ỨNG DỤNG NỘI BỘ",
    "title": [
      "Chọn giải pháp.",
      "Bớt việc thủ công."
    ],
    "lead": "So sánh hai hướng triển khai: Apps Script xử lý dữ liệu ngay trong bảng tính; AppSheet tạo giao diện nhập liệu và quản lý cho nhóm.",
    "gallery": false,
    "faqs": [
      {
        "question": "Tôi chưa biết mình cần Apps Script hay AppSheet?",
        "paragraphs": [
          [
            {
              "text": "Nếu chủ yếu muốn tự động chạy các bước xử lý bảng tính, hãy xem Apps Script. Nếu nhân viên cần giao diện nhập liệu và theo dõi công việc theo vai trò, hãy xem AppSheet. Bạn có thể mô tả quy trình để được tư vấn trước khi chọn."
            }
          ]
        ]
      },
      {
        "question": "Tiện ích Sheets có phải extension trình duyệt không?",
        "paragraphs": [
          [
            {
              "text": "Trong cách phân nhóm dịch vụ của WebSheet, tiện ích Sheets bao gồm giải pháp bằng Apps Script và AppSheet. Menu hoặc thanh bên trong bảng tính có thể xây bằng Apps Script. Extension trình duyệt là loại tiện ích khác, được khảo sát theo yêu cầu."
            }
          ]
        ]
      },
      {
        "question": "Có thể kết hợp nhiều giải pháp không?",
        "paragraphs": [
          [
            {
              "text": "Có thể kết hợp tùy quy trình, dữ liệu và giới hạn của các dịch vụ sử dụng. Các phần tích hợp, tài khoản và chi phí duy trì sẽ được làm rõ khi thống nhất phạm vi."
            }
          ]
        ]
      },
      {
        "question": "Giá này là thiết kế riêng hay mua mẫu có sẵn?",
        "paragraphs": [
          [
            {
              "text": "Đây là chi phí thiết kế và triển khai theo yêu cầu: khảo sát quy trình, xây dựng giải pháp, kiểm thử và bàn giao theo phạm vi đã thống nhất. Mẫu làm sẵn có cấu trúc và tính năng cố định nên giá thấp hơn. Giá và phạm vi sử dụng sẽ được công bố riêng theo từng sản phẩm. Các demo trên website hiện dùng để tham khảo giao diện."
            }
          ]
        ]
      }
    ],
    "ctaTitle": "Cần chọn Apps Script hay AppSheet?",
    "ctaText": "Mô tả công việc đang làm, số người sử dụng và kết quả cần nhận.",
    "related": [
      {
        "label": "Khám phá dịch vụ Website",
        "href": "/dich-vu/thiet-ke-website/"
      }
    ]
  },
  "google-apps-script": {
    "name": "Google Apps Script",
    "plan": "apps-script",
    "eyebrow": "TỰ ĐỘNG HÓA GOOGLE SHEETS",
    "title": [
      "Lập trình Google Apps Script.",
      "Bớt việc lặp lại mỗi ngày."
    ],
    "lead": "Bạn đang sao chép dữ liệu giữa các file, tổng hợp báo cáo mỗi chiều hoặc gửi email nhắc việc bằng tay? WebSheet xây quy trình Apps Script theo các bước làm việc thực tế, để nhóm tập trung vào xử lý kết quả.",
    "estimate": {
      "label": "CHI PHÍ THIẾT KẾ THEO YÊU CẦU",
      "facts": [
        {
          "label": "Thời gian dự kiến",
          "value": "3–5 ngày làm việc"
        },
        {
          "label": "Bàn giao",
          "value": "Mã nguồn & hướng dẫn vận hành"
        }
      ],
      "note": "Giá dành cho thiết kế và triển khai riêng theo quy trình của bạn, không phải giá mua mẫu có sẵn. Chi phí chính thức được xác nhận sau khi trao đổi yêu cầu; chưa gồm bản quyền, dịch vụ bên thứ ba và thuế nếu áp dụng. Tiến độ tính từ khi chốt yêu cầu và nhận đủ dữ liệu mẫu.",
      "pricePlan": "apps-script"
    },
    "gallery": true,
    "faqs": [
      {
        "question": "Tôi có cần mở máy để chương trình chạy không?",
        "paragraphs": [
          [
            {
              "text": "Apps Script chạy trên hạ tầng của Google. Với luồng chạy theo lịch đã được cấu hình và cấp quyền phù hợp, bạn không cần giữ máy tính cá nhân mở. Luồng dùng nút bấm vẫn cần người dùng thao tác."
            }
          ]
        ]
      },
      {
        "question": "Có thể chạy không giới hạn dữ liệu không?",
        "paragraphs": [
          [
            {
              "text": "Không nên mặc định như vậy. Thời gian chạy và số lần gọi dịch vụ có giới hạn; cần kiểm tra lượng dữ liệu, tần suất và loại tài khoản trước khi chọn cách triển khai."
            }
          ]
        ]
      },
      {
        "question": "Giá này là thiết kế riêng hay mua mẫu có sẵn?",
        "paragraphs": [
          [
            {
              "text": "Đây là chi phí thiết kế và triển khai theo yêu cầu: khảo sát quy trình, xây dựng giải pháp, kiểm thử và bàn giao theo phạm vi đã thống nhất. Mẫu làm sẵn có cấu trúc và tính năng cố định nên giá thấp hơn. Giá và phạm vi sử dụng sẽ được công bố riêng theo từng sản phẩm. Các demo trên website hiện dùng để tham khảo giao diện."
            }
          ]
        ]
      }
    ],
    "ctaTitle": "Trao đổi về quy trình cần tự động hóa",
    "ctaText": "Chuẩn bị bảng mẫu đã ẩn thông tin riêng tư, quy tắc xử lý và tần suất chạy mong muốn.",
    "related": [
      {
        "label": "Ứng dụng AppSheet",
        "href": "/dich-vu/appsheet/"
      },
      {
        "label": "Nhóm tiện ích Sheets",
        "href": "/dich-vu/google-automation/"
      },
      {
        "label": "Thiết kế website",
        "href": "/dich-vu/thiet-ke-website/"
      }
    ]
  },
  "appsheet": {
    "name": "Ứng dụng AppSheet",
    "plan": "appsheet",
    "eyebrow": "ỨNG DỤNG QUẢN LÝ NỘI BỘ",
    "title": [
      "Thiết kế ứng dụng AppSheet.",
      "Đưa quy trình vào một ứng dụng."
    ],
    "lead": "Khi nhiều người cùng nhập liệu vào bảng tính, việc theo dõi người phụ trách và trạng thái xử lý có thể trở nên khó khăn. WebSheet thiết lập ứng dụng AppSheet với màn hình nhập liệu, danh sách và báo cáo theo công việc của nhóm.",
    "estimate": {
      "label": "CHI PHÍ THIẾT KẾ THEO YÊU CẦU",
      "facts": [
        {
          "label": "Thời gian dự kiến",
          "value": "7–12 ngày làm việc"
        },
        {
          "label": "Bàn giao",
          "value": "Cấu hình app & hướng dẫn quản trị"
        }
      ],
      "note": "Giá dành cho thiết kế và triển khai riêng theo quy trình của bạn, không phải giá mua mẫu có sẵn. Chi phí chính thức được xác nhận sau khi trao đổi yêu cầu; chưa gồm bản quyền, dịch vụ bên thứ ba và thuế nếu áp dụng. Tiến độ tính từ khi chốt yêu cầu và nhận đủ dữ liệu mẫu.",
      "pricePlan": "appsheet"
    },
    "gallery": false,
    "faqs": [
      {
        "question": "AppSheet có thay thế hoàn toàn Google Sheets không?",
        "paragraphs": [
          [
            {
              "text": "Trong phương án dùng Sheets làm nguồn dữ liệu, bảng tính vẫn lưu dữ liệu còn AppSheet cung cấp giao diện thao tác. Cần thống nhất ai được sửa trực tiếp bảng nguồn để tránh thay đổi cấu trúc ngoài ý muốn."
            }
          ]
        ]
      },
      {
        "question": "Phí sử dụng hằng tháng có nằm trong giá triển khai không?",
        "paragraphs": [
          [
            {
              "text": "Không. Phí bản quyền nếu cần được tách khỏi chi phí xây ứng dụng. WebSheet kiểm tra tài khoản hiện có, số người dùng và tính năng để làm rõ chi phí trước khi triển khai."
            }
          ]
        ]
      },
      {
        "question": "Có phù hợp với mọi hệ thống quản lý không?",
        "paragraphs": [
          [
            {
              "text": "Cần khảo sát trước. Nếu yêu cầu giao diện quá đặc thù, lượng dữ liệu hoặc tích hợp vượt khả năng phù hợp của AppSheet, có thể cân nhắc web app riêng. Phương án được chọn theo nhu cầu thực tế."
            }
          ]
        ]
      },
      {
        "question": "Giá này là thiết kế riêng hay mua mẫu có sẵn?",
        "paragraphs": [
          [
            {
              "text": "Đây là chi phí thiết kế và triển khai theo yêu cầu: khảo sát quy trình, xây dựng giải pháp, kiểm thử và bàn giao theo phạm vi đã thống nhất. Mẫu làm sẵn có cấu trúc và tính năng cố định nên giá thấp hơn. Giá và phạm vi sử dụng sẽ được công bố riêng theo từng sản phẩm. Các demo trên website hiện dùng để tham khảo giao diện."
            }
          ]
        ]
      }
    ],
    "ctaTitle": "Trao đổi về ứng dụng nội bộ",
    "ctaText": "Cho biết các bảng dữ liệu, màn hình cần dùng và quyền thao tác của từng nhóm người dùng.",
    "related": [
      {
        "label": "Google Apps Script",
        "href": "/dich-vu/google-apps-script/"
      },
      {
        "label": "Nhóm tiện ích Sheets",
        "href": "/dich-vu/google-automation/"
      },
      {
        "label": "Thiết kế website",
        "href": "/dich-vu/thiet-ke-website/"
      }
    ]
  },
  "tien-ich-google-sheets": {
    "name": "Tiện ích Google Sheets",
    "plan": "automation",
    "eyebrow": "MENU, THANH BÊN & CÔNG CỤ BẢNG TÍNH",
    "title": [
      "Tiện ích Google Sheets.",
      "Apps Script & AppSheet."
    ],
    "lead": "Tại WebSheet, tiện ích Sheets là tên gọi chung cho các giải pháp tự động hóa và quản lý công việc bằng Apps Script hoặc AppSheet. Bạn chọn theo nhu cầu sử dụng; đây không phải một gói báo giá riêng.",
    "gallery": false,
    "faqs": [
      {
        "question": "Tiện ích Sheets có tính phí riêng không?",
        "paragraphs": [
          [
            {
              "text": "Không có gói tiện ích Sheets riêng. Chi phí triển khai thuộc giải pháp Apps Script hoặc AppSheet được chọn, theo phạm vi đã thống nhất."
            }
          ]
        ]
      },
      {
        "question": "Menu và thanh bên trong Sheets thuộc giải pháp nào?",
        "paragraphs": [
          [
            {
              "text": "Có thể xây bằng Apps Script. Chức năng, số thao tác và cách phân phối cho người dùng được khảo sát khi báo giá."
            }
          ]
        ]
      },
      {
        "question": "Extension trình duyệt có giống tiện ích Sheets không?",
        "paragraphs": [
          [
            {
              "text": "Extension trình duyệt được cài vào trình duyệt như Chrome để bổ sung chức năng. Nhóm tiện ích Sheets ở đây tập trung vào công việc với dữ liệu Google Sheets qua Apps Script hoặc AppSheet; yêu cầu extension trình duyệt được trao đổi riêng."
            }
          ]
        ]
      },
      {
        "question": "Giá này là thiết kế riêng hay mua mẫu có sẵn?",
        "paragraphs": [
          [
            {
              "text": "Đây là chi phí thiết kế và triển khai theo yêu cầu: khảo sát quy trình, xây dựng giải pháp, kiểm thử và bàn giao theo phạm vi đã thống nhất. Mẫu làm sẵn có cấu trúc và tính năng cố định nên giá thấp hơn. Giá và phạm vi sử dụng sẽ được công bố riêng theo từng sản phẩm. Các demo trên website hiện dùng để tham khảo giao diện."
            }
          ]
        ]
      }
    ],
    "ctaTitle": "Bạn muốn rút gọn thao tác nào trong Sheets?",
    "ctaText": "Mô tả thao tác hiện tại và kết quả mong muốn; chưa cần cấp quyền truy cập dữ liệu thật.",
    "related": [
      {
        "label": "Google Apps Script",
        "href": "/dich-vu/google-apps-script/"
      },
      {
        "label": "Ứng dụng AppSheet",
        "href": "/dich-vu/appsheet/"
      },
      {
        "label": "Thiết kế website",
        "href": "/dich-vu/thiet-ke-website/"
      }
    ]
  },
  "thiet-ke-website": {
    "name": "Thiết kế website",
    "plan": "launch",
    "eyebrow": "LANDING PAGE, WEBSITE & WEB APP",
    "title": [
      "Thiết kế website doanh nghiệp.",
      "Rõ nội dung, đúng nhu cầu."
    ],
    "lead": "Chọn landing page, website có quản trị nội dung hoặc web app theo nghiệp vụ. Xem các concept giao diện và phạm vi Launch, Business, Custom bên dưới.",
    "gallery": true,
    "faqs": [
      {
        "question": "Landing page có tự cập nhật nội dung được không?",
        "paragraphs": [
          [
            {
              "text": "Gói Launch mặc định là trang tĩnh. Nếu cần giao diện quản trị để tự đăng bài hoặc sửa dịch vụ thường xuyên, hãy chọn gói Business hoặc trao đổi phạm vi CMS bổ sung."
            }
          ]
        ]
      },
      {
        "question": "SEO kỹ thuật có đảm bảo lên top Google không?",
        "paragraphs": [
          [
            {
              "text": "Không. SEO kỹ thuật hỗ trợ công cụ tìm kiếm truy cập và hiểu nội dung. Kết quả còn phụ thuộc nội dung hữu ích, mức độ cạnh tranh và nhiều yếu tố khác; không có cam kết thứ hạng trong các gói trên."
            }
          ]
        ]
      },
      {
        "question": "Các mẫu trên trang có phải dự án khách hàng thật không?",
        "paragraphs": [
          [
            {
              "text": "Aster S5, An Studio và Orbit là concept minh họa phạm vi dịch vụ. Bạn có thể dùng chúng để trao đổi hướng giao diện; chức năng thực tế được thống nhất riêng trong dự án."
            }
          ]
        ]
      }
    ],
    "ctaTitle": "Trao đổi về website bạn cần",
    "ctaText": "Chia sẻ mục tiêu website, nội dung dự kiến và tính năng cần có để xác định gói phù hợp.",
    "related": [
      {
        "label": "Google Apps Script",
        "href": "/dich-vu/google-apps-script/"
      },
      {
        "label": "Ứng dụng AppSheet",
        "href": "/dich-vu/appsheet/"
      },
      {
        "label": "Nhóm tiện ích Sheets",
        "href": "/dich-vu/google-automation/"
      }
    ]
  }
} satisfies Record<string, ServiceContent>
