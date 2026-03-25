import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SixXDSection = () => {
  const dimensions = [
    {
      title: "Digital Economy (DE)",
      subtitle: "Why should organisations change?",
      description: "The digital economy is redrawing industries, value chains, and competitive dynamics. Gain clarity to read these shifts and position your organisation for Economy 4.0.",
      color: "#ff6b4d",
      link: "/dimensions/digital-economy",
    },
    {
      title: "Digital Cognitive Organisation (DCO)",
      subtitle: "Where are organisations headed?",
      description: "The future organisation is intelligent, adaptive, and data-driven. Assess your organisation's cognitive maturity and chart a path toward AI-powered agility.",
      color: "#4f46e5",
      link: "/dimensions/digital-cognitive-organisation",
    },
    {
      title: "Digital Business Platform (DBP)",
      subtitle: "What unifies and orchestrates value?",
      description: "Every transformation needs an engine for business functions and enterprise integration. Build the expertise to evaluate, design, and orchestrate digital platforms.",
      color: "#181C3A",
      link: "/dimensions/digital-business-platform",
    },
    {
      title: "Digital Transformation 2.0 (DT2.0)",
      subtitle: "How to design and deploy the target?",
      description: "Traditional transformation approaches are no longer enough for today's demands. Acquire methodologies to architect target states and deploy transformation at scale.",
      color: "#16a34a",
      link: "/dimensions/digital-transformation",
    },
    {
      title: "Digital Worker & Workspace (DW/WS)",
      subtitle: "Who are the orchestrators?",
      description: "Technology alone doesn't transform organisations — people do. Redesign workforce models and cultivate the environments where transformation happens.",
      color: "#dc2626",
      link: "/dimensions/digital-worker-workspace",
    },
    {
      title: "Digital Accelerators (DA)",
      subtitle: "When will you get there?",
      description: "Speed and precision separate successful transformations from stalled ones. Master the tools and methodologies that compress timescales and turn strategy into reality.",
      color: "#9333ea",
      link: "/dimensions/digital-accelerators",
    },
  ];

  return (
    <section className="py-16 bg-[#F5F6FA]">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
            The 6 Dimensions of Digital
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19] mb-6">
            A Framework to Master Digital & AI
          </h2>
          <p className="text-base text-[#4B5563] max-w-3xl mx-auto leading-relaxed">
            Six critical perspectives define how to understand, build, and operate a Digital Cognitive Organization, each mapped to a dedicated course.
          </p>
        </div>

        {/* Dimension Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {dimensions.map((dimension, index) => (
            <Link
              key={index}
              to={dimension.link}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Color Bar */}
              <div
                className="h-1 w-16 rounded-full mb-6"
                style={{ backgroundColor: dimension.color }}
              ></div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#0B0C19] mb-2">
                {dimension.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm font-medium text-[#ff6b4d] mb-4">
                {dimension.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-[#4B5563] leading-relaxed mb-6 flex-grow">
                {dimension.description}
              </p>

              {/* Learn More CTA */}
              <span className="text-[#ff6b4d] hover:text-[#e56045] font-medium text-sm transition-colors inline-flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        {/* Section CTA */}
        <div className="flex justify-center">
          <Link to="/6xd">
            <Button
              variant="outline"
              className="px-8 py-6 border-[#ff6b4d] text-[#ff6b4d] hover:bg-[#ff6b4d] hover:text-white transition-all text-base"
              style={{ borderWidth: '1.5px' }}
            >
              Explore the 6XD Framework
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SixXDSection;
