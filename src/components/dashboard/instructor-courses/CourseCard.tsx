import { Archive, BarChart3, Copy, Edit, Eye, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { learnerPanel } from '@/lib/brandAccent';
import {
  statusBadgeClass,
  type HubCourseItem,
} from '@/lib/instructorCoursesHubData';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: HubCourseItem;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onOpen: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onArchive: () => void;
  onAnalytics: () => void;
  onView: () => void;
}

export function CourseCard({
  course,
  selected,
  onSelect,
  onOpen,
  onEdit,
  onDuplicate,
  onArchive,
  onAnalytics,
  onView,
}: CourseCardProps) {
  return (
    <article
      className={cn(
        learnerPanel,
        'overflow-hidden transition-all duration-300 hover:shadow-md',
        selected && 'ring-2 ring-dq-orange/40',
      )}
    >
      <div className="relative">
        <img
          src={course.thumbnailUrl}
          alt=""
          className="h-36 w-full object-cover"
        />
        <div className="absolute left-3 top-3">
          <Checkbox
            checked={selected}
            onCheckedChange={(v) => onSelect(Boolean(v))}
            aria-label={`Select ${course.title}`}
            className="border-white bg-white/90"
          />
        </div>
        <Badge
          className={cn(
            'absolute right-3 top-3 border text-xs capitalize',
            statusBadgeClass(course.status),
          )}
        >
          {course.status.replace('_', ' ')}
        </Badge>
      </div>

      <div className="p-4">
        <button type="button" onClick={onOpen} className="text-left w-full">
          <h4 className="mb-1 text-base font-semibold text-dq-navy line-clamp-2">
            {course.title}
          </h4>
          <p className="mb-3 text-xs text-gray-500">{course.category}</p>
        </button>

        <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
          <span>{course.enrollments} Learners</span>
          <span>{course.completionRate > 0 ? `${course.completionRate}% Completion` : '—'}</span>
          <span>{course.rating > 0 ? `${course.rating} ★` : 'No rating'}</span>
          <span>Updated {course.lastUpdatedLabel}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Button size="sm" variant="outline" className="h-8 rounded-full text-xs" onClick={onView}>
            <Eye className="mr-1 h-3 w-3" />
            View
          </Button>
          <Button size="sm" variant="outline" className="h-8 rounded-full text-xs" onClick={onEdit}>
            <Edit className="mr-1 h-3 w-3" />
            Edit
          </Button>
          <Button size="sm" variant="outline" className="h-8 rounded-full text-xs" onClick={onAnalytics}>
            <BarChart3 className="mr-1 h-3 w-3" />
            Analytics
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onArchive}>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </article>
  );
}
