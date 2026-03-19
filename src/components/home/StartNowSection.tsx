import { ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const StartNowSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#1e2348] via-[#1e2348] via-70% to-[#ff6b4d]">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
            Start Now
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Get These Skills Today and Thrive in the New Digital Economy
          </h2>
          <p className="text-base text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            The digital economy demands new competencies — DTMA delivers them through the 6XD framework and hybrid HI + AI faculty. Your competitive edge starts with your next course.
          </p>
        </div>

        {/* Credential Reinforcement */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-3xl mx-auto border border-white/20">
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              All DTMA courses award KHDA-attested credentials — recognized across the UAE and internationally.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            className="px-8 py-6 bg-[#ff6b4d] hover:bg-[#e56045] text-white border-transparent text-base gap-2"
          >
            Begin Your Journey
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StartNowSection;
