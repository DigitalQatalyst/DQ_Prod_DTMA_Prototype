import type { Course } from '@/hooks/useCourses';

export type CourseHubStatus =
  | 'published'
  | 'draft'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'archived';

export type PipelineStage = 'draft' | 'review' | 'approved' | 'published' | 'archived';

export type CourseFilterTab =
  | 'all'
  | 'published'
  | 'draft'
  | 'under_review'
  | 'archived';

export type SortKey =
  | 'recent'
  | 'enrolled'
  | 'rating'
  | 'alphabetical';

export interface HubCourseItem {
  id: string;
  title: string;
  category: string;
  status: CourseHubStatus;
  pipelineStage: PipelineStage;
  thumbnailUrl: string;
  enrollments: number;
  completionRate: number;
  rating: number;
  lastUpdated: string;
  lastUpdatedLabel: string;
  revenue?: number;
  growth?: string;
  createdAt: string;
  level: string;
  price: number;
  lessonCount: number;
  reviewFeedback?: string | null;
}

export interface CourseMetric {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  trend?: string;
  trendUp?: boolean;
  icon: string;
  iconClass: string;
  valueClass?: string;
}

export interface CourseActivity {
  id: string;
  message: string;
  timestamp: string;
  courseId: string;
}

export interface PerformanceRow {
  id: string;
  title: string;
  learners: number;
  completion: number;
  rating: number;
  revenue?: number;
  growth: string;
}

export interface OnboardingStep {
  id: string;
  label: string;
  completed: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  'digital-economy': 'Digital Economy',
  'digital-cognitive-organisation': 'Digital Cognitive Organisation',
  'digital-business-platform': 'Digital Business Platform',
  'digital-transformation': 'Digital Transformation',
  'digital-worker-workspace': 'Digital Worker & Workspace',
  'digital-accelerators': 'Digital Accelerators',
};

const DEMO_COURSES: HubCourseItem[] = [
  {
    id: 'course-economy-40',
    title: 'Mastering Economy 4.0',
    category: CATEGORY_LABELS['digital-economy'],
    status: 'published',
    pipelineStage: 'published',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    enrollments: 125,
    completionRate: 82,
    rating: 4.8,
    lastUpdated: '2026-06-16',
    lastUpdatedLabel: '2 days ago',
    revenue: 3125,
    growth: '+12%',
    createdAt: '2026-01-10',
    level: 'beginner',
    price: 149,
    lessonCount: 20,
  },
  {
    id: 'course-cognitive-org',
    title: 'Decoding Digital Cognitive Organisations',
    category: CATEGORY_LABELS['digital-cognitive-organisation'],
    status: 'published',
    pipelineStage: 'published',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    enrollments: 89,
    completionRate: 74,
    rating: 4.9,
    lastUpdated: '2026-06-14',
    lastUpdatedLabel: '4 days ago',
    revenue: 2225,
    growth: '+8%',
    createdAt: '2026-02-05',
    level: 'intermediate',
    price: 149,
    lessonCount: 24,
  },
  {
    id: 'course-business-platforms',
    title: 'Building Powerful Digital Business Platforms',
    category: CATEGORY_LABELS['digital-business-platform'],
    status: 'draft',
    pipelineStage: 'draft',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    enrollments: 0,
    completionRate: 0,
    rating: 0,
    lastUpdated: '2026-06-18',
    lastUpdatedLabel: 'Today',
    createdAt: '2026-06-01',
    level: 'intermediate',
    price: 149,
    lessonCount: 8,
  },
  {
    id: 'course-transformation',
    title: 'Navigating Digital Transformation 2.0',
    category: CATEGORY_LABELS['digital-transformation'],
    status: 'under_review',
    pipelineStage: 'review',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop',
    enrollments: 0,
    completionRate: 0,
    rating: 0,
    lastUpdated: '2026-06-12',
    lastUpdatedLabel: '6 days ago',
    createdAt: '2026-05-20',
    level: 'advanced',
    price: 149,
    lessonCount: 16,
    reviewFeedback: 'Submitted for marketplace review.',
  },
  {
    id: 'course-digital-workers',
    title: 'Optimizing Digital Workers and Workspaces',
    category: CATEGORY_LABELS['digital-worker-workspace'],
    status: 'approved',
    pipelineStage: 'approved',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    enrollments: 12,
    completionRate: 45,
    rating: 4.6,
    lastUpdated: '2026-06-10',
    lastUpdatedLabel: '1 week ago',
    createdAt: '2026-04-15',
    level: 'beginner',
    price: 149,
    lessonCount: 18,
  },
  {
    id: 'course-digital-accelerators',
    title: 'Leveraging Digital Accelerators for Growth',
    category: CATEGORY_LABELS['digital-accelerators'],
    status: 'archived',
    pipelineStage: 'archived',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    enrollments: 34,
    completionRate: 68,
    rating: 4.9,
    lastUpdated: '2026-03-01',
    lastUpdatedLabel: '3 months ago',
    createdAt: '2025-11-01',
    level: 'advanced',
    price: 149,
    lessonCount: 22,
  },
];

