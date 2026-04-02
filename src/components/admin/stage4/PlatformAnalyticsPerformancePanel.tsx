import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  Gauge,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  TriangleAlert,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Period = "7d" | "30d" | "qtd" | "12m";
type Persona = "all" | "learner" | "instructor" | "institution";
type CourseStatus = "popular" | "steady" | "needs-review";
type ReconStatus = "matched" | "discrepancy" | "blocked" | "resolved";
type AlertStatus = "normal" | "warning" | "critical" | "resolved";
type IncidentStatus = "healthy" | "monitoring" | "investigating" | "resolved";
type Status = CourseStatus | ReconStatus | AlertStatus | IncidentStatus;

type Course = {
  id: string;
  title: string;
  owner: string;
  category: string;
  enrollments: number;
  completion: number;
  minutes: number;
  revenue: number;
  rating: number;
  topic: string;
  status: CourseStatus;
};

type ActivityMetric = { label: string; value: number; delta: string; helper: string };
type RevenueSource = { source: string; amount: number; share: number };
type ReconItem = { id: string; program: string; expected: number; captured: number; status: ReconStatus; reason: string; source: string };
type SupportAlert = { id: string; title: string; detail: string; status: AlertStatus; average: number; current: number };
type Incident = { id: string; title: string; impact: string; status: IncidentStatus; owner: string; timestamp: string };
type ExportRecord = { id: string; scope: string; format: string; period: Period; timestamp: string };

const PERIODS: { value: Period; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "qtd", label: "Quarter to date" },
  { value: "12m", label: "Last 12 months" },
];

const PERIOD_LABEL: Record<Period, string> = { "7d": "7-day window", "30d": "30-day window", qtd: "quarter-to-date", "12m": "12-month window" };
const PERIOD_FACTOR: Record<Period, number> = { "7d": 0.18, "30d": 0.58, qtd: 1, "12m": 3.4 };
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmtMoney = (value: number) => money.format(value);
const fmtNum = (value: number) => value.toLocaleString("en-US");
const fmtTime = (value: string) => new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const scale = (value: number, factor: number) => Math.max(0, Math.round(value * factor));

const COURSES: Course[] = [
  { id: "c1", title: "Digital Transformation Fundamentals", owner: "Dr. Aisha Mensah", category: "Digital Skills", enrollments: 342, completion: 72, minutes: 48, revenue: 8550, rating: 4.8, topic: "Executive upskilling", status: "popular" },
  { id: "c2", title: "AI & Automation in the Workplace", owner: "James Okafor", category: "AI & Technology", enrollments: 219, completion: 65, minutes: 42, revenue: 5475, rating: 4.6, topic: "Applied automation", status: "popular" },
  { id: "c3", title: "Data-Driven Decision Making", owner: "Priya Nair", category: "Analytics", enrollments: 176, completion: 61, minutes: 39, revenue: 7040, rating: 4.5, topic: "Dashboard literacy", status: "steady" },
  { id: "c4", title: "Leadership in the Digital Age", owner: "Marcus Webb", category: "Leadership", enrollments: 128, completion: 54, minutes: 35, revenue: 5120, rating: 4.3, topic: "Change leadership", status: "needs-review" },
  { id: "c5", title: "Agile Project Management", owner: "Sofia Reyes", category: "Management", enrollments: 187, completion: 58, minutes: 37, revenue: 4675, rating: 4.5, topic: "Delivery cadence", status: "steady" },
];

const ACTIVITY_BASE: ActivityMetric[] = [
  { label: "New sign-ups", value: 124, delta: "+18%", helper: "Aggregated onboarding trend" },
  { label: "Active learners", value: 892, delta: "+11%", helper: "Distinct active accounts" },
  { label: "Returning learners", value: 514, delta: "+9%", helper: "Repeat engagement signal" },
  { label: "Forum interactions", value: 268, delta: "+14%", helper: "Community participation" },
  { label: "Content searches", value: 1080, delta: "+6%", helper: "Search interest velocity" },
  { label: "Certificate verifications", value: 68, delta: "+24%", helper: "External verification demand" },
];

const REVENUE_BASE: RevenueSource[] = [
  { source: "Direct learner sales", amount: 106000, share: 58 },
  { source: "Sponsor payments", amount: 51000, share: 28 },
  { source: "Partner share", amount: 27000, share: 14 },
];

