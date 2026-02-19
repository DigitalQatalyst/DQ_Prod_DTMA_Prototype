import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

const FeaturedCoursesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const courses = [
    {
      id: "face-4",
      title: "Facelift Alternatives: Non-Surgical Facial Rejuvenation",
      instructor: "BROWZ Faculty",
      image: "/e1.png",
      category: "Facial Aesthetics",
      level: "Advanced",
      duration: 6,
      lessons: 12,
      rating: 4.7,
      reviews: 155,
      price: 219,
      originalPrice: 269,
      badge: "Bestseller",
    },
    {
      id: "body-2",
      title: "Body Contouring Fundamentals",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "Body Aesthetics",
      level: "Intermediate",
      duration: 6,
      lessons: 14,
      rating: 4.7,
      reviews: 280,
      price: 199,
      originalPrice: 249,
      badge: "Popular",
    },
    {
      id: "breast-3",
      title: "Breast Enhancement Options Overview",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "Breast Aesthetics",
      level: "Professional Awareness",
      duration: 4,
      lessons: 9,
      rating: 4.6,
      reviews: 120,
      price: 179,
      originalPrice: 229,
      badge: "Popular",
    },
    {
      id: "inject-1",
      title: "Introduction to Aesthetic Injectables",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "Injectables & Fillers",
      level: "Professional Awareness",
      duration: 4,
      lessons: 9,
      rating: 4.7,
      reviews: 190,
      price: 199,
      originalPrice: 249,
      badge: "New",
    },
  ];

  const ribbonClasses = {
    Bestseller: "bg-primary text-primary-foreground",
    Popular: "bg-secondary text-foreground",
    New: "bg-charcoal text-background",
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.offsetWidth; // Scroll by the full width to show next 2 cards
      const newScrollPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-12">
          <div>
            <span className="text-sm font-medium text-primary tracking-wide uppercase opacity-50">Featured</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3">
              Top-Rated Courses
            </h2>
          </div>
          <Link to="/courses">
            <Button variant="elegant" className="group">
              View All Courses
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background shadow-lg hover:bg-accent"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background shadow-lg hover:bg-accent"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Carousel Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-hidden scrollbar-hide scroll-smooth px-12"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            <div className="flex gap-6 overflow-x-auto scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
              {courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="group bg-card rounded-3xl overflow-hidden shadow-md hover:shadow-luxury transition-all duration-500 border border-border/60 flex-shrink-0"
                  style={{ width: 'calc(50% - 12px)', scrollSnapAlign: 'start' }}
                >
                  <div className="flex flex-col h-full">
                    {/* Image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {course.badge && (
                        <div
                          className={`absolute -right-10 top-6 rotate-45 px-10 py-1 text-xs font-semibold ${ribbonClasses[course.badge] ?? "bg-primary text-primary-foreground"}`}
                        >
                          {course.badge}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col gap-4">
                      <div className="space-y-3">
                        <div className="border-l border-primary pl-4" style={{ borderLeftWidth: '2px' }}>
                          <h3 className="text-xl font-semibold text-foreground leading-tight uppercase">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2">
                            {course.lessons} lessons · {course.duration} hours
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <span className="font-semibold text-foreground">{course.rating}</span>
                          <span className="text-xs text-muted-foreground">({course.reviews})</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Price includes VAT</p>
                          <p className="text-2xl font-semibold text-foreground">${course.price}</p>
                          <p className="text-xs text-primary font-semibold">
                            Savings: ${Math.max((course.originalPrice || 0) - course.price, 0)}
                          </p>
                        </div>
                      </div>

                      <Button variant="hero" size="lg" className="w-full mt-4">
                        View Course
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
