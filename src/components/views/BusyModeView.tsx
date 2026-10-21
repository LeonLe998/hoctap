import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const BusyModeView: React.FC = () => {
  const { setStudyMode, setPomodoroMode, togglePomodoro, showToast } = useApp();

  const [activeAccordion, setActiveAccordion] = useState<number | null>(2);
  const [session2Completed, setSession2Completed] = useState(false);
  const [session3Completed, setSession3Completed] = useState(false);
  const [isEarlyBedDone, setIsEarlyBedDone] = useState(false);
  const [isPlayingFlashcardAudio, setIsPlayingFlashcardAudio] = useState(false);

  const toggleAcc = (idx: number) => {
    setActiveAccordion(prev => prev === idx ? null : idx);
  };

  const handleStartMicroPomodoro = () => {
    setPomodoroMode('busy20');
    togglePomodoro();
    showToast('Đã khởi động phiên Micro-Pomodoro 20:3! Tập trung xử lý dứt điểm.');
  };

  const handlePlayAudioFlashcard = () => {
    if (isPlayingFlashcardAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingFlashcardAudio(false);
      return;
    }

    if ('speechSynthesis' in window) {
      const text = "Từ vựng then chốt hôm nay: Một: Zhaopin - Tuyển dụng. Hai: Mianshi - Phỏng vấn. Ba: Luqu - Trúng tuyển. Bốn: Xinzhi - Lương bổng. Năm: Hetong - Hợp đồng lao động.";
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'vi-VN';
      u.rate = 0.9;
      u.onend = () => setIsPlayingFlashcardAudio(false);
      u.onstart = () => setIsPlayingFlashcardAudio(true);
      window.speechSynthesis.speak(u);
      showToast('Đang phát Audio Flashcard 1-Click...');
    } else {
      setIsPlayingFlashcardAudio(true);
      showToast('Đang phát tệp âm thanh nghe thụ động...');
    }
  };

  const handleConfirmEarlyBed = () => {
    setIsEarlyBedDone(true);
    showToast('Xuất sắc! Bạn đã bảo vệ trọn vẹn chuỗi streak 6 ngày liên tiếp. Hãy nghỉ ngơi thật tốt!');
  };

  // Completed micro-sessions count (session 1 is done by default)
  const completedSessions = 1 + (session2Completed ? 1 : 0) + (session3Completed ? 1 : 0);
  const totalMinutes = 20 + (session2Completed ? 20 : 0) + (session3Completed ? 20 : 0);

  return (
    <div className="flex flex-col w-full space-y-space-xl">
      {/* Top Banner / Calm Status Header */}
      <section className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-xl shadow-xs border border-surface-container-highest/40">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-lg">
          <div className="space-y-space-sm max-w-3xl">
            <div className="inline-flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>Chế độ Bận rộn (Active) • 60 phút / ngày</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg lg:font-display-md lg:text-display-md text-on-surface tracking-tight font-semibold">
              Chế độ Bận rộn: Microlearning 1h & Giữ vững Kỷ luật
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Ưu tiên giữ nhịp độ liên tục hơn là làm quá sức. Hoàn thành 60 phút hôm nay bảo vệ trọn vẹn chuỗi streak{' '}
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                6 ngày liên tiếp
              </span>{' '}
              của bạn.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md shrink-0">
            <button
              onClick={() => setStudyMode('standard')}
              className="h-9 px-space-lg rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center gap-space-xs cursor-pointer shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">restore</span>
              <span>Quay về Chế độ Tiêu chuẩn (3h/ngày)</span>
            </button>
          </div>
        </div>

        {/* Quick Vital Metrics Grid */}
        <div className="mt-space-xl grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-lg bg-surface-container-low/50 rounded-lg p-space-md">
          {/* Metric 1: Time Commitment */}
          <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-lowest border border-surface-container-highest/40">
            <div className="w-10 h-10 rounded-lg bg-primary-container/15 text-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">timer</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold">
                  Thời lượng cam kết
                </span>
                <span className="font-label-xs text-label-xs text-primary font-bold">
                  {totalMinutes} / 60p
                </span>
              </div>
              <div className="mt-1.5 w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary-container h-full rounded-full transition-all duration-300" 
                  style={{ width: `${(totalMinutes / 60) * 100}%` }}
                ></div>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-1 block">
                {3 - completedSessions > 0 ? `Còn ${3 - completedSessions} phiên vi mô (${(3 - completedSessions) * 20} phút)` : 'Đã hoàn thành xuất sắc 60 phút hôm nay!'}
              </span>
            </div>
          </div>

          {/* Metric 2: Streak Guard */}
          <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-lowest border border-surface-container-highest/40">
            <div className="w-10 h-10 rounded-lg bg-tertiary-container/15 text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">local_fire_department</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold">
                  Bảo vệ Streak
                </span>
                <span className="font-label-xs text-label-xs text-tertiary font-bold">An toàn</span>
              </div>
              <p className="font-title-sm text-title-sm text-on-surface font-semibold mt-0.5">6 ngày liên tiếp</p>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] block">
                Streak Freeze kích hoạt tự động
              </span>
            </div>
          </div>

          {/* Metric 3: Cognitive Relief */}
          <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-lowest border border-surface-container-highest/40">
            <div className="w-10 h-10 rounded-lg bg-secondary-container/15 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">spa</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold">
                  Giảm tải nhận thức
                </span>
                <span className="font-label-xs text-label-xs text-secondary font-bold">-67%</span>
              </div>
              <p className="font-title-sm text-title-sm text-on-surface font-semibold mt-0.5">Không dồn nợ bài</p>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] block">
                Tác vụ nặng đã dời sang thứ Bảy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Left Column: 3 Micro Sessions (8 Cols) */}
        <div className="lg:col-span-8 space-y-space-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
                3 Phiên Microlearning Hôm nay
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Chỉ 1 mục tiêu duy nhất cho từng trụ cột kỹ năng • Tổng 60 phút
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-xs text-label-xs font-semibold">
              Hoàn thành {completedSessions}/3 phiên
            </span>
          </div>

          {/* Accordion Container */}
          <div className="space-y-space-md">
            {/* Session 1: TOEIC (Completed) */}
            <div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-xs border border-surface-container-highest/40 transition-all">
              <div 
                onClick={() => toggleAcc(1)}
                className="p-space-lg flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-9 h-9 rounded-full bg-tertiary-container/15 text-tertiary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed/40 text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                        Phiên 1 • Sáng (06:45 - 07:05)
                      </span>
                      <span className="font-label-xs text-label-xs text-outline">20 phút</span>
                    </div>
                    <h3 className="font-title-sm text-title-sm text-on-surface mt-1 truncate font-semibold">
                      Micro-English: Chống rỉ sét phản xạ hợp đồng & nhân sự
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-space-md shrink-0">
                  <span className="hidden sm:inline-flex items-center gap-1 font-label-xs text-label-xs text-tertiary font-semibold">
                    Đã xong • 10/10
                  </span>
                  <span className={`material-symbols-outlined text-outline transition-transform duration-200 ${activeAccordion === 1 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>
              </div>

              {activeAccordion === 1 && (
                <div className="px-space-lg pb-space-lg pt-0">
                  <div className="p-space-md rounded-lg bg-surface-container-low space-y-space-sm text-body-md font-body-md border border-surface-container-highest/40">
                    <div className="flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-tertiary text-[18px] mt-0.5">task_alt</span>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-semibold">
                          Ôn tập 20 Flashcard Anki chuyên ngành HR & Contract terms (10 phút)
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Tỷ lệ nhớ đúng: 95%. Đã hoàn tất lúc 07:04 sáng.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-tertiary text-[18px] mt-0.5">task_alt</span>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-semibold">
                          Nghe 1 đoạn hội thoại ngắn Part 3: Giải quyết tranh chấp ca trực (10 phút)
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Nghe shadow 2 lần, nắm được 3 cấu trúc phản hồi đề xuất tăng ca.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Session 2: Chinese HSK (Active) */}
            <div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-xs border border-secondary/30 transition-all">
              <div 
                onClick={() => toggleAcc(2)}
                className="p-space-lg flex items-center justify-between cursor-pointer select-none bg-secondary/5"
              >
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-9 h-9 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">translate</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
                        Phiên 2 • Tối nay (20:00 - 20:20)
                      </span>
                      <span className="font-label-xs text-label-xs text-secondary font-bold">
                        {session2Completed ? 'Đã hoàn thành' : 'Kế tiếp • 20 phút'}
                      </span>
                    </div>
                    <h3 className="font-title-sm text-title-sm text-on-surface mt-1 truncate font-semibold">
                      Micro-Chinese: Duy trì quán tính nhận diện Hán tự HSK 3
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-space-md shrink-0">
                  <span className={`material-symbols-outlined text-secondary transition-transform duration-200 ${activeAccordion === 2 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>
              </div>

              {activeAccordion === 2 && (
                <div className="px-space-lg pb-space-lg pt-space-sm">
                  <div className="p-space-md rounded-lg bg-surface-container-low space-y-space-md border border-surface-container-highest/40">
                    <div className="space-y-space-xs">
                      <div className="flex items-center gap-space-xs">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Thực đơn vi mô duy nhất tối nay:
                        </span>
                      </div>
                      <ul className="font-body-md text-body-md text-on-surface-variant pl-space-lg list-disc space-y-1">
                        <li>Nhận diện nhanh 15 chữ Hán HSK 3 then chốt (nhóm từ vựng: 招聘, 面试, 薪水).</li>
                        <li>Nghe phát âm và nhại giọng 5 câu giao tiếp phỏng vấn ứng viên chuẩn phổ thông.</li>
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-xs border-t border-surface-container-highest/60">
                      <div className="flex items-center gap-space-xs text-on-surface-variant font-label-xs text-label-xs">
                        <span className="material-symbols-outlined text-[16px]">psychology</span>
                        <span>Mục tiêu: Nhận diện mặt chữ, KHÔNG bắt buộc viết tay ra giấy.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSession2Completed(!session2Completed)}
                          className={`h-9 px-3 rounded-lg font-label-md text-label-md font-semibold transition-colors cursor-pointer ${
                            session2Completed ? 'bg-tertiary text-on-tertiary' : 'bg-surface-container-high text-on-surface'
                          }`}
                        >
                          {session2Completed ? '✓ Đã xong' : 'Đánh dấu xong'}
                        </button>
                        <button
                          type="button"
                          onClick={handleStartMicroPomodoro}
                          className="h-9 px-space-md rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity shadow-xs cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">play_circle</span>
                          <span>Bắt đầu 20 phút Pomodoro</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Session 3: HCNS Law & Policy */}
            <div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-xs border border-surface-container-highest/40 transition-all">
              <div 
                onClick={() => toggleAcc(3)}
                className="p-space-lg flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-space-md min-w-0">
                  <div className="w-9 h-9 rounded-full bg-primary-container/15 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">gavel</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs font-semibold">
                        Phiên 3 • Đêm (21:45 - 22:05)
                      </span>
                      <span className="font-label-xs text-label-xs text-outline">20 phút</span>
                    </div>
                    <h3 className="font-title-sm text-title-sm text-on-surface mt-1 truncate font-semibold">
                      Micro-HCNS: Rà soát & Đọc hiểu nhanh văn bản luật lao động
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-space-md shrink-0">
                  <span className="hidden sm:inline-flex items-center gap-1 font-label-xs text-label-xs text-outline font-medium">
                    {session3Completed ? 'Đã hoàn thành' : 'Chờ thực hiện'}
                  </span>
                  <span className={`material-symbols-outlined text-outline transition-transform duration-200 ${activeAccordion === 3 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>
              </div>

              {activeAccordion === 3 && (
                <div className="px-space-lg pb-space-lg pt-0">
                  <div className="p-space-md rounded-lg bg-surface-container-low space-y-space-md border border-surface-container-highest/40">
                    <div className="space-y-space-xs">
                      <div className="flex items-center gap-space-xs">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Thực đơn vi mô tối giản:
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Đọc nhanh 1 điều khoản cốt lõi: <strong className="text-on-surface font-semibold">Khoản 1 Điều 122 BLLĐ 2019</strong> (Nguyên tắc, trình tự xử lý kỷ luật lao động) + Ghi chú 1 bài học cốt lõi vào Sổ tay điện tử. Miễn làm bảng biểu phức tạp.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-xs border-t border-surface-container-highest/60">
                      <div className="flex items-center gap-space-xs text-on-surface-variant font-label-xs text-label-xs">
                        <span className="material-symbols-outlined text-[16px]">menu_book</span>
                        <span>Đã tích hợp sẵn trích đoạn luật 400 từ kèm chú giải.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSession3Completed(!session3Completed)}
                          className={`h-9 px-3 rounded-lg font-label-md text-label-md font-semibold transition-colors cursor-pointer ${
                            session3Completed ? 'bg-tertiary text-on-tertiary' : 'bg-surface-container-high text-on-surface'
                          }`}
                        >
                          {session3Completed ? '✓ Đã xong' : 'Đánh dấu xong'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Anti-Guilt Workflow Guarantee */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 flex items-start gap-space-md">
            <div className="w-9 h-9 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                Nguyên tắc Chống tội lỗi (Anti-Guilt Protocol)
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Sự nhất quán quan trọng gấp 10 lần cường độ nhất thời. Khi công việc bên ngoài quá tải, hoàn thành 60 phút vi mô được hệ thống công nhận là một ngày đạt chuẩn 100%. Không giảm điểm KPI tuần, không phạt chuỗi.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Smart Rescheduling & Quick Tools (4 Cols) */}
        <div className="lg:col-span-4 space-y-space-lg">
          {/* Card: Smart Rescheduling to Weekend */}
          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-xs border border-surface-container-highest/40 space-y-space-md">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">
                  Dời lịch Thông minh
                </h3>
                <span className="font-label-xs text-label-xs text-outline">Smart Rescheduling</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed/40 text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                Tự động an toàn
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              2 bài tập dự án lớn đòi hỏi tư duy sâu đã được chuyển sang khung giờ rảnh cuối tuần:
            </p>

            <div className="space-y-space-sm">
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container-highest/40">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-semibold leading-snug">
                    Bài 3.2: Case study sa thải trái luật & bồi thường
                  </span>
                </div>
                <div className="flex items-center justify-between text-outline font-label-xs text-label-xs mt-1">
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <span className="material-symbols-outlined text-[14px]">event_repeat</span>
                    Thứ 7 • 09:00 - 10:30
                  </span>
                  <span>Khối HCNS</span>
                </div>
              </div>

              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 border border-surface-container-highest/40">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-semibold leading-snug">
                    Bài 3.3: Lập file Excel tính toán trợ cấp thôi việc
                  </span>
                </div>
                <div className="flex items-center justify-between text-outline font-label-xs text-label-xs mt-1">
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <span className="material-symbols-outlined text-[14px]">event_repeat</span>
                    Chủ Nhật • 14:00 - 15:30
                  </span>
                  <span>Thực hành</span>
                </div>
              </div>
            </div>

            <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-dashed border-outline-variant flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              <span className="font-label-xs text-label-xs font-medium">
                Đã dời lịch có chủ đích • Không trừ điểm kỷ luật
              </span>
            </div>
          </div>

          {/* Card: Quick Tools for Busy Days */}
          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-xs border border-surface-container-highest/40 space-y-space-md">
            <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">
              Hộp công cụ Cấp tốc
            </h3>
            <div className="space-y-space-sm">
              {/* Tool 1: Micro-Pomodoro */}
              <div className="p-space-md rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-highest/40">
                <div className="space-y-0.5">
                  <span className="font-label-md text-label-md text-on-surface font-semibold block">
                    Bộ đếm Pomodoro 20:3
                  </span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">
                    20p tập trung sâu • 3p thả lỏng
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleStartMicroPomodoro}
                  className="h-8 px-space-md rounded-lg bg-primary-container text-on-primary font-label-xs text-label-xs font-semibold flex items-center gap-1 hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Bật đếm</span>
                </button>
              </div>

              {/* Tool 2: Audio Flash-cards */}
              <div className="p-space-md rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-highest/40">
                <div className="space-y-0.5">
                  <span className="font-label-md text-label-md text-on-surface font-semibold block">
                    Audio Flashcard 1-Click
                  </span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">
                    Nghe thụ động lúc di chuyển / làm việc nhà
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handlePlayAudioFlashcard}
                  className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer shadow-xs ${
                    isPlayingFlashcardAudio
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                  }`}
                  title="Nghe audio"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isPlayingFlashcardAudio ? 'pause' : 'headphones'}
                  </span>
                </button>
              </div>
            </div>

            {/* Finish Early Action */}
            <div className="pt-space-xs">
              <button
                type="button"
                onClick={handleConfirmEarlyBed}
                className={`w-full h-11 px-space-md rounded-lg font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs transition-colors cursor-pointer shadow-xs ${
                  isEarlyBedDone
                    ? 'bg-tertiary text-on-tertiary'
                    : 'bg-surface-container-high hover:bg-surface-dim text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  {isEarlyBedDone ? 'done_all' : 'bedtime'}
                </span>
                <span>{isEarlyBedDone ? 'Đã ghi nhận hoàn tất hôm nay!' : 'Xác nhận 60p & Đi ngủ sớm'}</span>
              </button>
              <span className="font-label-xs text-label-xs text-outline text-center block mt-2">
                Ngủ đủ giấc là yếu tố bắt buộc để củng cố trí nhớ dài hạn.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
