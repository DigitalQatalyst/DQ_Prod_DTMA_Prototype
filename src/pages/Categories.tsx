import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sparkles, Scissors, Palette, Heart, ChevronRight } from "lucide-react";

interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  courseCount: number;
  color: string;
}

const Categories = () => {
  const categories: Category[] = [
    {
      id: "1",
      slug: "body-aesthetics",
      title: "Body Aesthetics & Sculpting",
      description: "Contouring fundamentals, safety, and advanced sculpting protocols.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      icon: Scissors,
      courseCount: 8,
      color: "from-amber-500/20 to-amber-600/20",
    },
    {
      id: "2",
      slug: "breast-aesthetics",
      title: "Breast Aesthetics & Enhancement",
      description: "Professional awareness, consultation, and post-care support.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      icon: Sparkles,
      courseCount: 6,
      color: "from-rose-500/20 to-rose-600/20",
    },
    {
      id: "3",
      slug: "facial-aesthetics",
      title: "Facial Aesthetics & Rejuvenation",
      description: "Anatomy, skin analysis, contouring, and non-surgical rejuvenation.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      icon: Heart,
      courseCount: 8,
      color: "from-emerald-500/20 to-emerald-600/20",
    },
    {
      id: "4",
      slug: "eye-feature",
      title: "Eye, Ear & Feature Enhancement",
      description: "Blepharoplasty awareness, otoplasty support, and feature balancing.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      icon: Palette,
      courseCount: 5,
      color: "from-purple-500/20 to-purple-600/20",
    },
    {
      id: "5",
      slug: "injectables-fillers",
      title: "Injectables & Fillers (Theory & Safety)",
      description: "Safety-first injectables theory, ethics, and client consultations.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      icon: Scissors,
      courseCount: 4,
      color: "from-sky-500/20 to-sky-600/20",
    },
    {
      id: "6",
      slug: "client-care",
      title: "Client Care, Ethics & Professional Practice",
      description: "Ethics, consent, client care, and building a career in aesthetics.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      icon: Heart,
      courseCount: 6,
      color: "from-indigo-500/20 to-indigo-600/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100/50 to-background" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Course Categories</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
              Explore Our{" "}
              <span className="text-primary">Course Categories</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose your path to mastery. Each category offers expert-led courses 
              designed to elevate your skills and advance your career.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/courses?category=${category.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-luxury"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-50`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-8 lg:p-10 min-h-[320px] flex flex-col justify-end">
                  {/* Icon */}
                  <div className="absolute top-8 right-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <category.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Course Count Badge */}
                  <div className="absolute top-8 left-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium text-foreground">
                      {category.courseCount} Courses
                    </span>
                  </div>

                  {/* Text Content */}
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      {category.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <span>Browse Courses</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 lg:py-24 bg-cream-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Can't Decide Where to Start?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Each category is designed for different skill levels. Whether you're a beginner 
              looking to enter the beauty industry or an experienced professional seeking 
              advanced techniques, we have the right course for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-foreground">Beginner Friendly</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-sm text-foreground">Intermediate</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm text-foreground">Advanced</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categories;
