import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, Award } from "lucide-react";
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
    <section className="py-16 bg-[#F5F6FA]">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
            Courses for You
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19] mb-6">
            Find the Right Course for You
          </h2>
          <p className="text-base text-[#4B5563] max-w-3xl mx-auto leading-relaxed">
            Role-focused 6XD courses for every stage of your digital transformation journey.
          </p>
        </div>

        {/* Persona Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-8 relative">
            {/* Background line for all tabs */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E5E7EB]"></div>
            
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-base font-medium transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? "text-[#0B0C19]"
                    : "text-[#9CA3AF] hover:text-[#0B0C19]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff6b4d] z-10"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {coursesByPersona[activeTab].map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-lg transition-all group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#0B0C19] mb-2 line-clamp-2 group-hover:text-[#ff6b4d] transition-colors">
                  {course.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-[#4B5563] mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#ff6b4d] fill-[#ff6b4d]" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-[#9CA3AF]">({course.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#0B0C19]">${course.price}</span>
                    <span className="text-sm text-[#9CA3AF] line-through">${course.originalPrice}</span>
                  </div>
                  <Badge variant="outline" className="text-xs border-[#E5E7EB]">
                    {course.level}
                  </Badge>
                </div>
                {/* KHDA Badge - Moved below price */}
                <div className="flex items-center gap-1 px-3 py-1.5 bg-green-600 rounded-full w-fit">
                  <Award className="w-3 h-3 text-white" />
                  <span className="text-[12px] leading-[16px] font-medium text-white">KHDA Attested</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sub-section CTA */}
        <div className="flex justify-center">
          <Link
            to="/courses"
            className="text-[#ff6b4d] hover:text-[#e56045] font-medium text-base transition-colors inline-flex items-center gap-2"
          >
            See More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection2;
