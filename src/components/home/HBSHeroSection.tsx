import { MessageSquare, Pause } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const HBSHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="relative w-full text-white pt-24 pb-16 px-4 md:px-8 lg:px-12 min-h-screen flex flex-col justify-end overflow-hidden font-sans">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero vid (2).mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e2348] via-[#1e2348] via-70% to-[#ff6b4d] opacity-90 z-0"></div>

      {/* Container */}
      <div className="max-w-[1600px] mx-auto w-full relative z-10 flex flex-col items-center text-center pt-32 pb-24 px-8 md:px-12 lg:px-16">
        {/* Academy Label */}
        <p className="text-[14px] font-normal text-[#ff6b4d] mb-6 tracking-tight uppercase">
          Digital Transformation Management Academy
        </p>
        {/* Main Headline */}
        <h1 className="text-[40px] leading-[48px] font-semibold tracking-tight mb-6 max-w-6xl">
          Every Skill You Need to Succeed in the<br />New Digital Economy
        </h1>
        {/* Paragraph */}
        <p className="text-[18px] leading-[28px] font-normal max-w-3xl text-white/90 mb-6">
          DTMA equips leaders, transformation teams, and digital workers with the skills to thrive in Economy 4.0. Master what it takes to build, operate, and lead within a Digital Cognitive Organization — your journey starts here.
        </p>

        {/* Call to Actions */}
        <div className="flex items-center gap-4">
          <Button variant="hero" size="lg" className="px-8 py-6 bg-[#ff6b4d] hover:bg-[#e56045] text-white border-transparent text-base">
            Start Now
          </Button>
          <Button variant="hero" size="lg" className="px-8 py-6 bg-transparent hover:bg-white/10 text-white border-white text-base border-2">
            Explore Courses
          </Button>
          <Button variant="hero" size="lg" className="px-8 py-6 bg-transparent hover:bg-white/10 text-white border-white text-base border-2">
            Find Your Path
          </Button>
        </div>
      </div>

    </section>
  );
};

export default HBSHeroSection;
