import { cn } from "@/lib/utils";
import { cardInteractive } from "@/lib/brandAccent";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-card",
        cardInteractive,
        className
      )}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
        <Icon className="h-6 w-6 text-dq-orange" strokeWidth={1.5} />
      </div>
      <h3 className="mb-3 text-lg font-semibold text-dq-navy">{title}</h3>
      <p className="text-[15px] leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}
