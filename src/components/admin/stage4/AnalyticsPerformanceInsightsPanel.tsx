import { useState } from "react";
import {
  BookOpen,
  Download,
  GraduationCap,
  Layers,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Period = "7d" | "30d" | "90d" | "365d";

type CoursePerformance = {
  id: string;
  title: string;
  owner: string;
  enrollments: number;
  completionRate: number;
  rating: number;
  revenue: number;
  dropOffPoint: string;
};

type FacultyPerformance = { name: string; rating: number; students: number; courses: number };
type CategoryPerformance = { name: string; enrollments: number; revenue: number; growth: string };
type TrendTopic = { topic: string; source: string; signal: string };

const periodProfiles: Record<Period, { enrolled: number; paid: number; unpaid: number; activeUsers: number; signUps: number }> = {
  "7d":   { enrolled: 2840, paid: 1210, unpaid: 278, activeUsers: 612,   signUps: 46  },
  "30d":  { enrolled: 2840, paid: 1210, unpaid: 278, activeUsers: 1488,  signUps: 182 },
  "90d":  { enrolled: 2840, paid: 1210, unpaid: 278, activeUsers: 3240,  signUps: 504 },
  "365d": { enrolled: 2840, paid: 1210, unpaid: 278, activeUsers: 12480, signUps: 2180 },
};

const coursePerformance: CoursePerformance[] = [
  { id: "CP-01", title: "Digital Transformation Fundamentals", owner: "Aisha Mensah",  enrollments: 342, completionRate: 72, rating: 4.8, revenue: 85500, dropOffPoint: "Module 4 case-study submission" },
  { id: "CP-02", title: "AI & Automation in the Workplace",    owner: "James Okafor",  enrollments: 219, completionRate: 65, rating: 4.6, revenue: 54750, dropOffPoint: "Simulation lab onboarding" },
  { id: "CP-03", title: "Agile Project Management",            owner: "Sofia Reyes",   enrollments: 187, completionRate: 58, rating: 4.5, revenue: 46750, dropOffPoint: "Sprint retrospective assignment" },
  { id: "CP-04", title: "Cybersecurity Essentials",            owner: "Kwame Asante",  enrollments: 154, completionRate: 81, rating: 4.7, revenue: 38500, dropOffPoint: "Low risk; no acute blocker" },
];

const facultyPerformance: FacultyPerformance[] = [
  { name: "Aisha Mensah", rating: 4.9, students: 1240, courses: 3 },
  { name: "James Okafor", rating: 4.8, students: 980,  courses: 2 },
  { name: "Sofia Reyes",  rating: 4.7, students: 850,  courses: 4 },
  { name: "Kwame Asante", rating: 4.7, students: 720,  courses: 2 },
];

const categoryPerformance: CategoryPerformance[] = [
  { name: "Digital Strategy",      enrollments: 1450, revenue: 320000, growth: "+12%" },
  { name: "Artificial Intelligence", enrollments: 980, revenue: 245000, growth: "+24%" },
  { name: "Project Management",    enrollments: 760,  revenue: 180000, growth: "+8%"  },
  { name: "Cybersecurity",         enrollments: 540,  revenue: 135000, growth: "+15%" },
];

const trendTopics: TrendTopic[] = [
  { topic: "AI operating models",          source: "Knowledge center search", signal: "+31% search volume"    },
  { topic: "Digital governance playbooks", source: "Program feedback",        signal: "Top open-text theme"   },
  { topic: "Sponsor change leadership",    source: "Cohort forum",            signal: "+18% discussion growth" },
];

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmt = (v: number) => currency.format(v);

export default function AnalyticsPerformanceInsightsPanel() {
  const { toast } = useToast();
  const [period, setPeriod] = useState<Period>("30d");

  const profile = periodProfiles[period];
  const paidRate = Math.round((profile.paid / profile.enrolled) * 100);

  const handleExport = () =>
    toast({ title: "Export queued", description: `Course & Faculty report for ${period} added to the export queue.` });

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e2348] via-[#24305f] to-[#0f172a] text-white shadow-xl">
        <div className="grid gap-8 px-6 py-7 lg:grid-cols-[1.6fr_0.9fr] lg:px-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              <Sparkles className="h-3.5 w-3.5" />
              Courses &amp; Faculty
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">Platform Analytics &amp; Performance Insights</h1>
              <p className="max-w-3xl text-sm text-white/75">
                Course performance, faculty ratings, category trends, and student headcount for the selected period.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["7d", "30d", "90d", "365d"] as Period[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPeriod(opt)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    period === opt ? "border-white bg-white text-slate-950" : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Headcount snapshot */}
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">Student Headcount</p>
            <div className="mt-2 text-3xl font-semibold tracking-tight">{profile.enrolled.toLocaleString()}</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 p-3">
                <div className="text-xs uppercase tracking-[0.16em] text-white/55">Paid</div>
                <div className="mt-1 text-xl font-semibold">{profile.paid.toLocaleString()}</div>
                <div className="text-xs text-white/40">{paidRate}% of enrolled</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <div className="text-xs uppercase tracking-[0.16em] text-white/55">Unpaid</div>
                <div className="mt-1 text-xl font-semibold">{profile.unpaid.toLocaleString()}</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <div className="text-xs uppercase tracking-[0.16em] text-white/55">Active</div>
                <div className="mt-1 text-xl font-semibold">{profile.activeUsers.toLocaleString()}</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <div className="text-xs uppercase tracking-[0.16em] text-white/55">New sign-ups</div>
                <div className="mt-1 text-xl font-semibold">{profile.signUps.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary stat cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Total Enrolled</p><div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{coursePerformance.reduce((a, c) => a + c.enrollments, 0).toLocaleString()}</div></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Users className="h-5 w-5" /></div></div></CardContent></Card>
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Active Courses</p><div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{coursePerformance.length}</div></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><BookOpen className="h-5 w-5" /></div></div></CardContent></Card>
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Avg Course Rating</p><div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">4.7</div></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><Sparkles className="h-5 w-5" /></div></div></CardContent></Card>
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Top Category</p><div className="mt-2 text-xl font-semibold tracking-tight text-slate-950">{categoryPerformance[0].name}</div></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"><Target className="h-5 w-5" /></div></div></CardContent></Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-slate-100 p-2">
            <TabsTrigger value="courses"    className="rounded-xl px-4 py-2">Course Performance</TabsTrigger>
            <TabsTrigger value="faculty"    className="rounded-xl px-4 py-2">Faculty</TabsTrigger>
            <TabsTrigger value="categories" className="rounded-xl px-4 py-2">Categories &amp; Trends</TabsTrigger>
          </TabsList>
          <Button onClick={handleExport} className="gap-2 bg-[#1e2348] text-white hover:bg-[#24305f]">
            <Download className="h-4 w-4" />Export report
          </Button>
        </div>

        {/* Course Performance */}
        <TabsContent value="courses" className="space-y-6">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>Enrollment, completion rate, rating, and revenue per course.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead className="text-right">Enrolled</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {coursePerformance.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.title}</TableCell>
                      <TableCell>{c.owner}</TableCell>
                      <TableCell className="text-right">{c.enrollments}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={c.completionRate} className="h-2 w-16" />
                          <span className="text-xs text-slate-500">{c.completionRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell><div className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-amber-500" />{c.rating}</div></TableCell>
                      <TableCell className="text-right">{fmt(c.revenue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-700">Drop-off hotspots</p>
                {coursePerformance.map((c) => (
                  <div key={c.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium text-slate-950">{c.title}</div>
                        <div className="mt-1 text-xs text-slate-500">{c.dropOffPoint}</div>
                      </div>
                      <Badge className="bg-white border-slate-200">{c.completionRate}% complete</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Faculty */}
        <TabsContent value="faculty" className="space-y-6">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Faculty Performance</CardTitle>
              <CardDescription>Top-rated instructors by learner feedback and student reach.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {facultyPerformance.map((f) => (
                <div key={f.name} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2348] text-white text-sm font-semibold">
                      {f.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{f.name}</div>
                      <div className="text-xs text-slate-500">{f.courses} courses · {f.students.toLocaleString()} students</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-950">{f.rating}</div>
                    <div className="flex gap-0.5 justify-end text-amber-500">
                      {[1,2,3,4,5].map((s) => <Sparkles key={s} className="h-3 w-3 fill-current" />)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories & Trends */}
        <TabsContent value="categories" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-200/80 shadow-sm">
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Enrollment and revenue by subject area.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryPerformance.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-xl text-slate-600"><Layers className="h-4 w-4" /></div>
                      <div>
                        <div className="font-semibold text-slate-900">{cat.name}</div>
                        <div className="text-xs text-slate-500">{cat.enrollments.toLocaleString()} enrollments</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{fmt(cat.revenue)}</div>
                      <div className="text-xs text-emerald-600 font-medium">{cat.growth} growth</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200/80 shadow-sm">
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>What students are searching for and discussing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendTopics.map((t) => (
                  <div key={t.topic} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-medium text-slate-950">{t.topic}</div>
                        <div className="text-xs text-slate-500">{t.source}</div>
                      </div>
                      <Badge className="border border-slate-200 bg-white text-slate-700 shrink-0">
                        <TrendingUp className="h-3 w-3 mr-1" />{t.signal}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
