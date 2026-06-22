import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle,
  ChevronRight,
  Flame,
  GraduationCap,
  Layers,
  PlayCircle,
  Target,
  TrendingUp,
  Video,
  FileText,
  Download,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { LearnerTabId } from '@/components/dashboard/LearnerDashboardSidebar';
import type { Enrollment } from '@/hooks/useCourses';
import { openAIMentor } from '@/lib/aiMentor';
import {
  buildLearnerCoursesHubSnapshot,
  type HubCourseDetail,
  type HubDeadline,
} from '@/lib/learnerCoursesHub';
import { dtmaCoursesNew as dtmaCourses } from '@/data/dtmaCoursesNew';
import {
  btnPrimary,
  learnerBadge,
  learnerBody,
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerCaption,
  learnerCardTitle,
  learnerEmptyBody,
  learnerEmptyTitle,
  learnerItemTitle,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerLink,
  learnerPanel,
  learnerSectionHeading,
  microLabel,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

type LearnerCoursesHubProps = {
  enrollments: Enrollment[];
  certificateCount: number;
  onboardingGoal?: string;
  isLoading?: boolean;
  onNavigate: (tab: LearnerTabId) => void;
  onCourseSelect?: (courseId: string) => void;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function CertificationRing({ value }: { value: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-11 w-11 shrink-0" aria-hidden>
      <svg className="h-11 w-11 -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#FB5535"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-dq-navy">
        {value}%
      </span>
    </div>
  );
}

function HubSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading learning hub">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={cn(learnerKpiCard, 'h-28 animate-pulse bg-gray-100')} />
        ))}
      </div>
      <div className="h-40 animate-pulse rounded-2xl bg-gray-100" />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <div className="h-48 animate-pulse rounded-xl bg-gray-100" />
          <div className="h-64 animate-pulse rounded-xl bg-gray-100" />
        </div>
        <div className="space-y-4 lg:col-span-4">
          <div className="h-40 animate-pulse rounded-xl bg-gray-100" />
          <div className="h-32 animate-pulse rounded-xl bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

function EmptyHub({ onExplore }: { onExplore: () => void }) {
  return (
    <div
      className={cn(learnerPanel, 'flex flex-col items-center px-6 py-12 text-center')}
      role="status"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
        <GraduationCap className="h-8 w-8 text-dq-orange" aria-hidden />
      </div>
      <h3 className={cn(learnerEmptyTitle, 'mb-2')}>No active courses</h3>
      <p className={cn(learnerEmptyBody, 'mb-6 max-w-md')}>
        Explore DTMA pathways and start building your transformation capability.
      </p>
      <Button className={btnPrimary} onClick={onExplore}>
        Explore Courses
      </Button>
    </div>
  );
}

function KpiStrip({
  snapshot,
  onViewRecommendations,
}: {
  snapshot: ReturnType<typeof buildLearnerCoursesHubSnapshot>;
  onViewRecommendations: () => void;
}) {
  const { kpis } = snapshot;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div className={learnerKpiCard}>
        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
          <TrendingUp className="h-4 w-4 text-dq-orange" />
        </div>
        <div className={learnerKpiValue}>{kpis.learningProgress}%</div>
        <div className={learnerKpiLabel}>Course completion</div>
        <p className="mt-1 text-xs font-medium text-green-600">{kpis.progressTrend} this month</p>
      </div>

      <div className={learnerKpiCard}>
        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
          <Target className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className={learnerKpiValue}>{kpis.capabilityScore}</span>
          <span className="text-sm text-gray-500">/100</span>
        </div>
        <div className={learnerKpiLabel}>Transformation capability</div>
        <Badge className={cn('mt-2 border-blue-200 bg-blue-50 text-blue-800', learnerBadge)}>
          {kpis.capabilityLevel}
        </Badge>
      </div>

      <div className={learnerKpiCard}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className={learnerKpiValue}>{kpis.certificationReadiness}%</div>
            <div className={learnerKpiLabel}>Ready for certification</div>
          </div>
          <CertificationRing value={kpis.certificationReadiness} />
        </div>
      </div>

      <div className={learnerKpiCard}>
        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
          <Brain className="h-4 w-4 text-purple-600" />
        </div>
        <div className={learnerKpiValue}>{kpis.aiRecommendations}</div>
        <div className={learnerKpiLabel}>Actions waiting</div>
        <button type="button" onClick={onViewRecommendations} className={cn(learnerLink, 'mt-2 text-xs')}>
          View recommendations
        </button>
      </div>
    </div>
  );
}

