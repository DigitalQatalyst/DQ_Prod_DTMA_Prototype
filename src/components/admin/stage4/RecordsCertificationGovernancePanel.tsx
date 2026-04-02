import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, FileText, Package, Search, ShieldCheck, Truck } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type ValidationStatus = "pending-validation" | "validated" | "blocked" | "escalated";
type CertificateStatus = "pending" | "issued" | "corrected" | "revoked" | "blocked";
type FulfillmentStatus = "queued" | "label-created" | "shipped" | "delivered" | "blocked";

const relativeTime = (value: string) => formatDistanceToNow(new Date(value), { addSuffix: true });

export default function RecordsCertificationGovernancePanel() {
  const { toast } = useToast();
  const [search, setSearch] = React.useState("");
  const [validation, setValidation] = React.useState([
    { id: "v1", learner: "Amina Osei", program: "Digital Transformation Fundamentals", credential: "DT Strategy Certificate", payment: "Paid", evidence: "Complete", status: "pending-validation" as ValidationStatus, hardCopy: true, reviewer: "Academic Records Administrator" },
    { id: "v2", learner: "Noah Mensah", program: "AI & Automation in the Workplace", credential: "AI Operations Micro-Credential", payment: "Paid", evidence: "Complete", status: "validated" as ValidationStatus, hardCopy: false, reviewer: "Compliance Owner" },
    { id: "v3", learner: "Irene Mwangi", program: "Leadership in the Digital Age", credential: "Executive Change Leadership Badge", payment: "Pending", evidence: "Needs review", status: "blocked" as ValidationStatus, hardCopy: true, reviewer: "Academic Records Administrator" },
  ]);
  const [certificates, setCertificates] = React.useState([
    { id: "c1", learner: "Amina Osei", credential: "DT Strategy Certificate", number: "DTMA-2026-00141", status: "pending" as CertificateStatus, mode: "Digital + hard copy", action: "Awaiting official validation" },
    { id: "c2", learner: "Noah Mensah", credential: "AI Operations Micro-Credential", number: "DTMA-2026-00119", status: "issued" as CertificateStatus, mode: "Digital", action: "Issued after validation and synced to learner view" },
    { id: "c3", learner: "Irene Mwangi", credential: "Executive Change Leadership Badge", number: "DTMA-2026-00124", status: "blocked" as CertificateStatus, mode: "Digital + hard copy", action: "Blocked until payment and evidence reconcile" },
  ]);
  const [fulfillment, setFulfillment] = React.useState([
    { id: "f1", learner: "Amina Osei", credential: "DT Strategy Certificate", vendor: "Executive Print Services", payment: "Paid", digital: "Validated", status: "queued" as FulfillmentStatus, tracking: "Pending", address: "Nairobi, Kenya", materials: "Certificate stock + foil seal" },
    { id: "f2", learner: "Noah Mensah", credential: "AI Operations Micro-Credential", vendor: "Executive Print Services", payment: "Paid", digital: "Validated", status: "shipped" as FulfillmentStatus, tracking: "DHL-9938174", address: "Accra, Ghana", materials: "Certificate stock + folder" },
    { id: "f3", learner: "Irene Mwangi", credential: "Executive Change Leadership Badge", vendor: "Executive Print Services", payment: "Pending", digital: "Blocked", status: "blocked" as FulfillmentStatus, tracking: "Blocked", address: "Kampala, Uganda", materials: "Certificate stock + foil seal" },
  ]);
  const [audit, setAudit] = React.useState([
    { id: "a1", action: "Validated academic outcome", detail: "Noah Mensah award confirmed and learner status synchronized.", at: "2026-03-31T17:15:00Z" },
    { id: "a2", action: "Blocked physical fulfillment", detail: "Irene Mwangi request blocked because payment and digital validation are incomplete.", at: "2026-04-01T08:05:00Z" },
  ]);
  const [selectedCaseId, setSelectedCaseId] = React.useState("v1");

  const filterHit = (values: string[]) => search.trim().length === 0 || values.some((value) => value.toLowerCase().includes(search.toLowerCase()));
  const selectedCase = validation.find((item) => item.id === selectedCaseId) ?? validation[0];
  const searchResults = [
    ...validation.filter((item) => filterHit([item.learner, item.program, item.credential, item.status])).map((item) => ({ id: item.id, type: "Validation case", title: `${item.learner} · ${item.credential}`, status: item.status })),
    ...certificates.filter((item) => filterHit([item.learner, item.credential, item.number, item.status])).map((item) => ({ id: item.id, type: "Certificate record", title: `${item.number} · ${item.learner}`, status: item.status })),
    ...fulfillment.filter((item) => filterHit([item.learner, item.credential, item.status, item.tracking])).map((item) => ({ id: item.id, type: "Fulfillment request", title: `${item.learner} · ${item.credential}`, status: item.status })),
  ];

  const logAction = (action: string, detail: string) => setAudit((current) => [{ id: `a-${Date.now()}`, action, detail, at: new Date().toISOString() }, ...current]);
  const updateValidation = (id: string, status: ValidationStatus) => { const item = validation.find((entry) => entry.id === id); if (!item) return; setValidation((current) => current.map((entry) => entry.id === id ? { ...entry, status } : entry)); if (status === "validated") setCertificates((current) => current.map((entry) => entry.learner === item.learner && entry.credential === item.credential ? { ...entry, status: entry.status === "blocked" ? "pending" : entry.status, action: "Validation completed and ready for issuance" } : entry)); logAction("Updated validation queue", `${item.learner} moved to ${status}.`); toast({ title: "Validation case updated", description: `${item.learner} is now ${status}.` }); };
  const updateCertificate = (id: string, status: CertificateStatus) => { const item = certificates.find((entry) => entry.id === id); if (!item) return; if (status === "issued" && validation.find((entry) => entry.learner === item.learner && entry.credential === item.credential)?.status !== "validated") { toast({ title: "Issuance blocked", description: "Official issuance requires a validated academic outcome first.", variant: "destructive" }); return; } setCertificates((current) => current.map((entry) => entry.id === id ? { ...entry, status, action: status === "issued" ? "Officially issued and learner sync allowed" : status === "corrected" ? "Corrected under governed audit trail" : status === "revoked" ? "Revoked pending policy review" : entry.action } : entry)); logAction("Updated certificate record", `${item.number} moved to ${status}.`); toast({ title: "Certificate record updated", description: `${item.number} is now ${status}.` }); };
  const advanceFulfillment = (id: string) => { const item = fulfillment.find((entry) => entry.id === id); if (!item) return; if (item.payment !== "Paid" || item.digital !== "Validated") { toast({ title: "Physical fulfillment blocked", description: "Hard-copy fulfillment cannot proceed until payment and the digital record both reconcile.", variant: "destructive" }); return; } const nextStatus: FulfillmentStatus = item.status === "queued" ? "label-created" : item.status === "label-created" ? "shipped" : item.status === "shipped" ? "delivered" : item.status; const nextTracking = item.status === "label-created" && item.tracking === "Pending" ? `DHL-${Date.now().toString().slice(-7)}` : item.tracking; setFulfillment((current) => current.map((entry) => entry.id === id ? { ...entry, status: nextStatus, tracking: nextTracking } : entry)); logAction("Advanced fulfillment status", `${item.learner} hard-copy request moved to ${nextStatus}.`); toast({ title: "Fulfillment updated", description: `${item.learner} is now ${nextStatus}.` }); };

  const validated = validation.filter((item) => item.status === "validated").length;
  const readyToIssue = certificates.filter((item) => item.status === "pending").length;
  const backlog = fulfillment.filter((item) => item.status !== "delivered").length;

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-[#eef7ff] p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Stage 4 records workspace</div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Records, Certification &amp; Assessment Governance</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Official academic outcomes, governed certificate actions, and physical hard-copy fulfillment are managed here so learner-facing progress never becomes an official record without the right controls.</p>
            </div>
          </div>
          <div className="relative w-full max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search records, certificate numbers, or fulfillment items" className="border-slate-200 bg-white pl-9" /></div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-slate-200"><CardContent className="p-5"><ShieldCheck className="mb-3 h-5 w-5 text-[#ff6b4d]" /><div className="text-3xl font-semibold text-slate-900">{validated}</div><div className="text-sm text-slate-600">Validated outcomes</div></CardContent></Card>
          <Card className="border-slate-200"><CardContent className="p-5"><FileText className="mb-3 h-5 w-5 text-[#ff6b4d]" /><div className="text-3xl font-semibold text-slate-900">{readyToIssue}</div><div className="text-sm text-slate-600">Issue-ready credentials</div></CardContent></Card>
          <Card className="border-slate-200"><CardContent className="p-5"><Truck className="mb-3 h-5 w-5 text-[#ff6b4d]" /><div className="text-3xl font-semibold text-slate-900">{backlog}</div><div className="text-sm text-slate-600">Hard-copy backlog</div></CardContent></Card>
          <Card className="border-slate-200"><CardContent className="p-5"><Package className="mb-3 h-5 w-5 text-[#ff6b4d]" /><div className="text-3xl font-semibold text-slate-900">67%</div><div className="text-sm text-slate-600">Inventory above reorder point</div></CardContent></Card>
        </div>
      </div>

      <Tabs defaultValue="validation" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-slate-100 p-2">
          <TabsTrigger value="validation" className="rounded-xl px-4 py-2 data-[state=active]:bg-white">Validation Queue</TabsTrigger>
          <TabsTrigger value="issuance" className="rounded-xl px-4 py-2 data-[state=active]:bg-white">Certificate Issuance Console</TabsTrigger>
          <TabsTrigger value="fulfillment" className="rounded-xl px-4 py-2 data-[state=active]:bg-white">Fulfillment Dashboard</TabsTrigger>
          <TabsTrigger value="search" className="rounded-xl px-4 py-2 data-[state=active]:bg-white">Records Search View</TabsTrigger>
        </TabsList>

        <TabsContent value="validation" className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-slate-200"><CardHeader><CardTitle>Validation queue</CardTitle><CardDescription>Official outcomes stay blocked until evidence, thresholds, and payment status align.</CardDescription></CardHeader><CardContent className="space-y-3">{validation.filter((item) => filterHit([item.learner, item.program, item.credential, item.status])).map((item) => <button key={item.id} type="button" onClick={() => setSelectedCaseId(item.id)} className={`w-full rounded-2xl border p-4 text-left ${selectedCaseId === item.id ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white"}`}><div className="font-medium text-slate-900">{item.learner}</div><div className="text-sm text-slate-600">{item.program}</div><div className="mt-1 text-xs text-slate-500">{item.credential} · Reviewer: {item.reviewer}</div></button>)}</CardContent></Card>
          <Card className="border-slate-200"><CardHeader><CardTitle>Learner record detail</CardTitle><CardDescription>Assessment and award readiness are reviewed here before official issuance.</CardDescription></CardHeader><CardContent className="space-y-4">{selectedCase ? <><div className="rounded-2xl border border-slate-200 p-4"><div className="font-medium text-slate-900">{selectedCase.learner}</div><div className="mt-2 space-y-2 text-sm text-slate-600"><div>Program: {selectedCase.program}</div><div>Credential: {selectedCase.credential}</div><div>Payment: {selectedCase.payment}</div><div>Evidence: {selectedCase.evidence}</div><div>Hard-copy requested: {selectedCase.hardCopy ? "Yes" : "No"}</div></div></div><div className="rounded-2xl border border-slate-200 p-4"><div className="text-sm font-semibold text-slate-900">Governance readiness</div><div className="mt-3"><div className="flex items-center justify-between text-sm"><span className="text-slate-600">Issuance readiness</span><span className="font-semibold text-slate-900">{selectedCase.status === "validated" ? 100 : selectedCase.status === "blocked" ? 25 : 70}%</span></div><Progress value={selectedCase.status === "validated" ? 100 : selectedCase.status === "blocked" ? 25 : 70} className="mt-2 h-2 bg-slate-100" /></div></div><div className="flex flex-wrap gap-2"><Button onClick={() => updateValidation(selectedCase.id, "validated")}>Validate outcome</Button><Button variant="outline" onClick={() => updateValidation(selectedCase.id, "escalated")}>Escalate review</Button><Button variant="outline" onClick={() => updateValidation(selectedCase.id, "blocked")}>Block issuance</Button></div></> : null}</CardContent></Card>
        </TabsContent>

        <TabsContent value="issuance"><Card className="border-slate-200"><CardHeader><CardTitle>Certificate issuance control</CardTitle><CardDescription>Issue, correct, or revoke governed certificates without losing auditability.</CardDescription></CardHeader><CardContent><div className="overflow-hidden rounded-2xl border border-slate-200"><Table><TableHeader><TableRow className="bg-slate-50"><TableHead>Certificate</TableHead><TableHead>Status</TableHead><TableHead>Mode</TableHead><TableHead>Last action</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{certificates.filter((item) => filterHit([item.learner, item.credential, item.number, item.status])).map((item) => <TableRow key={item.id}><TableCell><div className="font-medium text-slate-900">{item.number}</div><div className="text-sm text-slate-600">{item.learner} · {item.credential}</div></TableCell><TableCell><Badge className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold capitalize text-slate-700">{item.status}</Badge></TableCell><TableCell>{item.mode}</TableCell><TableCell>{item.action}</TableCell><TableCell className="text-right"><div className="flex justify-end gap-2"><Button size="sm" onClick={() => updateCertificate(item.id, "issued")}>Issue</Button><Button size="sm" variant="outline" onClick={() => updateCertificate(item.id, "corrected")}>Correct</Button><Button size="sm" variant="outline" onClick={() => updateCertificate(item.id, "revoked")}>Revoke</Button></div></TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card></TabsContent>

        <TabsContent value="fulfillment" className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-slate-200"><CardHeader><CardTitle>Physical hard-copy fulfillment</CardTitle><CardDescription>Printing and shipping stay blocked until the digital record and payment both reconcile.</CardDescription></CardHeader><CardContent><div className="overflow-hidden rounded-2xl border border-slate-200"><Table><TableHeader><TableRow className="bg-slate-50"><TableHead>Learner</TableHead><TableHead>Shipping state</TableHead><TableHead>Tracking</TableHead><TableHead>Controls</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader><TableBody>{fulfillment.filter((item) => filterHit([item.learner, item.credential, item.status, item.tracking])).map((item) => <TableRow key={item.id}><TableCell><div className="font-medium text-slate-900">{item.learner}</div><div className="text-sm text-slate-600">{item.credential}</div><div className="text-xs text-slate-500">{item.address} · {item.vendor}</div></TableCell><TableCell><Badge className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold capitalize text-slate-700">{item.status}</Badge></TableCell><TableCell>{item.tracking}</TableCell><TableCell>{item.payment} · {item.digital}</TableCell><TableCell className="text-right"><Button size="sm" onClick={() => advanceFulfillment(item.id)}>Advance</Button></TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card>
          <Card className="border-slate-200"><CardHeader><CardTitle>Distribution rules</CardTitle><CardDescription>Physical fulfillment remains governed by explicit business rules.</CardDescription></CardHeader><CardContent className="space-y-3 text-sm text-slate-600"><div className="rounded-2xl border border-slate-200 p-4">Delivered packages remain visible so the academic record includes physical distribution history.</div><div className="rounded-2xl border border-slate-200 p-4">Blocked shipments cannot progress until payment and digital validation both turn green.</div><div className="rounded-2xl border border-slate-200 p-4">Materials used per package are retained so hard-copy issuance remains supply-chain traceable.</div></CardContent></Card>
        </TabsContent>

        <TabsContent value="search" className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-slate-200"><CardHeader><CardTitle>Records search results</CardTitle><CardDescription>Validation cases, certificate records, and fulfillment requests filtered through one search view.</CardDescription></CardHeader><CardContent className="space-y-3">{searchResults.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">No academic records match the current search term.</div> : searchResults.map((item) => <div key={item.id} className="rounded-2xl border border-slate-200 p-4"><div className="flex items-center justify-between gap-3"><div><div className="font-medium text-slate-900">{item.title}</div><div className="text-xs text-slate-500">{item.type}</div></div><Badge className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold capitalize text-slate-700">{item.status}</Badge></div></div>)}</CardContent></Card>
          <Card className="border-slate-200"><CardHeader><CardTitle>Records audit trail</CardTitle><CardDescription>Every material intervention on an official outcome stays visible here.</CardDescription></CardHeader><CardContent className="space-y-3">{audit.map((entry) => <div key={entry.id} className="rounded-2xl border border-slate-200 p-4"><div className="font-medium text-slate-900">{entry.action}</div><div className="text-sm text-slate-600">{entry.detail}</div><div className="mt-1 text-xs text-slate-500">{relativeTime(entry.at)}</div></div>)}<div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">Official records remain durable across curriculum changes, and every correction or override is logged for compliance.</div></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
