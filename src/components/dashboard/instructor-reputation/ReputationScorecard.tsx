import { Progress } from '@/components/ui/progress';
import {
  learnerBodyMuted,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import type { ReputationSnapshot } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

function ScoreGauge({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative mx-auto h-36 w-36" aria-hidden>
      <svg className="-rotate-90" width="144" height="144" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="72"
          cy="72"
          r={radius}
          fill="none"
          stroke="#FB5535"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold text-dq-navy">{score}</span>
        <span className="text-xs text-gray-500">/ 100</span>
      </div>
    </div>
  );
}

export function ReputationScorecard({
  scorecard,
}: {
  scorecard: ReputationSnapshot['scorecard'];
}) {
  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')} aria-labelledby="scorecard-heading">
      <h3 id="scorecard-heading" className={cn(learnerSectionHeading, 'mb-4')}>
        Instructor Reputation Score
      </h3>

      {scorecard.overall === 0 ? (
        <p className={learnerBodyMuted}>Your reputation score will appear after your first reviews.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col items-center justify-center lg:col-span-4">
            <ScoreGauge score={scorecard.overall} />
            <p className="mt-3 text-sm font-medium text-dq-navy">Overall score</p>
          </div>
          <div className="space-y-3 lg:col-span-8">
            {scorecard.contributors.map((c) => (
              <div key={c.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-dq-navy">{c.label}</span>
                  <span className="font-semibold text-dq-navy">{c.score}</span>
                </div>
                <Progress value={c.score} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
