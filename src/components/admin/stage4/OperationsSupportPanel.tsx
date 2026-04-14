import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Headphones,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type ProvisioningStatus = "pending" | "verified" | "approved" | "needs-info";
type TicketStatus = "open" | "pending" | "escalated" | "resolved";
type IncidentStatus = "monitoring" | "active" | "resolved";
type AlertStatus = "draft" | "scheduled" | "sent";
type TaskStatus = "queued" | "in-progress" | "done";

type ProvisioningRequest = {
  id: string;
  name: string;
  role: "Instructor" | "Faculty" | "Admin";
  requestedBy: string;
  credentialCheck: string;
  publicProfileReady: boolean;
  status: ProvisioningStatus;
};

type SupportTicket = {
  id: string;
  requester: string;
  category: "Technical" | "Billing" | "Content" | "Access";
  priority: "Low" | "Medium" | "High" | "Critical";
  owner: string;
  ageHours: number;
  slaHours: number;
  status: TicketStatus;
  summary: string;
};

type Incident = {
  id: string;
  title: string;
  severity: "Info" | "Watch" | "Critical";
  owner: string;
  impact: string;
  uptimeImpact: number;
  status: IncidentStatus;
};

type AlertNotice = {
  id: string;
  title: string;
  audience: string;
  channel: string;
  priority: "Normal" | "High" | "Urgent";
  status: AlertStatus;
};

type AdminTask = {
  id: string;
  title: string;
  queue: string;
  owner: string;
  dueLabel: string;
  status: TaskStatus;
};

type AuditEntry = { id: string; action: string; actor: string; target: string; reason: string };

const initialProvisioning: ProvisioningRequest[] = [
  { id: "PR-01", name: "Dr. Ada Bempong", role: "Instructor", requestedBy: "School Manager", credentialCheck: "Verified executive MBA and facilitation record", publicProfileReady: false, status: "pending" },
  { id: "PR-02", name: "Michael Ouma", role: "Faculty", requestedBy: "Program Lead", credentialCheck: "Missing teaching sample", publicProfileReady: true, status: "needs-info" },
  { id: "PR-03", name: "Ruth Njeri", role: "Admin", requestedBy: "Operations Lead", credentialCheck: "Background clearance complete", publicProfileReady: false, status: "verified" },
];

const initialTickets: SupportTicket[] = [
  { id: "TK-140", requester: "Corporate cohort lead", category: "Access", priority: "High", owner: "Platform Admin", ageHours: 18, slaHours: 24, status: "open", summary: "Sponsor learners cannot activate cohort seats." },
  { id: "TK-141", requester: "Learner services", category: "Billing", priority: "Critical", owner: "Finance Ops", ageHours: 30, slaHours: 24, status: "escalated", summary: "Refund approval is blocked after duplicate invoice issue." },
  { id: "TK-142", requester: "Faculty office", category: "Content", priority: "Medium", owner: "Content Governance", ageHours: 9, slaHours: 48, status: "pending", summary: "Embedded video assets are not loading in one course." },
];

const initialIncidents: Incident[] = [
  { id: "IN-01", title: "Sponsor exports retrying slowly", severity: "Watch", owner: "System Monitor", impact: "Partner reporting jobs are running behind schedule.", uptimeImpact: 0.08, status: "monitoring" },
  { id: "IN-02", title: "Authentication timeout spike", severity: "Critical", owner: "Platform Admin", impact: "Admin sign-in failures rose above the operational threshold.", uptimeImpact: 0.18, status: "active" },
  { id: "IN-03", title: "Learning asset CDN cache cleared", severity: "Info", owner: "System Monitor", impact: "Video playback latency returned to baseline.", uptimeImpact: 0, status: "resolved" },
];

const initialAlerts: AlertNotice[] = [
  { id: "AL-01", title: "Planned maintenance window", audience: "Faculty + Admins", channel: "Email + in-app", priority: "High", status: "scheduled" },
  { id: "AL-02", title: "Refund workflow incident", audience: "Support Associates", channel: "Internal alert", priority: "Urgent", status: "sent" },
  { id: "AL-03", title: "New instructor onboarding guide", audience: "Faculty Operations", channel: "Email", priority: "Normal", status: "draft" },
];

const initialTasks: AdminTask[] = [
  { id: "AQ-11", title: "Verify instructor profile evidence", queue: "Provisioning", owner: "School Manager", dueLabel: "Due today", status: "queued" },
  { id: "AQ-12", title: "Resolve aged billing complaint", queue: "Support SLA", owner: "Finance Ops", dueLabel: "2h remaining", status: "in-progress" },
  { id: "AQ-13", title: "Publish maintenance notice", queue: "Alert manager", owner: "Platform Admin", dueLabel: "Ready now", status: "queued" },
];

