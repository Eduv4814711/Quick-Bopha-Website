import React from "react";
import { Award, HeartHandshake, TrendingUp, Briefcase, MapPin, FileText, CheckCircle2, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GuardApplicationForm } from "@/components/features/GuardApplicationForm";
import { StatutoryTrustBanner } from "@/components/shared/StatutoryTrustBanner";
import { COMPANY_DETAILS } from "@/lib/constants";

export default function CareersPage() {
  const benefits = [
    {
      title: "100% NBCPSS Statutory Wages",
      desc: "We never undercut legal wages. Guaranteed full gazetted rates, provident fund contributions (PSSPF), UIF (U210835718), and Affinity Health / statutory allowances.",
      icon: Award,
    },
    {
      title: "Trained Local, Deployed Local",
      desc: "We prioritize hiring from Wolmaransstad, Maquassi Hills, and North West communities. Work close to home with zero long-distance commuting.",
      icon: HeartHandshake,
    },
    {
      title: "Tactical & Corporate Career Pathway",
      desc: "Advance from entry guarding (Grade E/D) into supervisory (Grade B), Cash-In-Transit, Armed Response, or Governance & Compliance through our SASSETA (Code 13) aligned pipeline.",
      icon: TrendingUp,
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
            Careers &amp; HR Recruitment Portal • Ms. Kgomotso Koloke (HR Officer)
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B1340] tracking-tight">
            Careers at Quick Bopha Security
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            &ldquo;Trained Local, Deployed Local.&rdquo; Join our disciplined team of PSiRA-registered security professionals and corporate specialists guarding critical infrastructure across the North West Province.
          </p>
        </div>
      </section>

      <StatutoryTrustBanner />

      {/* Why Join Quick Bopha */}
      <section className="py-12 bg-white px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#0B1340] flex items-center justify-center text-white ring-4 ring-red-50">
                  <Icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-bold text-base text-[#0B1340]">{b.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Corporate Vacancy: Safety and Compliance Officer */}
      <section className="py-14 bg-white px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <Badge className="bg-red-600 text-white text-xs font-bold uppercase">
                Featured Corporate Vacancy
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1340]">
                Executive &amp; Specialist Positions
              </h2>
            </div>
            <a
              href="/docs/Job_Description_Safety_and_Compliance_Officer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1340] hover:text-red-600 bg-slate-50 hover:bg-red-50 px-3.5 py-2 rounded-lg border border-slate-200 hover:border-red-200 transition-colors w-fit"
            >
              <FileText className="w-4 h-4 text-red-600" />
              Download Official Job Specification PDF ↗
            </a>
          </div>

          <Card className="bg-white border-2 border-slate-200 shadow-md overflow-hidden">
            <div className="h-2 bg-[#0B1340]" />
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Briefcase className="w-4 h-4 text-red-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                      Governance, Risk &amp; Compliance Division (Executive Office)
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1340]">
                    Safety and Compliance Officer (GRC Officer)
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-600" />
                      {COMPANY_DETAILS.headquarters.address} + Site Visits
                    </span>
                    <span>•</span>
                    <span><strong>Reports To:</strong> Executive Manager ({COMPANY_DETAILS.leadership.executiveManager.name})</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-[10px] border-red-200 text-red-700 bg-red-50 font-semibold">
                      Full-Time / Permanent
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Quick Bopha Security seeks an independent, detail-driven <strong>Safety and Compliance Officer</strong> to serve as the second line of defence across our 9-Pillar Monthly Executive Compliance Dashboard. The incumbent audits PSiRA currency (Reg: 2639354), NBCPSS statutory wages, OHS Act 85 of 1993 site safety, SAPS Firearms Control Act 60 of 2000 registers, and POPIA (Cert: 2026-068037) adherence.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="font-extrabold text-[#0B1340] uppercase tracking-wider">
                    Key Performance Areas (KPAs)
                  </div>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span>Compile the 9-Pillar Monthly Executive Compliance Report by the 5th business day of each month.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span>Execute scheduled &amp; unannounced site inspections, post audits, and firearm/equipment register reconciliations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span>Enforce OHS Act HIRA assessments, Section 24 incident investigations, and Corrective Action Register (≥90% closure).</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="font-extrabold text-[#0B1340] uppercase tracking-wider">
                    Minimum Qualifications &amp; Experience
                  </div>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span>National Diploma / Degree in Internal Auditing, Risk Management, OHS (SAMTRAC / NEBOSH), Security Management, or Law.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span>Active PSiRA Registration (Grade B or Grade A preferred) &amp; valid Code B driver&apos;s license.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span>3–5 years&apos; compliance, internal audit, or regulatory risk experience in private security or a regulated sector.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                <div className="text-xs text-slate-600">
                  Submit CV, certified ID, PSiRA certificate, and qualifications to HR Officer <strong>{COMPANY_DETAILS.leadership.hrOfficer.name}</strong>:
                </div>
                <a
                  href={`mailto:${COMPANY_DETAILS.emails.compliance}?subject=Application:%20Safety%20and%20Compliance%20Officer`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B1340] hover:bg-red-600 text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Apply via {COMPANY_DETAILS.emails.compliance}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Application Form Section (FEAT-06) */}
      <section className="py-16 sm:py-20 bg-slate-50/70 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
            >
              PSiRA Security Officer Intake Form
            </Badge>
            <h2 className="text-3xl font-extrabold text-[#0B1340]">
              Submit Your Security Officer Application
            </h2>
            <p className="text-xs text-slate-600">
              Applications are reviewed weekly by Human Resources ({COMPANY_DETAILS.leadership.hrOfficer.name}) at our Wolmaransstad headquarters ({COMPANY_DETAILS.headquarters.address}).
            </p>
          </div>

          <GuardApplicationForm />
        </div>
      </section>
    </div>
  );
}
