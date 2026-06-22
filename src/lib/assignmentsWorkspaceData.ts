export type AssignmentStatus = 'pending' | 'submitted' | 'graded' | 'overdue' | 'draft';

export type TimelineStage = 'assigned' | 'in_progress' | 'submitted' | 'reviewed' | 'graded';

export interface AssignmentRubric {
  label: string;
  score: number;
}

export interface AssignmentItem {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: AssignmentStatus;
  description: string;
  points: number;
  effortHours: number;
  submissionType: string;
  grade?: number;
  feedback?: string;
  rubric?: AssignmentRubric[];
  improvements?: string[];
  timelineStage: TimelineStage;
  readinessScore?: number;
}

function daysFromNow(days: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const ASSIGNMENT_KPIS = {
  active: { value: 8, trend: '+2 this week' },
  dueThisWeek: { value: 3 },
  averageGrade: { value: 88 },
  completionRate: { value: 76 },
};

export const PRIORITY_TASKS = [
  {
    id: 'p1',
    priority: 'due-tomorrow' as const,
    label: 'Due Tomorrow',
    assignmentId: '1',
    emoji: '🔥',
  },
  {
    id: 'p2',
    priority: 'feedback' as const,
    label: 'Feedback Available',
    assignmentId: '3',
    emoji: '⚠',
  },
  {
    id: 'p3',
    priority: 'high-impact' as const,
    label: 'High Impact',
    assignmentId: '2',
    emoji: '⭐',
  },
];

export const ASSIGNMENTS: AssignmentItem[] = [
  {
    id: '1',
    title: 'Digital Transformation Strategy Document',
    course: 'Introduction to Digital Economy & Economy 4.0',
    dueDate: daysFromNow(1),
    status: 'pending',
    description:
      'Create a comprehensive digital transformation strategy for a traditional retail business. Include current-state assessment, target operating model, and a phased roadmap.',
    points: 100,
    effortHours: 4,
    submissionType: 'Document Upload',
    timelineStage: 'in_progress',
    readinessScore: 78,
  },
  {
    id: '2',
    title: 'AI Implementation Case Study',
    course: 'AI-Powered Business Transformation',
    dueDate: daysFromNow(5),
    status: 'submitted',
    description: 'Analyze a real-world AI implementation and its business impact.',
    points: 80,
    effortHours: 3,
    submissionType: 'Document Upload',
    grade: 85,
    timelineStage: 'submitted',
  },
  {
    id: '3',
    title: 'Leadership Reflection Essay',
    course: 'Digital Leadership & Change Management',
    dueDate: daysFromNow(-5),
    status: 'graded',
    description:
      'Reflect on your leadership style and how it applies to digital transformation.',
    points: 50,
    effortHours: 2,
    submissionType: 'Essay Upload',
    grade: 92,
    feedback:
      'Excellent analysis of leadership principles. Strong practical examples and clear strategic thinking.',
    rubric: [
      { label: 'Research', score: 90 },
      { label: 'Analysis', score: 95 },
      { label: 'Structure', score: 88 },
      { label: 'Application', score: 94 },
    ],
    improvements: [
      'Add more industry-specific examples',
      'Strengthen conclusion section',
      'Reference additional frameworks',
    ],
    timelineStage: 'graded',
  },
  {
    id: '4',
    title: 'Platform Economics Analysis',
    course: 'Building Powerful Digital Business Platforms',
    dueDate: daysFromNow(3),
    status: 'pending',
    description: 'Evaluate platform business models in your industry context.',
    points: 75,
    effortHours: 3,
    submissionType: 'Document Upload',
    timelineStage: 'assigned',
    readinessScore: 65,
  },
  {
    id: '5',
    title: 'Governance Framework Draft',
    course: 'Navigating Digital Transformation 2.0',
    dueDate: daysFromNow(7),
    status: 'pending',
    description: 'Draft a transformation governance framework for enterprise rollout.',
    points: 90,
    effortHours: 5,
    submissionType: 'Document Upload',
    timelineStage: 'in_progress',
    readinessScore: 55,
  },
  {
    id: '6',
    title: 'Cognitive Org Maturity Assessment',
    course: 'Decoding Digital Cognitive Organisations',
    dueDate: daysFromNow(-2),
    status: 'submitted',
    description: 'Complete maturity assessment with evidence-based recommendations.',
    points: 70,
    effortHours: 2,
    submissionType: 'Quiz + Upload',
    timelineStage: 'reviewed',
  },
  {
    id: '7',
    title: 'Weekly Learning Reflection',
    course: 'Mastering Economy 4.0',
    dueDate: daysFromNow(14),
    status: 'draft',
    description: 'Short reflection on weekly learning outcomes and application.',
    points: 25,
    effortHours: 1,
    submissionType: 'Text Entry',
    timelineStage: 'assigned',
    readinessScore: 40,
  },
  {
    id: '8',
    title: 'Data Platform Readiness Brief',
    course: 'AI-Powered Business Transformation',
    dueDate: daysFromNow(10),
    status: 'graded',
    description: 'Assess data platform readiness for AI initiatives.',
    points: 60,
    effortHours: 3,
    submissionType: 'Document Upload',
    grade: 88,
    feedback: 'Strong technical analysis with clear recommendations.',
    rubric: [
      { label: 'Research', score: 85 },
      { label: 'Analysis', score: 90 },
      { label: 'Structure', score: 86 },
      { label: 'Application', score: 88 },
    ],
    timelineStage: 'graded',
  },
  {
    id: '9',
    title: 'Stakeholder Communication Plan',
    course: 'Digital Leadership & Change Management',
    dueDate: daysFromNow(-4),
    status: 'overdue',
    description: 'Draft a stakeholder communication plan for a transformation initiative.',
    points: 55,
    effortHours: 2,
    submissionType: 'Document Upload',
    timelineStage: 'in_progress',
    readinessScore: 45,
  },
];

export const SUBMISSION_TREND = [
  { label: 'W1', count: 1 },
  { label: 'W2', count: 2 },
  { label: 'W3', count: 1 },
  { label: 'W4', count: 3 },
  { label: 'W5', count: 2 },
];

export const GRADE_TREND = [
  { label: 'Jan', grade: 82 },
  { label: 'Feb', grade: 85 },
  { label: 'Mar', grade: 88 },
  { label: 'Apr', grade: 90 },
];

export const WORKLOAD_FORECAST = [
  { week: 'This week', level: 'Heavy' as const },
  { week: 'Next week', level: 'Moderate' as const },
  { week: 'Week 3', level: 'Light' as const },
];

export const READINESS_TIPS = [
  'Review Module 4',
  'Complete quiz retry',
  'Read case study',
];

export const STATUS_STYLES: Record<
  AssignmentStatus,
  { badge: string; label: string }
> = {
  pending: { badge: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Pending' },
  submitted: { badge: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Submitted' },
  graded: { badge: 'bg-green-100 text-green-800 border-green-200', label: 'Graded' },
  overdue: { badge: 'bg-red-100 text-red-800 border-red-200', label: 'Overdue' },
  draft: { badge: 'bg-gray-100 text-gray-700 border-gray-200', label: 'Draft' },
};

export const TIMELINE_STEPS: { key: TimelineStage; label: string }[] = [
  { key: 'assigned', label: 'Assigned' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'reviewed', label: 'Reviewed' },
  { key: 'graded', label: 'Graded' },
];

export function getStageIndex(stage: TimelineStage): number {
  return TIMELINE_STEPS.findIndex((s) => s.key === stage);
}

export function formatDueDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function countByStatus(status: AssignmentStatus | 'all', items: AssignmentItem[]) {
  if (status === 'all') return items.length;
  return items.filter((a) => a.status === status).length;
}

export function getAssignmentById(id: string) {
  return ASSIGNMENTS.find((a) => a.id === id);
}
