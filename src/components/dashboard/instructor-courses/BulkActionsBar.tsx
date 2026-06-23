import { Archive, Copy, Download, FolderOpen, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { learnerPanel } from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

interface BulkActionsBarProps {
  count: number;
  onClear: () => void;
}

export function BulkActionsBar({ count, onClear }: BulkActionsBarProps) {
  if (count === 0) return null;

  return (
    <div
      className={cn(
        learnerPanel,
        'sticky top-20 z-20 flex flex-wrap items-center justify-between gap-3 border-dq-orange/30 bg-orange-50/80 p-3',
      )}
    >
      <span className="text-sm font-medium text-dq-navy">
        {count} course{count > 1 ? 's' : ''} selected
      </span>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" className="h-8 rounded-full text-xs">
          <Send className="mr-1 h-3 w-3" />
          Publish
        </Button>
        <Button size="sm" variant="outline" className="h-8 rounded-full text-xs">
          <Archive className="mr-1 h-3 w-3" />
          Archive
        </Button>
        <Button size="sm" variant="outline" className="h-8 rounded-full text-xs">
          <Copy className="mr-1 h-3 w-3" />
          Duplicate
        </Button>
        <Button size="sm" variant="outline" className="h-8 rounded-full text-xs">
          <FolderOpen className="mr-1 h-3 w-3" />
          Assign Category
        </Button>
        <Button size="sm" variant="outline" className="h-8 rounded-full text-xs">
          <Download className="mr-1 h-3 w-3" />
          Export
        </Button>
        <Button size="sm" variant="ghost" className="h-8 rounded-full text-xs text-red-600">
          <Trash2 className="mr-1 h-3 w-3" />
          Delete
        </Button>
        <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
