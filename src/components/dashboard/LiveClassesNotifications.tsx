import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Video,
  Calendar,
  Clock,
  Users,
  Bell,
  CheckCircle,
  AlertTriangle,
  Circle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Award,
  Brain,
  Play,
  Timer,
  TrendingUp,
  BellRing,
} from 'lucide-react';
import type { LearnerTabId } from '@/components/dashboard/LearnerDashboardSidebar';
import {
  learnerBadge,
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerCaption,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerLink,
  learnerPanel,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';
import {
  AI_PREP_PROMPTS,
  LIVE_NOTIFICATIONS,
  NOTIFICATION_TONE_DOT,
  STATUS_BADGE,
  WEEKLY_SUMMARY,
  buildPastSessions,
  buildUpcomingSessions,
  formatCountdown,
  formatSessionDate,
  formatTimeRange,
  getSessionStart,
  type LiveClassSession,
  type PastClassSession,
  type PreparationItem,
} from './live-classes/liveClassData';

import { openAIMentor } from '@/lib/aiMentor';

interface LiveClassesNotificationsProps {
  onNavigate?: (tab: LearnerTabId) => void;
}

function useCountdown(target: Date) {
  const [label, setLabel] = useState(() => formatCountdown(target));

  useEffect(() => {
    setLabel(formatCountdown(target));
    const id = window.setInterval(() => setLabel(formatCountdown(target)), 30_000);
    return () => window.clearInterval(id);
  }, [target]);

  return label;
}

function PreparationRow({ items, percent }: { items: PreparationItem[]; percent: number }) {
  const iconFor = (status: PreparationItem['status']) => {
    if (status === 'complete') return <CheckCircle className="h-3.5 w-3.5 text-green-600" />;
    if (status === 'warning') return <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />;
    return <Circle className="h-3.5 w-3.5 text-gray-300" />;
  };

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Preparation</span>
        <span className="text-xs font-semibold text-dq-navy">{percent}%</span>
      </div>
      <Progress value={percent} className="mb-2 h-1" />
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-xs text-gray-600">
            {iconFor(item.status)}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusBadge({ status }: { status: LiveClassSession['status'] }) {
  const config = STATUS_BADGE[status];
  return (
    <Badge className={cn('shrink-0 border', config.className, learnerBadge)}>
      <span className={cn('mr-1.5 inline-block h-2 w-2 rounded-full', config.dotClass)} />
      {config.label}
    </Badge>
  );
}

function NextSessionHero({ session }: { session: LiveClassSession }) {
  const start = getSessionStart(session);
  const countdown = useCountdown(start);

  return (
    <section
      className={cn(
        learnerPanel,
        'overflow-hidden rounded-2xl border-orange-100/80 shadow-md',
        'bg-gradient-to-br from-[#030F35] via-[#0c1d52] to-[#1a2f6b]',
      )}
    >
      <div className="relative p-6 lg:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-dq-orange/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 h-32 w-32 rounded-full bg-dq-orange/10 blur-2xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-dq-orange/20 text-dq-orange ring-1 ring-dq-orange/30">
            <Video className="h-8 w-8" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="border-0 bg-dq-orange/90 text-white hover:bg-dq-orange">
                <Timer className="mr-1 h-3 w-3" />
                {countdown}
              </Badge>
              <Badge className="border-white/20 bg-white/10 text-white">
                {session.attendanceStatus}
              </Badge>
            </div>

            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-white">
              {session.title}
            </h2>
            <p className="mb-4 text-sm text-white/75">
              Instructor: <span className="font-medium text-white">{session.instructor}</span>
            </p>

            <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-dq-orange" />
                {formatSessionDate(session.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-dq-orange" />
                {formatTimeRange(session.startTime, session.endTime, session.timezone)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4 text-dq-orange" />
                {session.participants} of {session.maxParticipants} enrolled
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button className={cn(learnerBtnPrimary, 'shadow-lg shadow-dq-orange/25')}>
                <Video className="mr-1.5 h-4 w-4" />
                Join Class
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <BellRing className="mr-1.5 h-4 w-4" />
                Add Reminder
              </Button>
              <button type="button" className="px-3 text-sm font-semibold text-dq-orange hover:underline">
                View Preparation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WeeklySummaryRow() {
  const cards = [
    { icon: Video, iconClass: 'bg-orange-50 text-dq-orange', value: WEEKLY_SUMMARY.upcomingClasses, label: 'Upcoming Classes' },
    { icon: FileText, iconClass: 'bg-red-50 text-red-600', value: WEEKLY_SUMMARY.assignmentsDue, label: 'Assignments Due' },
    { icon: BookOpen, iconClass: 'bg-green-50 text-green-600', value: WEEKLY_SUMMARY.lessonsCompleted, label: 'Lessons Completed' },
    { icon: TrendingUp, iconClass: 'bg-blue-50 text-blue-600', value: `${WEEKLY_SUMMARY.attendanceRate}%`, label: 'Attendance Rate' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map(({ icon: Icon, iconClass, value, label }) => (
        <div key={label} className={cn(learnerKpiCard, 'rounded-2xl p-4')}>
          <div className={cn('mb-2 flex h-9 w-9 items-center justify-center rounded-lg', iconClass)}>
            <Icon className="h-4 w-4" />
          </div>
          <div className={cn(learnerKpiValue, 'text-xl')}>{value}</div>
          <div className={cn(learnerKpiLabel, 'text-xs')}>{label}</div>
        </div>
      ))}
    </div>
  );
}

function EnhancedClassCard({ session }: { session: LiveClassSession }) {
  return (
    <article className={cn(learnerPanel, 'overflow-hidden rounded-2xl')}>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-snug text-dq-navy">{session.title}</h3>
            <p className={cn(learnerBodyMuted, 'mt-0.5 text-sm')}>{session.instructor}</p>
          </div>
          <StatusBadge status={session.status} />
        </div>

        <div className={cn(learnerCaption, 'flex flex-wrap gap-x-4 gap-y-1')}>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatSessionDate(session.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatTimeRange(session.startTime, session.endTime, session.timezone)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Timer className="h-3.5 w-3.5" />
            {session.durationHours} Hours
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {session.participants}/{session.maxParticipants} Enrolled
          </span>
        </div>

        <PreparationRow items={session.preparation} percent={session.preparationPercent} />

        <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
          <Button size="sm" className={learnerBtnPrimary}>
            <Video className="mr-1.5 h-3.5 w-3.5" />
            Join Class
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-gray-200 text-xs">
            <Calendar className="mr-1.5 h-3.5 w-3.5" />
            Add to Calendar
          </Button>
          <button type="button" className={cn(learnerLink, 'text-xs')}>
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

function PastClassCard({ session }: { session: PastClassSession }) {
  return (
    <article className={cn(learnerPanel, 'rounded-2xl p-4')}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-dq-navy">{session.title}</h3>
          <p className={cn(learnerBodyMuted, 'text-sm')}>{session.instructor}</p>
        </div>
        {session.attended ? (
          <Badge className={cn('border-green-200 bg-green-100 text-green-800', learnerBadge)}>
            <CheckCircle className="mr-1 h-3 w-3" />
            Attended
          </Badge>
        ) : (
          <Badge variant="secondary" className={learnerBadge}>
            Missed
          </Badge>
        )}
      </div>
      <p className={cn(learnerCaption, 'mt-2')}>
        {formatSessionDate(session.date)} · {formatTimeRange(session.startTime, session.endTime, session.timezone)}
      </p>
      {session.recordingAvailable && (
        <Button variant="outline" size="sm" className="mt-3 rounded-full border-gray-200">
          <Play className="mr-1.5 h-3.5 w-3.5" />
          Watch Recording
        </Button>
      )}
    </article>
  );
}

function LiveClassCalendar({ sessions }: { sessions: LiveClassSession[] }) {
  const [viewDate, setViewDate] = useState(() => new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const sessionDates = useMemo(() => {
    const map = new Map<string, LiveClassSession[]>();
    sessions.forEach((s) => {
      const key = s.date;
      map.set(key, [...(map.get(key) ?? []), s]);
    });
    return map;
  }, [sessions]);

  const monthLabel = viewDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className={cn(learnerPanel, 'rounded-2xl p-5')}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-dq-navy">{monthLabel}</h3>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-gray-200"
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-gray-200"
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} className="h-12" />;
          const dateKey = `${year}-${pad(month + 1)}-${pad(day)}`;
          const daySessions = sessionDates.get(dateKey) ?? [];
          const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();

          return (
            <div
              key={dateKey}
              className={cn(
                'flex h-12 flex-col items-center justify-center rounded-lg border text-sm',
                isToday ? 'border-dq-orange bg-orange-50 font-semibold text-dq-navy' : 'border-transparent text-gray-700',
                daySessions.length > 0 && !isToday && 'bg-gray-50',
              )}
            >
              <span>{day}</span>
              {daySessions.length > 0 && (
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-dq-orange" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
        {sessions.map((s) => (
          <div key={s.id} className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-dq-orange" />
            <span className="font-medium text-dq-navy">{formatSessionDate(s.date)}</span>
            <span className={learnerBodyMuted}>{s.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function LiveClassesSidebar({ onNavigate }: { onNavigate?: (tab: LearnerTabId) => void }) {
  const quickActions = [
    { icon: Play, label: 'Continue Learning', tab: 'courses' as LearnerTabId },
    { icon: FileText, label: 'View Assignments', tab: 'assignments' as LearnerTabId },
    { icon: Brain, label: 'Ask AI Mentor', action: () => openAIMentor() },
    { icon: Award, label: 'View Certificates', tab: 'certificates' as LearnerTabId },
  ];

  return (
    <aside className="space-y-4">
      <section className={cn(learnerPanel, 'rounded-2xl p-4')}>
        <h3 className="mb-3 text-sm font-semibold text-dq-navy">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map(({ icon: Icon, label, tab, action }) => (
            <button
              key={label}
              type="button"
              onClick={() => (action ? action() : tab && onNavigate?.(tab))}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/50 p-3 text-center transition-colors hover:border-dq-orange/30 hover:bg-orange-50/50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-dq-orange shadow-sm">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium leading-tight text-dq-navy">{label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={cn(learnerPanel, 'rounded-2xl p-4')}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-dq-navy">
            <Bell className="h-4 w-4 text-dq-orange" />
            Notifications
          </h3>
        </div>
        <ul className="space-y-2">
          {LIVE_NOTIFICATIONS.map((n) => (
            <li
              key={n.id}
              className="flex items-start gap-2.5 rounded-lg border border-gray-100 px-3 py-2.5"
            >
              <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', NOTIFICATION_TONE_DOT[n.tone])} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-dq-navy">{n.message}</p>
                <p className={learnerCaption}>{n.timestamp}</p>
              </div>
              {!n.read && <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-dq-orange" />}
            </li>
          ))}
        </ul>
        <button type="button" className={cn(learnerLink, 'mt-3 text-xs')}>
          View All Notifications
        </button>
      </section>

      <section
        className={cn(
          learnerPanel,
          'rounded-2xl border-orange-100 bg-gradient-to-br from-orange-50/80 via-white to-white p-4',
        )}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-dq-orange to-[#e56045] text-white shadow-md">
            <Brain className="h-4 w-4" />
          </span>
          <h3 className="text-sm font-semibold text-dq-navy">AI Learning Assistant</h3>
        </div>
        <p className={cn(learnerBodyMuted, 'mb-3 text-sm')}>
          Need help preparing for your next class?
        </p>
        <ul className="mb-4 space-y-1.5">
          {AI_PREP_PROMPTS.map((prompt) => (
            <li key={prompt}>
              <button
                type="button"
                onClick={() => openAIMentor(prompt)}
                className="w-full rounded-lg border border-gray-100 bg-white px-3 py-2 text-left text-xs text-gray-600 transition-colors hover:border-dq-orange/30 hover:text-dq-navy"
              >
                {prompt}
              </button>
            </li>
          ))}
        </ul>
        <Button className={cn(learnerBtnPrimary, 'w-full')} onClick={() => openAIMentor()}>
          <Brain className="mr-1.5 h-4 w-4" />
          Ask AI Mentor
        </Button>
      </section>
    </aside>
  );
}

export const LiveClassesNotifications = ({ onNavigate }: LiveClassesNotificationsProps) => {
  const upcomingSessions = useMemo(() => buildUpcomingSessions(), []);
  const pastSessions = useMemo(() => buildPastSessions(), []);
  const nextSession = upcomingSessions[0];

  return (
    <div className="space-y-6">
      {nextSession && <NextSessionHero session={nextSession} />}

      <WeeklySummaryRow />

      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList className="inline-flex h-auto gap-1 rounded-lg bg-gray-100 p-1">
              <TabsTrigger
                value="upcoming"
                className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Calendar
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Past
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-0 space-y-3">
              {upcomingSessions.map((session) => (
                <EnhancedClassCard key={session.id} session={session} />
              ))}
            </TabsContent>

            <TabsContent value="calendar" className="mt-0">
              <LiveClassCalendar sessions={upcomingSessions} />
            </TabsContent>

            <TabsContent value="past" className="mt-0 space-y-3">
              {pastSessions.map((session) => (
                <PastClassCard key={session.id} session={session} />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <LiveClassesSidebar onNavigate={onNavigate} />
      </div>
    </div>
  );
};
