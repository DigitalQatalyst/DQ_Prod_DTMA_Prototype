import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StartNowSection = () => {
  return (
    <section className="relative py-32 bg-[#050d1e] overflow-hidden">
      {/* Orange radial glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255, 69, 0, 0.25) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-8 lg:px-16 relative z-10 text-center">
        <p className="text-xs font-semibold text-[#ff4500] uppercase tracking-widest mb-6">
          Ready to begin
        </p>
        <h2 className="text-[40px] md:text-[60px] leading-[1.05] font-bold text-white mb-6 max-w-3xl mx-auto">
          Master digital transformation{" "}
          <span className="text-[#ff4500]">skills.</span>
        </h2>
        <p className="text-[16px] text-white/50 max-w-md mx-auto mb-10">
          From foundations to advanced practice. Every course KHDA-attested and ready to apply from day one.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-full border border-white/20 transition-colors"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StartNowSection;
