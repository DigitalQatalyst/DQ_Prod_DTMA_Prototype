import { useMemo } from 'react';
import { Info } from 'lucide-react';
import { learnerPanel } from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

function SampleDataBanner() {
  return (
    <div
      className={cn(
        learnerPanel,
        'flex items-start gap-3 border-blue-200 bg-blue-50/50 p-4',
      )}
      role="note"
    >
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
      <p className="text-sm text-gray-700">
        Sample dashboard data is shown below. Create your first course to populate live
        teaching metrics.
      </p>
    </div>
  );
}
import type { InstructorTabId } from '@/components/dashboard/InstructorDashboardSidebar';
import { buildInstructorDashboardSnapshot } from '@/lib/instructorDashboardData';
import { ActionCenter } from './ActionCenter';
import { AnnouncementsPanel } from './AnnouncementsPanel';
import { ContentPerformanceTable } from './ContentPerformanceTable';
import { CoursePerformanceTable } from './CoursePerformanceTable';
import { EngagementAnalytics } from './EngagementAnalytics';
import { InstructorOnboardingEmpty } from './InstructorOnboardingEmpty';
import { LearnerActivityFeed } from './LearnerActivityFeed';
import { MetricGrid } from './MetricCard';
import { QuickActionGrid } from './QuickActionGrid';
import { UpcomingSessions } from './UpcomingSessions';
import { VerificationBanner } from './VerificationBanner';

interface InstructorDashboardOverviewProps {
  courseCount: number;
  publishedCount: number;
  draftCount: number;
  totalEnrollments: number;
  isVerificationPending: boolean;
  hasCredentials?: boolean;
  isLoading?: boolean;
  onNavigate: (tab: InstructorTabId) => void;
  onCreateCourse: () => void;
}

export function InstructorDashboardOverview({
  courseCount,
  publishedCount,
  draftCount,
  totalEnrollments,
  isVerificationPending,
  hasCredentials,
  isLoading,
  onNavigate,
  onCreateCourse,
}: InstructorDashboardOverviewProps) {
  const snapshot = useMemo(
    () =>
      buildInstructorDashboardSnapshot({
        courseCount,
        publishedCount,
        draftCount,
        totalEnrollments,
        isVerificationPending,
        hasCredentials,
      }),
    [
      courseCount,
      publishedCount,
      draftCount,
      totalEnrollments,
      isVerificationPending,
      hasCredentials,
    ],
  );

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      <VerificationBanner
        pending={snapshot.verification.pending}
        progress={snapshot.verification.progress}
        estimatedReview={snapshot.verification.estimatedReview}
        onViewDetails={() => onNavigate('verification')}
      />

      {snapshot.showOnboardingOnly && (
        <InstructorOnboardingEmpty
          steps={snapshot.onboardingSteps}
          onCreateCourse={onCreateCourse}
          onNavigate={onNavigate}
        />
      )}

      {courseCount === 0 && totalEnrollments === 0 && <SampleDataBanner />}

      <MetricGrid
            metrics={snapshot.metrics}
            loading={isLoading}
            monetizationEnabled={snapshot.monetizationEnabled}
          />

          <ActionCenter items={snapshot.attentionItems} onNavigate={onNavigate} />

          <QuickActionGrid actions={snapshot.quickActions} onNavigate={onNavigate} />

          <CoursePerformanceTable
            courses={snapshot.courses}
            loading={isLoading}
            onNavigate={onNavigate}
            onCreateCourse={onCreateCourse}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <UpcomingSessions
              sessions={snapshot.sessions}
              onSchedule={() => onNavigate('courses')}
            />
            <LearnerActivityFeed events={snapshot.activity} />
          </div>

          <EngagementAnalytics
            metrics={snapshot.engagement}
            charts={snapshot.engagementCharts}
          />

          <ContentPerformanceTable rows={snapshot.contentPerformance} />

          <AnnouncementsPanel announcements={snapshot.announcements} />
    </div>
  );
}

export default InstructorDashboardOverview;
