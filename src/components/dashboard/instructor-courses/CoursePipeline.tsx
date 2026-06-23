import {
  PIPELINE_STAGES,
  type PipelineStage,
} from '@/lib/instructorCoursesHubData';
import { learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

interface CoursePipelineProps {
  counts: Record<PipelineStage, number>;
  activeStage: PipelineStage | null;
  onStageClick: (stage: PipelineStage | null) => void;
}

export function CoursePipeline({
  counts,
  activeStage,
  onStageClick,
}: CoursePipelineProps) {
  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Course Pipeline</h3>
      <div className="flex flex-wrap gap-2">
        {PIPELINE_STAGES.map((stage, i) => {
          const active = activeStage === stage.key;
          return (
            <button
              key={stage.key}
              type="button"
              onClick={() => onStageClick(active ? null : stage.key)}
              className={cn(
                'relative flex min-w-[100px] flex-1 flex-col items-center rounded-xl border px-3 py-4 text-center transition-all',
                active
                  ? 'border-dq-orange bg-orange-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-dq-orange/30',
              )}
            >
              {i < PIPELINE_STAGES.length - 1 && (
                <span
                  className="absolute -right-1 top-1/2 hidden h-0.5 w-2 -translate-y-1/2 bg-gray-200 md:block"
                  aria-hidden
                />
              )}
              <span className="text-2xl font-semibold text-dq-navy">
                {counts[stage.key]}
              </span>
              <span className="text-xs font-medium text-gray-500">{stage.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
