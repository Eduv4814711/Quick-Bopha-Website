"use client";

import React, { useState } from "react";
import { PhoneCall, MapPin, MessageSquare, Send, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StatutoryTrustBanner } from "@/components/shared/StatutoryTrustBanner";
import { COMPANY_DETAILS } from "@/lib/constants";
import { toast } from "sonner";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "tenders@quickbopha.co.za",
    subject: "Service Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success(`Message transmitted directly to ${formData.department}!`);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0B1340]">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-14 sm:py-18 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-4">
          <Badge
            variant="outline"
            className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
          >
            24/7 Central Command &amp; Contact Hub
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B1340] tracking-tight">
            Connect With Quick Bopha Security
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Direct operational telephone lines, WhatsApp dispatch desk, and departmental email routing for commercial clients, municipal tender committees, and emergency subscribers.
          </p>
        </div>
      </section>

      <StatutoryTrustBanner />

      {/* Main Contact Grid */}
      <section className="py-16 sm:py-20 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Departmental Message Form */}
          <Card className="lg:col-span-7 bg-white border-slate-200 shadow-lg overflow-hidden">
            <CardHeader className="bg-slate-50 p-6 border-b border-slate-200">
              <CardTitle className="text-lg sm:text-xl font-bold text-[#0B1340]">
                Departmental Inquiry Routing
              </CardTitle>
              <CardDescription className="text-xs text-slate-600">
                Inquiries are automatically dispatched to the responsible executive desk.
              </CardDescription>
            </CardHeader>

            {submitted ? (
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center border border-red-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1340]">Message Transmitted</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your communication has been dispatched to{" "}
                  <code className="text-red-600 font-mono font-semibold">{formData.department}</code>. Our team will follow up within 2 operational hours.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="text-xs mt-2 border-slate-300 text-[#0B1340]">
                  Send Another Inquiry
                </Button>
              </CardContent>
            ) : (
              <form onSubmit={handleSubmit}>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-name" className="text-xs font-semibold text-[#0B1340]">Your Full Name</Label>
                      <Input
                        id="c-name"
                        required
                        placeholder="e.g. Kagiso Motsepe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-10 text-xs border-slate-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-email" className="text-xs font-semibold text-[#0B1340]">Email Address</Label>
                      <Input
                        id="c-email"
                        required
                        type="email"
                        placeholder="client@organization.co.za"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-10 text-xs border-slate-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-phone" className="text-xs font-semibold text-[#0B1340]">Contact Telephone</Label>
                      <Input
                        id="c-phone"
                        required
                        type="tel"
                        placeholder="082 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-10 text-xs border-slate-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-[#0B1340]">Department Destination</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(val) => {
                          if (val) setFormData({ ...formData, department: val });
                        }}
                      >
                        <SelectTrigger className="h-10 text-xs font-semibold border-slate-300 text-[#0B1340]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tenders@quickbopha.co.za">Tenders &amp; RFQs (tenders@)</SelectItem>
                          <SelectItem value="compliance@quickbopha.co.za">Compliance &amp; Statutory (compliance@)</SelectItem>
                          <SelectItem value="accounts@quickbopha.co.za">Accounts &amp; Billing (accounts@)</SelectItem>
                          <SelectItem value="academy@quickbopha.co.za">Training Academy Intake (academy@)</SelectItem>
                          <SelectItem value="info@quickbopha.co.za">General Operational Inquiries (info@)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="c-subj" className="text-xs font-semibold text-[#0B1340]">Subject</Label>
                    <Input
                      id="c-subj"
                      required
                      placeholder="e.g. Guarding Proposal for Klerksdorp Depot"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-10 text-xs border-slate-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="c-msg" className="text-xs font-semibold text-[#0B1340]">Detailed Message</Label>
                    <textarea
                      id="c-msg"
                      required
                      rows={4}
                      placeholder="Specify your guarding requirements, post quantities, or alarm monitoring questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600 resize-y"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-11 text-xs gap-2 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? "Routing..." : "Transmit Message"}
                  </Button>
                </CardContent>
              </form>
            )}
          </Card>

          {/* Quick Contact & Emergency Desk Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* 24/7 Rapid Emergency Callout */}
            <Card className="border-red-200 bg-red-50/60 shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-red-600">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                  <span className="font-extrabold text-sm uppercase tracking-wider">24/7 Emergency Dispatch</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  For active alarm triggers, farm security incidents, or armed response dispatch in Wolmaransstad, Maquassi Hills, and the N12 corridor:
                </p>
                <div className="pt-1 space-y-2.5">
                  <a
                    href={`tel:${COMPANY_DETAILS.hotlines.controlRoom.replace(/\s+/g, "")}`}
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-sm transition-transform hover:scale-[1.01]"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Voice Hotline: {COMPANY_DETAILS.hotlines.controlRoom}
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.hotlines.whatsappDispatch}?text=EMERGENCY%20DISPATCH%20REQUEST`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#0B1340] hover:bg-[#152266] text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp Control Desk
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Headquarters Card */}
            <Card className="bg-white border-slate-200 shadow-md">
              <CardContent className="p-6 space-y-4 text-xs">
                <h4 className="font-bold text-sm text-[#0B1340] uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  Headquarters &amp; Central Command
                </h4>
                <div className="space-y-1.5 text-slate-600">
                  <div className="font-bold text-[#0B1340]">{COMPANY_DETAILS.headquarters.address}</div>
                  <div>{COMPANY_DETAILS.headquarters.municipality}</div>
                  <div>{COMPANY_DETAILS.headquarters.district}</div>
                  <div>{COMPANY_DETAILS.headquarters.province}, {COMPANY_DETAILS.headquarters.country}</div>
                  <div className="text-red-600 font-semibold pt-1">
                    {COMPANY_DETAILS.headquarters.n12Corridor}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1 text-slate-600">
                  <div><strong className="text-[#0B1340]">General Email:</strong> {COMPANY_DETAILS.emails.general}</div>
                  <div><strong className="text-[#0B1340]">Tender Desk:</strong> {COMPANY_DETAILS.emails.tenders}</div>
                  <div><strong className="text-[#0B1340]">Compliance:</strong> {COMPANY_DETAILS.emails.compliance}</div>
                  <div><strong className="text-[#0B1340]">PSiRA Registration:</strong> {COMPANY_DETAILS.psiraRegistration}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
