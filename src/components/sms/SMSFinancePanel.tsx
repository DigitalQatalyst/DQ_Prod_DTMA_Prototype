import { useState } from "react";
import { Download, Info, RefreshCw, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const monthlyRevenue = [
  { month: "Nov", amount: 38200 },
  { month: "Dec", amount: 41500 },
  { month: "Jan", amount: 44800 },
  { month: "Feb", amount: 47200 },
  { month: "Mar", amount: 52100 },
  { month: "Apr", amount: 58400 },
];

const revenueByCourse = [
  { course: "Digital Transformation Fundamentals", pricing: "one-time",     purchases: 298, freeEnrollments: 0,   revenue: 74500, refunds: 3 },
  { course: "AI & Automation in the Workplace",    pricing: "subscription", purchases: 187, freeEnrollments: 0,   revenue: 46750, refunds: 1 },
  { course: "Agile Project Management",            pricing: "one-time",     purchases: 156, freeEnrollments: 0,   revenue: 39000, refunds: 2 },
  { course: "Cybersecurity Essentials",            pricing: "free",         purchases: 0,   freeEnrollments: 154, revenue: 0,     refunds: 0 },
];

const subscriptionStats = { mrr: 20600, renewalRate: 84 };

const fmt = (n: number) => `$${n.toLocaleString()}`;

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

export default function SMSFinancePanel() {
  const { toast } = useToast();

  const thisMonth = monthlyRevenue[monthlyRevenue.length - 1].amount;
  const lastMonth = monthlyRevenue[monthlyRevenue.length - 2].amount;
  const growth    = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
  const maxRev    = Math.max(...monthlyRevenue.map((m) => m.amount));
  const minRev    = Math.min(...monthlyRevenue.map((m) => m.amount));
  const range     = maxRev - minRev;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[28px] leading-[36px] font-semibold">Finance</h2>
          <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
            Revenue trends, course earnings, and subscription performance.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => toast({ title: "Executive Report Generated", description: "Compiling a PDF summary of Finance KPIs, Compliance status, and Faculty backlogs for board review." })}>
          <Download className="mr-2 h-4 w-4" /> Export Executive Summary
        </Button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
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

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">$64,200</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Projected Next Month</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Based on current MRR + 8% growth trend</div>
        </div>
      </div>

      {/* 6-Month Revenue Trend */}
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
              const heightPct = range === 0 ? 100 : Math.round(12 + ((m.amount - minRev) / range) * 88);
              const isLatest  = m.month === monthlyRevenue[monthlyRevenue.length - 1].month;
              return (
                <div key={m.month} className="flex flex-col items-center gap-1 flex-1 h-full justify-end group">
                  <span className={`text-[11px] leading-none mb-1 ${isLatest ? "font-semibold text-slate-800" : "text-slate-400"}`}>
                    {fmt(m.amount)}
                  </span>
                  <div
                    className={`w-full rounded-t-lg transition-all ${isLatest ? "bg-[#ff6b4d]" : "bg-slate-200 group-hover:bg-slate-300"}`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className={`text-xs shrink-0 ${isLatest ? "font-semibold text-slate-700" : "text-slate-500"}`}>{m.month}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Course */}
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
                    <TableCell className="text-right">{r.pricing === "free" ? r.freeEnrollments : r.purchases}</TableCell>
                    <TableCell className="text-right">
                      {r.pricing === "free"
                        ? <span className="text-slate-400">—</span>
                        : <span className={cn("font-medium", refundRate > 5 ? "text-amber-700" : "text-slate-700")}>{refundRate}%</span>}
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
    </div>
  );
}
