import { ScrollArea } from '@/components/ui/scroll-area';
import { learnerSectionHeading } from '@/lib/brandAccent';
import { INSTRUCTOR_AGENTS, type InstructorAgentId } from '@/lib/instructorAiCockpitData';
import { cn } from '@/lib/utils';
import { AgentCard } from './AgentCard';

interface AgentStackProps {
  activeAgentId: InstructorAgentId;
  onSelectAgent: (id: InstructorAgentId) => void;
  className?: string;
}

export function AgentStack({ activeAgentId, onSelectAgent, className }: AgentStackProps) {
  return (
    <aside className={cn('flex h-full flex-col', className)} aria-label="AI Agent Stack">
      <h3 className={cn(learnerSectionHeading, 'mb-1')}>AI Agent Stack</h3>
      <p className="mb-3 text-xs text-gray-500">
        {INSTRUCTOR_AGENTS.length} agents available
      </p>
      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-2">
          {INSTRUCTOR_AGENTS.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              active={agent.id === activeAgentId}
              onSelect={() => onSelectAgent(agent.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
