import { useMemo, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  CheckCircle2,
  CircleAlert,
  FileText,
  Globe2,
  GraduationCap,
  Hash,
  Link2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UserCheck,
  Workflow,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type ExchangeMode = "push" | "pull" | "verify";
type ExchangeStatus = "active" | "review" | "paused";
type PacketStatus = "draft" | "ready" | "submitted" | "blocked";
type VerificationStatus = "pending" | "verified" | "rejected";
type SubmissionStatus = "approved" | "reconciled" | "sent" | "flagged";
type ReconciliationStatus = "open" | "in-review" | "resolved";

type PartnerExchange = {
  id: string;
  partner: string;
  channel: string;
  mode: ExchangeMode;
  scope: string;
  lastSync: string;
  status: ExchangeStatus;
  owner: string;
};

type ReportingPacket = {
  id: string;
  title: string;
  audience: string;
  complianceCheck: string;
  format: string;
  status: PacketStatus;
  owner: string;
  dueAt: string;
};

type VerificationCase = {
  id: string;
  learner: string;
  credential: string;
  outcome: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewer: string;
};

type SubmissionRecord = {
  id: string;
  target: string;
  destination: string;
  releasedBy: string;
  releasedAt: string;
  status: SubmissionStatus;
  authority: string;
};

type ReconciliationItem = {
  id: string;
  source: string;
  issue: string;
  variance: string;
  status: ReconciliationStatus;
  assignedTo: string;
};

type AuditEntry = {
  id: string;
  action: string;
  actor: string;
  reasonCode: string;
  entity: string;
  timestamp: string;
};

const initialPartnerExchanges: PartnerExchange[] = [
  {
    id: "EX-104",
    partner: "Northbridge Accreditation Council",
    channel: "Standards API",
    mode: "verify",
    scope: "Credential status, award date, program code",
    lastSync: "2026-03-31T14:20:00Z",
    status: "active",
    owner: "Accreditation Owner",
  },
  {
    id: "EX-221",
    partner: "Atlas Learning Partners",
    channel: "Secure CSV export",
    mode: "pull",
    scope: "Sponsor cohorts, completion rollups, attendance summaries",
    lastSync: "2026-03-30T09:15:00Z",
    status: "review",
    owner: "Partnership Lead",
  },
  {
    id: "EX-312",
    partner: "Global Skills Registry",
    channel: "Webhook relay",
    mode: "push",
    scope: "Verified learner outcomes and transcript identifiers",
    lastSync: "2026-03-28T19:45:00Z",
    status: "paused",
    owner: "Internal Records",
  },
];

const initialPackets: ReportingPacket[] = [
  {
    id: "RP-081",
    title: "Q1 sponsor performance summary",
    audience: "Sponsor executive sponsor",
    complianceCheck: "Financial sign-off, learner privacy review",
    format: "PDF + CSV appendix",
    status: "ready",
    owner: "Compliance Owner",
    dueAt: "2026-04-02T12:00:00Z",
  },
  {
    id: "RP-090",
    title: "Program accreditation evidence pack",
    audience: "Accreditation body",
    complianceCheck: "Outcome mapping, syllabus alignment, audit trail",
    format: "PDF package",
    status: "submitted",
    owner: "Accreditation Owner",
    dueAt: "2026-04-01T16:00:00Z",
  },
  {
    id: "RP-094",
    title: "Credential verification export",
    audience: "External verifier",
    complianceCheck: "Record reconciliation, minimum disclosure",
    format: "JSON payload",
    status: "blocked",
    owner: "Internal Records",
    dueAt: "2026-04-03T09:00:00Z",
  },
];

const initialVerificationCases: VerificationCase[] = [
  {
    id: "VR-402",
    learner: "Amina Osei",
    credential: "Digital Transformation Strategy Certificate",
    outcome: "Completed with distinction",
    status: "pending",
    submittedAt: "2026-04-01T08:10:00Z",
    reviewer: "Accreditation Owner",
  },
  {
    id: "VR-417",
    learner: "Noah Mensah",
    credential: "AI Operations Micro-Credential",
    outcome: "Awarded",
    status: "verified",
    submittedAt: "2026-03-31T17:15:00Z",
    reviewer: "Compliance Owner",
  },
  {
    id: "VR-421",
    learner: "Irene Mwangi",
    credential: "Executive Digital Change Badge",
    outcome: "Awarded",
    status: "rejected",
    submittedAt: "2026-03-29T11:45:00Z",
    reviewer: "Internal Records",
  },
];

const initialSubmissionHistory: SubmissionRecord[] = [
  {
    id: "SB-1208",
    target: "Northbridge Accreditation Council",
    destination: "Secure API endpoint",
    releasedBy: "Accreditation Owner",
    releasedAt: "2026-03-31T15:40:00Z",
    status: "reconciled",
    authority: "Policy rule AC-04",
  },
  {
    id: "SB-1209",
    target: "Atlas Learning Partners",
    destination: "Partner portal export",
    releasedBy: "Partnership Lead",
    releasedAt: "2026-03-31T10:25:00Z",
    status: "approved",
    authority: "Release memo PM-17",
  },
  {
    id: "SB-1210",
    target: "Global Skills Registry",
    destination: "Webhook relay",
    releasedBy: "Internal Records",
    releasedAt: "2026-03-30T18:05:00Z",
    status: "flagged",
    authority: "Disclosure exception EX-09",
  },
];

const initialReconciliationQueue: ReconciliationItem[] = [
  {
    id: "RC-501",
    source: "Sponsor cohort export",
    issue: "Seat count differs from source of record",
    variance: "-3 learners",
    status: "open",
    assignedTo: "Records Team",
  },
  {
    id: "RC-507",
    source: "Credential registry",
    issue: "Award date missing from outgoing payload",
    variance: "1 field",
    status: "in-review",
    assignedTo: "Accreditation Owner",
  },
  {
    id: "RC-509",
    source: "Verification console",
    issue: "Outcome status conflicts with internal result",
    variance: "1 mismatch",
    status: "resolved",
    assignedTo: "Compliance Owner",
  },
];

const initialAuditHistory: AuditEntry[] = [
  {
    id: "AU-901",
    action: "Approved accreditation export",
    actor: "Accreditation Owner",
    reasonCode: "ACC-RELEASE-01",
    entity: "RP-090",
    timestamp: "2026-03-31T15:38:00Z",
  },
  {
    id: "AU-904",
    action: "Blocked credential verification",
    actor: "Internal Records",
    reasonCode: "DISCLOSURE-MISSING-FIELD",
    entity: "VR-421",
    timestamp: "2026-03-29T11:50:00Z",
  },
  {
    id: "AU-906",
    action: "Reconciled partner submission",
    actor: "Partnership Lead",
    reasonCode: "SYNC-OK-03",
    entity: "SB-1209",
    timestamp: "2026-03-31T10:30:00Z",
  },
];

function relativeTime(value: string) {
  return formatDistanceToNow(new Date(value), { addSuffix: true });
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "active":
    case "verified":
    case "approved":
    case "reconciled":
    case "ready":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "review":
    case "in-review":
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "paused":
    case "blocked":
    case "rejected":
    case "flagged":
      return "bg-rose-100 text-rose-700 border-rose-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export default function PartnerAccreditationReportingPanel() {
  const [partnerExchanges, setPartnerExchanges] = useState(initialPartnerExchanges);
  const [reportingPackets, setReportingPackets] = useState(initialPackets);
  const [verificationCases, setVerificationCases] = useState(initialVerificationCases);
  const [submissionHistory, setSubmissionHistory] = useState(initialSubmissionHistory);
  const [reconciliationQueue, setReconciliationQueue] = useState(initialReconciliationQueue);
  const [auditHistory, setAuditHistory] = useState(initialAuditHistory);

  const [selectedExchangeId, setSelectedExchangeId] = useState(initialPartnerExchanges[0].id);
  const [reportQuery, setReportQuery] = useState("Accreditation");
  const [reportAudience, setReportAudience] = useState("Accreditation body");
  const [reportFormat, setReportFormat] = useState("PDF package");
  const [reportNotes, setReportNotes] = useState("Package should include evidence mapping and authoritative timestamps.");
  const [verificationFilter, setVerificationFilter] = useState<VerificationStatus | "all">("all");
  const [submissionFilter, setSubmissionFilter] = useState<SubmissionStatus | "all">("all");

  const selectedExchange = useMemo(
    () => partnerExchanges.find((exchange) => exchange.id === selectedExchangeId) ?? partnerExchanges[0],
    [partnerExchanges, selectedExchangeId],
  );

  const summary = useMemo(() => {
    const activeExchanges = partnerExchanges.filter((item) => item.status === "active").length;
    const readyPackets = reportingPackets.filter((item) => item.status === "ready").length;
    const verifiedItems = verificationCases.filter((item) => item.status === "verified").length;
    const blockedItems =
      reportingPackets.filter((item) => item.status === "blocked").length +
      reconciliationQueue.filter((item) => item.status !== "resolved").length;

    return { activeExchanges, readyPackets, verifiedItems, blockedItems };
  }, [partnerExchanges, reportingPackets, verificationCases, reconciliationQueue]);

  const filteredVerificationCases = verificationCases.filter((item) =>
    verificationFilter === "all" ? true : item.status === verificationFilter,
  );
  const filteredSubmissions = submissionHistory.filter((item) =>
    submissionFilter === "all" ? true : item.status === submissionFilter,
  );

  const addAuditEntry = (entry: Omit<AuditEntry, "id" | "timestamp">) => {
    setAuditHistory((current) => [
      {
        ...entry,
        id: `AU-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: new Date().toISOString(),
      },
      ...current,
    ]);
  };

  const updateExchangeStatus = (exchangeId: string, status: ExchangeStatus) => {
    setPartnerExchanges((current) =>
      current.map((exchange) => (exchange.id === exchangeId ? { ...exchange, status } : exchange)),
    );
    addAuditEntry({
      action: `Updated partner exchange to ${status}`,
      actor: "Partnership Lead",
      reasonCode: "EXCHANGE-UPDATE",
      entity: exchangeId,
    });
  };

  const submitPacket = (packetId: string) => {
    setReportingPackets((current) =>
      current.map((packet) =>
        packet.id === packetId ? { ...packet, status: packet.status === "blocked" ? "draft" : "submitted" } : packet,
      ),
    );
    setSubmissionHistory((current) => [
      {
        id: `SB-${Math.floor(1300 + Math.random() * 500)}`,
        target: reportAudience,
        destination: "Approved release path",
        releasedBy: "Compliance Owner",
        releasedAt: new Date().toISOString(),
        status: "sent",
        authority: "Manual release confirmation",
      },
      ...current,
    ]);
    addAuditEntry({
      action: "Submitted reporting packet",
      actor: "Compliance Owner",
      reasonCode: "REPORT-SUBMIT",
      entity: packetId,
    });
  };

  const verifyCase = (verificationId: string, status: VerificationStatus) => {
    setVerificationCases((current) =>
      current.map((item) => (item.id === verificationId ? { ...item, status } : item)),
    );
    addAuditEntry({
      action: `Marked verification case as ${status}`,
      actor: "Accreditation Owner",
      reasonCode: status === "verified" ? "VERIFICATION-OK" : "VERIFICATION-EXCEPTION",
      entity: verificationId,
    });
  };

  const resolveReconciliation = (reconciliationId: string) => {
    setReconciliationQueue((current) =>
      current.map((item) => (item.id === reconciliationId ? { ...item, status: "resolved" } : item)),
    );
    addAuditEntry({
      action: "Resolved reconciliation issue",
      actor: "Records Team",
      reasonCode: "RECONCILED",
      entity: reconciliationId,
    });
  };

  const saveExchangeConfiguration = () => {
    setPartnerExchanges((current) =>
      current.map((exchange) =>
        exchange.id === selectedExchange.id
          ? {
              ...exchange,
              channel: reportFormat === "JSON payload" ? "Webhook relay" : "Secure CSV export",
              scope: reportNotes,
            }
          : exchange,
      ),
    );
    addAuditEntry({
      action: `Saved partner exchange configuration for ${reportQuery}`,
      actor: "Partnership Lead",
      reasonCode: "CONFIG-SAVE",
      entity: selectedExchange.id,
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#1e2348] via-[#24305f] to-[#0f172a] p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              <Workflow className="h-3.5 w-3.5" />
              Stage 4 Governance Workspace
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold leading-tight">Partner, Accreditation & External Reporting</h2>
              <p className="max-w-3xl text-sm leading-6 text-white/75">
                Govern approved data exchange, accreditation evidence, credential verification, and external submissions from a single admin panel.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Active exchanges", value: summary.activeExchanges },
              { label: "Ready packets", value: summary.readyPackets },
              { label: "Verified cases", value: summary.verifiedItems },
              { label: "Open blockers", value: summary.blockedItems },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="text-2xl font-semibold">{item.value}</div>
                <div className="text-xs uppercase tracking-[0.16em] text-white/65">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Exchange health", value: `${summary.activeExchanges}/${partnerExchanges.length}` },
          { label: "Submission readiness", value: summary.readyPackets },
          { label: "Verified outcomes", value: summary.verifiedItems },
          { label: "Blocking issues", value: summary.blockedItems },
        ].map((item, index) => {
          const accent =
            index === 0
              ? "bg-slate-100 text-slate-700"
              : index === 1
                ? "bg-emerald-100 text-emerald-700"
                : index === 2
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-amber-100 text-amber-800";

          return (
            <Card key={item.label} className="border-slate-200 shadow-sm">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                </div>
                <div className={`rounded-full p-3 ${accent}`}>
                  {index === 0 ? <Globe2 className="h-5 w-5" /> : index === 1 ? <CheckCircle2 className="h-5 w-5" /> : index === 2 ? <ShieldCheck className="h-5 w-5" /> : <CircleAlert className="h-5 w-5" />}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Partner Exchange Configuration</CardTitle>
            <CardDescription>
              Control which governed data can move outward, how it syncs, and what minimum scope is exposed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Selected partner</Label>
                <Select value={selectedExchange.id} onValueChange={setSelectedExchangeId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {partnerExchanges.map((exchange) => (
                      <SelectItem key={exchange.id} value={exchange.id}>
                        {exchange.partner}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Configuration label</Label>
                <Input value={reportQuery} onChange={(event) => setReportQuery(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Exchange scope</Label>
                <Select value={reportAudience} onValueChange={setReportAudience}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Accreditation body">Accreditation body</SelectItem>
                    <SelectItem value="Sponsor executive sponsor">Sponsor executive sponsor</SelectItem>
                    <SelectItem value="External verifier">External verifier</SelectItem>
                    <SelectItem value="Partner portal">Partner portal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Output format</Label>
                <Select value={reportFormat} onValueChange={setReportFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF package">PDF package</SelectItem>
                    <SelectItem value="CSV export">CSV export</SelectItem>
                    <SelectItem value="JSON payload">JSON payload</SelectItem>
                    <SelectItem value="XML bundle">XML bundle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Scope notes</Label>
              <Textarea rows={4} value={reportNotes} onChange={(event) => setReportNotes(event.target.value)} />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={saveExchangeConfiguration} className="bg-[#ff6b4d] text-white hover:bg-[#e25d43]">
                Save configuration
              </Button>
              <Button variant="outline" onClick={() => updateExchangeStatus(selectedExchange.id, "active")}>
                Activate exchange
              </Button>
              <Button variant="outline" onClick={() => updateExchangeStatus(selectedExchange.id, "review")}>
                Send to review
              </Button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    <Link2 className="h-4 w-4 text-[#ff6b4d]" />
                    {selectedExchange.partner}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedExchange.scope}</p>
                </div>
                <Badge className={statusBadgeClass(selectedExchange.status)}>{selectedExchange.status}</Badge>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Mode</div>
                  <div className="mt-1 text-sm font-medium capitalize">{selectedExchange.mode}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Channel</div>
                  <div className="mt-1 text-sm font-medium">{selectedExchange.channel}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Last sync</div>
                  <div className="mt-1 text-sm font-medium">{relativeTime(selectedExchange.lastSync)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Reporting Preparation</CardTitle>
            <CardDescription>Assemble external reports from validated records before release.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportingPackets.map((packet) => (
              <div key={packet.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <FileText className="h-4 w-4 text-[#ff6b4d]" />
                      {packet.title}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{packet.audience}</p>
                  </div>
                  <Badge className={statusBadgeClass(packet.status)}>{packet.status}</Badge>
                </div>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Compliance</div>
                    <div className="mt-1">{packet.complianceCheck}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Format</div>
                    <div className="mt-1">{packet.format}</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-muted-foreground">Due {format(new Date(packet.dueAt), "MMM d, yyyy")}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => submitPacket(packet.id)}>
                      Submit release
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setReportingPackets((current) =>
                          current.map((item) => (item.id === packet.id ? { ...item, status: "blocked" } : item)),
                        )
                      }
                    >
                      Mark blocked
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Verification Console</CardTitle>
            <CardDescription>Approve or reject credential confirmations with minimum disclosure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-sm font-medium text-muted-foreground">Filter</div>
              <div className="flex flex-wrap gap-2">
                {(["all", "pending", "verified", "rejected"] as const).map((status) => (
                  <Button
                    key={status}
                    variant={verificationFilter === status ? "default" : "outline"}
                    className={verificationFilter === status ? "bg-[#1e2348] text-white" : ""}
                    onClick={() => setVerificationFilter(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            {filteredVerificationCases.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <GraduationCap className="h-4 w-4 text-[#ff6b4d]" />
                      {item.learner}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.credential}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>{item.outcome}</span>
                      <span>Submitted {relativeTime(item.submittedAt)}</span>
                      <span>Reviewer: {item.reviewer}</span>
                    </div>
                  </div>
                  <Badge className={statusBadgeClass(item.status)}>{item.status}</Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => verifyCase(item.id, "verified")}>
                    Approve verification
                  </Button>
                  <Button variant="outline" onClick={() => verifyCase(item.id, "rejected")}>
                    Reject
                  </Button>
                  <Button variant="outline" onClick={() => verifyCase(item.id, "pending")}>
                    Hold for review
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Reconciliation Queue</CardTitle>
            <CardDescription>Resolve mismatches before external release or accreditation submission.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {reconciliationQueue.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Hash className="h-4 w-4 text-[#ff6b4d]" />
                      {item.source}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.issue}</p>
                    <div className="text-xs text-muted-foreground">
                      Variance: {item.variance} | Assigned to {item.assignedTo}
                    </div>
                  </div>
                  <Badge className={statusBadgeClass(item.status)}>{item.status}</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" onClick={() => resolveReconciliation(item.id)}>
                    Mark resolved
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setReconciliationQueue((current) =>
                        current.map((entry) => (entry.id === item.id ? { ...entry, status: "in-review" } : entry)),
                      )
                    }
                  >
                    Escalate review
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Submission History</CardTitle>
            <CardDescription>Track what was shared, when it was released, and under whose authority.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-sm font-medium text-muted-foreground">Filter</div>
              <div className="flex flex-wrap gap-2">
                {(["all", "approved", "reconciled", "sent", "flagged"] as const).map((status) => (
                  <Button
                    key={status}
                    variant={submissionFilter === status ? "default" : "outline"}
                    className={submissionFilter === status ? "bg-[#1e2348] text-white" : ""}
                    onClick={() => setSubmissionFilter(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Target</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Authority</TableHead>
                    <TableHead>Released</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div>{item.target}</div>
                        <div className="text-xs text-muted-foreground">{item.releasedBy}</div>
                      </TableCell>
                      <TableCell>{item.destination}</TableCell>
                      <TableCell>{item.authority}</TableCell>
                      <TableCell>{format(new Date(item.releasedAt), "MMM d, yyyy h:mm a")}</TableCell>
                      <TableCell>
                        <Badge className={statusBadgeClass(item.status)}>{item.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Financial Audit History</CardTitle>
            <CardDescription>Capture the reason code and actor for every externally visible action.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {auditHistory.map((entry) => (
              <div key={entry.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-900">{entry.action}</div>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>Actor: {entry.actor}</span>
                      <span>Reason: {entry.reasonCode}</span>
                      <span>Entity: {entry.entity}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{relativeTime(entry.timestamp)}</span>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Sparkles className="h-4 w-4 text-[#ff6b4d]" />
                Governed external release checklist
              </div>
              <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-emerald-600" />
                  Validated internal records
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Reviewed and approved release authority
                </div>
                <div className="flex items-center gap-2">
                  <UploadCloud className="h-4 w-4 text-emerald-600" />
                  Submission history retained for audit
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Operational Snapshot</CardTitle>
          <CardDescription>
            This workspace is intentionally mock-driven so the Stage 4 governance flow is visible without backend persistence.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Configured rules",
              value: partnerExchanges.length,
              detail: "Partner exchange profiles",
            },
            {
              title: "External outputs",
              value: reportingPackets.length,
              detail: "Reporting packets in flight",
            },
            {
              title: "Risk controls",
              value: reconciliationQueue.filter((item) => item.status !== "resolved").length,
              detail: "Open reconciliation blockers",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
              <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.title}</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{item.detail}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
