import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import ExploreCategoriesSection from "@/components/home/ExploreCategoriesSection";
import TrustedProvidersSection from "@/components/home/TrustedProvidersSection";
import HowCoursebayHelpsSection from "@/components/home/HowCoursebayHelpsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroCarousel />
        <ExploreCategoriesSection />
        <TrustedProvidersSection />
        <HowCoursebayHelpsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;