import { useState } from "react";
import { Briefcase, Mail, Phone, Shield, UserCog, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────────────────────────────

type StaffStatus = "available" | "busy" | "away";

interface StaffMember {
  id: string; name: string; role: string;
  team: "Finance" | "Support" | "Partnerships" | "Compliance";
  email: string; phone: string;
  status: StaffStatus; lastActiveHoursAgo: number;
}

const staff: StaffMember[] = [
  { id: "ST-01", name: "Fatima Al-Rashid", role: "Finance Manager",     team: "Finance",      email: "fatima@dtma.ac",  phone: "ext. 204", status: "available", lastActiveHoursAgo: 1 },
  { id: "ST-02", name: "David Kimani",     role: "Finance Analyst",     team: "Finance",      email: "david@dtma.ac",   phone: "ext. 205", status: "available", lastActiveHoursAgo: 3 },
  { id: "ST-03", name: "Priya Nair",       role: "Head of Support",     team: "Support",      email: "priya@dtma.ac",   phone: "ext. 301", status: "busy",      lastActiveHoursAgo: 0 },
  { id: "ST-04", name: "Marcus Osei",      role: "Support Specialist",  team: "Support",      email: "marcus@dtma.ac",  phone: "ext. 302", status: "available", lastActiveHoursAgo: 2 },
  { id: "ST-05", name: "Leila Haddad",     role: "Partnership Manager", team: "Partnerships", email: "leila@dtma.ac",   phone: "ext. 401", status: "away",      lastActiveHoursAgo: 6 },
  { id: "ST-06", name: "James Thornton",   role: "Compliance Officer",  team: "Compliance",   email: "james@dtma.ac",   phone: "ext. 501", status: "available", lastActiveHoursAgo: 1 },
];

const teams = ["Finance", "Support", "Partnerships", "Compliance"] as const;

// Which team handles which type of escalation — shown on KPI cards
const teamPurpose: Record<string, string> = {
  Finance:      "Billing issues, failed payments, refunds",
  Support:      "Student access, lost access, Q&A issues",
  Partnerships: "Inactive partners, new course sourcing",
  Compliance:   "Accreditation renewals, compliance issues",
};

const teamIcons: Record<string, React.ElementType> = {
  Finance:      Briefcase,
  Support:      Users,
  Partnerships: UserCog,
  Compliance:   Shield,
};

const teamColors: Record<string, string> = {
  Finance:      "border-emerald-200 bg-emerald-50 text-emerald-700",
  Support:      "border-sky-200 bg-sky-50 text-sky-700",
  Partnerships: "border-indigo-200 bg-indigo-50 text-indigo-700",
  Compliance:   "border-amber-200 bg-amber-50 text-amber-700",
};

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
  const [activeTeam, setActiveTeam] = useState<string>("All");
  const displayed = activeTeam === "All" ? staff : staff.filter((m) => m.team === activeTeam);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] leading-[36px] font-semibold">Staff</h2>
        <p className="text-[14px] leading-[20px] text-muted-foreground mt-1">
          The operational teams behind the portal. When you escalate an issue from any page, it goes to the relevant team here.
        </p>
      </div>

      {/* KPI cards — one per team, shows who handles what */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {teams.map((team) => {
          const Icon    = teamIcons[team];
          const members = staff.filter((m) => m.team === team);
          const hasAvailable = members.some((m) => m.status === "available");
          return (
            <div
              key={team}
              className={cn(
                "bg-card rounded-2xl p-6 shadow-sm border cursor-pointer hover:border-slate-300 transition-colors",
                !hasAvailable ? "border-amber-200 bg-amber-50/20" : "border-slate-200/80"
              )}
              onClick={() => setActiveTeam(activeTeam === team ? "All" : team)}
            >
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-slate-600" />
              </div>
              <div className="text-[24px] leading-[32px] font-medium">{members.length}</div>
              <div className="text-[14px] leading-[20px] font-medium text-slate-700">{team} Team</div>
              <div className="text-[12px] leading-[16px] mt-0.5 text-slate-500">{teamPurpose[team]}</div>
              <div className={cn("text-[12px] leading-[16px] mt-1 font-medium", hasAvailable ? "text-emerald-600" : "text-amber-700")}>
                {hasAvailable ? "Someone available" : "No one available now"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Staff directory */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>
            Contact details for each team. Click a team card above to filter by team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Filter pills */}
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
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3"
              >
                {/* Name + availability */}
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

                {/* Contact details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Mail className="h-3 w-3 text-slate-400 shrink-0" />{m.email}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Phone className="h-3 w-3 text-slate-400 shrink-0" />{m.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
