import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const EnglishRoadmapView: React.FC = () => {
  const { mistakes, addMistake, showToast } = useApp();

  const [allExpanded, setAllExpanded] = useState(true);

  // Dictation Player State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1.0 | 0.8>(1.0);
  const [progressPercent, setProgressPercent] = useState(45);
  const [blank1, setBlank1] = useState('');
  const [blank2, setBlank2] = useState('');
  const [blank3, setBlank3] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [dictationFeedback, setDictationFeedback] = useState<{
    tested: boolean;
    b1Ok: boolean;
    b2Ok: boolean;
    b3Ok: boolean;
  } | null>(null);

  // New Error Form State
  const [isAddingError, setIsAddingError] = useState(false);
  const [newErrorTitle, setNewErrorTitle] = useState('');
  const [newErrorExplanation, setNewErrorExplanation] = useState('');

  // Voice playback using Web Speech API
  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = "Hello Ms. Jenkins, I am calling from the Human Resources Department regarding your application for the Senior Compensation Analyst role. We were very impressed with your background in payroll management. We would like to invite you for an in-person interview this Thursday at 10 AM. Could you confirm if that time fits your schedule?";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = playbackSpeed;
      utterance.onend = () => {
        setIsPlayingAudio(false);
        setProgressPercent(100);
      };
      utterance.onstart = () => {
        setIsPlayingAudio(true);
        setProgressPercent(20);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  const handleReplay5 = () => {
    window.speechSynthesis.cancel();
    handlePlayAudio();
    showToast('Đang phát lại từ đầu câu 5 giây...');
  };

  const handleCheckDictation = () => {
    const b1 = blank1.trim().toLowerCase();
    const b2 = blank2.trim().toLowerCase();
    const b3 = blank3.trim().toLowerCase();

    const b1Ok = b1 === 'application' || b1 === 'resume';
    const b2Ok = b2 === 'interview';
    const b3Ok = b3 === 'fits' || b3 === 'suits' || b3 === 'fit' || b3 === 'matches';

    setDictationFeedback({
      tested: true,
      b1Ok,
      b2Ok,
      b3Ok
    });

    if (b1Ok && b2Ok && b3Ok) {
      showToast('Tuyệt vời! Bạn đã điền chính xác 3/3 chỗ trống của đoạn Dictation.');
    } else {
      showToast('Có chỗ trống chưa chính xác, hãy bấm "Xem phụ đề đầy đủ" để đối chiếu.');
    }
  };

  const handleAddMistakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newErrorTitle.trim()) return;

    addMistake({
      category: 'Tiếng Anh TOEIC',
      categoryColor: 'tertiary',
      timeTag: 'Vừa thêm',
      content: newErrorTitle.trim(),
      detailedExplanation: newErrorExplanation.trim() || 'Cần chú ý ôn tập lại trong sổ tay phản tư.'
    });

    setNewErrorTitle('');
    setNewErrorExplanation('');
    setIsAddingError(false);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Minimalist Executive Header: Key Metrics & Sprint Status */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md p-space-lg bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-space-sm">
            <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-xs text-label-xs font-semibold">
              Chương Trình Kép: TOEIC & HR English
            </span>
            <span className="text-outline font-label-xs text-label-xs">
              Chặng 1 • Tuần 3/12
            </span>
          </div>
          <h1 className="font-display-md text-display-md text-on-surface tracking-tight font-bold">
            Lộ Trình Tiếng Anh Công Sở & TOEIC 750+
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Chuẩn hóa năng lực giao tiếp nhân sự quốc tế, phản xạ xử lý email hợp đồng và bứt phá điểm số nghe hiểu kỹ thuật số.
          </p>
        </div>

        {/* Quick Stats Metric Trio */}
        <div className="grid grid-cols-3 gap-space-md bg-surface-container-low p-space-md rounded-lg shrink-0">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">
              TOEIC Mục tiêu
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-lg text-headline-lg text-primary font-bold">615</span>
              <span className="font-label-xs text-label-xs text-on-surface-variant">/ 750+</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>

          <div className="flex flex-col pl-space-sm">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">
              Collocations
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-lg text-headline-lg text-tertiary font-bold">410</span>
              <span className="font-label-xs text-label-xs text-on-surface-variant">/ 800</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-tertiary h-full rounded-full" style={{ width: '51%' }}></div>
            </div>
          </div>

          <div className="flex flex-col pl-space-sm">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">
              Chuyên cần
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-lg text-headline-lg text-secondary font-bold">91.6%</span>
            </div>
            <span className="font-label-xs text-label-xs text-tertiary mt-1.5 flex items-center gap-0.5 font-medium">
              <span className="material-symbols-outlined text-[13px]">trending_up</span> Đạt chuẩn
            </span>
          </div>
        </div>
      </section>

      {/* Accordion Group 1: 60-Minute Morning Routine */}
      <section className="w-full">
        <details 
          className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 overflow-hidden transition-all duration-200" 
          open
        >
          <summary className="flex items-center justify-between p-space-lg cursor-pointer list-none select-none hover:bg-surface-container-low/60 transition-colors">
            <div className="flex items-center gap-space-md">
              <div className="w-9 h-9 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">alarm_on</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Quy Trình 5 Bước 60 Phút Sáng
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[11px] font-label-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
                    06:30 - 07:30 Hằng Ngày
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Khung giờ vàng xây dựng phản xạ ngữ âm học & từ vựng hợp đồng nhân sự
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <span className="font-label-xs text-label-xs text-outline hidden sm:inline">
                Bấm để thu gọn / mở rộng
              </span>
              <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                expand_more
              </span>
            </div>
          </summary>

          {/* 5-Step Routine Content */}
          <div className="p-space-lg pt-0 grid grid-cols-1 md:grid-cols-5 gap-space-md">
            {/* Step 1 */}
            <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between hover:bg-surface-container-high transition-colors">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-xs text-label-xs font-bold text-outline">BƯỚC 01</span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">10 Phút</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-semibold mt-1">Ôn tập Anki</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Lặp lại ngắt quãng 35 thẻ flashcards ngữ cảnh đàm phán lương & phỏng vấn.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-tertiary font-medium">35/35 Thẻ</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between hover:bg-surface-container-high transition-colors">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-xs text-label-xs font-bold text-outline">BƯỚC 02</span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">15 Phút</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-semibold mt-1">Nạp Collocations</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Ghi nhớ 5 cụm từ HR trọng yếu (e.g., “mutual separation agreement”).
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-primary font-medium">5/5 Cụm từ</span>
                <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between hover:bg-surface-container-high transition-colors">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-xs text-label-xs font-bold text-outline">BƯỚC 03</span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">15 Phút</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-semibold mt-1">Nghe Dictation</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Chép chính tả 1 đoạn hội thoại ngắn Part 3 giọng Anh - Úc với tốc độ 1.0x.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">Đoạn #14</span>
                <span className="material-symbols-outlined text-[16px] text-outline">pending</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between hover:bg-surface-container-high transition-colors">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-xs text-label-xs font-bold text-outline">BƯỚC 04</span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">12 Phút</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-semibold mt-1">Drill Part 5-6</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Giải tốc độ 10 câu ngữ pháp bẫy thì hoàn thành & mệnh đề quan hệ rút gọn.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">10 Câu hỏi</span>
                <span className="material-symbols-outlined text-[16px] text-outline">radio_button_unchecked</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between hover:bg-surface-container-high transition-colors">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-xs text-label-xs font-bold text-outline">BƯỚC 05</span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">8 Phút</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-semibold mt-1">Ghi Error Log</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Phân loại lỗi sai do phát âm nối âm hay thiếu hụt từ vựng chuyên ngành.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">Sổ tay lỗi</span>
                <span className="material-symbols-outlined text-[16px] text-outline">edit_note</span>
              </div>
            </div>
          </div>
        </details>
      </section>

      {/* Accordion Group 2: 12-Week Roadmap */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between px-space-xs">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Lộ Trình 12 Tuần TOEIC & Business English
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Phân rã theo chặng tiến độ thực chiến từ ngữ pháp cốt lõi đến đàm phán nhân sự song ngữ
            </p>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              onClick={() => setAllExpanded(!allExpanded)}
              className="px-space-sm py-1 rounded bg-surface-container-high text-on-surface font-label-xs text-label-xs font-medium hover:bg-surface-container-highest transition-colors cursor-pointer"
              type="button"
            >
              {allExpanded ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}
            </button>
          </div>
        </div>

        {/* Sprint 1: Tuần 1-2 */}
        <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 overflow-hidden transition-all" open={allExpanded}>
          <summary className="flex items-center justify-between p-space-md sm:p-space-lg cursor-pointer list-none select-none hover:bg-surface-container-low/60 transition-colors">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md font-bold shrink-0">
                01-02
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                    Tuần 1 - 2: Nền tảng Ngữ pháp bẫy & Từ vựng Tuyển dụng
                  </span>
                  <span className="px-2 py-0.5 rounded-full font-label-xs text-label-xs bg-surface-container text-tertiary font-medium">
                    Hoàn thành 100%
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Củng cố Part 1 & Part 2, cấu trúc câu điều kiện, thuật ngữ Job Description & Candidate Sourcing.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-md shrink-0">
              <span className="font-label-xs text-label-xs text-outline hidden md:inline">
                Đã hoàn thành 14/14 bài tập
              </span>
              <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                expand_more
              </span>
            </div>
          </summary>
          <div className="p-space-lg pt-0 flex flex-col gap-space-sm bg-surface-container-lowest">
            <div className="p-space-md rounded-lg bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                <span className="font-body-md text-body-md text-on-surface">
                  Chuyên đề 01: 50 Bẫy ngữ pháp Part 5 TOEIC hay gặp nhất
                </span>
              </div>
              <span className="font-label-xs text-label-xs text-on-surface-variant">Điểm kiểm tra: 9.5/10</span>
            </div>
            <div className="p-space-md rounded-lg bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                <span className="font-body-md text-body-md text-on-surface">
                  Thực hành HR: Soạn thảo thông báo tuyển dụng (JD) chuẩn mực bằng Tiếng Anh
                </span>
              </div>
              <span className="font-label-xs text-label-xs text-on-surface-variant">Đã nghiệm thu bài tập</span>
            </div>
          </div>
        </details>

        {/* Sprint 2: Tuần 3 [ACTIVE] */}
        <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-primary/30 overflow-hidden transition-all" open>
          <summary className="flex items-center justify-between p-space-md sm:p-space-lg cursor-pointer list-none select-none hover:bg-surface-container-low/60 transition-colors">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-label-md font-bold shrink-0">
                03
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                    Tuần 3: Bẫy Đề Part 3 & Soạn Thảo Offer Letter / HR Email
                  </span>
                  <span className="px-2 py-0.5 rounded-full font-label-xs text-label-xs bg-primary-container/15 text-primary font-bold">
                    ĐANG HỌC (Tuần hiện tại)
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Trọng tâm: Nhận diện giọng nói đa quốc gia Part 3; kỹ thuật viết thư mời nhận việc chuyên nghiệp.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-md shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-label-xs text-label-xs text-primary font-bold">4/7 Nhiệm vụ</span>
                <div className="w-16 bg-surface-container-high h-1.5 rounded-full overflow-hidden hidden sm:block">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: '57%' }}></div>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                expand_more
              </span>
            </div>
          </summary>

          <div className="p-space-lg pt-0 flex flex-col gap-space-md bg-surface-container-lowest">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
              {/* Col 1: TOEIC Intensive Part 3 */}
              <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm">
                <div className="flex items-center justify-between pb-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">headphones</span>
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">
                      Luyện đề TOEIC Part 3 - Kỹ năng bẫy
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded font-label-xs text-label-xs bg-surface-container-highest text-on-surface-variant">
                    3 Tiết học
                  </span>
                </div>

                <label className="flex items-start gap-space-sm p-space-sm rounded bg-surface-container-lowest hover:bg-surface-container-high/60 cursor-pointer transition-colors">
                  <input defaultChecked className="mt-1 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md text-on-surface line-through text-outline">
                      Bài tập 3.1: Nhận diện bẫy âm nối & phủ định ngầm (Australian accent)
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">Thời lượng: 40 phút • Hoàn tất 08/04</span>
                  </div>
                </label>

                <label className="flex items-start gap-space-sm p-space-sm rounded bg-surface-container-lowest hover:bg-surface-container-high/60 cursor-pointer transition-colors">
                  <input defaultChecked className="mt-1 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md text-on-surface line-through text-outline">
                      Bài tập 3.2: Kỹ năng đọc trước câu hỏi 8 giây & phán đoán ngữ cảnh hội thoại
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">Thời lượng: 30 phút • Hoàn tất 09/04</span>
                  </div>
                </label>

                <label className="flex items-start gap-space-sm p-space-sm rounded bg-surface-container-lowest hover:bg-surface-container-high/60 cursor-pointer transition-colors">
                  <input className="mt-1 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      Bài tập 3.3: Luyện 4 đoạn audio phức hợp Part 3 (Topic: Onboarding & Office Relocation)
                    </span>
                    <span className="font-label-xs text-label-xs text-primary font-semibold">
                      Đến hạn hôm nay • Mục tiêu ≥ 10/12 câu đúng
                    </span>
                  </div>
                </label>
              </div>

              {/* Col 2: Workplace Human Resources English */}
              <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm">
                <div className="flex items-center justify-between pb-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">mail</span>
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">
                      Thực hành Soạn Thảo HR Email & Offer
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded font-label-xs text-label-xs bg-surface-container-highest text-on-surface-variant">
                    Thực hành mẫu
                  </span>
                </div>

                <label className="flex items-start gap-space-sm p-space-sm rounded bg-surface-container-lowest hover:bg-surface-container-high/60 cursor-pointer transition-colors">
                  <input defaultChecked className="mt-1 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md text-on-surface line-through text-outline">
                      Mẫu 1: Formal Offer Letter template kèm phụ lục đãi ngộ và thời gian thử việc
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">Đã nộp bài chấm • Phản hồi: Tốt</span>
                  </div>
                </label>

                <label className="flex items-start gap-space-sm p-space-sm rounded bg-surface-container-lowest hover:bg-surface-container-high/60 cursor-pointer transition-colors">
                  <input className="mt-1 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      Mẫu 2: Rejection Email lịch thiệp giữ mối quan hệ nhân tài (Talent Pool Keep-in-touch)
                    </span>
                    <span className="font-label-xs text-label-xs text-secondary font-semibold">
                      Chưa nộp • Hạn chót: Thứ Sáu
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-space-sm p-space-sm rounded bg-surface-container-lowest hover:bg-surface-container-high/60 cursor-pointer transition-colors">
                  <input className="mt-1 rounded text-primary focus:ring-0 accent-primary" type="checkbox" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      Mẫu 3: Xử lý email khi ứng viên thương lượng lại mức lương (Salary Counter-offer)
                    </span>
                    <span className="font-label-xs text-label-xs text-outline">Bài tập cuối tuần</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Weekly Focus Collocation Chip Cloud */}
            <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-tertiary text-[18px]">bookmark</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Collocations trọng tâm Tuần 3:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['probationary period', 'compensation package', 'non-disclosure clause', 'prospective candidate'].map(c => (
                  <span key={c} className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-xs text-label-xs border border-surface-container-highest/60">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </details>

        {/* Sprint 3: Tuần 4 - 8 */}
        <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 overflow-hidden transition-all">
          <summary className="flex items-center justify-between p-space-md sm:p-space-lg cursor-pointer list-none select-none hover:bg-surface-container-low/60 transition-colors">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md font-bold shrink-0">
                04-08
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                    Tuần 4 - 8: Skimming Part 7 & Đọc Hiểu Hợp Đồng Lao Động Song Ngữ
                  </span>
                  <span className="px-2 py-0.5 rounded-full font-label-xs text-label-xs bg-surface-container text-on-surface-variant font-medium">
                    Sắp diễn ra
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Kỹ thuật quét dữ liệu nhanh bài đọc kép/ba; dịch thuật các điều khoản kỷ luật, sa thải, bảo hiểm.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-md shrink-0">
              <span className="font-label-xs text-label-xs text-outline hidden md:inline">5 Tuần chuyên sâu • 20 Modules</span>
              <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                expand_more
              </span>
            </div>
          </summary>
          <div className="p-space-lg pt-0 flex flex-col gap-space-sm bg-surface-container-lowest">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
              <div className="p-space-sm rounded bg-surface-container-low">
                • Tuần 4: Phương pháp Skimming & Scanning văn bản thông báo nội bộ (Internal Memo).
              </div>
              <div className="p-space-sm rounded bg-surface-container-low">
                • Tuần 5: Đọc hiểu Hợp đồng Lao động xác định thời hạn (Fixed-term Labor Contract).
              </div>
              <div className="p-space-sm rounded bg-surface-container-low">
                • Tuần 6: Xử lý email phàn nàn và tranh chấp chế độ phúc lợi nhân viên.
              </div>
              <div className="p-space-sm rounded bg-surface-container-low">
                • Tuần 7 - 8: Kỹ thuật xử lý đoạn văn Triple Passages (Part 7) trong 55 giây/câu.
              </div>
            </div>
          </div>
        </details>

        {/* Sprint 4: Tuần 9 - 12 */}
        <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 overflow-hidden transition-all">
          <summary className="flex items-center justify-between p-space-md sm:p-space-lg cursor-pointer list-none select-none hover:bg-surface-container-low/60 transition-colors">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md font-bold shrink-0">
                09-12
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                    Tuần 9 - 12: Luyện Full Test 200 Câu & Mô Phỏng Phỏng Vấn HCNS
                  </span>
                  <span className="px-2 py-0.5 rounded-full font-label-xs text-label-xs bg-surface-container text-on-surface-variant font-medium">
                    Chặng về đích
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Giải đề ETS canh giờ chuẩn 120 phút; luyện 10 tình huống ứng biến HR Interview bằng Tiếng Anh.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-md shrink-0">
              <span className="font-label-xs text-label-xs text-outline hidden md:inline">Mục tiêu: Đạt mốc ≥ 750 điểm</span>
              <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                expand_more
              </span>
            </div>
          </summary>
          <div className="p-space-lg pt-0 bg-surface-container-lowest">
            <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-2">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">Chương trình Sprint Mock Test:</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Hoàn thiện 8 đề thi full test chính khóa ETS 2023-2024 kết hợp buổi phỏng vấn giả định 1-1 với chuyên gia nhân sự về lương thưởng (C&B) và tuyển dụng.
              </p>
            </div>
          </div>
        </details>
      </section>

      {/* Section 3: Dual Workspace - Dictation Studio & Error Log Tracker */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        {/* Dictation Studio Accordion (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 overflow-hidden h-full" open>
            <summary className="flex items-center justify-between p-space-lg cursor-pointer list-none select-none hover:bg-surface-container-low/60 transition-colors">
              <div className="flex items-center gap-space-md">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Phòng Luyện Dictation Part 3
                  </h2>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Chép chính tả âm chuẩn • Bài tập #14
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                expand_more
              </span>
            </summary>

            <div className="p-space-lg pt-0 flex flex-col gap-space-md">
              {/* Compact Audio Player Widget */}
              <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm border border-surface-container-highest/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <button
                      type="button"
                      onClick={handlePlayAudio}
                      className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {isPlayingAudio ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-medium">
                        ETS_Part3_Conversation_Track14.mp3
                      </span>
                      <span className="font-label-xs text-label-xs text-outline">
                        Giọng Nữ Anh (UK) - Nam Mỹ (US)
                      </span>
                    </div>
                  </div>

                  {/* Speed and looping buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPlaybackSpeed(1.0)}
                      className={`px-2 py-0.5 rounded text-[11px] font-label-xs cursor-pointer transition-colors ${
                        playbackSpeed === 1.0 ? 'bg-surface-container-high text-on-surface font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      1.0x
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlaybackSpeed(0.8)}
                      className={`px-2 py-0.5 rounded text-[11px] font-label-xs cursor-pointer transition-colors ${
                        playbackSpeed === 0.8 ? 'bg-surface-container-high text-on-surface font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      0.8x
                    </button>
                    <button
                      type="button"
                      onClick={handleReplay5}
                      className="p-1 rounded text-on-surface-variant hover:bg-surface-container-high cursor-pointer"
                      title="Lặp lại 5 giây"
                    >
                      <span className="material-symbols-outlined text-[16px]">replay_5</span>
                    </button>
                  </div>
                </div>

                {/* Waveform Progress Simulator */}
                <div className="w-full flex items-center gap-2">
                  <span className="font-label-xs text-label-xs text-outline">00:18</span>
                  <div 
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percent = Math.round((clickX / rect.width) * 100);
                      setProgressPercent(percent);
                    }}
                    className="flex-1 bg-surface-container-highest h-2 rounded-full overflow-hidden cursor-pointer"
                  >
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-200" 
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <span className="font-label-xs text-label-xs text-outline">00:42</span>
                </div>
              </div>

              {/* Dictation Fill-in Exercise */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-xs text-label-xs font-bold text-outline uppercase tracking-wider">
                  Điền từ còn thiếu vào văn bản chép chính tả:
                </label>
                <div className="p-space-md rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface leading-loose border border-surface-container-highest/60">
                  “Hello Ms. Jenkins, I am calling from the Human Resources Department regarding your
                  <input
                    type="text"
                    value={blank1}
                    onChange={(e) => setBlank1(e.target.value)}
                    placeholder="[chỗ trống 1]"
                    className={`inline-block w-36 px-2 py-0.5 mx-1 rounded bg-surface-container-lowest text-on-surface text-center font-semibold focus:outline-none focus:ring-1 focus:ring-primary shadow-xs border ${
                      dictationFeedback?.tested ? (dictationFeedback.b1Ok ? 'border-tertiary text-tertiary' : 'border-error text-error') : 'border-surface-container-highest'
                    }`}
                  />
                  for the Senior Compensation Analyst role. We were very impressed with your background in payroll management. We would like to invite you for an in-person
                  <input
                    type="text"
                    value={blank2}
                    onChange={(e) => setBlank2(e.target.value)}
                    placeholder="[chỗ trống 2]"
                    className={`inline-block w-32 px-2 py-0.5 mx-1 rounded bg-surface-container-lowest text-on-surface text-center font-semibold focus:outline-none focus:ring-1 focus:ring-primary shadow-xs border ${
                      dictationFeedback?.tested ? (dictationFeedback.b2Ok ? 'border-tertiary text-tertiary' : 'border-error text-error') : 'border-surface-container-highest'
                    }`}
                  />
                  this Thursday at 10 AM. Could you confirm if that time
                  <input
                    type="text"
                    value={blank3}
                    onChange={(e) => setBlank3(e.target.value)}
                    placeholder="[chỗ trống 3]"
                    className={`inline-block w-36 px-2 py-0.5 mx-1 rounded bg-surface-container-lowest text-on-surface text-center font-semibold focus:outline-none focus:ring-1 focus:ring-primary shadow-xs border ${
                      dictationFeedback?.tested ? (dictationFeedback.b3Ok ? 'border-tertiary text-tertiary' : 'border-error text-error') : 'border-surface-container-highest'
                    }`}
                  />
                  your schedule?”
                </div>
              </div>

              {/* Transcript reveal */}
              {showTranscript && (
                <div className="p-space-md rounded-lg bg-primary-fixed/20 border border-primary-fixed text-primary font-body-sm text-body-sm animate-in fade-in duration-150">
                  <div className="font-bold mb-1">Transcript đầy đủ:</div>
                  “Hello Ms. Jenkins, I am calling from the Human Resources Department regarding your <strong>application</strong> for the Senior Compensation Analyst role. We were very impressed with your background in payroll management. We would like to invite you for an in-person <strong>interview</strong> this Thursday at 10 AM. Could you confirm if that time <strong>fits</strong> your schedule?”
                </div>
              )}

              {/* Action buttons for dictation */}
              <div className="flex items-center justify-between pt-space-xs">
                <button
                  type="button"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-primary font-label-md text-label-md font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showTranscript ? 'visibility_off' : 'visibility'}
                  </span>
                  <span>{showTranscript ? 'Ẩn phụ đề' : 'Xem phụ đề đầy đủ (Transcript)'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCheckDictation}
                  className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:opacity-95 transition-opacity shadow-xs cursor-pointer"
                >
                  Kiểm tra đáp án
                </button>
              </div>
            </div>
          </details>
        </div>

        {/* Error Log & Review Studio Accordion (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <details className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 overflow-hidden h-full" open>
            <summary className="flex items-center justify-between p-space-lg cursor-pointer list-none select-none hover:bg-surface-container-low/60 transition-colors">
              <div className="flex items-center gap-space-md">
                <div className="w-9 h-9 rounded-lg bg-error-container/40 text-on-error-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">assignment_late</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Sổ Lỗi Sai Cần Tránh
                  </h2>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {mistakes.length} Lỗi thường mắc tuần này
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                expand_more
              </span>
            </summary>

            <div className="p-space-lg pt-0 flex flex-col gap-space-sm">
              {mistakes.map((mis) => (
                <details key={mis.id} className="group/error rounded-lg bg-surface-container-low overflow-hidden border border-surface-container-highest/50">
                  <summary className="p-space-sm px-space-md flex items-center justify-between cursor-pointer list-none hover:bg-surface-container-high transition-colors">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${mis.categoryColor === 'primary' ? 'bg-primary' : mis.categoryColor === 'secondary' ? 'bg-secondary' : 'bg-error'}`}></span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                        {mis.content}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[16px] text-outline group-open/error:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <div className="p-space-md pt-space-xs font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low/60 border-t border-surface-container-highest/40">
                    {mis.detailedExplanation || mis.content}
                  </div>
                </details>
              ))}

              {/* Add error form */}
              {isAddingError ? (
                <form onSubmit={handleAddMistakeSubmit} className="p-space-md rounded-lg bg-surface-container-low border border-surface-container-highest space-y-2 mt-2">
                  <input
                    type="text"
                    required
                    value={newErrorTitle}
                    onChange={(e) => setNewErrorTitle(e.target.value)}
                    placeholder="VD: Nhầm lẫn giữa 'liable' và 'responsible' trong điều khoản hợp đồng"
                    className="w-full h-9 px-2.5 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:border-primary focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={newErrorExplanation}
                    onChange={(e) => setNewErrorExplanation(e.target.value)}
                    placeholder="Giải thích ngắn gọn để ghi nhớ lâu dài..."
                    className="w-full p-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:border-primary focus:outline-none resize-none"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingError(false)}
                      className="px-3 py-1 rounded text-on-surface-variant text-label-xs hover:bg-surface-container-high"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded bg-primary text-on-primary text-label-xs font-semibold"
                    >
                      Lưu lỗi sai
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingError(true)}
                  className="mt-space-xs py-2 w-full rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Ghi thêm lỗi sai mới</span>
                </button>
              )}
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};
