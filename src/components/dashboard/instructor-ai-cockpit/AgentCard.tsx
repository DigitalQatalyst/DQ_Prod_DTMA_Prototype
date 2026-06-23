import type { InstructorAgentDefinition } from '@/lib/instructorAiCockpitData';
import { learnerCaption } from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  agent: InstructorAgentDefinition;
  active: boolean;
  onSelect: () => void;
}

export function AgentCard({ agent, active, onSelect }: AgentCardProps) {
  const Icon = agent.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full rounded-xl border p-3 text-left transition-all duration-200',
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
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-2">
            <p className="text-sm font-semibold text-dq-navy">{agent.name}</p>
            <span
              className={cn(
                'h-1.5 w-1.5 shrink-0 rounded-full',
                agent.status === 'online' ? 'bg-emerald-500' : 'bg-gray-300',
              )}
              aria-label={agent.status === 'online' ? 'Online' : 'Idle'}
            />
          </div>
          <p className={cn(learnerCaption, 'line-clamp-2')}>{agent.description}</p>
          <p className="mt-1.5 text-[10px] text-gray-400">Last used {agent.lastUsed}</p>
        </div>
      </div>
    </button>
  );
}
