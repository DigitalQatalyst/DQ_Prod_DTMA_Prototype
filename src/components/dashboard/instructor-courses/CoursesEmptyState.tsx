import { BookOpen, Brain, CheckCircle, Circle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { InstructorTabId } from '@/components/dashboard/InstructorDashboardSidebar';
import {
  learnerBtnPrimary,
  learnerEmptyBody,
  learnerEmptyTitle,
  learnerPanel,
} from '@/lib/brandAccent';
import type { OnboardingStep } from '@/lib/instructorCoursesHubData';
import { cn } from '@/lib/utils';

interface CoursesEmptyStateProps {
  steps: OnboardingStep[];
  onCreateCourse: () => void;
  onNavigate: (tab: InstructorTabId) => void;
}

export function CoursesEmptyState({
  steps,
  onCreateCourse,
  onNavigate,
}: CoursesEmptyStateProps) {
  return (
    <div className={cn(learnerPanel, 'p-8 text-center lg:p-12')}>
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
        <BookOpen className="h-8 w-8 text-dq-orange" />
      </div>
      <h2 className={learnerEmptyTitle}>No Courses Yet</h2>
      <p className={cn(learnerEmptyBody, 'mx-auto mt-2 mb-8 max-w-md')}>
        Start building your first course and begin sharing your expertise with learners.
      </p>

      <ul className="mx-auto mb-8 max-w-sm space-y-2 text-left">
        {steps.map((step) => (
          <li
            key={step.id}
            className="flex items-center gap-3 rounded-lg border border-gray-100 px-4 py-2.5"
          >
            {step.completed ? (
              <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
            ) : (
              <Circle className="h-5 w-5 shrink-0 text-gray-300" />
            )}
            <span
              className={cn(
                'text-sm',
                step.completed ? 'text-gray-500 line-through' : 'font-medium text-dq-navy',
              )}
            >
              {step.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button className={learnerBtnPrimary} onClick={onCreateCourse}>
          <Plus className="mr-2 h-4 w-4" />
          Create Your First Course
        </Button>
        <Button
          variant="outline"
          className="rounded-full border-gray-200"
          onClick={() => onNavigate('ai-cockpit')}
        >
          <Brain className="mr-2 h-4 w-4" />
          Generate Course with AI
        </Button>
      </div>
    </div>
  );
}
