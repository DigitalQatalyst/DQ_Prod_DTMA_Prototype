import { useState } from "react";
import { AlertTriangle, Banknote, BookOpen, Bot, Calendar, ChevronRight, CreditCard, Flag, Globe, Info, ShieldCheck, TrendingUp, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type SMSTab = 'overview' | 'courses' | 'faculty' | 'students' | 'finance' | 'billing' | 'partners' | 'compliance';

// ── Data ──────────────────────────────────────────────────────────────────────

const data = {
  totalStudents: 2840, activeStudents: 1488, lostAccess: 2,
  coursesRunning: 4, avgCompletion: 69, coursesAtRisk: 2,
  activeInstructors: 2, instructorsNeedingAction: 2, aiAgentsOperational: 4, aiAgentsAtRisk: 2,
  revenueThisMonth: 58400, revenueLastMonth: 52100, mrr: 20600,
  openBillingIssues: 3, valueAtRisk: 550, lostAccessCount: 2,
  activePartners: 2, inactivePartners: 1,
  accreditationsAtRisk: 1, openComplianceIssues: 1,
};

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const revenueGrowth = Math.round(((data.revenueThisMonth - data.revenueLastMonth) / data.revenueLastMonth) * 100);
const activeRate = Math.round((data.activeStudents / data.totalStudents) * 100);

// Flags — Flags own all actions; snapshots are context only
const flags = [
  { id: "f1", label: "2 students with payment failures",                destination: "billing"    as SMSTab, destinationLabel: "Billing",    autoEscalated: true },
  { id: "f2", label: "KNQA accreditation expiring in 14 days",          destination: "compliance" as SMSTab, destinationLabel: "Compliance", action: "Escalate"     },
  { id: "f3", label: "Sofia Reyes hasn't published content in 16 days", destination: "faculty"    as SMSTab, destinationLabel: "Faculty",    action: "Send Reminder" },
  { id: "f4", label: "Sprint AI agent degraded — 18% escalation rate",  destination: "faculty"    as SMSTab, destinationLabel: "Faculty",    action: "Escalate"     },
];

// Next 30 days horizon
const horizon = [
  { date: "28 Apr", label: "KNQA accreditation expires",          urgency: "critical" as const },
  { date: "10 May", label: "Kwame Asante subscription renews",    urgency: "normal"   as const },
  { date: "15 May", label: "Noah Mensah subscription renews",     urgency: "normal"   as const },
  { date: "30 May", label: "Q2 partner activity report due",      urgency: "normal"   as const },
];

// Course snapshot rows
const courseSnapshot = [
  { title: "Digital Transformation Fundamentals", enrolled: 342, completion: 72, atRisk: false },
  { title: "AI & Automation in the Workplace",    enrolled: 219, completion: 65, atRisk: true  },
  { title: "Agile Project Management",            enrolled: 187, completion: 58, atRisk: true  },
  { title: "Cybersecurity Essentials",            enrolled: 154, completion: 81, atRisk: false },
];

const Tip = ({ text }: { text: string }) => (
  <TooltipProvider><Tooltip>
    <TooltipTrigger asChild><Info className="inline h-3.5 w-3.5 text-slate-400 cursor-default ml-1 shrink-0" /></TooltipTrigger>
    <TooltipContent side="top" className="max-w-[220px] text-xs">{text}</TooltipContent>
  </Tooltip></TooltipProvider>
);

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

      {/* 1. Attention flags — actions live here only */}
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

      {/* 2. Next 30 days horizon */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-slate-700">
            <Calendar className="h-4 w-4 text-slate-400" /> Next 30 Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {horizon.map((h) => (
              <div key={h.label} className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm",
                h.urgency === "critical" ? "border-rose-200 bg-rose-50 text-rose-800" : "border-slate-200 bg-slate-50 text-slate-700"
              )}>
                <span className="font-semibold shrink-0">{h.date}</span>
                <span>{h.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. KPI cards — ordered by operational priority */}
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
                  <p className="mt-1 text-sm text-slate-500">{data.activeStudents.toLocaleString()} active
                    <span className={cn("ml-1 font-semibold", activeRate < 60 ? "text-amber-700" : "text-emerald-600")}>({activeRate}%)</span>
                    <Tip text="Active = logged in and engaged with at least one course in the last 30 days." />
                  </p>
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
                  <p className="mt-1 text-sm text-slate-500 flex items-center">{data.avgCompletion}% avg completion
                    <Tip text="Average completion rate across all running courses." />
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><BookOpen className="h-5 w-5" /></div>
              </div>
              {data.coursesAtRisk > 0 && <p className="mt-2 text-xs text-amber-700 font-medium">{data.coursesAtRisk} courses at risk</p>}
            </CardContent>
          </Card>

          {/* Finance */}
          <Card className="border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-colors" onClick={() => onNavigate('finance')}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Finance</p>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">{fmt.format(data.revenueThisMonth)}</div>
                  <p className={cn("mt-1 text-sm font-medium flex items-center gap-1", revenueGrowth >= 0 ? "text-emerald-600" : "text-rose-600")}>
                    <TrendingUp className="h-3.5 w-3.5" />{revenueGrowth >= 0 ? "+" : ""}{revenueGrowth}% vs last month
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

          {/* Compliance */}
          <Card className={cn("shadow-sm cursor-pointer hover:border-slate-300 transition-colors", data.accreditationsAtRisk > 0 ? "border-amber-200 bg-amber-50/20" : "border-slate-200")} onClick={() => onNavigate('compliance')}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Compliance</p>
                  <div className={cn("mt-2 text-3xl font-semibold", data.accreditationsAtRisk > 0 ? "text-amber-700" : "text-slate-900")}>{data.accreditationsAtRisk}</div>
                  <p className="mt-1 text-sm text-slate-500 flex items-center">accreditations at risk
                    <Tip text="Accreditations expiring within 60 days or already expired." />
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><ShieldCheck className="h-5 w-5" /></div>
              </div>
              {data.openComplianceIssues > 0 && <p className="mt-2 text-xs text-amber-700 font-medium">{data.openComplianceIssues} open compliance issue</p>}
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

        </div>
      </div>

      {/* 4. Snapshots — context only, no duplicate action buttons */}

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
                <span className={cn("text-sm font-semibold shrink-0", c.completion < 65 ? "text-amber-700" : "text-slate-700")}>{c.completion}%</span>
              </div>
              <Progress value={c.completion} className="mt-2 h-1.5" />
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('courses')}>
            View all courses <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Faculty Snapshot — status list, no side-by-side structural layout */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-slate-500" /> Faculty Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { icon: UserCheck, label: "Aisha Mensah",  sub: "Digital Transformation", status: "Active",    ok: true  },
            { icon: UserCheck, label: "James Okafor",  sub: "AI in Workplace",         status: "Overdue",   ok: false },
            { icon: UserCheck, label: "Sofia Reyes",   sub: "Agile Management",        status: "Inactive",  ok: false },
            { icon: UserCheck, label: "Kwame Asante",  sub: "Cybersecurity",           status: "Active",    ok: true  },
            { icon: Bot,       label: "Nexus",         sub: "Digital Transformation",  status: "Operational", ok: true  },
            { icon: Bot,       label: "Sprint",        sub: "Agile Management",        status: "Degraded",  ok: false },
            { icon: Bot,       label: "Catalyst",      sub: "Leadership & Strategy",   status: "Paused",    ok: false },
          ].map((f) => (
            <div key={f.label} className={cn("flex items-center justify-between rounded-xl border px-4 py-2.5", !f.ok ? "border-amber-200 bg-amber-50/30" : "border-slate-100 bg-slate-50")}>
              <div className="flex items-center gap-2">
                <f.icon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="text-sm font-medium text-slate-900">{f.label}</span>
                <span className="text-xs text-slate-400 hidden sm:block">{f.sub}</span>
              </div>
              <Badge className={cn("border text-xs font-semibold", f.ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-800")}>{f.status}</Badge>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full mt-1" onClick={() => onNavigate('faculty')}>
            View faculty <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
