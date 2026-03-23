import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Star, Users, BookOpen, ChevronLeft, Sparkles, User as UserIcon, Award, Clock } from "lucide-react";
import { dtmaFaculty } from "@/data/dtmaFaculty";
import { dtmaCourses } from "@/data/dtmaCourses";

const FacultyDetail = () => {
  const { id } = useParams();
  const faculty = dtmaFaculty.find(f => f.id === id);

  if (!faculty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Faculty member not found</h2>
          <Link to="/faculty">
            <Button>Back to Faculty</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get courses taught by this faculty member
  const facultyCourses = dtmaCourses.filter(course => 
    faculty.courses.includes(course.id)
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 mb-6">
          <Link to="/faculty" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Faculty
          </Link>
        </div>

        {/* Faculty Profile Header */}
        <section className="bg-gradient-to-br from-[#1e2348] via-[#2a3058] to-[#1e2348] text-white">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-16">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Faculty Image */}
              <div className="lg:col-span-1">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className={`absolute top-4 left-4 ${faculty.type === 'ai' ? 'bg-purple-600' : 'bg-[#ff6b4d]'} text-white`}>
                    {faculty.type === 'ai' ? (
                      <><Sparkles className="w-3 h-3 mr-1" /> AI Faculty</>
                    ) : (
                      <><UserIcon className="w-3 h-3 mr-1" /> Human Faculty</>
                    )}
                  </Badge>
                </div>
              </div>

              {/* Faculty Info */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
                  {faculty.name}
                </h1>
                <p className="text-xl text-[#ff6b4d] mb-4">{faculty.title}</p>
                <p className="text-base text-white/80 leading-relaxed mb-6">
                  {faculty.specialization}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#ff6b4d] fill-[#ff6b4d]" />
                    <div>
                      <div className="text-2xl font-semibold">{faculty.rating}</div>
                      <div className="text-sm text-white/70">Rating</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#ff6b4d]" />
                    <div>
                      <div className="text-2xl font-semibold">{(faculty.students / 1000).toFixed(1)}K</div>
                      <div className="text-sm text-white/70">Students</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#ff6b4d]" />
                    <div>
                      <div className="text-2xl font-semibold">{faculty.coursesCount}</div>
                      <div className="text-sm text-white/70">Courses</div>
                    </div>
                  </div>
                </div>

                {/* Expertise */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70 mb-3">
                    Areas of Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {faculty.expertise.map((skill, index) => (
                      <Badge key={index} className="bg-white/10 text-white border-white/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19] mb-6">
                About {faculty.name}
              </h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                {faculty.bio}
              </p>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16 bg-[#F5F6FA]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19] mb-2">
                Courses by {faculty.name}
              </h2>
              <p className="text-base text-[#4B5563]">
                Explore {facultyCourses.length} courses taught by this faculty member
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facultyCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-lg transition-all group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-[#ff6b4d] text-white">
                      {course.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#0B0C19] mb-2 line-clamp-2 group-hover:text-[#ff6b4d] transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#4B5563] mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#ff6b4d] fill-[#ff6b4d]" />
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-[#9CA3AF]">({course.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[#0B0C19]">${course.price}</span>
                        <span className="text-sm text-[#9CA3AF] line-through">${course.originalPrice}</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-[#E5E7EB]">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FacultyDetail;
