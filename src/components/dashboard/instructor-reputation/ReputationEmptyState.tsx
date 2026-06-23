import { Brain, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  learnerBody,
  learnerBtnPrimary,
  learnerEmptyBody,
  learnerEmptyTitle,
  learnerIconWell,
  learnerPanel,
} from '@/lib/brandAccent';
import type { ReputationOnboardingTip } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

interface ReputationEmptyStateProps {
  tips: ReputationOnboardingTip[];
  onViewCourses: () => void;
  onOpenAICoach: () => void;
}

export function ReputationEmptyState({
  tips,
  onViewCourses,
  onOpenAICoach,
}: ReputationEmptyStateProps) {
  return (
    <div className={cn(learnerPanel, 'p-8 text-center lg:p-12')}>
      <div className={cn(learnerIconWell, 'mx-auto mb-4 h-16 w-16 bg-amber-50')}>
        <Star className="h-8 w-8 text-amber-500" />
      </div>
      <h3 className={cn(learnerEmptyTitle, 'mb-2')}>No reviews yet</h3>
      <p className={cn(learnerEmptyBody, 'mx-auto mb-6 max-w-md')}>
        Reviews will appear as learners complete your courses and share feedback.
      </p>

      <div className="mx-auto mb-8 max-w-lg rounded-xl border border-gray-200 bg-gray-50/80 p-5 text-left">
        <p className="mb-3 text-sm font-semibold text-dq-navy">Tips to build your reputation</p>
        <ul className="space-y-2">
          {tips.map((tip) => (
            <li key={tip.id} className={cn(learnerBody, 'flex items-start gap-2 text-sm')}>
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-dq-orange" />
              {tip.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button className={learnerBtnPrimary} onClick={onViewCourses}>
          View active courses
        </Button>
        <Button variant="outline" className="rounded-full" onClick={onOpenAICoach}>
          <Brain className="mr-1.5 h-4 w-4" />
          Open AI Reputation Coach
        </Button>
      </div>
    </div>
  );
}
