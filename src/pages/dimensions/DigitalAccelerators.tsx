import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen } from "lucide-react";

const DigitalAccelerators = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero - beige, left-aligned */}
      <section className="bg-[#f5f4f0] pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">
            When will you get there?
          </p>
          <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold text-[#0a0f1e] mb-5 max-w-3xl">
            Digital Accelerators <span className="text-[#ff4500]">DA</span>
          </h1>
          <p className="text-[17px] text-[#4a4a5a] max-w-2xl mb-8">
            Speed and precision separate successful transformations from stalled ones. Master the tools and methodologies that compress timescales and turn strategy into reality.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Content - white, left-aligned */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">Overview</p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold text-[#0a0f1e] mb-6">
              Accelerating Digital Transformation
            </h2>
            <p className="text-[17px] text-[#4a4a5a] leading-relaxed">
              Digital accelerators are the tools, methodologies, and approaches that compress transformation timelines and ensure rapid, measurable progress toward strategic goals.
            </p>
          </div>
        </div>
      </section>

      {/* CTA - dark */}
      <section className="py-20 bg-[#050d1e] relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255, 69, 0, 0.2) 0%, transparent 70%)' }}
        />
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16 text-center relative z-10">
          <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">Get Started</p>
          <h2 className="text-[40px] md:text-[52px] leading-[1.1] font-bold text-white mb-4 max-w-2xl mx-auto">
            Ready to Accelerate Your Transformation?
          </h2>
          <p className="text-[16px] text-white/50 mb-8">
            Learn the tools and methodologies that turn strategy into rapid, measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Explore Courses
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalAccelerators;
