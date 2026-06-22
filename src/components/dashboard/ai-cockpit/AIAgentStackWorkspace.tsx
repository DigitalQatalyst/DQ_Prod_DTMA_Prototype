import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Brain,
  ChevronRight,
  Loader2,
  Menu,
  PanelRightClose,
  PanelRightOpen,
  Search,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/Badge';
import {
  AI_AGENTS,
  AI_INSIGHTS,
  INTELLIGENCE_METRICS,
  SUGGESTED_COMMANDS,
  buildAgentResponse,
  getAgentById,
  type AgentId,
  type AIAgentDefinition,
} from '@/lib/aiAgentStackData';
import {
  learnerBadge,
  learnerBody,
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerCaption,
  learnerItemTitle,
  learnerKpiCard,
  learnerPanel,
  learnerSectionHeading,
  microLabel,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

type ConversationEntry = {
  id: string;
  agentId: AgentId;
  command: string;
  response: ReturnType<typeof buildAgentResponse>;
  timestamp: Date;
};

type WorkspaceState = 'idle' | 'loading' | 'active' | 'error';

export type AIAgentStackWorkspaceProps = {
  enrolledCourses?: number;
  completedCourses?: number;
  averageProgress?: number;
  streak?: number;
};

const INSIGHT_TONE: Record<string, string> = {
  success: 'border-green-200 bg-green-50/80',
  info: 'border-blue-200 bg-blue-50/80',
  warning: 'border-amber-200 bg-amber-50/80',
  danger: 'border-red-200 bg-red-50/80',
};

function IntelligenceBar() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
      {INTELLIGENCE_METRICS.map(({ id, label, value, icon: Icon }) => (
        <div
          key={id}
          className={cn(
            learnerKpiCard,
            'rounded-xl border-gray-200/80 bg-gradient-to-br from-white to-gray-50/80 p-3 transition-shadow hover:shadow-md',
          )}
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-dq-orange">
            <Icon className="h-4 w-4" />
          </div>
          <p className="text-lg font-semibold text-dq-navy">{value}</p>
          <p className={cn(learnerCaption, 'leading-tight')}>{label}</p>
        </div>
      ))}
    </div>
  );
}

function AgentCard({
  agent,
  active,
  onSelect,
  compact,
}: {
  agent: AIAgentDefinition;
  active: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  const Icon = agent.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full rounded-xl border p-3 text-left transition-all',
        active
          ? 'border-dq-orange bg-orange-50/60 shadow-sm ring-1 ring-dq-orange/20'
          : 'border-gray-200 bg-white hover:border-dq-orange/30 hover:shadow-sm',
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
            active ? 'bg-dq-orange text-white' : 'bg-gray-100 text-dq-navy',
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-2">
            <p className={cn('text-sm font-semibold text-dq-navy', compact && 'text-xs')}>
              {agent.name}
            </p>
            <span
              className={cn(
                'h-1.5 w-1.5 shrink-0 rounded-full',
                active ? 'bg-green-500' : 'bg-gray-300',
              )}
              aria-hidden
            />
          </div>
          {!compact && (
            <p className={cn(learnerCaption, 'line-clamp-2')}>{agent.description}</p>
          )}
        </div>
      </div>
    </button>
  );
}

