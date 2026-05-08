import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen } from "lucide-react";

const DigitalBusinessPlatform = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-800)] to-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-1 w-24 rounded-full bg-[var(--dq-navy-300)] mx-auto mb-6"></div>
            <h1 className="text-[40px] leading-[48px] font-semibold text-white mb-6">
              Digital Business Platform (DBP)
            </h1>
            <p className="text-[20px] leading-[28px] font-medium text-[var(--dq-navy-300)] mb-6">
              What unifies and orchestrates value?
            </p>
            <p className="text-[18px] leading-[28px] font-normal text-[var(--dq-text-on-dark-secondary)] max-w-3xl mx-auto">
              Every transformation needs an engine for business functions and enterprise integration. Build the expertise to evaluate, design, and orchestrate digital platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)] mb-6">
              Orchestrating Digital Business Platforms
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)] mb-8">
              Digital business platforms serve as the foundation for modern enterprises, integrating systems, data, and processes to create seamless value delivery.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-950)] via-60% to-[var(--dq-orange-500)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[28px] leading-[36px] font-semibold text-white mb-6">
              Ready to Master Digital Platforms?
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-white/80 mb-8">
              Learn to design and orchestrate the platforms that power digital transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button 
                  className="px-8 py-6 bg-[var(--dq-orange-500)] hover:bg-[#e56045] text-white border-transparent text-[16px] leading-[24px] font-normal gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Explore Courses
                </Button>
              </Link>
              <Link to="/">
                <Button 
                  className="px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-[var(--dq-orange-500)] text-[16px] leading-[24px] font-normal"
                  style={{ borderWidth: '1.5px' }}
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalBusinessPlatform;
