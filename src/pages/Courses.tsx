import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Clock, BookOpen, Search, Grid3X3, List, ChevronRight } from "lucide-react";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "body-aesthetics", label: "Body Aesthetics & Sculpting" },
    { value: "breast-aesthetics", label: "Breast Aesthetics & Enhancement (Professional Awareness)" },
    { value: "facial-aesthetics", label: "Facial Aesthetics & Rejuvenation" },
    { value: "eye-feature", label: "Eye, Ear & Feature Enhancement" },
    { value: "injectables-fillers", label: "Injectables & Fillers (Theory & Safety)" },
    { value: "client-care", label: "Client Care, Ethics & Professional Practice" },
  ];

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "professional awareness", label: "Professional Awareness" },
  ];

  const allCourses = [
    {
      id: "body-1",
      title: "Introduction to Body Aesthetics & Client Assessment",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "body-aesthetics",
      level: "Beginner",
      duration: "4 hours",
      lessons: 10,
      rating: 4.8,
      reviews: 320,
      price: 149,
      originalPrice: 199,
      badge: "New",
      description: "Foundations of body aesthetics, assessment, and client readiness.",
    },
    {
      id: "body-2",
      title: "Body Contouring Fundamentals",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "body-aesthetics",
      level: "Intermediate",
      duration: "6 hours",
      lessons: 14,
      rating: 4.7,
      reviews: 280,
      price: 199,
      originalPrice: 249,
      badge: null,
      description: "Core techniques, device awareness, and treatment planning for body contouring.",
    },
    {
      id: "body-3",
      title: "Safety, Hygiene & Aftercare in Body Treatments",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "body-aesthetics",
      level: "Intermediate",
      duration: "4 hours",
      lessons: 12,
      rating: 4.9,
      reviews: 190,
      price: 159,
      originalPrice: 209,
      badge: "Bestseller",
      description: "Protocols to protect clients and practitioners across body sculpting services.",
    },
    {
      id: "body-4",
      title: "Non-Surgical Tummy Sculpting Techniques",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "body-aesthetics",
      level: "Advanced",
      duration: "5 hours",
      lessons: 11,
      rating: 4.6,
      reviews: 165,
      price: 219,
      originalPrice: 279,
      badge: null,
      description: "Technique awareness, device options, and client communication for abdomen sculpting.",
    },
    {
      id: "body-5",
      title: "Waistline Contouring & Fat Reduction Methods",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "body-aesthetics",
      level: "Advanced",
      duration: "6 hours",
      lessons: 13,
      rating: 4.7,
      reviews: 142,
      price: 229,
      originalPrice: 289,
      badge: null,
      description: "Compare waistline contouring options, expected outcomes, and safety factors.",
    },
    {
      id: "body-6",
      title: "Brazilian Butt Lift (BBL) Awareness & Post-Care Training",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "body-aesthetics",
      level: "Professional Awareness",
      duration: "4 hours",
      lessons: 9,
      rating: 4.6,
      reviews: 130,
      price: 189,
      originalPrice: 239,
      badge: "Popular",
      description: "Awareness training and aftercare guidance for clients pursuing BBL procedures.",
    },
    {
      id: "body-7",
      title: "Advanced Body Sculpting Protocols",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "body-aesthetics",
      level: "Advanced",
      duration: "7 hours",
      lessons: 16,
      rating: 4.8,
      reviews: 118,
      price: 259,
      originalPrice: 329,
      badge: null,
      description: "Protocol design, client monitoring, and results tracking for sculpting services.",
    },
    {
      id: "body-8",
      title: "Client Consultation & Results Management for Body Treatments",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "body-aesthetics",
      level: "Intermediate",
      duration: "3 hours",
      lessons: 8,
      rating: 4.7,
      reviews: 201,
      price: 149,
      originalPrice: 199,
      badge: null,
      description: "Consultation scripts, expectations management, and before/after tracking.",
    },
    {
      id: "breast-1",
      title: "Understanding Breast Anatomy for Beauty Professionals",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "breast-aesthetics",
      level: "Professional Awareness",
      duration: "3 hours",
      lessons: 7,
      rating: 4.6,
      reviews: 156,
      price: 139,
      originalPrice: 189,
      badge: null,
      description: "Foundational anatomy awareness to support informed conversations with clients.",
    },
    {
      id: "breast-2",
      title: "Client Consultation for Breast Aesthetic Services",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "breast-aesthetics",
      level: "Professional Awareness",
      duration: "3 hours",
      lessons: 8,
      rating: 4.7,
      reviews: 132,
      price: 149,
      originalPrice: 199,
      badge: null,
      description: "Ethical consultation frameworks for clients exploring breast-focused services.",
    },
    {
      id: "breast-3",
      title: "Breast Enhancement Options: Surgical vs Non-Surgical Overview",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "breast-aesthetics",
      level: "Professional Awareness",
      duration: "4 hours",
      lessons: 9,
      rating: 4.6,
      reviews: 120,
      price: 179,
      originalPrice: 229,
      badge: "Popular",
      description: "Awareness course comparing approaches, safety considerations, and recovery themes.",
    },
    {
      id: "breast-4",
      title: "Breast Lift & Reduction: Beauty Professional’s Role",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "breast-aesthetics",
      level: "Professional Awareness",
      duration: "3 hours",
      lessons: 7,
      rating: 4.5,
      reviews: 101,
      price: 159,
      originalPrice: 209,
      badge: null,
      description: "Scope of practice, support boundaries, and post-procedure coordination.",
    },
    {
      id: "breast-5",
      title: "Post-Procedure Skincare & Recovery Support",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "breast-aesthetics",
      level: "Professional Awareness",
      duration: "3 hours",
      lessons: 8,
      rating: 4.7,
      reviews: 143,
      price: 169,
      originalPrice: 219,
      badge: null,
      description: "Supportive care guidance for clients recovering from breast procedures.",
    },
    {
      id: "breast-6",
      title: "Gynecomastia Awareness & Client Sensitivity Training",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "breast-aesthetics",
      level: "Professional Awareness",
      duration: "2.5 hours",
      lessons: 6,
      rating: 4.6,
      reviews: 115,
      price: 149,
      originalPrice: 189,
      badge: null,
      description: "Sensitive client communication and awareness around gynecomastia journeys.",
    },
    {
      id: "face-1",
      title: "Facial Anatomy for Beauty Professionals",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "facial-aesthetics",
      level: "Beginner",
      duration: "4 hours",
      lessons: 9,
      rating: 4.8,
      reviews: 240,
      price: 149,
      originalPrice: 199,
      badge: null,
      description: "Understand facial structures to plan safe, effective aesthetic treatments.",
    },
    {
      id: "face-2",
      title: "Introduction to Facial Aesthetics",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "facial-aesthetics",
      level: "Beginner",
      duration: "5 hours",
      lessons: 10,
      rating: 4.7,
      reviews: 210,
      price: 169,
      originalPrice: 219,
      badge: "New",
      description: "Core facial rejuvenation concepts and client readiness checks.",
    },
    {
      id: "face-3",
      title: "Client Skin Analysis & Treatment Planning",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "facial-aesthetics",
      level: "Intermediate",
      duration: "4 hours",
      lessons: 9,
      rating: 4.8,
      reviews: 180,
      price: 179,
      originalPrice: 229,
      badge: null,
      description: "Structured assessments to tailor facial rejuvenation plans safely.",
    },
    {
      id: "face-4",
      title: "Facelift Alternatives: Non-Surgical Facial Rejuvenation",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "facial-aesthetics",
      level: "Advanced",
      duration: "6 hours",
      lessons: 12,
      rating: 4.7,
      reviews: 155,
      price: 219,
      originalPrice: 269,
      badge: null,
      description: "Compare non-surgical options, expected outcomes, and safety considerations.",
    },
    {
      id: "face-5",
      title: "Upper & Lower Eye Area Treatments",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "facial-aesthetics",
      level: "Intermediate",
      duration: "4 hours",
      lessons: 8,
      rating: 4.6,
      reviews: 140,
      price: 179,
      originalPrice: 229,
      badge: null,
      description: "Eye-area focused rejuvenation options and aftercare planning.",
    },
    {
      id: "face-6",
      title: "Facial Fat Transfer Awareness & Skin Support",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "facial-aesthetics",
      level: "Professional Awareness",
      duration: "3 hours",
      lessons: 7,
      rating: 4.5,
      reviews: 120,
      price: 169,
      originalPrice: 209,
      badge: null,
      description: "Awareness of fat transfer procedures and supportive skincare protocols.",
    },
    {
      id: "face-7",
      title: "Facial Contouring & Volume Restoration",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "facial-aesthetics",
      level: "Advanced",
      duration: "5 hours",
      lessons: 11,
      rating: 4.7,
      reviews: 133,
      price: 219,
      originalPrice: 279,
      badge: null,
      description: "Balancing facial proportions with safe, ethical contouring strategies.",
    },
    {
      id: "face-8",
      title: "Professional Practice in Face & Lip Fillers",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "facial-aesthetics",
      level: "Professional Awareness",
      duration: "4 hours",
      lessons: 10,
      rating: 4.6,
      reviews: 125,
      price: 209,
      originalPrice: 259,
      badge: null,
      description: "Ethical, safety-focused overview of face and lip filler practice.",
    },
    {
      id: "eye-1",
      title: "Upper Blepharoplasty: Beauty Support & Aftercare",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "eye-feature",
      level: "Professional Awareness",
      duration: "3 hours",
      lessons: 7,
      rating: 4.6,
      reviews: 110,
      price: 169,
      originalPrice: 219,
      badge: null,
      description: "Awareness of upper eyelid procedures and supportive aftercare guidance.",
    },
    {
      id: "eye-2",
      title: "Lower Blepharoplasty Awareness Training",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "eye-feature",
      level: "Professional Awareness",
      duration: "3 hours",
      lessons: 7,
      rating: 4.5,
      reviews: 98,
      price: 169,
      originalPrice: 219,
      badge: null,
      description: "Understand lower eyelid procedure journeys and client sensitivity needs.",
    },
    {
      id: "eye-3",
      title: "Eye Area Rejuvenation Techniques",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "eye-feature",
      level: "Intermediate",
      duration: "4 hours",
      lessons: 9,
      rating: 4.7,
      reviews: 140,
      price: 179,
      originalPrice: 229,
      badge: "Bestseller",
      description: "Non-surgical options and aftercare strategies for the eye area.",
    },
    {
      id: "eye-4",
      title: "Otoplasty (Ear Aesthetics) Awareness & Client Support",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "eye-feature",
      level: "Professional Awareness",
      duration: "3 hours",
      lessons: 7,
      rating: 4.5,
      reviews: 102,
      price: 169,
      originalPrice: 219,
      badge: null,
      description: "Awareness of otoplasty journeys, recovery, and client communication.",
    },
    {
      id: "eye-5",
      title: "Enhancing Facial Harmony Through Feature Balance",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "eye-feature",
      level: "Intermediate",
      duration: "4 hours",
      lessons: 8,
      rating: 4.6,
      reviews: 118,
      price: 179,
      originalPrice: 229,
      badge: null,
      description: "Balancing eyes, ears, and other facial features for aesthetic harmony.",
    },
    {
      id: "inject-1",
      title: "Introduction to Aesthetic Injectables",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "injectables-fillers",
      level: "Professional Awareness",
      duration: "4 hours",
      lessons: 9,
      rating: 4.7,
      reviews: 190,
      price: 199,
      originalPrice: 249,
      badge: "Popular",
      description: "Foundations, safety, and ethics for aesthetic injectables awareness.",
    },
    {
      id: "inject-2",
      title: "Facial & Lip Fillers: Product Knowledge & Safety",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "injectables-fillers",
      level: "Professional Awareness",
      duration: "4 hours",
      lessons: 9,
      rating: 4.6,
      reviews: 170,
      price: 199,
      originalPrice: 249,
      badge: null,
      description: "Safety-first product knowledge and complication awareness for fillers.",
    },
    {
      id: "inject-3",
      title: "Client Consultation for Injectables",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "injectables-fillers",
      level: "Professional Awareness",
      duration: "3 hours",
      lessons: 8,
      rating: 4.7,
      reviews: 155,
      price: 179,
      originalPrice: 229,
      badge: null,
      description: "Ethical consults, safety scripting, and expectation management for injectables.",
    },
    {
      id: "inject-4",
      title: "Managing Expectations & Ethical Practice",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "injectables-fillers",
      level: "Professional Awareness",
      duration: "3 hours",
      lessons: 7,
      rating: 4.6,
      reviews: 140,
      price: 169,
      originalPrice: 219,
      badge: null,
      description: "Ethics, scope of practice, and risk communication for injectable services.",
    },
    {
      id: "client-1",
      title: "Aesthetic Ethics & Scope of Practice",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "client-care",
      level: "Intermediate",
      duration: "3 hours",
      lessons: 7,
      rating: 4.8,
      reviews: 210,
      price: 159,
      originalPrice: 199,
      badge: "Bestseller",
      description: "Ethical frameworks and scope boundaries for beauty and aesthetics professionals.",
    },
    {
      id: "client-2",
      title: "Client Communication & Consent",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "client-care",
      level: "Intermediate",
      duration: "3 hours",
      lessons: 8,
      rating: 4.7,
      reviews: 180,
      price: 149,
      originalPrice: 189,
      badge: null,
      description: "Consent best practices, documentation, and client trust building.",
    },
    {
      id: "client-3",
      title: "Pre- and Post-Treatment Care Excellence",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "client-care",
      level: "Intermediate",
      duration: "4 hours",
      lessons: 9,
      rating: 4.7,
      reviews: 165,
      price: 169,
      originalPrice: 219,
      badge: null,
      description: "End-to-end care journeys that improve satisfaction and outcomes.",
    },
    {
      id: "client-4",
      title: "Building a Career in Beauty & Aesthetics",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "client-care",
      level: "Beginner",
      duration: "3 hours",
      lessons: 7,
      rating: 4.6,
      reviews: 170,
      price: 129,
      originalPrice: 169,
      badge: null,
      description: "Career paths, certifications, and practical steps to grow in aesthetics.",
    },
    {
      id: "client-5",
      title: "Setting Up a Beauty Aesthetics Practice",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "client-care",
      level: "Intermediate",
      duration: "4 hours",
      lessons: 9,
      rating: 4.6,
      reviews: 150,
      price: 179,
      originalPrice: 229,
      badge: null,
      description: "Operations, compliance, and client experience design for new practices.",
    },
    {
      id: "client-6",
      title: "Branding & Client Retention for Beauty Professionals",
      instructor: "BROWZ Faculty",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      category: "client-care",
      level: "Intermediate",
      duration: "3 hours",
      lessons: 8,
      rating: 4.7,
      reviews: 175,
      price: 159,
      originalPrice: 209,
      badge: null,
      description: "Brand building, retention, and service packaging for beauty pros.",
    },
  ];

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case "Bestseller": return "bg-primary text-primary-foreground";
      case "New": return "bg-white text-foreground";
      case "Popular": return "bg-muted text-foreground";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-28 pb-20">
        {/* Header */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Explore Our Courses
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover expert-led courses designed to elevate your beauty skills and accelerate your career.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border bg-background sticky top-20 z-40">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses or instructors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Level Filter */}
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="group bg-card rounded-3xl overflow-hidden shadow-md hover:shadow-luxury transition-all duration-500 border border-border/60 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {course.badge && (
                        <Badge className={`absolute top-3 left-3 ${getBadgeVariant(course.badge)}`}>
                          {course.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col gap-4">
                      <div className="space-y-3">
                        <div className="border-l border-primary pl-4" style={{ borderLeftWidth: '2px' }}>
                          <h3 className="text-base font-semibold text-foreground leading-tight uppercase">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2">
                            {course.lessons} lessons · {course.duration}
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
                          <p className="text-xs text-muted-foreground line-through">${course.originalPrice}</p>
                          <p className="text-lg font-semibold text-foreground">${course.price}</p>
                        </div>
                      </div>

                      <Button variant="hero" size="lg" className="w-full mt-2">
                        View Course
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="group flex gap-6 bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-luxury transition-all duration-500 p-4"
                  >
                    <div className="relative w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {course.badge && (
                        <Badge className={`absolute top-2 left-2 text-xs ${getBadgeVariant(course.badge)}`}>
                          {course.badge}
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs font-medium capitalize">
                            {course.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{course.level}</span>
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="font-semibold text-foreground">{course.rating}</span>
                            <span>({course.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {course.lessons} lessons
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground line-through">${course.originalPrice}</span>
                          <span className="text-xl font-semibold text-primary">${course.price}</span>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {filteredCourses.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedLevel("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
