import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import type { AIReputationInsight } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

interface AIInsightPanelProps {
  insights: AIReputationInsight;
  onAction: (prompt: string) => void;
}

const QUICK_ACTIONS = [
  'Generate review summary',
  'Analyze sentiment',
  'Identify improvement themes',
  'Draft response',
  'Generate reputation report',
] as const;

export function AIInsightPanel({ insights, onAction }: AIInsightPanelProps) {
  const hasData =
    insights.praisedTopics.length > 0 || insights.improvementRequests.length > 0;

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')} aria-labelledby="ai-insights-heading">
      <div className="mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-dq-orange" />
        <h3 id="ai-insights-heading" className={learnerSectionHeading}>
          AI Reputation Insights
        </h3>
      </div>

      {!hasData ? (
        <p className={learnerBodyMuted}>
          AI insights will appear once learners leave reviews on your courses.
        </p>
      ) : (
        <div className="mb-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <p className="mb-2 text-sm font-semibold text-dq-navy">Most praised topics</p>
            <ul className={cn(learnerBodyMuted, 'space-y-1 text-sm')}>
              {insights.praisedTopics.map((topic) => (
                <li key={topic}>• {topic}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <p className="mb-2 text-sm font-semibold text-dq-navy">Common improvement requests</p>
            <ul className={cn(learnerBodyMuted, 'space-y-1 text-sm')}>
              {insights.improvementRequests.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {insights.suggestedAction && (
        <div className="mb-5 rounded-xl border border-orange-100 bg-orange-50/60 p-4">
          <p className="text-sm font-semibold text-dq-navy">Suggested action</p>
          <p className={cn(learnerBodyMuted, 'mt-1 text-sm')}>{insights.suggestedAction}</p>
          {insights.expectedImpact && (
            <p className="mt-2 text-xs font-medium text-emerald-700">
              Expected impact: {insights.expectedImpact}
            </p>
          )}
        </div>
      )}

      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">Quick actions</p>
      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((action) => (
          <Button
            key={action}
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => onAction(action)}
          >
            {action}
          </Button>
        ))}
        <Button
          className={learnerBtnPrimary}
          size="sm"
          onClick={() => onAction('Benchmark my reputation against top instructors')}
        >
          <Brain className="mr-1.5 h-3.5 w-3.5" />
          Benchmark instructors
        </Button>
      </div>
    </section>
  );
}
