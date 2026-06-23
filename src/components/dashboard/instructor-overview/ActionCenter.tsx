import { Badge } from '@/components/ui/Badge';
import { CheckCircle } from 'lucide-react';
import type { InstructorTabId } from '@/components/dashboard/InstructorDashboardSidebar';
import {
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import {
  priorityStyles,
  type AttentionItem,
} from '@/lib/instructorDashboardData';
import { cn } from '@/lib/utils';

interface ActionCenterProps {
  items: AttentionItem[];
  onNavigate: (tab: InstructorTabId) => void;
}

export function ActionCenter({ items, onNavigate }: ActionCenterProps) {
  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Your Attention Needed</h3>

      {items.length === 0 ? (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-5">
          <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-medium text-dq-navy">You&apos;re all caught up.</p>
            <p className="text-sm text-gray-600">No pending instructor tasks.</p>
          </div>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.tab)}
                className={cn(
                  'flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-orange focus-visible:ring-offset-2',
                  priorityStyles(item.priority),
                )}
              >
                <span className="text-sm font-medium">
                  <Badge
                    variant="secondary"
                    className="mr-2 bg-white/80 text-xs font-bold"
                  >
                    {item.count}
                  </Badge>
                  {item.label}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide opacity-70">
                  {item.priority}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
