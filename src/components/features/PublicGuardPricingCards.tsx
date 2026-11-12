"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  COMPANY_DETAILS,
  DEFAULT_PUBLIC_GUARD_RATES,
  PublicGuardRateTier,
} from "@/lib/constants";

export function PublicGuardPricingCards() {
  const [rates, setRates] = useState<PublicGuardRateTier[]>(DEFAULT_PUBLIC_GUARD_RATES);

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
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <Badge
          variant="outline"
          className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold px-3 py-1"
        >
          100% NBCPSS Statutory Compliant Pricing
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
          Transparent Monthly Pricing Per Security Guard
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Every deployed officer is PSiRA-registered (Company Reg: {COMPANY_DETAILS.psiraRegistration}), paid 100% in accordance with National Bargaining Council (NBCPSS) statutory schedules, and supported 24/7 by our Wolmaransstad Central Control Room.
        </p>
      </div>

      {/* 4-Column Per-Guard Rate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rates.map((tier) => (
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
                    PSiRA {tier.grade}
                  </Badge>
                  {tier.popular && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                      Most Requested
                    </span>
                  )}
                </div>

                <CardTitle className="text-lg font-extrabold text-[#0B1340] leading-snug">
                  {tier.title}
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 font-medium">
                  {tier.subtitle}
                </CardDescription>

                <div className="pt-4 mt-3 border-t border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-red-600 font-mono">
                      R {tier.monthlyPricePerGuardZar.toLocaleString("en-ZA")}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    {tier.billingNote}
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
                href={`/contact?subject=${encodeURIComponent(`Official Guarding Quote Request - PSiRA ${tier.grade}`)}`}
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
        ))}
      </div>

      {/* Statutory Assurance Callout Strip */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0B1340] text-white flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5 text-red-400" />
          </div>
          <div className="space-y-0.5">
            <div className="font-bold text-[#0B1340] text-sm">
              Multi-Post, 24/7 Rotational &amp; Municipal Tender Quotations
            </div>
            <p className="text-slate-600 leading-relaxed">
              Need a customized multi-guard deployment, specialized armed escort, or formal municipal SBD pricing schedule? Our executive operations desk prepares site-specific proposals within 2 hours.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Award className="w-3.5 h-3.5 text-red-600" />
            B-BBEE Level 1 (135% Recognition)
          </span>
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
