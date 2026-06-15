import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HBSHeroSection from "@/components/home/HBSHeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import FeaturedCoursesSection2 from "@/components/home/FeaturedCoursesSection2";
import SixXDSection from "@/components/home/SixXDSection";
import FacultySection from "@/components/home/FacultySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StartNowSection from "@/components/home/StartNowSection";
import { WhatsAppFloatingButton } from "@/components/contact/WhatsAppFloatingButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* 1. Hero - light background, left-aligned */}
        <HBSHeroSection />
        {/* 2. Problem statement - dark */}
        <BenefitsSection />
        {/* 3. Stats + Courses - white */}
        <FeaturedCoursesSection2 />
        {/* 4. 6XD Framework - white then dark */}
        <SixXDSection />
        {/* 5. Faculty - white */}
        <FacultySection />
        {/* 6. Testimonials - light */}
        <TestimonialsSection />
        {/* 7. Final CTA - dark with glow */}
        <StartNowSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Index;
