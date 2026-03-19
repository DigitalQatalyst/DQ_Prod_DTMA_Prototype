import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "The digital transformation courses at DTMA gave me the practical skills I needed to lead our company's modernization efforts. The instructors understand real-world challenges.",
      author: "Jane M.",
      role: "Chief Digital Officer",
      organization: "TechCorp Industries",
    },
    {
      quote: "DTMA's approach to teaching digital leadership is unmatched. I've applied these frameworks directly to my team and seen immediate results in our transformation initiatives.",
      author: "David K.",
      role: "VP of Digital Strategy",
      organization: "Global Finance Group",
    },
    {
      quote: "As a transformation specialist, I needed cutting-edge knowledge. DTMA delivered exactly that - practical, relevant content that I use every day in my consulting work.",
      author: "Sarah L.",
      role: "Digital Transformation Consultant",
      organization: "Innovation Partners",
    },
    {
      quote: "The courses helped me transition from traditional management to digital leadership. The skills I gained have been instrumental in driving change across our organization.",
      author: "Michael R.",
      role: "Director of Operations",
      organization: "Manufacturing Solutions Inc",
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
    <section className="py-16 bg-[#f8f9fa]">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            Hear From Our Learners
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-lg hover:bg-gray-50 -ml-4"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-lg hover:bg-gray-50 -mr-4"
            onClick={handleNext}
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </Button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl p-12 shadow-sm max-w-4xl mx-auto">
                    {/* Quote */}
                    <div className="mb-8">
                      <svg className="w-12 h-12 text-[#ff6b4d] mb-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-lg md:text-xl text-foreground leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-semibold text-foreground mb-1">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.organization}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#ff6b4d] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-8">
            <a 
              href="#" 
              className="text-[#ff6b4d] hover:text-[#e56045] font-medium text-base transition-colors inline-flex items-center gap-2"
            >
              Read More Stories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
