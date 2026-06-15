import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";
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
  Users,
  Globe,
  CheckCircle,
  ChevronLeft,
  PlayCircle,
  FileText,
  Lock,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { useCourse, useIsEnrolled } from "@/hooks/useCourses";
import { useAuth } from "@/contexts/AuthContext";
import { EnrollmentModal } from "@/components/enrollment/EnrollmentModal";
import { getCourseById } from "@/data/dtmaCoursesNew";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch real course data
  const { data: courseData, isLoading: courseLoading } = useCourse(id || "");
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

  // Use real course data for display, with proper typing
  const displayCourse: any = courseFromNew || mockCourse;

  const totalLessons =
    displayCourse.modules?.reduce((acc: number, mod: any) => acc + (mod.lessons?.length || 0), 0) ||
    displayCourse.curriculum?.reduce((acc: number, mod: any) => acc + mod.lessons.length, 0) ||
    0;

  return (
    <div className="min-h-screen bg-white">
      <main className="pb-20">

        {/* ── Hero Section ── */}
        <section className="bg-[#f5f4f0] pt-24">
          {/* Breadcrumb */}
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16 pt-6 pb-4">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-[14px] text-[#9a9aaa] hover:text-[#0a0f1e] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Courses
            </Link>
          </div>

          <div className="max-w-[1200px] mx-auto px-8 lg:px-16 pb-16">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* ── Left: Course Info ── */}
              <div className="lg:col-span-2">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {displayCourse.badge && (
                    <Badge className="bg-[#ff4500] text-white border-0 rounded-full px-3">
                      {displayCourse.badge}
                    </Badge>
                  )}
                  <Badge className="bg-[#ff4500]/10 text-[#ff4500] border-0 rounded-full px-3">
                    {displayCourse.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border border-[#e8e8ec] text-[#4a4a5a] rounded-full px-3 bg-white"
                  >
                    {displayCourse.level}
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-[42px] md:text-[52px] leading-[1.1] font-bold text-[#0a0f1e] mb-5">
                  {displayCourse.title}
                </h1>

                {/* Description */}
                <p className="text-[17px] text-[#4a4a5a] leading-relaxed mb-7">
                  {displayCourse.description || (displayCourse as any).subtitle}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-5 text-[14px] text-[#6b6b7b] mb-8">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#ff4500] fill-[#ff4500]" />
                    <span className="font-semibold text-[#0a0f1e]">{displayCourse.rating}</span>
                    <span>({displayCourse.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{((displayCourse as any).students || 12453).toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{displayCourse.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {displayCourse.comingSoon
                        ? "Content coming soon"
                        : `${displayCourse.modules?.length || (displayCourse as any).curriculum?.length || 3} modules • ${totalLessons} lessons`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    <span>{(displayCourse as any).language || "English"}</span>
                  </div>
                </div>

                {/* Instructor row */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      typeof displayCourse.instructor === "string"
                        ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
                        : displayCourse.instructor.image
                    }
                    alt={
                      typeof displayCourse.instructor === "string"
                        ? displayCourse.instructor
                        : displayCourse.instructor.name
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-[15px] text-[#0a0f1e] font-medium">
                      Created by{" "}
                      {typeof displayCourse.instructor === "string"
                        ? displayCourse.instructor
                        : displayCourse.instructor.name}
                    </div>
                    <div className="text-[13px] text-[#9a9aaa]">
                      {typeof displayCourse.instructor === "string"
                        ? "DTMA Faculty"
                        : displayCourse.instructor.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Right: Sticky Purchase Card (Desktop) ── */}
              <div className="hidden lg:block">
                <div className="bg-white border border-[#e8e8ec] rounded-xl shadow-md sticky top-28 overflow-hidden">
                  {/* Course image */}
                  <div className="relative aspect-video">
                    <img
                      src={displayCourse.image}
                      alt={displayCourse.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-[32px] font-bold text-[#0a0f1e]">
                        ${displayCourse.price}
                      </span>
                      <span className="text-[18px] text-[#9a9aaa] line-through">
                        ${displayCourse.originalPrice}
                      </span>
                      <span className="bg-[#ff4500]/10 text-[#ff4500] text-[12px] font-semibold rounded-full px-2 py-0.5">
                        {Math.round((1 - displayCourse.price / displayCourse.originalPrice) * 100)}% off
                      </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3 mb-5">
                      {displayCourse.comingSoon ? (
                        <Button
                          className="w-full rounded-full bg-[#9a9aaa] cursor-not-allowed text-white"
                          size="lg"
                          disabled
                        >
                          Coming Soon
                        </Button>
                      ) : (
                        <>
                          <Button
                            className="w-full rounded-full bg-[#ff4500] hover:bg-[#cc3700] text-white py-3"
                            size="lg"
                            onClick={handleEnroll}
                            disabled={authLoading || enrollmentLoading}
                          >
                            {isEnrolled ? "Start Learning" : "Enroll Now"}
                          </Button>
                          {!isEnrolled && (
                            <Button
                              variant="outline"
                              className="w-full rounded-full border border-[#e8e8ec] text-[#4a4a5a] hover:bg-[#f5f4f0]"
                              size="lg"
                            >
                              Add to Wishlist
                            </Button>
                          )}
                        </>
                      )}
                    </div>

                    <p className="text-center text-[#9a9aaa] text-[13px] mb-6">
                      30-day money-back guarantee
                    </p>

                    {/* Includes */}
                    <div>
                      <h4 className="text-[16px] font-semibold text-[#0a0f1e] mb-4">
                        This course includes:
                      </h4>
                      <ul className="space-y-3">
                        {((displayCourse as any).includes || []).map((item: any, index: number) => (
                          <li
                            key={index}
                            className="flex items-center gap-3 text-[14px] text-[#4a4a5a]"
                          >
                            <item.icon className="w-4 h-4 text-[#ff4500] flex-shrink-0" />
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mobile CTA Bar ── */}
        <div className="lg:hidden sticky top-20 z-40 bg-white border-b border-[#e8e8ec] shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-[22px] font-bold text-[#0a0f1e]">${displayCourse.price}</span>
              <span className="text-[13px] text-[#9a9aaa] line-through">${displayCourse.originalPrice}</span>
            </div>
            {displayCourse.comingSoon ? (
              <Button
                className="rounded-full bg-[#9a9aaa] cursor-not-allowed text-white"
                disabled
              >
                Coming Soon
              </Button>
            ) : (
              <Button
                className="rounded-full bg-[#ff4500] hover:bg-[#cc3700] text-white"
                onClick={handleEnroll}
                disabled={authLoading || enrollmentLoading}
              >
                {isEnrolled ? "Start Learning" : "Enroll Now"}
              </Button>
            )}
          </div>
        </div>

        {/* ── Course Content Section ── */}
        <section className="py-20">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="lg:max-w-[720px]">

              {/* What You'll Learn */}
              <div className="mb-14">
                <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-3">Outcomes</p>
                <h2 className="text-[28px] font-bold text-[#0a0f1e] mb-6">
                  What you'll learn
                </h2>
                {((displayCourse as any).whatYouWillLearn || (displayCourse as any).outcomes || []).length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-3 p-6 bg-[#f5f4f0] border border-[#e8e8ec] rounded-xl">
                    {((displayCourse as any).whatYouWillLearn || (displayCourse as any).outcomes || []).map((item: string, index: number) => (
                      <div key={index} className="flex gap-3 items-start">
                        <CheckCircle className="w-4 h-4 text-[#ff4500] flex-shrink-0 mt-0.5" />
                        <span className="text-[14px] text-[#4a4a5a] leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-[#f5f4f0] border border-[#e8e8ec] rounded-xl">
                    <p className="text-[14px] text-[#9a9aaa] italic">Learning outcomes will be listed here once the course content is available.</p>
                  </div>
                )}
              </div>

              {/* Course Content / Curriculum */}
              <div className="mb-14">
                <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-3">Curriculum</p>
                <h2 className="text-[28px] font-bold text-[#0a0f1e] mb-2">
                  Course Content
                </h2>
                <p className="text-[14px] text-[#9a9aaa] mb-8">
                  {displayCourse.modules?.length || (displayCourse as any).curriculum?.length || 3} modules •{" "}
                  {totalLessons} lessons • {displayCourse.duration} total
                </p>

                <Accordion type="multiple" className="space-y-3">
                  {(displayCourse.modules || (displayCourse as any).curriculum || []).map(
                    (module: any, moduleIndex: number) => (
                      <AccordionItem
                        key={moduleIndex}
                        value={`module-${moduleIndex}`}
                        className="border border-[#e8e8ec] rounded-xl px-6 bg-white"
                      >
                        <AccordionTrigger className="hover:no-underline py-5">
                          <div className="flex items-center justify-between w-full pr-4">
                            <span className="text-left text-[16px] font-medium text-[#0a0f1e]">
                              {module.title}
                            </span>
                            <span className="text-[13px] text-[#9a9aaa]">
                              {module.lessons.length} lessons • {module.duration}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 pb-4">
                            {module.lessons.map((lesson: any, lessonIndex: number) => (
                              <li
                                key={lessonIndex}
                                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#f5f4f0] transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.type === "video" && (
                                    <PlayCircle className="w-4 h-4 text-[#ff4500]" />
                                  )}
                                  {lesson.type === "file" && (
                                    <FileText className="w-4 h-4 text-[#9a9aaa]" />
                                  )}
                                  {lesson.type === "quiz" && (
                                    <Award className="w-4 h-4 text-[#ff4500]" />
                                  )}
                                  <span className="text-[14px] text-[#4a4a5a]">{lesson.title}</span>
                                  {lesson.preview && (
                                    <Badge
                                      variant="secondary"
                                      className="text-[11px] rounded-full"
                                    >
                                      Preview
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-3">
                                  {lesson.duration && (
                                    <span className="text-[12px] text-[#9a9aaa]">
                                      {lesson.duration}
                                    </span>
                                  )}
                                  {!lesson.preview && (
                                    <Lock className="w-3.5 h-3.5 text-[#9a9aaa]" />
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </div>

              {/* Requirements */}
              <div className="mb-14">
                <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-3">Prerequisites</p>
                <h2 className="text-[28px] font-bold text-[#0a0f1e] mb-6">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {((displayCourse as any).requirements || []).map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4500] mt-[9px] flex-shrink-0" />
                      <span className="text-[16px] text-[#4a4a5a]">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div className="mb-14 pb-14 border-b border-[#e8e8ec]">
                <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-3">About this course</p>
                <h2 className="text-[28px] font-bold text-[#0a0f1e] mb-6">
                  Description
                </h2>
                <div>
                  {displayCourse.description.split("\n\n").map((paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="text-[16px] text-[#4a4a5a] leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="mb-14">
                <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-3">Taught by</p>
                <h2 className="text-[28px] font-bold text-[#0a0f1e] mb-6">
                  Your Instructor
                </h2>
                <div className="bg-white border border-[#e8e8ec] rounded-xl p-6">
                  <div className="flex items-start gap-6">
                    <img
                      src={
                        typeof displayCourse.instructor === "string"
                          ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
                          : displayCourse.instructor.image
                      }
                      alt={
                        typeof displayCourse.instructor === "string"
                          ? displayCourse.instructor
                          : displayCourse.instructor.name
                      }
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-[20px] font-semibold text-[#0a0f1e] mb-1">
                        {typeof displayCourse.instructor === "string"
                          ? displayCourse.instructor
                          : displayCourse.instructor.name}
                      </h3>
                      <p className="text-[14px] text-[#ff4500] mb-3">
                        {typeof displayCourse.instructor === "string"
                          ? "DTMA Faculty"
                          : displayCourse.instructor.title}
                      </p>
                      <div className="flex items-center gap-6 text-[14px] text-[#4a4a5a] mb-4">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          {typeof displayCourse.instructor === "string"
                            ? "15,420"
                            : displayCourse.instructor.students.toLocaleString()}{" "}
                          students
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          {typeof displayCourse.instructor === "string"
                            ? "24"
                            : displayCourse.instructor.courses}{" "}
                          courses
                        </div>
                      </div>
                      <p className="text-[16px] text-[#4a4a5a] leading-relaxed">
                        {typeof displayCourse.instructor === "string"
                          ? "DTMA Faculty includes multidisciplinary educators with expertise in digital transformation."
                          : displayCourse.instructor.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Recommended Courses ── */}
        <section className="py-16 bg-[#f5f4f0]">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="uppercase tracking-widest text-[#ff4500] text-[12px] font-semibold mb-2">
                  Continue Learning
                </p>
                <h2 className="text-[28px] font-bold text-[#0a0f1e]">
                  Recommended Courses
                </h2>
              </div>
              <div className="hidden md:flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("left")}
                  className="rounded-full border border-[#e8e8ec] bg-white hover:bg-white hover:border-[#ff4500]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("right")}
                  className="rounded-full border border-[#e8e8ec] bg-white hover:bg-white hover:border-[#ff4500]"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {recommendedCourses.map((recCourse) => (
                <Link
                  key={recCourse.id}
                  to={recCourse.comingSoon ? "#" : `/courses/${recCourse.id}`}
                  onClick={(e) => recCourse.comingSoon && e.preventDefault()}
                  className={`flex-shrink-0 w-[300px] bg-white rounded-xl overflow-hidden border border-[#e8e8ec] transition-all group ${
                    recCourse.comingSoon
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:shadow-md"
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={recCourse.image}
                      alt={recCourse.title}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        !recCourse.comingSoon && "group-hover:scale-105"
                      }`}
                    />
                    {recCourse.comingSoon && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge className="bg-white text-[#0a0f1e] text-sm px-4 py-2 rounded-full">
                          Coming Soon
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-5 h-[180px] flex flex-col">
                    <h3
                      className={`text-[#0a0f1e] transition-colors mb-3 h-14 line-clamp-2 text-[18px] leading-[1.4] font-semibold ${
                        !recCourse.comingSoon && "group-hover:text-[#ff4500]"
                      }`}
                    >
                      {recCourse.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[14px] text-[#4a4a5a] mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#ff4500] fill-[#ff4500]" />
                        <span className="font-medium">{recCourse.rating}</span>
                        <span className="text-[#9a9aaa]">({recCourse.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recCourse.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[20px] font-bold text-[#0a0f1e]">
                          ${recCourse.price}
                        </span>
                        <span className="text-[13px] text-[#9a9aaa] line-through">
                          ${recCourse.originalPrice}
                        </span>
                      </div>
                      <Badge
                        className={
                          recCourse.comingSoon
                            ? "bg-[#e8e8ec] text-[#4a4a5a] border-0 rounded-full text-[11px]"
                            : "border border-[#e8e8ec] bg-white text-[#4a4a5a] rounded-full text-[11px]"
                        }
                        variant={recCourse.comingSoon ? "default" : "outline"}
                      >
                        {recCourse.comingSoon ? recCourse.badge : recCourse.level}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Enrollment Modal */}
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
    </div>
  );
};

export default CourseDetail;
