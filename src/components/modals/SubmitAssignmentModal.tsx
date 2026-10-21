import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SubmitAssignmentModal: React.FC = () => {
  const { 
    isSubmitAssignmentOpen, 
    setIsSubmitAssignmentOpen, 
    assignmentTarget, 
    showToast 
  } = useApp();

  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<string>('CaseStudy_SaThai_Dieu122_NguyenVanA_Draft_v2.docx');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isSubmitAssignmentOpen || !assignmentTarget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitAssignmentOpen(false);
      showToast(`Đã nộp thành công "${assignmentTarget.title}"! Mentor Hoàng Tuấn sẽ chấm bài trong vòng 24h.`);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-surface-container-highest animate-in fade-in zoom-in-95 duration-150">
        <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between border-b border-surface-container-highest/60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">upload_file</span>
            <h3 className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
              Nộp Bài Tập: {assignmentTarget.title}
            </h3>
          </div>
          <button
            onClick={() => setIsSubmitAssignmentOpen(false)}
            className="text-outline hover:text-on-surface p-1 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-space-lg space-y-space-md">
          <div className="p-space-sm rounded-lg bg-primary-fixed/20 border border-primary-fixed text-primary font-body-sm text-body-sm flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">info</span>
            <div>
              <span className="font-semibold">Tiêu chí nghiệm thu của Mentor: </span>
              Bám sát quy định Điều 122 BLLĐ 2019, tính đúng số ngày báo trước, lập hồ sơ chứng cứ vi phạm và phương án hòa giải.
            </div>
          </div>

          <div>
            <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
              Tệp đính kèm bài nộp (.docx, .xlsx, .pdf)
            </label>
            <div className="p-space-md rounded-lg border-2 border-dashed border-surface-container-highest bg-surface-container-low/50 hover:bg-surface-container-low flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-[32px] text-primary">cloud_upload</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold mt-1">
                {selectedFile}
              </span>
              <span className="font-label-xs text-label-xs text-outline mt-0.5">
                Kích thước: 1.4 MB • Đã sẵn sàng nộp
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0].name);
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
              Lời nhắn hoặc câu hỏi gửi tới Mentor (Tùy chọn)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="VD: Em đã đối chiếu thêm án lệ số 54 như thầy dặn, nhờ thầy xem kỹ phần tính toán bồi thường trợ cấp mất việc..."
              className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-highest focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-surface-container-highest/40">
            <button
              type="button"
              onClick={() => setIsSubmitAssignmentOpen(false)}
              className="px-space-md py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low font-label-md text-label-md transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-space-lg py-2 rounded-lg bg-primary text-on-primary hover:opacity-95 font-label-md text-label-md font-semibold shadow-xs flex items-center gap-1.5 transition-opacity"
            >
              {isSubmitting ? (
                <span>Đang gửi bài...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[17px]">send</span>
                  <span>Gửi bài nộp</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
