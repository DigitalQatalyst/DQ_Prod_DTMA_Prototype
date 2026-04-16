import { useState } from "react";
import { AlertTriangle, Flag, Info, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type AccreditationStatus = "active" | "expiring-soon" | "renewal-in-progress" | "renewal-overdue" | "expired" | "pending";

interface AccreditationBody {
  id: string; name: string; region: string;
  status: AccreditationStatus;
  lastAudit: string; expiryDate: string; courses: string[];
}

const accreditationBodies: AccreditationBody[] = [
  { id: "AB-01", name: "Dubai Digital Authority",                       region: "UAE",           status: "active",        lastAudit: "2026-01-15", expiryDate: "2027-01-15", courses: ["Smart Government Services", "UAE Innovation Framework"] },
  { id: "AB-02", name: "Kenyan National Qualifications Authority (KNQA)", region: "Kenya",       status: "renewal-in-progress", lastAudit: "2025-04-20", expiryDate: "2026-04-28", courses: ["Agile Project Management"] },
  { id: "AB-03", name: "Global Tech Accreditation Board",               region: "International", status: "pending",       lastAudit: "—",          expiryDate: "—",          courses: [] },
];

const TODAY = new Date("2026-04-14");
const daysUntil = (d: string) => d === "—" ? null : Math.round((new Date(d).getTime() - TODAY.getTime()) / 86_400_000);
const fmtDate   = (d: string) => d === "—" ? "—" : new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function accredBadge(s: AccreditationStatus) {
  if (s === "active")                return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "expiring-soon")         return "border-amber-200 bg-amber-50 text-amber-800";
  if (s === "renewal-in-progress")   return "border-sky-200 bg-sky-50 text-sky-700";
  if (s === "renewal-overdue")       return "border-rose-200 bg-rose-50 text-rose-700";
  if (s === "expired")               return "border-rose-200 bg-rose-50 text-rose-700";
  return "border-slate-200 bg-slate-50 text-slate-600";
}
const accredLabel: Record<AccreditationStatus, string> = { "active": "Active", "expiring-soon": "Expiring Soon", "renewal-in-progress": "Renewal In Progress", "renewal-overdue": "Renewal Overdue", "expired": "Expired", "pending": "Pending" };

const Tip = ({ text }: { text: string }) => (
  <TooltipProvider><Tooltip>
    <TooltipTrigger asChild><Info className="inline h-3.5 w-3.5 text-slate-400 cursor-default ml-1 shrink-0" /></TooltipTrigger>
    <TooltipContent side="top" className="max-w-[220px] text-xs">{text}</TooltipContent>
  </Tooltip></TooltipProvider>
);

export default function SMSCompliancePanel() {
  const { toast } = useToast();
  const [escalatedIds, setEscalatedIds] = useState<Set<string>>(new Set());

  const atRisk    = accreditationBodies.filter((a) => ["expiring-soon","expired","renewal-overdue"].includes(a.status)).length;
  const active    = accreditationBodies.filter((a) => a.status === "active").length;
  const pending   = accreditationBodies.filter((a) => a.status === "pending").length;

  const escalate = (id: string, name: string) => {
    setEscalatedIds((prev) => new Set(prev).add(id));
    toast({ title: "Escalated", description: `${name} has been flagged for the compliance officer.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] leading-[36px] font-semibold">Accreditation</h2>
        <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
          Accreditation status for all courses. Escalate expiring or lapsed items to the compliance officer.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{active}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Active Accreditations</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">{accreditationBodies.length} total bodies</div>
        </div>

        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", atRisk > 0 ? "border-amber-200 bg-amber-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", atRisk > 0 && "text-amber-700")}>{atRisk}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Accreditations at Risk
            <Tip text="Accreditations expiring within 60 days or already expired. Lapsed accreditation affects the official status of the courses it covers." />
          </div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Expiring or expired</div>
        </div>

        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", pending > 0 ? "border-slate-200 bg-slate-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-slate-500/10 rounded-xl flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5 text-slate-500" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{pending}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Pending Applications</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Awaiting approval</div>
        </div>
      </div>

      {/* Expiring banner */}
      {atRisk > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-3 text-sm text-amber-800">
          <span className="font-semibold">{atRisk} accreditation{atRisk > 1 ? "s" : ""} need attention.</span>
          {" "}Lapsed accreditation affects the official status of the courses it covers. Escalate to the compliance officer.
        </div>
      )}

      {/* Accreditation table */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Accrediting Bodies</CardTitle>
          <CardDescription>Bodies that certify DTMA courses. Accreditation is managed by the compliance officer — escalate expiring or lapsed items here.</CardDescription>
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
                    Expiry Date
                    <Tip text="Date the accreditation lapses. Courses covered by an expired accreditation lose their official recognised status." />
                  </span>
                </TableHead>
                <TableHead className="text-right">
                  <span className="flex items-center justify-end gap-1">
                    Days Left
                    <Tip text="Days until the accreditation expires. Sorted ascending — most urgent at the top." />
                  </span>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {accreditationBodies.slice().sort((a, b) => {
                  const order: Record<AccreditationStatus, number> = { expired: 0, "expiring-soon": 1, pending: 2, active: 3 };
                  return order[a.status] - order[b.status];
                }).map((body) => {
                  const days = daysUntil(body.expiryDate);
                  const needsAction = body.status === "expiring-soon" || body.status === "expired" || body.status === "renewal-overdue";
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
                      <TableCell className="text-sm text-slate-600">{fmtDate(body.expiryDate)}</TableCell>
                      <TableCell className="text-right text-sm font-medium">
                        {days === null ? <span className="text-slate-400">—</span>
                          : days <= 0  ? <span className="text-rose-600 font-bold">Expired</span>
                          : days <= 30 ? <span className="text-rose-600 font-bold">{days}d</span>
                          : days <= 60 ? <span className="text-amber-700 font-medium">{days}d</span>
                          : <span className="text-slate-500">{days}d</span>}
                      </TableCell>
                      <TableCell>
                        <Badge className={`border text-xs font-semibold ${accredBadge(body.status)}`}>{accredLabel[body.status]}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {needsAction && (
                          <Button size="sm" variant="outline" className="text-xs h-7"
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
    </div>
  );
}
