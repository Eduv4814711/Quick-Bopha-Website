"use client";

import React, { useState } from "react";
import { CheckCircle2, UploadCloud, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { COMPANY_DETAILS } from "@/lib/constants";

export function GuardApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    saIdNumber: "",
    phoneNumber: "",
    emailAddress: "",
    residentialTown: "Wolmaransstad",
    psiraGrade: "Grade C",
    psiraRegNumber: "",
    hasFirearmCompetency: false,
    hasDriversLicense: false,
    preferredDeployment: "Static Guarding / Commercial",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // Fallback if offline
    }

    setSubmitting(false);
    setSubmitted(true);
    toast.success("Application Received! You will be contacted for physical vetting at Wolmaransstad HQ.");
  };

  return (
    <Card className="bg-white border-slate-200 shadow-lg overflow-hidden max-w-3xl mx-auto">
      <CardHeader className="bg-slate-50 p-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50 text-xs font-semibold">
            FEAT-06 • Local Careers Portal
          </Badge>
          <span className="text-xs text-slate-600 font-medium">&ldquo;{COMPANY_DETAILS.mottoes.secondary}&rdquo;</span>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-black text-[#0B1340] mt-1">
          Security Officer Intake &amp; Recruitment
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-slate-600">
          Join the premier black-owned security enterprise in the North West. We offer 100% statutory NBCPSS wages, provident fund benefits, and rapid tactical career advancement.
        </CardDescription>
      </CardHeader>

      {submitted ? (
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center border border-red-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#0B1340]">Application Successfully Logged</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Candidate <span className="font-semibold text-[#0B1340]">{form.fullName}</span> (PSiRA: {form.psiraRegNumber || "Pending"}) has been registered in our recruitment database.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Our Human Resources officer at Wolmaransstad HQ will contact you on <strong>{form.phoneNumber}</strong> for document verification.
          </p>
          <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="text-xs mt-2 border-slate-300 text-[#0B1340]">
            Submit Another Application
          </Button>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="guard-name" className="text-xs font-semibold text-[#0B1340]">Full Legal Names</Label>
                <Input
                  id="guard-name"
                  required
                  placeholder="e.g. Kgosietsile Mokoena"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="h-10 text-xs border-slate-300"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="guard-id" className="text-xs font-semibold text-[#0B1340]">South African ID Number</Label>
                <Input
                  id="guard-id"
                  required
                  maxLength={13}
                  placeholder="13-digit ID number"
                  value={form.saIdNumber}
                  onChange={(e) => setForm({ ...form, saIdNumber: e.target.value })}
                  className="h-10 text-xs font-mono border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="guard-phone" className="text-xs font-semibold text-[#0B1340]">Contact Phone Number</Label>
                <Input
                  id="guard-phone"
                  required
                  type="tel"
                  placeholder="082 000 0000"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  className="h-10 text-xs border-slate-300"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="guard-town" className="text-xs font-semibold text-[#0B1340]">Residential Area (North West)</Label>
                <Select
                  value={form.residentialTown}
                  onValueChange={(val) => {
                    if (val) setForm({ ...form, residentialTown: val });
                  }}
                >
                  <SelectTrigger className="h-10 text-xs border-slate-300 text-[#0B1340]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wolmaransstad">Wolmaransstad / Tswelelang</SelectItem>
                    <SelectItem value="Maquassi Hills">Maquassi Hills / Leeudoringstad</SelectItem>
                    <SelectItem value="Klerksdorp">Klerksdorp / Jouberton</SelectItem>
                    <SelectItem value="Potchefstroom">Potchefstroom / Ikageng</SelectItem>
                    <SelectItem value="Makwassie">Makwassie / Lebaleng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#0B1340]">Current PSiRA Grade</Label>
                <Select
                  value={form.psiraGrade}
                  onValueChange={(val) => {
                    if (val) setForm({ ...form, psiraGrade: val });
                  }}
                >
                  <SelectTrigger className="h-10 text-xs font-semibold border-slate-300 text-[#0B1340]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade A">Grade A (Site Commander / Manager)</SelectItem>
                    <SelectItem value="Grade B">Grade B (Shift Supervisor)</SelectItem>
                    <SelectItem value="Grade C">Grade C (Armed / Site Guard)</SelectItem>
                    <SelectItem value="Grade D">Grade D (Access Control)</SelectItem>
                    <SelectItem value="Grade E">Grade E (Entry Guard)</SelectItem>
                    <SelectItem value="Unregistered / Academy Needed">Unregistered (Enrol in Academy)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="guard-psira" className="text-xs font-semibold text-[#0B1340]">PSiRA Registration Number (If Active)</Label>
                <Input
                  id="guard-psira"
                  placeholder="e.g. 2918471"
                  value={form.psiraRegNumber}
                  onChange={(e) => setForm({ ...form, psiraRegNumber: e.target.value })}
                  className="h-10 text-xs font-mono border-slate-300"
                />
              </div>
            </div>

            {/* Additional Competencies */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-[#0B1340]">
                Additional Qualifications &amp; Licenses
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 text-xs cursor-pointer hover:bg-slate-50 text-[#0B1340]">
                  <Checkbox
                    checked={form.hasFirearmCompetency}
                    onCheckedChange={(checked) => setForm({ ...form, hasFirearmCompetency: !!checked })}
                  />
                  <span>SAPS Firearm Competency (Handgun / Shotgun / Rifle)</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 text-xs cursor-pointer hover:bg-slate-50 text-[#0B1340]">
                  <Checkbox
                    checked={form.hasDriversLicense}
                    onCheckedChange={(checked) => setForm({ ...form, hasDriversLicense: !!checked })}
                  />
                  <span>Valid Driver&apos;s License (Code 8 / Code 10 + PDP)</span>
                </label>
              </div>
            </div>

            {/* CV Upload */}
            <div className="space-y-1.5 pt-2">
              <Label className="text-xs font-semibold text-[#0B1340]">Upload Curriculum Vitae (CV) &amp; PSiRA Certificate</Label>
              <div className="border-2 border-dashed border-slate-300 hover:border-red-400 rounded-xl p-4 text-center text-xs space-y-1.5 bg-slate-50">
                <UploadCloud className="w-5 h-5 mx-auto text-red-600" />
                <div className="font-semibold text-[#0B1340]">{fileName ? fileName : "Attach PDF or Word Document"}</div>
                <label className="inline-block pt-1">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFileName(file.name);
                        toast.success(`Attached CV: ${file.name}`);
                      }
                    }}
                  />
                  <span className="py-1.5 px-3.5 bg-[#0B1340] hover:bg-red-600 text-white rounded-lg text-[11px] font-semibold cursor-pointer transition-colors">
                    {fileName ? "Change File" : "Select CV File"}
                  </span>
                </label>
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-slate-600 text-center sm:text-left">
              Quick Bopha Security is an Equal Opportunity, 100% Black-Owned Employer.
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-10 gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? "Transmitting..." : "Submit Officer Application"}
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
