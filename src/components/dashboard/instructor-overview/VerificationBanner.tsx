import { AlertCircle, ExternalLink, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  learnerBody,
  learnerBtnPrimary,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

interface VerificationBannerProps {
  pending: boolean;
  progress: number;
  estimatedReview: string;
  onViewDetails: () => void;
}

export function VerificationBanner({
  pending,
  progress,
  estimatedReview,
  onViewDetails,
}: VerificationBannerProps) {
  if (!pending) return null;

  return (
    <div
      className={cn(
        learnerPanel,
        'border-amber-200 bg-gradient-to-r from-amber-50/80 to-orange-50/40 p-5 lg:p-6',
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100">
            <AlertCircle className="h-6 w-6 text-amber-600" aria-hidden />
          </div>
          <div className="min-w-0">
            <h3 className={cn(learnerSectionHeading, 'mb-1')}>Verification in Progress</h3>
            <p className={cn(learnerBody, 'mb-3')}>
              We&apos;re reviewing your credentials. Course publishing is disabled until
              verification is complete.
            </p>
            <div className="max-w-md">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-600">
                <span>Review progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="mt-2 text-xs text-gray-500">
                Estimated review: {estimatedReview}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 lg:shrink-0">
          <Button
            variant="outline"
            className="rounded-full border-amber-300 bg-white"
            onClick={onViewDetails}
          >
            <ExternalLink className="mr-1.5 h-4 w-4" />
            View Verification Details
          </Button>
          <Button variant="ghost" className="rounded-full text-amber-800 hover:bg-amber-100">
            <Mail className="mr-1.5 h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
