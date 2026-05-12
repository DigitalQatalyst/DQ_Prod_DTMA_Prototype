import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Award, 
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
    <div className="min-h-screen bg-background">
      <div className="bg-[var(--dq-navy-950)]">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[12px] leading-[16px] font-semibold uppercase tracking-wide text-[var(--dq-orange-500)] mb-6">
                About DTMA
              </p>
              <h1 style={{ fontSize: '43px', lineHeight: '56px', fontWeight: 700 }} className="text-white mb-6">
                Closing the Capability Gap in Digital Transformation
              </h1>
              
              <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-on-dark-secondary)] max-w-3xl mx-auto">
                DTMA equips leaders, specialists, and digital workers with the skills to thrive in Economy 4.0 and build Digital Cognitive Organizations.
              </p>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Introduction Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="text-center mb-12">
              <p className="text-[12px] leading-[16px] font-semibold uppercase tracking-wide text-[var(--dq-orange-500)] mb-4">A Modern Digital Academy</p>
              <h2 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600 }} className="text-[var(--dq-navy-950)] mb-6">
                For the New Economy
              </h2>
              
              <div className="max-w-3xl mx-auto">
                <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-secondary)]">
                  DTMA is built to close the capability gaps that keep digital transformation efforts from succeeding. We serve organizational leaders, transformation specialists, and digital workers through structured learning, guided discovery, and the 6 Dimensions of Digital (6XD) framework.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why DTMA Section */}
        <section className="py-16 lg:py-24 bg-[var(--dq-navy-50)]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="text-center mb-12">
              <h2 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600 }} className="text-[var(--dq-navy-950)]">
                Why DTMA?
              </h2>
            </div>
            
            {/* Why DTMA Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="p-8 rounded-[12px] bg-white border border-[var(--dq-navy-100)]">
                <div className="w-12 h-12 rounded-[8px] bg-[var(--dq-orange-500)] flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }} className="text-[var(--dq-navy-950)] mb-3">6XD Framework</h3>
                <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-secondary)]">
                  Our learning is organized around the 6 Dimensions of Digital, turning each perspective into structured courses and clear entry points for every persona.
                </p>
              </div>
              
              <div className="p-8 rounded-[12px] bg-white border border-[var(--dq-navy-100)]">
                <div className="w-12 h-12 rounded-[8px] bg-[var(--dq-orange-500)] flex items-center justify-center mb-6">
                  <Lightbulb className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }} className="text-[var(--dq-navy-950)] mb-3">Hybrid HI + AI Faculty</h3>
                <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-secondary)]">
                  Learn from both human intelligence and artificial intelligence, combining expert instruction with AI-powered guidance throughout your journey.
                </p>
              </div>
              
              <div className="p-8 rounded-[12px] bg-white border border-[var(--dq-navy-100)]">
                <div className="w-12 h-12 rounded-[8px] bg-[var(--dq-orange-500)] flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }} className="text-[var(--dq-navy-950)] mb-3">Bite-Sized Learning</h3>
                <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-secondary)]">
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
              <h2 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600 }} className="text-[var(--dq-navy-950)] mb-4">
                Your Learning Journey
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-secondary)] max-w-2xl mx-auto">
                From discovery to certification, DTMA guides you through a structured path aligned with your role and goals.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--dq-orange-500)] text-white flex items-center justify-center mx-auto mb-4 text-[20px] leading-[28px] font-semibold">
                  1
                </div>
                <h3 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 600 }} className="text-[var(--dq-navy-950)] mb-2">Discovery</h3>
                <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-secondary)]">Explore the 6XD framework and find your entry point</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--dq-orange-500)] text-white flex items-center justify-center mx-auto mb-4 text-[20px] leading-[28px] font-semibold">
                  2
                </div>
                <h3 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 600 }} className="text-[var(--dq-navy-950)] mb-2">Core Courses</h3>
                <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-secondary)]">Complete 7 core 6XD-aligned courses</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--dq-orange-500)] text-white flex items-center justify-center mx-auto mb-4 text-[20px] leading-[28px] font-semibold">
                  3
                </div>
                <h3 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 600 }} className="text-[var(--dq-navy-950)] mb-2">Electives</h3>
                <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-secondary)]">Deepen expertise with specialized courses</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--dq-orange-500)] text-white flex items-center justify-center mx-auto mb-4 text-[20px] leading-[28px] font-semibold">
                  4
                </div>
                <h3 style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 600 }} className="text-[var(--dq-navy-950)] mb-2">Certification</h3>
                <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-secondary)]">Earn KHDA-attested credentials</p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="py-16 lg:py-24 bg-[var(--dq-navy-50)]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="text-center mb-12">
              <p className="text-[12px] leading-[16px] font-semibold uppercase tracking-wide text-[var(--dq-orange-500)] mb-6">
                Who We Serve
              </p>
              <h2 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600 }} className="text-[var(--dq-navy-950)]">
                Built for Three Core Audiences
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {targetAudience.map((audience, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-[12px] bg-white border border-[var(--dq-navy-100)]"
                >
                  <CheckCircle2 className="w-6 h-6 text-[var(--dq-orange-500)] flex-shrink-0" strokeWidth={1.5} />
                  <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-navy-950)]">{audience}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accreditation Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-[var(--dq-orange-500)] rounded-[12px] flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <h2 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600 }} className="text-[var(--dq-navy-950)] mb-4">
                KHDA-Attested Credentials
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-secondary)]">
                All DTMA courses award credentials recognized across the UAE and internationally, backed by the Knowledge and Human Development Authority (KHDA) in Dubai.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-[var(--dq-navy-950)]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600 }} className="text-white mb-6">
                Ready to Close Your Capability Gap?
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }} className="text-[var(--dq-text-on-dark-secondary)] mb-8">
                Join leaders, specialists, and digital workers building the skills to thrive in Economy 4.0.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/courses">
                  <Button className="px-8 py-6 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white text-[16px] leading-[24px] font-normal">
                    Explore Courses
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-[var(--dq-navy-950)] text-[16px] leading-[24px] font-normal" style={{ borderWidth: '1.5px' }}>
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
