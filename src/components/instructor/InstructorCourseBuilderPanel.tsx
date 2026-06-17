import { useNavigate } from "react-router-dom";
import { BookOpen, Hammer, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import {
  learnerBody,
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerEmptyBody,
  learnerEmptyTitle,
  learnerIconWell,
  learnerItemTitle,
  learnerPanel,
  learnerSectionHeading,
} from "@/lib/brandAccent";
import { cn } from "@/lib/utils";

type InstructorCourse = {
  id: string;
  title: string;
  status: string;
  category?: string;
  level?: string;
  _count?: { lessons?: number; enrollments?: number };
};

type InstructorCourseBuilderPanelProps = {
  courses?: InstructorCourse[];
  isLoading?: boolean;
  onCreateCourse: () => void;
};

export function InstructorCourseBuilderPanel({
  courses = [],
  isLoading,
  onCreateCourse,
}: InstructorCourseBuilderPanelProps) {
  const navigate = useNavigate();

  const draftCourses = courses.filter(
    (course) => course.status === "draft" || course.status === "under_review"
  );

  return (
    <div className="space-y-4">
      <div className={cn(learnerPanel, "p-5")}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className={cn(learnerIconWell, "h-12 w-12 bg-orange-50")}>
              <Hammer className="h-6 w-6 text-dq-orange" />
            </div>
            <div>
              <h3 className={learnerSectionHeading}>Course builder workspace</h3>
              <p className={learnerBodyMuted}>
                Structure modules, add content, and prepare draft courses for marketplace review.
              </p>
            </div>
          </div>
          <Button className={cn(learnerBtnPrimary, "w-full shrink-0 sm:w-auto")} onClick={onCreateCourse}>
            <Plus className="mr-2 h-4 w-4" />
            New draft course
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className={learnerBodyMuted}>Loading draft courses...</p>
      ) : draftCourses.length > 0 ? (
        <div className="space-y-3">
          {draftCourses.map((course) => (
            <div
              key={course.id}
              className={cn(
                learnerPanel,
                "flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant={course.status === "draft" ? "secondary" : "default"}>
                    {course.status === "draft" ? "Draft" : "Under review"}
                  </Badge>
                  {course.category ? (
                    <span className="text-xs capitalize text-gray-500">{course.category}</span>
                  ) : null}
                </div>
                <h4 className={cn(learnerItemTitle, "mb-1")}>{course.title}</h4>
                <p className={learnerBodyMuted}>
                  {course._count?.lessons || 0} lessons
                  {course.level ? ` · ${course.level}` : ""}
                </p>
              </div>
              <Button
                variant="outline"
                className="shrink-0 rounded-full border-gray-200"
                onClick={() => navigate(`/courses/${course.id}/builder`)}
              >
                Open builder
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className={cn(learnerPanel, "p-10 text-center")}>
          <div className={cn(learnerIconWell, "mx-auto mb-4 h-16 w-16 bg-orange-50")}>
            <BookOpen className="h-8 w-8 text-dq-orange" />
          </div>
          <h3 className={cn(learnerEmptyTitle, "mb-2")}>No draft courses yet</h3>
          <p className={cn(learnerEmptyBody, "mb-5")}>
            Start a draft in the course builder or use AI Cockpit to outline your first course.
          </p>
          <Button className={learnerBtnPrimary} onClick={onCreateCourse}>
            <Plus className="mr-2 h-4 w-4" />
            Create draft course
          </Button>
        </div>
      )}
    </div>
  );
}

export default InstructorCourseBuilderPanel;
