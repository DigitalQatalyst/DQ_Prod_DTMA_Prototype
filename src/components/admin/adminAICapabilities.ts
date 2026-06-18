import {
  AlertTriangle,
  Bot,
  Brain,
  FileText,
  Globe,
  Headphones,
  MessageSquare,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type AdminAICapabilityId =
  | "ai-assistant"
  | "ai-faculty"
  | "ai-content"
  | "ai-assessment"
  | "ai-cohort"
  | "ai-feedback"
  | "ai-moderation"
  | "ai-support"
  | "ai-localization";

export const ADMIN_AI_CAPABILITY_IDS: AdminAICapabilityId[] = [
  "ai-assistant",
  "ai-faculty",
  "ai-content",
  "ai-assessment",
  "ai-cohort",
  "ai-feedback",
  "ai-moderation",
  "ai-support",
  "ai-localization",
];

export function isAdminAICapabilityId(tab: string): tab is AdminAICapabilityId {
  return ADMIN_AI_CAPABILITY_IDS.includes(tab as AdminAICapabilityId);
}

export type AdminAICapabilityMeta = {
  id: AdminAICapabilityId;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const ADMIN_AI_CAPABILITIES: AdminAICapabilityMeta[] = [
  {
    id: "ai-assistant",
    label: "Operations Assistant",
    description: "Summaries, reports, and next-best admin actions",
    icon: Bot,
  },
  {
    id: "ai-faculty",
    label: "Faculty Support",
    description: "Mentoring insights and learner intervention guidance",
    icon: Sparkles,
  },
  {
    id: "ai-content",
    label: "Content Authoring",
    description: "Draft outlines, exercises, and learning objectives",
    icon: FileText,
  },
  {
    id: "ai-assessment",
    label: "Assessment Tools",
    description: "Quiz generation, grading helpers, and rubrics",
    icon: Brain,
  },
  {
    id: "ai-cohort",
    label: "Cohort Intelligence",
    description: "Risk alerts and training needs across cohorts",
    icon: AlertTriangle,
  },
  {
    id: "ai-feedback",
    label: "Feedback Analysis",
    description: "Sentiment trends and improvement opportunities",
    icon: MessageSquare,
  },
  {
    id: "ai-moderation",
    label: "Discussion Moderation",
    description: "Flag content and moderator review queues",
    icon: Shield,
  },
  {
    id: "ai-support",
    label: "Support Triage",
    description: "Classify, route, and draft support replies",
    icon: Headphones,
  },
  {
    id: "ai-localization",
    label: "Localization",
    description: "Translate content and adapt for global delivery",
    icon: Globe,
  },
];

export const ADMIN_AI_CAPABILITY_LABELS: Record<AdminAICapabilityId, string> =
  Object.fromEntries(
    ADMIN_AI_CAPABILITIES.map((item) => [item.id, item.label])
  ) as Record<AdminAICapabilityId, string>;
