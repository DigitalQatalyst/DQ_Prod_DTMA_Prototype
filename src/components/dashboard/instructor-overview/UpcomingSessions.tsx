import { Calendar, Clock, Edit, Link2, Play, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import {
  learnerBtnPrimary,
  learnerEmptyBody,
  learnerEmptyTitle,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import type { UpcomingSession } from '@/lib/instructorDashboardData';
import { cn } from '@/lib/utils';

interface UpcomingSessionsProps {
  sessions: UpcomingSession[];
  onSchedule?: () => void;
}

export function UpcomingSessions({ sessions, onSchedule }: UpcomingSessionsProps) {
  if (sessions.length === 0) {
    return (
      <section className={cn(learnerPanel, 'p-8 text-center')}>
        <Calendar className="mx-auto mb-3 h-10 w-10 text-gray-300" />
        <h3 className={learnerEmptyTitle}>No sessions scheduled.</h3>
        <p className={cn(learnerEmptyBody, 'mx-auto mt-2 mb-6 max-w-md')}>
          Schedule your first live session.
        </p>
        <Button className={learnerBtnPrimary} onClick={onSchedule}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </section>
    );
  }

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Upcoming Sessions</h3>
      <ul className="space-y-3">
        {sessions.map((session) => (
          <li
            key={session.id}
            className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-dq-navy">{session.name}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span>{session.dateLabel}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {session.time}
                  </span>
                  {session.countdown && (
                    <>
                      <span>·</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {session.countdown}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className={cn(learnerBtnPrimary, 'text-xs')}>
                <Play className="mr-1 h-3.5 w-3.5" />
                Start Session
              </Button>
              <Button size="sm" variant="outline" className="rounded-full text-xs">
                <Edit className="mr-1 h-3.5 w-3.5" />
                Edit
              </Button>
              <Button size="sm" variant="ghost" className="text-xs">
                <Link2 className="mr-1 h-3.5 w-3.5" />
                Share Link
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
