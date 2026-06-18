import { Linkedin, Mail, Award } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

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

  const tabs = [
    { id: "all" as const, label: "All Faculty" },
    { id: "human" as const, label: "Human Faculty" },
    { id: "ai" as const, label: "AI Faculty" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#f5f4f0] pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">Our Team</p>
          <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold text-[#0a0f1e] mb-5 max-w-2xl">
            Meet Our <span className="text-[#ff4500]">Faculty.</span>
          </h1>
          <p className="text-[17px] text-[#4a4a5a] max-w-2xl">
            Learn from industry experts and AI-powered specialists with decades of combined experience in digital transformation.
          </p>
        </div>
      </section>

      <main>
        {/* Filter Tabs */}
        <section className="bg-white border-b border-[#e8e8ec]">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`py-4 text-[14px] font-medium transition-all relative ${
                    activeFilter === tab.id
                      ? "text-[#0a0f1e]"
                      : "text-[#9a9aaa] hover:text-[#0a0f1e]"
                  }`}
                >
                  {tab.label}
                  {activeFilter === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4500]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedFaculty.map((member, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#e8e8ec] rounded-xl overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="w-full h-52 overflow-hidden bg-[#f5f4f0]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-[17px] font-bold text-[#0a0f1e] mb-1">{member.name}</h3>
                    <p className="text-[13px] font-semibold text-[#ff4500] mb-3">{member.title}</p>
                    {member.type === "ai" && (
                      <p className="text-[11px] font-semibold text-[#9a9aaa] uppercase tracking-widest mb-3">
                        {(member as any).dimension}
                      </p>
                    )}
                    <div className="mb-4 pb-4 border-b border-[#e8e8ec]">
                      <p className="text-[11px] font-semibold text-[#9a9aaa] uppercase tracking-widest mb-2">Expertise</p>
                      <p className="text-[14px] text-[#4a4a5a]">{member.expertise}</p>
                    </div>
                    <p className="text-[14px] text-[#4a4a5a] mb-5 line-clamp-3">{member.bio}</p>
                    {member.type === "human" && (
                      <div className="flex gap-3">
                        <button className="flex-1 px-3 py-2 bg-[#f5f4f0] hover:bg-[#e8e8ec] rounded-lg flex items-center justify-center gap-2 transition-colors">
                          <Linkedin className="w-4 h-4 text-[#ff4500]" />
                          <span className="text-[12px] font-semibold text-[#0a0f1e]">Profile</span>
                        </button>
                        <button className="flex-1 px-3 py-2 bg-[#f5f4f0] hover:bg-[#e8e8ec] rounded-lg flex items-center justify-center gap-2 transition-colors">
                          <Mail className="w-4 h-4 text-[#ff4500]" />
                          <span className="text-[12px] font-semibold text-[#0a0f1e]">Contact</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-20 bg-[#f5f4f0]">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">Credentials</p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold text-[#0a0f1e] mb-10">
              Faculty <span className="text-[#ff4500]">Credentials</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Industry Experts", desc: "All faculty members bring real-world experience from leading organizations." },
                { title: "Advanced Degrees", desc: "Many hold advanced degrees from prestigious universities worldwide." },
                { title: "Thought Leaders", desc: "Published authors and speakers at international conferences." },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all text-center">
                  <div className="w-12 h-12 bg-[#ff4500] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#0a0f1e] mb-2">{item.title}</h3>
                  <p className="text-[14px] text-[#4a4a5a]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#050d1e] relative overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255, 69, 0, 0.2) 0%, transparent 70%)' }} />
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16 text-center relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">Get Started</p>
            <h2 className="text-[40px] md:text-[52px] leading-[1.1] font-bold text-white mb-4 max-w-2xl mx-auto">
              Learn from the Best
            </h2>
            <p className="text-[16px] text-white/50 mb-8 max-w-xl mx-auto">
              Enroll in our courses and gain insights from industry leaders and AI specialists who are shaping the future of digital transformation.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors"
            >
              Explore Courses
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Faculty;
