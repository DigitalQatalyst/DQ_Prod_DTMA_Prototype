import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  ClipboardCheck,
  DollarSign,
  LineChart,
  TrendingUp,
  Users,
} from 'lucide-react';

export type InstructorAgentId =
  | 'course-performance'
  | 'course-analytics'
  | 'revenue-insights'
  | 'learner-engagement'
  | 'assessment-insights';

export interface InstructorAgentDefinition {
  id: InstructorAgentId;
  name: string;
  description: string;
  icon: LucideIcon;
  suggestedPrompts: string[];
  lastUsed: string;
  status: 'online' | 'idle';
}

export interface InstructorCockpitContext {
  instructorName: string;
  courseCount: number;
  publishedCount: number;
  draftCount: number;
  totalEnrollments: number;
  upcomingSessions: number;
  averageRating: number;
  sparseData: boolean;
}

export interface InsightCardData {
  id: string;
  title: string;
  body: string;
  tone?: 'success' | 'info' | 'warning';
}

export interface RecommendationCardData {
  id: string;
  title: string;
  body: string;
  impact?: string;
}

export interface AlertCardData {
  id: string;
  title: string;
  body: string;
}

export interface MetricCardData {
  id: string;
  label: string;
  value: string;
}

export interface ChartData {
  id: string;
  title: string;
  type: 'line' | 'bar';
  data: { label: string; value: number }[];
}

export interface InstructorAgentResponse {
  title: string;
  summary?: string;
  insights?: InsightCardData[];
  recommendations?: RecommendationCardData[];
  alerts?: AlertCardData[];
  metrics?: MetricCardData[];
  charts?: ChartData[];
}

export const INSTRUCTOR_AGENTS: InstructorAgentDefinition[] = [
  {
    id: 'course-performance',
    name: 'Course Performance Agent',
    description:
      'Analyze course completion, ratings, retention, and learner outcomes.',
    icon: TrendingUp,
    suggestedPrompts: [
      'Why is course completion declining?',
      'Which course performs best?',
      'Recommend course improvements',
    ],
    lastUsed: '2 hours ago',
    status: 'online',
  },
  {
    id: 'course-analytics',
    name: 'Course Analytics Agent',
    description:
      'Provide deep insights into course metrics and learner behavior.',
    icon: LineChart,
    suggestedPrompts: [
      'Analyze learner drop-off points',
      'Compare course performance',
      'Identify trending topics',
    ],
    lastUsed: 'Yesterday',
    status: 'online',
  },
  {
    id: 'revenue-insights',
    name: 'Revenue Insights Agent',
    description:
      'Analyze earnings, pricing, conversion rates, and marketplace opportunities.',
    icon: DollarSign,
    suggestedPrompts: [
      "Forecast next month's revenue",
      'Recommend pricing changes',
      'Identify high-revenue courses',
    ],
    lastUsed: '3 days ago',
    status: 'online',
  },
  {
    id: 'learner-engagement',
    name: 'Learner Engagement Agent',
    description: 'Monitor learner participation and engagement patterns.',
    icon: Users,
    suggestedPrompts: [
      'Identify disengaged learners',
      'Recommend engagement actions',
      'Analyze participation trends',
    ],
    lastUsed: '1 hour ago',
    status: 'online',
  },
  {
    id: 'assessment-insights',
    name: 'Assessment Insights Agent',
    description:
      'Evaluate assessments, grading trends, and learner performance.',
    icon: ClipboardCheck,
    suggestedPrompts: [
      'Analyze assessment difficulty',
      'Identify weak learning areas',
      'Improve assessment quality',
    ],
    lastUsed: '4 hours ago',
    status: 'online',
  },
];

