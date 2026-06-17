import { useSearchParams } from "react-router-dom";
import PublicPageLayout from "@/components/layout/PublicPageLayout";
import MeshSection from "@/components/layout/MeshSection";
import { ButlerAI } from "@/components/butler/ButlerAI";
import { CourseCatalogPanel } from "@/components/dashboard/CourseCatalogPanel";
import { eyebrow, landingHeroHeading, sectionPaddingX } from "@/lib/brandAccent";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  return (
    <PublicPageLayout>
      <MeshSection variant="heroLight" grid className={`${sectionPaddingX} pt-20 md:pt-24 lg:pt-28 lg:pb-24`}>
        <div className="relative z-10 mx-auto flex min-h-[280px] max-w-4xl flex-col justify-center md:min-h-[360px]">
          <p className={`${eyebrow} mb-4`}>Browse Courses</p>
          <h1 className={`${landingHeroHeading} mb-6`}>
            Explore Our <span className="text-dq-orange">Courses</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-gray-600">
            Master the 6XD framework with expert-led courses built for the digital economy.
          </p>
        </div>
      </MeshSection>

      <main>
        <CourseCatalogPanel initialCategory={categoryParam || "all"} />
      </main>

      <ButlerAI />
    </PublicPageLayout>
  );
};

export default Courses;
