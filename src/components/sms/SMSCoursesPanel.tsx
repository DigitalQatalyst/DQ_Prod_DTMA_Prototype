import { useState } from "react";
import { BookOpen, Info, Layers, Sparkles, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────────────────────────────

interface CourseRecord {
  id: string; title: string; owner: string;
  enrollments: number; completionRate: number;
  rating: number; revenue: number; dropOffPoint: string;
}

const courses: CourseRecord[] = [
  { id: "CP-01", title: "Digital Transformation Fundamentals", owner: "Aisha Mensah",  enrollments: 342, completionRate: 72, rating: 4.8, revenue: 85500, dropOffPoint: "Module 4 case-study submission"    },
  { id: "CP-02", title: "AI & Automation in the Workplace",    owner: "James Okafor",  enrollments: 219, completionRate: 65, rating: 4.6, revenue: 54750, dropOffPoint: "Simulation lab onboarding"          },
  { id: "CP-03", title: "Agile Project Management",            owner: "Sofia Reyes",   enrollments: 187, completionRate: 58, rating: 4.5, revenue: 46750, dropOffPoint: "Sprint retrospective assignment"    },
  { id: "CP-04", title: "Cybersecurity Essentials",            owner: "Kwame Asante",  enrollments: 154, completionRate: 81, rating: 4.7, revenue: 38500, dropOffPoint: "Low risk; no acute blocker"         },
];

const categories = [
  { name: "Digital Strategy",       enrollments: 1450, revenue: 320000, growth: "+12%" },
  { name: "Artificial Intelligence",enrollments: 980,  revenue: 245000, growth: "+24%" },
  { name: "Project Management",     enrollments: 760,  revenue: 180000, growth: "+8%"  },
  { name: "Cybersecurity",          enrollments: 540,  revenue: 135000, growth: "+15%" },
];

const trendTopics = [
  { topic: "AI operating models",          source: "Knowledge center search", signal: "+31% search volume"    },
  { topic: "Digital governance playbooks", source: "Program feedback",        signal: "Top open-text theme"   },
  { topic: "Sponsor change leadership",    source: "Cohort forum",            signal: "+18% discussion growth" },
];

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const Tip = ({ text }: { text: string }) => (
  <TooltipProvider><Tooltip>
    <TooltipTrigger asChild><Info className="inline h-3.5 w-3.5 text-slate-400 cursor-default ml-1 shrink-0" /></TooltipTrigger>
    <TooltipContent side="top" className="max-w-[220px] text-xs">{text}</TooltipContent>
  </Tooltip></TooltipProvider>
);

// ── Derived KPIs ──────────────────────────────────────────────────────────────

const totalEnrollments = courses.reduce((s, c) => s + c.enrollments, 0);
const avgCompletion    = Math.round(courses.reduce((s, c) => s + c.completionRate, 0) / courses.length);
const avgRating        = (courses.reduce((s, c) => s + c.rating, 0) / courses.length).toFixed(1);
const atRiskCount      = courses.filter((c) => c.completionRate < 65).length;

// ── Component ─────────────────────────────────────────────────────────────────

export default function SMSCoursesPanel() {
  const { toast } = useToast();
  const [notifiedDropOff, setNotifiedDropOff]             = useState<Set<string>>(new Set());
  const [notifiedSupportDropOff, setNotifiedSupportDropOff] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[28px] leading-[36px] font-semibold">Courses</h2>
        <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
          Course performance, completion health, and category trends.
        </p>
      </div>

      {/* KPI cards — courses only */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{courses.length}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Courses Running</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">{categories.length} subject categories</div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-[#ff6b4d]" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{totalEnrollments.toLocaleString()}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700">Total Enrollments</div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Across all courses</div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-[24px] leading-[32px] font-medium">{avgCompletion}%</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Avg Completion Rate
            <Tip text="Average percentage of enrolled students who finished all required modules across all courses." />
          </div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Across all courses</div>
        </div>

        <div className={cn("bg-card rounded-2xl p-6 shadow-sm border", atRiskCount > 0 ? "border-amber-200 bg-amber-50/30" : "border-slate-200/80")}>
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <div className={cn("text-[24px] leading-[32px] font-medium", atRiskCount > 0 && "text-amber-700")}>{atRiskCount}</div>
          <div className="text-[14px] leading-[20px] font-medium text-slate-700 flex items-center">
            Courses At Risk
            <Tip text="Courses with a completion rate below 65% — students are dropping off before finishing." />
          </div>
          <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">Completion below 65%</div>
        </div>
      </div>

      {/* Course Performance table */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Course Performance</CardTitle>
          <CardDescription>Enrollment, completion rate, rating, and revenue per course.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Table>
              <TableHeader><TableRow className="bg-slate-50">
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead className="text-right">Enrolled</TableHead>
                <TableHead>
                  <TooltipProvider><Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center gap-1 cursor-default">Completion <Info className="h-3.5 w-3.5 text-slate-400" /></span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[220px] text-xs">% of enrolled students who completed all required modules.</TooltipContent>
                  </Tooltip></TooltipProvider>
                </TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">
                  <span className="flex items-center justify-end gap-1">Revenue <Tip text="Gross revenue from course purchases and subscription charges, before instructor payouts." /></span>
                </TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {courses.map((c) => (
                  <TableRow key={c.id} className={c.completionRate < 65 ? "bg-amber-50/20" : ""}>
                    <TableCell className="font-medium">
                      {c.title}
                      {c.completionRate < 65 && <Badge className="ml-2 border border-amber-200 bg-amber-50 text-amber-700 text-xs">At risk</Badge>}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{c.owner}</TableCell>
                    <TableCell className="text-right">{c.enrollments}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={c.completionRate} className="h-2 w-16" />
                        <span className={cn("text-xs font-medium", c.completionRate < 65 ? "text-amber-700" : "text-slate-500")}>{c.completionRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-amber-500" />{c.rating}</div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{fmt(c.revenue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Drop-off watchlist */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Where Students Are Stopping
            <Tip text="The point in each course where the most students stopped progressing. Use the actions to notify the instructor to review the content, or alert the support team to follow up with stuck students." />
          </CardTitle>
          <CardDescription>Two actions per course: notify the instructor to review the drop-off point, or alert the support team to follow up with stuck students.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {courses.map((c) => {
            const isLowRisk    = c.dropOffPoint.toLowerCase().startsWith("low risk");
            const stoppedCount = Math.round(c.enrollments * (1 - c.completionRate / 100));
            const notifiedInstructor = notifiedDropOff.has(c.id);
            const notifiedSupport    = notifiedSupportDropOff.has(c.id);
            return (
              <div key={c.id} className={cn("rounded-2xl border p-4", isLowRisk ? "border-slate-200 bg-white" : "border-amber-200 bg-amber-50/20")}>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="font-medium text-slate-900">{c.title}</div>
                    <div className="text-xs text-slate-500">Drop-off point: <span className="font-medium text-slate-700">{c.dropOffPoint}</span></div>
                    {isLowRisk
                      ? <div className="text-xs text-emerald-700 font-medium">No action needed — completion is healthy</div>
                      : <div className="text-xs text-amber-700 font-medium">{stoppedCount} students haven't progressed past this point</div>}
                    <div className="text-xs text-slate-400">Instructor: {c.owner}</div>
                  </div>
                  {!isLowRisk && (
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Button size="sm" variant="outline" className="text-xs h-7"
                        disabled={notifiedInstructor}
                        onClick={() => { setNotifiedDropOff((p) => new Set(p).add(c.id)); toast({ title: "Instructor notified", description: `${c.owner} has been asked to review the drop-off in "${c.title}".` }); }}
                      >
                        {notifiedInstructor ? "Instructor Notified" : "Notify Instructor"}
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-7"
                        disabled={notifiedSupport}
                        onClick={() => { setNotifiedSupportDropOff((p) => new Set(p).add(c.id)); toast({ title: "Support team alerted", description: `Support team has been asked to follow up with stuck students in "${c.title}".` }); }}
                      >
                        {notifiedSupport ? "Support Alerted" : "Alert Support Team"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Completion Rate by Course */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Completion Rate by Course</CardTitle>
          <CardDescription>
            How many enrolled students finished all required modules.
            <Tip text="Completion rate = students who finished all required modules ÷ total enrolled." />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {courses.map((c) => (
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

      {/* Categories & Trends */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Enrollment and revenue by subject area.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {categories.map((cat) => (
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
                  <div className="text-xs text-emerald-600 font-medium">{cat.growth} enrollment growth</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
            <CardDescription>Topics students are searching for — potential gaps in your current course catalogue.</CardDescription>
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

      {/* Average rating snapshot */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Course Ratings</CardTitle>
          <CardDescription>Student ratings per course. Average across all courses: <span className="font-semibold text-slate-900">{avgRating} / 5.0</span></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {courses.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <span className="text-sm font-medium text-slate-800 truncate mr-3">{c.title}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  <span className="font-semibold text-slate-900">{c.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
