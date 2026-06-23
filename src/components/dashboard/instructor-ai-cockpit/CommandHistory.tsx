import { microLabel } from '@/lib/brandAccent';

interface CommandHistoryProps {
  commands: string[];
  onSelect: (command: string) => void;
}

export function CommandHistory({ commands, onSelect }: CommandHistoryProps) {
  if (commands.length === 0) return null;

  return (
    <div>
      <p className={microLabel}>Command history</p>
      <ul className="mt-2 space-y-1">
        {commands.map((cmd) => (
          <li key={cmd}>
            <button
              type="button"
              onClick={() => onSelect(cmd)}
              className="w-full truncate rounded-lg px-2 py-1.5 text-left text-xs text-gray-600 transition-colors hover:bg-gray-50"
            >
              {cmd}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
