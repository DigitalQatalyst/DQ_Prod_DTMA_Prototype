import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PublicPageLayout from "@/components/layout/PublicPageLayout";
import MeshSection from "@/components/layout/MeshSection";
import CourseCard from "@/components/marketing/CourseCard";
import CourseListRow from "@/components/marketing/CourseListRow";
import { ButlerAI } from "@/components/butler/ButlerAI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid3X3, List } from "lucide-react";
import { dtmaCoursesNew } from "@/data/dtmaCoursesNew";
import { eyebrow, landingHeroHeading, sectionPaddingX } from "@/lib/brandAccent";

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

  return (
    <PublicPageLayout>
      <MeshSection variant="heroLight" grid className={`${sectionPaddingX} pt-20 md:pt-24 lg:pt-28 lg:pb-24`}>
        <div className="relative z-10 mx-auto flex min-h-[280px] max-w-4xl flex-col justify-center md:min-h-[360px]">
          <p className={`${eyebrow} mb-4`}>Browse Courses</p>
          <h1 className={`${landingHeroHeading} mb-6`}>
            Explore Our <span className="text-dq-orange">Courses</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-gray-600">
            Master the 6XD framework with expert-led courses built for the digital economy.
          </p>
        </div>
      </MeshSection>

      <main className="pb-20">
        <section className="sticky top-16 z-40 border-b border-gray-200 bg-white py-6">
          <div className={`mx-auto max-w-[1280px] ${sectionPaddingX}`}>
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Search courses or instructors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-full border-gray-200 pl-10"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] rounded-full border-gray-200">
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
                  <SelectTrigger className="w-[150px] rounded-full border-gray-200">
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
              <div className="flex items-center gap-1 rounded-xl border border-gray-200 p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "rounded-lg bg-dq-navy text-white hover:bg-dq-navy/90" : "rounded-lg"}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "rounded-lg bg-dq-navy text-white hover:bg-dq-navy/90" : "rounded-lg"}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="bg-gray-50 px-5 pb-16 pt-10 md:px-8 md:pt-12 lg:px-10">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-8">
              <p className="text-[14px] text-gray-600">
                Showing <span className="font-semibold text-dq-navy">{filteredCourses.length}</span> courses
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <CourseListRow key={course.id} course={course} />
                ))}
              </div>
            )}

            {filteredCourses.length === 0 && (
              <div className="py-20 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <Search className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="mb-2 text-2xl font-medium text-dq-navy">No courses found</h3>
                <p className="mb-6 text-base text-gray-600">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline"
                  className="rounded-full border-gray-200"
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

      <ButlerAI />
    </PublicPageLayout>
  );
};

export default Courses;
