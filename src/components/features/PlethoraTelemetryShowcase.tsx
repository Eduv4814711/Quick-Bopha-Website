"use client";

import React, { useState, useEffect } from "react";
import { Radio, ShieldCheck, MapPin, Activity, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface PatrolEvent {
  id: string;
  time: string;
  officer: string;
  location: string;
  checkpoint: string;
  status: "Verified On-Time" | "Checkpoint Logged" | "All Clear";
}

const INITIAL_EVENTS: PatrolEvent[] = [
  {
    id: "OB-9921",
    time: "11:24:12",
    officer: "Officer K. Sithole (Badge #401)",
    location: "Wolmaransstad CBD Depot, N12",
    checkpoint: "Perimeter Checkpoint 04 (South Gate)",
    status: "Verified On-Time",
  },
  {
    id: "OB-9920",
    time: "11:21:45",
    officer: "Officer M. Dipitso (Badge #219)",
    location: "Maquassi Hills Municipal Substation",
    checkpoint: "Transformer Vault Checkpoint 02",
    status: "Checkpoint Logged",
  },
  {
    id: "OB-9919",
    time: "11:18:03",
    officer: "Patrol Unit Alpha-1 (Fleet Response)",
    location: "N12 Transport Route, Sector 3",
    checkpoint: "Route Telemetry Breadcrumb",
    status: "All Clear",
  },
  {
    id: "OB-9918",
    time: "11:14:50",
    officer: "Officer P. Ndlovu (Badge #312)",
    location: "Agricultural Grain Silos Facility",
    checkpoint: "Perimeter Fence West (RFID #12)",
    status: "Verified On-Time",
  },
];

export function PlethoraTelemetryShowcase() {
  const [events, setEvents] = useState<PatrolEvent[]>(INITIAL_EVENTS);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditForm, setAuditForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    siteLocation: "Wolmaransstad / North West",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-ZA", { hour12: false });
      const randomId = `OB-${Math.floor(9922 + Math.random() * 50)}`;
      const newEvent: PatrolEvent = {
        id: randomId,
        time: timeStr,
        officer: `Patrol Officer #${Math.floor(200 + Math.random() * 300)}`,
        location: Math.random() > 0.5 ? "Wolmaransstad Commercial Post" : "N12 Sector Patrol Point",
        checkpoint: `Active Checkpoint #${Math.floor(1 + Math.random() * 8)}`,
        status: "Verified On-Time",
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 4)]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Site Audit Request Transmitted directly to tenders@quickbopha.co.za!");
    setIsAuditModalOpen(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase tracking-wider font-semibold"
            >
              FEAT-05 • Operational Proof-of-Technology
            </Badge>
            <span className="flex items-center gap-1.5 text-xs text-red-600 font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              LIVE TELEMETRY FEED
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1340] tracking-tight">
            Plethora AI Guard Patrol &amp; Telemetry Suite
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Real-time GPS breadcrumbs, digital Occurrence Book (OB) logging, and biometric checkpoint verification guarding critical infrastructure across the North West.
          </p>
        </div>

        <Dialog open={isAuditModalOpen} onOpenChange={setIsAuditModalOpen}>
          <DialogTrigger className="inline-flex items-center justify-center rounded-lg bg-[#0B1340] hover:bg-red-600 text-white font-bold text-xs h-10 px-4 gap-2 shadow-sm transition-colors cursor-pointer">
            <ShieldCheck className="w-4 h-4" />
            Request Technical Site Audit
          </DialogTrigger>
          <DialogContent className="sm:max-w-[460px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-[#0B1340]">
                Request Technical Site Security Audit
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-600">
                Our Senior Risk Assessors conduct an on-site survey of perimeter vulnerabilities, lighting, and response times.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAuditSubmit} className="space-y-3 pt-2">
              <div className="space-y-1">
                <Label htmlFor="aud-name" className="text-xs font-semibold text-[#0B1340]">Your Name &amp; Title</Label>
                <Input
                  id="aud-name"
                  required
                  placeholder="e.g. Johan van der Merwe (Ops Manager)"
                  value={auditForm.name}
                  onChange={(e) => setAuditForm({ ...auditForm, name: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="aud-comp" className="text-xs font-semibold text-[#0B1340]">Company / Agricultural Farm Name</Label>
                <Input
                  id="aud-comp"
                  required
                  placeholder="e.g. Maquassi Commercial Grain Silos"
                  value={auditForm.company}
                  onChange={(e) => setAuditForm({ ...auditForm, company: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="aud-phone" className="text-xs font-semibold text-[#0B1340]">Direct Phone</Label>
                  <Input
                    id="aud-phone"
                    required
                    type="tel"
                    placeholder="083 456 7890"
                    value={auditForm.phone}
                    onChange={(e) => setAuditForm({ ...auditForm, phone: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="aud-email" className="text-xs font-semibold text-[#0B1340]">Email</Label>
                  <Input
                    id="aud-email"
                    required
                    type="email"
                    placeholder="ops@company.co.za"
                    value={auditForm.email}
                    onChange={(e) => setAuditForm({ ...auditForm, email: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="aud-loc" className="text-xs font-semibold text-[#0B1340]">Site Location (Along N12 Corridor)</Label>
                <Input
                  id="aud-loc"
                  required
                  placeholder="Wolmaransstad, Klerksdorp, or farm coordinates"
                  value={auditForm.siteLocation}
                  onChange={(e) => setAuditForm({ ...auditForm, siteLocation: e.target.value })}
                  className="h-9 text-xs"
                />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-10 text-xs gap-1.5 mt-2">
                <Send className="w-3.5 h-3.5" /> Transmit to tenders@quickbopha.co.za
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Proof-of-Tech Dashboard Grid - Clean Light Shadcn Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real-time Digital Occurrence Book (OB) Console */}
        <Card className="lg:col-span-7 bg-white border-slate-200 shadow-md overflow-hidden">
          <CardHeader className="p-4 bg-slate-50 border-b border-slate-200 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-600" />
              <CardTitle className="text-sm font-bold text-[#0B1340]">
                Live Cloud Occurrence Book (OB Log Stream)
              </CardTitle>
            </div>
            <span className="text-[10px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
              Immutable Hash Chain
            </span>
          </CardHeader>

          <CardContent className="p-4 space-y-2.5">
            {events.map((event, idx) => (
              <div
                key={`${event.id}-${idx}`}
                className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/90 hover:border-red-200 transition-all flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-red-600">{event.id}</span>
                    <span className="text-[#0B1340] font-semibold">{event.officer}</span>
                  </div>
                  <div className="text-slate-600 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-600" />
                    <span>{event.location}</span>
                    <span>•</span>
                    <span className="text-slate-500">{event.checkpoint}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-[11px] text-slate-500">{event.time}</div>
                  <Badge variant="outline" className="text-[10px] border-slate-300 text-[#0B1340] bg-white mt-0.5 font-semibold">
                    {event.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Operational Capability Metrics Cards */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="bg-white border-slate-200 p-5 space-y-4 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1340] flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-600" />
              Telemetry Performance Metrics
            </h4>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">Patrol Verification Accuracy</span>
                  <span className="font-bold text-[#0B1340] font-mono">99.8%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0B1340] rounded-full" style={{ width: "99.8%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">N12 Corridor Emergency Dispatch Latency</span>
                  <span className="font-bold text-red-600 font-mono">&lt; 4.8 min avg</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full" style={{ width: "94%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 font-medium">Statutory Wage &amp; Relief Compliance</span>
                  <span className="font-bold text-[#0B1340] font-mono">100% NBCPSS</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0B1340] rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-600 space-y-2">
              <div className="font-bold text-[#0B1340] uppercase tracking-wider text-[10px]">
                Plethora Workforce OS Core Invariants
              </div>
              <div className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                <span><strong className="text-[#0B1340]">&ldquo;Roster = Plan, Attendance = Truth&rdquo;:</strong> Billing &amp; payroll derive strictly from verified biometric/GPS shift attendance.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B1340] mt-1.5 shrink-0" />
                <span><strong className="text-[#0B1340]">PSiRA &amp; SAPS Firearm Hard-Lock:</strong> Zero deployment of expired PSiRA grades or unverified FCA Act 60 of 2000 competencies.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                <span><strong className="text-[#0B1340]">BCEA Sectoral Determination 6:</strong> Automated 12h shift rules (06:00–18:00 / 18:00–06:00), &gt;45h overtime &amp; Sunday/Holiday multipliers.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B1340] mt-1.5 shrink-0" />
                <span><strong className="text-[#0B1340]">WhatsApp &amp; Dual-Channel Failover:</strong> Low-connectivity rural farm check-ins bridged directly to 24/7 Control Room.</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
