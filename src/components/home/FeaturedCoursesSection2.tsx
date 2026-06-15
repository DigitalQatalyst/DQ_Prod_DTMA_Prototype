import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, ArrowRight } from "lucide-react";
import { dtmaCoursesNew } from "@/data/dtmaCoursesNew";

const stats = [
  { value: "31+", label: "Courses available" },
  { value: "6", label: "6XD dimensions covered" },
  { value: "3", label: "Learner personas" },
  { value: "KHDA", label: "Attested credentials" },
];

const FeaturedCoursesSection2 = () => {
  const [activeTab, setActiveTab] = useState("leaders");

  const coursesByPersona: Record<string, any[]> = {
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
    <>
      {/* Stats bar */}
      <section className="py-14 bg-white border-y border-[#e8e8ec]">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col border-l-2 border-[#ff4500] pl-4">
                <span className="text-[32px] font-bold text-[#0a0f1e] leading-none mb-1">{s.value}</span>
                <span className="text-[13px] text-[#6b6b7b]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
            <div>
              <p className="text-xs font-semibold text-[#ff4500] uppercase tracking-widest mb-3">
                Courses for you
              </p>
              <h2 className="text-[32px] md:text-[42px] font-bold text-[#0a0f1e] leading-[1.1]">
                Find the right course<br />for your role.
              </h2>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff4500] hover:text-[#cc3700] transition-colors"
            >
              View all courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#e8e8ec] mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-[14px] font-medium transition-all relative ${
                  activeTab === tab.id
                    ? "text-[#0a0f1e]"
                    : "text-[#9a9aaa] hover:text-[#0a0f1e]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4500]" />
                )}
              </button>
            ))}
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coursesByPersona[activeTab].map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group rounded-xl overflow-hidden border border-[#e8e8ec] hover:shadow-md transition-all"
              >
                <div className="aspect-video overflow-hidden bg-[#f5f4f0]">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[16px] font-semibold text-[#0a0f1e] mb-3 line-clamp-2 group-hover:text-[#ff4500] transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 text-[12px] text-[#9a9aaa] mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#ff4500] fill-[#ff4500]" />
                      <span className="font-medium text-[#0a0f1e]">{course.rating}</span>
                      <span>({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#e8e8ec]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[18px] font-bold text-[#0a0f1e]">${course.price}</span>
                      <span className="text-[12px] text-[#9a9aaa] line-through">${course.originalPrice}</span>
                    </div>
                    <span className="text-[11px] font-medium text-[#6b6b7b] bg-[#f5f4f0] px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedCoursesSection2;
