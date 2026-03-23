import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
            Hear From Our Learners
          </p>
        </div>

        {/* Testimonial Content */}
        <div className="relative max-w-[900px] mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow flex items-center justify-center text-[#4B5563] hover:text-[#ff6b4d] z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow flex items-center justify-center text-[#4B5563] hover:text-[#ff6b4d] z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial Card */}
          <div className="text-center">
            {/* Avatar */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F5F6FA] shadow-md">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Quote */}
            <div className="mb-8">
              <p className="text-xl md:text-2xl font-medium text-[#0B0C19] leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </p>
            </div>

            {/* Author Info */}
            <div className="mb-8">
              <p className="text-base text-[#4B5563]">
                — {testimonials[currentIndex].author}, {testimonials[currentIndex].role}
              </p>
              <p className="text-sm text-[#9CA3AF] mt-1">
                {testimonials[currentIndex].organization}
              </p>
            </div>

            {/* CTA Button */}
            <div className="mb-8">
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b4d] hover:bg-[#e56045] text-white rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Read More Stories
              </Link>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[#ff6b4d] w-8' 
                      : 'bg-[#E5E7EB] hover:bg-[#9CA3AF]'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
