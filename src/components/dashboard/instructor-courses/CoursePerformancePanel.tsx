import { learnerLink, learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import type { PerformanceRow } from '@/lib/instructorCoursesHubData';
import { cn } from '@/lib/utils';

interface CoursePerformancePanelProps {
  rows: PerformanceRow[];
  onViewAnalytics: () => void;
  monetizationEnabled?: boolean;
}

export function CoursePerformancePanel({
  rows,
  onViewAnalytics,
  monetizationEnabled = true,
}: CoursePerformancePanelProps) {
  if (rows.length === 0) return null;

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className={learnerSectionHeading}>Top Performing Courses</h3>
        <button type="button" className={learnerLink} onClick={onViewAnalytics}>
          View Full Analytics
        </button>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="px-3 py-2">Course</th>
              <th className="px-3 py-2">Learners</th>
              <th className="px-3 py-2">Completion</th>
              <th className="px-3 py-2">Rating</th>
              {monetizationEnabled && <th className="px-3 py-2">Revenue</th>}
              <th className="px-3 py-2">Growth</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-3 py-3 font-medium text-dq-navy">{row.title}</td>
                <td className="px-3 py-3">{row.learners}</td>
                <td className="px-3 py-3">{row.completion}%</td>
                <td className="px-3 py-3">{row.rating > 0 ? `${row.rating} ★` : '—'}</td>
                {monetizationEnabled && (
                  <td className="px-3 py-3">
                    {row.revenue != null ? `$${row.revenue.toLocaleString()}` : '—'}
                  </td>
                )}
                <td className="px-3 py-3 font-medium text-emerald-600">{row.growth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <article key={row.id} className="rounded-xl border border-gray-100 p-4">
            <p className="font-medium text-dq-navy">{row.title}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-600">
              <span>{row.learners} learners</span>
              <span>{row.completion}%</span>
              <span>{row.rating} ★</span>
              <span className="text-emerald-600">{row.growth}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
