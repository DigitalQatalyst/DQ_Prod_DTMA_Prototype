import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  FILTER_TABS,
  SORT_OPTIONS,
  type CourseFilterTab,
  type SortKey,
} from '@/lib/instructorCoursesHubData';
import { cn } from '@/lib/utils';

interface CourseFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  activeTab: CourseFilterTab;
  onTabChange: (tab: CourseFilterTab) => void;
  sortKey: SortKey;
  onSortChange: (key: SortKey) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  categories: string[];
}

export function CourseFilters({
  search,
  onSearchChange,
  activeTab,
  onTabChange,
  sortKey,
  onSortChange,
  category,
  onCategoryChange,
  categories,
}: CourseFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search courses..."
          className="rounded-full pl-9"
          aria-label="Search courses"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
              activeTab === tab.key
                ? 'bg-dq-navy text-white'
                : 'border border-gray-200 bg-white text-gray-600 hover:text-dq-navy',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-dq-orange"
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sortKey}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          className="rounded-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-dq-orange sm:ml-auto"
          aria-label="Sort courses"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
