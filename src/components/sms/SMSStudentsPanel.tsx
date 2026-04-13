import { useState } from "react";
import { AlertTriangle, FileText, Info, Package, Search, Truck, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// ── Types ─────────────────────────────────────────────────────────────────────

type ExceptionType = "name-correction" | "revocation" | "re-issue";
type ExceptionStatus = "open" | "in-review" | "resolved";
type HardCopyStatus = "pending-approval" | "sent-to-vendor" | "shipped" | "delivered" | "blocked";

interface CertificateException {
  id: string;
  learner: string;
  credential: string;
  type: ExceptionType;
  reason: string;
  status: ExceptionStatus;
  raisedAt: string;
}

interface HardCopyOrder {
  id: string;
  learner: string;
  credential: string;
  address: string;
  digitalValid: boolean;
  paymentClear: boolean;
  status: HardCopyStatus;
  tracking: string | null;
}

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  enrolled: number;
  completed: number;
  certificates: number;
  paymentStatus: "paid" | "partial" | "unpaid";
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const initialExceptions: CertificateException[] = [
  { id: "EX-01", learner: "Amina Osei", credential: "DT Strategy Certificate", type: "name-correction", reason: "Legal name differs from display name in LMS", status: "open", raisedAt: "2026-04-01T08:10:00Z" },
  { id: "EX-02", learner: "Irene Mwangi", credential: "Executive Change Leadership Badge", type: "revocation", reason: "Enrollment cancelled — payment not completed", status: "in-review", raisedAt: "2026-03-31T14:30:00Z" },
  { id: "EX-03", learner: "Noah Mensah", credential: "AI Operations Micro-Credential", type: "re-issue", reason: "Student changed email address — needs re-delivery", status: "resolved", raisedAt: "2026-03-29T11:00:00Z" },
];

const initialHardCopies: HardCopyOrder[] = [
  { id: "HC-01", learner: "Amina Osei", credential: "DT Strategy Certificate", address: "Nairobi, Kenya", digitalValid: true, paymentClear: true, status: "pending-approval", tracking: null },
  { id: "HC-02", learner: "Noah Mensah", credential: "AI Operations Micro-Credential", address: "Accra, Ghana", digitalValid: true, paymentClear: true, status: "shipped", tracking: "DHL-9938174" },
  { id: "HC-03", learner: "Irene Mwangi", credential: "Executive Change Leadership Badge", address: "Kampala, Uganda", digitalValid: false, paymentClear: false, status: "blocked", tracking: null },
];

const studentRecords: StudentRecord[] = [
  { id: "S-001", name: "Amina Osei", email: "amina@example.com", enrolled: 3, completed: 2, certificates: 2, paymentStatus: "paid" },
  { id: "S-002", name: "Noah Mensah", email: "noah@example.com", enrolled: 2, completed: 2, certificates: 2, paymentStatus: "paid" },
  { id: "S-003", name: "Irene Mwangi", email: "irene@example.com", enrolled: 1, completed: 0, certificates: 0, paymentStatus: "unpaid" },
  { id: "S-004", name: "Kwame Asante", email: "kwame@example.com", enrolled: 4, completed: 3, certificates: 3, paymentStatus: "partial" },
  { id: "S-005", name: "Sofia Reyes", email: "sofia@example.com", enrolled: 2, completed: 1, certificates: 1, paymentStatus: "paid" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function statusClass(s: string) {
  switch (s) {
    case "resolved": case "delivered": case "paid": return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "open": case "pending-approval": case "partial": return "border-amber-200 bg-amber-50 text-amber-800";
    case "in-review": case "sent-to-vendor": case "shipped": return "border-sky-200 bg-sky-50 text-sky-700";
    case "blocked": case "revocation": case "unpaid": return "border-rose-200 bg-rose-50 text-rose-700";
    default: return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

const typeLabel: Record<ExceptionType, string> = {
  "name-correction": "Name correction",
  "revocation":      "Revocation",
  "re-issue":        "Re-issue",
};

const typeAction: Record<ExceptionType, string> = {
  "name-correction": "Verify the correct legal name with the student, then update it in the LMS before marking resolved.",
  "revocation":      "Confirm the reason is valid (e.g. payment failure, policy breach), then mark resolved to trigger certificate deactivation.",
  "re-issue":        "Confirm the student's new details are correct in the LMS, then mark resolved to trigger re-delivery.",
};

const relTime = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  return days === 0 ? "today" : `${days}d ago`;
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function SMSStudentsPanel() {
  const { toast } = useToast();
  const [exceptions, setExceptions] = useState(initialExceptions);
  const [hardCopies, setHardCopies] = useState(initialHardCopies);
  const [search, setSearch] = useState("");

  const filteredStudents = studentRecords.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const resolveException = (id: string) => {
    setExceptions((cur) => cur.map((e) => e.id === id ? { ...e, status: "resolved" as ExceptionStatus } : e));
    toast({ title: "Exception resolved", description: `Case ${id} marked as resolved.` });
  };

  const approveHardCopy = (id: string) => {
    const order = hardCopies.find((h) => h.id === id);
    if (!order) return;
    if (!order.digitalValid || !order.paymentClear) {
      toast({ title: "Cannot approve", description: "Digital certificate must be valid and payment must be clear first.", variant: "destructive" });
      return;
    }
    setHardCopies((cur) => cur.map((h) => h.id === id ? { ...h, status: "sent-to-vendor" as HardCopyStatus } : h));
    toast({ title: "Order approved", description: `${order.learner}'s hard copy sent to print vendor.` });
  };

  const openExceptions = exceptions.filter((e) => e.status !== "resolved").length;
  const pendingHardCopies = hardCopies.filter((h) => h.status === "pending-approval").length;

  return (
    <div className="space-y-6">
      {/* Header — plain, matching Courses & Faculty */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[28px] leading-[36px] font-semibold">Students &amp; Certificates</h2>
          <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
            Student records, certificate exceptions, and hard-copy order tracking. Digital certificates are auto-issued on completion.
          </p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center mb-3">
            <UserCheck className="w-5 h-5 text-[#ff6b4d]" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{studentRecords.length}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Total Students</div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{openExceptions}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Certificate Exceptions</div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center mb-3">
            <Package className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{pendingHardCopies}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Hard Copy Approvals</div>
        </div>
      </div>

      <Tabs defaultValue="records" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-slate-100 p-2">
          <TabsTrigger value="records" className="rounded-xl px-4 py-2 data-[state=active]:bg-white">Student Records</TabsTrigger>
          <TabsTrigger value="exceptions" className="rounded-xl px-4 py-2 data-[state=active]:bg-white">
            Certificate Exceptions
            {openExceptions > 0 && <span className="ml-2 rounded-full bg-amber-500 px-1.5 py-0.5 text-xs text-white">{openExceptions}</span>}
          </TabsTrigger>
          <TabsTrigger value="hardcopy" className="rounded-xl px-4 py-2 data-[state=active]:bg-white">
            Hard Copy Orders
            {pendingHardCopies > 0 && <span className="ml-2 rounded-full bg-sky-500 px-1.5 py-0.5 text-xs text-white">{pendingHardCopies}</span>}
          </TabsTrigger>
        </TabsList>

        {/* Student Records */}
        <TabsContent value="records">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Student Records</CardTitle>
              <CardDescription>Academic and payment status for all enrolled students. Digital certificates are auto-issued on completion.</CardDescription>
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
                    <TableHead className="text-right">Certificates</TableHead>
                    <TableHead>
                      <span className="flex items-center gap-1">
                        Progress
                        <TooltipProvider><Tooltip><TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-slate-400 cursor-default" />
                        </TooltipTrigger><TooltipContent side="top" className="max-w-[200px] text-xs">
                          Courses completed as a percentage of courses enrolled.
                        </TooltipContent></Tooltip></TooltipProvider>
                      </span>
                    </TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>
                      <span className="flex items-center gap-1">
                        Status
                        <TooltipProvider><Tooltip><TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-slate-400 cursor-default" />
                        </TooltipTrigger><TooltipContent side="top" className="max-w-[220px] text-xs">
                          At Risk: unpaid with no completions. Needs Attention: partial payment or low progress. On Track: paid and progressing.
                        </TooltipContent></Tooltip></TooltipProvider>
                      </span>
                    </TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {filteredStudents.map((s) => {
                      const pct = s.enrolled > 0 ? Math.round((s.completed / s.enrolled) * 100) : 0;
                      const atRisk = s.paymentStatus === "unpaid" && s.completed === 0;
                      const needsAttention = !atRisk && (s.paymentStatus !== "paid" || pct < 40);
                      const statusLabel = atRisk ? "At Risk" : needsAttention ? "Needs Attention" : "On Track";
                      const statusCls = atRisk
                        ? "border-rose-200 bg-rose-50 text-rose-700"
                        : needsAttention
                        ? "border-amber-200 bg-amber-50 text-amber-800"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700";
                      const barColor = pct >= 80 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-400" : "bg-rose-500";
                      return (
                        <TableRow key={s.id}>
                          <TableCell>
                            <div className="font-medium text-slate-900">{s.name}</div>
                            <div className="text-xs text-slate-500">{s.email}</div>
                          </TableCell>
                          <TableCell className="text-right">{s.enrolled}</TableCell>
                          <TableCell className="text-right">{s.completed}</TableCell>
                          <TableCell className="text-right">{s.certificates}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={pct} className={`h-2 w-16 [&>div]:${barColor}`} />
                              <span className="text-xs text-slate-500">{pct}%</span>
                            </div>
                          </TableCell>
                          <TableCell><Badge className={`border text-xs font-semibold capitalize ${statusClass(s.paymentStatus)}`}>{s.paymentStatus}</Badge></TableCell>
                          <TableCell><Badge className={`border text-xs font-semibold ${statusCls}`}>{statusLabel}</Badge></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificate Exceptions */}
        <TabsContent value="exceptions">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Certificate Exceptions</CardTitle>
              <CardDescription>
                Corrections, revocations, and re-issues that require human review. Routine digital issuance is automatic and does not appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {exceptions.map((ex) => (
                <div key={ex.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                        <span className="font-medium text-slate-900">{ex.learner}</span>
                        <Badge className="border border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold">{typeLabel[ex.type]}</Badge>
                      </div>
                      <div className="text-sm text-slate-600">{ex.credential}</div>
                      <div className="text-sm text-slate-500">{ex.reason}</div>
                      {ex.status !== "resolved" && (
                        <div className="mt-2 rounded-xl bg-amber-50 border border-amber-100 px-3 py-2 text-xs text-amber-800">
                          <span className="font-semibold">What to do: </span>{typeAction[ex.type]}
                        </div>
                      )}
                      <div className="text-xs text-slate-400">Raised {relTime(ex.raisedAt)}</div>
                    </div>
                    <Badge className={`shrink-0 border text-xs font-semibold capitalize ${statusClass(ex.status)}`}>{ex.status.replace("-", " ")}</Badge>
                  </div>
                  {ex.status !== "resolved" && (
                    <div className="mt-3">
                      <Button size="sm" onClick={() => resolveException(ex.id)}>Mark resolved</Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hard Copy Orders */}
        <TabsContent value="hardcopy">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Hard Copy Orders</CardTitle>
              <CardDescription>
                Approve print orders before they go to the vendor. The vendor handles all printing, packaging, and shipping. You track status and approve replacements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <Table>
                  <TableHeader><TableRow className="bg-slate-50">
                    <TableHead>Student</TableHead>
                    <TableHead>Controls</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tracking</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {hardCopies.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="font-medium text-slate-900">{order.learner}</div>
                          <div className="text-xs text-slate-500">{order.credential}</div>
                          <div className="text-xs text-slate-400">{order.address}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-xs">
                            <div className={order.digitalValid ? "text-emerald-600" : "text-rose-600"}>
                              {order.digitalValid ? "✓" : "✗"} Digital valid
                            </div>
                            <div className={order.paymentClear ? "text-emerald-600" : "text-rose-600"}>
                              {order.paymentClear ? "✓" : "✗"} Payment clear
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`border text-xs font-semibold ${statusClass(order.status)}`}>
                            {order.status.replace(/-/g, " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">{order.tracking ?? "—"}</TableCell>
                        <TableCell className="text-right">
                          {order.status === "pending-approval" && (
                            <Button size="sm" onClick={() => approveHardCopy(order.id)}>
                              <Package className="mr-1 h-3.5 w-3.5" />
                              Approve
                            </Button>
                          )}
                          {order.status === "shipped" && (
                            <div className="flex items-center justify-end gap-1 text-xs text-sky-600">
                              <Truck className="h-3.5 w-3.5" />
                              In transit
                            </div>
                          )}
                          {order.status === "blocked" && (
                            <span className="text-xs text-rose-500">Resolve controls first</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <FileText className="inline h-4 w-4 mr-1 text-slate-400" />
                The print vendor handles all physical fulfillment. Your role is to approve orders and track status. Contact the vendor directly for shipping issues.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
