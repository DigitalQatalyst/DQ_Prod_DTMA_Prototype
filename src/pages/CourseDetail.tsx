import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
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
      id: "body-2",
      title: "Advanced Body Contouring Techniques",
      category: "Body Aesthetics",
      level: "Intermediate",
      rating: 4.9,
      reviews: 245,
      students: 8920,
      price: 179,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1576091160550-112173f7f869?q=80&w=1200&auto=format&fit=crop",
      duration: "5 hours",
    },
    {
      id: "body-3",
      title: "Client Communication & Retention",
      category: "Professional Skills",
      level: "Beginner",
      rating: 4.7,
      reviews: 189,
      students: 6540,
      price: 99,
      originalPrice: 149,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      duration: "3 hours",
    },
    {
      id: "body-4",
      title: "Safety & Sanitation Mastery",
      category: "Health & Safety",
      level: "Beginner",
      rating: 4.8,
      reviews: 312,
      students: 11200,
      price: 79,
      originalPrice: 129,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
      duration: "2.5 hours",
    },
    {
      id: "body-5",
      title: "Business Growth for Beauty Professionals",
      category: "Business",
      level: "Intermediate",
      rating: 4.6,
      reviews: 156,
      students: 5230,
      price: 129,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      duration: "4 hours",
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

  // Mock course data - in real app, fetch based on id
  const course = {
    id: id || "body-1",
    title: "Introduction to Body Aesthetics & Client Assessment",
    subtitle: "Foundations of body aesthetics, assessment, and client readiness for sculpting services.",
    instructor: {
      name: "BROWZ Faculty",
      title: "Aesthetics Education Team",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      students: 15420,
      courses: 24,
      bio: "BROWZ Faculty includes multidisciplinary educators with expertise in body aesthetics, client care, and professional ethics.",
    },
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    previewVideo: "#",
    category: "Body Aesthetics",
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
    description: `Build a solid foundation in body aesthetics with client assessment, safety-first decisioning, and readiness checks before any sculpting service. Learn how to align goals, screen for red flags, and set ethical expectations while protecting client wellbeing.`,
    
    whatYouWillLearn: [
      "Perform structured body aesthetics intake and client readiness screening",
      "Align outcomes with scope, ethics, and safety-first practice",
      "Plan treatment pathways for contouring with informed consent",
      "Communicate risks, aftercare, and maintenance expectations clearly",
      "Document progress with photos and measurable checkpoints",
      "Escalate or refer when needs exceed beauty professional scope",
    ],
    
    requirements: [
      "Interest in body aesthetics and client consultation",
      "Commitment to safety, ethics, and informed consent",
      "Willingness to document and track client progress",
    ],
    
    curriculum: [
      {
        title: "Module 1: Fundamentals & Safety",
        duration: "1h 30m",
        lessons: [
          { title: "Course Welcome & Scope of Practice", duration: "5:00", type: "video", preview: true },
          { title: "Core Safety & Hygiene Principles", duration: "18:00", type: "video", preview: false },
          { title: "Ethics, Consent, and Expectations", duration: "22:00", type: "video", preview: false },
          { title: "Red Flags and When to Refer", duration: "16:00", type: "video", preview: false },
        ],
      },
      {
        title: "Module 2: Client Assessment & Planning",
        duration: "1h 40m",
        lessons: [
          { title: "Intake Forms and Risk Screening", duration: "20:00", type: "video", preview: false },
          { title: "Measuring and Recording Baselines", duration: "18:00", type: "video", preview: false },
          { title: "Goal Setting and Managing Expectations", duration: "22:00", type: "video", preview: false },
          { title: "Scheduling and Treatment Roadmaps", duration: "20:00", type: "video", preview: false },
        ],
      },
      {
        title: "Module 3: Communication & Aftercare",
        duration: "1h 20m",
        lessons: [
          { title: "Coaching Clients Through Change", duration: "18:00", type: "video", preview: false },
          { title: "Aftercare Templates and Checklists", duration: "16:00", type: "video", preview: false },
          { title: "Tracking Progress and Adjusting Plans", duration: "18:00", type: "video", preview: false },
          { title: "Documenting Outcomes Safely", duration: "14:00", type: "video", preview: false },
        ],
      },
    ],
    
    includes: [
      { icon: Play, text: "4 hours on-demand video" },
      { icon: FileText, text: "10 lessons with practical templates" },
      { icon: Download, text: "Downloadable assessment resources" },
      { icon: Globe, text: "Full lifetime access" },
      { icon: Award, text: "Certificate of completion" },
    ],
  };

  const totalLessons = course.curriculum.reduce((acc, mod) => acc + mod.lessons.length, 0);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 mb-6">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>

        {/* Hero Section */}
        <section className="text-gray-900" style={{ backgroundColor: '#EEEDE9' }}>
          <div className="container mx-auto px-4 lg:px-8 py-16">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Course Info */}
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-gold text-foreground">{course.badge}</Badge>
                  <Badge variant="outline" className="text-gray-700 border-gray-400">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="text-gray-700 border-gray-400">
                    {course.level}
                  </Badge>
                </div>

                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                  {course.title}
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                  {course.subtitle}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 text-gold fill-gold" />
                    <span className="font-semibold text-gray-900">{course.rating}</span>
                    <span>({course.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-5 h-5" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-5 h-5" />
                    <span>{course.language}</span>
                  </div>
                </div>

                {/* Instructor Preview */}
                <div className="flex items-center gap-4">
                  <img
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Created by {course.instructor.name}</div>
                    <div className="text-sm text-gray-600">{course.instructor.title}</div>
                  </div>
                </div>
              </div>

              {/* Course Card - Desktop */}
              <div className="hidden lg:block">
                <div className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-luxury sticky top-28">
                  {/* Preview Image */}
                  <div className="relative aspect-video">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute inset-0 flex items-center justify-center bg-foreground/30 hover:bg-foreground/40 transition-colors group">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                    </button>
                  </div>

                  <div className="p-6">
                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-3xl font-bold">${course.price}</span>
                      <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
                      <Badge className="bg-primary text-primary-foreground">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                      </Badge>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3 mb-6">
                      <Button 
                        variant="hero" 
                        className="w-full" 
                        size="lg"
                        onClick={handleEnroll}
                        disabled={authLoading || enrollmentLoading}
                      >
                        {isEnrolled ? "Start Learning" : "Enroll Now"}
                      </Button>
                      {!isEnrolled && (
                        <Button variant="outline" className="w-full" size="lg">
                          Add to Wishlist
                        </Button>
                      )}
                    </div>

                    <p className="text-center text-sm text-muted-foreground mb-6">
                      30-day money-back guarantee
                    </p>

                    {/* Includes */}
                    <div>
                      <h4 className="font-semibold mb-4">This course includes:</h4>
                      <ul className="space-y-3">
                        {course.includes.map((item, index) => (
                          <li key={index} className="flex items-center gap-3 text-sm">
                            <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
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
                <span className="text-2xl font-bold">${course.price}</span>
                <span className="text-muted-foreground line-through">${course.originalPrice}</span>
              </div>
            </div>
            <Button 
              variant="hero" 
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
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  What you'll learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 p-6 bg-blush/30 rounded-2xl">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content/Curriculum */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Course Content
                </h2>
                <p className="text-muted-foreground mb-6">
                  {course.curriculum.length} modules • {totalLessons} lessons • {course.duration} total
                </p>

                <Accordion type="multiple" className="space-y-4">
                  {course.curriculum.map((module, moduleIndex) => (
                    <AccordionItem
                      key={moduleIndex}
                      value={`module-${moduleIndex}`}
                      className="border border-border rounded-xl px-6 bg-card"
                    >
                      <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="font-semibold text-left">{module.title}</span>
                          <span className="text-sm text-muted-foreground">
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
                                {lesson.type === "video" && <PlayCircle className="w-4 h-4 text-primary" />}
                                {lesson.type === "file" && <FileText className="w-4 h-4 text-muted-foreground" />}
                                {lesson.type === "quiz" && <Award className="w-4 h-4 text-gold" />}
                                <span className="text-sm">{lesson.title}</span>
                                {lesson.preview && (
                                  <Badge variant="secondary" className="text-xs">Preview</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                {lesson.duration && (
                                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
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
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Description
                </h2>
                <div className="prose prose-neutral max-w-none">
                  {course.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Your Instructor
                </h2>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-start gap-6">
                    <img
                      src={course.instructor.image}
                      alt={course.instructor.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-1">
                        {course.instructor.name}
                      </h3>
                      <p className="text-primary mb-3">{course.instructor.title}</p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          {course.instructor.students.toLocaleString()} students
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          {course.instructor.courses} courses
                        </div>
                      </div>
                      <p className="text-muted-foreground">{course.instructor.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
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
          title: course.title,
          price: course.price,
          originalPrice: course.originalPrice,
          imageUrl: course.image,
        }}
        onEnrollmentComplete={handleEnrollmentComplete}
      />
    </div>
  );
};

export default CourseDetail;
