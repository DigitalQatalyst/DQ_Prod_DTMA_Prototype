import { useState } from 'react';
import { Archive, Brain, Send } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  learnerBadge,
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerItemTitle,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import type { LearnerReview } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

interface ResponseCenterProps {
  pendingReviews: LearnerReview[];
  onSend?: (reviewId: string, response: string) => void;
  onArchive?: (reviewId: string) => void;
}

export function ResponseCenter({ pendingReviews, onSend, onArchive }: ResponseCenterProps) {
  const [selectedId, setSelectedId] = useState(pendingReviews[0]?.id ?? '');
  const [draft, setDraft] = useState(pendingReviews[0]?.aiDraft ?? '');

  const selected = pendingReviews.find((r) => r.id === selectedId) ?? pendingReviews[0];

  const selectReview = (review: LearnerReview) => {
    setSelectedId(review.id);
    setDraft(review.aiDraft ?? '');
  };

  if (pendingReviews.length === 0) {
    return (
      <section className={cn(learnerPanel, 'p-5 lg:p-6')} aria-labelledby="response-center-heading">
        <h3 id="response-center-heading" className={cn(learnerSectionHeading, 'mb-2')}>
          Response Center
        </h3>
        <p className={learnerBodyMuted}>No reviews awaiting response.</p>
      </section>
    );
  }

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')} aria-labelledby="response-center-heading">
      <h3 id="response-center-heading" className={cn(learnerSectionHeading, 'mb-4')}>
        Response Center
      </h3>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-2 lg:col-span-4">
          {pendingReviews.map((review) => (
            <button
              key={review.id}
              type="button"
              onClick={() => selectReview(review)}
              className={cn(
                'w-full rounded-xl border p-3 text-left transition-colors',
                selected?.id === review.id
                  ? 'border-dq-orange bg-orange-50/50'
                  : 'border-gray-200 hover:border-gray-300',
              )}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-dq-navy">{review.learnerName}</span>
                {review.priority && (
                  <Badge variant="outline" className={learnerBadge}>
                    {review.priority} priority
                  </Badge>
                )}
              </div>
              <p className={cn(learnerBodyMuted, 'line-clamp-2 text-xs')}>{review.text}</p>
            </button>
          ))}
        </div>

        {selected && (
          <div className="space-y-4 lg:col-span-8">
            <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
              <p className={cn(learnerItemTitle, 'mb-1')}>{selected.courseName}</p>
              <p className={cn(learnerBodyMuted, 'text-sm')}>{selected.text}</p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-dq-orange" />
                <span className="text-sm font-medium text-dq-navy">Suggested AI reply</span>
              </div>
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                className={learnerBtnPrimary}
                onClick={() => onSend?.(selected.id, draft)}
              >
                <Send className="mr-1.5 h-4 w-4" />
                Send response
              </Button>
              <Button variant="outline" className="rounded-full" onClick={() => setDraft(selected.aiDraft ?? '')}>
                Reset AI draft
              </Button>
              <Button variant="outline" className="rounded-full">
                Save draft
              </Button>
              <Button
                variant="ghost"
                className="rounded-full"
                onClick={() => onArchive?.(selected.id)}
              >
                <Archive className="mr-1.5 h-4 w-4" />
                Archive
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
