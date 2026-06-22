import { dtmaCoursesNew, type Course as DtmaCourse } from "@/data/dtmaCoursesNew";
import type { Enrollment } from "@/hooks/useCourses";

export type LearnerSkill = {
  id: string;
  name: string;
  score: number;
};

export type LearnerAchievement = {
  id: string;
  title: string;
  type: string;
  status: "earned" | "in-progress";
  progress?: number;
};

export type LearnerNextAction = {
  id: string;
  title: string;
  urgency: "overdue" | "due-soon" | "high-impact" | "optional";
  dueLabel?: string;
  href?: string;
};

export type LearnerUpcomingEvent = {
  id: string;
  title: string;
  when: string;
  eventType: "lesson" | "assignment" | "live" | "community";
};

export type LearnerPathNode = {
  id: string;
  title: string;
  status: "completed" | "current" | "locked";
};

export type LearnerRecommendation = {
  id: string;
  title: string;
  duration: string;
  rating: number;
  badge?: string;
  category: string;
  courseId?: string;
};

export type LearnerDashboardSnapshot = {
  journey: {
    title: string;
    type: string;
    progressPercent: number;
    completedModules: number;
    totalModules: number;
    nextMilestone: string;
    estimatedCompletion: string;
  };
  stats: {
    streakDays: number;
    learningHoursMonth: number;
    lessonsCompletedWeek: number;
    certificatesEarned: number;
    upcomingDue: number;
  };
  activeCourse: {
    courseId: string;
    title: string;
    image: string;
    lastLesson: string;
    durationRemaining: string;
    progressPercent: number;
    learnHref: string;
  } | null;
  aiCoachMessage: string;
  nextActions: LearnerNextAction[];
  upcomingEvents: LearnerUpcomingEvent[];
  skills: LearnerSkill[];
  insights: {
    completionRate: number;
    completionTrend: string;
    timeInvested: string;
    timeTrend: string;
    avgSession: string;
    sessionTrend: string;
    courseRank: string;
    rankTrend: string;
    chartData: { label: string; hours: number }[];
  };
  achievements: LearnerAchievement[];
  learningPath: LearnerPathNode[];
  recommendations: LearnerRecommendation[];
  community: {
    activeLearners: number;
    newDiscussions: number;
    trendingTopic: string;
  };
};

function getLastLessonTitle(course: DtmaCourse, progressPercent: number): string {
  const lessons = course.modules.flatMap((module) => module.lessons);
  if (lessons.length === 0) return "Getting started";

  const index = Math.min(
    lessons.length - 1,
    Math.max(0, Math.floor((progressPercent / 100) * lessons.length))
  );
  return lessons[index]?.title ?? lessons[0].title;
}

function estimateRemainingMinutes(course: DtmaCourse, progressPercent: number): number {
  const lessons = course.modules.flatMap((module) => module.lessons);
  const remainingRatio = Math.max(0, 1 - progressPercent / 100);
  const totalMinutes = lessons.reduce((sum, lesson) => {
    const match = lesson.duration.match(/(\d+)/);
    return sum + (match ? Number.parseInt(match[1], 10) : 15);
  }, 0);
  return Math.max(15, Math.round(totalMinutes * remainingRatio));
}

