import { Award, CheckCircle, Shield, Zap } from "lucide-react";
import PublicPageLayout from "@/components/layout/PublicPageLayout";

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
      icon: CheckCircle,
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
    <PublicPageLayout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-800)] to-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[12px] leading-[16px] font-medium uppercase tracking-wide text-[var(--dq-orange-500)] mb-4">
              Credentials & Recognition
            </p>
            <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-white mb-6">
              Accreditation & Credentials
            </h1>
            <p className="text-[16px] leading-[24px] font-normal text-white/90 max-w-3xl mx-auto">
              Earn recognized credentials that validate your expertise in digital transformation and leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Accreditations Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-12">Our Accreditations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {accreditations.map((acc, index) => {
              const Icon = acc.icon;
              return (
                <div
                  key={index}
                  className="bg-[var(--dq-navy-50)] border border-[var(--dq-navy-100)] rounded-[12px] p-8 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--dq-orange-500)] rounded-[8px] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--dq-navy-950)] mb-2">
                        {acc.title}
                      </h3>
                      <p className="text-[var(--dq-navy-600)] mb-2">{acc.description}</p>
                      <p className="text-sm text-[var(--dq-navy-500)]">{acc.details}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Credentials Tiers */}
      <section className="py-16 lg:py-24 bg-[var(--dq-navy-50)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-12">Credential Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((cred, index) => (
              <div
                key={index}
                className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <span className="text-xs font-bold text-[var(--dq-orange-500)] uppercase tracking-wide">
                    {cred.tier}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--dq-navy-950)] mt-2">
                    {cred.name}
                  </h3>
                </div>
                <p className="text-sm text-[var(--dq-navy-600)] mb-6">
                  {cred.description}
                </p>
                <div className="space-y-2">
                  {cred.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--dq-orange-500)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--dq-navy-600)]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 text-center">
          <h2 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-[var(--dq-navy-950)] mb-4">
            Ready to Earn Your Credential?
          </h2>
          <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-navy-600)] mb-8 max-w-2xl mx-auto">
            Explore our courses and start your journey toward recognized expertise.
          </p>
          <button className="px-8 py-3 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white font-semibold rounded-[8px] transition-colors">
            Explore Courses
          </button>
        </div>
      </section>
    </PublicPageLayout>
  );
};

export default Accreditation;
