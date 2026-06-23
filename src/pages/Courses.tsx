import { useSearchParams } from 'react-router-dom';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import {
  ExploreCoursesMarketplace,
  type ExploreViewerMode,
} from '@/components/dashboard/explore/ExploreCoursesMarketplace';
import { ButlerAI } from '@/components/butler/ButlerAI';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollments } from '@/hooks/useCourses';

function resolveViewerMode(
  isSignedIn: boolean,
  role: ReturnType<typeof useAuth>['role'],
): ExploreViewerMode {
  if (!isSignedIn) return 'public';
  if (role === 'instructor') return 'instructor';
  return 'learner';
}

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const { user, profile, role } = useAuth();
  const { data: enrollments } = useEnrollments();
  const viewerMode = resolveViewerMode(!!user, role);

  return (
    <PublicPageLayout>
      <main className="bg-gray-50 pt-16">
        <ExploreCoursesMarketplace
          initialCategory={categoryParam || 'all'}
          viewerMode={viewerMode}
          userName={profile?.full_name?.split(' ')[0] ?? 'Learner'}
          enrollments={viewerMode === 'learner' ? enrollments ?? [] : []}
        />
      </main>
      <ButlerAI />
    </PublicPageLayout>
  );
};

export default Courses;
