import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Award, 
  BookOpen, 
  Target, 
  Users, 
  CheckCircle2,
  Lightbulb,
  TrendingUp,
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-[#1e2348] via-[#2a3058] to-[#1e2348]">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Closing the Capability Gap in Digital Transformation
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              DTMA equips leaders, specialists, and digital workers with the skills to thrive in Economy 4.0 and build Digital Cognitive Organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#ff6b4d] mb-4">About DTMA</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19] mb-6">
              A Modern Digital Academy for the New Economy
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-base text-[#4B5563] leading-relaxed">
                DTMA is built to close the capability gaps that keep digital transformation efforts from succeeding. We serve organizational leaders, transformation specialists, and digital workers through structured learning, guided discovery, and the 6 Dimensions of Digital (6XD) framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-[#F5F6FA]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19]">
              Why DTMA?
            </h2>
          </div>
          
          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 rounded-2xl bg-white border border-[#E5E7EB]">
              <div className="w-12 h-12 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#ff6b4d]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0B0C19] mb-3">6XD Framework</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Our learning is organized around the 6 Dimensions of Digital, turning each perspective into structured courses and clear entry points for every persona.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white border border-[#E5E7EB]">
              <div className="w-12 h-12 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-[#ff6b4d]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0B0C19] mb-3">Hybrid HI + AI Faculty</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Learn from both human intelligence and artificial intelligence, combining expert instruction with AI-powered guidance throughout your journey.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white border border-[#E5E7EB]">
              <div className="w-12 h-12 rounded-full bg-[#ff6b4d]/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#ff6b4d]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0B0C19] mb-3">Bite-Sized Learning</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Podcast-style microlearning that fits your schedule. Always-available content designed for busy professionals navigating digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Journey Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19] mb-4">
              Your Learning Journey
            </h2>
            <p className="text-base text-[#4B5563] max-w-2xl mx-auto">
              From discovery to certification, DTMA guides you through a structured path aligned with your role and goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6b4d] text-white flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                1
              </div>
              <h3 className="text-lg font-semibold text-[#0B0C19] mb-2">Discovery</h3>
              <p className="text-sm text-[#4B5563]">Explore the 6XD framework and find your entry point</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6b4d] text-white flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                2
              </div>
              <h3 className="text-lg font-semibold text-[#0B0C19] mb-2">Core Courses</h3>
              <p className="text-sm text-[#4B5563]">Complete 7 core 6XD-aligned courses</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6b4d] text-white flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                3
              </div>
              <h3 className="text-lg font-semibold text-[#0B0C19] mb-2">Electives</h3>
              <p className="text-sm text-[#4B5563]">Deepen expertise with specialized courses</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ff6b4d] text-white flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                4
              </div>
              <h3 className="text-lg font-semibold text-[#0B0C19] mb-2">Certification</h3>
              <p className="text-sm text-[#4B5563]">Earn KHDA-attested credentials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 lg:py-24 bg-[#F5F6FA]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6b4d]/10 text-[#ff6b4d] mb-6">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Who We Serve</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19]">
              Built for Three Core Audiences
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {targetAudience.map((audience, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-6 rounded-xl bg-white border border-[#E5E7EB]"
              >
                <CheckCircle2 className="w-6 h-6 text-[#ff6b4d] flex-shrink-0" />
                <p className="text-[#0B0C19]">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-[#ff6b4d]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-[#ff6b4d]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19] mb-4">
              KHDA-Attested Credentials
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              All DTMA courses award credentials recognized across the UAE and internationally, backed by the Knowledge and Human Development Authority (KHDA) in Dubai.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#1e2348] via-[#1e2348] via-60% to-[#ff6b4d]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Ready to Close Your Capability Gap?
            </h2>
            <p className="text-base text-white/80 leading-relaxed mb-8">
              Join leaders, specialists, and digital workers building the skills to thrive in Economy 4.0.
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
                  Learn More
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

export default About;
