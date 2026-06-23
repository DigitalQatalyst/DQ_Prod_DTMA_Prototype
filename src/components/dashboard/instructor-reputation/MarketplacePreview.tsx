import { Award, Star, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import {
  learnerBadge,
  learnerBodyMuted,
  learnerItemTitle,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import type { MarketplacePreviewData } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

export function MarketplacePreview({ data }: { data: MarketplacePreviewData }) {
  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')} aria-labelledby="marketplace-preview-heading">
      <h3 id="marketplace-preview-heading" className={cn(learnerSectionHeading, 'mb-4')}>
        Marketplace Profile Preview
      </h3>

      <div className="mb-5 flex flex-wrap items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
          <span className="text-2xl font-semibold text-dq-navy">
            {data.reviewCount > 0 ? data.instructorRating.toFixed(1) : '—'}
          </span>
          <span className={learnerBodyMuted}>instructor rating</span>
        </div>
        <div className={cn(learnerBodyMuted, 'text-sm')}>
          {data.reviewCount} review{data.reviewCount === 1 ? '' : 's'}
        </div>
        {data.marketplaceRank > 0 && (
          <div className="ml-auto flex items-center gap-2 text-sm font-medium text-dq-navy">
            <Trophy className="h-4 w-4 text-dq-orange" />
            {data.rankLabel}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold text-dq-navy">Top strengths</p>
          {data.topStrengths.length === 0 ? (
            <p className={cn(learnerBodyMuted, 'text-sm')}>Build reviews to surface strengths.</p>
          ) : (
            <ul className={cn(learnerBodyMuted, 'space-y-1 text-sm')}>
              {data.topStrengths.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-dq-navy">Most popular courses</p>
          {data.popularCourses.length === 0 ? (
            <p className={cn(learnerBodyMuted, 'text-sm')}>Publish courses to appear here.</p>
          ) : (
            <ul className="space-y-1">
              {data.popularCourses.map((course) => (
                <li key={course} className={cn(learnerItemTitle, 'text-sm')}>
                  {course}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {data.badges.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-dq-navy">Badges earned</p>
          <div className="flex flex-wrap gap-2">
            {data.badges.map((badge) => (
              <Badge key={badge.id} className={cn('gap-1 bg-orange-50 text-dq-orange', learnerBadge)}>
                <Award className="h-3 w-3" />
                {badge.label}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
