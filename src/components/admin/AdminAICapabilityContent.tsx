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
import { Button } from "@/components/ui/button";
import {
  learnerBody,
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerPanel,
  learnerSectionHeading,
} from "@/lib/brandAccent";
import { cn } from "@/lib/utils";
import type { AdminAICapabilityId } from "@/components/admin/adminAICapabilities";

type ToolCard = {
  title: string;
  description: string;
  action: string;
  variant?: "primary" | "outline";
};

type CapabilityConfig = {
  title: string;
  heroIcon: LucideIcon;
  heroTitle: string;
  heroDescription: string;
  tools: ToolCard[];
};

export const CAPABILITY_CONFIG: Record<AdminAICapabilityId, CapabilityConfig> = {
  "ai-assistant": {
    title: "AI Operations Assistant",
    heroIcon: Bot,
    heroTitle: "Your AI Assistant",
    heroDescription: "A general-purpose assistant to support daily operational work.",
    tools: [
      { title: "Platform Activity Summary", description: "Get AI-generated summaries of platform activity and key metrics.", action: "Generate Summary", variant: "primary" },
      { title: "Operational Reports", description: "Create comprehensive reports with AI assistance.", action: "Create Report", variant: "primary" },
      { title: "Next-Best Actions", description: "AI suggests priority actions for admins and faculty.", action: "View Suggestions", variant: "outline" },
      { title: "Draft Responses", description: "Generate draft responses to learner queries.", action: "Draft Response", variant: "outline" },
    ],
  },
  "ai-faculty": {
    title: "AI Faculty Support Mode",
    heroIcon: Sparkles,
    heroTitle: "Transact AI - Faculty Mode",
    heroDescription: "Extended AI support for faculty to mentor and support learners effectively.",
    tools: [
      { title: "Learner Progress Summaries", description: "View AI-generated summaries of individual learner progress.", action: "View Summaries", variant: "primary" },
      { title: "Mentoring Suggestions", description: "Get AI-powered mentoring strategies for each learner.", action: "Get Suggestions", variant: "primary" },
      { title: "Struggling Learner Guidance", description: "Receive guidance on how to support struggling learners.", action: "View Guidance", variant: "outline" },
      { title: "Intervention Recommendations", description: "AI recommends timely interventions and outreach actions.", action: "View Recommendations", variant: "outline" },
    ],
  },
  "ai-content": {
    title: "AI Content Authoring & Drafting",
    heroIcon: FileText,
    heroTitle: "AI-Powered Course Creation",
    heroDescription: "Accelerate course development with AI assistance while keeping humans in control.",
    tools: [
      { title: "Draft Lesson Outlines", description: "Generate structured lesson outlines based on learning objectives.", action: "Create Outline", variant: "primary" },
      { title: "Generate Examples & Exercises", description: "Create relevant examples and practice exercises automatically.", action: "Generate Content", variant: "primary" },
      { title: "Propose Learning Objectives", description: "AI suggests clear, measurable learning objectives.", action: "Get Objectives", variant: "outline" },
      { title: "Content Improvement Suggestions", description: "Get AI recommendations to enhance existing content.", action: "Analyze Content", variant: "outline" },
    ],
  },
  "ai-assessment": {
    title: "AI Assessment Tools",
    heroIcon: Brain,
    heroTitle: "Intelligent Assessment Creation & Grading",
    heroDescription: "Streamline quiz creation and grading with AI assistance.",
    tools: [
      { title: "AI Quiz Generator", description: "Create quizzes from lesson content with varied difficulty levels.", action: "Generate Quiz", variant: "primary" },
      { title: "Question Variations", description: "AI suggests question variations and difficulty adjustments.", action: "Create Variations", variant: "primary" },
      { title: "AI Grading Helper", description: "Assist in grading open-ended responses with AI analysis.", action: "Start Grading", variant: "outline" },
      { title: "Rubric Matching", description: "AI highlights key points and suggests provisional scores.", action: "Analyze Responses", variant: "outline" },
    ],
  },
  "ai-cohort": {
    title: "AI Cohort Risk & Training Needs Intelligence",
    heroIcon: AlertTriangle,
    heroTitle: "Predictive Learner Analytics",
    heroDescription: "Identify at-risk learners and skill gaps across cohorts.",
    tools: [
      { title: "Cohort Risk Alerts", description: "Detect learners falling behind and disengagement patterns.", action: "View Alerts", variant: "primary" },
      { title: "Early Intervention", description: "AI recommends timely interventions for struggling learners.", action: "Get Recommendations", variant: "primary" },
      { title: "Training Needs Analysis", description: "Analyze performance data to identify common skill gaps.", action: "Analyze Cohorts", variant: "outline" },
      { title: "Course Planning Insights", description: "Feed insights into future course planning and development.", action: "View Insights", variant: "outline" },
    ],
  },
  "ai-feedback": {
    title: "AI Feedback & Sentiment Analysis",
    heroIcon: MessageSquare,
    heroTitle: "Qualitative Feedback at Scale",
    heroDescription: "Analyze course reviews, ratings, and feedback automatically.",
    tools: [
      { title: "Sentiment Trends", description: "Track sentiment trends across courses and time periods.", action: "View Trends", variant: "primary" },
      { title: "Recurring Complaints", description: "Identify common issues and pain points from feedback.", action: "Analyze Feedback", variant: "primary" },
      { title: "Improvement Opportunities", description: "AI highlights areas for course and platform improvement.", action: "Get Recommendations", variant: "outline" },
      { title: "Support Ticket Analysis", description: "Analyze support tickets for patterns and insights.", action: "Analyze Tickets", variant: "outline" },
    ],
  },
  "ai-moderation": {
    title: "AI Discussion Moderation",
    heroIcon: Shield,
    heroTitle: "Safe Learning Environments",
    heroDescription: "Maintain productive and respectful discussion forums with AI.",
    tools: [
      { title: "Content Detection", description: "Detect inappropriate or off-topic content automatically.", action: "View Flagged Content", variant: "primary" },
      { title: "Moderator Review Queue", description: "Flag posts for human moderator review and action.", action: "Review Queue", variant: "primary" },
      { title: "Suggested Responses", description: "AI suggests automated or drafted moderator responses.", action: "View Suggestions", variant: "outline" },
      { title: "Moderation Analytics", description: "Track moderation metrics and community health.", action: "View Analytics", variant: "outline" },
    ],
  },
  "ai-support": {
    title: "AI Support Triage",
    heroIcon: Headphones,
    heroTitle: "Optimized Support Operations",
    heroDescription: "Streamline support with intelligent request classification and routing.",
    tools: [
      { title: "Request Classification", description: "Automatically classify incoming support requests by type.", action: "View Requests", variant: "primary" },
      { title: "Suggested Replies", description: "AI generates draft responses for common support issues.", action: "Generate Replies", variant: "primary" },
      { title: "Smart Routing", description: "Route issues to the correct team or faculty member.", action: "Configure Routing", variant: "outline" },
      { title: "Priority Detection", description: "Identify and prioritize urgent learner problems.", action: "View Urgent Issues", variant: "outline" },
    ],
  },
  "ai-localization": {
    title: "AI-Assisted Localization",
    heroIcon: Globe,
    heroTitle: "Global Program Delivery",
    heroDescription: "Support multilingual delivery of DTMA programs worldwide.",
    tools: [
      { title: "Content Translation", description: "Translate course content while maintaining accuracy.", action: "Translate Content", variant: "primary" },
      { title: "Cultural Adaptation", description: "Suggest culturally appropriate phrasing and examples.", action: "Get Suggestions", variant: "primary" },
      { title: "Multilingual Support", description: "Assist with multilingual support responses.", action: "Translate Response", variant: "outline" },
      { title: "Consistency Management", description: "Maintain consistency across localized versions.", action: "Check Consistency", variant: "outline" },
    ],
  },
};