const initialAudit: AuditEntry[] = [
  { id: "AU-01", action: "Provisioning status updated", actor: "School Manager", target: "PR-03", reason: "Credential review completed" },
  { id: "AU-02", action: "Ticket escalated", actor: "Support Associate", target: "TK-141", reason: "SLA breach risk" },
  { id: "AU-03", action: "Alert published", actor: "Platform Admin", target: "AL-02", reason: "High-priority downtime communication" },
];

function badgeClass(status: string) {
  switch (status) {
    case "approved":
    case "verified":
    case "resolved":
    case "done":
    case "sent":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "pending":
    case "monitoring":
    case "scheduled":
    case "queued":
    case "in-progress":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "needs-info":
    case "open":
    case "active":
    case "escalated":
    case "Urgent":
    case "Critical":
      return "border-rose-200 bg-rose-50 text-rose-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

export default function OperationsSupportPanel() {
  const { toast } = useToast();
  const [provisioning, setProvisioning] = useState(initialProvisioning);
  const [tickets, setTickets] = useState(initialTickets);
  const [incidents, setIncidents] = useState(initialIncidents);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [tasks, setTasks] = useState(initialTasks);
  const [auditLog, setAuditLog] = useState(initialAudit);
  const [ticketQuery, setTicketQuery] = useState("");

  const overdueTickets = tickets.filter((ticket) => ticket.ageHours > ticket.slaHours).length;
  const queuedProvisioning = provisioning.filter((item) => item.status === "pending" || item.status === "needs-info").length;
  const activeIncidents = incidents.filter((incident) => incident.status !== "resolved").length;
  const uptimeVisibility = (100 - incidents.reduce((sum, item) => sum + item.uptimeImpact, 0)).toFixed(2);

  const filteredTickets = useMemo(
    () =>
      tickets.filter((ticket) =>
        `${ticket.id} ${ticket.requester} ${ticket.summary}`.toLowerCase().includes(ticketQuery.toLowerCase()),
      ),
    [ticketQuery, tickets],
  );

  const addAudit = (entry: Omit<AuditEntry, "id">) => {
    setAuditLog((current) => [{ ...entry, id: `AU-${Date.now()}` }, ...current]);
  };

  const updateProvisioning = (id: string, status: ProvisioningStatus) => {
    const current = provisioning.find((item) => item.id === id);
    if (!current) return;
    setProvisioning((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
    addAudit({ action: "Provisioning status updated", actor: "School Manager", target: id, reason: `${current.name} moved to ${status}` });
    toast({ title: "Provisioning updated", description: `${current.name} is now ${status.replace("-", " ")}.` });
  };

  const updateTicket = (id: string, status: TicketStatus) => {
    const current = tickets.find((item) => item.id === id);
    if (!current) return;
    setTickets((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
    addAudit({ action: "Support ticket updated", actor: "Platform Admin", target: id, reason: `${current.summary} moved to ${status}` });
    toast({ title: "Ticket updated", description: `${id} is now ${status}.` });
  };

  const updateIncident = (id: string, status: IncidentStatus) => {
    const current = incidents.find((item) => item.id === id);
    if (!current) return;
    setIncidents((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
    addAudit({ action: "Incident updated", actor: "System Monitor", target: id, reason: `${current.title} moved to ${status}` });
  };

  const updateAlert = (id: string, status: AlertStatus) => {
    const current = alerts.find((item) => item.id === id);
    if (!current) return;
    setAlerts((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
    addAudit({ action: "Operational alert updated", actor: "Platform Admin", target: id, reason: `${current.title} moved to ${status}` });
    toast({ title: "Alert updated", description: `${current.title} is now ${status}.` });
  };

  const updateTask = (id: string, status: TaskStatus) => {
    const current = tasks.find((item) => item.id === id);
    if (!current) return;
    setTasks((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
    addAudit({ action: "Admin queue updated", actor: "School Manager", target: id, reason: `${current.title} moved to ${status}` });
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 to-slate-800 text-white shadow-xl">
        <div className="grid gap-8 px-6 py-7 lg:grid-cols-[1.4fr_0.8fr] lg:px-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              <ShieldCheck className="h-3.5 w-3.5" />
              Stage 4 back-office control
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">Platform Operations, Support &amp; User Provisioning</h1>
              <p className="max-w-3xl text-sm text-white/75">One operational workspace for staff provisioning, complaint routing, system incident visibility, internal notices, and admin backlog management.</p>
            </div>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.16em] text-white/55">Queued provisioning</div><div className="mt-2 text-2xl font-semibold">{queuedProvisioning}</div></div>
              <div className="rounded-2xl bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.16em] text-white/55">Overdue tickets</div><div className="mt-2 text-2xl font-semibold">{overdueTickets}</div></div>
              <div className="rounded-2xl bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.16em] text-white/55">Active incidents</div><div className="mt-2 text-2xl font-semibold">{activeIncidents}</div></div>
              <div className="rounded-2xl bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.16em] text-white/55">Visibility uptime</div><div className="mt-2 text-2xl font-semibold">{uptimeVisibility}%</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Provisioning queue</p><div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{queuedProvisioning}</div><p className="mt-2 text-sm text-slate-600">Managers and authorized admins retain control of new instructor access.</p></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><UserPlus className="h-5 w-5" /></div></div></CardContent></Card>
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Complaint SLA risk</p><div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{overdueTickets}</div><p className="mt-2 text-sm text-slate-600">All complaints remain categorized and routed with an explicit owner.</p></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600"><Headphones className="h-5 w-5" /></div></div></CardContent></Card>
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Incident load</p><div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{activeIncidents}</div><p className="mt-2 text-sm text-slate-600">Downtime and performance events remain visible for audit and reporting.</p></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700"><Activity className="h-5 w-5" /></div></div></CardContent></Card>
        <Card className="border-slate-200/80 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Operational notices</p><div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{alerts.filter((item) => item.status !== "draft").length}</div><p className="mt-2 text-sm text-slate-600">Urgent alerts can be broadcast immediately to keep staff aligned.</p></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><Bell className="h-5 w-5" /></div></div></CardContent></Card>
      </div>

      <Tabs defaultValue="provisioning" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-slate-100 p-2">
          <TabsTrigger value="provisioning" className="rounded-xl px-4 py-2">User Management Console</TabsTrigger>
          <TabsTrigger value="support" className="rounded-xl px-4 py-2">Support Ticket Dashboard</TabsTrigger>
          <TabsTrigger value="health" className="rounded-xl px-4 py-2">System Health Status</TabsTrigger>
          <TabsTrigger value="alerts" className="rounded-xl px-4 py-2">Internal Alert Manager</TabsTrigger>
          <TabsTrigger value="queue" className="rounded-xl px-4 py-2">Admin Task Queue</TabsTrigger>
        </TabsList>

        <TabsContent value="provisioning">
          <Card className="border-slate-200/80 shadow-sm"><CardHeader><CardTitle>User Management Console</CardTitle><CardDescription>Provision instructors, faculty, and specialist roles with explicit access auditability.</CardDescription></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Requested by</TableHead><TableHead>Credential check</TableHead><TableHead>Public profile</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader><TableBody>{provisioning.map((item) => <TableRow key={item.id}><TableCell><div className="font-medium text-slate-950">{item.name}</div><div className="text-sm text-slate-500">{item.role}</div></TableCell><TableCell>{item.requestedBy}</TableCell><TableCell>{item.credentialCheck}</TableCell><TableCell>{item.publicProfileReady ? "Ready" : "Needs setup"}</TableCell><TableCell><Badge className={cn("border", badgeClass(item.status))}>{item.status}</Badge></TableCell><TableCell><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => updateProvisioning(item.id, "verified")}>Verify</Button><Button size="sm" onClick={() => updateProvisioning(item.id, "approved")}>Approve</Button></div></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card className="border-slate-200/80 shadow-sm"><CardHeader><CardTitle>Support Ticket Dashboard</CardTitle><CardDescription>Complaints and support issues remain categorized, prioritized, and durable for audit.</CardDescription></CardHeader><CardContent className="space-y-4"><Input value={ticketQuery} onChange={(event) => setTicketQuery(event.target.value)} placeholder="Search tickets, requester, or summary" /><Table><TableHeader><TableRow><TableHead>Ticket</TableHead><TableHead>Category</TableHead><TableHead>Owner</TableHead><TableHead>SLA</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader><TableBody>{filteredTickets.map((ticket) => <TableRow key={ticket.id}><TableCell><div className="font-medium text-slate-950">{ticket.id}</div><div className="text-sm text-slate-500">{ticket.summary}</div></TableCell><TableCell><div>{ticket.category}</div><div className="text-sm text-slate-500">{ticket.priority}</div></TableCell><TableCell>{ticket.owner}</TableCell><TableCell><div>{ticket.ageHours}h age</div><div className="text-sm text-slate-500">{ticket.slaHours}h target</div></TableCell><TableCell><Badge className={cn("border", badgeClass(ticket.status === "open" ? ticket.priority : ticket.status))}>{ticket.status}</Badge></TableCell><TableCell><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => updateTicket(ticket.id, "pending")}>Route</Button><Button size="sm" onClick={() => updateTicket(ticket.id, "resolved")}>Resolve</Button></div></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-slate-200/80 shadow-sm"><CardHeader><CardTitle>System Health Status</CardTitle><CardDescription>Real-time awareness of uptime, incident pressure, and stability reporting.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Uptime visibility</div><div className="mt-2 text-3xl font-semibold text-slate-950">{uptimeVisibility}%</div><Progress value={Number(uptimeVisibility)} className="mt-4 h-2" /></div><div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Unresolved incidents older than 7 days</div><div className="mt-2 text-3xl font-semibold text-slate-950">0</div></div></CardContent></Card>
            <Card className="border-slate-200/80 shadow-sm"><CardHeader><CardTitle>Incident logs</CardTitle><CardDescription>Downtime and endpoint-performance events for post-mortem review.</CardDescription></CardHeader><CardContent className="space-y-3">{incidents.map((incident) => <div key={incident.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><div><div className="font-medium text-slate-950">{incident.title}</div><div className="mt-1 text-sm text-slate-500">{incident.impact}</div><div className="mt-3 text-xs text-slate-500">Owner: {incident.owner}</div></div><div className="space-y-2 text-right"><Badge className={cn("border", badgeClass(incident.severity))}>{incident.severity}</Badge><div><Button variant="outline" size="sm" onClick={() => updateIncident(incident.id, "monitoring")}>Monitor</Button></div><div><Button size="sm" onClick={() => updateIncident(incident.id, "resolved")}>Resolve</Button></div></div></div></div>)}</CardContent></Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <Card className="border-slate-200/80 shadow-sm"><CardHeader><CardTitle>Internal Alert Manager</CardTitle><CardDescription>Broadcast operational alerts and staff announcements with explicit status tracking.</CardDescription></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Notice</TableHead><TableHead>Audience</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader><TableBody>{alerts.map((alert) => <TableRow key={alert.id}><TableCell><div className="font-medium text-slate-950">{alert.title}</div><div className="text-sm text-slate-500">{alert.channel}</div></TableCell><TableCell>{alert.audience}</TableCell><TableCell><Badge className={cn("border", badgeClass(alert.priority))}>{alert.priority}</Badge></TableCell><TableCell><Badge className={cn("border", badgeClass(alert.status))}>{alert.status}</Badge></TableCell><TableCell><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => updateAlert(alert.id, "scheduled")}>Schedule</Button><Button size="sm" onClick={() => updateAlert(alert.id, "sent")}>Send</Button></div></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
        </TabsContent>

        <TabsContent value="queue" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-slate-200/80 shadow-sm"><CardHeader><CardTitle>Admin Task Queue</CardTitle><CardDescription>Unified pending work across approvals, complaints, and operational notices.</CardDescription></CardHeader><CardContent className="space-y-3">{tasks.map((task) => <div key={task.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><div><div className="font-medium text-slate-950">{task.title}</div><div className="mt-1 text-sm text-slate-500">{task.queue} · {task.owner}</div><div className="mt-3 text-xs text-slate-500">{task.dueLabel}</div></div><div className="space-y-2 text-right"><Badge className={cn("border", badgeClass(task.status))}>{task.status}</Badge><div><Button size="sm" onClick={() => updateTask(task.id, task.status === "queued" ? "in-progress" : "done")}>{task.status === "done" ? "Complete" : task.status === "queued" ? "Start" : "Complete"}</Button></div></div></div></div>)}</CardContent></Card>
            <Card className="border-slate-200/80 shadow-sm"><CardHeader><CardTitle>Administrative audit log</CardTitle><CardDescription>Role changes, complaint routing, and operational notices remain traceable.</CardDescription></CardHeader><CardContent className="space-y-3">{auditLog.map((entry) => <div key={entry.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center justify-between gap-3"><div><div className="font-medium text-slate-950">{entry.action}</div><div className="text-sm text-slate-500">{entry.actor} · {entry.reason}</div></div><Badge className="border border-slate-200 bg-white text-slate-700">{entry.target}</Badge></div></div>)}</CardContent></Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
