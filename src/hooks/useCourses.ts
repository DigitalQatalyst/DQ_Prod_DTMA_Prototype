import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { mockCourses, mockEnrollments, mockModules, mockLessons } from "@/mocks/data";

export interface Course {
  id: string;
  instructor_id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  image_url: string | null;
  category: string;
  level: string;
  price: number;
  original_price: number | null;
  duration_hours: number;
  status: "draft" | "under_review" | "published" | "archived";
  is_featured: boolean;
  badge: "bestseller" | "new" | "popular" | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  review_feedback?: string | null;
  prerequisites?: string[]; // Array of course IDs that must be completed first
  modules?: Module[];
  instructor?: {
    full_name: string;
    avatar_url: string | null;
  };
  _count?: {
    lessons: number;
    enrollments: number;
    reviews: number;
  };
  _avg?: {
    rating: number;
  };
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  content: string | null;
  video_url: string | null;
  duration_minutes: number;
  sort_order: number;
  is_preview: boolean;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: "active" | "completed" | "cancelled";
  enrolled_at: string;
  completed_at: string | null;
  course?: Course;
  progress?: number;
  progress_label?: "Not started" | "In progress" | "Completed";
}

export const COURSES_KEY = "mock_courses";
export const ENROLLMENTS_KEY = "mock_enrollments";
export const PROGRESS_KEY = "mock_lesson_progress";

export const loadCourses = (): Course[] => {
  const raw = localStorage.getItem(COURSES_KEY);
  if (raw) return JSON.parse(raw) as Course[];
  localStorage.setItem(COURSES_KEY, JSON.stringify(mockCourses));
  return mockCourses;
};

export const saveCourses = (courses: Course[]) => {
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
};

export const loadEnrollments = (): Enrollment[] => {
  const raw = localStorage.getItem(ENROLLMENTS_KEY);
  if (raw) return JSON.parse(raw) as Enrollment[];
  localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(mockEnrollments));
  return mockEnrollments;
};

export const saveEnrollments = (enrollments: Enrollment[]) => {
  localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(enrollments));
};

export const loadProgress = (): Record<string, boolean> => {
  const raw = localStorage.getItem(PROGRESS_KEY);
  if (raw) return JSON.parse(raw) as Record<string, boolean>;
  return {};
};

export const saveProgress = (progress: Record<string, boolean>) => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

// Fetch all published courses
export function useCourses(filters?: {
  category?: string;
  level?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["courses", filters],
    queryFn: async () => {
      let courses = loadCourses().filter((c) => c.status === "published");

      if (filters?.category && filters.category !== "all") {
        courses = courses.filter((c) => c.category === filters.category);
      }
      if (filters?.level && filters.level !== "all") {
        courses = courses.filter((c) => c.level === filters.level);
      }
      if (filters?.search) {
        const term = filters.search.toLowerCase();
        courses = courses.filter((c) => c.title.toLowerCase().includes(term));
      }

      return courses;
    },
  });
}

// Fetch single course with details
export function useCourse(courseId: string) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const course = loadCourses().find((c) => c.id === courseId);
      if (!course) throw new Error("Course not found");

      const modules = mockModules
        .filter((m) => m.course_id === courseId)
        .map((m) => ({
          ...m,
          lessons: mockLessons.filter((l) => l.module_id === m.id),
        }));

      const lessonCount = modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);

      return {
        ...course,
        modules,
        _count: {
          lessons: lessonCount,
          enrollments: course._count?.enrollments ?? 0,
          reviews: course._count?.reviews ?? 0,
        },
        _avg: {
          rating: course._avg?.rating ?? 0,
        },
      } as Course;
    },
    enabled: !!courseId,
  });
}

// Check if user has completed all prerequisites for a course
export function usePrerequisitesStatus(courseId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["prerequisites", user?.id, courseId],
    queryFn: async () => {
      if (!user) return { met: false, prerequisites: [], completed: [], missing: [] };

      const course = loadCourses().find((c) => c.id === courseId);
      if (!course || !course.prerequisites || course.prerequisites.length === 0) {
        return { met: true, prerequisites: [], completed: [], missing: [] };
      }

      const enrollments = loadEnrollments().filter((e) => e.user_id === user.id);
      const completedCourseIds = enrollments
        .filter((e) => e.status === "completed")
        .map((e) => e.course_id);

      const prerequisiteCourses = loadCourses().filter((c) =>
        course.prerequisites?.includes(c.id)
      );

      const completed = prerequisiteCourses.filter((c) =>
        completedCourseIds.includes(c.id)
      );

      const missing = prerequisiteCourses.filter(
        (c) => !completedCourseIds.includes(c.id)
      );

      return {
        met: missing.length === 0,
        prerequisites: prerequisiteCourses,
        completed,
        missing,
      };
    },
    enabled: !!user && !!courseId,
  });
}

// User's enrollments
export function useEnrollments() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["enrollments", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const enrollments = loadEnrollments().filter((e) => e.user_id === user.id);
      return enrollments.map((e) => ({
        ...e,
        course: loadCourses().find((c) => c.id === e.course_id),
        progress: e.progress ?? 50,
      }));
    },
    enabled: !!user,
  });
}

// Check if user is enrolled in a course
export function useIsEnrolled(courseId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["enrollment", user?.id, courseId],
    queryFn: async () => {
      if (!user) return false;
      return loadEnrollments().some((e) => e.user_id === user.id && e.course_id === courseId);
    },
    enabled: !!user && !!courseId,
  });
}

// Enroll in a course (mock)
export function useEnrollInCourse() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) throw new Error("Must be logged in to enroll");
      const existing = loadEnrollments();
      if (existing.some((e) => e.user_id === user.id && e.course_id === courseId)) {
        return;
      }
      const newEnrollment: Enrollment = {
        id: `enroll-${Math.random().toString(36).slice(2, 10)}`,
        user_id: user.id,
        course_id: courseId,
        status: "active",
        enrolled_at: new Date().toISOString(),
        completed_at: null,
        progress_label: "Not started",
      };
      const next = [...existing, newEnrollment];
      saveEnrollments(next);
      return newEnrollment;
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["enrollment", user?.id, courseId] });
    },
  });
}

// Track lesson progress locally
export function useLessonProgress(courseId: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["lesson-progress", user?.id, courseId],
    queryFn: async () => {
      if (!user) return {};
      return loadProgress();
    },
    enabled: !!user && !!courseId,
  });
}

// Update lesson progress
export function useUpdateLessonProgress() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      lessonId,
      completed,
    }: {
      lessonId: string;
      completed?: boolean;
      progressPercent?: number;
      lastPositionSeconds?: number;
    }) => {
      if (!user) throw new Error("Must be logged in");
      const current = loadProgress();
      current[lessonId] = completed ?? false;
      saveProgress(current);
      return current;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["lesson-progress"] });
    },
  });
}

// User's certificates (mock empty)
export function useCertificates() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["certificates", user?.id],
    queryFn: async () => [],
    enabled: !!user,
  });
}
