import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { learnerBtnPrimary, learnerSectionHeading, microLabel } from '@/lib/brandAccent';
import {
  QUICK_COMMAND_CHIPS,
  getInstructorAgentById,
  type InstructorAgentId,
} from '@/lib/instructorAiCockpitData';
import { cn } from '@/lib/utils';
import { CommandHistory } from './CommandHistory';
import { PromptSuggestions } from './PromptSuggestions';

interface CommandConsoleProps {
  activeAgentId: InstructorAgentId;
  commandInput: string;
  onCommandInputChange: (value: string) => void;
  onRunCommand: (command: string) => void;
  commandHistory: string[];
  loading?: boolean;
}

export function CommandConsole({
  activeAgentId,
  commandInput,
  onCommandInputChange,
  onRunCommand,
  commandHistory,
  loading,
}: CommandConsoleProps) {
  const agent = getInstructorAgentById(activeAgentId);

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h3 className={learnerSectionHeading}>Command Console</h3>
        <p className="mt-1 text-sm text-gray-500">
          Active: <span className="font-medium text-dq-navy">{agent.name}</span>
        </p>
      </div>

      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onRunCommand(commandInput);
        }}
      >
        <Textarea
          value={commandInput}
          onChange={(e) => onCommandInputChange(e.target.value)}
          placeholder="Ask your AI agent anything..."
          rows={4}
          className="min-h-[120px] resize-none rounded-xl border-gray-200 text-sm"
          aria-label="AI command input"
        />
        <Button
          type="submit"
          className={cn(learnerBtnPrimary, 'w-full sm:w-auto')}
          disabled={loading || !commandInput.trim()}
        >
          <Send className="mr-2 h-4 w-4" />
          Run Command
        </Button>
      </form>

      <div>
        <p className={microLabel}>Quick commands</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {QUICK_COMMAND_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => onRunCommand(chip)}
              className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-dq-navy transition-colors hover:border-dq-orange/40 hover:bg-orange-50/50"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <p className={cn(microLabel, 'text-gray-400')}>
        Slash commands: /analyze course · /revenue forecast · /engagement report
      </p>

      <PromptSuggestions
        prompts={agent.suggestedPrompts}
        onSelect={onRunCommand}
      />

      <CommandHistory commands={commandHistory} onSelect={onRunCommand} />
    </div>
  );
}
