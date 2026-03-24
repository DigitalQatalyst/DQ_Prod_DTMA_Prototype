import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const CredentialsSection = () => {
  const credentialTiers = [
    {
      tier: "Tier 1",
      name: "Course Certificate",
      description: "Complete any single DTMA course with quizzes and assessments. Earn a KHDA-attested certificate for that specific dimension.",
      color: "#60a5fa",
    },
    {
      tier: "Tier 2",
      name: "Foundation Credential",
      description: "Complete all seven courses, including foundational and 6XD dimensions, to demonstrate full mastery of the Digital Cognitive Organization framework.",
      color: "#ff6b4d",
    },
    {
      tier: "Tier 3",
      name: "Practitioner Credential",
      description: "Complete core courses and specialized electives to demonstrate ability to design, execute, and deliver measurable transformation outcomes.",
      color: "#16a34a",
    },
    {
      tier: "Tier 4",
      name: "Expert Credential",
      description: "Master the 6XD framework through core courses, electives, and advanced assessments, earning the highest certification for transformation leaders.",
      color: "#9333ea",
    },
  ];

  return (
    <section className="py-16 bg-[#1e2348]">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
            Accreditation & Credentials
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            KHDA Accredited
          </h2>
          <p className="text-base text-white/80 max-w-3xl mx-auto leading-relaxed">
            All credentials are attested by KHDA — Dubai's official education quality authority. Recognized across the UAE and internationally.
          </p>
        </div>

        {/* Credential Tiers - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentialTiers.map((credential, index) => (
            <div key={index}>
              {/* Icon */}
              <div className="flex mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10"
                >
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Tier Badge */}
              <p 
                className="text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: credential.color }}
              >
                {credential.tier}
              </p>

              {/* Credential Name */}
              <h3 className="text-lg font-semibold text-white mb-3">
                {credential.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed">
                {credential.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
