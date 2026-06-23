import type { InsightCardData } from '@/lib/instructorAiCockpitData';
import { cn } from '@/lib/utils';

const TONE: Record<string, string> = {
  success: 'border-emerald-200 bg-emerald-50/80',
  info: 'border-blue-200 bg-blue-50/80',
  warning: 'border-amber-200 bg-amber-50/80',
};

export function InsightCard({ data }: { data: InsightCardData }) {
  return (
    <article
      className={cn(
        'rounded-xl border p-4',
        TONE[data.tone ?? 'info'],
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Insight
      </p>
      <h4 className="mt-1 text-sm font-semibold text-dq-navy">{data.title}</h4>
      <p className="mt-1 text-sm text-gray-600">{data.body}</p>
    </article>
  );
}
