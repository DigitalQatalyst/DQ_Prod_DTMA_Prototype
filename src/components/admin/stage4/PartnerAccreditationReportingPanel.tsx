import { useMemo, useState } from "react";
import {
  BookOpen,
  Building2,
  ChevronRight,
  DollarSign,
  GraduationCap,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

/* ── Types ─────────────────────────────────────────────────────────────── */

type PartnerCourse = {
  id: string;
  title: string;
  category: string;
  enrolled: number;
  completed: number;
  revenue: number;
  rating: number;
};

type Partner = {
  id: string;
  name: string;
  type: string;
  status: "active" | "onboarding" | "paused";
  since: string;
  sharePercent: number;
  courses: PartnerCourse[];
};

/* ── Mock data ─────────────────────────────────────────────────────────── */

const partners: Partner[] = [
  {
    id: "P-001",
    name: "Harvard Online",
    type: "Academic Institution",
    status: "active",
    since: "2025-06-01",
    sharePercent: 30,
    courses: [
      { id: "C-01", title: "IT 4.0: Digital Transformation", category: "Digital Skills", enrolled: 10000, completed: 9500, revenue: 1000000, rating: 4.8 },
      { id: "C-02", title: "Leadership in the Digital Age", category: "Leadership", enrolled: 4200, completed: 3800, revenue: 420000, rating: 4.7 },
      { id: "C-03", title: "Data-Driven Decision Making", category: "Analytics", enrolled: 3100, completed: 2650, revenue: 310000, rating: 4.5 },
    ],
  },
  {
    id: "P-002",
    name: "Coursera for Business",
    type: "Learning Platform",
    status: "active",
    since: "2025-09-15",
    sharePercent: 25,
    courses: [
      { id: "C-04", title: "AI & Automation in the Workplace", category: "AI & Technology", enrolled: 6500, completed: 5200, revenue: 650000, rating: 4.6 },
      { id: "C-05", title: "Cybersecurity Essentials", category: "Digital Skills", enrolled: 4800, completed: 4100, revenue: 480000, rating: 4.7 },
    ],
  },
  {
    id: "P-003",
    name: "Dubai Knowledge Authority",
    type: "Government Body",
    status: "active",
    since: "2025-11-01",
    sharePercent: 20,
    courses: [
      { id: "C-06", title: "Smart Government Services", category: "Public Sector", enrolled: 8200, completed: 7400, revenue: 820000, rating: 4.9 },
      { id: "C-07", title: "Arabic Digital Literacy", category: "Digital Skills", enrolled: 5600, completed: 4900, revenue: 560000, rating: 4.4 },
      { id: "C-08", title: "UAE Innovation Framework", category: "Innovation", enrolled: 3400, completed: 2800, revenue: 340000, rating: 4.6 },
    ],
  },
  {
    id: "P-004",
    name: "Kenyan EdTech Collective",
    type: "Regional Partner",
    status: "onboarding",
    since: "2026-02-10",
    sharePercent: 30,
    courses: [
      { id: "C-09", title: "Agile Project Management", category: "Management", enrolled: 1800, completed: 1200, revenue: 180000, rating: 4.3 },
    ],
  },
];

/* ── Helpers ────────────────────────────────────────────────────────────── */

function statusBadgeClass(status: string) {
  switch (status) {
    case "active":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "onboarding":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "paused":
      return "bg-slate-100 text-slate-600 border-slate-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

/* ── Component ─────────────────────────────────────────────────────────── */

export default function PartnerAccreditationReportingPanel() {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>("all");

  const totals = useMemo(() => {
    const allCourses = partners.flatMap((p) => p.courses);
    return {
      partners: partners.length,
      activePartners: partners.filter((p) => p.status === "active").length,
      courses: allCourses.length,
      enrolled: allCourses.reduce((s, c) => s + c.enrolled, 0),
      completed: allCourses.reduce((s, c) => s + c.completed, 0),
      revenue: allCourses.reduce((s, c) => s + c.revenue, 0),
    };
  }, []);

  const selectedPartner = selectedPartnerId === "all" ? null : partners.find((p) => p.id === selectedPartnerId) ?? null;

  const displayCourses = selectedPartner ? selectedPartner.courses : partners.flatMap((p) => p.courses.map((c) => ({ ...c, partnerName: p.name })));

  const displayRevenue = selectedPartner
    ? selectedPartner.courses.reduce((s, c) => s + c.revenue, 0)
    : totals.revenue;
  const displayEnrolled = selectedPartner
    ? selectedPartner.courses.reduce((s, c) => s + c.enrolled, 0)
    : totals.enrolled;
  const displayCompleted = selectedPartner
    ? selectedPartner.courses.reduce((s, c) => s + c.completed, 0)
    : totals.completed;
  const sharePercent = selectedPartner ? selectedPartner.sharePercent : 0;
  const partnerShare = selectedPartner ? Math.round(displayRevenue * (sharePercent / 100)) : partners.reduce((s, p) => s + p.courses.reduce((cs, c) => cs + c.revenue, 0) * (p.sharePercent / 100), 0);
  const dqShare = displayRevenue - partnerShare;

  return (
    <div className="space-y-6">
      {/* ── Header banner ───────────────────────────────────────────── */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#1e2348] via-[#24305f] to-[#0f172a] p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              <Workflow className="h-3.5 w-3.5" />
              Stage 4 · Partner Reporting
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold leading-tight">Partner Reporting</h2>
              <p className="max-w-3xl text-sm leading-6 text-white/75">
                View performance across all partner collaborations — courses delivered, learner enrolment & completion, revenue generated, and revenue share breakdown.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Partners", value: totals.partners },
              { label: "Courses", value: totals.courses },
              { label: "Total Learners", value: totals.enrolled.toLocaleString() },
              { label: "Total Revenue", value: `$${(totals.revenue / 1000000).toFixed(1)}M` },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="text-2xl font-semibold">{item.value}</div>
                <div className="text-xs uppercase tracking-[0.16em] text-white/65">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Partner selector ────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Viewing</span>
        <Select value={selectedPartnerId} onValueChange={setSelectedPartnerId}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="All partners" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Partners</SelectItem>
            {partners.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── KPI row ─────────────────────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Revenue", value: `$${displayRevenue.toLocaleString()}`, icon: DollarSign, accent: "bg-emerald-100 text-emerald-700" },
          { label: "Learners Enrolled", value: displayEnrolled.toLocaleString(), icon: Users, accent: "bg-indigo-100 text-indigo-700" },
          { label: "Learners Completed", value: displayCompleted.toLocaleString(), icon: GraduationCap, accent: "bg-violet-100 text-violet-700" },
          { label: "Completion Rate", value: `${displayEnrolled > 0 ? Math.round((displayCompleted / displayEnrolled) * 100) : 0}%`, icon: TrendingUp, accent: "bg-amber-100 text-amber-800" },
        ].map((item) => (
          <Card key={item.label} className="border-slate-200 shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold">{item.value}</p>
              </div>
              <div className={`rounded-full p-3 ${item.accent}`}>
                <item.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Revenue split ───────────────────────────────────────────── */}
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Revenue Share Breakdown</CardTitle>
            <CardDescription>
              {selectedPartner
                ? `${selectedPartner.name} receives ${selectedPartner.sharePercent}% of revenue generated from joint courses.`
                : "Revenue distribution across all partner collaborations."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Gross Revenue</div>
                <div className="mt-1 text-xl font-bold">${displayRevenue.toLocaleString()}</div>
              </div>
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Partner Share</div>
                <div className="mt-1 text-xl font-bold text-indigo-600">${partnerShare.toLocaleString()}</div>
                {selectedPartner && <div className="mt-0.5 text-xs text-indigo-500">{selectedPartner.sharePercent}%</div>}
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">DQ Net Share</div>
                <div className="mt-1 text-xl font-bold text-emerald-600">${dqShare.toLocaleString()}</div>
                {selectedPartner && <div className="mt-0.5 text-xs text-emerald-500">{100 - selectedPartner.sharePercent}%</div>}
              </div>
            </div>

            {selectedPartner && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">DQ Share ({100 - sharePercent}%)</span>
                  <span className="text-muted-foreground">Partner Share ({sharePercent}%)</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500" style={{ width: `${100 - sharePercent}%` }} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Partner list ─────────────────────────────────────────── */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Partners Overview</CardTitle>
            <CardDescription>All organisations collaborating with DQ on course delivery.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {partners.map((p) => {
              const pRevenue = p.courses.reduce((s, c) => s + c.revenue, 0);
              const pEnrolled = p.courses.reduce((s, c) => s + c.enrolled, 0);
              const pCompleted = p.courses.reduce((s, c) => s + c.completed, 0);
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPartnerId(p.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors hover:bg-slate-50 ${selectedPartnerId === p.id ? "border-indigo-300 bg-indigo-50/40" : "border-slate-200"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                        <Building2 className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.type} · {p.courses.length} course{p.courses.length !== 1 ? "s" : ""}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={statusBadgeClass(p.status)}>{p.status}</Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="font-semibold text-slate-700">{pEnrolled.toLocaleString()}</div>
                      <div className="text-muted-foreground">enrolled</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">{pCompleted.toLocaleString()}</div>
                      <div className="text-muted-foreground">completed</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">${(pRevenue / 1000).toFixed(0)}k</div>
                      <div className="text-muted-foreground">revenue</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* ── Course-level breakdown ──────────────────────────────────── */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            {selectedPartner ? `${selectedPartner.name} — Course Performance` : "All Partner Courses"}
          </CardTitle>
          <CardDescription>
            {selectedPartner
              ? `Courses delivered in collaboration with ${selectedPartner.name}.`
              : "Per-course enrolment, completion, and revenue across all partner collaborations."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Course</TableHead>
                  {!selectedPartner && <TableHead>Partner</TableHead>}
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Enrolled</TableHead>
                  <TableHead className="text-right">Completed</TableHead>
                  <TableHead className="text-center">Completion</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayCourses.map((course: any) => {
                  const completionRate = Math.round((course.completed / course.enrolled) * 100);
                  return (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-[#ff6b4d]" />
                          {course.title}
                        </div>
                      </TableCell>
                      {!selectedPartner && <TableCell className="text-muted-foreground">{(course as any).partnerName}</TableCell>}
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{course.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{course.enrolled.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{course.completed.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={completionRate} className="h-2 w-16" />
                          <span className="text-xs text-muted-foreground">{completionRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">${course.revenue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className="text-sm">⭐ {course.rating}</span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ── Per-partner revenue summary table ──────────────────────── */}
      {!selectedPartner && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Revenue Summary by Partner</CardTitle>
            <CardDescription>Gross revenue, partner share, and DQ net share for each collaboration.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Partner</TableHead>
                    <TableHead className="text-right">Courses</TableHead>
                    <TableHead className="text-right">Learners</TableHead>
                    <TableHead className="text-right">Gross Revenue</TableHead>
                    <TableHead className="text-center">Share %</TableHead>
                    <TableHead className="text-right">Partner Share</TableHead>
                    <TableHead className="text-right">DQ Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((p) => {
                    const pRevenue = p.courses.reduce((s, c) => s + c.revenue, 0);
                    const pShare = Math.round(pRevenue * (p.sharePercent / 100));
                    const pDQ = pRevenue - pShare;
                    const pLearners = p.courses.reduce((s, c) => s + c.enrolled, 0);
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell className="text-right">{p.courses.length}</TableCell>
                        <TableCell className="text-right">{pLearners.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${pRevenue.toLocaleString()}</TableCell>
                        <TableCell className="text-center">{p.sharePercent}%</TableCell>
                        <TableCell className="text-right text-indigo-600">${pShare.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-emerald-600">${pDQ.toLocaleString()}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
