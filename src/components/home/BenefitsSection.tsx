import { Link } from "react-router-dom";

const BenefitsSection = () => {
  const problems = [
    {
      icon: "📋",
      title: "Trained, never applied",
      description: "Courses delivered without connection to live transformation projects or real execution contexts.",
    },
    {
      icon: "🧩",
      title: "Learning without a framework",
      description: "Skills taught in isolation — no structured methodology to connect strategy, technology, and people.",
    },
    {
      icon: "🔄",
      title: "No continuity",
      description: "One-off training events treated as disconnected interventions, with no capability-building system.",
    },
  ];

  return (
    <section className="py-20 bg-[#050d1e]">
      <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
        {/* Eyebrow */}
        <p className="text-xs font-semibold text-[#ff4500] uppercase tracking-widest mb-5">
          Why DTMA exists
        </p>

        {/* Headline */}
        <h2 className="text-[40px] md:text-[52px] leading-[1.1] font-bold text-white mb-4 max-w-3xl">
          75% of digital transformation initiatives fail to deliver.
        </h2>
        <p className="text-[16px] text-white/50 mb-14 max-w-lg">
          The root cause isn't strategy. It's a capability gap. The fix is structured learning.
        </p>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {problems.map((p, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-colors">
              <div className="text-2xl mb-4">{p.icon}</div>
              <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-sm text-white/40 text-center max-w-xl mx-auto">
          DTMA was founded to close this gap — with a methodology that treats digital capability building as a structured, continuous system.
        </p>
      </div>
    </section>
  );
};

export default BenefitsSection;
