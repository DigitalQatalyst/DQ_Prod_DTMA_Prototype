import { Award, CheckCircle2, Shield, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const Accreditation = () => {
  const accreditations = [
    {
      title: "KHDA Licensed Training Institute",
      description: "Licensed by the Knowledge and Human Development Authority in Dubai",
      icon: Award,
      details: "Training Institute Permit No. [TBD]",
    },
    {
      title: "Industry-Recognized Certifications",
      description: "Our programs align with global standards and industry best practices",
      icon: CheckCircle2,
      details: "Recognized by leading organizations worldwide",
    },
    {
      title: "Quality Assurance",
      description: "Rigorous quality standards ensure excellence in all our programs",
      icon: Shield,
      details: "Continuous improvement and learner satisfaction focus",
    },
    {
      title: "Expert Faculty",
      description: "Learn from industry practitioners with real-world experience",
      icon: Zap,
      details: "Experienced professionals and thought leaders",
    },
  ];

  const credentials = [
    {
      tier: "Tier 1",
      name: "Course Certificate",
      description: "Completion of individual courses",
      benefits: ["Course completion badge", "Digital certificate", "Skills verification"],
    },
    {
      tier: "Tier 2",
      name: "Foundation Credential",
      description: "Completion of foundational program track",
      benefits: ["Foundation badge", "Verified credential", "LinkedIn endorsement"],
    },
    {
      tier: "Tier 3",
      name: "Practitioner Credential",
      description: "Advanced skills and practical application",
      benefits: ["Practitioner badge", "Advanced credential", "Industry recognition"],
    },
    {
      tier: "Tier 4",
      name: "Expert Credential",
      description: "Mastery and leadership in digital transformation",
      benefits: ["Expert badge", "Master credential", "Speaking opportunities"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#f5f4f0] pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <img src="/KHDA.png" alt="KHDA" className="h-12 w-auto mb-6" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">
            Credentials & Recognition
          </p>
          <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold text-[#0a0f1e] mb-6 max-w-3xl">
            Accreditation &{" "}
            <span className="text-[#ff4500]">Credentials</span>
          </h1>
          <p className="text-[17px] text-[#4a4a5a] max-w-xl">
            Earn recognized credentials that validate your expertise in digital transformation and leadership.
          </p>
        </div>
      </section>

      <main>
        {/* Accreditations Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-3">
              Recognition
            </p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold text-[#0a0f1e] mb-12">
              Our Accreditations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accreditations.map((acc, index) => {
                const Icon = acc.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {index === 0 ? (
                        <img src="/KHDA.png" alt="KHDA" className="h-6 w-auto flex-shrink-0 mt-1" />
                      ) : (
                        <Icon className="w-6 h-6 text-[#ff4500] flex-shrink-0 mt-1" strokeWidth={1.5} />
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-[#0a0f1e] mb-2">
                          {acc.title}
                        </h3>
                        <p className="text-[#4a4a5a] mb-2">{acc.description}</p>
                        <p className="text-sm text-[#6b6b7b]">{acc.details}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Credentials Tiers */}
        <section className="py-20 bg-[#f5f4f0]">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-3">
              Pathways
            </p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold text-[#0a0f1e] mb-12">
              Credential Tiers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {credentials.map((cred, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all"
                >
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest">
                      {cred.tier}
                    </span>
                    <h3 className="text-xl font-bold text-[#0a0f1e] mt-2">
                      {cred.name}
                    </h3>
                  </div>
                  <p className="text-sm text-[#4a4a5a] mb-6">
                    {cred.description}
                  </p>
                  <div className="space-y-2">
                    {cred.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#ff4500] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-[#4a4a5a]">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#050d1e]" style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255, 69, 0, 0.2) 0%, transparent 70%)' }}>
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-6">
              Ready to begin
            </p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold text-white mb-4 max-w-2xl mx-auto">
              Ready to Earn Your Credential?
            </h2>
            <p className="text-[17px] text-white/50 mb-10 max-w-lg mx-auto">
              Explore our courses and start your journey toward recognized expertise.
            </p>
            <Link to="/courses">
              <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors">
                Explore Courses
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Accreditation;