function JourneyBanner({
  journey,
}: {
  journey: ReturnType<typeof buildLearnerCoursesHubSnapshot>['journey'];
}) {
  return (
    <section
      className={cn(
        learnerPanel,
        'overflow-hidden rounded-2xl border-orange-100/60 bg-gradient-to-br from-orange-50/80 via-white to-gray-50/80 p-5 lg:p-6',
      )}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className={cn(microLabel, 'mb-2')}>Learning pathway</p>
          <h3 className="text-xl font-semibold text-dq-navy lg:text-2xl">{journey.title}</h3>
          <p className={cn(learnerBodyMuted, 'mt-1')}>{journey.pathway}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <Badge variant="secondary" className={learnerBadge}>
              {journey.stageLabel}
            </Badge>
            <span className={learnerCaption}>
              Next milestone: <span className="font-medium text-dq-navy">{journey.nextMilestone}</span>
            </span>
            <span className={learnerCaption}>
              Est. completion: <span className="font-medium text-dq-navy">{journey.estimatedCompletion}</span>
            </span>
          </div>

          <div className="mt-4 max-w-xl">
            <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-dq-navy">
              <span>Pathway progress</span>
              <span>{journey.progressPercent}%</span>
            </div>
            <Progress value={journey.progressPercent} className="h-2" />
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Link to={journey.learnHref}>
            <Button className={learnerBtnPrimary}>
              <PlayCircle className="mr-1.5 h-4 w-4" />
              Continue Learning
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="rounded-full border-gray-200">
            View Pathway
          </Button>
        </div>
      </div>
    </section>
  );
}

