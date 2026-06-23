import {
  BarChart3,
  Brain,
  Copy,
  Layers,
  Plus,
  Upload,
  type LucideIcon,
} from 'lucide-react';
import type { InstructorTabId } from '@/components/dashboard/InstructorDashboardSidebar';
import { learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface CourseQuickActionsProps {
  onCreateCourse: () => void;
  onNavigate: (tab: InstructorTabId) => void;
  onDuplicate?: () => void;
}

export function CourseQuickActions({
  onCreateCourse,
  onNavigate,
  onDuplicate,
}: CourseQuickActionsProps) {
  const actions: QuickAction[] = [
    {
      id: 'create',
      title: 'Create New Course',
      description: 'Build a course from scratch',
      icon: Plus,
      onClick: onCreateCourse,
    },
    {
      id: 'ai',
      title: 'AI Course Builder',
      description: 'Use AI Cockpit to generate a course',
      icon: Brain,
      onClick: () => onNavigate('ai-cockpit'),
    },
    {
      id: 'import',
      title: 'Import Existing Course',
      description: 'Upload course structure',
      icon: Upload,
      onClick: onCreateCourse,
    },
    {
      id: 'duplicate',
      title: 'Duplicate Course',
      description: 'Reuse existing course templates',
      icon: Copy,
      onClick: onDuplicate ?? onCreateCourse,
    },
    {
      id: 'path',
      title: 'Create Learning Path',
      description: 'Bundle multiple courses',
      icon: Layers,
      onClick: () => onNavigate('course-builder'),
    },
    {
      id: 'analytics',
      title: 'View Course Analytics',
      description: 'Analyze course performance',
      icon: BarChart3,
      onClick: () => onNavigate('reviews'),
    },
  ];

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all duration-300 hover:border-dq-orange hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-orange"
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
