"use client";

import React, { useState, useMemo } from "react";
import { Download, ShieldCheck, FileSpreadsheet, Clock, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  calculateNBCPSSQuote,
  generateQuotePDF,
  formatZar,
  GuardGrade,
  ShiftType,
  OperationalArea,
  NBCPSSInput,
} from "@/lib/nbcpss-calculator";
import { toast } from "sonner";

interface Props {
  condensed?: boolean;
  onQuoteGenerated?: () => void;
}

export function NBCPSSRateCalculator({ condensed = false, onQuoteGenerated }: Props) {
  const [grade, setGrade] = useState<GuardGrade>("Grade C");
  const [shiftType, setShiftType] = useState<ShiftType>("rotational_24_7");
  const [officerCount, setOfficerCount] = useState<number>(4);
  const [area, setArea] = useState<OperationalArea>("Area 3 (Rural / Agri / N12 Corridor)");
  const [locationName, setLocationName] = useState<string>("Wolmaransstad / Maquassi Hills");
  const [overheadPercentage, setOverheadPercentage] = useState<number>(0);
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
      overheadPercentage,
      clientName: clientName || undefined,
      clientEmail: clientEmail || undefined,
    }),
    [grade, shiftType, officerCount, area, locationName, overheadPercentage, clientName, clientEmail]
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

      if (onQuoteGenerated) {
        onQuoteGenerated();
      }

      toast.success("Official NBCPSS PDF Quote Exported & Logged in Admin Audit Vault!");
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
                Internal Admin Tool • Official Direct Cost Engine
              </Badge>
              <span className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-red-600" />
                Area 1 &amp; 2 and Area 3 Schedule
              </span>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-extrabold text-[#0B1340]">
              NBCPSS Statutory Guarding Rate Estimator
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-slate-600">
              Configured with Quick Bopha Security&apos;s official Area 1 &amp; 2 (<code>R 18,479.61 – R 21,431.90</code>) and Area 3 (<code>R 17,787.16 – R 18,827.08</code>) Direct Cost schedules.
            </CardDescription>
          </div>

          <div className="hidden sm:flex flex-col items-end text-xs text-slate-600 bg-white px-3.5 py-2 rounded-lg border border-slate-200">
            <span className="text-red-600 font-mono font-bold">{result.vatStatus}</span>
            <span className="text-[#0B1340] font-medium">
              Direct Cost + {overheadPercentage}% Custom Margin
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6 bg-white">
        {/* Configuration Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Guard Grade */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-[#0B1340]">
              1. Security Category / Grade
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
                <SelectItem value="Grade A">Grade A (Site Commander &amp; Close Protection)</SelectItem>
                <SelectItem value="Grade B">Grade B (Shift Supervisor &amp; Tactical Senior)</SelectItem>
                <SelectItem value="Grade C">Grade C (Commercial, Municipal &amp; Agri Guard)</SelectItem>
                <SelectItem value="Grade D">Grade D (Access Control &amp; Perimeter Guard)</SelectItem>
                <SelectItem value="Grade E">Grade E (Access Control &amp; Perimeter Guard)</SelectItem>
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
                <SelectItem value="rotational_24_7">24/7 Continuous Coverage</SelectItem>
                <SelectItem value="night_12h">12-Hour Night Shift</SelectItem>
                <SelectItem value="day_12h">12-Hour Day Shift</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Officer Quantity */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-[#0B1340]">
              3. Guard Quantity
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={250}
                value={officerCount}
                onChange={(e) => setOfficerCount(parseInt(e.target.value) || 1)}
                className="h-10 text-xs font-bold border-slate-300 text-[#0B1340]"
              />
              <span className="text-xs text-slate-600 font-medium whitespace-nowrap">Guards</span>
            </div>
          </div>

          {/* Operating Area */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-[#0B1340]">
              4. Statutory Direct Cost Area
            </Label>
            <Select
              value={area}
              onValueChange={(val) => {
                if (!val) return;
                const areaVal = val as OperationalArea;
                setArea(areaVal);
                if (areaVal.includes("Area 3")) setLocationName("Wolmaransstad / Maquassi Hills (Area 3)");
                else setLocationName("Klerksdorp / Potchefstroom / Metros (Area 1 & 2)");
              }}
            >
              <SelectTrigger className="h-10 text-xs font-semibold border-slate-300 text-[#0B1340]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Area 3 (Rural / Agri / N12 Corridor)">Area 3 (Wolmaransstad / Maquassi Hills)</SelectItem>
                <SelectItem value="Area 1 & 2 (Urban & Metros)">Area 1 &amp; 2 (Klerksdorp / Potchefstroom / Metros)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Admin Additional Margin % */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-[#0B1340] flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
              5. Extra Margin (%)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                max={50}
                step="0.5"
                value={overheadPercentage}
                onChange={(e) => setOverheadPercentage(Math.max(0, parseFloat(e.target.value) || 0))}
                className="h-10 text-xs font-bold font-mono border-slate-300 text-red-600"
              />
              <span className="text-xs text-slate-600 font-semibold">%</span>
            </div>
          </div>
        </div>

        {/* Client & Organization Optional Fields for Quote Header */}
        {!condensed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-slate-700">
                Target Client / Farm / Municipality Name (Printed on PDF Quote)
              </Label>
              <Input
                placeholder="e.g. Maquassi Hills Local Municipality / North West Agribusiness"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="h-9 text-xs border-slate-300"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium text-slate-700">
                Client Procurement Email (Optional)
              </Label>
              <Input
                type="email"
                placeholder="scm@organization.co.za"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="h-9 text-xs border-slate-300"
              />
            </div>
          </div>
        )}

        {/* Real-time Calculation Summary Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Main Key Figures Highlight */}
          <div className="lg:col-span-1 bg-slate-50 rounded-xl p-5 flex flex-col justify-between border-2 border-[#0B1340]/15 shadow-xs">
            <div className="space-y-4">
              <div className="text-xs text-[#0B1340] font-bold tracking-wider uppercase flex items-center justify-between">
                <span>Monthly Contract Total</span>
                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 text-[10px]">
                  {result.vatStatus}
                </Badge>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-red-600 font-mono">
                  R {formatZar(result.totalMonthlyContractCost)}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  For <span className="font-bold text-[#0B1340]">{result.inputs.officerCount}</span> {result.inputs.grade} Guard(s) in {result.inputs.area}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-600">Official Rate Per Guard:</span>
                  <span className="font-bold text-[#0B1340] font-mono">
                    R {formatZar(result.monthlyCostPerPost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Base Direct Cost:</span>
                  <span className="font-bold text-[#0B1340] font-mono">
                    R {formatZar(result.totalLaborCostPerOfficer)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">VAT Status:</span>
                  <span className="font-bold text-red-600 font-mono">
                    {result.vatStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <Button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-11 text-xs gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                {isExporting ? "Compiling PDF..." : "Export Official PDF Quote"}
              </Button>
            </div>
          </div>

          {/* Itemized Statutory Breakdown Table */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B1340] flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-red-600" />
                Official Direct Cost Build-Up (Per Guard)
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                Ref: {result.quoteReference}
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 font-bold text-[#0B1340] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Direct Cost Component</th>
                    <th className="py-2.5 px-3 hidden sm:table-cell">Regulatory Basis</th>
                    <th className="py-2.5 px-3 text-right">Rate (ZAR)</th>
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
                        R {formatZar(row.amountZar)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold border-t border-slate-200">
                    <td className="py-2.5 px-3 text-[#0B1340]">Total Rate Per Guard ({result.vatStatus})</td>
                    <td className="py-2.5 px-3 text-slate-600 hidden sm:table-cell">Official Direct Cost Schedule</td>
                    <td className="py-2.5 px-3 text-right font-mono text-red-600">
                      R {formatZar(result.monthlyCostPerPost)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Statutory Compliance Warranty Card */}
            <div className="p-3.5 bg-red-50/70 border border-red-200/80 rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-[#0B1340]">Official Direct Cost Reference: </span>
                Area 1 &amp; 2 Rates: Grade D/E &amp; C (<code>R 18,479.61</code>), Grade B (<code>R 19,989.50</code>), Grade A (<code>R 21,431.90</code>). Area 3 Rates: Grade D/E, C &amp; B (<code>R 17,787.16</code>), Grade A (<code>R 18,827.08</code>).
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
