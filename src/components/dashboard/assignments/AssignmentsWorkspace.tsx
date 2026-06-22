import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Award,
  Brain,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Download,
  FileText,
  Filter,
  List,
  MessageSquare,
  Timer,
  TrendingUp,
  Upload,
  ArrowUpDown,
  FileDown,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
  learnerLink,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import { openAIMentor } from '@/lib/aiMentor';
import {
  ASSIGNMENT_KPIS,
  ASSIGNMENTS,
  GRADE_TREND,
  PRIORITY_TASKS,
  READINESS_TIPS,
  STATUS_STYLES,
  SUBMISSION_TREND,
  TIMELINE_STEPS,
  WORKLOAD_FORECAST,
  formatDueDate,
  getAssignmentById,
  getStageIndex,
  type AssignmentItem,
  type AssignmentStatus,
} from '@/lib/assignmentsWorkspaceData';
import { cn } from '@/lib/utils';

type TabFilter = 'all' | AssignmentStatus;
type ViewMode = 'list' | 'calendar';
type SortKey = 'due' | 'title' | 'status';

interface AssignmentsWorkspaceProps {
  onNavigate?: (tab: LearnerTabId) => void;
}

const TAB_OPTIONS: { key: TabFilter; label: string }[] = [
  { key: 'all', label: 'All Assignments' },
  { key: 'pending', label: 'Pending' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'graded', label: 'Graded' },
  { key: 'overdue', label: 'Overdue' },
  { key: 'draft', label: 'Drafts' },
];

function ReadinessRing({ score }: { score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative mx-auto h-24 w-24">
      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96" aria-hidden>
        <circle cx="48" cy="48" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="8" />
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="#2563EB"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold text-dq-navy">{score}%</span>
      </div>
    </div>
  );
}

function ScoreCircle({ score }: { score: number }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg className="h-28 w-28 -rotate-90" viewBox="0 0 112 112" aria-hidden>
        <circle cx="56" cy="56" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10" />
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="#10B981"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-dq-navy">{score}%</span>
        <span className="text-xs text-gray-500">Score</span>
      </div>
    </div>
  );
}

