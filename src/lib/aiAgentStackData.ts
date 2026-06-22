import type { LucideIcon } from 'lucide-react';
import {
  Award,
  BookOpen,
  Brain,
  Briefcase,
  ClipboardList,
  Compass,
  FileText,
  Gamepad2,
  Map,
  Target,
} from 'lucide-react';

export type AgentId =
  | 'learning-path-architect'
  | 'certification-advisor'
  | 'capability-analyst'
  | 'knowledge-notes'
  | 'career-coach'
  | 'simulation-coach';

export interface AIAgentDefinition {
  id: AgentId;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  actions: string[];
  responseActions: string[];
}

export const AI_AGENTS: AIAgentDefinition[] = [
  {
    id: 'learning-path-architect',
    name: 'Learning Path Architect',
    shortName: 'Path Architect',
    description: 'Creates personalized learning journeys and recommends next learning activities.',
    icon: Map,
    actions: ['Build Learning Plan', 'Recommend Next Course', 'Optimize Learning Path'],
    responseActions: ['Save Plan', 'Assign To Learning Workspace', 'Generate Weekly Schedule'],
  },
  {
    id: 'certification-advisor',
    name: 'Certification Readiness Advisor',
    shortName: 'Certification Advisor',
    description: 'Evaluates certification preparedness and generates study strategies.',
    icon: Award,
    actions: ['Check Readiness', 'Create Study Plan', 'Predict Exam Success'],
    responseActions: ['Create Study Guide', 'Export Report', 'Generate Weekly Schedule'],
  },
  {
    id: 'capability-analyst',
    name: 'Capability Gap Analyst',
    shortName: 'Capability Analyst',
    description: 'Analyzes competency profiles and identifies growth opportunities.',
    icon: Target,
    actions: ['Analyze Gaps', 'Benchmark Skills', 'Generate Capability Report'],
    responseActions: ['View Capability Profile', 'Export Report', 'Save Plan'],
  },
  {
    id: 'knowledge-notes',
    name: 'Knowledge & Notes Agent',
    shortName: 'Knowledge Agent',
    description: 'Organizes learning knowledge and generates revision materials.',
    icon: FileText,
    actions: ['Summarize Learning', 'Generate Revision Pack', 'Organize Notes'],
    responseActions: ['Create Study Guide', 'Export Report', 'Assign To Learning Workspace'],
  },
  {
    id: 'career-coach',
    name: 'Career Progression Coach',
    shortName: 'Career Coach',
    description: 'Maps learning achievements to future career opportunities.',
    icon: Briefcase,
    actions: ['Career Guidance', 'Certification Roadmap', 'Skill Development Plan'],
    responseActions: ['Save Plan', 'Certification Roadmap', 'Export Report'],
  },
  {
    id: 'simulation-coach',
    name: 'Transformation Simulation Coach',
    shortName: 'Simulation Coach',
    description: 'Provides guided digital transformation scenario simulations.',
    icon: Gamepad2,
    actions: ['Start Simulation', 'Review Decisions', 'Practice Case Study'],
    responseActions: ['Start Simulation', 'Review Decisions', 'Export Report'],
  },
];

export const SUGGESTED_COMMANDS = [
  'Create Learning Plan',
  'Analyze My Capability Gaps',
  'Prepare Me For Certification',
  'Generate Revision Pack',
  'Recommend My Next Course',
  'Create Weekly Study Schedule',
  'Help Me Become A Transformation Leader',
];

export const INTELLIGENCE_METRICS = [
  { id: 'streak', label: 'Learning Streak', value: '5 Days', icon: Compass },
  { id: 'courses', label: 'Active Courses', value: '3', icon: BookOpen },
  { id: 'capability', label: 'Capability Score', value: '72%', icon: Target },
  { id: 'cert', label: 'Certification Readiness', value: '68%', icon: Award },
  { id: 'completed', label: 'Completed Certifications', value: '2', icon: ClipboardList },
  { id: 'notes', label: 'AI Notes Generated', value: '14', icon: Brain },
];

export const AI_INSIGHTS = [
  { id: 'streak', label: 'Learning Streak', value: '5 Days', tone: 'success' as const },
  { id: 'growth', label: 'Capability Growth', value: '+8% This Month', tone: 'info' as const },
  { id: 'readiness', label: 'Certification Readiness', value: '68%', tone: 'warning' as const },
  {
    id: 'gap',
    label: 'Priority Competency Gap',
    value: 'Transformation Governance',
    tone: 'danger' as const,
  },
  {
    id: 'course',
    label: 'Recommended Next Course',
    value: 'Transformation Strategy Foundations',
    tone: 'info' as const,
  },
  {
    id: 'milestone',
    label: 'Upcoming Milestone',
    value: 'Certification Practice Exam',
    tone: 'warning' as const,
  },
];

