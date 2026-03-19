import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroSection2 from "./HeroSection2";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const slides = [
    { component: HeroSection2, id: "hero-2" },
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoRotate(false);
    // Resume auto-rotation after 10 seconds of manual interaction
    setTimeout(() => setAutoRotate(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setAutoRotate(false);
    setTimeout(() => setAutoRotate(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setAutoRotate(false);
    setTimeout(() => setAutoRotate(true), 10000);
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6500); // 6.5 seconds

    return () => clearInterval(interval);
  }, [autoRotate, slides.length]);

  return (
    <div className="relative w-full group">
      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <slide.component 
                isActive={index === currentSlide}
                currentSlide={currentSlide}
                onDotClick={goToSlide}
                totalSlides={slides.length}
              />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        {slides.length > 1 && (
          <button
            onClick={goToPrevious}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
        )}

        {/* Right Arrow */}
        {slides.length > 1 && (
          <button
            onClick={goToNext}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroCarousel;
