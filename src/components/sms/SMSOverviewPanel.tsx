import { useState } from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type SMSTab = 'overview' | 'courses' | 'faculty' | 'students' | 'finance' | 'billing' | 'partners' | 'compliance';

// ── Data ──────────────────────────────────────────────────────────────────────

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// KPI rail — grouped: People | Operations
const kpiGroups = [
  {
    label: "People",
    items: [
      { tab: "students"   as SMSTab, label: "Students",   value: "2,840",  delta: "+182 this month", deltaOk: true,  alert: "2 lost access",    color: "border-l-[#ff6b4d]" },
      { tab: "faculty"    as SMSTab, label: "Faculty",    value: "4 / 6",  delta: "instructors · AI agents", deltaOk: true, alert: "2 need attention", color: "border-l-indigo-400" },
      { tab: "partners"   as SMSTab, label: "Partners",   value: "2",      delta: "active providers",  deltaOk: true,  alert: "1 inactive",       color: "border-l-sky-400" },
    ],
  },
  {
    label: "Operations",
    items: [
      { tab: "courses"    as SMSTab, label: "Courses",    value: "4",      delta: "69% avg completion", deltaOk: true,  alert: "2 at risk",        color: "border-l-amber-400" },
      { tab: "finance"    as SMSTab, label: "Finance",    value: "$58,400",delta: "+12% vs last month",  deltaOk: true,  alert: null,               color: "border-l-emerald-400" },
      { tab: "billing"    as SMSTab, label: "Billing",    value: "3",      delta: "open issues",         deltaOk: false, alert: "$550 at risk",     color: "border-l-rose-400" },
      { tab: "compliance" as SMSTab, label: "Compliance", value: "1",      delta: "accreditation at risk",deltaOk: false,alert: "14 days to expiry",color: "border-l-amber-500" },
    ],
  },
];

// Flags — Review link only, no action buttons (per expert recommendation)
const flags = [
  { id: "f1", label: "2 students with payment failures",                destination: "billing"    as SMSTab, autoEscalated: true },
  { id: "f2", label: "KNQA accreditation expiring in 14 days",          destination: "compliance" as SMSTab },
  { id: "f3", label: "Sofia Reyes hasn't published content in 16 days", destination: "faculty"    as SMSTab },
  { id: "f4", label: "Sprint AI agent degraded — 18% escalation rate",  destination: "faculty"    as SMSTab },
];

// Snapshot data
const courseSnapshot = [
  { title: "Digital Transformation Fundamentals", enrolled: 342, completion: 72, atRisk: false },
  { title: "AI & Automation in the Workplace",    enrolled: 219, completion: 65, atRisk: true  },
  { title: "Agile Project Management",            enrolled: 187, completion: 58, atRisk: true  },
  { title: "Cybersecurity Essentials",            enrolled: 154, completion: 81, atRisk: false },
];

const facultySnapshot = [
  { label: "Aisha Mensah",  sub: "Digital Transformation", status: "Active",       ok: true  },
  { label: "James Okafor",  sub: "AI in Workplace",         status: "Overdue",      ok: false },
  { label: "Sofia Reyes",   sub: "Agile Management",        status: "Inactive",     ok: false },
  { label: "Kwame Asante",  sub: "Cybersecurity",           status: "Active",       ok: true  },
  { label: "Nexus (AI)",    sub: "Digital Transformation",  status: "Operational",  ok: true  },
  { label: "Sprint (AI)",   sub: "Agile Management",        status: "Degraded",     ok: false },
  { label: "Catalyst (AI)", sub: "Leadership & Strategy",   status: "Paused",       ok: false },
];

