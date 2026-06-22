import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Lock,
  Map,
  MessageSquare,
  PlayCircle,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  btnPrimary,
  learnerBody,
  learnerBodyMuted,
  learnerCaption,
  learnerCardTitle,
  learnerItemTitle,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerLink,
  learnerPanel,
  learnerBtnPrimary,
  microLabel,
} from "@/lib/brandAccent";
import {
  buildLearnerDashboardSnapshot,
  type LearnerDashboardSnapshot,
} from "@/lib/learnerDashboard";
import type { Enrollment } from "@/hooks/useCourses";
import { cn } from "@/lib/utils";

type LearnerDashboardOverviewProps = {
  enrollments: Enrollment[];
  certificateCount: number;
  onboardingGoal?: string;
  onNavigate: (tab: "catalog" | "courses" | "assignments" | "collaboration" | "ai-cockpit") => void;
  onCourseSelect?: (courseId: string) => void;
};

function urgencyStyles(urgency: string) {
  if (urgency === "overdue") return "border-red-200 bg-red-50";
  if (urgency === "due-soon") return "border-amber-200 bg-amber-50";
  return "border-gray-100 bg-gray-50";
}

function PathStatusIcon({ status }: { status: "completed" | "current" | "locked" }) {
  if (status === "completed") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2 className="h-4 w-4" />
      </span>
    );
  }
  if (status === "current") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        <span className="h-2 w-2 rounded-full bg-blue-600" />
      </span>
    );
  }
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
      <Lock className="h-3.5 w-3.5" />
    </span>
  );
}

function WidgetHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h3 className={learnerCardTitle}>{title}</h3>
      {action}
    </div>
  );
}

