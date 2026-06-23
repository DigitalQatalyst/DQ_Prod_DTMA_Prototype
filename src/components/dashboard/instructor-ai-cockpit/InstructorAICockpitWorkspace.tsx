import { useCallback, useEffect, useMemo, useState } from 'react';
import { Activity, Brain, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { learnerPanel } from '@/lib/brandAccent';
import {
  DEFAULT_COMMAND_HISTORY,
  INSTRUCTOR_AGENTS,
  buildInstructorAgentResponse,
  resolveSlashCommand,
  type InstructorAgentId,
  type InstructorAgentResponse,
  type InstructorCockpitContext,
} from '@/lib/instructorAiCockpitData';
import { cn } from '@/lib/utils';
import { AgentStack } from './AgentStack';
import { AIResponsePanel, type ResponseTab } from './AIResponsePanel';
import { CommandConsole } from './CommandConsole';

export type InstructorAICockpitWorkspaceProps = {
  instructorName: string;
  courseCount?: number;
  publishedCount?: number;
  draftCount?: number;
  totalEnrollments?: number;
};

type WorkspaceState = 'idle' | 'loading' | 'active' | 'error';

function CockpitStatusBar() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      <span className="inline-flex items-center gap-1.5 font-medium text-dq-navy">
        <Brain className="h-4 w-4 text-dq-orange" />
        {INSTRUCTOR_AGENTS.length} AI Agents Available
      </span>
      <span className="inline-flex items-center gap-1.5 text-emerald-600">
        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
        AI Online
      </span>
      <span className="inline-flex items-center gap-1.5 text-gray-500">
        <Activity className="h-3.5 w-3.5" />
        Recent activity: 4 commands today
      </span>
    </div>
  );
}

export function InstructorAICockpitWorkspace({
  instructorName,
  courseCount = 0,
  publishedCount = 0,
  draftCount = 0,
  totalEnrollments = 0,
}: InstructorAICockpitWorkspaceProps) {
  const [activeAgentId, setActiveAgentId] =
    useState<InstructorAgentId>('course-performance');
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>(DEFAULT_COMMAND_HISTORY);
  const [historyEntries, setHistoryEntries] = useState<
    { command: string; agent: string; time: string }[]
  >([]);
  const [response, setResponse] = useState<InstructorAgentResponse | null>(null);
  const [workspaceState, setWorkspaceState] = useState<WorkspaceState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [responseTab, setResponseTab] = useState<ResponseTab>('insights');
  const [mobileAgentsOpen, setMobileAgentsOpen] = useState(false);

  const context = useMemo<InstructorCockpitContext>(
    () => ({
      instructorName,
      courseCount,
      publishedCount,
      draftCount,
      totalEnrollments,
      upcomingSessions: 3,
      averageRating: 4.8,
      sparseData: courseCount === 0 && totalEnrollments === 0,
    }),
    [instructorName, courseCount, publishedCount, draftCount, totalEnrollments],
  );

  const runCommand = useCallback(
    (raw: string) => {
      const command = resolveSlashCommand(raw);
      if (!command) return;

      setWorkspaceState('loading');
      setError(null);
      setCommandInput('');
      setResponseTab('insights');
      setMobileAgentsOpen(false);

      setCommandHistory((prev) =>
        [command, ...prev.filter((c) => c !== command)].slice(0, 8),
      );

      window.setTimeout(() => {
        try {
          const result = buildInstructorAgentResponse(activeAgentId, command, context);
          setResponse(result);
          setHistoryEntries((prev) => [
            {
              command,
              agent: INSTRUCTOR_AGENTS.find((a) => a.id === activeAgentId)?.name ?? '',
              time: 'Just now',
            },
            ...prev,
          ].slice(0, 20));
          setWorkspaceState('active');
        } catch {
          setError('Unable to process command. Please try again.');
          setWorkspaceState('error');
        }
      }, 650);
    },
    [activeAgentId, context],
  );

  useEffect(() => {
    const handler = (event: Event) => {
      const prompt = (event as CustomEvent<{ prompt?: string }>).detail?.prompt;
      if (prompt) {
        setCommandInput(prompt);
        runCommand(prompt);
      }
    };
    window.addEventListener('dtma:open-ai-mentor', handler);
    return () => window.removeEventListener('dtma:open-ai-mentor', handler);
  }, [runCommand]);

  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <CockpitStatusBar />

      <div className="flex gap-2 lg:hidden">
        <Sheet open={mobileAgentsOpen} onOpenChange={setMobileAgentsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full border-gray-200">
              <Menu className="mr-1.5 h-4 w-4" />
              Agent Stack
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(100vw-2rem,360px)]">
            <SheetHeader>
              <SheetTitle>AI Agent Stack</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <AgentStack
                activeAgentId={activeAgentId}
                onSelectAgent={setActiveAgentId}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Left: Agent Stack */}
        <div
          className={cn(
            learnerPanel,
            'hidden rounded-2xl p-4 lg:col-span-3 lg:block',
          )}
        >
          <AgentStack
            activeAgentId={activeAgentId}
            onSelectAgent={setActiveAgentId}
          />
        </div>

        {/* Center: Command Console */}
        <div className={cn(learnerPanel, 'rounded-2xl p-4 lg:col-span-4')}>
          <CommandConsole
            activeAgentId={activeAgentId}
            commandInput={commandInput}
            onCommandInputChange={setCommandInput}
            onRunCommand={runCommand}
            commandHistory={commandHistory}
            loading={workspaceState === 'loading'}
          />
        </div>

        {/* Right: AI Response */}
        <div className={cn(learnerPanel, 'rounded-2xl p-4 lg:col-span-5')}>
          <AIResponsePanel
            instructorName={instructorName}
            activeAgentId={activeAgentId}
            context={context}
            response={response}
            loading={workspaceState === 'loading'}
            error={error}
            responseTab={responseTab}
            onResponseTabChange={setResponseTab}
            onRunCommand={runCommand}
            historyEntries={historyEntries}
          />
        </div>
      </div>
    </div>
  );
}

export default InstructorAICockpitWorkspace;