function ProgressTimeline({ stage }: { stage: AssignmentItem['timelineStage'] }) {
  const current = getStageIndex(stage);

  return (
    <div className="overflow-x-auto scrollbar-none">
      <div className="flex min-w-[420px] items-center gap-0">
        {TIMELINE_STEPS.map((step, i) => {
          const active = i <= current;
          const isCurrent = i === current;
          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-semibold transition-all duration-300',
                    isCurrent
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                      : active
                        ? 'border-blue-400 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-400',
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    'whitespace-nowrap text-[10px] font-medium',
                    isCurrent ? 'text-blue-700' : active ? 'text-gray-600' : 'text-gray-400',
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < TIMELINE_STEPS.length - 1 && (
                <div
                  className={cn(
                    'mx-1 mb-4 h-0.5 flex-1 transition-colors duration-300',
                    i < current ? 'bg-blue-400' : 'bg-gray-200',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GradedFeedback({ assignment }: { assignment: AssignmentItem }) {
  if (!assignment.grade) return null;

  return (
    <div className="mt-4 space-y-4 rounded-xl border border-green-100 bg-green-50/40 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <ScoreCircle score={assignment.grade} />
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm font-semibold text-dq-navy">Instructor Feedback</p>
          <p className="text-sm leading-relaxed text-gray-600">{assignment.feedback}</p>
        </div>
      </div>

      {assignment.rubric && (
        <div>
          <p className="mb-2 text-sm font-semibold text-dq-navy">Performance Breakdown</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {assignment.rubric.map((item) => (
              <div key={item.label} className="rounded-lg bg-white px-3 py-2">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className="font-semibold text-dq-navy">{item.score}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {assignment.improvements && assignment.improvements.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-semibold text-dq-navy">Improvement Suggestions</p>
          <ul className="space-y-1.5">
            {assignment.improvements.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-gray-600">
                <Brain className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" aria-hidden />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function AssignmentCard({
  assignment,
  expanded,
  onToggleExpand,
  selected,
  onSelect,
}: {
  assignment: AssignmentItem;
  expanded: boolean;
  onToggleExpand: () => void;
  selected: boolean;
  onSelect: () => void;
}) {
  const statusStyle = STATUS_STYLES[assignment.status];

  return (
    <article
      className={cn(
        learnerPanel,
        'overflow-hidden transition-all duration-300 hover:shadow-md',
        selected && 'ring-2 ring-blue-500/30',
      )}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      role="button"
      tabIndex={0}
    >
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-dq-navy">{assignment.title}</h3>
            <p className={cn(learnerBodyMuted, 'mt-0.5')}>{assignment.course}</p>
          </div>
          <Badge className={cn(statusStyle.badge, learnerBadge, 'shrink-0 border')}>
            {statusStyle.label}
          </Badge>
        </div>

        <div className="mb-4">
          <ProgressTimeline stage={assignment.timelineStage} />
        </div>

        <div className={cn(learnerCaption, 'mb-3 flex flex-wrap items-center gap-x-4 gap-y-2')}>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            Due {formatDueDate(assignment.dueDate)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5" />
            {assignment.points} Points
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Timer className="h-3.5 w-3.5" />
            {assignment.effortHours} Hours
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            {assignment.submissionType}
          </span>
        </div>

        <div>
          <p className={cn(learnerBody, !expanded && 'line-clamp-2')}>{assignment.description}</p>
          <button
            type="button"
            className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
          >
            {expanded ? 'Show less' : 'Show more'}
            <ChevronDown
              className={cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-180')}
            />
          </button>
        </div>

        {assignment.status === 'graded' && <GradedFeedback assignment={assignment} />}

        <div
          className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4"
          onClick={(e) => e.stopPropagation()}
        >
          {assignment.status === 'pending' && (
            <>
              <Button className={learnerBtnPrimary}>
                <Upload className="mr-1.5 h-4 w-4" />
                Submit Assignment
              </Button>
              <Button variant="outline" size="sm" className="rounded-full border-gray-200">
                View Details
              </Button>
            </>
          )}
          {assignment.status === 'submitted' && (
            <button type="button" className={learnerLink}>
              View Submission
            </button>
          )}
          {assignment.status === 'graded' && (
            <>
              <button type="button" className={learnerLink}>
                View Feedback
              </button>
              <Button variant="outline" size="sm" className="rounded-full border-gray-200">
                <Download className="mr-1.5 h-4 w-4" />
                Download
              </Button>
            </>
          )}
          {assignment.status === 'overdue' && (
            <>
              <Button className={learnerBtnPrimary}>
                <Upload className="mr-1.5 h-4 w-4" />
                Submit Late
              </Button>
              <Button variant="outline" size="sm" className="rounded-full border-gray-200">
                Request Extension
              </Button>
              <button type="button" className={learnerLink}>
                View Details
              </button>
            </>
          )}
          {assignment.status === 'draft' && (
            <>
              <Button className={learnerBtnPrimary}>Continue Draft</Button>
              <button type="button" className={learnerLink}>
                View Details
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function PriorityPanel({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className={cn(learnerPanel, 'p-5')}>
      <h3 className={cn(learnerSectionHeading, 'mb-4')}>Priority Tasks</h3>
      <div className="grid gap-3 md:grid-cols-3">
        {PRIORITY_TASKS.map((task) => {
          const assignment = getAssignmentById(task.assignmentId);
          if (!assignment) return null;
          return (
            <div
              key={task.id}
              className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 transition-all duration-300 hover:border-blue-200 hover:shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                <span aria-hidden>{task.emoji}</span>
                <Badge variant="secondary" className="text-[10px]">
                  {task.label}
                </Badge>
              </div>
              <p className="mb-2 text-sm font-medium text-dq-navy">{assignment.title}</p>
              <div className={cn(learnerCaption, 'mb-3 space-y-1')}>
                <p>Due {formatDueDate(assignment.dueDate)}</p>
                <p>{assignment.points} points available</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full rounded-full border-gray-200 text-xs"
                onClick={() => onSelect(assignment.id)}
              >
                {task.priority === 'feedback' ? 'View Feedback' : 'Open Assignment'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AssignmentCalendar({ assignments }: { assignments: AssignmentItem[] }) {
  const [monthOffset, setMonthOffset] = useState(0);

  const { monthLabel, days, eventsByDay, viewYear, viewMonth } = useMemo(() => {
    const today = new Date();
    const view = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = view.getFullYear();
    const month = view.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    const eventsByDay: Record<number, AssignmentItem[]> = {};
    assignments.forEach((a) => {
      const due = new Date(a.dueDate);
      if (due.getFullYear() === year && due.getMonth() === month) {
        const day = due.getDate();
        eventsByDay[day] = [...(eventsByDay[day] || []), a];
      }
    });

    return {
      monthLabel: view.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      days,
      eventsByDay,
      viewYear: year,
      viewMonth: month,
    };
  }, [assignments, monthOffset]);

  const today = new Date();

  return (
    <div className={cn(learnerPanel, 'p-5')}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className={learnerCardTitle}>{monthLabel}</h3>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setMonthOffset((m) => m - 1)}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setMonthOffset((m) => m + 1)}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} className="h-16" />;
          const events = eventsByDay[day] || [];
          const isToday =
            today.getFullYear() === viewYear &&
            today.getMonth() === viewMonth &&
            today.getDate() === day;
          return (
            <div
              key={day}
              className={cn(
                'min-h-16 rounded-lg border border-gray-100 p-1.5',
                isToday && 'border-blue-300 bg-blue-50/50',
              )}
            >
              <span className={cn('text-xs font-medium', isToday ? 'text-blue-700' : 'text-gray-700')}>
                {day}
              </span>
              <div className="mt-0.5 space-y-0.5">
                {events.slice(0, 2).map((e) => (
                  <div
                    key={e.id}
                    className={cn(
                      'truncate rounded px-1 py-0.5 text-[9px] font-medium',
                      e.status === 'overdue'
                        ? 'bg-red-100 text-red-700'
                        : e.status === 'graded'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-800',
                    )}
                    title={e.title}
                  >
                    {e.title}
                  </div>
                ))}
                {events.length > 2 && (
                  <span className="text-[9px] text-gray-500">+{events.length - 2} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-400" /> Deadlines
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-400" /> Graded
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" /> Overdue
        </span>
      </div>
    </div>
  );
}

function AICoachPanel({ selectedAssignment }: { selectedAssignment: AssignmentItem | null }) {
  const readiness = selectedAssignment?.readinessScore ?? 78;

  return (
    <aside className={cn(learnerPanel, 'sticky top-24 p-5 lg:p-6')}>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
          <Brain className="h-5 w-5 text-blue-600" aria-hidden />
        </div>
        <div>
          <h3 className={learnerCardTitle}>AI Assignment Coach</h3>
          <p className="text-xs text-gray-500">Need help completing this assignment?</p>
        </div>
      </div>

      {selectedAssignment && (
        <p className="mb-4 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
          Focus: <span className="font-medium text-dq-navy">{selectedAssignment.title}</span>
        </p>
      )}

      <div className="space-y-3">
        <div className="rounded-xl border border-gray-100 p-3">
          <p className="mb-2 text-sm font-semibold text-dq-navy">Generate Assignment Plan</p>
          <ul className="mb-3 space-y-1 text-xs text-gray-600">
            <li>Recommended study schedule</li>
            <li>Suggested resources</li>
            <li>Time estimate</li>
          </ul>
          <Button
            size="sm"
            variant="outline"
            className="w-full rounded-full border-gray-200"
            onClick={() =>
              openAIMentor(
                `Create a study plan for: ${selectedAssignment?.title ?? 'my current assignment'}`,
              )
            }
          >
            Generate Plan
          </Button>
        </div>

        <div className="rounded-xl border border-gray-100 p-3">
          <p className="mb-2 text-sm font-semibold text-dq-navy">Ask About Assignment</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Explain what this assignment requires..."
              className="flex-1 rounded-full border border-gray-200 px-3 py-2 text-xs outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  openAIMentor(e.currentTarget.value.trim());
                  e.currentTarget.value = '';
                }
              }}
            />
            <Button
              size="icon"
              className="h-9 w-9 shrink-0 rounded-full bg-blue-600 hover:bg-blue-700"
              onClick={() =>
                openAIMentor('Explain what this assignment requires and how I should approach it.')
              }
              aria-label="Ask AI"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 p-3">
          <p className="mb-2 text-sm font-semibold text-dq-navy">Improve Submission</p>
          <div className="flex flex-wrap gap-2">
            {['Review my draft', 'Check for gaps', 'Generate outline'].map((action) => (
              <Button
                key={action}
                size="sm"
                variant="outline"
                className="rounded-full border-gray-200 text-xs"
                onClick={() => openAIMentor(action)}
              >
                {action}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 p-4 text-center">
          <p className="mb-3 text-sm font-semibold text-dq-navy">Assignment Readiness</p>
          <ReadinessRing score={readiness} />
          <ul className="mt-3 space-y-1.5 text-left">
            {READINESS_TIPS.map((tip) => (
              <li key={tip} className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="h-3.5 w-3.5 shrink-0 text-blue-600" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function AnalyticsSection() {
  const workloadColor = (level: string) => {
    if (level === 'Heavy') return 'text-red-600 bg-red-50 border-red-200';
    if (level === 'Moderate') return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-green-700 bg-green-50 border-green-200';
  };

  return (
    <div className="space-y-4">
      <h3 className={learnerSectionHeading}>Learner Insights</h3>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className={cn(learnerPanel, 'p-5')}>
          <p className="mb-3 text-sm font-semibold text-dq-navy">Submission Trends</p>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SUBMISSION_TREND}>
                <defs>
                  <linearGradient id="submissionFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} width={24} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#2563EB"
                  fill="url(#submissionFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={cn(learnerPanel, 'p-5')}>
          <p className="mb-3 text-sm font-semibold text-dq-navy">Grade Progression</p>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={GRADE_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} width={28} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="grade"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={cn(learnerPanel, 'p-5')}>
          <p className="mb-3 text-sm font-semibold text-dq-navy">Workload Forecast</p>
          <div className="space-y-3">
            {WORKLOAD_FORECAST.map((item) => (
              <div
                key={item.week}
                className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2.5"
              >
                <span className="text-sm text-gray-600">{item.week}</span>
                <Badge className={cn('border text-xs font-medium', workloadColor(item.level))}>
                  {item.level}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  variant,
  onNavigate,
}: {
  variant: 'pending' | 'graded';
  onNavigate?: (tab: LearnerTabId) => void;
}) {
  if (variant === 'pending') {
    return (
      <div className={cn(learnerPanel, 'px-6 py-12 text-center')}>
        <p className="mb-2 text-2xl" aria-hidden>
          🎉
        </p>
        <h3 className={learnerEmptyTitle}>You&apos;re all caught up!</h3>
        <p className={cn(learnerEmptyBody, 'mx-auto mt-2 max-w-md')}>
          No pending assignments. Keep progressing through your learning pathway.
        </p>
        <Button
          className={cn(learnerBtnPrimary, 'mt-6')}
          onClick={() => onNavigate?.('catalog')}
        >
          Explore Courses
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(learnerPanel, 'px-6 py-12 text-center')}>
      <AlertCircle className="mx-auto mb-3 h-10 w-10 text-gray-300" aria-hidden />
      <h3 className={learnerEmptyTitle}>No graded assignments yet.</h3>
      <p className={cn(learnerEmptyBody, 'mx-auto mt-2 max-w-md')}>
        Submit your work to receive instructor feedback and performance insights.
      </p>
      <Button className={cn(learnerBtnPrimary, 'mt-6')} onClick={() => onNavigate?.('courses')}>
        Continue Learning
      </Button>
    </div>
  );
}

export function AssignmentsWorkspace({ onNavigate }: AssignmentsWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortKey, setSortKey] = useState<SortKey>('due');
  const [selectedId, setSelectedId] = useState<string>(ASSIGNMENTS[0]?.id ?? '1');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const tabCounts = useMemo(() => {
    const counts: Record<TabFilter, number> = {
      all: ASSIGNMENTS.length,
      pending: 0,
      submitted: 0,
      graded: 0,
      overdue: 0,
      draft: 0,
    };
    ASSIGNMENTS.forEach((a) => {
      counts[a.status] += 1;
    });
    return counts;
  }, []);

  const filteredAssignments = useMemo(() => {
    let list =
      activeTab === 'all' ? [...ASSIGNMENTS] : ASSIGNMENTS.filter((a) => a.status === activeTab);

    list.sort((a, b) => {
      if (sortKey === 'title') return a.title.localeCompare(b.title);
      if (sortKey === 'status') return a.status.localeCompare(b.status);
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

    return list;
  }, [activeTab, sortKey]);

  const selectedAssignment = getAssignmentById(selectedId) ?? null;

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const showPendingEmpty = activeTab === 'pending' && filteredAssignments.length === 0;
  const showGradedEmpty = activeTab === 'graded' && filteredAssignments.length === 0;

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" size="sm" className="rounded-full border-gray-200">
          <Filter className="mr-1.5 h-4 w-4" />
          Filter Assignments
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-gray-200"
          onClick={() =>
            setSortKey((k) => (k === 'due' ? 'title' : k === 'title' ? 'status' : 'due'))
          }
        >
          <ArrowUpDown className="mr-1.5 h-4 w-4" />
          Sort
        </Button>
        <Button variant="outline" size="sm" className="rounded-full border-gray-200">
          <FileDown className="mr-1.5 h-4 w-4" />
          Export Progress
        </Button>
        <Button
          size="sm"
          className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => openAIMentor('Help me plan my assignment workload this week.')}
        >
          <Brain className="mr-1.5 h-4 w-4" />
          AI Study Assistant
        </Button>
      </div>

      {/* KPI strip */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className={learnerKpiCard}>
          <div className="flex items-start justify-between">
            <div>
              <p className={learnerKpiLabel}>Active Assignments</p>
              <p className={learnerKpiValue}>{ASSIGNMENT_KPIS.active.value}</p>
              <p className="mt-1 text-xs font-medium text-emerald-600">
                {ASSIGNMENT_KPIS.active.trend}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <ClipboardList className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className={learnerKpiCard}>
          <div className="flex items-start justify-between">
            <div>
              <p className={learnerKpiLabel}>Due This Week</p>
              <p className={cn(learnerKpiValue, 'text-amber-600')}>
                {ASSIGNMENT_KPIS.dueThisWeek.value}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
              <Calendar className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </div>
        <div className={learnerKpiCard}>
          <div className="flex items-start justify-between">
            <div>
              <p className={learnerKpiLabel}>Average Grade</p>
              <p className={cn(learnerKpiValue, 'text-emerald-600')}>
                {ASSIGNMENT_KPIS.averageGrade.value}%
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <Award className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className={learnerKpiCard}>
          <div className="flex items-start justify-between">
            <div>
              <p className={learnerKpiLabel}>Completion Rate</p>
              <p className={cn(learnerKpiValue, 'text-blue-600')}>
                {ASSIGNMENT_KPIS.completionRate.value}%
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <PriorityPanel onSelect={setSelectedId} />

      {/* View toggle + main grid */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-gray-200 bg-white p-1">
          <button
            type="button"
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
              viewMode === 'list' ? 'bg-dq-navy text-white' : 'text-gray-600 hover:text-dq-navy',
            )}
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
            List View
          </button>
          <button
            type="button"
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
              viewMode === 'calendar'
                ? 'bg-dq-navy text-white'
                : 'text-gray-600 hover:text-dq-navy',
            )}
            onClick={() => setViewMode('calendar')}
          >
            <Calendar className="h-4 w-4" />
            Calendar View
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {viewMode === 'calendar' ? (
            <AssignmentCalendar assignments={ASSIGNMENTS} />
          ) : (
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as TabFilter)}
              className="space-y-4"
            >
              <TabsList className="flex h-auto w-full flex-nowrap justify-start gap-1 overflow-x-auto scrollbar-none rounded-xl border border-gray-200 bg-white p-1">
                {TAB_OPTIONS.map((tab) => (
                  <TabsTrigger
                    key={tab.key}
                    value={tab.key}
                    className="shrink-0 rounded-lg px-3 py-2 text-xs data-[state=active]:bg-dq-navy data-[state=active]:text-white sm:text-sm"
                  >
                    {tab.label}
                    <Badge
                      variant="secondary"
                      className="ml-1.5 h-5 min-w-5 px-1 text-[10px] data-[state=active]:bg-white/20"
                    >
                      {tabCounts[tab.key]}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>

              {TAB_OPTIONS.map((tab) => (
                <TabsContent key={tab.key} value={tab.key} className="mt-0 space-y-4">
                  {tab.key === 'pending' && showPendingEmpty && (
                    <EmptyState variant="pending" onNavigate={onNavigate} />
                  )}
                  {tab.key === 'graded' && showGradedEmpty && (
                    <EmptyState variant="graded" onNavigate={onNavigate} />
                  )}
                  {!(tab.key === 'pending' && showPendingEmpty) &&
                    !(tab.key === 'graded' && showGradedEmpty) &&
                    filteredAssignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        expanded={expandedIds.has(assignment.id)}
                        onToggleExpand={() => toggleExpand(assignment.id)}
                        selected={selectedId === assignment.id}
                        onSelect={() => setSelectedId(assignment.id)}
                      />
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>

        <AICoachPanel selectedAssignment={selectedAssignment} />
      </div>

      <AnalyticsSection />
    </div>
  );
}

export const AssignmentsCredentials = AssignmentsWorkspace;
