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
      id: "digital-cognitive-org-1",
      title: "Building Digital Cognitive Organizations",
      category: "Digital Cognitive Organisation",
      level: "Intermediate",
      rating: 4.9,
      reviews: 245,
      students: 8920,
      price: 179,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      duration: "5 hours",
    },
    {
      id: "digital-business-platform-1",
      title: "Digital Business Platform Fundamentals",
      category: "Digital Business Platform",
      level: "Beginner",
      rating: 4.7,
      reviews: 189,
      students: 6540,
      price: 99,
      originalPrice: 149,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      duration: "3 hours",
    },
    {
      id: "digital-transformation-1",
      title: "Digital Transformation 2.0 Strategy",
      category: "Digital Transformation 2.0",
      level: "Intermediate",
      rating: 4.8,
      reviews: 312,
      students: 11200,
      price: 149,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
      duration: "4.5 hours",
    },
    {
      id: "digital-worker-1",
      title: "Digital Worker & Workspace Essentials",
      category: "Digital Worker & Workspace",
      level: "Beginner",
      rating: 4.6,
      reviews: 156,
      students: 5230,
      price: 129,
      originalPrice: 179,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      duration: "3.5 hours",
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
  
  const totalLessons = displayCourse.modules?.reduce((acc: number, mod: any) => acc + (mod.lessons?.length || 0), 0) || displayCourse.curriculum?.reduce((acc: number, mod: any) => acc + mod.lessons.length, 0) || 0;

  return (
    <div className="min-h-screen">
      <main className="pb-20">
        {/* Hero Section */}
        <section className="text-white bg-gradient-to-br from-[#1e2348] via-[#2a3058] to-[#1e2348] pt-24">
          {/* Breadcrumb */}
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16 pt-6 pb-4">
            <Link to="/courses" className="inline-flex items-center gap-2 text-[14px] leading-[20px] font-normal text-white/70 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Back to Courses
            </Link>
          </div>
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16 pb-16">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Course Info */}
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  {displayCourse.badge && <Badge className="bg-[#ff6b4d] text-white">{displayCourse.badge}</Badge>}
                  <Badge variant="outline" className="text-white border-white/30">
                    {displayCourse.category}
                  </Badge>
                  <Badge variant="outline" className="text-white border-white/30">
                    {displayCourse.level}
                  </Badge>
                </div>

                <h1 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600 }} className="text-white mb-4">
                  {displayCourse.title}
                </h1>
                <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-white/80 mb-6">
                  {displayCourse.description || (displayCourse as any).subtitle}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-white/70 mb-8" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 text-[#ff6b4d] fill-[#ff6b4d]" />
                    <span className="font-semibold text-white">{displayCourse.rating}</span>
                    <span>({displayCourse.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-5 h-5" />
                    <span>{((displayCourse as any).students || 12453).toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-5 h-5" />
                    <span>{displayCourse.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-5 h-5" />
                    <span>{displayCourse.modules?.length || (displayCourse as any).curriculum?.length || 3} modules • {totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-5 h-5" />
                    <span>{(displayCourse as any).language || "English"}</span>
                  </div>
                </div>

                {/* Instructor Preview */}
                <div className="flex items-center gap-4">
                  <img
                    src={typeof displayCourse.instructor === 'string' ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" : displayCourse.instructor.image}
                    alt={typeof displayCourse.instructor === 'string' ? displayCourse.instructor : displayCourse.instructor.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#ff6b4d]"
                  />
                  <div>
                    <div style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-white">
                      Created by {typeof displayCourse.instructor === 'string' ? displayCourse.instructor : displayCourse.instructor.name}
                    </div>
                    <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }} className="text-white/70">
                      {typeof displayCourse.instructor === 'string' ? "DTMA Faculty" : displayCourse.instructor.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Card - Desktop */}
              <div className="hidden lg:block">
                <div className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-luxury sticky top-28">
                  {/* Preview Image */}
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
                      <span style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 600 }}>${displayCourse.price}</span>
                      <span style={{ fontSize: '18px', lineHeight: '28px', fontWeight: 400 }} className="text-muted-foreground line-through">${displayCourse.originalPrice}</span>
                      <Badge className="bg-green-600 text-white" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                        {Math.round((1 - displayCourse.price / displayCourse.originalPrice) * 100)}% off
                      </Badge>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3 mb-6">
                      <Button 
                        className="w-full bg-[#ff6b4d] hover:bg-[#e56045] text-white" 
                        size="lg"
                        onClick={handleEnroll}
                        disabled={authLoading || enrollmentLoading}
                      >
                        {isEnrolled ? "Start Learning" : "Enroll Now"}
                      </Button>
                      {!isEnrolled && (
                        <Button variant="outline" className="w-full border-[#E5E7EB] hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]" size="lg">
                          Add to Wishlist
                        </Button>
                      )}
                    </div>

                    <p className="text-center text-muted-foreground mb-6" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      30-day money-back guarantee
                    </p>

                    {/* Includes */}
                    <div>
                      <h4 className="mb-4" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>This course includes:</h4>
                      <ul className="space-y-3">
                        {((displayCourse as any).includes || []).map((item: any, index: number) => (
                          <li key={index} className="flex items-center gap-3" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                            <item.icon className="w-5 h-5 text-[#ff6b4d] flex-shrink-0" />
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

        {/* Mobile CTA Card */}
        <div className="lg:hidden sticky top-20 z-40 bg-card border-b border-border shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 600 }}>${displayCourse.price}</span>
                <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }} className="text-muted-foreground line-through">${displayCourse.originalPrice}</span>
              </div>
            </div>
            <Button 
              className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
              onClick={handleEnroll}
              disabled={authLoading || enrollmentLoading}
            >
              {isEnrolled ? "Start Learning" : "Enroll Now"}
            </Button>
          </div>
        </div>

        {/* Course Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="lg:max-w-3xl">
              {/* What You'll Learn */}
              <div className="mb-12">
                <h2 className="text-[#0B0C19] mb-6" style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 600 }}>
                  What you'll learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 p-6 bg-[#F5F6FA] rounded-2xl">
                  {((displayCourse as any).whatYouWillLearn || []).map((item: string, index: number) => (
                    <div key={index} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ff6b4d] flex-shrink-0 mt-0.5" />
                      <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content/Curriculum */}
              <div className="mb-12">
                <h2 className="text-[#0B0C19] mb-2" style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 600 }}>
                  Course Content
                </h2>
                <p className="text-[#4B5563] mb-6" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  {displayCourse.modules?.length || (displayCourse as any).curriculum?.length || 3} modules • {totalLessons} lessons • {displayCourse.duration} total
                </p>

                <Accordion type="multiple" className="space-y-4">
                  {(displayCourse.modules || (displayCourse as any).curriculum || []).map((module: any, moduleIndex: number) => (
                    <AccordionItem
                      key={moduleIndex}
                      value={`module-${moduleIndex}`}
                      className="border border-border rounded-xl px-6 bg-card"
                    >
                      <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="text-left" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }}>{module.title}</span>
                          <span className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                            {module.lessons.length} lessons • {module.duration}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3 pb-4">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li
                              key={lessonIndex}
                              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.type === "video" && <PlayCircle className="w-4 h-4 text-[#ff6b4d]" />}
                                {lesson.type === "file" && <FileText className="w-4 h-4 text-muted-foreground" />}
                                {lesson.type === "quiz" && <Award className="w-4 h-4 text-[#ff6b4d]" />}
                                <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>{lesson.title}</span>
                                {lesson.preview && (
                                  <Badge variant="secondary" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>Preview</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                {lesson.duration && (
                                  <span className="text-muted-foreground" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>{lesson.duration}</span>
                                )}
                                {!lesson.preview && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Requirements */}
              <div className="mb-12">
                <h2 className="text-[#0B0C19] mb-6" style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 600 }}>
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {((displayCourse as any).requirements || []).map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b4d] mt-2" />
                      <span style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }}>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h2 className="text-[#0B0C19] mb-6" style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 600 }}>
                  Description
                </h2>
                <div className="prose prose-neutral max-w-none">
                  {displayCourse.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-[#4B5563] mb-4" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="mb-12">
                <h2 className="text-[#0B0C19] mb-6" style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 600 }}>
                  Your Instructor
                </h2>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-start gap-6">
                    <img
                      src={typeof displayCourse.instructor === 'string' ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" : displayCourse.instructor.image}
                      alt={typeof displayCourse.instructor === 'string' ? displayCourse.instructor : displayCourse.instructor.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-[#0B0C19] mb-1" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
                        {typeof displayCourse.instructor === 'string' ? displayCourse.instructor : displayCourse.instructor.name}
                      </h3>
                      <p className="text-[#ff6b4d] mb-3" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                        {typeof displayCourse.instructor === 'string' ? "DTMA Faculty" : displayCourse.instructor.title}
                      </p>
                      <div className="flex items-center gap-6 text-[#4B5563] mb-4" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          {typeof displayCourse.instructor === 'string' ? "15,420" : displayCourse.instructor.students.toLocaleString()} students
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          {typeof displayCourse.instructor === 'string' ? "24" : displayCourse.instructor.courses} courses
                        </div>
                      </div>
                      <p className="text-[#4B5563]" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }}>
                        {typeof displayCourse.instructor === 'string' ? "DTMA Faculty includes multidisciplinary educators with expertise in digital transformation." : displayCourse.instructor.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Courses */}
        <section className="py-16 bg-[#F5F6FA]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="uppercase tracking-wide text-[#ff6b4d] mb-2" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Continue Learning
                </p>
                <h2 className="text-[#0B0C19]" style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 600 }}>
                  Recommended Courses
                </h2>
              </div>
              <div className="hidden md:flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("left")}
                  className="border-[#E5E7EB] hover:bg-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("right")}
                  className="border-[#E5E7EB] hover:bg-white"
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
                  to={`/courses/${recCourse.id}`}
                  className="flex-shrink-0 w-[300px] bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-lg transition-all group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={recCourse.image}
                      alt={recCourse.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-[#ff6b4d] text-white text-[12px] leading-[16px] font-medium">
                      {recCourse.category}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[#0B0C19] mb-2 line-clamp-2 group-hover:text-[#ff6b4d] transition-colors" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
                      {recCourse.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[#4B5563] mb-3" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#ff6b4d] fill-[#ff6b4d]" />
                        <span className="font-medium">{recCourse.rating}</span>
                        <span className="text-[#9CA3AF]">({recCourse.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recCourse.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[#0B0C19]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>${recCourse.price}</span>
                        <span className="text-[#9CA3AF] line-through" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>${recCourse.originalPrice}</span>
                      </div>
                      <Badge variant="outline" className="border-[#E5E7EB]" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                        {recCourse.level}
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
