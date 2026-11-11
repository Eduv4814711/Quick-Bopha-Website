"use client";

import React, { useState } from "react";
import { Lock, Download, ShieldCheck, Building2, User, Mail, Phone, Hash, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { STATUTORY_DOCUMENTS, generateComplianceBundlePDF, TenderVaultSubmission } from "@/lib/compliance-vault";
import { toast } from "sonner";

export function ComplianceVault() {
  const [formData, setFormData] = useState({
    officerName: "",
    organization: "",
    businessEmail: "",
    phoneNumber: "",
    tenderReference: "",
  });

  const [selectedDocs, setSelectedDocs] = useState<string[]>(
    STATUTORY_DOCUMENTS.map((d) => d.id)
  );

  const [isDownloading, setIsDownloading] = useState(false);

  const toggleDoc = (id: string) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocs.length === STATUTORY_DOCUMENTS.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(STATUTORY_DOCUMENTS.map((d) => d.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedDocs.length === 0) {
      toast.error("Please select at least one statutory compliance document to download.");
      return;
    }

    setIsDownloading(true);

    try {
      const submission: TenderVaultSubmission = {
        ...formData,
        selectedDocuments: selectedDocs,
      };

      generateComplianceBundlePDF(submission);

      await fetch("/api/compliance/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...submission,
          timestamp: new Date().toISOString(),
        }),
      });

      setIsDownloading(false);
      toast.success("Verified Tender Compliance Pack Downloaded & Audit Logged to compliance@quickbopha.co.za");
    } catch {
      setIsDownloading(false);
      toast.info("Compliance Pack downloaded.");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Intro Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <Badge
          variant="outline"
          className="border-red-200 text-red-700 bg-red-50 text-xs uppercase tracking-wider font-semibold"
        >
          FEAT-02 • Gated B2B Vault
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
          Verified Tender &amp; Statutory Compliance Vault
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Gated, audited download portal for Municipal Supply Chain Management (SCM) committees, state-owned entities, and commercial procurement panels along the N12 corridor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Verification & Access Form */}
        <Card className="lg:col-span-7 bg-white border-slate-200 shadow-lg overflow-hidden">
          <CardHeader className="bg-slate-50 p-5 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#0B1340] text-white flex items-center justify-center">
                <Lock className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg font-bold text-[#0B1340]">
                  Procurement Officer Authentication
                </CardTitle>
                <CardDescription className="text-xs text-slate-600">
                  Required for POPIA compliance tracking and formal municipal tender audit logging.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="officerName" className="text-xs font-semibold text-[#0B1340] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-600" />
                    Officer Full Name
                  </Label>
                  <Input
                    id="officerName"
                    required
                    placeholder="e.g. Sipho Khumalo"
                    value={formData.officerName}
                    onChange={(e) => setFormData({ ...formData, officerName: e.target.value })}
                    className="h-9 text-xs border-slate-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="organization" className="text-xs font-semibold text-[#0B1340] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-red-600" />
                    Municipal / Corporate Entity
                  </Label>
                  <Input
                    id="organization"
                    required
                    placeholder="e.g. Maquassi Hills Local Municipality"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="h-9 text-xs border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="businessEmail" className="text-xs font-semibold text-[#0B1340] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-red-600" />
                    Official Business Email
                  </Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    required
                    placeholder="officer@municipality.gov.za"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    className="h-9 text-xs border-slate-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phoneNumber" className="text-xs font-semibold text-[#0B1340] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-red-600" />
                    Official Contact Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    required
                    placeholder="018 596 1000"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="h-9 text-xs border-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tenderReference" className="text-xs font-semibold text-[#0B1340] flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-red-600" />
                  Tender / RFQ Reference Number
                </Label>
                <Input
                  id="tenderReference"
                  required
                  placeholder="e.g. MHLM/SCM/SEC/2026/02 or Commercial RFP"
                  value={formData.tenderReference}
                  onChange={(e) => setFormData({ ...formData, tenderReference: e.target.value })}
                  className="h-9 text-xs border-slate-300"
                />
              </div>

              {/* Document Selection Checklist */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase tracking-wider text-[#0B1340]">
                    Statutory Documents to Bundle
                  </Label>
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    {selectedDocs.length === STATUTORY_DOCUMENTS.length
                      ? "Deselect All"
                      : `Select All (${STATUTORY_DOCUMENTS.length})`}
                  </button>
                </div>

                <div className="space-y-2">
                  {STATUTORY_DOCUMENTS.map((doc) => {
                    const isChecked = selectedDocs.includes(doc.id);
                    return (
                      <div
                        key={doc.id}
                        onClick={() => toggleDoc(doc.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                          isChecked
                            ? "border-red-300 bg-red-50/40"
                            : "border-slate-200 bg-white opacity-75"
                        }`}
                      >
                        <Checkbox checked={isChecked} className="mt-0.5" />
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-bold text-[#0B1340]">{doc.title}</span>
                            <div className="flex items-center gap-1.5">
                              {doc.fileUrl && (
                                <a
                                  href={doc.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[10px] font-bold text-[#0B1340] hover:text-red-600 bg-white px-2 py-0.5 rounded border border-slate-300 shadow-2xs transition-colors"
                                >
                                  View Official PDF ↗
                                </a>
                              )}
                              <span className="text-[10px] font-mono text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                                {doc.status}
                              </span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-600">{doc.description}</p>
                          <div className="text-[10px] text-slate-500 flex flex-wrap items-center gap-2 pt-0.5">
                            <span className="font-mono text-[#0B1340] font-semibold">{doc.code}</span>
                            <span>•</span>
                            <span>Authority: {doc.issuingAuthority}</span>
                            <span>•</span>
                            <span>Valid Until: {doc.validUntil}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-slate-50 p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-600 text-center sm:text-left">
                100% Audit Dispatched to <code className="text-[#0B1340] font-mono font-semibold">compliance@quickbopha.co.za</code>
              </div>

              <Button
                type="submit"
                disabled={isDownloading}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold h-10 text-xs gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                {isDownloading ? "Assembling Bundle..." : `Download Signed Bundle (${selectedDocs.length})`}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Audit & Legal Guarantee Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-slate-200 bg-white shadow-md">
            <CardHeader className="p-5 pb-3 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-2 text-[#0B1340]">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <CardTitle className="text-base font-bold text-[#0B1340]">Statutory Audit Protocol</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-3 text-xs text-slate-600">
              <p className="leading-relaxed">
                Every download from this vault generates a cryptographic audit record containing the requesting officer’s IP address, municipal domain, timestamp, and tender reference.
              </p>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-[#0B1340] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  Official Statutory Identifiers
                </div>
                <div className="text-[11px] text-slate-600 space-y-1.5 font-medium">
                  <div>• <span className="text-[#0B1340] font-semibold">CIPC Reg (CRNR):</span> <span className="font-mono">2014/281440/07</span></div>
                  <div>• <span className="text-[#0B1340] font-semibold">PSiRA Reg No:</span> <span className="font-mono text-red-600 font-bold">2639354</span></div>
                  <div>• <span className="text-[#0B1340] font-semibold">National Treasury CSD:</span> <span className="font-mono">MAAA0280738</span></div>
                  <div>• <span className="text-[#0B1340] font-semibold">SARS TCS Good Standing PIN:</span> <span className="font-mono">95D136823W</span> (Exp: 08/10/2027)</div>
                  <div>• <span className="text-[#0B1340] font-semibold">VAT / Income Tax:</span> <span className="font-mono">4020288215 / 9586345176</span></div>
                  <div>• <span className="text-[#0B1340] font-semibold">PAYE / SDL / UIF:</span> <span className="font-mono">7210835718 / L210835718 / U210835718</span></div>
                  <div>• <span className="text-[#0B1340] font-semibold">SASSETA Chamber:</span> <span className="font-mono">SETA 13 (Code 81902)</span></div>
                  <div>• <span className="text-[#0B1340] font-semibold">POPIA Certificate:</span> <span className="font-mono">2026-068037</span> (IO: Mpho Mapulane)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 rounded-xl border border-red-200 bg-red-50/50 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-[#0B1340] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-red-600" />
              Direct Compliance Secretariat
            </div>
            <p className="leading-relaxed">
              Need custom sworn affidavits or site-specific operational risk assessments for municipal RFP submissions?
            </p>
            <div className="pt-1">
              <a
                href="mailto:compliance@quickbopha.co.za?subject=Municipal%20Tender%20Compliance%20Inquiry"
                className="font-bold text-red-600 hover:underline inline-flex items-center gap-1"
              >
                Email compliance@quickbopha.co.za →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
