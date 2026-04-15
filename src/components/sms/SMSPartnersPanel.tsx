import { useState } from "react";
import { AlertTriangle, BookOpen, Building2, Flag, Info, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// ── Mock data ─────────────────────────────────────────────────────────────────

type PartnerStatus = "active" | "inactive" | "onboarding";

interface Partner {
  id: string;
  name: string;
  type: string;
  region: string;
  status: PartnerStatus;
  coursesContributed: number;
  activeStudents: number;
  avgCompletion: number;
  lastActivity: string; // ISO date
}

const partners: Partner[] = [
  { id: "P-001", name: "Harvard Online",            type: "Academic Institution", region: "USA",    status: "active",     coursesContributed: 2, activeStudents: 14200, avgCompletion: 78, lastActivity: "2026-04-10" },
  { id: "P-002", name: "Dubai Knowledge Authority", type: "Government Body",      region: "UAE",    status: "active",     coursesContributed: 2, activeStudents: 11600, avgCompletion: 71, lastActivity: "2026-04-08" },
  { id: "P-003", name: "Kenyan EdTech Collective",  type: "Regional Partner",     region: "Kenya",  status: "onboarding", coursesContributed: 1, activeStudents: 1800,  avgCompletion: 67, lastActivity: "2026-03-25" },
  { id: "P-004", name: "Lagos Tech Institute",      type: "Academic Institution", region: "Nigeria",status: "inactive",   coursesContributed: 0, activeStudents: 0,     avgCompletion: 0,  lastActivity: "2026-01-12" },
];

type AccreditationStatus = "active" | "expiring-soon" | "expired" | "pending";

interface AccreditationBody {
  id: string;
  name: string;
  region: string;
  status: AccreditationStatus;
  lastAudit: string;
  expiryDate: string;
  courses: string[];
}

const accreditationBodies: AccreditationBody[] = [
  { id: "AB-01", name: "Dubai Digital Authority",              region: "UAE",           status: "active",        lastAudit: "2026-01-15", expiryDate: "2027-01-15", courses: ["Smart Government Services", "UAE Innovation Framework"] },
  { id: "AB-02", name: "Kenyan National Qualifications Authority (KNQA)", region: "Kenya", status: "expiring-soon", lastAudit: "2025-04-20", expiryDate: "2026-04-28", courses: ["Agile Project Management"] },
  { id: "AB-03", name: "Global Tech Accreditation Board",      region: "International", status: "pending",       lastAudit: "—",          expiryDate: "—",          courses: [] },
];

interface SubmissionLog {
  id: string;
  event: string;
  partner: string;
  date: string;
}

const submissionLog: SubmissionLog[] = [
  { id: "SL-01", event: "Q1 Learner Outcomes Report submitted",      partner: "Dubai Digital Authority",  date: "2026-04-01" },
  { id: "SL-02", event: "Accreditation renewal package submitted",   partner: "KNQA",                     date: "2026-03-28" },
  { id: "SL-03", event: "Partner onboarding documents received",     partner: "Kenyan EdTech Collective", date: "2026-03-15" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const TODAY = new Date("2026-04-14");

function daysUntil(dateStr: string) {
  if (dateStr === "—") return null;
  return Math.round((new Date(dateStr).getTime() - TODAY.getTime()) / 86_400_000);
}

function fmtDate(dateStr: string) {
  if (dateStr === "—") return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function partnerBadge(s: PartnerStatus) {
  if (s === "active")     return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "onboarding") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-rose-200 bg-rose-50 text-rose-700";
}

function accredBadge(s: AccreditationStatus) {
  if (s === "active")        return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "expiring-soon") return "border-amber-200 bg-amber-50 text-amber-800";
  if (s === "expired")       return "border-rose-200 bg-rose-50 text-rose-700";
  return "border-slate-200 bg-slate-50 text-slate-600";
}

function accredLabel(s: AccreditationStatus) {
  const map: Record<AccreditationStatus, string> = {
    "active": "Active", "expiring-soon": "Expiring Soon", "expired": "Expired", "pending": "Pending",
  };
  return map[s];
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

export default function SMSPartnersPanel({ initialTab = "partners" }: { initialTab?: "partners" | "accreditation" }) {
  const { toast } = useToast();
  const [escalatedIds, setEscalatedIds] = useState<Set<string>>(new Set());

  const escalate = (id: string, label: string) => {
    setEscalatedIds((prev) => new Set(prev).add(id));
    toast({ title: "Escalated", description: `${label} has been flagged for the compliance officer.` });
  };

  const activePartners      = partners.filter((p) => p.status === "active").length;
  const inactivePartners    = partners.filter((p) => p.status === "inactive").length;
  const expiringAccred      = accreditationBodies.filter((a) => a.status === "expiring-soon" || a.status === "expired").length;
  const openIssues          = inactivePartners + expiringAccred;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[28px] leading-[36px] font-semibold">Partners &amp; Compliance</h2>
        <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
          Monitor content partner status and accreditation health. Escalate anything at risk to the compliance officer.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{activePartners}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Active Partners</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">{partners.length} total content providers</div>
        </div>

        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", inactivePartners > 0 ? "border-rose-200 bg-rose-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5 text-rose-500" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", inactivePartners > 0 && "text-rose-700")}>{inactivePartners}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Inactive Partners</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">No active courses contributed</div>
        </div>

        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", expiringAccred > 0 ? "border-amber-200 bg-amber-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", expiringAccred > 0 && "text-amber-700")}>{expiringAccred}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Accreditations at Risk
            <Tip text="Accreditations expiring within 60 days or already expired. Lapsed accreditation affects the official status of the courses it covers." />
          </div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Expiring or expired</div>
        </div>

        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", openIssues > 0 ? "border-rose-200 bg-rose-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", openIssues > 0 && "text-rose-700")}>{openIssues}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Open Compliance Issues</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Needs escalation</div>
        </div>
      </div>

      <Tabs defaultValue={initialTab} className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-slate-100 p-2">
          <TabsTrigger value="partners"      className="rounded-xl px-4 py-2">Partners</TabsTrigger>
          <TabsTrigger value="accreditation" className="rounded-xl px-4 py-2">
            Accreditation
            {expiringAccred > 0 && <span className="ml-2 rounded-full bg-amber-500 px-1.5 py-0.5 text-xs text-white">{expiringAccred}</span>}
          </TabsTrigger>
        </TabsList>

        {/* ── Partners ── */}
        <TabsContent value="partners" className="space-y-6">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Content Partners</CardTitle>
              <CardDescription>
                Schools and content providers contributing courses to the platform. Escalate inactive or at-risk partners to the partnership manager.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <Table>
                  <TableHeader><TableRow className="bg-slate-50">
                    <TableHead>Partner</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead className="text-right">Courses</TableHead>
                    <TableHead className="text-right">Active Students</TableHead>
                    <TableHead className="text-right">Avg Completion</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {partners.map((p) => (
                      <TableRow key={p.id} className={p.status === "inactive" ? "bg-rose-50/30" : ""}>
                        <TableCell>
                          <div className="font-medium text-slate-900">{p.name}</div>
                          <div className="text-xs text-slate-500">{p.type}</div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">{p.region}</TableCell>
                        <TableCell className="text-right">{p.coursesContributed}</TableCell>
                        <TableCell className="text-right">{p.activeStudents.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          {p.avgCompletion > 0
                            ? <span className={cn("font-medium", p.avgCompletion < 60 ? "text-amber-700" : "text-slate-700")}>{p.avgCompletion}%</span>
                            : <span className="text-slate-400">—</span>}
                        </TableCell>
                        <TableCell>
                          <Badge className={`border text-xs font-semibold capitalize ${partnerBadge(p.status)}`}>
                            {p.status === "onboarding" ? "Onboarding" : p.status === "inactive" ? "Inactive" : "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {(p.status === "inactive") && (
                            <Button
                              size="sm" variant="outline" className="text-xs h-7"
                              disabled={escalatedIds.has(p.id)}
                              onClick={() => escalate(p.id, p.name)}
                            >
                              {escalatedIds.has(p.id) ? "Escalated" : <><Flag className="h-3 w-3 mr-1" />Escalate</>}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Recent activity log */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Recent Activity</h3>
                <div className="space-y-2">
                  {submissionLog.map((log) => (
                    <div key={log.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                      <BookOpen className="h-4 w-4 text-slate-400 shrink-0" />
                      <div className="flex-1 text-sm text-slate-700">{log.event}</div>
                      <div className="text-xs text-slate-400 shrink-0">{log.partner} · {fmtDate(log.date)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Accreditation ── */}
        <TabsContent value="accreditation" className="space-y-6">
          {/* Expiring banner */}
          {expiringAccred > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-3 text-sm text-amber-800">
              <span className="font-semibold">{expiringAccred} accreditation{expiringAccred > 1 ? "s" : ""} need attention.</span>
              {" "}Lapsed accreditation affects the official status of the courses it covers. Escalate to the compliance officer.
            </div>
          )}

          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Accrediting Bodies</CardTitle>
              <CardDescription>
                Bodies that certify DTMA courses. Accreditation is managed by the compliance officer — escalate expiring or lapsed items here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <Table>
                  <TableHeader><TableRow className="bg-slate-50">
                    <TableHead>Body</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Courses Covered</TableHead>
                    <TableHead>Last Audit</TableHead>
                    <TableHead>
                      <span className="flex items-center gap-1">
                        Expiry
                        <Tip text="Date the accreditation lapses. Courses covered by an expired accreditation lose their official recognised status." />
                      </span>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {accreditationBodies
                      .slice()
                      .sort((a, b) => {
                        const order: Record<AccreditationStatus, number> = { expired: 0, "expiring-soon": 1, pending: 2, active: 3 };
                        return order[a.status] - order[b.status];
                      })
                      .map((body) => {
                        const days = daysUntil(body.expiryDate);
                        const needsAction = body.status === "expiring-soon" || body.status === "expired";
                        return (
                          <TableRow key={body.id} className={needsAction ? "bg-amber-50/30" : ""}>
                            <TableCell className="font-medium">{body.name}</TableCell>
                            <TableCell className="text-sm text-slate-600">{body.region}</TableCell>
                            <TableCell>
                              {body.courses.length === 0
                                ? <span className="text-slate-400 text-sm">None yet</span>
                                : <div className="flex flex-wrap gap-1">
                                    {body.courses.map((c) => (
                                      <Badge key={c} className="border border-slate-200 bg-slate-50 text-slate-600 text-xs">{c}</Badge>
                                    ))}
                                  </div>}
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">{fmtDate(body.lastAudit)}</TableCell>
                            <TableCell className="text-sm">
                              {days !== null && days <= 30
                                ? <span className="text-rose-600 font-medium">{fmtDate(body.expiryDate)} ({days}d)</span>
                                : days !== null && days <= 60
                                  ? <span className="text-amber-700 font-medium">{fmtDate(body.expiryDate)} ({days}d)</span>
                                  : <span className="text-slate-600">{fmtDate(body.expiryDate)}</span>}
                            </TableCell>
                            <TableCell>
                              <Badge className={`border text-xs font-semibold ${accredBadge(body.status)}`}>{accredLabel(body.status)}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {needsAction && (
                                <Button
                                  size="sm" variant="outline" className="text-xs h-7"
                                  disabled={escalatedIds.has(body.id)}
                                  onClick={() => escalate(body.id, body.name)}
                                >
                                  {escalatedIds.has(body.id) ? "Escalated" : <><Flag className="h-3 w-3 mr-1" />Escalate</>}
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
