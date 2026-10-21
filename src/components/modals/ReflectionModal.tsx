import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ReflectionModal: React.FC = () => {
  const { isReflectionOpen, setIsReflectionOpen, addReflection } = useApp();

  const [disciplineScore, setDisciplineScore] = useState(5);
  const [energyScore, setEnergyScore] = useState(4);
  const [biggestWin, setBiggestWin] = useState('');
  const [bottleneck, setBottleneck] = useState('');
  const [adjustmentTomorrow, setAdjustmentTomorrow] = useState('');

  if (!isReflectionOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biggestWin.trim() && !adjustmentTomorrow.trim()) return;

    addReflection({
      date: new Date().toISOString().split('T')[0],
      week: 3,
      disciplineScore,
      energyScore,
      biggestWin: biggestWin.trim() || 'Duy trì đúng nhịp 3 khung giờ học tập trong ngày.',
      bottleneck: bottleneck.trim() || 'Không có trở ngại lớn.',
      adjustmentTomorrow: adjustmentTomorrow.trim() || 'Tiếp tục bám sát checklist 12 tuần.'
    });

    setBiggestWin('');
    setBottleneck('');
    setAdjustmentTomorrow('');
    setIsReflectionOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div 
        className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-surface-container-highest/60 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between border-b border-surface-container-highest/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-tertiary">edit_note</span>
            <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">
              Nhật Ký Phản Tư Nhanh (Daily Audit 10 Phút)
            </h3>
          </div>
          <button
            onClick={() => setIsReflectionOpen(false)}
            className="text-outline hover:text-on-surface p-1 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-space-lg space-y-space-md">
          {/* Rating Scores */}
          <div className="grid grid-cols-2 gap-space-md bg-surface-container-low p-space-md rounded-lg">
            <div>
              <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
                Kỷ luật thực thi (1 - 5)
              </label>
              <div className="flex items-center gap-1.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setDisciplineScore(star)}
                    className="p-1 text-on-surface hover:scale-110 transition-transform"
                  >
                    <span 
                      className={`material-symbols-outlined text-[22px] ${
                        star <= disciplineScore ? 'text-primary fill-current' : 'text-outline-variant'
                      }`}
                      style={{ fontVariationSettings: star <= disciplineScore ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      grade
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
                Mức năng lượng & Tập trung
              </label>
              <div className="flex items-center gap-1.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEnergyScore(star)}
                    className="p-1 text-on-surface hover:scale-110 transition-transform"
                  >
                    <span 
                      className={`material-symbols-outlined text-[22px] ${
                        star <= energyScore ? 'text-secondary fill-current' : 'text-outline-variant'
                      }`}
                      style={{ fontVariationSettings: star <= energyScore ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      bolt
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Biggest Win */}
          <div>
            <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
              Thắng lợi / Cột mốc nổi bật hôm nay *
            </label>
            <input
              type="text"
              required
              value={biggestWin}
              onChange={(e) => setBiggestWin(e.target.value)}
              placeholder="VD: Viết xong 20 chữ Hán HSK 3 chuẩn bút thuận & thuộc 5 mẫu câu"
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-highest focus:border-tertiary focus:bg-surface-container-lowest focus:outline-none transition-colors"
            />
          </div>

          {/* Bottleneck */}
          <div>
            <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
              Điểm nghẽn / Cám dỗ gây xao nhãng
            </label>
            <input
              type="text"
              value={bottleneck}
              onChange={(e) => setBottleneck(e.target.value)}
              placeholder="VD: Kiểm tra tin nhắn lướt điện thoại 15 phút trong phiên sáng"
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:border-error focus:outline-none transition-colors"
            />
          </div>

          {/* Adjustment */}
          <div>
            <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
              Kế hoạch điều chỉnh & Phòng ngừa ngày mai
            </label>
            <textarea
              rows={2}
              value={adjustmentTomorrow}
              onChange={(e) => setAdjustmentTomorrow(e.target.value)}
              placeholder="VD: Bật chế độ tập trung Pomodoro 25/5 ngay từ 06:30, để điện thoại phòng khác."
              className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:border-tertiary focus:bg-surface-container-lowest focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-surface-container-highest/40">
            <button
              type="button"
              onClick={() => setIsReflectionOpen(false)}
              className="px-space-md py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low font-label-md text-label-md transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-space-lg py-2 rounded-lg bg-tertiary text-on-tertiary hover:opacity-95 font-label-md text-label-md font-semibold shadow-xs transition-opacity"
            >
              Lưu nhật ký phản tư
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
