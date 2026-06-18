import { useState } from "react";
import { Bot, FileText, Info, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

// ── Data ──────────────────────────────────────────────────────────────────────

const humanFaculty = [
  { id: "HF-01", name: "Aisha Mensah",  course: "Digital Transformation",  lastPublishedDaysAgo: 1,  draftsPending: 0, completionRate: 74, rating: 4.9, activeStudents: 342, status: "active"   as const },
  { id: "HF-02", name: "James Okafor",  course: "AI in Workplace",          lastPublishedDaysAgo: 3,  draftsPending: 2, completionRate: 65, rating: 4.8, activeStudents: 219, status: "drafts-pending" as const },
  { id: "HF-03", name: "Sofia Reyes",   course: "Agile Management",         lastPublishedDaysAgo: 16, draftsPending: 3, completionRate: 58, rating: 4.7, activeStudents: 187, status: "no-content" as const },
  { id: "HF-04", name: "Kwame Asante",  course: "Cybersecurity Essentials", lastPublishedDaysAgo: 2,  draftsPending: 0, completionRate: 81, rating: 4.7, activeStudents: 154, status: "active"   as const },
];

const aiAgents = [
  { id: "AI-01", name: "Nexus",    subject: "Digital Transformation", status: "operational" as const, qaVolume7d: 214, escalationRate: 3,  coverageGaps: 0 },
  { id: "AI-02", name: "Cipher",   subject: "AI & Automation",        status: "operational" as const, qaVolume7d: 189, escalationRate: 7,  coverageGaps: 2 },
  { id: "AI-03", name: "Sprint",   subject: "Agile Management",       status: "degraded"    as const, qaVolume7d: 142, escalationRate: 18, coverageGaps: 4 },
  { id: "AI-04", name: "Shield",   subject: "Cybersecurity",          status: "operational" as const, qaVolume7d: 97,  escalationRate: 4,  coverageGaps: 0 },
  { id: "AI-05", name: "Ledger",   subject: "Finance & Compliance",   status: "operational" as const, qaVolume7d: 76,  escalationRate: 5,  coverageGaps: 1 },
  { id: "AI-06", name: "Catalyst", subject: "Leadership & Strategy",  status: "paused"      as const, qaVolume7d: 0,   escalationRate: 0,  coverageGaps: 0 },
];

function humanBadge(s: "active" | "drafts-pending" | "no-content") {
  if (s === "active")          return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "no-content")      return "border-rose-200 bg-rose-50 text-rose-700";
  return "border-amber-200 bg-amber-50 text-amber-800";
}

function humanStatusLabel(s: "active" | "drafts-pending" | "no-content") {
  if (s === "active")          return "Active";
  if (s === "drafts-pending")  return "Drafts Pending";
  return "No Content (16d)";
}
function agentBadge(s: "operational" | "degraded" | "paused") {
  if (s === "operational") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "paused")      return "border-slate-200 bg-slate-100 text-slate-600";
  return "border-rose-200 bg-rose-50 text-rose-700";
}

const Tip = ({ text }: { text: string }) => (
  <TooltipProvider><Tooltip>
    <TooltipTrigger asChild><Info className="inline h-3.5 w-3.5 text-slate-400 cursor-default ml-1 shrink-0" /></TooltipTrigger>
    <TooltipContent side="top" className="max-w-[220px] text-xs">{text}</TooltipContent>
  </Tooltip></TooltipProvider>
);

// ── Derived KPIs ──────────────────────────────────────────────────────────────

const activeHuman   = humanFaculty.filter((f) => f.status === "active").length;
const needsAction   = humanFaculty.filter((f) => f.status !== "active").length;
const agentsHealthy = aiAgents.filter((a) => a.status === "operational").length;
const agentsAtRisk  = aiAgents.filter((a) => a.status !== "operational").length;

// ── Component ─────────────────────────────────────────────────────────────────

