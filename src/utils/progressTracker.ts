export interface UserLunarProgress {
  visitedMissions: string[];       // Mission IDs or names clicked
  exploredSimulations: string[];   // Sim actions performed: 'speed', 'phase', 'celestial'
  quizScore: number;               // High score or latest score
  quizCompleted: boolean;          // Finished quiz at least once
  factsRead: string[];             // Fact categories or IDs inspected
  lunaConversations: number;       // Questions asked to LUNA
}

const STORAGE_KEY = 'moon_explorer_user_progress_v1';

export const defaultProgress: UserLunarProgress = {
  visitedMissions: [],
  exploredSimulations: [],
  quizScore: 0,
  quizCompleted: false,
  factsRead: [],
  lunaConversations: 0,
};

export const loadUserProgress = (): UserLunarProgress => {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
};

export const saveUserProgress = (progress: UserLunarProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // LocalStorage quota or private mode fallback
  }
};

export interface ProgressMilestone {
  id: string;
  label: string;
  description: string;
  isCompleted: boolean;
  module: 'missions' | 'spacelab' | 'quiz' | 'luna';
}

export const calculateMilestones = (p: UserLunarProgress): ProgressMilestone[] => {
  return [
    {
      id: 'm1',
      label: 'Survey Lunar Archive',
      description: 'Inspect at least 3 historical missions in Timeline',
      isCompleted: p.visitedMissions.length >= 3,
      module: 'missions'
    },
    {
      id: 'm2',
      label: 'Orbital Flight Director',
      description: 'Interact with Sandbox simulation controls (speed/phases)',
      isCompleted: p.exploredSimulations.length >= 2,
      module: 'spacelab'
    },
    {
      id: 'm3',
      label: 'Lunar Academy Cadet',
      description: 'Complete the interactive Lunar Knowledge Quiz',
      isCompleted: p.quizCompleted,
      module: 'quiz'
    },
    {
      id: 'm4',
      label: 'Lunar Fact Finder',
      description: 'Explore at least 3 curated lunar science topics',
      isCompleted: p.factsRead.length >= 3,
      module: 'quiz'
    },
    {
      id: 'm5',
      label: 'Talk with L.U.N.A.',
      description: 'Query the voice & AI assistant for real-time mission facts',
      isCompleted: p.lunaConversations >= 1,
      module: 'luna'
    }
  ];
};

export const getCompletionPercentage = (milestones: ProgressMilestone[]): number => {
  if (milestones.length === 0) return 0;
  const completed = milestones.filter(m => m.isCompleted).length;
  return Math.round((completed / milestones.length) * 100);
};

export const getAstronautRank = (percentage: number): { title: string; badge: string; color: string } => {
  if (percentage >= 100) return { title: 'Lunar Mission Commander', badge: 'Commander', color: '#ffb800' };
  if (percentage >= 80) return { title: 'Flight Director', badge: 'Tier IV', color: '#a855f7' };
  if (percentage >= 60) return { title: 'Lunar Surface Specialist', badge: 'Tier III', color: '#3b82f6' };
  if (percentage >= 40) return { title: 'Orbital Navigator', badge: 'Tier II', color: '#10b981' };
  if (percentage >= 20) return { title: 'Cadet Explorer', badge: 'Tier I', color: '#6366f1' };
  return { title: 'Trainee Observer', badge: 'Novice', color: '#64748b' };
};
