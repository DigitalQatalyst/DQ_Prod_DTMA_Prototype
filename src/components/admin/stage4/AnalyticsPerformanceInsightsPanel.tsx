import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Banknote,
  BarChart2,
  BookOpen,
  CircleAlert,
  Clock,
  Download,
  Gauge,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  GraduationCap,
  Layers,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Period = "7d" | "30d" | "90d" | "365d";

type FunnelStep = { label: string; value: number; helper: string };
type CoursePerformance = {
  id: string;
  title: string;
  owner: string;
  enrollments: number;
  activeHours: number;
  completionRate: number;
  avgQuizScore: number;
  rating: number;
  revenue: number;
  dropOffPoint: string;
};
type RevenueBreakdown = {
  id: string;
  program: string;
  directRevenue: number;
  sponsorRevenue: number;
  partnerShare: number;
  discountLift: number;
  payoutExposure: number;
};
type ActivitySignal = {
  id: string;
  title: string;
  value: string;
  helper: string;
  status: "healthy" | "watch" | "risk";
};
type TrendTopic = { topic: string; source: string; signal: string };
type Segment = { name: string; learners: number; share: number };
type Incident = {
  id: string;
  title: string;
  severity: "info" | "watch" | "critical";
  impact: string;
  updatedAt: string;
};

type FacultyPerformance = {
  name: string;
  rating: number;
  students: number;
  courses: number;
};

type CategoryPerformance = {
  name: string;
  enrollments: number;
  revenue: number;
  growth: string;
};

const periodProfiles: Record<
  Period,
  {
    signUps: number;
    activeUsers: number;
    conversionRate: number;
    revenue: number;
    supportTickets: number;
    avgTicketBaseline: number;
    uptime: number;
    avgCompletionDays: number;
  }
> = {
  "7d": { signUps: 46, activeUsers: 612, conversionRate: 6.4, revenue: 18400, supportTickets: 34, avgTicketBaseline: 27, uptime: 99.96, avgCompletionDays: 11 },
  "30d": { signUps: 182, activeUsers: 1488, conversionRate: 7.2, revenue: 86450, supportTickets: 128, avgTicketBaseline: 104, uptime: 99.92, avgCompletionDays: 13 },
  "90d": { signUps: 504, activeUsers: 3240, conversionRate: 7.8, revenue: 248300, supportTickets: 336, avgTicketBaseline: 292, uptime: 99.89, avgCompletionDays: 14 },
  "365d": { signUps: 2180, activeUsers: 12480, conversionRate: 8.1, revenue: 1084200, supportTickets: 1422, avgTicketBaseline: 1310, uptime: 99.87, avgCompletionDays: 16 },
};

const funnelByPeriod: Record<Period, FunnelStep[]> = {
  "7d": [
    { label: "Visitors", value: 1420, helper: "From Stage 0 discovery pages" },
    { label: "Applications", value: 362, helper: "Started the onboarding flow" },
    { label: "Qualified Leads", value: 168, helper: "Reached admissions checks" },
    { label: "Enrolled Learners", value: 91, helper: "Converted into paid learning" },
  ],
  "30d": [
    { label: "Visitors", value: 6120, helper: "From Stage 0 discovery pages" },
    { label: "Applications", value: 1412, helper: "Started the onboarding flow" },
    { label: "Qualified Leads", value: 602, helper: "Reached admissions checks" },
    { label: "Enrolled Learners", value: 294, helper: "Converted into paid learning" },
  ],
  "90d": [
    { label: "Visitors", value: 18120, helper: "From Stage 0 discovery pages" },
    { label: "Applications", value: 4360, helper: "Started the onboarding flow" },
    { label: "Qualified Leads", value: 1910, helper: "Reached admissions checks" },
    { label: "Enrolled Learners", value: 820, helper: "Converted into paid learning" },
  ],
  "365d": [
    { label: "Visitors", value: 72400, helper: "From Stage 0 discovery pages" },
    { label: "Applications", value: 16820, helper: "Started the onboarding flow" },
    { label: "Qualified Leads", value: 7420, helper: "Reached admissions checks" },
    { label: "Enrolled Learners", value: 3160, helper: "Converted into paid learning" },
  ],
};

