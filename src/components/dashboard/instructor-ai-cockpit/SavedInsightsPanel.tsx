import { Bookmark, FileDown, ListTodo, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SAVED_INSIGHTS_MOCK } from '@/lib/instructorAiCockpitData';
import { learnerPanel } from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

export function SavedInsightsPanel() {
  return (
    <div className="space-y-3">
      {SAVED_INSIGHTS_MOCK.map((item) => (
        <article key={item.id} className={cn(learnerPanel, 'p-4')}>
          <p className="text-sm font-semibold text-dq-navy">{item.title}</p>
          <p className="text-xs text-gray-500">
            {item.agent} · Saved {item.savedAt}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" className="h-8 rounded-full px-2 text-xs">
              <Bookmark className="mr-1 h-3 w-3" />
              Save Insight
            </Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-full px-2 text-xs">
              <FileDown className="mr-1 h-3 w-3" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-full px-2 text-xs">
              <Share2 className="mr-1 h-3 w-3" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-full px-2 text-xs">
              <ListTodo className="mr-1 h-3 w-3" />
              Create Task
            </Button>
          </div>
        </article>
      ))}
      {SAVED_INSIGHTS_MOCK.length === 0 && (
        <p className="text-sm text-gray-500">No saved analyses yet.</p>
      )}
    </div>
  );
}

export function ReportsPanel() {
  return (
    <div className="space-y-2">
      {['Course Performance Report', 'Engagement Summary', 'Revenue Forecast Q3'].map(
        (report) => (
          <div
            key={report}
            className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2.5"
          >
            <span className="text-sm text-dq-navy">{report}</span>
            <Button variant="ghost" size="sm" className="text-xs">
              <FileDown className="mr-1 h-3 w-3" />
              Export
            </Button>
          </div>
        ),
      )}
    </div>
  );
}

export function HistoryPanel({
  entries,
}: {
  entries: { command: string; agent: string; time: string }[];
}) {
  if (entries.length === 0) {
    return <p className="text-sm text-gray-500">No command history yet.</p>;
  }
  return (
    <ul className="space-y-2">
      {entries.map((entry, i) => (
        <li key={`${entry.command}-${i}`} className="rounded-lg border border-gray-100 px-3 py-2">
          <p className="text-sm font-medium text-dq-navy">{entry.command}</p>
          <p className="text-xs text-gray-500">
            {entry.agent} · {entry.time}
          </p>
        </li>
      ))}
    </ul>
  );
}
