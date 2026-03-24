import { MessageSquare, Pause } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      <div className="max-w-[1600px] mx-auto w-full relative z-10 flex flex-col items-center text-center pt-[120px] pb-24 px-8 md:px-12 lg:px-16">
        {/* Academy Label */}
        <p className="text-[12px] leading-[16px] font-medium text-[#ff6b4d] mb-6 tracking-wide uppercase">
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

        {/* AI-Powered Search Bar */}
        <div className="w-full max-w-3xl mx-auto mb-10">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 shadow-lg hover:bg-white/15 transition-all">
            <MessageSquare className="w-5 h-5 text-[#ff6b4d] flex-shrink-0" />
            <input
              type="text"
              placeholder="Ask AI: What course should I take? What is 6XD? How do I get started?"
              className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-[16px] leading-[24px] font-normal"
            />
            <div className="flex items-center gap-2 px-4 py-2 bg-[#ff6b4d] hover:bg-[#e56045] rounded-lg transition-colors cursor-pointer">
              <span className="text-[14px] leading-[20px] font-medium text-white">Ask AI</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="hero" size="lg" className="px-8 py-6 bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[16px] leading-[24px] font-normal" style={{ border: '1.5px solid transparent' }}>
            Start Now
          </Button>
          <Link to="/courses">
            <Button variant="hero" size="lg" className="px-8 py-6 bg-transparent hover:bg-white/10 text-white text-[16px] leading-[24px] font-normal" style={{ border: '1.5px solid white' }}>
              Explore Courses
            </Button>
          </Link>
          <Link to="/6xd">
            <Button variant="hero" size="lg" className="px-8 py-6 bg-transparent hover:bg-white/10 text-white text-[16px] leading-[24px] font-normal" style={{ border: '1.5px solid white' }}>
              Find Your Path
            </Button>
          </Link>
        </div>
      </div>

    </section>
  );
};

export default HBSHeroSection;
