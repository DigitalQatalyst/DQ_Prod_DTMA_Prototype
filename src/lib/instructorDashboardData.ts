import type { InstructorTabId } from '@/components/dashboard/InstructorDashboardSidebar';

export type ActionPriority = 'high' | 'medium' | 'low';

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  trend?: string;
  trendUp?: boolean;
  icon: string;
  iconClass: string;
}

export interface AttentionItem {
  id: string;
  label: string;
  count: number;
  priority: ActionPriority;
  tab: InstructorTabId;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  tab: InstructorTabId;
}

export interface CoursePerformanceRow {
  id: string;
  name: string;
  learners: number;
  completionRate: number;
  rating: number;
  status: 'published' | 'draft' | 'under_review' | 'archived';
}

export interface UpcomingSession {
  id: string;
  name: string;
  dateLabel: string;
  time: string;
  status: 'scheduled' | 'live-soon' | 'draft';
  countdown?: string;
}

export interface LearnerActivityEvent {
  id: string;
  message: string;
  timestamp: string;
  type: 'completion' | 'submission' | 'certificate' | 'enrollment' | 'discussion';
}

export interface EngagementMetric {
  id: string;
  label: string;
  value: string;
  trend?: number[];
}

export interface ContentPerformanceRow {
  id: string;
  lesson: string;
  views: number;
  completionRate: number;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  category: 'release' | 'tool' | 'feature' | 'policy';
  read: boolean;
}

export interface OnboardingStep {
  id: string;
  label: string;
  completed: boolean;
}

export interface InstructorDashboardSnapshot {
  isEmpty: boolean;
  showOnboardingOnly: boolean;
  monetizationEnabled: boolean;
  verification: {
    pending: boolean;
    progress: number;
    estimatedReview: string;
  };
  metrics: DashboardMetric[];
  attentionItems: AttentionItem[];
  quickActions: QuickAction[];
  courses: CoursePerformanceRow[];
  sessions: UpcomingSession[];
  activity: LearnerActivityEvent[];
  engagement: EngagementMetric[];
  engagementCharts: {
    weeklyActive: { label: string; value: number }[];
    assignmentCompletion: { label: string; value: number }[];
    attendance: { label: string; value: number }[];
  };
  contentPerformance: ContentPerformanceRow[];
  announcements: Announcement[];
  onboardingSteps: OnboardingStep[];
}

const DEMO_METRICS: DashboardMetric[] = [
  {
    id: 'learners',
    label: 'Total Learners',
    value: '248',
    trend: '+12% this month',
    trendUp: true,
    icon: 'users',
    iconClass: 'bg-orange-50 text-dq-orange',
  },
  {
    id: 'courses',
    label: 'Active Courses',
    value: '6',
    subtext: '4 Published · 2 Drafts',
    icon: 'book',
    iconClass: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'sessions',
    label: 'Upcoming Sessions',
    value: '3',
    subtext: 'Next session tomorrow',
    icon: 'calendar',
    iconClass: 'bg-amber-50 text-amber-600',
  },
  {
    id: 'completion',
    label: 'Completion Rate',
    value: '78%',
    trend: '+5% this month',
    trendUp: true,
    icon: 'target',
    iconClass: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'rating',
    label: 'Average Rating',
    value: '4.8 ★',
    icon: 'star',
    iconClass: 'bg-amber-50 text-amber-600',
  },
  {
    id: 'revenue',
    label: 'Revenue',
    value: '$2,430',
    trend: '+8% this month',
    trendUp: true,
    icon: 'trending',
    iconClass: 'bg-emerald-50 text-emerald-600',
  },
];

const DEMO_ATTENTION: AttentionItem[] = [
  { id: 'a1', label: 'assignments awaiting grading', count: 12, priority: 'high', tab: 'learners' },
  { id: 'a2', label: 'learner questions unanswered', count: 5, priority: 'high', tab: 'learners' },
  { id: 'a3', label: 'draft courses ready for publishing', count: 2, priority: 'medium', tab: 'course-builder' },
  { id: 'a4', label: 'session recordings pending upload', count: 3, priority: 'medium', tab: 'courses' },
];

