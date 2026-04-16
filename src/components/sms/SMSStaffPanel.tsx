import { useState } from "react";
import { Briefcase, Info, Mail, Phone, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type StaffStatus = "available" | "busy" | "away";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  team: "Finance" | "Support" | "Partnerships" | "Compliance";
  email: string;
  phone: string;
  status: StaffStatus;
  openEscalations: number;
  lastActiveHoursAgo: number;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const staff: StaffMember[] = [
  { id: "ST-01", name: "Fatima Al-Rashid",  role: "Finance Manager",       team: "Finance",       email: "fatima@dtma.ac",   phone: "ext. 204", status: "available", openEscalations: 2, lastActiveHoursAgo: 1  },
  { id: "ST-02", name: "David Kimani",      role: "Finance Analyst",       team: "Finance",       email: "david@dtma.ac",    phone: "ext. 205", status: "available", openEscalations: 1, lastActiveHoursAgo: 3  },
  { id: "ST-03", name: "Priya Nair",        role: "Head of Support",       team: "Support",       email: "priya@dtma.ac",    phone: "ext. 301", status: "busy",      openEscalations: 4, lastActiveHoursAgo: 0  },
  { id: "ST-04", name: "Marcus Osei",       role: "Support Specialist",    team: "Support",       email: "marcus@dtma.ac",   phone: "ext. 302", status: "available", openEscalations: 2, lastActiveHoursAgo: 2  },
  { id: "ST-05", name: "Leila Haddad",      role: "Partnership Manager",   team: "Partnerships",  email: "leila@dtma.ac",    phone: "ext. 401", status: "away",      openEscalations: 1, lastActiveHoursAgo: 6  },
  { id: "ST-06", name: "James Thornton",    role: "Compliance Officer",    team: "Compliance",    email: "james@dtma.ac",    phone: "ext. 501", status: "available", openEscalations: 1, lastActiveHoursAgo: 1  },
];

const teams = ["Finance", "Support", "Partnerships", "Compliance"] as const;

const teamColors: Record<string, string> = {
  Finance:      "border-emerald-200 bg-emerald-50 text-emerald-700",
  Support:      "border-sky-200 bg-sky-50 text-sky-700",
  Partnerships: "border-indigo-200 bg-indigo-50 text-indigo-700",
  Compliance:   "border-amber-200 bg-amber-50 text-amber-700",
};

const teamIcons: Record<string, React.ElementType> = {
  Finance:      Briefcase,
  Support:      Phone,
  Partnerships: UserCog,
  Compliance:   Mail,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const Tip = ({ text }: { text: string }) => (
  <TooltipProvider><Tooltip>
    <TooltipTrigger asChild><Info className="inline h-3.5 w-3.5 text-slate-400 cursor-default ml-1 shrink-0" /></TooltipTrigger>
    <TooltipContent side="top" className="max-w-[220px] text-xs">{text}</TooltipContent>
  </Tooltip></TooltipProvider>
);

function statusBadge(s: StaffStatus) {
  if (s === "available") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (s === "busy")      return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-slate-200 bg-slate-50 text-slate-500";
}
const statusLabel: Record<StaffStatus, string> = { available: "Available", busy: "Busy", away: "Away" };

function lastActiveLabel(h: number) {
  if (h === 0) return "Active now";
  if (h === 1) return "1 hr ago";
  return `${h} hrs ago`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SMSStaffPanel() {
  const { toast } = useToast();
  const [escalatedIds, setEscalatedIds] = useState<Set<string>>(new Set());
  const [activeTeam, setActiveTeam] = useState<string>("All");

  const totalEscalations = staff.reduce((s, m) => s + m.openEscalations, 0);
  const busyOrAway       = staff.filter((m) => m.status !== "available").length;

  const displayed = activeTeam === "All" ? staff : staff.filter((m) => m.team === activeTeam);

  const escalate = (id: string, name: string, role: string) => {
    setEscalatedIds((p) => new Set(p).add(id));
    toast({ title: "Escalation sent", description: `${name} (${role}) has been notified of a new escalation.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] leading-[36px] font-semibold">Staff</h2>
        <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
          Operational staff running the academy. Escalate issues to the relevant team member.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {teams.map((team) => {
          const Icon = teamIcons[team];
          const members = staff.filter((m) => m.team === team);
          const open    = members.reduce((s, m) => s + m.openEscalations, 0);
          return (
            <div
              key={team}
              className={cn("bg-card rounded-2xl p-6 shadow-sm border cursor-pointer hover:border-slate-300 transition-colors",
                open > 0 ? "border-amber-200 bg-amber-50/20" : "border-slate-200/80"
              )}
              onClick={() => setActiveTeam(activeTeam === team ? "All" : team)}
            >
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-slate-600" />
              </div>
              <div className={cn("text-[24px] leading-[32px] font-medium", open > 0 && "text-amber-700")}>{members.length}</div>
              <div className="text-[14px] leading-[20px] font-medium text-slate-700">{team}</div>
              <div className={cn("text-[12px] leading-[16px] mt-0.5 font-medium", open > 0 ? "text-amber-700" : "text-slate-500")}>
                {open > 0 ? `${open} open escalation${open > 1 ? "s" : ""}` : "No open escalations"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Staff directory */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Staff Directory
            <div className="flex items-center gap-2 text-xs font-normal">
              <span className="text-slate-400">
                {totalEscalations} open escalation{totalEscalations !== 1 ? "s" : ""} · {busyOrAway} unavailable
                <Tip text="Open escalations are issues routed to this team from other pages in the portal. Unavailable = busy or away." />
              </span>
            </div>
          </CardTitle>
          <CardDescription>Click a team card above to filter. Use 'Escalate' to route an issue directly to a staff member.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Team filter pills */}
          <div className="flex flex-wrap gap-2">
            {["All", ...teams].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTeam(t)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors",
                  activeTeam === t
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Staff cards */}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {displayed.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "rounded-2xl border p-4 space-y-3",
                  m.openEscalations > 0 ? "border-amber-200 bg-amber-50/20" : "border-slate-200 bg-slate-50/50"
                )}
              >
                {/* Name + status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{m.name}</div>
                    <div className="text-xs text-slate-500">{m.role}</div>
                  </div>
                  <Badge className={`border text-xs font-semibold shrink-0 ${statusBadge(m.status)}`}>
                    {statusLabel[m.status]}
                  </Badge>
                </div>

                {/* Team + last active */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`border text-xs ${teamColors[m.team]}`}>{m.team}</Badge>
                  <span className="text-xs text-slate-400">{lastActiveLabel(m.lastActiveHoursAgo)}</span>
                </div>

                {/* Contact */}
                <div className="text-xs text-slate-500 space-y-0.5">
                  <div>{m.email}</div>
                  <div>{m.phone}</div>
                </div>

                {/* Open escalations + action */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className={cn("text-xs font-medium", m.openEscalations > 0 ? "text-amber-700" : "text-slate-400")}>
                    {m.openEscalations > 0 ? `${m.openEscalations} open escalation${m.openEscalations > 1 ? "s" : ""}` : "No open escalations"}
                  </span>
                  <Button
                    size="sm" variant="outline" className="text-xs h-7"
                    disabled={escalatedIds.has(m.id)}
                    onClick={() => escalate(m.id, m.name, m.role)}
                  >
                    {escalatedIds.has(m.id) ? "Sent" : "Escalate"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
