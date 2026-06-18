import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import MarketingSection from "@/components/marketing/MarketingSection";
import SectionHeader from "@/components/marketing/SectionHeader";
import { btnPrimary } from "@/lib/brandAccent";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "The digital transformation courses at DTMA gave me the practical skills I needed to lead our company's modernization efforts. The instructors understand real-world challenges.",
      author: "Jane M.",
      role: "Chief Digital Officer",
      organization: "TechCorp Industries",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote:
        "DTMA's approach to teaching digital leadership is unmatched. I've applied these frameworks directly to my team and seen immediate results in our transformation initiatives.",
      author: "David K.",
      role: "VP of Digital Strategy",
      organization: "Global Finance Group",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote:
        "As a transformation specialist, I needed cutting-edge knowledge. DTMA delivered exactly that - practical, relevant content that I use every day in my consulting work.",
      author: "Sarah L.",
      role: "Digital Transformation Consultant",
      organization: "Innovation Partners",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote:
        "The courses helped me transition from traditional management to digital leadership. The skills I gained have been instrumental in driving change across our organization.",
      author: "Michael R.",
      role: "Director of Operations",
      organization: "Manufacturing Solutions Inc",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <MarketingSection background="gray">
      <SectionHeader align="center" eyebrowText="Hear From Our Learners" title="What learners say" />

      <div className="relative mx-auto max-w-[900px]">
        <button
          type="button"
          onClick={() =>
            setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
          }
          className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-16 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-shadow hover:text-dq-orange hover:shadow-lg"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() =>
            setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
          }
          className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-16 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-shadow hover:text-dq-orange hover:shadow-lg"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].author}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <p className="mb-8 text-xl font-medium leading-relaxed text-dq-navy md:text-2xl">
            "{testimonials[currentIndex].quote}"
          </p>

          <div className="mb-8">
            <p className="text-base text-gray-600">
              — {testimonials[currentIndex].author}, {testimonials[currentIndex].role}
            </p>
            <p className="mt-1 text-sm text-gray-400">{testimonials[currentIndex].organization}</p>
          </div>

          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors mb-8"
          >
            Read More Stories
          </Link>

          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-dq-orange" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </MarketingSection>
  );
};

export default TestimonialsSection;
