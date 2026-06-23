import type { Course } from '@/hooks/useCourses';

export type ReviewSentiment = 'positive' | 'neutral' | 'negative';
export type ReviewResponseStatus = 'pending' | 'addressed' | 'draft' | 'none';
export type ReviewFilterTab =
  | 'all'
  | 'positive'
  | 'neutral'
  | 'negative'
  | 'unanswered'
  | 'recent'
  | 'highest'
  | 'lowest';
export type ReviewSortKey = 'recent' | 'highest' | 'lowest' | 'priority';
export type TimelineRange = '7d' | '30d' | '90d' | '12m' | 'all';
export type ImprovementPriority = 'high' | 'medium' | 'low';
export type ResponsePriority = 'high' | 'medium' | 'low';

export interface ReputationMetric {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  trend?: string;
  trendUp?: boolean;
  icon: string;
  iconClass: string;
}

export interface RatingDistributionRow {
  stars: number;
  percent: number;
  count: number;
}

export interface LearnerReview {
  id: string;
  learnerName: string;
  courseId: string;
  courseName: string;
  rating: number;
  text: string;
  dateLabel: string;
  sentiment: ReviewSentiment;
  responseStatus: ReviewResponseStatus;
  priority?: ResponsePriority;
  aiDraft?: string;
}

export interface AIReputationInsight {
  praisedTopics: string[];
  improvementRequests: string[];
  suggestedAction: string;
  expectedImpact: string;
}

export interface CourseReputationRow {
  id: string;
  courseName: string;
  rating: number;
  reviewCount: number;
  sentimentScore: number;
  responseRate: number;
  trend: 'up' | 'down' | 'flat';
}

export interface TimelinePoint {
  label: string;
  averageRating: number;
  reviewVolume: number;
  sentiment: number;
  responseRate: number;
  marketplaceRank: number;
}

export interface ReputationContributor {
  id: string;
  label: string;
  score: number;
  weight: number;
}

export interface ImprovementRecommendation {
  id: string;
  priority: ImprovementPriority;
  title: string;
  recommendation: string;
  potentialImpact: string;
}

export interface MarketplaceBadge {
  id: string;
  label: string;
}

export interface MarketplacePreviewData {
  instructorRating: number;
  reviewCount: number;
  topStrengths: string[];
  popularCourses: string[];
  badges: MarketplaceBadge[];
  marketplaceRank: number;
  rankLabel: string;
}

export interface ReputationOnboardingTip {
  id: string;
  text: string;
}

export interface ReputationSnapshot {
  isEmpty: boolean;
  useDemo: boolean;
  metrics: ReputationMetric[];
  distribution: RatingDistributionRow[];
  reviews: LearnerReview[];
  aiInsights: AIReputationInsight;
  courseBreakdown: CourseReputationRow[];
  timeline: Record<TimelineRange, TimelinePoint[]>;
  scorecard: {
    overall: number;
    contributors: ReputationContributor[];
  };
  improvements: ImprovementRecommendation[];
  marketplace: MarketplacePreviewData;
  onboardingTips: ReputationOnboardingTip[];
  pendingResponses: LearnerReview[];
}

