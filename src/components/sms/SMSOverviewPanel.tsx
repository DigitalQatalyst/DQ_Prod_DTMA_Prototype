import { useState } from "react";
import { AlertTriangle, Banknote, BookOpen, Bot, ChevronRight, CreditCard, Globe, Info, ShieldCheck, TrendingUp, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  learnerBodyMuted,
  learnerCaption,
  learnerCardTitle,
  learnerGroupLabel,
  learnerIconWell,
  learnerItemTitle,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerPanel,
  learnerSectionHeading,
} from "@/lib/brandAccent";
import "@/styles/dq-design-tokens.css";

const Tip = ({ text }: { text: string }) => (
  <TooltipProvider><Tooltip>
    <TooltipTrigger asChild><Info className="inline h-3.5 w-3.5 text-slate-400 cursor-default ml-1 shrink-0" /></TooltipTrigger>
    <TooltipContent side="top" className="max-w-[220px] text-xs">{text}</TooltipContent>
  </Tooltip></TooltipProvider>
);

import type { SMSTabId } from "@/components/dashboard/SMSDashboardSidebar";

// ── Data ──────────────────────────────────────────────────────────────────────

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });


// Flags — Review link only, no action buttons (per expert recommendation)
const flags = [
  { id: "f1", label: "2 students with payment failures",                destination: "billing"    as SMSTabId, autoEscalated: true },
  { id: "f2", label: "KNQA accreditation expiring in 14 days",          destination: "compliance" as SMSTabId },
  { id: "f3", label: "Sofia Reyes hasn't published content in 16 days", destination: "faculty"    as SMSTabId },
  { id: "f4", label: "Sprint AI agent degraded — 18% escalation rate",  destination: "faculty"    as SMSTabId },
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
  { label: "James Okafor",  sub: "AI in Workplace",         status: "Drafts Pending", ok: false },
  { label: "Sofia Reyes",   sub: "Agile Management",        status: "No Content (16d)", ok: false },
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

export default function SMSOverviewPanel({ onNavigate }: { onNavigate: (tab: SMSTabId) => void }) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-8">
      {/* 1. KPI Rail — standard portal card style, grouped */}
      <div className="space-y-5">
        {/* People */}
        <div>
          <p className={cn(learnerGroupLabel, "mb-3")}>People</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {/* Students */}
            <div className={cn(learnerKpiCard, "cursor-pointer transition-colors hover:border-slate-300")} onClick={() => onNavigate('students')}>
              <div className={cn(learnerIconWell, "mb-3 bg-[#ff6b4d]/10")}><Users className="h-5 w-5 text-[#ff6b4d]" /></div>
              <div className={learnerKpiValue}>2,840</div>
              <div className={learnerKpiLabel}>Students</div>
              <div className={cn(learnerCaption, "mt-0.5 flex items-center")}>
                1,488 active this month (52%)
                <Tip text="Active = logged in and engaged with at least one course in the last 30 days." />
              </div>
              <div className={cn(learnerCaption, "mt-0.5 font-medium text-rose-600")}>2 lost access</div>
            </div>
            {/* Faculty */}
            <div className={cn(learnerKpiCard, "cursor-pointer transition-colors hover:border-slate-300")} onClick={() => onNavigate('faculty')}>
              <div className={cn(learnerIconWell, "mb-3 bg-indigo-500/10")}><UserCheck className="h-5 w-5 text-indigo-600" /></div>
              <div className={learnerKpiValue}>10</div>
              <div className={cn(learnerKpiLabel, "flex items-center")}>
                Faculty
                <Tip text="Total faculty: 4 human instructors (content creators) + 6 AI agents (handle all student Q&A)." />
              </div>
              <div className={cn(learnerCaption, "mt-0.5")}>4 instructors · 6 AI agents</div>
              <div className={cn(learnerCaption, "mt-0.5 font-medium text-amber-700")}>4 need attention</div>
            </div>
            {/* Partners */}
            <div className={cn(learnerKpiCard, "cursor-pointer transition-colors hover:border-slate-300")} onClick={() => onNavigate('partners')}>
              <div className={cn(learnerIconWell, "mb-3 bg-sky-500/10")}><Globe className="h-5 w-5 text-sky-600" /></div>
              <div className={learnerKpiValue}>2</div>
              <div className={learnerKpiLabel}>Partners</div>
              <div className={cn(learnerCaption, "mt-0.5")}>active content providers</div>
              <div className={cn(learnerCaption, "mt-0.5 font-medium text-rose-600")}>1 inactive</div>
            </div>
          </div>
        </div>

        {/* Operations */}
        <div>
          <p className={cn(learnerGroupLabel, "mb-3")}>Operations</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Courses */}
            <div className={cn(learnerKpiCard, "cursor-pointer transition-colors hover:border-slate-300")} onClick={() => onNavigate('courses')}>
              <div className={cn(learnerIconWell, "mb-3 bg-sky-500/10")}><BookOpen className="h-5 w-5 text-sky-600" /></div>
              <div className={learnerKpiValue}>4</div>
              <div className={learnerKpiLabel}>Courses Running</div>
              <div className={cn(learnerCaption, "mt-0.5 flex items-center")}>
                69% avg completion
                <Tip text="Average percentage of enrolled students who finished all required modules across all active courses." />
              </div>
              <div className={cn(learnerCaption, "mt-0.5 font-medium text-amber-700")}>2 at risk</div>
            </div>
            {/* Finance */}
            <div className={cn(learnerKpiCard, "cursor-pointer transition-colors hover:border-slate-300")} onClick={() => onNavigate('finance')}>
              <div className={cn(learnerIconWell, "mb-3 bg-emerald-500/10")}><Banknote className="h-5 w-5 text-emerald-600" /></div>
              <div className={learnerKpiValue}>$58,400</div>
              <div className={learnerKpiLabel}>Revenue This Month</div>
              <div className={cn(learnerCaption, "mt-0.5 flex items-center gap-0.5 font-medium text-emerald-600")}>
                <TrendingUp className="h-3 w-3" /> +12% vs last month
              </div>
            </div>
            {/* Billing */}
            <div className={cn(learnerKpiCard, "cursor-pointer border-rose-200 bg-rose-50/30 transition-colors hover:border-rose-300")} onClick={() => onNavigate('billing')}>
              <div className={cn(learnerIconWell, "mb-3 bg-rose-500/10")}><CreditCard className="h-5 w-5 text-rose-500" /></div>
              <div className={cn(learnerKpiValue, "text-rose-700")}>3</div>
              <div className={cn(learnerKpiLabel, "flex items-center")}>
                Billing Issues
                <Tip text="Failed payments and refund requests not yet resolved by the finance team." />
              </div>
              <div className={cn(learnerCaption, "mt-0.5 font-medium text-rose-600")}>$550 value at risk</div>
            </div>
            {/* Compliance */}
            <div className={cn(learnerKpiCard, "cursor-pointer border-amber-200 bg-amber-50/30 transition-colors hover:border-amber-300")} onClick={() => onNavigate('compliance')}>
              <div className={cn(learnerIconWell, "mb-3 bg-amber-500/10")}><ShieldCheck className="h-5 w-5 text-amber-600" /></div>
              <div className={cn(learnerKpiValue, "text-amber-700")}>1</div>
              <div className={cn(learnerKpiLabel, "flex items-center")}>
                Accreditation
                <Tip text="Accreditations expiring within 60 days or already expired. Lapsed accreditation affects the official status of the courses it covers." />
              </div>
              <div className={cn(learnerCaption, "mt-0.5 font-medium text-amber-700")}>14 days to KNQA expiry</div>
            </div>
          </div>
        </div>
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
        <Card className={cn(learnerPanel, "border-slate-200")}>
          <CardHeader className="pb-3">
            <CardTitle className={cn(learnerCardTitle, "flex items-center justify-between text-base")}>
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
                  <span className={cn(learnerItemTitle, "mr-2 truncate text-sm")}>{c.title}</span>
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
        <Card className={cn(learnerPanel, "border-slate-200")}>
          <CardHeader className="pb-3">
            <CardTitle className={cn(learnerCardTitle, "flex items-center justify-between text-base")}>
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
                  <span className={cn(learnerItemTitle, "text-sm")}>{f.label}</span>
                  <span className={cn(learnerCaption, "ml-2 hidden sm:inline")}>{f.sub}</span>
                </div>
                <Badge className={cn("border text-xs font-semibold", f.ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-800")}>{f.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Staff snapshot — who to contact per team */}
      <Card className={cn(learnerPanel, "border-slate-200")}>
        <CardHeader className="pb-3">
          <CardTitle className={cn(learnerSectionHeading, "flex items-center justify-between")}>
            Staff — Who to Contact
            <Button variant="ghost" size="sm" className="text-xs h-7 text-slate-400 hover:text-slate-700 gap-1" onClick={() => onNavigate('staff')}>
              Full directory <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { team: "Finance",      contact: "Fatima Al-Rashid", role: "Finance Manager",     status: "available" as const, purpose: "Billing, payments, refunds"       },
              { team: "Support",      contact: "Priya Nair",       role: "Head of Support",     status: "busy"      as const, purpose: "Student access, Q&A issues"       },
              { team: "Partnerships", contact: "Leila Haddad",     role: "Partnership Manager", status: "away"      as const, purpose: "Partners, course sourcing"         },
              { team: "Compliance",   contact: "James Thornton",   role: "Compliance Officer",  status: "available" as const, purpose: "Accreditation, compliance issues"  },
            ].map((s) => (
              <div key={s.team} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 gap-3">
                <div>
                  <div className={cn(learnerItemTitle, "text-sm")}>{s.contact}</div>
                  <div className={learnerCaption}>{s.purpose}</div>
                </div>
                <Badge className={cn("border text-xs font-semibold shrink-0",
                  s.status === "available" ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
                  s.status === "busy"      ? "border-amber-200 bg-amber-50 text-amber-800" :
                                             "border-slate-200 bg-slate-50 text-slate-500"
                )}>
                  {s.status === "available" ? "Available" : s.status === "busy" ? "Busy" : "Away"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. Horizon — low-weight footer band */}
      <div className={cn(learnerPanel, "rounded-2xl border-slate-200 bg-slate-50 px-5 py-4")}>
        <p className={cn(learnerGroupLabel, "mb-3")}>Next 30 Days</p>
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
