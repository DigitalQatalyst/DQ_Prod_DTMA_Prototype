import { ChevronRight } from 'lucide-react';
import { microLabel } from '@/lib/brandAccent';

interface PromptSuggestionsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
  title?: string;
}

export function PromptSuggestions({
  prompts,
  onSelect,
  title = 'Suggested prompts',
}: PromptSuggestionsProps) {
  if (prompts.length === 0) return null;

  return (
    <div>
      <p className={microLabel}>{title}</p>
      <div className="mt-2 space-y-1">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSelect(prompt)}
            className="flex w-full items-start gap-1 rounded-lg px-2 py-1.5 text-left text-xs text-dq-navy transition-colors hover:bg-orange-50/50"
          >
            <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-dq-orange" />
            <span className="line-clamp-2">{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
