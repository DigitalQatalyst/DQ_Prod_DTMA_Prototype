import { useState } from "react";
import { AlertTriangle, Banknote, BookOpen, Bot, ChevronRight, CreditCard, Flag, Globe, GraduationCap, Info, ShieldCheck, TrendingUp, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type SMSTab = 'overview' | 'courses' | 'faculty' | 'students' | 'finance' | 'billing' | 'partners' | 'compliance';

// ── Snapshot data (mirrors what each page shows) ──────────────────────────────

const data = {
  // Students
  totalStudents:       2840,
  activeStudents:      1488,
  inactiveStudents:    47,
  lostAccess:          2,
  // Courses
  coursesRunning:      4,
  avgCompletion:       69,
  coursesAtRisk:       2,
  // Faculty
  activeInstructors:   2,
  instructorsNeedingAction: 2,
  aiAgentsOperational: 4,
  aiAgentsAtRisk:      2,
  // Finance
  revenueThisMonth:    58400,
  revenueLastMonth:    52100,
  mrr:                 20600,
  // Billing
  lostAccessCount:     2,
  openBillingIssues:   3,
  valueAtRisk:         550,
  // Partners
  activePartners:      2,
  inactivePartners:    1,
  // Compliance
  accreditationsAtRisk: 1,
  openComplianceIssues: 1,
};

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const Tip = ({ text }: { text: string }) => (
  <TooltipProvider><Tooltip>
    <TooltipTrigger asChild><Info className="inline h-3.5 w-3.5 text-slate-400 cursor-default ml-1 shrink-0" /></TooltipTrigger>
    <TooltipContent side="top" className="max-w-[220px] text-xs">{text}</TooltipContent>
  </Tooltip></TooltipProvider>
);

const revenueGrowth = Math.round(((data.revenueThisMonth - data.revenueLastMonth) / data.revenueLastMonth) * 100);

// Flags that need attention
const flags = [
  { id: "f1", label: "2 students with payment failures",                 destination: "billing"    as SMSTab, destinationLabel: "Billing",    severity: "warning"  as const, autoEscalated: true },
  { id: "f2", label: "KNQA accreditation expiring in 14 days",           destination: "compliance" as SMSTab, destinationLabel: "Compliance", severity: "warning"  as const, action: "Escalate"      },
  { id: "f3", label: "Sofia Reyes hasn't published content in 16 days",  destination: "faculty"    as SMSTab, destinationLabel: "Faculty",    severity: "warning"  as const, action: "Send Reminder"  },
  { id: "f4", label: "Sprint AI agent degraded — 18% escalation rate",   destination: "faculty"    as SMSTab, destinationLabel: "Faculty",    severity: "critical" as const, action: "Escalate"      },
];

// Course snapshot rows
const courseSnapshot = [
  { title: "Digital Transformation Fundamentals", enrolled: 342, completion: 72, atRisk: false },
  { title: "AI & Automation in the Workplace",    enrolled: 219, completion: 65, atRisk: true  },
  { title: "Agile Project Management",            enrolled: 187, completion: 58, atRisk: true  },
  { title: "Cybersecurity Essentials",            enrolled: 154, completion: 81, atRisk: false },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function SMSOverviewPanel({ onNavigate }: { onNavigate: (tab: SMSTab) => void }) {
  const { toast } = useToast();
  const [actedFlags, setActedFlags] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-[28px] leading-[36px] font-semibold">Overview</h2>
        <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">Here's the state of your academy today.</p>
      </div>

      {/* Attention flags */}
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
              <div key={flag.id} className="w-full flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-white px-4 py-3">
                <button onClick={() => onNavigate(flag.destination)} className="flex-1 flex items-center gap-3 text-left group">
                  <span className="text-sm text-slate-800">{flag.label}</span>
                  <span className="text-xs text-slate-400 hidden sm:block shrink-0">{flag.destinationLabel}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
                </button>
                {flag.autoEscalated ? (
                  <Badge className="border border-rose-200 bg-rose-50 text-rose-700 text-xs shrink-0">Auto-Escalated</Badge>
                ) : flag.action && (
                  <Button size="sm" variant="outline" className="text-xs h-7 shrink-0"
                    disabled={actedFlags.has(flag.id)}
                    onClick={() => { setActedFlags((p) => new Set(p).add(flag.id)); toast({ title: "Done", description: `${flag.action} sent for: ${flag.label}` }); }}
                  >
                    {actedFlags.has(flag.id) ? "Done" : flag.action}
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ── KPI cards — one per page ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">Academy at a glance</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Students */}
          <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('students')}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Students</p>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">{data.totalStudents.toLocaleString()}</div>
                  <p className="mt-1 text-sm text-slate-500">{data.activeStudents.toLocaleString()} active this month</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff6b4d]/10 text-[#ff6b4d]"><Users className="h-5 w-5" /></div>
              </div>
              {data.lostAccess > 0 && <p className="mt-2 text-xs text-rose-600 font-medium">{data.lostAccess} lost access</p>}
            </CardContent>
          </Card>

          {/* Courses */}
          <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('courses')}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Courses</p>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">{data.coursesRunning}</div>
                  <p className="mt-1 text-sm text-slate-500 flex items-center">{data.avgCompletion}% avg completion <Tip text="Average completion rate across all running courses." /></p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><BookOpen className="h-5 w-5" /></div>
              </div>
              {data.coursesAtRisk > 0 && <p className="mt-2 text-xs text-amber-700 font-medium">{data.coursesAtRisk} courses at risk</p>}
            </CardContent>
          </Card>

          {/* Faculty */}
          <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('faculty')}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Faculty</p>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">{data.activeInstructors}</div>
                  <p className="mt-1 text-sm text-slate-500">{data.aiAgentsOperational} AI agents operational</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"><UserCheck className="h-5 w-5" /></div>
              </div>
              {(data.instructorsNeedingAction > 0 || data.aiAgentsAtRisk > 0) && (
                <p className="mt-2 text-xs text-amber-700 font-medium">{data.instructorsNeedingAction} instructors · {data.aiAgentsAtRisk} AI agents need attention</p>
              )}
            </CardContent>
          </Card>

          {/* Finance */}
          <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('finance')}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Finance</p>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">{fmt.format(data.revenueThisMonth)}</div>
                  <p className={`mt-1 text-sm font-medium ${revenueGrowth >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                    {revenueGrowth >= 0 ? "+" : ""}{revenueGrowth}% vs last month
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Banknote className="h-5 w-5" /></div>
              </div>
              <p className="mt-2 text-xs text-slate-500">MRR: {fmt.format(data.mrr)}</p>
            </CardContent>
          </Card>

          {/* Billing */}
          <Card className={cn("shadow-sm cursor-pointer hover:border-slate-300 transition-colors", data.openBillingIssues > 0 ? "border-rose-200 bg-rose-50/20" : "border-slate-200")} onClick={() => onNavigate('billing')}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Billing</p>
                  <div className={cn("mt-2 text-3xl font-semibold", data.openBillingIssues > 0 ? "text-rose-700" : "text-slate-900")}>{data.openBillingIssues}</div>
                  <p className="mt-1 text-sm text-slate-500">open issues</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500"><CreditCard className="h-5 w-5" /></div>
              </div>
              <p className="mt-2 text-xs text-rose-600 font-medium">{fmt.format(data.valueAtRisk)} value at risk</p>
            </CardContent>
          </Card>

          {/* Partners */}
          <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('partners')}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Partners</p>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">{data.activePartners}</div>
                  <p className="mt-1 text-sm text-slate-500">active content providers</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><Globe className="h-5 w-5" /></div>
              </div>
              {data.inactivePartners > 0 && <p className="mt-2 text-xs text-rose-600 font-medium">{data.inactivePartners} inactive</p>}
            </CardContent>
          </Card>

          {/* Compliance */}
          <Card className={cn("shadow-sm cursor-pointer hover:border-slate-300 transition-colors", data.accreditationsAtRisk > 0 ? "border-amber-200 bg-amber-50/20" : "border-slate-200")} onClick={() => onNavigate('compliance')}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Compliance</p>
                  <div className={cn("mt-2 text-3xl font-semibold", data.accreditationsAtRisk > 0 ? "text-amber-700" : "text-slate-900")}>{data.accreditationsAtRisk}</div>
                  <p className="mt-1 text-sm text-slate-500 flex items-center">accreditations at risk <Tip text="Accreditations expiring within 60 days or already expired." /></p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><ShieldCheck className="h-5 w-5" /></div>
              </div>
              {data.openComplianceIssues > 0 && <p className="mt-2 text-xs text-amber-700 font-medium">{data.openComplianceIssues} open compliance issue</p>}
            </CardContent>
          </Card>

        </div>
      </div>

      {/* ── Snapshot sections ── */}

      {/* Course Snapshot */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-slate-500" /> Course Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {courseSnapshot.map((c) => (
            <div key={c.title} className={cn("rounded-2xl border p-4", c.atRisk ? "border-amber-200 bg-amber-50/30" : "border-slate-200")}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-900 text-sm">{c.title}</p>
                    {c.atRisk && <Badge className="border border-amber-200 bg-amber-50 text-amber-700 text-xs">At risk</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{c.enrolled} enrolled</p>
                </div>
                <span className={cn("text-sm font-semibold shrink-0", c.completion < 65 ? "text-amber-700" : "text-slate-700")}>{c.completion}% completed</span>
              </div>
              <Progress value={c.completion} className="mt-2 h-1.5" />
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('courses')}>
            View all courses <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Faculty Snapshot */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-slate-500" /> Faculty Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-2 mb-1"><UserCheck className="h-4 w-4 text-slate-400" /><span className="text-xs font-medium text-slate-600">Human Instructors</span></div>
              <div className="text-2xl font-semibold text-slate-900">{data.activeInstructors} <span className="text-sm font-normal text-slate-500">active</span></div>
              {data.instructorsNeedingAction > 0 && <p className="text-xs text-amber-700 mt-1">{data.instructorsNeedingAction} need attention</p>}
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-2 mb-1"><Bot className="h-4 w-4 text-slate-400" /><span className="text-xs font-medium text-slate-600">AI Agents</span></div>
              <div className="text-2xl font-semibold text-slate-900">{data.aiAgentsOperational} <span className="text-sm font-normal text-slate-500">operational</span></div>
              {data.aiAgentsAtRisk > 0 && <p className="text-xs text-rose-600 mt-1">{data.aiAgentsAtRisk} degraded / paused</p>}
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('faculty')}>
            View faculty <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Billing Snapshot */}
      <Card className={cn("shadow-sm", data.openBillingIssues > 0 ? "border-rose-200" : "border-slate-200")}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-slate-500" /> Billing Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className={cn("rounded-2xl border p-4", data.lostAccessCount > 0 ? "border-rose-200 bg-rose-50/30" : "border-slate-100 bg-slate-50")}>
              <p className="text-xs font-medium text-slate-600 mb-1">Lost Access</p>
              <div className={cn("text-2xl font-semibold", data.lostAccessCount > 0 ? "text-rose-700" : "text-slate-900")}>{data.lostAccessCount}</div>
              <p className="text-xs text-slate-500 mt-1">Failed payment or expired</p>
            </div>
            <div className={cn("rounded-2xl border p-4", data.openBillingIssues > 0 ? "border-amber-200 bg-amber-50/30" : "border-slate-100 bg-slate-50")}>
              <p className="text-xs font-medium text-slate-600 mb-1">Open Issues</p>
              <div className={cn("text-2xl font-semibold", data.openBillingIssues > 0 ? "text-amber-700" : "text-slate-900")}>{data.openBillingIssues}</div>
              <p className="text-xs text-slate-500 mt-1">{fmt.format(data.valueAtRisk)} value at risk</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('billing')}>
            View billing <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Compliance Snapshot */}
      <Card className={cn("shadow-sm", data.accreditationsAtRisk > 0 ? "border-amber-200" : "border-slate-200")}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-slate-500" /> Compliance Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.accreditationsAtRisk > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-3 text-sm text-amber-800">
              <span className="font-semibold">KNQA accreditation</span> expires in 14 days — Agile Project Management course affected.
            </div>
          )}
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-700">{data.openComplianceIssues} open compliance issue</span>
            </div>
            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => onNavigate('compliance')}>
              Review <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('compliance')}>
            View compliance <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
