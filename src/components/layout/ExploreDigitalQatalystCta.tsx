import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { DQ_CORP_WEB_URL, EXPLORE_DQ_LABEL } from "@/lib/brandLinks";

type ExploreDigitalQatalystCtaProps = {
  className?: string;
  showIcon?: boolean;
};

const ExploreDigitalQatalystCta = ({
  className,
  showIcon = true,
}: ExploreDigitalQatalystCtaProps) => {
  return (
    <a
      href={DQ_CORP_WEB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full border border-[#c5cde8] bg-white/60 px-4 py-2 text-sm font-semibold text-dq-navy backdrop-blur-sm transition hover:border-[#a0aacc] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-orange focus-visible:ring-offset-2",
        className
      )}
    >
      {EXPLORE_DQ_LABEL}
      {showIcon ? <ExternalLink size={14} aria-hidden /> : null}
    </a>
  );
};

export default ExploreDigitalQatalystCta;
