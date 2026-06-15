import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ButlerAI } from "@/components/butler/ButlerAI";
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
import { dtmaCoursesNew } from "@/data/dtmaCoursesNew";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "digital-economy", label: "Digital Economy" },
    { value: "digital-cognitive-organisation", label: "Digital Cognitive Organisation" },
    { value: "digital-business-platform", label: "Digital Business Platform" },
    { value: "digital-transformation", label: "Digital Transformation 2.0" },
    { value: "digital-worker-workspace", label: "Digital Worker & Workspace" },
    { value: "digital-accelerators", label: "Digital Accelerators" },
  ];

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const allCourses = dtmaCoursesNew;

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case "Bestseller": return "bg-[#0a0f1e] text-white";
      case "New": return "bg-white text-[#0a0f1e]";
      case "Popular": return "bg-[#f5f4f0] text-[#0a0f1e]";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#f5f4f0] pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">
            Browse Courses
          </p>
          <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold text-[#0a0f1e] mb-6 max-w-2xl">
            Explore Our <span className="text-[#ff4500]">Courses</span>
          </h1>
          <p className="text-[17px] text-[#4a4a5a] max-w-xl">
            Master the 6XD framework with expert-led courses built for the digital economy.
          </p>
        </div>
      </section>

      <main className="pb-20">

        {/* Filters */}
        <section className="py-6 border-b border-[#e8e8ec] bg-white sticky top-20 z-40">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b7b]" />
                  <Input
                    placeholder="Search courses or instructors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-[#e8e8ec] rounded-full"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] border-[#e8e8ec] rounded-full">
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
                  <SelectTrigger className="w-[150px] border-[#e8e8ec] rounded-full">
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
              <div className="flex items-center gap-1 border border-[#e8e8ec] rounded-xl p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-[#0a0f1e] hover:bg-[#0a0f1e]/90 text-white rounded-lg" : "rounded-lg"}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-[#0a0f1e] hover:bg-[#0a0f1e]/90 text-white rounded-lg" : "rounded-lg"}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12 bg-[#f5f4f0]">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="mb-8">
              <p className="text-[14px] text-[#6b6b7b]">
                Showing <span className="font-semibold text-[#0a0f1e]">{filteredCourses.length}</span> courses
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`flex-shrink-0 bg-white border border-[#e8e8ec] rounded-xl overflow-hidden transition-all ${
                      course.comingSoon
                        ? 'opacity-75 cursor-not-allowed'
                        : 'hover:shadow-md hover:-translate-y-0.5 group cursor-pointer'
                    }`}
                  >
                    {course.comingSoon ? (
                      // Coming Soon Card (not clickable)
                      <div>
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-1/2 -translate-x-1/2">
                            <div className="bg-white text-[#0a0f1e] text-[14px] leading-[20px] font-medium px-4 py-2 rounded-full shadow-md">
                              Coming Soon
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-[20px] leading-[28px] font-semibold text-[#0a0f1e] mb-3 line-clamp-2">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-4 text-[14px] leading-[20px] text-[#6b6b7b] mb-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-[#ff4500] fill-[#ff4500]" />
                              <span className="font-semibold text-[#0a0f1e]">{course.rating}</span>
                              <span className="text-[#6b6b7b]">({course.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-[12px] leading-[16px] text-[#6b6b7b] mb-4">
                            <BookOpen className="w-4 h-4" />
                            <span>Content in development</span>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-[#e8e8ec]">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[18px] leading-[26px] font-semibold text-[#0a0f1e]">${course.price}</span>
                              <span className="text-[12px] leading-[16px] text-[#b0b0b8] line-through">${course.originalPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Regular Course Card (clickable)
                      <Link to={`/courses/${course.id}`} className="block">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-[20px] leading-[28px] font-semibold text-[#0a0f1e] mb-3 line-clamp-2 group-hover:text-[#ff4500] transition-colors">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-4 text-[14px] leading-[20px] text-[#6b6b7b] mb-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-[#ff4500] fill-[#ff4500]" />
                              <span className="font-semibold text-[#0a0f1e]">{course.rating}</span>
                              <span className="text-[#6b6b7b]">({course.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-[12px] leading-[16px] text-[#6b6b7b] mb-4">
                            <BookOpen className="w-4 h-4" />
                            <span>{course.modules.length} modules • {course.totalLessons} lessons</span>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-[#e8e8ec]">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[18px] leading-[26px] font-semibold text-[#0a0f1e]">${course.price}</span>
                              <span className="text-[12px] leading-[16px] text-[#b0b0b8] line-through">${course.originalPrice}</span>
                            </div>
                            <Badge variant="outline" className="text-[11px] leading-[14px] font-semibold border-[#e8e8ec]">
                              {course.level}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`flex gap-6 bg-white border border-[#e8e8ec] rounded-xl overflow-hidden p-4 transition-all duration-500 ${
                      course.comingSoon
                        ? 'opacity-75 cursor-not-allowed'
                        : 'group hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
                    }`}
                  >
                    {course.comingSoon ? (
                      // Coming Soon List Item (not clickable)
                      <>
                        <div className="relative w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-1/2 -translate-x-1/2">
                            <div className="bg-white text-[#0a0f1e] text-[10px] leading-[14px] font-medium px-3 py-1.5 rounded-full shadow-md">
                              Coming Soon
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-[11px] leading-[14px] font-semibold capitalize text-[#ff4500]">
                                {course.category}
                              </Badge>
                              <span className="text-[11px] leading-[14px] font-semibold text-[#6b6b7b]">{course.level}</span>
                            </div>

                            <h3 className="text-[18px] leading-[26px] font-semibold text-[#0a0f1e] mb-2">
                              {course.title}
                            </h3>
                            <p className="text-[14px] leading-[20px] text-[#4a4a5a] mb-2">{course.description}</p>
                            <p className="text-[14px] leading-[20px] text-[#6b6b7b]">by {course.instructor}</p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-[#e8e8ec]">
                            <div className="flex items-center gap-6 text-[13px] leading-[18px] text-[#6b6b7b]">
                              <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 fill-[#ff4500] text-[#ff4500]" />
                                <span className="font-semibold text-[#0a0f1e]">{course.rating}</span>
                                <span>({course.reviews})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                Content in development
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-[12px] leading-[16px] text-[#b0b0b8] line-through">${course.originalPrice}</span>
                              <span className="text-[18px] leading-[26px] font-semibold text-[#0a0f1e]">${course.price}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Regular List Item (clickable)
                      <Link to={`/courses/${course.id}`} className="flex gap-6 flex-1">
                        <div className="relative w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
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
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-[11px] leading-[14px] font-semibold capitalize">
                                {course.category}
                              </Badge>
                              <span className="text-[11px] leading-[14px] font-semibold text-[#6b6b7b]">{course.level}</span>
                            </div>

                            <h3 className="text-[18px] leading-[26px] font-semibold text-[#0a0f1e] mb-2 group-hover:text-[#ff4500] transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-[14px] leading-[20px] text-[#4a4a5a] mb-2">{course.description}</p>
                            <p className="text-[14px] leading-[20px] text-[#6b6b7b]">by {course.instructor}</p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-[#e8e8ec]">
                            <div className="flex items-center gap-6 text-[13px] leading-[18px] text-[#6b6b7b]">
                              <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 fill-[#ff4500] text-[#ff4500]" />
                                <span className="font-semibold text-[#0a0f1e]">{course.rating}</span>
                                <span>({course.reviews})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                {course.modules.length} modules • {course.totalLessons} lessons
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-[12px] leading-[16px] text-[#b0b0b8] line-through">${course.originalPrice}</span>
                              <span className="text-[18px] leading-[26px] font-semibold text-[#0a0f1e]">${course.price}</span>
                              <ChevronRight className="w-5 h-5 text-[#6b6b7b] group-hover:text-[#ff4500] group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}

            {filteredCourses.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-[#f5f4f0] flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-[#6b6b7b]" />
                </div>
                <h3 className="text-[24px] leading-[32px] font-medium text-[#0a0f1e] mb-2">No courses found</h3>
                <p className="text-[16px] leading-[24px] text-[#6b6b7b] mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline"
                  className="rounded-full border-[#e8e8ec]"
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
      <ButlerAI />
    </div>
  );
};

export default Courses;