const coursePerformance: CoursePerformance[] = [
  { id: "CP-01", title: "Digital Transformation Fundamentals", owner: "Aisha Mensah", enrollments: 342, activeHours: 614, completionRate: 72, avgQuizScore: 81, rating: 4.8, revenue: 85500, dropOffPoint: "Module 4 case-study submission" },
  { id: "CP-02", title: "AI & Automation in the Workplace", owner: "James Okafor", enrollments: 219, activeHours: 506, completionRate: 65, avgQuizScore: 76, rating: 4.6, revenue: 54750, dropOffPoint: "Simulation lab onboarding" },
  { id: "CP-03", title: "Agile Project Management", owner: "Sofia Reyes", enrollments: 187, activeHours: 330, completionRate: 58, avgQuizScore: 71, rating: 4.5, revenue: 46750, dropOffPoint: "Sprint retrospective assignment" },
  { id: "CP-04", title: "Cybersecurity Essentials", owner: "Kwame Asante", enrollments: 154, activeHours: 274, completionRate: 81, avgQuizScore: 88, rating: 4.7, revenue: 38500, dropOffPoint: "Low risk; no acute blocker" },
];

const facultyPerformance: FacultyPerformance[] = [
  { name: "Aisha Mensah", rating: 4.9, students: 1240, courses: 3 },
  { name: "James Okafor", rating: 4.8, students: 980, courses: 2 },
  { name: "Sofia Reyes", rating: 4.7, students: 850, courses: 4 },
  { name: "Kwame Asante", rating: 4.7, students: 720, courses: 2 },
];

const categoryPerformance: CategoryPerformance[] = [
  { name: "Digital Strategy", enrollments: 1450, revenue: 320000, growth: "+12%" },
  { name: "Artificial Intelligence", enrollments: 980, revenue: 245000, growth: "+24%" },
  { name: "Project Management", enrollments: 760, revenue: 180000, growth: "+8%" },
  { name: "Cybersecurity", enrollments: 540, revenue: 135000, growth: "+15%" },
];

const revenueBreakdown: RevenueBreakdown[] = [
  { id: "REV-01", program: "Digital Transformation Fundamentals", directRevenue: 50400, sponsorRevenue: 29800, partnerShare: 5300, discountLift: 14, payoutExposure: 8200 },
  { id: "REV-02", program: "AI & Automation in the Workplace", directRevenue: 24100, sponsorRevenue: 32600, partnerShare: 6400, discountLift: 9, payoutExposure: 3600 },
  { id: "REV-03", program: "Leadership in the Digital Age", directRevenue: 18600, sponsorRevenue: 22400, partnerShare: 4900, discountLift: 6, payoutExposure: 5400 },
];

const activitySignals: ActivitySignal[] = [
  { id: "ACT-01", title: "Average time to complete pathway", value: "13.4 days", helper: "Down 1.6 days versus prior period", status: "healthy" },
  { id: "ACT-02", title: "Forum response velocity", value: "4.8h", helper: "Cross-program faculty replies in under one business block", status: "healthy" },
  { id: "ACT-03", title: "Assessment pass-rate volatility", value: "11.2%", helper: "AI & Automation cohort shows the widest variance", status: "watch" },
  { id: "ACT-04", title: "Course drop-off hotspot", value: "Module 4", helper: "Case-study friction is concentrated in one sequence", status: "risk" },
];

const trendTopics: TrendTopic[] = [
  { topic: "AI operating models", source: "Knowledge center search", signal: "+31% search volume" },
  { topic: "Sponsor change leadership", source: "Cohort forum", signal: "+18% discussion growth" },
  { topic: "Digital governance playbooks", source: "Program feedback", signal: "Top open-text theme" },
];

const learnerSegments: Segment[] = [
  { name: "Transformation Specialists", learners: 442, share: 34 },
  { name: "Digital Workers", learners: 386, share: 29 },
  { name: "Enterprise Sponsors", learners: 282, share: 22 },
  { name: "Leadership Cohorts", learners: 198, share: 15 },
];

const incidents: Incident[] = [
  { id: "INC-01", title: "Forum media uploads slowed in MENA region", severity: "watch", impact: "Support traffic rose 18% above the 30-day average", updatedAt: "2026-04-01T09:20:00Z" },
  { id: "INC-02", title: "Sponsor dashboard export timeout", severity: "critical", impact: "Two reporting packets delayed pending retry window", updatedAt: "2026-04-01T08:05:00Z" },
  { id: "INC-03", title: "Assessment analytics refresh completed", severity: "info", impact: "Completion funnel data aligned with latest grading state", updatedAt: "2026-04-01T07:40:00Z" },
];

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const formatMoney = (value: number) => currency.format(value);

