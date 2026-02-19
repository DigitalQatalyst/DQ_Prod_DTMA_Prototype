import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Award, 
  BookOpen, 
  Globe, 
  GraduationCap, 
  Sparkles, 
  Target, 
  Users, 
  CheckCircle2,
  Quote
} from "lucide-react";

const About = () => {
  const whyChooseUs = [
    { icon: Award, text: "Expert-led training from established beauty professionals" },
    { icon: Target, text: "Practical, results-driven courses designed for real clients and real salons" },
    { icon: Globe, text: "Flexible online learning, accessible anytime, anywhere" },
    { icon: GraduationCap, text: "Professional certification that enhances your credibility" },
    { icon: Sparkles, text: "Learning backed by a trusted, award-winning beauty brand" },
  ];

  const missionPoints = [
    "Professionally relevant",
    "Skill-focused and practical",
    "Led by artists who work at the top of their field",
  ];

  const industryExpertise = [
    "Cutting-edge techniques",
    "Advanced tools and technology",
    "Continuous learning and innovation",
  ];

  const targetAudience = [
    "Aspiring beauty professionals",
    "Experienced artists looking to upskill",
    "Salon professionals seeking certification",
    "Anyone serious about turning beauty into a profession, not just a passion",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero vid.mp4" type="video/mp4" />
        </video>
        
        {/* Soft Overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to right, rgba(78, 56, 45, 0.8), rgba(139, 111, 71, 0.7), rgba(212, 165, 116, 0.6))'
          }}
        />
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, rgba(78, 56, 45, 0.5), transparent, rgba(45, 31, 21, 0.7))'
          }}
        />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Learn. Teach. Grow.
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We connect beauty professionals who want to learn with industry experts who want to teach — creating a trusted marketplace for professional beauty education.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24 bg-cream-50 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          {/* Faded Background Logo */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <img
              src="/B%20LOGO.png"
              alt="BROWZ Academy"
              className="h-64 lg:h-80 w-auto opacity-5"
            />
          </div>

          <div className="mb-4 text-center mt-8 relative z-20">
            <h2 className="text-2xl font-semibold text-foreground text-center mb-6">
              About Us
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                BROWZ Beauty Academy is a premium, industry-led platform where beauty professionals learn, teach, and grow, connecting skilled learners with verified experts in a trusted, professional ecosystem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#EEEDE9' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                Why Choose Us?
              </h2>
            </div>
            
            {/* Top Section - Image and Content */}
            <div className="grid lg:grid-cols-2 gap-0 mb-12 rounded-3xl overflow-hidden bg-card border border-border shadow-lg">
              {/* Left - Image */}
              <div className="overflow-hidden h-80 lg:h-96">
                <img
                  src="/bb.png"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right - Content */}
              <div className="flex flex-col justify-center bg-card p-8 lg:p-12">
                <h2 className="text-2xl font-medium text-foreground mb-6">
                  A Platform Built for Real Careers and Real Experts
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  Our mission is to raise the standard of beauty education by bringing together skilled practitioners and serious learners on one professionally governed platform.
                </p>
              </div>
            </div>

            {/* Bottom Section - Mission Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div 
                className="p-8 rounded-2xl bg-primary text-primary-foreground"
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Professionally Relevant</h3>
                <p className="text-primary-foreground/90">
                  Courses are designed and delivered by working professionals and institutions, ensuring training reflects real industry demands — not outdated theory.
                </p>
              </div>
              <div 
                className="p-8 rounded-2xl bg-primary text-primary-foreground"
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Skill-Focused & Practical</h3>
                <p className="text-primary-foreground/90">
                  Learners gain hands-on knowledge they can apply immediately, while providers are supported with tools that help them deliver impactful, structured education.
                </p>
              </div>
              <div 
                className="p-8 rounded-2xl bg-primary text-primary-foreground"
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Led by Industry Leaders</h3>
                <p className="text-primary-foreground/90">
                  All providers are verified to ensure expertise, credibility, and quality — protecting learners and elevating instructors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Expertise Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Industry Expertise You Can Trust
              </h2>
              <p className="text-lg text-muted-foreground">
                BROWZ Academy is powered by the same commitment to excellence that defines 
                BROWZ studios in Dubai and Abu Dhabi.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {industryExpertise.map((item, index) => (
                <div 
                  key={index}
                  className="text-center p-8 rounded-2xl bg-cream-50 border border-cream-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-center text-muted-foreground">
              Every course is carefully designed to reflect current industry standards, not outdated theory.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 lg:py-24 bg-cream-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Founded by an Industry Leader
              </h2>
            </div>
            
            <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border shadow-lg">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <span className="text-5xl font-bold text-primary-foreground">MB</span>
                  </div>
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Michele Barclay
                  </h3>
                  <p className="text-primary font-medium mb-4">Founder, BROWZ</p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Founded in 2016 by internationally recognised creative artist Michele Barclay, 
                    BROWZ was built on a belief in individuality, skill mastery, and continuous development. 
                    Michele continues to invest in advanced training worldwide, bringing global expertise 
                    back into the BROWZ ecosystem — and now, directly to you through BROWZ Beauty Academy.
                  </p>
                  
                  <div className="relative p-6 rounded-2xl bg-cream-100/50 border-l-4 border-primary">
                    <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
                    <p className="text-foreground italic pl-8">
                      "I'd like to see women embrace their individuality and their unique beauty."
                    </p>
                    <p className="text-primary font-medium mt-2 pl-8">— Michele Barclay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Who We Serve</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                Who BROWZ Beauty Academy Is For
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {targetAudience.map((audience, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <p className="text-foreground">{audience}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
              Start Learning. Start Teaching. Stand Out.
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join a growing global community of beauty professionals who trust BROWZ Academy to learn, teach, and grow at the highest standard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                  <BookOpen className="w-5 h-5" />
                  Explore Courses
                </Button>
              </Link>
              <Link to="/provider-apply">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Join as a Provider
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
