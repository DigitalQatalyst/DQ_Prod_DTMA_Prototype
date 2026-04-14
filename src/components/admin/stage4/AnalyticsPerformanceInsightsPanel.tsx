import { useState } from "react";
import {
  BookOpen,
  Download,
  GraduationCap,
  Info,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

type FacultyPerformance = {
  name: string;
  rating: number;
  activeStudents: number;
  courses: number;
  completionRate: number;   // % of enrolled who finished
  lastActiveDaysAgo: number;
  unansweredQA: number;
};
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
  { name: "Aisha Mensah",  rating: 4.9, activeStudents: 342, courses: 3, completionRate: 74, lastActiveDaysAgo: 1,  unansweredQA: 0 },
  { name: "James Okafor",  rating: 4.8, activeStudents: 219, courses: 2, completionRate: 65, lastActiveDaysAgo: 3,  unansweredQA: 4 },
  { name: "Sofia Reyes",   rating: 4.7, activeStudents: 187, courses: 4, completionRate: 58, lastActiveDaysAgo: 16, unansweredQA: 2 },
  { name: "Kwame Asante",  rating: 4.7, activeStudents: 154, courses: 2, completionRate: 81, lastActiveDaysAgo: 2,  unansweredQA: 0 },
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
  const [remindedFaculty, setRemindedFaculty] = useState<Set<string>>(new Set());

  const profile = periodProfiles[period];
  const paidRate = Math.round((profile.paid / profile.enrolled) * 100);

  const handleExport = () =>
    toast({ title: "Export queued", description: `Course & Faculty report for ${period} added to the export queue.` });

  // Reusable inline info icon with tooltip
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

  return (
    <div className="space-y-6">
      {/* Page header — plain, matching Academy Overview */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[28px] leading-[36px] font-semibold">Courses &amp; Faculty</h2>
          <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
            Course performance, faculty ratings, and student headcount.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["7d", "30d", "90d", "365d"] as Period[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setPeriod(opt)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                period === opt
                  ? "border-[#1e2348] bg-[#1e2348] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* KPI grid — two logical rows: operational (top) then informational (bottom) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Row 1: student headcount — operational */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-[#ff6b4d]" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{profile.enrolled.toLocaleString()}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Total Students Enrolled</div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{profile.paid.toLocaleString()}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Paid Enrollments</div>
          <div className="text-[12px] leading-[16px] text-muted-foreground mt-0.5 flex items-center">{paidRate}% of enrollments <Tip text="Percentage of enrollments completed via paid purchase or active subscription, excluding free courses." /></div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center mb-3">
            <Target className="w-5 h-5 text-rose-500" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{profile.unpaid.toLocaleString()}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Free Course Enrollments</div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-[#ff6b4d]" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{profile.activeUsers.toLocaleString()}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">Students Active This Month</div>
          <div className="text-[12px] leading-[16px] text-muted-foreground mt-0.5">{Math.round((profile.activeUsers / profile.enrolled) * 100)}% of enrolled</div>
        </div>

        {/* Row 2: informational */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-3">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{profile.signUps.toLocaleString()}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">New Enrollments This Month</div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{coursePerformance.length}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Courses Running</div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">4.7</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Average Course Rating</div>
          <div className="text-[12px] leading-[16px] text-muted-foreground mt-0.5">out of 5.0</div>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
            <Layers className="w-5 h-5 text-slate-600" />
          </div>
          <div className="text-[18px] leading-[26px] font-medium">{categoryPerformance[0].name}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Most Popular Category</div>
        </div>
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
                  <TableHead>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center gap-1 cursor-default">
                            Completion <Info className="h-3.5 w-3.5 text-slate-400" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[220px] text-xs">
                          % of enrolled students who completed all required modules and assessments in this course.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right"><span className="flex items-center justify-end gap-1">Revenue <Tip text="Gross revenue from course purchases and subscription charges in the selected period, before instructor payouts." /></span></TableHead>
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
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-700">Where students are stopping</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-slate-400 cursor-default" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[240px] text-xs">
                        The specific point in each course where the highest number of students stopped progressing and never continued. Use this to identify where students may need support or where course content may need review.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {coursePerformance.map((c) => {
                  const stoppedCount = Math.round(c.enrollments * (1 - c.completionRate / 100));
                  return (
                    <div key={c.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-medium text-slate-950">{c.title}</div>
                          <div className="mt-1 text-xs text-slate-500">{c.dropOffPoint}</div>
                          <div className="mt-1 text-xs text-amber-700 font-medium">{stoppedCount} students haven't progressed past this point</div>
                        </div>
                        <Badge className="bg-white border-slate-200 shrink-0">{c.completionRate}% completed</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Faculty */}
        <TabsContent value="faculty" className="space-y-6">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Faculty</CardTitle>
              <CardDescription>Instructor performance and attention signals. Flags appear when action may be needed.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {facultyPerformance.map((f) => {
                const needsAttention = f.lastActiveDaysAgo > 14 || f.unansweredQA > 0 || f.completionRate < 65;
                return (
                  <div key={f.name} className={cn(
                    "rounded-2xl border p-5 space-y-4",
                    needsAttention ? "border-amber-200 bg-amber-50/40" : "border-slate-100 bg-slate-50/50"
                  )}>
                    {/* Identity row */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2348] text-white text-sm font-semibold shrink-0">
                          {f.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{f.name}</div>
                          <div className="text-xs text-slate-500">{f.courses} course{f.courses !== 1 ? "s" : ""} · {f.activeStudents.toLocaleString()} active students</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-bold text-slate-950">{f.rating}</div>
                        <div className="text-xs text-slate-400">rating</div>
                      </div>
                    </div>

                    {/* Signal row */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className={cn("rounded-xl p-2", f.completionRate < 65 ? "bg-rose-100" : "bg-white border border-slate-100")}>
                        <div className={cn("text-sm font-semibold", f.completionRate < 65 ? "text-rose-700" : "text-slate-800")}>{f.completionRate}%</div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5 flex items-center gap-0.5">completion</div>
                      </div>
                      <div className={cn("rounded-xl p-2", f.lastActiveDaysAgo > 14 ? "bg-amber-100" : "bg-white border border-slate-100")}>
                        <div className={cn("text-sm font-semibold", f.lastActiveDaysAgo > 14 ? "text-amber-700" : "text-slate-800")}>
                          {f.lastActiveDaysAgo === 0 ? "Today" : f.lastActiveDaysAgo === 1 ? "Yesterday" : `${f.lastActiveDaysAgo}d ago`}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5 flex items-center gap-0.5">last active <Tip text="Number of days since the instructor last logged in, posted an announcement, or responded to a student question." /></div>
                      </div>
                      <div className={cn("rounded-xl p-2", f.unansweredQA > 0 ? "bg-amber-100" : "bg-white border border-slate-100")}>
                        <div className={cn("text-sm font-semibold", f.unansweredQA > 0 ? "text-amber-700" : "text-slate-800")}>{f.unansweredQA}</div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5 flex items-center gap-0.5">unanswered Q&amp;A <Tip text="Student questions that have received no instructor response in over 48 hours." /></div>
                      </div>
                    </div>

                    {/* Action row — only shown when attention needed */}
                    {needsAttention && (
                      <div className="pt-1 border-t border-slate-100 flex justify-end">
                        <Button
                          size="sm" variant="outline" className="text-xs h-7"
                          disabled={remindedFaculty.has(f.name)}
                          onClick={() => {
                            setRemindedFaculty((prev) => new Set(prev).add(f.name));
                            toast({ title: "Reminder sent", description: `A reminder has been sent to ${f.name} to log in and respond to pending student questions.` });
                          }}
                        >
                          {remindedFaculty.has(f.name) ? "Reminded" : "Send reminder"}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories & Trends */}
        <TabsContent value="categories" className="space-y-6">
          {/* Completion rate by course — moved here from Students page (it's a course health metric) */}
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Completion Rate by Course</CardTitle>
              <CardDescription>
                How many enrolled students earned a certificate in each course.{" "}
                <TooltipProvider><Tooltip><TooltipTrigger asChild>
                  <Info className="inline h-3.5 w-3.5 text-slate-400 cursor-default" />
                </TooltipTrigger><TooltipContent side="top" className="max-w-[220px] text-xs">
                  Completion rate = students who finished all required modules ÷ total enrolled. Certificates are issued automatically on completion.
                </TooltipContent></Tooltip></TooltipProvider>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {coursePerformance.map((c) => (
                <div key={c.id} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-800 truncate">{c.title}</span>
                      <span className="text-sm text-slate-500 ml-3 shrink-0">{Math.round(c.enrollments * c.completionRate / 100)}/{c.enrollments}</span>
                    </div>
                    <Progress value={c.completionRate} className={`h-2 [&>div]:${c.completionRate >= 75 ? "bg-emerald-500" : c.completionRate >= 55 ? "bg-amber-400" : "bg-rose-500"}`} />
                  </div>
                  <span className={cn("text-sm font-semibold w-10 text-right shrink-0",
                    c.completionRate >= 75 ? "text-emerald-700" : c.completionRate >= 55 ? "text-amber-700" : "text-rose-700"
                  )}>{c.completionRate}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

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
                      <div className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">{cat.growth} enrollment growth</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200/80 shadow-sm">
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>Topics students are searching for and discussing — potential gaps in your current course catalogue.</CardDescription>
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