export function getAgentById(id: AgentId): AIAgentDefinition {
  return AI_AGENTS.find((a) => a.id === id) ?? AI_AGENTS[0];
}

export function buildAgentResponse(
  agentId: AgentId,
  command: string,
  context: {
    averageProgress: number;
    completedCourses: number;
    enrolledCourses: number;
    streak: number;
  },
): {
  title: string;
  sections: { heading?: string; items: string[] }[];
  footer?: string;
} {
  const base = {
    title: `Response from ${getAgentById(agentId).name}`,
    sections: [] as { heading?: string; items: string[] }[],
    footer: 'Estimated completion: 14 Days',
  };

  if (agentId === 'learning-path-architect') {
    return {
      title: 'Based on your learning profile',
      sections: [
        {
          heading: 'Completed',
          items: ['Digital Economy Fundamentals', 'AI Foundations'],
        },
        {
          heading: 'In Progress',
          items: [`Mastering Economy 4.0 (${context.averageProgress || 50}%)`],
        },
        {
          heading: 'Capability Score',
          items: ['72%'],
        },
        {
          heading: 'Recommended Next Actions',
          items: [
            'Complete Module 3',
            'Review AI-generated notes',
            'Attempt Practice Assessment',
            'Start Transformation Strategy Foundations',
          ],
        },
      ],
      footer: 'Estimated completion: 14 Days',
    };
  }

  if (agentId === 'certification-advisor') {
    return {
      title: 'Certification readiness analysis',
      sections: [
        {
          heading: 'Current readiness',
          items: ['68% prepared for DT Foundation Practitioner', '2 of 4 required courses complete'],
        },
        {
          heading: 'Study priorities',
          items: [
            'Review Module 3 assessment criteria',
            'Complete practice exam (recommended this week)',
            'Strengthen Transformation Governance competency',
          ],
        },
      ],
      footer: command.toLowerCase().includes('predict')
        ? 'Predicted exam success: 74% with current trajectory'
        : 'Target exam window: 3–4 weeks',
    };
  }

  if (agentId === 'capability-analyst') {
    return {
      title: 'Capability gap analysis',
      sections: [
        {
          heading: 'Strongest dimensions',
          items: ['Strategy (72%)', 'Operating Model (65%)'],
        },
        {
          heading: 'Priority gaps',
          items: ['Transformation Governance (47%)', 'Technology depth (58%)'],
        },
        {
          heading: 'Recommended focus',
          items: [
            'Transformation Strategy Foundations',
            'Governance & Risk in Digital Transformation',
          ],
        },
      ],
      footer: 'Benchmark: top 28% of learners in your cohort',
    };
  }

  if (agentId === 'knowledge-notes') {
    return {
      title: 'Knowledge summary',
      sections: [
        {
          heading: 'Recent learning themes',
          items: [
            'Economy 4.0 platform dynamics',
            'Digital cognitive organisation principles',
            'AI adoption patterns in enterprise',
          ],
        },
        {
          heading: 'Revision pack generated',
          items: ['12 key concepts', '8 practice questions', '3 case study prompts'],
        },
      ],
      footer: '14 AI notes available in your workspace',
    };
  }

  if (agentId === 'career-coach') {
    return {
      title: 'Career progression outlook',
      sections: [
        {
          heading: 'Current positioning',
          items: [
            'Transformation Analyst trajectory',
            'Foundation-level certification on track',
          ],
        },
        {
          heading: 'Next career milestones',
          items: [
            'DT Foundation Practitioner (8–12 weeks)',
            'Transformation Programme Coordinator (6 months)',
          ],
        },
      ],
      footer: 'Skills in highest demand: platform strategy, governance, change leadership',
    };
  }

  return {
    title: 'Transformation simulation briefing',
    sections: [
      {
        heading: 'Scenario',
        items: ['Retail enterprise digital transformation', '12-week programme horizon'],
      },
      {
        heading: 'Your role',
        items: ['Lead transformation architect', 'Balance speed, risk, and capability build'],
      },
      {
        heading: 'First decision point',
        items: [
          'Prioritise customer experience platform',
          'Or invest in data foundation first',
        ],
      },
    ],
    footer: 'Simulation difficulty: Intermediate · ~25 minutes',
  };
}
