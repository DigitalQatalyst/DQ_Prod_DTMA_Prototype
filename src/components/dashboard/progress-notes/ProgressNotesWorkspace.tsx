import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Award,
  BarChart3,
  Bookmark,
  Brain,
  CheckCircle,
  Clock,
  Download,
  FileDown,
  Flame,
  PlayCircle,
  Search,
  Share2,
  Target,
  TrendingUp,
  BookOpen,
  Pencil,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from 'recharts';
import type { LearnerTabId } from '@/components/dashboard/LearnerDashboardSidebar';
import {
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
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import { openAIMentor } from '@/lib/aiMentor';
import {
  ACTIVITY_HEATMAP,
  AI_INSIGHTS,
  CERTIFICATION_READINESS,
  COMPETENCY_DOMAINS,
  COURSE_PROGRESS,
  DATE_RANGE_OPTIONS,
  LEARNER_NOTES,
  LEARNING_GOALS,
  LEARNING_MOMENTUM,
  MILESTONES,
  NOTE_TABS,
  PERFORMANCE_KPIS,
  WEEKLY_ACTIVITY,
  WEEKLY_TOTALS,
  competencyGrowth,
  heatmapColor,
  readinessTone,
  type DateRange,
  type LearnerNote,
  type NoteTab,
} from '@/lib/progressNotesWorkspaceData';
import { cn } from '@/lib/utils';

interface ProgressNotesWorkspaceProps {
  onNavigate?: (tab: LearnerTabId) => void;
}

function Sparkline({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div className="mt-2 h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="v"
            stroke="#2563EB"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ReadinessRing({
  score,
  target,
  size = 'lg',
}: {
  score: number;
  target?: number;
  size?: 'sm' | 'lg';
}) {
  const radius = size === 'lg' ? 52 : 36;
  const dim = size === 'lg' ? 128 : 96;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const tone = readinessTone(score);

  return (
    <div className="relative mx-auto" style={{ width: dim, height: dim }}>
      <svg
        className="-rotate-90"
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        aria-hidden
      >
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={size === 'lg' ? 10 : 8}
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke={tone.ring}
          strokeWidth={size === 'lg' ? 10 : 8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('font-semibold text-dq-navy', size === 'lg' ? 'text-3xl' : 'text-xl')}>
          {score}%
        </span>
        {target != null && (
          <span className="text-xs text-gray-500">Target {target}%</span>
        )}
      </div>
    </div>
  );
}

function KpiStrip() {
  const readiness = PERFORMANCE_KPIS.certificationReadiness;
  const readinessStyle = readinessTone(readiness.value);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <div className={cn(learnerKpiCard, 'p-5')}>
        <div className="mb-2 flex items-center justify-between">
          <p className={learnerKpiLabel}>Study Time</p>
          <Clock className="h-4 w-4 text-blue-600" />
        </div>
        <p className={learnerKpiValue}>{PERFORMANCE_KPIS.studyTime.value}</p>
        <p className="mt-1 text-xs font-medium text-emerald-600">
          {PERFORMANCE_KPIS.studyTime.trend}
        </p>
        <Sparkline data={PERFORMANCE_KPIS.studyTime.sparkline} />
      </div>

      <div className={cn(learnerKpiCard, 'p-5')}>
        <div className="mb-2 flex items-center justify-between">
          <p className={learnerKpiLabel}>Average Score</p>
          <Award className="h-4 w-4 text-emerald-600" />
        </div>
        <p className={cn(learnerKpiValue, 'text-emerald-600')}>
          {PERFORMANCE_KPIS.averageScore.value}%
        </p>
        <p className="mt-1 text-xs text-gray-500">{PERFORMANCE_KPIS.averageScore.trend}</p>
      </div>

      <div className={cn(learnerKpiCard, 'p-5')}>
        <div className="mb-2 flex items-center justify-between">
          <p className={learnerKpiLabel}>Lessons Completed</p>
          <BookOpen className="h-4 w-4 text-blue-600" />
        </div>
        <p className={learnerKpiValue}>{PERFORMANCE_KPIS.lessonsCompleted.value}</p>
        <p className="mt-1 text-xs text-gray-500">{PERFORMANCE_KPIS.lessonsCompleted.remaining}</p>
      </div>

      <div className={cn(learnerKpiCard, 'p-5')}>
        <div className="mb-2 flex items-center justify-between">
          <p className={learnerKpiLabel}>Learning Streak</p>
          <Flame className="h-4 w-4 text-amber-600" />
        </div>
        <p className={cn(learnerKpiValue, 'text-amber-600')}>
          {PERFORMANCE_KPIS.streak.current} {PERFORMANCE_KPIS.streak.unit}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Best: {PERFORMANCE_KPIS.streak.best} Days
        </p>
      </div>

      <div className={cn(learnerKpiCard, 'p-5')}>
        <div className="mb-2 flex items-center justify-between">
          <p className={learnerKpiLabel}>Certification Readiness</p>
          <Target className="h-4 w-4 text-blue-600" />
        </div>
        <p className={cn(learnerKpiValue, readinessStyle.color)}>{readiness.value}%</p>
        <p className={cn('mt-1 text-xs font-medium', readinessStyle.color)}>
          {readiness.label}
        </p>
      </div>
    </div>
  );
}

function WeeklyActivitySection() {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const active = WEEKLY_ACTIVITY.find((d) => d.day === hoveredDay);

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className={cn(learnerSectionHeading, 'flex items-center gap-2')}>
          <BarChart3 className="h-5 w-5 text-blue-600" />
          Weekly Learning Activity
        </h3>
        <div className="flex gap-4 text-sm">
          <span className="text-gray-500">
            Total: <span className="font-semibold text-dq-navy">{WEEKLY_TOTALS.hours}h</span>
          </span>
          <span className="text-gray-500">
            Daily avg:{' '}
            <span className="font-semibold text-dq-navy">{WEEKLY_TOTALS.dailyAverage}h</span>
          </span>
        </div>
      </div>

      <div className="mb-6 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={WEEKLY_ACTIVITY}
            onMouseLeave={() => setHoveredDay(null)}
            onMouseMove={(state) => {
              if (state?.activeLabel) setHoveredDay(String(state.activeLabel));
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} width={28} />
            <Tooltip
              content={({ active: isActive, payload }) => {
                if (!isActive || !payload?.[0]) return null;
                const d = payload[0].payload as (typeof WEEKLY_ACTIVITY)[0];
                return (
                  <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-md">
                    <p className="font-semibold text-dq-navy">{d.day}</p>
                    <p>{d.hours}h study</p>
                    <p>{d.lessons} lessons</p>
                    <p>{d.assessments} assessments</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="hours" fill="#2563EB" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {active && (
        <p className="mb-4 text-xs text-gray-500">
          {active.day}: {active.hours}h · {active.lessons} lessons · {active.assessments}{' '}
          assessments
        </p>
      )}

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Activity heatmap
        </p>
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {ACTIVITY_HEATMAP.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((level, di) => (
                <div
                  key={di}
                  className={cn('h-3 w-3 rounded-sm', heatmapColor(level))}
                  title={`Week ${wi + 1}, intensity ${level}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-500">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div key={l} className={cn('h-3 w-3 rounded-sm', heatmapColor(l))} />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  );
}

function MomentumWidget() {
  return (
    <section className={cn(learnerPanel, 'flex h-full flex-col p-5 lg:p-6')}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className={learnerSectionHeading}>Learning Momentum</h3>
        <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700">
          <TrendingUp className="mr-1 h-3 w-3" />
          {LEARNING_MOMENTUM.score}
        </Badge>
      </div>
      <p className={cn(learnerBody, 'mb-4 flex-1')}>{LEARNING_MOMENTUM.summary}</p>
      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          Recommended action
        </p>
        <p className="text-sm text-gray-700">{LEARNING_MOMENTUM.action}</p>
      </div>
    </section>
  );
}

function CourseProgressGrid({ onNavigate }: { onNavigate?: (tab: LearnerTabId) => void }) {
  return (
    <section>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Course Progress</h3>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {COURSE_PROGRESS.map((course) => (
          <article
            key={course.id}
            className={cn(
              learnerPanel,
              'p-5 transition-all duration-300 hover:shadow-md',
            )}
          >
            <h4 className="mb-3 text-sm font-semibold leading-snug text-dq-navy">
              {course.title}
            </h4>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-dq-navy">{course.progress}% Complete</span>
              <span className={learnerCaption}>
                {course.lessonsCompleted} / {course.totalLessons} Lessons
              </span>
            </div>
            <Progress value={course.progress} className="mb-4 h-2" />
            <div className={cn(learnerCaption, 'mb-4 space-y-1')}>
              <p>Current Score: {course.currentScore}%</p>
              <p>Estimated Remaining: {course.estimatedRemaining}</p>
              <p>Last Active: {course.lastActive}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className={cn(learnerBtnPrimary, 'flex-1 sm:flex-none')}
                onClick={() => onNavigate?.('courses')}
              >
                <PlayCircle className="mr-1.5 h-4 w-4" />
                Resume Learning
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-gray-200"
                onClick={() => onNavigate?.('courses')}
              >
                View Details
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CompetencyGrowthSection() {
  const radarData = COMPETENCY_DOMAINS.map((d) => ({
    domain: d.label.split(' ')[0],
    current: d.current,
    previous: d.previous,
  }));

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Capability Growth</h3>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="domain" tick={{ fontSize: 10 }} />
              <Radar
                name="Current"
                dataKey="current"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.35}
              />
              <Radar
                name="Previous"
                dataKey="previous"
                stroke="#94A3B8"
                fill="#94A3B8"
                fillOpacity={0.15}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {COMPETENCY_DOMAINS.map((domain) => {
            const growth = competencyGrowth(domain);
            return (
              <div key={domain.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-dq-navy">{domain.label}</span>
                  <span className="text-xs text-gray-500">
                    {domain.current}%
                    <span
                      className={cn(
                        'ml-1.5 font-semibold',
                        growth >= 0 ? 'text-emerald-600' : 'text-red-600',
                      )}
                    >
                      {growth >= 0 ? '+' : ''}
                      {growth}%
                    </span>
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${domain.current}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MilestonesSection() {
  const earned = MILESTONES.filter((m) => m.status === 'earned');
  const upcoming = MILESTONES.filter((m) => m.status === 'upcoming');

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Learning Milestones</h3>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
            Achieved
          </p>
          <div className="space-y-2">
            {earned.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50/50 px-3 py-2.5"
              >
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm font-medium text-dq-navy">{m.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
            Upcoming
          </p>
          <div className="space-y-3">
            {upcoming.map((m) => (
              <div key={m.id} className="rounded-lg border border-gray-100 px-3 py-2.5">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-dq-navy">{m.title}</span>
                  <span className="text-xs text-gray-500">{m.progress}%</span>
                </div>
                <Progress value={m.progress ?? 0} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NoteCard({ note }: { note: LearnerNote }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-gray-50/40 p-4 transition hover:border-blue-200 hover:shadow-sm">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <h4 className={learnerItemTitle}>{note.title}</h4>
        <span className={cn(learnerCaption, 'shrink-0')}>{note.timestamp}</span>
      </div>
      <p className={cn(learnerCaption, 'mb-1')}>{note.course}</p>
      <Badge variant="secondary" className={cn('mb-2', learnerBadge)}>
        {note.competency}
      </Badge>
      <p className={cn(learnerBody, 'line-clamp-2')}>{note.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
        <Button variant="ghost" size="sm" className="h-8 rounded-full px-2 text-xs">
          <Pencil className="mr-1 h-3 w-3" />
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="h-8 rounded-full px-2 text-xs">
          <Bookmark className="mr-1 h-3 w-3" />
          Bookmark
        </Button>
        <Button variant="ghost" size="sm" className="h-8 rounded-full px-2 text-xs">
          <FileDown className="mr-1 h-3 w-3" />
          Export
        </Button>
        <Button variant="ghost" size="sm" className="h-8 rounded-full px-2 text-xs">
          <Share2 className="mr-1 h-3 w-3" />
          Share
        </Button>
        {note.tab !== 'revision-packs' && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-full px-2 text-xs text-blue-600"
            onClick={() => openAIMentor(`Generate a revision pack from: ${note.title}`)}
          >
            <Brain className="mr-1 h-3 w-3" />
            Revision Pack
          </Button>
        )}
      </div>
    </article>
  );
}

function NotesWorkspace() {
  const [activeTab, setActiveTab] = useState<NoteTab>('my-notes');
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  const courses = useMemo(
    () => ['all', ...new Set(LEARNER_NOTES.map((n) => n.course))],
    [],
  );

  const filteredNotes = useMemo(() => {
    return LEARNER_NOTES.filter((note) => {
      if (activeTab === 'bookmarks' && !note.bookmarked) return false;
      if (activeTab === 'ai-notes' && !note.aiGenerated) return false;
      if (activeTab === 'revision-packs' && note.tab !== 'revision-packs') return false;
      if (activeTab === 'my-notes' && (note.aiGenerated || note.tab === 'revision-packs'))
        return false;
      if (courseFilter !== 'all' && note.course !== courseFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          note.title.toLowerCase().includes(q) ||
          note.summary.toLowerCase().includes(q) ||
          note.competency.toLowerCase().includes(q) ||
          note.course.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTab, search, courseFilter]);

  const tabCounts = useMemo(() => {
    const counts: Record<NoteTab, number> = {
      'my-notes': LEARNER_NOTES.filter(
        (n) => !n.aiGenerated && n.tab !== 'revision-packs',
      ).length,
      'ai-notes': LEARNER_NOTES.filter((n) => n.aiGenerated).length,
      bookmarks: LEARNER_NOTES.filter((n) => n.bookmarked).length,
      'revision-packs': LEARNER_NOTES.filter((n) => n.tab === 'revision-packs').length,
    };
    return counts;
  }, []);

  return (
    <section className={cn(learnerPanel, 'p-5 lg:p-6')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Notes Workspace</h3>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search notes, concepts, frameworks, or lessons"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="rounded-full border border-gray-200 px-4 py-2 text-sm outline-none focus:border-blue-400"
          aria-label="Filter by course"
        >
          {courses.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'All Courses' : c}
            </option>
          ))}
        </select>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as NoteTab)}>
        <TabsList className="mb-4 flex h-auto w-full flex-nowrap justify-start gap-1 overflow-x-auto scrollbar-none rounded-xl border border-gray-200 bg-white p-1">
          {NOTE_TABS.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="shrink-0 rounded-lg px-3 py-2 text-xs data-[state=active]:bg-dq-navy data-[state=active]:text-white sm:text-sm"
            >
              {tab.label}
              <Badge variant="secondary" className="ml-1.5 h-5 min-w-5 px-1 text-[10px]">
                {tabCounts[tab.key]}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {NOTE_TABS.map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="mt-0 space-y-3">
            {filteredNotes.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 px-6 py-10 text-center">
                <BookOpen className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                <h4 className={learnerEmptyTitle}>No notes yet</h4>
                <p className={cn(learnerEmptyBody, 'mx-auto mt-2 max-w-md')}>
                  Start taking notes during lessons and build your personal knowledge base.
                </p>
              </div>
            ) : (
              filteredNotes.map((note) => <NoteCard key={note.id} note={note} />)
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

function AIInsightsPanel({ onNavigate }: { onNavigate?: (tab: LearnerTabId) => void }) {
  const insights = AI_INSIGHTS;

  return (
    <section className={cn(learnerPanel, 'p-5')}>
      <div className="mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-blue-600" />
        <h3 className={learnerCardTitle}>AI Learning Insights</h3>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
          <p className="text-xs font-semibold uppercase text-emerald-700">Strongest Area</p>
          <p className="font-medium text-dq-navy">{insights.strongest.area}</p>
          <p className="text-sm text-gray-600">Performance: {insights.strongest.score}%</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3">
          <p className="text-xs font-semibold uppercase text-amber-700">Needs Improvement</p>
          <p className="font-medium text-dq-navy">{insights.needsImprovement.area}</p>
          <p className="text-sm text-gray-600">Performance: {insights.needsImprovement.score}%</p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">
          <p className="text-xs font-semibold uppercase text-blue-700">Recommended Focus</p>
          <p className="font-medium text-dq-navy">{insights.recommendedFocus.area}</p>
          <p className="text-sm text-gray-600">
            Estimated Improvement: {insights.recommendedFocus.improvement}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 p-3">
          <p className="text-xs font-semibold uppercase text-gray-500">Suggested Activity</p>
          <p className="font-medium text-dq-navy">Complete: {insights.suggestedActivity.title}</p>
          <p className="text-sm text-gray-600">
            Time Required: {insights.suggestedActivity.duration}
          </p>
          <Button
            size="sm"
            className={cn(learnerBtnPrimary, 'mt-3 w-full')}
            onClick={() => onNavigate?.('gamification')}
          >
            Start Activity
          </Button>
        </div>
      </div>
    </section>
  );
}

function CertificationPanel() {
  const cert = CERTIFICATION_READINESS;

  return (
    <section className={cn(learnerPanel, 'p-5')}>
      <h3 className={cn(learnerCardTitle, 'mb-4')}>Certification Readiness</h3>
      <ReadinessRing score={cert.overall} target={cert.target} />
      <div className="mt-4 space-y-2 text-sm">
        <p className="text-gray-600">
          Practice assessment: <span className="font-semibold text-dq-navy">{cert.practiceScore}%</span>
        </p>
        <div>
          <p className="mb-1 text-xs font-medium text-gray-500">Weak competencies</p>
          <div className="flex flex-wrap gap-1">
            {cert.weakCompetencies.map((c) => (
              <Badge key={c} variant="secondary" className="text-xs">
                {c}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-gray-500">Actions needed</p>
          <ul className="space-y-1">
            {cert.actions.map((action) => (
              <li key={action} className="flex items-center gap-2 text-gray-600">
                <Target className="h-3.5 w-3.5 shrink-0 text-blue-600" />
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LearningGoalsPanel() {
  return (
    <section className={cn(learnerPanel, 'p-5')}>
      <h3 className={cn(learnerCardTitle, 'mb-4')}>Learning Goals</h3>
      <div className="space-y-4">
        {LEARNING_GOALS.map((goal) => {
          const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
          const display =
            goal.unit === 'h'
              ? `${goal.current} / ${goal.target}${goal.unit}`
              : goal.unit === '%'
                ? `${goal.current} / ${goal.target}${goal.unit}`
                : `${goal.current} / ${goal.target}`;
          return (
            <div key={goal.id}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-dq-navy">{goal.label}</span>
                {pct >= 100 ? (
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                ) : (
                  <span className="text-xs text-gray-500">{display}</span>
                )}
              </div>
              <Progress value={pct} className="h-2" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ProgressNotesWorkspace({ onNavigate }: ProgressNotesWorkspaceProps) {
  const [dateRange, setDateRange] = useState<DateRange>('week');

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {DATE_RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setDateRange(opt.key)}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                dateRange === opt.key
                  ? 'bg-dq-navy text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:text-dq-navy',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-full border-gray-200">
            <FileDown className="mr-1.5 h-4 w-4" />
            Export Progress Report
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-gray-200">
            <Download className="mr-1.5 h-4 w-4" />
            Download Notes
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-gray-200">
            <Share2 className="mr-1.5 h-4 w-4" />
            Share Achievement
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => openAIMentor('Analyse my learning progress and suggest improvements.')}
          >
            <Brain className="mr-1.5 h-4 w-4" />
            AI Coach
          </Button>
        </div>
      </div>

      <KpiStrip />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WeeklyActivitySection />
        </div>
        <MomentumWidget />
      </div>

      <CourseProgressGrid onNavigate={onNavigate} />

      <div className="grid gap-6 lg:grid-cols-2">
        <CompetencyGrowthSection />
        <MilestonesSection />
      </div>

      <NotesWorkspace />

      <div className="grid gap-6 lg:grid-cols-3">
        <AIInsightsPanel onNavigate={onNavigate} />
        <CertificationPanel />
        <LearningGoalsPanel />
      </div>
    </div>
  );
}

export const ProgressTracking = ProgressNotesWorkspace;
