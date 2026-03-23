import { Award, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CredentialsSection = () => {
  const credentialTiers = [
    {
      tier: "Tier 1",
      name: "Course Certificate",
      description: "Complete any single DTMA course. Each course includes module-level quizzes and an end-of-course assessment. Passing earns a KHDA-attested Course Certificate for that specific dimension or topic.",
      color: "#ff6b4d",
    },
    {
      tier: "Tier 2",
      name: "Foundation Credential",
      description: "Complete all seven core courses (the six 6XD dimension courses plus the foundational course). This demonstrates comprehensive understanding of the full Digital Cognitive Organization framework. The Foundation Credential signals readiness to participate in and contribute to digital transformation initiatives.",
      color: "#181C3A",
    },
    {
      tier: "Tier 3",
      name: "Practitioner Credential",
      description: "Complete the seven core courses plus designated elective courses. Electives are specialized courses built from dedicated white papers, targeting applied competencies for specific roles and contexts. The Practitioner Credential demonstrates the ability to design, execute, and deliver digital transformation outcomes.",
      color: "#16a34a",
    },
    {
      tier: "Tier 4",
      name: "Expert Credential",
      description: "Master the full 6XD framework through core courses, electives, and advanced assessments. The Expert Credential represents the highest level of DTMA certification — signalling strategic-level mastery of digital transformation across all six dimensions. Designed for leaders and senior practitioners who advise, govern, and drive transformation at the organizational level.",
      color: "#9333ea",
    },
  ];

  return (
    <section className="py-16 bg-[#F5F6FA]">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
            Accreditation & Credentials
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0B0C19] mb-6">
            Credentials That Are Recognized, Not Just Printed
          </h2>
          <p className="text-base text-[#4B5563] max-w-3xl mx-auto leading-relaxed">
            DTMA operates under a KHDA Training Institute Permit — licensed by Dubai's official education quality authority. Every completed course earns a KHDA-attested certificate: externally verifiable proof of competence recognized across the UAE and internationally. Beyond individual courses, DTMA offers a structured credential ladder so each qualification builds toward the next.
          </p>
        </div>

        {/* Credential Ladder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {credentialTiers.map((credential, index) => (
            <div key={index} className="relative">
              {/* Connecting Arrow (hidden on mobile, shown on larger screens between cards) */}
              {index < credentialTiers.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                </div>
              )}
              
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Tier Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${credential.color}15` }}
                  >
                    <Award className="w-6 h-6" style={{ color: credential.color }} />
                  </div>
                  <span 
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: credential.color }}
                  >
                    {credential.tier}
                  </span>
                </div>

                {/* Credential Name */}
                <h3 className="text-lg font-semibold text-[#0B0C19] mb-3">
                  {credential.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#4B5563] leading-relaxed flex-grow">
                  {credential.description}
                </p>

                {/* Visual Indicator */}
                <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-2 text-xs text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>KHDA Attested</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* KHDA Trust Bar */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB] mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0B0C19] mb-1">KHDA Accredited</p>
                <p className="text-xs text-[#9CA3AF]">Dubai's Official Education Authority</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[#E5E7EB]"></div>
            <p className="text-sm text-[#4B5563] max-w-2xl leading-relaxed">
              All credentials are attested by KHDA — Dubai's official education quality authority. Recognized across the UAE and internationally.
            </p>
          </div>
        </div>

        {/* Section CTA */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="px-8 py-6 border-2 border-[#ff6b4d] text-[#ff6b4d] hover:bg-[#ff6b4d] hover:text-white transition-all text-base gap-2"
          >
            Explore Certification Paths
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
