import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SettingsBackupView: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    studyMode, 
    setStudyMode, 
    tasks, 
    mistakes, 
    reflections, 
    showToast 
  } = useApp();

  const [name, setName] = useState(profile.name);
  const [targetRole, setTargetRole] = useState(profile.targetRole);
  const [toeicTarget, setToeicTarget] = useState(profile.toeicTarget);
  const [hskTarget, setHskTarget] = useState(profile.hskTarget);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || 'Nguyễn Văn A',
      targetRole: targetRole.trim() || 'HCNS Senior tại DN FDI',
      toeicTarget: Number(toeicTarget) || 750,
      hskTarget: hskTarget.trim() || 'HSK 3 - 4'
    });
  };

  const handleExportBackup = () => {
    const backupData = {
      profile,
      studyMode,
      tasks,
      mistakes,
      reflections,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CareerSprint_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Đã xuất tệp sao lưu dữ liệu JSON thành công!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile) {
          localStorage.setItem('careersprint_profile', JSON.stringify(parsed.profile));
        }
        if (parsed.tasks) {
          localStorage.setItem('careersprint_tasks', JSON.stringify(parsed.tasks));
        }
        if (parsed.mistakes) {
          localStorage.setItem('careersprint_mistakes', JSON.stringify(parsed.mistakes));
        }
        if (parsed.reflections) {
          localStorage.setItem('careersprint_reflections', JSON.stringify(parsed.reflections));
        }
        showToast('Khôi phục dữ liệu thành công! Đang tải lại...');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch {
        showToast('Tệp sao lưu không hợp lệ. Vui lòng kiểm tra lại định dạng JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    localStorage.removeItem('careersprint_profile');
    localStorage.removeItem('careersprint_tasks');
    localStorage.removeItem('careersprint_mistakes');
    localStorage.removeItem('careersprint_reflections');
    localStorage.removeItem('careersprint_studymode');
    showToast('Đã đặt lại dữ liệu mẫu ban đầu thành công.');
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg max-w-4xl">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md p-space-lg bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40">
        <div className="space-y-1">
          <div className="flex items-center gap-space-sm">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-xs text-label-xs font-semibold">
              Hệ Thống & Hồ Sơ Cá Nhân
            </span>
            <span className="text-outline font-label-xs text-label-xs">Phiên bản 2.4</span>
          </div>
          <h1 className="font-display-md text-display-md text-on-surface tracking-tight font-bold">
            Cài Đặt & Sao Lưu Dữ Liệu
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Quản trị mục tiêu nghề nghiệp, chế độ học tập và đồng bộ sao lưu an toàn toàn bộ tiến trình 84 ngày.
          </p>
        </div>
      </section>

      {/* Profile Form */}
      <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 space-y-space-md">
        <div className="flex items-center gap-2 border-b border-surface-container-highest/50 pb-space-sm">
          <span className="material-symbols-outlined text-[20px] text-primary">person</span>
          <h2 className="font-title-sm text-title-sm text-on-surface font-semibold">
            Thông Tin Cá Nhân & Mục Tiêu Chuyên Môn
          </h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-space-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
                Họ và Tên Học Viên
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-highest focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
                Vị trí mục tiêu sau 12 tuần
              </label>
              <input
                type="text"
                required
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-highest focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
                Mục tiêu điểm thi TOEIC
              </label>
              <input
                type="number"
                min="400"
                max="990"
                value={toeicTarget}
                onChange={(e) => setToeicTarget(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-highest focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold mb-1">
                Mục tiêu chứng chỉ Tiếng Trung
              </label>
              <input
                type="text"
                value={hskTarget}
                onChange={(e) => setHskTarget(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-surface-container-highest focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-space-xs">
            <button
              type="submit"
              className="px-space-lg py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:opacity-95 shadow-xs cursor-pointer"
            >
              Lưu thay đổi hồ sơ
            </button>
          </div>
        </form>
      </div>

      {/* Study Mode Preference */}
      <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 space-y-space-md">
        <div className="flex items-center gap-2 border-b border-surface-container-highest/50 pb-space-sm">
          <span className="material-symbols-outlined text-[20px] text-secondary">tune</span>
          <h2 className="font-title-sm text-title-sm text-on-surface font-semibold">
            Tùy Chọn Chế Độ Học Tập Mặc Định
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div
            onClick={() => setStudyMode('standard')}
            className={`p-space-md rounded-xl border-2 cursor-pointer transition-all ${
              studyMode === 'standard'
                ? 'border-primary bg-primary/5 shadow-xs'
                : 'border-surface-container-highest bg-surface-container-low hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-label-lg font-bold text-on-surface">
                Tiêu chuẩn (3h/ngày)
              </span>
              {studyMode === 'standard' && (
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
              )}
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Phân bổ 3 ca Sáng (60p) - Tối (60p) - Đêm (90p) cho cả 3 trụ cột kỹ năng HCNS, HSK, TOEIC.
            </p>
          </div>

          <div
            onClick={() => setStudyMode('busy')}
            className={`p-space-md rounded-xl border-2 cursor-pointer transition-all ${
              studyMode === 'busy'
                ? 'border-secondary bg-secondary/5 shadow-xs'
                : 'border-surface-container-highest bg-surface-container-low hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-label-lg font-bold text-on-surface">
                Bận rộn (1h/ngày)
              </span>
              {studyMode === 'busy' && (
                <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
              )}
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Tối ưu Microlearning 3 phiên 20 phút, dời bài tập nặng sang cuối tuần để bảo vệ chuỗi streak 84 ngày.
            </p>
          </div>
        </div>
      </div>

      {/* Backup and Restore */}
      <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-highest/40 space-y-space-md">
        <div className="flex items-center gap-2 border-b border-surface-container-highest/50 pb-space-sm">
          <span className="material-symbols-outlined text-[20px] text-tertiary">cloud_sync</span>
          <h2 className="font-title-sm text-title-sm text-on-surface font-semibold">
            Sao Lưu & Khôi Phục Dữ Liệu
          </h2>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Dữ liệu của bạn được lưu an toàn trên trình duyệt. Bạn có thể xuất bản sao lưu dạng tệp JSON để chuyển đổi thiết bị hoặc phục hồi khi cần.
        </p>

        <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
          <button
            type="button"
            onClick={handleExportBackup}
            className="h-10 px-space-lg rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Xuất bản sao lưu (.json)</span>
          </button>

          <label className="h-10 px-space-lg rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs">
            <span className="material-symbols-outlined text-[18px]">upload</span>
            <span>Nhập dữ liệu phục hồi</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={handleResetData}
            className="h-10 px-space-md rounded-lg text-error hover:bg-error-container/20 font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Đặt lại dữ liệu ban đầu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
