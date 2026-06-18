export interface DimensionPageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  overviewTitle: string;
  overviewBody: string;
  ctaTitle: string;
  ctaDescription: string;
}

export const dimensionPageContent = {
  "digital-economy": {
    heroEyebrow: "Why should organisations change?",
    heroTitle: "Digital Economy",
    heroAccent: "DE",
    heroDescription:
      "The digital economy is redrawing industries, value chains, and competitive dynamics. Gain clarity to read these shifts and position your organisation for Economy 4.0.",
    overviewTitle: "Understanding the Digital Economy",
    overviewBody:
      "The digital economy represents a fundamental shift in how value is created, delivered, and captured. Organizations must understand these dynamics to remain competitive and relevant in Economy 4.0.",
    ctaTitle: "Ready to Master the Digital Economy?",
    ctaDescription: "Explore courses designed to help you navigate Economy 4.0.",
  },
  "digital-cognitive-organisation": {
    heroEyebrow: "Where are organisations headed?",
    heroTitle: "Digital Cognitive Organisation",
    heroAccent: "DCO",
    heroDescription:
      "The future organisation is intelligent, adaptive, and data-driven. Assess your organisation's cognitive maturity and chart a path toward AI-powered agility.",
    overviewTitle: "Building a Digital Cognitive Organisation",
    overviewBody:
      "A Digital Cognitive Organisation leverages AI, data, and intelligent systems to make better decisions, adapt faster, and operate with unprecedented efficiency.",
    ctaTitle: "Ready to Build a DCO?",
    ctaDescription: "Explore courses designed to help you build cognitive maturity.",
  },
  "digital-business-platform": {
    heroEyebrow: "What unifies value creation?",
    heroTitle: "Digital Business Platform",
    heroAccent: "DBP",
    heroDescription:
      "Build expertise in designing and orchestrating digital platforms that unify technology, data, experience, and operations.",
    overviewTitle: "Designing Digital Business Platforms",
    overviewBody:
      "Digital business platforms connect products, services, data, and ecosystems into cohesive value engines that scale across the enterprise.",
    ctaTitle: "Ready to Master Digital Platforms?",
    ctaDescription: "Explore courses designed to help you design and deploy platforms.",
  },
  "digital-transformation": {
    heroEyebrow: "How do we design the target?",
    heroTitle: "Digital Transformation 2.0",
    heroAccent: "DT2.0",
    heroDescription:
      "Acquire methodologies to architect transformation targets and deploy change at enterprise scale, beyond traditional approaches.",
    overviewTitle: "Leading Modern Transformation",
    overviewBody:
      "Digital Transformation 2.0 moves beyond incremental change to architect target states, roadmaps, and delivery models built for today's pace of disruption.",
    ctaTitle: "Ready to Lead Transformation?",
    ctaDescription: "Explore courses designed to help you lead enterprise transformation.",
  },
  "digital-worker-workspace": {
    heroEyebrow: "Who are the orchestrators?",
    heroTitle: "Digital Worker & Workspace",
    heroAccent: "DW/WS",
    heroDescription:
      "Redesign workforce models and environments so people can become the orchestrators of transformation, not obstacles to it.",
    overviewTitle: "Transforming Workforce and Workspace",
    overviewBody:
      "Digital workers and workspaces combine new skills, tools, and operating models so teams can deliver transformation at scale.",
    ctaTitle: "Ready to Transform Your Workforce?",
    ctaDescription: "Explore courses designed to help you build digital workforce capability.",
  },
  "digital-accelerators": {
    heroEyebrow: "When will you get there?",
    heroTitle: "Digital Accelerators",
    heroAccent: "DA",
    heroDescription:
      "Speed and precision separate successful transformations from stalled ones. Master the tools and methodologies that compress timescales and turn strategy into reality.",
    overviewTitle: "Accelerating Digital Transformation",
    overviewBody:
      "Digital accelerators are the tools, methodologies, and approaches that compress transformation timelines and ensure rapid, measurable progress toward strategic goals.",
    ctaTitle: "Ready to Accelerate Your Transformation?",
    ctaDescription: "Explore courses designed to help you deliver transformation faster.",
  },
} satisfies Record<string, DimensionPageContent>;

export type DimensionPageKey = keyof typeof dimensionPageContent;
