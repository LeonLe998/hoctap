import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

interface Flashcard {
  id: number;
  hanzi: string;
  pinyin: string;
  meaning: string;
  exampleZh: string;
  exampleVi: string;
}

const hskCards: Flashcard[] = [
  {
    id: 1,
    hanzi: '招聘',
    pinyin: 'zhāopìn',
    meaning: 'Tuyển dụng, chiêu mộ nhân sự',
    exampleZh: '我们公司正在招聘高级薪酬专员。',
    exampleVi: 'Công ty chúng tôi đang tuyển dụng chuyên viên C&B cấp cao.'
  },
  {
    id: 2,
    hanzi: '面试',
    pinyin: 'miànshì',
    meaning: 'Phỏng vấn',
    exampleZh: '请问您明天下午能来参加面试吗？',
    exampleVi: 'Xin hỏi chiều mai bạn có thể đến tham gia phỏng vấn không?'
  },
  {
    id: 3,
    hanzi: '录取',
    pinyin: 'lùqǔ',
    meaning: 'Trúng tuyển, tuyển chọn',
    exampleZh: '恭喜您被我们人事部录取了！',
    exampleVi: 'Chúc mừng bạn đã được phòng nhân sự của chúng tôi tuyển dụng!'
  },
  {
    id: 4,
    hanzi: '薪资',
    pinyin: 'xīnzī',
    meaning: 'Lương bổng, đãi ngộ',
    exampleZh: '您的期望薪资是多少？',
    exampleVi: 'Mức lương kỳ vọng của bạn là bao nhiêu?'
  },
  {
    id: 5,
    hanzi: '合同',
    pinyin: 'hétong',
    meaning: 'Hợp đồng lao động',
    exampleZh: '劳动合同的试用期为两个月。',
    exampleVi: 'Thời gian thử việc trong hợp đồng lao động là 2 tháng.'
  },
  {
    id: 6,
    hanzi: '社保',
    pinyin: 'shèbǎo',
    meaning: 'Bảo hiểm xã hội',
    exampleZh: '公司按照越南法律规定缴纳全部社保。',
    exampleVi: 'Công ty đóng đầy đủ BHXH theo quy định pháp luật Việt Nam.'
  }
];