const RECONCILIATIONS_BASE: ReconItem[] = [
  { id: "r1", program: "Digital Transformation Fundamentals", expected: 28500, captured: 28500, status: "matched", reason: "Matched to live enrollment log", source: "Direct learner sales" },
  { id: "r2", program: "AI & Automation in the Workplace", expected: 44000, captured: 41200, status: "discrepancy", reason: "Sponsor invoice short-paid by one seat block", source: "Sponsor payments" },
  { id: "r3", program: "Leadership in the Digital Age", expected: 17600, captured: 17600, status: "matched", reason: "Royalty line matched to contract metadata", source: "Partner share" },
  { id: "r4", program: "Agile Project Management", expected: 14400, captured: 10800, status: "blocked", reason: "Partial settlement awaiting capture confirmation", source: "Direct learner sales" },
];

const SUPPORT_ALERTS_BASE: SupportAlert[] = [
  { id: "s1", title: "Ticket volume above 30-day average", detail: "17 tickets today vs 12 daily average; exceeds alert threshold", status: "critical", average: 12, current: 17 },
  { id: "s2", title: "Billing queue SLA at risk", detail: "3 unresolved billing tickets are older than 36 hours", status: "warning", average: 6, current: 9 },
  { id: "s3", title: "Knowledge article reuse rising", detail: "Learners are resolving common questions without agent intervention", status: "normal", average: 22, current: 19 },
];

const INCIDENTS_BASE: Incident[] = [
  { id: "i1", title: "Mobile login latency spike", impact: "12 minutes of elevated response time", status: "resolved", owner: "System Monitor", timestamp: "2026-04-01T08:20:00Z" },
  { id: "i2", title: "Content search index lag", impact: "Search results delayed by under 2 minutes", status: "monitoring", owner: "Platform Admin", timestamp: "2026-04-01T09:05:00Z" },
  { id: "i3", title: "Batch report export queue slow", impact: "PDF exports taking longer than expected", status: "investigating", owner: "Support Ops", timestamp: "2026-04-01T09:40:00Z" },
];

const EXPORTS_BASE: ExportRecord[] = [
  { id: "e1", scope: "Executive overview snapshot", format: "PDF deck", period: "30d", timestamp: "2026-04-01T08:35:00Z" },
  { id: "e2", scope: "Revenue and reconciliation log", format: "CSV", period: "qtd", timestamp: "2026-04-01T09:10:00Z" },
];

function MetricCard({ title, value, helper, icon, accent }: { title: string; value: string; helper: string; icon: ReactNode; accent?: string }) {
  return (
    <Card className="overflow-hidden border-slate-200/70 bg-white/90 shadow-sm backdrop-blur">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
            <div className={cn("text-3xl font-semibold tracking-tight text-slate-900", accent)}>{value}</div>
            <p className="text-sm text-slate-600">{helper}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status, children }: { status: Status; children: ReactNode }) {
  const cls: Record<Status, string> = {
    popular: "border-emerald-200 bg-emerald-50 text-emerald-700",
    steady: "border-slate-200 bg-slate-50 text-slate-700",
    "needs-review": "border-amber-200 bg-amber-50 text-amber-800",
    matched: "border-emerald-200 bg-emerald-50 text-emerald-700",
    discrepancy: "border-amber-200 bg-amber-50 text-amber-800",
    blocked: "border-rose-200 bg-rose-50 text-rose-700",
    resolved: "border-emerald-200 bg-emerald-50 text-emerald-700",
    normal: "border-slate-200 bg-slate-50 text-slate-700",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    critical: "border-rose-200 bg-rose-50 text-rose-700",
    healthy: "border-emerald-200 bg-emerald-50 text-emerald-700",
    monitoring: "border-amber-200 bg-amber-50 text-amber-800",
    investigating: "border-rose-200 bg-rose-50 text-rose-700",
  };

  return <Badge className={cn("rounded-full border px-3 py-1 text-xs font-semibold capitalize", cls[status])}>{children}</Badge>;
}

