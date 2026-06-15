import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Target, 
  CheckCircle2,
  Lightbulb,
  Zap
} from "lucide-react";

const About = () => {
  const targetAudience = [
    "Organizational leaders steering digital transformation",
    "Transformation specialists executing digital initiatives",
    "Digital workers adapting to the AI-shaped workplace",
    "Teams building Digital Cognitive Organizations",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#f5f4f0] pt-28 pb-20 px-8 md:px-12 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">
            About DTMA
          </p>
          <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold tracking-tight text-[#0a0f1e] mb-5 max-w-3xl">
            Closing the <span className="text-[#ff4500]">Capability Gap</span> in Digital Transformation
          </h1>
          <p className="text-[17px] leading-[1.6] text-[#4a4a5a] max-w-2xl">
            DTMA equips leaders, specialists, and digital workers with the skills to thrive in Economy 4.0 and build Digital Cognitive Organizations.
          </p>
        </div>
      </section>

      <main>
        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="mb-3">
              <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">A Modern Digital Academy</p>
              <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold tracking-tight text-[#0a0f1e] mb-6">
                For the <span className="text-[#ff4500]">New Economy</span>
              </h2>
            </div>
            <div className="max-w-3xl">
              <p className="text-[17px] leading-[1.6] text-[#4a4a5a]">
                DTMA is built to close the capability gaps that keep digital transformation efforts from succeeding. We serve organizational leaders, transformation specialists, and digital workers through structured learning, guided discovery, and the 6 Dimensions of Digital (6XD) framework.
              </p>
            </div>
          </div>
        </section>

        {/* Why DTMA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="mb-12">
              <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold tracking-tight text-[#0a0f1e]">
                Why <span className="text-[#ff4500]">DTMA?</span>
              </h2>
            </div>

            {/* Why DTMA Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-[#ff4500]/10 flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-[#ff4500]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-bold text-[#0a0f1e] mb-3">6XD Framework</h3>
                <p className="text-[15px] leading-[1.6] text-[#4a4a5a]">
                  Our learning is organized around the 6 Dimensions of Digital, turning each perspective into structured courses and clear entry points for every persona.
                </p>
              </div>

              <div className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-[#ff4500]/10 flex items-center justify-center mb-5">
                  <Lightbulb className="w-6 h-6 text-[#ff4500]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-bold text-[#0a0f1e] mb-3">Hybrid HI + AI Faculty</h3>
                <p className="text-[15px] leading-[1.6] text-[#4a4a5a]">
                  Learn from both human intelligence and artificial intelligence, combining expert instruction with AI-powered guidance throughout your journey.
                </p>
              </div>

              <div className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-[#ff4500]/10 flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6 text-[#ff4500]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-bold text-[#0a0f1e] mb-3">Bite-Sized Learning</h3>
                <p className="text-[15px] leading-[1.6] text-[#4a4a5a]">
                  Podcast-style microlearning that fits your schedule. Always-available content designed for busy professionals navigating digital transformation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Journey Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="mb-12">
              <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold tracking-tight text-[#0a0f1e] mb-4">
                Your Learning <span className="text-[#ff4500]">Journey</span>
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#4a4a5a] max-w-2xl">
                From discovery to certification, DTMA guides you through a structured path aligned with your role and goals.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#0a0f1e] text-white flex items-center justify-center mb-4 text-[18px] font-bold">
                  1
                </div>
                <h3 className="text-[16px] font-bold text-[#0a0f1e] mb-2">Discovery</h3>
                <p className="text-[14px] leading-[1.6] text-[#4a4a5a]">Explore the 6XD framework and find your entry point</p>
              </div>

              <div>
                <div className="w-14 h-14 rounded-full bg-[#0a0f1e] text-white flex items-center justify-center mb-4 text-[18px] font-bold">
                  2
                </div>
                <h3 className="text-[16px] font-bold text-[#0a0f1e] mb-2">Core Courses</h3>
                <p className="text-[14px] leading-[1.6] text-[#4a4a5a]">Complete 7 core 6XD-aligned courses</p>
              </div>

              <div>
                <div className="w-14 h-14 rounded-full bg-[#0a0f1e] text-white flex items-center justify-center mb-4 text-[18px] font-bold">
                  3
                </div>
                <h3 className="text-[16px] font-bold text-[#0a0f1e] mb-2">Electives</h3>
                <p className="text-[14px] leading-[1.6] text-[#4a4a5a]">Deepen expertise with specialized courses</p>
              </div>

              <div>
                <div className="w-14 h-14 rounded-full bg-[#0a0f1e] text-white flex items-center justify-center mb-4 text-[18px] font-bold">
                  4
                </div>
                <h3 className="text-[16px] font-bold text-[#0a0f1e] mb-2">Certification</h3>
                <p className="text-[14px] leading-[1.6] text-[#4a4a5a]">Earn KHDA-attested credentials</p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="mb-12">
              <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">
                Who We Serve
              </p>
              <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold tracking-tight text-[#0a0f1e]">
                Built for Three <span className="text-[#ff4500]">Core Audiences</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
              {targetAudience.map((audience, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all flex items-center gap-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#ff4500] flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-[15px] leading-[1.6] text-[#0a0f1e]">{audience}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accreditation Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="max-w-2xl">
              <img src="/KHDA.png" alt="KHDA" className="h-16 w-auto mb-6" />
              <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold tracking-tight text-[#0a0f1e] mb-4">
                KHDA-Attested <span className="text-[#ff4500]">Credentials</span>
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#4a4a5a]">
                All DTMA courses award credentials recognized across the UAE and internationally, backed by the Knowledge and Human Development Authority (KHDA) in Dubai.
              </p>
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
              Ready to Close Your Capability Gap?
            </h2>
            <p className="text-[16px] text-white/50 mb-8">
              Join leaders, specialists, and digital workers building the skills to thrive in Economy 4.0.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors"
              >
                Explore Courses
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