function CommandConsole({
  activeAgentId,
  onSelectAgent,
  searchQuery,
  onSearchChange,
  recentCommands,
  onRunCommand,
  suggestedCommands,
}: {
  activeAgentId: AgentId;
  onSelectAgent: (id: AgentId) => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  recentCommands: string[];
  onRunCommand: (cmd: string) => void;
  suggestedCommands: string[];
}) {
  const activeAgent = getAgentById(activeAgentId);

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h3 className={learnerSectionHeading}>Command Console</h3>
        <p className={cn(learnerBodyMuted, 'mt-1 text-sm')}>
          Select an AI specialist or execute a learning command.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchQuery.trim()) {
              onRunCommand(searchQuery.trim());
            }
          }}
          placeholder="Ask an agent or enter a command..."
          className="rounded-full border-gray-200 pl-10 text-sm"
          aria-label="Ask an agent or enter a command"
        />
      </div>

      <ScrollArea className="max-h-[280px] lg:max-h-none lg:flex-1">
        <div className="space-y-2 pr-2">
          {AI_AGENTS.filter(
            (a) =>
              !searchQuery ||
              a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              a.description.toLowerCase().includes(searchQuery.toLowerCase()),
          ).map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              active={agent.id === activeAgentId}
              onSelect={() => onSelectAgent(agent.id)}
            />
          ))}
        </div>
      </ScrollArea>

      <div>
        <p className={cn(microLabel, 'mb-2')}>Agent actions</p>
        <div className="flex flex-wrap gap-1.5">
          {activeAgent.actions.map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => onRunCommand(action)}
              className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-dq-navy transition-colors hover:border-dq-orange/40 hover:bg-orange-50/50"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {recentCommands.length > 0 && (
        <div>
          <p className={cn(microLabel, 'mb-2')}>Recent commands</p>
          <ul className="space-y-1">
            {recentCommands.map((cmd) => (
              <li key={cmd}>
                <button
                  type="button"
                  onClick={() => onRunCommand(cmd)}
                  className="w-full truncate rounded-lg px-2 py-1.5 text-left text-xs text-gray-600 hover:bg-gray-50"
                >
                  {cmd}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <p className={cn(microLabel, 'mb-2')}>Suggested commands</p>
        <div className="space-y-1">
          {suggestedCommands.slice(0, 5).map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => onRunCommand(cmd)}
              className="flex w-full items-center gap-1 rounded-lg px-2 py-1.5 text-left text-xs text-dq-navy hover:bg-orange-50/50"
            >
              <ChevronRight className="h-3 w-3 shrink-0 text-dq-orange" />
              <span className="line-clamp-2">{cmd}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResponseCard({ entry }: { entry: ConversationEntry }) {
  const agent = getAgentById(entry.agentId);
  const Icon = agent.icon;

  return (
    <article className={cn(learnerPanel, 'overflow-hidden rounded-2xl')}>
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/50 px-4 py-2.5">
        <Icon className="h-4 w-4 text-dq-orange" />
        <span className="text-xs font-medium text-dq-navy">{agent.shortName}</span>
        <span className={learnerCaption}>· {entry.command}</span>
      </div>
      <div className="space-y-4 p-4">
        <h4 className={learnerItemTitle}>{entry.response.title}</h4>
        {entry.response.sections.map((section) => (
          <div key={section.heading ?? section.items[0]}>
            {section.heading && (
              <p className={cn(microLabel, 'mb-1.5')}>{section.heading}</p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item} className={cn(learnerBody, 'flex items-start gap-2 text-sm')}>
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-dq-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {entry.response.footer && (
          <p className={cn(learnerCaption, 'border-t border-gray-100 pt-3 font-medium text-dq-navy')}>
            {entry.response.footer}
          </p>
        )}
      </div>
    </article>
  );
}

function InsightsDrawer({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  if (!open) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="hidden shrink-0 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-2 text-gray-500 transition-colors hover:border-dq-orange/30 hover:text-dq-orange xl:flex"
        aria-label="Open AI insights"
      >
        <PanelRightOpen className="h-5 w-5" />
        <span className="mt-1 text-[10px] font-medium uppercase tracking-wide">Insights</span>
      </button>
    );
  }

  return (
    <aside
      className={cn(
        learnerPanel,
        'hidden w-56 shrink-0 flex-col rounded-2xl p-4 xl:flex',
      )}
      aria-label="AI Insights"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className={learnerItemTitle}>AI Insights</h3>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-dq-navy"
          aria-label="Close insights"
        >
          <PanelRightClose className="h-4 w-4" />
        </button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-1">
          {AI_INSIGHTS.map((insight) => (
            <div
              key={insight.id}
              className={cn('rounded-lg border p-3', INSIGHT_TONE[insight.tone])}
            >
              <p className={cn(microLabel, 'mb-0.5 text-[9px]')}>{insight.label}</p>
              <p className="text-sm font-medium text-dq-navy">{insight.value}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}

function EmptyOnboarding({
  onSelectAgent,
  onRunCommand,
}: {
  onSelectAgent: (id: AgentId) => void;
  onRunCommand: (cmd: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-dq-orange to-[#e56045] text-white shadow-lg">
        <Brain className="h-7 w-7" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-dq-navy">What would you like help with today?</h3>
      <p className={cn(learnerBodyMuted, 'mb-6 max-w-md')}>
        Select a specialist agent or run a command to activate your personalized intelligence
        workspace.
      </p>
      <div className="mb-6 grid w-full max-w-lg gap-2 sm:grid-cols-2">
        {AI_AGENTS.slice(0, 4).map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            active={false}
            compact
            onSelect={() => onSelectAgent(agent.id)}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTED_COMMANDS.slice(0, 4).map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => onRunCommand(cmd)}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-dq-navy hover:border-dq-orange/40 hover:bg-orange-50/50"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AIAgentStackWorkspace({
  enrolledCourses = 0,
  completedCourses = 0,
  averageProgress = 0,
  streak = 5,
}: AIAgentStackWorkspaceProps) {
  const [activeAgentId, setActiveAgentId] = useState<AgentId>('learning-path-architect');
  const [searchQuery, setSearchQuery] = useState('');
  const [commandInput, setCommandInput] = useState('');
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const [workspaceState, setWorkspaceState] = useState<WorkspaceState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [insightsOpen, setInsightsOpen] = useState(true);
  const [mobileConsoleOpen, setMobileConsoleOpen] = useState(false);

  const activeAgent = getAgentById(activeAgentId);
  const context = useMemo(
    () => ({ enrolledCourses, completedCourses, averageProgress, streak }),
    [enrolledCourses, completedCourses, averageProgress, streak],
  );

  const runCommand = useCallback(
    (command: string) => {
      const trimmed = command.trim();
      if (!trimmed) return;

      setWorkspaceState('loading');
      setErrorMessage(null);
      setCommandInput('');
      setSearchQuery('');
      setMobileConsoleOpen(false);

      setRecentCommands((prev) => [trimmed, ...prev.filter((c) => c !== trimmed)].slice(0, 5));

      window.setTimeout(() => {
        try {
          const response = buildAgentResponse(activeAgentId, trimmed, context);
          setConversation((prev) => [
            ...prev,
            {
              id: `${Date.now()}`,
              agentId: activeAgentId,
              command: trimmed,
              response,
              timestamp: new Date(),
            },
          ]);
          setWorkspaceState('active');
        } catch {
          setWorkspaceState('error');
          setErrorMessage('Unable to process command. Please try again.');
        }
      }, 700);
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

  const latestEntry = conversation[conversation.length - 1];

  return (
    <div className="space-y-5">
      <IntelligenceBar />

      <div className="flex gap-3">
        {/* Desktop command console */}
        <aside
          className={cn(learnerPanel, 'hidden w-[30%] min-w-[240px] max-w-[320px] shrink-0 rounded-2xl p-4 lg:block')}
          aria-label="Command Console"
        >
          <CommandConsole
            activeAgentId={activeAgentId}
            onSelectAgent={setActiveAgentId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            recentCommands={recentCommands}
            onRunCommand={runCommand}
            suggestedCommands={SUGGESTED_COMMANDS}
          />
        </aside>

        {/* Response area */}
        <div className="flex min-w-0 flex-1 gap-3">
          <section className={cn(learnerPanel, 'flex min-h-[520px] flex-1 flex-col overflow-hidden rounded-2xl')}>
            {/* Agent selector + mobile console */}
            <div className="border-b border-gray-100 p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className={cn(microLabel, 'mb-1')}>Active Agent</p>
                  <div className="flex items-center gap-2">
                    <h3 className={learnerSectionHeading}>{activeAgent.name}</h3>
                    <Badge
                      className={cn(
                        'border-green-200 bg-green-50 text-green-800',
                        learnerBadge,
                      )}
                    >
                      {workspaceState === 'loading' ? 'Processing' : 'Ready'}
                    </Badge>
                  </div>
                </div>
                <Sheet open={mobileConsoleOpen} onOpenChange={setMobileConsoleOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 rounded-full border-gray-200 lg:hidden"
                    >
                      <Menu className="mr-1.5 h-4 w-4" />
                      Console
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[min(100vw-2rem,360px)] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Command Console</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      <CommandConsole
                        activeAgentId={activeAgentId}
                        onSelectAgent={(id) => {
                          setActiveAgentId(id);
                        }}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        recentCommands={recentCommands}
                        onRunCommand={runCommand}
                        suggestedCommands={SUGGESTED_COMMANDS}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                {AI_AGENTS.map((agent) => (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setActiveAgentId(agent.id)}
                    className={cn(
                      'shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                      agent.id === activeAgentId
                        ? 'border-dq-orange bg-orange-50 text-dq-orange'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
                    )}
                  >
                    {agent.shortName}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation */}
            <ScrollArea className="flex-1 p-4">
              {workspaceState === 'error' && (
                <div
                  className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
                  role="alert"
                >
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Something went wrong</p>
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                </div>
              )}

              {workspaceState === 'loading' && (
                <div className="flex flex-col items-center justify-center py-16" aria-live="polite">
                  <Loader2 className="mb-3 h-8 w-8 animate-spin text-dq-orange" />
                  <p className={learnerBodyMuted}>Agent processing your command...</p>
                </div>
              )}

              {workspaceState !== 'loading' && conversation.length === 0 && (
                <EmptyOnboarding onSelectAgent={setActiveAgentId} onRunCommand={runCommand} />
              )}

              {conversation.length > 0 && workspaceState !== 'loading' && (
                <div className="space-y-4">
                  {conversation.map((entry) => (
                    <ResponseCard key={entry.id} entry={entry} />
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Response actions */}
            {latestEntry && workspaceState === 'active' && (
              <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-3">
                <p className={cn(microLabel, 'mb-2')}>Agent actions</p>
                <div className="flex flex-wrap gap-2">
                  {getAgentById(latestEntry.agentId).responseActions.map((action) => (
                    <Button
                      key={action}
                      variant="outline"
                      size="sm"
                      className="rounded-full border-gray-200 text-xs"
                      onClick={() => runCommand(action)}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Command input */}
            <div className="border-t border-gray-100 p-4">
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  runCommand(commandInput);
                }}
              >
                <Input
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder={`Command ${activeAgent.shortName}...`}
                  className="rounded-full border-gray-200 text-sm"
                  aria-label="Enter command"
                />
                <Button
                  type="submit"
                  className={cn(learnerBtnPrimary, 'shrink-0 px-4')}
                  disabled={workspaceState === 'loading'}
                  aria-label="Send command"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </section>

          <InsightsDrawer open={insightsOpen} onToggle={() => setInsightsOpen((v) => !v)} />
        </div>
      </div>

      {/* Mobile insights below workspace */}
      <div className="xl:hidden">
        <details className={cn(learnerPanel, 'rounded-2xl p-4')}>
          <summary className="cursor-pointer list-none font-semibold text-dq-navy">
            AI Insights
          </summary>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {AI_INSIGHTS.map((insight) => (
              <div
                key={insight.id}
                className={cn('rounded-lg border p-3', INSIGHT_TONE[insight.tone])}
              >
                <p className={cn(microLabel, 'mb-0.5 text-[9px]')}>{insight.label}</p>
                <p className="text-sm font-medium text-dq-navy">{insight.value}</p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
