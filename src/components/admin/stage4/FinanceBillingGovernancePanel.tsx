import * as React from "react";
import {
  ArrowRightLeft,
  Banknote,
  Coins,
  Download,
  FileText,
  Gauge,
  HandCoins,
  ReceiptText,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type PayoutStatus = "pending" | "needs-review" | "approved" | "paid" | "rejected";
type ReconciliationStatus = "matched" | "discrepancy" | "blocked" | "resolved";
type ExceptionStatus = "open" | "under-review" | "approved" | "rejected" | "resolved";
type SettlementStatus = "ready" | "approved" | "paid" | "on-hold";
type AuditStatus = "info" | "success" | "warning" | "danger";

interface PayoutRecord {
  id: string;
  contributor: string;
  role: "Instructor" | "Partner Expert" | "Faculty";
  program: string;
  paymentModel: "Monthly" | "Per-session" | "Royalty" | "Per-enrollment";
  workUnits: string;
  amount: number;
  status: PayoutStatus;
  dueDate: string;
  contractRef: string;
  reasonCode: string;
  complianceFlag: boolean;
}

interface ReconciliationRecord {
  id: string;
  source: "Direct learner sales" | "Sponsor accrual" | "Partner revenue share";
  program: string;
  expectedRevenue: number;
  capturedRevenue: number;
  varianceReason: string;
  status: ReconciliationStatus;
  owner: string;
  contractRef: string;
}

interface BillingException {
  id: string;
  exceptionType: "Refund" | "Waiver" | "Correction" | "Dispute";
  requester: string;
  program: string;
  amount: number;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: ExceptionStatus;
  reasonCode: string;
  requiresSecondApproval: boolean;
}

interface PartnerSettlement {
  id: string;
  partner: string;
  model: "Revenue share" | "Royalty" | "Referral" | "Delivery fee";
  grossRevenue: number;
  sharePercent: number;
  amountDue: number;
  status: SettlementStatus;
  contractRef: string;
  releaseWindow: string;
}

interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  reasonCode: string;
  amount?: number;
  status: AuditStatus;
}

const initialPayouts: PayoutRecord[] = [
  { id: "pay-001", contributor: "Dr. Aisha Mensah", role: "Instructor", program: "Digital Transformation Fundamentals", paymentModel: "Monthly", workUnits: "42 graded assessments", amount: 8200, status: "pending", dueDate: "2026-04-03", contractRef: "CTR-2026-011", reasonCode: "PAY-001", complianceFlag: false },
  { id: "pay-002", contributor: "Maya Patel", role: "Partner Expert", program: "AI & Automation Executive Sprint", paymentModel: "Per-session", workUnits: "4 live masterclasses", amount: 3600, status: "needs-review", dueDate: "2026-04-04", contractRef: "CTR-2026-024", reasonCode: "PAY-004", complianceFlag: true },
  { id: "pay-003", contributor: "Prof. Kwame Asare", role: "Faculty", program: "Leadership in the Digital Age", paymentModel: "Royalty", workUnits: "Course-enrollment royalty", amount: 5400, status: "approved", dueDate: "2026-04-02", contractRef: "CTR-2025-077", reasonCode: "PAY-002", complianceFlag: false },
  { id: "pay-004", contributor: "Lindiwe Dube", role: "Instructor", program: "Agile Project Management", paymentModel: "Per-enrollment", workUnits: "187 enrollments", amount: 2950, status: "pending", dueDate: "2026-04-06", contractRef: "CTR-2026-018", reasonCode: "PAY-003", complianceFlag: false },
];

const initialReconciliations: ReconciliationRecord[] = [
  { id: "rec-001", source: "Direct learner sales", program: "Digital Transformation Fundamentals", expectedRevenue: 28500, capturedRevenue: 28500, varianceReason: "Matched to live enrolment log", status: "matched", owner: "Finance Operations", contractRef: "CTR-2026-011" },
  { id: "rec-002", source: "Sponsor accrual", program: "AI & Automation Executive Sprint", expectedRevenue: 44000, capturedRevenue: 41200, varianceReason: "Sponsor invoice short-paid by one seat block", status: "discrepancy", owner: "Billing Admin", contractRef: "CTR-2026-024" },
  { id: "rec-003", source: "Partner revenue share", program: "Leadership in the Digital Age", expectedRevenue: 17600, capturedRevenue: 17600, varianceReason: "Royalty line matched to contract metadata", status: "matched", owner: "Finance Operations", contractRef: "CTR-2025-077" },
  { id: "rec-004", source: "Direct learner sales", program: "Agile Project Management", expectedRevenue: 14400, capturedRevenue: 10800, varianceReason: "Partial card settlement pending capture confirmation", status: "blocked", owner: "Billing Admin", contractRef: "CTR-2026-018" },
];