/** Future agents — configuration-ready, not rendered in v1 */
export const FUTURE_INSTRUCTOR_AGENTS: Omit<InstructorAgentDefinition, 'icon' | 'lastUsed' | 'status'>[] = [
  { id: 'course-authoring' as InstructorAgentId, name: 'Course Authoring Agent', description: 'Draft outlines, modules, and marketplace-ready structures.', suggestedPrompts: [] },
  { id: 'curriculum-design' as InstructorAgentId, name: 'Curriculum Design Agent', description: 'Design learning pathways and competency alignment.', suggestedPrompts: [] },
  { id: 'certification' as InstructorAgentId, name: 'Certification Agent', description: 'Manage certification readiness and exam alignment.', suggestedPrompts: [] },
  { id: 'marketplace-optimization' as InstructorAgentId, name: 'Marketplace Optimization Agent', description: 'Optimize listings, pricing, and discoverability.', suggestedPrompts: [] },
  { id: 'learning-experience' as InstructorAgentId, name: 'Learning Experience Agent', description: 'Improve learner experience and content flow.', suggestedPrompts: [] },
];

export const QUICK_COMMAND_CHIPS = [
  'Analyze Course',
  'View Revenue Forecast',
  'Review Learner Engagement',
  'Generate Performance Report',
  'Identify At-Risk Learners',
  'Suggest Course Improvements',
];

export const SLASH_COMMANDS: Record<string, string> = {
  '/analyze course': 'Analyze course performance across all published courses',
  '/revenue forecast': 'Forecast revenue for next quarter',
  '/engagement report': 'Generate learner engagement report',
  '/assessment insights': 'Analyze assessment difficulty and success rates',
  '/course optimization': 'Suggest improvements for underperforming courses',
};

export const DEFAULT_COMMAND_HISTORY = [
  'Analyze AI Fundamentals',
  'Revenue forecast Q3',
  'Identify disengaged learners',
  'Generate engagement report',
];

export const WELCOME_ACTIONS = [
  'Analyze my courses',
  'Review learner engagement',
  'Forecast revenue',
  'Generate teaching insights',
];

export const SPARSE_DATA_ACTIONS = [
  'Analyze course performance',
  'Generate engagement report',
  'Review learner progress',
  'Create marketplace strategy',
];

export function getInstructorAgentById(id: InstructorAgentId): InstructorAgentDefinition {
  return INSTRUCTOR_AGENTS.find((a) => a.id === id) ?? INSTRUCTOR_AGENTS[0];
}

export function resolveSlashCommand(input: string): string {
  const trimmed = input.trim().toLowerCase();
  for (const [slash, full] of Object.entries(SLASH_COMMANDS)) {
    if (trimmed === slash || trimmed.startsWith(`${slash} `)) {
      return full;
    }
  }
  return input.trim();
}

