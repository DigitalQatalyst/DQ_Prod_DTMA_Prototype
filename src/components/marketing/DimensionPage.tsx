import { BookOpen } from "lucide-react";
import PublicPageLayout from "@/components/layout/PublicPageLayout";
import MarketingHero from "@/components/marketing/MarketingHero";
import MarketingSection from "@/components/marketing/MarketingSection";
import MarketingCtaBand from "@/components/marketing/MarketingCtaBand";
import SectionHeader from "@/components/marketing/SectionHeader";
import type { DimensionPageContent } from "@/data/dimensionPageContent";

export default function DimensionPage({ content }: { content: DimensionPageContent }) {
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
        <SectionHeader eyebrowText="Overview" title={content.overviewTitle} />
        <p className="text-lg leading-relaxed text-gray-600">{content.overviewBody}</p>
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
