import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Users, Palette, Sparkles, Heart, Scissors, Brain, Stethoscope, BookOpen, Code, Lightbulb, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExploreCategoriesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const categories = [
    { id: "technology", icon: Zap, title: "Technology" },
    { id: "business", icon: Users, title: "Business" },
    { id: "design", icon: Palette, title: "Design" },
    { id: "marketing", icon: Sparkles, title: "Marketing" },
    { id: "data-ai", icon: Heart, title: "Data & AI" },
    { id: "personal-dev", icon: Scissors, title: "Personal Development" },
    { id: "finance", icon: Zap, title: "Finance" },
    { id: "health", icon: Stethoscope, title: "Health" },
    { id: "ai", icon: Brain, title: "Artificial Intelligence" },
    { id: "cs", icon: Code, title: "Computer Science" },
    { id: "language", icon: BookOpen, title: "Language Learning" },
    { id: "arts", icon: Lightbulb, title: "Arts and Humanities" },
  ];

  const coursesByCategory = {
    technology: [
      { id: 1, title: "The Ultimate AI/LLM/ML Penetration Testing Training Course", instructor: "Martin Voelk", image: "/ML.jpg", badge: "Premium", rating: 4.6, reviews: 599, price: 10.99, originalPrice: 54.99 },
      { id: 2, title: "ZERO Code AI Tests: Automate Software Tests in Plain English", instructor: "Kartik KK", image: "/ML.jpg", badge: "Hot & New", rating: 4.7, reviews: 39, price: 10.99, originalPrice: 49.99 },
      { id: 3, title: "AI for Business Analysts - The Complete Course", instructor: "George Smarts", image: "/ML.jpg", badge: "Bestseller", rating: 4.6, reviews: 399, price: 10.99, originalPrice: 49.99 },
      { id: 4, title: "Certified Chief AI Officer Program: AI Strategy & Governance", instructor: "School of AI", image: "/ML.jpg", badge: "Bestseller", rating: 4.5, reviews: 756, price: 10.99, originalPrice: 49.99 },
    ],
    business: [
      { id: 5, title: "Business Strategy Masterclass", instructor: "John Smith", image: "/ML.jpg", badge: "Popular", rating: 4.8, reviews: 450, price: 14.99, originalPrice: 59.99 },
      { id: 6, title: "Leadership Essentials", instructor: "Jane Doe", image: "/ML.jpg", badge: "Bestseller", rating: 4.7, reviews: 320, price: 12.99, originalPrice: 49.99 },
      { id: 7, title: "Project Management Pro", instructor: "Mike Johnson", image: "/ML.jpg", badge: "New", rating: 4.6, reviews: 200, price: 11.99, originalPrice: 44.99 },
      { id: 8, title: "Entrepreneurship 101", instructor: "Sarah Williams", image: "/ML.jpg", badge: "Popular", rating: 4.5, reviews: 280, price: 13.99, originalPrice: 54.99 },
    ],
    design: [
      { id: 9, title: "UI/UX Design Fundamentals", instructor: "Alex Chen", image: "/ML.jpg", badge: "Bestseller", rating: 4.9, reviews: 600, price: 9.99, originalPrice: 39.99 },
      { id: 10, title: "Advanced Graphic Design", instructor: "Emma Wilson", image: "/ML.jpg", badge: "Popular", rating: 4.7, reviews: 350, price: 11.99, originalPrice: 44.99 },
      { id: 11, title: "Web Design Mastery", instructor: "David Brown", image: "/ML.jpg", badge: "Hot & New", rating: 4.6, reviews: 180, price: 10.99, originalPrice: 49.99 },
      { id: 12, title: "Design Thinking Workshop", instructor: "Lisa Anderson", image: "/ML.jpg", badge: "Bestseller", rating: 4.8, reviews: 420, price: 12.99, originalPrice: 54.99 },
    ],
  };

  const currentCourses = coursesByCategory[categories[selectedCategory].id] || coursesByCategory.technology;

  const scroll = (direction) => {
    const container = document.getElementById("category-scroll");
    if (container) {
      const scrollAmount = 200;
      const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;
      container.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            Explore categories
          </h2>
        </div>

        {/* Category Pills with Scroll */}
        <div className="relative mb-12">
          <div
            id="category-scroll"
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isSelected = index === selectedCategory;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                    isSelected
                      ? "text-white shadow-md border-0"
                      : "bg-white text-foreground border border-border/50 hover:bg-muted/50"
                  }`}
                  style={isSelected ? { backgroundColor: 'var(--dq-navy-950)' } : {}}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Cards Carousel */}
        <div className="relative mb-8">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth">
            {currentCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border/50"
              >
                {/* Course Image */}
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Course Info */}
                <div className="p-4 flex flex-col gap-3">
                  <h3 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-foreground">{course.rating}</span>
                    <span className="text-xs text-muted-foreground">({course.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                    <span className="text-lg font-bold text-foreground">${course.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="flex justify-center">
          <Link
            to={`/courses?category=${categories[selectedCategory].id}`}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
          >
            View All
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreCategoriesSection;
