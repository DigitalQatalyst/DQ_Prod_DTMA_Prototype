import { useState } from "react";
import { AlertCircle, Clock, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import AnalyticsPerformanceInsightsPanel from "@/components/admin/stage4/AnalyticsPerformanceInsightsPanel";

// ── Faculty Support Health ────────────────────────────────────────────────────

interface FacultyHealthRecord {
  id: string;
  name: string;
  course: string;
  responseTime: number; // hours
  backlog: number;      // ungraded items
  status: "healthy" | "at-risk" | "overloaded";
}

const facultyHealth: FacultyHealthRecord[] = [
  { id: "F-01", name: "Dr. James Okafor", course: "Digital Transformation",  responseTime: 2.5, backlog: 0,  status: "healthy"    },
  { id: "F-02", name: "Prof. Sarah Chen",  course: "AI in Workplace",         responseTime: 28,  backlog: 12, status: "overloaded"  },
  { id: "F-03", name: "Michael Vance",     course: "Agile Management",        responseTime: 14,  backlog: 4,  status: "at-risk"     },
];

function statusBadge(s: FacultyHealthRecord["status"]) {
  if (s === "healthy")    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "overloaded") return "border-rose-200 bg-rose-50 text-rose-700";
  return "border-amber-200 bg-amber-50 text-amber-800";
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SMSCoursesPanel() {
  const { toast } = useToast();
  const [checkedIn, setCheckedIn] = useState<Set<string>>(new Set());

  const avgResponseTime = (facultyHealth.reduce((s, f) => s + f.responseTime, 0) / facultyHealth.length).toFixed(1);
  const totalBacklog    = facultyHealth.reduce((s, f) => s + f.backlog, 0);

  return (
    <div className="space-y-6">
      {/* Faculty Support Health */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-slate-500" />
            Faculty Support Health
          </CardTitle>
          <div className="flex gap-6 text-sm text-slate-600 mt-1">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              Avg Response Time: <span className="font-semibold text-slate-900 ml-1">{avgResponseTime}h</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
              Total Backlog: <span className="font-semibold text-slate-900 ml-1">{totalBacklog} items</span>
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Table>
              <TableHeader><TableRow className="bg-slate-50">
                <TableHead>Instructor</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Response Time</TableHead>
                <TableHead className="text-right">Backlog</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {facultyHealth.map((f) => (
                  <TableRow key={f.id} className={f.status !== "healthy" ? "bg-amber-50/20" : ""}>
                    <TableCell className="font-medium text-slate-900">{f.name}</TableCell>
                    <TableCell className="text-sm text-slate-600">{f.course}</TableCell>
                    <TableCell className={cn("text-right font-medium", f.responseTime > 24 ? "text-rose-600 font-bold" : "text-slate-700")}>
                      {f.responseTime}h
                    </TableCell>
                    <TableCell className="text-right text-slate-700">{f.backlog}</TableCell>
                    <TableCell>
                      <Badge className={`border text-xs font-semibold capitalize ${statusBadge(f.status)}`}>{f.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {(f.status === "at-risk" || f.status === "overloaded") && (
                        <Button
                          size="sm" variant="outline" className="text-xs h-7"
                          disabled={checkedIn.has(f.id)}
                          onClick={() => {
                            setCheckedIn((prev) => new Set(prev).add(f.id));
                            toast({ title: "Check-in sent", description: `${f.name} has been sent a support check-in.` });
                          }}
                        >
                          {checkedIn.has(f.id) ? "Sent" : "Send Check-in"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Full courses & faculty panel */}
      <AnalyticsPerformanceInsightsPanel />
    </div>
  );
}
