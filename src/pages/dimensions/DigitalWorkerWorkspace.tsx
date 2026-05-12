import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen } from "lucide-react";

const DigitalWorkerWorkspace = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[18px] leading-[28px] font-normal text-[var(--dq-text-on-dark-secondary)] mb-6">
              Who are the orchestrators?
            </p>
            <h1 className="text-[40px] leading-[48px] font-semibold text-white mb-6">
              Digital Worker & Workspace (DW/WS)
            </h1>
            <p className="text-[18px] leading-[28px] font-normal text-[var(--dq-text-on-dark-secondary)] max-w-3xl mx-auto mb-8">
              Technology alone doesn't transform organisations — people do. Redesign workforce models and cultivate the environments where transformation happens.
            </p>
            <Link to="/courses">
              <Button 
                className="px-8 py-6 bg-[var(--dq-orange-500)] hover:bg-[#e56045] text-white border-transparent text-[16px] leading-[24px] font-normal gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)] mb-6">
              Empowering the Digital Workforce
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)] mb-8 max-w-2xl mx-auto">
              The digital worker operates in AI-enhanced environments, collaborating with intelligent systems and adapting to rapidly evolving workplace dynamics.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[28px] leading-[36px] font-semibold text-white mb-6">
              Ready to Transform Your Workforce?
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-white/80 mb-8">
              Learn to build the workforce models and environments that enable transformation.
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

export default DigitalWorkerWorkspace;
