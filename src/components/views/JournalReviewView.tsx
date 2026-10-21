import React from 'react';
import { useApp } from '../../context/AppContext';

export const JournalReviewView: React.FC = () => {
  const { reflections, setIsReflectionOpen, showToast } = useApp();

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md p-space-lg bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40">
        <div className="space-y-1">
          <div className="flex items-center gap-space-sm">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-xs text-label-xs font-semibold">
              Kỷ luật & Tự nhận thức
            </span>
            <span className="text-outline font-label-xs text-label-xs">
              Tuần 3 / 12 • Kế hoạch 84 ngày
            </span>
          </div>
          <h1 className="font-display-md text-display-md text-on-surface tracking-tight font-bold">
            Nhật Ký & Tổng Kết Tuần (Daily Audit & Review)
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Sổ tay điện tử ghi nhận nhịp sinh học, điểm số thực thi và giải pháp khắc phục điểm nghẽn mỗi tối.
          </p>
        </div>

        <div className="flex items-center gap-space-sm shrink-0">
          <button
            type="button"
            onClick={() => setIsReflectionOpen(true)}
            className="h-10 px-space-lg rounded-xl bg-primary text-on-primary hover:opacity-95 font-label-md text-label-md font-semibold flex items-center gap-1.5 shadow-xs transition-opacity cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">edit_square</span>
            <span>Viết phản tư hôm nay</span>
          </button>
        </div>
      </section>

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold">
              Số ngày ghi nhật ký
            </span>
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-0.5">
              6 / 6 ngày
            </span>
            <span className="font-label-xs text-label-xs text-tertiary mt-0.5 font-medium">
              100% tỷ lệ tuần này
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[20px]">verified</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold">
              Điểm kỷ luật trung bình
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">4.8</span>
              <span className="font-label-xs text-label-xs text-outline">/ 5.0</span>
            </div>
            <span className="font-label-xs text-label-xs text-primary mt-0.5 font-medium">
              Đạt chuẩn xuất sắc
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">grade</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold">
              Năng lượng trung bình
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-lg text-headline-lg text-secondary font-bold tracking-tight">4.2</span>
              <span className="font-label-xs text-label-xs text-outline">/ 5.0</span>
            </div>
            <span className="font-label-xs text-label-xs text-outline mt-0.5">
              Ổn định, không bị kiệt sức
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </div>
        </div>
      </div>

      {/* Main Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Past Entries List (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
              Dòng Thời Gian Phản Tư 12 Tuần
            </h2>
            <span className="font-label-xs text-label-xs text-outline">
              {reflections.length} bản ghi
            </span>
          </div>

          <div className="space-y-space-md">
            {reflections.map((ref) => (
              <div
                key={ref.id}
                className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 space-y-space-sm"
              >
                <div className="flex items-center justify-between border-b border-surface-container-highest/50 pb-2">
                  <div className="flex items-center gap-space-sm">
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      {ref.date}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-xs text-label-xs">
                      Tuần {ref.week}
                    </span>
                  </div>
                  <div className="flex items-center gap-space-md">
                    <span className="font-label-xs text-label-xs text-primary font-semibold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[15px]">grade</span>
                      {ref.disciplineScore}/5 Kỷ luật
                    </span>
                    <span className="font-label-xs text-label-xs text-secondary font-semibold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[15px]">bolt</span>
                      {ref.energyScore}/5 Năng lượng
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 font-body-sm text-body-sm">
                  <div>
                    <span className="font-semibold text-tertiary">🏆 Thắng lợi lớn: </span>
                    <span className="text-on-surface">{ref.biggestWin}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-error">⚠️ Điểm nghẽn: </span>
                    <span className="text-on-surface-variant">{ref.bottleneck}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">💡 Điều chỉnh ngày mai: </span>
                    <span className="text-on-surface">{ref.adjustmentTomorrow}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sunday Audit Checklist & Protocols (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          {/* Sunday Audit */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 space-y-space-md">
            <div className="flex items-center gap-2 text-primary font-title-sm font-semibold">
              <span className="material-symbols-outlined text-[20px]">checklist</span>
              <span>Nghi thức Audit Chủ Nhật</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Khép lại tuần cũ sạch sẽ và nạp năng lượng cho chặng bứt tốc tiếp theo:
            </p>

            <div className="space-y-2">
              {[
                { title: 'Kiểm tra điểm số bài tập tuần 3', done: true },
                { title: 'Đối soát file Excel lương FDI & biên bản kỷ luật', done: true },
                { title: 'Luyện 1 đề thi thử HSK 3 Full Test', done: true },
                { title: 'Thiết lập 3 mục tiêu sống còn cho Tuần 4', done: false }
              ].map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors"
                >
                  <input
                    type="checkbox"
                    defaultChecked={item.done}
                    className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                  />
                  <span className={`font-body-sm text-body-sm text-on-surface ${item.done ? 'line-through text-outline' : 'font-medium'}`}>
                    {item.title}
                  </span>
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={() => showToast('Đã hoàn tất Audit tuần 3! Sẵn sàng bước vào Tuần 4.')}
              className="w-full py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:opacity-95 transition-opacity cursor-pointer shadow-xs"
            >
              Nghiệm thu toàn bộ Tuần 3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
