import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const CredentialsSection = () => {
  const credentialTiers = [
    {
      tier: "Tier 1",
      name: "Course Certificate",
      description: "Complete any single DTMA course with quizzes and assessments. Earn a KHDA-attested certificate for that specific dimension.",
      color: "var(--dq-orange-500)",
    },
    {
      tier: "Tier 2",
      name: "Foundation Credential",
      description: "Complete all seven courses, including foundational and 6XD dimensions, to demonstrate full mastery of the Digital Cognitive Organization framework.",
      color: "var(--dq-orange-500)",
    },
    {
      tier: "Tier 3",
      name: "Practitioner Credential",
      description: "Complete core courses and specialized electives to demonstrate ability to design, execute, and deliver measurable transformation outcomes.",
      color: "var(--dq-orange-500)",
    },
    {
      tier: "Tier 4",
      name: "Expert Credential",
      description: "Master the 6XD framework through core courses, electives, and advanced assessments, earning the highest certification for transformation leaders.",
      color: "var(--dq-orange-500)",
    },
  ];

  return (
    <section className="py-16 bg-[var(--dq-navy-950)]">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <img src="/KHDA.png" alt="KHDA" className="h-16 w-auto mx-auto mb-4" />
          <p className="text-[12px] leading-[16px] font-medium text-[var(--dq-orange-500)] uppercase tracking-wide mb-4">
            Accreditation & Credentials
          </p>
          <h2 className="text-[28px] leading-[36px] md:text-[32px] md:leading-[40px] font-semibold text-white mb-6">
            KHDA Accredited
          </h2>
          <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-text-on-dark-secondary)] max-w-lg mx-auto whitespace-nowrap">
            All credentials are KHDA-attested and recognized across the UAE and internationally.
          </p>
        </div>

        {/* Credential Tiers - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentialTiers.map((credential, index) => {
            const colorVar = credential.color.replace('var(', '').replace(')', '');
            return (
              <div key={index}>
                {/* Icon */}
                <div className="flex mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10"
                  >
                    <Award className="w-8 h-8" style={{ color: `var(${colorVar})` }} />
                  </div>
                </div>

                {/* Tier Badge */}
                <p 
                  className="text-[12px] leading-[16px] font-medium uppercase tracking-wide mb-2"
                  style={{ color: `var(${colorVar})` }}
                >
                  {credential.tier}
                </p>

                {/* Credential Name */}
                <h3 className="text-[20px] leading-[28px] font-medium text-white mb-3">
                  {credential.name}
                </h3>

                {/* Description */}
                <p className="text-[14px] leading-[20px] font-normal text-white/70">
                  {credential.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
