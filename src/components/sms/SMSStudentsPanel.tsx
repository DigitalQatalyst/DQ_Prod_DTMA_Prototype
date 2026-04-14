import { useState } from "react";
import { AlertTriangle, Info, Package, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  enrolled: number;
  completed: number;
  certificates: number;
  lastActiveDaysAgo: number;
  accessStatus: "active" | "payment-failed" | "expired" | "cancelled" | "refunded" | "free";
}

interface PendingAction {
  id: string;
  student: string;
  type: "hard-copy" | "name-correction" | "revocation" | "re-issue";
  detail: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const studentRecords: StudentRecord[] = [
  { id: "S-001", name: "Amina Osei",   email: "amina@example.com",  enrolled: 3, completed: 2, certificates: 2, lastActiveDaysAgo: 1,  accessStatus: "active"         },
  { id: "S-002", name: "Noah Mensah",  email: "noah@example.com",   enrolled: 2, completed: 2, certificates: 2, lastActiveDaysAgo: 2,  accessStatus: "active"         },
  { id: "S-003", name: "Irene Mwangi", email: "irene@example.com",  enrolled: 1, completed: 0, certificates: 0, lastActiveDaysAgo: 21, accessStatus: "payment-failed" },
  { id: "S-004", name: "Kwame Asante", email: "kwame@example.com",  enrolled: 4, completed: 3, certificates: 3, lastActiveDaysAgo: 4,  accessStatus: "expired"        },
  { id: "S-005", name: "Sofia Reyes",  email: "sofia@example.com",  enrolled: 2, completed: 1, certificates: 1, lastActiveDaysAgo: 8,  accessStatus: "active"         },
];

const initialPendingActions: PendingAction[] = [
  { id: "PA-01", student: "Amina Osei",   type: "hard-copy",       detail: "DT Strategy Certificate — hard copy requested, Nairobi, Kenya"     },
  { id: "PA-02", student: "Amina Osei",   type: "name-correction", detail: "Legal name differs from display name in LMS"                        },
  { id: "PA-03", student: "Irene Mwangi", type: "revocation",      detail: "Executive Change Leadership Badge — subscription payment failed"           },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const actionLabel: Record<PendingAction["type"], string> = {
  "hard-copy":       "Hard copy approval",
  "name-correction": "Name correction",
  "revocation":      "Revocation",
  "re-issue":        "Re-issue",
};

const actionGuide: Record<PendingAction["type"], string> = {
  "hard-copy":       "Verify digital certificate is valid and payment is clear, then approve to send to print vendor.",
  "name-correction": "Confirm the correct legal name with the student and update it in the LMS before approving.",
  "revocation":      "Confirm the reason is valid (e.g. payment failure), then approve to deactivate the certificate.",
  "re-issue":        "Confirm the student's updated details are correct in the LMS, then approve to trigger re-delivery.",
};

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

function accessBadge(s: string) {
  if (s === "active")         return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "payment-failed") return "border-rose-300 bg-rose-100 text-rose-800";
  if (s === "expired")        return "border-amber-200 bg-amber-50 text-amber-800";
  if (s === "cancelled")      return "border-slate-200 bg-slate-50 text-slate-600";
  if (s === "refunded")       return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-slate-200 bg-slate-50 text-slate-600";
}

function accessLabel(s: string) {
  const map: Record<string, string> = {
    "active": "Active", "payment-failed": "Payment Failed",
    "expired": "Expired", "cancelled": "Cancelled", "refunded": "Refunded", "free": "Free",
  };
  return map[s] ?? s;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SMSStudentsPanel() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [pendingActions, setPendingActions] = useState(initialPendingActions);

  const filtered = studentRecords.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const approveAction = (id: string, student: string) => {
    setPendingActions((cur) => cur.filter((a) => a.id !== id));
    toast({ title: "Approved", description: `Action for ${student} has been approved.` });
  };

  const atRiskCount = studentRecords.filter((s) => s.accessStatus === "payment-failed" || s.accessStatus === "expired").length;
  const totalCerts  = studentRecords.reduce((sum, s) => sum + s.certificates, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[28px] leading-[36px] font-semibold">Students</h2>
        <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
          Progress, access status, and certificates for all enrolled students.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="text-[24px] leading-[32px] font-medium">{studentRecords.length}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Total Students
          </div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="text-[24px] leading-[32px] font-medium">{totalCerts}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Certificates Issued <Tip text="Total certificates auto-issued to students who completed all required modules. No manual action needed." />
          </div>
        </div>
        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", atRiskCount > 0 ? "border-rose-200 bg-rose-50/30" : "border-slate-200/80")}>
          <div className={cn("text-[24px] leading-[32px] font-medium", atRiskCount > 0 && "text-rose-700")}>{atRiskCount}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Students At Risk
          </div>
        </div>
      </div>

      {/* Pending approvals — contextual, only shown when items exist */}
      {pendingActions.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/40 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 text-base">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {pendingActions.length} item{pendingActions.length !== 1 ? "s" : ""} need your approval
            </CardTitle>
            <CardDescription>These are blocking students from receiving their credentials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingActions.map((a) => (
              <div key={a.id} className="rounded-2xl border border-amber-200 bg-white p-4 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">{a.student}</span>
                    <Badge className="border border-slate-200 bg-slate-50 text-slate-600 text-xs">{actionLabel[a.type]}</Badge>
                  </div>
                  <div className="text-sm text-slate-600">{a.detail}</div>
                  <div className="text-xs text-amber-800"><span className="font-semibold">What to do: </span>{actionGuide[a.type]}</div>
                </div>
                <Button size="sm" className="shrink-0" onClick={() => approveAction(a.id, a.student)}>
                  <Package className="mr-1 h-3.5 w-3.5" /> Approve
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Student table */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>Progress, last activity, payment status, and certificates earned per student.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email" className="pl-9" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Table>
              <TableHeader><TableRow className="bg-slate-50">
                <TableHead>Student</TableHead>
                <TableHead className="text-right">Enrolled</TableHead>
                <TableHead>
                  Progress
                </TableHead>
                <TableHead>
                  <span className="flex items-center gap-1">
                    Last Active <Tip text="Days since the student last logged in and engaged with course content. Amber if over 14 days." />
                  </span>
                </TableHead>
                <TableHead>Access</TableHead>
                <TableHead className="text-right">
                  Certificates
                </TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {filtered.map((s) => {
                  const pct = s.enrolled > 0 ? Math.round((s.completed / s.enrolled) * 100) : 0;
                  const atRisk = s.accessStatus === "payment-failed" || s.accessStatus === "expired";
                  const barColor = pct >= 80 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-400" : "bg-rose-500";
                  return (
                    <TableRow key={s.id} className={atRisk ? "bg-rose-50/40" : ""}>
                      <TableCell>
                        <div className="font-medium text-slate-900">{s.name}</div>
                        <div className="text-xs text-slate-500">{s.email}</div>
                      </TableCell>
                      <TableCell className="text-right">{s.enrolled}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className={`h-2 w-16 [&>div]:${barColor}`} />
                          <span className="text-xs text-slate-500">{pct}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={cn("text-sm", s.lastActiveDaysAgo > 14 ? "text-amber-700 font-medium" : "text-slate-600")}>
                          {s.lastActiveDaysAgo === 0 ? "Today" : s.lastActiveDaysAgo === 1 ? "Yesterday" : `${s.lastActiveDaysAgo}d ago`}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`border text-xs font-semibold ${accessBadge(s.accessStatus)}`}>{accessLabel(s.accessStatus)}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {s.certificates > 0
                          ? <span className="text-sm font-medium text-emerald-700">{s.certificates} issued</span>
                          : <span className="text-sm text-slate-400">—</span>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
