import { TrendingUp, Brain, Layers, Zap, Users, Rocket, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#f5f4f0] pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">
            Framework & Methodology
          </p>
          <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold text-[#0a0f1e] mb-5 max-w-3xl">
            The <span className="text-[#ff4500]">6XD Framework.</span>
          </h1>
          <p className="text-[17px] text-[#4a4a5a] max-w-2xl">
            A comprehensive approach to digital transformation that addresses six critical dimensions of organizational change.
          </p>
        </div>
      </section>

      <main>
        {/* Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="max-w-3xl mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">Overview</p>
              <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold text-[#0a0f1e] mb-6">
                Understanding the <span className="text-[#ff4500]">6XD</span>
              </h2>
              <p className="text-[17px] text-[#4a4a5a] leading-relaxed mb-4">
                The 6XD framework represents six interconnected dimensions that organizations must address to successfully navigate digital transformation. Rather than viewing transformation as a single initiative, the 6XD recognizes that sustainable change requires coordinated efforts across multiple areas.
              </p>
              <p className="text-[17px] text-[#4a4a5a] leading-relaxed">
                Each dimension builds upon the others, creating a holistic approach to transformation that drives lasting competitive advantage and organizational resilience.
              </p>
            </div>

            {/* Dimensions Grid */}
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">The Dimensions</p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold text-[#0a0f1e] mb-10">
              The Six <span className="text-[#ff4500]">Dimensions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dimensions.map((dimension, index) => (
                <Link
                  key={index}
                  to={dimension.link}
                  className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="mb-5">
                    <dimension.icon className="w-7 h-7 text-[#ff4500]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#0a0f1e] mb-2">{dimension.title}</h3>
                  <p className="text-[13px] font-semibold text-[#ff4500] mb-3">{dimension.subtitle}</p>
                  <p className="text-[14px] text-[#4a4a5a] leading-relaxed mb-5 flex-grow">{dimension.description}</p>
                  <span className="text-[13px] font-semibold text-[#ff4500] group-hover:text-[#cc3700] inline-flex items-center gap-1 transition-colors">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-20 bg-[#f5f4f0]">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">Integration</p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold text-[#0a0f1e] mb-10">
              How the Dimensions <span className="text-[#ff4500]">Work Together</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all">
                <h3 className="text-[18px] font-bold text-[#0a0f1e] mb-3">Interconnected Approach</h3>
                <p className="text-[#4a4a5a] leading-relaxed">
                  The 6XD dimensions are not siloed initiatives but interconnected elements that reinforce each other. Success in one dimension enables progress in others, creating a virtuous cycle of transformation.
                </p>
              </div>
              <div className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all">
                <h3 className="text-[18px] font-bold text-[#0a0f1e] mb-3">Holistic Transformation</h3>
                <p className="text-[#4a4a5a] leading-relaxed">
                  By addressing all six dimensions, organizations ensure that transformation is comprehensive and sustainable, rather than focusing narrowly on technology or process improvements alone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#050d1e] relative overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255, 69, 0, 0.2) 0%, transparent 70%)' }} />
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16 text-center relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">Learning Path</p>
            <h2 className="text-[40px] md:text-[52px] leading-[1.1] font-bold text-white mb-4 max-w-2xl mx-auto">
              Master the 6XD Framework
            </h2>
            <p className="text-[16px] text-white/50 mb-8 max-w-xl mx-auto">
              Explore our specialized courses designed to help you master each dimension of the 6XD framework and lead successful digital transformations.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors"
            >
              Explore 6XD Courses
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SixXD;
