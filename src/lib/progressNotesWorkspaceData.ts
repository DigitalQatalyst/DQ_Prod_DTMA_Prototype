export type DateRange = 'week' | 'month' | '90days' | 'all';

export type NoteTab = 'my-notes' | 'ai-notes' | 'bookmarks' | 'revision-packs';

export interface WeeklyDayActivity {
  day: string;
  hours: number;
  lessons: number;
  assessments: number;
}

export interface CourseProgressItem {
  id: string;
  title: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  currentScore: number;
  estimatedRemaining: string;
  lastActive: string;
}

export interface CompetencyDomain {
  id: string;
  label: string;
  current: number;
  previous: number;
}

export interface Milestone {
  id: string;
  title: string;
  status: 'earned' | 'upcoming';
  progress?: number;
}

export interface LearnerNote {
  id: string;
  title: string;
  course: string;
  timestamp: string;
  competency: string;
  summary: string;
  tab: NoteTab;
  aiGenerated?: boolean;
  bookmarked?: boolean;
}

export interface LearningGoal {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
}

export const DATE_RANGE_OPTIONS: { key: DateRange; label: string }[] = [
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: '90days', label: 'Last 90 Days' },
  { key: 'all', label: 'All Time' },
];

export const PERFORMANCE_KPIS = {
  studyTime: {
    value: '12.5h',
    trend: '↑ 18% vs last week',
    sparkline: [1.2, 1.8, 2.1, 1.5, 2.4, 1.9, 2.6],
  },
  averageScore: {
    value: 85,
    trend: 'Above cohort average',
    trendUp: true,
  },
  lessonsCompleted: {
    value: 24,
    remaining: '6 remaining to goal',
    monthlyGoal: 30,
  },
  streak: {
    current: 7,
    best: 15,
    unit: 'Days',
  },
  certificationReadiness: {
    value: 72,
    label: 'Moderate readiness',
    tone: 'moderate' as const,
  },
};

export const WEEKLY_ACTIVITY: WeeklyDayActivity[] = [
  { day: 'Mon', hours: 2.0, lessons: 2, assessments: 1 },
  { day: 'Tue', hours: 1.5, lessons: 1, assessments: 0 },
  { day: 'Wed', hours: 3.0, lessons: 3, assessments: 1 },
  { day: 'Thu', hours: 2.0, lessons: 2, assessments: 0 },
  { day: 'Fri', hours: 1.0, lessons: 1, assessments: 1 },
  { day: 'Sat', hours: 0.5, lessons: 0, assessments: 0 },
  { day: 'Sun', hours: 2.5, lessons: 2, assessments: 0 },
];

export const WEEKLY_TOTALS = {
  hours: 12.5,
  dailyAverage: 1.8,
};

/** 12 weeks × 7 days intensity 0–4 for heatmap */
export const ACTIVITY_HEATMAP: number[][] = [
  [1, 2, 3, 2, 1, 0, 2],
  [2, 3, 2, 3, 2, 1, 0],
  [3, 2, 4, 3, 2, 0, 1],
  [2, 3, 3, 2, 1, 2, 3],
  [1, 2, 2, 3, 3, 1, 0],
  [3, 4, 3, 2, 2, 1, 2],
  [2, 3, 4, 3, 3, 2, 1],
  [3, 2, 3, 4, 2, 0, 2],
  [2, 3, 2, 3, 4, 1, 2],
  [3, 4, 3, 3, 2, 2, 3],
  [2, 3, 4, 3, 3, 1, 2],
  [3, 3, 4, 4, 3, 2, 3],
];

export const LEARNING_MOMENTUM = {
  score: 82,
  trend: 'up' as const,
  summary:
    'You are studying 22% more consistently than last month. Maintaining your current pace will complete your pathway 2 weeks ahead of schedule.',
  action: 'Schedule 30 minutes tomorrow to protect your streak.',
};

export const COURSE_PROGRESS: CourseProgressItem[] = [
  {
    id: 'economy-4',
    title: 'Introduction to Digital Economy & Economy 4.0',
    progress: 75,
    lessonsCompleted: 15,
    totalLessons: 20,
    currentScore: 88,
    estimatedRemaining: '1h 45m',
    lastActive: 'Today',
  },
  {
    id: 'ai-transform',
    title: 'AI-Powered Business Transformation',
    progress: 45,
    lessonsCompleted: 9,
    totalLessons: 20,
    currentScore: 82,
    estimatedRemaining: '3h 20m',
    lastActive: 'Yesterday',
  },
  {
    id: 'digital-leadership',
    title: 'Digital Leadership & Change Management',
    progress: 20,
    lessonsCompleted: 4,
    totalLessons: 20,
    currentScore: 76,
    estimatedRemaining: '5h 10m',
    lastActive: '3 days ago',
  },
];

