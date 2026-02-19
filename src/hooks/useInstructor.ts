import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { mockCourses, seedUsers } from "@/mocks/data";
import { Course, loadCourses, saveCourses, loadEnrollments } from "./useCourses";

// Fetch instructor's courses (mock)
export function useInstructorCourses() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["instructor-courses", user?.id],
    queryFn: async () => {
      if (!user) return [];
      return loadCourses().filter((c) => c.instructor_id === user.id);
    },
    enabled: !!user,
  });
}

// For the mock front-end, creation/update actions are no-ops that simply resolve.
export function useCreateCourse() {
  const { user } = useAuth();

  return {
    mutateAsync: async (courseData: {
      title: string;
      slug: string;
      category: string;
      level: string;
      description?: string;
      short_description?: string;
      price?: number;
      image_url?: string;
    }) => {
      if (!user) throw new Error("Must be logged in");
      const courses = loadCourses();
      const newCourse: Course = {
        id: `course-${Math.random().toString(36).slice(2, 10)}`,
        instructor_id: user.id,
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description || null,
        short_description: courseData.short_description || null,
        image_url: courseData.image_url || null,
        category: courseData.category,
        level: courseData.level,
        price: courseData.price ?? 0,
        original_price: null,
        duration_hours: 0,
        status: "draft",
        is_featured: false,
        badge: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: null,
        review_feedback: "Draft saved. Submit for review when ready.",
        modules: [],
        instructor: {
          full_name: user.full_name || "Instructor",
          avatar_url: user.avatar_url || null,
        },
        _count: {
          lessons: 0,
          enrollments: 0,
          reviews: 0,
        },
        _avg: {
          rating: 0,
        },
      };
      saveCourses([newCourse, ...courses]);
      return newCourse;
    },
    isPending: false,
  };
}

export function useUpdateCourse() {
  return {
    mutateAsync: async ({ courseId, data }: { courseId: string; data: Partial<Course> }) => {
      const courses = loadCourses();
      const updated = courses.map((c) =>
        c.id === courseId
          ? {
              ...c,
              ...data,
              updated_at: new Date().toISOString(),
            }
          : c
      );
      saveCourses(updated);
      return updated.find((c) => c.id === courseId);
    },
    isPending: false,
  };
}

export function useSubmitCourseForReview() {
  return {
    mutateAsync: async (courseId: string) => {
      const courses = loadCourses();
      const updated = courses.map((c) =>
        c.id === courseId
          ? {
              ...c,
              status: "under_review",
              updated_at: new Date().toISOString(),
              review_feedback: "Submitted for admin review.",
            }
          : c
      );
      saveCourses(updated);
      return updated.find((c) => c.id === courseId);
    },
    isPending: false,
  };
}

export function useCreateModule() {
  return { mutateAsync: async () => {}, isPending: false };
}

export function useCreateLesson() {
  return { mutateAsync: async () => {}, isPending: false };
}

export function useCourseStudents(courseId: string) {
  return useQuery({
    queryKey: ["course-students", courseId],
    queryFn: async () => {
      const enrollments = loadEnrollments().filter((e) => e.course_id === courseId);
      return enrollments.map((e) => {
        const learner = seedUsers.find((u) => u.id === e.user_id);
        return {
          id: e.id,
          full_name: learner?.full_name || "Learner",
          email: learner?.email || "",
          enrolled_at: e.enrolled_at,
          progress_label: e.progress_label || "In progress",
        };
      });
    },
    enabled: !!courseId,
  });
}

export function useArchiveCourse() {
  return {
    mutateAsync: async (courseId: string) => {
      const courses = loadCourses().map((c) =>
        c.id === courseId
          ? {
              ...c,
              status: "archived",
              updated_at: new Date().toISOString(),
              review_feedback: "Archived by instructor.",
            }
          : c
      );
      saveCourses(courses);
      return courses.find((c) => c.id === courseId);
    },
    isPending: false,
  };
}

export function useRestoreCourse() {
  return {
    mutateAsync: async (courseId: string) => {
      const courses = loadCourses().map((c) =>
        c.id === courseId
          ? {
              ...c,
              status: "draft",
              updated_at: new Date().toISOString(),
              review_feedback: "Restored to draft.",
            }
          : c
      );
      saveCourses(courses);
      return courses.find((c) => c.id === courseId);
    },
    isPending: false,
  };
}

export function useDuplicateCourse() {
  const { user } = useAuth();
  return {
    mutateAsync: async (courseId: string) => {
      const courses = loadCourses();
      const base = courses.find((c) => c.id === courseId);
      if (!base) throw new Error("Course not found");
      const copy: Course = {
        ...base,
        id: `course-${Math.random().toString(36).slice(2, 10)}`,
        title: `${base.title} (Copy)`,
        slug: `${base.slug}-copy-${Date.now()}`,
        status: "draft",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: null,
        review_feedback: "Draft copy created. Submit for review when ready.",
        instructor_id: user?.id || base.instructor_id,
      };
      saveCourses([copy, ...courses]);
      return copy;
    },
    isPending: false,
  };
}


export function useDeleteCourse() {
  return {
    mutateAsync: async (courseId: string) => {
      const courses = loadCourses();
      const filtered = courses.filter((c) => c.id !== courseId);
      saveCourses(filtered);
      return { success: true };
    },
    isPending: false,
  };
}