export default function PlatformAnalyticsPerformancePanel() {
  const { toast } = useToast();
  const [period, setPeriod] = useState<Period>("30d");
  const [persona, setPersona] = useState<Persona>("all");
  const [search, setSearch] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES[0].id);
  const [reconciliations, setReconciliations] = useState(RECONCILIATIONS_BASE);
  const [alerts, setAlerts] = useState(SUPPORT_ALERTS_BASE);
  const [incidents, setIncidents] = useState(INCIDENTS_BASE);
  const [exports, setExports] = useState(EXPORTS_BASE);
  const [lastRefresh, setLastRefresh] = useState(new Date().toISOString());

  const factor = PERIOD_FACTOR[period];
  const selectedCourse = COURSES.find((course) => course.id === selectedCourseId) ?? COURSES[0];
  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return COURSES.filter((course) => {
      if (!query) return true;
      return [course.title, course.owner, course.category, course.topic].some((value) => value.toLowerCase().includes(query));
    })
      .map((course) => ({ ...course, enrollments: scale(course.enrollments, factor), revenue: scale(course.revenue, factor) }))
      .sort((left, right) => right.enrollments - left.enrollments);
  }, [factor, search]);

  const activity = useMemo(
    () =>
      ACTIVITY_BASE.map((item) => ({
        ...item,
        value: scale(item.value, factor),
      })),
    [factor],
  );

  const revenueSources = useMemo(
    () =>
      REVENUE_BASE.map((item) => ({
        ...item,
        amount: scale(item.amount, factor),
      })),
    [factor],
  );

  const personaCards = useMemo(() => {
    const base = [
      { key: "learner" as const, label: "Learners", value: scale(1420, factor), helper: "Engagement and support demand" },
      { key: "instructor" as const, label: "Instructors", value: scale(214, factor), helper: "Content production and grading activity" },
      { key: "institution" as const, label: "Institutions", value: scale(38, factor), helper: "Sponsor and cohort reporting demand" },
    ];

    return base.filter((item) => persona === "all" || item.key === persona);
  }, [factor, persona]);

  const totalLearners = scale(2240, factor);
  const activePrograms = Math.max(1, scale(42, factor));
  const enrollments = scale(15780, factor);
  const completionRate = Math.min(96, 70 + Math.round(factor * 4));
  const engagementRate = Math.min(100, 62 + Math.round(factor * 8));
  const grossRevenue = scale(184000, factor);
  const matchedRevenue = scale(168000, factor);
  const supportTickets = scale(62, factor);
  const supportAverage = scale(48, factor);
  const supportAboveThreshold = supportTickets > Math.round(supportAverage * 1.2);
  const unresolved = reconciliations.filter((item) => item.status !== "matched" && item.status !== "resolved");
  const blockedRevenue = unresolved.reduce((sum, item) => sum + Math.abs(item.expected - item.captured), 0);
  const supportResolutionRate = Math.max(84, 91 - unresolved.length * 2);
  const uptime = period === "12m" ? "99.92%" : period === "qtd" ? "99.95%" : "99.97%";

  const refreshRollup = () => {
    setLastRefresh(new Date().toISOString());
    toast({ title: "Analytics rollup refreshed", description: `The ${PERIOD_LABEL[period]} snapshot was recalculated from aggregated data.` });
  };

  const exportSnapshot = (scope: string, format: string) => {
    setExports((current) => [{ id: `e-${Date.now()}`, scope, format, period, timestamp: new Date().toISOString() }, ...current].slice(0, 6));
    toast({ title: "Export queued", description: `${scope} exported as ${format} for the ${PERIOD_LABEL[period]}.` });
  };

  const flagCourse = (title: string) => toast({ title: "Curriculum review flagged", description: `${title} has been added to the review queue.` });
  const resolveRecon = (id: string) => {
    setReconciliations((current) => current.map((item) => (item.id === id ? { ...item, status: "resolved" } : item)));
    toast({ title: "Reconciliation resolved", description: "The revenue line is now eligible for release." });
  };
  const acknowledgeAlert = (id: string) => {
    setAlerts((current) => current.map((item) => (item.id === id ? { ...item, status: "resolved" } : item)));
    toast({ title: "Support alert acknowledged", description: `Alert ${id} moved to resolved.` });
  };
  const resolveIncident = (id: string) => {
    setIncidents((current) => current.map((item) => (item.id === id ? { ...item, status: "resolved" } : item)));
    toast({ title: "Incident closed", description: `Incident ${id} marked resolved.` });
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-xl">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.3fr_0.7fr] lg:p-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              <ShieldCheck className="h-4 w-4 text-[#ff6b4d]" />
              Aggregated only analytics
            </div>
            <div className="space-y-3">
              <h1 className="text-[30px] font-semibold leading-[38px] lg:text-[36px] lg:leading-[44px]">Platform Analytics & Performance Insights</h1>
              <p className="max-w-3xl text-sm leading-6 text-white/75">
                Stage 4 school-manager analytics for academy growth, engagement, revenue, and operations oversight. This panel intentionally stays at the aggregated level and does not expose learner-level drill-downs.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select value={period} onValueChange={(value) => setPeriod(value as Period)}>
                <SelectTrigger className="w-[200px] border-white/15 bg-white/10 text-white">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {PERIODS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={refreshRollup} variant="outline" className="border-white/15 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh rollup
              </Button>
              <Button onClick={() => exportSnapshot("Executive dashboard", "PDF deck")} className="bg-[#ff6b4d] text-white hover:bg-[#e56045]">
                <Download className="mr-2 h-4 w-4" />
                Export snapshot
              </Button>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">Window</p>
                <p className="text-sm font-semibold">{PERIOD_LABEL[period]}</p>
              </div>
              <Clock3 className="h-5 w-5 text-white/70" />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">Last refresh</p>
                <p className="text-sm font-semibold">{fmtTime(lastRefresh)}</p>
              </div>
              <Eye className="h-5 w-5 text-white/70" />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">Finance dependency</p>
                <p className="text-sm font-semibold">{unresolved.length ? "Release blocked" : "Release clear"}</p>
              </div>
              <Sparkles className="h-5 w-5 text-[#ff6b4d]" />
            </div>
          </div>
        </div>
      </section>

      <Card className="border-slate-200 bg-white/90 shadow-sm">
        <CardContent className="flex flex-col gap-3 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">Governance note</p>
            <p className="text-sm text-slate-600">
              All metrics are aggregated. Reconciliation gates remain active before financial release, and support spikes are flagged against the 30-day average.
            </p>
          </div>
          <Badge className="w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">Aggregated metrics only</Badge>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total learners" value={fmtNum(totalLearners)} helper="Consolidated learner accounts in the selected window" icon={<Users className="h-5 w-5" />} />
        <MetricCard title="Active programs" value={fmtNum(activePrograms)} helper="Published academy offerings with measurable demand" icon={<BookOpen className="h-5 w-5" />} />
        <MetricCard title="Enrollment volume" value={fmtNum(enrollments)} helper="Period-filtered enrollments across all programs" icon={<TrendingUp className="h-5 w-5" />} />
        <MetricCard
          title="Completion rate"
          value={`${completionRate}%`}
          helper="Aggregated progress across enrolled cohorts"
          icon={<Target className="h-5 w-5" />}
          accent={completionRate < 68 ? "text-amber-700" : "text-emerald-700"}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Engagement rate" value={`${engagementRate}%`} helper="Active session and content interaction signal" icon={<BarChart3 className="h-5 w-5" />} />
        <MetricCard title="Gross revenue" value={fmtMoney(grossRevenue)} helper="Direct, sponsor, and partner revenue combined" icon={<ArrowUpRight className="h-5 w-5" />} />
        <MetricCard title="Matched revenue" value={fmtMoney(matchedRevenue)} helper="Officially reconciled amounts only" icon={<CheckCircle2 className="h-5 w-5" />} />
        <MetricCard
          title="Support tickets"
          value={fmtNum(supportTickets)}
          helper={supportAboveThreshold ? "Above alert threshold" : "Within normal range"}
          icon={supportAboveThreshold ? <TriangleAlert className="h-5 w-5" /> : <Gauge className="h-5 w-5" />}
          accent={supportAboveThreshold ? "text-rose-700" : "text-emerald-700"}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-2 md:grid-cols-5">
          <TabsTrigger value="overview">Executive overview</TabsTrigger>
          <TabsTrigger value="courses">Course performance</TabsTrigger>
          <TabsTrigger value="activity">User activity</TabsTrigger>
          <TabsTrigger value="finance">Financial insights</TabsTrigger>
          <TabsTrigger value="operations">Operations health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="border-slate-200 bg-white/90 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-slate-900">Executive rollup dashboard</CardTitle>
                <CardDescription>Aggregated signals only for the selected reporting window.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Completion momentum</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{completionRate}%</p>
                    <p className="mt-1 text-sm text-slate-600">Cohort-wide average, not learner-level progress.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Revenue coverage</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{fmtMoney(matchedRevenue)}</p>
                    <p className="mt-1 text-sm text-slate-600">Only reconciled revenue can advance to release.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Support pressure</p>
                    <p className={cn("mt-2 text-2xl font-semibold", supportAboveThreshold ? "text-rose-700" : "text-emerald-700")}>{fmtNum(supportTickets)}</p>
                    <p className="mt-1 text-sm text-slate-600">Alerted against the 30-day baseline.</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Period filtered trend line</p>
                      <p className="text-sm text-slate-600">Every chart and card responds to the current reporting window.</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => exportSnapshot("Executive rollup", "PNG + CSV")}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                  <div className="mt-5 space-y-4">
                    {[
                      { label: "Enrollments", value: enrollments, max: 17000 },
                      { label: "Engagement", value: engagementRate, max: 100 },
                      { label: "Revenue match", value: Math.round((matchedRevenue / Math.max(grossRevenue, 1)) * 100), max: 100 },
                    ].map((row) => (
                      <div key={row.label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">{row.label}</span>
                          <span className="text-slate-500">{row.label === "Revenue match" ? `${row.value}%` : fmtNum(row.value)}</span>
                        </div>
                        <Progress value={(row.value / row.max) * 100} className="[&>div]:bg-slate-900" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white/90 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-slate-900">Governance snapshot</CardTitle>
                <CardDescription>Cross-functional health cues for leaders.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Operational status</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{uptime}</p>
                  <p className="mt-1 text-sm text-slate-600">Platform availability averaged across core services.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Reporting mode</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">Aggregated only</p>
                  <p className="mt-1 text-sm text-slate-600">No learner-level drill-downs, exports, or identifiers.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Finance dependency</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{unresolved.length ? "Release gated by reconciliation" : "Release clear for finance"}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {unresolved.length ? "Pending finance sign-off blocks payout release and partner settlement." : "All revenue lines are fully matched and ready for release."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card className="border-slate-200 bg-white/90 shadow-sm">
            <CardHeader className="gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CardTitle className="text-lg text-slate-900">Course performance board</CardTitle>
                <CardDescription>Search, compare, and flag underperforming courses using rollup data only.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => exportSnapshot("Course performance board", "CSV")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export board
                </Button>
                <Button onClick={() => flagCourse(selectedCourse.title)}>
                  <TriangleAlert className="mr-2 h-4 w-4" />
                  Flag selected course
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative w-full max-w-sm">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search course, owner, category, or topic" className="pl-9" />
                  </div>
                  <Badge className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    {filteredCourses.length} results in {PERIOD_LABEL[period]}
                  </Badge>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead className="text-right">Enrollments</TableHead>
                        <TableHead className="text-right">Completion</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">Health</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.map((course) => (
                        <TableRow key={course.id} className={cn("cursor-pointer", course.id === selectedCourseId && "bg-slate-50")} onClick={() => setSelectedCourseId(course.id)}>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium text-slate-900">{course.title}</p>
                              <p className="text-xs text-slate-500">
                                {course.category} · {course.topic}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-600">{course.owner}</TableCell>
                          <TableCell className="text-right font-medium">{fmtNum(course.enrollments)}</TableCell>
                          <TableCell className="text-right">{course.completion}%</TableCell>
                          <TableCell className="text-right font-medium">{fmtMoney(course.revenue)}</TableCell>
                          <TableCell className="text-right">
                            <StatusBadge status={course.status === "needs-review" ? "critical" : course.status === "steady" ? "normal" : "resolved"}>{course.status.replace("-", " ")}</StatusBadge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <Card className="border-slate-200 bg-slate-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-slate-900">{selectedCourse.title}</CardTitle>
                  <CardDescription>
                    {selectedCourse.owner} · {selectedCourse.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Completion</span>
                      <span className="font-semibold text-slate-900">{selectedCourse.completion}%</span>
                    </div>
                    <Progress value={selectedCourse.completion} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Enrollments</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{fmtNum(selectedCourse.enrollments)}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Revenue</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{fmtMoney(selectedCourse.revenue)}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Duration</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{selectedCourse.minutes} min</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Rating</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{selectedCourse.rating}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    Governance cue: use this board to identify courses needing review. Any export remains aggregated and period-bound.
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="border-slate-200 bg-white/90 shadow-sm">
            <CardHeader className="gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CardTitle className="text-lg text-slate-900">User activity hub</CardTitle>
                <CardDescription>Aggregate behavior by persona without exposing individual identities.</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all" as const, label: "All" },
                  { key: "learner" as const, label: "Learners" },
                  { key: "instructor" as const, label: "Instructors" },
                  { key: "institution" as const, label: "Institutions" },
                ].map((entry) => (
                  <Button key={entry.key} variant={persona === entry.key ? "default" : "outline"} size="sm" onClick={() => setPersona(entry.key)}>
                    {entry.label}
                  </Button>
                ))}
                <Button variant="outline" size="sm" onClick={() => exportSnapshot("User activity hub", "CSV")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export activity
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {activity.map((item) => (
                  <Card key={item.label} className="border-slate-200 bg-slate-50">
                    <CardContent className="space-y-2 p-4">
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>{item.label}</span>
                        <span className="font-semibold text-emerald-700">{item.delta}</span>
                      </div>
                      <div className="text-3xl font-semibold text-slate-900">{fmtNum(item.value)}</div>
                      <p className="text-sm text-slate-600">{item.helper}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
                <Card className="border-slate-200 bg-slate-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-slate-900">Persona mix</CardTitle>
                    <CardDescription>Filtered slice for the selected business audience.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {personaCards.map((entry) => (
                      <div key={entry.key} className="rounded-2xl border border-slate-200 bg-white p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">{entry.label}</span>
                          <span className="font-semibold text-slate-900">{fmtNum(entry.value)}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{entry.helper}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-slate-200 bg-slate-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-slate-900">Activity governance cues</CardTitle>
                    <CardDescription>Signals leaders can act on without requesting sensitive user records.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Search demand</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">{fmtNum(scale(1080, factor))}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Forum interactions</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">{fmtNum(scale(268, factor))}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Certificate checks</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">{fmtNum(scale(68, factor))}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-6">
          <Card className="border-slate-200 bg-white/90 shadow-sm">
            <CardHeader className="gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CardTitle className="text-lg text-slate-900">Financial insights view</CardTitle>
                <CardDescription>Revenue, settlement, and reconciliation status for admins and finance leads.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => exportSnapshot("Financial insights", "XLSX")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export finance
                </Button>
                <Button variant={unresolved.length ? "default" : "outline"} onClick={refreshRollup}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Recompute snapshot
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {unresolved.length ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
                  Financial reconciliation dependency messaging: {unresolved.length} settlement line(s) are still open, so payout release remains blocked until finance resolves the mismatch.
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                  All revenue lines are reconciled and eligible for release.
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-3">
                <MetricCard title="Gross revenue" value={fmtMoney(grossRevenue)} helper="Aggregated across learner, sponsor, and partner streams" icon={<ArrowUpRight className="h-5 w-5" />} />
                <MetricCard title="Matched revenue" value={fmtMoney(matchedRevenue)} helper="Only finance-approved lines are shown here" icon={<CheckCircle2 className="h-5 w-5" />} />
                <MetricCard title="Blocked amount" value={fmtMoney(blockedRevenue)} helper="Pending reconciliation prevents release" icon={<TriangleAlert className="h-5 w-5" />} />
              </div>

              <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                <Card className="border-slate-200 bg-slate-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-slate-900">Revenue mix</CardTitle>
                    <CardDescription>Period-filtered source mix used in the executive export.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {revenueSources.map((item) => (
                      <div key={item.source} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">{item.source}</span>
                          <span className="text-slate-500">{item.share}%</span>
                        </div>
                        <Progress value={item.share} />
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{fmtMoney(item.amount)}</span>
                          <span>Aggregated source line</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-slate-200 bg-slate-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-slate-900">Reconciliation queue</CardTitle>
                    <CardDescription>Resolve mismatches before funds can move to release.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {reconciliations.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-1">
                            <p className="font-medium text-slate-900">{item.program}</p>
                            <p className="text-sm text-slate-600">{item.reason}</p>
                            <p className="text-xs text-slate-500">Source: {item.source}</p>
                          </div>
                          <StatusBadge status={item.status}>{item.status}</StatusBadge>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                          <span className="text-slate-600">Expected {fmtMoney(item.expected)}</span>
                          <span className="text-slate-600">Captured {fmtMoney(item.captured)}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button size="sm" onClick={() => resolveRecon(item.id)} disabled={item.status === "resolved"}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark resolved
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => exportSnapshot(`Reconciliation - ${item.program}`, "CSV")}>
                            <Download className="mr-2 h-4 w-4" />
                            Export line
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <Card className="border-slate-200 bg-white/90 shadow-sm">
            <CardHeader className="gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CardTitle className="text-lg text-slate-900">Operations health report</CardTitle>
                <CardDescription>Support alerting, incident status, and service health for admin oversight.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => exportSnapshot("Operations health", "PDF")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export report
                </Button>
                <Button onClick={refreshRollup}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh health
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {supportAboveThreshold ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  Support volume alerting is active: current ticket load is above the 30-day average and should be reviewed before the next release cycle.
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                  Support volume remains within the expected operating range.
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-3">
                <MetricCard title="Platform uptime" value={uptime} helper="Core service availability averaged for the window" icon={<Clock3 className="h-5 w-5" />} />
                <MetricCard title="Support resolution" value={`${supportResolutionRate}%`} helper="Closed vs open support queue health" icon={<Gauge className="h-5 w-5" />} />
                <MetricCard
                  title="Open incidents"
                  value={fmtNum(incidents.filter((item) => item.status !== "resolved").length)}
                  helper="Monitoring and investigating items only"
                  icon={<TriangleAlert className="h-5 w-5" />}
                />
              </div>

              <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                <Card className="border-slate-200 bg-slate-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-slate-900">Support alert queue</CardTitle>
                    <CardDescription>Alerts are compared against the rolling average, not individual tickets.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {alerts.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <p className="font-medium text-slate-900">{item.title}</p>
                            <p className="text-sm text-slate-600">{item.detail}</p>
                          </div>
                          <StatusBadge status={item.status}>{item.status}</StatusBadge>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                          <span>Average {fmtNum(item.average)}</span>
                          <span>Current {fmtNum(item.current)}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button size="sm" onClick={() => acknowledgeAlert(item.id)} disabled={item.status === "resolved"}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Acknowledge
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => exportSnapshot(`Support alert - ${item.title}`, "CSV")}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-slate-200 bg-slate-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-slate-900">Incident log</CardTitle>
                    <CardDescription>Records are time-stamped and remain accessible for admin audit trails.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {incidents.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <p className="font-medium text-slate-900">{item.title}</p>
                            <p className="text-sm text-slate-600">{item.impact}</p>
                            <p className="text-xs text-slate-500">
                              {item.owner} · {fmtTime(item.timestamp)}
                            </p>
                          </div>
                          <StatusBadge status={item.status}>{item.status}</StatusBadge>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button size="sm" onClick={() => resolveIncident(item.id)} disabled={item.status === "resolved"}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark resolved
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => exportSnapshot(`Incident - ${item.title}`, "PDF")}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-slate-200 bg-white/90 shadow-sm">
        <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">Export history</p>
            <p className="text-sm text-slate-600">Recent exports stay scoped to the current period and remain aggregated for governance review.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {exports.slice(0, 3).map((entry) => (
              <Badge key={entry.id} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                {entry.scope} · {entry.format} · {PERIOD_LABEL[entry.period]}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-slate-50 shadow-sm">
        <CardContent className="p-5">
          <p className="text-sm font-semibold text-slate-900">Stage 4 alignment</p>
          <p className="mt-2 text-sm text-slate-600">
            This panel covers the Stage 4 platform analytics and performance insights spec with executive overview, course performance, user activity, financial insights, and operations health workflows.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
