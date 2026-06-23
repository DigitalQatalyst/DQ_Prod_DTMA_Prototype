import { Flag, MessageSquare, Share2, Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import {
  learnerBadge,
  learnerBodyMuted,
  learnerItemTitle,
  learnerPanel,
} from '@/lib/brandAccent';
import type { LearnerReview } from '@/lib/instructorReputationData';
import { cn } from '@/lib/utils';

const SENTIMENT_STYLES = {
  positive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  neutral: 'bg-gray-50 text-gray-700 border-gray-200',
  negative: 'bg-orange-50 text-dq-orange border-orange-200',
} as const;

const STATUS_LABELS = {
  pending: 'Response pending',
  addressed: 'Addressed',
  draft: 'Draft saved',
  none: 'No response',
} as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating ? 'fill-amber-500 text-amber-500' : 'text-gray-200',
          )}
        />
      ))}
    </div>
  );
}

interface ReviewCardProps {
  review: LearnerReview;
  onReply?: (review: LearnerReview) => void;
  onMarkAddressed?: (reviewId: string) => void;
}

export function ReviewCard({ review, onReply, onMarkAddressed }: ReviewCardProps) {
  return (
    <article className={cn(learnerPanel, 'rounded-2xl p-4 lg:p-5')}>
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <StarRating rating={review.rating} />
          <h4 className={learnerItemTitle}>{review.courseName}</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={cn(learnerBadge, SENTIMENT_STYLES[review.sentiment])}>
            {review.sentiment}
          </Badge>
          <Badge variant="secondary" className={learnerBadge}>
            {STATUS_LABELS[review.responseStatus]}
          </Badge>
        </div>
      </div>
      <p className={cn(learnerBodyMuted, 'mb-4 text-sm leading-relaxed')}>{review.text}</p>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
        <span className="font-medium text-dq-navy">{review.learnerName}</span>
        <span>{review.dateLabel}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => onReply?.(review)}
        >
          <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
          Reply
        </Button>
        {review.responseStatus === 'pending' && (
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => onMarkAddressed?.(review.id)}
          >
            Mark addressed
          </Button>
        )}
        <Button variant="ghost" size="sm" className="rounded-full">
          <Share2 className="mr-1.5 h-3.5 w-3.5" />
          Share
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full text-gray-500">
          <Flag className="mr-1.5 h-3.5 w-3.5" />
          Report issue
        </Button>
      </div>
    </article>
  );
}
