import type { MetricCardData } from '@/lib/instructorAiCockpitData';
import { learnerKpiCard, learnerKpiLabel, learnerKpiValue } from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

export function PerformanceMetricCard({ data }: { data: MetricCardData }) {
  return (
    <div className={cn(learnerKpiCard, 'p-3')}>
      <p className={learnerKpiValue}>{data.value}</p>
      <p className={learnerKpiLabel}>{data.label}</p>
    </div>
  );
}