type AdminAICapabilityContentProps = {
  capability: AdminAICapabilityId;
  embedded?: boolean;
};

export function AdminAICapabilityContent({
  capability,
  embedded = true,
}: AdminAICapabilityContentProps) {
  const config = CAPABILITY_CONFIG[capability];
  const HeroIcon = config.heroIcon;

  return (
    <div className="space-y-6">
      {!embedded ? (
        <h2 className={learnerSectionHeading}>{config.title}</h2>
      ) : null}

      <div className={cn(learnerPanel, "overflow-hidden bg-dq-navy p-6 text-white")}>
        <div className="mb-4 flex items-center gap-3">
          <HeroIcon className="h-8 w-8 text-dq-orange" />
          <h3 className="text-lg font-semibold text-white">{config.heroTitle}</h3>
        </div>
        <p className={cn(learnerBody, "text-white/80")}>{config.heroDescription}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {config.tools.map((tool) => (
          <div key={tool.title} className={cn(learnerPanel, "p-5")}>
            <h3 className={cn(learnerSectionHeading, "mb-2 text-base")}>{tool.title}</h3>
            <p className={cn(learnerBodyMuted, "mb-4")}>{tool.description}</p>
            {tool.variant === "outline" ? (
              <Button variant="outline" className="rounded-full border-gray-200">
                {tool.action}
              </Button>
            ) : (
              <Button className={learnerBtnPrimary}>{tool.action}</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAICapabilityContent;
