import { Progress } from '@/components/ui/progress';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import type { EngagementMetric, InstructorDashboardSnapshot } from '@/lib/instructorDashboardData';
import { cn } from '@/lib/utils';

interface EngagementAnalyticsProps {
  metrics: EngagementMetric[];
  charts: InstructorDashboardSnapshot['engagementCharts'];
}

function MiniChart({
  title,
  data,
  color,
}: {
  title: string;
  data: { label: string; value: number }[];
  color: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <p className="mb-3 text-sm font-semibold text-dq-navy">{title}</p>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} />
            <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ r: 2, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function EngagementAnalytics({ metrics, charts }: EngagementAnalyticsProps) {
  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Learner Engagement Analytics</h3>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((m) => (
          <div key={m.id} className="rounded-xl bg-gray-50/80 px-3 py-3">
            <p className="text-xs text-gray-500">{m.label}</p>
            <p className="text-lg font-semibold text-dq-navy">{m.value}</p>
            {m.trend && (
              <Progress
                value={Math.min(100, (m.trend[m.trend.length - 1] / m.trend[0]) * 50)}
                className="mt-2 h-1"
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MiniChart title="Weekly Active Learners" data={charts.weeklyActive} color="#2563EB" />
        <MiniChart title="Assignment Completion" data={charts.assignmentCompletion} color="#10B981" />
        <MiniChart title="Attendance Trends" data={charts.attendance} color="#F59E0B" />
      </div>
    </section>
  );
}
