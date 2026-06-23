import { AlertCircle, Brain, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  learnerBtnPrimary,
  learnerPanel,
  learnerSectionHeading,
  microLabel,
} from '@/lib/brandAccent';
import {
  SPARSE_DATA_ACTIONS,
  WELCOME_ACTIONS,
  buildActiveContext,
  getInstructorAgentById,
  type InstructorAgentId,
  type InstructorAgentResponse,
  type InstructorCockpitContext,
} from '@/lib/instructorAiCockpitData';
import { cn } from '@/lib/utils';
import { AlertCard } from './AlertCard';
import { InsightCard } from './InsightCard';
import { PerformanceMetricCard } from './PerformanceMetricCard';
import { RecommendationCard } from './RecommendationCard';
import {
  HistoryPanel,
  ReportsPanel,
  SavedInsightsPanel,
} from './SavedInsightsPanel';
import { VisualizationContainer } from './VisualizationContainer';

type ResponseTab = 'insights' | 'reports' | 'history' | 'saved';

interface AIResponsePanelProps {
  instructorName: string;
  activeAgentId: InstructorAgentId;
  context: InstructorCockpitContext;
  response: InstructorAgentResponse | null;
  loading: boolean;
  error: string | null;
  responseTab: ResponseTab;
  onResponseTabChange: (tab: ResponseTab) => void;
  onRunCommand: (command: string) => void;
  historyEntries: { command: string; agent: string; time: string }[];
}

function WelcomeState({
  instructorName,
  sparseData,
  onRunCommand,
}: {
  instructorName: string;
  sparseData: boolean;
  onRunCommand: (cmd: string) => void;
}) {
  const actions = sparseData ? SPARSE_DATA_ACTIONS : WELCOME_ACTIONS;
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-dq-orange to-[#e56045] text-white shadow-lg">
        <Brain className="h-7 w-7" />
      </div>
      {sparseData ? (
        <>
          <h3 className="mb-2 text-xl font-semibold text-dq-navy">Welcome to AI Cockpit</h3>
          <p className="mb-6 max-w-md text-sm text-gray-500">
            Your AI team is ready to help you manage courses, learners, engagement, and
            revenue.
          </p>
        </>
      ) : (
        <>
          <h3 className="mb-2 text-xl font-semibold text-dq-navy">
            {greeting}, {instructorName} 👋
          </h3>
          <p className="mb-6 max-w-md text-sm text-gray-500">
            Select an AI Agent and enter a command to begin.
          </p>
        </>
      )}
      <p className={cn(microLabel, 'mb-3')}>Recommended Actions</p>
      <div className="flex flex-wrap justify-center gap-2">
        {actions.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => onRunCommand(action)}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-dq-navy transition-colors hover:border-dq-orange/40 hover:bg-orange-50/50"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResponseBody({ response }: { response: InstructorAgentResponse }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-base font-semibold text-dq-navy">{response.title}</h4>
        {response.summary && (
          <p className="mt-1 text-sm text-gray-500">Command: {response.summary}</p>
        )}
      </div>

      {response.alerts?.map((a) => (
        <AlertCard key={a.id} data={a} />
      ))}
      {response.insights?.map((i) => (
        <InsightCard key={i.id} data={i} />
      ))}
      {response.recommendations?.map((r) => (
        <RecommendationCard key={r.id} data={r} />
      ))}

      {response.metrics && response.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {response.metrics.map((m) => (
            <PerformanceMetricCard key={m.id} data={m} />
          ))}
        </div>
      )}

      {response.charts?.map((chart) => (
        <VisualizationContainer key={chart.id} chart={chart} />
      ))}
    </div>
  );
}

export function AIResponsePanel({
  instructorName,
  activeAgentId,
  context,
  response,
  loading,
  error,
  responseTab,
  onResponseTabChange,
  onRunCommand,
  historyEntries,
}: AIResponsePanelProps) {
  const activeContext = buildActiveContext(context);
  const agent = getInstructorAgentById(activeAgentId);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className={learnerSectionHeading}>AI Response</h3>
        <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs">
          {agent.name}
        </Badge>
      </div>

      <div className={cn(learnerPanel, 'mb-3 rounded-xl p-3')}>
        <p className={microLabel}>Active Context</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {activeContext.map((item) => (
            <span key={item.label} className="text-xs text-gray-600">
              <span className="font-semibold text-dq-navy">{item.value}</span> {item.label}
            </span>
          ))}
        </div>
      </div>

      <Tabs
        value={responseTab}
        onValueChange={(v) => onResponseTabChange(v as ResponseTab)}
        className="flex min-h-0 flex-1 flex-col"
      >
        <TabsList className="mb-3 flex h-auto w-full flex-nowrap justify-start gap-1 overflow-x-auto scrollbar-none rounded-xl border border-gray-200 bg-white p-1">
          {(
            [
              ['insights', 'Insights'],
              ['reports', 'Reports'],
              ['history', 'History'],
              ['saved', 'Saved Analyses'],
            ] as const
          ).map(([key, label]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs data-[state=active]:bg-dq-navy data-[state=active]:text-white sm:text-sm"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="insights" className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden">
          <ScrollArea className="h-[min(520px,60vh)] pr-2">
            {error && (
              <div
                className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
                role="alert"
              >
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            {loading && (
              <div className="flex flex-col items-center py-16" aria-live="polite">
                <Loader2 className="mb-3 h-8 w-8 animate-spin text-dq-orange" />
                <p className="text-sm text-gray-500">Agent processing your command...</p>
              </div>
            )}
            {!loading && !response && (
              <WelcomeState
                instructorName={instructorName}
                sparseData={context.sparseData}
                onRunCommand={onRunCommand}
              />
            )}
            {!loading && response && <ResponseBody response={response} />}
            {!loading && response && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                  Save Insight
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                  Export Report
                </Button>
                <Button className={cn(learnerBtnPrimary, 'text-xs')} size="sm">
                  Create Task
                </Button>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="reports" className="mt-0 data-[state=inactive]:hidden">
          <ReportsPanel />
        </TabsContent>

        <TabsContent value="history" className="mt-0 data-[state=inactive]:hidden">
          <HistoryPanel entries={historyEntries} />
        </TabsContent>

        <TabsContent value="saved" className="mt-0 data-[state=inactive]:hidden">
          <SavedInsightsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export type { ResponseTab };