const initialExceptions: BillingException[] = [
  { id: "exc-001", exceptionType: "Refund", requester: "Corporate Learning Buyer", program: "AI & Automation Executive Sprint", amount: 2400, priority: "High", status: "open", reasonCode: "REF-014", requiresSecondApproval: true },
  { id: "exc-002", exceptionType: "Waiver", requester: "Scholarship Committee", program: "Digital Transformation Fundamentals", amount: 1200, priority: "Medium", status: "under-review", reasonCode: "WVR-002", requiresSecondApproval: false },
  { id: "exc-003", exceptionType: "Correction", requester: "Finance Operations", program: "Leadership in the Digital Age", amount: 900, priority: "Urgent", status: "resolved", reasonCode: "COR-009", requiresSecondApproval: false },
  { id: "exc-004", exceptionType: "Dispute", requester: "Institution Buyer", program: "Agile Project Management", amount: 1850, priority: "High", status: "open", reasonCode: "DSP-011", requiresSecondApproval: true },
];

const initialSettlements: PartnerSettlement[] = [
  { id: "set-001", partner: "Axis AI Labs", model: "Revenue share", grossRevenue: 32000, sharePercent: 18, amountDue: 5760, status: "ready", contractRef: "CTR-2026-024", releaseWindow: "4 Apr 2026" },
  { id: "set-002", partner: "Executive Faculty Network", model: "Royalty", grossRevenue: 21000, sharePercent: 12, amountDue: 2520, status: "approved", contractRef: "CTR-2025-077", releaseWindow: "2 Apr 2026" },
  { id: "set-003", partner: "Digital Delivery Collective", model: "Delivery fee", grossRevenue: 14800, sharePercent: 8, amountDue: 1184, status: "on-hold", contractRef: "CTR-2026-018", releaseWindow: "5 Apr 2026" },
  { id: "set-004", partner: "Cohort Mentors Group", model: "Referral", grossRevenue: 9000, sharePercent: 10, amountDue: 900, status: "paid", contractRef: "CTR-2026-015", releaseWindow: "1 Apr 2026" },
];

const initialAuditHistory: AuditEvent[] = [
  { id: "aud-001", timestamp: "2026-04-01T08:15:00", actor: "Finance Operations Manager", action: "Approved instructor payout", target: "Dr. Aisha Mensah", reasonCode: "PAY-APP-01", amount: 8200, status: "success" },
  { id: "aud-002", timestamp: "2026-04-01T09:05:00", actor: "Billing Administrator", action: "Flagged reconciliation discrepancy", target: "AI & Automation Executive Sprint", reasonCode: "REC-DIFF-02", amount: 2800, status: "warning" },
  { id: "aud-003", timestamp: "2026-04-01T09:42:00", actor: "Compliance Lead", action: "Escalated refund for second approval", target: "Corporate Learning Buyer", reasonCode: "REF-ESC-04", amount: 2400, status: "warning" },
  { id: "aud-004", timestamp: "2026-04-01T10:08:00", actor: "Partnership Lead", action: "Prepared external partner settlement export", target: "Axis AI Labs", reasonCode: "SET-EXP-03", amount: 5760, status: "info" },
];

const money = new Intl.NumberFormat("en-US", { currency: "USD", maximumFractionDigits: 0, style: "currency" });
const formatCurrency = (value: number) => money.format(value);
const formatDate = (value: string) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const formatDateTime = (value: string) => new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

