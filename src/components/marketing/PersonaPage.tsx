import { BookOpen, CheckCircle2 } from "lucide-react";
import PublicPageLayout from "@/components/layout/PublicPageLayout";
import MarketingHero from "@/components/marketing/MarketingHero";
import MarketingSection from "@/components/marketing/MarketingSection";
import MarketingCtaBand from "@/components/marketing/MarketingCtaBand";
import SectionHeader from "@/components/marketing/SectionHeader";
import type { PersonaPageContent } from "@/data/personaPageContent";

export default function PersonaPage({ content }: { content: PersonaPageContent }) {
  return (
    <PublicPageLayout>
      <MarketingHero
        eyebrowText={content.heroEyebrow}
        title={content.heroTitle}
        titleAccent={<span className="text-dq-orange">{content.heroAccent}</span>}
        description={content.heroDescription}
        primaryCta={{ label: "Explore Courses", href: "/courses", icon: <BookOpen className="h-4 w-4" /> }}
      />

      <MarketingSection narrow>
        <SectionHeader
          eyebrowText="The Challenge"
          title={
            <>
              Your <span className="text-dq-orange">Challenge</span>
            </>
          }
        />
        <p className="text-lg leading-relaxed text-gray-600">{content.challengeBody}</p>
      </MarketingSection>

      <MarketingSection background="gray">
        <SectionHeader
          eyebrowText="Benefits"
          title={
            <>
              What You'll <span className="text-dq-orange">Gain</span>
            </>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {content.benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-card"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-dq-orange" />
              <p className="text-[15px] leading-relaxed text-dq-navy">{benefit}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection>
        <SectionHeader
          eyebrowText="Curriculum"
          title={
            <>
              Recommended <span className="text-dq-orange">Learning Path</span>
            </>
          }
        />
        <div className="max-w-2xl space-y-3">
          {content.learningPath.map((course, index) => (
            <div
              key={course}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-card"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-dq-navy text-[15px] font-semibold text-white">
                {index + 1}
              </div>
              <p className="text-[15px] font-semibold text-dq-navy">{course}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingCtaBand
        title={content.ctaTitle}
        description={content.ctaDescription}
        primaryCta={{ label: "Explore Courses", href: "/courses" }}
        secondaryCta={{ label: "Back to Home", href: "/" }}
      />
    </PublicPageLayout>
  );
}
