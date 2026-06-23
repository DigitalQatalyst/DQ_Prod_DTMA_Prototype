import {
  BookOpen,
  Calendar,
  Star,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerIconWell,
} from '@/lib/brandAccent';
import type { DashboardMetric } from '@/lib/instructorDashboardData';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  book: BookOpen,
  calendar: Calendar,
  target: Target,
  star: Star,
  trending: TrendingUp,
};

interface MetricCardProps {
  metric: DashboardMetric;
  loading?: boolean;
}

export function MetricCard({ metric, loading }: MetricCardProps) {
  const Icon = ICON_MAP[metric.icon] ?? Users;

  if (loading) {
    return (
      <div className={cn(learnerKpiCard, 'p-5')}>
        <Skeleton className="mb-4 h-10 w-10 rounded-lg" />
        <Skeleton className="mb-2 h-8 w-20" />
        <Skeleton className="h-4 w-28" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        learnerKpiCard,
        'p-5 transition-all duration-300 hover:shadow-md',
      )}
    >
      <div className={cn(learnerIconWell, 'mb-4 rounded-xl', metric.iconClass)}>
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div className={learnerKpiValue}>{metric.value}</div>
      <div className={learnerKpiLabel}>{metric.label}</div>
      {metric.trend && (
        <div
          className={cn(
            'mt-2 flex items-center gap-1 text-xs font-medium',
            metric.trendUp ? 'text-emerald-600' : 'text-gray-500',
          )}
        >
          {metric.trendUp && <TrendingUp className="h-3.5 w-3.5" />}
          <span>{metric.trend}</span>
        </div>
      )}
      {metric.subtext && (
        <p className="mt-2 text-xs text-gray-500">{metric.subtext}</p>
      )}
    </div>
  );
}

interface MetricGridProps {
  metrics: DashboardMetric[];
  loading?: boolean;
  monetizationEnabled?: boolean;
}

export function MetricGrid({
  metrics,
  loading,
  monetizationEnabled = true,
}: MetricGridProps) {
  const visible = monetizationEnabled
    ? metrics
    : metrics.filter((m) => m.id !== 'revenue');

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <MetricCard key={i} metric={visible[0] ?? metrics[0]} loading />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {visible.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
