import { useMemo, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  CheckCircle2,
  CircleAlert,
  FileText,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
  Search,
  Award,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type VerificationStatus = "pending" | "verified" | "rejected";

type VerificationCase = {
  id: string;
  learner: string;
  credential: string;
  outcome: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewer: string;
};

type AccreditationBody = {
  id: string;
  name: string;
  region: string;
  status: "active" | "pending";
  lastAudit: string;
};

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

const initialBodies: AccreditationBody[] = [
  { id: "AB-01", name: "Dubai Digital Authority", region: "UAE", status: "active", lastAudit: "2026-01-15" },
  { id: "AB-02", name: "Kenyan Skills Council", region: "Kenya", status: "active", lastAudit: "2026-02-10" },
  { id: "AB-03", name: "Global Tech Accreditation", region: "International", status: "pending", lastAudit: "N/A" },
];

function relativeTime(value: string) {
  return formatDistanceToNow(new Date(value), { addSuffix: true });
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "active":
    case "verified":
    case "approved":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "rejected":
      return "bg-rose-100 text-rose-700 border-rose-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export default function AccreditationPanel() {
  const [verificationCases, setVerificationCases] = useState(initialVerificationCases);
  const [verificationFilter, setVerificationFilter] = useState<VerificationStatus | "all">("all");

  const summary = useMemo(() => {
    const pending = verificationCases.filter(v => v.status === 'pending').length;
    const verified = verificationCases.filter(v => v.status === 'verified').length;
    return { pending, verified };
  }, [verificationCases]);

  const filteredVerificationCases = verificationCases.filter((item) =>
    verificationFilter === "all" ? true : item.status === verificationFilter,
  );

  const verifyCase = (verificationId: string, status: VerificationStatus) => {
    setVerificationCases((current) =>
      current.map((item) => (item.id === verificationId ? { ...item, status } : item)),
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-[#eef7ff] p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1e2348]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#1e2348]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Accreditation & Certification Authority
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold leading-tight text-slate-900">Governance & Body Accreditation</h2>
              <p className="max-w-3xl text-sm leading-6 text-slate-600">
                Manage relationship with accrediting bodies, verify learner outcomes, and ensure platform-wide certification standards.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            {[
              { label: "Pending Verification", value: summary.pending },
              { label: "Verified Outcomes", value: summary.verified },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                <div className="text-2xl font-semibold text-slate-900">{item.value}</div>
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
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
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Accrediting Bodies</CardTitle>
            <CardDescription>Manage regional and international accreditation partnerships.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Body Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Last Audit</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialBodies.map((body) => (
                    <TableRow key={body.id}>
                      <TableCell className="font-medium">{body.name}</TableCell>
                      <TableCell>{body.region}</TableCell>
                      <TableCell>{body.lastAudit}</TableCell>
                      <TableCell>
                        <Badge className={statusBadgeClass(body.status)}>{body.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 rounded-2xl bg-[#ff6b4d]/5 p-4 border border-[#ff6b4d]/10">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#ff6b4d]">
                <Award className="h-4 w-4" />
                Certification Standards
              </div>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Certificates are automatically generated for learners who pass assessment governance checks. Official stamps are managed per accrediting body.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Governance Compliance Checklist</CardTitle>
          <CardDescription>Ensure all certificates meet regional and partner requirements.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Verified Learners",
              value: "2,934",
              detail: "Cross-checked with registry",
            },
            {
              title: "Active Stamps",
              value: "5",
              detail: "Approved digital signatures",
            },
            {
              title: "Compliance Rate",
              value: "99.8%",
              detail: "Audit trail integrity score",
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
