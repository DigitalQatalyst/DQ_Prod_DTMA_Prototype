import { Star, Quote } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: "BROWZ Beauty Academy transformed my career. The bridal makeup masterclass gave me the confidence and skills to charge premium prices for my services.",
      author: "Michelle Torres",
      role: "Freelance Makeup Artist",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      rating: 5,
    },
    {
      quote: "The instructors are world-class. I've taken courses at other academies, but nothing compares to the depth and quality of training here.",
      author: "David Kim",
      role: "Salon Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      rating: 5,
    },
    {
      quote: "I went from beginner to opening my own nail studio in just 6 months. The certification opened so many doors for me professionally.",
      author: "Priya Sharma",
      role: "Nail Artist & Studio Owner",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      rating: 5,
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      const newScrollPosition = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-background text-foreground overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mb-16">
          <span className="text-sm font-medium text-primary tracking-wide uppercase opacity-50">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 mb-4">
            Success Stories from Our Graduates
          </h2>
          <p className="text-muted-foreground">
            Hear from beauty professionals who transformed their careers with BROWZ Beauty Academy training.
          </p>
        </div>

        <div className="relative -mx-8 lg:-mx-16">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background shadow-lg hover:bg-accent"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background shadow-lg hover:bg-accent"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Carousel Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-hidden scrollbar-hide scroll-smooth px-8 lg:px-16"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            <div className="flex gap-8" style={{ width: 'max-content' }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ width: '400px' }}
                >
                  {/* Avatar and Info */}
                  <div className="flex flex-col items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-primary/30"
                    />
                    <h3 className="font-semibold text-foreground text-center">{testimonial.author}</h3>
                    <p className="text-sm text-muted-foreground text-center">{testimonial.role}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-800 leading-relaxed text-center italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;