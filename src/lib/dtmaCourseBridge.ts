import {
  dtmaCoursesNew,
  getCourseById,
  type Course as DtmaCourse,
  type Lesson as DtmaLesson,
  type Module as DtmaModule,
} from "@/data/dtmaCoursesNew";
import type { Course, Lesson, Module } from "@/hooks/useCourses";

const DTMA_ECONOMY_COURSE_ID = "course-economy-40";
const LEGACY_BEAUTY_COURSE_ID = "course-1";

function parseDurationMinutes(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 15;
}

function dtmaLessonToMockLesson(lesson: DtmaLesson, moduleId: string, index: number): Lesson {
  return {
    id: lesson.id,
    module_id: moduleId,
    title: lesson.title,
    description: lesson.type === "quiz" ? "Module assessment" : null,
    content: lesson.type === "reading" ? lesson.videoUrl ?? null : null,
    video_url: lesson.videoUrl ?? lesson.imageUrl ?? null,
    duration_minutes: parseDurationMinutes(lesson.duration),
    sort_order: index + 1,
    is_preview: index === 0,
  };
}

function dtmaModuleToMockModule(module: DtmaModule, courseId: string, index: number): Module {
  return {
    id: module.id,
    course_id: courseId,
    title: module.title,
    description: module.description,
    sort_order: index + 1,
    lessons: module.lessons.map((lesson, lessonIndex) =>
      dtmaLessonToMockLesson(lesson, module.id, lessonIndex)
    ),
  };
}

export function dtmaCourseToMockCourse(dtmaCourse: DtmaCourse): Course {
  const modules = dtmaCourse.modules.map((module, index) =>
    dtmaModuleToMockModule(module, dtmaCourse.id, index)
  );
  const lessonCount = modules.reduce((sum, module) => sum + (module.lessons?.length ?? 0), 0);
  const durationHours = Number.parseFloat(dtmaCourse.duration) || 1;

  return {
    id: dtmaCourse.id,
    instructor_id: "inst-1",
    title: dtmaCourse.title,
    slug: dtmaCourse.id,
    description: dtmaCourse.description,
    short_description: dtmaCourse.shortTitle,
    image_url: dtmaCourse.image,
    category: dtmaCourse.category,
    level: dtmaCourse.level.toLowerCase(),
    price: dtmaCourse.price,
    original_price: dtmaCourse.originalPrice,
    duration_hours: Number.isNaN(durationHours) ? 1 : durationHours,
    status: dtmaCourse.comingSoon ? "draft" : "published",
    is_featured: dtmaCourse.badge === "Bestseller" || dtmaCourse.badge === "Popular",
    badge:
      dtmaCourse.badge === "Bestseller"
        ? "bestseller"
        : dtmaCourse.badge === "New"
          ? "new"
          : dtmaCourse.badge === "Popular"
            ? "popular"
            : null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: dtmaCourse.comingSoon ? null : new Date().toISOString(),
    modules,
    instructor: {
      full_name: dtmaCourse.instructor,
      avatar_url: null,
    },
    _count: {
      lessons: lessonCount,
      enrollments: 0,
      reviews: dtmaCourse.reviews,
    },
    _avg: {
      rating: dtmaCourse.rating,
    },
  };
}

export function getPublishedDtmaMockCourses(): Course[] {
  return dtmaCoursesNew
    .filter((course) => !course.comingSoon && course.modules.length > 0)
    .map(dtmaCourseToMockCourse);
}

export function resolveMockCourse(courseId: string, storedCourses: Course[]): Course | undefined {
  const dtmaCourse = getCourseById(courseId);
  if (dtmaCourse && !dtmaCourse.comingSoon) {
    return dtmaCourseToMockCourse(dtmaCourse);
  }

  return storedCourses.find((course) => course.id === courseId);
}

export function mergeCoursesWithDtma(storedCourses: Course[]): Course[] {
  const byId = new Map(storedCourses.map((course) => [course.id, course]));

  for (const dtmaCourse of getPublishedDtmaMockCourses()) {
    byId.set(dtmaCourse.id, dtmaCourse);
  }

  return Array.from(byId.values());
}

export function migrateEnrollmentCourseIds(enrollments: EnrollmentLike[]): {
  enrollments: EnrollmentLike[];
  changed: boolean;
} {
  let changed = false;

  const migrated = enrollments.map((enrollment) => {
    if (enrollment.course_id === LEGACY_BEAUTY_COURSE_ID) {
      changed = true;
      return { ...enrollment, course_id: DTMA_ECONOMY_COURSE_ID };
    }
    return enrollment;
  });

  return { enrollments: migrated, changed };
}

type EnrollmentLike = {
  course_id: string;
  [key: string]: unknown;
};

export { DTMA_ECONOMY_COURSE_ID, LEGACY_BEAUTY_COURSE_ID };
