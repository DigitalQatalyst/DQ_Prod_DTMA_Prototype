import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HBSHeroSection from "@/components/home/HBSHeroSection";
import ExploreCategoriesSection from "@/components/home/ExploreCategoriesSection";
import TrustedProvidersSection from "@/components/home/TrustedProvidersSection";
import HowCoursebayHelpsSection from "@/components/home/HowCoursebayHelpsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import FeaturedCoursesSection2 from "@/components/home/FeaturedCoursesSection2";
import SixXDSection from "@/components/home/SixXDSection";
import CTASection from "@/components/home/CTASection";
import FacultySection from "@/components/home/FacultySection";
import CredentialsSection from "@/components/home/CredentialsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import StartNowSection from "@/components/home/StartNowSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HBSHeroSection />
        <TestimonialsSection />
        <BenefitsSection />
        <FeaturedCoursesSection2 />
        <SixXDSection />
        <FacultySection />
        <CredentialsSection />
        <HowItWorksSection />
        <StartNowSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;