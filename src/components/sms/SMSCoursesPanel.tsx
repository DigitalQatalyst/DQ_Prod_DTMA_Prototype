import { useState } from "react";
import { Bot, FileText, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import AnalyticsPerformanceInsightsPanel from "@/components/admin/stage4/AnalyticsPerformanceInsightsPanel";

// ── Human Faculty Content Health ──────────────────────────────────────────────

interface HumanFacultyRecord {
  id: string;
  name: string;
  course: string;
  lastPublishedDaysAgo: number;
  draftsPending: number;
  status: "active" | "overdue" | "inactive";
}

const humanFaculty: HumanFacultyRecord[] = [
  { id: "HF-01", name: "Aisha Mensah",  course: "Digital Transformation",  lastPublishedDaysAgo: 1,  draftsPending: 0, status: "active"   },
  { id: "HF-02", name: "James Okafor",  course: "AI in Workplace",          lastPublishedDaysAgo: 3,  draftsPending: 2, status: "overdue"  },
  { id: "HF-03", name: "Sofia Reyes",   course: "Agile Management",         lastPublishedDaysAgo: 16, draftsPending: 3, status: "inactive" },
  { id: "HF-04", name: "Kwame Asante",  course: "Cybersecurity Essentials", lastPublishedDaysAgo: 2,  draftsPending: 0, status: "active"   },
];

function humanStatusBadge(s: HumanFacultyRecord["status"]) {
  if (s === "active")   return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "inactive") return "border-rose-200 bg-rose-50 text-rose-700";
  return "border-amber-200 bg-amber-50 text-amber-800";
}

// ── AI Faculty Health ─────────────────────────────────────────────────────────

interface AIAgentRecord {
  id: string;
  name: string;
  subject: string;
  status: "operational" | "degraded" | "paused";
  qaVolume7d: number;       // questions handled in last 7 days
  escalationRate: number;   // % questions AI couldn't resolve
  coverageGaps: number;     // topics flagged with no trained material
}

const aiAgents: AIAgentRecord[] = [
  { id: "AI-01", name: "Nexus",   subject: "Digital Transformation",  status: "operational", qaVolume7d: 214, escalationRate: 3,  coverageGaps: 0 },
  { id: "AI-02", name: "Cipher",  subject: "AI & Automation",         status: "operational", qaVolume7d: 189, escalationRate: 7,  coverageGaps: 2 },
  { id: "AI-03", name: "Sprint",  subject: "Agile Management",        status: "degraded",    qaVolume7d: 142, escalationRate: 18, coverageGaps: 4 },
  { id: "AI-04", name: "Shield",  subject: "Cybersecurity",           status: "operational", qaVolume7d: 97,  escalationRate: 4,  coverageGaps: 0 },
  { id: "AI-05", name: "Ledger",  subject: "Finance & Compliance",    status: "operational", qaVolume7d: 76,  escalationRate: 5,  coverageGaps: 1 },
  { id: "AI-06", name: "Catalyst",subject: "Leadership & Strategy",   status: "paused",      qaVolume7d: 0,   escalationRate: 0,  coverageGaps: 0 },
];

function agentStatusBadge(s: AIAgentRecord["status"]) {
  if (s === "operational") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "paused")      return "border-slate-200 bg-slate-100 text-slate-600";
  return "border-rose-200 bg-rose-50 text-rose-700";
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SMSCoursesPanel() {
  const { toast } = useToast();
  const [reminded, setReminded]   = useState<Set<string>>(new Set());
  const [escalated, setEscalated] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-6">

      {/* Human Faculty — Content Activity */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-slate-500" />
            Human Faculty — Content Activity
          </CardTitle>
          <CardDescription>
            Instructors create and publish course content. Flags appear when content is overdue or drafts are stalled.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Table>
              <TableHeader><TableRow className="bg-slate-50">
                <TableHead>Instructor</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Last Published</TableHead>
                <TableHead className="text-right">Drafts Pending</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {humanFaculty.map((f) => (
                  <TableRow key={f.id} className={f.status !== "active" ? "bg-amber-50/20" : ""}>
                    <TableCell className="font-medium text-slate-900">{f.name}</TableCell>
                    <TableCell className="text-sm text-slate-600">{f.course}</TableCell>
                    <TableCell className={cn("text-right font-medium", f.lastPublishedDaysAgo > 14 ? "text-rose-600 font-bold" : "text-slate-700")}>
                      {f.lastPublishedDaysAgo === 0 ? "Today" : f.lastPublishedDaysAgo === 1 ? "Yesterday" : `${f.lastPublishedDaysAgo}d ago`}
                    </TableCell>
                    <TableCell className={cn("text-right font-medium", f.draftsPending > 0 ? "text-amber-700" : "text-slate-500")}>
                      {f.draftsPending}
                    </TableCell>
                    <TableCell>
                      <Badge className={`border text-xs font-semibold capitalize ${humanStatusBadge(f.status)}`}>{f.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {f.status !== "active" && (
                        <Button
                          size="sm" variant="outline" className="text-xs h-7"
                          disabled={reminded.has(f.id)}
                          onClick={() => {
                            setReminded((prev) => new Set(prev).add(f.id));
                            toast({ title: "Reminder sent", description: `${f.name} has been reminded to publish pending content.` });
                          }}
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

      {/* AI Faculty — Agent Health */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-slate-500" />
            AI Faculty — Agent Health
          </CardTitle>
          <CardDescription>
            6 AI agents handle all student Q&amp;A. Each is trained on materials from the corresponding human instructor.
            Escalate when an agent is degraded or its escalation rate is high.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Table>
              <TableHeader><TableRow className="bg-slate-50">
                <TableHead>Agent</TableHead>
                <TableHead>Subject Area</TableHead>
                <TableHead className="text-right">Q&amp;A (7d)</TableHead>
                <TableHead className="text-right">Escalation Rate</TableHead>
                <TableHead className="text-right">Coverage Gaps</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {aiAgents.map((a) => {
                  const needsEscalation = a.status === "degraded" || a.status === "paused" || a.escalationRate > 10 || a.coverageGaps > 2;
                  return (
                    <TableRow key={a.id} className={needsEscalation ? "bg-rose-50/20" : ""}>
                      <TableCell className="font-medium text-slate-900">{a.name}</TableCell>
                      <TableCell className="text-sm text-slate-600">{a.subject}</TableCell>
                      <TableCell className="text-right text-slate-700">{a.qaVolume7d.toLocaleString()}</TableCell>
                      <TableCell className={cn("text-right font-medium", a.escalationRate > 10 ? "text-rose-600 font-bold" : "text-slate-700")}>
                        {a.status === "paused" ? "—" : `${a.escalationRate}%`}
                      </TableCell>
                      <TableCell className={cn("text-right font-medium", a.coverageGaps > 2 ? "text-amber-700" : "text-slate-500")}>
                        {a.status === "paused" ? "—" : a.coverageGaps}
                      </TableCell>
                      <TableCell>
                        <Badge className={`border text-xs font-semibold capitalize ${agentStatusBadge(a.status)}`}>{a.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {needsEscalation && (
                          <Button
                            size="sm" variant="outline" className="text-xs h-7"
                            disabled={escalated.has(a.id)}
                            onClick={() => {
                              setEscalated((prev) => new Set(prev).add(a.id));
                              toast({ title: "Escalated to Support", description: `${a.name} (${a.subject}) has been flagged for the technical team to review.` });
                            }}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            {escalated.has(a.id) ? "Escalated" : "Escalate"}
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

      {/* Full courses & faculty panel */}
      <AnalyticsPerformanceInsightsPanel />
    </div>
  );
}
