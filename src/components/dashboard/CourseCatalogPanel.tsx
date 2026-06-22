import { ExploreCoursesMarketplace } from '@/components/dashboard/explore/ExploreCoursesMarketplace';
import type { Enrollment } from '@/hooks/useCourses';
import type { LearnerTabId } from '@/components/dashboard/LearnerDashboardSidebar';

type CourseCatalogPanelProps = {
  embedded?: boolean;
  initialCategory?: string;
  userName?: string;
  enrollments?: Enrollment[];
  onCourseClick?: (courseId: string) => void;
  onNavigate?: (tab: LearnerTabId) => void;
};

export function CourseCatalogPanel({
  embedded = false,
  initialCategory = 'all',
  userName,
  enrollments,
  onCourseClick,
  onNavigate,
}: CourseCatalogPanelProps) {
  return (
    <ExploreCoursesMarketplace
      embedded={embedded}
      userName={userName}
      enrollments={enrollments}
      initialCategory={initialCategory}
      onCourseClick={onCourseClick}
      onNavigate={
        onNavigate
          ? (tab) => onNavigate(tab as LearnerTabId)
          : undefined
      }
    />
  );
}

export default CourseCatalogPanel;
