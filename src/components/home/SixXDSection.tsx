import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SixXDSection = () => {
  const dimensions = [
    {
      num: "01",
      tag: "DE",
      title: "Digital Economy",
      description: "Understand the forces reshaping industries, value chains, and competitive dynamics. Build the foundations to lead in Economy 4.0.",
      link: "/dimensions/digital-economy",
    },
    {
      num: "02",
      tag: "DCO",
      title: "Digital Cognitive Organisation",
      description: "The future organisation is intelligent and adaptive. Assess your organisation's cognitive maturity and chart the path to AI-powered agility.",
      link: "/dimensions/digital-cognitive-organisation",
    },
    {
      num: "03",
      tag: "DBP",
      title: "Digital Business Platform",
      description: "Build expertise in designing and orchestrating digital platforms that unify technology, data, experience, and operations.",
      link: "/dimensions/digital-business-platform",
    },
    {
      num: "04",
      tag: "DT2.0",
      title: "Digital Transformation 2.0",
      description: "Acquire methodologies to architect transformation targets and deploy change at enterprise scale — beyond traditional approaches.",
      link: "/dimensions/digital-transformation",
    },
    {
      num: "05",
      tag: "DW/WS",
      title: "Digital Worker & Workspace",
      description: "Redesign workforce models and environments so people can become the orchestrators of transformation, not obstacles to it.",
      link: "/dimensions/digital-worker-workspace",
    },
    {
      num: "06",
      tag: "DA",
      title: "Digital Accelerators",
      description: "Master the tools and methodologies that compress timescales — turning strategy into measurable results faster.",
      link: "/dimensions/digital-accelerators",
    },
  ];

  return (
    <>
      {/* Section 1: Six dimensions - white */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <p className="text-xs font-semibold text-[#ff4500] uppercase tracking-widest mb-5">
            The 6XD Framework
          </p>
          <div className="flex items-end justify-between mb-14 gap-8 flex-wrap">
            <h2 className="text-[36px] md:text-[48px] leading-[1.1] font-bold text-[#0a0f1e] max-w-xl">
              Six dimensions. One transformation system.
            </h2>
            <p className="text-[15px] text-[#6b6b7b] max-w-sm leading-relaxed">
              Every DTMA course maps to one of six critical dimensions of digital transformation — each building toward mastery.
            </p>
          </div>

          {/* Dimensions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {dimensions.map((d) => (
              <div key={d.num} className="flex flex-col">
                <span className="text-[52px] font-bold text-[#e8e8ec] leading-none mb-3">{d.num}</span>
                <span className="text-[10px] font-semibold text-[#ff4500] uppercase tracking-widest mb-2">{d.tag}</span>
                <h3 className="text-[17px] font-semibold text-[#0a0f1e] mb-3">{d.title}</h3>
                <p className="text-[14px] text-[#6b6b7b] leading-relaxed mb-4 flex-grow">{d.description}</p>
                <Link
                  to={d.link}
                  className="text-[13px] font-semibold text-[#ff4500] hover:text-[#cc3700] inline-flex items-center gap-1 transition-colors"
                >
                  Explore dimension <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Course ecosystem - dark */}
      <section className="py-20 bg-[#050d1e]">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="flex items-end justify-between mb-12 gap-8 flex-wrap">
            <div>
              <p className="text-xs font-semibold text-[#ff4500] uppercase tracking-widest mb-4">
                The DTMA Ecosystem
              </p>
              <h2 className="text-[36px] md:text-[48px] leading-[1.1] font-bold text-white">
                One academy. <span className="text-white/50">Six transformation</span><br />dimensions.
              </h2>
            </div>
            <p className="text-[14px] text-white/40 max-w-xs leading-relaxed">
              Every DTMA course shares the same 6XD framework — so they build on each other as a system, not a stack of isolated modules.
            </p>
          </div>

          {/* Course tiles */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { tag: "LEARN", title: "6XD Courses", desc: "Core capability uplift" },
              { tag: "CERTIFY", title: "KHDA Credentials", desc: "Internationally recognised" },
              { tag: "PRACTICE", title: "AI Faculty", desc: "HI + AI learning experience" },
              { tag: "APPLY", title: "Live Projects", desc: "Real-world transformation" },
              { tag: "TRACK", title: "Learning Paths", desc: "Role-based progression" },
              { tag: "MANAGE", title: "School Manager", desc: "Institutional operations" },
              { tag: "ASSESS", title: "Assessments", desc: "Knowledge validation" },
              { tag: "BUILD", title: "Your Journey →", desc: "Compose your own path", highlight: true },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 flex flex-col ${item.highlight ? 'bg-[#ff4500] text-white' : 'bg-white/5 border border-white/10'}`}
              >
                <span className={`text-[9px] font-bold uppercase tracking-widest mb-2 ${item.highlight ? 'text-white/70' : 'text-[#ff4500]'}`}>{item.tag}</span>
                <span className={`text-[15px] font-semibold mb-1 ${item.highlight ? 'text-white' : 'text-white'}`}>{item.title}</span>
                <span className={`text-[12px] ${item.highlight ? 'text-white/80' : 'text-white/40'}`}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SixXDSection;