const DEMO_ACTIVITY: CourseActivity[] = [
  {
    id: 'a1',
    message: 'Course Mastering Economy 4.0 published',
    timestamp: '2 hours ago',
    courseId: 'course-economy-40',
  },
  {
    id: 'a2',
    message: 'Decoding Digital Cognitive Organisations updated',
    timestamp: '5 hours ago',
    courseId: 'course-cognitive-org',
  },
  {
    id: 'a3',
    message: 'Assessment added to Building Powerful Digital Business Platforms',
    timestamp: '1 day ago',
    courseId: 'course-business-platforms',
  },
  {
    id: 'a4',
    message: 'Course review approved for Navigating Digital Transformation 2.0',
    timestamp: '2 days ago',
    courseId: 'course-transformation',
  },
  {
    id: 'a5',
    message: 'Optimizing Digital Workers and Workspaces submitted for review',
    timestamp: '3 days ago',
    courseId: 'course-digital-workers',
  },
];

function formatCategory(slug: string): string {
  return CATEGORY_LABELS[slug] ?? slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function relativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

function mapStatus(status: Course['status']): CourseHubStatus {
  return status;
}

function mapPipeline(status: Course['status']): PipelineStage {
  if (status === 'under_review') return 'review';
  if (status === 'published') return 'published';
  if (status === 'archived') return 'archived';
  return 'draft';
}

export function mapCourseToHubItem(course: Course): HubCourseItem {
  const enrollments = course._count?.enrollments ?? 0;
  return {
    id: course.id,
    title: course.title,
    category: formatCategory(course.category),
    status: mapStatus(course.status),
    pipelineStage: mapPipeline(course.status),
    thumbnailUrl:
      course.image_url ||
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    enrollments,
    completionRate: enrollments > 0 ? Math.min(95, 40 + enrollments) : 0,
    rating: course._avg?.rating ?? 0,
    lastUpdated: course.updated_at,
    lastUpdatedLabel: relativeDate(course.updated_at),
    createdAt: course.created_at,
    level: course.level,
    price: course.price,
    lessonCount: course._count?.lessons ?? 0,
    reviewFeedback: course.review_feedback,
    growth: enrollments > 0 ? `+${Math.min(20, enrollments % 15)}%` : undefined,
    revenue: enrollments > 0 ? enrollments * (course.price || 25) : undefined,
  };
}

interface BuildParams {
  courses: Course[] | undefined;
  publishedCount: number;
  underReviewCount: number;
  draftCount: number;
  totalEnrollments: number;
  averageRating: number;
  isVerificationPending: boolean;
  hasCredentials?: boolean;
}

export function buildCoursesHubSnapshot(params: BuildParams) {
  const realItems = (params.courses ?? []).map(mapCourseToHubItem);
  const useDemo = realItems.length === 0;
  const items = useDemo ? DEMO_COURSES : realItems;

  const pipelineCounts: Record<PipelineStage, number> = {
    draft: items.filter((c) => c.pipelineStage === 'draft').length,
    review: items.filter((c) => c.pipelineStage === 'review').length,
    approved: items.filter((c) => c.pipelineStage === 'approved').length,
    published: items.filter((c) => c.pipelineStage === 'published').length,
    archived: items.filter((c) => c.pipelineStage === 'archived').length,
  };

  const metrics: CourseMetric[] = [
    {
      id: 'total',
      label: 'Total Courses',
      value: String(useDemo ? 12 : items.length),
      trend: '+2 this month',
      trendUp: true,
      icon: 'book',
      iconClass: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'published',
      label: 'Published',
      value: String(useDemo ? 8 : params.publishedCount),
      subtext: 'Currently available',
      icon: 'check',
      iconClass: 'bg-emerald-50 text-emerald-600',
      valueClass: 'text-emerald-600',
    },
    {
      id: 'review',
      label: 'Under Review',
      value: String(useDemo ? 2 : params.underReviewCount),
      subtext: 'Awaiting approval',
      icon: 'clock',
      iconClass: 'bg-amber-50 text-amber-600',
      valueClass: 'text-amber-600',
    },
    {
      id: 'drafts',
      label: 'Drafts',
      value: String(useDemo ? 2 : params.draftCount),
      subtext: 'Work in progress',
      icon: 'edit',
      iconClass: 'bg-gray-100 text-gray-600',
      valueClass: 'text-gray-600',
    },
    {
      id: 'learners',
      label: 'Total Learners',
      value: String(useDemo ? 248 : params.totalEnrollments),
      subtext: 'Across all courses',
      icon: 'users',
      iconClass: 'bg-orange-50 text-dq-orange',
    },
    {
      id: 'rating',
      label: 'Average Rating',
      value: useDemo ? '4.8 ★' : params.averageRating > 0 ? `${params.averageRating.toFixed(1)} ★` : '—',
      subtext: 'Course satisfaction',
      icon: 'star',
      iconClass: 'bg-amber-50 text-amber-600',
    },
  ];

  const performance: PerformanceRow[] = [...items]
    .filter((c) => c.status === 'published' || c.enrollments > 0)
    .sort((a, b) => b.enrollments - a.enrollments)
    .slice(0, 5)
    .map((c) => ({
      id: c.id,
      title: c.title,
      learners: c.enrollments,
      completion: c.completionRate,
      rating: c.rating,
      revenue: c.revenue,
      growth: c.growth ?? '+0%',
    }));

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'verify',
      label: 'Complete Verification',
      completed: !params.isVerificationPending && Boolean(params.hasCredentials),
    },
    { id: 'create', label: 'Create Course', completed: !useDemo },
    { id: 'modules', label: 'Add Modules', completed: items.some((c) => c.lessonCount > 0) },
    { id: 'publish', label: 'Publish Course', completed: params.publishedCount > 0 },
    { id: 'enroll', label: 'Enroll Learners', completed: params.totalEnrollments > 0 },
  ];

  return {
    items,
    useDemo,
    metrics,
    pipelineCounts,
    activity: DEMO_ACTIVITY,
    performance,
    onboardingSteps,
    isEmpty: realItems.length === 0,
  };
}