const horizon = [
  { date: "28 Apr", label: "KNQA accreditation expires",       urgent: true  },
  { date: "10 May", label: "Kwame Asante subscription renews", urgent: false },
  { date: "15 May", label: "Noah Mensah subscription renews",  urgent: false },
  { date: "30 May", label: "Q2 partner activity report due",   urgent: false },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function SMSOverviewPanel({ onNavigate }: { onNavigate: (tab: SMSTab) => void }) {
  const { toast } = useToast();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-8">
      {/* Header — title only */}
      <h2 className="text-[28px] leading-[36px] font-semibold">Overview</h2>

      {/* 1. KPI Rail — first thing the manager sees */}
      <div className="space-y-4">
        {kpiGroups.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-2">{group.label}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.items.map((k) => (
                <button
                  key={k.tab}
                  onClick={() => onNavigate(k.tab)}
                  className={cn(
                    "text-left rounded-2xl border border-slate-200 bg-card p-5 shadow-sm border-l-4 hover:border-slate-300 transition-colors",
                    k.color
                  )}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{k.label}</p>
                  <p className="mt-2 text-[26px] leading-[32px] font-semibold text-slate-900">{k.value}</p>
                  <p className={cn("mt-1 text-xs", k.deltaOk ? "text-slate-500" : "text-rose-600 font-medium")}>{k.delta}</p>
                  {k.alert && (
                    <p className={cn("mt-1 text-xs font-medium", k.deltaOk ? "text-amber-700" : "text-rose-600")}>{k.alert}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Attention flags */}
      {flags.filter((f) => !dismissed.has(f.id)).length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-amber-900">
              <AlertTriangle className="h-4 w-4" />
              {flags.filter((f) => !dismissed.has(f.id)).length} items need your attention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {flags.filter((f) => !dismissed.has(f.id)).map((flag) => (
              <div key={flag.id} className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-white px-4 py-3">
                <span className="text-sm text-slate-800 flex-1">{flag.label}</span>
                {flag.autoEscalated
                  ? <Badge className="border border-rose-200 bg-rose-50 text-rose-700 text-xs shrink-0">Auto-Escalated</Badge>
                  : (
                    <Button size="sm" variant="ghost" className="text-xs h-7 text-slate-500 hover:text-slate-800 shrink-0 gap-1"
                      onClick={() => { setDismissed((p) => new Set(p).add(flag.id)); onNavigate(flag.destination); }}
                    >
                      Review <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 3. Snapshot — one section, two columns */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Course Progress */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center justify-between">
              Course Progress
              <Button variant="ghost" size="sm" className="text-xs h-7 text-slate-400 hover:text-slate-700 gap-1" onClick={() => onNavigate('courses')}>
                All courses <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {courseSnapshot.map((c) => (
              <div key={c.title}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-800 truncate mr-2">{c.title}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {c.atRisk && <Badge className="border border-amber-200 bg-amber-50 text-amber-700 text-xs">At risk</Badge>}
                    <span className={cn("text-xs font-semibold", c.completion < 65 ? "text-amber-700" : "text-slate-600")}>{c.completion}%</span>
                  </div>
                </div>
                <Progress value={c.completion} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Faculty Status */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center justify-between">
              Faculty Status
              <Button variant="ghost" size="sm" className="text-xs h-7 text-slate-400 hover:text-slate-700 gap-1" onClick={() => onNavigate('faculty')}>
                All faculty <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {facultySnapshot.map((f) => (
              <div key={f.label} className={cn("flex items-center justify-between rounded-xl px-3 py-2", !f.ok ? "bg-amber-50/50" : "bg-slate-50")}>
                <div>
                  <span className="text-sm font-medium text-slate-900">{f.label}</span>
                  <span className="text-xs text-slate-400 ml-2 hidden sm:inline">{f.sub}</span>
                </div>
                <Badge className={cn("border text-xs font-semibold", f.ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-800")}>{f.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 4. Horizon — low-weight footer band */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">Next 30 Days</p>
        <div className="flex flex-wrap gap-2">
          {horizon.map((h) => (
            <div key={h.label} className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs",
              h.urgent ? "border-rose-200 bg-rose-50 text-rose-800" : "border-slate-200 bg-white text-slate-600"
            )}>
              <span className="font-semibold">{h.date}</span>
              <span>{h.label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