export function buildInstructorAgentResponse(
  agentId: InstructorAgentId,
  command: string,
  ctx: InstructorCockpitContext,
): InstructorAgentResponse {
  const agent = getInstructorAgentById(agentId);

  const baseMetrics: MetricCardData[] = [
    { id: 'm1', label: 'Average Completion', value: ctx.sparseData ? '—' : '78%' },
    { id: 'm2', label: 'Course Health Score', value: ctx.sparseData ? '—' : '82/100' },
    { id: 'm3', label: 'Revenue Trend', value: ctx.sparseData ? '—' : '+8%' },
    { id: 'm4', label: 'Engagement Score', value: ctx.sparseData ? '—' : '74%' },
    { id: 'm5', label: 'Assessment Success Rate', value: ctx.sparseData ? '—' : '86%' },
  ];

  if (agentId === 'course-performance') {
    return {
      title: `${agent.name} analysis`,
      summary: command,
      insights: [
        {
          id: 'i1',
          title: 'Course Completion Trend',
          body: 'Completion rates increased 8% this month across published courses.',
          tone: 'success',
        },
      ],
      recommendations: [
        {
          id: 'r1',
          title: 'Recommended Action',
          body: 'Add a knowledge-check activity to Module 3 of AI Fundamentals.',
          impact: '+12% learner retention',
        },
      ],
      metrics: baseMetrics,
      charts: [
        {
          id: 'c1',
          title: 'Completion by Course',
          type: 'bar',
          data: [
            { label: 'AI Fund.', value: 82 },
            { label: 'Digital Trans.', value: 74 },
            { label: 'Data Strat.', value: 61 },
          ],
        },
      ],
    };
  }

  if (agentId === 'course-analytics') {
    return {
      title: 'Learner behavior insights',
      summary: command,
      insights: [
        {
          id: 'i2',
          title: 'Drop-off hotspot',
          body: 'Module 3 video lessons show 22% higher exit rate than course average.',
          tone: 'warning',
        },
      ],
      charts: [
        {
          id: 'c2',
          title: 'Weekly Active Learners',
          type: 'line',
          data: [
            { label: 'W1', value: 120 },
            { label: 'W2', value: 140 },
            { label: 'W3', value: 155 },
            { label: 'W4', value: 168 },
          ],
        },
      ],
      metrics: baseMetrics,
    };
  }

  if (agentId === 'revenue-insights') {
    return {
      title: 'Revenue forecast',
      summary: command,
      insights: [
        {
          id: 'i3',
          title: 'Revenue Trend',
          body: 'Projected monthly revenue: $2,430 (+8% vs last month).',
          tone: 'success',
        },
      ],
      recommendations: [
        {
          id: 'r2',
          title: 'Pricing opportunity',
          body: 'Bundle AI Fundamentals with Digital Transformation for 15% uplift.',
          impact: '+$380 estimated monthly',
        },
      ],
      charts: [
        {
          id: 'c3',
          title: 'Revenue by Course',
          type: 'bar',
          data: [
            { label: 'AI Fund.', value: 980 },
            { label: 'Digital', value: 720 },
            { label: 'Data', value: 430 },
          ],
        },
      ],
      metrics: baseMetrics,
    };
  }

  if (agentId === 'learner-engagement') {
    return {
      title: 'Engagement analysis',
      summary: command,
      alerts: [
        {
          id: 'a1',
          title: 'Attention Required',
          body: '25 learners have not logged in for 14 days.',
        },
      ],
      recommendations: [
        {
          id: 'r3',
          title: 'Engagement action',
          body: 'Send a re-engagement nudge before the next live session.',
          impact: '+18% return rate (historical)',
        },
      ],
      metrics: baseMetrics,
      charts: [
        {
          id: 'c4',
          title: 'Participation Trend',
          type: 'line',
          data: [
            { label: 'W1', value: 62 },
            { label: 'W2', value: 65 },
            { label: 'W3', value: 68 },
            { label: 'W4', value: 74 },
          ],
        },
      ],
    };
  }

  return {
    title: 'Assessment insights',
    summary: command,
    insights: [
      {
        id: 'i4',
        title: 'Assessment difficulty',
        body: 'Module 4 quiz averages 68% pass rate — slightly below target of 75%.',
        tone: 'warning',
      },
    ],
    recommendations: [
      {
        id: 'r4',
        title: 'Quality improvement',
        body: 'Add formative practice questions before the summative assessment.',
        impact: '+9% pass rate (estimated)',
      },
    ],
    metrics: baseMetrics,
  };
}

export function buildActiveContext(ctx: InstructorCockpitContext) {
  return [
    { label: 'Courses', value: String(ctx.courseCount || 6) },
    { label: 'Learners', value: String(ctx.totalEnrollments || 248) },
    { label: 'Published', value: String(ctx.publishedCount || 4) },
    { label: 'Sessions', value: String(ctx.upcomingSessions || 3) },
  ];
}

export const SAVED_INSIGHTS_MOCK = [
  {
    id: 's1',
    title: 'AI Fundamentals retention boost',
    agent: 'Course Performance Agent',
    savedAt: 'Jun 18, 2026',
  },
  {
    id: 's2',
    title: 'Q3 revenue forecast',
    agent: 'Revenue Insights Agent',
    savedAt: 'Jun 15, 2026',
  },
];
