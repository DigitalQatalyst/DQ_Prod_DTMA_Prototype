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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseTutorAI } from "@/components/mentor/CourseTutorAI";
import { Card } from "@/components/ui/card";

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

  // Load course data from localStorage
  const storedCourse = courseId ? JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}') : {};
  const curriculum = storedCourse.curriculum || [];
  const assessmentType = storedCourse.assessmentType || "none";
  const quizQuestions = storedCourse.quizQuestions || [];
  const assignmentTitle = storedCourse.assignmentTitle || "";
  const assignmentInstructions = storedCourse.assignmentInstructions || "";
  const assignmentBriefUrl = storedCourse.assignmentBriefUrl || "";
  const allowedFileTypes = storedCourse.allowedFileTypes || "pdf,docx,zip";
  const practicalTitle = storedCourse.practicalTitle || "";
  const practicalInstructions = storedCourse.practicalInstructions || "";
  const passingScore = parseInt(storedCourse.passingScore || "70");

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
        type: lesson.resources?.find((r: any) => r.type === 'video') ? 'video' : 'reading',
      })) || [],
    })) : [
      {
        id: "module-1",
        title: "Getting Started",
        lessons: [
          { id: "lesson-1", title: "Lesson 1", content: "Welcome to Lesson 1", video_url: "/Lesson 1.mp4", type: 'video', duration_minutes: 10 },
          { id: "lesson-2", title: "Lesson 2", content: "Continue with Lesson 2", video_url: "/Lesson 2.mp4", type: 'video', duration_minutes: 15 },
          { id: "lesson-3", title: "Lesson 3", content: "Complete Lesson 3", video_url: "/Lesson 3.mp4", type: 'video', duration_minutes: 12 },
        ],
      },
      {
        id: "module-2",
        title: "Advanced Topics",
        lessons: [
          { id: "lesson-4", title: "Lesson 4", content: "Explore advanced concepts", video_url: "/Lesson 4.mp4", type: 'video', duration_minutes: 14 },
          { id: "lesson-5", title: "Lesson 5", content: "Build on your skills", video_url: "/Lesson 5.mp4", type: 'video', duration_minutes: 16 },
          { id: "lesson-6", title: "Lesson 6", content: "Master the concepts", video_url: "/Lesson 6.mp4", type: 'video', duration_minutes: 13 },
        ],
      },
    ],
  } as any;

  // Add assessment if exists
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
      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 z-50 w-72 h-screen bg-gradient-to-b from-[#1e2348] to-[#2a3058] border-r border-[#2a3058] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#2a3058]">
          <Link to="/" className="flex items-center gap-3">
            <img src="/dtma-logo.png" alt="DTMA" className="h-[50px] w-auto brightness-0 invert" />
          </Link>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Progress & Notes</span>
            </Link>
            <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ff6b4d] text-white shadow-lg shadow-[#ff6b4d]/20">
              <PlayCircle className="w-5 h-5" />
              <span className="font-medium">Learning Player</span>
            </div>
            <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all">
              <Award className="w-5 h-5" />
              <span className="font-medium">Certificates & Badges</span>
            </Link>
            <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all">
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">Discussions</span>
            </Link>
            <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all">
              <Video className="w-5 h-5" />
              <span className="font-medium">Live Classes</span>
            </Link>
            <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all">
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </Link>
          </nav>
        </ScrollArea>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <Avatar className="w-10 h-10 ring-2 ring-[#ff6b4d]">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-[#ff6b4d] text-white">
                {getInitials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate text-white">{profile?.full_name || 'Learner'}</p>
              <p className="text-xs text-white/60 truncate">{profile?.email}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full mt-3 justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/courses/${courseId}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Course</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-accent/50 rounded-lg px-3 py-2 w-64">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
            <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff6b4d] rounded-full"></span>
            </button>
            <Link to="/courses">
              <Button variant="outline" size="sm">Browse Courses</Button>
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Player - 2/3 width */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="overflow-hidden">
                {/* Video/Content Area */}
                {selectedLesson?.video_url && !selectedLesson?.isQuiz && !selectedLesson?.isAssignment && !selectedLesson?.isPractical ? (
                  <div className="relative bg-black aspect-video flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-[#1e2348] to-[#2a3058] flex items-center justify-center">
                      <Play className="w-20 h-20 text-white/50" />
                    </div>
                    <button className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-lg flex items-center justify-center text-white hover:bg-black/70">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                ) : selectedLesson?.type === 'audio' ? (
                  <div className="relative bg-black aspect-video flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-[#ff6b4d] to-[#e56045] flex items-center justify-center">
                      <Headphones className="w-20 h-20 text-white" />
                    </div>
                  </div>
                ) : null}

                {/* Controls */}
                {(selectedLesson?.video_url || selectedLesson?.type === 'audio') && !selectedLesson?.isQuiz && !selectedLesson?.isAssignment && !selectedLesson?.isPractical && (
                  <div className="p-4 bg-card">
                    <div className="mb-4">
                      <Progress value={videoProgress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
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

              {/* Lesson Info */}
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{selectedLesson?.title}</h2>
                <p className="text-muted-foreground mb-4">
                  {currentModuleTitle} • {selectedLesson?.duration_minutes || 15} min
                </p>

                {/* Lesson Content */}
                {selectedLesson?.content && !selectedLesson?.isQuiz && !selectedLesson?.isAssignment && !selectedLesson?.isPractical && (
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground">{selectedLesson.content}</p>
                  </div>
                )}

                {/* Quiz Content */}
                {selectedLesson?.isQuiz && quizQuestions.length > 0 && (
                  <div className="space-y-6">
                    <p className="text-muted-foreground">Answer all questions to complete the quiz. You need {passingScore}% to pass.</p>
                    {quizQuestions.map((q: any, index: number) => (
                      <div key={index} className="border border-border rounded-lg p-5 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">{index + 1}</span>
                          </div>
                          <p className="font-semibold text-lg pt-1">{q.text}</p>
                        </div>
                        <div className="space-y-2 ml-11">
                          {q.options.map((option: string, optIndex: number) => (
                            <label key={optIndex} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:border-border hover:bg-accent/50">
                              <input
                                type="radio"
                                name={`question-${index}`}
                                value={optIndex}
                                checked={quizAnswers[index] === optIndex}
                                onChange={() => setQuizAnswers({ ...quizAnswers, [index]: optIndex })}
                                className="w-4 h-4"
                              />
                              <span className="text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                      className="w-full bg-[#ff6b4d] hover:bg-[#e56045]"
                    >
                      {Object.keys(quizAnswers).length < quizQuestions.length
                        ? `Answer all questions (${Object.keys(quizAnswers).length}/${quizQuestions.length})`
                        : "Submit Quiz"}
                    </Button>
                  </div>
                )}

                {/* Assignment Content */}
                {selectedLesson?.isAssignment && (
                  <div className="space-y-6">
                    <p className="text-muted-foreground whitespace-pre-wrap">{assignmentInstructions}</p>
                    {!assignmentSubmitted ? (
                      <div className="border-2 border-dashed rounded-lg p-6">
                        <h3 className="text-sm font-semibold mb-3">Submit Your Assignment</h3>
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
                        <h3 className="text-lg font-semibold text-green-900">Assignment Submitted!</h3>
                      </div>
                    )}
                  </div>
                )}

                {/* Practical Content */}
                {selectedLesson?.isPractical && (
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
                    <GraduationCap className="w-6 h-6 text-blue-600 mb-3" />
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Instructor Evaluation Required</h3>
                    <p className="text-sm text-blue-800">{practicalInstructions}</p>
                  </div>
                )}
              </Card>
            </div>

            {/* Course Outline - 1/3 width */}
            <div>
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Course Content</h3>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {courseData.modules?.map((module: any) => (
                      <div key={module.id} className="mb-4">
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2 px-2">{module.title}</h4>
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
                                  : 'hover:bg-accent'
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
                                  <p className={`font-medium text-sm line-clamp-2 ${isActive ? 'text-white' : ''}`}>
                                    {lesson.title}
                                  </p>
                                  <p className={`text-xs mt-1 ${isActive ? 'text-white/70' : 'text-muted-foreground'}`}>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
                <p className="text-gray-600">You've successfully completed the course</p>
              </div>

              <div className="border-4 border-[#4A3428] rounded-lg p-12 bg-gradient-to-br from-amber-50 to-white mb-6">
                <div className="text-center space-y-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Certificate of Completion</div>
                  <h3 className="text-3xl font-serif font-bold text-[#4A3428]">DTMA</h3>
                  <p className="text-sm text-gray-600">This is to certify that</p>
                  <div className="text-2xl font-bold text-gray-900 border-b-2 border-[#4A3428] inline-block px-12 pb-2">
                    {profile?.full_name || "Student Name"}
                  </div>
                  <p className="text-sm text-gray-600">has successfully completed</p>
                  <div className="text-xl font-bold text-gray-900">{course?.title || "Course Title"}</div>
                  <p className="text-sm text-gray-500">Completed on {new Date().toLocaleDateString()}</p>
                  <p className="text-xs text-gray-400 pt-6">Certificate ID: CERT-{Date.now()}</p>
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
    </div>
  );
};

export default CourseLearning;
