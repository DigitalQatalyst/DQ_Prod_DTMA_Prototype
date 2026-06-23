import {
  BookOpen,
  CheckCircle,
  Clock,
  Edit,
  Star,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  learnerIconWell,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
} from '@/lib/brandAccent';
import type { CourseMetric } from '@/lib/instructorCoursesHubData';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  book: BookOpen,
  check: CheckCircle,
  clock: Clock,
  edit: Edit,
  users: Users,
  star: Star,
  trending: TrendingUp,
};

interface CourseMetricCardProps {
  metric: CourseMetric;
  loading?: boolean;
}

export function CourseMetricCard({ metric, loading }: CourseMetricCardProps) {
  const Icon = ICON_MAP[metric.icon] ?? BookOpen;

  if (loading) {
    return (
      <div className={cn(learnerKpiCard, 'p-5')}>
        <Skeleton className="mb-4 h-10 w-10 rounded-lg" />
        <Skeleton className="mb-2 h-8 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  return (
    <div className={cn(learnerKpiCard, 'p-5 transition-all duration-300 hover:shadow-md')}>
      <div className={cn(learnerIconWell, 'mb-4 rounded-xl', metric.iconClass)}>
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div className={cn(learnerKpiValue, metric.valueClass)}>{metric.value}</div>
      <div className={learnerKpiLabel}>{metric.label}</div>
      {metric.trend && (
        <p className="mt-1 text-xs font-medium text-emerald-600">{metric.trend}</p>
      )}
      {metric.subtext && (
        <p className="mt-1 text-xs text-gray-500">{metric.subtext}</p>
      )}
    </div>
  );
}

export function CourseMetricsGrid({
  metrics,
  loading,
}: {
  metrics: CourseMetric[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CourseMetricCard key={i} metric={metrics[0]} loading />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-6">
      {metrics.map((m) => (
        <CourseMetricCard key={m.id} metric={m} />
      ))}
    </div>
  );
}
