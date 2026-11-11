"use client";

import React, { useState, useMemo } from "react";
import { Download, ShieldCheck, FileSpreadsheet, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  calculateNBCPSSQuote,
  generateQuotePDF,
  GuardGrade,
  ShiftType,
  OperationalArea,
  NBCPSSInput,
} from "@/lib/nbcpss-calculator";
import { toast } from "sonner";

interface Props {
  condensed?: boolean;
}

export function NBCPSSRateCalculator({ condensed = false }: Props) {
  const [grade, setGrade] = useState<GuardGrade>("Grade C");
  const [shiftType, setShiftType] = useState<ShiftType>("rotational_24_7");
  const [officerCount, setOfficerCount] = useState<number>(4);
  const [area, setArea] = useState<OperationalArea>("Area 3 (Rural / Agri / N12 Corridor)");
  const [locationName, setLocationName] = useState<string>("Wolmaransstad / Maquassi Hills");
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);

  const quoteInput: NBCPSSInput = useMemo(
    () => ({
      grade,
      shiftType,
      officerCount: Math.max(1, officerCount || 1),
      area,
      locationName,
      clientName: clientName || undefined,
      clientEmail: clientEmail || undefined,
    }),
    [grade, shiftType, officerCount, area, locationName, clientName, clientEmail]
  );

  const result = useMemo(() => calculateNBCPSSQuote(quoteInput), [quoteInput]);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      generateQuotePDF(result);

      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });

      toast.success("Official NBCPSS PDF Quote Exported! Copy routed to accounts@quickbopha.co.za");
    } catch {
      toast.info("PDF Quote downloaded successfully.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="w-full bg-white border-slate-200/90 shadow-lg overflow-hidden">
      <CardHeader className="bg-slate-50/90 p-6 border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-red-200 text-red-700 bg-red-50 text-xs uppercase tracking-wider font-semibold"
              >
                FEAT-01 • Statutory Costing
              </Badge>
              <span className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-red-600" />
                30-Second NBCPSS Calculator
              </span>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-extrabold text-[#0B1340]">
              NBCPSS Statutory Guarding Rate Estimator
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-slate-600">
              Calculate mathematically verified, 100% statutory compliant private security rates per National Bargaining Council wage determination tables.
            </CardDescription>
          </div>

          <div className="hidden sm:flex flex-col items-end text-xs text-slate-600 bg-white px-3.5 py-2 rounded-lg border border-slate-200">
            <span className="text-red-600 font-mono font-bold">1:4.5 Shift Relief Factor</span>
            <span className="text-[#0B1340] font-medium">28.5% Statutory Benefits Loaded</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6 bg-white">
        {/* Configuration Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Guard Grade */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-[#0B1340]">
              1. Guarding Grade
            </Label>
            <Select
              value={grade}
              onValueChange={(val) => {
                if (val) setGrade(val as GuardGrade);
              }}
            >
              <SelectTrigger className="h-10 text-xs font-semibold border-slate-300 text-[#0B1340]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grade A">Grade A (Site Commander / Risk Officer)</SelectItem>
                <SelectItem value="Grade B">Grade B (Shift Supervisor / Senior Patrol)</SelectItem>
                <SelectItem value="Grade C">Grade C (Standard Commercial &amp; Industrial)</SelectItem>
                <SelectItem value="Grade D">Grade D (Access Control &amp; Patroller)</SelectItem>
                <SelectItem value="Grade E">Grade E (Entry Guarding Officer)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Shift Configuration */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-[#0B1340]">
              2. Shift Coverage Pattern
            </Label>
            <Select
              value={shiftType}
              onValueChange={(val) => {
                if (val) setShiftType(val as ShiftType);
              }}
            >
              <SelectTrigger className="h-10 text-xs font-semibold border-slate-300 text-[#0B1340]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rotational_24_7">24/7 Continuous Coverage (1.222x Relief)</SelectItem>
                <SelectItem value="night_12h">12-Hour Night Shift Only</SelectItem>
                <SelectItem value="day_12h">12-Hour Day Shift Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Officer Quantity */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-[#0B1340]">
              3. Officer Quantity (Posts)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={150}
                value={officerCount}
                onChange={(e) => setOfficerCount(parseInt(e.target.value) || 1)}
                className="h-10 text-xs font-bold border-slate-300 text-[#0B1340]"
              />
              <span className="text-xs text-slate-600 font-medium whitespace-nowrap">Officers</span>
            </div>
          </div>

          {/* Operating Area & N12 Location */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-[#0B1340]">
              4. Statutory Wage Area
            </Label>
            <Select
              value={area}
              onValueChange={(val) => {
                if (!val) return;
                const areaVal = val as OperationalArea;
                setArea(areaVal);
                if (areaVal.includes("Area 3")) setLocationName("Wolmaransstad / Maquassi Hills");
                else if (areaVal.includes("Area 2")) setLocationName("Klerksdorp / Potchefstroom");
                else setLocationName("Metropolitan Regional Post");
              }}
            >
              <SelectTrigger className="h-10 text-xs font-semibold border-slate-300 text-[#0B1340]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Area 3 (Rural / Agri / N12 Corridor)">Area 3 (Wolmaransstad / Maquassi Hills / Agri)</SelectItem>
                <SelectItem value="Area 2 (Regional Urban)">Area 2 (Klerksdorp / Potchefstroom / Urban)</SelectItem>
                <SelectItem value="Area 1 (Major Metros)">Area 1 (Gauteng / Metros)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Client & Organization Optional Fields for Quote Header */}
        {!condensed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-slate-700">
                Company / Farm / Municipal Entity (Optional)
              </Label>
              <Input
                placeholder="e.g. North West Agribusiness / Mining Corp"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="h-9 text-xs border-slate-300"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium text-slate-700">
                Official Email (For Instant Quote Delivery)
              </Label>
              <Input
                type="email"
                placeholder="procurement@organization.co.za"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="h-9 text-xs border-slate-300"
              />
            </div>
          </div>
        )}

        {/* Real-time Calculation Summary Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Main Key Figures Highlight - Clean Shadcn Highlight Box */}
          <div className="lg:col-span-1 bg-slate-50 rounded-xl p-5 flex flex-col justify-between border-2 border-[#0B1340]/15 shadow-xs">
            <div className="space-y-4">
              <div className="text-xs text-[#0B1340] font-bold tracking-wider uppercase flex items-center justify-between">
                <span>Estimated Monthly Total</span>
                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 text-[10px]">
                  Excl. VAT
                </Badge>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-red-600 font-mono">
                  R {result.totalMonthlyContractCost.toLocaleString("en-ZA")}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  For <span className="font-bold text-[#0B1340]">{result.inputs.officerCount}</span> {result.inputs.grade} Officers ({result.inputs.shiftType.replace("_", " ")})
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-600">Rate Per Single Post:</span>
                  <span className="font-bold text-[#0B1340] font-mono">
                    R {result.monthlyCostPerPost.toLocaleString("en-ZA")}/mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Statutory Base Salary:</span>
                  <span className="font-bold text-[#0B1340] font-mono">
                    R {result.basicSalaryPerOfficer.toLocaleString("en-ZA")}/mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Provident &amp; Benefit Load:</span>
                  <span className="font-bold text-red-600 font-mono">
                    +R {result.statutoryBenefitsPerOfficer.toLocaleString("en-ZA")} (28.5%)
                  </span>
                </div>
                {result.reliefMultiplier > 1 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shift Relief (1:4.5):</span>
                    <span className="font-bold text-[#0B1340] font-mono">1.222x Multiplier</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <Button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-11 text-xs gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                {isExporting ? "Compiling PDF..." : "Export Statutory PDF Quote"}
              </Button>
            </div>
          </div>

          {/* Itemized Statutory Breakdown Table */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B1340] flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-red-600" />
                Statutory Itemized Cost Build-Up (Per Guard Post)
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                Ref: {result.quoteReference}
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 font-bold text-[#0B1340] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Statutory Component</th>
                    <th className="py-2.5 px-3 hidden sm:table-cell">Regulatory Basis</th>
                    <th className="py-2.5 px-3 text-right">Cost (ZAR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.breakdown.map((row) => (
                    <tr key={row.code} className="hover:bg-slate-50/80">
                      <td className="py-2 px-3">
                        <div className="font-semibold text-[#0B1340]">{row.label}</div>
                        <div className="text-[11px] text-slate-500 sm:hidden">{row.notes}</div>
                      </td>
                      <td className="py-2 px-3 text-slate-600 hidden sm:table-cell">{row.notes}</td>
                      <td className="py-2 px-3 text-right font-mono font-medium text-[#0B1340] whitespace-nowrap">
                        R {row.amountZar.toLocaleString("en-ZA")}.00
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold border-t border-slate-200">
                    <td className="py-2.5 px-3 text-[#0B1340]">Total per Post (excl. VAT)</td>
                    <td className="py-2.5 px-3 text-slate-600 hidden sm:table-cell">Statutory Minimum Guard Cost</td>
                    <td className="py-2.5 px-3 text-right font-mono text-red-600">
                      R {result.monthlyCostPerPost.toLocaleString("en-ZA")}.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Statutory Compliance Warranty Card */}
            <div className="p-3.5 bg-red-50/70 border border-red-200/80 rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-[#0B1340]">Sub-Minimum Wage Protection: </span>
                Procuring guarding below NBCPSS gazetted minimum rates exposes corporate directors and municipal accounting officers to statutory liability, tender disqualification, and PSiRA sanctions. Quick Bopha guarantees 100% legal compliance.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
