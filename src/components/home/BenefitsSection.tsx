import { AlertTriangle, Layers, Eye } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: AlertTriangle,
      title: "A 75% Digital Transformation Failure Rate",
      description: "75% of digital transformation initiatives fail — not from poor strategy, but capability gaps. DTMA addresses the root causes: execution, culture, and alignment. Build the competencies that turn transformation ambition into measurable results.",
      cta: "Understand Why",
      link: "#",
    },
    {
      icon: Layers,
      title: "The 4x Parts of a DBP",
      description: "The Digital Business Platform integrates technology, data, experience, and operations into one engine. Leading organizations use it to gain a decisive edge in Economy 4.0. Discover the four-part framework behind their competitive dominance.",
      cta: "What Is It?",
      link: "#",
    },
    {
      icon: Eye,
      title: "The 6X Digital Perspectives (6XD)",
      description: "Six critical dimensions define how a Digital Cognitive Organization operates. These perspectives give you a structured lens to understand digital transformation holistically. Master them to build and thrive within the future of Economy 4.0.",
      credential: "Complete the six dimensions and earn credentials attested by KHDA, the Government of Dubai's education quality authority.",
      cta: "Upskill Now",
      link: "#",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Intro */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
            The DTMA Advantage
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            The Digital Economy Is Here. Are You Ready?
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover what a Digital Cognitive Organization is and how to become one. Learn to deliver successful digital initiatives with confidence. Understand what it takes to operate and thrive in Economy 4.0.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-start p-8 bg-[#f8f9fa] rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-[#ff6b4d] rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Heading */}
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                  {benefit.description}
                </p>

                {/* Credential Note (if exists) */}
                {benefit.credential && (
                  <p className="text-xs text-foreground/70 italic mb-4 p-3 bg-white rounded-lg border border-gray-200">
                    {benefit.credential}
                  </p>
                )}

                {/* CTA */}
                <a 
                  href={benefit.link}
                  className="text-[#ff6b4d] hover:text-[#e56045] font-medium text-sm transition-colors inline-flex items-center gap-2 mt-2"
                >
                  {benefit.cta}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