export const ChineseRoadmapView: React.FC = () => {
  const { showToast } = useApp();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(false);

  const card = hskCards[currentCardIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % hskCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + hskCards.length) % hskCards.length);
  };

  const speakChinese = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    } else {
      showToast('Đang phát âm Hán tự: ' + text);
    }
  };

  const toggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordedAudio(true);
      showToast('Đã ghi âm thành công đoạn Shadowing phát âm 10 câu phỏng vấn!');
    } else {
      setIsRecording(true);
      setRecordedAudio(false);
      showToast('Đang ghi âm giọng đọc... Hãy nhại lại theo mẫu câu.');
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md p-space-lg bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40">
        <div className="space-y-1">
          <div className="flex items-center gap-space-sm">
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
              Tiếng Trung Chuyên Ngành HCNS FDI
            </span>
            <span className="text-outline font-label-xs text-label-xs">
              Mục tiêu: Đạt chuẩn HSK 3 - 4 (Tuần 4 & Tuần 11)
            </span>
          </div>
          <h1 className="font-display-md text-display-md text-on-surface tracking-tight font-bold">
            Lộ Trình Tiếng Trung HSK & Công Sở
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Tập trung từ vựng tuyển dụng, soạn thảo hợp đồng song ngữ và phản xạ giao tiếp với Giám đốc/Chuyên gia người nước ngoài.
          </p>
        </div>

        <div className="flex items-center gap-space-md bg-surface-container-low p-space-md rounded-lg shrink-0">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">Từ vựng đã thuộc</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-lg text-headline-lg text-secondary font-bold">280</span>
              <span className="font-label-xs text-label-xs text-on-surface-variant">/ 1200 từ</span>
            </div>
          </div>
          <div className="h-8 w-px bg-surface-container-highest"></div>
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider">HSK Mock Test</span>
            <span className="font-headline-lg text-headline-lg text-tertiary font-bold mt-0.5">245/300</span>
          </div>
        </div>
      </section>

      {/* Grid: Flashcard & Shadowing Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Flashcard Anki Studio (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container-highest/40 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">style</span>
                <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                  Thẻ Từ Vựng Anki SRS (Bộ từ nhân sự HSK 3-4)
                </span>
              </div>
              <span className="font-label-xs text-label-xs text-outline">
                Thẻ {currentCardIndex + 1} / {hskCards.length}
              </span>
            </div>

            {/* Flashcard container */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[260px] p-space-xl rounded-xl bg-surface-container-low border border-surface-container-highest hover:border-secondary transition-all cursor-pointer flex flex-col items-center justify-center text-center relative select-none shadow-xs"
            >
              <span className="absolute top-3 right-3 text-outline text-[11px] font-label-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">flip</span> Bấm để lật
              </span>

              {!isFlipped ? (
                /* Front Side */
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[64px] font-bold text-on-surface tracking-wider leading-none">
                    {card.hanzi}
                  </span>
                  <span className="text-secondary font-mono text-[20px] font-semibold">
                    {card.pinyin}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakChinese(card.hanzi);
                    }}
                    className="mt-2 w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:opacity-90 shadow-xs cursor-pointer"
                    title="Phát âm"
                  >
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                  </button>
                  <span className="text-[12px] text-outline mt-2 font-body-sm">
                    Quy tắc bút thuận: Viết từ trên xuống dưới, trái qua phải
                  </span>
                </div>
              ) : (
                /* Back Side */
                <div className="flex flex-col items-center gap-3">
                  <span className="font-title-sm text-title-sm text-secondary font-bold">
                    {card.meaning}
                  </span>
                  <div className="p-space-md rounded-lg bg-surface-container-lowest border border-surface-container-highest/60 text-left w-full space-y-1">
                    <div className="font-semibold text-on-surface text-[15px] flex items-center justify-between">
                      <span>{card.exampleZh}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakChinese(card.exampleZh);
                        }}
                        className="text-secondary hover:underline cursor-pointer"
                        title="Nghe câu"
                      >
                        <span className="material-symbols-outlined text-[18px]">volume_up</span>
                      </button>
                    </div>
                    <div className="text-on-surface-variant text-[13px]">{card.exampleVi}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-between pt-space-xs">
              <button
                type="button"
                onClick={handlePrev}
                className="px-space-md py-1.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Thẻ trước</span>
              </button>
              <button
                type="button"
                onClick={() => speakChinese(card.hanzi)}
                className="h-9 px-space-md rounded-lg bg-secondary/10 text-secondary font-label-md text-label-md font-semibold hover:bg-secondary/20 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">volume_up</span>
                <span>Nghe lại phát âm</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-space-md py-1.5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:opacity-95 transition-opacity flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span>Thẻ kế tiếp</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Shadowing & Workplace Dialogue (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          {/* Shadowing Studio */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container-highest/40 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">mic</span>
                <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                  Phòng Luyện Shadowing & Ghi Âm
                </span>
              </div>
              <span className="font-label-xs text-label-xs text-outline">Bài tập nộp tuần 3</span>
            </div>

            <div className="p-space-md rounded-lg bg-surface-container-low space-y-2 border border-surface-container-highest/50">
              <div className="font-label-xs text-label-xs text-secondary font-bold uppercase tracking-wider">
                Mẫu câu phỏng vấn thực tế:
              </div>
              <p className="font-body-md text-body-md text-on-surface font-medium leading-relaxed">
                “请问您在上一家公司主要负责哪些招聘渠道？”
              </p>
              <p className="font-body-sm text-body-sm text-outline italic">
                (Xin hỏi ở công ty trước bạn chủ yếu phụ trách các kênh tuyển dụng nào?)
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => speakChinese('请问您在上一家公司主要负责哪些招聘渠道？')}
                  className="flex-1 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  <span>Nghe câu mẫu</span>
                </button>
                <button
                  type="button"
                  onClick={toggleRecord}
                  className={`flex-1 h-9 rounded-lg font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                    isRecording
                      ? 'bg-error text-on-error animate-pulse'
                      : 'bg-secondary text-on-secondary hover:opacity-95'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isRecording ? 'stop_circle' : 'mic'}
                  </span>
                  <span>{isRecording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}</span>
                </button>
              </div>

              {recordedAudio && (
                <div className="p-2.5 rounded-lg bg-surface-container-low border border-tertiary/30 text-tertiary font-label-xs text-label-xs flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Bản ghi âm 00:45 đã sẵn sàng nộp lên kho tài liệu!</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => showToast('Đã nộp bài ghi âm lên Portfolio Vault thành công!')}
                    className="font-bold underline hover:opacity-80 cursor-pointer"
                  >
                    Nộp ngay
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Grammar Quick Focus */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container-highest/40 space-y-space-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                Ngữ pháp Trọng tâm Tuần 3: 又 vs 再
              </span>
            </div>
            <div className="space-y-2 text-body-sm font-body-sm text-on-surface-variant">
              <div className="p-space-sm rounded-lg bg-surface-container-low">
                <strong className="text-on-surface">又 (yòu):</strong> Lặp lại hành động ĐÃ xảy ra trong quá khứ hoặc hiện tại.<br />
                <em>Ví dụ: 他又迟到了 (Anh ấy lại đi muộn rồi).</em>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low">
                <strong className="text-on-surface">再 (zài):</strong> Lặp lại hành động SẼ xảy ra trong tương lai.<br />
                <em>Ví dụ: 欢迎您下次再来 (Hoan nghênh bạn lần sau lại tới).</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
