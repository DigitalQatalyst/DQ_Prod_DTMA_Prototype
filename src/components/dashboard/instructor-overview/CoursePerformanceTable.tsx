import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart3, ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import type { InstructorTabId } from '@/components/dashboard/InstructorDashboardSidebar';
import {
  learnerBtnPrimary,
  learnerEmptyBody,
  learnerEmptyTitle,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import {
  statusBadgeClass,
  type CoursePerformanceRow,
} from '@/lib/instructorDashboardData';
import { cn } from '@/lib/utils';

type SortKey = 'name' | 'learners' | 'completion' | 'rating';

interface CoursePerformanceTableProps {
  courses: CoursePerformanceRow[];
  loading?: boolean;
  onNavigate: (tab: InstructorTabId) => void;
  onCreateCourse: () => void;
}

const PAGE_SIZE = 5;

export function CoursePerformanceTable({
  courses,
  loading,
  onNavigate,
  onCreateCourse,
}: CoursePerformanceTableProps) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('learners');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let list = courses.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );
    list = [...list].sort((a, b) => {
      const mul = sortAsc ? 1 : -1;
      if (sortKey === 'name') return mul * a.name.localeCompare(b.name);
      return mul * (a[sortKey] - b[sortKey]);
    });
    return list;
  }, [courses, search, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  if (!loading && courses.length === 0) {
    return (
      <section className={cn(learnerPanel, 'p-8 text-center')}>
        <BarChart3 className="mx-auto mb-3 h-10 w-10 text-gray-300" />
        <h3 className={learnerEmptyTitle}>No courses created yet.</h3>
        <p className={cn(learnerEmptyBody, 'mx-auto mt-2 mb-6 max-w-md')}>
          Create your first course to begin teaching.
        </p>
        <Button className={learnerBtnPrimary} onClick={onCreateCourse}>
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </section>
    );
  }

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className={learnerSectionHeading}>Your Courses</h3>
        <div className="relative max-w-xs flex-1 sm:max-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search courses…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="rounded-full pl-9"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort('name')}>
                Course Name
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort('learners')}>
                Learners
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort('completion')}>
                Completion
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => toggleSort('rating')}>
                Rating
              </th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((course) => (
              <tr key={course.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-3 py-3 font-medium text-dq-navy">{course.name}</td>
                <td className="px-3 py-3">{course.learners}</td>
                <td className="px-3 py-3">{course.completionRate}%</td>
                <td className="px-3 py-3">{course.rating > 0 ? course.rating : '—'}</td>
                <td className="px-3 py-3">
                  <Badge className={cn('text-xs capitalize', statusBadgeClass(course.status))}>
                    {course.status.replace('_', ' ')}
                  </Badge>
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-1">
                    <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => onNavigate('courses')}>
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => onNavigate('course-builder')}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => onNavigate('reviews')}>
                      Analytics
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {pageItems.map((course) => (
          <article key={course.id} className="rounded-xl border border-gray-100 p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <p className="font-medium text-dq-navy">{course.name}</p>
              <Badge className={cn('text-xs capitalize', statusBadgeClass(course.status))}>
                {course.status}
              </Badge>
            </div>
            <div className="mb-3 grid grid-cols-3 gap-2 text-xs text-gray-600">
              <span>{course.learners} learners</span>
              <span>{course.completionRate}% done</span>
              <span>{course.rating > 0 ? `${course.rating} ★` : '—'}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 rounded-full text-xs" onClick={() => onNavigate('courses')}>
                View Course
              </Button>
              <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => onNavigate('course-builder')}>
                Edit
              </Button>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
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
            Page {page + 1} of {totalPages}
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
