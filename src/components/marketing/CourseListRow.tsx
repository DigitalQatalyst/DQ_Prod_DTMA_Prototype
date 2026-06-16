import { Link } from "react-router-dom";
import { Star, Clock, BookOpen, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cardInteractive } from "@/lib/brandAccent";
import { cn } from "@/lib/utils";
import { CourseCardData, formatCategoryLabel } from "./courseCardUtils";

export default function CourseListRow({
  course,
  className,
}: {
  course: CourseCardData;
  className?: string;
}) {
  const rowClass = cn(
    "flex gap-6 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-card",
    cardInteractive,
    course.comingSoon ? "cursor-not-allowed opacity-75" : "group cursor-pointer",
    className
  );

  const content = (
    <>
      <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-xl">
        <img
          src={course.image}
          alt={course.title}
          className={cn(
            "h-full w-full object-cover",
            !course.comingSoon && "transition-transform duration-700 group-hover:scale-110"
          )}
        />
        {course.comingSoon ? (
          <div className="absolute left-1/2 top-2 -translate-x-1/2">
            <div className="rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-dq-navy shadow-md">
              Coming Soon
            </div>
          </div>
        ) : course.badge ? (
          <Badge className="absolute left-2 top-2 text-xs">{course.badge}</Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <div className="mb-3 flex items-center gap-2">
            {course.category ? (
              <Badge variant="secondary" className="text-[11px] font-semibold capitalize text-dq-orange">
                {formatCategoryLabel(course.category)}
              </Badge>
            ) : null}
            {course.level ? (
              <span className="text-[11px] font-semibold text-gray-600">{course.level}</span>
            ) : null}
          </div>
          <h3
            className={cn(
              "mb-2 text-lg font-semibold text-dq-navy",
              !course.comingSoon && "transition-colors group-hover:text-dq-orange"
            )}
          >
            {course.title}
          </h3>
          {course.description ? (
            <p className="mb-2 line-clamp-2 text-sm text-gray-600">{course.description}</p>
          ) : null}
          {course.instructor ? (
            <p className="text-sm text-gray-600">by {course.instructor}</p>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
          <div className="flex items-center gap-6 text-[13px] text-gray-600">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-dq-orange text-dq-orange" />
              <span className="font-semibold text-dq-navy">{course.rating}</span>
              <span>({course.reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {course.comingSoon
                ? "Content in development"
                : course.modules
                  ? `${course.modules.length} modules • ${course.totalLessons ?? 0} lessons`
                  : "Course content"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 line-through">${course.originalPrice}</span>
            <span className="text-lg font-semibold text-dq-navy">${course.price}</span>
            {!course.comingSoon ? (
              <ChevronRight className="h-5 w-5 text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-dq-orange" />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );

  if (course.comingSoon) {
    return <div className={rowClass}>{content}</div>;
  }

  return (
    <Link to={`/courses/${course.id}`} className={rowClass}>
      {content}
    </Link>
  );
}
