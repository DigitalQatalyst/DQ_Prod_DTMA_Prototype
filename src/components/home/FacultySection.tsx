import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MarketingSection from "@/components/marketing/MarketingSection";
import SectionHeader from "@/components/marketing/SectionHeader";
import HorizontalTabs from "@/components/marketing/HorizontalTabs";
import { btnSecondary, cardInteractive } from "@/lib/brandAccent";

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
    specialization:
      "Digital Economy Strategist. Your go-to AI for understanding Economy 4.0 dynamics, analyzing industry disruption, crafting competitive positioning strategies, and innovating digital business models to thrive in the digital economy.",
  },
  {
    name: "Cognito",
    dimension: "Digital Cognitive Organisation",
    avatar: "/ai-operations.png",
    specialization:
      "Cognitive Organization Architect. Your go-to AI for designing intelligent organizations, implementing data-driven decision systems, assessing cognitive maturity, and building AI-powered operational agility.",
  },
  {
    name: "Nexus",
    dimension: "Digital Business Platform",
    avatar: "/ai-technology.png",
    specialization:
      "Platform Architecture Expert. Your go-to AI for designing digital business platforms, orchestrating enterprise integrations, managing API ecosystems, and building scalable digital infrastructure.",
  },
  {
    name: "Transform",
    dimension: "Digital Transformation 2.0",
    avatar: "/ai-culture.png",
    specialization:
      "Transformation Strategist. Your go-to AI for architecting target states, roadmapping transformation journeys, executing change methodologies, and delivering scaled transformation frameworks.",
  },
  {
    name: "Catalyst",
    dimension: "Digital Worker & Workspace",
    avatar: "/ai-innovation.png",
    specialization:
      "Workforce Transformation Specialist. Your go-to AI for transforming workforces, developing digital skills, designing hybrid work models, and building transformation-ready organizational cultures.",
  },
  {
    name: "Velocity",
    dimension: "Digital Accelerators",
    avatar: "/ai-trust.png",
    specialization:
      "Acceleration Expert. Your go-to AI for rapid delivery methodologies, transformation acceleration tools, agile execution frameworks, and time-compression strategies to speed up your transformation.",
  },
];

const FacultySection = () => {
  const [activeTab, setActiveTab] = useState<"human" | "ai">("ai");

  const tabs = [
    { id: "ai", label: "Artificial Intelligence" },
    { id: "human", label: "Human Intelligence" },
  ];

  return (
    <MarketingSection containerClassName="max-w-5xl">
      <SectionHeader
        align="center"
        eyebrowText="Meet Your Trainers"
        title="Learn from a Hybrid HI + AI Faculty"
        description="Human expertise meets AI specialists, one for each digital dimension."
      />

      <HorizontalTabs
        tabs={tabs}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id as "human" | "ai")}
      />

      {activeTab === "human" ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {humanFaculty.map((faculty) => (
            <div
              key={faculty.name}
              className={`group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card ${cardInteractive}`}
            >
              <div className="flex h-64 items-center justify-center overflow-hidden bg-gray-50">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className={`${
                    faculty.name === "Stephane"
                      ? "h-full w-full object-contain"
                      : "h-full w-full scale-110 object-cover transition-transform duration-500 group-hover:scale-[1.15]"
                  }`}
                />
              </div>
              <div className="p-6">
                <h4 className="mb-1 text-lg font-semibold text-dq-navy">{faculty.name}</h4>
                <p className="mb-3 text-sm font-medium text-dq-orange">{faculty.title}</p>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">{faculty.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {faculty.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-dq-navy"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiExperts.map((expert) => (
            <div
              key={expert.dimension}
              className={`group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card ${cardInteractive}`}
            >
              <div className="h-48 overflow-hidden bg-dq-navy">
                <img
                  src={expert.avatar}
                  alt={`${expert.dimension} AI Expert`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                  {expert.dimension}
                </p>
                <h4 className="mb-3 text-lg font-semibold text-dq-navy">{expert.name}</h4>
                <p className="text-sm leading-relaxed text-gray-600">{expert.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link to="/faculty" className={btnSecondary}>
          Discover More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </MarketingSection>
  );
};

export default FacultySection;
