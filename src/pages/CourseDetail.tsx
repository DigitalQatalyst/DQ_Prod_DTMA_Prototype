import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PublicPageLayout from "@/components/layout/PublicPageLayout";
import MeshSection from "@/components/layout/MeshSection";
import CourseCard from "@/components/marketing/CourseCard";
import MarketingCtaBand from "@/components/marketing/MarketingCtaBand";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Star,
  Clock,
  BookOpen,
  Award,
  Play,
  Download,
  Globe,
  CheckCircle,
  ChevronLeft,
  PlayCircle,
  FileText,
  Lock,
  ChevronRight,
} from "lucide-react";
import { useCourse, useIsEnrolled } from "@/hooks/useCourses";
import { useAuth } from "@/contexts/AuthContext";
import { EnrollmentModal } from "@/components/enrollment/EnrollmentModal";
import { getCourseById } from "@/data/dtmaCoursesNew";
import {
  btnPrimary,
  btnSecondary,
  eyebrow,
  sectionHeading,
  sectionPaddingX,
} from "@/lib/brandAccent";
import { cn } from "@/lib/utils";
import type { Course } from "@/data/dtmaCoursesNew";

const CATEGORY_LABELS: Record<string, string> = {
  "digital-economy": "Digital Economy",
  "digital-cognitive-organisation": "Digital Cognitive Organisation",
  "digital-business-platform": "Digital Business Platform",
  "digital-transformation": "Digital Transformation 2.0",
  "digital-worker-workspace": "Digital Worker & Workspace",
  "digital-accelerators": "Digital Accelerators",
};

const formatCategory = (slug: string) =>
  CATEGORY_LABELS[slug] ??
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

type DisplayCourse = Course & {
  subtitle?: string;
  whatYouWillLearn?: string[];
  outcomes?: string[];
  requirements?: string[];
  curriculum?: Array<{
    title: string;
    duration: string;
    lessons: Array<{ title: string; duration?: string; type: string; preview?: boolean }>;
  }>;
  includes?: Array<{ icon: typeof Play; text: string }>;
  students?: number;
  language?: string;
};

function getLearningOutcomes(course: DisplayCourse): string[] {
  if (course.whatYouWillLearn?.length) return course.whatYouWillLearn;
  if (course.outcomes?.length) return course.outcomes;
  if (course.modules?.length) {
    return course.modules.map((m) => m.description).filter(Boolean).slice(0, 6);
  }
  return [];
}

export type CourseDetailProps = {
  embedded?: boolean;
  courseId?: string;
  onBack?: () => void;
  onCourseSelect?: (courseId: string) => void;
  onEnrolled?: (courseId: string) => void;
};

