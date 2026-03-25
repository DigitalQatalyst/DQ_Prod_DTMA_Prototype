import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const humanFaculty = [
  {
    name: "Stephane",
    title: "Digital Strategy Lead",
    bio: "Over 15 years driving enterprise digital transformations across EMEA. Specializes in cognitive organization design and strategic operating models.",
    expertise: ["Digital Strategy", "Cognitive Organizations", "Change Management"],
    image: "/st.png",
  },
  {
    name: "Kaylyn",
    title: "Innovation & Learning Architect",
    bio: "Passionate about designing future-ready learning experiences. Brings deep expertise in instructional design and digital capability building.",
    expertise: ["Learning Design", "Innovation Frameworks", "Capability Building"],
    image: "/ky.png",
  },
  {
    name: "Mark",
    title: "Technology & Transformation Advisor",
    bio: "Former CTO turned educator. Bridges the gap between emerging technology and practical business transformation.",
    expertise: ["Emerging Tech", "Enterprise Architecture", "Transformation Delivery"],
    image: "/mrk.png",
  },
];

const aiExperts = [
  {
    dimension: "Digital Economy (DE)",
    avatar: "/ai-leadership.png",
    color: "#ff6b4d",
    specialization: "Deep expertise in Economy 4.0 dynamics, industry shifts, and competitive positioning.",
    questions: "Why should organizations change? How is the digital economy reshaping industries?",
  },
  {
    dimension: "Digital Cognitive Organisation (DCO)",
    avatar: "/ai-operations.png",
    color: "#4f46e5",
    specialization: "Specialized knowledge in intelligent, adaptive, and data-driven organizational design.",
    questions: "Where are organizations headed? How do we build cognitive maturity?",
  },
  {
    dimension: "Digital Business Platform (DBP)",
    avatar: "/ai-technology.png",
    color: "#181C3A",
    specialization: "Expert guidance on platform architecture, integration, and orchestration strategies.",
    questions: "What unifies value creation? How do we design and deploy digital platforms?",
  },
  {
    dimension: "Digital Transformation 2.0 (DT2.0)",
    avatar: "/ai-culture.png",
    color: "#16a34a",
    specialization: "Advanced methodologies for architecting target states and deploying transformation at scale.",
    questions: "How do we design the target? What approaches work for modern transformation?",
  },
  {
    dimension: "Digital Worker & Workspace (DW/WS)",
    avatar: "/ai-innovation.png",
    color: "#dc2626",
    specialization: "Insights on workforce models, digital skills, and transformation-ready environments.",
    questions: "Who are the orchestrators? How do we redesign workforce and workspace?",
  },
  {
    dimension: "Digital Accelerators (DA)",
    avatar: "/ai-trust.png",
    color: "#9333ea",
    specialization: "Tools and methodologies that compress timescales and accelerate transformation delivery.",
    questions: "When will we get there? How do we speed up transformation execution?",
  },
];

const FacultySection = () => {
  const [activeTab, setActiveTab] = useState<"human" | "ai">("human");

  const tabs = [
    { id: "human" as const, label: "Human Intelligence" },
    { id: "ai" as const, label: "Artificial Intelligence" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
            Meet Your Trainers
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19] mb-6">
            Learn from a Hybrid HI + AI Faculty
          </h2>
          <p className="text-base text-[#4B5563] max-w-3xl mx-auto leading-relaxed">
            Human expertise meets AI specialists—one for each digital dimension.
          </p>
        </div>

        {/* Faculty Type Tabs */}
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

        {/* Human Faculty */}
        {activeTab === "human" && (
          <div className="mt-16 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {humanFaculty.map((faculty) => (
              <div
                key={faculty.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                {/* Photo */}
                <div className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className={`${
                      faculty.name === "Stephane" 
                        ? "w-full h-full object-contain" 
                        : "w-full h-full object-cover scale-110"
                    } group-hover:scale-[1.15] transition-transform duration-500`}
                  />
                </div>
                {/* Info */}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-[#0B0C19] mb-1">
                    {faculty.name}
                  </h4>
                  <p className="text-sm text-[#ff6b4d] font-medium mb-3">
                    {faculty.title}
                  </p>
                  <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                    {faculty.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {faculty.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-[#1e2348]/5 text-[#1e2348]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* AI Faculty */}
        {activeTab === "ai" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {aiExperts.map((expert) => (
              <div
                key={expert.dimension}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#ff6b4d]/20"
              >
                {/* Avatar Image */}
                <div className="h-48 overflow-hidden bg-[#1e2348]">
                  <img
                    src={expert.avatar}
                    alt={`${expert.dimension} AI Expert`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: expert.color }}
                    />
                    <h4 className="text-lg font-semibold text-[#0B0C19]">
                      {expert.dimension}
                    </h4>
                  </div>
                  <p className="text-sm text-[#4B5563] leading-relaxed mb-3">
                    {expert.specialization}
                  </p>
                  <p className="text-xs text-[#9CA3AF] italic">
                    "{expert.questions}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/faculty">
            <Button
              variant="outline"
              className="px-8 py-6 border-[#ff6b4d] text-[#ff6b4d] hover:bg-[#ff6b4d] hover:text-white transition-all text-base gap-2"
              style={{ borderWidth: '1.5px' }}
            >
              Discover More
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;

