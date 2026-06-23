import {
  Award,
  BookOpen,
  MessageSquare,
  Upload,
  UserPlus,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import type { LearnerActivityEvent } from '@/lib/instructorDashboardData';
import { cn } from '@/lib/utils';

const TYPE_ICON = {
  completion: BookOpen,
  submission: Upload,
  certificate: Award,
  enrollment: UserPlus,
  discussion: MessageSquare,
};

const TYPE_COLOR = {
  completion: 'bg-emerald-100 text-emerald-600',
  submission: 'bg-blue-100 text-blue-600',
  certificate: 'bg-amber-100 text-amber-600',
  enrollment: 'bg-purple-100 text-purple-600',
  discussion: 'bg-gray-100 text-gray-600',
};

interface LearnerActivityFeedProps {
  events: LearnerActivityEvent[];
}

export function LearnerActivityFeed({ events }: LearnerActivityFeedProps) {
  if (events.length === 0) {
    return (
      <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
        <h3 className={cn(learnerSectionHeading, 'mb-4')}>Recent Learner Activity</h3>
        <p className="text-sm text-gray-500">
          Complete your first lesson to begin tracking progress.
        </p>
      </section>
    );
  }

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Recent Learner Activity</h3>
      <ScrollArea className="h-[280px] pr-3">
        <ul className="relative space-y-0">
          {events.map((event, i) => {
            const Icon = TYPE_ICON[event.type];
            return (
              <li key={event.id} className="relative flex gap-3 pb-5">
                {i < events.length - 1 && (
                  <span
                    className="absolute left-[19px] top-10 h-full w-px bg-gray-200"
                    aria-hidden
                  />
                )}
                <div
                  className={cn(
                    'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                    TYPE_COLOR[event.type],
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-sm font-medium text-dq-navy">{event.message}</p>
                  <p className="text-xs text-gray-500">{event.timestamp}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </section>
  );
}
