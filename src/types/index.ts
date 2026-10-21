export type ViewType = 
  | 'overview' 
  | 'tasks' 
  | 'hcns' 
  | 'chinese' 
  | 'english' 
  | 'busy' 
  | 'journal' 
  | 'settings';

export type StudyMode = 'standard' | 'busy';

export interface Task {
  id: string;
  title: string;
  description: string;
  slot: 'morning' | 'evening' | 'night';
  category: 'hcns' | 'chinese' | 'english' | 'general';
  categoryLabel: string;
  durationMinutes: number;
  tag?: string;
  isTopPriority?: boolean;
  topRank?: number;
  completed: boolean;
  completedAt?: string;
}

export interface ArtifactItem {
  id: string;
  fileName: string;
  description: string;
  type: 'excel' | 'pdf' | 'audio' | 'word' | 'image';
  size: string;
  weekApproved: string;
  badgeColor?: string;
}

export interface MistakeItem {
  id: string;
  category: string;
  categoryColor: string;
  timeTag: string;
  content: string;
  detailedExplanation?: string;
}

export interface UserProfile {
  name: string;
  targetRole: string;
  toeicTarget: number;
  currentToeic: number;
  hskTarget: string;
  currentHskVocab: number;
  streakDays: number;
  totalStudyHours: number;
  studyMode: StudyMode;
}

export interface MentorNote {
  mentorName: string;
  mentorTitle: string;
  mentorAvatar: string;
  week: number;
  note: string;
  lastReply: string;
}

export interface ReflectionEntry {
  id: string;
  date: string;
  week: number;
  disciplineScore: number; // 1-5
  energyScore: number; // 1-5
  biggestWin: string;
  bottleneck: string;
  adjustmentTomorrow: string;
}