export function buildLearnerDashboardSnapshot({
  enrollments,
  certificateCount,
  onboardingGoal,
}: {
  enrollments: Enrollment[];
  certificateCount: number;
  onboardingGoal?: string;
}): LearnerDashboardSnapshot {
  const activeEnrollment =
    enrollments.find((enrollment) => enrollment.status === "active") ?? null;
  const progressPercent = activeEnrollment?.progress ?? 0;
  const activeDtmaCourse = activeEnrollment
    ? dtmaCoursesNew.find((course) => course.id === activeEnrollment.course_id)
    : undefined;

  const courseTitle = activeDtmaCourse?.title ?? activeEnrollment?.course?.title ?? "Mastering Economy 4.0";
  const courseId = activeEnrollment?.course_id ?? "course-economy-40";
  const courseImage =
    activeDtmaCourse?.image ??
    activeEnrollment?.course?.image_url ??
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop";

  const completedModules = activeDtmaCourse
    ? Math.max(1, Math.round((progressPercent / 100) * activeDtmaCourse.modules.length))
    : 4;
  const totalModules = activeDtmaCourse?.modules.length ?? 12;

  const nextCourse = dtmaCoursesNew.find((course) => course.id === "course-cognitive-org");

  return {
    journey: {
      title: onboardingGoal?.includes("transformation")
        ? "Digital Transformation Leader"
        : "Digital Cognitive Organization Architect",
      type: "Foundation",
      progressPercent: Math.max(progressPercent, 33),
      completedModules,
      totalModules,
      nextMilestone: "Platform Thinking",
      estimatedCompletion: "6 weeks",
    },
    stats: {
      streakDays: 5,
      learningHoursMonth: 8.5,
      lessonsCompletedWeek: 3,
      certificatesEarned: certificateCount,
      upcomingDue: 1,
    },
    activeCourse: activeEnrollment
      ? {
          courseId,
          title: courseTitle,
          image: courseImage,
          lastLesson: activeDtmaCourse
            ? getLastLessonTitle(activeDtmaCourse, progressPercent)
            : "Cognitive Value Creation",
          durationRemaining: activeDtmaCourse
            ? `${estimateRemainingMinutes(activeDtmaCourse, progressPercent)} mins`
            : "30 mins",
          progressPercent,
          learnHref: `/courses/${courseId}/learn`,
        }
      : null,
    aiCoachMessage: activeDtmaCourse
      ? `You're ${progressPercent}% through ${courseTitle}. Learners who complete this module typically continue with ${nextCourse?.title ?? "the next course in your path"}.`
      : "Start your first course to unlock personalised coaching and study recommendations.",
    nextActions: [
      {
        id: "lesson",
        title: "Complete Lesson 4",
        urgency: "high-impact",
        href: `/courses/${courseId}/learn`,
      },
      {
        id: "assignment",
        title: "Submit Assignment #1",
        urgency: "due-soon",
        dueLabel: "Due in 3 days",
      },
      {
        id: "discussion",
        title: "Join Discussion Forum",
        urgency: "optional",
      },
      {
        id: "milestone",
        title: "Unlock Certificate Milestone",
        urgency: "high-impact",
      },
    ],
    upcomingEvents: [
      {
        id: "today",
        title: `Continue ${activeDtmaCourse?.shortTitle ?? "Economy 4.0"}`,
        when: "Today",
        eventType: "lesson",
      },
      {
        id: "assignment",
        title: "Assignment #1 Due",
        when: "Tomorrow",
        eventType: "assignment",
      },
      {
        id: "masterclass",
        title: "Live Masterclass",
        when: "May 25",
        eventType: "live",
      },
    ],
    skills: [
      { id: "systems", name: "Systems Thinking", score: 75 },
      { id: "platform", name: "Platform Design", score: 30 },
      { id: "ai", name: "AI Fluency", score: 60 },
      { id: "data", name: "Data Literacy", score: 45 },
      { id: "cognitive", name: "Cognitive Leadership", score: 20 },
    ],
    insights: {
      completionRate: progressPercent || 50,
      completionTrend: "+12%",
      timeInvested: "8.5 hrs",
      timeTrend: "+2.1 hrs",
      avgSession: "27 mins",
      sessionTrend: "+5 mins",
      courseRank: "Top 25%",
      rankTrend: "+8%",
      chartData: [
        { label: "Week 1", hours: 1.2 },
        { label: "Week 2", hours: 2.1 },
        { label: "Week 3", hours: 1.8 },
        { label: "Week 4", hours: 3.4 },
      ],
    },
    achievements: [
      { id: "started", title: "First Course Started", type: "course", status: "earned" },
      { id: "hours", title: "5 Learning Hours", type: "hours", status: "earned" },
      { id: "assignment", title: "Assignment Completed", type: "assignment", status: "earned" },
      {
        id: "architect",
        title: "Cognitive Architect Badge",
        type: "journey",
        status: "in-progress",
        progress: 60,
      },
    ],
    learningPath: [
      { id: "course-economy-40", title: "Mastering Economy 4.0", status: "completed" },
      {
        id: "course-digital-workers",
        title: "Optimizing Digital Workers and Workspaces",
        status: "completed",
      },
      {
        id: "course-cognitive-org",
        title: "Decoding Digital Cognitive Organisations",
        status: "current",
      },
      { id: "course-business-platforms", title: "Building Powerful Digital Business Platforms", status: "locked" },
      { id: "course-transformation", title: "Navigating Digital Transformation 2.0", status: "locked" },
    ],
    recommendations: [
      {
        id: "rec-1",
        title: "Platform Thinking Masterclass",
        duration: "2 hours",
        rating: 4.9,
        badge: "Popular",
        category: "Masterclass",
      },
      {
        id: "rec-2",
        title: "AI & Data Fluency Fundamentals",
        duration: "4 hours",
        rating: 4.8,
        badge: "New",
        category: "Course",
        courseId: "course-economy-40",
      },
      {
        id: "rec-3",
        title: "Data-Driven Decision Making",
        duration: "3 hours",
        rating: 4.7,
        category: "Course",
      },
    ],
    community: {
      activeLearners: 34,
      newDiscussions: 12,
      trendingTopic: "AI-Native Organizations",
    },
  };
}
