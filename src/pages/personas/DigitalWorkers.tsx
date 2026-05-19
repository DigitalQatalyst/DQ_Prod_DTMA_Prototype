import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, CheckCircle2 } from "lucide-react";

const DigitalWorkers = () => {
  const benefits = [
    "Understand how Digital Cognitive Organizations operate",
    "Build competencies to collaborate in digital-first environments",
    "Adapt to AI-enhanced workplace dynamics",
    "Deliver effectively in modern digital teams",
    "Stay relevant in an AI-shaped workplace",
  ];

  const courses = [
    "Digital Economy Fundamentals",
    "Working in a Digital Cognitive Organization",
    "Digital Collaboration & Communication",
    "AI Tools for Digital Workers",
    "Digital Workspace Essentials",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
              <span className="text-[12px] leading-[16px] font-medium text-[var(--dq-text-on-dark-secondary)]">Digital Workers</span>
            </div>
            <h1 className="text-[40px] leading-[48px] font-semibold text-white mb-6">
              Understand How a DCO Works
            </h1>
            <p className="text-[18px] leading-[28px] font-normal text-white/90 max-w-3xl mx-auto mb-8">
              Learn how a Digital Cognitive Organization operates and what your role within it demands. Build the competencies to collaborate, adapt, and deliver in a digital-first environment.
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

      {/* Challenge Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)] mb-6">
              Your Challenge
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)] mb-8 max-w-2xl mx-auto">
              The workplace is evolving rapidly. Digital workers need to understand how modern organizations operate, how to work alongside AI systems, and how to remain valuable contributors in an increasingly automated environment.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Gain Section */}
      <section className="py-16 lg:py-24 bg-[#F5F6FA]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)] mb-12 text-center">
              What You'll Gain
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-xl bg-white border border-[var(--dq-surface-border-default)]"
                >
                  <CheckCircle2 className="w-6 h-6 text-[var(--dq-orange-500)] flex-shrink-0 mt-1" />
                  <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-navy-950)]">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Courses Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)] mb-12 text-center">
              Recommended Learning Path
            </h2>
            
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-xl bg-[#F5F6FA] border border-[var(--dq-surface-border-default)]"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--dq-navy-950)] text-white flex items-center justify-center text-[16px] leading-[24px] font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-[16px] leading-[24px] font-medium text-[var(--dq-navy-950)]">{course}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[28px] leading-[36px] font-semibold text-white mb-6">
              Ready to Thrive as a Digital Worker?
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-white/80 mb-8">
              Start building the skills you need to succeed in a Digital Cognitive Organization.
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

export default DigitalWorkers;
