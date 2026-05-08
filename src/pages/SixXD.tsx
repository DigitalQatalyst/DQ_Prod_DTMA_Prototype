import { Zap, TrendingUp, Users, Lightbulb, Target, Layers } from "lucide-react";
import PublicPageLayout from "@/components/layout/PublicPageLayout";

const SixXD = () => {
  const dimensions = [
    {
      icon: Zap,
      title: "Digital Acceleration",
      description: "Drive rapid transformation through technology adoption and innovation",
      details: "Leverage cutting-edge technologies to accelerate business processes and create competitive advantages.",
    },
    {
      icon: TrendingUp,
      title: "Digital Business",
      description: "Transform business models and revenue streams",
      details: "Reimagine how your organization creates, delivers, and captures value in the digital economy.",
    },
    {
      icon: Users,
      title: "Digital Workforce",
      description: "Develop talent and capabilities for the digital age",
      details: "Build a workforce equipped with digital skills and mindsets to thrive in modern organizations.",
    },
    {
      icon: Lightbulb,
      title: "Digital Innovation",
      description: "Foster a culture of continuous innovation and experimentation",
      details: "Create an environment where new ideas flourish and digital solutions emerge organically.",
    },
    {
      icon: Target,
      title: "Digital Customer",
      description: "Deliver exceptional digital experiences to customers",
      details: "Understand and meet evolving customer expectations through digital-first engagement strategies.",
    },
    {
      icon: Layers,
      title: "Digital Organization",
      description: "Build agile, adaptive organizational structures",
      details: "Design organizations that are responsive, collaborative, and optimized for digital operations.",
    },
  ];

  return (
    <PublicPageLayout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-800)] to-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[12px] leading-[16px] font-medium uppercase tracking-wide text-[var(--dq-orange-500)] mb-4">
              Framework & Methodology
            </p>
            <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-white mb-6">
              The 6XD Framework
            </h1>
            <p className="text-[16px] leading-[24px] font-normal text-white/90 max-w-3xl mx-auto">
              A comprehensive approach to digital transformation that addresses six critical dimensions of organizational change.
            </p>
          </div>
        </div>
      </section>

        {/* Overview Section */}
        <div className="max-w-[1600px] mx-auto px-8 py-16">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-6">Understanding the 6XD</h2>
            <p className="text-[var(--dq-navy-600)] leading-relaxed mb-4">
              The 6XD framework represents six interconnected dimensions that organizations must address to successfully navigate digital transformation. Rather than viewing transformation as a single initiative, the 6XD recognizes that sustainable change requires coordinated efforts across multiple areas.
            </p>
            <p className="text-[var(--dq-navy-600)] leading-relaxed">
              Each dimension builds upon the others, creating a holistic approach to transformation that drives lasting competitive advantage and organizational resilience.
            </p>
          </div>

          {/* Dimensions Grid */}
          <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-12">The Six Dimensions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dimensions.map((dim, index) => {
              const Icon = dim.icon;
              return (
                <div
                  key={index}
                  className="bg-[var(--dq-navy-50)] border border-[var(--dq-navy-100)] rounded-[12px] p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-[var(--dq-orange-500)] rounded-[8px] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--dq-navy-950)] mb-2">
                    {dim.title}
                  </h3>
                  <p className="text-sm text-[var(--dq-orange-500)] font-semibold mb-3">
                    {dim.description}
                  </p>
                  <p className="text-[var(--dq-navy-600)] text-sm leading-relaxed">
                    {dim.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Integration Section */}
        <div className="bg-[var(--dq-navy-50)] py-16 px-8">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-8">How the Dimensions Work Together</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] p-8">
                <h3 className="text-lg font-bold text-[var(--dq-navy-950)] mb-4">Interconnected Approach</h3>
                <p className="text-[var(--dq-navy-600)] leading-relaxed">
                  The 6XD dimensions are not siloed initiatives but interconnected elements that reinforce each other. Success in one dimension enables progress in others, creating a virtuous cycle of transformation.
                </p>
              </div>

              <div className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] p-8">
                <h3 className="text-lg font-bold text-[var(--dq-navy-950)] mb-4">Holistic Transformation</h3>
                <p className="text-[var(--dq-navy-600)] leading-relaxed">
                  By addressing all six dimensions, organizations ensure that transformation is comprehensive and sustainable, rather than focusing narrowly on technology or process improvements alone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="max-w-[1600px] mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-12">Master the 6XD Framework</h2>

          <div className="bg-[var(--dq-orange-50)] border border-[var(--dq-orange-200)] rounded-[12px] p-8 text-center">
            <h3 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">
              Comprehensive Learning Programs
            </h3>
            <p className="text-[var(--dq-navy-600)] mb-8 max-w-2xl mx-auto">
              Explore our specialized courses designed to help you master each dimension of the 6XD framework and lead successful digital transformations.
            </p>
            <button className="px-8 py-3 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white font-semibold rounded-[8px] transition-colors">
              Explore 6XD Courses
            </button>
          </div>
        </div>
    </PublicPageLayout>
  );
};

export default SixXD;
