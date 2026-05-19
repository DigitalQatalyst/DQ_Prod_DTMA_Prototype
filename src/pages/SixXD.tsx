import { Zap, TrendingUp, Users, Lightbulb, Target, Layers, Brain, Rocket, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const SixXD = () => {
  const dimensions = [
    {
      title: "Digital Economy (DE)",
      subtitle: "Why should organisations change?",
      description: "The digital economy is redrawing industries, value chains, and competitive dynamics. Gain clarity to read these shifts and position your organisation for Economy 4.0.",
      icon: TrendingUp,
      link: "/dimensions/digital-economy",
    },
    {
      title: "Digital Cognitive Organisation (DCO)",
      subtitle: "Where are organisations headed?",
      description: "The future organisation is intelligent, adaptive, and data-driven. Assess your organisation's cognitive maturity and chart a path toward AI-powered agility.",
      icon: Brain,
      link: "/dimensions/digital-cognitive-organisation",
    },
    {
      title: "Digital Business Platform (DBP)",
      subtitle: "What unifies and orchestrates value?",
      description: "Every transformation needs an engine for business functions and enterprise integration. Build the expertise to evaluate, design, and orchestrate digital platforms.",
      icon: Layers,
      link: "/dimensions/digital-business-platform",
    },
    {
      title: "Digital Transformation 2.0 (DT2.0)",
      subtitle: "How to design and deploy the target?",
      description: "Traditional transformation approaches are no longer enough for today's demands. Acquire methodologies to architect target states and deploy transformation at scale.",
      icon: Zap,
      link: "/dimensions/digital-transformation",
    },
    {
      title: "Digital Worker & Workspace (DW/WS)",
      subtitle: "Who are the orchestrators?",
      description: "Technology alone doesn't transform organisations — people do. Redesign workforce models and cultivate the environments where transformation happens.",
      icon: Users,
      link: "/dimensions/digital-worker-workspace",
    },
    {
      title: "Digital Accelerators (DA)",
      subtitle: "When will you get there?",
      description: "Speed and precision separate successful transformations from stalled ones. Master the tools and methodologies that compress timescales and turn strategy into reality.",
      icon: Rocket,
      link: "/dimensions/digital-accelerators",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navy Background for Navbar and Hero */}
      <div className="bg-[var(--dq-navy-950)]">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[12px] leading-[16px] font-medium uppercase tracking-wide text-[var(--dq-orange-500)] mb-4">
                Framework & Methodology
              </p>
              <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-white mb-6">
                The 6XD Framework
              </h1>
              <p className="text-[16px] leading-[24px] font-normal text-white/90 max-w-2xl mx-auto">
                A comprehensive approach to digital transformation that addresses six critical dimensions of organizational change.
              </p>
            </div>
          </div>
        </section>
      </div>

      <main>

        {/* Overview Section */}
        <div className="max-w-[1600px] mx-auto px-8 py-16">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-6">Understanding the 6XD</h2>
            <p className="text-[var(--dq-text-secondary)] leading-relaxed mb-4">
              The 6XD framework represents six interconnected dimensions that organizations must address to successfully navigate digital transformation. Rather than viewing transformation as a single initiative, the 6XD recognizes that sustainable change requires coordinated efforts across multiple areas.
            </p>
            <p className="text-[var(--dq-text-secondary)] leading-relaxed">
              Each dimension builds upon the others, creating a holistic approach to transformation that drives lasting competitive advantage and organizational resilience.
            </p>
          </div>

          {/* Dimensions Grid */}
          <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-12">The Six Dimensions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dimensions.map((dimension, index) => (
              <Link
                key={index}
                to={dimension.link}
                className="bg-white rounded-xl p-6 border border-[var(--dq-surface-border-default)] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Icon */}
                <div className="mb-6">
                  <dimension.icon 
                    className="w-8 h-8 text-[var(--dq-navy-950)]" 
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[var(--dq-navy-950)] mb-2">
                  {dimension.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm font-medium text-[var(--dq-orange-500)] mb-4">
                  {dimension.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-[var(--dq-text-secondary)] leading-relaxed mb-6 flex-grow max-w-xs">
                  {dimension.description}
                </p>

                {/* Learn More CTA */}
                <span className="text-[var(--dq-orange-500)] hover:text-[var(--dq-orange-600)] font-medium text-sm transition-colors inline-flex items-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Integration Section */}
        <div className="bg-[var(--dq-navy-50)] py-16 px-8">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-8">How the Dimensions Work Together</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] p-8">
                <h3 className="text-lg font-bold text-[var(--dq-navy-950)] mb-4">Interconnected Approach</h3>
                <p className="text-[var(--dq-text-secondary)] leading-relaxed">
                  The 6XD dimensions are not siloed initiatives but interconnected elements that reinforce each other. Success in one dimension enables progress in others, creating a virtuous cycle of transformation.
                </p>
              </div>

              <div className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] p-8">
                <h3 className="text-lg font-bold text-[var(--dq-navy-950)] mb-4">Holistic Transformation</h3>
                <p className="text-[var(--dq-text-secondary)] leading-relaxed">
                  By addressing all six dimensions, organizations ensure that transformation is comprehensive and sustainable, rather than focusing narrowly on technology or process improvements alone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="bg-[var(--dq-navy-950)] py-20 px-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[12px] leading-[16px] font-semibold text-[var(--dq-orange-500)] uppercase tracking-wide mb-4">
                Learning Path
              </p>
              <h2 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-white mb-6">
                Master the 6XD Framework
              </h2>
              <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-on-dark-secondary)] mb-10">
                Explore our specialized courses designed to help you master each dimension of the 6XD framework and lead successful digital transformations.
              </p>
              <Link to="/courses">
                <button className="px-8 py-3 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white font-semibold text-[16px] leading-[24px] rounded-[8px] transition-colors">
                  Explore 6XD Courses
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SixXD;
