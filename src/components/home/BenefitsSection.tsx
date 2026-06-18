import { ClipboardList, Puzzle, RefreshCw, type LucideIcon } from "lucide-react";
import MeshSection from "@/components/layout/MeshSection";
import { eyebrowOnDark, marketingSectionHeading, sectionPaddingX, sectionPaddingY } from "@/lib/brandAccent";

const BenefitsSection = () => {
  const problems: { icon: LucideIcon; title: string; description: string }[] = [
    {
      icon: ClipboardList,
      title: "Trained, never applied",
      description:
        "Courses delivered without connection to live transformation projects or real execution contexts.",
    },
    {
      icon: Puzzle,
      title: "Learning without a framework",
      description:
        "Skills taught in isolation, no structured methodology to connect strategy, technology, and people.",
    },
    {
      icon: RefreshCw,
      title: "No continuity",
      description:
        "One-off training events treated as disconnected interventions, with no capability-building system.",
    },
  ];

  return (
    <MeshSection variant="heroDark" className={`${sectionPaddingY} ${sectionPaddingX} text-white`}>
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <p className={`${eyebrowOnDark} mb-5`}>Why DTMA exists</p>

        <h2 className={`${marketingSectionHeading} mb-4 max-w-3xl text-white`}>
          75% of digital transformation initiatives fail to deliver.
        </h2>
        <p className="mb-14 max-w-lg text-lg text-white/70">
          The root cause isn't strategy. It's a capability gap. The fix is structured learning.
        </p>

        <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition-colors hover:bg-white/[0.08]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-5 w-5 text-dq-orange" aria-hidden />
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{p.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{p.description}</p>
              </div>
            );
          })}
        </div>

        <p className="mx-auto max-w-xl text-center text-sm text-white/60">
          DTMA was founded to close this gap, with a methodology that treats digital capability building
          as a structured, continuous system.
        </p>
      </div>
    </MeshSection>
  );
};

export default BenefitsSection;
