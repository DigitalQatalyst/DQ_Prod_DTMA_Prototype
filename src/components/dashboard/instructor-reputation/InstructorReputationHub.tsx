import { useMemo, useState } from 'react';
import { ExternalLink, FileDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course } from '@/hooks/useCourses';
import type { InstructorTabId } from '@/components/dashboard/InstructorDashboardSidebar';
import { openAIMentor } from '@/lib/aiMentor';
import {
  buildReputationSnapshot,
  filterReviews,
  paginateReviews,
  type LearnerReview,
  type ReviewFilterTab,
} from '@/lib/instructorReputationData';
import { learnerBtnPrimary, learnerPanel, learnerSectionHeading } from '@/lib/brandAccent';
import { cn } from '@/lib/utils';
import { AIInsightPanel } from './AIInsightPanel';
import { CourseReputationTable } from './CourseReputationTable';
import { ImprovementRecommendations } from './ImprovementRecommendations';
import { MarketplacePreview } from './MarketplacePreview';
import { RatingDistributionChart } from './RatingDistributionChart';
import { ReputationEmptyState } from './ReputationEmptyState';
import { ReputationMetricsGrid } from './ReputationMetricCard';
import { ReputationScorecard } from './ReputationScorecard';
import { ReputationTimeline } from './ReputationTimeline';
import { ResponseCenter } from './ResponseCenter';
import { ReviewCard } from './ReviewCard';
import { ReviewFilterBar } from './ReviewFilterBar';

export interface InstructorReputationHubProps {
  courses: Course[] | undefined;
  publishedCount: number;
  averageRating: number;
  onNavigate: (tab: InstructorTabId) => void;
}

export function InstructorReputationHub({
  courses,
  publishedCount,
  averageRating,
  onNavigate,
}: InstructorReputationHubProps) {
  const [filterTab, setFilterTab] = useState<ReviewFilterTab>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<LearnerReview[] | null>(null);
  const [pending, setPending] = useState<LearnerReview[] | null>(null);

  const snapshot = useMemo(
    () => buildReputationSnapshot({ courses, publishedCount, averageRating }),
    [courses, publishedCount, averageRating],
  );

  const displayReviews = reviews ?? snapshot.reviews;
  const displayPending = pending ?? snapshot.pendingResponses;

  const filtered = useMemo(
    () => filterReviews(displayReviews, filterTab, search),
    [displayReviews, filterTab, search],
  );

  const { items: pageReviews, totalPages } = paginateReviews(filtered, page);

  const handleMarkAddressed = (reviewId: string) => {
    setReviews(
      displayReviews.map((r) =>
        r.id === reviewId ? { ...r, responseStatus: 'addressed' as const } : r,
      ),
    );
    setPending(displayPending.filter((r) => r.id !== reviewId));
  };

  const handleSendResponse = (reviewId: string) => {
    handleMarkAddressed(reviewId);
  };

  const openReputationCoach = (prompt?: string) => {
    openAIMentor(
      prompt ??
        'Act as my AI Reputation Coach. Analyse my course reviews, identify themes, and suggest improvements.',
    );
    onNavigate('ai-cockpit');
  };

  if (snapshot.isEmpty) {
    return (
      <div className="space-y-4">
        <ReputationMetricsGrid metrics={snapshot.metrics} />
        <ReputationEmptyState
          tips={snapshot.onboardingTips}
          onViewCourses={() => onNavigate('courses')}
          onOpenAICoach={() => openReputationCoach()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" size="sm" className="rounded-full">
          <FileDown className="mr-1.5 h-4 w-4" />
          Export reviews
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <FileText className="mr-1.5 h-4 w-4" />
          Generate reputation report
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <ExternalLink className="mr-1.5 h-4 w-4" />
          View marketplace profile
        </Button>
        <Button className={learnerBtnPrimary} size="sm" onClick={() => openReputationCoach()}>
          Open AI Reputation Coach
        </Button>
      </div>

      {snapshot.useDemo && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Sample reputation data shown for preview. Publish courses and collect learner reviews to
          see live metrics.
        </div>
      )}

      <ReputationMetricsGrid metrics={snapshot.metrics} />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <RatingDistributionChart distribution={snapshot.distribution} />
        </div>
        <div className="xl:col-span-5">
          <ReputationScorecard scorecard={snapshot.scorecard} />
        </div>
      </div>

      <section className={cn(learnerPanel, 'p-5 lg:p-6')} aria-labelledby="learner-reviews-heading">
        <h3 id="learner-reviews-heading" className={cn(learnerSectionHeading, 'mb-4')}>
          Learner Reviews
        </h3>
        <ReviewFilterBar
          activeTab={filterTab}
          onTabChange={(tab) => {
            setFilterTab(tab);
            setPage(1);
          }}
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
        <div className="mt-4 space-y-3">
          {pageReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onReply={(r) => openReputationCoach(`Draft a response to this review: "${r.text}"`)}
              onMarkAddressed={handleMarkAddressed}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </section>

      <AIInsightPanel insights={snapshot.aiInsights} onAction={openReputationCoach} />

      <CourseReputationTable rows={snapshot.courseBreakdown} />

      <ReputationTimeline timeline={snapshot.timeline} />

      <ResponseCenter
        pendingReviews={displayPending}
        onSend={handleSendResponse}
        onArchive={handleMarkAddressed}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ImprovementRecommendations items={snapshot.improvements} />
        <MarketplacePreview data={snapshot.marketplace} />
      </div>
    </div>
  );
}
