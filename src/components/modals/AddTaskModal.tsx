import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AddTaskModal: React.FC = () => {
  const { isAddTaskOpen, setIsAddTaskOpen, addTask } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slot, setSlot] = useState<'morning' | 'evening' | 'night'>('morning');
  const [category, setCategory] = useState<'hcns' | 'chinese' | 'english' | 'general'>('hcns');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [tag, setTag] = useState('');
  const [isTopPriority, setIsTopPriority] = useState(false);

  if (!isAddTaskOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let categoryLabel = 'Nghiệp vụ HCNS';
    if (category === 'chinese') categoryLabel = 'Tiếng Trung HSK';
    if (category === 'english') categoryLabel = 'Tiếng Anh TOEIC';
    if (category === 'general') categoryLabel = 'Kế hoạch & Đánh giá';

    addTask({
      title: title.trim(),
      description: description.trim() || 'Nhiệm vụ trọng tâm trong ca học.',
      slot,
      category,
      categoryLabel,
      durationMinutes: Number(durationMinutes) || 30,
      tag: tag.trim() || `${durationMinutes}p`,
      isTopPriority,
      topRank: isTopPriority ? 1 : undefined
    });

    setTitle('');
    setDescription('');
    setTag('');
    setIsTopPriority(false);
    setIsAddTaskOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div 
        className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-surface-container-highest/60 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between border-b border-surface-container-highest/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">add_task</span>
            <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">
              Thêm Nhiệm Vụ Mới
            </h3>
          </div>
          <button
            onClick={() => setIsAddTaskOpen(false)}
            className="text-outline hover:text-on-surface p-1 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-space-lg space-y-space-md">
          {/* Title */}
          <div>
            <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
              Tiêu đề nhiệm vụ *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Lập công thức Excel tính tiền làm thêm giờ (OT)"
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-highest focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
              Chi tiết / Yêu cầu bài tập
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ghi chú mục tiêu cụ thể, điều luật tham chiếu hoặc nguồn tài liệu..."
              className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Slot & Category Grid */}
          <div className="grid grid-cols-2 gap-space-md">
            <div>
              <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
                Khung giờ học
              </label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value as 'morning' | 'evening' | 'night')}
                className="w-full h-10 px-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:border-primary focus:outline-none"
              >
                <option value="morning">Sáng (06:30 - 07:30)</option>
                <option value="evening">Tối (19:30 - 20:30)</option>
                <option value="night">Đêm (21:15 - 22:45)</option>
              </select>
            </div>

            <div>
              <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
                Chuyên môn / Trụ cột
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'hcns' | 'chinese' | 'english' | 'general')}
                className="w-full h-10 px-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:border-primary focus:outline-none"
              >
                <option value="hcns">Nghiệp vụ HCNS FDI</option>
                <option value="chinese">Tiếng Trung HSK & Công sở</option>
                <option value="english">Tiếng Anh TOEIC & Phỏng vấn</option>
                <option value="general">Kế hoạch & Đo lường</option>
              </select>
            </div>
          </div>

          {/* Duration & Tag */}
          <div className="grid grid-cols-2 gap-space-md">
            <div>
              <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
                Thời lượng (phút)
              </label>
              <input
                type="number"
                min="5"
                max="180"
                step="5"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
                Nhãn phương pháp (Tùy chọn)
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="VD: Excel (30p), Anki SRS"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Priority Checkbox */}
          <label className="flex items-center gap-2.5 p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={isTopPriority}
              onChange={(e) => setIsTopPriority(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary"
            />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Đưa vào Khóa Nhận Thức (Top 3 việc sống còn)
              </span>
              <span className="font-label-xs text-label-xs text-on-surface-variant">
                Bảo vệ năng lượng và tập trung xử lý dứt điểm trước
              </span>
            </div>
          </label>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-surface-container-highest/40">
            <button
              type="button"
              onClick={() => setIsAddTaskOpen(false)}
              className="px-space-md py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low font-label-md text-label-md transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-space-lg py-2 rounded-lg bg-primary-container text-on-primary hover:opacity-95 font-label-md text-label-md font-semibold shadow-xs transition-opacity"
            >
              Tạo nhiệm vụ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
