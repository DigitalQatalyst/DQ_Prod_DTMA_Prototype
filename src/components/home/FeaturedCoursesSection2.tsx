import { useState } from "react";
import { Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedCoursesSection2 = () => {
  const [activeTab, setActiveTab] = useState("leaders");

  const courses = {
    leaders: [
      {
        title: "Digital Leadership Essentials",
        description: "Master the strategic frameworks needed to lead digital transformation initiatives and build high-performing digital teams.",
        dimension: "Leadership & Strategy",
        modules: 8,
        credential: "Foundation Credential",
      },
      {
        title: "Digital Business Platform Strategy",
        description: "Learn to architect and implement the four-part Digital Business Platform that drives competitive advantage in Economy 4.0.",
        dimension: "Platform Architecture",
        modules: 10,
        credential: "Advanced Credential",
      },
      {
        title: "Organizational Digital Maturity",
        description: "Assess and elevate your organization's digital capabilities across all six dimensions of the 6XD framework.",
        dimension: "Organizational Design",
        modules: 6,
        credential: "Foundation Credential",
      },
    ],
    specialists: [
      {
        title: "Digital Transformation Execution",
        description: "Develop the execution capabilities to turn transformation strategy into measurable business outcomes and sustained change.",
        dimension: "Execution & Delivery",
        modules: 12,
        credential: "Professional Credential",
      },
      {
        title: "Change Management for Digital",
        description: "Master the cultural and organizational change techniques that ensure digital initiatives succeed where others fail.",
        dimension: "Culture & Change",
        modules: 9,
        credential: "Professional Credential",
      },
      {
        title: "Digital Operating Model Design",
        description: "Design and implement operating models that enable agility, innovation, and continuous digital evolution.",
        dimension: "Operations & Processes",
        modules: 11,
        credential: "Advanced Credential",
      },
    ],
    workers: [
      {
        title: "Digital Worker Foundations",
        description: "Build essential digital skills and mindsets to thrive in a Digital Cognitive Organization and Economy 4.0.",
        dimension: "Digital Literacy",
        modules: 7,
        credential: "Foundation Credential",
      },
      {
        title: "Data-Driven Decision Making",
        description: "Learn to leverage data, analytics, and AI tools to make informed decisions and drive business value.",
        dimension: "Data & Analytics",
        modules: 8,
        credential: "Foundation Credential",
      },
      {
        title: "Digital Collaboration & Tools",
        description: "Master the digital tools and collaboration practices that power modern distributed and hybrid work environments.",
        dimension: "Digital Workspace",
        modules: 6,
        credential: "Foundation Credential",
      },
    ],
  };

  const tabs = [
    { id: "leaders", label: "Organizational Leaders" },
    { id: "specialists", label: "Transformation Specialists" },
    { id: "workers", label: "Digital Workers" },
  ];

  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
            Courses for You
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Find the Right Course for Where You Are
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            DTMA offers seven targeted courses built on the 6XD framework — each designed for your specific role and objectives. Find the right course for where you are in your digital transformation journey.
          </p>
        </div>

        {/* Persona Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-xl p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#ff6b4d] text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {courses[activeTab].map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* KHDA Badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">KHDA Attested</span>
                </div>
              </div>

              {/* Course Title */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                {course.description}
              </p>

              {/* 6XD Dimension */}
              <div className="flex items-center gap-2 mb-3 text-sm">
                <span className="font-medium text-foreground">6XD Dimension:</span>
                <span className="text-[#ff6b4d]">{course.dimension}</span>
              </div>

              {/* Module Count */}
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>{course.modules} Modules</span>
              </div>

              {/* Credential Tier */}
              <div className="mb-4 p-3 bg-[#f8f9fa] rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Counts toward:</p>
                <p className="text-sm font-medium text-foreground">{course.credential}</p>
              </div>

              {/* Certificate Note */}
              <p className="text-xs text-muted-foreground italic mb-4">
                KHDA-attested certificate included
              </p>

              {/* Enroll CTA */}
              <Button className="w-full bg-[#ff6b4d] hover:bg-[#e56045] text-white">
                Enroll Now
              </Button>
            </div>
          ))}
        </div>

        {/* Sub-section CTA */}
        <div className="flex justify-center mb-6">
          <a
            href="#"
            className="text-[#ff6b4d] hover:text-[#e56045] font-medium text-base transition-colors inline-flex items-center gap-2"
          >
            See More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Section CTA */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="px-8 py-6 border-2 border-[#ff6b4d] text-[#ff6b4d] hover:bg-[#ff6b4d] hover:text-white transition-all"
          >
            Explore All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection2;
