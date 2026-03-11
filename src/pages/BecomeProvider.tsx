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
            background: 'linear-gradient(to right, rgba(30, 35, 72, 0.8), rgba(37, 99, 235, 0.7), rgba(30, 35, 72, 0.6))'
          }}
        />
        
        {/* Soft Overlay - Top to Bottom Gradient */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, rgba(30, 35, 72, 0.5), transparent, rgba(30, 35, 72, 0.7))'
          }}
        />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Share Your Expertise. Reach Learners Everywhere.
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Publish and manage courses on Coursebay's trusted learning marketplace and connect with learners looking for knowledge and skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/provider-apply">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Start Publishing Courses
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
                Who Can Publish
              </h2>
              <p className="text-lg text-muted-foreground">
                Whether you're an individual expert or an established institution, we welcome qualified providers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Individual Instructors */}
              <div className="rounded-3xl border border-border p-8 lg:p-12 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6" style={{ opacity: '0.6' }}>
                  <Users className="w-8 h-8 text-white" />
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
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-6" style={{ opacity: '0.6' }}>
                  <Building2 className="w-8 h-8 text-white" />
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

      {/* Why Publish on Coursebay Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Why Publish on Coursebay
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Grow Your Impact as a Course Provider
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Reach More Learners */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Reach More Learners</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Connect with learners actively searching for courses across multiple disciplines.
                  </p>
                </div>
              </div>

              {/* Build Credibility */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-orange-400/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Build Credibility</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Become a verified provider and showcase your expertise to a trusted audience.
                  </p>
                </div>
              </div>

              {/* Manage Courses Easily */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center mb-4">
                    <FileCheck className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Manage Courses Easily</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Use simple tools to create, update, and manage your course catalog.
                  </p>
                </div>
              </div>

              {/* Earn Revenue */}
              <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-400/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Earn Revenue</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Offer paid or free courses and grow your teaching impact.
                  </p>
                </div>
              </div>
            </div>

            {/* Navy Blue Shadow Effect */}
            <div className="absolute inset-0 -z-10 transform translate-x-2 translate-y-2 rounded-2xl opacity-20" style={{ backgroundColor: '#1E2348' }}></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1E2348' }}>
        <div className="max-w-7xl mx-auto px-0 lg:px-16">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-semibold text-white mb-4 whitespace-nowrap">
              Start Teaching in 3 Simple Steps
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Steps */}
            <div className="grid grid-cols-1 gap-8">
              {/* Step 1 */}
              <div className="pb-8">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-10 h-10 rounded-full bg-cyan-400 text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4">
                  Create Your Provider Profile
                </h3>
                {/* Description */}
                <p className="text-white/70 leading-relaxed max-w-lg">
                  Submit your details and complete provider verification.
                </p>
              </div>

              {/* Step 2 */}
              <div className="pb-8">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4">
                  Create Your Course
                </h3>
                {/* Description */}
                <p className="text-white/70 leading-relaxed max-w-lg">
                  Upload lessons, materials, and assessments.
                </p>
              </div>

              {/* Step 3 */}
              <div className="pb-8">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4">
                  Publish and Reach Learners
                </h3>
                {/* Description */}
                <p className="text-white/70 leading-relaxed max-w-lg">
                  Launch your course and start engaging learners.
                </p>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/pr.png"
                alt="How It Works"
                className="w-full h-auto min-h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Provider Success Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Title */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">Provider Success Stories</h3>
            <p className="text-lg text-muted-foreground">Providers Growing with Coursebay</p>
          </div>

          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
              <img
                src="/pm.jpg"
                alt="Training Academy Representative"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Main Testimonial Text */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8 max-w-3xl mx-auto">
            "Coursebay helped us reach learners we could never access before."
          </h2>

          {/* Provider Info */}
          <p className="text-lg text-muted-foreground mb-8">
            — Training Academy
          </p>

          {/* CTA Button */}
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded-lg font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Read More Stories
          </button>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#1E2348' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Start Publishing Today
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join a growing network of educators sharing knowledge on Coursebay.
            </p>
            
            <Link to="/provider-apply">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Become a Course Provider
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
