import type { RecommendationCardData } from '@/lib/instructorAiCockpitData';

export function RecommendationCard({ data }: { data: RecommendationCardData }) {
  return (
    <article className="rounded-xl border border-dq-orange/20 bg-orange-50/40 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-dq-orange">
        Recommendation
      </p>
      <h4 className="mt-1 text-sm font-semibold text-dq-navy">{data.title}</h4>
      <p className="mt-1 text-sm text-gray-600">{data.body}</p>
      {data.impact && (
        <p className="mt-2 text-xs font-medium text-emerald-700">
          Expected Impact: {data.impact}
        </p>
      )}
    </article>
  );
}
