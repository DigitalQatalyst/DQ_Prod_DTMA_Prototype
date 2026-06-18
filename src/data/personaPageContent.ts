export interface PersonaPageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  challengeBody: string;
  benefits: string[];
  learningPath: string[];
  ctaTitle: string;
  ctaDescription: string;
}

export const personaPageContent = {
  "organizational-leaders": {
    heroEyebrow: "Organizational Leaders",
    heroTitle: "Lead in the",
    heroAccent: "New Economy",
    heroDescription:
      "Understand what it takes to transition your organization into a Digital Cognitive Organization. Develop the strategic vision to lead confidently through Economy 4.0 and beyond.",
    challengeBody:
      "The digital economy is reshaping industries and competitive dynamics. As an organizational leader, you need to understand these shifts, develop a clear strategic vision, and guide your organization through transformation with confidence and clarity.",
    benefits: [
      "Understand what it takes to build a Digital Cognitive Organization",
      "Develop strategic vision to lead through Economy 4.0",
      "Learn to position your organization for digital success",
      "Master the frameworks for organizational transformation",
      "Lead confidently through digital disruption and change",
    ],
    learningPath: [
      "Digital Economy Leadership",
      "Building a Digital Cognitive Organization",
      "Strategic Digital Transformation",
      "Leading Through Economy 4.0",
      "Digital Leadership Essentials",
    ],
    ctaTitle: "Ready to Lead Your Organization Forward?",
    ctaDescription:
      "Build the strategic vision and leadership skills to guide your organization through Economy 4.0.",
  },
  "transformation-specialists": {
    heroEyebrow: "Transformation Specialists & Teams",
    heroTitle: "Deliver Successful",
    heroAccent: "Digital Initiatives",
    heroDescription:
      "Master the frameworks and methodologies that separate successful digital transformations from failed ones. Gain the execution skills to drive initiatives from strategy through to measurable outcomes.",
    challengeBody:
      "Traditional transformation approaches are failing. As a transformation specialist, you need modern methodologies, proven frameworks, and practical execution skills to deliver initiatives that actually succeed in today's complex digital landscape.",
    benefits: [
      "Master frameworks that separate successful transformations from failed ones",
      "Gain execution skills to drive initiatives from strategy to outcomes",
      "Learn methodologies to architect target states at scale",
      "Understand how to deliver measurable transformation results",
      "Build expertise in Digital Transformation 2.0 approaches",
    ],
    learningPath: [
      "Digital Transformation 2.0 Fundamentals",
      "Architecting Digital Target States",
      "Transformation Execution Frameworks",
      "Digital Business Platform Design",
      "Accelerating Transformation Initiatives",
    ],
    ctaTitle: "Ready to Lead Successful Transformations?",
    ctaDescription:
      "Master the frameworks and execution skills that drive transformation success.",
  },
  "digital-workers": {
    heroEyebrow: "Digital Workers",
    heroTitle: "Understand How a",
    heroAccent: "DCO Works",
    heroDescription:
      "Learn how a Digital Cognitive Organization operates and what your role within it demands. Build the competencies to collaborate, adapt, and deliver in a digital-first environment.",
    challengeBody:
      "The workplace is evolving rapidly. Digital workers need to understand how modern organizations operate, how to work alongside AI systems, and how to remain valuable contributors in an increasingly automated environment.",
    benefits: [
      "Understand how Digital Cognitive Organizations operate",
      "Build competencies to collaborate in digital-first environments",
      "Adapt to AI-enhanced workplace dynamics",
      "Deliver effectively in modern digital teams",
      "Stay relevant in an AI-shaped workplace",
    ],
    learningPath: [
      "Digital Economy Fundamentals",
      "Working in a Digital Cognitive Organization",
      "Digital Collaboration & Communication",
      "AI Tools for Digital Workers",
      "Digital Workspace Essentials",
    ],
    ctaTitle: "Ready to Thrive as a Digital Worker?",
    ctaDescription:
      "Start building the skills you need to succeed in a Digital Cognitive Organization.",
  },
} satisfies Record<string, PersonaPageContent>;

export type PersonaPageKey = keyof typeof personaPageContent;
