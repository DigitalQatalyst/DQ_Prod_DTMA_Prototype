import { useState } from "react";
import { AlertTriangle, Info, Package, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  paymentStatus: "paid" | "partial" | "unpaid";
}

interface IssuedCertificate {
  id: string;
  student: string;
  course: string;
  issuedDate: string;
}

interface PendingAction {
  id: string;
  student: string;
  type: "hard-copy" | "name-correction" | "revocation" | "re-issue";
  detail: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const studentRecords: StudentRecord[] = [
  { id: "S-001", name: "Amina Osei",   email: "amina@example.com",  enrolled: 3, completed: 2, certificates: 2, lastActiveDaysAgo: 1,  paymentStatus: "paid"    },
  { id: "S-002", name: "Noah Mensah",  email: "noah@example.com",   enrolled: 2, completed: 2, certificates: 2, lastActiveDaysAgo: 2,  paymentStatus: "paid"    },
  { id: "S-003", name: "Irene Mwangi", email: "irene@example.com",  enrolled: 1, completed: 0, certificates: 0, lastActiveDaysAgo: 21, paymentStatus: "unpaid"  },
  { id: "S-004", name: "Kwame Asante", email: "kwame@example.com",  enrolled: 4, completed: 3, certificates: 3, lastActiveDaysAgo: 4,  paymentStatus: "partial" },
  { id: "S-005", name: "Sofia Reyes",  email: "sofia@example.com",  enrolled: 2, completed: 1, certificates: 1, lastActiveDaysAgo: 8,  paymentStatus: "paid"    },
];

const issuedCertificates: IssuedCertificate[] = [
  { id: "C-01", student: "Amina Osei",   course: "Digital Transformation Fundamentals", issuedDate: "2026-04-10" },
  { id: "C-02", student: "Amina Osei",   course: "AI & Automation in the Workplace",    issuedDate: "2026-04-08" },
  { id: "C-03", student: "Noah Mensah",  course: "Digital Transformation Fundamentals", issuedDate: "2026-04-05" },
  { id: "C-04", student: "Noah Mensah",  course: "Agile Project Management",            issuedDate: "2026-03-28" },
  { id: "C-05", student: "Kwame Asante", course: "Cybersecurity Essentials",            issuedDate: "2026-03-20" },
  { id: "C-06", student: "Kwame Asante", course: "AI & Automation in the Workplace",    issuedDate: "2026-03-15" },
  { id: "C-07", student: "Kwame Asante", course: "Agile Project Management",            issuedDate: "2026-03-10" },
  { id: "C-08", student: "Sofia Reyes",  course: "Digital Transformation Fundamentals", issuedDate: "2026-03-01" },
];

const completionByCourse = [
  { course: "Digital Transformation Fundamentals", enrolled: 342, completed: 246, rate: 72 },
  { course: "AI & Automation in the Workplace",    enrolled: 219, completed: 142, rate: 65 },
  { course: "Agile Project Management",            enrolled: 187, completed: 108, rate: 58 },
  { course: "Cybersecurity Essentials",            enrolled: 154, completed: 125, rate: 81 },
];

const initialPendingActions: PendingAction[] = [
  { id: "PA-01", student: "Amina Osei",   type: "hard-copy",       detail: "DT Strategy Certificate — Nairobi, Kenya"                    },
  { id: "PA-02", student: "Amina Osei",   type: "name-correction", detail: "Legal name differs from display name in LMS"                  },
  { id: "PA-03", student: "Irene Mwangi", type: "revocation",      detail: "Executive Change Leadership Badge — payment not completed"    },
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

function paymentBadge(s: string) {
  if (s === "paid")    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "partial") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-rose-200 bg-rose-50 text-rose-700";
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

  const totalCerts = issuedCertificates.length;
  const atRiskCount = studentRecords.filter((s) => s.paymentStatus === "unpaid" && s.completed === 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[28px] leading-[36px] font-semibold">Students &amp; Certificates</h2>
        <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
          Student progress, certificate outcomes, and any items needing your approval.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="text-[24px] leading-[32px] font-medium">{studentRecords.length}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Total Students <Tip text="All students currently enrolled in at least one course in your academy." />
          </div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="text-[24px] leading-[32px] font-medium">{totalCerts}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Certificates Issued <Tip text="Total digital certificates auto-issued to students who completed all required modules. No manual action needed for these." />
          </div>
        </div>
        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", atRiskCount > 0 ? "border-rose-200 bg-rose-50/30" : "border-slate-200/80")}>
          <div className={cn("text-[24px] leading-[32px] font-medium", atRiskCount > 0 ? "text-rose-700" : "")}>{atRiskCount}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Students At Risk <Tip text="Students who are unpaid and have not completed any courses. They may need a follow-up." />
          </div>
        </div>
      </div>

      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-slate-100 p-2">
          <TabsTrigger value="students"     className="rounded-xl px-4 py-2">Students</TabsTrigger>
          <TabsTrigger value="certificates" className="rounded-xl px-4 py-2">
            Certificates
            {pendingActions.length > 0 && (
              <span className="ml-2 rounded-full bg-amber-500 px-1.5 py-0.5 text-xs text-white">{pendingActions.length}</span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Students tab */}
        <TabsContent value="students">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Student Progress</CardTitle>
              <CardDescription>Enrollment, completion, and payment status for all students. At-risk students are highlighted.</CardDescription>
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
                    <TableHead className="text-right">Completed</TableHead>
                    <TableHead>
                      <span className="flex items-center gap-1">
                        Progress <Tip text="Courses completed as a percentage of courses enrolled." />
                      </span>
                    </TableHead>
                    <TableHead>
                      <span className="flex items-center gap-1">
                        Last Active <Tip text="Days since the student last logged in and engaged with course content." />
                      </span>
                    </TableHead>
                    <TableHead>Payment</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {filtered.map((s) => {
                      const pct = s.enrolled > 0 ? Math.round((s.completed / s.enrolled) * 100) : 0;
                      const atRisk = s.paymentStatus === "unpaid" && s.completed === 0;
                      const barColor = pct >= 80 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-400" : "bg-rose-500";
                      return (
                        <TableRow key={s.id} className={atRisk ? "bg-rose-50/40" : ""}>
                          <TableCell>
                            <div className="font-medium text-slate-900">{s.name}</div>
                            <div className="text-xs text-slate-500">{s.email}</div>
                          </TableCell>
                          <TableCell className="text-right">{s.enrolled}</TableCell>
                          <TableCell className="text-right">{s.completed}</TableCell>
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
                            <Badge className={`border text-xs font-semibold capitalize ${paymentBadge(s.paymentStatus)}`}>{s.paymentStatus}</Badge>
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

        {/* Certificates tab */}
        <TabsContent value="certificates" className="space-y-6">

          {/* Pending approvals — surfaced inline at the top */}
          {pendingActions.length > 0 && (
            <Card className="border-amber-200 bg-amber-50/40 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="h-4 w-4" /> Pending Approvals
                </CardTitle>
                <CardDescription>These items need your sign-off before the system can proceed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingActions.map((a) => (
                  <div key={a.id} className="rounded-2xl border border-amber-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">{a.student}</span>
                          <Badge className="border border-slate-200 bg-slate-50 text-slate-600 text-xs">{actionLabel[a.type]}</Badge>
                        </div>
                        <div className="text-sm text-slate-600">{a.detail}</div>
                        <div className="text-xs text-amber-800 mt-1">
                          <span className="font-semibold">What to do: </span>{actionGuide[a.type]}
                        </div>
                      </div>
                      <Button size="sm" className="shrink-0" onClick={() => approveAction(a.id, a.student)}>
                        <Package className="mr-1 h-3.5 w-3.5" /> Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Completion rate by course */}
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Completion Rate by Course</CardTitle>
              <CardDescription>
                How many enrolled students have earned a certificate in each course.
                <span className="ml-1 inline-flex items-center">
                  <Tip text="Completion rate = students who finished all required modules ÷ total enrolled. Certificates are issued automatically when a student completes a course." />
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {completionByCourse.map((c) => (
                <div key={c.course} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-800 truncate">{c.course}</span>
                      <span className="text-sm text-slate-500 ml-3 shrink-0">{c.completed}/{c.enrolled}</span>
                    </div>
                    <Progress
                      value={c.rate}
                      className={`h-2 [&>div]:${c.rate >= 75 ? "bg-emerald-500" : c.rate >= 55 ? "bg-amber-400" : "bg-rose-500"}`}
                    />
                  </div>
                  <span className={cn("text-sm font-semibold w-10 text-right shrink-0",
                    c.rate >= 75 ? "text-emerald-700" : c.rate >= 55 ? "text-amber-700" : "text-rose-700"
                  )}>{c.rate}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recently issued */}
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Recently Issued Certificates</CardTitle>
              <CardDescription>Certificates auto-issued in the last 30 days. No action required.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow className="bg-slate-50">
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Issued</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {issuedCertificates.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium text-slate-900">{c.student}</TableCell>
                      <TableCell className="text-sm text-slate-600">{c.course}</TableCell>
                      <TableCell className="text-sm text-slate-500">{c.issuedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
