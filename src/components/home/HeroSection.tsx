import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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

const HeroSection = () => {
  return (
    <>
      <section className="relative h-screen bg-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-secondary/20" />

        <div className="relative w-full h-full flex items-center">
          {/* Hero Card */}
          <div className="w-full bg-gradient-to-br from-secondary/40 to-background/60 backdrop-blur-sm border-t border-b border-border/30">
            <div className="p-8 md:p-12 lg:p-16">
              <div className="grid md:grid-cols-[45fr_55fr] gap-8 lg:gap-12 items-center max-w-[1600px] mx-auto">
                {/* Left Column - Text Content */}
                <div className="space-y-4" style={{ paddingTop: '32px' }}>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                    Premium Beauty Training
                  </span>
                  
                  <h1 className="font-semibold text-foreground leading-[1.1]" style={{ fontSize: '60px' }}>
                    Learn Beauty the BROWZ Way
                  </h1>
                  
                  <p className="text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-lg">
                    Professional beauty training built on real-world expertise, innovation, and results.
                  </p>
                  
                  <div className="pt-4">
                    <Link to="/courses">
                      <Button variant="hero" size="lg" className="group">
                        Explore Courses
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Column - Hero Image */}
                <div className="relative flex justify-start">
                  <div className="relative w-full">
                    <div className="absolute -inset-6 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-[40px] blur-3xl opacity-60" />
                    <div className="relative rounded-3xl bg-gradient-to-br from-background/50 to-secondary/30 p-6">
                      <img
                        src="/hero.browz%201.png"
                        alt="BROWZ graduate holding certificate"
                        className="relative w-full h-auto object-contain mix-blend-multiply opacity-95 rounded-3xl"
                        style={{ 
                          filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.04))",
                          maxHeight: "75vh"
                        }}
                      />
                    </div>
                    
                    {/* Floating Badge - moved outside overflow container */}
                    <div className="absolute left-8 animate-float z-50" style={{ bottom: '-40px' }}>
                      <div className="bg-background/95 backdrop-blur-md rounded-full px-6 py-4 shadow-lg border border-border/50 flex items-center gap-4">
                        <div className="flex -space-x-2">
                          <div className="w-10 h-10 rounded-full bg-primary border-2 border-background"></div>
                          <div className="w-10 h-10 rounded-full bg-charcoal border-2 border-background"></div>
                          <div className="w-10 h-10 rounded-full bg-primary/70 border-2 border-background"></div>
                        </div>
                        <div>
                          <p className="text-base font-semibold text-foreground">Join 500+ learners</p>
                          <p className="text-sm text-muted-foreground">enrolled this week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom feature strip - separate section */}
      <section className="py-8 bg-background">
        <div className="grid md:grid-cols-3 gap-4 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          {featureImages.map((item, idx) => (
            <div
              key={item.title}
              className="group overflow-hidden border border-border/50 bg-background/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
              </div>
              <div className="px-4 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">{item.subtitle}</p>
                  <p className="text-base font-semibold text-foreground mt-1">{item.title}</p>
                </div>
                <span className="text-sm text-primary/70 font-medium">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
