import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Coursebay helped me discover a digital marketing course that improved my skills and helped me earn a promotion.",
      author: "Jane M.",
      role: "Marketing Professional",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    },
    {
      quote: "The courses are well structured and the instructors are very knowledgeable. I completed my first certification within a few weeks.",
      author: "David K.",
      role: "Data Analyst",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    },
    {
      quote: "I love that I can compare courses from different providers before enrolling.",
      author: "Sarah L.",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getTestimonial = (offset: number) => {
    return testimonials[(currentIndex + offset) % testimonials.length];
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: "72px" }}>
          <h2 className="text-4xl font-bold text-foreground">
            Learners Achieving More with Coursebay
          </h2>
        </div>

        {/* Testimonials Carousel with Stacking Effect */}
        <div className="relative flex items-center justify-center py-20">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 z-30 rounded-full hover:bg-slate-100"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 z-30 rounded-full hover:bg-slate-100"
            onClick={handleNext}
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </Button>

          {/* Stacked Cards Container */}
          <div className="relative w-full max-w-5xl px-16 h-96">
            {/* Back cards (stacked effect) - visible behind main card */}
            {[2, 1].map((offset) => {
              return (
                <div
                  key={offset}
                  className="absolute w-full max-w-4xl bg-white rounded-2xl"
                  style={{
                    height: '320px',
                    bottom: `${-offset * 16}px`,
                    left: `${offset * 12}px`,
                    zIndex: 10 - offset,
                    boxShadow: `0 ${8 + offset * 4}px ${20 + offset * 8}px rgba(0, 0, 0, ${0.1 + offset * 0.05})`,
                  }}
                />
              );
            })}

            {/* Main Card */}
            <div 
              className="absolute w-full max-w-4xl flex items-end"
              style={{
                zIndex: 20,
                bottom: '32px',
              }}
            >
              {/* Left: Image (Taller, bottom-aligned) */}
              <div 
                className="w-2/5 bg-slate-600 overflow-hidden" 
                style={{ 
                  height: '420px',
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                  borderBottomLeftRadius: '16px',
                }}
              >
                <img
                  src={getTestimonial(0).image}
                  alt={getTestimonial(0).author}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right: Content Card (Smaller) */}
              <div 
                className="w-3/5 bg-white p-8 flex flex-col justify-center"
                style={{
                  height: '320px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  borderTopRightRadius: '16px',
                  borderBottomRightRadius: '16px',
                }}
              >
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  {getTestimonial(0).author}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {getTestimonial(0).role}
                </p>
                <p className="text-foreground/80 leading-relaxed text-sm">
                  {getTestimonial(0).quote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
