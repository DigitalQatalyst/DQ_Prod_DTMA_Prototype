import { useMemo, useState } from 'react';
import { FileText } from 'lucide-react';
import {
  learnerEmptyBody,
  learnerEmptyTitle,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import type { ContentPerformanceRow } from '@/lib/instructorDashboardData';
import { cn } from '@/lib/utils';

type SortKey = 'lesson' | 'views' | 'completionRate';

interface ContentPerformanceTableProps {
  rows: ContentPerformanceRow[];
}

export function ContentPerformanceTable({ rows }: ContentPerformanceTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('views');
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = useMemo(() => {
    const list = [...rows];
    const mul = sortAsc ? 1 : -1;
    return list.sort((a, b) => {
      if (sortKey === 'lesson') return mul * a.lesson.localeCompare(b.lesson);
      return mul * (a[sortKey] - b[sortKey]);
    });
  }, [rows, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  if (rows.length === 0) {
    return (
      <section className={cn(learnerPanel, 'p-8 text-center')}>
        <FileText className="mx-auto mb-3 h-10 w-10 text-gray-300" />
        <h3 className={learnerEmptyTitle}>No content analytics yet.</h3>
        <p className={cn(learnerEmptyBody, 'mx-auto mt-2 max-w-md')}>
          Complete assessments to unlock capability analytics.
        </p>
      </section>
    );
  }

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Top Performing Content</h3>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort('lesson')}>
                Lesson
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort('views')}>
                Views
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort('completionRate')}>
                Completion Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-3 py-3 font-medium text-dq-navy">{row.lesson}</td>
                <td className="px-3 py-3">{row.views.toLocaleString()}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${row.completionRate}%` }}
                      />
                    </div>
                    <span>{row.completionRate}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {sorted.map((row) => (
          <article key={row.id} className="rounded-xl border border-gray-100 p-4">
            <p className="mb-2 font-medium text-dq-navy">{row.lesson}</p>
            <div className="flex justify-between text-xs text-gray-600">
              <span>{row.views.toLocaleString()} views</span>
              <span>{row.completionRate}% completion</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