const statusClasses = (status: string) => {
  switch (status) {
    case "paid":
    case "approved":
    case "matched":
    case "resolved":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "pending":
    case "ready":
    case "open":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "needs-review":
    case "under-review":
    case "blocked":
      return "border-sky-200 bg-sky-50 text-sky-700";
    case "discrepancy":
    case "rejected":
    case "on-hold":
      return "border-rose-200 bg-rose-50 text-rose-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
};

const priorityClasses = (priority: string) => {
  switch (priority) {
    case "urgent":
    case "high":
      return "border-rose-200 bg-rose-50 text-rose-700";
    case "medium":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "low":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
};

const StatCard = ({
  label,
  value,
  helper,
  icon,
  accent,
}: {
  label: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
  accent: string;
}) => (
  <Card className="overflow-hidden border-slate-200/70 bg-white/90 shadow-sm backdrop-blur">
    <CardContent className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <div className={cn("text-3xl font-semibold tracking-tight", accent)}>{value}</div>
          <p className="text-sm text-slate-600">{helper}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

const StatusPill = ({ status }: { status: string }) => (
  <Badge className={cn("rounded-full border px-3 py-1 text-xs font-semibold capitalize", statusClasses(status))}>
    {status.replace("-", " ")}
  </Badge>
);

export function FinanceBillingGovernancePanel() {
  const { toast } = useToast();
  const [payouts, setPayouts] = React.useState(initialPayouts);
  const [reconciliations, setReconciliations] = React.useState(initialReconciliations);
  const [exceptions, setExceptions] = React.useState(initialExceptions);
  const [settlements, setSettlements] = React.useState(initialSettlements);
  const [auditHistory, setAuditHistory] = React.useState(initialAuditHistory);
  const [searchTerm, setSearchTerm] = React.useState("");

  const addAudit = React.useCallback((entry: Omit<AuditEvent, "id" | "timestamp">) => {
    setAuditHistory((current) => [
      { ...entry, id: `aud-${Date.now()}`, timestamp: new Date().toISOString() },
      ...current,
    ]);
  }, []);

  const updatePayout = React.useCallback(
    (id: string, status: PayoutStatus, action: string) => {
      const record = payouts.find((item) => item.id === id);
      if (!record) return;
      setPayouts((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
      addAudit({
        actor: "Finance Operations Manager",
        action,
        target: record.contributor,
        reasonCode: record.reasonCode,
        amount: record.amount,
        status: status === "rejected" ? "danger" : status === "needs-review" ? "warning" : "success",
      });
      toast({ title: "Payout updated", description: `${record.contributor} is now ${status.replace("-", " ")}.` });
    },
    [addAudit, payouts, toast]
  );

  const updateReconciliation = React.useCallback(
    (id: string, status: ReconciliationStatus, action: string) => {
      const record = reconciliations.find((item) => item.id === id);
      if (!record) return;
      setReconciliations((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
      addAudit({
        actor: "Billing Administrator",
        action,
        target: record.program,
        reasonCode: record.contractRef,
        amount: Math.abs(record.expectedRevenue - record.capturedRevenue),
        status: status === "resolved" || status === "matched" ? "success" : "warning",
      });
      toast({ title: "Reconciliation updated", description: `${record.program} is now ${status}.` });
    },
    [addAudit, reconciliations, toast]
  );

  const updateException = React.useCallback(
    (id: string, status: ExceptionStatus, action: string) => {
      const record = exceptions.find((item) => item.id === id);
      if (!record) return;
      setExceptions((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
      addAudit({
        actor: "Compliance Lead",
        action,
        target: `${record.exceptionType} for ${record.program}`,
        reasonCode: record.reasonCode,
        amount: record.amount,
        status: status === "resolved" || status === "approved" ? "success" : "warning",
      });
      toast({ title: "Billing exception updated", description: `${record.exceptionType} for ${record.program} is now ${status.replace("-", " ")}.` });
    },
    [addAudit, exceptions, toast]
  );

  const updateSettlement = React.useCallback(
    (id: string, status: SettlementStatus, action: string) => {
      const record = settlements.find((item) => item.id === id);
      if (!record) return;
      setSettlements((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
      addAudit({
        actor: "Partnership Lead",
        action,
        target: record.partner,
        reasonCode: record.contractRef,
        amount: record.amountDue,
        status: status === "paid" || status === "approved" ? "success" : "warning",
      });
      toast({ title: "Partner settlement updated", description: `${record.partner} is now ${status.replace("-", " ")}.` });
    },
    [addAudit, settlements, toast]
  );

  const exportSummary = React.useCallback(() => {
    addAudit({
      actor: "Finance Operations Manager",
      action: "Exported governance summary",
      target: "Stage 4 finance workspace",
      reasonCode: "EXP-001",
      status: "info",
    });
    toast({ title: "Export prepared", description: "The prototype only tracks export intent in audit history." });
  }, [addAudit, toast]);

  const pendingPayouts = payouts.filter((item) => item.status === "pending" || item.status === "needs-review");
  const payoutHistory = payouts.filter((item) => item.status === "paid" || item.status === "rejected");
  const discrepancyItems = reconciliations.filter((item) => item.status !== "matched");
  const openExceptions = exceptions.filter((item) => item.status === "open" || item.status === "under-review");
  const partnerReady = settlements.filter((item) => item.status === "ready" || item.status === "approved");

  const totalPendingPayoutAmount = pendingPayouts.reduce((sum, item) => sum + item.amount, 0);
  const matchedRevenue = reconciliations.filter((item) => item.status === "matched").reduce((sum, item) => sum + item.capturedRevenue, 0);
  const expectedRevenue = reconciliations.reduce((sum, item) => sum + item.expectedRevenue, 0);
  const matchedRate = expectedRevenue > 0 ? Math.round((matchedRevenue / expectedRevenue) * 100) : 0;
  const openExposure = openExceptions.reduce((sum, item) => sum + item.amount, 0);
  const readySettlementAmount = partnerReady.reduce((sum, item) => sum + item.amountDue, 0);
  const auditCoverage = Math.round((auditHistory.filter((item) => item.reasonCode).length / Math.max(auditHistory.length, 1)) * 100);

  const term = searchTerm.toLowerCase();
  const filterHit = (values: string[]) => values.join(" ").toLowerCase().includes(term);
  const filteredPayouts = payouts.filter((item) => filterHit([item.contributor, item.program, item.contractRef, item.reasonCode, item.status, item.role]));
  const filteredReconciliations = reconciliations.filter((item) => filterHit([item.source, item.program, item.contractRef, item.varianceReason, item.status]));
  const filteredExceptions = exceptions.filter((item) => filterHit([item.exceptionType, item.program, item.requester, item.reasonCode, item.status]));
  const filteredSettlements = settlements.filter((item) => filterHit([item.partner, item.model, item.contractRef, item.status]));

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-5 shadow-sm md:p-6">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm"><Banknote className="h-5 w-5" /></div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Stage 4 Finance Governance</h3>
                <p className="text-sm text-slate-600">Instructor payouts, partner settlements, revenue reconciliation, billing exceptions, and audit history are governed in one workspace.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"><Sparkles className="mr-1 h-3.5 w-3.5" />Mock data</Badge>
              <Badge className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"><ShieldCheck className="mr-1 h-3.5 w-3.5" />Audit-ready</Badge>
              <Badge className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800"><TriangleAlert className="mr-1 h-3.5 w-3.5" />Second approval</Badge>
              <Badge className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700"><ArrowRightLeft className="mr-1 h-3.5 w-3.5" />Controlled releases</Badge>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">This component is intentionally self-contained. The actions update mock finance records in memory and log governance events so the Stage 4 workflows can be reviewed without backend wiring.</p>
          </div>

          <div className="grid min-w-[260px] gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-600">Governance health</span>
              <Gauge className="h-4 w-4 text-slate-500" />
            </div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-3xl font-semibold tracking-tight text-slate-900">{Math.min(100, matchedRate + auditCoverage / 2)}%</div>
                <p className="text-xs text-slate-500">Composite readiness score</p>
              </div>
              <div className="text-right text-xs text-slate-500">
                <p>{pendingPayouts.length} payout items pending</p>
                <p>{discrepancyItems.length} reconciliation gaps</p>
              </div>
            </div>
            <Progress value={Math.min(100, matchedRate + auditCoverage / 2)} className="h-2 bg-slate-200" />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Pending payout exposure" value={formatCurrency(totalPendingPayoutAmount)} helper={`${pendingPayouts.length} payout records require finance review`} icon={<HandCoins className="h-5 w-5" />} accent={totalPendingPayoutAmount > 10000 ? "text-rose-700" : "text-emerald-700"} />
          <StatCard label="Revenue matched rate" value={`${matchedRate}%`} helper={`${formatCurrency(matchedRevenue)} matched against ${formatCurrency(expectedRevenue)}`} icon={<ArrowRightLeft className="h-5 w-5" />} accent={matchedRate >= 80 ? "text-emerald-700" : "text-amber-700"} />
          <StatCard label="Open billing exposure" value={formatCurrency(openExposure)} helper={`${openExceptions.length} open or under-review exceptions`} icon={<ReceiptText className="h-5 w-5" />} accent={openExposure < 2500 ? "text-amber-700" : "text-rose-700"} />
          <StatCard label="Partner settlement release" value={formatCurrency(readySettlementAmount)} helper={`${partnerReady.length} settlements are ready or approved for release`} icon={<Coins className="h-5 w-5" />} accent={readySettlementAmount >= 5000 ? "text-sky-700" : "text-emerald-700"} />
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-2 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-sm md:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
          <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-6">
          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <Card className="border-slate-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Governance posture</CardTitle>
                <CardDescription>The overview is biased toward what still needs human review. Terminal states move into audit history.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700"><ShieldCheck className="h-4 w-4 text-emerald-600" />Approval coverage</div>
                      <span className="text-sm font-semibold text-slate-900">{auditCoverage}%</span>
                    </div>
                    <Progress value={auditCoverage} className="h-2 bg-slate-200" />
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700"><ShieldAlert className="h-4 w-4 text-amber-600" />Second-approval queue</div>
                      <span className="text-sm font-semibold text-slate-900">{exceptions.filter((item) => item.requiresSecondApproval).length}</span>
                    </div>
                    <p className="text-sm text-slate-600">Refunds and partner corrections above policy thresholds require an additional sign-off.</p>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Payout queue</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{pendingPayouts.length}</p>
                    <p className="text-sm text-slate-600">Awaiting approval or review</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Discrepancies</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{discrepancyItems.length}</p>
                    <p className="text-sm text-slate-600">Blocking match to official records</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">External release</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{partnerReady.length}</p>
                    <p className="text-sm text-slate-600">Ready for controlled partner sharing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Controls and actions</CardTitle>
                <CardDescription>These buttons simulate the governance actions the real system would expose.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-between bg-slate-900 text-white hover:bg-slate-800" onClick={exportSummary}>Export finance governance summary <Download className="h-4 w-4" /></Button>
                <Button variant="outline" className="w-full justify-between" onClick={() => toast({ title: "Read-only snapshot", description: "The prototype currently stores all finance state in memory." })}>Review governed records <FileText className="h-4 w-4" /></Button>
                <Button variant="outline" className="w-full justify-between" onClick={() => toast({ title: "Policy reminder", description: "Refunds and waivers above threshold require second approval." })}>Check approval threshold policy <TriangleAlert className="h-4 w-4" /></Button>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-700">Search scope</p>
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Filter payouts, settlements, exceptions, and audit events" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6 pt-6">
          <Card className="border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Instructor and partner payout queue</CardTitle>
              <CardDescription>Pending and review-needed payouts stay here until finance approves, rejects, or releases them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Queue items</p><p className="mt-2 text-2xl font-semibold text-slate-900">{pendingPayouts.length}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Terminal payouts</p><p className="mt-2 text-2xl font-semibold text-slate-900">{payoutHistory.length}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Compliance flags</p><p className="mt-2 text-2xl font-semibold text-slate-900">{payouts.filter((item) => item.complianceFlag).length}</p></div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Contributor</TableHead><TableHead>Program</TableHead><TableHead>Work units</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Due</TableHead><TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayouts.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell><div className="space-y-1"><div className="flex items-center gap-2 font-medium text-slate-900"><UserRound className="h-4 w-4 text-slate-500" />{item.contributor}</div><div className="text-xs text-slate-500">{item.role} · {item.paymentModel} · {item.contractRef}</div></div></TableCell>
                        <TableCell className="max-w-[260px]"><div className="space-y-1"><p className="font-medium text-slate-900">{item.program}</p><p className="text-xs text-slate-500">Reason code: {item.reasonCode}</p></div></TableCell>
                        <TableCell className="text-sm text-slate-600">{item.workUnits}</TableCell>
                        <TableCell className="font-semibold text-slate-900">{formatCurrency(item.amount)}</TableCell>
                        <TableCell><StatusPill status={item.status} /></TableCell>
                        <TableCell className="text-sm text-slate-600">{formatDate(item.dueDate)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {item.status !== "approved" && item.status !== "paid" && <Button size="sm" onClick={() => updatePayout(item.id, "approved", "Approved payout for release")}>Approve</Button>}
                            {item.status !== "rejected" && item.status !== "paid" && <Button size="sm" variant="outline" onClick={() => updatePayout(item.id, "rejected", "Rejected payout after review")}>Reject</Button>}
                            {item.status === "approved" && <Button size="sm" variant="outline" onClick={() => updatePayout(item.id, "paid", "Released payout to recipient")}>Mark paid</Button>}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredPayouts.length === 0 && <TableRow><TableCell colSpan={7} className="py-12 text-center text-sm text-slate-500">No payout records match the current search term.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-6 pt-6">
          <Card className="border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Revenue reconciliation dashboard</CardTitle>
              <CardDescription>Compare direct learner revenue, sponsor accruals, and partner shares against governed records.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Matched</p><p className="mt-2 text-2xl font-semibold text-slate-900">{matchedRate}%</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Discrepancies</p><p className="mt-2 text-2xl font-semibold text-slate-900">{discrepancyItems.length}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Variance exposure</p><p className="mt-2 text-2xl font-semibold text-slate-900">{formatCurrency(reconciliations.reduce((sum, item) => sum + Math.abs(item.expectedRevenue - item.capturedRevenue), 0))}</p></div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Source</TableHead><TableHead>Program</TableHead><TableHead>Expected</TableHead><TableHead>Captured</TableHead><TableHead>Variance</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReconciliations.map((item) => {
                      const variance = item.expectedRevenue - item.capturedRevenue;
                      return (
                        <TableRow key={item.id}>
                          <TableCell><div className="space-y-1"><p className="font-medium text-slate-900">{item.source}</p><p className="text-xs text-slate-500">{item.owner} · {item.contractRef}</p></div></TableCell>
                          <TableCell><div className="space-y-1"><p className="font-medium text-slate-900">{item.program}</p><p className="text-xs text-slate-500">{item.varianceReason}</p></div></TableCell>
                          <TableCell className="font-semibold text-slate-900">{formatCurrency(item.expectedRevenue)}</TableCell>
                          <TableCell className="font-semibold text-slate-900">{formatCurrency(item.capturedRevenue)}</TableCell>
                          <TableCell className={cn("font-semibold", variance === 0 ? "text-emerald-700" : "text-rose-700")}>{variance === 0 ? formatCurrency(0) : formatCurrency(Math.abs(variance))}</TableCell>
                          <TableCell><StatusPill status={item.status} /></TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {item.status !== "matched" && <Button size="sm" onClick={() => updateReconciliation(item.id, "resolved", "Resolved reconciliation gap")}>Resolve</Button>}
                              {item.status !== "blocked" && <Button size="sm" variant="outline" onClick={() => updateReconciliation(item.id, "blocked", "Blocked until records reconcile")}>Block</Button>}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filteredReconciliations.length === 0 && <TableRow><TableCell colSpan={7} className="py-12 text-center text-sm text-slate-500">No reconciliation records match the current search term.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exceptions" className="space-y-6 pt-6">
          <Card className="border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Billing exceptions queue</CardTitle>
              <CardDescription>Refunds, waivers, corrections, and disputes stay here until they are approved or resolved.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Open queue</p><p className="mt-2 text-2xl font-semibold text-slate-900">{openExceptions.length}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Second approval</p><p className="mt-2 text-2xl font-semibold text-slate-900">{exceptions.filter((item) => item.requiresSecondApproval).length}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Exposure</p><p className="mt-2 text-2xl font-semibold text-slate-900">{formatCurrency(openExposure)}</p></div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Type</TableHead><TableHead>Requester</TableHead><TableHead>Program</TableHead><TableHead>Amount</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExceptions.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell><div className="space-y-1"><p className="font-medium text-slate-900">{item.exceptionType}</p><p className="text-xs text-slate-500">Reason code: {item.reasonCode}</p></div></TableCell>
                        <TableCell className="text-sm text-slate-600">{item.requester}</TableCell>
                        <TableCell className="text-sm text-slate-600">{item.program}</TableCell>
                        <TableCell className="font-semibold text-slate-900">{formatCurrency(item.amount)}</TableCell>
                        <TableCell><Badge className={cn("rounded-full border px-3 py-1 text-xs font-semibold capitalize", priorityClasses(item.priority.toLowerCase()))}>{item.priority}</Badge></TableCell>
                        <TableCell><StatusPill status={item.status} /></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {item.status !== "resolved" && <Button size="sm" onClick={() => updateException(item.id, "resolved", "Resolved billing exception")}>Resolve</Button>}
                            {item.status !== "approved" && <Button size="sm" variant="outline" onClick={() => updateException(item.id, "approved", "Approved exception")}>Approve</Button>}
                            {item.status !== "rejected" && <Button size="sm" variant="outline" onClick={() => updateException(item.id, "rejected", "Rejected exception request")}>Reject</Button>}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredExceptions.length === 0 && <TableRow><TableCell colSpan={7} className="py-12 text-center text-sm text-slate-500">No billing exceptions match the current search term.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6 pt-6">
          <Card className="border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Partner settlement workspace</CardTitle>
              <CardDescription>Revenue shares and royalties are prepared, approved, and then released under governed rules.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Ready to release</p><p className="mt-2 text-2xl font-semibold text-slate-900">{partnerReady.length}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Release amount</p><p className="mt-2 text-2xl font-semibold text-slate-900">{formatCurrency(readySettlementAmount)}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">On hold</p><p className="mt-2 text-2xl font-semibold text-slate-900">{settlements.filter((item) => item.status === "on-hold").length}</p></div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Partner</TableHead><TableHead>Model</TableHead><TableHead>Gross revenue</TableHead><TableHead>Share</TableHead><TableHead>Amount due</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSettlements.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell><div className="space-y-1"><p className="font-medium text-slate-900">{item.partner}</p><p className="text-xs text-slate-500">{item.contractRef} · {item.releaseWindow}</p></div></TableCell>
                        <TableCell className="text-sm text-slate-600">{item.model}</TableCell>
                        <TableCell className="font-semibold text-slate-900">{formatCurrency(item.grossRevenue)}</TableCell>
                        <TableCell className="font-semibold text-slate-900">{item.sharePercent}%</TableCell>
                        <TableCell className="font-semibold text-slate-900">{formatCurrency(item.amountDue)}</TableCell>
                        <TableCell><StatusPill status={item.status} /></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {item.status !== "approved" && item.status !== "paid" && <Button size="sm" onClick={() => updateSettlement(item.id, "approved", "Approved partner settlement")}>Approve</Button>}
                            {item.status !== "paid" && <Button size="sm" variant="outline" onClick={() => updateSettlement(item.id, "paid", "Released partner settlement")}>Mark paid</Button>}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredSettlements.length === 0 && <TableRow><TableCell colSpan={7} className="py-12 text-center text-sm text-slate-500">No partner settlements match the current search term.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6 pt-6">
          <Card className="border-slate-200 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Financial audit history</CardTitle>
              <CardDescription>A compact, time-stamped record of the governance actions taken in this workspace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Events logged</p><p className="mt-2 text-2xl font-semibold text-slate-900">{auditHistory.length}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reasons captured</p><p className="mt-2 text-2xl font-semibold text-slate-900">{auditCoverage}%</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Latest export</p><p className="mt-2 text-sm font-semibold text-slate-900">{auditHistory.find((item) => item.action.toLowerCase().includes("export"))?.reasonCode ?? "None yet"}</p></div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Timestamp</TableHead><TableHead>Actor</TableHead><TableHead>Action</TableHead><TableHead>Target</TableHead><TableHead>Reason code</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditHistory.filter((item) => filterHit([item.actor, item.action, item.target, item.reasonCode, item.status])).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-sm text-slate-600">{formatDateTime(item.timestamp)}</TableCell>
                        <TableCell className="text-sm text-slate-600">{item.actor}</TableCell>
                        <TableCell className="font-medium text-slate-900">{item.action}</TableCell>
                        <TableCell className="text-sm text-slate-600">{item.target}</TableCell>
                        <TableCell className="text-sm text-slate-600">{item.reasonCode}</TableCell>
                        <TableCell className="text-sm text-slate-600">{typeof item.amount === "number" ? formatCurrency(item.amount) : "—"}</TableCell>
                        <TableCell><StatusPill status={item.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-slate-200 bg-white/90 shadow-sm"><CardHeader><CardTitle className="text-lg">Revenue share rules</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-600"><p>Share percentages are computed from the latest approved contract metadata.</p><p>Partner revenue is blocked when reconciliation records are unresolved.</p></CardContent></Card>
            <Card className="border-slate-200 bg-white/90 shadow-sm"><CardHeader><CardTitle className="text-lg">Release gating</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-600"><p>Only approved or ready settlements are eligible for release.</p><p>On-hold settlements remain visible but cannot be paid until cleared.</p></CardContent></Card>
            <Card className="border-slate-200 bg-white/90 shadow-sm"><CardHeader><CardTitle className="text-lg">External traceability</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-600"><p>Every settlement change is written into the audit log with actor and reason code.</p><p>This mirrors the governed release history the spec asks for.</p></CardContent></Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FinanceBillingGovernancePanel;
