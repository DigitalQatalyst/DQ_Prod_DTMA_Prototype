import { AlertTriangle, Banknote, BookOpen, ChevronRight, GraduationCap, Info, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type SMSTab = 'overview' | 'courses' | 'students' | 'finance' | 'partners';

// ── Mock snapshot data ────────────────────────────────────────────────────────

const snapshot = {
  enrolledStudents:   2840,
  activeStudents:     1488,
  paidStudents:       1210,
  unpaidStudents:     278,
  atRiskStudents:     1,
  pendingApprovals:   3,
  revenueThisMonth:   58400,
  revenueLastMonth:   52100,
  coursesRunning:     4,
  avgCompletionRate:  69,
};

const flags: { id: string; label: string; destination: SMSTab; destinationLabel: string; severity: "warning" | "critical" }[] = [
  { id: "f1", label: "Certificate name correction pending — Amina Osei",  destination: "students", destinationLabel: "Students",             severity: "warning" },
  { id: "f2", label: "2 students with overdue payments",                   destination: "finance",  destinationLabel: "Finance & Billing",    severity: "warning" },
  { id: "f3", label: "Sofia Reyes hasn't been active in 16 days",         destination: "courses",  destinationLabel: "Courses & Faculty",    severity: "warning" },
  { id: "f4", label: "KNQA course registration expiring in 14 days",      destination: "partners", destinationLabel: "Partners & Compliance", severity: "warning" },
];

const topCourses = [
  { title: "Digital Transformation Fundamentals", enrolled: 342, completion: 72, revenue: 85500 },
  { title: "AI & Automation in the Workplace",    enrolled: 219, completion: 65, revenue: 54750 },
  { title: "Agile Project Management",            enrolled: 187, completion: 58, revenue: 46750 },
];

function severityClass(s: "warning" | "critical") {
  return s === "critical"
    ? "border-rose-200 bg-rose-50 text-rose-700"
    : "border-amber-200 bg-amber-50 text-amber-800";
}

const Tip = ({ text }: { text: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="inline h-3.5 w-3.5 text-slate-400 cursor-default ml-1 shrink-0" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[220px] text-xs">{text}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// ── Component ─────────────────────────────────────────────────────────────────

export default function SMSOverviewPanel({ onNavigate }: { onNavigate: (tab: SMSTab) => void }) {
  const revenueGrowth = Math.round(((snapshot.revenueThisMonth - snapshot.revenueLastMonth) / snapshot.revenueLastMonth) * 100);
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[28px] leading-[36px] font-semibold">Academy Overview</h2>
        <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">Here's the state of your academy today.</p>
      </div>

      {/* Flags */}
      {flags.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-amber-900">
              <AlertTriangle className="h-4 w-4" />
              {flags.length} items need your attention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {flags.map((flag) => (
              <button
                key={flag.id}
                onClick={() => onNavigate(flag.destination)}
                className="w-full flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-white px-4 py-3 text-left hover:bg-amber-50/50 transition-colors cursor-pointer group"
              >
                <span className="text-sm text-slate-800">{flag.label}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge className={`border text-xs font-semibold ${severityClass(flag.severity)}`}>{flag.severity}</Badge>
                  <span className="text-xs text-slate-400 hidden sm:block">{flag.destinationLabel}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Students */}
        <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('students')}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Students</p>
                <div className="mt-2 text-3xl font-semibold text-slate-900">{snapshot.enrolledStudents.toLocaleString()}</div>
                <p className="mt-1 text-sm text-slate-500 flex items-center">
                  {snapshot.activeStudents.toLocaleString()} active this month
                  <Tip text="Students who logged in and engaged with at least one course in the last 30 days." />
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff6b4d]/10 text-[#ff6b4d]"><Users className="h-5 w-5" /></div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Paid: {snapshot.paidStudents.toLocaleString()}</span>
                <span>Unpaid: {snapshot.unpaidStudents.toLocaleString()}</span>
              </div>
              <Progress value={Math.round((snapshot.paidStudents / snapshot.enrolledStudents) * 100)} className="h-1.5" />
              <p className="text-xs text-slate-400 flex items-center">
                Payment coverage
                <Tip text="Percentage of enrolled students who have a paid or active payment plan. Unpaid students may lose access if payment is not resolved." />
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('finance')}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Revenue This Month</p>
                <div className="mt-2 text-3xl font-semibold text-slate-900">{fmt.format(snapshot.revenueThisMonth)}</div>
                <p className={`mt-1 text-sm font-medium flex items-center ${revenueGrowth >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {revenueGrowth >= 0 ? "+" : ""}{revenueGrowth}% vs last month
                  <Tip text="Percentage change in tuition collected compared to the same point last month." />
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Banknote className="h-5 w-5" /></div>
            </div>
          </CardContent>
        </Card>

        {/* Courses */}
        <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('courses')}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Courses Running</p>
                <div className="mt-2 text-3xl font-semibold text-slate-900">{snapshot.coursesRunning}</div>
                <p className="mt-1 text-sm text-slate-500 flex items-center">
                  {snapshot.avgCompletionRate}% avg completion rate
                  <Tip text="Average percentage of enrolled students who have finished all required modules and earned a certificate, across all active courses." />
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><BookOpen className="h-5 w-5" /></div>
            </div>
          </CardContent>
        </Card>

        {/* Pending approvals */}
        <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('students')}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Pending Approvals</p>
                <div className={`mt-2 text-3xl font-semibold ${snapshot.pendingApprovals > 0 ? "text-amber-700" : "text-slate-900"}`}>
                  {snapshot.pendingApprovals}
                </div>
                <p className="mt-1 text-sm text-slate-500 flex items-center">
                  Hard copies &amp; certificate actions
                  <Tip text="Items waiting for your sign-off: hard copy print orders and certificate corrections (name changes, revocations, re-issues). These block students from receiving their credentials." />
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><GraduationCap className="h-5 w-5" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top courses */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-slate-500" />
            Top Courses This Month
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topCourses.map((course) => (
            <div key={course.title} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900 text-sm">{course.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{course.enrolled} enrolled · {fmt.format(course.revenue)} revenue</p>
                </div>
                <span className="text-sm font-semibold text-slate-700 shrink-0 flex items-center">
                  {course.completion}% completed
                  <Tip text="Students who finished all required modules and earned a certificate, as a percentage of total enrolled." />
                </span>
              </div>
              <Progress value={course.completion} className="mt-2 h-1.5" />
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('courses')}>
            View all courses &amp; faculty
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
