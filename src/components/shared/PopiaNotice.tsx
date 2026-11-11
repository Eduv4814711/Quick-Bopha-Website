"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PopiaNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("qb_popia_consent");
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("qb_popia_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy and POPIA compliance consent"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 text-slate-700 border-t border-slate-200 p-4 shadow-xl backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-slate-600">
            <strong className="text-[#0B1340]">POPIA Compliance Notice (Reg No: 2026-068037): </strong>
            Quick Bopha Security (Pty) Ltd is duly registered with the Information Regulator (South Africa) under Section 55 of the Protection of Personal Information Act 4 of 2013 (Registered Information Officer: Mpho Mapulane). Personal and procurement data submitted via our Tender Vault, Academy Portal, and Rate Calculator are processed strictly for statutory verification.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={handleAccept}
            className="bg-[#0B1340] hover:bg-[#152266] text-white font-bold text-xs h-8 px-4"
          >
            Acknowledge & Accept
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsVisible(false)}
            className="text-slate-500 hover:text-[#0B1340] h-8 text-xs"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
