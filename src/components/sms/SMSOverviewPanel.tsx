import { Activity, AlertTriangle, Banknote, BookOpen, CheckCircle2, ChevronRight, Clock, GraduationCap, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SMSTab = 'overview' | 'courses' | 'students' | 'finance' | 'partners';

// ── Mock snapshot data ────────────────────────────────────────────────────────
const snapshot = {
  enrolledStudents: 2840,
  activeStudents: 1488,
  paidStudents: 1210,
  unpaidStudents: 278,
  revenueThisMonth: 86450,
  revenueLastMonth: 74200,
  openCertificateExceptions: 3,
  openSupportTickets: 12,
  overdueTickets: 2,
  pendingPayouts: 4,
  coursesOffered: 12,
  coursesNeedingReview: 1,
};

const flags: { id: string; label: string; destination: SMSTab; destinationLabel: string; severity: "warning" | "critical" }[] = [
  { id: "f1", label: "Certificate name correction pending",       destination: "students", destinationLabel: "Students", severity: "warning"  },
  { id: "f2", label: "Billing dispute open — Corporate Learning Buyer", destination: "finance",  destinationLabel: "Finance & Billing",       severity: "warning"  },
  { id: "f3", label: "Support ticket overdue by 6h — TK-141",    destination: "finance",  destinationLabel: "Finance & Billing",       severity: "critical" },
  { id: "f4", label: "Instructor payout needs review — Maya Patel", destination: "finance", destinationLabel: "Finance & Billing",      severity: "warning"  },
  { id: "f5", label: "KNQA course registration expiring in 14 days", destination: "partners", destinationLabel: "Partners & Compliance", severity: "warning" },
];

const topCourses = [
  { title: "Digital Transformation Fundamentals", enrolled: 342, completion: 72, revenue: 85500 },
  { title: "AI & Automation in the Workplace", enrolled: 219, completion: 65, revenue: 54750 },
  { title: "Agile Project Management", enrolled: 187, completion: 58, revenue: 46750 },
];

function severityClass(s: "warning" | "critical") {
  return s === "critical"
    ? "border-rose-200 bg-rose-50 text-rose-700"
    : "border-amber-200 bg-amber-50 text-amber-800";
}

export default function SMSOverviewPanel({ onNavigate }: { onNavigate: (tab: SMSTab) => void }) {
  const revenueGrowth = Math.round(((snapshot.revenueThisMonth - snapshot.revenueLastMonth) / snapshot.revenueLastMonth) * 100);
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Good morning</h2>
        <p className="text-sm text-slate-500 mt-1">Here's the state of your academy today.</p>
      </div>

      {/* Flags needing attention */}
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
                  <Badge className={`border text-xs font-semibold ${severityClass(flag.severity)}`}>
                    {flag.severity}
                  </Badge>
                  <span className="text-xs text-slate-400 hidden sm:block">{flag.destinationLabel}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('students')}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Enrolled Students</p>
                <div className="mt-2 text-3xl font-semibold text-slate-900">{snapshot.enrolledStudents.toLocaleString()}</div>
                <p className="mt-1 text-sm text-slate-500">{snapshot.activeStudents.toLocaleString()} active</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><Users className="h-5 w-5" /></div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Paid: {snapshot.paidStudents.toLocaleString()}</span>
                <span>Unpaid: {snapshot.unpaidStudents.toLocaleString()}</span>
              </div>
              <Progress value={Math.round((snapshot.paidStudents / snapshot.enrolledStudents) * 100)} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

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

        <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('courses')}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Courses Offered</p>
                <div className="mt-2 text-3xl font-semibold text-slate-900">{snapshot.coursesOffered}</div>
                <p className="mt-1 text-sm text-slate-500">{snapshot.coursesNeedingReview} needs review</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"><BookOpen className="h-5 w-5" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('students')}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Certificate Exceptions</p>
                <div className="mt-2 text-3xl font-semibold text-slate-900">{snapshot.openCertificateExceptions}</div>
                <p className="mt-1 text-sm text-slate-500">Corrections or re-issues pending</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><GraduationCap className="h-5 w-5" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two-column: top courses + quick status */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
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
                    <p className="text-xs text-slate-500 mt-0.5">{course.enrolled} enrolled · {fmt.format(course.revenue)}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 shrink-0">{course.completion}%</span>
                </div>
                <Progress value={course.completion} className="mt-2 h-1.5" />
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('courses')}>
              View all courses
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4 text-slate-500" />Support</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Open tickets</span>
                <span className="font-semibold text-slate-900">{snapshot.openSupportTickets}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Overdue</span>
                <span className={`font-semibold ${snapshot.overdueTickets > 0 ? "text-rose-600" : "text-emerald-600"}`}>{snapshot.overdueTickets}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('finance')}>
                View support tickets
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Activity className="h-4 w-4 text-slate-500" />Finance Queue</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Pending payouts</span>
                <span className="font-semibold text-slate-900">{snapshot.pendingPayouts}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('finance')}>
                Review payouts
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-slate-500" />Platform</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Uptime</span>
                <span className="font-semibold text-emerald-600">99.96%</span>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('partners')}>
                View system status
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
