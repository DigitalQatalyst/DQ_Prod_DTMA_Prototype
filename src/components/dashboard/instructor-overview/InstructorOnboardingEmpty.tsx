import { CheckCircle, Circle, GraduationCap, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { InstructorTabId } from '@/components/dashboard/InstructorDashboardSidebar';
import {
  learnerBtnPrimary,
  learnerEmptyBody,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import type { OnboardingStep } from '@/lib/instructorDashboardData';
import { cn } from '@/lib/utils';

interface InstructorOnboardingEmptyProps {
  steps: OnboardingStep[];
  onCreateCourse: () => void;
  onNavigate: (tab: InstructorTabId) => void;
}

export function InstructorOnboardingEmpty({
  steps,
  onCreateCourse,
  onNavigate,
}: InstructorOnboardingEmptyProps) {
  return (
    <div className={cn(learnerPanel, 'mx-auto max-w-2xl p-8 text-center lg:p-12')}>
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
        <GraduationCap className="h-8 w-8 text-dq-orange" />
      </div>
      <h2 className="text-2xl font-semibold text-dq-navy">Welcome to DTMA</h2>
      <p className={cn(learnerEmptyBody, 'mx-auto mt-2 mb-8 max-w-md')}>
        You&apos;re just a few steps away from teaching.
      </p>

      <ul className="mb-8 space-y-3 text-left">
        {steps.map((step) => (
          <li
            key={step.id}
            className="flex items-center gap-3 rounded-lg border border-gray-100 px-4 py-3"
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
          onClick={() => onNavigate('getting-started')}
        >
          View Instructor Guide
        </Button>
      </div>
    </div>
  );
}
