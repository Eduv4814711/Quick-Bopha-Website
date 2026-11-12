"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PhoneCall, Menu, ChevronRight, Award, Lock, BellRing, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { COMPANY_DETAILS } from "@/lib/constants";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Guarding & Services", href: "/services" },
  { name: "Alarms & Control Room", href: "/alarms" },
  { name: "Training Academy", href: "/academy" },
  { name: "Compliance Vault", href: "/tenders" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top Corporate Trust Strip - Logo Royal Navy & Crimson Accent */}
      <div className="bg-[#0B1340] text-slate-100 text-xs py-2 px-4 sm:px-8 border-b border-red-600/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-white font-semibold bg-red-600/90 px-2.5 py-0.5 rounded-full text-[11px]">
              <Award className="w-3 h-3" />
              Level 1 B-BBEE
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline font-medium text-slate-200">
              PSiRA: {COMPANY_DETAILS.psiraRegistration}
            </span>
            <span className="hidden lg:inline text-slate-400">•</span>
            <span className="hidden lg:inline font-medium text-slate-200">
              CSD: {COMPANY_DETAILS.csdNumber}
            </span>
            <span className="hidden xl:inline text-slate-400">•</span>
            <span className="hidden xl:inline flex items-center gap-1 text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400 inline mr-1" />
              POPIA Reg: {COMPANY_DETAILS.popiaRegistration}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-slate-300 hidden sm:inline font-medium">24/7 Control Room:</span>
            <a
              href={`tel:${COMPANY_DETAILS.hotlines.controlRoom.replace(/\s+/g, "")}`}
              className="font-bold text-white hover:text-red-300 flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              {COMPANY_DETAILS.hotlines.controlRoom}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Crisp White Shadcn Surface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Standalone Transparent Brand Logo */}
        <Link href="/" className="flex items-center shrink-0 group py-1">
          <Image
            src="/logo-crest.png"
            alt="Quick Bopha Security Logo"
            width={88}
            height={64}
            className="h-14 sm:h-15 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            priority
          />
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-red-50 text-red-700 font-semibold shadow-2xs ring-1 ring-red-200"
                    : "text-[#0B1340]/80 hover:text-[#0B1340] hover:bg-slate-100/80"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link href="/tenders" className="hidden md:inline-flex">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-300 text-[#0B1340] hover:bg-slate-100 hover:border-[#0B1340]/40 font-semibold gap-1.5 text-xs h-9 px-3.5"
            >
              <Lock className="w-3.5 h-3.5 text-red-600" />
              Tender Vault
            </Button>
          </Link>

          <a href={`tel:${COMPANY_DETAILS.hotlines.controlRoom.replace(/\s+/g, "")}`}>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-xs hover:shadow-md transition-all gap-1.5 text-xs h-9 px-4"
            >
              <BellRing className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Emergency</span> Dispatch
            </Button>
          </a>

          {/* Mobile Menu Sheet */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className="xl:hidden p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-[#0B1340]" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0 flex flex-col bg-white">
              <SheetHeader className="p-5 border-b border-slate-200 text-left bg-slate-50/60">
                <SheetTitle className="flex items-center gap-3 text-[#0B1340]">
                  <Image
                    src="/logo-crest.png"
                    alt="Quick Bopha Security Logo"
                    width={48}
                    height={36}
                    className="h-9 w-auto object-contain"
                  />
                  <span className="font-bold text-base">Quick Bopha Security</span>
                </SheetTitle>
                <div className="text-xs text-slate-600 mt-1">
                  &ldquo;We Guard With Pride&rdquo; • PSiRA Reg: {COMPANY_DETAILS.psiraRegistration}
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-red-50 text-red-700 font-semibold ring-1 ring-red-200"
                          : "text-[#0B1340] hover:bg-slate-100"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  );
                })}
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  24/7 Control Room Hotline
                </div>
                <a
                  href={`tel:${COMPANY_DETAILS.hotlines.controlRoom.replace(/\s+/g, "")}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xs transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call {COMPANY_DETAILS.hotlines.controlRoom}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
