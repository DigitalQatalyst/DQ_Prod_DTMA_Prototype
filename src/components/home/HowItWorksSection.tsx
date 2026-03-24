import { ArrowRight, Users, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  const personas = [
    {
      icon: Users,
      title: "Digital Workers",
      heading: "Understand How a DCO Works",
      description: "Learn how a Digital Cognitive Organization operates and what your role within it demands. Build the competencies to collaborate, adapt, and deliver in a digital-first environment.",
      link: "/personas/digital-workers",
      color: "#ff6b4d",
    },
    {
      icon: Zap,
      title: "Transformation Specialists & Teams",
      heading: "Deliver Successful Digital Initiatives",
      description: "Master the frameworks and methodologies that separate successful digital transformations from failed ones. Gain the execution skills to drive initiatives from strategy through to measurable outcomes.",
      link: "/personas/transformation-specialists",
      color: "#16a34a",
    },
    {
      icon: TrendingUp,
      title: "Organizational Leaders",
      heading: "Lead in the New Economy",
      description: "Understand what it takes to transition your organization into a Digital Cognitive Organization. Develop the strategic vision to lead confidently through Economy 4.0 and beyond.",
      link: "/personas/organizational-leaders",
      color: "#9333ea",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[12px] leading-[16px] font-medium text-[#ff6b4d] uppercase tracking-wide mb-4">
            How it Works
          </p>
          <h2 className="text-[28px] leading-[36px] font-semibold text-[#0B0C19] mb-6">
            Built Around the Challenges You Actually Face
          </h2>
          <p className="text-[16px] leading-[24px] font-normal text-[#4B5563] max-w-3xl mx-auto">
            Your role. Your challenge. Your learning path.
          </p>
        </div>

        {/* Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((persona, index) => {
            const Icon = persona.icon;
            return (
              <div
                key={index}
                className="bg-[#F5F6FA] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${persona.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: persona.color }} />
                </div>

                {/* Persona Title */}
                <p 
                  className="text-[12px] leading-[16px] font-medium uppercase tracking-wide mb-3"
                  style={{ color: persona.color }}
                >
                  {persona.title}
                </p>

                {/* Heading */}
                <h3 className="text-[20px] leading-[28px] font-medium text-[#0B0C19] mb-4">
                  {persona.heading}
                </h3>

                {/* Description */}
                <p className="text-[14px] leading-[20px] font-normal text-[#4B5563] mb-6 flex-grow">
                  {persona.description}
                </p>

                {/* CTA Link */}
                <Link
                  to={persona.link}
                  className="inline-flex items-center gap-2 font-medium text-[14px] leading-[20px] transition-colors"
                  style={{ color: persona.color }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