export function statusBadgeClass(status: CourseHubStatus): string {
  switch (status) {
    case 'published':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'draft':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'under_review':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'approved':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'archived':
      return 'bg-gray-100 text-gray-500 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

export function filterTabToStatus(tab: CourseFilterTab): CourseHubStatus | null {
  if (tab === 'all') return null;
  if (tab === 'under_review') return 'under_review';
  return tab;
}

export const PIPELINE_STAGES: { key: PipelineStage; label: string }[] = [
  { key: 'draft', label: 'Draft' },
  { key: 'review', label: 'Review' },
  { key: 'approved', label: 'Approved' },
  { key: 'published', label: 'Published' },
  { key: 'archived', label: 'Archived' },
];

export const FILTER_TABS: { key: CourseFilterTab; label: string }[] = [
  { key: 'all', label: 'All Courses' },
  { key: 'published', label: 'Published' },
  { key: 'draft', label: 'Drafts' },
  { key: 'under_review', label: 'Under Review' },
  { key: 'archived', label: 'Archived' },
];

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'recent', label: 'Most Recent' },
  { key: 'enrolled', label: 'Most Enrolled' },
  { key: 'rating', label: 'Highest Rated' },
  { key: 'alphabetical', label: 'Alphabetical' },
];

export const AI_COURSE_ACTIONS = [
  'Optimize Course',
  'Generate Assessment',
  'Improve Learning Outcomes',
  'Suggest New Modules',
  'Analyze Engagement',
  'Generate Marketplace Description',
];
