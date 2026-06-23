import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Bell, ChevronRight } from 'lucide-react';
import { learnerLink, learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import type { Announcement } from '@/lib/instructorDashboardData';
import { cn } from '@/lib/utils';

const CATEGORY_LABEL: Record<Announcement['category'], string> = {
  release: 'Release',
  tool: 'New Tool',
  feature: 'Feature',
  policy: 'Policy',
};

interface AnnouncementsPanelProps {
  announcements: Announcement[];
}

export function AnnouncementsPanel({ announcements }: AnnouncementsPanelProps) {
  const [items, setItems] = useState(announcements);

  const markRead = (id: string) => {
    setItems((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a)),
    );
  };

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className={cn(learnerSectionHeading, 'flex items-center gap-2')}>
          <Bell className="h-5 w-5 text-dq-orange" />
          Announcements & Updates
        </h3>
        <button type="button" className={learnerLink}>
          View all <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => markRead(item.id)}
              className={cn(
                'w-full rounded-xl border p-4 text-left transition hover:shadow-sm',
                item.read
                  ? 'border-gray-100 bg-white'
                  : 'border-blue-100 bg-blue-50/40',
              )}
            >
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">
                  {CATEGORY_LABEL[item.category]}
                </Badge>
                {!item.read && (
                  <span className="h-2 w-2 rounded-full bg-blue-600" aria-label="Unread" />
                )}
                <span className="ml-auto text-xs text-gray-500">{item.date}</span>
              </div>
              <p className="text-sm font-semibold text-dq-navy">{item.title}</p>
              <p className="mt-1 text-sm text-gray-600">{item.body}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
