import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HBSHeroSection = () => {
  return (
    <section className="relative w-full text-white pt-24 pb-16 px-4 md:px-8 lg:px-12 min-h-screen flex flex-col justify-center overflow-hidden font-sans bg-[var(--dq-navy-950)]">
      {/* Container */}
      <div className="max-w-[1600px] mx-auto w-full relative z-10 flex flex-col items-center text-center pt-20 pb-24 px-8 md:px-12 lg:px-16">
        {/* Academy Label */}
        <p className="text-[12px] leading-[16px] font-medium text-[var(--dq-orange-500)] mb-6 tracking-wide uppercase">
          Digital Transformation Management Academy
        </p>

        {/* Main Headline */}
        <h1 className="text-[40px] leading-[48px] font-semibold tracking-tight mb-6 max-w-4xl mx-auto">
          Every Skill to Succeed in the Digital Economy
        </h1>

        {/* Paragraph */}
        <p className="text-[18px] leading-[28px] font-normal max-w-3xl mx-auto text-white/90 mb-10">
          We equip leaders and digital teams with the skills to thrive in Economy 4.0 and build Digital Cognitive Organizations.
        </p>

        {/* Call to Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="hero" size="lg" className="px-8 py-6 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white text-[16px] leading-[24px] font-normal" style={{ border: '1.5px solid transparent' }}>
            Start Now
          </Button>
          <Link to="/courses">
            <Button variant="hero" size="lg" className="px-8 py-6 bg-transparent hover:bg-white/10 text-white text-[16px] leading-[24px] font-normal" style={{ border: '1.5px solid white' }}>
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HBSHeroSection;
