import { ArrowRight } from "lucide-react";
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

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Button
            className="px-8 py-6 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white border-transparent text-base gap-2"
          >
            Begin Your Journey
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Credential Reinforcement */}
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            <img src="/KHDA.png" alt="KHDA" className="h-14 w-auto flex-shrink-0" />
            <div className="h-12 w-px bg-white/20 hidden sm:block"></div>
            <p className="text-sm text-white/80 leading-relaxed text-center sm:text-left">
              All DTMA courses award KHDA-attested, internationally recognized credentials.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartNowSection;
