import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MeshSection from "@/components/layout/MeshSection";
import {
  btnPrimary,
  btnPrimaryNavy,
  btnSecondary,
  eyebrow,
  landingHeroHeading,
  sectionPaddingX,
} from "@/lib/brandAccent";

const HBSHeroSection = () => {
  return (
    <MeshSection variant="heroLight" grid className={`${sectionPaddingX} pt-20 pb-16 md:pt-24 lg:pt-28`}>
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <p className={`${eyebrow} mb-4 animate-fade-in-up`}>
          Digital Transformation Management Academy
        </p>

        <h1 className={`${landingHeroHeading} mb-5 max-w-3xl animate-fade-in-up animation-delay-100`}>
          Every Skill to Succeed in the{" "}
          <span className="text-dq-orange">Digital Economy.</span>
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-600 animate-fade-in-up animation-delay-200">
          We equip leaders and digital teams with the skills to thrive in Economy 4.0.
        </p>

        <div className="flex flex-wrap items-center gap-4 animate-fade-in-up animation-delay-300">
          <Link to="/auth" className={btnPrimaryNavy}>
            Get Started Now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/courses" className={btnSecondary}>
            Explore Courses
          </Link>
        </div>
      </div>
    </MeshSection>
  );
};

export default HBSHeroSection;
