import { Course, Module, Lesson, Enrollment } from "@/hooks/useCourses";
import { AppRole } from "@/contexts/AuthContext";

const makeId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

// Seed users (used for display only; auth writes to localStorage)
// All users use password: "password" for local development
export const seedUsers: Array<{
  id: string;
  email: string;
  full_name: string;
  role: AppRole;
}> = [
  {
    id: "admin-1",
    email: "admin@browz.com",
    full_name: "Avery Admin",
    role: "admin",
  },
  {
    id: "inst-1",
    email: "instructor@browz.com",
    full_name: "Indie Instructor",
    role: "instructor",
  },
  {
    id: "learner-1",
    email: "learner@browz.com",
    full_name: "Lara Learner",
    role: "learner",
  },
];

const now = new Date().toISOString();

export const mockLessons: Lesson[] = [
  {
    id: "lesson-1",
    module_id: "module-1",
    title: "Welcome & Safety",
    description: "Introduction to course and safety foundations.",
    content: "This is placeholder lesson content.",
    video_url: null,
    duration_minutes: 8,
    sort_order: 1,
    is_preview: true,
  },
  {
    id: "lesson-2",
    module_id: "module-1",
    title: "Tools & Setup",
    description: "Learn the basic toolkit.",
    content: "Toolkit overview and setup tips.",
    video_url: null,
    duration_minutes: 12,
    sort_order: 2,
    is_preview: false,
  },
];

export const mockModules: Module[] = [
  {
    id: "module-1",
    course_id: "course-1",
    title: "Getting Started",
    description: "Kick off your learning journey.",
    sort_order: 1,
    lessons: mockLessons,
  },
];

export const mockCourses: Course[] = [
  {
    id: "course-1",
    instructor_id: "inst-1",
    title: "Beauty Foundations",
    slug: "beauty-foundations",
    description: "Learn the essentials of beauty techniques.",
    short_description: "Master the fundamentals.",
    image_url: null,
    category: "skincare",
    level: "beginner",
    price: 49,
    original_price: 99,
    duration_hours: 4,
    status: "published",
    is_featured: true,
    badge: "popular",
    created_at: now,
    updated_at: now,
    published_at: now,
    review_feedback: "Approved. Great pacing and clear outcomes.",
    modules: mockModules,
    instructor: {
      full_name: "Indie Instructor",
      avatar_url: null,
    },
    _count: {
      lessons: mockLessons.length,
      enrollments: 1,
      reviews: 3,
    },
    _avg: {
      rating: 4.8,
    },
  },
  {
    id: "course-2",
    instructor_id: "inst-1",
    title: "Lash & Brow Styling",
    slug: "lash-brow-styling",
    description: "Shape, tint, and style lashes and brows with confidence.",
    short_description: "Pro styling toolkit.",
    image_url: null,
    category: "eye-feature",
    level: "intermediate",
    price: 79,
    original_price: 129,
    duration_hours: 5,
    status: "draft",
    is_featured: false,
    badge: null,
    created_at: now,
    updated_at: now,
    published_at: null,
    review_feedback: "Add more detail on safety checks before resubmitting.",
    modules: [],
    instructor: {
      full_name: "Indie Instructor",
      avatar_url: null,
    },
    _count: {
      lessons: 0,
      enrollments: 0,
      reviews: 0,
    },
    _avg: {
      rating: 0,
    },
  },
  {
    id: "course-3",
    instructor_id: "inst-1",
    title: "Advanced Skin Treatments",
    slug: "advanced-skin-treatments",
    description: "Peels, LED, and advanced protocols.",
    short_description: "For confident practitioners.",
    image_url: null,
    category: "facial-aesthetics",
    level: "advanced",
    price: 149,
    original_price: 199,
    duration_hours: 6,
    status: "under_review",
    is_featured: false,
    badge: "new",
    created_at: now,
    updated_at: now,
    published_at: null,
    review_feedback: "Under review by the admin team.",
    modules: [],
    instructor: {
      full_name: "Indie Instructor",
      avatar_url: null,
    },
    _count: {
      lessons: 0,
      enrollments: 0,
      reviews: 0,
    },
    _avg: {
      rating: 0,
    },
  },
  {
    id: "course-4",
    instructor_id: "inst-1",
    title: "Client Care Essentials",
    slug: "client-care-essentials",
    description: "Service rituals and aftercare.",
    short_description: "Client-first habits.",
    image_url: null,
    category: "client-care",
    level: "beginner",
    price: 0,
    original_price: null,
    duration_hours: 2,
    status: "archived",
    is_featured: false,
    badge: null,
    created_at: now,
    updated_at: now,
    published_at: null,
    review_feedback: "Archived by instructor.",
    modules: [],
    instructor: {
      full_name: "Indie Instructor",
      avatar_url: null,
    },
    _count: {
      lessons: 0,
      enrollments: 0,
      reviews: 0,
    },
    _avg: {
      rating: 0,
    },
  },
];

export const mockEnrollments: Enrollment[] = [
  {
    id: makeId("enroll"),
    user_id: "learner-1",
    course_id: "course-1",
    status: "active",
    enrolled_at: now,
    completed_at: null,
    progress_label: "In progress",
  },
];
