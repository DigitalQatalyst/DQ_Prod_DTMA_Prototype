import { Linkedin, Mail, Award } from "lucide-react";
import PublicPageLayout from "@/components/layout/PublicPageLayout";

const Faculty = () => {
  const faculty = [
    {
      name: "Dr. Ahmed Al-Mansouri",
      title: "Director of Digital Transformation",
      expertise: "Digital Strategy, Organizational Change",
      bio: "20+ years of experience leading digital transformation initiatives across Fortune 500 companies.",
      image: "bg-gradient-to-br from-[var(--dq-orange-500)] to-[var(--dq-orange-600)]",
    },
    {
      name: "Sarah Johnson",
      title: "Senior Instructor - Digital Innovation",
      expertise: "Innovation Management, Technology Strategy",
      bio: "Former CTO with expertise in building high-performing digital teams and innovation ecosystems.",
      image: "bg-gradient-to-br from-[var(--dq-navy-600)] to-[var(--dq-navy-700)]",
    },
    {
      name: "Prof. Rajesh Kumar",
      title: "Faculty - Business Transformation",
      expertise: "Business Models, Customer Experience",
      bio: "Academic researcher and practitioner focused on digital business model innovation.",
      image: "bg-gradient-to-br from-[var(--dq-teal-500)] to-[var(--dq-teal-600)]",
    },
    {
      name: "Lisa Chen",
      title: "Instructor - Digital Workforce Development",
      expertise: "Talent Development, Organizational Culture",
      bio: "HR transformation specialist helping organizations build digital-ready workforces.",
      image: "bg-gradient-to-br from-[var(--dq-orange-400)] to-[var(--dq-orange-500)]",
    },
    {
      name: "Michael O'Brien",
      title: "Senior Instructor - Technology & Operations",
      expertise: "Cloud Architecture, Digital Operations",
      bio: "Technology leader with deep expertise in cloud transformation and operational excellence.",
      image: "bg-gradient-to-br from-[var(--dq-navy-500)] to-[var(--dq-navy-600)]",
    },
    {
      name: "Dr. Fatima Al-Zahra",
      title: "Faculty - Customer Experience",
      expertise: "Customer Journey, Digital Marketing",
      bio: "Customer experience strategist helping organizations deliver exceptional digital experiences.",
      image: "bg-gradient-to-br from-[var(--dq-teal-400)] to-[var(--dq-teal-500)]",
    },
  ];

  return (
    <PublicPageLayout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-800)] to-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[12px] leading-[16px] font-medium uppercase tracking-wide text-[var(--dq-orange-500)] mb-4">
              Meet Our Team
            </p>
            <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-white mb-6">
              Our Faculty
            </h1>
            <p className="text-[16px] leading-[24px] font-normal text-white/90 max-w-3xl mx-auto">
              Learn from industry experts and thought leaders with decades of experience in digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Avatar */}
                <div className={`h-48 ${member.image}`} />

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[var(--dq-navy-950)] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--dq-orange-500)] mb-3">
                    {member.title}
                  </p>

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

                  {/* Social Links */}
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials Section */}
        <div className="bg-[var(--dq-navy-50)] py-16 px-8">
          <div className="max-w-[1600px] mx-auto">
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
        </div>

        {/* CTA Section */}
        <div className="max-w-[1600px] mx-auto px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-4">
            Learn from the Best
          </h2>
          <p className="text-[var(--dq-navy-600)] mb-8 max-w-2xl mx-auto">
            Enroll in our courses and gain insights from industry leaders who are shaping the future of digital transformation.
          </p>
          <button className="px-8 py-3 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white font-semibold rounded-[8px] transition-colors">
            Explore Courses
          </button>
        </div>
      </section>
    </PublicPageLayout>
  );
};

export default Faculty;
