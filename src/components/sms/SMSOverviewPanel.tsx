import { useState } from "react";
import { AlertTriangle, Banknote, BookOpen, ChevronRight, GraduationCap, Info, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type SMSTab = 'overview' | 'courses' | 'students' | 'finance' | 'partners';

// ── Mock snapshot data ────────────────────────────────────────────────────────

const snapshot = {
  enrolledStudents:   2840,
  activeStudents:     1488,
  activeAccess:       1210,
  accessIssues:       278,
  atRiskStudents:     1,
  revenueThisMonth:   58400,
  revenueLastMonth:   52100,
  mrr:                20600,
  coursesRunning:     4,
  avgCompletionRate:  69,
  failedRenewals:     7,
  openComplianceIssues: 1,
};

const flags: { id: string; label: string; destination: SMSTab; destinationLabel: string; severity: "warning" | "critical"; action?: string }[] = [
  { id: "f2", label: "2 students with payment failures",                   destination: "finance",  destinationLabel: "Finance & Billing",    severity: "warning",  action: "Escalate to Finance" },
  { id: "f3", label: "KNQA accreditation expiring in 14 days",            destination: "partners", destinationLabel: "Partners & Compliance", severity: "warning",  action: "Escalate"         },
  { id: "f4", label: "James Okafor has 3 unanswered student questions",   destination: "courses",  destinationLabel: "Courses & Faculty",    severity: "warning",  action: "Send Reminder"    },
  { id: "f5", label: "Sofia Reyes hasn't been active in 16 days",         destination: "courses",  destinationLabel: "Courses & Faculty",    severity: "warning"                              },
];

const topCourses = [
  { title: "Digital Transformation Fundamentals", enrolled: 342, completion: 72, revenue: 85500, status: "top" as const },
  { title: "AI & Automation in the Workplace",    enrolled: 219, completion: 65, revenue: 54750, status: "top" as const },
  { title: "Agile Project Management",            enrolled: 187, completion: 58, revenue: 46750, status: "at-risk" as const },
  { title: "Cybersecurity Essentials",            enrolled: 154, completion: 81, revenue: 38500, status: "top" as const },
];

function severityClass(_s: "warning" | "critical") { return ""; } // kept for type safety

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
  const { toast } = useToast();
  const [actedFlags, setActedFlags] = useState<Set<string>>(new Set());
  const revenueGrowth = Math.round(((snapshot.revenueThisMonth - snapshot.revenueLastMonth) / snapshot.revenueLastMonth) * 100);
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const totalAlerts = snapshot.failedRenewals + snapshot.openComplianceIssues;

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
              <div
                key={flag.id}
                className="w-full flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-white px-4 py-3"
              >
                <button
                  onClick={() => onNavigate(flag.destination)}
                  className="flex-1 flex items-center gap-3 text-left group"
                >
                  <span className="text-sm text-slate-800">{flag.label}</span>
                  <span className="text-xs text-slate-400 hidden sm:block shrink-0">{flag.destinationLabel}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
                </button>
                {flag.action && (
                  <Button
                    size="sm" variant="outline" className="text-xs h-7 shrink-0"
                    disabled={actedFlags.has(flag.id)}
                    onClick={() => {
                      setActedFlags((prev) => new Set(prev).add(flag.id));
                      toast({ title: "Done", description: `${flag.action} action taken for: ${flag.label}` });
                    }}
                  >
                    {actedFlags.has(flag.id) ? "Done" : flag.action}
                  </Button>
                )}
              </div>
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
                <span>Active access: {snapshot.activeAccess.toLocaleString()}</span>
                <span>Access issues: {snapshot.accessIssues.toLocaleString()}</span>
              </div>
              <Progress value={Math.round((snapshot.activeAccess / snapshot.enrolledStudents) * 100)} className="h-1.5" />
              <p className="text-xs text-slate-400 flex items-center">
                Access status
                <Tip text="Percentage of enrolled students with active access. Students with failed payments or expired subscriptions may have their access revoked." />
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
                <p className={`mt-1 text-sm font-medium ${revenueGrowth >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {revenueGrowth >= 0 ? "+" : ""}{revenueGrowth}% vs last month
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
                  <Tip text="Average percentage of enrolled students who have finished all required modules across all active courses." />
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><BookOpen className="h-5 w-5" /></div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('students')}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Alerts</p>
                <div className={`mt-2 text-3xl font-semibold ${totalAlerts > 0 ? "text-rose-700" : "text-slate-900"}`}>
                  {totalAlerts}
                </div>
                <p className="mt-1 text-sm text-slate-500 flex items-center">
                  {snapshot.failedRenewals} failed renewals · {snapshot.openComplianceIssues} compliance issues
                  <Tip text="Combined count of failed subscription renewals and open compliance issues across the portal." />
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500"><GraduationCap className="h-5 w-5" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Snapshot */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-slate-500" />
            Course Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topCourses.map((course) => (
            <div key={course.title} className={cn(
              "rounded-2xl border p-4",
              course.status === "at-risk" ? "border-amber-200 bg-amber-50/30" : "border-slate-200"
            )}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-900 text-sm">{course.title}</p>
                    {course.status === "at-risk" && (
                      <Badge className="border border-amber-200 bg-amber-50 text-amber-700 text-xs">At risk</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{course.enrolled} enrolled · {fmt.format(course.revenue)} revenue</p>
                </div>
                <span className={cn("text-sm font-semibold shrink-0", course.completion < 65 ? "text-amber-700" : "text-slate-700")}>
                  {course.completion}% completed
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
