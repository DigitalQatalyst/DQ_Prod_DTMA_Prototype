import {
  Award,
  BarChart3,
  Calendar,
  Plus,
  Upload,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { InstructorTabId } from '@/components/dashboard/InstructorDashboardSidebar';
import { learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import type { QuickAction } from '@/lib/instructorDashboardData';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  plus: Plus,
  calendar: Calendar,
  users: Users,
  upload: Upload,
  chart: BarChart3,
  award: Award,
};

interface QuickActionGridProps {
  actions: QuickAction[];
  onNavigate: (tab: InstructorTabId) => void;
}

export function QuickActionGrid({ actions, onNavigate }: QuickActionGridProps) {
  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => {
          const Icon = ICON_MAP[action.icon] ?? Plus;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onNavigate(action.tab)}
              className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all duration-300 hover:border-dq-orange hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-orange focus-visible:ring-offset-2"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 transition-colors group-hover:bg-orange-50">
                <Icon className="h-5 w-5 text-dq-navy group-hover:text-dq-orange" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-dq-navy">{action.title}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
