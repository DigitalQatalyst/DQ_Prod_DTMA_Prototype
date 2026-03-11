import { useState } from "react";
import { Link } from "react-router-dom";
import { Scissors, Sparkles, Heart, Palette, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CategoriesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    {
      icon: Scissors,
      title: "Body Aesthetics & Sculpting",
      description: "Contouring fundamentals, safety, and advanced sculpting protocols.",
      courses: 8,
      href: "/courses?category=body-aesthetics",
    },
    {
      icon: Sparkles,
      title: "Breast Aesthetics & Enhancement",
      description: "Professional awareness, consultation, and post-care support.",
      courses: 6,
      href: "/courses?category=breast-aesthetics",
    },
    {
      icon: Heart,
      title: "Facial Aesthetics & Rejuvenation",
      description: "Anatomy, skin analysis, contouring, and non-surgical rejuvenation.",
      courses: 8,
      href: "/courses?category=facial-aesthetics",
    },
    {
      icon: Palette,
      title: "Eye, Ear & Feature Enhancement",
      description: "Blepharoplasty awareness, otoplasty support, and feature balancing.",
      courses: 5,
      href: "/courses?category=eye-feature",
    },
    {
      icon: Scissors,
      title: "Injectables & Fillers (Theory & Safety)",
      description: "Safety-first injectables theory, ethics, and client consultations.",
      courses: 4,
      href: "/courses?category=injectables-fillers",
    },
    {
      icon: Heart,
      title: "Client Care, Ethics & Professional Practice",
      description: "Ethics, consent, client care, and building a career in aesthetics.",
      courses: 6,
      href: "/courses?category=client-care",
    },
  ];

  const cardsPerView = 3;
  const totalSlides = Math.ceil(categories.length / cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const visibleCategories = categories.slice(
    currentIndex * cardsPerView,
    (currentIndex + 1) * cardsPerView
  );

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="flex items-start justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-primary tracking-wide uppercase opacity-50">Categories</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
              Explore Our Course Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Choose from our comprehensive range of beauty training programs designed to elevate your skills and career.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCategories.map((category, index) => (
            <Link
              key={index}
              to={category.href}
              className="group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-80 border border-border/50"
            >
              {/* Ghost Background Image */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <category.icon className="w-64 h-64 text-foreground absolute -bottom-20 -right-20" />
              </div>

              {/* Content Wrapper */}
              <div className="relative z-10">
                {/* Top Section - Badge and Icon */}
                <div className="flex items-start justify-between mb-8">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-muted text-sm font-semibold text-foreground">
                    {category.courses} Courses
                  </span>
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <category.icon className="w-8 h-8 text-foreground opacity-50" />
                  </div>
                </div>

                {/* Middle Section - Title and Description */}
                <div className="flex-1 flex flex-col justify-center mb-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {category.description}
                  </p>
                </div>

                {/* Bottom Section - Browse Courses Link */}
                <div className="flex items-center gap-2 text-foreground group-hover:text-primary transition-colors">
                  <span className="font-medium">Browse Courses</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
