import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { eyebrow, landingHeroHeading, linkAction, marketingSectionHeading } from "@/lib/brandAccent";

export default function SectionHeader({
  eyebrowText,
  title,
  titleAccent,
  description,
  action,
  align = "left",
  size = "section",
  className,
}: {
  eyebrowText?: string;
  title: React.ReactNode;
  titleAccent?: React.ReactNode;
  description?: string;
  action?: { label: string; href: string };
  align?: "left" | "center";
  size?: "section" | "hero";
  className?: string;
}) {
  const isCenter = align === "center";
  const headingClass = size === "hero" ? landingHeroHeading : marketingSectionHeading;

  return (
    <div
      className={cn(
        "mb-10",
        isCenter && "text-center",
        !isCenter && "flex flex-wrap items-end justify-between gap-6",
        className
      )}
    >
      <div className={cn(isCenter && "mx-auto max-w-3xl")}>
        {eyebrowText ? <p className={cn(eyebrow, "mb-3")}>{eyebrowText}</p> : null}
        <h2 className={cn(headingClass, "leading-[1.1]")}>
          {title}
          {titleAccent ? <> {titleAccent}</> : null}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed text-gray-600",
              isCenter ? "mx-auto max-w-2xl" : "max-w-xl"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action && !isCenter ? (
        <Link to={action.href} className={linkAction}>
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