const DEMO_REVIEWS: LearnerReview[] = [
  {
    id: 'rev-1',
    learnerName: 'Sarah W.',
    courseId: 'course-economy-40',
    courseName: 'Mastering Economy 4.0',
    rating: 5,
    text: 'Excellent explanations and practical examples. The module structure made complex ideas easy to apply at work.',
    dateLabel: '2 days ago',
    sentiment: 'positive',
    responseStatus: 'pending',
    priority: 'high',
    aiDraft:
      'Thank you for your feedback. I am glad the practical examples helped reinforce the concepts. I appreciate your support and look forward to helping you in future courses.',
  },
  {
    id: 'rev-2',
    learnerName: 'James O.',
    courseId: 'course-cognitive-org',
    courseName: 'Decoding Digital Cognitive Organisations',
    rating: 5,
    text: 'Clear explanations and strong course structure. Would love more case studies in the later modules.',
    dateLabel: '4 days ago',
    sentiment: 'positive',
    responseStatus: 'addressed',
  },
  {
    id: 'rev-3',
    learnerName: 'Amina K.',
    courseId: 'course-transformation',
    courseName: 'Navigating Digital Transformation 2.0',
    rating: 4,
    text: 'Solid content overall. Additional assessments would help validate understanding before moving on.',
    dateLabel: '1 week ago',
    sentiment: 'neutral',
    responseStatus: 'pending',
    priority: 'medium',
    aiDraft:
      'Thank you for the thoughtful review. I am adding module-level quizzes to strengthen practice opportunities in the next release.',
  },
  {
    id: 'rev-4',
    learnerName: 'David L.',
    courseId: 'course-business-platforms',
    courseName: 'Building Powerful Digital Business Platforms',
    rating: 5,
    text: 'One of the best transformation courses I have taken. Practical platform design patterns throughout.',
    dateLabel: '1 week ago',
    sentiment: 'positive',
    responseStatus: 'addressed',
  },
  {
    id: 'rev-5',
    learnerName: 'Priya M.',
    courseId: 'course-digital-workers',
    courseName: 'Empowering the Digital Worker and Workspace',
    rating: 3,
    text: 'Good foundation but wanted longer hands-on exercises for workspace tooling scenarios.',
    dateLabel: '2 weeks ago',
    sentiment: 'negative',
    responseStatus: 'pending',
    priority: 'high',
    aiDraft:
      'Thank you for sharing this feedback. I am expanding hands-on activities in Module 4 to give learners more practice with workspace scenarios.',
  },
  {
    id: 'rev-6',
    learnerName: 'Tom R.',
    courseId: 'course-economy-40',
    courseName: 'Mastering Economy 4.0',
    rating: 5,
    text: 'Engaging delivery and relevant to our digital strategy programme. Highly recommended.',
    dateLabel: '2 weeks ago',
    sentiment: 'positive',
    responseStatus: 'addressed',
  },
];

const DEMO_DISTRIBUTION: RatingDistributionRow[] = [
  { stars: 5, percent: 68, count: 233 },
  { stars: 4, percent: 21, count: 72 },
  { stars: 3, percent: 8, count: 27 },
  { stars: 2, percent: 2, count: 7 },
  { stars: 1, percent: 1, count: 3 },
];

const DEMO_METRICS: ReputationMetric[] = [
  {
    id: 'avg-rating',
    label: 'Average Rating',
    value: '4.8 ★',
    trend: '+0.2 this month',
    trendUp: true,
    icon: 'star',
    iconClass: 'bg-amber-50 text-amber-600',
  },
  {
    id: 'total-reviews',
    label: 'Total Reviews',
    value: '342',
    subtext: 'Across all courses',
    icon: 'message',
    iconClass: 'bg-orange-50 text-dq-orange',
  },
  {
    id: 'response-rate',
    label: 'Response Rate',
    value: '92%',
    subtext: 'Last 30 days',
    trend: '+4% vs prior month',
    trendUp: true,
    icon: 'reply',
    iconClass: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'satisfaction',
    label: 'Learner Satisfaction',
    value: '94%',
    subtext: 'Positive sentiment',
    icon: 'smile',
    iconClass: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'reputation-score',
    label: 'Reputation Score',
    value: '89 / 100',
    subtext: 'Marketplace reputation',
    icon: 'award',
    iconClass: 'bg-violet-50 text-violet-600',
  },
  {
    id: 'review-growth',
    label: 'Review Growth',
    value: '+18%',
    subtext: 'Compared to previous month',
    trendUp: true,
    icon: 'trending',
    iconClass: 'bg-teal-50 text-teal-600',
  },
];

const TIMELINE_30D: TimelinePoint[] = [
  { label: 'W1', averageRating: 4.6, reviewVolume: 18, sentiment: 91, responseRate: 88, marketplaceRank: 24 },
  { label: 'W2', averageRating: 4.7, reviewVolume: 22, sentiment: 92, responseRate: 89, marketplaceRank: 22 },
  { label: 'W3', averageRating: 4.7, reviewVolume: 28, sentiment: 93, responseRate: 90, marketplaceRank: 20 },
  { label: 'W4', averageRating: 4.8, reviewVolume: 34, sentiment: 94, responseRate: 92, marketplaceRank: 18 },
];

function buildTimeline(range: TimelineRange): TimelinePoint[] {
  const multipliers: Record<TimelineRange, number> = {
    '7d': 0.25,
    '30d': 1,
    '90d': 2.5,
    '12m': 8,
    all: 12,
  };
  const m = multipliers[range];
  return TIMELINE_30D.map((p, i) => ({
    ...p,
    label: range === '12m' || range === 'all' ? `M${i + 1}` : p.label,
    reviewVolume: Math.round(p.reviewVolume * m * (0.9 + i * 0.05)),
    marketplaceRank: Math.max(8, p.marketplaceRank - Math.floor(m)),
  }));
}

