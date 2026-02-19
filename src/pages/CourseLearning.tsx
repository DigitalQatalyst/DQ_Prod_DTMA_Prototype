import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCourse, useIsEnrolled, useUpdateLessonProgress, useLessonProgress } from "@/hooks/useCourses";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/Badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronLeft,
  PlayCircle,
  FileText,
  Award,
  CheckCircle,
  Lock,
  Menu,
  X,
  Loader2,
  GraduationCap,
  Play,
  Pause,
  Volume2,
  Maximize,
  SkipForward,
  Download,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CourseLearning = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const { data: course, isLoading: courseLoading } = useCourse(courseId || "");
  const { data: isEnrolled, isLoading: enrollmentLoading } = useIsEnrolled(courseId || "");
  const { data: lessonProgress } = useLessonProgress(courseId || "");
  
  const [selectedLesson, setSelectedLesson] = useState<{
    id: string;
    title: string;
    content: string | null;
    videoUrl: string | null;
    resources?: any[];
    isQuiz?: boolean;
    isAssignment?: boolean;
    isPractical?: boolean;
  } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showCertificate, setShowCertificate] = useState(false);
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  // Load course data from localStorage (where instructor built the course)
  const storedCourse = courseId ? JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}') : {};
  const curriculum = storedCourse.curriculum || [];
  const assessmentType = storedCourse.assessmentType || "none";
  const quizQuestions = storedCourse.quizQuestions || [
    // Fallback mock quiz questions
    {
      text: "What is the main focus of this course?",
      type: "mcq",
      options: ["Practical skills", "Theoretical knowledge", "Both practical and theoretical", "None of the above"],
      correctAnswer: 2,
      points: 10
    },
    {
      text: "This course includes hands-on practice.",
      type: "true-false",
      options: ["True", "False"],
      correctAnswer: 0,
      points: 5
    },
    {
      text: "What is the recommended approach for learning?",
      type: "mcq",
      options: ["Watch videos only", "Practice regularly", "Skip difficult topics", "Rush through content"],
      correctAnswer: 1,
      points: 10
    }
  ];
  const assignmentTitle = storedCourse.assignmentTitle || "";
  const assignmentInstructions = storedCourse.assignmentInstructions || "";
  const assignmentBriefUrl = storedCourse.assignmentBriefUrl || "";
  const allowedFileTypes = storedCourse.allowedFileTypes || "pdf,docx,zip";
  const practicalTitle = storedCourse.practicalTitle || "";
  const practicalInstructions = storedCourse.practicalInstructions || "";
  const passingScore = parseInt(storedCourse.passingScore || "70");
  // Check both certificationEnabled (from Assessments) and eligibilityCertificationEnabled (from Eligibility)
  const certificationEnabled = storedCourse.eligibilityCertificationEnabled || storedCourse.certificationEnabled || false;

  const handleQuizSubmit = () => {
    const correctAnswers = quizQuestions.filter((q: any, index: number) => 
      quizAnswers[index] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / quizQuestions.length) * 100);
    
    if (score >= passingScore) {
      // Always show certificate for now (can be conditional later based on certificationEnabled)
      setShowCertificate(true);
    } else {
      alert(`You scored ${score}%. You need ${passingScore}% to pass. Please try again.`);
      setQuizAnswers({});
    }
  };

  const handleAssignmentSubmit = () => {
    if (assignmentFile) {
      setAssignmentSubmitted(true);
      alert("Assignment submitted successfully! Your instructor will review it.");
    }
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate(`/auth?redirect=/courses/${courseId}/learn`);
    }
  }, [authLoading, user, navigate, courseId]);

  // Redirect if not enrolled
  useEffect(() => {
    if (!enrollmentLoading && isEnrolled === false && user) {
      navigate(`/courses/${courseId}`);
    }
  }, [enrollmentLoading, isEnrolled, navigate, courseId, user]);

  // Build course data from actual curriculum
  const courseData = {
    ...course,
    modules: curriculum.length > 0 ? curriculum.map((section: any) => ({
      id: section.id,
      title: section.title,
      lessons: section.lessons?.map((lesson: any) => ({
        id: lesson.id,
        title: lesson.title,
        content: `Lesson content for ${lesson.title}`,
        video_url: lesson.resources?.find((r: any) => r.type === 'video')?.url || null,
        resources: lesson.resources || [],
        duration_minutes: 15,
      })) || [],
    })) : [
      // Fallback to mock data if no curriculum exists
      {
        id: "module-1",
        title: "Getting Started",
        lessons: [
          {
            id: "lesson-1",
            title: "Lesson 1",
            content: "Welcome to Lesson 1. Watch the video to get started.",
            video_url: "/Lesson 1.mp4",
            resources: [],
            duration_minutes: 10,
          },
          {
            id: "lesson-2",
            title: "Lesson 2",
            content: "Continue with Lesson 2 to deepen your knowledge.",
            video_url: "/Lesson 2.mp4",
            resources: [],
            duration_minutes: 15,
          },
          {
            id: "lesson-3",
            title: "Lesson 3",
            content: "Complete your learning with Lesson 3.",
            video_url: "/Lesson 3.mp4",
            resources: [],
            duration_minutes: 12,
          },
        ],
      },
      {
        id: "module-2",
        title: "Advanced Topics",
        lessons: [
          {
            id: "lesson-4",
            title: "Lesson 4",
            content: "Explore advanced concepts in Lesson 4.",
            video_url: "/Lesson 4.mp4",
            resources: [],
            duration_minutes: 14,
          },
          {
            id: "lesson-5",
            title: "Lesson 5",
            content: "Build on your skills with Lesson 5.",
            video_url: "/Lesson 5.mp4",
            resources: [],
            duration_minutes: 16,
          },
          {
            id: "lesson-6",
            title: "Lesson 6",
            content: "Master the final concepts in Lesson 6.",
            video_url: "/Lesson 6.mp4",
            resources: [],
            duration_minutes: 13,
          },
        ],
      },
      {
        id: "module-3",
        title: "Final Assessment",
        lessons: [
          {
            id: "quiz",
            title: "Course Quiz",
            content: "Test your knowledge with this final quiz.",
            video_url: null,
            resources: [],
            duration_minutes: 15,
            isQuiz: true,
          } as any,
        ],
      },
    ],
  } as any;

  // Add assessment module if assessment exists (only for courses with actual curriculum)
  if (curriculum.length > 0 && assessmentType !== "none") {
    courseData.modules.push({
      id: "assessment-module",
      title: "Final Assessment",
      lessons: [
        {
          id: "assessment",
          title: assessmentType === "quiz" ? "Course Quiz" : 
                 assessmentType === "assignment" ? assignmentTitle || "Assignment" :
                 practicalTitle || "Practical Evaluation",
          content: assessmentType === "quiz" ? "Test your knowledge with this quiz." :
                   assessmentType === "assignment" ? assignmentInstructions :
                   practicalInstructions,
          video_url: null,
          resources: [],
          duration_minutes: 15,
          isQuiz: assessmentType === "quiz",
          isAssignment: assessmentType === "assignment",
          isPractical: assessmentType === "practical",
        } as any,
      ],
    });
  }

  // Set first lesson when component mounts
  useEffect(() => {
    if (courseData?.modules && courseData.modules.length > 0 && !selectedLesson) {
      const firstModule = courseData.modules[0];
      if (firstModule.lessons && firstModule.lessons.length > 0) {
        const firstLesson = firstModule.lessons[0];
        setSelectedLesson({
          id: firstLesson.id,
          title: firstLesson.title,
          content: firstLesson.content || "",
          videoUrl: firstLesson.video_url || null,
          isQuiz: firstLesson.isQuiz || false,
        });
      }
    }
  }, []);

  // Loading state
  if (authLoading || courseLoading || enrollmentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not found state - removed since we use mock data
  // if (!course) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center gap-4">
  //       <p className="text-muted-foreground">Course not found</p>
  //       <Button asChild>
  //         <Link to="/categories">Browse Courses</Link>
  //       </Button>
  //     </div>
  //   );
  // }

  const handleLessonSelect = (lesson: any) => {
    setSelectedLesson({
      id: lesson.id,
      title: lesson.title,
      content: lesson.content || "",
      videoUrl: lesson.video_url || null,
      resources: lesson.resources || [],
      isQuiz: lesson.isQuiz || false,
      isAssignment: lesson.isAssignment || false,
      isPractical: lesson.isPractical || false,
    });
    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Calculate progress
  const totalLessons = courseData?.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0;
  const completedLessons = Object.values(lessonProgress || {}).filter(Boolean).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            <Link to={`/courses/${courseId}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Course</span>
            </Link>
          </div>



          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{progressPercent}% complete</span>
              <Progress value={progressPercent} className="w-24 h-2" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-16 left-0 z-40 w-80 bg-card border-r border-border transition-transform duration-200 ease-in-out`}
        >
          <ScrollArea className="h-full">
            <div className="p-4">
              <h2 className="font-semibold text-foreground mb-2 line-clamp-2">{courseData.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>{completedLessons}/{totalLessons} lessons</span>
                <span>•</span>
                <span>{progressPercent}% complete</span>
              </div>
              <Progress value={progressPercent} className="h-2 mb-6" />

              <Accordion type="multiple" defaultValue={courseData.modules?.map((_, i) => `module-${i}`) || []}>
                {courseData.modules?.map((module, moduleIndex) => (
                  <AccordionItem key={module.id} value={`module-${moduleIndex}`} className="border-b-0">
                    <AccordionTrigger className="py-3 hover:no-underline">
                      <span className="text-sm font-medium text-left">{module.title}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1">
                        {module.lessons?.map((lesson) => {
                          const isCompleted = !lesson.isQuiz && !lesson.isAssignment && !lesson.isPractical && lessonProgress?.[lesson.id];
                          const isActive = selectedLesson?.id === lesson.id;
                          
                          return (
                            <li key={lesson.id}>
                              <button
                                onClick={() => handleLessonSelect(lesson)}
                                className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
                                  isActive
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-accent"
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : lesson.isQuiz ? (
                                  <Award className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                ) : lesson.isAssignment ? (
                                  <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                ) : lesson.isPractical ? (
                                  <GraduationCap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                ) : lesson.video_url ? (
                                  <PlayCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                ) : (
                                  <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                )}
                                <span className="text-sm line-clamp-2">{lesson.title}</span>
                                {lesson.duration_minutes > 0 && (
                                  <span className="text-xs text-muted-foreground ml-auto">
                                    {lesson.duration_minutes}m
                                  </span>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollArea>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto flex flex-col">
          {selectedLesson ? (
            <>
              {/* Video Player - Full Width */}
              {selectedLesson.videoUrl && (
                <div className="flex-shrink-0">
                  <VideoPlayer
                    videoUrl={selectedLesson.videoUrl}
                    lessonId={selectedLesson.id}
                  />
                </div>
              )}

              {/* Lesson Info - Below Player */}
              <div className="flex-1 overflow-auto">
                <div className="p-6 space-y-6">
                  {/* Lesson Title and Status */}
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-3">
                      {selectedLesson.title}
                    </h1>
                    {!selectedLesson.isQuiz && lessonProgress?.[selectedLesson.id] && (
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>

                  {/* Lesson Content */}
                  {selectedLesson.content && !selectedLesson.isQuiz && !selectedLesson.isAssignment && !selectedLesson.isPractical && (
                    <div className="prose prose-neutral max-w-none">
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {selectedLesson.content}
                      </p>
                    </div>
                  )}

                  {/* Lesson Resources */}
                  {selectedLesson.resources && selectedLesson.resources.length > 0 && !selectedLesson.isQuiz && !selectedLesson.isAssignment && !selectedLesson.isPractical && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Lesson Resources</h3>
                      <div className="space-y-2">
                        {selectedLesson.resources.map((resource: any) => (
                          <a
                            key={resource.id}
                            href={resource.url}
                            download
                            className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent transition-colors"
                          >
                            {resource.type === 'pdf' && <FileText className="w-5 h-5 text-red-500" />}
                            {resource.type === 'download' && <Download className="w-5 h-5 text-primary" />}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{resource.name}</p>
                              {resource.size && (
                                <p className="text-xs text-muted-foreground">
                                  {(resource.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              )}
                            </div>
                            <Download className="w-4 h-4 text-muted-foreground" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quiz Content */}
                  {selectedLesson.isQuiz && quizQuestions.length > 0 && (
                    <div className="space-y-6 max-w-3xl">
                      <div>
                        <p className="text-muted-foreground mb-4">
                          Answer all questions to complete the quiz. You need {passingScore}% to pass.
                        </p>
                      </div>
                      
                      {quizQuestions.map((q: any, index: number) => (
                        <div key={index} className="border border-border rounded-lg p-5 space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">{index + 1}</span>
                            </div>
                            <p className="font-semibold text-foreground text-lg pt-1">
                              {q.text}
                            </p>
                            <span className="ml-auto text-xs text-muted-foreground">{q.points} pts</span>
                          </div>
                          
                          <div className="space-y-2 ml-11">
                            {q.options.map((option: string, optIndex: number) => (
                              <label key={optIndex} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-transparent hover:border-border hover:bg-accent/50 transition-all">
                                <input
                                  type="radio"
                                  name={`question-${index}`}
                                  value={optIndex}
                                  checked={quizAnswers[index] === optIndex}
                                  onChange={() => setQuizAnswers({ ...quizAnswers, [index]: optIndex })}
                                  className="w-4 h-4 cursor-pointer"
                                />
                                <span className="text-sm text-foreground">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="flex gap-3 pt-6">
                        <Button
                          variant="outline"
                          onClick={() => setQuizAnswers({})}
                        >
                          Clear Answers
                        </Button>
                        <Button
                          variant="hero"
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                          className="flex-1"
                        >
                          {Object.keys(quizAnswers).length < quizQuestions.length
                            ? `Answer all questions (${Object.keys(quizAnswers).length}/${quizQuestions.length})`
                            : "Submit Quiz"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Assignment Content */}
                  {selectedLesson.isAssignment && (
                    <div className="space-y-6 max-w-3xl">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{assignmentTitle}</h2>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {assignmentInstructions}
                        </p>
                      </div>

                      {assignmentBriefUrl && (
                        <div className="border border-border rounded-lg p-4">
                          <h3 className="text-sm font-semibold mb-2">Assignment Brief</h3>
                          <a
                            href={assignmentBriefUrl}
                            download
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <FileText className="w-4 h-4" />
                            <span className="text-sm">Download Brief (PDF)</span>
                          </a>
                        </div>
                      )}

                      {!assignmentSubmitted ? (
                        <div className="border-2 border-dashed border-border rounded-lg p-6">
                          <h3 className="text-sm font-semibold mb-3">Submit Your Assignment</h3>
                          <p className="text-xs text-muted-foreground mb-4">
                            Allowed file types: {allowedFileTypes}
                          </p>
                          
                          <input
                            type="file"
                            accept={allowedFileTypes.split(',').map(t => `.${t.trim()}`).join(',')}
                            onChange={(e) => setAssignmentFile(e.target.files?.[0] || null)}
                            className="mb-4"
                          />

                          {assignmentFile && (
                            <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm flex-1">{assignmentFile.name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setAssignmentFile(null)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}

                          <Button
                            variant="hero"
                            onClick={handleAssignmentSubmit}
                            disabled={!assignmentFile}
                            className="w-full"
                          >
                            Submit Assignment
                          </Button>
                        </div>
                      ) : (
                        <div className="border border-green-200 bg-green-50 rounded-lg p-6 text-center">
                          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                          <h3 className="text-lg font-semibold text-green-900 mb-2">Assignment Submitted!</h3>
                          <p className="text-sm text-green-800">
                            Your instructor will review your submission and provide feedback.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Practical Evaluation Content */}
                  {selectedLesson.isPractical && (
                    <div className="space-y-6 max-w-3xl">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{practicalTitle}</h2>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {practicalInstructions}
                        </p>
                      </div>

                      <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
                        <div className="flex items-start gap-3">
                          <GraduationCap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Instructor Evaluation Required</h3>
                            <p className="text-sm text-blue-800 mb-4">
                              This practical evaluation requires hands-on demonstration and will be assessed by your instructor.
                            </p>
                            <p className="text-sm text-blue-800">
                              Please contact your instructor to schedule your practical evaluation session.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Select a lesson to begin</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Certificate Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
                <p className="text-gray-600">You've successfully completed the course</p>
              </div>

              {/* Certificate Design */}
              <div className="border-4 border-[#4A3428] rounded-lg p-12 bg-gradient-to-br from-amber-50 to-white mb-6">
                <div className="text-center space-y-6">
                  {(() => {
                    const certificateBranding = JSON.parse(localStorage.getItem('certificate_branding') || '{}');
                    return (
                      <>
                        {certificateBranding.logo && (
                          <img src={certificateBranding.logo} alt="Logo" className="h-16 w-auto mx-auto" />
                        )}
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Certificate of Completion</div>
                        <h3 className="text-3xl font-serif font-bold text-[#4A3428]">
                          {certificateBranding.issuingEntityName || "BROWZ Beauty Academy"}
                        </h3>
                        <p className="text-sm text-gray-600">This is to certify that</p>
                        <div className="text-2xl font-bold text-gray-900 border-b-2 border-[#4A3428] inline-block px-12 pb-2">
                          {profile?.full_name || "Student Name"}
                        </div>
                        <p className="text-sm text-gray-600">has successfully completed</p>
                        <div className="text-xl font-bold text-gray-900">{course?.title || "Course Title"}</div>
                        <p className="text-sm text-gray-500">Completed on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        
                        <div className="flex justify-center gap-16 pt-8">
                          <div className="text-center">
                            {certificateBranding.signature ? (
                              <img src={certificateBranding.signature} alt="Signature" className="h-16 w-auto mx-auto mb-2" />
                            ) : (
                              <div className="h-16 flex items-end justify-center mb-2">
                                <div className="border-t-2 border-gray-800 w-32"></div>
                              </div>
                            )}
                            <p className="text-xs text-gray-600 font-medium">
                              {certificateBranding.signatoryName || "Instructor Signature"}
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="h-16 flex items-end justify-center mb-2">
                              <div className="border-t-2 border-gray-800 w-32"></div>
                            </div>
                            <p className="text-xs text-gray-600 font-medium">Date</p>
                          </div>
                        </div>

                        {certificateBranding.accreditationNumber && (
                          <p className="text-xs text-gray-500 pt-6">
                            Accreditation: {certificateBranding.accreditationNumber}
                          </p>
                        )}
                        {certificateBranding.footerText && (
                          <p className="text-xs text-gray-500">{certificateBranding.footerText}</p>
                        )}
                        <p className="text-xs text-gray-400">Certificate ID: CERT-{Date.now()}</p>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => window.print()}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
                <Button
                  variant="hero"
                  onClick={() => {
                    setShowCertificate(false);
                    navigate('/dashboard');
                  }}
                  className="flex-1"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Video Player Component
interface VideoPlayerProps {
  videoUrl: string;
  lessonId: string;
  onProgress?: (progress: number) => void;
}

const VideoPlayer = ({ videoUrl, lessonId, onProgress }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-save progress
  useEffect(() => {
    const timer = setInterval(() => {
      if (videoRef.current && isPlaying) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        onProgress?.(progress);
        // Auto-save to localStorage
        localStorage.setItem(`lesson-progress-${lessonId}`, JSON.stringify({
          currentTime: videoRef.current.currentTime,
          duration: videoRef.current.duration,
          timestamp: new Date().toISOString(),
        }));
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, lessonId, onProgress]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        containerRef.current.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div ref={containerRef} className="w-full bg-black">
      {/* Video Element */}
      <div className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          crossOrigin="anonymous"
          controls={false}
        />

        {/* Play Button Overlay */}
        {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group"
          >
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Play className="w-8 h-8 text-primary-foreground ml-1" />
            </div>
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black/90 backdrop-blur-sm p-4 space-y-3">
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/70 w-10 font-mono">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer accent-primary"
          />
          <span className="text-xs text-white/70 w-10 text-right font-mono">{formatTime(duration)}</span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="text-white hover:bg-white/10"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>

            {/* Volume */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {/* Playback Speed */}
            <Select value={playbackSpeed.toString()} onValueChange={(v) => handleSpeedChange(parseFloat(v))}>
              <SelectTrigger className="w-20 h-9 bg-white/10 border-0 text-white text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1x</SelectItem>
                <SelectItem value="1.25">1.25x</SelectItem>
                <SelectItem value="1.5">1.5x</SelectItem>
              </SelectContent>
            </Select>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFullscreen}
              className="text-white hover:bg-white/10"
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
