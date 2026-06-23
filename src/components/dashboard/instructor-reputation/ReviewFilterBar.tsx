import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { ReviewFilterTab } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

const FILTER_TABS: { id: ReviewFilterTab; label: string }[] = [
  { id: 'all', label: 'All reviews' },
  { id: 'positive', label: 'Positive' },
  { id: 'neutral', label: 'Neutral' },
  { id: 'negative', label: 'Negative' },
  { id: 'unanswered', label: 'Unanswered' },
  { id: 'recent', label: 'Recent' },
  { id: 'highest', label: 'Highest rated' },
  { id: 'lowest', label: 'Lowest rated' },
];

interface ReviewFilterBarProps {
  activeTab: ReviewFilterTab;
  onTabChange: (tab: ReviewFilterTab) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export function ReviewFilterBar({
  activeTab,
  onTabChange,
  search,
  onSearchChange,
}: ReviewFilterBarProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search reviews..."
          className="rounded-full border-gray-200 pl-10"
          aria-label="Search reviews"
        />
      </div>
      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-none">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              activeTab === tab.id
                ? 'border-dq-orange bg-orange-50 text-dq-orange'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
