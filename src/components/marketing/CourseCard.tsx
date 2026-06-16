import { Link } from "react-router-dom";
import { Star, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cardInteractive } from "@/lib/brandAccent";
import { cn } from "@/lib/utils";
import { CourseCardData, formatCategoryLabel } from "./courseCardUtils";

function CourseCardContent({ course }: { course: CourseCardData }) {
  return (
    <>
      <div className="relative aspect-video overflow-hidden bg-gray-50">
        <img
          src={course.image}
          alt={course.title}
          className={cn(
            "h-full w-full object-cover",
            !course.comingSoon && "transition-transform duration-300 group-hover:scale-105"
          )}
        />
        {course.comingSoon ? (
          <div className="absolute left-1/2 top-4 -translate-x-1/2">
            <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-dq-navy shadow-md">
              Coming Soon
            </div>
          </div>
        ) : course.badge ? (
          <Badge className="absolute left-3 top-3 rounded-full border-0 bg-dq-navy text-white">
            {course.badge}
          </Badge>
        ) : null}
      </div>

      <div className="p-5">
        {course.category ? (
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dq-orange">
            {formatCategoryLabel(course.category)}
          </p>
        ) : null}

        <h3
          className={cn(
            "mb-3 line-clamp-2 text-lg font-semibold leading-snug text-dq-navy",
            !course.comingSoon && "transition-colors group-hover:text-dq-orange"
          )}
        >
          {course.title}
        </h3>

        <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-dq-orange text-dq-orange" />
            <span className="font-semibold text-dq-navy">{course.rating}</span>
            <span>({course.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 text-xs text-gray-600">
          <BookOpen className="h-4 w-4" />
          <span>
            {course.comingSoon
              ? "Content in development"
              : course.modules
                ? `${course.modules.length} modules • ${course.totalLessons ?? 0} lessons`
                : "Course content"}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-dq-navy">${course.price}</span>
            <span className="text-xs text-gray-400 line-through">${course.originalPrice}</span>
          </div>
          {course.level ? (
            <Badge variant="outline" className="rounded-full border-gray-200 text-[11px] font-semibold">
              {course.level}
            </Badge>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default function CourseCard({
  course,
  className,
}: {
  course: CourseCardData;
  className?: string;
}) {
  const cardClass = cn(
    "group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card",
    cardInteractive,
    course.comingSoon ? "cursor-not-allowed opacity-75" : "cursor-pointer",
    className
  );

  if (course.comingSoon) {
    return (
      <div className={cardClass}>
        <CourseCardContent course={course} />
      </div>
    );
  }

  return (
    <Link to={`/courses/${course.id}`} className={cn("block", cardClass)}>
      <CourseCardContent course={course} />
    </Link>
  );
}
