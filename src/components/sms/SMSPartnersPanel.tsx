import { useState } from "react";
import { Building2, Flag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type PartnerStatus = "active" | "inactive" | "onboarding";

interface Partner {
  id: string; name: string; type: string; region: string;
  status: PartnerStatus; coursesContributed: number;
  activeStudents: number; avgCompletion: number; lastActivity: string;
}

const partners: Partner[] = [
  { id: "P-001", name: "Harvard Online",            type: "Academic Institution", region: "USA",     status: "active",     coursesContributed: 2, activeStudents: 14200, avgCompletion: 78, lastActivity: "2026-04-10" },
  { id: "P-002", name: "Dubai Knowledge Authority", type: "Government Body",      region: "UAE",     status: "active",     coursesContributed: 2, activeStudents: 11600, avgCompletion: 71, lastActivity: "2026-04-08" },
  { id: "P-003", name: "Kenyan EdTech Collective",  type: "Regional Partner",     region: "Kenya",   status: "onboarding", coursesContributed: 1, activeStudents: 1800,  avgCompletion: 67, lastActivity: "2026-03-25" },
  { id: "P-004", name: "Lagos Tech Institute",      type: "Academic Institution", region: "Nigeria", status: "inactive",   coursesContributed: 0, activeStudents: 0,     avgCompletion: 0,  lastActivity: "2026-01-12" },
];


const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function partnerBadge(s: PartnerStatus) {
  if (s === "active")     return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "onboarding") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-rose-200 bg-rose-50 text-rose-700";
}

export default function SMSPartnersPanel() {
  const { toast } = useToast();
  const [escalatedIds, setEscalatedIds] = useState<Set<string>>(new Set());

  const activeCount   = partners.filter((p) => p.status === "active").length;
  const inactiveCount = partners.filter((p) => p.status === "inactive").length;
  const onboardCount  = partners.filter((p) => p.status === "onboarding").length;

  const escalate = (id: string, name: string) => {
    setEscalatedIds((prev) => new Set(prev).add(id));
    toast({ title: "Escalated", description: `${name} has been flagged for the partnership manager.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] leading-[36px] font-semibold">Partners</h2>
        <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
          Content providers and schools contributing courses to the platform. Escalate inactive partners to the partnership manager.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{activeCount}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Active Partners</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">{partners.length} total content providers</div>
        </div>

        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", inactiveCount > 0 ? "border-rose-200 bg-rose-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5 text-rose-500" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", inactiveCount > 0 && "text-rose-700")}>{inactiveCount}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Inactive Partners</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">No active courses contributed</div>
        </div>

        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", onboardCount > 0 ? "border-amber-200 bg-amber-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5 text-amber-500" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", onboardCount > 0 && "text-amber-700")}>{onboardCount}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Onboarding</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">In progress</div>
        </div>
      </div>

      {/* Partners table */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Content Partners</CardTitle>
          <CardDescription>Schools and content providers contributing courses. Escalate inactive partners to the partnership manager.</CardDescription>
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
                      {p.status === "inactive" && (
                        <Button size="sm" variant="outline" className="text-xs h-7"
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
        </CardContent>
      </Card>
    </div>
  );
}