const CourseDetail = ({
  embedded = false,
  courseId: courseIdProp,
  onBack,
  onCourseSelect,
  onEnrolled,
}: CourseDetailProps = {}) => {
  const { id: paramId } = useParams();
  const id = courseIdProp ?? paramId;
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch real course data
  const { data: _courseData, isLoading: _courseLoading } = useCourse(id || "");
  const { data: isEnrolled, isLoading: enrollmentLoading } = useIsEnrolled(id || "");

  // Enrollment modal state
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const recommendedCourses = [
    {
      id: "course-economy-40",
      title: "Mastering Economy 4.0",
      category: "Digital Economy",
      level: "Beginner",
      rating: 4.8,
      reviews: 320,
      students: 12453,
      price: 149,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      duration: "12 hours",
      badge: "Bestseller",
      comingSoon: false,
    },
    {
      id: "course-cognitive-org",
      title: "Decoding Digital Cognitive Organisations",
      category: "Digital Cognitive Organisation",
      level: "Intermediate",
      rating: 4.9,
      reviews: 245,
      students: 12453,
      price: 149,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      duration: "15 hours",
      badge: "Coming Soon",
      comingSoon: true,
    },
    {
      id: "course-business-platforms",
      title: "Building Powerful Digital Business Platforms",
      category: "Digital Business Platform",
      level: "Intermediate",
      rating: 4.7,
      reviews: 289,
      students: 12453,
      price: 149,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      duration: "18 hours",
      badge: "Coming Soon",
      comingSoon: true,
    },
    {
      id: "course-transformation",
      title: "Navigating Digital Transformation 2.0",
      category: "Digital Transformation",
      level: "Advanced",
      rating: 4.8,
      reviews: 312,
      students: 12453,
      price: 149,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
      duration: "16 hours",
      badge: "Coming Soon",
      comingSoon: true,
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleEnroll = () => {
    // If not logged in, redirect to auth
    if (!user) {
      navigate(`/auth?mode=signup&redirect=/courses/${id}`);
      return;
    }

    // If already enrolled, go to learning page
    if (isEnrolled) {
      navigate(`/courses/${id}/learn`);
      return;
    }

    // Show enrollment modal
    setShowEnrollmentModal(true);
  };

  const handleEnrollmentComplete = () => {
    if (embedded && onEnrolled) {
      onEnrolled(id || "");
      return;
    }
    navigate(`/courses/${id}/learn`);
  };

  // Get course from new data structure
  const courseFromNew = getCourseById(id || "");

  // Mock course data for fallback
  const mockCourse = {
    id: id || "digital-economy-1",
    title: "Introduction to Digital Economy & Economy 4.0",
    subtitle: "Understand how the digital economy is reshaping industries, value chains, and competitive dynamics in Economy 4.0.",
    instructor: {
      name: "DTMA Faculty",
      title: "Digital Transformation Experts",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      students: 15420,
      courses: 24,
      bio: "DTMA Faculty includes multidisciplinary educators with expertise in digital transformation, organizational change, and the 6XD framework.",
    },
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    previewVideo: "#",
    category: "Digital Economy",
    level: "Beginner",
    duration: "4 hours",
    lessons: 10,
    rating: 4.8,
    reviews: 320,
    students: 12453,
    price: 149,
    originalPrice: 199,
    badge: "New",
    language: "English",
    lastUpdated: "January 2026",
    certificate: true,
    description: `Build a solid foundation in understanding the digital economy and Economy 4.0. Learn how digital technologies are transforming industries, creating new business models, and reshaping competitive dynamics. Gain the clarity needed to position your organization for success in the new digital landscape.`,

    whatYouWillLearn: [
      "Understand the fundamental shifts driving Economy 4.0",
      "Identify how digital technologies are reshaping value chains",
      "Recognize new business models emerging in the digital economy",
      "Assess your organization's readiness for digital transformation",
      "Develop strategic thinking for digital economy positioning",
      "Apply 6XD framework principles to economic analysis",
    ],

    requirements: [
      "Interest in digital transformation and organizational change",
      "Basic understanding of business concepts",
      "Willingness to think strategically about digital disruption",
    ],

    curriculum: [
      {
        title: "Module 1: Understanding Economy 4.0",
        duration: "1h 30m",
        lessons: [
          { title: "Course Welcome & The Digital Economy Landscape", duration: "5:00", type: "video", preview: true },
          { title: "From Economy 3.0 to Economy 4.0", duration: "18:00", type: "video", preview: false },
          { title: "Key Technologies Driving Change", duration: "22:00", type: "video", preview: false },
          { title: "Industry Disruption Patterns", duration: "16:00", type: "video", preview: false },
        ],
      },
      {
        title: "Module 2: Digital Business Models",
        duration: "1h 40m",
        lessons: [
          { title: "Platform Economics and Network Effects", duration: "20:00", type: "video", preview: false },
          { title: "Data as a Strategic Asset", duration: "18:00", type: "video", preview: false },
          { title: "Ecosystem Thinking and Partnerships", duration: "22:00", type: "video", preview: false },
          { title: "Value Chain Transformation", duration: "20:00", type: "video", preview: false },
        ],
      },
      {
        title: "Module 3: Strategic Positioning",
        duration: "1h 20m",
        lessons: [
          { title: "Assessing Digital Maturity", duration: "18:00", type: "video", preview: false },
          { title: "Competitive Dynamics in Digital Markets", duration: "16:00", type: "video", preview: false },
          { title: "Building Digital Capabilities", duration: "18:00", type: "video", preview: false },
          { title: "Creating Your Digital Strategy", duration: "14:00", type: "video", preview: false },
        ],
      },
    ],

    includes: [
      { icon: Play, text: "4 hours on-demand video" },
      { icon: FileText, text: "10 lessons with practical frameworks" },
      { icon: Download, text: "Downloadable strategy templates" },
      { icon: Globe, text: "Full lifetime access" },
      { icon: Award, text: "KHDA-attested certificate" },
    ],
  };

  // Use real course data for display
  const displayCourse = (courseFromNew || mockCourse) as DisplayCourse;

  const totalLessons =
    displayCourse.modules?.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0) ||
    displayCourse.curriculum?.reduce((acc, mod) => acc + mod.lessons.length, 0) ||
    displayCourse.totalLessons ||
    0;

  const moduleList = displayCourse.modules || displayCourse.curriculum || [];
  const learningOutcomes = getLearningOutcomes(displayCourse);
  const categoryLabel = formatCategory(displayCourse.category);
  const instructorName =
    typeof displayCourse.instructor === "string"
      ? displayCourse.instructor
      : displayCourse.instructor.name;
  const instructorTitle =
    typeof displayCourse.instructor === "string"
      ? "Digital Transformation Experts"
      : displayCourse.instructor.title;
  const instructorImage =
    typeof displayCourse.instructor === "string"
      ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
      : displayCourse.instructor.image;
  const includesList =
    displayCourse.includes ?? [
      { icon: Play, text: `${displayCourse.duration} on-demand video` },
      { icon: FileText, text: `${totalLessons} lessons across ${moduleList.length} modules` },
      { icon: Globe, text: "Full lifetime access" },
      { icon: Award, text: "KHDA-attested certificate" },
    ];

  const discountPct = Math.round(
    (1 - displayCourse.price / displayCourse.originalPrice) * 100
  );

  const purchaseCard = (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card">
      <div className="relative aspect-video">
        <img src={displayCourse.image} alt={displayCourse.title} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <div className="mb-6 flex flex-wrap items-baseline gap-2">
          <span className="text-3xl font-semibold text-dq-navy">${displayCourse.price}</span>
          <span className="text-lg text-gray-400 line-through">${displayCourse.originalPrice}</span>
          {discountPct > 0 && (
            <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-dq-orange">
              {discountPct}% off
            </span>
          )}
        </div>
        <div className="space-y-3">
          {displayCourse.comingSoon ? (
            <Button className="w-full cursor-not-allowed rounded-full bg-gray-400 text-white" disabled>
              Coming Soon
            </Button>
          ) : (
            <>
              <Button
                className={cn(btnPrimary, "w-full")}
                onClick={handleEnroll}
                disabled={authLoading || enrollmentLoading}
              >
                {isEnrolled ? "Start Learning" : "Enroll Now"}
              </Button>
              {!isEnrolled && (
                <Button variant="outline" className={cn(btnSecondary, "w-full")}>
                  Add to Wishlist
                </Button>
              )}
            </>
          )}
        </div>
        <p className="mb-6 mt-4 text-center text-[13px] text-gray-500">30-day money-back guarantee</p>
        <h4 className={`${sectionHeading} mb-4`}>This course includes</h4>
        <ul className="space-y-3">
          {includesList.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
              <item.icon className="h-4 w-4 shrink-0 text-dq-orange" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const mainContent = (
    <main className={cn(embedded ? "pb-4" : "pb-20")}>
      {!embedded && (
        <div className="sticky top-16 z-40 border-b border-gray-200 bg-white lg:hidden">
          <div className={`mx-auto flex max-w-[1200px] items-center justify-between ${sectionPaddingX} py-3`}>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-dq-navy">${displayCourse.price}</span>
              <span className="text-sm text-gray-400 line-through">${displayCourse.originalPrice}</span>
            </div>
            {displayCourse.comingSoon ? (
              <Button className="cursor-not-allowed rounded-full bg-gray-400 text-white" disabled>
                Coming Soon
              </Button>
            ) : (
              <Button className={btnPrimary} onClick={handleEnroll} disabled={authLoading || enrollmentLoading}>
                {isEnrolled ? "Start Learning" : "Enroll Now"}
              </Button>
            )}
          </div>
        </div>
      )}

      <div className={cn("mx-auto max-w-[1200px]", !embedded && sectionPaddingX)}>
        {!embedded && (
          <Link
            to="/courses"
            className="mb-8 inline-flex items-center gap-2 pt-20 text-sm text-gray-500 transition-colors hover:text-dq-navy md:pt-24"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        )}

          <div className={cn("grid", embedded ? "gap-6 lg:grid-cols-3 lg:gap-8" : "gap-10 lg:grid-cols-3 lg:gap-12")}>
            {embedded && (
              <div className="lg:hidden">
                {purchaseCard}
              </div>
            )}
            <div className={cn(embedded ? "space-y-8" : "space-y-16", "lg:col-span-2")}>
              <MeshSection variant="heroLight" grid className={cn(
                embedded
                  ? "rounded-xl border border-gray-200 bg-white px-5 py-6"
                  : "rounded-none border-b border-gray-100 pb-10 -mx-5 px-5 md:-mx-8 md:px-8 lg:-mx-10 lg:rounded-2xl lg:border lg:px-10"
              )}>
                <div className="relative z-10">
                  {!embedded && (
                  <div className="mb-4 flex flex-wrap gap-2">
                  {displayCourse.badge && (
                    <Badge className="rounded-full border-0 bg-dq-orange px-3 text-white">
                      {displayCourse.badge}
                    </Badge>
                  )}
                  <Badge className="rounded-full border-0 bg-gray-100 px-3 text-dq-navy">
                    {categoryLabel}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-gray-200 bg-white px-3 text-gray-600">
                    {displayCourse.level}
                  </Badge>
                </div>
                  )}

                <h1 className={cn(
                  "mb-3 font-semibold leading-[1.15] tracking-tight text-dq-navy",
                  embedded ? "text-xl sm:text-2xl" : "mb-4 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1]"
                )}>
                  {displayCourse.title}
                </h1>

                <p className={cn(
                  "max-w-2xl leading-relaxed text-[#667085]",
                  embedded ? "mb-4 text-sm" : "mb-6 text-base leading-[1.7]"
                )}>
                  {displayCourse.description || displayCourse.subtitle}
                </p>

                <div className={cn(
                  "flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600",
                  embedded ? "mb-4" : "mb-6"
                )}>
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-dq-orange text-dq-orange" />
                    <span className="font-semibold text-dq-navy">{displayCourse.rating}</span>
                    <span className="text-gray-500">({displayCourse.reviews} reviews)</span>
                  </span>
                  <span className="hidden text-gray-300 sm:inline" aria-hidden>
                    |
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {displayCourse.duration}
                  </span>
                  {!displayCourse.comingSoon ? (
                    <>
                      <span className="hidden text-gray-300 sm:inline" aria-hidden>
                        |
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        {`${moduleList.length} modules, ${totalLessons} lessons`}
                      </span>
                    </>
                  ) : null}
                  <span className="hidden text-gray-300 sm:inline" aria-hidden>
                    |
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-gray-400" />
                    {displayCourse.language ?? "English"}
                  </span>
                </div>

                <div className={cn(
                  "flex items-center gap-3 border-t border-gray-200/80",
                  embedded ? "pt-4" : "pt-6"
                )}>
                  <img
                    src={instructorImage}
                    alt={instructorName}
                    className={cn("rounded-full object-cover", embedded ? "h-9 w-9" : "h-11 w-11")}
                  />
                  <div>
                    <p className="text-sm font-medium text-dq-navy">
                      Created by <span className="font-semibold">{instructorName}</span>
                    </p>
                    <p className="text-xs text-gray-500">{instructorTitle}</p>
                  </div>
                </div>
                </div>
              </MeshSection>

              {learningOutcomes.length > 0 && (
                <div>
                  {!embedded && <p className={`${eyebrow} mb-3`}>Outcomes</p>}
                  <h2 className={cn(sectionHeading, embedded ? "mb-4" : "mb-6")}>What you&apos;ll learn</h2>
                  <div className={cn(
                    "grid gap-3 rounded-2xl border border-gray-200 bg-gray-50 sm:grid-cols-2",
                    embedded ? "p-4" : "p-6"
                  )}>
                    {learningOutcomes.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-dq-orange" />
                        <span className="text-sm leading-relaxed text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                {!embedded && <p className={`${eyebrow} mb-3`}>Curriculum</p>}
                <h2 className={cn(sectionHeading, "mb-2")}>Course content</h2>
                <p className={cn("mb-4 text-sm text-gray-500", !embedded && "mb-6")}>
                  {moduleList.length} modules · {totalLessons} lessons · {displayCourse.duration} total
                </p>
                <Accordion type="multiple" className="space-y-3">
                  {moduleList.map((module, moduleIndex) => (
                    <AccordionItem
                      key={moduleIndex}
                      value={`module-${moduleIndex}`}
                      className="rounded-2xl border border-gray-200 bg-white px-5 transition-colors hover:border-dq-orange/40"
                    >
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <div className="flex w-full items-start justify-between gap-4 pr-2 text-left">
                          <span className="text-base font-medium text-dq-navy">{module.title}</span>
                          <span className="shrink-0 text-xs text-gray-500">
                            {module.lessons.length} lessons · {module.duration}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 border-t border-gray-100 pb-3 pt-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li
                              key={lessonIndex}
                              className="flex items-center justify-between rounded-lg px-2 py-2.5 hover:bg-gray-50"
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                {lesson.type === "video" && (
                                  <PlayCircle className="h-4 w-4 shrink-0 text-dq-orange" />
                                )}
                                {lesson.type === "reading" && (
                                  <FileText className="h-4 w-4 shrink-0 text-gray-400" />
                                )}
                                {lesson.type === "quiz" && (
                                  <Award className="h-4 w-4 shrink-0 text-dq-orange" />
                                )}
                                {!["video", "reading", "quiz"].includes(lesson.type) && (
                                  <FileText className="h-4 w-4 shrink-0 text-gray-400" />
                                )}
                                <span className="truncate text-sm text-gray-600">{lesson.title}</span>
                                {lesson.preview && (
                                  <Badge variant="secondary" className="shrink-0 rounded-full text-[11px]">
                                    Preview
                                  </Badge>
                                )}
                              </div>
                              <div className="flex shrink-0 items-center gap-2 pl-3">
                                {lesson.duration && (
                                  <span className="text-xs text-gray-400">{lesson.duration}</span>
                                )}
                                {!lesson.preview && <Lock className="h-3.5 w-3.5 text-gray-300" />}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {displayCourse.requirements && displayCourse.requirements.length > 0 && (
                <div>
                  {!embedded && <p className={`${eyebrow} mb-3`}>Prerequisites</p>}
                  <h2 className={cn(sectionHeading, embedded ? "mb-4" : "mb-6")}>Requirements</h2>
                  <ul className="space-y-3">
                    {displayCourse.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dq-orange" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                {!embedded && <p className={`${eyebrow} mb-3`}>Faculty</p>}
                <h2 className={cn(sectionHeading, embedded ? "mb-4" : "mb-6")}>Your instructor</h2>
                <div className={cn("rounded-2xl border border-gray-200 bg-white", embedded ? "p-4" : "p-6")}>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <img
                      src={instructorImage}
                      alt={instructorName}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-dq-navy">{instructorName}</h3>
                      <p className="mb-3 text-sm text-dq-orange">{instructorTitle}</p>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {typeof displayCourse.instructor === "string"
                          ? "DTMA Faculty includes multidisciplinary educators with expertise in digital transformation and the 6XD framework."
                          : displayCourse.instructor.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className={cn("sticky", embedded ? "top-4" : "top-24")}>{purchaseCard}</div>
            </div>
          </div>
        </div>

        {!embedded && (
        <section className={`bg-gray-50 py-16 ${sectionPaddingX}`}>
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className={`${eyebrow} mb-2`}>Continue learning</p>
                <h2 className={sectionHeading}>Recommended courses</h2>
              </div>
              <div className="hidden gap-2 md:flex">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("left")}
                  className="rounded-full border border-gray-200 bg-white hover:border-dq-orange"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("right")}
                  className="rounded-full border border-gray-200 bg-white hover:border-dq-orange"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {recommendedCourses.map((recCourse) => (
                <div key={recCourse.id} className="w-[300px] flex-shrink-0">
                  <CourseCard
                    course={{
                      ...recCourse,
                      category: recCourse.category,
                      modules: recCourse.comingSoon ? undefined : { length: 3 },
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {!embedded && (
        <MarketingCtaBand
          eyebrowText="Need guidance?"
          title="Not sure if this is the right fit?"
          description="Browse more courses or talk to our team about the best learning path for your role."
          primaryCta={{ label: "Talk to our team", href: "/help" }}
          secondaryCta={{ label: "Browse more courses", href: "/courses" }}
        />
        )}
      </main>
  );

  return (
    <>
      {embedded ? mainContent : <PublicPageLayout>{mainContent}</PublicPageLayout>}

      <EnrollmentModal
        open={showEnrollmentModal}
        onOpenChange={setShowEnrollmentModal}
        course={{
          id: id || "",
          title: displayCourse.title,
          price: displayCourse.price,
          originalPrice: displayCourse.originalPrice,
          imageUrl: displayCourse.image,
        }}
        onEnrollmentComplete={handleEnrollmentComplete}
      />
    </>
  );
};

export default CourseDetail;
