import React from 'react';
import { useApp } from '../../context/AppContext';

export const ArtifactPreviewModal: React.FC = () => {
  const { selectedArtifact, setSelectedArtifact, showToast } = useApp();

  if (!selectedArtifact) return null;

  const handleDownload = () => {
    const dummyContent = `=== CAREERSPRINT PORTFOLIO ARTIFACT ===\nTên tệp: ${selectedArtifact.fileName}\nNghiệm thu: ${selectedArtifact.weekApproved}\nDung lượng: ${selectedArtifact.size}\nMô tả: ${selectedArtifact.description}\n\nNội dung đã được kiểm định chuyên môn bởi Mentor HCNS & Hội đồng đào tạo.`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedArtifact.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Đang tải tệp: ${selectedArtifact.fileName}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-3xl bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden border border-surface-container-highest flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between border-b border-surface-container-highest/60 shrink-0">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">
                {selectedArtifact.type === 'excel' && 'table_chart'}
                {selectedArtifact.type === 'pdf' && 'picture_as_pdf'}
                {selectedArtifact.type === 'audio' && 'mic'}
                {selectedArtifact.type === 'word' && 'description'}
                {selectedArtifact.type === 'image' && 'schema'}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                {selectedArtifact.fileName}
              </h3>
              <div className="flex items-center gap-2 text-outline font-label-xs text-label-xs">
                <span>{selectedArtifact.size}</span>
                <span>•</span>
                <span className="text-tertiary font-medium">Đã nghiệm thu {selectedArtifact.weekApproved}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedArtifact(null)}
            className="text-outline hover:text-on-surface p-1 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body Preview */}
        <div className="p-space-lg overflow-y-auto flex-1 space-y-space-md bg-surface">
          <div className="p-space-sm rounded-lg bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm">
            <span className="font-semibold text-on-surface">Mô tả thẩm định: </span>
            {selectedArtifact.description}
          </div>

          {/* Conditional Preview Renderers */}
          {selectedArtifact.type === 'excel' && (
            <div className="border border-surface-container-highest rounded-lg overflow-hidden bg-surface-container-lowest shadow-xs">
              <div className="bg-primary/10 px-3 py-2 text-primary font-label-xs text-label-xs font-semibold uppercase tracking-wider flex items-center justify-between">
                <span>Trích đoạn Bảng tính Lương FDI (Mô phỏng 300 lao động)</span>
                <span>Đơn vị: VNĐ</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body-sm text-body-sm">
                  <thead className="bg-surface-container-low text-outline text-[11px] font-semibold uppercase border-b border-surface-container-highest/60">
                    <tr>
                      <th className="p-2.5">Mã NV</th>
                      <th className="p-2.5">Họ & Tên</th>
                      <th className="p-2.5">Chức danh</th>
                      <th className="p-2.5 text-right">Lương Cơ Bản</th>
                      <th className="p-2.5 text-right">Phụ cấp & OT</th>
                      <th className="p-2.5 text-right">BHXH (10.5%)</th>
                      <th className="p-2.5 text-right font-bold text-primary">Thực Lĩnh (Net)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-highest/40 font-mono text-[12px]">
                    <tr className="hover:bg-surface-container-low/50">
                      <td className="p-2.5 font-sans font-medium text-on-surface">FDI-001</td>
                      <td className="p-2.5 font-sans">Trần Thị Mai Lan</td>
                      <td className="p-2.5 font-sans text-on-surface-variant">HR Supervisor</td>
                      <td className="p-2.5 text-right">18,500,000</td>
                      <td className="p-2.5 text-right">3,200,000</td>
                      <td className="p-2.5 text-right text-error">-1,942,500</td>
                      <td className="p-2.5 text-right font-bold text-primary">19,757,500</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50">
                      <td className="p-2.5 font-sans font-medium text-on-surface">FDI-002</td>
                      <td className="p-2.5 font-sans">Vũ Hoàng Nam</td>
                      <td className="p-2.5 font-sans text-on-surface-variant">Chuyên viên C&B</td>
                      <td className="p-2.5 text-right">14,000,000</td>
                      <td className="p-2.5 text-right">2,500,000</td>
                      <td className="p-2.5 text-right text-error">-1,470,000</td>
                      <td className="p-2.5 text-right font-bold text-primary">15,030,000</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50">
                      <td className="p-2.5 font-sans font-medium text-on-surface">FDI-003</td>
                      <td className="p-2.5 font-sans">Lê Văn Hùng</td>
                      <td className="p-2.5 font-sans text-on-surface-variant">Kỹ sư vận hành xưởng 2</td>
                      <td className="p-2.5 text-right">12,500,000</td>
                      <td className="p-2.5 text-right">4,800,000</td>
                      <td className="p-2.5 text-right text-error">-1,312,500</td>
                      <td className="p-2.5 text-right font-bold text-primary">15,987,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedArtifact.type === 'pdf' && (
            <div className="p-space-md rounded-lg bg-surface-container-lowest border border-surface-container-highest space-y-3">
              <div className="flex items-center gap-2 text-primary font-title-sm text-title-sm font-bold border-b border-surface-container-highest/60 pb-2">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
                <span>Quy trình 5 Bước Xử lý Kỷ luật Lao động (Điều 122 BLLĐ 2019)</span>
              </div>
              <ol className="space-y-2 text-on-surface font-body-sm text-body-sm">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-xs flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <strong className="text-on-surface">Lập biên bản vi phạm quả tang:</strong> Ghi rõ thời gian, địa điểm, hành vi, người làm chứng hoặc trích xuất camera giám sát.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-xs flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <strong className="text-on-surface">Gửi thông báo họp xử lý kỷ luật trước 03 ngày làm việc:</strong> Bắt buộc gửi bằng văn bản có ký nhận cho NLĐ, đại diện BCH Công đoàn cơ sở, luật sư (nếu có).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-xs flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <strong className="text-on-surface">Tổ chức phiên họp đối chất:</strong> Ghi nhận đầy đủ ý kiến tranh luận, có chữ ký của tất cả các bên tham dự vào Biên bản họp.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-xs flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <strong className="text-on-surface">Ban hành Quyết định kỷ luật trong thời hiệu:</strong> Người có thẩm quyền theo quy định nội bộ hoặc đại diện pháp luật ký ban hành.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-xs flex items-center justify-center font-bold shrink-0">5</span>
                  <div>
                    <strong className="text-on-surface">Lưu trữ hồ sơ phòng ngừa tranh chấp:</strong> Đóng gói bộ hồ sơ chứng cứ và thông báo với cơ quan BHXH/Sở LĐTBXH nếu sa thải.
                  </div>
                </li>
              </ol>
            </div>
          )}

          {selectedArtifact.type === 'audio' && (
            <div className="p-space-lg rounded-xl bg-surface-container-low border border-surface-container-highest flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">record_voice_over</span>
                  </div>
                  <div>
                    <div className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Bản Ghi Âm Shadowing Chuẩn HSK 4
                    </div>
                    <span className="font-label-xs text-label-xs text-outline">Giọng chuẩn Bắc Kinh • Thời lượng 05:12</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
                  Điểm ngữ điệu: 9.2/10
                </span>
              </div>
              <div className="p-space-md rounded-lg bg-surface-container-lowest font-body-sm text-body-sm space-y-1">
                <div className="text-secondary font-semibold font-sans">Trích đoạn phỏng vấn:</div>
                <div className="text-on-surface font-medium">“您好！我叫阮文A，我有3年外企人力资源管理经验，熟悉越南劳动法及薪酬福利核算流程。”</div>
                <div className="text-on-surface-variant text-[12px] italic">
                  (Xin chào! Tôi tên là Nguyễn Văn A, có 3 năm kinh nghiệm quản trị HCNS tại doanh nghiệp FDI, am hiểu Luật Lao động Việt Nam và quy trình tính toán lương thưởng C&B.)
                </div>
              </div>
            </div>
          )}

          {selectedArtifact.type === 'word' && (
            <div className="p-space-md rounded-lg bg-surface-container-lowest border border-surface-container-highest space-y-2 font-body-sm text-body-sm">
              <div className="font-bold text-primary font-title-sm">Template: Formal Job Offer Letter (Song ngữ)</div>
              <div className="p-space-sm bg-surface-container-low rounded border border-surface-container-highest/60 font-mono text-[12px] text-on-surface leading-relaxed">
                Dear [Candidate Name],<br />
                We are delighted to extend an offer of employment for the position of <strong>Senior HR Operations Specialist</strong> at [Company Name].<br />
                - Monthly Gross Salary: 25,000,000 VND<br />
                - Probationary Period: 60 days (85% gross salary as stipulated in Article 25, Labor Code 2019)<br />
                - Insurance & Benefits: Full 32% compulsory insurance + Premium Healthcare Package<br />
                Please review the terms and return the signed agreement by Friday 17:00.
              </div>
            </div>
          )}

          {selectedArtifact.type === 'image' && (
            <div className="p-space-md rounded-lg bg-surface-container-lowest border border-surface-container-highest space-y-3">
              <div className="font-bold text-primary font-title-sm">Sơ đồ Cơ cấu Phòng Nhân sự DN FDI 500 Nhân sự</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-center text-[12px]">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary font-semibold">
                  HR Director
                  <div className="text-[10px] text-on-surface-variant font-normal mt-1">Định hướng chiến lược & quan hệ lao động</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest text-on-surface font-semibold">
                  C&B & Legal (2 NV)
                  <div className="text-[10px] text-outline font-normal mt-1">Lương 3P, BHXH, Tranh chấp & Hợp đồng</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest text-on-surface font-semibold">
                  Talent Acquisition (2 NV)
                  <div className="text-[10px] text-outline font-normal mt-1">Headhunting, Employer Branding</div>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest text-on-surface font-semibold">
                  HRBP & Training (1 NV)
                  <div className="text-[10px] text-outline font-normal mt-1">Đào tạo hội nhập, Đánh giá KPI/OKR</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between border-t border-surface-container-highest/60 shrink-0">
          <span className="text-outline font-label-xs text-label-xs">
            Bản quyền thuộc hồ sơ năng lực 12 tuần của học viên.
          </span>
          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => setSelectedArtifact(null)}
              className="px-space-md py-2 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={handleDownload}
              className="px-space-lg py-2 rounded-lg bg-primary text-on-primary hover:opacity-95 font-label-md text-label-md font-semibold flex items-center gap-1.5 shadow-xs transition-opacity"
            >
              <span className="material-symbols-outlined text-[17px]">download</span>
              <span>Tải xuống tệp thực tế</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
