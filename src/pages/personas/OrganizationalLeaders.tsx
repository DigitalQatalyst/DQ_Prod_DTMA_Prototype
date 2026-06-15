import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, CheckCircle2 } from "lucide-react";

const OrganizationalLeaders = () => {
  const benefits = [
    "Understand what it takes to build a Digital Cognitive Organization",
    "Develop strategic vision to lead through Economy 4.0",
    "Learn to position your organization for digital success",
    "Master the frameworks for organizational transformation",
    "Lead confidently through digital disruption and change",
  ];

  const courses = [
    "Digital Economy Leadership",
    "Building a Digital Cognitive Organization",
    "Strategic Digital Transformation",
    "Leading Through Economy 4.0",
    "Digital Leadership Essentials",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#f5f4f0] pt-28 pb-20 px-8 md:px-12 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">
            Organizational Leaders
          </p>
          <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold tracking-tight text-[#0a0f1e] mb-5 max-w-3xl">
            Lead in the <span className="text-[#ff4500]">New Economy</span>
          </h1>
          <p className="text-[17px] leading-[1.6] text-[#4a4a5a] max-w-2xl mb-8">
            Understand what it takes to transition your organization into a Digital Cognitive Organization. Develop the strategic vision to lead confidently through Economy 4.0 and beyond.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">The Challenge</p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold tracking-tight text-[#0a0f1e] mb-6">
              Your <span className="text-[#ff4500]">Challenge</span>
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#4a4a5a]">
              The digital economy is reshaping industries and competitive dynamics. As an organizational leader, you need to understand these shifts, develop a clear strategic vision, and guide your organization through transformation with confidence and clarity.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Gain Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="mb-12">
            <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">Benefits</p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold tracking-tight text-[#0a0f1e]">
              What You'll <span className="text-[#ff4500]">Gain</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all flex items-start gap-4"
              >
                <CheckCircle2 className="w-5 h-5 text-[#ff4500] flex-shrink-0 mt-0.5" />
                <p className="text-[15px] leading-[1.6] text-[#0a0f1e]">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="mb-12">
            <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">Curriculum</p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold tracking-tight text-[#0a0f1e]">
              Recommended <span className="text-[#ff4500]">Learning Path</span>
            </h2>
          </div>

          <div className="space-y-3 max-w-2xl">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white border border-[#e8e8ec] rounded-xl p-5 hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#0a0f1e] text-white flex items-center justify-center text-[15px] font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-[15px] font-semibold text-[#0a0f1e]">{course}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#050d1e] relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255, 69, 0, 0.2) 0%, transparent 70%)' }}
        />
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16 text-center relative z-10">
          <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">Get Started</p>
          <h2 className="text-[40px] md:text-[52px] leading-[1.1] font-bold text-white mb-4 max-w-2xl mx-auto">
            Ready to Lead Your Organization Forward?
          </h2>
          <p className="text-[16px] text-white/50 mb-8">
            Build the strategic vision and leadership skills to guide your organization through Economy 4.0.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Explore Courses
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrganizationalLeaders;
