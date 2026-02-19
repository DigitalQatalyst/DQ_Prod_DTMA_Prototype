import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCoursesSection from "@/components/home/FeaturedCoursesSection";
import HybridTrainingSection from "@/components/home/HybridTrainingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import MetricsSection from "@/components/home/MetricsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedCoursesSection />
        <HybridTrainingSection />
        <MetricsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
