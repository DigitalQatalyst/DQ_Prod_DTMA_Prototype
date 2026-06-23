import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { learnerBodyMuted, learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import type { RatingDistributionRow } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

export function RatingDistributionChart({
  distribution,
}: {
  distribution: RatingDistributionRow[];
}) {
  const total = distribution.reduce((sum, row) => sum + row.count, 0);

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')} aria-labelledby="rating-dist-heading">
      <h3 id="rating-dist-heading" className={cn(learnerSectionHeading, 'mb-4')}>
        Rating Distribution
      </h3>
      {distribution.length === 0 ? (
        <p className={learnerBodyMuted}>No rating data yet.</p>
      ) : (
        <div className="space-y-3">
          {distribution.map((row) => (
            <div key={row.stars} className="grid grid-cols-[88px_1fr_48px_56px] items-center gap-3">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn('h-3.5 w-3.5', i < row.stars ? 'fill-amber-500' : 'text-gray-200')}
                  />
                ))}
              </div>
              <Progress value={row.percent} className="h-2" />
              <span className="text-right text-sm font-medium text-dq-navy">{row.percent}%</span>
              <span className={cn(learnerBodyMuted, 'text-right text-xs')}>{row.count}</span>
            </div>
          ))}
          <p className={cn(learnerBodyMuted, 'pt-1 text-xs')}>{total} total reviews</p>
        </div>
      )}
    </section>
  );
}
