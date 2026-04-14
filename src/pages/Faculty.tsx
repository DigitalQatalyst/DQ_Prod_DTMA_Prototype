import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/input";
import { Star, Users, BookOpen, Search, Sparkles, User as UserIcon } from "lucide-react";
import { dtmaFaculty } from "@/data/dtmaFaculty";

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "human" | "ai">("all");

  const filteredFaculty = dtmaFaculty.filter((faculty) => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || faculty.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen">
      {/* Navy Background for Navbar and Hero */}
      <div className="bg-gradient-to-br from-[#1e2348] via-[#2a3058] to-[#1e2348]">
        <Navbar />
        
        {/* Header */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="max-w-2xl">
              <p className="text-[12px] leading-[16px] font-medium uppercase tracking-wide text-[#ff6b4d] mb-4">
                Meet Your Trainers
              </p>
              <h1 className="text-[40px] leading-[48px] font-semibold text-white mb-4">
                Learn from Hybrid HI + AI Faculty
              </h1>
              <p className="text-[16px] leading-[24px] font-normal text-white/80">
                DTMA's faculty combines three expert human instructors with AI-powered specialists — one for each digital dimension. Together, they deliver a learning experience that blends real-world insight with deep, always-available expertise.
              </p>
            </div>
          </div>
        </section>
      </div>

      <main className="pb-20">
        {/* Filters */}
        <section className="py-8 border-b border-[#E5E7EB] bg-white sticky top-20 z-40">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <Input
                    placeholder="Search faculty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-[#E5E7EB] text-[14px] leading-[20px] font-normal"
                  />
                </div>
              </div>

              {/* Type Toggle */}
              <div className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg p-1">
                <Button
                  variant={selectedType === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedType("all")}
                  className={`text-[16px] leading-[24px] font-normal ${selectedType === "all" ? "bg-[#181C3A] hover:bg-[#181C3A]/90 text-white" : ""}`}
                >
                  All Faculty
                </Button>
                <Button
                  variant={selectedType === "human" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedType("human")}
                  className={`text-[16px] leading-[24px] font-normal ${selectedType === "human" ? "bg-[#181C3A] hover:bg-[#181C3A]/90 text-white" : ""}`}
                >
                  <UserIcon className="w-4 h-4 mr-1" />
                  Human
                </Button>
                <Button
                  variant={selectedType === "ai" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedType("ai")}
                  className={`text-[16px] leading-[24px] font-normal ${selectedType === "ai" ? "bg-[#181C3A] hover:bg-[#181C3A]/90 text-white" : ""}`}
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="py-12 bg-[#F5F6FA]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="mb-8">
              <p className="text-[14px] leading-[20px] font-normal text-[#4B5563]">
                Showing <span className="font-medium text-[#0B0C19]">{filteredFaculty.length}</span> faculty members
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFaculty.map((faculty) => (
                <Link
                  key={faculty.id}
                  to={`/faculty/${faculty.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className={`absolute top-3 left-3 ${faculty.type === 'ai' ? 'bg-purple-600' : 'bg-[#ff6b4d]'} text-white`}>
                      {faculty.type === 'ai' ? (
                        <><Sparkles className="w-3 h-3 mr-1" /> AI Faculty</>
                      ) : (
                        <><UserIcon className="w-3 h-3 mr-1" /> Human Faculty</>
                      )}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-[20px] leading-[28px] font-medium text-[#0B0C19] mb-1 group-hover:text-[#ff6b4d] transition-colors">
                      {faculty.name}
                    </h3>
                    <p className="text-[14px] leading-[20px] font-normal text-[#ff6b4d] mb-2">{faculty.title}</p>
                    <p className="text-[14px] leading-[20px] font-normal text-[#4B5563] mb-4 line-clamp-2">{faculty.specialization}</p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {faculty.expertise.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-[12px] leading-[16px] font-medium border-[#E5E7EB]">
                          {skill}
                        </Badge>
                      ))}
                      {faculty.expertise.length > 2 && (
                        <Badge variant="outline" className="text-[12px] leading-[16px] font-medium border-[#E5E7EB]">
                          +{faculty.expertise.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-[14px] leading-[20px] font-normal text-[#4B5563] pt-4 border-t border-[#E5E7EB]">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#ff6b4d] fill-[#ff6b4d]" />
                        <span className="font-medium">{faculty.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{(faculty.students / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{faculty.coursesCount}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredFaculty.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-[20px] leading-[28px] font-medium text-foreground mb-2">No faculty found</h3>
                <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-6">Try adjusting your search criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedType("all");
                  }}
                  className="text-[16px] leading-[24px] font-normal"
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

export default Faculty;
