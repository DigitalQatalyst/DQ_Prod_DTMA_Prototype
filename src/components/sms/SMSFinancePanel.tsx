import { useState } from "react";
import { AlertCircle, Download, Info, TrendingUp } from "lucide-react";
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

const revenueBycourse = [
  { course: "Digital Transformation Fundamentals", enrolled: 342, revenue: 85500, paidCount: 298 },
  { course: "AI & Automation in the Workplace",    enrolled: 219, revenue: 54750, paidCount: 187 },
  { course: "Agile Project Management",            enrolled: 187, revenue: 46750, paidCount: 156 },
  { course: "Cybersecurity Essentials",            enrolled: 154, revenue: 38500, paidCount: 141 },
];

type PaymentStatus = "paid" | "pending" | "overdue" | "failed";
interface StudentPayment {
  id: string; name: string; email: string; course: string;
  amount: number; status: PaymentStatus; dueDate: string;
}

const studentPayments: StudentPayment[] = [
  { id: "SP-01", name: "Amina Osei",    email: "amina@example.com",  course: "Digital Transformation Fundamentals", amount: 250, status: "paid",    dueDate: "2026-03-01" },
  { id: "SP-02", name: "Noah Mensah",   email: "noah@example.com",   course: "AI & Automation in the Workplace",    amount: 250, status: "paid",    dueDate: "2026-03-01" },
  { id: "SP-03", name: "Irene Mwangi",  email: "irene@example.com",  course: "Agile Project Management",            amount: 250, status: "overdue", dueDate: "2026-03-15" },
  { id: "SP-04", name: "Kwame Asante",  email: "kwame@example.com",  course: "Cybersecurity Essentials",            amount: 250, status: "pending", dueDate: "2026-04-20" },
  { id: "SP-05", name: "Sofia Reyes",   email: "sofia@example.com",  course: "Digital Transformation Fundamentals", amount: 250, status: "failed",  dueDate: "2026-04-01" },
];

interface BillingIssue {
  id: string; name: string; course: string; amount: number;
  type: "failed-transaction" | "refund-request"; reason: string;
  status: "pending" | "under-review" | "resolved";
}

