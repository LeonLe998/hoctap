import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mentorNote } from '../../data/initialData';

export const HcnsRoadmapView: React.FC = () => {
  const { setIsMentorOpen, openSubmitAssignment, showToast, setSelectedArtifact } = useApp();
  const [allExpanded, setAllExpanded] = useState(true);

  const handleDownloadTemplate = (fileName: string) => {
    const content = `=== BIỂU MẪU NGHIỆP VỤ HCNS FDI ===\nTên biểu mẫu: ${fileName}\nCăn cứ pháp lý: Bộ luật Lao động 2019 & Nghị định 145/2020/NĐ-CP\nNgười thẩm định: Mentor Hoàng Tuấn (HR Director - Goertek Vina)\n\n[Mẫu đã được rà soát không có rủi ro pháp lý cho doanh nghiệp FDI]`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Đang tải biểu mẫu: ${fileName}`);
  };

  const handleDownloadAllZip = () => {
    handleDownloadTemplate('Bo_Bieu_Mau_Ky_Luat_Tuan3.zip');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Progress Bar & Header Banner */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container-highest/40 flex flex-col md:flex-row md:items-center justify-between gap-space-lg mb-space-lg relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col gap-1 z-10">
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-xs text-label-xs font-semibold">
              Chuyên sâu HCNS Thực chiến
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              Đang đúng tiến độ
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Lộ trình Nghiệp vụ HCNS 12 Tuần & Checklist Thực hành
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Chương trình huấn luyện mô phỏng tình huống thực tế tại doanh nghiệp FDI. Trọng tâm tuần này: Thủ tục kỷ luật lao động & Phòng ngừa rủi ro tranh chấp.
          </p>
        </div>

        {/* Progress Metric Capsule */}
        <div className="bg-surface-container-low rounded-xl p-space-md z-10 min-w-[280px] shadow-xs flex flex-col gap-2">
          <div className="flex justify-between items-baseline">
            <span className="font-label-md text-label-md text-on-surface-variant">Tiến độ bài thực chiến</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display-md text-display-md text-primary font-bold">9</span>
              <span className="font-title-sm text-title-sm text-outline">/ 24 bài</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden flex">
            <div className="bg-primary h-full transition-all duration-500" style={{ width: '37.5%' }}></div>
          </div>
          <div className="flex items-center justify-between font-label-xs text-label-xs text-on-surface-variant">
            <span>Đạt 37.5% tổng khối lượng</span>
            <span className="text-primary font-semibold">Sprint Tuần 3 / 12</span>
          </div>
        </div>
      </section>

      {/* 2-Column Responsive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT COLUMN: 12-Week Interactive Accordions (8 Cols) */}
        <section className="lg:col-span-8 flex flex-col gap-space-md">
          {/* Filter & Quick Action Strip */}
          <div className="flex items-center justify-between px-space-xs py-1">
            <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px] text-primary">view_agenda</span>
              <span className="font-semibold text-on-surface">Cấu trúc 12 Tuần</span>
              <span className="text-outline">|</span>
              <span className="text-on-surface-variant">4 Modul Chuyên môn</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAllExpanded(!allExpanded)}
                className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface font-label-xs text-label-xs font-medium transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {allExpanded ? 'unfold_less' : 'unfold_more'}
                </span>
                <span>{allExpanded ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}</span>
              </button>
            </div>
          </div>

          {/* MODULE 1: Pháp lý & Định biên tiền lương (Tuần 1 - 4) */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center gap-2 px-space-xs pt-space-xs">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-label-xs text-label-xs font-semibold uppercase tracking-wider text-outline">
                Modul I: Pháp lý Lao động, Tiền lương & Tranh chấp (Tuần 1 - 4)
              </span>
            </div>

            {/* Accordion 1: Tuần 1 */}
            <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 transition-all overflow-hidden" open={allExpanded}>
              <summary className="list-none cursor-pointer p-space-md select-none bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                        Tuần 1: Khung Pháp lý Lao động & Hợp đồng lao động
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-xs text-label-xs font-semibold">
                        Đã nghiệm thu (3/3)
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-outline truncate">
                      Phân tích rủi ro Điều khoản thử việc, HĐLĐ xác định thời hạn & Thỏa thuận NDA/NCA
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md shrink-0">
                  <span className="font-label-xs text-label-xs text-outline hidden sm:inline">Điểm TB: 9.2</span>
                  <span className="material-symbols-outlined text-[20px] text-outline transition-transform duration-200 group-open:rotate-180">
                    expand_more
                  </span>
                </div>
              </summary>
              <div className="p-space-md pt-0 bg-surface-container-lowest flex flex-col gap-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-on-surface">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">verified</span>
                    <span className="font-body-sm text-body-sm font-medium">
                      HĐLĐ chuẩn song ngữ Anh - Việt & Biên bản nghiệm thu thử việc
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-xs text-label-xs text-tertiary font-semibold">Điểm 9.4</span>
                    <button
                      type="button"
                      onClick={() => setSelectedArtifact({
                        id: 'demo-1',
                        fileName: 'HDLD_SongNgu_AnhViet_Standard.docx',
                        description: 'Hợp đồng lao động mẫu song ngữ chuẩn Bộ luật Lao động 2019',
                        type: 'word',
                        size: '520 KB',
                        weekApproved: 'Tuần 1'
                      })}
                      className="font-label-xs text-label-xs text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">visibility</span> Xem lại
                    </button>
                  </div>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-on-surface">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">verified</span>
                    <span className="font-body-sm text-body-sm font-medium">
                      Bản cam kết bảo mật thông tin kinh doanh (NDA/NCA) cho cấp Quản lý
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-xs text-label-xs text-tertiary font-semibold">Điểm 9.0</span>
                    <button
                      type="button"
                      onClick={() => setSelectedArtifact({
                        id: 'demo-2',
                        fileName: 'CamKet_BaoMat_ThongTin_NDA_FDI.pdf',
                        description: 'Bản cam kết không cạnh tranh và bảo mật bí mật kinh doanh công nghệ',
                        type: 'pdf',
                        size: '780 KB',
                        weekApproved: 'Tuần 1'
                      })}
                      className="font-label-xs text-label-xs text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">visibility</span> Xem lại
                    </button>
                  </div>
                </div>
              </div>
            </details>

            {/* Accordion 2: Tuần 2 */}
            <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 transition-all overflow-hidden" open={allExpanded}>
              <summary className="list-none cursor-pointer p-space-md select-none bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                        Tuần 2: Xây dựng Thang bảng lương & Quy chế Lương thưởng
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-xs text-label-xs font-semibold">
                        Đã nghiệm thu (3/3)
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-outline truncate">
                      Mô hình 3P (Position, Person, Performance), quy chế phụ cấp và phương pháp phân bậc lương
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md shrink-0">
                  <span className="font-label-xs text-label-xs text-outline hidden sm:inline">Điểm TB: 9.6</span>
                  <span className="material-symbols-outlined text-[20px] text-outline transition-transform duration-200 group-open:rotate-180">
                    expand_more
                  </span>
                </div>
              </summary>
              <div className="p-space-md pt-0 bg-surface-container-lowest flex flex-col gap-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-on-surface">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">description</span>
                    <span className="font-body-sm text-body-sm font-medium">
                      Bảng cấu trúc lương 3P & Quy chuẩn hệ số chức danh nhà máy sản xuất
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-xs text-label-xs text-tertiary font-semibold">Điểm 9.8</span>
                    <button
                      type="button"
                      onClick={() => handleDownloadTemplate('Bang_Luong_3P_FDI_Goertek.xlsx')}
                      className="font-label-xs text-label-xs text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">download</span> Tải bài nộp
                    </button>
                  </div>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-on-surface">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">description</span>
                    <span className="font-body-sm text-body-sm font-medium">
                      Quy chế thưởng KPI quý và chính sách phụ cấp độc hại, thâm niên
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-xs text-label-xs text-tertiary font-semibold">Điểm 9.4</span>
                    <button
                      type="button"
                      onClick={() => handleDownloadTemplate('QuyChe_Thuong_KPI_Quy.docx')}
                      className="font-label-xs text-label-xs text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">download</span> Tải bài nộp
                    </button>
                  </div>
                </div>
              </div>
            </details>

            {/* Accordion 3: Tuần 3 [TRỌNG TÂM HIỆN TẠI] */}
            <details className="group bg-surface-container-lowest rounded-xl shadow-md border-2 border-primary/20 transition-all overflow-hidden" open id="active-sprint-week">
              <summary className="list-none cursor-pointer p-space-md select-none bg-surface-container-high/40 hover:bg-surface-container-high/60 transition-colors flex items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[17px]">flag</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-title-sm text-title-sm font-bold text-on-surface">
                        Tuần 3: Quản trị Quan hệ lao động & Xử lý Kỷ luật
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-xs text-label-xs font-semibold animate-pulse">
                        Trọng tâm hiện tại
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
                        Hoàn thành 1/3 bài
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-primary font-medium truncate">
                      Thực thi Điều 122 BLLĐ 2019, giải quyết tranh chấp sa thải & bồi thường trợ cấp
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-primary transition-transform duration-200 group-open:rotate-180">
                    expand_more
                  </span>
                </div>
              </summary>

              <div className="p-space-lg bg-surface-container-lowest flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-xs">
                  <span className="font-label-xs text-label-xs font-semibold text-outline uppercase tracking-wider">
                    Danh mục bài tập thực hành tuần này
                  </span>
                  <span className="font-label-xs text-label-xs text-error font-medium">
                    Hạn chót sprint: 23:59 Chủ Nhật
                  </span>
                </div>

                {/* Task 3.1: Đã hoàn thành */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md shadow-xs transition-colors">
                  <div className="flex items-start gap-space-md">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[15px]">done</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                          Bài 3.1: Soạn thảo Biên bản xử lý vi phạm kỷ luật lao động mẫu
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-xs text-label-xs font-semibold">
                          Hoàn thành • Điểm 9.5
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Đảm bảo đủ 4 bước luật định theo Điều 122 BLLĐ: Mời công đoàn, lập thông báo trước 3 ngày, ghi nhận biên bản đối chất.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => showToast('Bài 3.1 đã được Mentor phê duyệt và cấp điểm 9.5.')}
                      className="h-8 px-3 rounded-lg bg-surface-container text-on-surface font-label-xs text-label-xs font-medium hover:bg-surface-container-high transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px] text-tertiary">task_alt</span>
                      <span>Đã duyệt</span>
                    </button>
                  </div>
                </div>

                {/* Task 3.2: Đang thực hiện - ACTIVE */}
                <div className="p-space-md rounded-xl bg-surface-container-lowest border border-primary/40 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-space-md transition-all">
                  <div className="flex items-start gap-space-md">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[15px]">pending</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-title-sm text-title-sm text-on-surface font-bold">
                          Bài 3.2: Xây dựng Case study sa thải lao động trái luật & bồi thường
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-bold animate-pulse">
                          Đang làm • Hạn: 23:00 Hôm nay
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Tình huống nhân viên kinh doanh làm lộ bí mật khách hàng sang đối thủ cạnh tranh. Lập hồ sơ bằng chứng và lập phương án giải quyết hòa giải/tòa án.
                      </p>
                      <div className="flex items-center gap-space-md mt-2">
                        <span className="font-label-xs text-label-xs text-outline flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">attach_file</span> Đã đính kèm 2/3 tệp nháp
                        </span>
                        <span className="font-label-xs text-label-xs text-primary font-medium">Tiến độ nháp: 70%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => openSubmitAssignment({ id: 'bai-3.2', title: 'Bài 3.2: Case study sa thải trái luật & bồi thường' })}
                      className="h-9 px-4 rounded-lg bg-primary text-on-primary hover:opacity-95 font-label-md text-label-md font-medium transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">upload_file</span>
                      <span>Nộp bài ngay</span>
                    </button>
                  </div>
                </div>

                {/* Task 3.3: Chờ nghiệm thu */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md shadow-xs">
                  <div className="flex items-start gap-space-md">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[15px]">schedule</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                          Bài 3.3: Lập file Excel tính toán trợ cấp thôi việc & mất việc làm
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs font-semibold">
                          Chờ nghiệm thu
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Tách bạch thời gian đóng BHTN và thời gian doanh nghiệp phải chi trả trực tiếp theo Nghị định 145/2020/NĐ-CP.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => openSubmitAssignment({ id: 'bai-3.3', title: 'Bài 3.3: Lập file Excel tính toán trợ cấp thôi việc' })}
                      className="h-8 px-3 rounded-lg bg-surface-container text-on-surface-variant font-label-xs text-label-xs font-medium hover:bg-surface-container-high transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">edit</span>
                      <span>Cập nhật file</span>
                    </button>
                  </div>
                </div>
              </div>
            </details>

            {/* Accordion 4: Tuần 4 */}
            <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 transition-all overflow-hidden opacity-95">
              <summary className="list-none cursor-pointer p-space-md select-none bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-surface-container text-outline flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                        Tuần 4: Bảo hiểm Xã hội, BHYT & Quyết toán Thuế TNCN Nâng cao
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-xs text-label-xs font-medium">
                        Dự kiến mở: Thứ Hai tới
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-outline truncate">
                      Phần mềm BHXH điện tử, quy trình xử lý thai sản/ốm đau và giảm trừ gia cảnh thuế TNCN
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-outline transition-transform duration-200 group-open:rotate-180">
                    expand_more
                  </span>
                </div>
              </summary>
              <div className="p-space-md pt-0 bg-surface-container-lowest flex flex-col gap-2">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                  <span>Bài 4.1: Xử lý hồ sơ hưởng chế độ thai sản và đối soát C70a-HD</span>
                  <span className="font-label-xs text-label-xs text-outline">Khóa</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                  <span>Bài 4.2: Lập bảng quyết toán thuế TNCN cuối năm cho người lao động có 2 nguồn thu nhập</span>
                  <span className="font-label-xs text-label-xs text-outline">Khóa</span>
                </div>
              </div>
            </details>
          </div>

          {/* MODULE 2: Tuần 5 - 8 */}
          <div className="flex flex-col gap-space-sm pt-space-xs">
            <div className="flex items-center gap-2 px-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-xs text-label-xs font-semibold uppercase tracking-wider text-outline">
                Modul II: Thu hút Nhân tài & Quản trị Hiệu suất (Tuần 5 - 8)
              </span>
            </div>
            <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 transition-all overflow-hidden">
              <summary className="list-none cursor-pointer p-space-md select-none bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">groups</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                        Tuần 5 - 8: Tuyển dụng Thực chiến, Onboarding & Đánh giá KPI/OKR
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-xs text-label-xs font-medium">
                        8 bài tập dự kiến
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-outline truncate">
                      Sourcing ứng viên cấp cao, thiết kế bài phỏng vấn hành vi STAR & xây tháp KPI phòng ban
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-outline transition-transform duration-200 group-open:rotate-180">
                    expand_more
                  </span>
                </div>
              </summary>
              <div className="p-space-md pt-0 bg-surface-container-lowest flex flex-col gap-2">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Tuần 5: Xây dựng Headcount Planning & Kênh tuyển dụng Headhunter
                  </span>
                  <span className="font-label-xs text-label-xs text-outline">Xem trước nội dung</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Tuần 6: Kỹ thuật phỏng vấn sâu theo mô hình năng lực (Competency-based)
                  </span>
                  <span className="font-label-xs text-label-xs text-outline">Xem trước nội dung</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Tuần 7: Quy trình Onboarding 90 ngày & Trải nghiệm nhân viên (EX)
                  </span>
                  <span className="font-label-xs text-label-xs text-outline">Xem trước nội dung</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Tuần 8: Xây dựng từ điển KPI vị trí Chuyên viên & Tổ chức kỳ đánh giá 360
                  </span>
                  <span className="font-label-xs text-label-xs text-outline">Xem trước nội dung</span>
                </div>
              </div>
            </details>
          </div>

          {/* MODULE 3: Tuần 9 - 12 */}
          <div className="flex flex-col gap-space-sm pt-space-xs">
            <div className="flex items-center gap-2 px-space-xs">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="font-label-xs text-label-xs font-semibold uppercase tracking-wider text-outline">
                Modul III: Portfolio Chuyên gia & Phỏng vấn FDI (Tuần 9 - 12)
              </span>
            </div>
            <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 transition-all overflow-hidden">
              <summary className="list-none cursor-pointer p-space-md select-none bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">folder_special</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                        Tuần 9 - 12: Đóng gói Bộ hồ sơ Năng lực Chuyên viên HCNS FDI & Mock Interview
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-xs text-label-xs font-medium">
                        Giai đoạn Về đích
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-outline truncate">
                      Đóng gói Portfolio dự án thực tế, CV chuẩn ATS, mô phỏng phỏng vấn tiếng Anh/Trung với HRD
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-outline transition-transform duration-200 group-open:rotate-180">
                    expand_more
                  </span>
                </div>
              </summary>
              <div className="p-space-md pt-0 bg-surface-container-lowest flex flex-col gap-2">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Tuần 9: Chuẩn hóa Portfolio sản phẩm HCNS cá nhân (HR Dossier)
                  </span>
                  <span className="font-label-xs text-label-xs text-outline">Đang khóa</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Tuần 10: Xây dựng thương hiệu tuyển dụng cá nhân trên LinkedIn
                  </span>
                  <span className="font-label-xs text-label-xs text-outline">Đang khóa</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Tuần 11: Phỏng vấn thử vòng Nghiệp vụ chuyên sâu cùng HR Director
                  </span>
                  <span className="font-label-xs text-label-xs text-outline">Đang khóa</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Tuần 12: Đàm phán mức lương bổng (Offer Negotiation) & Kế hoạch 100 ngày đầu tiên
                  </span>
                  <span className="font-label-xs text-label-xs text-outline">Đang khóa</span>
                </div>
              </div>
            </details>
          </div>
        </section>

        {/* RIGHT COLUMN: Mentor Directives & Reference Library (4 Cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-space-md sticky top-20">
          {/* Mentor Guidance Card */}
          <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 transition-all overflow-hidden" open>
            <summary className="list-none cursor-pointer p-space-md select-none bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-6 h-6 rounded-md bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[15px]">tips_and_updates</span>
                </div>
                <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                  Lưu ý Mentor Tuần 3
                </span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-outline transition-transform duration-200 group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="p-space-md bg-surface-container-lowest flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-sm pb-1">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-label-md font-bold text-primary">
                  {mentorNote.mentorAvatar}
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">
                    {mentorNote.mentorName}
                  </span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">
                    {mentorNote.mentorTitle}
                  </span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low p-space-sm rounded-lg leading-relaxed">
                “{mentorNote.note}”
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="font-label-xs text-label-xs text-outline">
                  Phản hồi gần nhất: {mentorNote.lastReply}
                </span>
                <button
                  type="button"
                  onClick={() => setIsMentorOpen(true)}
                  className="font-label-xs text-label-xs text-primary font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">chat</span> Đặt câu hỏi
                </button>
              </div>
            </div>
          </details>

          {/* Attached Legal Templates Card */}
          <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 transition-all overflow-hidden" open>
            <summary className="list-none cursor-pointer p-space-md select-none bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-6 h-6 rounded-md bg-tertiary text-on-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[15px]">folder_open</span>
                </div>
                <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                  Biểu mẫu đính kèm (Tuần 3)
                </span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-outline transition-transform duration-200 group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="p-space-md bg-surface-container-lowest flex flex-col gap-2">
              {/* Document 1 */}
              <button
                type="button"
                onClick={() => handleDownloadTemplate('BM-01_Bien-ban-hop-xu-ly-ky-luat.docx')}
                className="w-full text-left p-2.5 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-between group/doc cursor-pointer"
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-primary">description</span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-md text-label-md text-on-surface font-medium truncate group-hover/doc:text-primary transition-colors">
                      BM-01_Bien-ban-hop-xu-ly-ky-luat.docx
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">Chuẩn NĐ 145 • 45 KB</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-outline group-hover/doc:text-primary transition-colors">
                  download
                </span>
              </button>

              {/* Document 2 */}
              <button
                type="button"
                onClick={() => handleDownloadTemplate('BM-02_Bang-tinh-tro-cap-thoi-viec.xlsx')}
                className="w-full text-left p-2.5 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-between group/doc cursor-pointer"
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-tertiary">table_chart</span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-md text-label-md text-on-surface font-medium truncate group-hover/doc:text-tertiary transition-colors">
                      BM-02_Bang-tinh-tro-cap-thoi-viec.xlsx
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">Tích hợp sẵn công thức • 118 KB</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-outline group-hover/doc:text-tertiary transition-colors">
                  download
                </span>
              </button>

              {/* Document 3 */}
              <button
                type="button"
                onClick={() => setSelectedArtifact({
                  id: 'check-3',
                  fileName: 'Checklist_Rui-ro-phap-ly-sa-thai.pdf',
                  description: 'Sơ đồ rà soát rủi ro pháp lý khi chấm dứt hợp đồng lao động',
                  type: 'pdf',
                  size: '890 KB',
                  weekApproved: 'Tuần 3'
                })}
                className="w-full text-left p-2.5 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-between group/doc cursor-pointer"
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-secondary">menu_book</span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-md text-label-md text-on-surface font-medium truncate group-hover/doc:text-secondary transition-colors">
                      Checklist_Rui-ro-phap-ly-sa-thai.pdf
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">Tài liệu nội bộ • 890 KB</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-outline group-hover/doc:text-secondary transition-colors">
                  visibility
                </span>
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDownloadAllZip}
                  className="w-full py-2 rounded-lg bg-surface-container text-on-surface font-label-xs text-label-xs font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">folder_zip</span>
                  <span>Tải trọn bộ 3 biểu mẫu (.zip)</span>
                </button>
              </div>
            </div>
          </details>

          {/* Sprint Metrics Summary Pill */}
          <div className="p-space-md rounded-xl bg-surface-container-low shadow-xs border border-surface-container-highest/40 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-xs text-label-xs font-semibold text-outline uppercase tracking-wider">
                Tiến độ Sprint Tuần 3
              </span>
              <span className="font-label-xs text-label-xs font-bold text-primary">33%</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full w-1/3"></div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-label-xs text-on-surface-variant">
              <span>Còn 2 bài tập cần nộp</span>
              <a className="text-primary font-medium hover:underline cursor-pointer" href="#active-sprint-week">
                Xem bài cần nộp
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
