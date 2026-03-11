import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface HeroSectionProps {
  isActive?: boolean;
  currentSlide?: number;
  onDotClick?: (index: number) => void;
  totalSlides?: number;
}

const featureImages = [
  {
    title: "Portfolio Ready",
    subtitle: "Showcase",
    src: "/e1.png",
  },
  {
    title: "Accredited",
    subtitle: "Certification",
    src: "/e2.png",
  },
  {
    title: "Career-ready",
    subtitle: "Confidence",
    src: "/e3.png",
  },
];

const HeroSection = ({ isActive = true, currentSlide = 0, onDotClick, totalSlides = 2 }: HeroSectionProps) => {
  return (
    <>
      <section className="relative h-screen bg-white overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white" />

        <div className="relative w-full h-full flex items-center">
          {/* Hero Card */}
          <div className="w-full bg-gradient-to-br from-white to-white backdrop-blur-sm border-t border-b border-border/30">
            <div className="p-8 md:p-12 lg:p-16" style={{ paddingTop: '120px' }}>
              <div className="grid md:grid-cols-[45fr_55fr] gap-12 lg:gap-12 items-start max-w-[1600px] mx-auto" style={{ gap: '48px' }}>
                {/* Left Column - Text Content */}
                <div className="space-y-3" style={{ paddingTop: '32px' }}>
                  <h1 className="text-foreground font-semibold text-5xl md:text-6xl leading-tight">
                    Learn Skills That Move You Forward
                  </h1>
                  
                  <p className="text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-lg">
                    Discover courses from experts across multiple disciplines
                  </p>
                  
                  <div className="pt-3 flex gap-3 max-w-lg" style={{ width: '100%', maxWidth: '600px' }}>
                    <div className="flex-1 flex items-center gap-3 bg-white border border-border rounded-lg px-4 py-3 shadow-sm">
                      <svg className="w-5 h-5 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="What do you want to learn?"
                        className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm"
                      />
                    </div>
                    <button className="text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm flex-shrink-0" style={{ backgroundColor: '#2563EB' }}>
                      Search
                    </button>
                  </div>

                  <div className="pt-6">
                    <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
                    <div className="flex flex-wrap gap-3">
                      <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">Data Science</a>
                      <span className="text-muted-foreground">•</span>
                      <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">UI/UX Design</a>
                      <span className="text-muted-foreground">•</span>
                      <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">Business Analytics</a>
                      <span className="text-muted-foreground">•</span>
                      <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">Digital Marketing</a>
                    </div>
                  </div>
                </div>

                {/* Right Column - Hero Image */}
                <div className="relative flex justify-end pr-16">
                  <div className="relative w-full">
                    <div className="absolute -inset-6 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-[40px] blur-3xl opacity-60" />
                    <img
                      src="/Hero.png"
                      alt="Learning marketplace hero"
                      className="relative w-full h-auto object-contain opacity-95 rounded-3xl"
                      style={{ 
                        filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.04))",
                        width: '579px',
                        height: '494.56px'
                      }}
                    />
                    
                    {/* Floating Badge - moved outside overflow container */}
                    {/* Badge removed */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-8 flex gap-3 z-20" style={{ left: 'calc(8.333% + 2rem)' }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onDotClick?.(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-12 h-3"
                  : "w-3 h-3 hover:opacity-80"
              }`}
              style={{
                backgroundColor: index === currentSlide ? '#4A5568' : '#D1D5DB'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
