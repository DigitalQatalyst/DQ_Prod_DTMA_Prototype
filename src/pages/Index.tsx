import PublicPageLayout from "@/components/layout/PublicPageLayout";
import HBSHeroSection from "@/components/home/HBSHeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import FeaturedCoursesSection2 from "@/components/home/FeaturedCoursesSection2";
import FacultySection from "@/components/home/FacultySection";
import StartNowSection from "@/components/home/StartNowSection";
import { WhatsAppFloatingButton } from "@/components/contact/WhatsAppFloatingButton";

const Index = () => {
  return (
    <PublicPageLayout>
      <HBSHeroSection />
      <BenefitsSection />
      <FeaturedCoursesSection2 />
      <FacultySection />
      <StartNowSection />
      <WhatsAppFloatingButton />
    </PublicPageLayout>
  );
};

export default Index;
