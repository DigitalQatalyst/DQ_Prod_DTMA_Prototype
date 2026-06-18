import { Link } from "react-router-dom";
import dqLogoBlue from "@/assets/DQ-logo-blue.png";
import { PLATFORM_NAME } from "@/lib/brandLinks";
import { cn } from "@/lib/utils";

interface DTMALogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export function DTMALogo({ className, variant = "light" }: DTMALogoProps) {
  const isDark = variant === "dark";

  return (
    <Link
      to="/"
      className={cn("flex items-center gap-3 transition-opacity hover:opacity-90", className)}
    >
      <img
        src={dqLogoBlue}
        alt="Digital Qatalyst"
        className="h-7 w-auto shrink-0"
        height={28}
      />
      <span aria-hidden className={cn("h-6 w-px shrink-0", isDark ? "bg-white/20" : "bg-gray-200")} />
      <span
        className={cn(
          "max-w-[10.5rem] text-sm font-semibold leading-tight sm:max-w-none sm:text-base sm:leading-none",
          isDark ? "text-white" : "text-dq-navy"
        )}
      >
        {PLATFORM_NAME}
      </span>
    </Link>
  );
}

export default DTMALogo;
