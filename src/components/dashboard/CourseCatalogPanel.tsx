import { useState } from "react";
import CourseCard from "@/components/marketing/CourseCard";
import CourseListRow from "@/components/marketing/CourseListRow";
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
import {
  learnerBody,
  learnerEmptyBody,
  learnerEmptyTitle,
} from "@/lib/brandAccent";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "digital-economy", label: "Digital Economy" },
  { value: "digital-cognitive-organisation", label: "Digital Cognitive Organisation" },
  { value: "digital-business-platform", label: "Digital Business Platform" },
  { value: "digital-transformation", label: "Digital Transformation 2.0" },
  { value: "digital-worker-workspace", label: "Digital Worker & Workspace" },
  { value: "digital-accelerators", label: "Digital Accelerators" },
];

const LEVELS = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

type CourseCatalogPanelProps = {
  embedded?: boolean;
  initialCategory?: string;
  onCourseClick?: (courseId: string) => void;
};

export function CourseCatalogPanel({
  embedded = false,
  initialCategory = "all",
  onCourseClick,
}: CourseCatalogPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCourses = dtmaCoursesNew.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
  };

  return (
    <div className={cn(!embedded && "pb-20")}>
      <section
        className={cn(
          "border-b border-gray-200 bg-white py-4",
          embedded ? "sticky top-0 z-20" : "sticky top-16 z-40 py-6"
        )}
      >
        <div className={cn(!embedded && "mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10", embedded && "px-4 lg:px-8")}>
          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-wrap gap-4">
              <div className="relative min-w-[200px] max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search courses or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-full border-gray-200 pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] rounded-full border-gray-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[150px] rounded-full border-gray-200">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1 rounded-xl border border-gray-200 p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "rounded-lg bg-dq-orange text-white hover:bg-dq-orange/90"
                    : "rounded-lg"
                }
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "rounded-lg bg-dq-orange text-white hover:bg-dq-orange/90"
                    : "rounded-lg"
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={cn("pt-6", embedded ? "px-4 pb-8 lg:px-8" : "bg-gray-50 px-5 pb-16 pt-10 md:px-8 md:pt-12 lg:px-10")}>
        <div className={cn(!embedded && "mx-auto max-w-[1280px]")}>
          <div className="mb-6">
            <p className={learnerBody}>
              Showing{" "}
              <span className="font-semibold text-dq-navy">{filteredCourses.length}</span> courses
            </p>
          </div>

          {viewMode === "grid" ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} onCourseClick={onCourseClick} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <CourseListRow key={course.id} course={course} onCourseClick={onCourseClick} />
              ))}
            </div>
          )}

          {filteredCourses.length === 0 && (
            <div className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className={cn(learnerEmptyTitle, "mb-2")}>No courses found</h3>
              <p className={cn(learnerEmptyBody, "mb-6")}>
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                className="rounded-full border-gray-200"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CourseCatalogPanel;
