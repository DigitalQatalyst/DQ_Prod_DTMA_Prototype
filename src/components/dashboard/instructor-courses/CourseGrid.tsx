import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import {
  filterTabToStatus,
  type HubCourseItem,
  type PipelineStage,
  type CourseFilterTab,
  type SortKey,
} from '@/lib/instructorCoursesHubData';
import { cn } from '@/lib/utils';
import { CourseCard } from './CourseCard';
import { CourseFilters } from './CourseFilters';

const PAGE_SIZE = 6;

interface CourseGridProps {
  courses: HubCourseItem[];
  search: string;
  onSearchChange: (v: string) => void;
  filterTab: CourseFilterTab;
  onFilterTabChange: (tab: CourseFilterTab) => void;
  sortKey: SortKey;
  onSortChange: (key: SortKey) => void;
  pipelineStage: PipelineStage | null;
  selectedIds: Set<string>;
  onToggleSelect: (id: string, checked: boolean) => void;
  onOpenCourse: (course: HubCourseItem) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  onAnalytics: () => void;
}

export function CourseGrid({
  courses,
  search,
  onSearchChange,
  filterTab,
  onFilterTabChange,
  sortKey,
  onSortChange,
  pipelineStage,
  selectedIds,
  onToggleSelect,
  onOpenCourse,
  onEdit,
  onDuplicate,
  onArchive,
  onAnalytics,
}: CourseGridProps) {
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(0);

  const categories = useMemo(
    () => [...new Set(courses.map((c) => c.category))],
    [courses],
  );

  const filtered = useMemo(() => {
    let list = [...courses];
    const statusFilter = filterTabToStatus(filterTab);
    if (statusFilter) list = list.filter((c) => c.status === statusFilter);
    if (pipelineStage) list = list.filter((c) => c.pipelineStage === pipelineStage);
    if (category !== 'all') list = list.filter((c) => c.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q),
      );
    }
    list.sort((a, b) => {
      if (sortKey === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortKey === 'enrolled') return b.enrollments - a.enrollments;
      if (sortKey === 'rating') return b.rating - a.rating;
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    });
    return list;
  }, [courses, filterTab, pipelineStage, category, search, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Course Library</h3>

      <CourseFilters
        search={search}
        onSearchChange={(v) => {
          onSearchChange(v);
          setPage(0);
        }}
        activeTab={filterTab}
        onTabChange={(t) => {
          onFilterTabChange(t);
          setPage(0);
        }}
        sortKey={sortKey}
        onSortChange={onSortChange}
        category={category}
        onCategoryChange={(v) => {
          setCategory(v);
          setPage(0);
        }}
        categories={categories}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pageItems.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            selected={selectedIds.has(course.id)}
            onSelect={(checked) => onToggleSelect(course.id, checked)}
            onOpen={() => onOpenCourse(course)}
            onEdit={() => onEdit(course.id)}
            onDuplicate={() => onDuplicate(course.id)}
            onArchive={() => onArchive(course.id)}
            onAnalytics={onAnalytics}
            onView={() => onOpenCourse(course)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          No courses match your filters.
        </p>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs text-gray-500">
            Page {page + 1} of {totalPages} · {filtered.length} courses
          </span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  );
}

export function SampleDataBanner() {
  return (
    <div
      className={cn(
        learnerPanel,
        'flex items-start gap-3 border-blue-200 bg-blue-50/50 p-4',
      )}
      role="note"
    >
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
      <p className="text-sm text-gray-700">
        Sample course data is shown below. Create your first course to manage your live
        portfolio.
      </p>
    </div>
  );
}
