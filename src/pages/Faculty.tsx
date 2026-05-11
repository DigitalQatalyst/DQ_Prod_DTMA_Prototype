import { Linkedin, Mail, Award } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Faculty = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "human" | "ai">("all");

  const humanFaculty = [
    {
      name: "Dr. Ahmed Al-Mansouri",
      title: "Director of Digital Transformation",
      expertise: "Digital Strategy, Organizational Change",
      bio: "20+ years of experience leading digital transformation initiatives across Fortune 500 companies.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      type: "human",
    },
    {
      name: "Sarah Johnson",
      title: "Senior Instructor - Digital Innovation",
      expertise: "Innovation Management, Technology Strategy",
      bio: "Former CTO with expertise in building high-performing digital teams and innovation ecosystems.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop",
      type: "human",
    },
    {
      name: "Prof. Rajesh Kumar",
      title: "Faculty - Business Transformation",
      expertise: "Business Models, Customer Experience",
      bio: "Academic researcher and practitioner focused on digital business model innovation.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop",
      type: "human",
    },
    {
      name: "Lisa Chen",
      title: "Instructor - Digital Workforce Development",
      expertise: "Talent Development, Organizational Culture",
      bio: "HR transformation specialist helping organizations build digital-ready workforces.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop",
      type: "human",
    },
    {
      name: "Michael O'Brien",
      title: "Senior Instructor - Technology & Operations",
      expertise: "Cloud Architecture, Digital Operations",
      bio: "Technology leader with deep expertise in cloud transformation and operational excellence.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      type: "human",
    },
    {
      name: "Dr. Fatima Al-Zahra",
      title: "Faculty - Customer Experience",
      expertise: "Customer Journey, Digital Marketing",
      bio: "Customer experience strategist helping organizations deliver exceptional digital experiences.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop",
      type: "human",
    },
  ];

  const aiFaculty = [
    {
      name: "Eco",
      title: "Digital Economy Strategist",
      expertise: "Economy 4.0 Dynamics, Industry Disruption, Competitive Positioning",
      bio: "Your go-to AI for understanding Economy 4.0 dynamics, analyzing industry disruption, crafting competitive positioning strategies, and innovating digital business models to thrive in the digital economy.",
      image: "/ai-leadership.png",
      type: "ai",
      dimension: "Digital Economy",
    },
    {
      name: "Cognito",
      title: "Cognitive Organization Architect",
      expertise: "Intelligent Organizations, Data-Driven Decisions, Cognitive Maturity",
      bio: "Your go-to AI for designing intelligent organizations, implementing data-driven decision systems, assessing cognitive maturity, and building AI-powered operational agility.",
      image: "/ai-operations.png",
      type: "ai",
      dimension: "Digital Cognitive Organisation",
    },
    {
      name: "Nexus",
      title: "Platform Architecture Expert",
      expertise: "Digital Platforms, Enterprise Integration, API Ecosystems",
      bio: "Your go-to AI for designing digital business platforms, orchestrating enterprise integrations, managing API ecosystems, and building scalable digital infrastructure.",
      image: "/ai-technology.png",
      type: "ai",
      dimension: "Digital Business Platform",
    },
    {
      name: "Transform",
      title: "Transformation Strategist",
      expertise: "Target State Design, Transformation Roadmaps, Change Execution",
      bio: "Your go-to AI for architecting target states, roadmapping transformation journeys, executing change methodologies, and delivering scaled transformation frameworks.",
      image: "/ai-culture.png",
      type: "ai",
      dimension: "Digital Transformation 2.0",
    },
    {
      name: "Catalyst",
      title: "Workforce Transformation Specialist",
      expertise: "Digital Skills, Hybrid Work Models, Organizational Culture",
      bio: "Your go-to AI for transforming workforces, developing digital skills, designing hybrid work models, and building transformation-ready organizational cultures.",
      image: "/ai-innovation.png",
      type: "ai",
      dimension: "Digital Worker & Workspace",
    },
    {
      name: "Velocity",
      title: "Acceleration Expert",
      expertise: "Rapid Delivery, Agile Frameworks, Time-Compression Strategies",
      bio: "Your go-to AI for rapid delivery methodologies, transformation acceleration tools, agile execution frameworks, and time-compression strategies to speed up your transformation.",
      image: "/ai-trust.png",
      type: "ai",
      dimension: "Digital Accelerators",
    },
  ];

  const allFaculty = [...humanFaculty, ...aiFaculty];
  const displayedFaculty = activeFilter === "all" ? allFaculty : activeFilter === "human" ? humanFaculty : aiFaculty;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[var(--dq-navy-950)]">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[12px] leading-[16px] font-semibold uppercase tracking-wide text-[var(--dq-orange-500)] mb-6">
                Meet Our Team
              </p>
              <h1 className="text-[40px] leading-[48px] font-semibold text-white mb-6">
                Our Faculty
              </h1>
              <p className="text-[18px] leading-[28px] font-normal text-white/90 max-w-3xl mx-auto">
                Learn from industry experts and AI-powered specialists with decades of combined experience in digital transformation.
              </p>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Faculty Filter Tabs */}
        <section className="py-8 bg-white border-b border-[var(--dq-navy-100)]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-6 py-2 font-semibold rounded-[8px] transition-colors ${
                  activeFilter === "all"
                    ? "bg-[var(--dq-orange-500)] text-white"
                    : "bg-[var(--dq-navy-50)] text-[var(--dq-text-secondary)] hover:bg-[var(--dq-navy-100)]"
                }`}
              >
                All Faculty
              </button>
              <button
                onClick={() => setActiveFilter("human")}
                className={`px-6 py-2 font-semibold rounded-[8px] transition-colors ${
                  activeFilter === "human"
                    ? "bg-[var(--dq-orange-500)] text-white"
                    : "bg-[var(--dq-navy-50)] text-[var(--dq-text-secondary)] hover:bg-[var(--dq-navy-100)]"
                }`}
              >
                Human Faculty
              </button>
              <button
                onClick={() => setActiveFilter("ai")}
                className={`px-6 py-2 font-semibold rounded-[8px] transition-colors ${
                  activeFilter === "ai"
                    ? "bg-[var(--dq-orange-500)] text-white"
                    : "bg-[var(--dq-navy-50)] text-[var(--dq-text-secondary)] hover:bg-[var(--dq-navy-100)]"
                }`}
              >
                AI Faculty
              </button>
            </div>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedFaculty.map((member, index) => (
                <div
                  key={index}
                  className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Avatar */}
                  <div className="w-full h-56 overflow-hidden bg-[var(--dq-navy-100)]">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[var(--dq-navy-950)] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-[var(--dq-orange-500)] mb-3">
                      {member.title}
                    </p>

                    {member.type === "ai" && (
                      <p className="text-xs font-semibold text-[var(--dq-navy-600)] uppercase tracking-wide mb-3">
                        {(member as any).dimension}
                      </p>
                    )}

                    <div className="mb-4 pb-4 border-b border-[var(--dq-navy-100)]">
                      <p className="text-xs font-semibold text-[var(--dq-navy-600)] uppercase tracking-wide mb-2">
                        Expertise
                      </p>
                      <p className="text-sm text-[var(--dq-navy-600)]">
                        {member.expertise}
                      </p>
                    </div>

                    <p className="text-sm text-[var(--dq-navy-600)] mb-6 line-clamp-3">
                      {member.bio}
                    </p>

                    {/* Social Links - Only for Human Faculty */}
                    {member.type === "human" && (
                      <div className="flex gap-3">
                        <button className="flex-1 px-3 py-2 bg-[var(--dq-navy-50)] hover:bg-[var(--dq-navy-100)] rounded-[6px] flex items-center justify-center gap-2 transition-colors">
                          <Linkedin className="w-4 h-4 text-[var(--dq-orange-500)]" />
                          <span className="text-xs font-semibold text-[var(--dq-navy-950)]">Profile</span>
                        </button>
                        <button className="flex-1 px-3 py-2 bg-[var(--dq-navy-50)] hover:bg-[var(--dq-navy-100)] rounded-[6px] flex items-center justify-center gap-2 transition-colors">
                          <Mail className="w-4 h-4 text-[var(--dq-orange-500)]" />
                          <span className="text-xs font-semibold text-[var(--dq-navy-950)]">Contact</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials Section */}
        <section className="py-16 lg:py-24 bg-[var(--dq-navy-50)]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-12">Faculty Credentials</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] p-8 text-center">
                <div className="w-12 h-12 bg-[var(--dq-orange-500)] rounded-[8px] flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[var(--dq-navy-950)] mb-2">
                  Industry Experts
                </h3>
                <p className="text-[var(--dq-navy-600)]">
                  All faculty members bring real-world experience from leading organizations.
                </p>
              </div>

              <div className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] p-8 text-center">
                <div className="w-12 h-12 bg-[var(--dq-orange-500)] rounded-[8px] flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[var(--dq-navy-950)] mb-2">
                  Advanced Degrees
                </h3>
                <p className="text-[var(--dq-navy-600)]">
                  Many hold advanced degrees from prestigious universities worldwide.
                </p>
              </div>

              <div className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] p-8 text-center">
                <div className="w-12 h-12 bg-[var(--dq-orange-500)] rounded-[8px] flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[var(--dq-navy-950)] mb-2">
                  Thought Leaders
                </h3>
                <p className="text-[var(--dq-navy-600)]">
                  Published authors and speakers at international conferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16 text-center">
            <h2 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-[var(--dq-navy-950)] mb-4">
              Learn from the Best
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-secondary)] mb-8 max-w-2xl mx-auto">
              Enroll in our courses and gain insights from industry leaders and AI specialists who are shaping the future of digital transformation.
            </p>
            <button className="px-8 py-3 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white font-semibold rounded-[8px] transition-colors">
              Explore Courses
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Faculty;
