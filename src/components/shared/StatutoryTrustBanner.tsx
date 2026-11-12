import React from "react";
import { Shield, Award, Scale, Radio } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/constants";

export function StatutoryTrustBanner() {
  const credentials = [
    {
      title: "PSiRA & CIPC Registered",
      detail: `PSiRA: ${COMPANY_DETAILS.psiraRegistration} | CRNR: ${COMPANY_DETAILS.registrationNumber}`,
      sub: "PSiR Act 56 of 2001 Verified Provider",
      icon: Shield,
    },
    {
      title: "National Treasury CSD & SARS",
      detail: `CSD: ${COMPANY_DETAILS.csdNumber} | TCS: ${COMPANY_DETAILS.tcsPin}`,
      sub: `VAT: ${COMPANY_DETAILS.vatNumber} • Good Standing to Oct 2027`,
      icon: Award,
    },
    {
      title: "NBCPSS, PAYE, UIF & SASSETA",
      detail: `PAYE: ${COMPANY_DETAILS.payeNumber} | SETA Code 13`,
      sub: `UIF: ${COMPANY_DETAILS.uifNumber} • SDL: ${COMPANY_DETAILS.sdlNumber}`,
      icon: Scale,
    },
    {
      title: "POPIA & SAPS E2 Certified",
      detail: `POPIA Reg: ${COMPANY_DETAILS.popiaRegistration}`,
      sub: "Information Regulator Certified & 24/7 Control Room",
      icon: Radio,
    },
  ];

  return (
    <section
      aria-label="Statutory Trust & Accreditations"
      className="bg-slate-50/90 border-y border-slate-200/90 py-6 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {credentials.map((cred) => {
          const Icon = cred.icon;
          return (
            <div
              key={cred.title}
              className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-red-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0B1340] text-white flex items-center justify-center shrink-0 shadow-2xs ring-2 ring-red-600/20">
                <Icon className="w-5 h-5 text-red-400" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-[#0B1340] tracking-tight">{cred.title}</div>
                <div className="text-[11px] font-semibold text-red-600 font-mono">{cred.detail}</div>
                <div className="text-[11px] text-slate-600 leading-tight">{cred.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
