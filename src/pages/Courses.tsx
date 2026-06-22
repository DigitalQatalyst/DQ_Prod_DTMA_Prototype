import { useSearchParams } from 'react-router-dom';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { ExploreCoursesMarketplace } from '@/components/dashboard/explore/ExploreCoursesMarketplace';
import { ButlerAI } from '@/components/butler/ButlerAI';

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  return (
    <PublicPageLayout>
      <main className="bg-gray-50 pt-16">
        <ExploreCoursesMarketplace initialCategory={categoryParam || 'all'} />
      </main>
      <ButlerAI />
    </PublicPageLayout>
  );
};

export default Courses;
