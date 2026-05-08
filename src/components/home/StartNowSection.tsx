import { ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const StartNowSection = () => {
  return (
    <section className="py-20 bg-[var(--dq-navy-950)]">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[var(--dq-orange-500)] uppercase tracking-wide mb-4">
            Start Now
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Get the Skills to Thrive in the Digital Economy
          </h2>
          <p className="text-base text-white/80 max-w-3xl mx-auto leading-relaxed">
            DTMA equips talent for the digital economy through the 6XD framework and HI + AI learning.
          </p>
        </div>

        {/* Credential Reinforcement */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 my-10 max-w-3xl mx-auto border border-white/20">
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              All DTMA courses award KHDA-attested, internationally recognized credentials.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            className="px-8 py-6 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white border-transparent text-base gap-2"
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
