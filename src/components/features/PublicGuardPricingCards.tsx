"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, FileText, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  COMPANY_DETAILS,
  DEFAULT_PUBLIC_GUARD_RATES,
  PublicGuardRateTier,
} from "@/lib/constants";

function formatCurrency(val: number): string {
  return val.toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function PublicGuardPricingCards() {
  const [rates, setRates] = useState<PublicGuardRateTier[]>(DEFAULT_PUBLIC_GUARD_RATES);
  const [selectedArea, setSelectedArea] = useState<"area3" | "area1_2">("area3");

  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.pricing) && data.pricing.length > 0) {
          setRates(data.pricing);
        }
      })
      .catch(() => {
        // Fallback to default static tiers
      });
  }, []);

  return (
    <div className="w-full space-y-10">
      {/* Section Header & Area Selector */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge
          variant="outline"
          className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold px-3 py-1"
        >
          Official Statutory Direct Cost Schedule
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
          Security Services Rates Per Guard
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Official monthly rates per PSiRA-registered security officer (Company Reg: {COMPANY_DETAILS.psiraRegistration} | VAT: {COMPANY_DETAILS.vatNumber} | CSD: {COMPANY_DETAILS.csdNumber}). Select your operational zone below:
        </p>

        {/* Area 3 vs Area 1 & 2 Toggle */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() => setSelectedArea("area3")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedArea === "area3"
                ? "bg-[#0B1340] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0B1340] hover:bg-slate-50"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            Area 3 (Wolmaransstad / Maquassi Hills / Rural)
          </button>
          <button
            type="button"
            onClick={() => setSelectedArea("area1_2")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedArea === "area1_2"
                ? "bg-[#0B1340] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0B1340] hover:bg-slate-50"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            Area 1 &amp; 2 (Klerksdorp / Potchefstroom / Urban &amp; Metros)
          </button>
        </div>
      </div>

      {/* 4-Column Per-Guard Rate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rates.map((tier) => {
          const area3Rate = Number(tier.monthlyPricePerGuardZar) || 17787.16;
          const area12Rate = Number(tier.area1And2PricePerGuardZar) || 18479.61;
          const activePrice = selectedArea === "area3" ? area3Rate : area12Rate;
          const otherPrice = selectedArea === "area3" ? area12Rate : area3Rate;
          const otherLabel = selectedArea === "area3" ? "Area 1 & 2 Rate" : "Area 3 Rate";

          return (
            <Card
              key={tier.id}
              className={`flex flex-col justify-between bg-white transition-all duration-200 ${
                tier.popular
                  ? "border-2 border-red-600 ring-4 ring-red-50 shadow-lg"
                  : "border-slate-200 shadow-sm hover:border-red-300 hover:shadow-md"
              }`}
            >
              <div>
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge
                      className={
                        tier.popular
                          ? "bg-red-600 text-white font-bold text-xs border-0"
                          : "bg-[#0B1340] text-white font-bold text-xs border-0"
                      }
                    >
                      {tier.grade}
                    </Badge>
                    {tier.popular && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                        Core Standard
                      </span>
                    )}
                  </div>

                  <CardTitle className="text-lg font-extrabold text-[#0B1340] leading-snug">
                    {tier.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 font-medium">
                    {tier.subtitle}
                  </CardDescription>

                  <div className="pt-4 mt-3 border-t border-slate-100 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {selectedArea === "area3" ? "Area 3 Monthly Rate" : "Area 1 & 2 Monthly Rate"}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-red-600 font-mono">
                      R {formatCurrency(activePrice)}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600">
                      {tier.billingNote}
                    </div>
                    <div className="text-[11px] font-mono text-[#0B1340] bg-slate-50 px-2.5 py-1 rounded border border-slate-200 inline-block mt-1">
                      {otherLabel}: <strong>R {formatCurrency(otherPrice)}</strong>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-2 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#0B1340]">
                    Included Per Guard Post:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>

              <CardFooter className="p-6 pt-2">
                <Link
                  href={`/contact?subject=${encodeURIComponent(
                    `Official Guarding Quote Request - ${tier.grade} (${
                      selectedArea === "area3" ? "Area 3" : "Area 1 & 2"
                    })`
                  )}`}
                  className="w-full"
                >
                  <Button
                    className={`w-full font-bold text-xs h-10 gap-1.5 ${
                      tier.popular
                        ? "bg-red-600 hover:bg-red-700 text-white shadow-sm"
                        : "bg-[#0B1340] hover:bg-red-600 text-white"
                    }`}
                  >
                    <span>Request Official Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Official Rate Schedule PDFs & Custom Quote Strip */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0B1340] text-white flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5 text-red-400" />
          </div>
          <div className="space-y-0.5">
            <div className="font-bold text-[#0B1340] text-sm">
              Official Signed Direct Cost Rate Schedules (Area 1 &amp; 2 and Area 3)
            </div>
            <p className="text-slate-600 leading-relaxed">
              Download our official signed corporate rate schedules or contact our executive tender desk for multi-guard deployments.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="/docs/Area_3_Direct_Cost_Rates.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-red-50 text-[#0B1340] hover:text-red-700 border border-slate-200 hover:border-red-200 font-semibold transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-red-600" />
            Area 3 Rate Sheet PDF ↗
          </a>
          <a
            href="/docs/Area_1_and_2_Direct_Cost_Rates.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-red-50 text-[#0B1340] hover:text-red-700 border border-slate-200 hover:border-red-200 font-semibold transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-red-600" />
            Area 1 &amp; 2 Rate Sheet PDF ↗
          </a>
          <Link href="/contact">
            <Button variant="outline" className="border-slate-300 text-[#0B1340] hover:bg-slate-100 font-bold text-xs h-9 px-4">
              Request Site Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
