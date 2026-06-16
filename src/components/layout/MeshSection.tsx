import { cn } from "@/lib/utils";

type MeshVariant = "heroLight" | "heroDark" | "ctaOrange";

function meshVar(variant: MeshVariant) {
  switch (variant) {
    case "heroDark":
      return "var(--mesh-hero-dark)";
    case "ctaOrange":
      return "var(--mesh-cta-orange)";
    case "heroLight":
    default:
      return "var(--mesh-hero-light)";
  }
}

export default function MeshSection({
  variant = "heroLight",
  grid = false,
  className,
  children,
  id,
}: {
  variant?: MeshVariant;
  grid?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative isolate overflow-hidden", className)}>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: meshVar(variant) }}
      />
      {grid ? <div aria-hidden className="absolute inset-0 -z-10 hero-grid opacity-40" /> : null}
      {children}
    </section>
  );
}
