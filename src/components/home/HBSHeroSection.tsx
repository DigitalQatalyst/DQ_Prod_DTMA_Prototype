import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HBSHeroSection = () => {
  return (
    <section className="relative w-full bg-[#f5f4f0] pt-28 pb-16 px-8 md:px-12 lg:px-16 overflow-hidden font-sans">
      {/* Subtle background texture */}
      <div className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255, 107, 77, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Eyebrow */}
        <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">
          Digital Transformation Management Academy
        </p>

        {/* Headline */}
        <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold tracking-tight text-[#0a0f1e] mb-5 max-w-3xl">
          Every Skill to Succeed in the{" "}
          <span className="text-[#ff4500]">Digital Economy.</span>
        </h1>

        {/* Subtext */}
        <p className="text-[17px] leading-[1.6] text-[#4a4a5a] max-w-2xl mb-8">
          We equip leaders and digital teams with the skills to thrive in Economy 4.0.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0f1e] hover:bg-[#1a1f3e] text-white text-sm font-semibold rounded-full transition-colors"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 text-[#0a0f1e] text-sm font-semibold hover:text-[#ff4500] transition-colors"
          >
            Explore Courses
          </Link>
        </div>

        {/* Trust strip - auto-scrolling marquee */}
        <div className="mt-12 pt-8 border-t border-[#0a0f1e]/10">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9a9aaa] mb-4">
            Trusted by leading organisations
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {["ADIB", "QOB", "QNB", "Saudi Investment Bank", "UAE Ministry of Finance", "GITEX", "Abu Dhabi Digital Authority", "ADIB", "QOB", "QNB", "Saudi Investment Bank", "UAE Ministry of Finance", "GITEX", "Abu Dhabi Digital Authority"].map((org, i) => (
                <span key={i} className="text-[13px] font-medium text-[#9a9aaa] hover:text-[#0a0f1e] transition-colors cursor-default flex-shrink-0">{org}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HBSHeroSection;
