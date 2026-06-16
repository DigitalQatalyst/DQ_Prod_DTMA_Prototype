import { Link } from "react-router-dom";
import MeshSection from "@/components/layout/MeshSection";
import { btnPrimary, eyebrow, landingHeroHeading, sectionPaddingX } from "@/lib/brandAccent";
import { cn } from "@/lib/utils";

export default function MarketingHero({
  eyebrowText,
  title,
  titleAccent,
  description,
  primaryCta,
  centered = false,
  className,
}: {
  eyebrowText?: string;
  title: React.ReactNode;
  titleAccent?: React.ReactNode;
  description?: string;
  primaryCta?: { label: string; href: string; icon?: React.ReactNode };
  centered?: boolean;
  className?: string;
}) {
  return (
    <MeshSection
      variant="heroLight"
      grid
      className={cn(
        sectionPaddingX,
        "pt-20 pb-16 md:pt-24 lg:pb-24 lg:pt-28",
        className
      )}
    >
      <div
        className={cn(
          "relative z-10 mx-auto max-w-[1200px]",
          centered && "max-w-4xl text-center"
        )}
      >
        {eyebrowText ? <p className={cn(eyebrow, "mb-4")}>{eyebrowText}</p> : null}
        <h1 className={cn(landingHeroHeading, "mb-5", centered ? "mx-auto" : "max-w-3xl")}>
          {title}
          {titleAccent ? <> {titleAccent}</> : null}
        </h1>
        {description ? (
          <p
            className={cn(
              "mb-8 max-w-2xl text-lg leading-relaxed text-gray-600",
              centered && "mx-auto"
            )}
          >
            {description}
          </p>
        ) : null}
        {primaryCta ? (
          <Link
            to={primaryCta.href}
            className={cn(btnPrimary, centered && "mx-auto inline-flex")}
          >
            {primaryCta.icon}
            {primaryCta.label}
          </Link>
        ) : null}
      </div>
    </MeshSection>
  );
}
