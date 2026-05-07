import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen } from "lucide-react";

const DigitalAccelerators = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-800)] to-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-1 w-24 rounded-full bg-[#9333ea] mx-auto mb-6"></div>
            <h1 className="text-[40px] leading-[48px] font-semibold text-white mb-6">
              Digital Accelerators (DA)
            </h1>
            <p className="text-[20px] leading-[28px] font-medium text-[#9333ea] mb-6">
              When will you get there?
            </p>
            <p className="text-[18px] leading-[28px] font-normal text-white/90 max-w-3xl mx-auto">
              Speed and precision separate successful transformations from stalled ones. Master the tools and methodologies that compress timescales and turn strategy into reality.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)] mb-6">
              Accelerating Digital Transformation
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)] mb-8">
              Digital accelerators are the tools, methodologies, and approaches that compress transformation timelines and ensure rapid, measurable progress toward strategic goals.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-950)] via-60% to-[var(--dq-orange-500)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[28px] leading-[36px] font-semibold text-white mb-6">
              Ready to Accelerate Your Transformation?
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-white/80 mb-8">
              Learn the tools and methodologies that turn strategy into rapid, measurable results.
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

export default DigitalAccelerators;
