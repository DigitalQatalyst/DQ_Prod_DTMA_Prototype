import { ScrollArea } from '@/components/ui/scroll-area';
import { learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import type { CourseActivity } from '@/lib/instructorCoursesHubData';
import { cn } from '@/lib/utils';

export function CourseActivityFeed({ activities }: { activities: CourseActivity[] }) {
  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Recent Course Activity</h3>
      <ScrollArea className="h-[220px] pr-2">
        <ul className="space-y-3">
          {activities.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-3 border-b border-gray-50 pb-3 last:border-0"
            >
              <p className="text-sm text-dq-navy">{item.message}</p>
              <span className="shrink-0 text-xs text-gray-500">{item.timestamp}</span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </section>
  );
}
