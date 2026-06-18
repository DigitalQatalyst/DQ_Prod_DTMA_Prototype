import { useState } from "react";
import { Building2, Flag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  learnerBodyMuted,
  learnerCaption,
  learnerIconWell,
  learnerItemTitle,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerPanel,
  learnerSectionHeading,
} from "@/lib/brandAccent";

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

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <div className={learnerKpiCard}>
          <div className={cn(learnerIconWell, "mb-3 bg-sky-500/10")}>
            <Building2 className="h-5 w-5 text-sky-600" />
          </div>
          <div className={learnerKpiValue}>{activeCount}</div>
          <div className={learnerKpiLabel}>Active Partners</div>
          <div className={cn(learnerCaption, "mt-0.5")}>{partners.length} total content providers</div>
        </div>

        <div className={cn(learnerKpiCard, inactiveCount > 0 && "border-rose-200 bg-rose-50/30")}>
          <div className={cn(learnerIconWell, "mb-3 bg-rose-500/10")}>
            <Building2 className="h-5 w-5 text-rose-500" />
          </div>
          <div className={cn(learnerKpiValue, inactiveCount > 0 && "text-rose-700")}>{inactiveCount}</div>
          <div className={learnerKpiLabel}>Inactive Partners</div>
          <div className={cn(learnerCaption, "mt-0.5")}>No active courses contributed</div>
        </div>

        <div className={cn(learnerKpiCard, onboardCount > 0 && "border-amber-200 bg-amber-50/30")}>
          <div className={cn(learnerIconWell, "mb-3 bg-amber-500/10")}>
            <Building2 className="h-5 w-5 text-amber-500" />
          </div>
          <div className={cn(learnerKpiValue, onboardCount > 0 && "text-amber-700")}>{onboardCount}</div>
          <div className={learnerKpiLabel}>Onboarding</div>
          <div className={cn(learnerCaption, "mt-0.5")}>In progress</div>
        </div>
      </div>

      {/* Partners table */}
      <Card className={cn(learnerPanel, "border-slate-200/80")}>
        <CardHeader>
          <CardTitle className={learnerSectionHeading}>Content Partners</CardTitle>
          <CardDescription className={learnerBodyMuted}>Schools and content providers contributing courses. Escalate inactive partners to the partnership manager.</CardDescription>
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
                      <div className={learnerItemTitle}>{p.name}</div>
                      <div className={learnerCaption}>{p.type}</div>
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