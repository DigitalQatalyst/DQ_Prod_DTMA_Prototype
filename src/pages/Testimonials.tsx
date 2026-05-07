import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Quote } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-800)] to-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[12px] leading-[16px] font-medium uppercase tracking-wide text-[var(--dq-orange-500)] mb-4">
              Hear From Our Learners
            </p>
            <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-white mb-6">
              Success Stories from Digital Leaders
            </h1>
            <p className="text-[16px] leading-[24px] font-normal text-white/90 max-w-3xl mx-auto">
              Discover how professionals across industries are using DTMA to build the skills they need to thrive in the digital economy.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#F5F6FA] rounded-2xl p-8 flex flex-col"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-[var(--dq-orange-500)]" />
                </div>

                {/* Quote */}
                <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-navy-950)] mb-6 flex-grow">
                  "{testimonial.quote}"
                </p>

                {/* Author Section */}
                <div className="flex items-center gap-4 pt-6 border-t border-[#E5E7EB]">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[14px] leading-[20px] font-normal text-[var(--dq-navy-950)]">
                      {testimonial.author}
                    </p>
                    <p className="text-[12px] leading-[16px] font-medium text-[var(--dq-text-secondary)]">
                      {testimonial.role}
                    </p>
                    <p className="text-[12px] leading-[16px] font-medium text-[var(--dq-text-disabled)]">
                      {testimonial.organization}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#F5F6FA]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-[40px] leading-[48px] font-semibold text-[var(--dq-orange-500)] mb-2">
                1,200+
              </p>
              <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)]">
                Professionals Trained
              </p>
            </div>
            <div>
              <p className="text-[40px] leading-[48px] font-semibold text-[var(--dq-orange-500)] mb-2">
                95%
              </p>
              <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)]">
                Satisfaction Rate
              </p>
            </div>
            <div>
              <p className="text-[40px] leading-[48px] font-semibold text-[var(--dq-orange-500)] mb-2">
                40+
              </p>
              <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)]">
                Countries Represented
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
