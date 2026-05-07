import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SixXD = () => {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-800)] to-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[12px] leading-[16px] font-medium uppercase tracking-wide text-[var(--dq-orange-500)] mb-4">
              The 6 Dimensions of Digital
            </p>
            <h1 className="text-[40px] leading-[48px] font-semibold text-white mb-6">
              A Structured Framework to Master Digital and AI
            </h1>
            <p className="text-[18px] leading-[28px] font-normal text-white/90 max-w-3xl mx-auto">
              Six critical perspectives define what it means to understand, build, and operate within a Digital Cognitive Organization. Each dimension maps to a dedicated course — seven in total, covering every competency you need.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)] mb-6">
              Why the 6XD Framework?
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)] mb-8">
              Digital transformation isn't a single initiative—it's a comprehensive shift across multiple dimensions. The 6XD framework provides a structured approach to understanding, planning, and executing transformation across your entire organization.
            </p>
          </div>
        </div>
      </section>

      {/* Dimensions Grid */}
      <section className="py-16 bg-[#F5F6FA]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dimensions.map((dimension, index) => (
              <Link
                key={index}
                to={dimension.link}
                className="bg-white rounded-xl p-6 border border-[var(--dq-surface-border-default)] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Color Bar */}
                <div
                  className="h-1 w-16 rounded-full mb-6"
                  style={{ backgroundColor: dimension.color }}
                ></div>

                {/* Title */}
                <h3 className="text-[20px] leading-[28px] font-medium text-[var(--dq-navy-950)] mb-2">
                  {dimension.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[14px] leading-[20px] font-medium text-[var(--dq-orange-500)] mb-4">
                  {dimension.subtitle}
                </p>

                {/* Description */}
                <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)] mb-6 flex-grow">
                  {dimension.description}
                </p>

                {/* Learn More CTA */}
                <span className="text-[var(--dq-orange-500)] hover:text-[var(--dq-orange-600)] font-medium text-[14px] leading-[20px] transition-colors inline-flex items-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)] mb-12 text-center">
              How the 6XD Framework Works
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[var(--dq-orange-500)] text-white flex items-center justify-center text-[16px] leading-[24px] font-medium">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] leading-[28px] font-medium text-[var(--dq-navy-950)] mb-2">Assess Your Current State</h3>
                  <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)]">
                    Understand where your organization stands across all six dimensions of digital maturity.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[var(--dq-orange-500)] text-white flex items-center justify-center text-[16px] leading-[24px] font-medium">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] leading-[28px] font-medium text-[var(--dq-navy-950)] mb-2">Build Targeted Capabilities</h3>
                  <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)]">
                    Take courses aligned to each dimension, building the specific skills your organization needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[var(--dq-orange-500)] text-white flex items-center justify-center text-[16px] leading-[24px] font-medium">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-[20px] leading-[28px] font-medium text-[var(--dq-navy-950)] mb-2">Execute with Confidence</h3>
                  <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)]">
                    Apply your learning to drive transformation initiatives with clarity and precision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SixXD;
