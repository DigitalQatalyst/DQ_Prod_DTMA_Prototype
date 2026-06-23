import { Badge } from '@/components/ui/Badge';
import {
  learnerBadge,
  learnerBodyMuted,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import type { ImprovementRecommendation } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

const PRIORITY_STYLES = {
  high: 'bg-orange-50 text-dq-orange border-orange-200',
  medium: 'bg-amber-50 text-amber-800 border-amber-200',
  low: 'bg-gray-50 text-gray-700 border-gray-200',
} as const;

export function ImprovementRecommendations({
  items,
}: {
  items: ImprovementRecommendation[];
}) {
  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')} aria-labelledby="improvements-heading">
      <h3 id="improvements-heading" className={cn(learnerSectionHeading, 'mb-4')}>
        Recommended Improvements
      </h3>

      {items.length === 0 ? (
        <p className={learnerBodyMuted}>Recommendations will appear as review data grows.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-gray-100 bg-white p-4"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn(learnerBadge, PRIORITY_STYLES[item.priority])}
                >
                  {item.priority} priority
                </Badge>
              </div>
              <p className="text-sm font-medium text-dq-navy">{item.title}</p>
              <p className={cn(learnerBodyMuted, 'mt-2 text-sm')}>
                <span className="font-medium text-dq-navy">Recommendation: </span>
                {item.recommendation}
              </p>
              <p className="mt-2 text-xs font-medium text-emerald-700">
                Potential impact: {item.potentialImpact}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
