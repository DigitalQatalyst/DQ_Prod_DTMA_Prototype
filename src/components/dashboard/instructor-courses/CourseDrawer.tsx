import { Brain, Edit, Eye, Send } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { openAIMentor } from '@/lib/aiMentor';
import {
  AI_COURSE_ACTIONS,
  statusBadgeClass,
  type HubCourseItem,
} from '@/lib/instructorCoursesHubData';
import {
  learnerBtnPrimary,
  learnerCaption,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

interface CourseDrawerProps {
  course: HubCourseItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onSubmitReview?: (id: string) => void;
}

export function CourseDrawer({
  course,
  open,
  onOpenChange,
  onEdit,
  onView,
  onSubmitReview,
}: CourseDrawerProps) {
  if (!course) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-left pr-8">{course.title}</SheetTitle>
        </SheetHeader>

        <img
          src={course.thumbnailUrl}
          alt=""
          className="mt-4 h-40 w-full rounded-xl object-cover"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className={cn('capitalize border', statusBadgeClass(course.status))}>
            {course.status.replace('_', ' ')}
          </Badge>
          <Badge variant="secondary">{course.category}</Badge>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h4 className={cn(learnerSectionHeading, 'mb-2 text-base')}>Course Overview</h4>
            <div className={cn(learnerCaption, 'grid grid-cols-2 gap-2')}>
              <span>Level: {course.level}</span>
              <span>Price: ${course.price}</span>
              <span>Lessons: {course.lessonCount}</span>
              <span>Updated: {course.lastUpdatedLabel}</span>
            </div>
          </div>

          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-gray-600">Enrollment</span>
              <span className="font-semibold text-dq-navy">{course.enrollments}</span>
            </div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-gray-600">Completion</span>
              <span className="font-semibold text-dq-navy">{course.completionRate}%</span>
            </div>
            <Progress value={course.completionRate} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-lg font-semibold text-dq-navy">
                {course.rating > 0 ? course.rating : '—'}
              </p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-lg font-semibold text-dq-navy">
                {course.revenue != null ? `$${course.revenue}` : '—'}
              </p>
              <p className="text-xs text-gray-500">Revenue</p>
            </div>
          </div>

          {course.reviewFeedback && (
            <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-3 text-sm text-gray-700">
              {course.reviewFeedback}
            </div>
          )}

          <div>
            <h4 className={cn(learnerSectionHeading, 'mb-2 text-base')}>AI Actions</h4>
            <div className="flex flex-wrap gap-1.5">
              {AI_COURSE_ACTIONS.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() =>
                    openAIMentor(`${action} for course: ${course.title}`)
                  }
                  className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-dq-navy hover:border-dq-orange/40 hover:bg-orange-50/50"
                >
                  <Brain className="mr-1 inline h-3 w-3 text-dq-orange" />
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
          <Button className={learnerBtnPrimary} size="sm" onClick={() => onView(course.id)}>
            <Eye className="mr-1.5 h-4 w-4" />
            View Course
          </Button>
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => onEdit(course.id)}>
            <Edit className="mr-1.5 h-4 w-4" />
            Edit
          </Button>
          {course.status === 'draft' && onSubmitReview && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => onSubmitReview(course.id)}
            >
              <Send className="mr-1.5 h-4 w-4" />
              Submit for Review
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
