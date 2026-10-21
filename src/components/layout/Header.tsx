import React from 'react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { 
    studyMode, 
    setStudyMode, 
    setIsAddTaskOpen, 
    setIsReflectionOpen, 
    setCurrentView,
    profile 
  } = useApp();

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container-highest/60 z-40 px-space-lg flex items-center justify-between">
      {/* Left: Sprint mini progress indicator */}
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-2 px-space-sm py-1 rounded-full bg-surface-container-low border border-surface-container-highest/50">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span className="font-label-xs text-label-xs text-on-surface font-semibold">
            Sprint Tuần 3 / 12
          </span>
          <span className="text-outline text-xs">|</span>
          <div className="w-16 bg-surface-container-high h-1.5 rounded-full overflow-hidden hidden sm:block">
            <div className="bg-primary-container h-full rounded-full w-1/4"></div>
          </div>
          <span className="font-label-xs text-label-xs text-primary font-bold">25%</span>
        </div>
      </div>

      {/* Right: Study mode switcher, quick action, user profile */}
      <div className="flex items-center gap-space-md">
        {/* Mode Switcher Pill */}
        <div className="inline-flex items-center p-0.5 rounded-full bg-surface-container-low border border-surface-container-highest/50">
          <button
            onClick={() => setStudyMode('standard')}
            className={`px-space-sm py-1 rounded-full font-label-xs text-label-xs flex items-center gap-1 transition-all ${
              studyMode === 'standard'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface font-medium'
            }`}
            type="button"
          >
            {studyMode === 'standard' && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            )}
            <span>Tiêu chuẩn (3h)</span>
          </button>
          <button
            onClick={() => setStudyMode('busy')}
            className={`px-space-sm py-1 rounded-full font-label-xs text-label-xs flex items-center gap-1 transition-all ${
              studyMode === 'busy'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold'
                : 'text-on-surface-variant hover:text-on-surface font-medium'
            }`}
            type="button"
          >
            {studyMode === 'busy' && (
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            )}
            <span>Bận rộn (1h)</span>
          </button>
        </div>

        <div className="h-4 w-px bg-surface-container-highest"></div>

        {/* Quick Add Task Button */}
        <button
          onClick={() => setIsAddTaskOpen(true)}
          className="h-8 px-space-md rounded-lg bg-primary-container text-on-primary hover:opacity-95 transition-all font-label-md text-label-md font-medium flex items-center gap-1 shadow-xs cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Thêm việc</span>
        </button>

        {/* Quick Reflection Note */}
        <button
          onClick={() => setIsReflectionOpen(true)}
          className="h-8 w-8 rounded-lg border border-surface-container-highest/60 bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low flex items-center justify-center transition-colors cursor-pointer"
          title="Viết phản tư nhanh"
          type="button"
        >
          <span className="material-symbols-outlined text-[17px]">edit_square</span>
        </button>

        {/* Minimal User Avatar */}
        <div className="flex items-center gap-2 pl-space-xs">
          <button
            onClick={() => setCurrentView('settings')}
            className="w-8 h-8 rounded-full bg-surface-container-high border border-surface-container-highest text-on-surface flex items-center justify-center font-label-xs font-semibold hover:border-primary transition-colors cursor-pointer"
            title="Hồ sơ & Cài đặt"
          >
            <span>{profile.name.split(' ').map(n => n[0]).slice(0, 2).join('') || 'NA'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
