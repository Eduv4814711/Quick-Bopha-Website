import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PhoneCall, Mail, MapPin, FileCheck, ArrowUpRight } from "lucide-react";
import { COMPANY_DETAILS, CORRIDOR_HUBS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-white text-slate-700 border-t border-slate-200">
      {/* N12 Strategic Transport Corridor Deployment Banner */}
      <div className="bg-slate-50 border-b border-slate-200 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-red-600 font-bold text-xs tracking-wider uppercase">
              <MapPin className="w-4 h-4 text-red-600" />
              N12 Strategic Transport Corridor Operations
            </div>
            <h3 className="text-lg font-extrabold text-[#0B1340]">
              Regional Command Centres Across the North West
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              Rapid response units stationed along primary agricultural, commercial, and mining hubs in the Dr Kenneth Kaunda District.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs w-full lg:w-auto">
            {CORRIDOR_HUBS.map((hub) => (
              <div
                key={hub.name}
                className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-center"
              >
                <div className="font-bold text-[#0B1340]">{hub.name.split(" ")[0]}</div>
                <div className="text-[11px] text-red-600 font-mono font-semibold mt-0.5">
                  {hub.responseTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Directory - Clean Modern Light Surface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand & Governance */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <Image
              src="/logo-crest.png"
              alt="Quick Bopha Security Logo"
              width={96}
              height={70}
              className="h-16 w-auto object-contain"
            />
          </Link>

          <p className="text-xs text-slate-600 leading-relaxed">
            Enterprise-grade private security provider headquartered in Wolmaransstad. Operating with uncompromised statutory integrity under the ethos:
            <span className="block mt-1.5 font-bold text-[#0B1340]">
              &ldquo;{COMPANY_DETAILS.mottoes.primary}&rdquo; &bull; &ldquo;{COMPANY_DETAILS.mottoes.secondary}&rdquo;
            </span>
          </p>

          <div className="pt-2 text-xs space-y-1 text-slate-600 border-t border-slate-100">
            <div>
              <span className="text-[#0B1340] font-semibold">Managing Director:</span>{" "}
              {COMPANY_DETAILS.leadership.managingDirector.name}
            </div>
            <div>
              <span className="text-[#0B1340] font-semibold">Executive Manager:</span>{" "}
              {COMPANY_DETAILS.leadership.executiveManager.name}
            </div>
            <div>
              <span className="text-[#0B1340] font-semibold">Operational Manager:</span>{" "}
              {COMPANY_DETAILS.leadership.operationalManager.name}
            </div>
            <div>
              <span className="text-[#0B1340] font-semibold">PSiRA / CSD:</span>{" "}
              <span className="font-mono text-red-600 font-semibold">
                {COMPANY_DETAILS.psiraRegistration} / {COMPANY_DETAILS.csdNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Operational Tri-Divisions */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-[#0B1340] uppercase tracking-wider">
            Security Operations
          </h4>
          <ul className="text-xs space-y-2.5 text-slate-600">
            <li>
              <Link href="/services" className="hover:text-red-600 transition-colors flex items-center justify-between">
                <span>Static & Tactical Guarding</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </li>
            <li>
              <Link href="/alarms" className="hover:text-red-600 transition-colors flex items-center justify-between">
                <span>24/7 Control Room & Armed Response</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </li>
            <li>
              <Link href="/alarms" className="hover:text-red-600 transition-colors flex items-center justify-between">
                <span>Smart Safes & Drop-Box Logistics</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </li>
            <li>
              <Link href="/academy" className="hover:text-red-600 transition-colors flex items-center justify-between">
                <span>PSiRA Training Academy (Grades E–A)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-red-600 transition-colors flex items-center justify-between">
                <span>VIP Protection & Rapid Convoy Escort</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-red-600 transition-colors flex items-center justify-between">
                <span>Guard Recruitment Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Statutory Compliance & Tender Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-[#0B1340] uppercase tracking-wider">
            Compliance & Tenders
          </h4>
          <ul className="text-xs space-y-2.5 text-slate-600">
            <li>
              <Link href="/tenders" className="text-red-600 hover:text-red-700 font-semibold transition-colors flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Verified Compliance Vault</span>
              </Link>
            </li>
            <li>
              <span className="text-[#0B1340] font-semibold">CSD Supplier No:</span>{" "}
              <span className="font-mono">{COMPANY_DETAILS.csdNumber}</span>
            </li>
            <li>
              <span className="text-[#0B1340] font-semibold">SARS TCS PIN:</span>{" "}
              <span className="font-mono">{COMPANY_DETAILS.tcsPin}</span> (Valid to Oct 2027)
            </li>
            <li>
              <span className="text-[#0B1340] font-semibold">VAT / Income Tax:</span>{" "}
              <span className="font-mono">{COMPANY_DETAILS.vatNumber} / {COMPANY_DETAILS.incomeTaxNumber}</span>
            </li>
            <li>
              <span className="text-[#0B1340] font-semibold">POPIA Certificate:</span>{" "}
              <span className="font-mono">{COMPANY_DETAILS.popiaRegistration}</span> ({COMPANY_DETAILS.leadership.informationOfficer.name})
            </li>
            <li>
              <span className="text-[#0B1340] font-semibold">SASSETA / PAYE:</span>{" "}
              SETA 13 • PAYE {COMPANY_DETAILS.payeNumber}
            </li>
          </ul>
        </div>

        {/* 24/7 Headquarters & Direct Dispatch */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-[#0B1340] uppercase tracking-wider">
            24/7 Central Command
          </h4>
          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{COMPANY_DETAILS.headquarters.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
              <a
                href={`tel:${COMPANY_DETAILS.hotlines.controlRoom.replace(/\s+/g, "")}`}
                className="text-[#0B1340] font-bold hover:text-red-600"
              >
                {COMPANY_DETAILS.hotlines.controlRoom}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0B1340] shrink-0" />
              <a href={`mailto:${COMPANY_DETAILS.emails.general}`} className="hover:text-red-600">
                {COMPANY_DETAILS.emails.general}
              </a>
            </div>
            <div className="pt-2.5 text-[11px] text-slate-500 space-y-1 border-t border-slate-200">
              <div>
                Tenders:{" "}
                <a href={`mailto:${COMPANY_DETAILS.emails.tenders}`} className="text-[#0B1340] font-medium hover:text-red-600">
                  {COMPANY_DETAILS.emails.tenders}
                </a>
              </div>
              <div>
                Compliance:{" "}
                <a href={`mailto:${COMPANY_DETAILS.emails.compliance}`} className="text-[#0B1340] font-medium hover:text-red-600">
                  {COMPANY_DETAILS.emails.compliance}
                </a>
              </div>
              <div>
                Accounts:{" "}
                <a href={`mailto:${COMPANY_DETAILS.emails.accounts}`} className="text-[#0B1340] font-medium hover:text-red-600">
                  {COMPANY_DETAILS.emails.accounts}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Disclaimers & Copyright */}
      <div className="border-t border-slate-200 bg-slate-50 py-4 px-4 sm:px-8 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="font-medium text-[#0B1340]">
            © 2026 Quick Bopha Security (Pty) Ltd. Reg No: {COMPANY_DETAILS.registrationNumber}. All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
            <span>POPIA Reg: {COMPANY_DETAILS.popiaRegistration}</span>
            <span>•</span>
            <span>PSiRA Reg: {COMPANY_DETAILS.psiraRegistration}</span>
            <span>•</span>
            <span>CSD: {COMPANY_DETAILS.csdNumber}</span>
            <span>•</span>
            <span>VAT: {COMPANY_DETAILS.vatNumber}</span>
            <span>•</span>
            <Link href="/admin" className="text-[#0B1340] hover:text-red-600 font-semibold transition-colors">
              Executive Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
