import React from "react";
import { Badge } from "@/components/ui/badge";
import { ComplianceVault } from "@/components/features/ComplianceVault";
import { StatutoryTrustBanner } from "@/components/shared/StatutoryTrustBanner";
import { COMPANY_DETAILS } from "@/lib/constants";

export default function TendersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0B1340]">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-14 sm:py-18 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-4">
          <Badge
            variant="outline"
            className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
          >
            B2B &amp; Public Sector Procurement Portal
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B1340] tracking-tight">
            Tender &amp; Statutory Compliance Vault
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Designed for Municipal Tender Committees, State-Owned Entities (SOEs), and Commercial Procurement Boards. Access certified, audited compliance packs verified against live PSiRA, SARS, and NBCPSS registers.
          </p>
        </div>
      </section>

      <StatutoryTrustBanner />

      {/* Main Gated Vault Feature */}
      <section className="py-16 sm:py-20 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <ComplianceVault />
        </div>
      </section>

      {/* Tender Support Contact Strip */}
      <section className="py-12 bg-slate-50 px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-extrabold text-[#0B1340]">Need Customized SBD Forms or Site Surveys?</h4>
            <p className="text-xs text-slate-600">
              Our dedicated tender secretariat supports SBD 4, SBD 6.1, and municipal specifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${COMPANY_DETAILS.emails.tenders}?subject=Municipal%20Tender%20Inquiry`}
              className="py-2.5 px-5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-colors"
            >
              Contact tenders@quickbopha.co.za
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
