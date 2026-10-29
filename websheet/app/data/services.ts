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
    "lead": "Bạn muốn tự động xử lý bảng tính, có ứng dụng cho nhân viên nhập liệu hay thêm nút thao tác ngay trong Sheets? Bắt đầu từ cách nhóm đang làm việc để chọn Apps Script hoặc AppSheet phù hợp trong nhóm tiện ích Google Sheets.",
    "estimate": {
      "label": "CHƯA BIẾT CHỌN GIẢI PHÁP NÀO?",
      "facts": [
        {
          "label": "Đầu vào",
          "value": "Bảng dữ liệu mẫu và các bước đang làm"
        },
        {
          "label": "Mong muốn",
          "value": "Kết quả, số người dùng và tần suất xử lý"
        }
      ],
      "note": "Có thể dùng dữ liệu giả hoặc đã ẩn thông tin riêng tư. Phạm vi và chi phí được xác nhận trước khi triển khai.",
      "pricePlan": null,
      "heading": [
        "Mô tả công việc",
        "bạn muốn rút gọn."
      ]
    },
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
    "ctaTitle": "Bắt đầu từ công việc bạn đang làm.",
    "ctaText": "Chia sẻ quy trình và kết quả mong muốn để cùng chọn giải pháp phù hợp.",
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
        "question": "Tôi cần chuẩn bị gì để nhận báo giá?",
        "paragraphs": [
          [
            {
              "text": "Một bảng dữ liệu mẫu đã ẩn thông tin riêng tư, mô tả thao tác hiện tại, số file và tần suất xử lý. Chưa cần cung cấp quyền truy cập dữ liệu thật ở bước trao đổi ban đầu."
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
    "ctaTitle": "Bắt đầu từ nhu cầu thực tế.",
    "ctaText": "Mô tả công việc và kết quả bạn mong muốn để trao đổi về phạm vi, thời gian và chi phí.",
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
    "ctaTitle": "Bắt đầu từ nhu cầu thực tế.",
    "ctaText": "Mô tả công việc và kết quả bạn mong muốn để trao đổi về phạm vi, thời gian và chi phí.",
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
    "estimate": {
      "label": "HAI HƯỚNG TRIỂN KHAI",
      "facts": [
        {
          "label": "Tự động xử lý bảng tính",
          "value": "Apps Script"
        },
        {
          "label": "Ứng dụng nhập liệu và quản lý",
          "value": "AppSheet"
        }
      ],
      "note": "Chi phí dành cho thiết kế và triển khai theo yêu cầu riêng, không phải giá mua mẫu làm sẵn. Báo giá dựa trên giải pháp và phạm vi đã thống nhất.",
      "pricePlan": null,
      "heading": [
        "Apps Script",
        "hay AppSheet?"
      ]
    },
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
    "ctaTitle": "Bắt đầu từ nhu cầu thực tế.",
    "ctaText": "Mô tả công việc và kết quả bạn mong muốn để trao đổi về phạm vi, thời gian và chi phí.",
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
    "lead": "Giới thiệu dịch vụ, nhận yêu cầu tư vấn hoặc xây công cụ phục vụ khách hàng. WebSheet thiết kế và lập trình website theo nhận diện và phạm vi đã thống nhất, với bố cục cho điện thoại, tablet và desktop.",
    "estimate": {
      "label": "CHI PHÍ TRIỂN KHAI THAM KHẢO",
      "facts": [
        {
          "label": "Thời gian dự kiến",
          "value": "Từ 5–7 ngày với gói Launch"
        },
        {
          "label": "Bàn giao",
          "value": "Mã nguồn & hướng dẫn sử dụng"
        }
      ],
      "note": "Chi phí chính thức được xác nhận sau khi trao đổi yêu cầu. Phí bản quyền và dịch vụ bên thứ ba tính riêng.",
      "pricePlan": "launch"
    },
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
      },
      {
        "question": "Tôi cần chuẩn bị gì trước khi làm website?",
        "paragraphs": [
          [
            {
              "text": "Bạn có thể bắt đầu với mục tiêu kinh doanh, dịch vụ chính, bộ nhận diện nếu có và một vài website yêu thích. Sau buổi trao đổi, WebSheet sẽ gửi danh sách nội dung cần chuẩn bị. Viết nội dung hoặc chụp ảnh có thể được báo giá riêng."
            }
          ]
        ]
      },
      {
        "question": "Sau bàn giao, website được hỗ trợ như thế nào?",
        "paragraphs": [
          [
            {
              "text": "Lỗi thuộc phạm vi triển khai được xử lý trong thời gian bảo hành của gói. Các yêu cầu cập nhật nội dung, bổ sung tính năng hoặc bảo trì sau bảo hành được thống nhất bằng gói hỗ trợ hoặc báo giá riêng."
            }
          ]
        ]
      }
    ],
    "ctaTitle": "Bắt đầu từ nhu cầu thực tế.",
    "ctaText": "Mô tả công việc và kết quả bạn mong muốn để trao đổi về phạm vi, thời gian và chi phí.",
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
