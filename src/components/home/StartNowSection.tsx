import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MeshSection from "@/components/layout/MeshSection";
import {
  btnPrimaryOnDark,
  btnSecondaryOnDark,
  eyebrowOnDark,
  marketingSectionHeading,
  sectionPaddingX,
  sectionPaddingY,
} from "@/lib/brandAccent";

const StartNowSection = () => {
  return (
    <MeshSection variant="ctaOrange" grid className={`${sectionPaddingY} ${sectionPaddingX} text-center text-white`}>
      <div className="relative z-10 mx-auto max-w-[720px]">
        <p className={`${eyebrowOnDark} mb-6`}>Ready to begin</p>
        <h2 className={`${marketingSectionHeading} mx-auto mb-6 max-w-3xl text-white`}>
          Master digital transformation{" "}
          <span className="text-dq-orange">skills.</span>
        </h2>
        <p className="mx-auto mb-10 max-w-md text-lg text-white/70">
          From foundations to advanced practice. Every course KHDA-attested and ready to apply from day one.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/auth" className={btnPrimaryOnDark}>
            Get Started Now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/courses" className={btnSecondaryOnDark}>
            Explore Courses
          </Link>
        </div>
      </div>
    </MeshSection>
  );
};

export default StartNowSection;
