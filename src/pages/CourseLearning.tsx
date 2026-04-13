import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCourse, useIsEnrolled, useLessonProgress } from "@/hooks/useCourses";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/Badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  FileText,
  Award,
  CheckCircle,
  Loader2,
  GraduationCap,
  Play,
  Pause,
  Volume2,
  Maximize,
  Download,
  User,
  LogOut,
  TrendingUp,
  MessageSquare,
  Video,
  X,
  Bell,
  Search,
  SkipBack,
  SkipForward,
  VolumeX,
  Headphones,
  BookOpen,
  Lock,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseTutorAI } from "@/components/mentor/CourseTutorAI";
import { WhatsAppLearning } from "@/components/learning/WhatsAppLearning";
import { Card } from "@/components/ui/card";
import { getCourseById } from "@/data/dtmaCoursesNew";
import { getQuizByModuleId } from "@/data/quizzes/module1Quiz";

const CourseLearning = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile, loading: authLoading, signOut } = useAuth();
  const { data: course, isLoading: courseLoading } = useCourse(courseId || "");
  const { data: isEnrolled, isLoading: enrollmentLoading } = useIsEnrolled(courseId || "");
  const { data: lessonProgress } = useLessonProgress(courseId || "");
  
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showCertificate, setShowCertificate] = useState(false);
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [mediaMode, setMediaMode] = useState<'video' | 'audio'>('video'); // Toggle between video and audio
  const [showHints, setShowHints] = useState<Record<number, boolean>>({}); // Track which hints are shown
  
  // AI Tools state
  const [showAINotes, setShowAINotes] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showInfographic, setShowInfographic] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Load course data from localStorage
  const storedCourse = courseId ? JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}') : {};
  const curriculum = storedCourse.curriculum || [];
  const assessmentType = storedCourse.assessmentType || "none";
  
  // Get quiz data from module1Quiz if this is the Economy 4.0 course
  const dtmaCourseForQuiz = getCourseById(courseId || "");
  const moduleQuiz = dtmaCourseForQuiz ? getQuizByModuleId('economy-module-1') : null;
  
  const quizQuestions = moduleQuiz ? moduleQuiz.questions.map(q => ({
    text: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer
  })) : storedCourse.quizQuestions || [
    // Default demo quiz questions (fallback)
    {
      text: "What is the primary driver of digital transformation in organizations?",
      options: [
        "Technology adoption",
        "Customer expectations and market demands",
        "Cost reduction",
        "Regulatory compliance"
      ],
      correctAnswer: 1
    },
    {
      text: "Which of the following is a key component of digital transformation?",
      options: [
        "Cloud computing",
        "Data analytics",
        "Artificial intelligence",
        "All of the above"
      ],
      correctAnswer: 3
    },
    {
      text: "What role does organizational culture play in digital transformation?",
      options: [
        "It has minimal impact",
        "It is critical for success",
        "It only matters for large companies",
        "It can be ignored if technology is good"
      ],
      correctAnswer: 1
    }
  ];
  
  const passingScore = moduleQuiz?.passingScore || parseInt(storedCourse.passingScore || "70");
  const assignmentTitle = storedCourse.assignmentTitle || "";
  const assignmentInstructions = storedCourse.assignmentInstructions || "";
  const assignmentBriefUrl = storedCourse.assignmentBriefUrl || "";
  const allowedFileTypes = storedCourse.allowedFileTypes || "pdf,docx,zip";
  const practicalTitle = storedCourse.practicalTitle || "";
  const practicalInstructions = storedCourse.practicalInstructions || "";

  const handleQuizSubmit = () => {
    const correctAnswers = quizQuestions.filter((q: any, index: number) => 
      quizAnswers[index] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / quizQuestions.length) * 100);
    
    if (score >= passingScore) {
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

  // AI Tools handlers
  const handleGenerateAINotes = () => {
    setGeneratingAI(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratingAI(false);
      setShowAINotes(true);
    }, 2000);
  };

  const handleGenerateFlashcards = () => {
    setGeneratingAI(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratingAI(false);
      setShowFlashcards(true);
    }, 2000);
  };

  const handleGenerateInfographic = () => {
    setGeneratingAI(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratingAI(false);
      setShowInfographic(true);
    }, 2000);
  };

  useEffect(() => {
    if (!authLoading && !profile) {
      navigate(`/auth?redirect=/courses/${courseId}/learn`);
    }
  }, [authLoading, profile, navigate, courseId]);

  useEffect(() => {
    if (!enrollmentLoading && isEnrolled === false && profile) {
      navigate(`/courses/${courseId}`);
    }
  }, [enrollmentLoading, isEnrolled, navigate, courseId, profile]);

  // Build course data
  // First try to get course from dtmaCoursesNew
  const dtmaCourse = getCourseById(courseId || "");
  
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
        videoUrl: lesson.resources?.find((r: any) => r.type === 'video')?.url || null,
        resources: lesson.resources || [],
        duration_minutes: 15,
        type: lesson.resources?.find((r: any) => r.type === 'video') ? 'video' : 'reading',
      })) || [],
    })) : dtmaCourse?.modules ? dtmaCourse.modules.map((module: any) => ({
      id: module.id,
      title: module.title,
      lessons: module.lessons?.map((lesson: any) => ({
        id: lesson.id,
        title: lesson.title,
        content: `Lesson content for ${lesson.title}`,
        video_url: lesson.videoUrl || null,
        videoUrl: lesson.videoUrl || null,
        resources: [],
        duration_minutes: parseInt(lesson.duration) || 15,
        type: lesson.type || 'video',
        isQuiz: lesson.type === 'quiz',
        isAssignment: lesson.type === 'assignment',
        isPractical: lesson.type === 'practical',
      })) || [],
    })) : course?.modules ? course.modules.map((module: any) => ({
      id: module.id,
      title: module.title,
      lessons: module.lessons?.map((lesson: any) => ({
        id: lesson.id,
        title: lesson.title,
        content: `Lesson content for ${lesson.title}`,
        video_url: lesson.videoUrl || null,
        videoUrl: lesson.videoUrl || null,
        resources: [],
        duration_minutes: parseInt(lesson.duration) || 15,
        type: lesson.type || 'video',
      })) || [],
    })) : [
      {
        id: "module-1",
        title: "Getting Started",
        lessons: [
          { id: "lesson-1", title: "Lesson 1", content: "Welcome to Lesson 1", video_url: "/Lesson 1.mp4", videoUrl: "/Lesson 1.mp4", type: 'video', duration_minutes: 10 },
          { id: "lesson-2", title: "Lesson 2", content: "Continue with Lesson 2", video_url: "/Lesson 2.mp4", videoUrl: "/Lesson 2.mp4", type: 'video', duration_minutes: 15 },
          { id: "lesson-3", title: "Lesson 3", content: "Complete Lesson 3", video_url: "/Lesson 3.mp4", videoUrl: "/Lesson 3.mp4", type: 'video', duration_minutes: 12 },
        ],
      },
    ],
  } as any;

  // Add assessment if exists (from stored course data)
  if (curriculum.length > 0 && assessmentType !== "none") {
    courseData.modules.push({
      id: "assessment-module",
      title: "Final Assessment",
      lessons: [{
        id: "assessment",
        title: assessmentType === "quiz" ? "Course Quiz" : assessmentType === "assignment" ? assignmentTitle : practicalTitle,
        content: assessmentType === "quiz" ? "Test your knowledge" : assessmentType === "assignment" ? assignmentInstructions : practicalInstructions,
        video_url: null,
        type: assessmentType,
        isQuiz: assessmentType === "quiz",
        isAssignment: assessmentType === "assignment",
        isPractical: assessmentType === "practical",
        duration_minutes: 10,
      }],
    });
  }

  // Set first lesson
  useEffect(() => {
    if (courseData?.modules && courseData.modules.length > 0 && !selectedLesson) {
      const firstLesson = courseData.modules[0].lessons[0];
      setSelectedLesson(firstLesson);
    }
  }, []);

  // Reset quiz state when a new quiz lesson is selected
  useEffect(() => {
    if (selectedLesson?.isQuiz) {
      setCurrentQuestionIndex(0);
      setQuizAnswers({});
      setQuizStartTime(Date.now());
    }
  }, [selectedLesson?.id]);

  if (authLoading || courseLoading || enrollmentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalLessons = courseData?.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0;
  const completedLessons = Object.values(lessonProgress || {}).filter(Boolean).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getLessonIcon = (lesson: any) => {
    if (lesson.isQuiz) return <Award className="w-4 h-4" />;
    if (lesson.isAssignment) return <FileText className="w-4 h-4" />;
    if (lesson.isPractical) return <GraduationCap className="w-4 h-4" />;
    if (lesson.type === 'video') return <Video className="w-4 h-4" />;
    if (lesson.type === 'audio') return <Headphones className="w-4 h-4" />;
    return <BookOpen className="w-4 h-4" />;
  };

  const currentModuleTitle = courseData.modules?.find((m: any) => 
    m.lessons?.some((l: any) => l.id === selectedLesson?.id)
  )?.title;

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Main Content */}
      <main className="flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[14px] leading-[20px] font-normal">Back to Dashboard</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/courses">
              <Button variant="outline" size="sm">Browse Courses</Button>
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Course Outline - LEFT SIDE - 3 columns */}
            <div className="lg:col-span-3">
              <Card className="p-4">
                <h3 className="mb-4 text-[20px] leading-[28px] font-medium">Course Content</h3>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {courseData.modules?.map((module: any) => (
                      <div key={module.id} className="mb-4">
                        <h4 className="text-muted-foreground mb-2 px-2 text-[14px] leading-[20px] font-medium">{module.title}</h4>
                        {module.lessons?.map((lesson: any) => {
                          const isCompleted = !lesson.isQuiz && !lesson.isAssignment && !lesson.isPractical && lessonProgress?.[lesson.id];
                          const isActive = selectedLesson?.id === lesson.id;
                          const isLocked = false; // You can add locking logic here

                          return (
                            <button
                              key={lesson.id}
                              onClick={() => setSelectedLesson(lesson)}
                              disabled={isLocked}
                              className={`w-full text-left p-3 rounded-lg transition-colors ${
                                isActive
                                  ? 'bg-[#1e2348] text-white'
                                  : isCompleted
                                  ? 'bg-green-50 hover:bg-green-100'
                                  : isLocked
                                  ? 'bg-gray-50 cursor-not-allowed opacity-50'
                                  : 'hover:bg-[#1e2348]/15'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  {isLocked ? (
                                    <Lock className="w-4 h-4 text-muted-foreground" />
                                  ) : isCompleted ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    getLessonIcon(lesson)
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`line-clamp-2 ${isActive ? 'text-white' : ''} text-[14px] leading-[20px] font-medium`}>
                                    {lesson.title}
                                  </p>
                                  <p className={`mt-1 ${isActive ? 'text-white/70' : 'text-muted-foreground'} text-[12px] leading-[16px] font-medium`}>
                                    {lesson.duration_minutes || 15} min • {lesson.type || 'video'}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>

            {/* Main Player - MIDDLE - 6 columns */}
            <div className="lg:col-span-6 space-y-4">
              {/* Only show video player for non-quiz/non-assignment lessons */}
              {!selectedLesson?.isQuiz && !selectedLesson?.isAssignment && !selectedLesson?.isPractical && (
                <Card className="overflow-hidden">
                  {/* Video/Content Area */}
                  {selectedLesson?.video_url || selectedLesson?.videoUrl ? (
                    <div className="relative bg-black aspect-video">
                      {mediaMode === 'video' ? (
                        <video
                          className="w-full h-full"
                          controls
                          src={selectedLesson?.videoUrl || selectedLesson?.video_url}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          onTimeUpdate={(e) => {
                            const video = e.target as HTMLVideoElement;
                            const progress = (video.currentTime / video.duration) * 100;
                            setVideoProgress(progress);
                          }}
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1e2348] to-[#2a3058] flex items-center justify-center">
                          <audio
                            className="w-full"
                            controls
                            src={selectedLesson?.videoUrl || selectedLesson?.video_url}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                          >
                            Your browser does not support the audio tag.
                          </audio>
                          <Headphones className="w-20 h-20 text-white absolute" />
                        </div>
                      )}
                      {/* Media Mode Toggle - Top Right */}
                      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 rounded-lg p-1 backdrop-blur-sm">
                        <button
                          onClick={() => setMediaMode('video')}
                          className={`p-2 rounded-md transition-colors ${
                            mediaMode === 'video'
                              ? 'bg-[#ff6b4d] text-white'
                              : 'text-white/70 hover:text-white hover:bg-white/10'
                          }`}
                          title="Video Mode"
                        >
                          <Video className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setMediaMode('audio')}
                          className={`p-2 rounded-md transition-colors ${
                            mediaMode === 'audio'
                              ? 'bg-[#ff6b4d] text-white'
                              : 'text-white/70 hover:text-white hover:bg-white/10'
                          }`}
                          title="Audio Mode"
                        >
                          <Headphones className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : selectedLesson?.type === 'audio' ? (
                    <div className="relative bg-black aspect-video flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-[#1e2348] to-[#2a3058] flex items-center justify-center">
                        <Headphones className="w-20 h-20 text-white" />
                      </div>
                    </div>
                  ) : null}

                  {/* Controls - Hidden when using native video controls */}
                  {false && (selectedLesson?.video_url || selectedLesson?.videoUrl || selectedLesson?.type === 'audio') && (
                    <div className="p-4 bg-card">
                      <div className="mb-4">
                        <Progress value={videoProgress} className="h-2" />
                        <div className="flex justify-between text-muted-foreground mt-2 text-[12px] leading-[16px] font-medium">
                          <span>0:00</span>
                          <span>10:00</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <SkipBack className="w-5 h-5" />
                          </Button>
                          <Button
                            size="icon"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                          >
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                          </Button>
                          <Button variant="ghost" size="icon">
                            <SkipForward className="w-5 h-5" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              )}

              {/* Lesson Info */}
              <Card className="p-6">
                <h2 className="mb-2 text-[28px] leading-[36px] font-semibold">{selectedLesson?.title}</h2>
                <p className="text-muted-foreground mb-4 text-[14px] leading-[20px] font-normal">
                  {currentModuleTitle} • {selectedLesson?.duration_minutes || 15} min
                </p>

                {/* Lesson Content - Always show for regular lessons */}
                {selectedLesson?.content && !selectedLesson?.isQuiz && !selectedLesson?.isAssignment && !selectedLesson?.isPractical && (
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground text-[16px] leading-[24px] font-normal">{selectedLesson.content}</p>
                  </div>
                )}

                {/* Practical Content */}
                {selectedLesson?.isPractical && (
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
                    <GraduationCap className="w-6 h-6 text-blue-600 mb-3" />
                    <h3 className="text-blue-900 mb-2 text-[18px] leading-[28px] font-normal">Instructor Evaluation Required</h3>
                    <p className="text-blue-800 text-[14px] leading-[20px] font-normal">{practicalInstructions}</p>
                  </div>
                )}
              </Card>

              {/* Quiz Section - Shows below lesson content */}
              {selectedLesson?.isQuiz && quizQuestions.length > 0 && (
                <div className="space-y-6">
                  <Card className="p-8">
                    {/* Quiz Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-[28px] leading-[36px] font-semibold">
                          {selectedLesson?.title || 'Course Quiz'}
                        </h2>
                        <p className="text-muted-foreground mt-1 text-[14px] leading-[20px] font-normal">
                          Test your knowledge
                        </p>
                      </div>
                      <Badge className="bg-[#1e2348] text-white px-4 py-2">
                        Question {currentQuestionIndex + 1} of {quizQuestions.length}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                      <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="h-2" />
                    </div>

                    {/* Current Question */}
                    {quizQuestions[currentQuestionIndex] && (
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#ff6b4d] flex items-center justify-center shrink-0">
                            <span className="text-white font-semibold">{currentQuestionIndex + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[20px] leading-[28px] font-medium">
                              {quizQuestions[currentQuestionIndex].text}
                            </p>
                            
                            {/* Hint Button */}
                            {moduleQuiz?.questions[currentQuestionIndex]?.hint && (
                              <div className="mt-4">
                                {!showHints[currentQuestionIndex] ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowHints({ ...showHints, [currentQuestionIndex]: true })}
                                    className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Show Hint
                                  </Button>
                                ) : (
                                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                                    <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <div className="flex-1">
                                      <p className="text-blue-900 font-medium mb-1 text-[14px] leading-[20px]">Hint:</p>
                                      <p className="text-blue-800 text-[14px] leading-[20px] font-normal">
                                        {moduleQuiz.questions[currentQuestionIndex].hint}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => setShowHints({ ...showHints, [currentQuestionIndex]: false })}
                                      className="text-blue-400 hover:text-blue-600"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Answer Options */}
                        <div className="space-y-3 ml-14">
                          {quizQuestions[currentQuestionIndex].options.map((option: string, optIndex: number) => (
                            <label
                              key={optIndex}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                quizAnswers[currentQuestionIndex] === optIndex
                                  ? 'border-[#ff6b4d] bg-[#ff6b4d]/5'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${currentQuestionIndex}`}
                                value={optIndex}
                                checked={quizAnswers[currentQuestionIndex] === optIndex}
                                onChange={() => setQuizAnswers({ ...quizAnswers, [currentQuestionIndex]: optIndex })}
                                className="w-5 h-5 text-[#ff6b4d]"
                              />
                              <span className="text-[16px] leading-[24px] font-normal">{option}</span>
                            </label>
                          ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                            disabled={currentQuestionIndex === 0}
                          >
                            Previous
                          </Button>
                          {currentQuestionIndex < quizQuestions.length - 1 ? (
                            <Button
                              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                              className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                              disabled={quizAnswers[currentQuestionIndex] === undefined}
                            >
                              Next Question
                            </Button>
                          ) : (
                            <Button
                              onClick={handleQuizSubmit}
                              disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                              className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
                            >
                              Submit Answer
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* Quiz Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-[12px] leading-[16px] font-medium">Time Remaining</p>
                          <p className="font-semibold text-[16px] leading-[24px]">No limit</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-[12px] leading-[16px] font-medium">Current Score</p>
                          <p className="font-semibold text-[16px] leading-[24px]">{Object.keys(quizAnswers).length} correct</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-[12px] leading-[16px] font-medium">Pass Mark</p>
                          <p className="font-semibold text-[16px] leading-[24px]">{passingScore}%</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Assignment Section - Shows below lesson content */}
              {selectedLesson?.isAssignment && (
                <Card className="p-6">
                  <h3 className="mb-4 text-[24px] leading-[32px] font-medium">{assignmentTitle || 'Assignment'}</h3>
                  <div className="space-y-6">
                    <p className="text-muted-foreground whitespace-pre-wrap text-[16px] leading-[24px] font-normal">{assignmentInstructions}</p>
                    {!assignmentSubmitted ? (
                      <div className="border-2 border-dashed rounded-lg p-6">
                        <h3 className="mb-3 text-[14px] leading-[20px] font-medium">Submit Your Assignment</h3>
                        <input
                          type="file"
                          accept={allowedFileTypes.split(',').map(t => `.${t.trim()}`).join(',')}
                          onChange={(e) => setAssignmentFile(e.target.files?.[0] || null)}
                          className="mb-4"
                        />
                        <Button onClick={handleAssignmentSubmit} disabled={!assignmentFile} className="w-full bg-[#ff6b4d] hover:bg-[#e56045]">
                          Submit Assignment
                        </Button>
                      </div>
                    ) : (
                      <div className="border border-green-200 bg-green-50 rounded-lg p-6 text-center">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                        <h3 className="text-green-900 text-[18px] leading-[28px] font-normal">Assignment Submitted!</h3>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>

            {/* AI Learning Tools - RIGHT SIDE - 3 columns */}
            <div className="lg:col-span-3">
              <Card className="p-6 sticky top-24">
                <h3 className="mb-6 text-[20px] leading-[28px] font-medium">AI Learning Tools</h3>
                <div className="space-y-3">
                  {/* WhatsApp Learning */}
                  <WhatsAppLearning 
                    courseTitle={courseData.title || course?.title || "Course"}
                    lessonTitle={selectedLesson?.title || ""}
                  />

                  {/* Flashcards */}
                  <button 
                    onClick={handleGenerateFlashcards}
                    disabled={generatingAI}
                    className="group w-full relative bg-pink-50 hover:bg-pink-100 rounded-xl p-4 text-left transition-all disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-200 rounded-lg flex items-center justify-center shrink-0">
                          {generatingAI ? <Loader2 className="w-5 h-5 text-pink-700 animate-spin" /> : <FileText className="w-5 h-5 text-pink-700" />}
                        </div>
                        <h4 className="text-pink-900 text-[16px] leading-[24px] font-normal">Flashcards</h4>
                      </div>
                      <ChevronRight className="w-5 h-5 text-pink-400 group-hover:text-pink-600 transition-colors" />
                    </div>
                  </button>

                  {/* Infographic */}
                  <button 
                    onClick={handleGenerateInfographic}
                    disabled={generatingAI}
                    className="group w-full relative bg-purple-50 hover:bg-purple-100 rounded-xl p-4 text-left transition-all disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center shrink-0">
                          {generatingAI ? <Loader2 className="w-5 h-5 text-purple-700 animate-spin" /> : <Award className="w-5 h-5 text-purple-700" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-purple-900 text-[16px] leading-[24px] font-normal">Infographic</h4>
                          <Badge className="bg-black text-white text-xs px-2 py-0.5">BETA</Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-purple-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </button>

                  {/* AI Notes */}
                  <button 
                    onClick={handleGenerateAINotes}
                    disabled={generatingAI}
                    className="group w-full relative bg-blue-50 hover:bg-blue-100 rounded-xl p-4 text-left transition-all disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center shrink-0">
                          {generatingAI ? <Loader2 className="w-5 h-5 text-blue-700 animate-spin" /> : <FileText className="w-5 h-5 text-blue-700" />}
                        </div>
                        <h4 className="text-blue-900 text-[16px] leading-[24px] font-normal">AI Notes</h4>
                      </div>
                      <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Course Tutor AI */}
      <CourseTutorAI
        courseTitle={courseData.title || course?.title || "Course"}
        moduleTitle={currentModuleTitle}
        lessonTitle={selectedLesson?.title || ""}
        lessonContent={selectedLesson?.content || ""}
        isQuiz={selectedLesson?.isQuiz || false}
        isAssignment={selectedLesson?.isAssignment || false}
        currentProgress={progressPercent}
      />

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-gray-900 mb-2 text-[32px] leading-[40px] font-semibold">Congratulations!</h2>
                <p className="text-gray-600 text-[16px] leading-[24px] font-normal">You've successfully completed the course</p>
              </div>

              <div className="border-4 border-[#4A3428] rounded-lg p-12 bg-gradient-to-br from-amber-50 to-white mb-6">
                <div className="text-center space-y-4">
                  <div className="text-gray-500 uppercase tracking-wider text-[12px] leading-[16px] font-medium">Certificate of Completion</div>
                  <h3 className="font-serif text-[#4A3428] text-[32px] leading-[40px] font-semibold">DTMA</h3>
                  <p className="text-gray-600 text-[14px] leading-[20px] font-normal">This is to certify that</p>
                  <div className="text-gray-900 border-b-2 border-[#4A3428] inline-block px-12 pb-2 text-[24px] leading-[32px] font-medium">
                    {profile?.full_name || "Student Name"}
                  </div>
                  <p className="text-gray-600 text-[14px] leading-[20px] font-normal">has successfully completed</p>
                  <div className="text-gray-900 text-[20px] leading-[28px] font-medium">{course?.title || "Course Title"}</div>
                  <p className="text-gray-500 text-[14px] leading-[20px] font-normal">Completed on {new Date().toLocaleDateString()}</p>
                  <p className="text-gray-400 pt-6 text-[12px] leading-[16px] font-medium">Certificate ID: CERT-{Date.now()}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => window.print()} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
                <Button
                  onClick={() => {
                    setShowCertificate(false);
                    navigate('/dashboard');
                  }}
                  className="flex-1 bg-[#ff6b4d] hover:bg-[#e56045]"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Notes Modal */}
      {showAINotes && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] leading-[32px] font-medium">AI Generated Notes</h2>
                <button onClick={() => setShowAINotes(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-[18px] leading-[28px]">Key Points</h3>
                  <ul className="space-y-2 text-gray-700 text-[14px] leading-[20px] font-normal">
                    <li>• {selectedLesson?.title} covers fundamental concepts</li>
                    <li>• Important to understand the core principles before moving forward</li>
                    <li>• Practice exercises help reinforce learning</li>
                    <li>• Review the material multiple times for better retention</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-[18px] leading-[28px]">Summary</h3>
                  <p className="text-gray-700 text-[14px] leading-[20px] font-normal">
                    {selectedLesson?.content || "This lesson provides an overview of the key concepts and practical applications in the field."}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button className="flex-1 bg-[#ff6b4d] hover:bg-[#e56045]">
                  <Download className="w-4 h-4 mr-2" />
                  Download Notes
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowAINotes(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flashcards Modal */}
      {showFlashcards && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] leading-[32px] font-medium">AI Generated Flashcards</h2>
                <button onClick={() => setShowFlashcards(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-2 border-pink-200 rounded-xl p-6 bg-pink-50">
                    <div className="mb-4">
                      <p className="text-pink-900 font-semibold mb-2 text-[16px] leading-[24px]">Question {i}</p>
                      <p className="text-gray-700 text-[14px] leading-[20px] font-normal">
                        What is the main concept covered in {selectedLesson?.title}?
                      </p>
                    </div>
                    <div className="border-t-2 border-pink-200 pt-4">
                      <p className="text-pink-900 font-semibold mb-2 text-[16px] leading-[24px]">Answer</p>
                      <p className="text-gray-700 text-[14px] leading-[20px] font-normal">
                        The lesson covers fundamental principles and practical applications.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <Button className="flex-1 bg-[#ff6b4d] hover:bg-[#e56045]">
                  <Download className="w-4 h-4 mr-2" />
                  Download Flashcards
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowFlashcards(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Infographic Modal */}
      {showInfographic && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-[24px] leading-[32px] font-medium">AI Generated Infographic</h2>
                  <Badge className="bg-black text-white text-xs px-2 py-0.5">BETA</Badge>
                </div>
                <button onClick={() => setShowInfographic(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Award className="w-20 h-20 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-purple-900 mb-4 text-[28px] leading-[36px] font-semibold">
                    {selectedLesson?.title}
                  </h3>
                  <p className="text-purple-700 max-w-md mx-auto text-[16px] leading-[24px] font-normal">
                    Visual representation of key concepts and relationships
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {['Concept 1', 'Concept 2', 'Concept 3'].map((concept, i) => (
                      <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="font-semibold text-purple-900 text-[14px] leading-[20px]">{concept}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button className="flex-1 bg-[#ff6b4d] hover:bg-[#e56045]">
                  <Download className="w-4 h-4 mr-2" />
                  Download Infographic
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowInfographic(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLearning;