function EnhancedCourseCard({
  course,
  onViewDetails,
}: {
  course: HubCourseDetail;
  onViewDetails?: (courseId: string) => void;
}) {
  return (
    <article className={cn(learnerPanel, 'overflow-hidden rounded-2xl transition-shadow hover:shadow-md')}>
      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-stretch">
        <img
          src={course.image}
          alt=""
          className="h-28 w-full shrink-0 rounded-xl object-cover lg:h-auto lg:w-40"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className={cn(microLabel, 'mb-1')}>{course.category}</p>
              <h3 className={cn(learnerItemTitle, 'text-lg')}>{course.title}</h3>
              <p className={cn(learnerCaption, 'mt-1')}>
                Enrolled {formatDate(course.enrolledAt)}
              </p>
            </div>
            <Badge variant="secondary" className={cn('shrink-0 capitalize', learnerBadge)}>
              {course.level}
            </Badge>
          </div>

          <div className={cn(learnerCaption, 'flex flex-wrap gap-x-4 gap-y-1')}>
            <span>
              Lessons: {course.lessonsCompleted} / {course.totalLessons}
            </span>
            <span>Time invested: {course.timeInvested}</span>
            <span className="line-clamp-1">Next: {course.nextLesson}</span>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-xs font-medium text-dq-navy">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>
        </div>

        <div className="flex shrink-0 flex-col justify-center gap-2 lg:w-44">
          <Link to={course.learnHref} className="w-full">
            <Button className={cn(learnerBtnPrimary, 'w-full')} size="sm">
              <PlayCircle className="mr-1.5 h-4 w-4" />
              Continue Learning
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-full border-gray-200"
            onClick={() => onViewDetails?.(course.courseId)}
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}

function CapabilitySnapshot({
  capabilities,
}: {
  capabilities: ReturnType<typeof buildLearnerCoursesHubSnapshot>['capabilities'];
}) {
  return (
    <section className={cn(learnerPanel, 'rounded-2xl p-5 lg:p-6')}>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className={learnerSectionHeading}>Capability Snapshot</h3>
          <p className={cn(learnerBodyMuted, 'mt-1')}>
            Track your transformation capability development.
          </p>
        </div>
        <button type="button" className={cn(learnerLink, 'text-sm')}>
          View Full Capability Profile
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {capabilities.map((cap) => (
          <div key={cap.id}>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-dq-navy">{cap.name}</span>
              <div className="flex items-center gap-2">
                {cap.trend && (
                  <span
                    className={cn(
                      'text-xs font-medium',
                      cap.trend.startsWith('+') ? 'text-green-600' : 'text-red-500',
                    )}
                  >
                    {cap.trend}
                  </span>
                )}
                <span className="text-sm font-semibold text-dq-navy">{cap.score}%</span>
              </div>
            </div>
            <Progress value={cap.score} className="h-1.5" />
          </div>
        ))}
      </div>
    </section>
  );
}

function AchievementsSection({
  achievements,
}: {
  achievements: ReturnType<typeof buildLearnerCoursesHubSnapshot>['achievements'];
}) {
  const iconFor = (icon: string) => {
    if (icon === 'streak') return Flame;
    if (icon === 'module') return Layers;
    return Award;
  };

  return (
    <section className={cn(learnerPanel, 'rounded-2xl p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Recent Achievements</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {achievements.map((item) => {
          const Icon = iconFor(item.icon);
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-dq-orange shadow-sm">
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-dq-navy">{item.title}</p>
                <p className={learnerCaption}>{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AICoachCard({
  aiCoach,
}: {
  aiCoach: ReturnType<typeof buildLearnerCoursesHubSnapshot>['aiCoach'];
}) {
  return (
    <section
      className={cn(
        learnerPanel,
        'rounded-2xl border-orange-100 bg-gradient-to-br from-orange-50/60 to-white p-4',
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-dq-orange to-[#e56045] text-white shadow-sm">
          <Brain className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-dq-navy">AI Coach</h3>
      </div>
      <p className={cn(learnerBody, 'mb-2')}>{aiCoach.insight}</p>
      <p className={cn(learnerBodyMuted, 'mb-4 text-sm')}>
        <span className="font-medium text-dq-navy">Recommendation:</span> {aiCoach.recommendation}
      </p>
      <div className="flex flex-col gap-2">
        <Button className={learnerBtnPrimary} size="sm" onClick={() => openAIMentor()}>
          Open AI Coach
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-gray-200"
          onClick={() => openAIMentor('Generate a study plan for my current pathway')}
        >
          Generate Study Plan
        </Button>
      </div>
    </section>
  );
}

function UpcomingEventsCard({
  events,
}: {
  events: ReturnType<typeof buildLearnerCoursesHubSnapshot>['upcomingEvents'];
}) {
  const iconFor = (type: string) => {
    if (type === 'live') return Video;
    if (type === 'certification') return Award;
    return FileText;
  };

  return (
    <section className={cn(learnerPanel, 'rounded-2xl p-4')}>
      <h3 className={cn(learnerItemTitle, 'mb-3')}>Upcoming Events</h3>
      <ul className="space-y-3">
        {events.map((event) => {
          const Icon = iconFor(event.type);
          return (
            <li key={event.id} className="flex items-center gap-3 border-l-2 border-dq-orange/30 pl-3">
              <Icon className="h-4 w-4 shrink-0 text-dq-orange" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-dq-navy">{event.title}</p>
                <p className={learnerCaption}>{event.when}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function deadlineStyles(urgency: HubDeadline['urgency']) {
  if (urgency === 'critical') return 'border-red-200 bg-red-50/50';
  if (urgency === 'warning') return 'border-amber-200 bg-amber-50/50';
  return 'border-gray-100 bg-gray-50/50';
}

function deadlineLabel(daysLeft: number) {
  if (daysLeft <= 1) return '1 Day Left';
  return `${daysLeft} Days Left`;
}

function DeadlinesCard({ deadlines }: { deadlines: HubDeadline[] }) {
  return (
    <section className={cn(learnerPanel, 'rounded-2xl p-4')}>
      <h3 className={cn(learnerItemTitle, 'mb-3')}>Deadlines</h3>
      <ul className="space-y-2">
        {deadlines.map((item) => (
          <li
            key={item.id}
            className={cn('flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5', deadlineStyles(item.urgency))}
          >
            <span className="text-sm font-medium text-dq-navy">{item.title}</span>
            <span
              className={cn(
                'shrink-0 text-xs font-semibold',
                item.urgency === 'critical' ? 'text-red-600' : item.urgency === 'warning' ? 'text-amber-700' : 'text-gray-600',
              )}
            >
              {deadlineLabel(item.daysLeft)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CompletedCourseCard({
  enrollment,
}: {
  enrollment: Enrollment;
}) {
  const courseData = dtmaCourses.find((c) => c.id === enrollment.course_id);
  const courseImage =
    courseData?.image ||
    enrollment.course?.image_url ||
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';

  return (
    <article className={cn(learnerPanel, 'flex flex-col gap-4 rounded-2xl p-4 md:flex-row')}>
      <img src={courseImage} alt="" className="h-28 w-full rounded-xl object-cover md:h-32 md:w-44" />
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className={learnerCardTitle}>{enrollment.course?.title}</h3>
            <p className={learnerBodyMuted}>
              Completed {enrollment.completed_at ? formatDate(enrollment.completed_at) : ''}
            </p>
          </div>
          <Badge className="shrink-0 border-emerald-200 bg-emerald-50 text-emerald-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to={`/courses/${enrollment.course_id}/learn`}>
            <Button variant="outline" size="sm" className="rounded-full border-gray-200">
              <PlayCircle className="mr-1.5 h-4 w-4" />
              Review Course
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Download className="mr-1.5 h-4 w-4" />
            Certificate
          </Button>
        </div>
      </div>
    </article>
  );
}

export function LearnerCoursesHub({
  enrollments,
  certificateCount,
  onboardingGoal,
  isLoading,
  onNavigate,
  onCourseSelect,
}: LearnerCoursesHubProps) {
  const inProgress = enrollments.filter((e) => e.status === 'active');
  const completed = enrollments.filter((e) => e.status === 'completed');

  const snapshot = useMemo(
    () => buildLearnerCoursesHubSnapshot({ enrollments, certificateCount, onboardingGoal }),
    [enrollments, certificateCount, onboardingGoal],
  );

  if (isLoading) {
    return <HubSkeleton />;
  }

  if (inProgress.length === 0 && completed.length === 0) {
    return <EmptyHub onExplore={() => onNavigate('catalog')} />;
  }

  return (
    <div className="space-y-6">
      <KpiStrip snapshot={snapshot} onViewRecommendations={() => onNavigate('ai-cockpit')} />

      {inProgress.length > 0 && <JourneyBanner journey={snapshot.journey} />}

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <section aria-labelledby="active-courses-heading">
            <Tabs defaultValue="in-progress" className="w-full">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 id="active-courses-heading" className={learnerSectionHeading}>
                  Active Courses
                </h3>
                <TabsList className="inline-flex h-auto gap-1 rounded-lg bg-gray-100 p-1">
                  <TabsTrigger
                    value="in-progress"
                    className="gap-1.5 rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <PlayCircle className="h-3.5 w-3.5" />
                    In Progress ({inProgress.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="gap-1.5 rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Completed ({completed.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="in-progress" className="mt-0 space-y-3">
                {inProgress.length === 0 ? (
                  <div className={cn(learnerPanel, 'flex items-center gap-4 p-5')}>
                    <BookOpen className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className={learnerItemTitle}>No courses in progress</p>
                      <p className={learnerBodyMuted}>Browse the catalog to enroll in a pathway.</p>
                    </div>
                  </div>
                ) : (
                  snapshot.courseDetails.map((course) => (
                    <EnhancedCourseCard
                      key={course.enrollmentId}
                      course={course}
                      onViewDetails={onCourseSelect}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="completed" className="mt-0 space-y-3">
                {completed.length === 0 ? (
                  <div className={cn(learnerPanel, 'flex items-center gap-4 p-5')}>
                    <GraduationCap className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className={learnerItemTitle}>No completed courses yet</p>
                      <p className={learnerBodyMuted}>Complete your first course to earn a certificate.</p>
                    </div>
                  </div>
                ) : (
                  completed.map((enrollment) => (
                    <CompletedCourseCard key={enrollment.id} enrollment={enrollment} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </section>

          <CapabilitySnapshot capabilities={snapshot.capabilities} />
          <AchievementsSection achievements={snapshot.achievements} />
        </div>

        <aside className="space-y-4 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <AICoachCard aiCoach={snapshot.aiCoach} />
          <UpcomingEventsCard events={snapshot.upcomingEvents} />
          <DeadlinesCard deadlines={snapshot.deadlines} />
        </aside>
      </div>
    </div>
  );
}
