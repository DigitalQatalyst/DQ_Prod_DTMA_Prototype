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
import { getQuizByModuleId } from "@/data/quizzes/quizLoader";

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
  const [showCelebration, setShowCelebration] = useState(false);
  const [showModuleSuccess, setShowModuleSuccess] = useState(false);
  const [passedModules, setPassedModules] = useState<Set<string>>(new Set());
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
  const [generatingAI, setGeneratingAI] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [isAIToolsCollapsed, setIsAIToolsCollapsed] = useState(false);
  const [isCourseContentCollapsed, setIsCourseContentCollapsed] = useState(false);
  
  // Personal Notes state
  const [showPersonalNotes, setShowPersonalNotes] = useState(false);
  const [personalNotes, setPersonalNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState("");
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Load course data from localStorage
  const storedCourse = courseId ? JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}') : {};
  const curriculum = storedCourse.curriculum || [];
  const assessmentType = storedCourse.assessmentType || "none";
  
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
      // Mark this module as passed
      const newPassedModules = new Set(passedModules);
      if (currentModuleId) {
        newPassedModules.add(currentModuleId);
        setPassedModules(newPassedModules);
        
        // Save to localStorage for persistence
        localStorage.setItem(`course_${courseId}_passed_modules`, JSON.stringify(Array.from(newPassedModules)));
      }
      
      // Check if this is the last module
      const totalModules = courseData?.modules?.filter((m: any) => 
        m.lessons?.some((l: any) => l.isQuiz)
      ).length || 0;
      
      const isLastModule = currentModuleId === 'economy-module-3' || newPassedModules.size === totalModules;
      
      if (isLastModule) {
        // Show celebration animation first, then certificate
        setShowCelebration(true);
      } else {
        // Show congratulatory message for intermediate modules
        setShowModuleSuccess(true);
      }
    } else {
      alert(`You scored ${score}%. You need ${passingScore}% to pass. Please try again.`);
      setQuizAnswers({});
      setCurrentQuestionIndex(0);
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
      setCurrentFlashcardIndex(0);
      setIsFlashcardFlipped(false);
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

  // Build course data - PRIORITIZE dtmaCoursesNew over localStorage
  const dtmaCourse = getCourseById(courseId || "");
  
  const courseData = {
    ...course,
    modules: dtmaCourse?.modules && dtmaCourse.modules.length > 0 ? dtmaCourse.modules.map((module: any) => ({
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
    })) : curriculum.length > 0 ? curriculum.map((section: any) => ({
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

  // Determine which module the current lesson belongs to and get the appropriate quiz
  const currentModuleId = courseData?.modules?.find((m: any) => 
    m.lessons?.some((l: any) => l.id === selectedLesson?.id)
  )?.id;
  
  const moduleQuiz = currentModuleId ? getQuizByModuleId(currentModuleId) : null;
  
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

  // Load passed modules from localStorage
  useEffect(() => {
    if (courseId) {
      const savedPassedModules = localStorage.getItem(`course_${courseId}_passed_modules`);
      if (savedPassedModules) {
        setPassedModules(new Set(JSON.parse(savedPassedModules)));
      }
    }
  }, [courseId]);

  // Load personal notes from localStorage
  useEffect(() => {
    if (courseId) {
      const savedNotes = localStorage.getItem(`course_${courseId}_personal_notes`);
      if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        setPersonalNotes(notes);
        if (selectedLesson?.id && notes[selectedLesson.id]) {
          setCurrentNote(notes[selectedLesson.id]);
        }
      }
    }
  }, [courseId]);

  // Update current note when lesson changes
  useEffect(() => {
    if (selectedLesson?.id) {
      setCurrentNote(personalNotes[selectedLesson.id] || "");
    }
  }, [selectedLesson?.id, personalNotes]);

  // Auto-save notes
  const handleNotesChange = (value: string) => {
    setCurrentNote(value);
    if (selectedLesson?.id && courseId) {
      const updatedNotes = { ...personalNotes, [selectedLesson.id]: value };
      setPersonalNotes(updatedNotes);
      localStorage.setItem(`course_${courseId}_personal_notes`, JSON.stringify(updatedNotes));
    }
  };

  // Download notes as text file
  const handleDownloadNotes = () => {
    if (!courseId || Object.keys(personalNotes).length === 0) {
      alert("No notes to download!");
      return;
    }

    let notesContent = `Course Notes - ${course?.title || "Course"}\n`;
    notesContent += `Generated on: ${new Date().toLocaleDateString()}\n`;
    notesContent += `${"=".repeat(60)}\n\n`;

    // Organize notes by module and lesson
    courseData.modules?.forEach((module: any) => {
      let moduleHasNotes = false;
      let moduleContent = `\n${module.title}\n${"-".repeat(module.title.length)}\n\n`;

      module.lessons?.forEach((lesson: any) => {
        if (personalNotes[lesson.id]) {
          moduleHasNotes = true;
          moduleContent += `${lesson.title}\n`;
          moduleContent += `${personalNotes[lesson.id]}\n\n`;
        }
      });

      if (moduleHasNotes) {
        notesContent += moduleContent;
      }
    });

    // Create and download file
    const blob = new Blob([notesContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${course?.title || 'Course'}_Notes_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
              <Button variant="outline" size="sm" className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]">Browse Courses</Button>
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Course Outline - LEFT SIDE - 3 columns (collapses to minimal width) */}
            <div className={`transition-all duration-300 ${isCourseContentCollapsed ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
              <Card className="p-4 relative">
                <div className="flex items-center justify-between mb-4">
                  {!isCourseContentCollapsed && (
                    <h3 className="text-[#1e2348] text-[18px] leading-[26px] font-bold">Course Content</h3>
                  )}
                  <button
                    onClick={() => setIsCourseContentCollapsed(!isCourseContentCollapsed)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
                    aria-label={isCourseContentCollapsed ? "Expand Course Content" : "Collapse Course Content"}
                  >
                    <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${isCourseContentCollapsed ? '' : 'rotate-180'}`} />
                  </button>
                </div>
                {!isCourseContentCollapsed && (
                  <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {courseData.modules?.map((module: any) => {
                      const moduleHasQuiz = module.lessons?.some((l: any) => l.isQuiz);
                      const isModulePassed = moduleHasQuiz && passedModules.has(module.id);
                      
                      return (
                      <div key={module.id} className="mb-6">
                        <div className="flex items-center gap-2 mb-3 px-2">
                          <h4 className="text-[#1e2348] text-[16px] leading-[24px] font-bold flex-1">{module.title}</h4>
                          {isModulePassed && (
                            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              <CheckCircle className="w-3 h-3" />
                              <span className="text-[10px] leading-[14px] font-semibold">PASSED</span>
                            </div>
                          )}
                        </div>
                        {module.lessons?.map((lesson: any) => {
                          const isCompleted = !lesson.isQuiz && !lesson.isAssignment && !lesson.isPractical && lessonProgress?.[lesson.id];
                          const isQuizPassed = lesson.isQuiz && passedModules.has(module.id);
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
                                  : isCompleted || isQuizPassed
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
                                  ) : isCompleted || isQuizPassed ? (
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
                      );
                    })}
                  </div>
                </ScrollArea>
                )}
              </Card>
            </div>

            {/* Main Player - MIDDLE - 6 columns (9 columns when quiz is active) */}
            <div className={`space-y-4 ${selectedLesson?.isQuiz ? 'lg:col-span-9' : 'lg:col-span-6'}`}>
              {/* Only show video player for non-quiz/non-assignment lessons */}
              {!selectedLesson?.isQuiz && !selectedLesson?.isAssignment && !selectedLesson?.isPractical && (
                <div className="overflow-hidden rounded-lg">
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
                        <div className="relative w-full h-full bg-gradient-to-br from-[#1e2348] to-[#2a3058] flex flex-col items-center justify-center">
                          {/* Headphones Icon - Centered */}
                          <Headphones className="w-20 h-20 text-white mb-8" />
                          
                          {/* Audio Player - Bottom */}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-4">
                            <audio
                              className="w-full"
                              controls
                              src={selectedLesson?.videoUrl || selectedLesson?.video_url}
                              onPlay={() => setIsPlaying(true)}
                              onPause={() => setIsPlaying(false)}
                            >
                              Your browser does not support the audio tag.
                            </audio>
                          </div>
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
                </div>
              )}

              {/* Lesson Info - Only show for non-quiz lessons */}
              {!selectedLesson?.isQuiz && (
                <Card className="p-6">
                  {/* Calculate lesson number (e.g., 1.1, 1.2, 2.1) - Only for non-quiz lessons */}
                  {(() => {
                    const moduleIndex = courseData?.modules?.findIndex((m: any) => 
                      m.lessons?.some((l: any) => l.id === selectedLesson?.id)
                    );
                    const module = courseData?.modules?.[moduleIndex];
                    const lessonIndex = module?.lessons?.findIndex((l: any) => l.id === selectedLesson?.id);
                    const lessonNumber = `${moduleIndex + 1}.${lessonIndex + 1}`;
                    
                    // Don't show numbering for assignments or practicals
                    if (selectedLesson?.isAssignment || selectedLesson?.isPractical) {
                      return (
                        <>
                          <h2 className="mb-4 text-[28px] leading-[36px] font-semibold">{selectedLesson?.title}</h2>
                          {/* Lesson Content */}
                          {selectedLesson?.content && (
                            <div className="prose max-w-none">
                              <p className="text-muted-foreground text-[16px] leading-[24px] font-normal">{selectedLesson.content}</p>
                            </div>
                          )}
                        </>
                      );
                    }
                    
                    return (
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-[#ff6b4d] text-white px-3 py-1 rounded-lg text-[14px] leading-[20px] font-bold">
                            {lessonNumber}
                          </div>
                          <h2 className="text-[28px] leading-[36px] font-semibold">{selectedLesson?.title}</h2>
                        </div>
                        {/* Lesson Content - Aligned with title, not badge */}
                        {selectedLesson?.content && (
                          <div className="prose max-w-none ml-[52px]">
                            <p className="text-muted-foreground text-[16px] leading-[24px] font-normal">{selectedLesson.content}</p>
                          </div>
                        )}
                      </>
                    );
                  })()}

                  {/* Practical Content */}
                  {selectedLesson?.isPractical && (
                    <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
                      <GraduationCap className="w-6 h-6 text-blue-600 mb-3" />
                      <h3 className="text-blue-900 mb-2 text-[18px] leading-[28px] font-normal">Instructor Evaluation Required</h3>
                      <p className="text-blue-800 text-[14px] leading-[20px] font-normal">{practicalInstructions}</p>
                    </div>
                  )}
                </Card>
              )}

              {/* Quiz Section - Shows below lesson content */}
              {selectedLesson?.isQuiz && quizQuestions.length > 0 && (
                <div className="space-y-6">
                  <Card className="p-8">
                    {/* Quiz Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-[#1e2348] text-[32px] leading-[40px] font-bold">
                          {selectedLesson?.title || 'Course Quiz'}
                        </h2>
                        <p className="text-gray-600 mt-2 text-[16px] leading-[24px] font-normal">
                          Test your knowledge
                        </p>
                      </div>
                      <Badge className="bg-[#1e2348] text-white px-5 py-2.5 text-[14px] leading-[20px] font-semibold">
                        Question {currentQuestionIndex + 1} of {quizQuestions.length}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-10">
                      <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="h-3" />
                    </div>

                    {/* Current Question */}
                    {quizQuestions[currentQuestionIndex] && (
                      <div className="space-y-8">
                        <div className="flex items-start gap-5">
                          <div className="w-12 h-12 rounded-full bg-[#ff6b4d] flex items-center justify-center shrink-0">
                            <span className="text-white text-[18px] leading-[26px] font-bold">{currentQuestionIndex + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[#1e2348] text-[24px] leading-[32px] font-semibold">
                              {quizQuestions[currentQuestionIndex].text}
                            </p>
                            
                            {/* Hint Button */}
                            {moduleQuiz?.questions[currentQuestionIndex]?.hint && (
                              <div className="mt-5">
                                {!showHints[currentQuestionIndex] ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowHints({ ...showHints, [currentQuestionIndex]: true })}
                                    className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-50 text-[14px] leading-[20px] font-medium"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Show Hint
                                  </Button>
                                ) : (
                                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 flex items-start gap-4">
                                    <svg className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <div className="flex-1">
                                      <p className="text-blue-900 font-semibold mb-2 text-[16px] leading-[24px]">Hint:</p>
                                      <p className="text-blue-800 text-[15px] leading-[22px] font-normal">
                                        {moduleQuiz.questions[currentQuestionIndex].hint}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => setShowHints({ ...showHints, [currentQuestionIndex]: false })}
                                      className="text-blue-400 hover:text-blue-600"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Answer Options */}
                        <div className="space-y-4 ml-[68px]">
                          {quizQuestions[currentQuestionIndex].options.map((option: string, optIndex: number) => (
                            <label
                              key={optIndex}
                              className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                                quizAnswers[currentQuestionIndex] === optIndex
                                  ? 'border-[#ff6b4d] bg-[#ff6b4d]/5 shadow-sm'
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
                              <span className="text-[#1e2348] text-[18px] leading-[26px] font-normal">{option}</span>
                            </label>
                          ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-10 pt-8 border-t-2">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                            disabled={currentQuestionIndex === 0}
                            className="text-[16px] leading-[24px] font-medium px-6 py-3"
                          >
                            Previous
                          </Button>
                          {currentQuestionIndex < quizQuestions.length - 1 ? (
                            <Button
                              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                              className="bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[16px] leading-[24px] font-semibold px-8 py-3"
                              disabled={quizAnswers[currentQuestionIndex] === undefined}
                            >
                              Next Question
                            </Button>
                          ) : (
                            <Button
                              onClick={handleQuizSubmit}
                              disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                              className="bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[16px] leading-[24px] font-semibold px-8 py-3"
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

            {/* AI Learning Tools - RIGHT SIDE - 3 columns - Hidden during quizzes */}
            {!selectedLesson?.isQuiz && (
              <div className="lg:col-span-3">
                <Card className="p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[20px] leading-[28px] font-medium">AI Learning Tools</h3>
                    <button
                      onClick={() => setIsAIToolsCollapsed(!isAIToolsCollapsed)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label={isAIToolsCollapsed ? "Expand AI Tools" : "Collapse AI Tools"}
                    >
                      <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${isAIToolsCollapsed ? '' : 'rotate-90'}`} />
                    </button>
                  </div>
                  {!isAIToolsCollapsed && (
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

                    {/* Personal Notes */}
                    <button 
                      onClick={() => setShowPersonalNotes(true)}
                      className="group w-full relative bg-orange-50 hover:bg-orange-100 rounded-xl p-4 text-left transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#ff6b4d]/20 rounded-lg flex items-center justify-center shrink-0">
                            <BookOpen className="w-5 h-5 text-[#ff6b4d]" />
                          </div>
                          <div>
                            <h4 className="text-[#1e2348] text-[16px] leading-[24px] font-normal">My Notes</h4>
                            {currentNote && (
                              <p className="text-[#ff6b4d] text-[11px] leading-[16px] font-medium">Last edited</p>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#ff6b4d]/60 group-hover:text-[#ff6b4d] transition-colors" />
                      </div>
                    </button>
                  </div>
                  )}
                </Card>
              </div>
            )}
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

      {/* Celebration Modal with Fireworks - Shows after passing final module */}
      {showCelebration && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#1e2348] via-[#2a3058] to-[#1e2348] flex items-center justify-center z-50 overflow-hidden">
          {/* Animated Fireworks Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Firework particles - Navy and Orange */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-firework"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: i % 2 === 0 ? '#ff6b4d' : '#1e2348',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  boxShadow: i % 2 === 0 
                    ? '0 0 20px #ff6b4d, 0 0 40px #ff6b4d' 
                    : '0 0 20px #1e2348, 0 0 40px #1e2348',
                }}
              />
            ))}
            
            {/* Larger burst effects */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`burst-${i}`}
                className="absolute animate-burst"
                style={{
                  left: `${20 + (i * 12)}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                <div className={`w-4 h-4 rounded-full ${i % 2 === 0 ? 'bg-[#ff6b4d]' : 'bg-white'}`}
                  style={{
                    boxShadow: i % 2 === 0 
                      ? '0 0 30px #ff6b4d, 0 0 60px #ff6b4d' 
                      : '0 0 30px white, 0 0 60px white',
                  }}
                />
              </div>
            ))}

            {/* Confetti falling */}
            {[...Array(40)].map((_, i) => (
              <div
                key={`confetti-${i}`}
                className="absolute w-3 h-3 animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-5%',
                  backgroundColor: i % 3 === 0 ? '#ff6b4d' : i % 3 === 1 ? '#1e2348' : '#ffffff',
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>

          {/* Celebration Content */}
          <div className="relative z-10 text-center px-6 max-w-3xl animate-scale-in">
            {/* Trophy Icon with Glow */}
            <div className="mb-8 relative inline-block">
              <div className="absolute inset-0 bg-[#ff6b4d] blur-3xl opacity-50 animate-pulse"></div>
              <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-[#ff6b4d] to-[#ff8c73] rounded-full flex items-center justify-center shadow-2xl">
                <Award className="w-20 h-20 text-white animate-bounce-slow" />
              </div>
            </div>

            {/* Main Message */}
            <h1 className="text-white mb-6 text-[56px] leading-[64px] font-bold tracking-tight animate-fade-in-up">
              Outstanding Achievement!
            </h1>
            
            <p className="text-white/90 text-[24px] leading-[32px] font-light mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              You've successfully completed all modules
            </p>

            {/* Course Title */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-white/70 text-[14px] leading-[20px] font-medium uppercase tracking-wider mb-2">
                Course Completed
              </p>
              <h2 className="text-white text-[28px] leading-[36px] font-semibold">
                {course?.title || "Digital Transformation Course"}
              </h2>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mb-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="text-[#ff6b4d] text-[36px] leading-[44px] font-bold mb-1">3/3</div>
                <div className="text-white/70 text-[14px] leading-[20px] font-medium">Modules Passed</div>
              </div>
              <div className="h-16 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-[#ff6b4d] text-[36px] leading-[44px] font-bold mb-1">100%</div>
                <div className="text-white/70 text-[14px] leading-[20px] font-medium">Course Complete</div>
              </div>
            </div>

            {/* Claim Certificate Button */}
            <button
              onClick={() => {
                setShowCelebration(false);
                setShowCertificate(true);
              }}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#ff6b4d] to-[#ff8c73] hover:from-[#ff8c73] hover:to-[#ff6b4d] text-white px-12 py-5 rounded-full text-[18px] leading-[26px] font-bold shadow-2xl hover:shadow-[#ff6b4d]/50 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: '0.8s' }}
            >
              <Award className="w-6 h-6" />
              <span>Claim Your Certificate</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Subtitle */}
            <p className="text-white/60 text-[14px] leading-[20px] font-normal mt-6 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              Your achievement will be permanently recorded
            </p>
          </div>

          {/* Add custom animations via style tag */}
          <style>{`
            @keyframes firework {
              0% {
                transform: translateY(0) scale(0);
                opacity: 1;
              }
              50% {
                opacity: 1;
              }
              100% {
                transform: translateY(-100vh) scale(1);
                opacity: 0;
              }
            }
            
            @keyframes burst {
              0% {
                transform: scale(0);
                opacity: 1;
              }
              50% {
                transform: scale(3);
                opacity: 0.8;
              }
              100% {
                transform: scale(5);
                opacity: 0;
              }
            }
            
            @keyframes confetti {
              0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
              }
            }
            
            @keyframes scale-in {
              0% {
                transform: scale(0.8);
                opacity: 0;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
            
            @keyframes fade-in-up {
              0% {
                transform: translateY(20px);
                opacity: 0;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }
            
            @keyframes bounce-slow {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            
            .animate-firework {
              animation: firework linear infinite;
            }
            
            .animate-burst {
              animation: burst 2s ease-out infinite;
            }
            
            .animate-confetti {
              animation: confetti linear infinite;
            }
            
            .animate-scale-in {
              animation: scale-in 0.5s ease-out;
            }
            
            .animate-fade-in-up {
              animation: fade-in-up 0.6s ease-out both;
            }
            
            .animate-bounce-slow {
              animation: bounce-slow 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      )}

      {/* Module Success Modal - Shows after passing a module quiz (except last one) */}
      {showModuleSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-10 text-center">
              {/* Success Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-14 h-14 text-white" />
              </div>

              {/* Success Message */}
              <h2 className="text-[#1e2348] mb-4 text-[32px] leading-[40px] font-bold">
                Excellent Work!
              </h2>
              <p className="text-gray-600 text-[18px] leading-[26px] font-normal mb-6">
                You've successfully passed this module quiz!
              </p>

              {/* Module Progress */}
              <div className="bg-gradient-to-r from-[#1e2348]/5 via-[#1e2348]/10 to-[#1e2348]/5 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-[#ff6b4d]" />
                  <p className="text-[#1e2348] text-[20px] leading-[28px] font-semibold">
                    Module Completed
                  </p>
                </div>
                <p className="text-gray-600 text-[15px] leading-[22px] font-normal">
                  {passedModules.size} of 3 modules completed
                </p>
                
                {/* Progress Bar */}
                <div className="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#ff6b4d] to-[#ff8c73] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${(passedModules.size / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Encouragement Message */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                  <div className="text-left">
                    <p className="text-blue-900 font-semibold mb-1 text-[16px] leading-[24px]">
                      Keep Going!
                    </p>
                    <p className="text-blue-800 text-[14px] leading-[20px] font-normal">
                      Continue to the next module to complete your learning journey and earn your certificate.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => {
                  setShowModuleSuccess(false);
                  setQuizAnswers({});
                  setCurrentQuestionIndex(0);
                  // Find and navigate to the next module's first lesson
                  const currentModuleIndex = courseData?.modules?.findIndex((m: any) => m.id === currentModuleId);
                  if (currentModuleIndex !== -1 && currentModuleIndex < courseData.modules.length - 1) {
                    const nextModule = courseData.modules[currentModuleIndex + 1];
                    if (nextModule?.lessons?.[0]) {
                      setSelectedLesson(nextModule.lessons[0]);
                    }
                  }
                }}
                className="w-full bg-gradient-to-r from-[#ff6b4d] to-[#ff8c73] hover:from-[#e56045] hover:to-[#ff6b4d] text-white shadow-lg hover:shadow-xl transition-all text-[16px] leading-[24px] font-semibold py-6"
              >
                Continue to Next Module
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
            <div className="p-10">
              {/* Success Header */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ff6b4d] to-[#ff8c73] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-[#1e2348] mb-3 text-[36px] leading-[44px] font-bold">Congratulations!</h2>
                <p className="text-gray-600 text-[18px] leading-[26px] font-normal">You've successfully completed the course and earned your certificate</p>
              </div>

              {/* Executive Certificate Design */}
              <div className="relative bg-gradient-to-br from-[#1e2348] via-[#2a3058] to-[#1e2348] rounded-2xl p-1 mb-8 shadow-xl">
                <div className="bg-white rounded-xl p-12 relative overflow-hidden">
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#ff6b4d] rounded-tl-xl opacity-30"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-[#ff6b4d] rounded-tr-xl opacity-30"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-[#ff6b4d] rounded-bl-xl opacity-30"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-[#ff6b4d] rounded-br-xl opacity-30"></div>
                  
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #1e2348 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                  }}></div>

                  <div className="relative text-center space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#ff6b4d]"></div>
                        <Award className="w-8 h-8 text-[#ff6b4d]" />
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#ff6b4d]"></div>
                      </div>
                      <div className="text-[#1e2348] uppercase tracking-[0.3em] text-[13px] leading-[18px] font-semibold">Certificate of Completion</div>
                    </div>

                    {/* DTMA Branding */}
                    <div className="py-4">
                      <h3 className="font-bold text-[#1e2348] text-[48px] leading-[56px] tracking-tight mb-2">DTMA</h3>
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-1 w-12 bg-gradient-to-r from-[#1e2348] to-[#ff6b4d] rounded-full"></div>
                        <GraduationCap className="w-5 h-5 text-[#ff6b4d]" />
                        <div className="h-1 w-12 bg-gradient-to-l from-[#1e2348] to-[#ff6b4d] rounded-full"></div>
                      </div>
                    </div>

                    {/* Certificate Body */}
                    <div className="space-y-5 py-6">
                      <p className="text-gray-600 text-[16px] leading-[24px] font-normal">This is to certify that</p>
                      
                      {/* Student Name - Highlighted */}
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b4d]/10 via-[#ff6b4d]/5 to-[#ff6b4d]/10 blur-xl"></div>
                        <div className="relative text-[#1e2348] px-16 py-4 text-[32px] leading-[40px] font-bold border-b-3 border-[#1e2348]">
                          {profile?.full_name || "Student Name"}
                        </div>
                      </div>

                      <p className="text-gray-600 text-[16px] leading-[24px] font-normal">has successfully completed</p>
                      
                      {/* Course Title */}
                      <div className="bg-gradient-to-r from-[#1e2348]/5 via-[#1e2348]/10 to-[#1e2348]/5 rounded-lg px-8 py-4 mx-auto max-w-2xl">
                        <div className="text-[#1e2348] text-[24px] leading-[32px] font-semibold">{course?.title || "Course Title"}</div>
                      </div>

                      {/* Date */}
                      <div className="pt-4">
                        <p className="text-gray-500 text-[15px] leading-[22px] font-medium">
                          Completed on {new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Footer with Certificate ID */}
                    <div className="pt-8 border-t border-gray-200">
                      <div className="flex items-center justify-center gap-8 text-[13px] leading-[18px]">
                        <div className="text-center">
                          <p className="text-gray-400 font-medium mb-1">Certificate ID</p>
                          <p className="text-[#1e2348] font-mono font-semibold">DTMA-{Date.now().toString().slice(-8)}</p>
                        </div>
                        <div className="h-8 w-px bg-gray-300"></div>
                        <div className="text-center">
                          <p className="text-gray-400 font-medium mb-1">Issued By</p>
                          <p className="text-[#1e2348] font-semibold">Digital Transformation Management Academy</p>
                        </div>
                      </div>
                    </div>

                    {/* Verification Badge */}
                    <div className="pt-6">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1e2348] to-[#2a3058] text-white px-6 py-2 rounded-full text-[12px] leading-[16px] font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>VERIFIED CREDENTIAL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => window.print()} 
                  className="flex-1 border-2 border-[#1e2348] text-[#1e2348] hover:bg-[#ff6b4d] hover:border-[#ff6b4d] hover:text-white transition-all text-[15px] leading-[22px] font-semibold py-6"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Certificate
                </Button>
                <Button
                  onClick={() => {
                    setShowCertificate(false);
                    navigate('/dashboard');
                  }}
                  className="flex-1 bg-gradient-to-r from-[#ff6b4d] to-[#ff8c73] hover:from-[#e56045] hover:to-[#ff6b4d] text-white shadow-lg hover:shadow-xl transition-all text-[15px] leading-[22px] font-semibold py-6"
                >
                  Go to Dashboard
                  <ChevronRight className="w-5 h-5 ml-2" />
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
                <Button variant="outline" className="flex-1 hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]" onClick={() => setShowAINotes(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personal Notes Modal */}
      {showPersonalNotes && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#1e2348]/5 to-[#ff6b4d]/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-lg flex items-center justify-center shadow-sm">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-[24px] leading-[32px] font-semibold text-[#1e2348]">My Notes</h2>
                    <p className="text-gray-500 text-[14px] leading-[20px] font-normal">
                      {selectedLesson?.title || "Current Lesson"}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPersonalNotes(false)} 
                  className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Auto-save indicator */}
              <div className="flex items-center gap-2 text-green-600 text-[12px] leading-[16px] font-medium">
                <CheckCircle className="w-3 h-3" />
                <span>Auto-saved</span>
              </div>
            </div>

            {/* Notes Editor */}
            <div className="flex-1 overflow-y-auto p-6">
              <textarea
                value={currentNote}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Start typing your notes here... Your notes will be automatically saved."
                className="w-full h-full min-h-[400px] p-4 border-2 border-gray-200 rounded-xl focus:border-[#ff6b4d] focus:outline-none resize-none text-[16px] leading-[24px] font-normal"
              />
            </div>

            {/* Footer with Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[14px] leading-[20px] text-gray-600">
                  <span className="font-medium">{Object.keys(personalNotes).filter(key => personalNotes[key]).length}</span> lessons with notes
                </div>
                <div className="text-[14px] leading-[20px] text-gray-600">
                  {currentNote.length} characters
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handleDownloadNotes}
                  disabled={Object.keys(personalNotes).filter(key => personalNotes[key]).length === 0}
                  className="flex-1 bg-gradient-to-r from-[#1e2348] to-[#2a3058] hover:from-[#2a3058] hover:to-[#1e2348] text-white shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All Notes
                </Button>
                <Button
                  onClick={() => {
                    if (selectedLesson?.id && currentNote) {
                      const lessonTitle = selectedLesson.title.replace(/[^a-z0-9]/gi, '_');
                      const content = `${selectedLesson.title}\n${"=".repeat(selectedLesson.title.length)}\n\n${currentNote}`;
                      const blob = new Blob([content], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `${lessonTitle}_Notes.txt`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }
                  }}
                  disabled={!currentNote}
                  variant="outline"
                  className="flex-1 border-2 border-[#ff6b4d] text-[#ff6b4d] hover:bg-[#ff6b4d]/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download This Note
                </Button>
                <Button
                  onClick={() => setShowPersonalNotes(false)}
                  variant="outline"
                  className="hover:bg-gray-100"
                >
                  Close
                </Button>
              </div>

              {/* Tips */}
              <div className="mt-4 bg-gradient-to-r from-[#1e2348]/5 to-[#ff6b4d]/5 border-2 border-[#ff6b4d]/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-[#ff6b4d] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[12px]">💡</span>
                  </div>
                  <div>
                    <p className="text-[#1e2348] text-[13px] leading-[18px] font-semibold mb-1">Pro Tips:</p>
                    <ul className="text-[#1e2348]/80 text-[12px] leading-[18px] space-y-1">
                      <li>• Your notes are automatically saved as you type</li>
                      <li>• Download individual lesson notes or all notes at once</li>
                      <li>• Notes are organized by lesson for easy reference</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flashcards Modal - Interactive Flip Cards */}
      {showFlashcards && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#1e2348]/95 via-[#2a3058]/95 to-[#1e2348]/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-4">
                <FileText className="w-5 h-5 text-[#ff6b4d]" />
                <h2 className="text-white text-[20px] leading-[28px] font-semibold">AI Generated Flashcards</h2>
              </div>
              <p className="text-white/70 text-[14px] leading-[20px] font-normal">
                Click the card to reveal the answer
              </p>
            </div>

            {/* Flashcard Data */}
            {(() => {
              const flashcards = [
                {
                  question: "What is a Digital Cognitive Organization (DCO)?",
                  answer: "A DCO is an organization that integrates AI, automation, and human creativity to create a hybrid workforce that leverages the strengths of both humans and machines for optimal performance."
                },
                {
                  question: "What are the key features of Economy 4.0?",
                  answer: "Hyper-Personalization, Platform-Centric Models, Sustainability by Design, Automation at Scale, and Real-time Data Integration."
                },
                {
                  question: "What is Hyper-Personalization?",
                  answer: "Using real-time data and AI to tailor products and services to individual customer preferences, creating highly customized experiences."
                },
                {
                  question: "What is a Perfect Life Transaction?",
                  answer: "A seamless, intuitive, and hyper-personalized customer experience that goes beyond simple transactions to create meaningful value."
                },
                {
                  question: "What role does a Digital Business Platform (DBP) play?",
                  answer: "It integrates processes, data, and applications across the organization, enabling frictionless operations and seamless collaboration."
                }
              ];

              const currentCard = flashcards[currentFlashcardIndex];

              return (
                <>
                  {/* Card Counter */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {flashcards.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentFlashcardIndex
                            ? 'w-8 bg-[#ff6b4d]'
                            : index < currentFlashcardIndex
                            ? 'w-2 bg-green-400'
                            : 'w-2 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Flashcard Container */}
                  <div className="perspective-1000 mb-8">
                    <div
                      onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                      className={`relative w-full h-96 cursor-pointer transition-transform duration-700 transform-style-3d ${
                        isFlashcardFlipped ? 'rotate-y-180' : ''
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlashcardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                    >
                      {/* Front of Card - Question */}
                      <div
                        className="absolute inset-0 backface-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="h-full bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border-4 border-[#1e2348] p-10 flex flex-col items-center justify-center">
                          {/* Question Icon */}
                          <div className="w-20 h-20 bg-gradient-to-br from-[#1e2348] to-[#2a3058] rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <span className="text-white text-[36px] leading-[44px] font-bold">?</span>
                          </div>

                          {/* Question Text */}
                          <p className="text-[#1e2348] text-[28px] leading-[36px] font-bold text-center mb-6">
                            {currentCard.question}
                          </p>

                          {/* Hint */}
                          <div className="flex items-center gap-2 text-[#ff6b4d] text-[14px] leading-[20px] font-medium">
                            <div className="w-8 h-8 bg-[#ff6b4d]/10 rounded-full flex items-center justify-center">
                              <span className="text-[#ff6b4d]">👆</span>
                            </div>
                            <span>Tap to reveal answer</span>
                          </div>

                          {/* Card Number */}
                          <div className="absolute top-6 right-6 bg-[#1e2348] text-white px-4 py-2 rounded-full text-[14px] leading-[20px] font-semibold">
                            {currentFlashcardIndex + 1} / {flashcards.length}
                          </div>
                        </div>
                      </div>

                      {/* Back of Card - Answer */}
                      <div
                        className="absolute inset-0 backface-hidden"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <div className="h-full bg-gradient-to-br from-[#ff6b4d] to-[#ff8c73] rounded-3xl shadow-2xl border-4 border-[#ff6b4d] p-10 flex flex-col items-center justify-center">
                          {/* Answer Icon */}
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <CheckCircle className="w-12 h-12 text-[#ff6b4d]" />
                          </div>

                          {/* Answer Label */}
                          <p className="text-white/90 text-[16px] leading-[24px] font-semibold uppercase tracking-wider mb-4">
                            Answer
                          </p>

                          {/* Answer Text */}
                          <p className="text-white text-[22px] leading-[32px] font-medium text-center">
                            {currentCard.answer}
                          </p>

                          {/* Card Number */}
                          <div className="absolute top-6 right-6 bg-white text-[#ff6b4d] px-4 py-2 rounded-full text-[14px] leading-[20px] font-semibold">
                            {currentFlashcardIndex + 1} / {flashcards.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Button
                      onClick={() => {
                        if (currentFlashcardIndex > 0) {
                          setCurrentFlashcardIndex(currentFlashcardIndex - 1);
                          setIsFlashcardFlipped(false);
                        }
                      }}
                      disabled={currentFlashcardIndex === 0}
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 disabled:opacity-30"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Previous
                    </Button>

                    <Button
                      onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                      className="bg-white text-[#1e2348] hover:bg-white/90 font-semibold px-8"
                    >
                      {isFlashcardFlipped ? 'Show Question' : 'Show Answer'}
                    </Button>

                    <Button
                      onClick={() => {
                        if (currentFlashcardIndex < flashcards.length - 1) {
                          setCurrentFlashcardIndex(currentFlashcardIndex + 1);
                          setIsFlashcardFlipped(false);
                        }
                      }}
                      disabled={currentFlashcardIndex === flashcards.length - 1}
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 disabled:opacity-30"
                    >
                      Next
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      onClick={() => {
                        setShowFlashcards(false);
                        setCurrentFlashcardIndex(0);
                        setIsFlashcardFlipped(false);
                      }}
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Close
                    </Button>
                    <Button className="bg-gradient-to-r from-[#ff6b4d] to-[#ff8c73] hover:from-[#e56045] hover:to-[#ff6b4d] text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Flashcards
                    </Button>
                  </div>
                </>
              );
            })()}
          </div>

          {/* CSS for 3D flip effect */}
          <style>{`
            .perspective-1000 {
              perspective: 1000px;
            }
            .transform-style-3d {
              transform-style: preserve-3d;
            }
            .backface-hidden {
              backface-visibility: hidden;
            }
            .rotate-y-180 {
              transform: rotateY(180deg);
            }
          `}</style>
        </div>
      )}

    </div>
  );
};

export default CourseLearning;