export const COMPETENCY_DOMAINS: CompetencyDomain[] = [
  { id: 'strategy', label: 'Digital Strategy', current: 78, previous: 66 },
  { id: 'ai', label: 'AI & Automation', current: 84, previous: 72 },
  { id: 'platform', label: 'Platform Economics', current: 91, previous: 85 },
  { id: 'leadership', label: 'Digital Leadership', current: 63, previous: 58 },
  { id: 'data', label: 'Data & Analytics', current: 74, previous: 68 },
  { id: 'governance', label: 'Transformation Governance', current: 70, previous: 65 },
];

export const MILESTONES: Milestone[] = [
  { id: 'm1', title: 'First Course Completed', status: 'earned' },
  { id: 'm2', title: '5-Day Learning Streak', status: 'earned' },
  { id: 'm3', title: '10 Hours Studied', status: 'earned' },
  { id: 'm4', title: 'First Assessment Passed', status: 'earned' },
  { id: 'm5', title: 'Complete 30 lessons', status: 'upcoming', progress: 80 },
  { id: 'm6', title: 'Reach 80% readiness score', status: 'upcoming', progress: 90 },
  { id: 'm7', title: 'Earn first certification', status: 'upcoming', progress: 72 },
];

export const LEARNER_NOTES: LearnerNote[] = [
  {
    id: 'n1',
    title: 'Digital transformation fundamentals',
    course: 'Introduction to Digital Economy & Economy 4.0',
    timestamp: '2 hours ago',
    competency: 'Digital Strategy',
    summary:
      'Key takeaway: Digital transformation requires both technological and cultural change.',
    tab: 'my-notes',
  },
  {
    id: 'n2',
    title: 'Platform network effects',
    course: 'Platform Economics & Network Effects',
    timestamp: '1 day ago',
    competency: 'Platform Economics',
    summary:
      'Platform business models create value through network effects and data leverage.',
    tab: 'my-notes',
    bookmarked: true,
  },
  {
    id: 'n3',
    title: 'AI readiness checklist',
    course: 'AI-Powered Business Transformation',
    timestamp: '2 days ago',
    competency: 'AI & Automation',
    summary:
      'AI summary: Focus on data quality, governance, and change management before scaling pilots.',
    tab: 'ai-notes',
    aiGenerated: true,
  },
  {
    id: 'n4',
    title: 'Change leadership frameworks',
    course: 'Digital Leadership & Change Management',
    timestamp: '3 days ago',
    competency: 'Digital Leadership',
    summary: 'Kotter and ADKAR models compared for enterprise transformation programmes.',
    tab: 'bookmarks',
    bookmarked: true,
  },
  {
    id: 'n5',
    title: 'Economy 4.0 revision pack',
    course: 'Introduction to Digital Economy & Economy 4.0',
    timestamp: '1 week ago',
    competency: 'Digital Strategy',
    summary: 'Condensed revision: 12 key concepts, 5 frameworks, 3 case studies.',
    tab: 'revision-packs',
    aiGenerated: true,
  },
];

export const AI_INSIGHTS = {
  strongest: { area: 'Platform Economics', score: 91 },
  needsImprovement: { area: 'Digital Leadership', score: 63 },
  recommendedFocus: {
    area: 'Leadership & Change Management',
    improvement: '+8%',
  },
  suggestedActivity: {
    title: 'Leading Digital Change',
    duration: '15 minutes',
  },
};

export const CERTIFICATION_READINESS = {
  overall: 72,
  target: 85,
  practiceScore: 78,
  weakCompetencies: ['Digital Leadership', 'Transformation Governance'],
  actions: ['Complete Module 4', 'Pass Practice Exam', 'Review AI Notes'],
};

export const LEARNING_GOALS: LearningGoal[] = [
  { id: 'g1', label: 'Study 15 Hours This Week', current: 12.5, target: 15, unit: 'h' },
  { id: 'g2', label: 'Complete 3 Lessons', current: 2, target: 3, unit: '' },
  { id: 'g3', label: 'Reach 80% Readiness', current: 72, target: 80, unit: '%' },
];

export const NOTE_TABS: { key: NoteTab; label: string }[] = [
  { key: 'my-notes', label: 'My Notes' },
  { key: 'ai-notes', label: 'AI Notes' },
  { key: 'bookmarks', label: 'Bookmarks' },
  { key: 'revision-packs', label: 'Revision Packs' },
];

export function competencyGrowth(domain: CompetencyDomain): number {
  return domain.current - domain.previous;
}

export function readinessTone(score: number): {
  label: string;
  color: string;
  ring: string;
} {
  if (score >= 80) {
    return { label: 'Strong readiness', color: 'text-emerald-600', ring: '#10B981' };
  }
  if (score >= 60) {
    return { label: 'Moderate readiness', color: 'text-amber-600', ring: '#F59E0B' };
  }
  return { label: 'Needs focus', color: 'text-red-600', ring: '#EF4444' };
}

export function heatmapColor(level: number): string {
  if (level === 0) return 'bg-gray-100';
  if (level === 1) return 'bg-blue-100';
  if (level === 2) return 'bg-blue-200';
  if (level === 3) return 'bg-blue-400';
  return 'bg-blue-600';
}
