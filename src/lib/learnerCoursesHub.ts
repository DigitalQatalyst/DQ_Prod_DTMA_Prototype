import { dtmaCoursesNew, type Course as DtmaCourse } from '@/data/dtmaCoursesNew';
import type { Enrollment } from '@/hooks/useCourses';
import { buildLearnerDashboardSnapshot } from '@/lib/learnerDashboard';

export type CapabilityDimension = {
  id: string;
  name: string;
  score: number;
  trend?: string;
};

export type HubAchievement = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'badge' | 'streak' | 'module';
};

export type HubDeadline = {
  id: string;
  title: string;
  daysLeft: number;
  urgency: 'critical' | 'warning' | 'normal';
};

export type HubUpcomingEvent = {
  id: string;
  title: string;
  when: string;
  type: 'assessment' | 'live' | 'certification';
};

export type HubCourseDetail = {
  enrollmentId: string;
  courseId: string;
  title: string;
  category: string;
  image: string;
  level: string;
  enrolledAt: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  timeInvested: string;
  nextLesson: string;
  learnHref: string;
};

export type LearnerCoursesHubSnapshot = {
  kpis: {
    learningProgress: number;
    progressTrend: string;
    capabilityScore: number;
    capabilityLevel: string;
    certificationReadiness: number;
    aiRecommendations: number;
  };
  journey: {
    title: string;
    pathway: string;
    progressPercent: number;
    stageLabel: string;
    nextMilestone: string;
    estimatedCompletion: string;
    learnHref: string;
  };
  capabilities: CapabilityDimension[];
  achievements: HubAchievement[];
  aiCoach: {
    insight: string;
    recommendation: string;
  };
  upcomingEvents: HubUpcomingEvent[];
  deadlines: HubDeadline[];
  courseDetails: HubCourseDetail[];
};

function getDtmaCourse(courseId: string): DtmaCourse | undefined {
  return dtmaCoursesNew.find((c) => c.id === courseId);
}

function getNextLessonTitle(course: DtmaCourse, progressPercent: number): string {
  const lessons = course.modules.flatMap((m) => m.lessons);
  if (lessons.length === 0) return 'Getting started';
  const index = Math.min(
    lessons.length - 1,
    Math.max(0, Math.floor((progressPercent / 100) * lessons.length)),
  );
  return lessons[index]?.title ?? lessons[0].title;
}

