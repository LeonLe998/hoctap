import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const OverviewView: React.FC = () => {
  const { 
    tasks, 
    toggleTask, 
    artifacts, 
    setSelectedArtifact, 
    mistakes, 
    setCurrentView,
    setIsReflectionOpen
  } = useApp();

  const [allOpen, setAllOpen] = useState(true);

  // Khung giờ hôm nay tasks (sample 3 sessions from tasks)
  const morningTask = tasks.find(t => t.id === 'task-m1') || tasks[0];
  const eveningTask = tasks.find(t => t.id === 'task-n1') || tasks[1];
  const nightTask = tasks.find(t => t.id === 'task-m2') || tasks[2];

  const todayCompletedCount = [morningTask?.completed, eveningTask?.completed, nightTask?.completed].filter(Boolean).length;

  return (
    <div className="flex flex-col w-full">
      {/* Top Executive Overview Strip */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-xs text-label-xs font-semibold">
              Kế hoạch 84 Ngày
            </span>
            <span className="text-outline text-label-xs font-label-xs">
              Cập nhật 06:45 hôm nay
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
            Tổng Quan Lộ Trình 12 Tuần
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Hệ thống định hướng hành động tập trung cho 3 trụ cột: Nghiệp vụ Nhân sự FDI, Tiếng Trung HSK & Tiếng Anh công sở.
          </p>
        </div>

        {/* Quick Mode Indicator & Action */}
        <div className="flex items-center gap-space-sm shrink-0">
          <div className="px-space-md py-1.5 rounded-full bg-surface-container-low text-on-surface flex items-center gap-2 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
            <span className="font-label-md text-label-md font-semibold">Sprint Tuần 3: Đang bứt tốc</span>
          </div>
          <button
            type="button"
            onClick={() => setAllOpen(!allOpen)}
            className="h-9 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">unfold_more</span>
            <span>{allOpen ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}</span>
          </button>
        </div>
      </div>

      {/* Metric Quick Summary Pills (4 Core Signals) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between border border-surface-container-highest/40">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">
              Tỷ lệ kỷ luật
            </span>
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-0.5">
              90.5%
            </span>
            <span className="font-label-xs text-label-xs text-tertiary flex items-center gap-1 mt-0.5 font-medium">
              <span className="material-symbols-outlined text-[13px]">trending_up</span> +2.4% so với Tuần 2
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between border border-surface-container-highest/40">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">
              Giờ học tuần 3
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                18.5h
              </span>
              <span className="font-body-sm text-body-sm text-outline">/ 21h mục tiêu</span>
            </div>
            <div className="w-28 bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-[20px]">timelapse</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between border border-surface-container-highest/40">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">
              Sản phẩm đầu ra
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                5/6
              </span>
              <span className="font-body-sm text-body-sm text-tertiary font-medium">artifact</span>
            </div>
            <span className="font-label-xs text-label-xs text-on-surface-variant mt-0.5">
              Đã nghiệm thu Giai đoạn 1
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[20px]">folder_special</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between border border-surface-container-highest/40">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">
              Chuỗi tập trung
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-lg text-headline-lg text-secondary-container font-bold tracking-tight">
                6 Ngày
              </span>
              <span className="font-body-sm text-body-sm text-outline">liên tiếp</span>
            </div>
            <span className="font-label-xs text-label-xs text-outline mt-0.5">
              Kỷ lục trước: 5 ngày
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
          </div>
        </div>
      </div>

      {/* Asymmetric Two-Column Architecture: Left 65% | Right 35% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT COLUMN: 65% (8/12 Desktop Columns) */}
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          {/* MỤC 1: KHUNG GIỜ HỌC HÔM NAY (Collapsible) */}
          <details 
            className="group rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 overflow-hidden transition-all duration-200" 
            open={allOpen}
          >
            <summary className="list-none flex items-center justify-between px-space-lg py-space-md cursor-pointer select-none bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Khung Giờ Học Hôm Nay
                    </span>
                    <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium">
                      3 khung giờ cố định
                    </span>
                  </div>
                  <p className="font-label-xs text-label-xs text-outline">
                    Có thể thu gọn khi đã nắm vững nhịp sinh học trong ngày
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-outline group-hover:text-on-surface">
                <span className="font-label-xs text-label-xs font-medium hidden sm:inline">
                  {todayCompletedCount}/3 hoàn thành
                </span>
                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                  expand_more
                </span>
              </div>
            </summary>
            
            <div className="p-space-lg pt-space-md flex flex-col gap-space-md">
              {/* Session 1: Sáng */}
              <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="flex items-start sm:items-center gap-space-md">
                  <button
                    onClick={() => morningTask && toggleTask(morningTask.id)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-label-xs font-bold transition-all cursor-pointer ${
                      morningTask?.completed
                        ? 'bg-tertiary-fixed-dim text-on-tertiary-fixed'
                        : 'bg-surface-container-high text-outline hover:border-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {morningTask?.completed ? 'done' : 'radio_button_unchecked'}
                    </span>
                  </button>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-label-xs text-label-xs text-outline font-semibold tracking-wider">
                        06:30 — 07:30 (60P)
                      </span>
                      <span className="font-label-xs text-label-xs px-2 py-0.2 rounded-full bg-surface-container-high text-on-tertiary-fixed-variant font-medium">
                        Tiếng Trung HSK
                      </span>
                    </div>
                    <span className={`font-title-sm text-title-sm text-on-surface font-medium mt-0.5 ${morningTask?.completed ? 'line-through text-outline' : ''}`}>
                      Luyện phát âm & 30 từ vựng nhân sự - tuyển dụng (HSK 3-4)
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      Anki Flashcard + Shadowing ghi âm 10 câu chào phỏng vấn
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => morningTask && toggleTask(morningTask.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-xs font-label-xs font-semibold cursor-pointer transition-colors ${
                      morningTask?.completed
                        ? 'bg-surface-container-high text-tertiary'
                        : 'bg-surface-container-high text-outline hover:text-on-surface'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${morningTask?.completed ? 'bg-tertiary' : 'bg-outline'}`}></span>
                    {morningTask?.completed ? 'Hoàn thành' : 'Đánh dấu xong'}
                  </button>
                </div>
              </div>

              {/* Session 2: Tối */}
              <div className="p-space-md rounded-lg bg-surface-container-lowest shadow-xs border border-surface-container-highest/60 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="flex items-start sm:items-center gap-space-md">
                  <button
                    onClick={() => eveningTask && toggleTask(eveningTask.id)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-label-xs font-bold transition-all cursor-pointer ${
                      eveningTask?.completed
                        ? 'bg-tertiary-fixed-dim text-on-tertiary-fixed'
                        : 'bg-primary/10 text-primary hover:border-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {eveningTask?.completed ? 'done' : 'schedule'}
                    </span>
                  </button>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-label-xs text-label-xs text-primary font-semibold tracking-wider">
                        19:30 — 20:30 (60P)
                      </span>
                      <span className="font-label-xs text-label-xs px-2 py-0.2 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-medium">
                        Nghiệp vụ HCNS
                      </span>
                    </div>
                    <span className={`font-title-sm text-title-sm text-on-surface font-semibold mt-0.5 ${eveningTask?.completed ? 'line-through text-outline' : ''}`}>
                      Xây dựng quy trình Onboarding & Chuẩn hóa Hợp đồng thử việc
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      Đối chiếu Bộ luật Lao động 2019 Điều 24 - 27; Soạn thảo template
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => eveningTask && toggleTask(eveningTask.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-xs font-label-xs font-semibold bg-surface-container-high text-primary cursor-pointer hover:bg-surface-container-highest"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    {eveningTask?.completed ? 'Hoàn thành' : 'Đang làm'}
                  </button>
                </div>
              </div>

              {/* Session 3: Đêm */}
              <div className="p-space-md rounded-lg bg-surface-container-low/60 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="flex items-start sm:items-center gap-space-md">
                  <button
                    onClick={() => nightTask && toggleTask(nightTask.id)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-label-xs font-bold transition-all cursor-pointer ${
                      nightTask?.completed
                        ? 'bg-tertiary-fixed-dim text-on-tertiary-fixed'
                        : 'bg-surface-container-highest text-outline'
                    }`}
                  >
                    {nightTask?.completed ? <span className="material-symbols-outlined text-[16px]">done</span> : '3'}
                  </button>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-label-xs text-label-xs text-outline font-semibold tracking-wider">
                        21:15 — 22:45 (90P)
                      </span>
                      <span className="font-label-xs text-label-xs px-2 py-0.2 rounded-full bg-surface-container-high text-on-surface-variant font-medium">
                        Tiếng Anh & Tổng kết
                      </span>
                    </div>
                    <span className={`font-title-sm text-title-sm text-on-surface font-medium mt-0.5 ${nightTask?.completed ? 'line-through text-outline' : ''}`}>
                      TOEIC Listening Part 3-4 (Hội thoại công sở) & Daily Audit
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      Nghe chép chính tả 3 audio + Ghi nhật ký tiến độ 10 phút
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => nightTask && toggleTask(nightTask.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-xs font-label-xs font-medium bg-surface-container-high text-on-surface-variant cursor-pointer hover:bg-surface-container-highest"
                  >
                    {nightTask?.completed ? 'Hoàn thành' : 'Chưa làm'}
                  </button>
                </div>
              </div>
            </div>
          </details>

          {/* MỤC 2: TIẾN ĐỘ 12 TUẦN SPRINT - PHÂN KỲ 3 GIAI ĐOẠN */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between px-space-xs">
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Tiến Độ 12 Tuần Sprint
                </span>
                <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-bold">
                  Tuần 3/12
                </span>
              </div>
              <span className="font-label-xs text-label-xs text-outline">
                Mô hình phân kỳ 3 giai đoạn chiến lược
              </span>
            </div>

            {/* Giai đoạn 1: Tuần 1 - 4 */}
            <details 
              className="group rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 overflow-hidden transition-all duration-200" 
              open={allOpen}
            >
              <summary className="list-none flex items-center justify-between px-space-lg py-space-md cursor-pointer select-none hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-space-md">
                  <div className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-md font-bold">
                    G1
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Giai đoạn 1: Nền tảng & Kỷ luật vận hành
                      </span>
                      <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
                        Tuần 1 — 4
                      </span>
                    </div>
                    <p className="font-label-xs text-label-xs text-outline">
                      Luật Lao động cơ bản, bảng chấm công, 300 từ HSK 3 & TOEIC Grammar Foundation
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-md">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="font-label-xs text-label-xs text-primary font-bold">
                      75% hoàn thành chặng
                    </span>
                    <div className="w-24 bg-surface-container-high h-1.5 rounded-full mt-1 overflow-hidden">
                      <div className="bg-primary-container h-full rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-on-surface transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </div>
              </summary>

              <div className="px-space-lg pb-space-lg pt-space-xs space-y-space-sm">
                {/* Tuần 1 */}
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                        Tuần 01: Thiết lập Hệ thống & Pháp chế Cơ bản
                      </span>
                      <span className="font-label-xs text-label-xs text-outline">
                        Sơ đồ tổ chức, hợp đồng lao động chuẩn, 100 từ vựng hành chính
                      </span>
                    </div>
                  </div>
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary font-semibold">
                    Đã nghiệm thu
                  </span>
                </div>

                {/* Tuần 2 */}
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                        Tuần 02: Quản trị Chấm công, Nghỉ phép & Nội quy Lao động
                      </span>
                      <span className="font-label-xs text-label-xs text-outline">
                        Excel xử lý dữ liệu quẹt vân tay, Đăng ký nội quy với Sở LĐTBXH
                      </span>
                    </div>
                  </div>
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary font-semibold">
                    Đã nghiệm thu
                  </span>
                </div>

                {/* Tuần 3: Current */}
                <div 
                  onClick={() => setCurrentView('hcns')}
                  className="p-space-md rounded-lg bg-primary-fixed/20 border border-primary/30 shadow-xs flex items-center justify-between cursor-pointer hover:bg-primary-fixed/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-xs font-bold animate-pulse">
                      3
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-label-lg text-label-lg text-on-surface font-bold">
                          Tuần 03: Quy trình Onboarding & Đào tạo Hội nhập (ĐANG CHẠY)
                        </span>
                        <span className="font-label-xs text-label-xs px-1.5 py-0.5 rounded bg-primary-container text-on-primary font-bold">
                          Hiện tại
                        </span>
                      </div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">
                        Checklist nhân viên mới, Mindmap kỷ luật lao động, Hội thoại giao việc HSK
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-xs text-label-xs text-primary font-bold hidden sm:inline">
                      6/8 nhiệm vụ
                    </span>
                    <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
                  </div>
                </div>

                {/* Tuần 4 */}
                <div className="p-space-sm rounded-lg bg-surface-container-low/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline text-[18px]">radio_button_unchecked</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface-variant font-medium">
                        Tuần 04: BHXH Bắt buộc, Khám sức khỏe định kỳ & Đánh giá Chặng 1
                      </span>
                      <span className="font-label-xs text-label-xs text-outline">
                        Phần mềm BHXH điện tử, quy trình ốm đau - thai sản, Kiểm tra HSK 3 Mockup
                      </span>
                    </div>
                  </div>
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-outline font-medium">
                    Tuần tới
                  </span>
                </div>
              </div>
            </details>

            {/* Giai đoạn 2: Tuần 5 - 8 */}
            <details className="group rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 overflow-hidden transition-all duration-200">
              <summary className="list-none flex items-center justify-between px-space-lg py-space-md cursor-pointer select-none hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-space-md">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high text-outline flex items-center justify-center font-label-md font-bold">
                    G2
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Giai đoạn 2: Bứt tốc Thực chiến Doanh nghiệp FDI
                      </span>
                      <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium">
                        Tuần 5 — 8
                      </span>
                    </div>
                    <p className="font-label-xs text-label-xs text-outline">
                      Tính toán C&B chuyên sâu, Thuế TNCN, Xử lý tranh chấp & Đàm phán song ngữ
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-md">
                  <span className="font-label-xs text-label-xs text-outline">Dự kiến bắt đầu: 15/11</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-on-surface transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </div>
              </summary>
              <div className="px-space-lg pb-space-lg pt-space-xs space-y-space-sm bg-surface-container-low/20">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-medium">
                      Tuần 05: Xây dựng Thang Bảng lương & Quy chế Chi trả
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      Công thức Excel lương 3P, tính OT và phụ cấp độc hại
                    </span>
                  </div>
                  <span className="font-label-xs text-label-xs text-outline">Mục tiêu 1</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-medium">
                      Tuần 06: Quyết toán Thuế TNCN & Giảm trừ gia cảnh
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      Xử lý người lao động nước ngoài (Trung/Hàn), biểu thuế lũy tiến
                    </span>
                  </div>
                  <span className="font-label-xs text-label-xs text-outline">Mục tiêu 2</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-medium">
                      Tuần 07: Kỷ luật Lao động & Sa thải hợp pháp
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      Biên bản xử lý, phiên họp kỷ luật có công đoàn, kỹ năng phỏng vấn sa thải
                    </span>
                  </div>
                  <span className="font-label-xs text-label-xs text-outline">Mục tiêu 3</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-medium">
                      Tuần 08: Đánh giá KPI/OKR & Khảo sát mức độ gắn kết
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      Biểu mẫu đánh giá cuối năm, Báo cáo nhân sự định kỳ cho Ban Giám đốc
                    </span>
                  </div>
                  <span className="font-label-xs text-label-xs text-outline">Mục tiêu 4</span>
                </div>
              </div>
            </details>

            {/* Giai đoạn 3: Tuần 9 - 12 */}
            <details className="group rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 overflow-hidden transition-all duration-200">
              <summary className="list-none flex items-center justify-between px-space-lg py-space-md cursor-pointer select-none hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-space-md">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high text-outline flex items-center justify-center font-label-md font-bold">
                    G3
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Giai đoạn 3: Về đích Portfolio & Phỏng vấn Mock Interview
                      </span>
                      <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium">
                        Tuần 9 — 12
                      </span>
                    </div>
                    <p className="font-label-xs text-label-xs text-outline">
                      Hoàn thiện CV song ngữ Anh - Trung, mô phỏng phỏng vấn Headhunter, thi chứng chỉ
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-space-md">
                  <span className="font-label-xs text-label-xs text-outline">Dự kiến bắt đầu: 13/12</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-on-surface transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </div>
              </summary>
              <div className="px-space-lg pb-space-lg pt-space-xs space-y-space-sm bg-surface-container-low/20">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-medium">
                      Tuần 09: Chuẩn hóa Hồ sơ Năng lực (Career Dossier)
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      CV ATS-standard, Portfolio mẫu văn bản thực tế, hồ sơ số Notion/PDF
                    </span>
                  </div>
                  <span className="font-label-xs text-label-xs text-outline">Chặng cuối</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-medium">
                      Tuần 10: Mock Interview bằng Tiếng Trung & Tiếng Anh
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      Xử lý câu hỏi tình huống tình dục học đường/nhà xưởng, thương lượng lương
                    </span>
                  </div>
                  <span className="font-label-xs text-label-xs text-outline">Chặng cuối</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-medium">
                      Tuần 11: Thi thử HSK 4 & TOEIC Full Test
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      Đạt mốc chuẩn TOEIC 750+ và HSK 4 220+ điểm
                    </span>
                  </div>
                  <span className="font-label-xs text-label-xs text-outline">Chặng cuối</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-medium">
                      Tuần 12: Nộp hồ sơ vào 10 Doanh nghiệp FDI mục tiêu
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      Theo dõi phỏng vấn, tối ưu phản hồi và kết thúc chặng 12 tuần
                    </span>
                  </div>
                  <span className="font-label-xs text-label-xs text-tertiary font-bold">KẾT QUẢ</span>
                </div>
              </div>
            </details>
          </div>

          {/* MỤC 3: HỘP SẢN PHẨM ĐẦU RA ĐÃ NGHIỆM THU (Portfolio Vault) */}
          <details 
            className="group rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 overflow-hidden transition-all duration-200" 
            open={allOpen}
          >
            <summary className="list-none flex items-center justify-between px-space-lg py-space-md cursor-pointer select-none bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Hộp Sản Phẩm Đầu Ra Đã Nghiệm Thu (Portfolio Vault)
                    </span>
                    <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-semibold">
                      {artifacts.length} artifacts
                    </span>
                  </div>
                  <p className="font-label-xs text-label-xs text-outline">
                    Bấm xổ xuống để tra cứu các tài liệu thực tế đã hoàn thành và phê duyệt
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-on-surface transition-transform duration-300 group-open:rotate-180">
                expand_more
              </span>
            </summary>

            <div className="p-space-lg pt-space-sm space-y-space-sm">
              {artifacts.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArtifact(art)}
                  className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between hover:bg-surface-container-high/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-space-md min-w-0">
                    <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                      {art.type === 'excel' && 'table_chart'}
                      {art.type === 'pdf' && 'description'}
                      {art.type === 'audio' && 'mic'}
                      {art.type === 'word' && 'article'}
                      {art.type === 'image' && 'schema'}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate hover:text-primary transition-colors">
                        {art.fileName}
                      </span>
                      <span className="font-label-xs text-label-xs text-outline truncate">
                        {art.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-label-xs text-label-xs px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-medium">
                      {art.size}
                    </span>
                    <button
                      type="button"
                      className="p-1 rounded text-outline hover:text-primary transition-colors cursor-pointer"
                      title="Xem chi tiết"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {art.type === 'audio' ? 'play_circle' : art.type === 'image' ? 'image' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* RIGHT COLUMN: 35% (4/12 Desktop Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Trụ cột & Tiến độ phân tầng (3 Pillars Progress) */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                Tiến Độ 3 Trụ Cột
              </span>
              <span className="font-label-xs text-label-xs text-outline">Mục tiêu 12 tuần</span>
            </div>

            {/* Pillar 1: HCNS */}
            <div 
              onClick={() => setCurrentView('hcns')}
              className="flex flex-col gap-1.5 p-space-sm rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Nghiệp vụ HCNS FDI
                  </span>
                </div>
                <span className="font-label-xs text-label-xs text-primary font-bold">
                  28% (3.5/12 tuần)
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '28%' }}></div>
              </div>
              <span className="font-label-xs text-label-xs text-outline">
                Hoàn thành: HĐLĐ, Nội quy, Chấm công
              </span>
            </div>

            {/* Pillar 2: HSK Tiếng Trung */}
            <div 
              onClick={() => setCurrentView('chinese')}
              className="flex flex-col gap-1.5 p-space-sm rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Tiếng Trung HSK & Giao tiếp
                  </span>
                </div>
                <span className="font-label-xs text-label-xs text-secondary font-bold">
                  25% (280/1200 từ)
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary-container h-full rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="font-label-xs text-label-xs text-outline">
                Mục tiêu: Đạt chuẩn HSK 3 vào Tuần 4
              </span>
            </div>

            {/* Pillar 3: TOEIC Tiếng Anh */}
            <div 
              onClick={() => setCurrentView('english')}
              className="flex flex-col gap-1.5 p-space-sm rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Tiếng Anh TOEIC & Phỏng vấn
                  </span>
                </div>
                <span className="font-label-xs text-label-xs text-tertiary font-bold">
                  22% (620/750 điểm)
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: '22%' }}></div>
              </div>
              <span className="font-label-xs text-label-xs text-outline">
                Đang tập trung: Part 3, 4 Listening phản xạ
              </span>
            </div>
          </div>

          {/* Sổ Lỗi Sai Cần Khắc Phục Ngay (Mistake Log & Review) */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[18px]">flag</span>
                <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                  Sổ Lỗi Cần Ôn Lại
                </span>
              </div>
              <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-semibold">
                {mistakes.slice(0, 3).length} điểm nóng
              </span>
            </div>

            <div className="space-y-space-sm">
              {mistakes.slice(0, 3).map((mis) => (
                <div key={mis.id} className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-xs text-label-xs text-primary font-semibold">
                      {mis.category}
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">
                      {mis.timeTag}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">
                    {mis.content}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentView('journal')}
              className="w-full py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
              <span>Mở Sổ tay phản tư 12 tuần</span>
            </button>
          </div>

          {/* Lịch Nhịp Tuần 3 (Sprint Calendar Snapshot) */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                Nhịp Sinh Học Tuần 3
              </span>
              <span className="font-label-xs text-label-xs text-outline">Thứ Hai — Chủ Nhật</span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {[
                { day: 'T2', hours: '3.0h', done: true },
                { day: 'T3', hours: '3.5h', done: true },
                { day: 'T4', hours: '3.0h', done: true },
                { day: 'T5', hours: '3.0h', done: true },
                { day: 'T6', hours: '3.5h', done: true },
                { day: 'T7', hours: '2.5h', today: true },
                { day: 'CN', hours: '0h', audit: true }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center p-1.5 rounded-lg ${
                    item.today
                      ? 'bg-primary-fixed shadow-xs'
                      : item.done
                      ? 'bg-surface-container-low'
                      : 'bg-surface-container-lowest'
                  }`}
                >
                  <span className={`font-label-xs text-label-xs ${item.today ? 'text-primary font-bold' : 'text-outline'}`}>
                    {item.day}
                  </span>
                  <span className={`font-label-md text-label-md font-bold mt-1 ${item.today ? 'text-on-primary-fixed' : item.done ? 'text-tertiary' : 'text-outline font-medium'}`}>
                    {item.hours}
                  </span>
                  {item.done && (
                    <span className="material-symbols-outlined text-tertiary text-[14px]">check</span>
                  )}
                  {item.today && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1 animate-pulse"></span>
                  )}
                  {item.audit && (
                    <span className="font-label-xs text-label-xs text-outline mt-0.5">Audit</span>
                  )}
                </div>
              ))}
            </div>

            <div 
              onClick={() => setIsReflectionOpen(true)}
              className="p-space-sm rounded-lg bg-surface-container-low text-on-surface-variant font-label-xs text-label-xs flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors"
            >
              <span>Mục tiêu ngày mai (CN):</span>
              <span className="font-semibold text-primary">Tổng kết tuần 3 & Lập kế hoạch tuần 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
