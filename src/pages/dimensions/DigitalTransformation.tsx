import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen } from "lucide-react";

const DigitalTransformation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-[#1e2348] via-[#2a3058] to-[#1e2348]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-1 w-24 rounded-full bg-[#16a34a] mx-auto mb-6"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Digital Transformation 2.0 (DT2.0)
            </h1>
            <p className="text-xl text-[#16a34a] mb-6 font-medium">
              How to design and deploy the target?
            </p>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Traditional transformation approaches are no longer enough for today's demands. Acquire methodologies to architect target states and deploy transformation at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19] mb-6">
              Next-Generation Transformation Methodologies
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed mb-8">
              Digital Transformation 2.0 goes beyond traditional change management, providing frameworks and methodologies to architect and execute transformation at enterprise scale.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#1e2348] via-[#1e2348] via-60% to-[#ff6b4d]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Ready to Lead Transformation?
            </h2>
            <p className="text-base text-white/80 leading-relaxed mb-8">
              Master the methodologies that separate successful transformations from failed ones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button 
                  className="px-8 py-6 bg-[#ff6b4d] hover:bg-[#e56045] text-white border-transparent text-base gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Explore Courses
                </Button>
              </Link>
              <Link to="/">
                <Button 
                  className="px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-[#ff6b4d] text-base"
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

export default DigitalTransformation;
