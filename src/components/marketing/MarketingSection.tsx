import { cn } from "@/lib/utils";
import { sectionPaddingX, sectionPaddingY } from "@/lib/brandAccent";

type Background = "white" | "gray" | "transparent";

export default function MarketingSection({
  background = "white",
  className,
  containerClassName,
  narrow,
  children,
  id,
}: {
  background?: Background;
  className?: string;
  containerClassName?: string;
  narrow?: boolean;
  children: React.ReactNode;
  id?: string;
}) {
  const bgClass =
    background === "gray" ? "bg-gray-50" : background === "white" ? "bg-white" : "";

  return (
    <section id={id} className={cn(bgClass, sectionPaddingY, sectionPaddingX, className)}>
      <div
        className={cn(
          "mx-auto max-w-[1200px]",
          narrow && "max-w-3xl",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
