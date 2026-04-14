import { useState } from "react";
import { AlertCircle, Download, Flag, Info, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// ── Mock data ─────────────────────────────────────────────────────────────────

const monthlyRevenue = [
  { month: "Nov", amount: 38200 },
  { month: "Dec", amount: 41500 },
  { month: "Jan", amount: 44800 },
  { month: "Feb", amount: 47200 },
  { month: "Mar", amount: 52100 },
  { month: "Apr", amount: 58400 },
];

const revenueByCourse = [
  { course: "Digital Transformation Fundamentals", enrolled: 342, paidCount: 298, revenue: 85500 },
  { course: "AI & Automation in the Workplace",    enrolled: 219, paidCount: 187, revenue: 54750 },
  { course: "Agile Project Management",            enrolled: 187, paidCount: 156, revenue: 46750 },
  { course: "Cybersecurity Essentials",            enrolled: 154, paidCount: 141, revenue: 38500 },
];

type PaymentStatus = "paid" | "pending" | "overdue" | "failed";
interface StudentPayment {
  id: string; name: string; email: string; course: string;
  amount: number; status: PaymentStatus; dueDate: string;
}

const studentPayments: StudentPayment[] = [
  { id: "SP-01", name: "Amina Osei",   email: "amina@example.com",  course: "Digital Transformation Fundamentals", amount: 250, status: "paid",    dueDate: "2026-03-01" },
  { id: "SP-02", name: "Noah Mensah",  email: "noah@example.com",   course: "AI & Automation in the Workplace",    amount: 250, status: "paid",    dueDate: "2026-03-01" },
  { id: "SP-03", name: "Irene Mwangi", email: "irene@example.com",  course: "Agile Project Management",            amount: 250, status: "overdue", dueDate: "2026-03-15" },
  { id: "SP-04", name: "Kwame Asante", email: "kwame@example.com",  course: "Cybersecurity Essentials",            amount: 250, status: "pending", dueDate: "2026-04-20" },
  { id: "SP-05", name: "Sofia Reyes",  email: "sofia@example.com",  course: "Digital Transformation Fundamentals", amount: 250, status: "failed",  dueDate: "2026-04-01" },
];

interface BillingIssue {
  id: string; name: string; course: string; amount: number;
  type: "failed-transaction" | "refund-request";
  reason: string; status: "pending" | "under-review" | "resolved";
  dateRaised: string;
}

const billingIssues: BillingIssue[] = [
  { id: "BI-01", name: "Sofia Reyes",  course: "Digital Transformation Fundamentals", amount: 250, type: "failed-transaction", reason: "Payment could not be processed",          status: "pending",      dateRaised: "2026-04-01" },
  { id: "BI-02", name: "Irene Mwangi", course: "Agile Project Management",            amount: 250, type: "refund-request",     reason: "Student requested withdrawal from course", status: "under-review", dateRaised: "2026-03-28" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (n: number) => `$${n.toLocaleString()}`;

const TODAY = new Date("2026-04-14");

function daysFrom(dateStr: string) {
  return Math.round((TODAY.getTime() - new Date(dateStr).getTime()) / 86_400_000);
}

function daysUntil(dateStr: string) {
  return Math.round((new Date(dateStr).getTime() - TODAY.getTime()) / 86_400_000);
}

function paymentBadge(s: PaymentStatus) {
  const map: Record<PaymentStatus, string> = {
    paid:    "border-emerald-200 bg-emerald-50 text-emerald-700",
    pending: "border-amber-200 bg-amber-50 text-amber-800",
    overdue: "border-rose-200 bg-rose-50 text-rose-700",
    failed:  "border-rose-300 bg-rose-100 text-rose-800",
  };
  return map[s];
}

function issueBadge(s: string) {
  if (s === "resolved")     return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "under-review") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-amber-200 bg-amber-50 text-amber-800";
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

export default function SMSFinancePanel() {
  const { toast } = useToast();
  const [remindedMap, setRemindedMap]   = useState<Record<string, string>>({});
  const [flaggedIds,  setFlaggedIds]    = useState<Set<string>>(new Set());
  const [showResolved, setShowResolved] = useState(false);
  const [showAllPayments, setShowAllPayments] = useState(false);

  const thisMonth  = monthlyRevenue[monthlyRevenue.length - 1].amount;
  const lastMonth  = monthlyRevenue[monthlyRevenue.length - 2].amount;
  const growth     = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.amount));

  const totalEnrolled = revenueByCourse.reduce((s, r) => s + r.enrolled, 0);
  const totalPaid     = revenueByCourse.reduce((s, r) => s + r.paidCount, 0);
  const collectionRate = Math.round((totalPaid / totalEnrolled) * 100);

  const overdueStudents = studentPayments.filter((s) => s.status === "overdue");
  const actionablePayments = studentPayments.filter((s) => s.status !== "paid");
  const displayedPayments  = showAllPayments ? studentPayments : actionablePayments;
  const totalOutstanding   = actionablePayments.reduce((s, p) => s + p.amount, 0);

  const openIssues   = billingIssues.filter((b) => b.status !== "resolved");
  const resolvedIssues = billingIssues.filter((b) => b.status === "resolved");
  const failures     = (showResolved ? billingIssues : openIssues).filter((b) => b.type === "failed-transaction");
  const refunds      = (showResolved ? billingIssues : openIssues).filter((b) => b.type === "refund-request");

  const sendReminder = (id: string, name: string) => {
    setRemindedMap((prev) => ({ ...prev, [id]: TODAY.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) }));
    toast({ title: "Reminder sent", description: `Payment reminder sent to ${name}.` });
  };

  const flagUrgent = (id: string, name: string) => {
    setFlaggedIds((prev) => new Set(prev).add(id));
    toast({ title: "Flagged as urgent", description: `Finance team notified about ${name}'s issue.` });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[28px] leading-[36px] font-semibold">Finance &amp; Billing</h2>
          <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
            Revenue overview, student payment tracking, and billing issues for your academy.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => toast({ title: "Export queued", description: "Revenue summary added to export queue." })}>
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      {/* KPI cards — 4 cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Revenue collected */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{fmt(thisMonth)}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Revenue This Month</div>
          <div className={cn("text-[12px] leading-[16px] mt-0.5", growth >= 0 ? "text-emerald-600" : "text-rose-600")}>
            {growth >= 0 ? "+" : ""}{growth}% vs last month
          </div>
        </div>

        {/* Collection rate */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{collectionRate}%</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Collection Rate
            <Tip text="Percentage of enrolled students who have completed payment. Below 80% means a significant share of your enrolled students haven't paid." />
          </div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">{totalPaid} of {totalEnrolled} students paid</div>
        </div>

        {/* Overdue payments */}
        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", overdueStudents.length > 0 ? "border-rose-200 bg-rose-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-rose-500" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", overdueStudents.length > 0 && "text-rose-700")}>{overdueStudents.length}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Overdue Payments</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Students past their due date</div>
        </div>

        {/* Needs attention */}
        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", openIssues.length > 0 ? "border-amber-200 bg-amber-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", openIssues.length > 0 && "text-amber-700")}>{openIssues.length}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Needs Attention
            <Tip text="Failed transactions and refund requests that have not yet been resolved by the finance team." />
          </div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Open billing issues</div>
        </div>
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-slate-100 p-2">
          <TabsTrigger value="revenue"  className="rounded-xl px-4 py-2">Revenue Overview</TabsTrigger>
          <TabsTrigger value="payments" className="rounded-xl px-4 py-2">
            Student Payments
            {actionablePayments.length > 0 && <span className="ml-2 rounded-full bg-rose-500 px-1.5 py-0.5 text-xs text-white">{actionablePayments.length}</span>}
          </TabsTrigger>
          <TabsTrigger value="issues" className="rounded-xl px-4 py-2">
            Billing Issues
            {openIssues.length > 0 && <span className="ml-2 rounded-full bg-amber-500 px-1.5 py-0.5 text-xs text-white">{openIssues.length}</span>}
          </TabsTrigger>
        </TabsList>

        {/* ── Revenue Overview ── */}
        <TabsContent value="revenue" className="space-y-6">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>6-Month Revenue Trend</CardTitle>
              <CardDescription>
                {growth >= 0
                  ? `Revenue is up ${growth}% from last month — ${fmt(thisMonth - lastMonth)} more collected.`
                  : `Revenue is down ${Math.abs(growth)}% from last month — ${fmt(lastMonth - thisMonth)} less collected.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3" style={{ height: "160px" }}>
                {monthlyRevenue.map((m) => {
                  const heightPct = Math.round((m.amount / maxRevenue) * 100);
                  const isLatest  = m.month === monthlyRevenue[monthlyRevenue.length - 1].month;
                  return (
                    <div key={m.month} className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
                      <div
                        className={cn("w-full rounded-t-lg transition-all", isLatest ? "bg-[#ff6b4d]" : "bg-slate-200")}
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-xs text-slate-500 shrink-0">{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Revenue by Course</CardTitle>
              <CardDescription>Gross tuition collected per course. Collection rate below 80% is highlighted.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Enrolled</TableHead>
                  <TableHead className="text-right">
                    <span className="flex items-center justify-end gap-1">
                      Paid Students
                      <Tip text="Students who have completed payment. Enrolled but unpaid students are not counted here." />
                    </span>
                  </TableHead>
                  <TableHead className="text-right">
                    <span className="flex items-center justify-end gap-1">
                      Collection Rate
                      <Tip text="Paid students as a percentage of total enrolled. Below 80% means a significant share haven't paid." />
                    </span>
                  </TableHead>
                  <TableHead className="text-right">
                    <span className="flex items-center justify-end gap-1">
                      Revenue
                      <Tip text="Gross tuition collected from paid students. Does not include pending or failed payments." />
                    </span>
                  </TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {revenueByCourse.map((r) => {
                    const rate = Math.round((r.paidCount / r.enrolled) * 100);
                    const unpaid = r.enrolled - r.paidCount;
                    return (
                      <TableRow key={r.course}>
                        <TableCell className="font-medium">{r.course}</TableCell>
                        <TableCell className="text-right">{r.enrolled}</TableCell>
                        <TableCell className="text-right">{r.paidCount}</TableCell>
                        <TableCell className="text-right">
                          <span className={cn("font-medium", rate < 80 ? "text-amber-700" : "text-emerald-700")}>{rate}%</span>
                          {unpaid > 0 && <div className="text-xs text-slate-400">{unpaid} unpaid</div>}
                        </TableCell>
                        <TableCell className="text-right font-medium">{fmt(r.revenue)}</TableCell>
                      </TableRow>
                    );
                  })}
                  {/* Totals row */}
                  <TableRow className="border-t-2 border-slate-200 font-semibold bg-slate-50/50">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">{totalEnrolled}</TableCell>
                    <TableCell className="text-right">{totalPaid}</TableCell>
                    <TableCell className="text-right">
                      <span className={cn("font-semibold", collectionRate < 80 ? "text-amber-700" : "text-emerald-700")}>{collectionRate}%</span>
                    </TableCell>
                    <TableCell className="text-right">{fmt(revenueByCourse.reduce((s, r) => s + r.revenue, 0))}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Student Payments ── */}
        <TabsContent value="payments">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Student Payments</CardTitle>
              <CardDescription>Standard course fee: $250 per student.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Summary banner */}
              {actionablePayments.length > 0 && (
                <div className="rounded-xl border border-rose-200 bg-rose-50/50 px-4 py-3 text-sm text-rose-800">
                  <span className="font-semibold">{actionablePayments.length} students have outstanding payments</span>
                  {" · "}Total: {fmt(totalOutstanding)}
                  {overdueStudents.length > 0 && ` · ${overdueStudents.length} overdue`}
                </div>
              )}

              {/* View toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAllPayments(false)}
                  className={cn("rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors",
                    !showAllPayments ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  Needs Attention ({actionablePayments.length})
                </button>
                <button
                  onClick={() => setShowAllPayments(true)}
                  className={cn("rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors",
                    showAllPayments ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  All Students ({studentPayments.length})
                </button>
              </div>

              <Table>
                <TableHeader><TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {displayedPayments
                    .slice()
                    .sort((a, b) => {
                      const order: Record<PaymentStatus, number> = { failed: 0, overdue: 1, pending: 2, paid: 3 };
                      return order[a.status] - order[b.status];
                    })
                    .map((s) => {
                      const reminded = remindedMap[s.id];
                      const daysOver = s.status === "overdue" ? daysFrom(s.dueDate) : null;
                      const daysLeft = s.status === "pending" ? daysUntil(s.dueDate) : null;
                      return (
                        <TableRow key={s.id} className={cn(s.status === "overdue" || s.status === "failed" ? "bg-rose-50/30" : "")}>
                          <TableCell>
                            <div className="font-medium text-slate-900">{s.name}</div>
                            {reminded && <div className="text-xs text-slate-400">Reminded {reminded}</div>}
                          </TableCell>
                          <TableCell className="text-sm text-slate-600 max-w-[160px] truncate">{s.course}</TableCell>
                          <TableCell>
                            <Badge className={`border text-xs font-semibold capitalize ${paymentBadge(s.status)}`}>{s.status}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {daysOver !== null && <span className="text-rose-600 font-medium">{daysOver}d overdue</span>}
                            {daysLeft !== null && daysLeft <= 7 && <span className="text-amber-700 font-medium">Due in {daysLeft}d</span>}
                            {daysLeft !== null && daysLeft > 7 && <span className="text-slate-500">{s.dueDate}</span>}
                            {s.status === "paid" && <span className="text-slate-400">—</span>}
                          </TableCell>
                          <TableCell className="text-right">
                            {(s.status === "overdue" || s.status === "failed") && (
                              <Button
                                size="sm" variant="outline"
                                disabled={!!reminded}
                                onClick={() => sendReminder(s.id, s.name)}
                              >
                                {reminded ? "Reminded" : "Send reminder"}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Billing Issues ── */}
        <TabsContent value="issues">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Billing Issues</CardTitle>
              <CardDescription>
                The finance team handles all resolutions. Flag an issue as urgent to notify them immediately.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Finance contact banner */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Need urgent help? Contact the finance team: <span className="font-medium">finance@academy.com</span> · ext. 204
              </div>

              {/* Summary */}
              {openIssues.length > 0 && (
                <div className="text-sm text-slate-600">
                  <span className="font-semibold">{openIssues.length} open {openIssues.length === 1 ? "issue" : "issues"}</span>
                  {" · "}Total value: {fmt(openIssues.reduce((s, b) => s + b.amount, 0))}
                </div>
              )}

              {/* Payment Failures */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-700">Payment Failures</h3>
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">{failures.length}</span>
                </div>
                {failures.length === 0 && <p className="text-sm text-slate-400 py-2">No payment failures.</p>}
                {failures.map((b) => {
                  const daysOpen = daysFrom(b.dateRaised);
                  return (
                    <div key={b.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-slate-900">{b.name}</span>
                            {flaggedIds.has(b.id) && <Badge className="border border-rose-200 bg-rose-50 text-rose-700 text-xs">Flagged urgent</Badge>}
                          </div>
                          <div className="text-sm text-slate-600">{b.course}</div>
                          <div className="text-sm text-slate-500">{b.reason}</div>
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span>Raised {new Date(b.dateRaised).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                            {daysOpen >= 5 && <span className="text-amber-600 font-medium">{daysOpen} days open</span>}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <Badge className={`border text-xs font-semibold capitalize ${issueBadge(b.status)}`}>{b.status.replace("-", " ")}</Badge>
                          {!flaggedIds.has(b.id) && b.status !== "resolved" && (
                            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => flagUrgent(b.id, b.name)}>
                              <Flag className="h-3 w-3 mr-1" /> Flag urgent
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Refund Requests */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-700">Refund Requests</h3>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">{refunds.length}</span>
                </div>
                {refunds.length === 0 && <p className="text-sm text-slate-400 py-2">No refund requests.</p>}
                {refunds.map((b) => {
                  const daysOpen = daysFrom(b.dateRaised);
                  return (
                    <div key={b.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-slate-900">{b.name}</span>
                            {flaggedIds.has(b.id) && <Badge className="border border-rose-200 bg-rose-50 text-rose-700 text-xs">Flagged urgent</Badge>}
                          </div>
                          <div className="text-sm text-slate-600">{b.course}</div>
                          <div className="text-sm text-slate-500">{b.reason}</div>
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span>Raised {new Date(b.dateRaised).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                            {daysOpen >= 5 && <span className="text-amber-600 font-medium">{daysOpen} days open</span>}
                          </div>
                          <div className="text-xs text-slate-400 italic">Approval handled by finance team.</div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <Badge className={`border text-xs font-semibold capitalize ${issueBadge(b.status)}`}>{b.status.replace("-", " ")}</Badge>
                          {!flaggedIds.has(b.id) && b.status !== "resolved" && (
                            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => flagUrgent(b.id, b.name)}>
                              <Flag className="h-3 w-3 mr-1" /> Flag urgent
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Show resolved toggle */}
              {resolvedIssues.length > 0 && (
                <button
                  onClick={() => setShowResolved((v) => !v)}
                  className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2"
                >
                  {showResolved ? "Hide resolved" : `Show resolved (${resolvedIssues.length})`}
                </button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
