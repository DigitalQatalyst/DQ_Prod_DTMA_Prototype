import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Award,
  FileText,
  GraduationCap,
  CheckCircle,
  Video,
  Headphones,
  Image,
  BookOpen,
  Lock,
  LibraryBig,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Lesson {
  id: string;
  title: string;
  type: string;
  duration_minutes?: number;
  isQuiz?: boolean;
  isAssignment?: boolean;
  isPractical?: boolean;
  resourceType?: string;
  isCompleted?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseModuleNavigatorProps {
  modules: Module[];
  selectedLessonId?: string;
  onLessonSelect: (lesson: Lesson) => void;
  progressPercent?: number;
  completedLessons?: number;
  totalLessons?: number;
  passedModules?: Set<string>;
  lessonProgress?: Record<string, boolean>;
}

export const CourseModuleNavigator = ({
  modules,
  selectedLessonId,
  onLessonSelect,
  progressPercent = 0,
  completedLessons = 0,
  totalLessons = 0,
  passedModules = new Set(),
  lessonProgress = {},
}: CourseModuleNavigatorProps) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(modules.map((m) => m.id))
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.isQuiz) return <Award className="w-4 h-4" />;
    if (lesson.isAssignment) return <FileText className="w-4 h-4" />;
    if (lesson.isPractical) return <GraduationCap className="w-4 h-4" />;
    if (lesson.type === "video") return <Video className="w-4 h-4" />;
    if (lesson.type === "audio") return <Headphones className="w-4 h-4" />;
    if (lesson.type === "infographic") return <Image className="w-4 h-4" />;
    if (lesson.type === "reading") {
      switch (lesson.resourceType) {
        case "infographic":
          return <Image className="w-4 h-4" />;
        case "pdf":
          return <FileText className="w-4 h-4" />;
        case "case-study":
          return <BookOpen className="w-4 h-4" />;
        case "article":
          return <BookOpen className="w-4 h-4" />;
        default:
          return <FileText className="w-4 h-4" />;
      }
    }
    return <BookOpen className="w-4 h-4" />;
  };

  const getModuleColor = (index: number) => {
    return {
      bg: "bg-[#E9E9ED]",
      border: "border-2 border-[#D0D0D8]",
      text: "text-[#ff6b4d]",
    };
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1e2348] rounded-t-lg">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <LibraryBig className="w-5 h-5 text-white" />
            <h3 className="text-white text-[18px] leading-[26px] font-bold">
              Course Modules
            </h3>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-auto"
          aria-label={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? (
            <LibraryBig className="w-5 h-5 text-white" />
          ) : (
            <X className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Progress Bar */}
      {!isCollapsed && (
        <div className="px-4 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] leading-[20px] font-semibold text-[#1e2348]">
              {Math.round(progressPercent)}% Complete
            </span>
            <span className="text-[11px] leading-[16px] font-medium text-[#4B5563]">
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff6b4d] to-[#ff8c73] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Modules List */}
      {!isCollapsed && (
        <ScrollArea className="flex-1">
          <div className="space-y-3 p-4">
            {modules.map((module, moduleIndex) => {
              const isExpanded = expandedModules.has(module.id);
              const isModulePassed = passedModules.has(module.id);
              const moduleColor = getModuleColor(moduleIndex);

              // Separate lessons, assessments, and resources
              const regularLessons = module.lessons.filter(
                (l) => !l.isQuiz && !l.isAssignment && l.type !== 'reading' && l.type !== 'infographic'
              );
              const assessments = module.lessons.filter((l) => l.isQuiz || l.isAssignment);
              const resources = module.lessons.filter((l) => l.type === 'reading' || l.type === 'infographic' || l.resourceType);

              return (
                <div key={module.id} className="space-y-2">
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModuleExpansion(module.id)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors border ${moduleColor.bg} ${moduleColor.border} hover:opacity-80`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className={`w-5 h-5 ${moduleColor.text} flex-shrink-0`} />
                      ) : (
                        <ChevronDown className={`w-5 h-5 ${moduleColor.text} flex-shrink-0`} />
                      )}
                    </div>

                    <div className="flex-1 text-left">
                      <p className={`text-[12px] leading-[16px] font-semibold uppercase tracking-wide ${moduleColor.text}`}>
                        Module {moduleIndex + 1}
                      </p>
                      <p className="text-[#1e2348] text-[15px] leading-[22px] font-semibold">
                        {module.title.replace(/^Module\s+\d+:\s*/, '')}
                      </p>
                    </div>

                    {isModulePassed && (
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full flex-shrink-0">
                        <CheckCircle className="w-3 h-3" />
                        <span className="text-[10px] leading-[14px] font-semibold">PASSED</span>
                      </div>
                    )}
                  </button>

                  {/* Module Content - Lessons, Assessment, Resources */}
                  {isExpanded && (
                    <div className="ml-4 space-y-1">
                      {/* Regular Lessons */}
                      {regularLessons.map((lesson, lessonIndex) => {
                        const isActive = selectedLessonId === lesson.id;
                        const isCompleted = lessonProgress[lesson.id] || false;

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => onLessonSelect(lesson)}
                            className={`w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3 ${
                              isActive
                                ? 'bg-[#1e2348] text-white'
                                : 'hover:bg-gray-100 text-[#1e2348]'
                            }`}
                          >
                            <div className="mt-1.5 flex-shrink-0">
                              <div
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                  isCompleted
                                    ? 'bg-green-500'
                                    : isActive
                                    ? 'bg-white'
                                    : 'bg-gray-400'
                                }`}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-[14px] leading-[20px] font-medium line-clamp-2 ${
                                  isActive ? 'text-white' : ''
                                }`}
                              >
                                {lessonIndex + 1}. {lesson.title}
                              </p>
                              <p
                                className={`text-[12px] leading-[16px] font-medium mt-1 ${
                                  isActive ? 'text-white/70' : 'text-gray-600'
                                }`}
                              >
                                {lesson.duration_minutes || 15} min
                              </p>
                            </div>
                          </button>
                        );
                      })}

                      {/* Course Assessment */}
                      {assessments.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-[12px] leading-[16px] font-semibold uppercase tracking-wide text-blue-700 px-3 mb-2">
                            Assessment
                          </p>
                          {assessments.map((lesson) => {
                            const isActive = selectedLessonId === lesson.id;

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => onLessonSelect(lesson)}
                                className={`w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3 ${
                                  isActive
                                    ? 'bg-[#1e2348] text-white'
                                    : 'hover:bg-blue-50 text-[#1e2348]'
                                }`}
                              >
                                <div className="mt-0.5 flex-shrink-0">
                                  {isActive ? (
                                    <div className="text-white">
                                      <Award className="w-4 h-4" />
                                    </div>
                                  ) : (
                                    <div className="text-blue-600">
                                      <Award className="w-4 h-4" />
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-[14px] leading-[20px] font-medium line-clamp-2 ${
                                      isActive ? 'text-white' : ''
                                    }`}
                                  >
                                    {lesson.title}
                                  </p>
                                  <p
                                    className={`text-[12px] leading-[16px] font-medium mt-1 ${
                                      isActive ? 'text-white/70' : 'text-gray-600'
                                    }`}
                                  >
                                    {lesson.duration_minutes || 15} min
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Additional Resources */}
                      {resources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-[12px] leading-[16px] font-semibold uppercase tracking-wide text-gray-700 px-3 mb-2">
                            Resources
                          </p>
                          {resources.map((lesson) => {
                            const isActive = selectedLessonId === lesson.id;

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => onLessonSelect(lesson)}
                                className={`w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3 ${
                                  isActive
                                    ? 'bg-[#1e2348] text-white'
                                    : 'hover:bg-gray-100 text-[#1e2348]'
                                }`}
                              >
                                <div className="mt-0.5 flex-shrink-0">
                                  {isActive ? (
                                    <div className="text-white">
                                      <FileText className="w-4 h-4" />
                                    </div>
                                  ) : (
                                    <div className="text-gray-600">
                                      <FileText className="w-4 h-4" />
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-[14px] leading-[20px] font-medium line-clamp-2 ${
                                      isActive ? 'text-white' : ''
                                    }`}
                                  >
                                    {lesson.title}
                                  </p>
                                  <p
                                    className={`text-[12px] leading-[16px] font-medium mt-1 ${
                                      isActive ? 'text-white/70' : 'text-gray-600'
                                    }`}
                                  >
                                    {lesson.duration_minutes || 15} min
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
