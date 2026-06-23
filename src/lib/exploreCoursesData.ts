import type { Course } from '@/data/dtmaCoursesNew';

export type SkillArea =
  | 'economy-40'
  | 'digital-transformation'
  | 'business-platforms'
  | 'ai-automation'
  | 'leadership'
  | 'enterprise-transformation'
  | 'governance'
  | 'digital-cognitive';

export type CertificationTrack = 'foundation' | 'professional' | 'leader' | 'none';

export type MarketplaceCourseMeta = {
  courseId: string;
  capabilityPoints: number;
  certificationContribution: string;
  skillAreas: SkillArea[];
  certificationTrack: CertificationTrack;
  competencies: string[];
};

export const SKILL_AREA_LABELS: Record<SkillArea, string> = {
  'economy-40': 'Economy 4.0',
  'digital-transformation': 'Digital Transformation',
  'business-platforms': 'Digital Business Platforms',
  'ai-automation': 'AI & Automation',
  leadership: 'Leadership',
  'enterprise-transformation': 'Enterprise Transformation',
  governance: 'Governance',
  'digital-cognitive': 'Digital Cognitive Organisations',
};

export const CAPABILITY_PATHWAYS = [
  {
    id: 'foundation',
    title: 'Digital Transformation Foundation',
    courseCount: 6,
    level: 'Beginner',
    stat: '72% of learners start here',
    description: 'Build core digital economy and transformation fundamentals.',
    courseIds: ['course-economy-40', 'course-digital-workers'],
  },
  {
    id: 'leadership',
    title: 'Transformation Leadership',
    courseCount: 8,
    level: 'Intermediate',
    stat: 'Recommended after Foundation',
    description: 'Lead change, teams, and enterprise-wide transformation initiatives.',
    courseIds: ['course-transformation', 'course-digital-workers'],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Transformation Practitioner',
    courseCount: 12,
    level: 'Advanced',
    stat: 'Certification Track',
    description: 'Execute large-scale transformation programmes with measurable outcomes.',
    courseIds: ['course-transformation', 'course-business-platforms', 'course-digital-accelerators'],
  },
  {
    id: 'cognitive',
    title: 'Digital Cognitive Organisation Specialist',
    courseCount: 10,
    level: 'Expert',
    stat: 'Accredited Pathway',
    description: 'Design AI-native, data-driven cognitive operating models.',
    courseIds: ['course-cognitive-org', 'course-business-platforms'],
  },
] as const;

export const CERTIFICATION_PATHWAYS = [
  {
    id: 'foundation-practitioner',
    title: 'DT Foundation Practitioner',
    requiredCourses: 4,
    progress: 50,
  },
  {
    id: 'dt-professional',
    title: 'DT Professional',
    requiredCourses: 8,
    progress: 25,
  },
  {
    id: 'dt-leader',
    title: 'DT Transformation Leader',
    requiredCourses: 12,
    progress: 0,
  },
];

export const FEATURED_COURSES_PUBLIC = [
  {
    id: 'feat-economy',
    courseId: 'course-economy-40',
    title: 'Mastering Economy 4.0',
    description:
      'A practical starting point for digital economy fundamentals, platforms, and workforce readiness.',
  },
  {
    id: 'feat-cognitive',
    courseId: 'course-cognitive-org',
    title: 'Decoding Digital Cognitive Organisations',
    description:
      'Explore how AI-native operating models and cognitive capabilities reshape enterprise performance.',
  },
  {
    id: 'feat-transformation',
    courseId: 'course-transformation',
    title: 'Navigating Digital Transformation 2.0',
    description:
      'Learn how to plan, govern, and deliver transformation programmes with measurable outcomes.',
  },
] as const;

export const AI_RECOMMENDATIONS = [
  {
    id: 'rec-cognitive',
    courseId: 'course-cognitive-org',
    title: 'Decoding Digital Cognitive Organisations',
    reason: 'Recommended because of your strong progress in Economy 4.0 fundamentals.',
  },
  {
    id: 'rec-platforms',
    courseId: 'course-business-platforms',
    title: 'Building Powerful Digital Business Platforms',
    reason: 'Supports your next capability milestone in platform strategy.',
  },
  {
    id: 'rec-transformation',
    courseId: 'course-transformation',
    title: 'Navigating Digital Transformation 2.0',
    reason: 'Aligns with your certification pathway requirements.',
  },
];

