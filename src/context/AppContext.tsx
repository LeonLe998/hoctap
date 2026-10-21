import React, { createContext, useContext, useState, useEffect } from 'react';
import { ViewType, StudyMode, Task, ArtifactItem, MistakeItem, UserProfile, ReflectionEntry } from '../types';
import { initialProfile, initialTasks, initialArtifacts, initialMistakes, initialReflectionEntries } from '../data/initialData';

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  studyMode: StudyMode;
  setStudyMode: (mode: StudyMode) => void;
  tasks: Task[];
  toggleTask: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  deleteTask: (id: string) => void;
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  artifacts: ArtifactItem[];
  mistakes: MistakeItem[];
  addMistake: (item: Omit<MistakeItem, 'id'>) => void;
  selectedArtifact: ArtifactItem | null;
  setSelectedArtifact: (item: ArtifactItem | null) => void;
  isAddTaskOpen: boolean;
  setIsAddTaskOpen: (open: boolean) => void;
  isReflectionOpen: boolean;
  setIsReflectionOpen: (open: boolean) => void;
  isMentorOpen: boolean;
  setIsMentorOpen: (open: boolean) => void;
  isSubmitAssignmentOpen: boolean;
  setIsSubmitAssignmentOpen: (open: boolean) => void;
  assignmentTarget: { id: string; title: string } | null;
  openSubmitAssignment: (target: { id: string; title: string }) => void;
  reflections: ReflectionEntry[];
  addReflection: (entry: Omit<ReflectionEntry, 'id'>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  pomodoroTime: number;
  pomodoroRunning: boolean;
  pomodoroMode: 'study25' | 'shortBreak' | 'longBreak' | 'busy20';
  togglePomodoro: () => void;
  resetPomodoro: () => void;
  setPomodoroMode: (mode: 'study25' | 'shortBreak' | 'longBreak' | 'busy20') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [studyMode, setStudyModeState] = useState<StudyMode>(() => {
    const saved = localStorage.getItem('careersprint_studymode');
    return saved === 'busy' ? 'busy' : 'standard';
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('careersprint_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('careersprint_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [artifacts] = useState<ArtifactItem[]>(initialArtifacts);
  const [mistakes, setMistakes] = useState<MistakeItem[]>(() => {
    const saved = localStorage.getItem('careersprint_mistakes');
    return saved ? JSON.parse(saved) : initialMistakes;
  });

  const [reflections, setReflections] = useState<ReflectionEntry[]>(() => {
    const saved = localStorage.getItem('careersprint_reflections');
    return saved ? JSON.parse(saved) : initialReflectionEntries;
  });

  // Modal states
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactItem | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isReflectionOpen, setIsReflectionOpen] = useState(false);
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [isSubmitAssignmentOpen, setIsSubmitAssignmentOpen] = useState(false);
  const [assignmentTarget, setAssignmentTarget] = useState<{ id: string; title: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pomodoro timer state
  const [pomodoroMode, setPomodoroModeState] = useState<'study25' | 'shortBreak' | 'longBreak' | 'busy20'>('study25');
  const [pomodoroTime, setPomodoroTime] = useState<number>(25 * 60);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);

  // Sound generator using Web Audio API for timer and feedback
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (pomodoroRunning) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => {
          if (prev <= 1) {
            setPomodoroRunning(false);
            playChime();
            showToast('Đã hoàn thành phiên tập trung! Hãy nghỉ ngơi ngắn.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroRunning]);

  const togglePomodoro = () => {
    setPomodoroRunning((prev) => !prev);
  };

  const resetPomodoro = () => {
    setPomodoroRunning(false);
    if (pomodoroMode === 'study25') setPomodoroTime(25 * 60);
    else if (pomodoroMode === 'shortBreak') setPomodoroTime(5 * 60);
    else if (pomodoroMode === 'longBreak') setPomodoroTime(15 * 60);
    else if (pomodoroMode === 'busy20') setPomodoroTime(20 * 60);
  };

  const setPomodoroMode = (mode: 'study25' | 'shortBreak' | 'longBreak' | 'busy20') => {
    setPomodoroModeState(mode);
    setPomodoroRunning(false);
    if (mode === 'study25') setPomodoroTime(25 * 60);
    else if (mode === 'shortBreak') setPomodoroTime(5 * 60);
    else if (mode === 'longBreak') setPomodoroTime(15 * 60);
    else if (mode === 'busy20') setPomodoroTime(20 * 60);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const setStudyMode = (mode: StudyMode) => {
    setStudyModeState(mode);
    localStorage.setItem('careersprint_studymode', mode);
    if (mode === 'busy') {
      setCurrentView('busy');
      showToast('Đã chuyển sang Chế độ Bận rộn (1h/ngày) - Giảm tải và bảo vệ streak!');
    } else {
      if (currentView === 'busy') setCurrentView('overview');
      showToast('Đã khôi phục Chế độ Tiêu chuẩn (3h/ngày) - Đầy đủ 3 trụ cột chuyên sâu.');
    }
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => {
      const next = prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            playChime();
          }
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
          };
        }
        return t;
      });
      localStorage.setItem('careersprint_tasks', JSON.stringify(next));
      return next;
    });
  };

  const addTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: `task-${Date.now()}`,
      completed: false
    };
    setTasks((prev) => {
      const next = [task, ...prev];
      localStorage.setItem('careersprint_tasks', JSON.stringify(next));
      return next;
    });
    showToast(`Đã thêm nhiệm vụ: "${task.title}"`);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => {
      const next = prev.filter((t) => t.id !== id);
      localStorage.setItem('careersprint_tasks', JSON.stringify(next));
      return next;
    });
    showToast('Đã xóa nhiệm vụ');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...data };
      localStorage.setItem('careersprint_profile', JSON.stringify(next));
      return next;
    });
    showToast('Đã cập nhật thông tin hồ sơ');
  };

  const addMistake = (item: Omit<MistakeItem, 'id'>) => {
    const mistake: MistakeItem = {
      ...item,
      id: `mis-${Date.now()}`
    };
    setMistakes((prev) => {
      const next = [mistake, ...prev];
      localStorage.setItem('careersprint_mistakes', JSON.stringify(next));
      return next;
    });
    showToast('Đã lưu lỗi sai vào Sổ tay ôn tập');
  };

  const addReflection = (entry: Omit<ReflectionEntry, 'id'>) => {
    const newEntry: ReflectionEntry = {
      ...entry,
      id: `ref-${Date.now()}`
    };
    setReflections((prev) => {
      const next = [newEntry, ...prev];
      localStorage.setItem('careersprint_reflections', JSON.stringify(next));
      return next;
    });
    showToast('Đã ghi lại phản tư thành công!');
  };

  const openSubmitAssignment = (target: { id: string; title: string }) => {
    setAssignmentTarget(target);
    setIsSubmitAssignmentOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        studyMode,
        setStudyMode,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        profile,
        updateProfile,
        artifacts,
        mistakes,
        addMistake,
        selectedArtifact,
        setSelectedArtifact,
        isAddTaskOpen,
        setIsAddTaskOpen,
        isReflectionOpen,
        setIsReflectionOpen,
        isMentorOpen,
        setIsMentorOpen,
        isSubmitAssignmentOpen,
        setIsSubmitAssignmentOpen,
        assignmentTarget,
        openSubmitAssignment,
        reflections,
        addReflection,
        toastMessage,
        showToast,
        pomodoroTime,
        pomodoroRunning,
        pomodoroMode,
        togglePomodoro,
        resetPomodoro,
        setPomodoroMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
