import React from "react";
import { CheckCircle2, Warehouse, Tractor, HardHat, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NBCPSSRateCalculator } from "@/components/features/NBCPSSRateCalculator";
import { StatutoryTrustBanner } from "@/components/shared/StatutoryTrustBanner";
import { PlethoraTelemetryShowcase } from "@/components/features/PlethoraTelemetryShowcase";

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: "Static Commercial & Industrial Guarding",
      icon: Warehouse,
      description: "24/7 post defence and perimeter security for commercial depots, retail centers, warehouses, and municipal complexes.",
      points: [
        "PSiRA Grade A, B, and C armed or unarmed officers",
        "Biometric turnstile and vehicle scale access control",
        "Digital Occurrence Book (OB) real-time incident transmission",
        "Continuous supervision via roving tactical fleet commanders",
      ],
    },
    {
      title: "Agricultural & Rural Farm Security",
      icon: Tractor,
      description: "Specialized rural anti-intrusion patrols safeguarding grain silos, livestock herds, and farmsteads along the N12 corridor.",
      points: [
        "Thermal night vision and perimeter spotlight units",
        "Livestock theft mitigation & boundary fence patrols",
        "Direct radio link to local farm watch & SAPS Sector policing",
        "Solar-backed wireless intrusion sensor monitoring",
      ],
    },
    {
      title: "Mining Concession & Critical Infrastructure",
      icon: HardHat,
      description: "High-security access protocols and asset protection engineered for North West mining operations and municipal utility substations.",
      points: [
        "Gold, diamond, and heavy equipment asset protection",
        "Randomized drug/alcohol breathalyzer gate screening",
        "Strike, protest, and labor dispute crowd de-escalation",
        "Copper cable theft and transformer substation defense",
      ],
    },
    {
      title: "VIP Close Protection & Convoy Escort",
      icon: Car,
      description: "Armed executive escort and VIP transit security across the Dr Kenneth Kaunda District and inter-provincial corridors.",
      points: [
        "Tactical Close Protection Officers (CPOs) with Grade A certification",
        "Armored ballistic vehicle convoys & secure transport",
        "Advance route reconnaissance & counter-ambush planning",
        "Discreet, protocol-trained executive personal protection",
      ],
    },
  ];

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

      {/* Service Catalog Grid */}
      <section className="py-16 sm:py-20 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
              Operational Guarding Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Each post is fully supported by live cloud Occurrence Book telemetry and 24/7 supervisor spot-checks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((svc) => {
              const Icon = svc.icon;
              return (
                <Card key={svc.title} className="bg-white border-slate-200 hover:border-red-300 shadow-xs hover:shadow-lg transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1340] text-white flex items-center justify-center ring-4 ring-red-50">
                      <Icon className="w-6 h-6 text-red-400" />
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
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* EMBEDDED NBCPSS STATUTORY CALCULATOR (FEAT-01) */}
      <section className="py-16 sm:py-20 bg-slate-50/80 px-4 sm:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto mb-8">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
            >
              Statutory Costing Engine
            </Badge>
            <h2 className="text-3xl font-extrabold text-[#0B1340]">
              Instant 30-Second NBCPSS Guarding Cost Estimator
            </h2>
            <p className="text-xs text-slate-600">
              Generate an itemized quotation for your site and export a legally compliant PDF quote.
            </p>
          </div>

          <NBCPSSRateCalculator />
        </div>
      </section>

      {/* PLETHORA AI TELEMETRY PROOF */}
      <section className="py-16 sm:py-20 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <PlethoraTelemetryShowcase />
        </div>
      </section>
    </div>
  );
}
