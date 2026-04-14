import { useState } from "react";
import { Building2, ChevronRight, BookOpen, ShieldCheck, FileText, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

/* ── Types ─────────────────────────────────────────────────────────────── */

type PartnerStatus = "active" | "onboarding" | "paused";
type AccreditationStatus = "active" | "pending" | "expired";
type VerificationStatus = "pending" | "verified" | "rejected";
type SubmissionStatus = "submitted" | "acknowledged" | "under-review" | "accepted";

interface PartnerCourse {
  id: string;
  title: string;
  enrolled: number;
  completed: number;
  revenue: number;
  partnerShare: number;
}

interface Partner {
  id: string;
  name: string;
  type: string;
  status: PartnerStatus;
  sharePercent: number;
  courses: PartnerCourse[];
}

interface AccreditationBody {
  id: string;
  name: string;
  region: string;
  status: AccreditationStatus;
  lastAudit: string;
  courses: string[];
}

interface VerificationCase {
  id: string;
  learner: string;
  credential: string;
  requestedBy: string;
  status: VerificationStatus;
  submittedAt: string;
}

interface SubmissionRecord {
  id: string;
  scope: string;
  recipient: string;
  authorizedBy: string;
  submittedAt: string;
  status: SubmissionStatus;
}

/* ── Mock data ─────────────────────────────────────────────────────────── */

const partners: Partner[] = [
  {
    id: "P-001", name: "Harvard Online", type: "Academic Institution", status: "active", sharePercent: 30,
    courses: [
      { id: "C-01", title: "IT 4.0: Digital Transformation", enrolled: 10000, completed: 9500, revenue: 1000000, partnerShare: 300000 },
      { id: "C-02", title: "Leadership in the Digital Age", enrolled: 4200, completed: 3800, revenue: 420000, partnerShare: 126000 },
    ],
  },
  {
    id: "P-002", name: "Dubai Knowledge Authority", type: "Government Body", status: "active", sharePercent: 20,
    courses: [
      { id: "C-03", title: "Smart Government Services", enrolled: 8200, completed: 7400, revenue: 820000, partnerShare: 164000 },
      { id: "C-04", title: "UAE Innovation Framework", enrolled: 3400, completed: 2800, revenue: 340000, partnerShare: 68000 },
    ],
  },
  {
    id: "P-003", name: "Kenyan EdTech Collective", type: "Regional Partner", status: "onboarding", sharePercent: 30,
    courses: [
      { id: "C-05", title: "Agile Project Management", enrolled: 1800, completed: 1200, revenue: 180000, partnerShare: 54000 },
    ],
  },
];

const accreditationBodies: AccreditationBody[] = [
  { id: "AB-01", name: "Dubai Digital Authority", region: "UAE", status: "active", lastAudit: "2026-01-15", courses: ["Smart Government Services", "UAE Innovation Framework"] },
  { id: "AB-02", name: "Kenyan National Qualifications Authority", region: "Kenya", status: "active", lastAudit: "2026-02-10", courses: ["Agile Project Management"] },
  { id: "AB-03", name: "Global Tech Accreditation Board", region: "International", status: "pending", lastAudit: "N/A", courses: [] },
];

const verificationCases: VerificationCase[] = [
  { id: "VR-501", learner: "Amina Osei", credential: "IT 4.0 Certificate", requestedBy: "Dubai Digital Authority", status: "pending", submittedAt: "2026-04-01T08:10:00Z" },
  { id: "VR-502", learner: "Noah Mensah", credential: "Smart Government Services Badge", requestedBy: "Kenyan NQCA", status: "verified", submittedAt: "2026-03-31T17:15:00Z" },
  { id: "VR-503", learner: "Irene Mwangi", credential: "Leadership Certificate", requestedBy: "Harvard Online", status: "rejected", submittedAt: "2026-03-29T11:45:00Z" },
];

const submissionHistory: SubmissionRecord[] = [
  { id: "SB-01", scope: "Q1 Learner Outcomes Report", recipient: "Dubai Digital Authority", authorizedBy: "Compliance Owner", submittedAt: "2026-04-01T09:00:00Z", status: "accepted" },
  { id: "SB-02", scope: "Accreditation Renewal Package", recipient: "Kenyan NQCA", authorizedBy: "Partnership Lead", submittedAt: "2026-03-28T14:30:00Z", status: "under-review" },
  { id: "SB-03", scope: "Partner Revenue Summary", recipient: "Harvard Online", authorizedBy: "Finance Operations", submittedAt: "2026-03-20T10:00:00Z", status: "acknowledged" },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function statusClass(status: string) {
  switch (status) {
    case "active": case "verified": case "accepted": return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "pending": case "onboarding": case "under-review": case "submitted": return "border-amber-200 bg-amber-50 text-amber-800";
    case "rejected": case "expired": return "border-rose-200 bg-rose-50 text-rose-700";
    case "acknowledged": return "border-sky-200 bg-sky-50 text-sky-700";
    default: return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const money = (v: number) => fmt.format(v);
const relTime = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  return days === 0 ? "today" : `${days}d ago`;
};

/* ── Component ─────────────────────────────────────────────────────────── */

export default function PartnerAccreditationReportingPanel() {
  const { toast } = useToast();
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [verifications, setVerifications] = useState(verificationCases);

  const selectedPartner = partners.find((p) => p.id === selectedPartnerId) ?? null;
  type CourseWithPartner = PartnerCourse & { partnerName?: string };
  const displayCourses: CourseWithPartner[] = selectedPartner
    ? selectedPartner.courses
    : partners.flatMap((p) => p.courses.map((c) => ({ ...c, partnerName: p.name })));

  const totalRevenue = partners.reduce((s, p) => s + p.courses.reduce((cs, c) => cs + c.revenue, 0), 0);
  const totalPartnerShare = partners.reduce((s, p) => s + p.courses.reduce((cs, c) => cs + c.partnerShare, 0), 0);

  const verify = (id: string, status: VerificationStatus) => {
    setVerifications((cur) => cur.map((v) => v.id === id ? { ...v, status } : v));
    toast({ title: "Verification updated", description: `Case ${id} is now ${status}.` });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#1e2348] via-[#24305f] to-[#0f172a] p-6 text-white shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            <ShieldCheck className="h-3.5 w-3.5" />
            Stage 4 external governance
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Partner, Accreditation &amp; External Reporting</h1>
          <p className="max-w-3xl text-sm text-white/75">
            Manage partner collaborations and their course reporting, accrediting body relationships, credential verification, and governed external submissions.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-4"><div className="text-xs uppercase tracking-[0.16em] text-white/55">Active Partners</div><div className="mt-2 text-2xl font-semibold">{partners.filter((p) => p.status === "active").length}</div></div>
          <div className="rounded-2xl bg-white/10 p-4"><div className="text-xs uppercase tracking-[0.16em] text-white/55">Total Partner Revenue</div><div className="mt-2 text-2xl font-semibold">{money(totalRevenue)}</div></div>
          <div className="rounded-2xl bg-white/10 p-4"><div className="text-xs uppercase tracking-[0.16em] text-white/55">Partner Share</div><div className="mt-2 text-2xl font-semibold">{money(totalPartnerShare)}</div></div>
        </div>
      </div>

      <Tabs defaultValue="partners" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-slate-100 p-2">
          <TabsTrigger value="partners" className="rounded-xl px-4 py-2 data-[state=active]:bg-white">Partner Reporting</TabsTrigger>
          <TabsTrigger value="accreditation" className="rounded-xl px-4 py-2 data-[state=active]:bg-white">Accreditation</TabsTrigger>
          <TabsTrigger value="verification" className="rounded-xl px-4 py-2 data-[state=active]:bg-white">Verification Console</TabsTrigger>
          <TabsTrigger value="submissions" className="rounded-xl px-4 py-2 data-[state=active]:bg-white">Submission History</TabsTrigger>
        </TabsList>

        {/* ── Partner Reporting ─────────────────────────────────────── */}
        <TabsContent value="partners" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader><CardTitle>Partners</CardTitle><CardDescription>Select a partner to view their course performance and revenue split.</CardDescription></CardHeader>
              <CardContent className="space-y-3">
                {partners.map((p) => {
                  const rev = p.courses.reduce((s, c) => s + c.revenue, 0);
                  return (
                    <button key={p.id} onClick={() => setSelectedPartnerId(selectedPartnerId === p.id ? null : p.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition-colors hover:bg-slate-50 ${selectedPartnerId === p.id ? "border-[#1e2348] bg-slate-50" : "border-slate-200"}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"><Building2 className="h-4 w-4 text-slate-600" /></div>
                          <div><div className="text-sm font-semibold text-slate-900">{p.name}</div><div className="text-xs text-slate-500">{p.type} · {p.sharePercent}% share</div></div>
                        </div>
                        <div className="flex items-center gap-2"><Badge className={statusClass(p.status)}>{p.status}</Badge><ChevronRight className="h-4 w-4 text-slate-400" /></div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                        <div><div className="font-semibold text-slate-700">{p.courses.length}</div><div className="text-slate-500">courses</div></div>
                        <div><div className="font-semibold text-slate-700">{p.courses.reduce((s, c) => s + c.enrolled, 0).toLocaleString()}</div><div className="text-slate-500">enrolled</div></div>
                        <div><div className="font-semibold text-slate-700">{money(rev)}</div><div className="text-slate-500">revenue</div></div>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>{selectedPartner ? `${selectedPartner.name} — Course Performance` : "All Partner Courses"}</CardTitle>
                <CardDescription>{selectedPartner ? `${selectedPartner.sharePercent}% revenue share applies to all joint courses.` : "Enrolment, completion, and revenue across all partner collaborations."}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPartner && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.16em] text-slate-500">Gross Revenue</div><div className="mt-1 text-xl font-bold">{money(selectedPartner.courses.reduce((s, c) => s + c.revenue, 0))}</div></div>
                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4"><div className="text-xs uppercase tracking-[0.16em] text-slate-500">Partner Share</div><div className="mt-1 text-xl font-bold text-indigo-600">{money(selectedPartner.courses.reduce((s, c) => s + c.partnerShare, 0))}</div></div>
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4"><div className="text-xs uppercase tracking-[0.16em] text-slate-500">DQ Net Share</div><div className="mt-1 text-xl font-bold text-emerald-600">{money(selectedPartner.courses.reduce((s, c) => s + c.revenue - c.partnerShare, 0))}</div></div>
                  </div>
                )}
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <Table>
                    <TableHeader><TableRow className="bg-slate-50">
                      <TableHead>Course</TableHead>
                      {!selectedPartner && <TableHead>Partner</TableHead>}
                      <TableHead className="text-right">Enrolled</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>
                      {displayCourses.map((course) => {
                        const rate = Math.round((course.completed / course.enrolled) * 100);
                        return (
                          <TableRow key={course.id}>
                            <TableCell><div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-[#ff6b4d]" /><span className="font-medium">{course.title}</span></div></TableCell>
                            {!selectedPartner && <TableCell className="text-slate-500 text-sm">{course.partnerName}</TableCell>}
                            <TableCell className="text-right">{course.enrolled.toLocaleString()}</TableCell>
                            <TableCell><div className="flex items-center gap-2"><Progress value={rate} className="h-2 w-16" /><span className="text-xs text-slate-500">{rate}%</span></div></TableCell>
                            <TableCell className="text-right font-medium">{money(course.revenue)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Accreditation ─────────────────────────────────────────── */}
        <TabsContent value="accreditation" className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader><CardTitle>Accrediting Bodies</CardTitle><CardDescription>Bodies that certify DTMA courses. Courses accredited by these bodies carry their official stamp on issued certificates.</CardDescription></CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <Table>
                  <TableHeader><TableRow className="bg-slate-50">
                    <TableHead>Body</TableHead><TableHead>Region</TableHead><TableHead>Accredited Courses</TableHead><TableHead>Last Audit</TableHead><TableHead>Status</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {accreditationBodies.map((body) => (
                      <TableRow key={body.id}>
                        <TableCell className="font-medium">{body.name}</TableCell>
                        <TableCell>{body.region}</TableCell>
                        <TableCell>
                          {body.courses.length === 0
                            ? <span className="text-slate-400 text-sm">None yet</span>
                            : <div className="flex flex-wrap gap-1">{body.courses.map((c) => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}</div>}
                        </TableCell>
                        <TableCell>{body.lastAudit}</TableCell>
                        <TableCell><Badge className={statusClass(body.status)}>{body.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Verification Console ──────────────────────────────────── */}
        <TabsContent value="verification" className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader><CardTitle>Verification Console</CardTitle><CardDescription>Controlled confirmation of learner credentials for authorized external parties. Only validated records are eligible for release.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {verifications.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <div className="font-medium text-slate-900">{item.learner}</div>
                      <div className="text-sm text-slate-600">{item.credential}</div>
                      <div className="text-xs text-slate-500">Requested by {item.requestedBy} · {relTime(item.submittedAt)}</div>
                    </div>
                    <Badge className={statusClass(item.status)}>{item.status}</Badge>
                  </div>
                  {item.status === "pending" && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" onClick={() => verify(item.id, "verified")}>Verify</Button>
                      <Button size="sm" variant="outline" onClick={() => verify(item.id, "rejected")}>Reject</Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Submission History ────────────────────────────────────── */}
        <TabsContent value="submissions" className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader><CardTitle>Submission History</CardTitle><CardDescription>Audit trail of all external data exchanges — what was shared, with whom, and under whose authority.</CardDescription></CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <Table>
                  <TableHeader><TableRow className="bg-slate-50">
                    <TableHead>Scope</TableHead><TableHead>Recipient</TableHead><TableHead>Authorized By</TableHead><TableHead>Submitted</TableHead><TableHead>Status</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {submissionHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell><div className="flex items-center gap-2"><FileText className="h-4 w-4 text-slate-400" /><span className="font-medium">{item.scope}</span></div></TableCell>
                        <TableCell>{item.recipient}</TableCell>
                        <TableCell>{item.authorizedBy}</TableCell>
                        <TableCell className="text-sm text-slate-500">{relTime(item.submittedAt)}</TableCell>
                        <TableCell><Badge className={statusClass(item.status)}>{item.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