function estimateTimeInvested(course: DtmaCourse | undefined, progressPercent: number): string {
  if (!course) return '0h 0m';
  const match = course.duration.match(/(\d+)/);
  const totalHours = match ? Number.parseInt(match[1], 10) : 8;
  const investedMinutes = Math.round(totalHours * 60 * (progressPercent / 100));
  const hours = Math.floor(investedMinutes / 60);
  const minutes = investedMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function formatCategory(category?: string | null): string {
  if (!category) return 'Digital Transformation';
  return category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function buildLearnerCoursesHubSnapshot({
  enrollments,
  certificateCount,
  onboardingGoal,
}: {
  enrollments: Enrollment[];
  certificateCount: number;
  onboardingGoal?: string;
}): LearnerCoursesHubSnapshot {
  const base = buildLearnerDashboardSnapshot({ enrollments, certificateCount, onboardingGoal });
  const activeEnrollments = enrollments.filter((e) => e.status === 'active');
  const avgProgress =
    activeEnrollments.length > 0
      ? Math.round(
          activeEnrollments.reduce((sum, e) => sum + (e.progress ?? 0), 0) / activeEnrollments.length,
        )
      : 0;

  const primaryEnrollment = activeEnrollments[0] ?? null;
  const primaryCourse = primaryEnrollment
    ? getDtmaCourse(primaryEnrollment.course_id)
    : getDtmaCourse('course-economy-40');

  const courseDetails: HubCourseDetail[] = activeEnrollments.map((enrollment) => {
    const dtma = getDtmaCourse(enrollment.course_id);
    const progress = enrollment.progress ?? 0;
    const totalLessons =
      dtma?.totalLessons ??
      dtma?.modules.flatMap((m) => m.lessons).length ??
      24;
    const lessonsCompleted = Math.max(1, Math.round((progress / 100) * totalLessons));

    return {
      enrollmentId: enrollment.id,
      courseId: enrollment.course_id,
      title: dtma?.title ?? enrollment.course?.title ?? 'Course',
      category: formatCategory(dtma?.category ?? enrollment.course?.category),
      image:
        dtma?.image ??
        enrollment.course?.image_url ??
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      level: dtma?.level ?? formatCategory(enrollment.course?.level) ?? 'Beginner',
      enrolledAt: enrollment.enrolled_at,
      progress,
      lessonsCompleted,
      totalLessons,
      timeInvested: estimateTimeInvested(dtma, progress),
      nextLesson: dtma ? getNextLessonTitle(dtma, progress) : 'Digital Business Models',
      learnHref: `/courses/${enrollment.course_id}/learn`,
    };
  });

  const capabilityScore = Math.round(
    (72 + 58 + 61 + 47 + 65) / 5,
  );

  return {
    kpis: {
      learningProgress: avgProgress || base.insights.completionRate,
      progressTrend: base.insights.completionTrend,
      capabilityScore,
      capabilityLevel: capabilityScore >= 70 ? 'Advanced' : capabilityScore >= 55 ? 'Intermediate' : 'Developing',
      certificationReadiness: Math.min(95, Math.round(avgProgress * 0.6 + capabilityScore * 0.4)),
      aiRecommendations: 3,
    },
    journey: {
      title: primaryCourse?.title ?? 'Mastering Economy 4.0',
      pathway: 'Digital Transformation Foundation Pathway',
      progressPercent: primaryEnrollment?.progress ?? avgProgress ?? 50,
      stageLabel: 'Stage 2 of 4',
      nextMilestone: 'Transformation Operating Models',
      estimatedCompletion: '18 Days',
      learnHref: primaryEnrollment
        ? `/courses/${primaryEnrollment.course_id}/learn`
        : '/courses/course-economy-40/learn',
    },
    capabilities: [
      { id: 'strategy', name: 'Strategy', score: 72, trend: '+4%' },
      { id: 'technology', name: 'Technology', score: 58, trend: '+2%' },
      { id: 'data-ai', name: 'Data & AI', score: 61, trend: '+5%' },
      { id: 'governance', name: 'Governance', score: 47, trend: '-1%' },
      { id: 'operating', name: 'Operating Model', score: 65, trend: '+3%' },
    ],
    achievements: [
      {
        id: 'badge',
        title: 'Economy Fundamentals Badge',
        subtitle: 'Earned 5 days ago',
        icon: 'badge',
      },
      {
        id: 'streak',
        title: '7-Day Learning Streak',
        subtitle: 'Current streak',
        icon: 'streak',
      },
      {
        id: 'module',
        title: 'Module 3 Completed',
        subtitle: 'Completed yesterday',
        icon: 'module',
      },
    ],
    aiCoach: {
      insight: 'You are progressing faster than 72% of learners in this pathway.',
      recommendation: 'Review Module 4 before the upcoming assessment.',
    },
    upcomingEvents: [
      { id: 'quiz', title: 'Assessment Quiz', when: 'Tomorrow', type: 'assessment' },
      { id: 'live', title: 'Live Class', when: '24 June', type: 'live' },
      { id: 'cert', title: 'Certification Milestone', when: '2 July', type: 'certification' },
    ],
    deadlines: [
      { id: 'mod4', title: 'Module 4 Submission', daysLeft: 2, urgency: 'critical' },
      { id: 'practice', title: 'Practice Assessment', daysLeft: 5, urgency: 'warning' },
      { id: 'pathway', title: 'Pathway Completion Goal', daysLeft: 18, urgency: 'normal' },
    ],
    courseDetails,
  };
}
