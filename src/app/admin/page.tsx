"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Lock,
  ShieldCheck,
  Calculator,
  DollarSign,
  ClipboardList,
  LogOut,
  Save,
  RotateCcw,
  RefreshCw,
  FileCheck,
  GraduationCap,
  Briefcase,
  KeyRound,
  Shield,
  Radio,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NBCPSSRateCalculator } from "@/components/features/NBCPSSRateCalculator";
import {
  COMPANY_DETAILS,
  DEFAULT_PUBLIC_GUARD_RATES,
  DEFAULT_SERVICE_CATEGORIES,
  DEFAULT_ALARM_PACKAGES,
  ACADEMY_COURSES,
  PublicGuardRateTier,
  ServiceCategoryItem,
  AlarmPackageItem,
  AcademyCourseItem,
} from "@/lib/constants";
import type { AdminStoreData } from "@/lib/admin-store";
import { toast } from "sonner";

export default function AdminPortalPage() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [passcode, setPasscode] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const [pricingTiers, setPricingTiers] = useState<PublicGuardRateTier[]>(DEFAULT_PUBLIC_GUARD_RATES);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategoryItem[]>(DEFAULT_SERVICE_CATEGORIES);
  const [alarmPackages, setAlarmPackages] = useState<AlarmPackageItem[]>(DEFAULT_ALARM_PACKAGES);
  const [academyCourses, setAcademyCourses] = useState<AcademyCourseItem[]>(ACADEMY_COURSES);
  const [savingPricing, setSavingPricing] = useState<boolean>(false);

  const [auditLogs, setAuditLogs] = useState<AdminStoreData["auditLogs"]>({
    quotes: [],
    tenders: [],
    academy: [],
    careers: [],
  });
  const [loadingLogs, setLoadingLogs] = useState<boolean>(false);

  const fetchAdminData = useCallback(async () => {
    setLoadingLogs(true);
    try {
      const [pricingRes, logsRes] = await Promise.all([
        fetch("/api/admin/pricing"),
        fetch("/api/admin/logs"),
      ]);
      const pricingData = await pricingRes.json();
      const logsData = await logsRes.json();

      if (pricingData?.success) {
        if (Array.isArray(pricingData.pricing)) setPricingTiers(pricingData.pricing);
        if (Array.isArray(pricingData.serviceCategoriesPricing)) setServiceCategories(pricingData.serviceCategoriesPricing);
        if (Array.isArray(pricingData.alarmPackagesPricing)) setAlarmPackages(pricingData.alarmPackagesPricing);
        if (Array.isArray(pricingData.academyCoursesPricing)) setAcademyCourses(pricingData.academyCoursesPricing);
      }
      if (logsData?.success && logsData.logs) {
        setAuditLogs(logsData.logs);
      }
    } catch {
      // Keep existing state on error
    } finally {
      setLoadingLogs(false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((data) => {
        if (data?.authenticated) {
          setAuthenticated(true);
          fetchAdminData();
        }
      })
      .catch(() => {})
      .finally(() => setCheckingAuth(false));
  }, [fetchAdminData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();

      if (res.ok && data?.authenticated) {
        setAuthenticated(true);
        toast.success("Executive Admin Portal Unlocked.");
        fetchAdminData();
      } else {
        toast.error(data?.error || "Invalid Executive Passcode.");
      }
    } catch {
      toast.error("Failed to verify passcode.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setPasscode("");
    toast.info("Executive Admin session locked.");
  };

  const handleGuardPriceChange = (id: string, field: keyof PublicGuardRateTier, value: string | number) => {
    setPricingTiers((prev) =>
      prev.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier))
    );
  };

  const handleServicePriceChange = (id: string, field: keyof ServiceCategoryItem, value: string | number) => {
    setServiceCategories((prev) =>
      prev.map((svc) => (svc.id === id ? { ...svc, [field]: value } : svc))
    );
  };

  const handleAlarmPriceChange = (id: string, field: keyof AlarmPackageItem, value: string | number) => {
    setAlarmPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, [field]: value } : pkg))
    );
  };

  const handleAcademyPriceChange = (id: string, field: keyof AcademyCourseItem, value: string | number) => {
    setAcademyCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, [field]: value } : course))
    );
  };

  const handleSavePricing = async () => {
    setSavingPricing(true);
    try {
      const res = await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pricing: pricingTiers,
          serviceCategoriesPricing: serviceCategories,
          alarmPackagesPricing: alarmPackages,
          academyCoursesPricing: academyCourses,
        }),
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        toast.success("All Guard, Service, Alarm & Academy Prices Published to Website!");
      } else {
        toast.error("Failed to save pricing.");
      }
    } catch {
      toast.error("Network error while saving pricing.");
    } finally {
      setSavingPricing(false);
    }
  };

  const handleResetDefaultPricing = async () => {
    setPricingTiers(DEFAULT_PUBLIC_GUARD_RATES);
    setServiceCategories(DEFAULT_SERVICE_CATEGORIES);
    setAlarmPackages(DEFAULT_ALARM_PACKAGES);
    setAcademyCourses(ACADEMY_COURSES);

    await fetch("/api/admin/pricing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pricing: DEFAULT_PUBLIC_GUARD_RATES,
        serviceCategoriesPricing: DEFAULT_SERVICE_CATEGORIES,
        alarmPackagesPricing: DEFAULT_ALARM_PACKAGES,
        academyCoursesPricing: ACADEMY_COURSES,
      }),
    });
    toast.info("Reset all Guard, Service, Alarm & Academy prices to statutory defaults.");
  };

  if (checkingAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50/60 px-4">
        <div className="text-xs font-bold text-[#0B1340] uppercase tracking-wider animate-pulse">
          Verifying Executive Command Credentials...
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 py-16">
        <Card className="w-full max-w-md bg-white border-slate-200 shadow-xl overflow-hidden">
          <div className="h-2 bg-red-600" />
          <CardHeader className="p-6 pb-4 bg-slate-50/80 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#0B1340] text-white flex items-center justify-center shadow-xs ring-4 ring-red-50">
                <Lock className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50 text-[10px] uppercase font-bold">
                  Restricted Executive Access
                </Badge>
                <CardTitle className="text-xl font-black text-[#0B1340] mt-0.5">
                  Quick Bopha Admin Portal
                </CardTitle>
              </div>
            </div>
            <CardDescription className="text-xs text-slate-600 pt-2">
              Authorized access for Managing Director ({COMPANY_DETAILS.leadership.managingDirector.name}), Executive Manager ({COMPANY_DETAILS.leadership.executiveManager.name}), and Operational Command.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exec-pin" className="text-xs font-bold uppercase tracking-wider text-[#0B1340] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-red-600" />
                  Executive Passcode / PIN
                </Label>
                <Input
                  id="exec-pin"
                  type="password"
                  required
                  placeholder="Enter Executive PIN (e.g. QB-EXEC-2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="h-10 text-xs font-mono border-slate-300"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-[11px]">
                <span className="text-slate-600">
                  Default Executive PIN: <code className="font-mono font-bold text-[#0B1340]">QB-EXEC-2026</code>
                </span>
                <button
                  type="button"
                  onClick={() => setPasscode("QB-EXEC-2026")}
                  className="text-red-600 hover:underline font-bold"
                >
                  Auto-Fill PIN
                </button>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Button
                type="submit"
                disabled={authLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-10 gap-2 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                {authLoading ? "Authenticating..." : "Unlock Executive Admin Portal"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 text-[#0B1340] pb-20">
      {/* Executive Header Strip */}
      <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-red-600 text-white text-[11px] font-bold uppercase border-0">
                Executive Command &amp; Pricing Console
              </Badge>
              <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                PSiRA: {COMPANY_DETAILS.psiraRegistration} | CSD: {COMPANY_DETAILS.csdNumber} | TCS: {COMPANY_DETAILS.tcsPin}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0B1340] tracking-tight">
              Quick Bopha Executive Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Internal NBCPSS statutory rate estimator, master website pricing publisher (Guards, Services, Alarms &amp; Academy), and real-time audit logs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchAdminData}
              disabled={loadingLogs}
              className="border-slate-300 text-[#0B1340] hover:bg-slate-100 text-xs font-bold h-9 gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingLogs ? "animate-spin" : ""}`} />
              Sync Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold h-9 gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Lock Portal
            </Button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">NBCPSS Quotes Logged</div>
              <div className="text-2xl font-black text-[#0B1340] font-mono mt-0.5">{auditLogs.quotes.length}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#0B1340] text-white flex items-center justify-center">
              <Calculator className="w-5 h-5 text-red-400" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Tender Vault Downloads</div>
              <div className="text-2xl font-black text-red-600 font-mono mt-0.5">{auditLogs.tenders.length}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#0B1340] text-white flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-red-400" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Academy Seat Bookings</div>
              <div className="text-2xl font-black text-[#0B1340] font-mono mt-0.5">{auditLogs.academy.length}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#0B1340] text-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-red-400" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Guard Applications</div>
              <div className="text-2xl font-black text-[#0B1340] font-mono mt-0.5">{auditLogs.careers.length}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#0B1340] text-white flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Main 3-Tab Admin Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <Tabs defaultValue="pricing" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl h-auto flex flex-wrap gap-1 shadow-2xs">
            <TabsTrigger
              value="pricing"
              className="data-[state=active]:bg-[#0B1340] data-[state=active]:text-white text-xs font-bold px-4 py-2.5 rounded-lg gap-2"
            >
              <DollarSign className="w-4 h-4 text-red-500" />
              1. Master Pricing Manager (Guards, Services, Alarms &amp; Academy)
            </TabsTrigger>
            <TabsTrigger
              value="estimator"
              className="data-[state=active]:bg-[#0B1340] data-[state=active]:text-white text-xs font-bold px-4 py-2.5 rounded-lg gap-2"
            >
              <Calculator className="w-4 h-4 text-red-500" />
              2. NBCPSS Statutory Rate Estimator
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="data-[state=active]:bg-[#0B1340] data-[state=active]:text-white text-xs font-bold px-4 py-2.5 rounded-lg gap-2"
            >
              <ClipboardList className="w-4 h-4 text-red-500" />
              3. Executive Audit &amp; Submissions Vault
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: MASTER PRICING MANAGER (GUARDS, SERVICES, ALARMS & ACADEMY) */}
          <TabsContent value="pricing" className="space-y-8">
            {/* Sticky / Top Action Bar */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50 text-xs font-semibold">
                  Master Website Pricing Control
                </Badge>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0B1340]">
                  Edit All Public Guard, Service, Alarm &amp; Academy Prices
                </h2>
                <p className="text-xs text-slate-600">
                  Changes made below update the live public rate cards across Home (<code>/</code>), Guarding Services (<code>/services</code>), Alarms (<code>/alarms</code>), and Training Academy (<code>/academy</code>).
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResetDefaultPricing}
                  className="border-slate-300 text-[#0B1340] text-xs font-semibold h-10 px-3.5 gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset All Defaults
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={savingPricing}
                  onClick={handleSavePricing}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold h-10 px-5 gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  {savingPricing ? "Publishing..." : "Save & Publish All Prices"}
                </Button>
              </div>
            </div>

            {/* SECTION A: PER-GUARD MONTHLY PRICING BY PSIRA GRADE */}
            <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 p-5 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0B1340] text-white flex items-center justify-center">
                    <Shield className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-extrabold text-[#0B1340]">
                      A. Per-Guard Monthly Prices by PSiRA Grade (Home &amp; Services Pages)
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-600">
                      Headline monthly rate per security officer for PSiRA Grades D/E, C, B, and A.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {pricingTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#0B1340] text-white font-bold text-xs">
                        PSiRA {tier.grade}
                      </Badge>
                      {tier.popular && (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                          Most Requested Card
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-[#0B1340]">Card Title</Label>
                      <Input
                        value={tier.title}
                        onChange={(e) => handleGuardPriceChange(tier.id, "title", e.target.value)}
                        className="h-9 text-xs bg-white border-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-red-600">Area 3 Rate (ZAR)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          min={0}
                          value={tier.monthlyPricePerGuardZar}
                          onChange={(e) =>
                            handleGuardPriceChange(
                              tier.id,
                              "monthlyPricePerGuardZar",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="h-9 text-xs font-mono font-bold bg-white border-slate-300 text-[#0B1340]"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-[#0B1340]">Area 1 &amp; 2 Rate (ZAR)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          min={0}
                          value={tier.area1And2PricePerGuardZar}
                          onChange={(e) =>
                            handleGuardPriceChange(
                              tier.id,
                              "area1And2PricePerGuardZar",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="h-9 text-xs font-mono font-bold bg-white border-slate-300 text-[#0B1340]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-600">Subtitle</Label>
                        <Input
                          value={tier.subtitle}
                          onChange={(e) => handleGuardPriceChange(tier.id, "subtitle", e.target.value)}
                          className="h-9 text-xs bg-white border-slate-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-600">Billing Note</Label>
                        <Input
                          value={tier.billingNote}
                          onChange={(e) => handleGuardPriceChange(tier.id, "billingNote", e.target.value)}
                          className="h-9 text-xs bg-white border-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SECTION B: OPERATIONAL GUARDING & SPECIALIZED SERVICES PRICING */}
            <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 p-5 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0B1340] text-white flex items-center justify-center">
                    <Warehouse className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-extrabold text-[#0B1340]">
                      B. Operational Guarding &amp; Specialized Services Pricing (<code>/services</code>)
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-600">
                      Starting rates for Static Commercial, Agricultural/Farm, Mining Infrastructure, and VIP Close Protection services.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {serviceCategories.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                  >
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-[#0B1340]">Service Name</Label>
                      <Input
                        value={svc.title}
                        onChange={(e) => handleServicePriceChange(svc.id, "title", e.target.value)}
                        className="h-9 text-xs font-bold bg-white border-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-red-600">Area 3 Rate (ZAR)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          min={0}
                          value={svc.startingPriceZar}
                          onChange={(e) =>
                            handleServicePriceChange(
                              svc.id,
                              "startingPriceZar",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="h-9 text-xs font-mono font-bold bg-white border-slate-300 text-[#0B1340]"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-[#0B1340]">Area 1 &amp; 2 Rate (ZAR)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          min={0}
                          value={svc.area1And2PriceZar}
                          onChange={(e) =>
                            handleServicePriceChange(
                              svc.id,
                              "area1And2PriceZar",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="h-9 text-xs font-mono font-bold bg-white border-slate-300 text-[#0B1340]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SECTION C: ELECTRONIC ALARMS, SMART SAFES & ARMED RESPONSE PLANS */}
            <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 p-5 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0B1340] text-white flex items-center justify-center">
                    <Radio className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-extrabold text-[#0B1340]">
                      C. Electronic Alarms &amp; Armed Response Packages (<code>/alarms</code>)
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-600">
                      Monthly subscription rates for Residential, Agricultural Farmstead, and Commercial Smart Safe monitoring plans.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                {alarmPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge className={pkg.popular ? "bg-red-600 text-white text-xs" : "bg-[#0B1340] text-white text-xs"}>
                        {pkg.badge}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-[#0B1340]">Package Name</Label>
                      <Input
                        value={pkg.name}
                        onChange={(e) => handleAlarmPriceChange(pkg.id, "name", e.target.value)}
                        className="h-9 text-xs font-bold bg-white border-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-red-600">Monthly Rate (ZAR)</Label>
                        <Input
                          type="number"
                          min={0}
                          value={pkg.monthlyPriceZar}
                          onChange={(e) =>
                            handleAlarmPriceChange(
                              pkg.id,
                              "monthlyPriceZar",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="h-9 text-xs font-mono font-bold bg-white border-slate-300 text-[#0B1340]"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold text-slate-600">Billing Cycle</Label>
                        <Input
                          value={pkg.billingUnit}
                          onChange={(e) => handleAlarmPriceChange(pkg.id, "billingUnit", e.target.value)}
                          className="h-9 text-xs bg-white border-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SECTION D: ACCREDITED TRAINING ACADEMY COURSE FEES & DEPOSITS */}
            <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 p-5 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0B1340] text-white flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-extrabold text-[#0B1340]">
                      D. Training Academy Course Fees &amp; Seat Deposits (<code>/academy</code>)
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-600">
                      Full course tuition and minimum seat reservation deposit for PSiRA Grades E–A, Armed Response, and CIT.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {academyCourses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                  >
                    <div className="text-xs font-extrabold text-[#0B1340]">{course.name}</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[11px] font-bold text-red-600">Full Course Fee (R)</Label>
                        <Input
                          type="number"
                          min={0}
                          value={course.priceZar}
                          onChange={(e) =>
                            handleAcademyPriceChange(
                              course.id,
                              "priceZar",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="h-9 text-xs font-mono font-bold bg-white border-slate-300 text-[#0B1340]"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[11px] font-bold text-[#0B1340]">Seat Deposit (R)</Label>
                        <Input
                          type="number"
                          min={0}
                          value={course.depositZar}
                          onChange={(e) =>
                            handleAcademyPriceChange(
                              course.id,
                              "depositZar",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="h-9 text-xs font-mono font-bold bg-white border-slate-300 text-[#0B1340]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: NBCPSS STATUTORY RATE ESTIMATOR */}
          <TabsContent value="estimator" className="space-y-6">
            <NBCPSSRateCalculator onQuoteGenerated={fetchAdminData} />
          </TabsContent>

          {/* TAB 3: EXECUTIVE SUBMISSIONS & AUDIT VAULT */}
          <TabsContent value="logs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tender Vault Downloads */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="p-5 bg-slate-50 border-b border-slate-200">
                  <CardTitle className="text-base font-extrabold text-[#0B1340] flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-red-600" />
                    Tender Compliance Vault Audit Log ({auditLogs.tenders.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2.5 max-h-96 overflow-y-auto">
                  {auditLogs.tenders.map((t) => (
                    <div key={t.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#0B1340]">
                        <span>{t.organization}</span>
                        <span className="font-mono text-red-600 text-[11px]">{t.tenderReference}</span>
                      </div>
                      <div className="text-slate-600">
                        Officer: <strong>{t.officerName}</strong> • {t.businessEmail} • {t.phoneNumber}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {new Date(t.timestamp).toLocaleString("en-ZA")} • {t.documentsCount} Statutory Docs Bundled
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Generated NBCPSS Quotes */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="p-5 bg-slate-50 border-b border-slate-200">
                  <CardTitle className="text-base font-extrabold text-[#0B1340] flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-red-600" />
                    Generated NBCPSS Quotes ({auditLogs.quotes.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2.5 max-h-96 overflow-y-auto">
                  {auditLogs.quotes.map((q) => (
                    <div key={q.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#0B1340]">
                        <span>{q.clientName}</span>
                        <span className="font-mono text-red-600">
                          R {q.totalMonthlyContractCost.toLocaleString("en-ZA")}/mo
                        </span>
                      </div>
                      <div className="text-slate-600">
                        {q.officerCount}x {q.grade} ({q.shiftType.replace("_", " ")}) • R {q.monthlyCostPerPost.toLocaleString("en-ZA")}/post
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {new Date(q.timestamp).toLocaleString("en-ZA")} • {q.area}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Academy Seat Enrolments */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="p-5 bg-slate-50 border-b border-slate-200">
                  <CardTitle className="text-base font-extrabold text-[#0B1340] flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-red-600" />
                    Academy Seat Enrolments ({auditLogs.academy.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2.5 max-h-96 overflow-y-auto">
                  {auditLogs.academy.map((a) => (
                    <div key={a.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#0B1340]">
                        <span>{a.candidate}</span>
                        <span className="font-mono text-red-600">R {a.amountZar.toLocaleString("en-ZA")}</span>
                      </div>
                      <div className="text-slate-600">
                        {a.course} • Tel: {a.phone}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Ref: {a.enrolmentRef} • {new Date(a.timestamp).toLocaleString("en-ZA")}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Security Officer Career Applications */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="p-5 bg-slate-50 border-b border-slate-200">
                  <CardTitle className="text-base font-extrabold text-[#0B1340] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-red-600" />
                    Security Officer Applications ({auditLogs.careers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2.5 max-h-96 overflow-y-auto">
                  {auditLogs.careers.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#0B1340]">
                        <span>{c.fullName} ({c.residentialTown})</span>
                        <Badge variant="outline" className="text-[10px] border-red-200 text-red-700 bg-red-50">
                          {c.psiraGrade}
                        </Badge>
                      </div>
                      <div className="text-slate-600">
                        PSiRA: {c.psiraRegNumber || "Pending"} • Tel: {c.phoneNumber} • Firearm: {c.hasFirearmCompetency ? "Yes" : "No"}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {new Date(c.timestamp).toLocaleString("en-ZA")}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
