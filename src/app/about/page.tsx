import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, FileCheck, ShieldCheck, Network, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatutoryTrustBanner } from "@/components/shared/StatutoryTrustBanner";
import { COMPANY_DETAILS, ORGANOGRAM_LEVELS, COMPLIANCE_DASHBOARD_PILLARS } from "@/lib/constants";

export default function AboutPage() {
  const leadershipTeam = [
    {
      initials: "ND",
      name: COMPANY_DETAILS.leadership.managingDirector.name,
      role: COMPANY_DETAILS.leadership.managingDirector.role,
      bio: COMPANY_DETAILS.leadership.managingDirector.bio,
      highlights: [
        "PSiRA Section 20 & 21 statutory director accountability",
        "P1 Critical emergency command & municipal tender authority",
      ],
      accent: "bg-red-600",
      badgeBg: "bg-[#0B1340]",
    },
    {
      initials: "AD",
      name: COMPANY_DETAILS.leadership.executiveManager.name,
      role: COMPANY_DETAILS.leadership.executiveManager.role,
      bio: COMPANY_DETAILS.leadership.executiveManager.bio,
      highlights: [
        "Direct oversight of the 9-Pillar Monthly Executive Compliance Dashboard",
        "Enterprise risk governance, financial controls & SLA assurance",
      ],
      accent: "bg-[#0B1340]",
      badgeBg: "bg-red-600",
    },
    {
      initials: "LN",
      name: COMPANY_DETAILS.leadership.operationalManager.name,
      role: COMPANY_DETAILS.leadership.operationalManager.role,
      bio: COMPANY_DETAILS.leadership.operationalManager.bio,
      highlights: [
        "24/7 Control Room command, site managers & roving supervisors",
        "Firearm/equipment control registers & technical tender scoping",
      ],
      accent: "bg-red-600",
      badgeBg: "bg-[#0B1340]",
    },
    {
      initials: "KK",
      name: COMPANY_DETAILS.leadership.hrOfficer.name,
      role: COMPANY_DETAILS.leadership.hrOfficer.role,
      bio: COMPANY_DETAILS.leadership.hrOfficer.bio,
      highlights: [
        "HR Policy Architecture & BCEA Sectoral Determination 6 compliance",
        "6-Step Employee Development Plan (PSiRA, SASSETA Code 13 & QCTO)",
      ],
      accent: "bg-[#0B1340]",
      badgeBg: "bg-red-600",
    },
    {
      initials: "MM",
      name: COMPANY_DETAILS.leadership.informationOfficer.name,
      role: COMPANY_DETAILS.leadership.informationOfficer.role,
      bio: COMPANY_DETAILS.leadership.informationOfficer.bio,
      highlights: [
        "Information Regulator Cert No: 2026-068037 (Section 55 POPIA)",
        "Biometric access, CCTV retention & PAIA statutory governance",
      ],
      accent: "bg-red-600",
      badgeBg: "bg-[#0B1340]",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0B1340]">
      {/* Page Header - Clean Light Shadcn Surface */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-14 sm:py-18 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-4">
          <Badge
            variant="outline"
            className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
          >
            Corporate Governance &amp; Statutory Identity
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B1340] tracking-tight">
            About Quick Bopha Security
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Headquartered at {COMPANY_DETAILS.headquarters.address} within the Maquassi Hills Local Municipality (Dr Kenneth Kaunda District), Quick Bopha Security (Pty) Ltd (Reg: {COMPANY_DETAILS.registrationNumber} | PSiRA: {COMPANY_DETAILS.psiraRegistration}) is an authoritative, 100% Black-Owned security enterprise protecting critical infrastructure along the N12 transport corridor.
          </p>
        </div>
      </section>

      <StatutoryTrustBanner />

      {/* Executive Leadership & Departmental Governance */}
      <section className="py-16 sm:py-20 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
            >
              Executive Directorate &amp; Statutory Officers
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
              Approved Leadership &amp; Governance Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Structured under a clear chain of command uniting executive oversight, 24/7 operational control, human capital development, and Information Regulator compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadershipTeam.map((leader) => (
              <Card key={leader.name} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                <div>
                  <div className={`h-2 ${leader.accent}`} />
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-full ${leader.badgeBg} text-white flex items-center justify-center font-black text-base ring-4 ring-slate-100 shrink-0`}>
                        {leader.initials}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#0B1340] leading-snug">
                          {leader.name}
                        </h3>
                        <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider mt-0.5">
                          {leader.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {leader.bio}
                    </p>
                    <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-600 space-y-1.5">
                      {leader.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* APPROVED 5-LEVEL CORPORATE ORGANOGRAM */}
      <section className="py-16 sm:py-20 bg-slate-50/80 px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
            >
              Command &amp; Reporting Hierarchy
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight flex items-center justify-center gap-2.5">
              <Network className="w-7 h-7 text-red-600" />
              Approved 5-Tier Operational Organogram
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Clear escalation lines from frontline PSiRA-graded security officers and 24/7 Control Room operators through to the Operational Manager, Executive Manager, and Managing Director.
            </p>
          </div>

          <div className="space-y-3 max-w-5xl mx-auto">
            {ORGANOGRAM_LEVELS.map((tier, idx) => (
              <div
                key={tier.level}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-red-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="px-3 py-1.5 rounded-lg bg-[#0B1340] text-white font-mono font-bold text-xs shrink-0">
                    {tier.level}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-base font-extrabold text-[#0B1340]">{tier.role}</h3>
                      <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                        {tier.incumbent}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{tier.mandate}</p>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 shrink-0 hidden lg:block">
                  Tier 0{idx + 1} Authority
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9-PILLAR MONTHLY EXECUTIVE COMPLIANCE DASHBOARD */}
      <section className="py-16 sm:py-20 bg-white px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
            >
              Governance, Risk &amp; Compliance (GRC)
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight flex items-center justify-center gap-2.5">
              <ClipboardCheck className="w-7 h-7 text-red-600" />
              9-Pillar Executive Compliance Framework
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Audited monthly by our independent Safety and Compliance Officer reporting directly to the Executive Manager to guarantee zero statutory or municipal SLA default.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMPLIANCE_DASHBOARD_PILLARS.map((item) => (
              <Card key={item.pillar} className="bg-slate-50/70 border-slate-200 hover:border-red-300 hover:bg-white transition-all shadow-2xs">
                <CardContent className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-red-600 uppercase tracking-wider">
                      {item.pillar}
                    </span>
                    <Badge variant="outline" className="text-[10px] border-slate-300 text-[#0B1340] bg-white font-semibold">
                      {item.metric}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-[#0B1340]">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* "TRAINED LOCAL, DEPLOYED LOCAL" MANIFESTO & STATUTORY TABLE */}
      <section className="py-16 sm:py-20 bg-slate-50/80 px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
            >
              Corporate Ethos &amp; Social Impact
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1340] tracking-tight leading-tight">
              &ldquo;Trained Local, Deployed Local&rdquo; — Empowering Our Communities
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike national providers who deploy transient personnel with zero regional knowledge, Quick Bopha recruits, trains, and certifies security officers directly from Wolmaransstad, Maquassi Hills, and neighboring North West communities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div className="font-bold text-[#0B1340] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  Regional Terrain Mastery
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Local officers possess intimate familiarity with community demographics, agricultural boundaries, and fast rural evasion routes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div className="font-bold text-[#0B1340] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  Zero Absenteeism Roster Stability
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Officers reside within municipal zones, eliminating long-distance transport disruptions and ensuring 100% shift continuity.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B1340] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                Official Public Statutory Certificates (Direct View)
              </div>
              <div className="flex flex-wrap gap-2.5 text-xs">
                <a
                  href="/docs/POPIA_Certificate_2026-068037.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-[#0B1340] hover:text-red-700 border border-slate-200 hover:border-red-200 font-semibold transition-colors"
                >
                  POPIA Certificate (2026-068037) ↗
                </a>
                <a
                  href="/docs/SARS_Tax_Compliance_Status_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-[#0B1340] hover:text-red-700 border border-slate-200 hover:border-red-200 font-semibold transition-colors"
                >
                  SARS Tax Clearance (PIN: 95D136823W) ↗
                </a>
                <a
                  href="/docs/SARS_EMP_PAYE_SDL_UIF_Registration.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-[#0B1340] hover:text-red-700 border border-slate-200 hover:border-red-200 font-semibold transition-colors"
                >
                  SARS PAYE / SDL / UIF Notice ↗
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white p-2">
              <Image
                src="/hero-banner.jpg"
                alt="Quick Bopha Security Officers in Formation - Wolmaransstad, North West"
                width={700}
                height={460}
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="p-3 text-[11px] text-slate-600 flex items-center justify-between">
                <span className="font-bold text-[#0B1340]">Tactical Guarding Corps</span>
                <span className="text-red-600 font-semibold">07 Bornman Street, Wolmaransstad</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
              <h4 className="text-sm font-bold text-[#0B1340] uppercase tracking-wider">
                Verified Statutory Register
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">CIPC Registration (CRNR):</span>
                  <span className="font-mono font-bold text-[#0B1340]">{COMPANY_DETAILS.registrationNumber}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">PSiRA Registration No:</span>
                  <span className="font-mono font-bold text-red-600">{COMPANY_DETAILS.psiraRegistration}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">National Treasury CSD:</span>
                  <span className="font-mono font-bold text-[#0B1340]">{COMPANY_DETAILS.csdNumber}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">VAT / Income Tax Ref:</span>
                  <span className="font-mono font-semibold text-[#0B1340]">{COMPANY_DETAILS.vatNumber} / {COMPANY_DETAILS.incomeTaxNumber}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">SARS TCS Good Standing PIN:</span>
                  <span className="font-mono font-bold text-red-600">{COMPANY_DETAILS.tcsPin}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">PAYE / SDL / UIF:</span>
                  <span className="font-mono font-semibold text-[#0B1340]">{COMPANY_DETAILS.payeNumber} / {COMPANY_DETAILS.uifNumber}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">POPIA Information Regulator:</span>
                  <span className="font-mono font-bold text-[#0B1340]">{COMPANY_DETAILS.popiaRegistration}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/tenders">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-10 gap-2 shadow-sm">
                    <FileCheck className="w-4 h-4" /> Download Official Compliance Pack
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
