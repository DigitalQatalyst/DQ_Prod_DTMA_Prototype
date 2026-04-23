import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCourse } from "@/hooks/useCourses";
import { useSubmitCourseForReview } from "@/hooks/useInstructor";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CoursePreviewModal } from "@/components/admin/CoursePreviewModal";
import {
  ChevronLeft,
  Save,
  Eye,
  CheckCircle,
  Circle,
  LogOut,
  Plus,
  Trash2,
  GripVertical,
  FileText,
  Video,
  Download,
  AlertCircle,
  Upload,
  X,
  Clock,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Bot,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";

const STEPS = [
  { id: "basics", label: "Course Basics" },
  { id: "curriculum", label: "Curriculum" },
  { id: "media", label: "Course Media" },
  { id: "assessments", label: "Final Assessment" },
  { id: "eligibility", label: "Eligibility & Certification" },
  { id: "pricing", label: "Pricing & Settings" },
  { id: "submit", label: "Submit for Review" },
];

const CourseBuilder = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const { data: course, isLoading } = useCourse(courseId || "");
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState("basics");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [, setRefresh] = useState(0); // Force re-render for progress updates
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Get stored course data to check completion
  const storedCourse = courseId ? JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}') : {};

  // Calculate step completion dynamically
  const getStepCompletion = () => {
    const curriculum = storedCourse.curriculum || [];
    const hasSections = curriculum.length > 0;
    const hasLessons = curriculum.some((section: any) => section.lessons && section.lessons.length > 0);
    
    return {
      basics: !!(course?.title && course?.description), // Completed from course creation
      curriculum: hasSections && hasLessons, // Only complete when sections AND lessons exist
      media: !!storedCourse.thumbnail, // Only complete when thumbnail uploaded
      assessments: !!storedCourse.assessmentsConfigured, // Only when assessment step visited
      eligibility: !!storedCourse.eligibilityConfigured, // Only when configured
      pricing: !!(storedCourse.pricingConfigured), // Only when pricing step visited and saved
      submit: false, // Only complete after submission
    };
  };

  const stepCompletion = getStepCompletion();
  const completedSteps = Object.values(stepCompletion).filter(Boolean).length;
  const progressPercent = (completedSteps / STEPS.length) * 100;

  // Monitor localStorage changes to update progress
  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh(prev => prev + 1);
      setLastSaved(new Date());
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, [courseId]);

  const handleBack = () => {
    navigate("/dashboard", { state: { tab: "courses" } });
  };

  const handleSave = () => {
    // Data is already being saved via useEffect in each step component
    setLastSaved(new Date());
    toast({
      title: "Course saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handlePreview = () => {
    setShowPreviewModal(true);
  };

  const handleContinue = () => {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].id);
      toast({
        title: "Progress saved",
        description: `Moving to ${STEPS[currentIndex + 1].label}`,
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "basics":
        return <CourseBasicsStep course={course} />;
      case "curriculum":
        return <CurriculumStep course={course} onSave={handleSave} onContinue={handleContinue} />;
      case "media":
        return <CourseMediaStep course={course} onSave={handleSave} onContinue={handleContinue} />;
      case "assessments":
        return <AssessmentsStep course={course} onSave={handleSave} onContinue={handleContinue} />;
      case "eligibility":
        return <EligibilityStep course={course} onSave={handleSave} onContinue={handleContinue} />;
      case "pricing":
        return <PricingStep course={course} onSave={handleSave} onContinue={handleContinue} />;
      case "submit":
        return <SubmitStep course={course} onSave={handleSave} />;
      default:
        return null;
    }
  };

  if (isLoading || !course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1e2348] text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/dtma-logo.png"
                alt="DTMA"
                className="h-[32px] w-auto"
              />
            </Link>
          </div>

          <RoleSwitcher currentRole="instructor" />

          {/* Course Builder Steps */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {STEPS.map((step) => {
              const isCompleted = stepCompletion[step.id as keyof typeof stepCompletion];
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left text-[14px] leading-[20px] font-medium ${
                    currentStep === step.id
                      ? "bg-[#ff6b4d] text-white shadow-lg"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span>{step.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-[#ff6b4d] flex items-center justify-center text-[14px] leading-[20px] font-semibold text-white">
                {profile?.full_name?.charAt(0) || 'I'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] leading-[20px] font-medium truncate text-white">{profile?.full_name || 'Instructor'}</div>
                <div className="text-[12px] leading-[16px] font-normal text-white/70">Instructor</div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 text-[14px] leading-[20px] font-medium"
              onClick={signOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-sm">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-[#fff0ed] rounded-xl transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-[#1e2348]" />
              </button>
              <div>
                <h1 className="text-[28px] leading-[36px] font-semibold text-[#1e2348]">{course.title || "New Course"}</h1>
                <p className="text-[13px] leading-[18px] font-normal text-[#4B5563]">
                  {lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : "Not saved yet"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handlePreview} className="text-[14px] leading-[20px] font-medium hover:bg-[#fff0ed] hover:text-[#ff6b4d] hover:border-[#ff6b4d] border-[#E5E7EB]">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" onClick={handleSave} className="bg-[#ff6b4d] hover:bg-[#e66045] text-white text-[14px] leading-[20px] font-medium shadow-sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] leading-[18px] font-medium text-[#1e2348]">Progress</span>
              <span className="text-[13px] leading-[18px] font-normal text-[#4B5563]">{completedSteps} of {STEPS.length}</span>
            </div>
            <Progress value={progressPercent} className="h-2 bg-[#E5E7EB]" />
          </div>
        </header>

        {/* Content */}
        <main className="p-6 lg:p-8">
          {renderStepContent()}
        </main>
      </div>
    </div>
  );
};

// Step Components
const CourseBasicsStep = ({ course }: any) => (
  <div className="w-full">
    <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm">
      <h2 className="text-[24px] leading-[32px] font-semibold mb-6 text-[#1e2348]">Course Basics</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-[13px] leading-[18px] font-medium mb-2 text-[#4B5563] uppercase tracking-wide">Course Title</label>
          <p className="text-[18px] leading-[28px] font-semibold text-[#1e2348]">{course.title}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] leading-[18px] font-medium mb-2 text-[#4B5563] uppercase tracking-wide">Category</label>
            <p className="text-[15px] leading-[22px] font-medium capitalize text-[#1e2348]">{course.category}</p>
          </div>
          <div>
            <label className="block text-[13px] leading-[18px] font-medium mb-2 text-[#4B5563] uppercase tracking-wide">Level</label>
            <p className="text-[15px] leading-[22px] font-medium capitalize text-[#1e2348]">{course.level}</p>
          </div>
        </div>
        <div>
          <label className="block text-[13px] leading-[18px] font-medium mb-2 text-[#4B5563] uppercase tracking-wide">Description</label>
          <p className="text-[14px] leading-[22px] font-normal text-[#4B5563]">{course.description || "No description provided"}</p>
        </div>
        <div>
          <label className="block text-[13px] leading-[18px] font-medium mb-2 text-[#4B5563] uppercase tracking-wide">Price</label>
          <p className="text-[15px] leading-[22px] font-semibold text-[#1e2348]">${course.price}</p>
        </div>
        <Badge className="w-fit bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[12px] leading-[16px] font-semibold px-3 py-1">✓ Completed</Badge>
      </div>
    </div>
  </div>
);

const CurriculumStep = ({ course, onSave, onContinue }: any) => {
  const courseId = course?.id;
  const storedCourse = courseId ? JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}') : {};
  const [sections, setSections] = useState<any[]>(storedCourse?.curriculum || course?.curriculum || []);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedQuizzes, setExpandedQuizzes] = useState<Set<string>>(new Set());

  const hasValidCurriculum = sections.length > 0 && sections.some(s => s.lessons && s.lessons.length > 0);

  // Save curriculum to localStorage whenever it changes
  useEffect(() => {
    if (courseId && sections.length >= 0) {
      const existing = JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}');
      localStorage.setItem(`course_${courseId}`, JSON.stringify({ ...existing, curriculum: sections }));
    }
  }, [sections, courseId]);

  const addSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: `Module ${sections.length + 1}`,
      lessons: [],
      order: sections.length,
    };
    setSections([...sections, newSection]);
    setExpandedSections(new Set([...expandedSections, newSection.id]));
  };

  const addLesson = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: [...(section.lessons || []), {
            id: `lesson-${Date.now()}`,
            title: `Lesson ${(section.lessons?.length || 0) + 1}`,
            resources: [],
            order: section.lessons?.length || 0,
          }]
        };
      }
      return section;
    }));
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, title } : s));
  };

  const updateLessonTitle = (sectionId: string, lessonId: string, title: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(l => l.id === lessonId ? { ...l, title } : l)
        };
      }
      return section;
    }));
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(s => s.id !== sectionId));
  };

  const deleteLesson = (sectionId: string, lessonId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.filter(l => l.id !== lessonId)
        };
      }
      return section;
    }));
  };

  const handleFileUpload = (sectionId: string, lessonId: string, type: string, file: File) => {
    // Create a URL for the file (in production, this would upload to a server)
    const fileUrl = URL.createObjectURL(file);
    
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                resources: [...(lesson.resources || []), {
                  id: `resource-${Date.now()}`,
                  type,
                  name: file.name,
                  url: fileUrl,
                  size: file.size,
                  file: file, // Store the actual file object
                }]
              };
            }
            return lesson;
          })
        };
      }
      return section;
    }));
  };

  const triggerFileUpload = (sectionId: string, lessonId: string, type: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    
    // Set accepted file types based on resource type
    if (type === 'video') {
      input.accept = 'video/*';
    } else if (type === 'pdf') {
      input.accept = 'application/pdf';
    } else {
      input.accept = '*/*'; // Accept any file for downloadable resources
    }
    
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload(sectionId, lessonId, type, file);
      }
    };
    
    input.click();
  };

  const deleteResource = (sectionId: string, lessonId: string, resourceId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                resources: lesson.resources.filter(r => r.id !== resourceId)
              };
            }
            return lesson;
          })
        };
      }
      return section;
    }));
  };

  // Quiz management functions
  const toggleQuiz = (lessonId: string) => {
    const newExpanded = new Set(expandedQuizzes);
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId);
    } else {
      newExpanded.add(lessonId);
    }
    setExpandedQuizzes(newExpanded);
  };

  const enableLessonQuiz = (sectionId: string, lessonId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                quiz: {
                  enabled: true,
                  questions: [],
                  passingScore: 70,
                  required: false
                }
              };
            }
            return lesson;
          })
        };
      }
      return section;
    }));
    // Auto-expand the quiz section
    setExpandedQuizzes(new Set([...expandedQuizzes, lessonId]));
  };

  const disableLessonQuiz = (sectionId: string, lessonId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              const { quiz, ...lessonWithoutQuiz } = lesson;
              return lessonWithoutQuiz;
            }
            return lesson;
          })
        };
      }
      return section;
    }));
    // Remove from expanded
    const newExpanded = new Set(expandedQuizzes);
    newExpanded.delete(lessonId);
    setExpandedQuizzes(newExpanded);
  };

  const updateQuizSettings = (sectionId: string, lessonId: string, settings: any) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => {
            if (lesson.id === lessonId && lesson.quiz) {
              return {
                ...lesson,
                quiz: { ...lesson.quiz, ...settings }
              };
            }
            return lesson;
          })
        };
      }
      return section;
    }));
  };

  const addQuizQuestion = (sectionId: string, lessonId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => {
            if (lesson.id === lessonId && lesson.quiz) {
              return {
                ...lesson,
                quiz: {
                  ...lesson.quiz,
                  questions: [...lesson.quiz.questions, {
                    id: `question-${Date.now()}`,
                    text: "",
                    type: "mcq",
                    options: ["", "", "", ""],
                    correctAnswer: undefined,
                    points: 1
                  }]
                }
              };
            }
            return lesson;
          })
        };
      }
      return section;
    }));
  };

  const updateQuizQuestion = (sectionId: string, lessonId: string, questionId: string, updates: any) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => {
            if (lesson.id === lessonId && lesson.quiz) {
              return {
                ...lesson,
                quiz: {
                  ...lesson.quiz,
                  questions: lesson.quiz.questions.map((q: any) => 
                    q.id === questionId ? { ...q, ...updates } : q
                  )
                }
              };
            }
            return lesson;
          })
        };
      }
      return section;
    }));
  };

  const deleteQuizQuestion = (sectionId: string, lessonId: string, questionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => {
            if (lesson.id === lessonId && lesson.quiz) {
              return {
                ...lesson,
                quiz: {
                  ...lesson.quiz,
                  questions: lesson.quiz.questions.filter((q: any) => q.id !== questionId)
                }
              };
            }
            return lesson;
          })
        };
      }
      return section;
    }));
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  // Drag and drop handlers for sections
  const handleSectionDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedItem({ type: 'section', id: sectionId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSectionDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleSectionDrop = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.type !== 'section') return;

    const draggedSectionId = draggedItem.id;
    if (draggedSectionId === targetSectionId) return;

    const draggedIndex = sections.findIndex(s => s.id === draggedSectionId);
    const targetIndex = sections.findIndex(s => s.id === targetSectionId);

    const newSections = [...sections];
    const [removed] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, removed);

    setSections(newSections.map((s, idx) => ({ ...s, order: idx })));
    setDraggedItem(null);
  };

  // Drag and drop handlers for lessons
  const handleLessonDragStart = (e: React.DragEvent, sectionId: string, lessonId: string) => {
    e.stopPropagation();
    setDraggedItem({ type: 'lesson', sectionId, id: lessonId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleLessonDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleLessonDrop = (e: React.DragEvent, targetSectionId: string, targetLessonId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedItem || draggedItem.type !== 'lesson') return;

    const draggedLessonId = draggedItem.id;
    const draggedSectionId = draggedItem.sectionId;

    if (draggedSectionId === targetSectionId && draggedLessonId === targetLessonId) return;

    setSections(sections.map(section => {
      // Remove lesson from source section
      if (section.id === draggedSectionId) {
        const lessons = section.lessons.filter(l => l.id !== draggedLessonId);
        return { ...section, lessons };
      }
      return section;
    }).map(section => {
      // Add lesson to target section
      if (section.id === targetSectionId) {
        const draggedLesson = sections
          .find(s => s.id === draggedSectionId)
          ?.lessons.find(l => l.id === draggedLessonId);
        
        if (!draggedLesson) return section;

        const targetIndex = section.lessons.findIndex(l => l.id === targetLessonId);
        const newLessons = [...section.lessons];
        newLessons.splice(targetIndex, 0, draggedLesson);
        
        return { ...section, lessons: newLessons.map((l, idx) => ({ ...l, order: idx })) };
      }
      return section;
    }));

    setDraggedItem(null);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[24px] leading-[32px] font-semibold mb-2 text-[#1e2348]">Curriculum</h2>
            <p className="text-[14px] leading-[20px] text-[#4B5563]">Add modules and lessons to your course.</p>
          </div>
          <Button onClick={addSection} className="bg-[#ff6b4d] hover:bg-[#e66045] text-white text-[14px] leading-[20px] font-medium shadow-sm" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Module
          </Button>
        </div>

        {!hasValidCurriculum && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] leading-[20px] font-semibold text-red-900">Curriculum requirements not met</p>
              <p className="text-[13px] leading-[18px] text-red-800 mt-1">Add at least 1 section with at least 1 lesson to proceed.</p>
            </div>
          </div>
        )}

        {sections.length === 0 ? (
          <div className="text-center py-16 bg-[#F5F6FA] rounded-xl">
            <FileText className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <p className="text-[#4B5563] mb-4">No sections yet. Create your first section to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map((section) => (
              <div 
                key={section.id} 
                className="border border-[#E5E7EB] rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                draggable
                onDragStart={(e) => handleSectionDragStart(e, section.id)}
                onDragOver={handleSectionDragOver}
                onDrop={(e) => handleSectionDrop(e, section.id)}
              >
                <div className="bg-[#F5F6FA] p-4 flex items-center justify-between cursor-move hover:bg-[#e9e9ed] transition-colors" onClick={() => toggleSection(section.id)}>
                  <div className="flex items-center gap-3 flex-1">
                    <GripVertical className="w-5 h-5 text-[#9CA3AF] cursor-grab active:cursor-grabbing" />
                    <ChevronLeft className={`w-5 h-5 text-[#1e2348] transition-transform ${expandedSections.has(section.id) ? 'rotate-90' : ''}`} />
                    <Input
                      value={section.title}
                      onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-transparent border-0 font-semibold text-[15px] leading-[22px] text-[#1e2348] p-0 h-auto focus-visible:ring-0"
                      placeholder="Section title"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] leading-[18px] text-[#4B5563] font-medium">{section.lessons?.length || 0} lessons</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSection(section.id);
                      }}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {expandedSections.has(section.id) && (
                  <div className="p-5 space-y-4 border-t border-[#E5E7EB] bg-white">
                    {section.lessons?.map((lesson: any) => (
                      <div 
                        key={lesson.id} 
                        className="border border-[#E5E7EB] rounded-xl p-5 bg-white hover:border-[#ff6b4d]/30 hover:shadow-sm transition-all"
                        draggable
                        onDragStart={(e) => handleLessonDragStart(e, section.id, lesson.id)}
                        onDragOver={handleLessonDragOver}
                        onDrop={(e) => handleLessonDrop(e, section.id, lesson.id)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3 flex-1">
                            <GripVertical className="w-4 h-4 text-[#9CA3AF] cursor-grab active:cursor-grabbing flex-shrink-0" />
                            <Input
                              value={lesson.title}
                              onChange={(e) => updateLessonTitle(section.id, lesson.id, e.target.value)}
                              className="bg-transparent border-0 font-semibold text-[14px] leading-[20px] text-[#1e2348] p-0 h-auto flex-1 focus-visible:ring-0"
                              placeholder="Lesson title"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteLesson(section.id, lesson.id)}
                            className="hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {lesson.resources && lesson.resources.length > 0 && (
                          <div className="space-y-2 mb-3">
                            {lesson.resources.map((resource: any) => (
                              <div key={resource.id} className="flex items-center justify-between bg-muted/50 p-2 rounded text-sm">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  {resource.type === 'video' && <Video className="w-4 h-4 flex-shrink-0" />}
                                  {resource.type === 'pdf' && <FileText className="w-4 h-4 flex-shrink-0" />}
                                  {resource.type === 'download' && <Download className="w-4 h-4 flex-shrink-0" />}
                                  <span className="truncate">{resource.name}</span>
                                  {resource.size && (
                                    <span className="text-xs text-muted-foreground flex-shrink-0">
                                      ({(resource.size / 1024 / 1024).toFixed(2)} MB)
                                    </span>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteResource(section.id, lesson.id, resource.id)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => triggerFileUpload(section.id, lesson.id, 'video')}
                            className="text-[12px] leading-[16px] hover:bg-[#fff0ed] hover:text-[#ff6b4d] hover:border-[#ff6b4d] border-[#E5E7EB]"
                          >
                            <Video className="w-3 h-3 mr-1" />
                            Upload Video
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => triggerFileUpload(section.id, lesson.id, 'pdf')}
                            className="text-[12px] leading-[16px] hover:bg-[#fff0ed] hover:text-[#ff6b4d] hover:border-[#ff6b4d] border-[#E5E7EB]"
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            Upload PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => triggerFileUpload(section.id, lesson.id, 'download')}
                            className="text-[12px] leading-[16px] hover:bg-[#fff0ed] hover:text-[#ff6b4d] hover:border-[#ff6b4d] border-[#E5E7EB]"
                          >
                            <Upload className="w-3 h-3 mr-1" />
                            Upload Resource
                          </Button>
                          <Button
                            variant={lesson.quiz?.enabled ? "default" : "outline"}
                            size="sm"
                            onClick={() => lesson.quiz?.enabled ? toggleQuiz(lesson.id) : enableLessonQuiz(section.id, lesson.id)}
                            className={`text-[12px] leading-[16px] ${lesson.quiz?.enabled ? 'bg-[#ff6b4d] hover:bg-[#e66045]' : 'hover:bg-[#fff0ed] hover:text-[#ff6b4d] hover:border-[#ff6b4d] border-[#E5E7EB]'}`}
                          >
                            <HelpCircle className="w-3 h-3 mr-1" />
                            {lesson.quiz?.enabled ? `Quiz (${lesson.quiz.questions?.length || 0})` : 'Add Quiz'}
                          </Button>
                        </div>

                        {/* Lesson Quiz Builder */}
                        {lesson.quiz?.enabled && expandedQuizzes.has(lesson.id) && (
                          <div className="mt-4 border-t border-border pt-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-semibold">Lesson Quiz</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => disableLessonQuiz(section.id, lesson.id)}
                                className="text-xs text-destructive hover:text-destructive"
                              >
                                <X className="w-3 h-3 mr-1" />
                                Remove Quiz
                              </Button>
                            </div>

                            {/* Quiz Settings */}
                            <div className="bg-muted/30 rounded-lg p-3 mb-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <label className="text-xs font-medium">Required to Continue</label>
                                  <p className="text-xs text-muted-foreground">Students must pass to unlock next lesson</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={lesson.quiz.required}
                                    onChange={(e) => updateQuizSettings(section.id, lesson.id, { required: e.target.checked })}
                                    className="sr-only peer"
                                  />
                                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
                                </label>
                              </div>

                              <div>
                                <label className="block text-xs font-medium mb-1">Passing Score (%)</label>
                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={lesson.quiz.passingScore}
                                  onChange={(e) => updateQuizSettings(section.id, lesson.id, { passingScore: parseInt(e.target.value) || 70 })}
                                  className="w-20 h-7 text-xs"
                                />
                              </div>
                            </div>

                            {/* Quiz Questions */}
                            <div className="space-y-3">
                              {/* AI Butler Quiz Helper */}
                              <div className="bg-gradient-to-r from-[#1e2348]/5 to-[#ff6b4d]/5 border border-[#ff6b4d]/20 rounded-lg p-3 mb-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 rounded-full bg-[#ff6b4d] flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="text-xs font-semibold text-[#1e2348] mb-1">AI Quiz Generator</h5>
                                    <p className="text-xs text-muted-foreground mb-2">
                                      Need help creating quiz questions? Butler AI can generate questions based on your lesson content.
                                    </p>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-7 border-[#ff6b4d] text-[#ff6b4d] hover:bg-[#ff6b4d] hover:text-white"
                                      onClick={() => {
                                        // This would open a modal or sidebar with AI assistance
                                        alert('AI Quiz Generator: This feature will help you generate quiz questions based on your lesson content. Coming soon!');
                                      }}
                                    >
                                      <Bot className="w-3 h-3 mr-1" />
                                      Generate Questions with AI
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {lesson.quiz.questions?.map((question: any, qIndex: number) => (
                                <div key={question.id} className="border border-border rounded-lg p-3 bg-background">
                                  <div className="flex items-start justify-between mb-2">
                                    <label className="text-xs font-medium">Question {qIndex + 1}</label>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => deleteQuizQuestion(section.id, lesson.id, question.id)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>

                                  <Input
                                    value={question.text}
                                    onChange={(e) => updateQuizQuestion(section.id, lesson.id, question.id, { text: e.target.value })}
                                    placeholder="Enter your question"
                                    className="mb-2 text-xs h-8"
                                  />

                                  <div className="flex gap-2 mb-2">
                                    <select
                                      value={question.type}
                                      onChange={(e) => {
                                        const newType = e.target.value;
                                        updateQuizQuestion(section.id, lesson.id, question.id, {
                                          type: newType,
                                          options: newType === "true-false" ? ["True", "False"] : ["", "", "", ""],
                                          correctAnswer: undefined
                                        });
                                      }}
                                      className="px-2 py-1 border border-border rounded-lg bg-background text-xs h-7"
                                    >
                                      <option value="mcq">Multiple Choice</option>
                                      <option value="true-false">True/False</option>
                                    </select>

                                    <Input
                                      type="number"
                                      value={question.points}
                                      onChange={(e) => updateQuizQuestion(section.id, lesson.id, question.id, { points: parseInt(e.target.value) || 1 })}
                                      placeholder="Points"
                                      className="w-16 text-xs h-7"
                                    />
                                  </div>

                                  <div className="space-y-1 mb-2">
                                    <label className="block text-xs font-medium mb-1">Answer Options</label>
                                    {question.options.map((option: string, oIndex: number) => (
                                      <div key={oIndex} className="flex items-center gap-2">
                                        <input
                                          type="radio"
                                          name={`question-${lesson.id}-${question.id}`}
                                          checked={question.correctAnswer === oIndex}
                                          onChange={() => updateQuizQuestion(section.id, lesson.id, question.id, { correctAnswer: oIndex })}
                                          className="w-3 h-3"
                                        />
                                        <Input
                                          value={option}
                                          onChange={(e) => {
                                            const newOptions = [...question.options];
                                            newOptions[oIndex] = e.target.value;
                                            updateQuizQuestion(section.id, lesson.id, question.id, { options: newOptions });
                                          }}
                                          placeholder={`Option ${oIndex + 1}`}
                                          className="flex-1 text-xs h-7"
                                          disabled={question.type === "true-false"}
                                        />
                                      </div>
                                    ))}
                                  </div>

                                  {/* Hint Field */}
                                  <div className="mt-3 pt-3 border-t border-border">
                                    <label className="flex items-center gap-1 text-xs font-medium mb-1">
                                      <HelpCircle className="w-3 h-3 text-[#ff6b4d]" />
                                      Hint (Optional)
                                    </label>
                                    <Textarea
                                      value={question.hint || ''}
                                      onChange={(e) => updateQuizQuestion(section.id, lesson.id, question.id, { hint: e.target.value })}
                                      placeholder="Provide a helpful hint for learners who are stuck..."
                                      className="text-xs resize-none h-16"
                                      maxLength={200}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {question.hint?.length || 0}/200 characters
                                    </p>
                                  </div>
                                </div>
                              ))}

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addQuizQuestion(section.id, lesson.id)}
                                className="w-full text-xs hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add Question
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* WhatsApp Micro-Learning & AI Tutor Settings */}
                        <div className="mt-4 border-t border-border pt-4 space-y-4">
                          {/* AI Tutor Toggle */}
                          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Bot className="w-4 h-4 text-[#ff6b4d]" />
                              <div>
                                <label className="text-xs font-medium">Enable AI Tutor for this lesson</label>
                                <p className="text-xs text-muted-foreground">AI Q&A, summaries, and voice responses</p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={lesson.aiTutorEnabled !== false}
                                onChange={(e) => {
                                  setSections(sections.map(s => {
                                    if (s.id === section.id) {
                                      return {
                                        ...s,
                                        lessons: s.lessons.map(l => 
                                          l.id === lesson.id ? { ...l, aiTutorEnabled: e.target.checked } : l
                                        )
                                      };
                                    }
                                    return s;
                                  }));
                                }}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
                            </label>
                          </div>

                          {/* WhatsApp Micro-Learning */}
                          <div className="border border-border rounded-lg p-3 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-green-600" />
                                <label className="text-xs font-medium">Deliver via WhatsApp</label>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={lesson.whatsappEnabled || false}
                                  onChange={(e) => {
                                    setSections(sections.map(s => {
                                      if (s.id === section.id) {
                                        return {
                                          ...s,
                                          lessons: s.lessons.map(l => 
                                            l.id === lesson.id ? { ...l, whatsappEnabled: e.target.checked } : l
                                          )
                                        };
                                      }
                                      return s;
                                    }));
                                  }}
                                  className="sr-only peer"
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                              </label>
                            </div>

                            {lesson.whatsappEnabled && (
                              <div>
                                <label className="block text-xs font-medium mb-1">Micro-Learning Content (WhatsApp)</label>
                                <Textarea
                                  value={lesson.whatsappContent || ''}
                                  onChange={(e) => {
                                    setSections(sections.map(s => {
                                      if (s.id === section.id) {
                                        return {
                                          ...s,
                                          lessons: s.lessons.map(l => 
                                            l.id === lesson.id ? { ...l, whatsappContent: e.target.value } : l
                                          )
                                        };
                                      }
                                      return s;
                                    }));
                                  }}
                                  placeholder="Enter a short concept for WhatsApp delivery (max 280 characters)"
                                  maxLength={280}
                                  rows={3}
                                  className="text-xs resize-none"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  {lesson.whatsappContent?.length || 0}/280 characters
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addLesson(section.id)}
                      className="w-full hover:bg-[#fff0ed] hover:text-[#ff6b4d] hover:border-[#ff6b4d] border-[#E5E7EB] text-[13px] leading-[18px] font-medium"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Lesson
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onSave} className="hover:bg-[#fff0ed] hover:text-[#ff6b4d] hover:border-[#ff6b4d] border-[#E5E7EB] text-[14px] leading-[20px] font-medium">Save as Draft</Button>
        <Button disabled={!hasValidCurriculum} onClick={onContinue} className="bg-[#ff6b4d] hover:bg-[#e66045] text-white text-[14px] leading-[20px] font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">Continue to Next Step</Button>
      </div>
    </div>
  );
};

const CourseMediaStep = ({ course, onSave, onContinue }: any) => {
  const courseId = course?.id;
  const storedCourse = courseId ? JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}') : {};
  
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(storedCourse.thumbnailPreview || "");
  const [promoVideo, setPromoVideo] = useState<File | null>(null);
  const [promoVideoPreview, setPromoVideoPreview] = useState<string>(storedCourse.promoVideoPreview || "");
  const [learningObjectives, setLearningObjectives] = useState<string[]>(storedCourse.learningObjectives || [""]);
  const [courseOutcomes, setCourseOutcomes] = useState<string[]>(storedCourse.courseOutcomes || [""]);
  const [estimatedDuration, setEstimatedDuration] = useState(storedCourse.estimatedDuration || "");

  const hasThumbnail = thumbnail !== null || thumbnailPreview !== "";

  // Save media data to localStorage whenever it changes
  useEffect(() => {
    if (courseId) {
      const existing = JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}');
      localStorage.setItem(`course_${courseId}`, JSON.stringify({ 
        ...existing, 
        thumbnail: hasThumbnail,
        thumbnailPreview,
        promoVideoPreview,
        learningObjectives,
        courseOutcomes,
        estimatedDuration
      }));
    }
  }, [courseId, hasThumbnail, thumbnailPreview, promoVideoPreview, learningObjectives, courseOutcomes, estimatedDuration]);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handlePromoVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPromoVideo(file);
      setPromoVideoPreview(URL.createObjectURL(file));
    }
  };

  const addObjective = () => {
    setLearningObjectives([...learningObjectives, ""]);
  };

  const updateObjective = (index: number, value: string) => {
    const updated = [...learningObjectives];
    updated[index] = value;
    setLearningObjectives(updated);
  };

  const removeObjective = (index: number) => {
    setLearningObjectives(learningObjectives.filter((_, i) => i !== index));
  };

  const addOutcome = () => {
    setCourseOutcomes([...courseOutcomes, ""]);
  };

  const updateOutcome = (index: number, value: string) => {
    const updated = [...courseOutcomes];
    updated[index] = value;
    setCourseOutcomes(updated);
  };

  const removeOutcome = (index: number) => {
    setCourseOutcomes(courseOutcomes.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm mb-6">
        <h2 className="text-[24px] leading-[32px] font-semibold mb-2 text-[#1e2348]">Course Media</h2>
        <p className="text-[14px] leading-[20px] text-[#4B5563] mb-6">Upload course thumbnail, promo video, and define learning objectives.</p>

        {!hasThumbnail && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] leading-[20px] font-semibold text-red-900">Thumbnail required</p>
              <p className="text-[13px] leading-[18px] text-red-800 mt-1">You must upload a course thumbnail before submission.</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Course Thumbnail */}
          <div>
            <label className="block text-[14px] leading-[20px] font-semibold mb-2 text-[#1e2348]">
              Course Thumbnail <span className="text-red-600">*</span>
            </label>
            <p className="text-[13px] leading-[18px] text-[#4B5563] mb-3">Recommended size: 1280x720px (16:9 ratio)</p>
            {thumbnailPreview ? (
              <div className="relative w-full max-w-md">
                <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full rounded-xl border border-[#E5E7EB] shadow-sm" />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 shadow-lg"
                  onClick={() => {
                    setThumbnail(null);
                    setThumbnailPreview("");
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 text-center hover:border-[#ff6b4d] hover:bg-[#fff0ed]/30 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-[#9CA3AF]" />
                  <p className="text-[14px] leading-[20px] font-medium text-[#1e2348]">Click to upload thumbnail</p>
                  <p className="text-[13px] leading-[18px] text-[#4B5563] mt-1">PNG, JPG up to 10MB</p>
                </label>
              </div>
            )}
          </div>

          {/* Promo Video */}
          <div>
            <label className="block text-[14px] leading-[20px] font-semibold mb-2 text-[#1e2348]">Promo Video (Optional)</label>
            <p className="text-[13px] leading-[18px] text-[#4B5563] mb-3">A short video introducing your course</p>
            {promoVideoPreview ? (
              <div className="relative w-full max-w-md">
                <video src={promoVideoPreview} controls className="w-full rounded-xl border border-[#E5E7EB] shadow-sm" />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 shadow-lg"
                  onClick={() => {
                    setPromoVideo(null);
                    setPromoVideoPreview("");
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 text-center hover:border-[#ff6b4d] hover:bg-[#fff0ed]/30 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handlePromoVideoUpload}
                  className="hidden"
                  id="promo-video-upload"
                />
                <label htmlFor="promo-video-upload" className="cursor-pointer">
                  <Video className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Click to upload promo video</p>
                  <p className="text-xs text-muted-foreground mt-1">MP4, MOV up to 100MB</p>
                </label>
              </div>
            )}
          </div>

          {/* Learning Objectives */}
          <div>
            <label className="block text-sm font-medium mb-2">Learning Objectives</label>
            <p className="text-xs text-muted-foreground mb-3">What will students learn in this course?</p>
            <div className="space-y-2">
              {learningObjectives.map((objective, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                    placeholder={`Objective ${index + 1}`}
                    className="flex-1"
                  />
                  {learningObjectives.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeObjective(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addObjective} className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]">
                <Plus className="w-4 h-4 mr-2" />
                Add Objective
              </Button>
            </div>
          </div>

          {/* Course Outcomes */}
          <div>
            <label className="block text-sm font-medium mb-2">Course Outcomes</label>
            <p className="text-xs text-muted-foreground mb-3">What will students be able to do after completing this course?</p>
            <div className="space-y-2">
              {courseOutcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={outcome}
                    onChange={(e) => updateOutcome(index, e.target.value)}
                    placeholder={`Outcome ${index + 1}`}
                    className="flex-1"
                  />
                  {courseOutcomes.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOutcome(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addOutcome} className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]">
                <Plus className="w-4 h-4 mr-2" />
                Add Outcome
              </Button>
            </div>
          </div>

          {/* Estimated Duration */}
          <div>
            <label className="block text-sm font-medium mb-2">Estimated Duration</label>
            <p className="text-xs text-muted-foreground mb-3">How long will it take to complete this course?</p>
            <div className="flex items-center gap-2 max-w-xs">
              <Input
                type="number"
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                placeholder="0"
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">hours</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onSave} className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]">Save as Draft</Button>
        <Button disabled={!hasThumbnail} onClick={onContinue} className="bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[14px] leading-[20px] font-medium disabled:opacity-50 disabled:cursor-not-allowed">Continue to Next Step</Button>
      </div>
    </div>
  );
};

const AssessmentsStep = ({ course, onSave, onContinue }: any) => {
  const courseId = course?.id;
  const storedCourse = courseId ? JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}') : {};
  
  const [certificationEnabled, setCertificationEnabled] = useState(storedCourse.certificationEnabled || false);
  const [assessmentType, setAssessmentType] = useState<string>(storedCourse.assessmentType || "none");
  const [passingScore, setPassingScore] = useState(storedCourse.passingScore || "70");
  const [retakesAllowed, setRetakesAllowed] = useState(storedCourse.retakesAllowed !== undefined ? storedCourse.retakesAllowed : true);
  const [maxRetakes, setMaxRetakes] = useState(storedCourse.maxRetakes || "3");
  const [autoGrading, setAutoGrading] = useState(storedCourse.autoGrading !== undefined ? storedCourse.autoGrading : true);
  
  // Assessment content states
  const [quizQuestions, setQuizQuestions] = useState<any[]>(storedCourse.quizQuestions || []);
  const [assignmentTitle, setAssignmentTitle] = useState(storedCourse.assignmentTitle || "");
  const [assignmentInstructions, setAssignmentInstructions] = useState(storedCourse.assignmentInstructions || "");
  const [assignmentBrief, setAssignmentBrief] = useState<File | null>(null);
  const [assignmentBriefUrl, setAssignmentBriefUrl] = useState(storedCourse.assignmentBriefUrl || "");
  const [allowedFileTypes, setAllowedFileTypes] = useState(storedCourse.allowedFileTypes || "pdf,docx,zip");
  const [practicalTitle, setPracticalTitle] = useState(storedCourse.practicalTitle || "");
  const [practicalInstructions, setPracticalInstructions] = useState(storedCourse.practicalInstructions || "");
  
  // Assignment deadline states
  const [enableDeadline, setEnableDeadline] = useState(storedCourse.enableDeadline || false);
  const [dueDate, setDueDate] = useState(storedCourse.dueDate || "");
  const [dueTime, setDueTime] = useState(storedCourse.dueTime || "23:59");
  const [timezone, setTimezone] = useState(storedCourse.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [allowLateSubmissions, setAllowLateSubmissions] = useState(storedCourse.allowLateSubmissions || false);
  const [lateWindow, setLateWindow] = useState(storedCourse.lateWindow || "24");
  const [lateWindowUnit, setLateWindowUnit] = useState(storedCourse.lateWindowUnit || "hours");

  // WhatsApp and AI settings
  const [whatsappPracticeEnabled, setWhatsappPracticeEnabled] = useState(storedCourse.whatsappPracticeEnabled || false);
  const [aiAssessmentEnabled, setAiAssessmentEnabled] = useState(storedCourse.aiAssessmentEnabled !== false);

  const assessmentRequired = certificationEnabled && assessmentType === "none";
  
  // Validation for assessment content
  const hasValidQuiz = quizQuestions.length > 0 && quizQuestions.every(q => q.correctAnswer !== undefined);
  const hasValidAssignment = assignmentInstructions.trim() !== "" || assignmentBriefUrl !== "";
  const hasValidPractical = practicalInstructions.trim() !== "";
  
  const hasValidContent = 
    assessmentType === "none" ? true :
    assessmentType === "quiz" ? hasValidQuiz :
    assessmentType === "assignment" ? hasValidAssignment :
    assessmentType === "practical" ? hasValidPractical : false;

  // Save assessment data to localStorage whenever it changes
  useEffect(() => {
    if (courseId) {
      const existing = JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}');
      localStorage.setItem(`course_${courseId}`, JSON.stringify({ 
        ...existing, 
        certificationEnabled,
        assessmentType,
        passingScore,
        retakesAllowed,
        maxRetakes,
        autoGrading,
        quizQuestions,
        assignmentTitle,
        assignmentInstructions,
        assignmentBriefUrl,
        allowedFileTypes,
        enableDeadline,
        dueDate,
        dueTime,
        timezone,
        allowLateSubmissions,
        lateWindow,
        lateWindowUnit,
        practicalTitle,
        practicalInstructions,
        whatsappPracticeEnabled,
        aiAssessmentEnabled,
        assessmentsConfigured: true,
        hasValidAssessmentContent: hasValidContent
      }));
    }
  }, [courseId, certificationEnabled, assessmentType, passingScore, retakesAllowed, maxRetakes, autoGrading, 
      quizQuestions, assignmentTitle, assignmentInstructions, assignmentBriefUrl, allowedFileTypes, 
      enableDeadline, dueDate, dueTime, timezone, allowLateSubmissions, lateWindow, lateWindowUnit,
      practicalTitle, practicalInstructions, whatsappPracticeEnabled, aiAssessmentEnabled, hasValidContent]);

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm mb-6">
        <h2 className="text-[24px] leading-[32px] font-semibold mb-2 text-[#1e2348]">Final Assessment</h2>
        <p className="text-sm text-muted-foreground mb-6">Configure quizzes, assignments, and evaluation methods.</p>

        {assessmentRequired && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Assessment required</p>
              <p className="text-xs text-red-800 mt-1">Certification is enabled. You must select an assessment type.</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Certification Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <label className="text-sm font-medium">Enable Certification</label>
              <p className="text-xs text-muted-foreground mt-1">Award certificates upon course completion</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={certificationEnabled}
                onChange={(e) => setCertificationEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
            </label>
          </div>

          {/* Assessment Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Assessment Type {certificationEnabled && <span className="text-destructive">*</span>}
            </label>
            <p className="text-xs text-muted-foreground mb-3">Choose how students will be evaluated</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                onClick={() => setAssessmentType("quiz")}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  assessmentType === "quiz"
                    ? "border-[#ff6b4d] bg-[#ff6b4d]/5"
                    : "border-border hover:border-[#ff6b4d]/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    assessmentType === "quiz" ? "border-[#ff6b4d]" : "border-muted-foreground"
                  }`}>
                    {assessmentType === "quiz" && <div className="w-3 h-3 rounded-full bg-[#ff6b4d]" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Quiz</p>
                    <p className="text-xs text-muted-foreground mt-1">Multiple choice questions with auto-grading</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setAssessmentType("assignment")}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  assessmentType === "assignment"
                    ? "border-[#ff6b4d] bg-[#ff6b4d]/5"
                    : "border-border hover:border-[#ff6b4d]/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    assessmentType === "assignment" ? "border-[#ff6b4d]" : "border-muted-foreground"
                  }`}>
                    {assessmentType === "assignment" && <div className="w-3 h-3 rounded-full bg-[#ff6b4d]" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Assignment Upload</p>
                    <p className="text-xs text-muted-foreground mt-1">Students submit files for manual review</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setAssessmentType("practical")}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  assessmentType === "practical"
                    ? "border-[#ff6b4d] bg-[#ff6b4d]/5"
                    : "border-border hover:border-[#ff6b4d]/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    assessmentType === "practical" ? "border-[#ff6b4d]" : "border-muted-foreground"
                  }`}>
                    {assessmentType === "practical" && <div className="w-3 h-3 rounded-full bg-[#ff6b4d]" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Practical Evaluation</p>
                    <p className="text-xs text-muted-foreground mt-1">Hands-on demonstration or performance</p>
                  </div>
                </div>
              </div>

              {!certificationEnabled && (
                <div
                  onClick={() => setAssessmentType("none")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    assessmentType === "none"
                      ? "border-[#ff6b4d] bg-[#ff6b4d]/5"
                      : "border-border hover:border-[#ff6b4d]/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      assessmentType === "none" ? "border-[#ff6b4d]" : "border-muted-foreground"
                    }`}>
                      {assessmentType === "none" && <div className="w-3 h-3 rounded-full bg-[#ff6b4d]" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">No Assessment</p>
                      <p className="text-xs text-muted-foreground mt-1">Course completion without evaluation</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Assessment Configuration (shown when assessment type is selected) */}
          {assessmentType !== "none" && (
            <>
              {/* Passing Score */}
              <div>
                <label className="block text-sm font-medium mb-2">Passing Score (%)</label>
                <p className="text-xs text-muted-foreground mb-3">Minimum score required to pass</p>
                <div className="flex items-center gap-3 max-w-xs">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={passingScore}
                    onChange={(e) => setPassingScore(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>

              {/* Retake Rules */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-sm font-medium">Allow Retakes</label>
                    <p className="text-xs text-muted-foreground mt-1">Let students retake the assessment if they fail</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={retakesAllowed}
                      onChange={(e) => setRetakesAllowed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
                  </label>
                </div>

                {retakesAllowed && (
                  <div className="ml-0 mt-3">
                    <label className="block text-sm font-medium mb-2">Maximum Retakes</label>
                    <div className="flex items-center gap-3 max-w-xs">
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={maxRetakes}
                        onChange={(e) => setMaxRetakes(e.target.value)}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">attempts</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Auto Grading (only for quizzes) */}
              {assessmentType === "quiz" && (
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <label className="text-sm font-medium">Auto Grading</label>
                    <p className="text-xs text-muted-foreground mt-1">Automatically grade quiz submissions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoGrading}
                      onChange={(e) => setAutoGrading(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
                  </label>
                </div>
              )}
            </>
          )}

          {/* Quiz Builder */}
          {assessmentType === "quiz" && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Quiz Builder</h3>
              
              {!hasValidQuiz && quizQuestions.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Incomplete questions</p>
                    <p className="text-xs text-red-800 mt-1">All questions must have a correct answer marked.</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {quizQuestions.map((question, qIndex) => (
                  <div key={qIndex} className="border border-border rounded-lg p-4 bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">Question {qIndex + 1}</label>
                        <Input
                          value={question.text}
                          onChange={(e) => {
                            const updated = [...quizQuestions];
                            updated[qIndex].text = e.target.value;
                            setQuizQuestions(updated);
                          }}
                          placeholder="Enter your question"
                          className="mb-3"
                        />
                        
                        <div className="flex gap-2 mb-3">
                          <select
                            value={question.type}
                            onChange={(e) => {
                              const updated = [...quizQuestions];
                              updated[qIndex].type = e.target.value;
                              updated[qIndex].options = e.target.value === "true-false" 
                                ? ["True", "False"] 
                                : ["", "", "", ""];
                              updated[qIndex].correctAnswer = undefined;
                              setQuizQuestions(updated);
                            }}
                            className="px-3 py-2 border border-border rounded-lg bg-background text-sm"
                          >
                            <option value="mcq">Multiple Choice</option>
                            <option value="true-false">True/False</option>
                          </select>
                          
                          <Input
                            type="number"
                            value={question.points}
                            onChange={(e) => {
                              const updated = [...quizQuestions];
                              updated[qIndex].points = parseInt(e.target.value) || 1;
                              setQuizQuestions(updated);
                            }}
                            placeholder="Points"
                            className="w-24"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Answer Options</label>
                          {question.options.map((option: string, oIndex: number) => (
                            <div key={oIndex} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`question-${qIndex}`}
                                checked={question.correctAnswer === oIndex}
                                onChange={() => {
                                  const updated = [...quizQuestions];
                                  updated[qIndex].correctAnswer = oIndex;
                                  setQuizQuestions(updated);
                                }}
                                className="w-4 h-4"
                              />
                              <Input
                                value={option}
                                onChange={(e) => {
                                  const updated = [...quizQuestions];
                                  updated[qIndex].options[oIndex] = e.target.value;
                                  setQuizQuestions(updated);
                                }}
                                placeholder={`Option ${oIndex + 1}`}
                                className="flex-1"
                                disabled={question.type === "true-false"}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuizQuestions(quizQuestions.filter((_, i) => i !== qIndex))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => setQuizQuestions([...quizQuestions, {
                    text: "",
                    type: "mcq",
                    options: ["", "", "", ""],
                    correctAnswer: undefined,
                    points: 1
                  }])}
                  className="w-full hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </div>

              {/* WhatsApp and AI Settings for Quiz */}
              <div className="mt-6 space-y-4">
                {/* WhatsApp Practice Questions */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <div>
                      <label className="text-sm font-medium">Deliver practice questions via WhatsApp</label>
                      <p className="text-xs text-muted-foreground">Send quiz questions to learners through WhatsApp</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={whatsappPracticeEnabled}
                      onChange={(e) => setWhatsappPracticeEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {/* AI Assessment Assistance */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-[#ff6b4d]" />
                    <div>
                      <label className="text-sm font-medium">Enable AI Assessment Assistance</label>
                      <p className="text-xs text-muted-foreground">AI helps explain answers and provide feedback</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiAssessmentEnabled}
                      onChange={(e) => setAiAssessmentEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Assignment Setup */}
          {assessmentType === "assignment" && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Assignment Setup</h3>
              
              {!hasValidAssignment && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Instructions or brief required</p>
                    <p className="text-xs text-red-800 mt-1">Provide either written instructions or upload a brief document.</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Assignment Title</label>
                  <Input
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    placeholder="e.g., Final Project Submission"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Instructions</label>
                  <Textarea
                    value={assignmentInstructions}
                    onChange={(e) => setAssignmentInstructions(e.target.value)}
                    placeholder="Provide detailed instructions for the assignment..."
                    rows={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Assignment Brief (Optional PDF)</label>
                  {assignmentBriefUrl ? (
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">Brief uploaded</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setAssignmentBrief(null);
                          setAssignmentBriefUrl("");
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setAssignmentBrief(file);
                            setAssignmentBriefUrl(URL.createObjectURL(file));
                          }
                        }}
                        className="hidden"
                        id="assignment-brief-upload"
                      />
                      <label htmlFor="assignment-brief-upload" className="cursor-pointer">
                        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium">Upload Assignment Brief</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF up to 10MB</p>
                      </label>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Allowed File Types</label>
                  <Input
                    value={allowedFileTypes}
                    onChange={(e) => setAllowedFileTypes(e.target.value)}
                    placeholder="e.g., pdf,docx,zip"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Comma-separated file extensions</p>
                </div>

                {/* Submission Deadline */}
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <label className="text-sm font-medium">📅 Enable Deadline</label>
                      <p className="text-xs text-muted-foreground mt-1">Set a submission deadline for this assignment</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableDeadline}
                        onChange={(e) => setEnableDeadline(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
                    </label>
                  </div>

                  {enableDeadline && (
                    <div className="space-y-4 pt-4 border-t border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">📆 Due Date</label>
                          <Input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">⏰ Due Time</label>
                          <Input
                            type="time"
                            value={dueTime}
                            onChange={(e) => setDueTime(e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">🌍 Timezone</label>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="Europe/London">London (GMT)</option>
                          <option value="Europe/Paris">Paris (CET)</option>
                          <option value="Asia/Tokyo">Tokyo (JST)</option>
                          <option value="Asia/Shanghai">Shanghai (CST)</option>
                          <option value="Australia/Sydney">Sydney (AEST)</option>
                          <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                            {Intl.DateTimeFormat().resolvedOptions().timeZone} (Auto-detected)
                          </option>
                        </select>
                      </div>

                      {/* Late Submissions */}
                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <label className="text-sm font-medium">Allow Late Submissions</label>
                            <p className="text-xs text-muted-foreground mt-1">Accept submissions after the deadline</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={allowLateSubmissions}
                              onChange={(e) => setAllowLateSubmissions(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
                          </label>
                        </div>

                        {allowLateSubmissions && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Late Window</label>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                min="1"
                                value={lateWindow}
                                onChange={(e) => setLateWindow(e.target.value)}
                                placeholder="24"
                                className="w-24"
                              />
                              <select
                                value={lateWindowUnit}
                                onChange={(e) => setLateWindowUnit(e.target.value)}
                                className="px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d]"
                              >
                                <option value="hours">Hours</option>
                                <option value="days">Days</option>
                              </select>
                              <span className="text-xs text-muted-foreground">after deadline</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Practical Evaluation Setup */}
          {assessmentType === "practical" && (
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Practical Evaluation Setup</h3>
              
              {!hasValidPractical && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Instructions required</p>
                    <p className="text-xs text-red-800 mt-1">Provide instructions for the practical evaluation.</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Evaluation Title</label>
                  <Input
                    value={practicalTitle}
                    onChange={(e) => setPracticalTitle(e.target.value)}
                    placeholder="e.g., Hands-on Demonstration"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Evaluation Instructions</label>
                  <Textarea
                    value={practicalInstructions}
                    onChange={(e) => setPracticalInstructions(e.target.value)}
                    placeholder="Describe what students need to demonstrate and how they will be evaluated..."
                    rows={6}
                  />
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-sm text-orange-900">
                    <strong>Note:</strong> Practical evaluations require manual grading by the instructor. Students will be notified when their evaluation has been reviewed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onSave} className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]">Save as Draft</Button>
        <Button 
          disabled={assessmentRequired || (assessmentType !== "none" && !hasValidContent)} 
          onClick={onContinue}
          className="bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[14px] leading-[20px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Next Step
        </Button>
      </div>
    </div>
  );
};

const EligibilityStep = ({ course, onSave, onContinue }: any) => {
  const courseId = course?.id;
  const storedCourse = courseId ? JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}') : {};
  
  const [certificationEnabled, setCertificationEnabled] = useState(storedCourse.eligibilityCertificationEnabled || false);
  const [requireWatchAll, setRequireWatchAll] = useState(storedCourse.requireWatchAll !== undefined ? storedCourse.requireWatchAll : true);
  const [requirePassAssessment, setRequirePassAssessment] = useState(storedCourse.requirePassAssessment !== undefined ? storedCourse.requirePassAssessment : true);
  const [requireSubmitAssignment, setRequireSubmitAssignment] = useState(storedCourse.requireSubmitAssignment || false);
  const [passingThreshold, setPassingThreshold] = useState(storedCourse.passingThreshold || "70");
  const [showCertificatePreview, setShowCertificatePreview] = useState(false);

  // Load certificate branding from Profile & Settings
  const certificateBranding = JSON.parse(localStorage.getItem('certificate_branding') || '{}');

  const hasCompletionRequirements = certificationEnabled && (requireWatchAll || requirePassAssessment || requireSubmitAssignment);

  // Save eligibility data to localStorage whenever it changes
  useEffect(() => {
    if (courseId) {
      const existing = JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}');
      localStorage.setItem(`course_${courseId}`, JSON.stringify({ 
        ...existing, 
        eligibilityCertificationEnabled: certificationEnabled,
        requireWatchAll,
        requirePassAssessment,
        requireSubmitAssignment,
        passingThreshold,
        eligibilityConfigured: true // Mark as configured
      }));
    }
  }, [courseId, certificationEnabled, requireWatchAll, requirePassAssessment, requireSubmitAssignment, passingThreshold]);

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm mb-6">
        <h2 className="text-[24px] leading-[32px] font-semibold mb-2 text-[#1e2348]">Eligibility & Certification</h2>
        <p className="text-sm text-muted-foreground mb-6">Configure certification rules and completion requirements.</p>

        <div className="space-y-6">
          {/* Certification Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <label className="text-sm font-medium">This course issues a certificate</label>
              <p className="text-xs text-muted-foreground mt-1">Award certificates to students who complete the course</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={certificationEnabled}
                onChange={(e) => setCertificationEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
            </label>
          </div>

          {/* Completion Requirements (shown when certification is enabled) */}
          {certificationEnabled && (
            <>
              <div className="border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-3">Completion Requirements</h3>
                <p className="text-xs text-muted-foreground mb-4">Students must meet all selected requirements to receive a certificate</p>

                <div className="space-y-3">
                  {/* Watch 100% of content */}
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={requireWatchAll}
                        onChange={(e) => setRequireWatchAll(e.target.checked)}
                        className="w-4 h-4 text-[#ff6b4d] bg-gray-100 border-gray-300 rounded focus:ring-[#ff6b4d] focus:ring-2"
                      />
                      <div>
                        <label className="text-sm font-medium">Watch 100% of content</label>
                        <p className="text-xs text-muted-foreground">Students must complete all lessons</p>
                      </div>
                    </div>
                  </div>

                  {/* Pass assessment */}
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={requirePassAssessment}
                        onChange={(e) => setRequirePassAssessment(e.target.checked)}
                        className="w-4 h-4 text-[#ff6b4d] bg-gray-100 border-gray-300 rounded focus:ring-[#ff6b4d] focus:ring-2"
                      />
                      <div>
                        <label className="text-sm font-medium">Pass assessment</label>
                        <p className="text-xs text-muted-foreground">Students must pass the course assessment</p>
                      </div>
                    </div>
                  </div>

                  {/* Submit assignment */}
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={requireSubmitAssignment}
                        onChange={(e) => setRequireSubmitAssignment(e.target.checked)}
                        className="w-4 h-4 text-[#ff6b4d] bg-gray-100 border-gray-300 rounded focus:ring-[#ff6b4d] focus:ring-2"
                      />
                      <div>
                        <label className="text-sm font-medium">Submit assignment</label>
                        <p className="text-xs text-muted-foreground">Students must submit required assignments</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passing Score Threshold */}
              {requirePassAssessment && (
                <div>
                  <label className="block text-sm font-medium mb-2">Passing Score Threshold</label>
                  <p className="text-xs text-muted-foreground mb-3">Minimum score required to earn the certificate</p>
                  <div className="flex items-center gap-3 max-w-xs">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={passingThreshold}
                      onChange={(e) => setPassingThreshold(e.target.value)}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              )}

              {/* Certificate Preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-sm font-medium">Certificate Template</label>
                    <p className="text-xs text-muted-foreground mt-1">Preview how the certificate will look</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCertificatePreview(!showCertificatePreview)}
                    className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showCertificatePreview ? "Hide" : "Show"} Preview
                  </Button>
                </div>

                {showCertificatePreview && (
                  <div className="border-2 border-border rounded-lg overflow-hidden bg-white">
                    {/* Certificate Header with Gradient */}
                    <div className="bg-gradient-to-r from-[#1e2348] to-[#2a3058] p-8 text-white">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          {certificateBranding.logo ? (
                            <img src={certificateBranding.logo} alt="Logo" className="h-16 w-auto" />
                          ) : (
                            <Award className="w-10 h-10" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-white/80 text-sm mb-1" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                            KHDA-Attested Certificate
                          </p>
                          <h3 className="font-semibold text-xl" style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 600 }}>
                            {certificateBranding.issuingEntityName || "DTMA - Digital Transformation Management Academy"}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Body */}
                    <div className="p-8">
                      <div className="max-w-2xl mx-auto text-center space-y-6">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                          Certificate of Completion
                        </div>
                        
                        <p className="text-sm text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px' }}>
                          This is to certify that
                        </p>
                        
                        <div className="text-2xl font-semibold text-[#1e2348] border-b-2 border-[#ff6b4d] inline-block px-8 pb-2">
                          [Student Name]
                        </div>
                        
                        <p className="text-sm text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px' }}>
                          has successfully completed
                        </p>
                        
                        <div className="text-xl font-semibold text-[#1e2348]" style={{ fontSize: '18px', lineHeight: '24px' }}>
                          {course?.title || "Course Title"}
                        </div>

                        {/* Issue Date and Certificate ID */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1" style={{ fontSize: '14px', lineHeight: '20px' }}>
                              Issue Date
                            </p>
                            <p className="font-medium" style={{ fontSize: '14px', lineHeight: '20px' }}>
                              [Date]
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1" style={{ fontSize: '14px', lineHeight: '20px' }}>
                              Certificate ID
                            </p>
                            <p className="font-medium font-mono text-sm" style={{ fontSize: '12px', lineHeight: '16px' }}>
                              [Auto-generated]
                            </p>
                          </div>
                        </div>

                        {/* Signature Section */}
                        <div className="flex justify-center gap-12 pt-6 border-t border-border">
                          <div className="text-center">
                            {certificateBranding.signature ? (
                              <img src={certificateBranding.signature} alt="Signature" className="h-16 w-auto mx-auto mb-2" />
                            ) : (
                              <div className="h-16 flex items-center justify-center mb-2">
                                <div className="border-t-2 border-[#1e2348] w-32"></div>
                              </div>
                            )}
                            <p className="text-xs font-medium text-[#1e2348]" style={{ fontSize: '12px', lineHeight: '16px' }}>
                              {certificateBranding.signatoryName || "Instructor Signature"}
                            </p>
                            <p className="text-xs text-muted-foreground" style={{ fontSize: '11px', lineHeight: '14px' }}>
                              Instructor
                            </p>
                          </div>
                        </div>

                        {/* Footer Information */}
                        {certificateBranding.accreditationNumber && (
                          <p className="text-xs text-muted-foreground pt-4" style={{ fontSize: '12px', lineHeight: '16px' }}>
                            Accreditation: {certificateBranding.accreditationNumber}
                          </p>
                        )}
                        
                        {certificateBranding.footerText && (
                          <p className="text-xs text-muted-foreground" style={{ fontSize: '12px', lineHeight: '16px' }}>
                            {certificateBranding.footerText}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Certification Logic Info */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Automatic Certificate Generation</p>
                  <p className="text-xs text-blue-800 mt-1">
                    Certificates will be automatically generated and issued when students meet all the selected completion requirements.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* No Certification Message */}
          {!certificationEnabled && (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">Enable certification to configure completion requirements and issue certificates to students.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onSave} className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]">Save as Draft</Button>
        <Button onClick={onContinue} className="bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[14px] leading-[20px] font-medium">Continue to Next Step</Button>
      </div>
    </div>
  );
};

const PricingStep = ({ course, onSave, onContinue }: any) => {
  const courseId = course?.id;
  const storedCourse = courseId ? JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}') : {};
  
  const [price, setPrice] = useState(storedCourse.price?.toString() || course?.price?.toString() || "0");
  const [hasDiscount, setHasDiscount] = useState(storedCourse.hasDiscount || false);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(storedCourse.discountType || "percentage");
  const [discountValue, setDiscountValue] = useState(storedCourse.discountValue || "");
  const [hasEnrollmentCap, setHasEnrollmentCap] = useState(storedCourse.hasEnrollmentCap || false);
  const [enrollmentCap, setEnrollmentCap] = useState(storedCourse.enrollmentCap || "");
  const [language, setLanguage] = useState(storedCourse.language || "English");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // WhatsApp Learning Settings
  const [whatsappLearningEnabled, setWhatsappLearningEnabled] = useState(storedCourse.whatsappLearningEnabled || false);
  const [whatsappDeliveryType, setWhatsappDeliveryType] = useState(storedCourse.whatsappDeliveryType || "both");
  const [whatsappFrequency, setWhatsappFrequency] = useState(storedCourse.whatsappFrequency || "daily");
  const [quietHoursStart, setQuietHoursStart] = useState(storedCourse.quietHoursStart || "22:00");
  const [quietHoursEnd, setQuietHoursEnd] = useState(storedCourse.quietHoursEnd || "08:00");

  // AI Course Settings
  const [aiTutorEnabled, setAiTutorEnabled] = useState(storedCourse.aiTutorEnabled !== false);
  const [aiTone, setAiTone] = useState(storedCourse.aiTone || "friendly");
  const [aiResponseStyle, setAiResponseStyle] = useState(storedCourse.aiResponseStyle || "detailed");

  // Save pricing data to localStorage whenever it changes
  useEffect(() => {
    if (courseId) {
      const existing = JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}');
      localStorage.setItem(`course_${courseId}`, JSON.stringify({ 
        ...existing, 
        price,
        hasDiscount,
        discountType,
        discountValue,
        hasEnrollmentCap,
        enrollmentCap,
        language,
        whatsappLearningEnabled,
        whatsappDeliveryType,
        whatsappFrequency,
        quietHoursStart,
        quietHoursEnd,
        aiTutorEnabled,
        aiTone,
        aiResponseStyle,
        pricingConfigured: true // Mark as configured
      }));
    }
  }, [courseId, price, hasDiscount, discountType, discountValue, hasEnrollmentCap, enrollmentCap, language,
      whatsappLearningEnabled, whatsappDeliveryType, whatsappFrequency, quietHoursStart, quietHoursEnd,
      aiTutorEnabled, aiTone, aiResponseStyle]);

  const calculateDiscountedPrice = () => {
    const originalPrice = parseFloat(price) || 0;
    const discount = parseFloat(discountValue) || 0;
    
    if (discountType === "percentage") {
      return originalPrice - (originalPrice * discount / 100);
    } else {
      return originalPrice - discount;
    }
  };

  const discountedPrice = hasDiscount && discountValue ? calculateDiscountedPrice() : null;

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm mb-6">
        <h2 className="text-[24px] leading-[32px] font-semibold mb-2 text-[#1e2348]">Pricing & Settings</h2>
        <p className="text-sm text-muted-foreground mb-6">Edit pricing, discounts, and course settings.</p>

        <div className="space-y-6">
          {/* Course Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Course Price</label>
            <p className="text-xs text-muted-foreground mb-3">Set the price for your course</p>
            <div className="flex items-center gap-2 max-w-xs">
              <span className="text-sm text-muted-foreground">$</span>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="flex-1"
              />
            </div>
          </div>

          {/* Discount Option */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-sm font-medium">Enable Discount</label>
                <p className="text-xs text-muted-foreground mt-1">Offer a promotional discount</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasDiscount}
                  onChange={(e) => setHasDiscount(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
              </label>
            </div>

            {hasDiscount && (
              <div className="space-y-4 pt-4 border-t border-border">
                <div>
                  <label className="block text-sm font-medium mb-2">Discount Type</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDiscountType("percentage")}
                      className={`flex-1 p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                        discountType === "percentage"
                          ? "border-[#ff6b4d] bg-[#ff6b4d]/5"
                          : "border-border hover:border-[#ff6b4d]/50"
                      }`}
                    >
                      Percentage (%)
                    </button>
                    <button
                      onClick={() => setDiscountType("fixed")}
                      className={`flex-1 p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                        discountType === "fixed"
                          ? "border-[#ff6b4d] bg-[#ff6b4d]/5"
                          : "border-border hover:border-[#ff6b4d]/50"
                      }`}
                    >
                      Fixed Amount ($)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Discount Value</label>
                  <div className="flex items-center gap-2 max-w-xs">
                    <span className="text-sm text-muted-foreground">
                      {discountType === "percentage" ? "%" : "$"}
                    </span>
                    <Input
                      type="number"
                      min="0"
                      max={discountType === "percentage" ? "100" : undefined}
                      step={discountType === "percentage" ? "1" : "0.01"}
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      placeholder="0"
                      className="flex-1"
                    />
                  </div>
                </div>

                {discountedPrice !== null && discountedPrice >= 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-900">
                      Discounted Price: <span className="line-through text-muted-foreground">${parseFloat(price).toFixed(2)}</span> → ${discountedPrice.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Enrollment Cap */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-sm font-medium">Enrollment Cap</label>
                <p className="text-xs text-muted-foreground mt-1">Limit the number of students who can enroll</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasEnrollmentCap}
                  onChange={(e) => setHasEnrollmentCap(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
              </label>
            </div>

            {hasEnrollmentCap && (
              <div className="pt-4 border-t border-border">
                <label className="block text-sm font-medium mb-2">Maximum Students</label>
                <div className="flex items-center gap-2 max-w-xs">
                  <Input
                    type="number"
                    min="1"
                    value={enrollmentCap}
                    onChange={(e) => setEnrollmentCap(e.target.value)}
                    placeholder="100"
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">students</span>
                </div>
              </div>
            )}
          </div>

          {/* Course Language */}
          <div>
            <label className="block text-sm font-medium mb-2">Course Language</label>
            <p className="text-xs text-muted-foreground mb-3">Primary language of instruction</p>
            
            {/* Custom Dropdown */}
            <div className="relative w-full max-w-xs">
              <button
                type="button"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] flex items-center justify-between text-left"
              >
                <span>{language}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLanguageDropdownOpen && (
                <>
                  {/* Backdrop to close dropdown */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsLanguageDropdownOpen(false)}
                  />
                  
                  {/* Dropdown Menu */}
                  <div className="absolute z-20 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese', 'Korean', 'Arabic'].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setLanguage(lang);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left transition-colors ${
                          language === lang
                            ? 'bg-[#ff6b4d] text-white'
                            : 'hover:bg-[#FFE9E4] text-[#1e2348]'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* WhatsApp Learning Settings */}
          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold">WhatsApp Learning Settings</h3>
            </div>
            
            <div className="space-y-4">
              {/* Enable WhatsApp Learning */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Enable WhatsApp Learning</label>
                  <p className="text-xs text-muted-foreground mt-1">Deliver course content via WhatsApp</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatsappLearningEnabled}
                    onChange={(e) => setWhatsappLearningEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              {whatsappLearningEnabled && (
                <div className="space-y-4 pt-4 border-t border-border">
                  {/* Delivery Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Delivery Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setWhatsappDeliveryType("daily")}
                        className={`p-3 border-2 rounded-lg text-xs font-medium transition-all ${
                          whatsappDeliveryType === "daily"
                            ? "border-green-600 bg-green-50 text-green-900"
                            : "border-border hover:border-green-300"
                        }`}
                      >
                        Daily Micro-Learning
                      </button>
                      <button
                        onClick={() => setWhatsappDeliveryType("practice")}
                        className={`p-3 border-2 rounded-lg text-xs font-medium transition-all ${
                          whatsappDeliveryType === "practice"
                            ? "border-green-600 bg-green-50 text-green-900"
                            : "border-border hover:border-green-300"
                        }`}
                      >
                        Practice Questions
                      </button>
                      <button
                        onClick={() => setWhatsappDeliveryType("both")}
                        className={`p-3 border-2 rounded-lg text-xs font-medium transition-all ${
                          whatsappDeliveryType === "both"
                            ? "border-green-600 bg-green-50 text-green-900"
                            : "border-border hover:border-green-300"
                        }`}
                      >
                        Both
                      </button>
                    </div>
                  </div>

                  {/* Frequency */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Frequency</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setWhatsappFrequency("daily")}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          whatsappFrequency === "daily"
                            ? "border-green-600 bg-green-50 text-green-900"
                            : "border-border hover:border-green-300"
                        }`}
                      >
                        Daily
                      </button>
                      <button
                        onClick={() => setWhatsappFrequency("weekly")}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          whatsappFrequency === "weekly"
                            ? "border-green-600 bg-green-50 text-green-900"
                            : "border-border hover:border-green-300"
                        }`}
                      >
                        Weekly
                      </button>
                    </div>
                  </div>

                  {/* Quiet Hours */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Quiet Hours</label>
                    <p className="text-xs text-muted-foreground mb-2">No messages will be sent during these hours</p>
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={quietHoursStart}
                        onChange={(e) => setQuietHoursStart(e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground">to</span>
                      <Input
                        type="time"
                        value={quietHoursEnd}
                        onChange={(e) => setQuietHoursEnd(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Learning Settings */}
          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-[#ff6b4d]" />
              <h3 className="text-lg font-semibold">AI Learning Settings</h3>
            </div>
            
            <div className="space-y-4">
              {/* Enable AI Tutor */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Enable AI Tutor (Course Level)</label>
                  <p className="text-xs text-muted-foreground mt-1">Applies to all lessons unless overridden</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiTutorEnabled}
                    onChange={(e) => setAiTutorEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff6b4d]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff6b4d]"></div>
                </label>
              </div>

              {aiTutorEnabled && (
                <div className="space-y-4 pt-4 border-t border-border">
                  {/* AI Tone */}
                  <div>
                    <label className="block text-sm font-medium mb-2">AI Tone</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setAiTone("friendly")}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          aiTone === "friendly"
                            ? "border-[#ff6b4d] bg-orange-50 text-[#ff6b4d]"
                            : "border-border hover:border-[#ff6b4d]/50"
                        }`}
                      >
                        Friendly
                      </button>
                      <button
                        onClick={() => setAiTone("professional")}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          aiTone === "professional"
                            ? "border-[#ff6b4d] bg-orange-50 text-[#ff6b4d]"
                            : "border-border hover:border-[#ff6b4d]/50"
                        }`}
                      >
                        Professional
                      </button>
                      <button
                        onClick={() => setAiTone("encouraging")}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          aiTone === "encouraging"
                            ? "border-[#ff6b4d] bg-orange-50 text-[#ff6b4d]"
                            : "border-border hover:border-[#ff6b4d]/50"
                        }`}
                      >
                        Encouraging
                      </button>
                    </div>
                  </div>

                  {/* Response Style */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Response Style</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setAiResponseStyle("short")}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          aiResponseStyle === "short"
                            ? "border-[#ff6b4d] bg-orange-50 text-[#ff6b4d]"
                            : "border-border hover:border-[#ff6b4d]/50"
                        }`}
                      >
                        Short
                      </button>
                      <button
                        onClick={() => setAiResponseStyle("detailed")}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          aiResponseStyle === "detailed"
                            ? "border-[#ff6b4d] bg-orange-50 text-[#ff6b4d]"
                            : "border-border hover:border-[#ff6b4d]/50"
                        }`}
                      >
                        Detailed
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Visibility Info */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Course Visibility</p>
              <p className="text-xs text-blue-800 mt-1">
                Your course will remain private until it is reviewed and approved by an administrator. Once approved, it will be visible to students.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onSave} className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]">Save as Draft</Button>
        <Button onClick={onContinue} className="bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[14px] leading-[20px] font-medium">Continue to Next Step</Button>
      </div>
    </div>
  );
};

const SubmitStep = ({ course, onSave }: any) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const submitForReview = useSubmitCourseForReview();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get actual course data from localStorage (where curriculum, media, etc. are stored)
  const courseId = course?.id;
  const storedCourse = courseId ? JSON.parse(localStorage.getItem(`course_${courseId}`) || '{}') : {};
  
  // Validate actual course data
  const curriculum = storedCourse.curriculum || [];
  const hasSections = curriculum.length > 0;
  const hasLessons = curriculum.some((section: any) => section.lessons && section.lessons.length > 0);
  const hasThumbnail = !!storedCourse.thumbnail;
  const certificationEnabled = !!storedCourse.certificationEnabled;
  const hasAssessment = storedCourse.assessmentType && storedCourse.assessmentType !== 'none';
  const hasValidAssessmentContent = !!storedCourse.hasValidAssessmentContent;
  const whatsappEnabled = !!storedCourse.whatsappLearningEnabled;
  const whatsappConfigured = whatsappEnabled ? !!(storedCourse.whatsappDeliveryType && storedCourse.whatsappFrequency) : true;
  const aiEnabled = storedCourse.aiTutorEnabled !== false;
  
  const validationData = {
    hasTitle: !!course?.title,
    hasDescription: !!course?.description,
    hasSections,
    hasLessons,
    hasThumbnail,
    certificationEnabled,
    hasAssessment,
    hasValidAssessmentContent,
    whatsappEnabled,
    whatsappConfigured,
    aiEnabled,
  };

  const validationChecklist = [
    { id: 'title', label: 'Course title', required: true, completed: validationData.hasTitle },
    { id: 'description', label: 'Course description', required: true, completed: validationData.hasDescription },
    { id: 'sections', label: 'At least 1 section', required: true, completed: validationData.hasSections },
    { id: 'lessons', label: 'At least 1 lesson', required: true, completed: validationData.hasLessons },
    { id: 'thumbnail', label: 'Course thumbnail uploaded', required: true, completed: validationData.hasThumbnail },
    { 
      id: 'assessment', 
      label: 'Assessment type selected (required for certification)', 
      required: validationData.certificationEnabled, 
      completed: validationData.hasAssessment 
    },
    { 
      id: 'assessmentContent', 
      label: 'Assessment content created', 
      required: validationData.hasAssessment, 
      completed: validationData.hasValidAssessmentContent 
    },
    { 
      id: 'whatsappSettings', 
      label: 'WhatsApp settings configured', 
      required: validationData.whatsappEnabled, 
      completed: validationData.whatsappConfigured 
    },
    { 
      id: 'aiSettings', 
      label: 'AI learning settings enabled', 
      required: false, 
      completed: validationData.aiEnabled 
    },
  ];

  const requiredItems = validationChecklist.filter(item => item.required);
  const completedItems = requiredItems.filter(item => item.completed);
  const missingItems = requiredItems.filter(item => !item.completed);
  const isValid = missingItems.length === 0;
  const progressPercent = (completedItems.length / requiredItems.length) * 100;

  const handleSubmit = async () => {
    if (!isValid) {
      toast({
        title: "Cannot submit",
        description: "Please complete all required items before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Call the API to submit for review
      await submitForReview.mutateAsync(courseId);
      
      toast({
        title: "Course submitted!",
        description: "Your course has been submitted for admin review.",
      });
      
      // Navigate back to dashboard
      navigate("/dashboard/instructor");
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-sm mb-6">
        <h2 className="text-[24px] leading-[32px] font-semibold mb-2 text-[#1e2348]">Submit for Review</h2>
        <p className="text-sm text-muted-foreground mb-6">Review your course and submit for admin approval.</p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Completion Progress</span>
            <span className="text-sm text-muted-foreground">{completedItems.length} of {requiredItems.length} completed</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Validation Checklist */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-semibold">Submission Checklist</h3>
          {validationChecklist.map((item) => (
            item.required && (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  item.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                {item.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span className={`text-sm ${item.completed ? "text-green-900" : "text-red-900"}`}>
                  {item.label}
                </span>
              </div>
            )
          ))}
        </div>

        {/* Missing Items Warning */}
        {!isValid && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Missing required items</p>
              <p className="text-xs text-red-800 mt-1">
                Complete all checklist items before submitting for review.
              </p>
            </div>
          </div>
        )}

        {/* Submission Info */}
        {isValid && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Ready to submit</p>
              <p className="text-xs text-blue-800 mt-1">
                Once submitted, your course will be locked for review. You'll be able to make minor metadata edits, but curriculum, assessments, and certification settings will be locked until the review is complete.
              </p>
            </div>
          </div>
        )}

        {/* What happens after submission */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3">What happens after submission?</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-[#ff6b4d] mt-0.5">•</span>
              <span>Course status changes to "Pending Review"</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#ff6b4d] mt-0.5">•</span>
              <span>Curriculum, assessments, and certification settings are locked</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#ff6b4d] mt-0.5">•</span>
              <span>Minor metadata edits (title, description, price) remain available</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#ff6b4d] mt-0.5">•</span>
              <span>Admin will review and either approve or request changes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#ff6b4d] mt-0.5">•</span>
              <span>You'll receive a notification when the review is complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onSave} className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]">Save as Draft</Button>
        <Button 
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[14px] leading-[20px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit for Review"}
        </Button>
      </div>
    </div>
  );
};


export default CourseBuilder;
