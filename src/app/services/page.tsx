import React from "react";
import Link from "next/link";
import { CheckCircle2, Warehouse, Tractor, HardHat, Car, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicGuardPricingCards } from "@/components/features/PublicGuardPricingCards";
import { StatutoryTrustBanner } from "@/components/shared/StatutoryTrustBanner";
import { readAdminStore } from "@/lib/admin-store";

const ICON_MAP = {
  Warehouse,
  Tractor,
  HardHat,
  Car,
};

export default function ServicesPage() {
  const { serviceCategoriesPricing } = readAdminStore();

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0B1340]">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-14 sm:py-18 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-4">
          <Badge
            variant="outline"
            className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
          >
            Division 1 • Guarding Operations
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B1340] tracking-tight">
            Guarding Services &amp; Tactical Protection
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Statutory wage-compliant physical security operations deployed across agricultural, mining, municipal, and commercial sectors throughout Wolmaransstad, Maquassi Hills, and the N12 corridor.
          </p>
        </div>
      </section>

      <StatutoryTrustBanner />

      {/* Service Catalog Grid with Editable Service Pricing */}
      <section className="py-16 sm:py-20 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
              Operational Guarding Solutions &amp; Rates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Each post is fully supported by live cloud Occurrence Book telemetry and 24/7 supervisor spot-checks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategoriesPricing.map((svc) => {
              const Icon = ICON_MAP[svc.iconName] || Warehouse;
              return (
                <Card key={svc.id} className="bg-white border-slate-200 hover:border-red-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0B1340] text-white flex items-center justify-center ring-4 ring-red-50 shrink-0">
                        <Icon className="w-6 h-6 text-red-400" />
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Area 3 Direct Rate
                        </div>
                        <div className="text-xl font-black text-red-600 font-mono">
                          R {Number(svc.startingPriceZar).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-[11px] font-semibold text-[#0B1340] font-mono">
                          Area 1 &amp; 2: R {Number(svc.area1And2PriceZar || svc.startingPriceZar).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#0B1340]">{svc.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {svc.description}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                      {svc.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <Link href={`/contact?subject=${encodeURIComponent(`Service Quote: ${svc.title}`)}`}>
                        <Button variant="outline" className="w-full border-slate-300 text-[#0B1340] hover:bg-[#0B1340] hover:text-white font-bold text-xs h-9 gap-1.5 transition-colors">
                          <span>Book {svc.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* PER-GUARD MONTHLY PRICING BY PSIRA GRADE */}
      <section className="py-16 sm:py-20 bg-slate-50/80 px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <PublicGuardPricingCards />
        </div>
      </section>
    </div>
  );
}
