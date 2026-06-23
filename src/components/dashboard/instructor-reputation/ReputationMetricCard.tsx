import {
  Award,
  MessageSquare,
  Reply,
  Smile,
  Star,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import {
  learnerIconWell,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
} from '@/lib/brandAccent';
import type { ReputationMetric } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  star: Star,
  message: MessageSquare,
  reply: Reply,
  smile: Smile,
  award: Award,
  trending: TrendingUp,
};

export function ReputationMetricCard({ metric }: { metric: ReputationMetric }) {
  const Icon = ICON_MAP[metric.icon] ?? Star;

  return (
    <div className={cn(learnerKpiCard, 'p-5 transition-all duration-300 hover:shadow-md')}>
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
      {metric.subtext && <p className="mt-2 text-xs text-gray-500">{metric.subtext}</p>}
    </div>
  );
}

export function ReputationMetricsGrid({ metrics }: { metrics: ReputationMetric[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {metrics.map((metric) => (
        <ReputationMetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
