import type { QuoteDraft } from '~/types/content'
import { quoteOptions } from '~/data/plans'
export function quoteSummary(draft: QuoteDraft) {
  return [
    'YÊU CẦU TƯ VẤN DỰ ÁN — WebSheet', '',
    `Họ tên: ${draft.name.trim()}`, `Doanh nghiệp: ${draft.company.trim() || 'Chưa cung cấp'}`,
    `Email: ${draft.email.trim()}`, `Gói quan tâm: ${quoteOptions.find(option => option.id === draft.plan)?.label || 'Cần tư vấn thêm'}`,
    `Ngân sách: ${draft.budget}`, '', 'Mô tả dự án:', draft.message.trim(), '',
    'Mong nhận được tư vấn phạm vi, tiến độ và báo giá chính thức.',
  ].join('\n')
}