const DEMO_QUICK_ACTIONS: QuickAction[] = [
  { id: 'q1', title: 'Create Course', description: 'Build a new course', icon: 'plus', tab: 'course-builder' },
  { id: 'q2', title: 'Schedule Session', description: 'Create a live learning session', icon: 'calendar', tab: 'courses' },
  { id: 'q3', title: 'View Learners', description: 'Manage learner progress', icon: 'users', tab: 'learners' },
  { id: 'q4', title: 'Upload Content', description: 'Add lessons and resources', icon: 'upload', tab: 'course-builder' },
  { id: 'q5', title: 'Analytics', description: 'View performance reports', icon: 'chart', tab: 'reviews' },
  { id: 'q6', title: 'Certificates', description: 'Manage certifications', icon: 'award', tab: 'profile' },
];

const DEMO_COURSES: CoursePerformanceRow[] = [
  { id: 'c1', name: 'AI Fundamentals', learners: 125, completionRate: 82, rating: 4.9, status: 'published' },
  { id: 'c2', name: 'Digital Transformation', learners: 89, completionRate: 74, rating: 4.7, status: 'published' },
  { id: 'c3', name: 'Data Strategy', learners: 34, completionRate: 61, rating: 4.8, status: 'draft' },
];

const DEMO_SESSIONS: UpcomingSession[] = [
  {
    id: 's1',
    name: 'AI Fundamentals Workshop',
    dateLabel: 'Tomorrow',
    time: '2:00 PM',
    status: 'scheduled',
    countdown: '18h 24m',
  },
  {
    id: 's2',
    name: 'Digital Leadership Q&A',
    dateLabel: 'Friday, Jun 26',
    time: '10:00 AM',
    status: 'scheduled',
    countdown: '3d 4h',
  },
  {
    id: 's3',
    name: 'Platform Economics Deep Dive',
    dateLabel: 'Monday, Jun 29',
    time: '3:30 PM',
    status: 'draft',
  },
];

const DEMO_ACTIVITY: LearnerActivityEvent[] = [
  { id: 'e1', message: 'Sarah completed Module 4', timestamp: '12 min ago', type: 'completion' },
  { id: 'e2', message: 'David submitted Assignment 2', timestamp: '45 min ago', type: 'submission' },
  { id: 'e3', message: 'Grace earned a certificate', timestamp: '2 hours ago', type: 'certificate' },
  { id: 'e4', message: 'Michael enrolled in AI Fundamentals', timestamp: '3 hours ago', type: 'enrollment' },
  { id: 'e5', message: 'Jane posted a discussion question', timestamp: '5 hours ago', type: 'discussion' },
];

const DEMO_ENGAGEMENT: EngagementMetric[] = [
  { id: 'eng1', label: 'Weekly Active Learners', value: '186', trend: [120, 140, 155, 168, 172, 180, 186] },
  { id: 'eng2', label: 'Assignment Submission Rate', value: '84%', trend: [72, 75, 78, 80, 82, 83, 84] },
  { id: 'eng3', label: 'Attendance Rate', value: '91%', trend: [85, 87, 88, 89, 90, 90, 91] },
  { id: 'eng4', label: 'Discussion Participation', value: '62%', trend: [48, 52, 55, 58, 60, 61, 62] },
  { id: 'eng5', label: 'Average Learning Time', value: '4.2h/wk', trend: [3.1, 3.4, 3.6, 3.8, 4.0, 4.1, 4.2] },
];

const DEMO_CHARTS = {
  weeklyActive: [
    { label: 'W1', value: 120 },
    { label: 'W2', value: 140 },
    { label: 'W3', value: 155 },
    { label: 'W4', value: 168 },
    { label: 'W5', value: 172 },
    { label: 'W6', value: 180 },
    { label: 'W7', value: 186 },
  ],
  assignmentCompletion: [
    { label: 'W1', value: 72 },
    { label: 'W2', value: 75 },
    { label: 'W3', value: 78 },
    { label: 'W4', value: 80 },
    { label: 'W5', value: 82 },
    { label: 'W6', value: 83 },
    { label: 'W7', value: 84 },
  ],
  attendance: [
    { label: 'W1', value: 85 },
    { label: 'W2', value: 87 },
    { label: 'W3', value: 88 },
    { label: 'W4', value: 89 },
    { label: 'W5', value: 90 },
    { label: 'W6', value: 90 },
    { label: 'W7', value: 91 },
  ],
};