interface BuildParams {
  courses: Course[] | undefined;
  publishedCount: number;
  averageRating: number;
}

export function buildReputationSnapshot(params: BuildParams): ReputationSnapshot {
  const useDemo = (params.courses ?? []).length === 0;

  if (useDemo) {
    const pendingResponses = DEMO_REVIEWS.filter((r) => r.responseStatus === 'pending');

    return {
      isEmpty: false,
      useDemo: true,
      metrics: DEMO_METRICS,
      distribution: DEMO_DISTRIBUTION,
      reviews: DEMO_REVIEWS,
      aiInsights: {
        praisedTopics: ['Practical examples', 'Clear explanations', 'Course structure'],
        improvementRequests: [
          'More assessments',
          'Additional case studies',
          'Longer practical exercises',
        ],
        suggestedAction: 'Add hands-on activities to Module 4.',
        expectedImpact: '+8% satisfaction score',
      },
      courseBreakdown: [
        {
          id: 'course-economy-40',
          courseName: 'Mastering Economy 4.0',
          rating: 4.9,
          reviewCount: 128,
          sentimentScore: 96,
          responseRate: 100,
          trend: 'up',
        },
        {
          id: 'course-transformation',
          courseName: 'Navigating Digital Transformation 2.0',
          rating: 4.6,
          reviewCount: 84,
          sentimentScore: 88,
          responseRate: 82,
          trend: 'down',
        },
        {
          id: 'course-cognitive-org',
          courseName: 'Decoding Digital Cognitive Organisations',
          rating: 4.8,
          reviewCount: 62,
          sentimentScore: 93,
          responseRate: 95,
          trend: 'up',
        },
        {
          id: 'course-business-platforms',
          courseName: 'Building Powerful Digital Business Platforms',
          rating: 4.7,
          reviewCount: 48,
          sentimentScore: 91,
          responseRate: 88,
          trend: 'flat',
        },
      ],
      timeline: {
        '7d': buildTimeline('7d'),
        '30d': buildTimeline('30d'),
        '90d': buildTimeline('90d'),
        '12m': buildTimeline('12m'),
        all: buildTimeline('all'),
      },
      scorecard: {
        overall: 89,
        contributors: [
          { id: 'ratings', label: 'Course Ratings', score: 92, weight: 25 },
          { id: 'volume', label: 'Review Volume', score: 85, weight: 15 },
          { id: 'response', label: 'Response Rate', score: 92, weight: 15 },
          { id: 'satisfaction', label: 'Learner Satisfaction', score: 94, weight: 15 },
          { id: 'completion', label: 'Course Completion', score: 78, weight: 10 },
          { id: 'engagement', label: 'Engagement Quality', score: 86, weight: 10 },
          { id: 'certification', label: 'Certification Success', score: 81, weight: 10 },
        ],
      },
      improvements: [
        {
          id: 'imp-1',
          priority: 'high',
          title: 'Assessment feedback mentions insufficient practice activities.',
          recommendation: 'Add module-level quizzes.',
          potentialImpact: '+12% satisfaction',
        },
        {
          id: 'imp-2',
          priority: 'medium',
          title: 'Response rate below marketplace average on one course.',
          recommendation: 'Respond to reviews within 48 hours.',
          potentialImpact: '+5% response rate',
        },
        {
          id: 'imp-3',
          priority: 'low',
          title: 'Learners request more case studies in advanced modules.',
          recommendation: 'Add two industry case studies to Module 3.',
          potentialImpact: '+4% sentiment score',
        },
      ],
      marketplace: {
        instructorRating: 4.8,
        reviewCount: 342,
        topStrengths: ['Practical examples', 'Clear instruction', 'Structured pathways'],
        popularCourses: [
          'Mastering Economy 4.0',
          'Decoding Digital Cognitive Organisations',
          'Navigating Digital Transformation 2.0',
        ],
        badges: [
          { id: 'b1', label: 'Top Rated Instructor' },
          { id: 'b2', label: 'Fast Responder' },
          { id: 'b3', label: 'Transformation Expert' },
        ],
        marketplaceRank: 18,
        rankLabel: '#18 in Digital Transformation',
      },
      onboardingTips: ONBOARDING_TIPS,
      pendingResponses,
    };
  }

  const emptyMetrics: ReputationMetric[] = [
      {
        id: 'avg-rating',
        label: 'Average Rating',
        value: params.averageRating > 0 ? `${params.averageRating.toFixed(1)} ★` : '0.0',
        subtext: 'Across all courses',
        icon: 'star',
        iconClass: 'bg-amber-50 text-amber-600',
      },
      {
        id: 'total-reviews',
        label: 'Total Reviews',
        value: '0',
        subtext: 'Across all courses',
        icon: 'message',
        iconClass: 'bg-orange-50 text-dq-orange',
      },
      {
        id: 'response-rate',
        label: 'Response Rate',
        value: '0%',
        subtext: 'Last 30 days',
        icon: 'reply',
        iconClass: 'bg-emerald-50 text-emerald-600',
      },
      {
        id: 'satisfaction',
        label: 'Learner Satisfaction',
        value: '—',
        subtext: 'Positive sentiment',
        icon: 'smile',
        iconClass: 'bg-blue-50 text-blue-600',
      },
      {
        id: 'reputation-score',
        label: 'Reputation Score',
        value: '—',
        subtext: 'Marketplace reputation',
        icon: 'award',
        iconClass: 'bg-violet-50 text-violet-600',
      },
      {
        id: 'review-growth',
        label: 'Review Growth',
        value: '—',
        subtext: 'Compared to previous month',
        icon: 'trending',
        iconClass: 'bg-gray-100 text-gray-500',
      },
    ];

  return {
    isEmpty: true,
    useDemo: false,
    metrics: emptyMetrics,
    distribution: [],
    reviews: [],
    aiInsights: {
      praisedTopics: [],
      improvementRequests: [],
      suggestedAction: '',
      expectedImpact: '',
    },
    courseBreakdown: [],
    timeline: {
      '7d': [],
      '30d': [],
      '90d': [],
      '12m': [],
      all: [],
    },
    scorecard: { overall: 0, contributors: [] },
    improvements: [],
    marketplace: {
      instructorRating: params.averageRating,
      reviewCount: 0,
      topStrengths: [],
      popularCourses: (params.courses ?? [])
        .filter((c) => c.status === 'published')
        .slice(0, 3)
        .map((c) => c.title),
      badges: [],
      marketplaceRank: 0,
      rankLabel: 'Not ranked yet',
    },
    onboardingTips: ONBOARDING_TIPS,
    pendingResponses: [],
  };
}

