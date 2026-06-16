import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MeshSection from "@/components/layout/MeshSection";
import MarketingSection from "@/components/marketing/MarketingSection";
import SectionHeader from "@/components/marketing/SectionHeader";
import { eyebrowOnDark, linkAction, microLabel } from "@/lib/brandAccent";

const SixXDSection = () => {
  const dimensions = [
    {
      num: "01",
      tag: "DE",
      title: "Digital Economy",
      description:
        "Understand the forces reshaping industries, value chains, and competitive dynamics. Build the foundations to lead in Economy 4.0.",
      link: "/dimensions/digital-economy",
    },
    {
      num: "02",
      tag: "DCO",
      title: "Digital Cognitive Organisation",
      description:
        "The future organisation is intelligent and adaptive. Assess your organisation's cognitive maturity and chart the path to AI-powered agility.",
      link: "/dimensions/digital-cognitive-organisation",
    },
    {
      num: "03",
      tag: "DBP",
      title: "Digital Business Platform",
      description:
        "Build expertise in designing and orchestrating digital platforms that unify technology, data, experience, and operations.",
      link: "/dimensions/digital-business-platform",
    },
    {
      num: "04",
      tag: "DT2.0",
      title: "Digital Transformation 2.0",
      description:
        "Acquire methodologies to architect transformation targets and deploy change at enterprise scale, beyond traditional approaches.",
      link: "/dimensions/digital-transformation",
    },
    {
      num: "05",
      tag: "DW/WS",
      title: "Digital Worker & Workspace",
      description:
        "Redesign workforce models and environments so people can become the orchestrators of transformation, not obstacles to it.",
      link: "/dimensions/digital-worker-workspace",
    },
    {
      num: "06",
      tag: "DA",
      title: "Digital Accelerators",
      description:
        "Master the tools and methodologies that compress timescales, turning strategy into measurable results faster.",
      link: "/dimensions/digital-accelerators",
    },
  ];

  return (
    <>
      <MarketingSection>
        <SectionHeader
          eyebrowText="The 6XD Framework"
          title="Six dimensions. One transformation system."
          description="Every DTMA course maps to one of six critical dimensions of digital transformation, each building toward mastery."
        />

        <div className="grid grid-cols-1 gap-y-12 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((d) => (
            <div key={d.num} className="flex flex-col">
              <span className="mb-3 text-5xl font-semibold leading-none text-gray-200">{d.num}</span>
              <span className={`${microLabel} mb-2`}>{d.tag}</span>
              <h3 className="mb-3 text-[17px] font-semibold text-dq-navy">{d.title}</h3>
              <p className="mb-4 flex-grow text-sm leading-relaxed text-gray-600">{d.description}</p>
              <Link to={d.link} className={linkAction}>
                Explore dimension <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MeshSection variant="heroDark" className="py-24 px-5 text-white md:px-8 lg:px-10">
        <div className="relative z-10 mx-auto max-w-[1200px]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className={`${eyebrowOnDark} mb-4`}>The DTMA Ecosystem</p>
              <h2 className="text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
                One academy. <span className="text-white/50">Six transformation</span>
                <br />
                dimensions.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Every DTMA course shares the same 6XD framework, so they build on each other as a system,
              not a stack of isolated modules.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-4">
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
                className={`flex flex-col rounded-xl p-4 ${
                  item.highlight ? "bg-dq-orange text-white" : "border border-white/10 bg-white/5"
                }`}
              >
                <span
                  className={`mb-2 text-[9px] font-bold uppercase tracking-widest ${
                    item.highlight ? "text-white/70" : "text-dq-orange"
                  }`}
                >
                  {item.tag}
                </span>
                <span className="mb-1 text-[15px] font-semibold text-white">{item.title}</span>
                <span className={`text-[12px] ${item.highlight ? "text-white/80" : "text-white/40"}`}>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </MeshSection>
    </>
  );
};

export default SixXDSection;
