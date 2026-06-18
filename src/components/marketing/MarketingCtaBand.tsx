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
import { cn } from "@/lib/utils";

type CtaLink = { label: string; href: string };

export default function MarketingCtaBand({
  eyebrowText = "Get started",
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: {
  eyebrowText?: string;
  title: React.ReactNode;
  description?: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  className?: string;
}) {
  return (
    <MeshSection
      variant="ctaOrange"
      grid
      className={cn(sectionPaddingY, sectionPaddingX, "text-center text-white", className)}
    >
      <div className="relative z-10 mx-auto max-w-[720px]">
        <p className={cn(eyebrowOnDark, "mb-4")}>{eyebrowText}</p>
        <h2 className={cn(marketingSectionHeading, "mx-auto mb-4 max-w-2xl text-white")}>
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mb-8 max-w-md text-lg text-white/70">{description}</p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to={primaryCta.href} className={btnPrimaryOnDark}>
            {primaryCta.label}
          </Link>
          {secondaryCta ? (
            <Link to={secondaryCta.href} className={btnSecondaryOnDark}>
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </MeshSection>
  );
}