const ONBOARDING_TIPS: ReputationOnboardingTip[] = [
  { id: 't1', text: 'Publish engaging courses' },
  { id: 't2', text: 'Provide timely learner support' },
  { id: 't3', text: 'Use assessments and activities' },
  { id: 't4', text: 'Encourage course completion' },
  { id: 't5', text: 'Request learner feedback' },
];

export function filterReviews(
  reviews: LearnerReview[],
  tab: ReviewFilterTab,
  search: string,
): LearnerReview[] {
  const q = search.trim().toLowerCase();
  let list = [...reviews];

  if (q) {
    list = list.filter(
      (r) =>
        r.learnerName.toLowerCase().includes(q) ||
        r.courseName.toLowerCase().includes(q) ||
        r.text.toLowerCase().includes(q),
    );
  }

  switch (tab) {
    case 'positive':
      return list.filter((r) => r.sentiment === 'positive');
    case 'neutral':
      return list.filter((r) => r.sentiment === 'neutral');
    case 'negative':
      return list.filter((r) => r.sentiment === 'negative');
    case 'unanswered':
      return list.filter((r) => r.responseStatus === 'pending');
    case 'highest':
      return [...list].sort((a, b) => b.rating - a.rating);
    case 'lowest':
      return [...list].sort((a, b) => a.rating - b.rating);
    case 'recent':
    case 'all':
    default:
      return list;
  }
}

export function sortCourseBreakdown(
  rows: CourseReputationRow[],
  key: 'rating' | 'reviews' | 'sentiment' | 'response',
  asc: boolean,
): CourseReputationRow[] {
  const sorted = [...rows].sort((a, b) => {
    switch (key) {
      case 'rating':
        return a.rating - b.rating;
      case 'reviews':
        return a.reviewCount - b.reviewCount;
      case 'sentiment':
        return a.sentimentScore - b.sentimentScore;
      case 'response':
        return a.responseRate - b.responseRate;
      default:
        return 0;
    }
  });
  return asc ? sorted : sorted.reverse();
}

const PAGE_SIZE = 4;

export function paginateReviews<T>(items: T[], page: number): { items: T[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  return { items: items.slice(start, start + PAGE_SIZE), totalPages };
}
