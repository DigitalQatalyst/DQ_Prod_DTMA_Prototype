import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle2 } from "lucide-react";

interface HeroSection3Props {
  isActive?: boolean;
  currentSlide?: number;
  onDotClick?: (index: number) => void;
  totalSlides?: number;
}

const HeroSection3 = ({ isActive = true, currentSlide = 0, onDotClick, totalSlides = 3 }: HeroSection3Props) => {
  const trustIndicators = [
    {
      icon: "✓",
      label: "Verified Instructor",
      color: "from-blue-50 to-blue-100"
    },
    {
      icon: "✓",
      label: "Accredited Institution",
      color: "from-purple-50 to-purple-100"
    },
    {
      icon: "✓",
      label: "Professional Organization",
      color: "from-green-50 to-green-100"
    },
    {
      icon: "✓",
      label: "Certified Learning",
      color: "from-orange-50 to-orange-100"
    },
  ];

  return (
    <section className="relative h-screen bg-white overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white" />

      <div className="relative w-full h-full flex items-center">
        <div className="w-full bg-gradient-to-br from-white to-white backdrop-blur-sm border-t border-b border-border/30">
          <div className="p-8 md:p-12 lg:p-16" style={{ paddingTop: '120px' }}>
            <div className="grid md:grid-cols-[45fr_55fr] gap-12 lg:gap-12 items-start max-w-[1600px] mx-auto" style={{ gap: '48px' }}>
              {/* Left Column - Text Content */}
              <div className="space-y-3" style={{ paddingTop: '32px' }}>
                <h1 className="text-foreground">
                  Verified Providers you can Trust
                </h1>
                
                <p className="text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-lg">
                  Every course comes from verified instructors, institutions, tutors, or professional organizations.
                </p>
                
                <div className="pt-3">
                  <Link to="/courses">
                    <Button variant="hero" size="lg" className="group" style={{ backgroundColor: '#2563EB' }}>
                      Explore courses
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Trust Indicators Image */}
              <div className="relative flex justify-start">
                <div className="relative w-full">
                  <img
                    src="/Group 6.png"
                    alt="Trust indicators"
                    className="relative w-full h-auto object-contain opacity-95 rounded-3xl"
                    style={{ 
                      filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.04))",
                      width: '579px',
                      height: '494.56px'
                    }}
                  />
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
  );
};

export default HeroSection3;
