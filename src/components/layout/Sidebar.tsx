import React from 'react';
import { useApp } from '../../context/AppContext';
import { ViewType } from '../../types';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, profile } = useApp();

  const navItems: { label: string; view: ViewType; category?: string }[] = [
    { label: 'Tổng quan lộ trình', view: 'overview', category: 'KHÔNG GIAN LÀM VIỆC' },
    { label: 'Quản lý nhiệm vụ', view: 'tasks' },
    { label: 'Chế độ Bận rộn (1h)', view: 'busy' },
    { label: 'Nghiệp vụ HCNS 12 tuần', view: 'hcns', category: 'LỘ TRÌNH CHUYÊN MÔN' },
    { label: 'Tiếng Trung HSK & Công sở', view: 'chinese' },
    { label: 'Tiếng Anh TOEIC & Phỏng vấn', view: 'english' },
    { label: 'Nhật ký & Tổng kết tuần', view: 'journal', category: 'ĐO LƯỜNG & HỆ THỐNG' },
    { label: 'Cài đặt & Sao lưu dữ liệu', view: 'settings' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest border-r border-surface-container-highest/60 z-50 flex flex-col">
      {/* Logo / Brand Header */}
      <div className="h-16 px-space-lg flex items-center justify-between border-b border-surface-container-highest/40 shrink-0">
        <button
          onClick={() => setCurrentView('overview')}
          className="flex items-center gap-space-sm text-left group focus:outline-none"
        >
          <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[17px] font-normal">space_dashboard</span>
          </div>
          <div className="flex flex-col">
            <span className="font-title-sm text-title-sm text-on-surface tracking-tight font-semibold group-hover:text-primary transition-colors">
              CareerSprint
            </span>
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium tracking-wide">
              12-Tuần Tăng Tốc
            </span>
          </div>
        </button>
        <span className="px-1.5 py-0.5 rounded text-[10px] font-label-xs font-semibold bg-surface-container-high text-on-surface-variant">
          v2.4
        </span>
      </div>

      {/* Compact Progress Card */}
      <div className="px-space-md pt-space-md pb-space-sm shrink-0">
        <div className="p-space-sm rounded-lg bg-surface-container-low/80 border border-surface-container-highest/40 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">
              Chặng 1: Tuần 3/12
            </span>
            <span className="font-label-xs text-label-xs text-primary font-bold">25%</span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full rounded-full w-1/4"></div>
          </div>
          <div className="flex items-center justify-between text-[11px] font-label-xs text-outline">
            <span>Kế hoạch 84 ngày</span>
            <span className="text-tertiary font-medium">Đúng tiến độ</span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-space-sm py-space-xs space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item, idx) => {
          const isActive = currentView === item.view;
          return (
            <React.Fragment key={item.view}>
              {item.category && (
                <div
                  className={`px-space-md font-label-xs text-label-xs text-outline uppercase tracking-wider font-semibold ${
                    idx === 0 ? 'pt-2 pb-1' : 'pt-space-md pb-1'
                  }`}
                >
                  {item.category}
                </div>
              )}
              <button
                type="button"
                onClick={() => setCurrentView(item.view)}
                className={`w-full text-left flex items-center px-space-md py-2 rounded-lg font-body-md text-body-md transition-colors ${
                  isActive
                    ? 'bg-surface-container-high text-primary font-label-lg font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <span>{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Bottom User Profile */}
      <div className="p-space-sm border-t border-surface-container-highest/40 bg-surface-container-lowest m-space-xs rounded-lg shrink-0">
        <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low transition-colors">
          <button
            onClick={() => setCurrentView('settings')}
            className="flex items-center gap-space-sm min-w-0 text-left flex-1"
          >
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-md font-semibold shrink-0">
              <span>{profile.name.split(' ').map(n => n[0]).slice(0, 2).join('') || 'NA'}</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-label-lg text-on-surface truncate leading-tight font-semibold">
                {profile.name}
              </span>
              <span className="font-label-xs text-label-xs text-on-surface-variant truncate">
                Mục tiêu: {profile.targetRole}
              </span>
            </div>
          </button>
          <button
            onClick={() => setCurrentView('settings')}
            className="text-outline hover:text-on-surface p-1 rounded transition-colors"
            title="Cài đặt & Sao lưu"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
