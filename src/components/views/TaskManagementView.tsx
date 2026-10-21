import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const TaskManagementView: React.FC = () => {
  const { 
    tasks, 
    toggleTask, 
    setIsAddTaskOpen, 
    setStudyMode,
    pomodoroTime,
    pomodoroRunning,
    pomodoroMode,
    togglePomodoro,
    resetPomodoro,
    setPomodoroMode
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'morning' | 'evening' | 'night'>('all');
  const [viewMode, setViewMode] = useState<'slots' | 'kanban'>('slots');

  // Filter tasks
  const morningTasks = tasks.filter(t => t.slot === 'morning' && !t.completed);
  const eveningTasks = tasks.filter(t => t.slot === 'evening' && !t.completed);
  const nightTasks = tasks.filter(t => t.slot === 'night' && !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  // Top 3 tasks calculation
  const topTasks = tasks.filter(t => t.isTopPriority).slice(0, 3);
  const completedTopCount = topTasks.filter(t => t.completed).length;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col w-full">
      {/* Minimalist Executive Sub-Bar: Clean, uncluttered filter & view toggling */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">
        <div className="flex items-center gap-space-sm flex-wrap">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low shadow-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Tất cả khung giờ
            </button>
            <button
              onClick={() => setActiveFilter('morning')}
              className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                activeFilter === 'morning'
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Sáng: Tiếng Anh
            </button>
            <button
              onClick={() => setActiveFilter('evening')}
              className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                activeFilter === 'evening'
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Tối: Tiếng Trung
            </button>
            <button
              onClick={() => setActiveFilter('night')}
              className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                activeFilter === 'night'
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Đêm: HCNS & C&B
            </button>
          </div>
          <span className="text-outline-variant font-label-xs">•</span>
          <div className="flex items-center gap-1 text-on-surface-variant font-label-xs text-label-xs">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            <span>Hôm nay: 07/04/2025 • Tuần 3</span>
          </div>
        </div>

        {/* Right Controls: View switcher & quick action */}
        <div className="flex items-center gap-space-sm">
          <div className="inline-flex items-center p-1 rounded-xl bg-surface-container-low shadow-xs">
            <button
              onClick={() => setViewMode('slots')}
              className={`flex items-center gap-1 px-space-md py-1.5 rounded-lg font-label-xs text-label-xs transition-all cursor-pointer ${
                viewMode === 'slots'
                  ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>Theo Khung Giờ</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1 px-space-md py-1.5 rounded-lg font-label-xs text-label-xs transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">view_kanban</span>
              <span>Kanban Đơn Giản</span>
            </button>
          </div>
          <button
            onClick={() => setIsAddTaskOpen(true)}
            className="flex items-center gap-1 h-9 px-space-md rounded-xl bg-primary-container text-on-primary font-label-md text-label-md shadow-xs hover:opacity-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_task</span>
            <span>Tạo mục tiêu</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 8 cols Task Accordions & 4 cols High-Focus Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT 8 COLUMNS */}
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          {viewMode === 'slots' ? (
            <>
              {/* Accordion 1: Khung Sáng (Tiếng Anh TOEIC) */}
              {(activeFilter === 'all' || activeFilter === 'morning') && (
                <details
                  className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 transition-all overflow-hidden open:ring-1 open:ring-tertiary/20"
                  open
                >
                  <summary className="flex items-center justify-between px-space-lg py-space-md cursor-pointer list-none select-none bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">wb_twilight</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-title-sm text-title-sm text-on-surface font-semibold tracking-tight">
                            Khung Sáng (06:30 - 07:30)
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-xs text-label-xs font-semibold">
                            Tiếng Anh TOEIC & Shadowing
                          </span>
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Thời lượng: 60 phút • Mục tiêu tăng tốc nghe hiểu
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-md shrink-0">
                      <span className="font-label-xs text-label-xs text-outline font-semibold">
                        {morningTasks.filter(t => t.completed).length}/{morningTasks.length} Xong
                      </span>
                      <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform duration-200">
                        expand_more
                      </span>
                    </div>
                  </summary>

                  <div className="px-space-lg pb-space-lg pt-space-xs flex flex-col gap-space-sm bg-surface-container-lowest">
                    {morningTasks.length === 0 ? (
                      <div className="p-4 text-center text-outline font-body-sm">
                        Đã hoàn thành toàn bộ mục việc khung sáng!
                      </div>
                    ) : (
                      morningTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-start gap-space-md p-space-md rounded-xl bg-surface hover:bg-surface-container-low transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="mt-1 w-4 h-4 rounded text-tertiary focus:ring-0 cursor-pointer accent-tertiary"
                            id={task.id}
                          />
                          <label className="flex-1 cursor-pointer select-none" htmlFor={task.id}>
                            <div className="flex items-center justify-between gap-space-sm">
                              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                                {task.title}
                              </span>
                              {task.tag && (
                                <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-label-xs text-label-xs">
                                  {task.tag}
                                </span>
                              )}
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                              {task.description}
                            </p>
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </details>
              )}

              {/* Accordion 2: Khung Tối (Tiếng Trung HSK & Phản xạ) */}
              {(activeFilter === 'all' || activeFilter === 'evening') && (
                <details
                  className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 transition-all overflow-hidden open:ring-1 open:ring-secondary/20"
                  open
                >
                  <summary className="flex items-center justify-between px-space-lg py-space-md cursor-pointer list-none select-none bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">translate</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-title-sm text-title-sm text-on-surface font-semibold tracking-tight">
                            Khung Tối (19:30 - 20:30)
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-xs text-label-xs font-semibold">
                            Tiếng Trung HSK & Phản xạ
                          </span>
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Thời lượng: 60 phút • Luyện phản xạ công sở thực tế
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-md shrink-0">
                      <span className="font-label-xs text-label-xs text-outline font-semibold">
                        {eveningTasks.filter(t => t.completed).length}/{eveningTasks.length} Xong
                      </span>
                      <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform duration-200">
                        expand_more
                      </span>
                    </div>
                  </summary>

                  <div className="px-space-lg pb-space-lg pt-space-xs flex flex-col gap-space-sm bg-surface-container-lowest">
                    {eveningTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-space-md p-space-md rounded-xl bg-surface hover:bg-surface-container-low transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="mt-1 w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-secondary"
                          id={task.id}
                        />
                        <label className="flex-1 cursor-pointer select-none" htmlFor={task.id}>
                          <div className="flex items-center justify-between gap-space-sm">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                              {task.title}
                            </span>
                            {task.tag && (
                              <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-label-xs text-label-xs">
                                {task.tag}
                              </span>
                            )}
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            {task.description}
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                </details>
              )}

              {/* Accordion 3: Khung Đêm (Thực hành Nghiệp vụ HCNS & C&B) */}
              {(activeFilter === 'all' || activeFilter === 'night') && (
                <details
                  className="group bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/40 transition-all overflow-hidden open:ring-1 open:ring-primary/20"
                  open
                >
                  <summary className="flex items-center justify-between px-space-lg py-space-md cursor-pointer list-none select-none bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-title-sm text-title-sm text-on-surface font-semibold tracking-tight">
                            Khung Đêm (21:15 - 22:45)
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-xs text-label-xs font-semibold">
                            Thực hành Nghiệp vụ HCNS & C&B
                          </span>
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Thời lượng: 90 phút • Chuyên sâu tính toán & Pháp chế lao động
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-md shrink-0">
                      <span className="font-label-xs text-label-xs text-outline font-semibold">
                        {nightTasks.filter(t => t.completed).length}/{nightTasks.length} Xong
                      </span>
                      <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform duration-200">
                        expand_more
                      </span>
                    </div>
                  </summary>

                  <div className="px-space-lg pb-space-lg pt-space-xs flex flex-col gap-space-sm bg-surface-container-lowest">
                    {nightTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-space-md p-space-md rounded-xl bg-surface hover:bg-surface-container-low transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary"
                          id={task.id}
                        />
                        <label className="flex-1 cursor-pointer select-none" htmlFor={task.id}>
                          <div className="flex items-center justify-between gap-space-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                                {task.title}
                              </span>
                              {task.topRank && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary-container text-on-primary font-bold">
                                  TOP {task.topRank}
                                </span>
                              )}
                            </div>
                            {task.tag && (
                              <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-label-xs text-label-xs">
                                {task.tag}
                              </span>
                            )}
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            {task.description}
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                </details>
              )}

              {/* Accordion 4: Completed Tasks */}
              <details className="group bg-surface-container-low rounded-xl transition-all overflow-hidden">
                <summary className="flex items-center justify-between px-space-lg py-space-md cursor-pointer list-none select-none hover:bg-surface-container transition-colors">
                  <div className="flex items-center gap-space-sm text-outline">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                    <span className="font-label-lg text-label-lg font-semibold text-on-surface-variant">
                      Mục Việc đã hoàn thành hôm nay ({completedTasks.length} việc)
                    </span>
                    <span className="font-label-xs text-label-xs text-outline px-1.5 py-0.5 rounded bg-surface-container-highest">
                      Đã ẩn để gọn mắt
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform duration-200">
                    expand_more
                  </span>
                </summary>

                <div className="px-space-lg pb-space-lg pt-space-xs flex flex-col gap-2">
                  {completedTasks.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest opacity-75 hover:opacity-100 transition-opacity"
                    >
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleTask(t.id)}
                          className="text-tertiary cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">check_box</span>
                        </button>
                        <span className="font-body-sm text-body-sm line-through text-on-surface-variant">
                          {t.title}
                        </span>
                      </div>
                      <span className="font-label-xs text-label-xs text-outline">
                        {t.completedAt || 'Hoàn tất'}
                      </span>
                    </div>
                  ))}
                </div>
              </details>
            </>
          ) : (
            /* Kanban Board Mode */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {/* To-Do Column */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
                <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-2">
                  <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
                    Cần làm ({morningTasks.length})
                  </span>
                  <span className="w-2 h-2 rounded-full bg-outline"></span>
                </div>
                <div className="space-y-2">
                  {morningTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container-highest shadow-xs hover:border-primary transition-all cursor-pointer"
                    >
                      <div className="font-label-md font-semibold text-on-surface">{task.title}</div>
                      <span className="text-[11px] text-outline mt-1 block">{task.slot} • {task.durationMinutes}p</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
                <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-2">
                  <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
                    Đang làm ({eveningTasks.length + nightTasks.length})
                  </span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                </div>
                <div className="space-y-2">
                  {[...eveningTasks, ...nightTasks].map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container-highest shadow-xs hover:border-primary transition-all cursor-pointer"
                    >
                      <div className="font-label-md font-semibold text-on-surface">{task.title}</div>
                      <span className="text-[11px] text-primary mt-1 block">{task.categoryLabel} • {task.durationMinutes}p</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Done Column */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
                <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-2">
                  <span className="font-label-md text-label-md text-tertiary font-bold uppercase tracking-wider">
                    Đã hoàn thành ({completedTasks.length})
                  </span>
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                </div>
                <div className="space-y-2">
                  {completedTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className="p-3 rounded-lg bg-surface-container-lowest/80 border border-surface-container-highest/60 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <div className="font-label-md font-medium line-through text-outline">{task.title}</div>
                      <span className="text-[11px] text-tertiary mt-1 block">Xong lúc {task.completedAt || 'hôm nay'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT 4 COLUMNS: Minimal Productivity Engine */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Minimalist Pomodoro Focus Timer */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container-highest/40 flex flex-col">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${pomodoroRunning ? 'bg-error animate-pulse' : 'bg-outline'}`}></span>
                <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                  Đồng hồ Tập trung
                </span>
              </div>
              <span className="font-label-xs text-label-xs text-on-surface-variant px-2 py-0.5 rounded-full bg-surface-container-low font-medium">
                Sprint 25/5
              </span>
            </div>

            {/* Timer Big Digit */}
            <div className="flex flex-col items-center justify-center py-space-md my-space-xs rounded-xl bg-surface-container-low/70">
              <div className="font-display-lg text-[48px] leading-tight text-on-surface font-bold tracking-tight font-mono">
                {formatTimer(pomodoroTime)}
              </div>
              <span className="font-label-xs text-label-xs text-outline mt-1 font-medium">
                Khung hiện tại: Tiếng Anh Sáng
              </span>
            </div>

            {/* Timer Controls */}
            <div className="grid grid-cols-3 gap-2 mt-space-md">
              <button
                type="button"
                onClick={togglePomodoro}
                className={`col-span-2 h-9 rounded-lg font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                  pomodoroRunning
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {pomodoroRunning ? 'pause' : 'play_arrow'}
                </span>
                <span>{pomodoroRunning ? 'Tạm dừng' : 'Bắt đầu phiên'}</span>
              </button>
              <button
                type="button"
                onClick={resetPomodoro}
                className="h-9 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium flex items-center justify-center transition-colors cursor-pointer"
                title="Đặt lại"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
            </div>

            {/* Micro Focus Mode Pills */}
            <div className="flex items-center justify-between pt-space-md mt-space-md border-t border-surface-container-highest/30">
              <span className="font-label-xs text-label-xs text-on-surface-variant">Chế độ đếm:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPomodoroMode('study25')}
                  className={`px-2 py-1 rounded text-[11px] font-label-xs transition-colors cursor-pointer ${
                    pomodoroMode === 'study25'
                      ? 'bg-surface-container-high text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  25m Học
                </button>
                <button
                  type="button"
                  onClick={() => setPomodoroMode('shortBreak')}
                  className={`px-2 py-1 rounded text-[11px] font-label-xs transition-colors cursor-pointer ${
                    pomodoroMode === 'shortBreak'
                      ? 'bg-surface-container-high text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  5m Nghỉ
                </button>
                <button
                  type="button"
                  onClick={() => setPomodoroMode('longBreak')}
                  className={`px-2 py-1 rounded text-[11px] font-label-xs transition-colors cursor-pointer ${
                    pomodoroMode === 'longBreak'
                      ? 'bg-surface-container-high text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  15m Nghỉ dài
                </button>
              </div>
            </div>
          </div>

          {/* Rule of Top 3: Cognitive Overload Prevention */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container-highest/40 flex flex-col">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[19px]">lock</span>
                <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                  Khóa Nhận Thức (Top 3)
                </span>
              </div>
              <span className="font-label-xs text-label-xs text-outline">Bảo toàn năng lượng</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Chỉ tập trung xử lý dứt điểm 3 việc sống còn trong ngày. Loại bỏ hoàn toàn sự phân tâm trước khi hoàn tất.
            </p>

            {/* Top 3 List */}
            <div className="flex flex-col gap-2">
              {topTasks.map((task, idx) => {
                const rank = idx + 1;
                const badgeBg = rank === 1 ? 'bg-primary text-on-primary' : rank === 2 ? 'bg-secondary text-on-secondary' : 'bg-tertiary text-on-tertiary';
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="p-3 rounded-lg bg-surface-container-low flex items-center gap-space-sm cursor-pointer hover:bg-surface-container transition-colors"
                  >
                    <span className={`w-5 h-5 rounded-full ${badgeBg} font-label-xs text-label-xs flex items-center justify-center font-bold shrink-0`}>
                      {rank}
                    </span>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className={`font-label-md text-label-md text-on-surface font-semibold truncate ${task.completed ? 'line-through text-outline' : ''}`}>
                        {task.title}
                      </span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">
                        {task.categoryLabel} ({task.slot === 'morning' ? 'Khung Sáng' : task.slot === 'evening' ? 'Khung Tối' : 'Khung Đêm'})
                      </span>
                    </div>
                    {task.completed && (
                      <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Daily Target Progress Meter */}
            <div className="mt-space-md pt-space-md border-t border-surface-container-highest/30 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-on-surface-variant">Tiến độ Top 3</span>
                <span className="font-label-xs text-label-xs text-primary font-bold">
                  {completedTopCount}/3 hoàn tất
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-300" 
                  style={{ width: `${(completedTopCount / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Reflection / Mental State Note */}
          <div className="bg-surface-container-low/70 rounded-xl p-space-md flex items-start gap-space-sm border border-surface-container-highest/40">
            <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0 mt-0.5">
              tips_and_updates
            </span>
            <div className="flex flex-col text-on-surface">
              <span className="font-label-md text-label-md font-semibold">Lời nhắc nhịp học:</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Nếu hôm nay quá tải công việc công ty, hãy chuyển sang{' '}
                <button
                  type="button"
                  onClick={() => setStudyMode('busy')}
                  className="font-medium text-primary hover:underline cursor-pointer inline"
                >
                  Chế độ Bận rộn (1h)
                </button>{' '}
                trên thanh điều hướng để duy trì tính liên tục của chuỗi 84 ngày.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
