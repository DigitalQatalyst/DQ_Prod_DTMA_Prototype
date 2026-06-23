import {
  ExploreCoursesMarketplace,
  type ExploreViewerMode,
} from '@/components/dashboard/explore/ExploreCoursesMarketplace';
import type { Enrollment } from '@/hooks/useCourses';
import type { LearnerTabId } from '@/components/dashboard/LearnerDashboardSidebar';
import type { InstructorTabId } from '@/components/dashboard/InstructorDashboardSidebar';

type CourseCatalogPanelProps = {
  embedded?: boolean;
  viewerMode?: ExploreViewerMode;
  initialCategory?: string;
  userName?: string;
  enrollments?: Enrollment[];
  onCourseClick?: (courseId: string) => void;
  onNavigate?: (tab: LearnerTabId | InstructorTabId) => void;
};

export function CourseCatalogPanel({
  embedded = false,
  viewerMode = 'learner',
  initialCategory = 'all',
  userName,
  enrollments,
  onCourseClick,
  onNavigate,
}: CourseCatalogPanelProps) {
  return (
    <ExploreCoursesMarketplace
      embedded={embedded}
      viewerMode={viewerMode}
      userName={userName}
      enrollments={enrollments}
      initialCategory={initialCategory}
      onCourseClick={onCourseClick}
      onNavigate={onNavigate}
    />
  );
}

export default CourseCatalogPanel;