function badgeClass(status: ActivitySignal["status"] | Incident["severity"]) {
  switch (status) {
    case "healthy":
    case "info":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "watch":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "risk":
    case "critical":
      return "border-rose-200 bg-rose-50 text-rose-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

function labelForSeverity(status: ActivitySignal["status"] | Incident["severity"]) {
  if (status === "risk") return "risk";
  if (status === "watch") return "watch";
  if (status === "critical") return "critical";
  return "healthy";
}

export default function AnalyticsPerformanceInsightsPanel() {
  const { toast } = useToast();
  const [period, setPeriod] = useState<Period>("30d");

  const profile = periodProfiles[period];
  const funnel = funnelByPeriod[period];
  const rankedCourses = useMemo(
    () =>
      [...coursePerformance].sort((left, right) => {
        const leftScore = left.enrollments * 0.45 + left.activeHours * 0.35 + left.revenue / 1000 * 0.2;
        const rightScore = right.enrollments * 0.45 + right.activeHours * 0.35 + right.revenue / 1000 * 0.2;
        return rightScore - leftScore;
      }),
    [],
  );
  const supportAlert = profile.supportTickets > profile.avgTicketBaseline * 1.2;
  const totalPayoutExposure = revenueBreakdown.reduce((sum, item) => sum + item.payoutExposure, 0);
  const totalRevenue = revenueBreakdown.reduce((sum, item) => sum + item.directRevenue + item.sponsorRevenue, 0);

  const handleExport = (report: string) => {
    toast({
      title: "Report export queued",
      description: `${report} for ${period} has been added to the reporting queue.`,
    });
  };

  const handleEscalate = (course: CoursePerformance) => {
    toast({
      title: "Content update requested",
      description: `${course.title} has been flagged for program lead intervention at ${course.dropOffPoint}.`,
    });
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e2348] via-[#24305f] to-[#0f172a] text-white shadow-xl">
        <div className="grid gap-8 px-6 py-7 lg:grid-cols-[1.6fr_0.9fr] lg:px-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              <Sparkles className="h-3.5 w-3.5" />
              Stage 4 strategic intelligence
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">Platform Analytics &amp; Performance Insights</h1>
              <p className="max-w-3xl text-sm text-white/75">
                Decision-grade oversight for academy growth, course health, revenue performance, and operational pressure points.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["7d", "30d", "90d", "365d"] as Period[]).map((option) => (
                <button
                  key={option}
                  onClick={() => setPeriod(option)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    period === option ? "border-white bg-white text-slate-950" : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Academy Revenue</p>
                <div className="mt-2 text-3xl font-semibold tracking-tight">{formatMoney(profile.revenue)}</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <BarChart2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.16em] text-white/55">Active users</div><div className="mt-2 text-2xl font-semibold">{profile.activeUsers.toLocaleString()}</div></div>
              <div className="rounded-2xl bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.16em] text-white/55">Conversion</div><div className="mt-2 text-2xl font-semibold">{profile.conversionRate}%</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Total Enrollment</p><div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{coursePerformance.reduce((acc, c) => acc + c.enrollments, 0).toLocaleString()}</div></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Users className="h-5 w-5" /></div></div></CardContent></Card>
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Active Courses</p><div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{coursePerformance.length}</div></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><BookOpen className="h-5 w-5" /></div></div></CardContent></Card>
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Avg Course Rating</p><div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">4.7</div></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><Sparkles className="h-5 w-5" /></div></div></CardContent></Card>
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Operational Health</p><div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{profile.uptime}%</div></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600"><Activity className="h-5 w-5" /></div></div></CardContent></Card>
      </div>

      <Tabs defaultValue="executive" className="space-y-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-slate-100 p-2">
            <TabsTrigger value="executive" className="rounded-xl px-4 py-2">Executive Overview</TabsTrigger>
            <TabsTrigger value="course-performance" className="rounded-xl px-4 py-2">Course & Faculty</TabsTrigger>
            <TabsTrigger value="financial" className="rounded-xl px-4 py-2">Financial Insights</TabsTrigger>
            <TabsTrigger value="operations" className="rounded-xl px-4 py-2">Operations Health</TabsTrigger>
          </TabsList>
          <Button onClick={() => handleExport("Analytics board")} className="gap-2 bg-[#1e2348] text-white hover:bg-[#24305f]">
            <Download className="h-4 w-4" />
            Export board
          </Button>
        </div>

        <TabsContent value="executive" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
            <Card className="border-slate-200/80 shadow-sm">
              <CardHeader>
                <CardTitle>Executive Overview Dashboard</CardTitle>
                <CardDescription>Growth, acquisition, and strategic signals aligned to the school manager view.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {funnel.map((step, index) => {
                    const previous = funnel[index - 1]?.value ?? step.value;
                    const conversion = previous === 0 ? 100 : Math.round((step.value / previous) * 100);
                    return (
                      <div key={step.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{step.label}</div>
                          <Badge variant="outline" className="bg-white">{conversion}% retain</Badge>
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-slate-950">{step.value.toLocaleString()}</div>
                        <p className="mt-1 text-sm text-slate-600">{step.helper}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-indigo-50/50 p-4">
                    <div className="flex items-center gap-2 font-semibold text-indigo-900 mb-3">
                      <Target className="h-4 w-4" />
                      Top Performing Category
                    </div>
                    <div className="text-2xl font-bold text-indigo-950">{categoryPerformance[0].name}</div>
                    <div className="text-sm text-indigo-700 mt-1">{categoryPerformance[0].enrollments} Enrollments · {categoryPerformance[0].growth} Growth</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-emerald-50/50 p-4">
                    <div className="flex items-center gap-2 font-semibold text-emerald-900 mb-3">
                      <GraduationCap className="h-4 w-4" />
                      Highest Rated Faculty
                    </div>
                    <div className="text-2xl font-bold text-emerald-950">{facultyPerformance[0].name}</div>
                    <div className="text-sm text-emerald-700 mt-1">{facultyPerformance[0].rating} Rating · {facultyPerformance[0].students} Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader><CardTitle>Learner segmentation</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {learnerSegments.map((segment) => (
                    <div key={segment.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm"><span className="font-medium text-slate-900">{segment.name}</span><span className="text-slate-500">{segment.learners}</span></div>
                      <Progress value={segment.share} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader><CardTitle>Trending topics</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {trendTopics.map((trend) => (
                    <div key={trend.topic} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3"><div><div className="font-medium text-slate-950">{trend.topic}</div><div className="text-xs text-slate-500">{trend.source}</div></div><Badge className="border border-slate-200 bg-white text-slate-700">{trend.signal}</Badge></div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="course-performance" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="border-slate-200/80 shadow-sm">
              <CardHeader><CardTitle>Course Performance Board</CardTitle><CardDescription>Ranking by enrollment, active hours, and revenue.</CardDescription></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Program</TableHead><TableHead>Faculty</TableHead><TableHead>Enrollment</TableHead><TableHead>Rating</TableHead><TableHead className="text-right">Revenue</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {rankedCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.owner}</TableCell>
                        <TableCell>{course.enrollments}</TableCell>
                        <TableCell><div className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-amber-500" />{course.rating}</div></TableCell>
                        <TableCell className="text-right">{formatMoney(course.revenue)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-slate-200/80 shadow-sm">
              <CardHeader><CardTitle>Faculty Spotlight</CardTitle><CardDescription>Top rated teachers by learner feedback.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {facultyPerformance.map((faculty) => (
                  <div key={faculty.name} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <div>
                      <div className="font-semibold text-slate-900">{faculty.name}</div>
                      <div className="text-xs text-slate-500">{faculty.courses} Courses · {faculty.students} Learners</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-950">{faculty.rating}</div>
                      <div className="flex gap-0.5 justify-end text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => <Sparkles key={s} className="h-3 w-3 fill-current" />)}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-200/80 shadow-sm">
              <CardHeader><CardTitle>Category Performance</CardTitle><CardDescription>Growth metrics across academy subjects.</CardDescription></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryPerformance.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-xl text-slate-600"><Layers className="h-4 w-4" /></div>
                        <div>
                          <div className="font-semibold text-slate-900">{cat.name}</div>
                          <div className="text-xs text-slate-500">{cat.enrollments} Total Enrollments</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{formatMoney(cat.revenue)}</div>
                        <div className="text-xs text-emerald-600 font-medium">{cat.growth} Growth</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-200/80 shadow-sm"><CardHeader><CardTitle>Completion Funnel Hotspots</CardTitle></CardHeader><CardContent className="space-y-3">{coursePerformance.map((course) => <div key={course.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><div><div className="font-medium text-slate-950">{course.title}</div><div className="mt-1 text-xs text-slate-500">{course.dropOffPoint}</div></div><Badge className="bg-white border-slate-200">{course.completionRate}% complete</Badge></div></div>)}</CardContent></Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div><CardTitle>Financial Insights View</CardTitle><CardDescription>Revenue summaries reconcile against the dedicated finance governance workspace.</CardDescription></div>
              <Button variant="outline" onClick={() => handleExport("Financial insights view")} className="gap-2"><Download className="h-4 w-4" />Export finance view</Button>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Recognized revenue</div><div className="mt-2 text-2xl font-semibold text-slate-950">{formatMoney(totalRevenue)}</div></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Discount impact</div><div className="mt-2 text-2xl font-semibold text-slate-950">{Math.round(revenueBreakdown.reduce((sum, item) => sum + item.discountLift, 0) / revenueBreakdown.length)}%</div></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Pending payout exposure</div><div className="mt-2 text-2xl font-semibold text-slate-950">{formatMoney(totalPayoutExposure)}</div></div>
              </div>
              <Table>
                <TableHeader><TableRow><TableHead>Program</TableHead><TableHead>Direct</TableHead><TableHead>Sponsor</TableHead><TableHead>Partner share</TableHead><TableHead>Discount lift</TableHead><TableHead>Payout exposure</TableHead></TableRow></TableHeader>
                <TableBody>{revenueBreakdown.map((row) => <TableRow key={row.id}><TableCell className="font-medium text-slate-950">{row.program}</TableCell><TableCell>{formatMoney(row.directRevenue)}</TableCell><TableCell>{formatMoney(row.sponsorRevenue)}</TableCell><TableCell>{formatMoney(row.partnerShare)}</TableCell><TableCell>{row.discountLift}% uplift</TableCell><TableCell>{formatMoney(row.payoutExposure)}</TableCell></TableRow>)}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-slate-200/80 shadow-sm">
              <CardHeader><CardTitle>Operations Health Report</CardTitle><CardDescription>Support volume, uptime visibility, and system incident context.</CardDescription></CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-700"><Activity className="h-5 w-5" /></div><div><div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Support ticket volume</div><div className="mt-1 text-2xl font-semibold text-slate-950">{profile.supportTickets}</div></div></div><p className="mt-3 text-sm text-slate-600">30-day baseline is {profile.avgTicketBaseline}. Alert threshold is crossed once volume rises above 120%.</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><Gauge className="h-5 w-5" /></div><div><div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">System uptime</div><div className="mt-1 text-2xl font-semibold text-slate-950">{profile.uptime}%</div></div></div><p className="mt-3 text-sm text-slate-600">Operational health data refreshes more frequently than revenue reporting.</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700"><Clock className="h-5 w-5" /></div><div><div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Average resolution speed</div><div className="mt-1 text-2xl font-semibold text-slate-950">11.6h</div></div></div><p className="mt-3 text-sm text-slate-600">Within SLA, but export-related incidents are driving the current variance.</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700"><ArrowUpRight className="h-5 w-5" /></div><div><div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Exportable reports</div><div className="mt-1 text-2xl font-semibold text-slate-950">5 ready</div></div></div><p className="mt-3 text-sm text-slate-600">Executive, course, finance, activity, and operations views can all be exported.</p></div>
              </CardContent>
            </Card>
            <Card className="border-slate-200/80 shadow-sm">
              <CardHeader><CardTitle>Incident watchlist</CardTitle><CardDescription>Current operational items impacting analytics confidence or support load.</CardDescription></CardHeader>
              <CardContent className="space-y-3">
                {supportAlert && <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Support ticket volume is {Math.round((profile.supportTickets / profile.avgTicketBaseline) * 100)}% of the 30-day average. This exceeds the Stage 4 alert rule.</div>}
                {incidents.map((incident) => <div key={incident.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><div><div className="font-medium text-slate-950">{incident.title}</div><div className="mt-1 text-sm text-slate-500">{incident.impact}</div><div className="mt-3 text-xs text-slate-500">Updated {new Date(incident.updatedAt).toLocaleString()}</div></div><Badge className={cn("border", badgeClass(incident.severity))}>{labelForSeverity(incident.severity)}</Badge></div></div>)}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
