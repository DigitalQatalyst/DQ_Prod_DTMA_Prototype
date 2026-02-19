import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Users, 
  Building2, 
  FileCheck, 
  Shield, 
  TrendingUp,
  ArrowRight
} from "lucide-react";

const BecomeProvider = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Hero video.mp4" type="video/mp4" />
        </video>
        
        {/* Soft Overlay - Left to Right Gradient */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to right, rgba(78, 56, 45, 0.8), rgba(139, 111, 71, 0.7), rgba(212, 165, 116, 0.6))'
          }}
        />
        
        {/* Soft Overlay - Top to Bottom Gradient */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, rgba(78, 56, 45, 0.5), transparent, rgba(45, 31, 21, 0.7))'
          }}
        />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Teach. Publish. Earn.
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Share your expertise with thousands of beauty professionals worldwide. Build your reputation, reach learners, and monetize your knowledge on BROWZ Academy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/provider-apply">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full">
                  Join as a Provider
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Who Can Join
              </h2>
              <p className="text-lg text-muted-foreground">
                Whether you're an individual expert or an established institution, we welcome qualified providers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Individual Instructors */}
              <div className="rounded-3xl border border-border p-8 lg:p-12 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Individual Instructors
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Experts, professionals, and experienced practitioners who want to share their knowledge and build a personal brand in the beauty industry.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Create and publish your courses</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Reach global learners</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Earn from enrollments</span>
                  </li>
                </ul>
              </div>

              {/* Institutions & Academies */}
              <div className="rounded-3xl border border-border p-8 lg:p-12 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Institutions & Academies
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Schools, training bodies, faculties, and established organizations looking to expand their reach and offer online training programs.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Scale your training programs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Manage multiple instructors</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Generate institutional revenue</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-cream-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
                How It Works
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20" />

              <div className="space-y-16">
                {/* Step 1 - Left */}
                <div className="flex gap-8 items-center">
                  <div className="w-1/2 text-right pr-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Create your provider profile
                    </h3>
                    <p className="text-base text-muted-foreground">
                      Sign up and complete your profile with your credentials and expertise.
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0 relative z-10">
                    1
                  </div>
                  <div className="w-1/2" />
                </div>

                {/* Step 2 - Right */}
                <div className="flex gap-8 items-center">
                  <div className="w-1/2" />
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0 relative z-10">
                    2
                  </div>
                  <div className="w-1/2 text-left pl-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Get verified
                    </h3>
                    <p className="text-base text-muted-foreground">
                      Our team reviews and verifies your profile to ensure quality standards.
                    </p>
                  </div>
                </div>

                {/* Step 3 - Left */}
                <div className="flex gap-8 items-center">
                  <div className="w-1/2 text-right pr-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Build your course
                    </h3>
                    <p className="text-base text-muted-foreground">
                      Use our easy course builder to upload videos, quizzes, and resources.
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0 relative z-10">
                    3
                  </div>
                  <div className="w-1/2" />
                </div>

                {/* Step 4 - Right */}
                <div className="flex gap-8 items-center">
                  <div className="w-1/2" />
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0 relative z-10">
                    4
                  </div>
                  <div className="w-1/2 text-left pl-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Submit for review
                    </h3>
                    <p className="text-base text-muted-foreground">
                      Submit your course for approval. Our team reviews content for quality.
                    </p>
                  </div>
                </div>

                {/* Step 5 - Left */}
                <div className="flex gap-8 items-center">
                  <div className="w-1/2 text-right pr-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Start earning
                    </h3>
                    <p className="text-base text-muted-foreground">
                      Once approved, your course goes live. Students enroll and you get paid.
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0 relative z-10">
                    5
                  </div>
                  <div className="w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Quality Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl border border-border p-16 lg:p-20 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
              <div className="flex gap-12 items-center justify-center relative z-10">
                {/* Left side - Vector SVG */}
                <div className="w-1/3 flex items-center justify-center">
                  <img
                    src="/Vector.svg"
                    alt="Quality Icon"
                    className="w-full h-auto max-w-xs"
                  />
                </div>
                
                {/* Center - heading and text */}
                <div className="w-2/3 flex flex-col items-start">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Quality You Can Trust
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    All providers on BROWZ Academy are verified to ensure the highest quality of education for our learners. We maintain rigorous standards to protect both learners and providers, creating a trusted marketplace where expertise is valued and recognized.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-cream-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Why Teach on BROWZ Academy
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Grow Your Reach
                </h3>
                <p className="text-sm text-muted-foreground">
                  Access thousands of beauty professionals seeking quality education
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Easy Publishing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Intuitive tools make it simple to create and manage your courses
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Trusted Platform
                </h3>
                <p className="text-sm text-muted-foreground">
                  Build your reputation on a platform known for quality and professionalism
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#4E382D' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Ready to Share Your Expertise?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join hundreds of instructors and institutions already teaching on BROWZ Academy
            </p>
            
            <Link to="/provider-apply">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full">
                Join as a Provider
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeProvider;