function JourneyCard({ snapshot }: { snapshot: LearnerDashboardSnapshot }) {
  const { journey } = snapshot;
  return (
    <div className={cn(learnerPanel, "p-5 lg:p-6")}>
      <WidgetHeader
        title="Your Learning Journey"
        action={
          <button type="button" className={learnerLink}>
            View journey map <Map className="h-4 w-4" />
          </button>
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <p className={learnerItemTitle}>{journey.title}</p>
        <Badge variant="secondary" className="text-xs">
          {journey.type}
        </Badge>
      </div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className={learnerBodyMuted}>
          {journey.completedModules} of {journey.totalModules} modules completed
        </span>
        <span className="font-semibold text-dq-navy">{journey.progressPercent}%</span>
      </div>
      <Progress value={journey.progressPercent} className="mb-4 h-2" />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-gray-50 px-3 py-2">
          <p className={cn(microLabel, "mb-1 text-gray-400")}>Next milestone</p>
          <p className="text-sm font-medium text-dq-navy">{journey.nextMilestone}</p>
        </div>
        <div className="rounded-lg bg-gray-50 px-3 py-2">
          <p className={cn(microLabel, "mb-1 text-gray-400")}>Estimated completion</p>
          <p className="text-sm font-medium text-dq-navy">{journey.estimatedCompletion}</p>
        </div>
      </div>
    </div>
  );
}

function AICoachCard({
  snapshot,
  onNavigate,
}: {
  snapshot: LearnerDashboardSnapshot;
  onNavigate: LearnerDashboardOverviewProps["onNavigate"];
}) {
  return (
    <div className={cn(learnerPanel, "flex h-full flex-col p-5 lg:p-6")}>
      <WidgetHeader
        title="AI Learning Coach"
        action={<Sparkles className="h-5 w-5 text-violet-500" aria-hidden />}
      />
      <p className={cn(learnerBody, "mb-5 flex-1 leading-relaxed")}>{snapshot.aiCoachMessage}</p>
      <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
        {snapshot.activeCourse ? (
          <Link to={snapshot.activeCourse.learnHref}>
            <Button className={btnPrimary} size="sm">
              <PlayCircle className="mr-1.5 h-4 w-4" />
              Continue Learning
            </Button>
          </Link>
        ) : null}
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-gray-200"
          onClick={() => onNavigate("ai-cockpit")}
        >
          <Brain className="mr-1.5 h-4 w-4" />
          Ask AI Coach
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-dq-navy"
          onClick={() => onNavigate("ai-cockpit")}
        >
          Get Study Plan
        </Button>
      </div>
    </div>
  );
}

function StatsRow({ snapshot }: { snapshot: LearnerDashboardSnapshot }) {
  const items = [
    { label: "Day Streak", value: snapshot.stats.streakDays, icon: Flame, tone: "text-orange-500 bg-orange-50" },
    { label: "Learning Hours", value: `${snapshot.stats.learningHoursMonth}h`, sub: "this month", icon: Clock, tone: "text-blue-600 bg-blue-50" },
    { label: "Lessons Completed", value: snapshot.stats.lessonsCompletedWeek, sub: "this week", icon: BookOpen, tone: "text-emerald-600 bg-emerald-50" },
    { label: "Certificates", value: snapshot.stats.certificatesEarned, icon: Award, tone: "text-violet-600 bg-violet-50" },
    { label: "Upcoming Due", value: snapshot.stats.upcomingDue, sub: "this week", icon: Calendar, tone: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className={learnerKpiCard}>
            <div className={cn("mb-3 flex h-9 w-9 items-center justify-center rounded-lg", item.tone)}>
              <Icon className="h-4 w-4" />
            </div>
            <div className={learnerKpiValue}>{item.value}</div>
            <div className={learnerKpiLabel}>{item.label}</div>
            {item.sub ? <p className={cn(learnerCaption, "mt-0.5")}>{item.sub}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

function ContinueLearningCard({ snapshot }: { snapshot: LearnerDashboardSnapshot }) {
  const course = snapshot.activeCourse;
  if (!course) {
    return (
      <div className={cn(learnerPanel, "p-5")}>
        <WidgetHeader title="Continue Learning" />
        <p className={learnerBodyMuted}>No active courses. Explore the catalog to get started.</p>
      </div>
    );
  }

  return (
    <div className={cn(learnerPanel, "overflow-hidden")}>
      <div className="relative h-36">
        <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <Badge className="bg-white/20 text-white backdrop-blur-sm">{course.progressPercent}% complete</Badge>
        </div>
      </div>
      <div className="p-5">
        <h4 className={cn(learnerItemTitle, "mb-1")}>{course.title}</h4>
        <p className={cn(learnerBodyMuted, "mb-1")}>Last lesson: {course.lastLesson}</p>
        <p className={cn(learnerCaption, "mb-4")}>{course.durationRemaining} remaining</p>
        <Progress value={course.progressPercent} className="mb-4 h-2" />
        <div className="flex flex-wrap gap-2">
          <Link to={course.learnHref}>
            <Button className={btnPrimary} size="sm">
              <PlayCircle className="mr-1.5 h-4 w-4" />
              Resume Learning
            </Button>
          </Link>
          <Link to={`/courses/${course.courseId}`}>
            <Button variant="outline" size="sm" className="rounded-full border-gray-200">
              View Course
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function NextActionsPanel({ snapshot }: { snapshot: LearnerDashboardSnapshot }) {
  return (
    <div className={cn(learnerPanel, "p-5")}>
      <WidgetHeader title="Your Next Actions" />
      <ol className="space-y-2">
        {snapshot.nextActions.map((action, index) => (
          <li
            key={action.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border px-3 py-2.5",
              urgencyStyles(action.urgency)
            )}
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-dq-navy">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              {action.href ? (
                <Link to={action.href} className="text-sm font-medium text-dq-navy hover:text-dq-orange">
                  {action.title}
                </Link>
              ) : (
                <p className="text-sm font-medium text-dq-navy">{action.title}</p>
              )}
              {action.dueLabel ? <p className={learnerCaption}>{action.dueLabel}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function UpcomingPanel({ snapshot }: { snapshot: LearnerDashboardSnapshot }) {
  return (
    <div className={cn(learnerPanel, "p-5")}>
      <WidgetHeader
        title="Upcoming"
        action={
          <button type="button" className={learnerLink}>
            View calendar
          </button>
        }
      />
      <ul className="space-y-3">
        {snapshot.upcomingEvents.map((event) => (
          <li key={event.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50">
              {event.eventType === "assignment" ? (
                <Target className="h-4 w-4 text-amber-600" />
              ) : event.eventType === "live" ? (
                <Calendar className="h-4 w-4 text-blue-600" />
              ) : (
                <BookOpen className="h-4 w-4 text-dq-orange" />
              )}
            </div>
            <div>
              <p className={cn(microLabel, "mb-0.5 text-gray-400")}>{event.when}</p>
              <p className="text-sm font-medium text-dq-navy">{event.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillRadar({ snapshot }: { snapshot: LearnerDashboardSnapshot }) {
  const chartData = snapshot.skills.map((skill) => ({
    skill: skill.name.replace(" ", "\n"),
    score: skill.score,
  }));

  return (
    <div className={cn(learnerPanel, "p-5")}>
      <WidgetHeader title="Skill Development" />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "#667085" }} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#FB5535"
              fill="#FB5535"
              fillOpacity={0.2}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function InsightsWidget({ snapshot }: { snapshot: LearnerDashboardSnapshot }) {
  const { insights } = snapshot;
  return (
    <div className={cn(learnerPanel, "p-5")}>
      <WidgetHeader
        title="Learning Insights"
        action={
          <div className="flex gap-1">
            {["Week", "Month", "Quarter"].map((period, index) => (
              <button
                key={period}
                type="button"
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-medium",
                  index === 1 ? "bg-dq-navy text-white" : "text-gray-500 hover:bg-gray-100"
                )}
              >
                {period}
              </button>
            ))}
          </div>
        }
      />
      <div className="mb-4 grid grid-cols-2 gap-3">
        {[
          { label: "Completion Rate", value: `${insights.completionRate}%`, trend: insights.completionTrend },
          { label: "Time Invested", value: insights.timeInvested, trend: insights.timeTrend },
          { label: "Avg. Session", value: insights.avgSession, trend: insights.sessionTrend },
          { label: "Course Rank", value: insights.courseRank, trend: insights.rankTrend },
        ].map((item) => (
          <div key={item.label} className="rounded-lg bg-gray-50 px-3 py-2">
            <p className={cn(learnerCaption, "mb-0.5")}>{item.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-dq-navy">{item.value}</span>
              <span className="text-xs font-medium text-emerald-600">{item.trend}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={insights.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis hide />
            <Tooltip />
            <Line type="monotone" dataKey="hours" stroke="#FB5535" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AchievementsWidget({ snapshot }: { snapshot: LearnerDashboardSnapshot }) {
  return (
    <div className={cn(learnerPanel, "p-5")}>
      <WidgetHeader title="Achievements" />
      <ul className="space-y-3">
        {snapshot.achievements.map((achievement) => (
          <li key={achievement.id} className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                achievement.status === "earned" ? "bg-orange-50 text-dq-orange" : "bg-gray-100 text-gray-400"
              )}
            >
              <Award className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-dq-navy">{achievement.title}</p>
              {achievement.status === "earned" ? (
                <p className="text-xs text-emerald-600">Earned</p>
              ) : (
                <div className="mt-1">
                  <Progress value={achievement.progress ?? 0} className="h-1.5" />
                  <p className={cn(learnerCaption, "mt-1")}>{achievement.progress}% progress</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LearningPathWidget({ snapshot }: { snapshot: LearnerDashboardSnapshot }) {
  return (
    <div className={cn(learnerPanel, "p-5")}>
      <WidgetHeader title="Learning Path" />
      <ul className="space-y-0">
        {snapshot.learningPath.map((node, index) => (
          <li key={node.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <PathStatusIcon status={node.status} />
              {index < snapshot.learningPath.length - 1 ? (
                <span className="my-1 h-full min-h-6 w-px bg-gray-200" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1 pb-4">
              <p
                className={cn(
                  "text-sm font-medium",
                  node.status === "locked" ? "text-gray-400" : "text-dq-navy"
                )}
              >
                {node.title}
              </p>
              {node.status === "current" ? (
                <Badge variant="secondary" className="mt-1 text-xs">
                  In Progress
                </Badge>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecommendedWidget({
  snapshot,
  onCourseSelect,
  onNavigate,
}: {
  snapshot: LearnerDashboardSnapshot;
  onCourseSelect?: (courseId: string) => void;
  onNavigate: LearnerDashboardOverviewProps["onNavigate"];
}) {
  return (
    <div className={cn(learnerPanel, "p-5")}>
      <WidgetHeader
        title="Recommended for You"
        action={
          <button type="button" onClick={() => onNavigate("catalog")} className={learnerLink}>
            View all <ChevronRight className="h-4 w-4" />
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-3">
        {snapshot.recommendations.map((rec) => (
          <button
            key={rec.id}
            type="button"
            onClick={() => (rec.courseId ? onCourseSelect?.(rec.courseId) : onNavigate("catalog"))}
            className="rounded-xl border border-gray-200 p-4 text-left transition hover:border-dq-orange hover:shadow-sm"
          >
            {rec.badge ? (
              <Badge className="mb-2 bg-dq-orange text-white">{rec.badge}</Badge>
            ) : null}
            <p className={cn(learnerItemTitle, "mb-2 line-clamp-2")}>{rec.title}</p>
            <div className={cn(learnerBodyMuted, "flex items-center justify-between text-xs")}>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {rec.duration}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {rec.rating}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CommunityPulse({
  snapshot,
  onNavigate,
}: {
  snapshot: LearnerDashboardSnapshot;
  onNavigate: LearnerDashboardOverviewProps["onNavigate"];
}) {
  return (
    <div className={cn(learnerPanel, "p-5")}>
      <WidgetHeader title="Community Pulse" />
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2.5">
          <Users className="h-5 w-5 text-dq-orange" />
          <p className="text-sm text-dq-navy">
            <span className="font-semibold">{snapshot.community.activeLearners}</span> learners are taking this course
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2.5">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <p className="text-sm text-dq-navy">
            <span className="font-semibold">{snapshot.community.newDiscussions}</span> new discussions
          </p>
        </div>
        <div className="rounded-lg border border-dq-orange/20 bg-orange-50 px-3 py-2.5">
          <p className={cn(microLabel, "mb-1 text-dq-orange")}>Trending topic</p>
          <p className="text-sm font-medium text-dq-navy">{snapshot.community.trendingTopic}</p>
        </div>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate("collaboration")}>
          Join Discussion
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function LearnerDashboardOverview({
  enrollments,
  certificateCount,
  onboardingGoal,
  onNavigate,
  onCourseSelect,
}: LearnerDashboardOverviewProps) {
  const snapshot = buildLearnerDashboardSnapshot({
    enrollments,
    certificateCount,
    onboardingGoal,
  });

  return (
    <div className="space-y-8">
      {/* Row 1: Journey + AI Coach */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <JourneyCard snapshot={snapshot} />
        </div>
        <div className="lg:col-span-5">
          <AICoachCard snapshot={snapshot} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Row 2: Learning statistics */}
      <StatsRow snapshot={snapshot} />

      {/* Row 3: Continue learning + Next actions + Upcoming */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ContinueLearningCard snapshot={snapshot} />
        </div>
        <div className="lg:col-span-4">
          <NextActionsPanel snapshot={snapshot} />
        </div>
        <div className="lg:col-span-3">
          <UpcomingPanel snapshot={snapshot} />
        </div>
      </div>

      {/* Row 4: Skills + Insights + Achievements */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SkillRadar snapshot={snapshot} />
        </div>
        <div className="lg:col-span-5">
          <InsightsWidget snapshot={snapshot} />
        </div>
        <div className="lg:col-span-3">
          <AchievementsWidget snapshot={snapshot} />
        </div>
      </div>

      {/* Row 5: Learning path + Recommendations + Community */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <LearningPathWidget snapshot={snapshot} />
        </div>
        <div className="lg:col-span-6">
          <RecommendedWidget
            snapshot={snapshot}
            onCourseSelect={onCourseSelect}
            onNavigate={onNavigate}
          />
        </div>
        <div className="lg:col-span-3">
          <CommunityPulse snapshot={snapshot} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

export default LearnerDashboardOverview;
