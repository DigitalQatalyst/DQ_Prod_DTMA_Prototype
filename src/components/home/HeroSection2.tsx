import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface HeroSection2Props {
  isActive?: boolean;
  currentSlide?: number;
  onDotClick?: (index: number) => void;
  totalSlides?: number;
}

const HeroSection2 = ({ isActive = true, currentSlide = 0, onDotClick, totalSlides = 2 }: HeroSection2Props) => {
  const courses = [
    {
      title: "Data Science Course",
      icon: "📊",
    },
    {
      title: "UX Design Course",
      icon: "🎨",
    },
    {
      title: "Cyber Security",
      icon: "🔒",
    },
    {
      title: "Machine Learning",
      icon: "🤖",
    },
  ];

  return (
    <section className="relative h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-20px) rotate(-12deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-18px) rotate(6deg); }
        }
        @keyframes float5 {
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          50% { transform: translateY(-22px) rotate(-6deg); }
        }
        @keyframes float6 {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-16px) rotate(3deg); }
        }
        @keyframes float7 {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }
        .float-1 { animation: float1 6s ease-in-out infinite; }
        .float-2 { animation: float2 7s ease-in-out infinite; }
        .float-3 { animation: float3 6.5s ease-in-out infinite; }
        .float-4 { animation: float4 7.5s ease-in-out infinite; }
        .float-5 { animation: float5 6.8s ease-in-out infinite; }
        .float-6 { animation: float6 7.2s ease-in-out infinite; }
        .float-7 { animation: float7 6.3s ease-in-out infinite; }
      `}</style>

      <div className="relative w-full h-full flex items-center">
        <div className="w-full">
          <div className="p-8 md:p-12 lg:p-16" style={{ paddingTop: '104px' }}>
            <div className="grid md:grid-cols-[50fr_50fr] gap-12 lg:gap-16 items-center max-w-[1600px] mx-auto">
              {/* Left Column - Text Content */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
                  Explore Courses From Experts Everywhere
                </h1>
                
                <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                  Browse courses from instructors, institutions, tutors, and professional organizations — all in one learning marketplace.
                </p>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link to="/courses">
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold group">
                      Search courses
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Floating Course Cards */}
              <div className="relative flex justify-center items-center h-96">
                {/* Main gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl opacity-40 blur-3xl" />
                
                {/* Card 2 - UX Design (Center) */}
                <div className="float-2 absolute w-64 h-40 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-4 z-10" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <p className="text-center font-semibold text-slate-700 text-lg">{courses[1].title}</p>
                </div>
                
                {/* Card 1 - Data Science (Top Left) */}
                <div className="float-1 absolute w-56 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center p-4 z-10" style={{ top: '10%', left: '15%' }}>
                  <p className="text-center font-semibold text-white text-base">{courses[0].title}</p>
                </div>

                {/* Card 3 - Cyber Security (Bottom Left) */}
                <div className="float-5 absolute w-56 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-2xl flex items-center justify-center p-4 z-10" style={{ bottom: '10%', left: '15%' }}>
                  <p className="text-center font-semibold text-white text-base">{courses[2].title}</p>
                </div>

                {/* Card 4 - Machine Learning (Right) */}
                <div className="float-7 absolute w-56 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center p-4 z-30" style={{ top: '15%', right: '5%' }}>
                  <p className="text-center font-semibold text-white text-base">{courses[3].title}</p>
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
              backgroundColor: index === currentSlide ? '#FFFFFF' : 'rgba(255,255,255,0.4)'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection2;