export const TRENDING = {
  mostEnrolled: { title: 'Mastering Economy 4.0', stat: '1,240 enrollments this month' },
  highestRated: { title: 'Decoding Digital Cognitive Organisations', stat: '4.9 average rating' },
  fastestPathway: { title: 'Digital Transformation Foundation', stat: '+38% growth' },
};

export const LEARNER_SUCCESS_STORY = {
  quote:
    'Completed DT Foundation Practitioner and earned a promotion within six months.',
  name: 'Sarah Ahmed',
  role: 'Transformation Lead',
  certification: 'DT Foundation Practitioner',
};

const COURSE_META: Record<string, MarketplaceCourseMeta> = {
  'course-economy-40': {
    courseId: 'course-economy-40',
    capabilityPoints: 50,
    certificationContribution: 'DT Foundation Practitioner',
    skillAreas: ['economy-40', 'digital-transformation'],
    certificationTrack: 'foundation',
    competencies: ['Digital Economy', 'Economy 4.0', 'Foundation'],
  },
  'course-cognitive-org': {
    courseId: 'course-cognitive-org',
    capabilityPoints: 80,
    certificationContribution: 'DT Professional',
    skillAreas: ['digital-cognitive', 'ai-automation'],
    certificationTrack: 'professional',
    competencies: ['Cognitive Organisation', 'AI Strategy'],
  },
  'course-business-platforms': {
    courseId: 'course-business-platforms',
    capabilityPoints: 75,
    certificationContribution: 'DT Professional',
    skillAreas: ['business-platforms', 'digital-transformation'],
    certificationTrack: 'professional',
    competencies: ['Platform Strategy', 'Business Models'],
  },
  'course-transformation': {
    courseId: 'course-transformation',
    capabilityPoints: 90,
    certificationContribution: 'DT Transformation Leader',
    skillAreas: ['enterprise-transformation', 'leadership'],
    certificationTrack: 'leader',
    competencies: ['Transformation 2.0', 'Enterprise Change'],
  },
  'course-digital-workers': {
    courseId: 'course-digital-workers',
    capabilityPoints: 55,
    certificationContribution: 'DT Foundation Practitioner',
    skillAreas: ['ai-automation', 'digital-transformation'],
    certificationTrack: 'foundation',
    competencies: ['Digital Workforce', 'Future of Work'],
  },
  'course-digital-accelerators': {
    courseId: 'course-digital-accelerators',
    capabilityPoints: 65,
    certificationContribution: 'DT Professional',
    skillAreas: ['enterprise-transformation', 'governance'],
    certificationTrack: 'professional',
    competencies: ['Accelerators', 'Governance'],
  },
};

export function getCourseMeta(courseId: string): MarketplaceCourseMeta {
  return (
    COURSE_META[courseId] ?? {
      courseId,
      capabilityPoints: 40,
      certificationContribution: 'DT Foundation Practitioner',
      skillAreas: ['digital-transformation'],
      certificationTrack: 'foundation',
      competencies: ['Digital Transformation'],
    }
  );
}

export function getDefaultSnapshot() {
  return {
    coursesCompleted: 4,
    coursesInProgress: 2,
    capabilityScore: 68,
    certificationReadiness: 42,
    hoursLearned: 28,
    skillsDeveloping: [
      'Digital Strategy',
      'Business Platforms',
      'AI Adoption',
      'Transformation Governance',
    ],
    currentCourse: 'Mastering Economy 4.0',
    nextPathway: 'Digital Business Platforms',
  };
}

export function getFeaturedJourney(progress = 65) {
  return {
    courseId: 'course-economy-40',
    title: 'Mastering Economy 4.0',
    progress,
    moduleLabel: 'Module 2 of 3',
    learnHref: '/courses/course-economy-40/learn',
  };
}

export function courseMatchesSkillArea(course: Course, area: SkillArea): boolean {
  return getCourseMeta(course.id).skillAreas.includes(area);
}

export function courseMatchesPathway(courseId: string, pathwayId: string): boolean {
  const pathway = CAPABILITY_PATHWAYS.find((p) => p.id === pathwayId);
  return pathway?.courseIds.includes(courseId) ?? false;
}

export function searchCourse(
  course: Course,
  query: string,
  meta: MarketplaceCourseMeta,
): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  return (
    course.title.toLowerCase().includes(q) ||
    course.category.toLowerCase().includes(q) ||
    course.instructor.toLowerCase().includes(q) ||
    meta.competencies.some((c) => c.toLowerCase().includes(q)) ||
    meta.certificationContribution.toLowerCase().includes(q) ||
    meta.skillAreas.some((s) => SKILL_AREA_LABELS[s].toLowerCase().includes(q))
  );
}
