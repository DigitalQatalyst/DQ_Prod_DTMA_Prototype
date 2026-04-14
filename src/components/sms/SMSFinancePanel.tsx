import { useState } from "react";
import { AlertCircle, Download, Flag, Info, RefreshCw, TrendingUp } from "lucide-react";
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

// Each course can be free, one-time purchase, or subscription-accessible
const revenueByCourse = [
  { course: "Digital Transformation Fundamentals", pricing: "one-time",     purchases: 298, freeEnrollments: 0,  revenue: 74500, refunds: 3 },
  { course: "AI & Automation in the Workplace",    pricing: "subscription", purchases: 187, freeEnrollments: 0,  revenue: 46750, refunds: 1 },
  { course: "Agile Project Management",            pricing: "one-time",     purchases: 156, freeEnrollments: 0,  revenue: 39000, refunds: 2 },
  { course: "Cybersecurity Essentials",            pricing: "free",         purchases: 0,   freeEnrollments: 154, revenue: 0,    refunds: 0 },
];

// Subscription snapshot
const subscriptionStats = {
  activeSubscribers: 412,
  renewalRate: 84,          // % of subscribers who renewed last cycle
  failedRenewals: 7,        // renewals that failed this cycle
  mrr: 20600,               // monthly recurring revenue
};

type AccessStatus = "active" | "payment-failed" | "cancelled" | "refunded" | "expired";

interface StudentAccess {
  id: string; name: string; email: string; course: string;
  accessType: "one-time" | "subscription" | "free";
  status: AccessStatus;
  purchaseDate: string;
  renewalDate?: string;     // only for subscriptions
}

const studentAccess: StudentAccess[] = [
  { id: "SA-01", name: "Amina Osei",   email: "amina@example.com",  course: "Digital Transformation Fundamentals", accessType: "one-time",     status: "active",         purchaseDate: "2026-03-01" },
  { id: "SA-02", name: "Noah Mensah",  email: "noah@example.com",   course: "AI & Automation in the Workplace",    accessType: "subscription", status: "active",         purchaseDate: "2026-01-15", renewalDate: "2026-05-15" },
  { id: "SA-03", name: "Irene Mwangi", email: "irene@example.com",  course: "Agile Project Management",            accessType: "one-time",     status: "payment-failed", purchaseDate: "2026-04-01" },
  { id: "SA-04", name: "Kwame Asante", email: "kwame@example.com",  course: "AI & Automation in the Workplace",    accessType: "subscription", status: "expired",        purchaseDate: "2026-01-10", renewalDate: "2026-04-10" },
  { id: "SA-05", name: "Sofia Reyes",  email: "sofia@example.com",  course: "Digital Transformation Fundamentals", accessType: "one-time",     status: "refunded",       purchaseDate: "2026-03-20" },
];

interface BillingIssue {
  id: string; name: string; course: string; amount: number;
  type: "failed-payment" | "refund-request";
  subType?: "checkout" | "renewal";
  reason: string; status: "pending" | "under-review" | "resolved";
  dateRaised: string;
}