export default function SMSFacultyPanel() {
  const { toast } = useToast();
  const [reminded,  setReminded]  = useState<Set<string>>(new Set());
  const [escalated, setEscalated] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* KPI cards — faculty only */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className={learnerKpiCard}>
          <div className={cn(learnerIconWell, "mb-3 bg-sky-500/10")}>
            <UserCheck className="h-5 w-5 text-sky-600" />
          </div>
          <div className={learnerKpiValue}>{activeHuman}</div>
          <div className={learnerKpiLabel}>Active Instructors</div>
          <div className={cn(learnerCaption, "mt-0.5")}>{humanFaculty.length} total</div>
        </div>

        <div className={cn(learnerKpiCard, needsAction > 0 && "border-amber-200 bg-amber-50/30")}>
          <div className={cn(learnerIconWell, "mb-3 bg-amber-500/10")}>
            <Users className="h-5 w-5 text-amber-500" />
          </div>
          <div className={cn(learnerKpiValue, needsAction > 0 && "text-amber-700")}>{needsAction}</div>
          <div className={cn(learnerKpiLabel, "flex items-center")}>
            Needs Attention
            <Tip text="Instructors who are inactive or have stalled drafts pending publication." />
          </div>
          <div className={cn(learnerCaption, "mt-0.5")}>Inactive or overdue</div>
        </div>

        <div className={learnerKpiCard}>
          <div className={cn(learnerIconWell, "mb-3 bg-emerald-500/10")}>
            <Bot className="h-5 w-5 text-emerald-600" />
          </div>
          <div className={learnerKpiValue}>{agentsHealthy}</div>
          <div className={learnerKpiLabel}>AI Agents Operational</div>
          <div className={cn(learnerCaption, "mt-0.5")}>{aiAgents.length} total agents</div>
        </div>

        <div className={cn(learnerKpiCard, agentsAtRisk > 0 && "border-rose-200 bg-rose-50/30")}>
          <div className={cn(learnerIconWell, "mb-3 bg-rose-500/10")}>
            <Bot className="h-5 w-5 text-rose-500" />
          </div>
          <div className={cn(learnerKpiValue, agentsAtRisk > 0 && "text-rose-700")}>{agentsAtRisk}</div>
          <div className={cn(learnerKpiLabel, "flex items-center")}>
            AI Agents At Risk
            <Tip text="Agents that are degraded or paused — student Q&A in those subject areas may be affected." />
          </div>
          <div className={cn(learnerCaption, "mt-0.5")}>Degraded or paused</div>
        </div>
      </div>

      {/* Human Faculty table */}
      <Card className={cn(learnerPanel, "border-slate-200/80")}>
        <CardHeader>
          <CardTitle className={cn(learnerSectionHeading, "flex items-center gap-2")}><UserCheck className="h-4 w-4 text-slate-500" />Human Faculty — Content Activity</CardTitle>
          <CardDescription className={learnerBodyMuted}>Instructors create and publish course content. Flags appear when content is overdue or drafts are stalled.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Table>
              <TableHeader><TableRow className="bg-slate-50">
                <TableHead>Instructor</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Active Students</TableHead>
                <TableHead className="text-right">
                  <span className="flex items-center justify-end gap-1">Last Published <Tip text="Days since the instructor last published content, uploaded a quiz, or posted an announcement." /></span>
                </TableHead>
                <TableHead className="text-right">Drafts Pending</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {humanFaculty.map((f) => (
                  <TableRow key={f.id} className={f.status !== "active" ? "bg-amber-50/20" : ""}>
                    <TableCell>
                      <div className={learnerItemTitle}>{f.name}</div>
                      <div className={learnerCaption}>Rating: {f.rating}</div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{f.course}</TableCell>
                    <TableCell className="text-right text-slate-700">{f.activeStudents.toLocaleString()}</TableCell>
                    <TableCell className={cn("text-right font-medium", f.lastPublishedDaysAgo > 14 ? "text-rose-600 font-bold" : "text-slate-700")}>
                      {f.lastPublishedDaysAgo === 0 ? "Today" : f.lastPublishedDaysAgo === 1 ? "Yesterday" : `${f.lastPublishedDaysAgo}d ago`}
                    </TableCell>
                    <TableCell className={cn("text-right font-medium", f.draftsPending > 0 ? "text-amber-700" : "text-slate-400")}>{f.draftsPending}</TableCell>
                    <TableCell><Badge className={`border text-xs font-semibold ${humanBadge(f.status)}`}>{humanStatusLabel(f.status)}</Badge></TableCell>
                    <TableCell className="text-right">
                      {(f.status === "drafts-pending" || f.status === "no-content") && (
                        <Button size="sm" variant="outline" className="text-xs h-7"
                          disabled={reminded.has(f.id)}
                          onClick={() => { setReminded((p) => new Set(p).add(f.id)); toast({ title: "Reminder sent", description: `${f.name} has been reminded to publish pending content.` }); }}
                        >
                          {reminded.has(f.id) ? "Sent" : "Send Reminder"}
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

      {/* AI Faculty table */}
      <Card className={cn(learnerPanel, "border-slate-200/80")}>
        <CardHeader>
          <CardTitle className={cn(learnerSectionHeading, "flex items-center gap-2")}><Bot className="h-4 w-4 text-slate-500" />AI Faculty — Agent Health</CardTitle>
          <CardDescription className={learnerBodyMuted}>6 AI agents handle all student Q&amp;A, each trained on materials from the corresponding instructor. Escalate degraded or paused agents to the technical team.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Table>
              <TableHeader><TableRow className="bg-slate-50">
                <TableHead>Agent</TableHead>
                <TableHead>Subject Area</TableHead>
                <TableHead className="text-right">Q&amp;A (7d)</TableHead>
                <TableHead className="text-right">
                  <span className="flex items-center justify-end gap-1">Escalation Rate <Tip text="% of questions the AI couldn't resolve and flagged for human review." /></span>
                </TableHead>
                <TableHead className="text-right">
                  <span className="flex items-center justify-end gap-1">Coverage Gaps <Tip text="Topics students asked about with no trained material available." /></span>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {aiAgents.map((a) => {
                  const needsEscalation = a.status !== "operational" || a.escalationRate > 10 || a.coverageGaps > 2;
                  return (
                    <TableRow key={a.id} className={needsEscalation ? "bg-rose-50/20" : ""}>
                      <TableCell className={learnerItemTitle}>{a.name}</TableCell>
                      <TableCell className="text-sm text-slate-600">{a.subject}</TableCell>
                      <TableCell className="text-right text-slate-700">{a.qaVolume7d.toLocaleString()}</TableCell>
                      <TableCell className={cn("text-right font-medium", a.escalationRate > 10 ? "text-rose-600 font-bold" : "text-slate-700")}>
                        {a.status === "paused" ? "—" : `${a.escalationRate}%`}
                      </TableCell>
                      <TableCell className={cn("text-right font-medium", a.coverageGaps > 2 ? "text-amber-700" : "text-slate-500")}>
                        {a.status === "paused" ? "—" : a.coverageGaps}
                      </TableCell>
                      <TableCell><Badge className={`border text-xs font-semibold capitalize ${agentBadge(a.status)}`}>{a.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        {needsEscalation ? (
                          <Button size="sm" variant="outline" className="text-xs h-7"
                            disabled={escalated.has(a.id)}
                            onClick={() => { setEscalated((p) => new Set(p).add(a.id)); toast({ title: "Escalated to Support", description: `${a.name} (${a.subject}) has been flagged for the technical team.` }); }}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            {escalated.has(a.id) ? "Escalated" : "Escalate"}
                          </Button>
                        ) : a.coverageGaps > 0 ? (
                          <Button size="sm" variant="outline" className="text-xs h-7"
                            disabled={escalated.has(a.id + "-gap")}
                            onClick={() => { setEscalated((p) => new Set(p).add(a.id + "-gap")); toast({ title: "Flagged to content team", description: `${a.coverageGaps} coverage gap${a.coverageGaps > 1 ? "s" : ""} in ${a.subject} flagged for the content team to address with new material.` }); }}
                          >
                            {escalated.has(a.id + "-gap") ? "Flagged" : "Flag Coverage Gap"}
                          </Button>
                        ) : null}
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
