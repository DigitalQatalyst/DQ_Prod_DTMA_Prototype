import { MessageSquare, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const HBSHeroSection = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Handle message sending
      setInputValue("");
    }
  };

  return (
    <section className="relative w-full text-white pt-24 pb-16 px-4 md:px-8 lg:px-12 min-h-screen flex flex-col justify-center overflow-hidden font-sans bg-[var(--dq-navy-950)]">
      {/* Squared Mesh Background */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.0075) 25%, rgba(255, 255, 255, 0.0075) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.0075) 75%, rgba(255, 255, 255, 0.0075) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.0075) 25%, rgba(255, 255, 255, 0.0075) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.0075) 75%, rgba(255, 255, 255, 0.0075) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '50px 50px'
      }} />

      {/* Container */}
      <div className="max-w-[1600px] mx-auto w-full relative z-10 flex flex-col items-center text-center pt-20 pb-24 px-8 md:px-12 lg:px-16">
        {/* Main Headline */}
        <h1 className="text-[40px] leading-[48px] font-semibold tracking-tight mb-6 max-w-4xl mx-auto">
          Every Skill to Succeed in the Digital Economy
        </h1>

        {/* Paragraph */}
        <p className="text-[18px] leading-[28px] font-normal max-w-3xl mx-auto text-white/90 mb-10">
          We equip leaders and digital teams with the skills to thrive in Economy 4.0 and build Digital Cognitive Organizations.
        </p>

        {/* AI-Powered Command Bar */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          <div className="flex items-center gap-3 bg-white/6 backdrop-blur-md border border-white/40 rounded-3xl px-5 py-3 shadow-md hover:bg-white/8 transition-all focus-within:border-[rgba(181,197,247,0.45)] focus-within:ring-2 focus-within:ring-[rgba(181,197,247,0.20)]">
            <Sparkles className="w-5 h-5 text-[var(--dq-orange-500)] flex-shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask AI: What course should I take? What is 6XD? How do I get started?"
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none border-none ring-0 text-[16px] leading-[24px] font-normal"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="flex items-center justify-center w-10 h-10 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors cursor-pointer flex-shrink-0"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="hero" size="lg" className="px-8 py-6 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white text-[16px] leading-[24px] font-normal" style={{ border: '1.5px solid transparent' }}>
            Start Now
          </Button>
          <Link to="/courses">
            <Button variant="hero" size="lg" className="px-8 py-6 bg-white hover:bg-gray-100 text-[var(--dq-navy-950)] text-[16px] leading-[24px] font-normal font-semibold" style={{ border: '1.5px solid transparent' }}>
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>

      {/* Pulsing Butler AI Button */}
      <button className="absolute bottom-8 right-8 z-20 w-16 h-16 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white rounded-full shadow-2xl hover:shadow-[var(--dq-orange-500)]/30 hover:scale-110 transition-all duration-300 flex items-center justify-center group">
        <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-pulse"></span>
      </button>
    </section>
  );
};

export default HBSHeroSection;
