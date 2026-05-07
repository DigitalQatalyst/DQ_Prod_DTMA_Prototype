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
    name: "Eco",
    dimension: "Digital Economy",
    avatar: "/ai-leadership.png",
    color: "var(--dq-navy-700)",
    specialization: "Digital Economy Strategist. Your go-to AI for understanding Economy 4.0 dynamics, analyzing industry disruption, crafting competitive positioning strategies, and innovating digital business models to thrive in the digital economy.",
    questions: "Why should organizations change? How is the digital economy reshaping industries?",
  },
  {
    name: "Cognito",
    dimension: "Digital Cognitive Organisation",
    avatar: "/ai-operations.png",
    color: "var(--dq-navy-600)",
    specialization: "Cognitive Organization Architect. Your go-to AI for designing intelligent organizations, implementing data-driven decision systems, assessing cognitive maturity, and building AI-powered operational agility.",
    questions: "Where are organizations headed? How do we build cognitive maturity?",
  },
  {
    name: "Nexus",
    dimension: "Digital Business Platform",
    avatar: "/ai-technology.png",
    color: "var(--dq-navy-500)",
    specialization: "Platform Architecture Expert. Your go-to AI for designing digital business platforms, orchestrating enterprise integrations, managing API ecosystems, and building scalable digital infrastructure.",
    questions: "What unifies value creation? How do we design and deploy digital platforms?",
  },
  {
    name: "Transform",
    dimension: "Digital Transformation 2.0",
    avatar: "/ai-culture.png",
    color: "var(--dq-navy-950)",
    specialization: "Transformation Strategist. Your go-to AI for architecting target states, roadmapping transformation journeys, executing change methodologies, and delivering scaled transformation frameworks.",
    questions: "How do we design the target? What approaches work for modern transformation?",
  },
  {
    name: "Catalyst",
    dimension: "Digital Worker & Workspace",
    avatar: "/ai-innovation.png",
    color: "var(--dq-orange-500)",
    specialization: "Workforce Transformation Specialist. Your go-to AI for transforming workforces, developing digital skills, designing hybrid work models, and building transformation-ready organizational cultures.",
    questions: "Who are the orchestrators? How do we redesign workforce and workspace?",
  },
  {
    name: "Velocity",
    dimension: "Digital Accelerators",
    avatar: "/ai-trust.png",
    color: "var(--dq-navy-800)",
    specialization: "Acceleration Expert. Your go-to AI for rapid delivery methodologies, transformation acceleration tools, agile execution frameworks, and time-compression strategies to speed up your transformation.",
    questions: "When will we get there? How do we speed up transformation execution?",
  },
];

const FacultySection = () => {
  const [activeTab, setActiveTab] = useState<"human" | "ai">("ai");

  const tabs = [
    { id: "ai" as const, label: "Artificial Intelligence" },
    { id: "human" as const, label: "Human Intelligence" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[var(--dq-orange-500)] uppercase tracking-wide mb-4">
            Meet Your Trainers
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--dq-navy-950)] mb-6">
            Learn from a Hybrid HI + AI Faculty
          </h2>
          <p className="text-base text-[var(--dq-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Human expertise meets AI specialists—one for each digital dimension.
          </p>
        </div>

        {/* Faculty Type Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-8 relative">
            {/* Background line for all tabs */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--dq-surface-border-default)]"></div>
            
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-base font-medium transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? "text-[var(--dq-navy-950)]"
                    : "text-[var(--dq-text-disabled)] hover:text-[var(--dq-navy-950)]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--dq-orange-500)] z-10"></span>
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
                className="bg-white rounded-xl overflow-hidden border border-[var(--dq-surface-border-default)] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Photo */}
                <div className="h-64 overflow-hidden bg-[var(--dq-gray-50)] flex items-center justify-center">
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
                  <h4 className="text-lg font-semibold text-[var(--dq-navy-950)] mb-1">
                    {faculty.name}
                  </h4>
                  <p className="text-sm text-[var(--dq-orange-500)] font-medium mb-3">
                    {faculty.title}
                  </p>
                  <p className="text-sm text-[var(--dq-text-secondary)] leading-relaxed mb-4">
                    {faculty.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {faculty.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-[var(--dq-navy-950)]/5 text-[var(--dq-navy-950)]"
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
                className="bg-white rounded-xl overflow-hidden border border-[var(--dq-surface-border-default)] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Avatar Image */}
                <div className="h-48 overflow-hidden bg-[var(--dq-navy-950)]">
                  <img
                    src={expert.avatar}
                    alt={`${expert.dimension} AI Expert`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: `var(${expert.color})` }}
                    />
                    <p className="text-xs font-medium text-[var(--dq-text-tertiary)] uppercase tracking-wide">
                      {expert.dimension}
                    </p>
                  </div>
                  <h4 className="text-lg font-semibold text-[var(--dq-navy-950)] mb-3">
                    {expert.name}
                  </h4>
                  <p className="text-sm text-[var(--dq-text-secondary)] leading-relaxed">
                    {expert.specialization}
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
              className="px-8 py-6 border-[var(--dq-orange-500)] text-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-500)] hover:text-white transition-all text-base gap-2"
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