const billingIssues: BillingIssue[] = [
  { id: "BI-01", name: "Sofia Reyes",  course: "Digital Transformation Fundamentals", amount: 250, type: "failed-transaction", reason: "Card declined — insufficient funds",       status: "pending"      },
  { id: "BI-02", name: "Irene Mwangi", course: "Agile Project Management",            amount: 250, type: "refund-request",     reason: "Student requested withdrawal from course", status: "under-review" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (n: number) => `$${n.toLocaleString()}`;

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
  const [remindedIds, setRemindedIds] = useState<Set<string>>(new Set());

  const thisMonth = monthlyRevenue[monthlyRevenue.length - 1].amount;
  const lastMonth  = monthlyRevenue[monthlyRevenue.length - 2].amount;
  const growth = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
  const overdueCount = studentPayments.filter((s) => s.status === "overdue" || s.status === "failed").length;
  const openIssues = billingIssues.filter((b) => b.status !== "resolved").length;
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.amount));

  const sendReminder = (id: string, name: string) => {
    setRemindedIds((prev) => new Set(prev).add(id));
    toast({ title: "Reminder sent", description: `Payment reminder sent to ${name}.` });
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

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{fmt(thisMonth)}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Revenue This Month <Tip text="Total tuition fees collected from students this calendar month." />
          </div>
          <div className={cn("text-[12px] leading-[16px] mt-0.5", growth >= 0 ? "text-emerald-600" : "text-rose-600")}>
            {growth >= 0 ? "+" : ""}{growth}% vs last month
          </div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-rose-500" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{overdueCount}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Overdue or Failed <Tip text="Students with a payment that is past due or whose last payment attempt failed." />
          </div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{openIssues}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Open Billing Issues <Tip text="Failed transactions and refund requests that have not yet been resolved by the finance team." />
          </div>
        </div>
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-slate-100 p-2">
          <TabsTrigger value="revenue"  className="rounded-xl px-4 py-2">Revenue Overview</TabsTrigger>
          <TabsTrigger value="payments" className="rounded-xl px-4 py-2">
            Student Payments
            {overdueCount > 0 && <span className="ml-2 rounded-full bg-rose-500 px-1.5 py-0.5 text-xs text-white">{overdueCount}</span>}
          </TabsTrigger>
          <TabsTrigger value="issues"   className="rounded-xl px-4 py-2">
            Billing Issues
            {openIssues > 0 && <span className="ml-2 rounded-full bg-amber-500 px-1.5 py-0.5 text-xs text-white">{openIssues}</span>}
          </TabsTrigger>
        </TabsList>

        {/* Revenue Overview */}
        <TabsContent value="revenue" className="space-y-6">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>6-Month Revenue Trend</CardTitle>
              <CardDescription>Monthly tuition revenue collected across all courses.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-40">
                {monthlyRevenue.map((m) => {
                  const heightPct = Math.round((m.amount / maxRevenue) * 100);
                  const isLatest = m.month === monthlyRevenue[monthlyRevenue.length - 1].month;
                  return (
                    <div key={m.month} className="flex flex-col items-center gap-1 flex-1">
                      <span className="text-[11px] text-slate-500">{fmt(m.amount)}</span>
                      <div
                        className={cn("w-full rounded-t-lg transition-all", isLatest ? "bg-[#ff6b4d]" : "bg-slate-200")}
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-xs text-slate-500">{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Revenue by Course</CardTitle>
              <CardDescription>Gross tuition collected per course this period.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Enrolled</TableHead>
                  <TableHead className="text-right">Paid Students</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {revenueBycourse.map((r) => (
                    <TableRow key={r.course}>
                      <TableCell className="font-medium">{r.course}</TableCell>
                      <TableCell className="text-right">{r.enrolled}</TableCell>
                      <TableCell className="text-right">{r.paidCount}</TableCell>
                      <TableCell className="text-right font-medium">{fmt(r.revenue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Payments */}
        <TabsContent value="payments">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Student Payments</CardTitle>
              <CardDescription>Payment status per student. Send reminders to overdue or failed students directly from here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {studentPayments.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="font-medium text-slate-900">{s.name}</div>
                        <div className="text-xs text-slate-500">{s.email}</div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 max-w-[180px] truncate">{s.course}</TableCell>
                      <TableCell className="text-right">{fmt(s.amount)}</TableCell>
                      <TableCell className="text-sm text-slate-600">{s.dueDate}</TableCell>
                      <TableCell>
                        <Badge className={`border text-xs font-semibold capitalize ${paymentBadge(s.status)}`}>{s.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {(s.status === "overdue" || s.status === "failed") && (
                          <Button
                            size="sm" variant="outline"
                            disabled={remindedIds.has(s.id)}
                            onClick={() => sendReminder(s.id, s.name)}
                          >
                            {remindedIds.has(s.id) ? "Reminded" : "Send reminder"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Issues */}
        <TabsContent value="issues">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Billing Issues</CardTitle>
              <CardDescription>Failed transactions and refund requests. The finance team handles resolution — contact them if action is needed urgently.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {billingIssues.map((b) => (
                <div key={b.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{b.name}</span>
                        <Badge className="border border-slate-200 bg-slate-50 text-slate-600 text-xs">
                          {b.type === "failed-transaction" ? "Failed transaction" : "Refund request"}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-600">{b.course}</div>
                      <div className="text-sm text-slate-500">{b.reason}</div>
                      <div className="text-xs text-slate-400">Amount: {fmt(b.amount)}</div>
                    </div>
                    <Badge className={`shrink-0 border text-xs font-semibold capitalize ${issueBadge(b.status)}`}>
                      {b.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
              {billingIssues.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-6">No open billing issues.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
