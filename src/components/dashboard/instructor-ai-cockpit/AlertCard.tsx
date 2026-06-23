import { AlertTriangle } from 'lucide-react';
import type { AlertCardData } from '@/lib/instructorAiCockpitData';

export function AlertCard({ data }: { data: AlertCardData }) {
  return (
    <article className="flex gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
          {data.title}
        </p>
        <p className="mt-1 text-sm text-gray-700">{data.body}</p>
      </div>
    </article>
  );
}
