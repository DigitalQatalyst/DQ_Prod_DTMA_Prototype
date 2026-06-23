import { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { learnerBodyMuted, learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import type { ReputationSnapshot, TimelineRange } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

const RANGES: { id: TimelineRange; label: string }[] = [
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
  { id: '90d', label: '90 days' },
  { id: '12m', label: '12 months' },
  { id: 'all', label: 'All time' },
];

function MiniTrendChart({
  title,
  dataKey,
  color,
  data,
}: {
  title: string;
  dataKey: keyof ReputationSnapshot['timeline']['30d'][number];
  color: string;
  data: ReputationSnapshot['timeline']['30d'];
}) {
  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <p className="mb-3 text-sm font-semibold text-dq-navy">{title}</p>
      <div className="h-28">
        {data.length === 0 ? (
          <p className={cn(learnerBodyMuted, 'text-xs')}>No trend data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 2, fill: color }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export function ReputationTimeline({ timeline }: { timeline: ReputationSnapshot['timeline'] }) {
  const [range, setRange] = useState<TimelineRange>('30d');
  const data = timeline[range];

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')} aria-labelledby="reputation-trends-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 id="reputation-trends-heading" className={learnerSectionHeading}>
          Reputation Trends
        </h3>
        <div className="flex flex-wrap gap-2">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                range === r.id
                  ? 'border-dq-orange bg-orange-50 text-dq-orange'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300',
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MiniTrendChart title="Average Rating Over Time" dataKey="averageRating" color="#F59E0B" data={data} />
        <MiniTrendChart title="Review Volume" dataKey="reviewVolume" color="#FB5535" data={data} />
        <MiniTrendChart title="Sentiment Trend" dataKey="sentiment" color="#10B981" data={data} />
        <MiniTrendChart title="Response Rate Trend" dataKey="responseRate" color="#2563EB" data={data} />
        <MiniTrendChart title="Marketplace Ranking" dataKey="marketplaceRank" color="#7C3AED" data={data} />
      </div>
    </section>
  );
}
