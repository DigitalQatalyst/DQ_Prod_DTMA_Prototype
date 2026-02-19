import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Clock, HeadphonesIcon } from "lucide-react";

const CTASection = () => {
  const features = [
    { icon: Award, text: "Industry-Recognized Certifications" },
    { icon: Clock, text: "Learn at Your Own Pace" },
    { icon: HeadphonesIcon, text: "Expert Support & Mentorship" },
  ];

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#4E382D' }}>
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Start Your Career Today
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of beauty professionals advancing their skills with BROWZ Beauty Academy's expert-led, flexible courses
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="lg" className="group bg-white text-primary hover:bg-white/90">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;