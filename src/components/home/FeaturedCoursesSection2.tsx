import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { dtmaCoursesNew } from "@/data/dtmaCoursesNew";

const FeaturedCoursesSection2 = () => {
  const [activeTab, setActiveTab] = useState("leaders");

  // Map courses to personas
  const coursesByPersona = {
    leaders: [
      dtmaCoursesNew.find(c => c.id === "course-economy-40"),
      dtmaCoursesNew.find(c => c.id === "course-transformation"),
      dtmaCoursesNew.find(c => c.id === "course-cognitive-org"),
    ].filter(Boolean),
    specialists: [
      dtmaCoursesNew.find(c => c.id === "course-transformation"),
      dtmaCoursesNew.find(c => c.id === "course-business-platforms"),
      dtmaCoursesNew.find(c => c.id === "course-digital-accelerators"),
    ].filter(Boolean),
    workers: [
      dtmaCoursesNew.find(c => c.id === "course-digital-workers"),
      dtmaCoursesNew.find(c => c.id === "course-economy-40"),
      dtmaCoursesNew.find(c => c.id === "course-cognitive-org"),
    ].filter(Boolean),
  };

  const tabs = [
    { id: "leaders", label: "Organizational Leaders" },
    { id: "specialists", label: "Transformation Specialists" },
    { id: "workers", label: "Digital Workers" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[var(--dq-orange-500)] uppercase tracking-wide mb-4">
            Courses for You
          </p>
          <h2 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-[var(--dq-navy-950)] mb-6">
            Find the Right Course for You
          </h2>
          <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)] max-w-3xl mx-auto">
            Role-focused 6XD courses for every stage of your digital transformation journey.
          </p>
        </div>

        {/* Persona Tabs - Left Aligned */}
        <div className="mb-12">
          <div className="flex gap-8 relative border-b border-[var(--dq-navy-100)]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-0 py-4 text-[14px] leading-[20px] font-medium transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? "text-[var(--dq-navy-950)]"
                    : "text-[var(--dq-text-secondary)] hover:text-[var(--dq-navy-950)]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--dq-orange-500)]"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {coursesByPersona[activeTab].map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="bg-white rounded-[12px] overflow-hidden border border-[var(--dq-navy-100)] hover:shadow-lg transition-all group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[18px] leading-[26px] font-semibold text-[var(--dq-navy-950)] mb-3 line-clamp-2 group-hover:text-[var(--dq-orange-500)] transition-colors">
                  {course.title}
                </h3>
                <div className="flex items-center gap-4 text-[12px] leading-[16px] text-[var(--dq-text-secondary)] mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[var(--dq-orange-500)] fill-[var(--dq-orange-500)]" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-[var(--dq-text-tertiary)]">({course.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--dq-navy-100)]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[20px] leading-[28px] font-bold text-[var(--dq-navy-950)]">${course.price}</span>
                    <span className="text-[12px] leading-[16px] text-[var(--dq-navy-400)] line-through">${course.originalPrice}</span>
                  </div>
                  <span className="text-[12px] leading-[16px] font-medium text-[var(--dq-text-secondary)] bg-[var(--dq-navy-50)] px-3 py-1 rounded-[6px]">
                    {course.level}
                  </span>
                </div>
                {/* KHDA Badge */}
                <div className="flex items-center gap-2 px-3 py-2 bg-[var(--dq-success)] rounded-[8px] w-fit">
                  <Award className="w-4 h-4 text-white" />
                  <span className="text-[12px] leading-[16px] font-semibold text-white">KHDA Attested</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sub-section CTA */}
        <div className="flex justify-center">
          <Link to="/courses">
            <Button
              variant="outline"
              className="px-8 py-6 border-[var(--dq-orange-500)] text-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-500)] hover:text-white transition-all text-base gap-2"
              style={{ borderWidth: '1.5px' }}
            >
              See More
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection2;
