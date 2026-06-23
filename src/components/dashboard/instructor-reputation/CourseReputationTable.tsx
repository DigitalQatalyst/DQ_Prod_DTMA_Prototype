import { useState } from 'react';
import { ArrowDown, ArrowUp, Minus, Star } from 'lucide-react';
import { learnerBodyMuted, learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import type { CourseReputationRow } from '@/lib/instructorReputationData';
import { sortCourseBreakdown } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

type SortKey = 'rating' | 'reviews' | 'sentiment' | 'response';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'rating', label: 'Rating' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'sentiment', label: 'Sentiment' },
  { key: 'response', label: 'Response rate' },
];

function TrendIcon({ trend }: { trend: CourseReputationRow['trend'] }) {
  if (trend === 'up') return <ArrowUp className="h-4 w-4 text-emerald-600" />;
  if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-gray-400" />;
}

export function CourseReputationTable({ rows }: { rows: CourseReputationRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('rating');
  const [asc, setAsc] = useState(false);

  const sorted = sortCourseBreakdown(rows, sortKey, asc);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setAsc(!asc);
    else {
      setSortKey(key);
      setAsc(false);
    }
  };

  return (
    <section className={cn(learnerPanel, 'overflow-hidden p-5 lg:p-6')} aria-labelledby="course-rep-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 id="course-rep-heading" className={learnerSectionHeading}>
          Course Reputation Performance
        </h3>
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => handleSort(opt.key)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium',
                sortKey === opt.key
                  ? 'border-dq-orange bg-orange-50 text-dq-orange'
                  : 'border-gray-200 text-gray-600',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <p className={learnerBodyMuted}>No course review data yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500">
                <th className="pb-3 pr-4 font-medium">Course</th>
                <th className="pb-3 pr-4 font-medium">Rating</th>
                <th className="pb-3 pr-4 font-medium">Reviews</th>
                <th className="pb-3 pr-4 font-medium">Sentiment</th>
                <th className="pb-3 pr-4 font-medium">Response</th>
                <th className="pb-3 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 pr-4 font-medium text-dq-navy">{row.courseName}</td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-dq-navy">
                      {row.rating.toFixed(1)}
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    </span>
                  </td>
                  <td className={cn(learnerBodyMuted, 'py-3 pr-4')}>{row.reviewCount}</td>
                  <td className={cn(learnerBodyMuted, 'py-3 pr-4')}>{row.sentimentScore}% positive</td>
                  <td className={cn(learnerBodyMuted, 'py-3 pr-4')}>{row.responseRate}%</td>
                  <td className="py-3">
                    <TrendIcon trend={row.trend} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
