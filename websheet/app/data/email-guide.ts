import type { Locale } from '~~/shared/i18n'

export const emailGuide = {
  vi: {
    intro: 'Bạn có danh sách khách hàng hoặc lịch hẹn trong Google Sheets và đang gửi từng email bằng tay? Mẫu dưới đây giúp bạn ghép tên người nhận, xem trước nội dung và gửi những dòng đã duyệt, ngay trong tài khoản Google của mình.',
    summary: 'Phù hợp cho một danh sách nhỏ: xác nhận, nhắc lịch hoặc thông báo nội bộ. Mẫu dùng email văn bản thuần, tối đa 20 dòng hợp lệ mỗi lượt; chưa có tệp đính kèm hay theo dõi mở email.',
    author: 'Biên soạn bởi WebSheet · Có mã nguồn và CSV mẫu',
    download: 'Tải bảng email mẫu (.csv)',
    jumpToCode: 'Đến mã Apps Script',
    contents: 'Trong hướng dẫn này',
    columnsTitle: 'Các cột cần giữ nguyên',
    columns: [
      ['Email', 'Một địa chỉ người nhận. Lần đầu hãy dùng email của chính bạn.'],
      ['Name', 'Tên thay cho {{name}} trong nội dung Message.'],
      ['Subject', 'Tiêu đề email, không để trống.'],
      ['Message', 'Nội dung văn bản thuần; có thể dùng {{name}} để ghép tên.'],
      ['Approved', 'Chỉ TRUE mới được xử lý. Giữ FALSE cho các dòng chưa duyệt.'],
      ['Status', 'Để trống khi chờ gửi. Chương trình ghi SENT, ERROR, IN_PROGRESS hoặc REVIEW.'],
      ['SentAt', 'Thời điểm MailApp xử lý lệnh gửi thành công, theo múi giờ bảng tính.'],
      ['Error', 'Thông tin cần kiểm tra khi xử lý không thành công.'],
    ],
    columnHeader: 'Cột', meaningHeader: 'Cách sử dụng',
    sections: [
      { id: 'chuan-bi', title: '1. Tạo bảng email của bạn', paragraphs: [
        'Tải CSV ở đầu bài, tạo một Google Sheet rồi chọn Tệp → Nhập → Tải lên. Đổi tên tab vừa nhập thành Emails. Giữ đúng thứ tự tám cột và không sửa tên tiêu đề.',
        'Thay your-address@example.com bằng email của chính bạn, sửa tiêu đề và nội dung thử nghiệm. Đặt Approved thành TRUE cho đúng một dòng; các dòng khác để FALSE. Không dùng danh sách này để gửi thư cho người không mong đợi nhận email từ bạn.',
      ] },
      { id: 'cai-dat', title: '2. Thêm mã vào Apps Script', paragraphs: [
        'Trong bảng tính, mở Tiện ích mở rộng → Apps Script. Dán mã ở phần bên dưới vào Code.gs, thay nội dung mẫu có sẵn và lưu dự án. Mã phải được tạo từ chính bảng tính này, không phải một dự án độc lập.',
        'Giữ dryRun: true cho lần đầu. Chọn hàm runEmailQueue rồi nhấn Chạy. Google có thể yêu cầu cấp quyền đọc/sửa bảng tính và gửi email; chỉ cấp quyền cho dự án bạn vừa tạo và đã kiểm tra. Nếu tài khoản Workspace bị quản trị viên chặn, hãy liên hệ quản trị viên.',
      ] },
      { id: 'xem-truoc', title: '3. Xem trước trước khi gửi', paragraphs: [
        'Với dryRun: true, mã chỉ ghi người nhận, tiêu đề và nội dung đã ghép tên vào Nhật ký thực thi (Execution log). Không gửi email và không thay đổi trạng thái của bảng.',
        'Kiểm tra địa chỉ, dấu tiếng Việt và nội dung ở log. Nếu không có dòng nào được xem trước, kiểm tra tên tab Emails, Approved = TRUE và Status đang trống. Log có thể chứa dữ liệu người nhận; chỉ chia sẻ với người được phép.',
      ] },
      { id: 'gui-thu', title: '4. Gửi một email thử và kiểm tra kết quả', paragraphs: [
        'Sau khi bản xem trước đúng, đổi dryRun thành false, lưu rồi chạy lại runEmailQueue. Chỉ để một dòng dùng email của bạn được duyệt. Kiểm tra hộp thư đến và thư rác, rồi đối chiếu Status và SentAt trong Sheets.',
        'SENT nghĩa là lệnh gửi đã được dịch vụ chấp nhận, không đảm bảo email vào hộp thư đến hoặc đã được đọc. Chạy lại sẽ bỏ qua dòng có Status; chỉ duyệt thêm người nhận khi đã kiểm tra mẫu.',
        'Mã kiểm tra hạn mức gửi còn lại và dừng khi hết hạn mức. Mỗi lượt xử lý tối đa 20 dòng hợp lệ và chủ động dừng sau khoảng 4 phút; các dòng còn trống sẽ được xét ở lượt sau. Không sắp xếp, chèn, xóa hoặc sửa dòng trong lúc mã đang chạy.',
      ] },
      { id: 'hen-gio', title: '5. Tùy chọn: chạy theo lịch', paragraphs: [
        'Khi gửi thủ công đã ổn, trong Apps Script mở Trình kích hoạt (Triggers) → Thêm trình kích hoạt. Chọn runEmailQueue, nguồn Theo thời gian (Time-driven) và lịch phù hợp. Kiểm tra múi giờ dự án và chỉ tạo một lịch cho mẫu này.',
        'Lịch chạy dùng tài khoản của người tạo trình kích hoạt và xử lý các dòng đã duyệt, Status trống. Nó không tự tạo email nhắc lại cho các dòng SENT. Muốn dừng tự động, xóa trình kích hoạt hoặc đổi dryRun về true. Lịch Google có thể chạy trong một khoảng thời gian, không phải chính xác từng phút.',
      ] },
      { id: 'xu-ly-loi', title: '6. Khi có lỗi hoặc cần gửi lại', paragraphs: [
        'ERROR: kiểm tra địa chỉ email, Subject và Message. Sửa dữ liệu, đưa Approved về FALSE để duyệt lại; chỉ xóa Status và Error khi đã sẵn sàng xử lý lại.',
        'IN_PROGRESS hoặc REVIEW: lần chạy có thể đã dừng giữa bước gửi và bước ghi kết quả. Không xóa trạng thái rồi gửi lại ngay. Kiểm tra mục Thực thi (Executions), thư đã gửi nếu có và xác nhận với người nhận thử; chỉ đưa dòng về trạng thái chờ khi chắc chắn cần gửi lại.',
        'Khóa trong mã ngăn hai lần chạy cùng bảng tính chồng nhau, nhưng không khóa thao tác sửa trực tiếp của con người. Mẫu không đảm bảo gửi đúng một lần trong mọi tình huống mất kết nối. Với nhiều người vận hành, dữ liệu quan trọng hoặc nhiều nguồn, cần bổ sung cơ chế duyệt và đối soát riêng.',
      ] },
    ],
    codeTitle: 'Mã mẫu: xem trước và gửi các dòng đã duyệt',
    codeIntro: 'Mã tải về và mã hiển thị dưới đây là cùng một file. Mặc định dryRun: true. Bạn chạy mã trong Apps Script của mình; website này không nhận danh sách email và không gửi thư thay bạn.',
    showCode: 'Mở toàn bộ mã Apps Script', downloadCode: 'Tải mã nguồn (.gs)', copyCode: 'Sao chép mã', copied: 'Đã sao chép mã.', copyFailed: 'Không sao chép được. Bạn có thể chọn mã bên dưới hoặc tải file .gs.', codeLabel: 'Mã Apps Script có thể cuộn ngang',
    sourcesTitle: 'Tài liệu Google để đối chiếu',
    quotaNote: 'Hạn mức phụ thuộc loại tài khoản và có thể thay đổi. Kiểm tra tài liệu Google trước khi áp dụng cho danh sách thật; mẫu này không phải hệ thống gửi email hàng loạt không giới hạn.',
    sourceLabels: ['MailApp: gửi email và kiểm tra hạn mức còn lại', 'Hạn mức và giới hạn thực thi Apps Script', 'Trình kích hoạt tự động và tài khoản thực thi', 'LockService: tránh các lần chạy chồng nhau'],
    serviceLink: 'Xem phạm vi dịch vụ lập trình Google Apps Script',
    ctaTitle: 'Cần áp dụng vào quy trình của bạn?',
    ctaText: 'Chuẩn bị bảng mẫu đã ẩn thông tin riêng tư, mẫu email, số người nhận dự kiến và lịch gửi. WebSheet sẽ cùng bạn xác định phạm vi cần triển khai.',
    ctaLink: 'Trao đổi về luồng email tự động',
  },
  en: {
    intro: 'Do you keep customers or appointments in Google Sheets and send each email by hand? This example personalizes messages, previews them and sends approved rows from your own Google account.',
    summary: 'Designed for a small list of confirmations, reminders or internal notifications. The example sends plain text to at most 20 valid rows per run; attachments and open tracking are not included.',
    author: 'By WebSheet · Source code and CSV template included',
    download: 'Download the email template (.csv)', jumpToCode: 'Go to the Apps Script code', contents: 'In this guide',
    columnsTitle: 'Keep these column names and their order',
    columns: [
      ['Email', 'One recipient address. Start with your own email address.'],
      ['Name', 'Replaces {{name}} in the Message column.'],
      ['Subject', 'A non-empty email subject.'],
      ['Message', 'Plain text; use {{name}} to personalize the message.'],
      ['Approved', 'Only TRUE is eligible. Keep unapproved rows set to FALSE.'],
      ['Status', 'Leave blank for pending rows. The script writes SENT, ERROR, IN_PROGRESS or REVIEW.'],
      ['SentAt', 'Time the send request succeeded, displayed in the spreadsheet time zone.'],
      ['Error', 'Details to review when processing fails.'],
    ],
    columnHeader: 'Column', meaningHeader: 'How to use it',
    sections: [
      { id: 'chuan-bi', title: '1. Create your email sheet', paragraphs: [
        'Download the CSV above, create a Google Sheet and choose File → Import → Upload. Rename the imported tab to Emails. Keep all eight headers in the original order.',
        'Replace your-address@example.com with your own address and edit the test subject and message. Set Approved to TRUE for just one row; leave other rows FALSE. Only use this workflow for people who expect to receive your messages.',
      ] },
      { id: 'cai-dat', title: '2. Add the Apps Script code', paragraphs: [
        'From the spreadsheet, open Extensions → Apps Script. Replace the starter contents of Code.gs with the code below and save the project. Create it from this spreadsheet, not as a standalone script.',
        'Keep dryRun: true initially. Select runEmailQueue and click Run. Google may ask for spreadsheet and email sending permissions; authorize only the project you created and reviewed. If your Workspace administrator blocks authorization, contact them.',
      ] },
      { id: 'xem-truoc', title: '3. Preview before sending', paragraphs: [
        'With dryRun: true, the script only writes recipients, subjects and personalized messages to the Execution log. It sends no email and does not update sheet statuses.',
        'Check addresses and message formatting in the log. If nothing appears, check the Emails tab name, Approved = TRUE and an empty Status. Logs can contain recipient data; share them only with authorized people.',
      ] },
      { id: 'gui-thu', title: '4. Send one test email and review the result', paragraphs: [
        'Once the preview looks right, change dryRun to false, save and run runEmailQueue again. Approve only the row with your own address. Check your inbox and spam folder, then compare Status and SentAt in Sheets.',
        'SENT means the service accepted the send request; it does not confirm inbox delivery or that the message was read. Another run skips rows with a Status. Approve more recipients only after checking the test.',
        'The script checks remaining sending quota and stops when it runs out. Each run processes at most 20 valid rows and stops after roughly four minutes; pending rows remain eligible for the next run. Do not sort, insert, delete or edit rows during a run.',
      ] },
      { id: 'hen-gio', title: '5. Optional: schedule the workflow', paragraphs: [
        'After manual sending works, open Triggers → Add Trigger in Apps Script. Select runEmailQueue, choose Time-driven and set a suitable schedule. Check the project time zone and create only one schedule for this example.',
        'The schedule runs as its creator and processes approved rows with an empty Status. It does not generate recurring reminders for SENT rows. Delete the trigger or set dryRun back to true to stop automatic sending. Google may execute within a time window rather than at an exact minute.',
      ] },
      { id: 'xu-ly-loi', title: '6. Handle errors and retries', paragraphs: [
        'ERROR: review the email address, Subject and Message. Correct the data and set Approved to FALSE for another review. Clear Status and Error only when you are ready to retry.',
        'IN_PROGRESS or REVIEW: execution may have stopped between sending and saving the result. Do not immediately clear the status and resend. Check Executions, sent mail if available and the test recipient; make the row pending again only when you have confirmed another send is needed.',
        'The lock prevents overlapping script runs on the same spreadsheet; it does not prevent manual edits. This example cannot guarantee exactly-once sending through every connection failure. Shared operations, sensitive workflows and multiple data sources need additional approval and reconciliation logic.',
      ] },
    ],
    codeTitle: 'Example code: preview and send approved rows',
    codeIntro: 'The download and the code below use the same file. It defaults to dryRun: true. Run it in your own Apps Script project; this website does not receive your email list or send messages for you.',
    showCode: 'Show the complete Apps Script', downloadCode: 'Download source code (.gs)', copyCode: 'Copy code', copied: 'Code copied.', copyFailed: 'Copy failed. Select the code below or download the .gs file.', codeLabel: 'Apps Script code, horizontally scrollable',
    sourcesTitle: 'Google documentation',
    quotaNote: 'Quotas depend on your account type and may change. Check the Google documentation before using a real recipient list; this example is not an unlimited bulk email service.',
    sourceLabels: ['MailApp: send email and check remaining quota', 'Apps Script quotas and execution limits', 'Installable triggers and execution accounts', 'LockService: prevent overlapping executions'],
    serviceLink: 'Explore our Google Apps Script development service',
    ctaTitle: 'Need this adapted to your workflow?',
    ctaText: 'Prepare an anonymized sample sheet, an email template, expected recipient count and sending schedule. WebSheet can help define the implementation scope.',
    ctaLink: 'Discuss an automated email workflow',
  },
} satisfies Record<Locale, unknown>

export const emailGuideSources = [
  'https://developers.google.com/apps-script/reference/mail/mail-app',
  'https://developers.google.com/apps-script/guides/services/quotas',
  'https://developers.google.com/apps-script/guides/triggers/installable',
  'https://developers.google.com/apps-script/reference/lock/lock-service',
]
