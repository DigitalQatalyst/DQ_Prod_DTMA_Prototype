import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The digital transformation courses at DTMA gave me the practical skills I needed to lead our company's modernization efforts. The instructors understand real-world challenges.",
      author: "Jane M.",
      role: "Chief Digital Officer",
      organization: "TechCorp Industries",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "DTMA's approach to teaching digital leadership is unmatched. I've applied these frameworks directly to my team and seen immediate results in our transformation initiatives.",
      author: "David K.",
      role: "VP of Digital Strategy",
      organization: "Global Finance Group",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "As a transformation specialist, I needed cutting-edge knowledge. DTMA delivered exactly that - practical, relevant content that I use every day in my consulting work.",
      author: "Sarah L.",
      role: "Digital Transformation Consultant",
      organization: "Innovation Partners",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "The courses helped me transition from traditional management to digital leadership. The skills I gained have been instrumental in driving change across our organization.",
      author: "Michael R.",
      role: "Director of Operations",
      organization: "Manufacturing Solutions Inc",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "The 6XD framework gave me a clear roadmap for our digital transformation journey. I now have the confidence to lead strategic initiatives that actually deliver results.",
      author: "Amira H.",
      role: "Head of Digital Innovation",
      organization: "Retail Excellence Group",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "DTMA's hybrid HI + AI faculty model is brilliant. Learning from both human experts and AI guidance gave me perspectives I couldn't get anywhere else.",
      author: "Robert T.",
      role: "Digital Transformation Lead",
      organization: "Healthcare Systems Corp",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "The bite-sized learning format fit perfectly into my busy schedule. I could learn during my commute and immediately apply concepts at work the same day.",
      author: "Lisa W.",
      role: "Digital Product Manager",
      organization: "E-Commerce Solutions",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "As a digital worker, I was worried about staying relevant in an AI-driven workplace. DTMA gave me the skills to not just survive, but thrive in Economy 4.0.",
      author: "Ahmed K.",
      role: "Business Analyst",
      organization: "Financial Services Ltd",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote: "The KHDA-attested credentials from DTMA opened doors for me internationally. Employers recognize the quality and rigor of the program.",
      author: "Fatima S.",
      role: "Digital Strategy Consultant",
      organization: "Independent Consultant",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#f5f4f0] pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">
            Hear from our learners
          </p>
          <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold text-[#0a0f1e] mb-5 max-w-3xl">
            Success stories from <span className="text-[#ff4500]">digital leaders.</span>
          </h1>
          <p className="text-[17px] text-[#4a4a5a] max-w-2xl">
            Discover how professionals across industries are using DTMA to build the skills they need to thrive in the digital economy.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 bg-white border-b border-[#e8e8ec]">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: "1,200+", label: "Professionals trained" },
              { value: "95%", label: "Satisfaction rate" },
              { value: "40+", label: "Countries represented" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col border-l-2 border-[#ff4500] pl-4">
                <span className="text-[36px] font-bold text-[#0a0f1e] leading-none mb-1">{s.value}</span>
                <span className="text-[14px] text-[#6b6b7b]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-[#e8e8ec] rounded-xl p-6 flex flex-col hover:shadow-md transition-all"
              >
                {/* Orange accent line */}
                <div className="w-8 h-0.5 bg-[#ff4500] mb-5" />

                {/* Quote */}
                <p className="text-[15px] leading-[1.7] text-[#4a4a5a] mb-6 flex-grow">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-[#e8e8ec]">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="text-[14px] font-semibold text-[#0a0f1e]">{testimonial.author}</p>
                    <p className="text-[12px] text-[#4a4a5a]">{testimonial.role}</p>
                    <p className="text-[12px] text-[#9a9aaa]">{testimonial.organization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#050d1e] relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255, 69, 0, 0.2) 0%, transparent 70%)' }} />
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16 text-center relative z-10">
          <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">Join them</p>
          <h2 className="text-[40px] md:text-[52px] leading-[1.1] font-bold text-white mb-4 max-w-2xl mx-auto">
            Start your digital transformation journey.
          </h2>
          <p className="text-[16px] text-white/50 mb-8 max-w-lg mx-auto">
            Join thousands of professionals building the skills to thrive in Economy 4.0.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors"
          >
            Explore Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
