import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { dtmaCoursesNew } from "@/data/dtmaCoursesNew";
import MarketingSection from "@/components/marketing/MarketingSection";
import HorizontalTabs from "@/components/marketing/HorizontalTabs";
import CourseCard from "@/components/marketing/CourseCard";
import { eyebrow, linkAction, marketingSectionHeading } from "@/lib/brandAccent";

const FeaturedCoursesSection2 = () => {
  const [activeTab, setActiveTab] = useState("leaders");

  const coursesByPersona: Record<string, typeof dtmaCoursesNew> = {
    leaders: [
      dtmaCoursesNew.find((c) => c.id === "course-economy-40"),
      dtmaCoursesNew.find((c) => c.id === "course-transformation"),
      dtmaCoursesNew.find((c) => c.id === "course-cognitive-org"),
    ].filter(Boolean) as typeof dtmaCoursesNew,
    specialists: [
      dtmaCoursesNew.find((c) => c.id === "course-transformation"),
      dtmaCoursesNew.find((c) => c.id === "course-business-platforms"),
      dtmaCoursesNew.find((c) => c.id === "course-digital-accelerators"),
    ].filter(Boolean) as typeof dtmaCoursesNew,
    workers: [
      dtmaCoursesNew.find((c) => c.id === "course-digital-workers"),
      dtmaCoursesNew.find((c) => c.id === "course-economy-40"),
      dtmaCoursesNew.find((c) => c.id === "course-cognitive-org"),
    ].filter(Boolean) as typeof dtmaCoursesNew,
  };

  const tabs = [
    { id: "leaders", label: "Organizational Leaders" },
    { id: "specialists", label: "Transformation Specialists" },
    { id: "workers", label: "Digital Workers" },
  ];

  return (
    <MarketingSection>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className={`${eyebrow} mb-3`}>Courses for you</p>
          <h2 className={`${marketingSectionHeading} leading-[1.1]`}>
            Find the right course
            <br />
            for your role.
          </h2>
        </div>
        <Link to="/courses" className={linkAction}>
          View all courses <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <HorizontalTabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {coursesByPersona[activeTab].map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </MarketingSection>
  );
};

export default FeaturedCoursesSection2;
