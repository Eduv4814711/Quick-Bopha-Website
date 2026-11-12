import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  ShieldCheck,
  Radio,
  GraduationCap,
  CheckCircle2,
  Lock,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StatutoryTrustBanner } from "@/components/shared/StatutoryTrustBanner";
import { PublicGuardPricingCards } from "@/components/features/PublicGuardPricingCards";
import { COMPANY_DETAILS, TRI_DIVISIONS, CORRIDOR_HUBS } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0B1340]">
      {/* MODERN LIGHT SHADCN HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 overflow-hidden py-14 sm:py-22 border-b border-slate-200">
        {/* Subtle Brand Ambient Accents (Logo Navy & Crimson Red) */}
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-red-600/6 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#0B1340]/5 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Top Pill Callout */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-200 bg-red-50/90 text-red-700 text-xs font-semibold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>Headquartered in Wolmaransstad • N12 Transport Corridor Sovereign Security</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B1340] leading-[1.08]">
                  WE GUARD WITH PRIDE.
                  <span className="block text-red-600 mt-1.5">
                    TRAINED LOCAL, DEPLOYED LOCAL.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  Quick Bopha Security (Pty) Ltd is the premier black-owned security enterprise in the Dr Kenneth Kaunda District. Delivering 100% NBCPSS statutory wage-compliant guarding, 24/7 AI-backed alarm telemetry, and PSiRA accredited career training across the North West Province.
                </p>
              </div>

              {/* Executive & Governance Fast Facts - Clean Shadcn Cards */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-slate-500 font-medium">Managing Director</div>
                  <div className="text-[#0B1340] font-bold mt-0.5">{COMPANY_DETAILS.leadership.managingDirector.name}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-slate-500 font-medium">B-BBEE Status</div>
                  <div className="text-red-600 font-bold mt-0.5">Level 1 (100% Black-Owned)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-slate-500 font-medium">Statutory Wages</div>
                  <div className="text-[#0B1340] font-bold mt-0.5">100% NBCPSS Compliant</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-slate-500 font-medium">Public Safety Alliance</div>
                  <div className="text-[#0B1340] font-bold mt-0.5">SAPS Eyes &amp; Ears (E2)</div>
                </div>
              </div>
            </div>

            {/* Right Featured Banner Photo Showcase */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src="/hero-banner.jpg"
                    alt="Quick Bopha Security Officers in Formation - Wolmaransstad, North West"
                    width={800}
                    height={533}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1340]/90 via-[#0B1340]/20 to-transparent" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-red-400" />
                        Quick Bopha Guarding Force
                      </div>
                      <div className="text-[11px] text-slate-200 font-medium">Wolmaransstad Tactical Parade</div>
                    </div>
                    <Badge className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] tracking-wider uppercase border-0">
                      Trained Local
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATUTORY TRUST BAR */}
      <StatutoryTrustBanner />

      {/* TRI-DIVISION REVENUE ENGINE SHOWCASE */}
      <section className="py-16 sm:py-22 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold px-3 py-1"
            >
              Tri-Division Revenue Engine
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
              Enterprise Security Operations Built For The North West
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Engineered to protect critical infrastructure, municipal assets, commercial agriculture, and mining hubs along the N12 corridor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRI_DIVISIONS.map((div) => {
              const Icon =
                div.id === "guarding" ? Shield : div.id === "alarms" ? Radio : GraduationCap;
              return (
                <Card
                  key={div.id}
                  className="bg-white border-slate-200/90 hover:border-red-300 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1340] text-white flex items-center justify-center ring-4 ring-red-50 group-hover:bg-red-600 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                        {div.subtitle}
                      </span>
                      <h3 className="text-xl font-bold text-[#0B1340]">{div.title}</h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {div.description}
                    </p>

                    <ul className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-700">
                      {div.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 pt-0">
                    <Link href={div.href}>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-xs font-bold border-slate-200 text-[#0B1340] group-hover:bg-[#0B1340] group-hover:text-white group-hover:border-[#0B1340] transition-colors h-10"
                      >
                        <span>Explore Division</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* PER-GUARD MONTHLY PRICING SECTION */}
      <section id="guard-pricing" className="py-16 sm:py-22 bg-slate-50/70 px-4 sm:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <PublicGuardPricingCards />
        </div>
      </section>

      {/* REGIONAL FOOTPRINT: WOLMARANSSTAD & THE N12 CORRIDOR */}
      <section className="py-16 sm:py-22 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold px-3 py-1"
            >
              Regional Command Footprint
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
              Rapid Response Along the N12 Transport Arterial
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Connecting primary agricultural hubs, mining concessions, and municipal centres across Wolmaransstad, Maquassi Hills, Klerksdorp, and Potchefstroom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORRIDOR_HUBS.map((hub) => (
              <Card
                key={hub.name}
                className="p-5 bg-white border-slate-200 hover:border-red-300 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                    {hub.responseTime}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#0B1340]">{hub.name}</h4>
                  <div className="text-xs text-slate-500">{hub.role}</div>
                </div>
                <div className="pt-2.5 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                  <span>Municipality:</span>
                  <span className="font-semibold text-[#0B1340]">{hub.municipality}</span>
                </div>
                <div className="text-xs text-[#0B1340] font-mono font-semibold bg-slate-100 px-2.5 py-1 rounded-md inline-block">
                  {hub.officersDeployed}
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom Municipal Banner Callout - Clean Shadcn Surface with Brand Navy & Crimson */}
          <div className="p-8 rounded-2xl bg-white border-2 border-[#0B1340]/10 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" /> Verified Public &amp; Corporate Procurement
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1340]">
                Municipal Supply Chain &amp; Tender Committees
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                Access certified, tamper-proof compliance dossiers (B-BBEE Level 1, PSiRA registration, SARS Tax Pin, COIDA, and NBCPSS wage certification) in one click.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/tenders">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-11 px-6 gap-2 shadow-sm">
                  <Lock className="w-4 h-4" /> Open Compliance Vault
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