const billingIssues: BillingIssue[] = [
  { id: "BI-01", name: "Sofia Reyes",  course: "Digital Transformation Fundamentals", amount: 250, type: "failed-payment",  subType: "checkout", reason: "Payment could not be processed at checkout", status: "pending",      dateRaised: "2026-04-01" },
  { id: "BI-02", name: "Irene Mwangi", course: "Agile Project Management",            amount: 250, type: "refund-request",                       reason: "Student requested refund after purchase",    status: "under-review", dateRaised: "2026-03-28" },
  { id: "BI-03", name: "Kwame Asante", course: "AI & Automation in the Workplace",    amount: 50,  type: "failed-payment",  subType: "renewal",  reason: "Subscription renewal failed — card expired", status: "pending",      dateRaised: "2026-04-10" },
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
function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function accessBadge(s: AccessStatus) {
  const map: Record<AccessStatus, string> = {
    "active":         "border-emerald-200 bg-emerald-50 text-emerald-700",
    "payment-failed": "border-rose-300 bg-rose-100 text-rose-800",
    "cancelled":      "border-slate-200 bg-slate-50 text-slate-600",
    "refunded":       "border-sky-200 bg-sky-50 text-sky-700",
    "expired":        "border-amber-200 bg-amber-50 text-amber-800",
  };
  return map[s];
}

function accessLabel(s: AccessStatus) {
  const map: Record<AccessStatus, string> = {
    "active":         "Active",
    "payment-failed": "Payment Failed",
    "cancelled":      "Cancelled",
    "refunded":       "Refunded",
    "expired":        "Expired",
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
  const [flaggedIds,   setFlaggedIds]   = useState<Set<string>>(new Set());
  const [showResolved, setShowResolved] = useState(false);
  const [showAllAccess, setShowAllAccess] = useState(false);

  const thisMonth  = monthlyRevenue[monthlyRevenue.length - 1].amount;
  const lastMonth  = monthlyRevenue[monthlyRevenue.length - 2].amount;
  const growth     = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.amount));

  const actionableAccess = studentAccess.filter((s) => s.status !== "active");
  const displayedAccess  = showAllAccess ? studentAccess : actionableAccess;

  const openIssues     = billingIssues.filter((b) => b.status !== "resolved");
  const resolvedIssues = billingIssues.filter((b) => b.status === "resolved");
  const failures       = (showResolved ? billingIssues : openIssues).filter((b) => b.type === "failed-payment");
  const refunds        = (showResolved ? billingIssues : openIssues).filter((b) => b.type === "refund-request");

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
            Revenue, subscriptions, and billing issues for your academy.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => toast({ title: "Export queued", description: "Revenue summary added to export queue." })}>
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
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

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center mb-3">
            <RefreshCw className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{fmt(subscriptionStats.mrr)}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Monthly Recurring Revenue
            <Tip text="Revenue from active subscriptions that renews each month. Does not include one-time course purchases." />
          </div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">{subscriptionStats.renewalRate}% renewal rate</div>
        </div>

        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", subscriptionStats.failedRenewals > 0 ? "border-rose-200 bg-rose-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-rose-500" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", subscriptionStats.failedRenewals > 0 && "text-rose-700")}>
            {subscriptionStats.failedRenewals}
          </div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Failed Renewals
            <Tip text="Subscription renewals that failed this billing cycle. These students have lost access until their payment is updated." />
          </div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">This billing cycle</div>
        </div>

        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", openIssues.length > 0 ? "border-amber-200 bg-amber-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", openIssues.length > 0 && "text-amber-700")}>{openIssues.length}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Needs Attention
            <Tip text="Failed payments and refund requests that have not yet been resolved by the finance team." />
          </div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Open billing issues</div>
        </div>
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-slate-100 p-2">
          <TabsTrigger value="revenue"  className="rounded-xl px-4 py-2">Revenue Overview</TabsTrigger>
          <TabsTrigger value="access"   className="rounded-xl px-4 py-2">
            Student Access
            {actionableAccess.length > 0 && <span className="ml-2 rounded-full bg-rose-500 px-1.5 py-0.5 text-xs text-white">{actionableAccess.length}</span>}
          </TabsTrigger>
          <TabsTrigger value="issues"   className="rounded-xl px-4 py-2">
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
              <CardDescription>Purchases and revenue per course. Free courses are included for enrolment visibility.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead className="text-right">Purchases / Enrolments</TableHead>
                  <TableHead className="text-right">
                    <span className="flex items-center justify-end gap-1">
                      Refund Rate
                      <Tip text="Refunds as a percentage of purchases. A high refund rate may indicate course quality or expectation issues." />
                    </span>
                  </TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {revenueByCourse.map((r) => {
                    const refundRate = r.purchases > 0 ? Math.round((r.refunds / r.purchases) * 100) : 0;
                    return (
                      <TableRow key={r.course}>
                        <TableCell className="font-medium">{r.course}</TableCell>
                        <TableCell>
                          <Badge className={cn("border text-xs capitalize",
                            r.pricing === "free"         ? "border-slate-200 bg-slate-50 text-slate-600" :
                            r.pricing === "subscription" ? "border-sky-200 bg-sky-50 text-sky-700" :
                                                           "border-emerald-200 bg-emerald-50 text-emerald-700"
                          )}>
                            {r.pricing === "one-time" ? "One-time" : r.pricing === "subscription" ? "Subscription" : "Free"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {r.pricing === "free" ? r.freeEnrollments : r.purchases}
                        </TableCell>
                        <TableCell className="text-right">
                          {r.pricing === "free" ? (
                            <span className="text-slate-400">—</span>
                          ) : (
                            <span className={cn("font-medium", refundRate > 5 ? "text-amber-700" : "text-slate-700")}>{refundRate}%</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {r.pricing === "free" ? <span className="text-slate-400">Free</span> : fmt(r.revenue)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow className="border-t-2 border-slate-200 font-semibold bg-slate-50/50">
                    <TableCell>Total</TableCell>
                    <TableCell />
                    <TableCell className="text-right">{revenueByCourse.reduce((s, r) => s + r.purchases + r.freeEnrollments, 0)}</TableCell>
                    <TableCell />
                    <TableCell className="text-right">{fmt(revenueByCourse.reduce((s, r) => s + r.revenue, 0))}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Student Access ── */}
        <TabsContent value="access">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Student Access</CardTitle>
              <CardDescription>
                Access is granted at point of purchase. Students with failed or expired access can no longer view course content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Banners */}
              {studentAccess.filter((s) => s.status === "payment-failed" || s.status === "expired").length > 0 && (
                <div className="rounded-xl border border-rose-200 bg-rose-50/50 px-4 py-3 text-sm text-rose-800">
                  <span className="font-semibold">
                    {studentAccess.filter((s) => s.status === "payment-failed" || s.status === "expired").length} students have lost access
                  </span>
                  {" — "}failed payment or expired subscription
                </div>
              )}

              {/* View toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAllAccess(false)}
                  className={cn("rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors",
                    !showAllAccess ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  Needs Attention ({actionableAccess.length})
                </button>
                <button
                  onClick={() => setShowAllAccess(true)}
                  className={cn("rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors",
                    showAllAccess ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  All Students ({studentAccess.length})
                </button>
              </div>

              <Table>
                <TableHeader><TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Access Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Purchase / Renewal</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {displayedAccess
                    .slice()
                    .sort((a, b) => {
                      const order: Record<AccessStatus, number> = { "payment-failed": 0, expired: 1, cancelled: 2, refunded: 3, active: 4 };
                      return order[a.status] - order[b.status];
                    })
                    .map((s) => {
                      const renewsIn = s.renewalDate ? daysUntil(s.renewalDate) : null;
                      return (
                        <TableRow key={s.id} className={cn(s.status === "payment-failed" || s.status === "expired" ? "bg-rose-50/30" : "")}>
                          <TableCell>
                            <div className="font-medium text-slate-900">{s.name}</div>
                            <div className="text-xs text-slate-500">{s.email}</div>
                          </TableCell>
                          <TableCell className="text-sm text-slate-600 max-w-[160px] truncate">{s.course}</TableCell>
                          <TableCell>
                            <Badge className={cn("border text-xs capitalize",
                              s.accessType === "subscription" ? "border-sky-200 bg-sky-50 text-sky-700" :
                              s.accessType === "free"         ? "border-slate-200 bg-slate-50 text-slate-600" :
                                                                "border-emerald-200 bg-emerald-50 text-emerald-700"
                            )}>
                              {s.accessType === "one-time" ? "One-time" : s.accessType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`border text-xs font-semibold ${accessBadge(s.status)}`}>{accessLabel(s.status)}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {s.accessType === "subscription" && s.renewalDate ? (
                              renewsIn !== null && renewsIn < 0
                                ? <span className="text-rose-600 font-medium">Expired {fmtDate(s.renewalDate)}</span>
                                : renewsIn !== null && renewsIn <= 14
                                  ? <span className="text-amber-700 font-medium">Renews in {renewsIn}d</span>
                                  : <span className="text-slate-500">Renews {fmtDate(s.renewalDate)}</span>
                            ) : (
                              <span className="text-slate-500">Purchased {fmtDate(s.purchaseDate)}</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {(s.status === "payment-failed" || s.status === "expired") && (
                              <Button
                                size="sm" variant="outline" className="text-xs h-7"
                                disabled={flaggedIds.has(s.id)}
                                onClick={() => {
                                  setFlaggedIds((prev) => new Set(prev).add(s.id));
                                  toast({ title: "Escalated to Finance", description: `${s.name}'s access issue has been flagged for the finance team.` });
                                }}
                              >
                                {flaggedIds.has(s.id) ? "Escalated" : <><Flag className="h-3 w-3 mr-1" />Escalate</>}
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
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Need urgent help? Contact the finance team: <span className="font-medium">finance@academy.com</span> · ext. 204
              </div>

              {openIssues.length > 0 && (
                <div className="text-sm text-slate-600">
                  <span className="font-semibold">{openIssues.length} open {openIssues.length === 1 ? "issue" : "issues"}</span>
                  {" · "}Total value: {fmt(openIssues.reduce((s, b) => s + b.amount, 0))}
                </div>
              )}

              {/* Failed Payments */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-700">Failed Payments</h3>
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">{failures.length}</span>
                </div>
                {failures.length === 0 && <p className="text-sm text-slate-400 py-2">No failed payments.</p>}
                {failures.map((b) => {
                  const daysOpen = daysFrom(b.dateRaised);
                  return (
                    <div key={b.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-slate-900">{b.name}</span>
                            {b.subType && (
                              <Badge className="border border-slate-200 bg-slate-50 text-slate-600 text-xs capitalize">{b.subType}</Badge>
                            )}
                            {flaggedIds.has(b.id) && <Badge className="border border-rose-200 bg-rose-50 text-rose-700 text-xs">Flagged urgent</Badge>}
                          </div>
                          <div className="text-sm text-slate-600">{b.course}</div>
                          <div className="text-sm text-slate-500">{b.reason}</div>
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span>Raised {fmtDate(b.dateRaised)}</span>
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
                            <span>Raised {fmtDate(b.dateRaised)}</span>
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