const DEMO_CONTENT: ContentPerformanceRow[] = [
  { id: 'l1', lesson: 'Introduction to AI', views: 1240, completionRate: 92 },
  { id: 'l2', lesson: 'Machine Learning Basics', views: 1035, completionRate: 88 },
  { id: 'l3', lesson: 'AI Ethics', views: 876, completionRate: 84 },
];

const DEMO_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'n1',
    title: 'New AI Course Builder tools',
    body: 'Generate module outlines and assessments with the updated AI cockpit.',
    date: 'Jun 20, 2026',
    category: 'tool',
    read: false,
  },
  {
    id: 'n2',
    title: 'Platform release 2.4',
    body: 'Improved learner analytics and session scheduling are now live.',
    date: 'Jun 15, 2026',
    category: 'release',
    read: true,
  },
  {
    id: 'n3',
    title: 'Instructor verification policy update',
    body: 'Updated credential requirements for marketplace publishing.',
    date: 'Jun 10, 2026',
    category: 'policy',
    read: true,
  },
];

interface BuildParams {
  courseCount: number;
  publishedCount: number;
  draftCount: number;
  totalEnrollments: number;
  isVerificationPending: boolean;
  hasCredentials?: boolean;
}

export function buildInstructorDashboardSnapshot(
  params: BuildParams,
): InstructorDashboardSnapshot {
  const showOnboardingOnly =
    params.courseCount === 0 && params.totalEnrollments === 0;

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'verify',
      label: 'Complete verification',
      completed: !params.isVerificationPending && Boolean(params.hasCredentials),
    },
    { id: 'create', label: 'Create first course', completed: params.courseCount > 0 },
    { id: 'upload', label: 'Upload content', completed: params.courseCount > 0 },
    { id: 'publish', label: 'Publish course', completed: params.publishedCount > 0 },
    { id: 'invite', label: 'Invite learners', completed: params.totalEnrollments > 0 },
  ];

  const metrics = DEMO_METRICS.map((m) => {
    if (m.id === 'learners') {
      return {
        ...m,
        value: String(params.totalEnrollments || 248),
      };
    }
    if (m.id === 'courses') {
      return {
        ...m,
        value: String(params.courseCount || 6),
        subtext: `${params.publishedCount || 4} Published · ${params.draftCount || 2} Drafts`,
      };
    }
    return m;
  });

  return {
    isEmpty: showOnboardingOnly,
    showOnboardingOnly,
    monetizationEnabled: true,
    verification: {
      pending: params.isVerificationPending,
      progress: params.isVerificationPending ? 65 : 100,
      estimatedReview: '2–3 business days',
    },
    metrics,
    attentionItems: DEMO_ATTENTION,
    quickActions: DEMO_QUICK_ACTIONS,
    courses: DEMO_COURSES,
    sessions: DEMO_SESSIONS,
    activity: DEMO_ACTIVITY,
    engagement: DEMO_ENGAGEMENT,
    engagementCharts: DEMO_CHARTS,
    contentPerformance: DEMO_CONTENT,
    announcements: DEMO_ANNOUNCEMENTS,
    onboardingSteps,
  };
}

export function priorityStyles(priority: ActionPriority): string {
  if (priority === 'high') return 'border-red-200 bg-red-50 text-red-700';
  if (priority === 'medium') return 'border-amber-200 bg-amber-50 text-amber-800';
  return 'border-gray-200 bg-gray-50 text-gray-700';
}

export function statusBadgeClass(status: CoursePerformanceRow['status']): string {
  switch (status) {
    case 'published':
      return 'bg-emerald-100 text-emerald-800';
    case 'draft':
      return 'bg-gray-100 text-gray-700';
    case 'under_review':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}
