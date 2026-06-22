import { Link } from 'react-router-dom';
import { Star, Clock, BookOpen, Bot, Award } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { Course } from '@/data/dtmaCoursesNew';
import { getCourseMeta } from '@/lib/exploreCoursesData';
import {
  cardInteractive,
  learnerBadge,
  learnerBtnPrimary,
  learnerCaption,
  microLabel,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';
import { formatCategoryLabel } from '@/components/marketing/courseCardUtils';

function formatCategory(category: string) {
  return formatCategoryLabel(category).replace(/\b\w/g, (c) => c.toUpperCase());
}

export function MarketplaceCourseCard({
  course,
  highlighted,
  onCourseClick,
}: {
  course: Course;
  highlighted?: boolean;
  onCourseClick?: (courseId: string) => void;
}) {
  const meta = getCourseMeta(course.id);
  const discount =
    course.originalPrice > course.price
      ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
      : 0;

  const cardClass = cn(
    'group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300',
    highlighted ? 'border-dq-orange ring-2 ring-dq-orange/20' : 'border-gray-200',
    cardInteractive,
    course.comingSoon ? 'cursor-not-allowed opacity-80' : 'cursor-pointer',
  );

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
        <img
          src={course.image}
          alt=""
          className={cn(
            'h-full w-full object-cover',
            !course.comingSoon && 'transition-transform duration-300 group-hover:scale-105',
          )}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {course.badge && !course.comingSoon && (
            <Badge className="border-0 bg-dq-navy text-white">{course.badge}</Badge>
          )}
          {course.comingSoon && (
            <Badge className="border-0 bg-white text-dq-navy shadow-sm">Coming Soon</Badge>
          )}
        </div>
        <Badge
          variant="outline"
          className={cn('absolute bottom-3 right-3 border-gray-200 bg-white/95', learnerBadge)}
        >
          {course.level}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className={cn(microLabel, 'mb-1.5')}>{formatCategory(course.category)}</p>
        <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-dq-navy group-hover:text-dq-orange">
          {course.title}
        </h3>

        <div className={cn(learnerCaption, 'mb-3 flex flex-wrap items-center gap-x-3 gap-y-1')}>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-dq-orange text-dq-orange" />
            {course.rating} ({course.reviews})
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.modules.length} modules · {course.totalLessons} lessons
          </span>
        </div>

        <div className="mb-3 flex flex-wrap gap-1.5">
          <Badge variant="secondary" className={cn('gap-1', learnerBadge)}>
            <Award className="h-3 w-3" />
            {meta.capabilityPoints} Capability Points
          </Badge>
          <Badge variant="outline" className={cn('border-gray-200', learnerBadge)}>
            {meta.certificationContribution}
          </Badge>
          <Badge className={cn('gap-1 border-orange-200 bg-orange-50 text-dq-orange', learnerBadge)}>
            <Bot className="h-3 w-3" />
            AI Tutor Included
          </Badge>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-gray-100 pt-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-dq-navy">${course.price}</span>
              <span className="text-xs text-gray-400 line-through">${course.originalPrice}</span>
            </div>
            {discount > 0 && (
              <span className="text-xs font-medium text-green-600">Save {discount}%</span>
            )}
          </div>
          {!course.comingSoon && (
            <span className={cn(learnerBtnPrimary, 'pointer-events-none px-3 py-1.5 text-xs')}>
              View Course
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (course.comingSoon) {
    return <article className={cardClass}>{inner}</article>;
  }

  if (onCourseClick) {
    return (
      <article
        role="button"
        tabIndex={0}
        className={cardClass}
        onClick={() => onCourseClick(course.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCourseClick(course.id);
          }
        }}
      >
        {inner}
      </article>
    );
  }

  return (
    <Link to={`/courses/${course.id}`} className={cn('block h-full', cardClass)}>
      {inner}
    </Link>
  );
}
