import { ArrowRight, ClipboardList, Puzzle, RefreshCw, type LucideIcon } from "lucide-react";
import {
  btnPrimary,
  eyebrow,
  learnerBody,
  learnerCardTitle,
  learnerItemTitle,
  learnerLink,
  learnerPanel,
  microLabel,
} from "@/lib/brandAccent";
import { cn } from "@/lib/utils";
export type OverviewPanelTab = "catalog" | "overview" | "courses";

const WHY_DTMA: { icon: LucideIcon; title: string; description: string }[] = [
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
      "Skills taught in isolation, with no structured methodology connecting strategy, technology, and people.",
  },
  {
    icon: RefreshCw,
    title: "No continuity",
    description:
      "One-off training events treated as disconnected interventions, with no capability-building system.",
  },
];

const SIX_XD = [
  { tag: "DE", title: "Digital Economy" },
  { tag: "DCO", title: "Digital Cognitive Organisation" },
  { tag: "DBP", title: "Digital Business Platform" },
  { tag: "DT2.0", title: "Digital Transformation 2.0" },
  { tag: "DW/WS", title: "Digital Worker & Workspace" },
  { tag: "DA", title: "Digital Accelerators" },
];

type LearnerOverviewPanelProps = {
  onNavigate: (tab: OverviewPanelTab) => void;
  onboardingData?: {
    learningGoal: string;
    skillLevel: string;
    preferredFormat: string;
  } | null;
};

export function LearnerOverviewPanel({
  onNavigate,
  onboardingData,
}: LearnerOverviewPanelProps) {
  return (
    <div className="space-y-8">
      {/* Landing hero summary */}
      <div className={cn(learnerPanel, "overflow-hidden p-6 lg:p-8")}>
        <p className={cn(eyebrow, "mb-3")}>Digital Transformation Management Academy</p>
        <h2 className="mb-3 max-w-3xl text-2xl font-semibold tracking-tight text-dq-navy lg:text-3xl">
          Every skill to succeed in the{" "}
          <span className="text-dq-orange">digital economy.</span>
        </h2>
        <p className={cn(learnerBody, "mb-8 max-w-2xl")}>
          DTMA equips leaders and digital teams with structured, KHDA-attested learning mapped to the
          6XD framework, so capability building connects to real transformation work.
        </p>
        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-6">
          <button type="button" onClick={() => onNavigate("catalog")} className={btnPrimary}>
            Explore courses
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate("overview")}
            className={cn(learnerLink, "px-1")}
          >
            Go to dashboard
          </button>
        </div>
      </div>

      {/* Why DTMA */}
      <section>
        <p className={cn(eyebrow, "mb-2")}>Why DTMA exists</p>
        <h3 className={cn(learnerCardTitle, "mb-5 max-w-2xl")}>
          75% of digital transformation initiatives fail to deliver.
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {WHY_DTMA.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className={cn(learnerPanel, "p-5")}>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                  <Icon className="h-4 w-4 text-dq-orange" aria-hidden />
                </div>
                <h4 className={cn(learnerItemTitle, "mb-2")}>{item.title}</h4>
                <p className={learnerBody}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6XD framework */}
      <section className={cn(learnerPanel, "p-6 lg:p-8")}>
        <p className={cn(eyebrow, "mb-2")}>The 6XD framework</p>
        <h3 className={cn(learnerCardTitle, "mb-2")}>Six dimensions. One transformation system.</h3>
        <p className={cn(learnerBody, "mb-5 max-w-2xl")}>
          Every DTMA course maps to a critical dimension of digital transformation.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SIX_XD.map((dim) => (
            <div
              key={dim.tag}
              className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
            >
              <span className={cn(microLabel, "mb-1 block")}>{dim.tag}</span>
              <p className="text-sm font-medium text-dq-navy">{dim.title}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onNavigate("catalog")}
          className={cn(learnerLink, "mt-6")}
        >
          Browse courses by dimension <ArrowRight className="h-4 w-4" />
        </button>
      </section>

      {/* Quick start */}
      <section className="rounded-2xl bg-dq-navy p-6 text-white lg:p-8">
        <p className={cn(microLabel, "mb-2 text-dq-orange")}>Ready to begin</p>
        <h3 className="mb-2 text-xl font-semibold tracking-tight">
          Master digital transformation skills.
        </h3>
        <p className="mb-5 max-w-xl text-sm leading-relaxed text-white/70">
          From foundations to advanced practice. Start in the marketplace or open your workspace to
          track progress.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate("catalog")}
            className={btnPrimary}
          >
            Explore courses
          </button>
          <button
            type="button"
            onClick={() => onNavigate("courses")}
            className="inline-flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white hover:underline"
          >
            My courses
          </button>
        </div>
      </section>

      {onboardingData && (
        <section className={cn(learnerPanel, "p-6 lg:p-8")}>
          <h3 className={cn(learnerCardTitle, "mb-5")}>Your learning preferences</h3>
          <dl className="grid gap-6 border-t border-gray-100 pt-5 sm:grid-cols-3">
            <div className="space-y-1">
              <dt className={cn(microLabel, "text-gray-400")}>Goal</dt>
              <dd className={learnerBody}>{onboardingData.learningGoal}</dd>
            </div>
            <div className="space-y-1 sm:border-l sm:border-gray-100 sm:pl-6">
              <dt className={cn(microLabel, "text-gray-400")}>Level</dt>
              <dd className={learnerBody}>{onboardingData.skillLevel}</dd>
            </div>
            <div className="space-y-1 sm:border-l sm:border-gray-100 sm:pl-6">
              <dt className={cn(microLabel, "text-gray-400")}>Format</dt>
              <dd className={learnerBody}>{onboardingData.preferredFormat}</dd>
            </div>
          </dl>
        </section>
      )}
    </div>
  );
}

export default LearnerOverviewPanel;
