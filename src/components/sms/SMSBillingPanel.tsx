import { useState } from "react";
import { AlertCircle, Flag, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


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

const TODAY = new Date("2026-04-14");
const fmt = (n: number) => `$${n.toLocaleString()}`;
const daysFrom  = (d: string) => Math.round((TODAY.getTime() - new Date(d).getTime()) / 86_400_000);
const daysUntil = (d: string) => Math.round((new Date(d).getTime() - TODAY.getTime()) / 86_400_000);
const fmtDate   = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function issueBadge(s: string) {
  if (s === "resolved")     return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "under-review") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-amber-200 bg-amber-50 text-amber-800";
}

const Tip = ({ text }: { text: string }) => (
  <TooltipProvider><Tooltip>
    <TooltipTrigger asChild><Info className="inline h-3.5 w-3.5 text-slate-400 cursor-default ml-1 shrink-0" /></TooltipTrigger>
    <TooltipContent side="top" className="max-w-[220px] text-xs">{text}</TooltipContent>
  </Tooltip></TooltipProvider>
);

export default function SMSBillingPanel() {
  const { toast } = useToast();
  const [flaggedIds,    setFlaggedIds]    = useState<Set<string>>(new Set());
  const [showResolved,  setShowResolved]  = useState(false);
  const openIssues       = billingIssues.filter((b) => b.status !== "resolved");
  const resolvedIssues   = billingIssues.filter((b) => b.status === "resolved");
  const failures         = (showResolved ? billingIssues : openIssues).filter((b) => b.type === "failed-payment");
  const refunds          = (showResolved ? billingIssues : openIssues).filter((b) => b.type === "refund-request");

  const flagUrgent = (id: string, name: string) => {
    setFlaggedIds((prev) => new Set(prev).add(id));
    toast({ title: "Flagged as urgent", description: `Finance team notified about ${name}'s issue.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] leading-[36px] font-semibold">Billing</h2>
        <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
          Failed payments and refund requests. Escalate issues to the finance team.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", openIssues.length > 0 ? "border-rose-200 bg-rose-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-rose-500" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", openIssues.length > 0 && "text-rose-700")}>{openIssues.filter(b => b.type === "failed-payment").length}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Lost Access
            <Tip text="Students whose payment failed or subscription expired — they can no longer view course content." />
          </div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Failed payment or expired</div>
        </div>

        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", openIssues.length > 0 ? "border-amber-200 bg-amber-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", openIssues.length > 0 && "text-amber-700")}>{openIssues.length}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Open Billing Issues
            <Tip text="Failed payments and refund requests that have not yet been resolved by the finance team." />
          </div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Awaiting finance team</div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-slate-500/10 rounded-xl flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-slate-500" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{fmt(openIssues.reduce((s, b) => s + b.amount, 0))}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Value at Risk</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Total open issue value</div>
        </div>
      </div>

      {/* Billing Issues */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Billing Issues</CardTitle>
          <CardDescription>The finance team handles all resolutions. Flag an issue as urgent to notify them immediately.</CardDescription>
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
                        {b.subType && <Badge className="border border-slate-200 bg-slate-50 text-slate-600 text-xs capitalize">{b.subType}</Badge>}
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
            <button onClick={() => setShowResolved((v) => !v)} className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2">
              {showResolved ? "Hide resolved" : `Show resolved (${resolvedIssues.length})`}
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
