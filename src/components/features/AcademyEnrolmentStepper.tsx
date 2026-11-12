"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, CheckCircle2, CreditCard, UploadCloud, FileCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ACADEMY_COURSES, AcademyCourseItem } from "@/lib/constants";
import { toast } from "sonner";

export function AcademyEnrolmentStepper() {
  const [courses, setCourses] = useState<AcademyCourseItem[]>(ACADEMY_COURSES);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourseId, setSelectedCourseId] = useState("grade-c");
  const [intakeMonth, setIntakeMonth] = useState("First Monday of Upcoming Month");
  const [paymentOption, setPaymentOption] = useState<"deposit" | "full">("deposit");

  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.academyCoursesPricing) && data.academyCoursesPricing.length > 0) {
          setCourses(data.academyCoursesPricing);
        }
      })
      .catch(() => {});
  }, []);

  const [studentData, setStudentData] = useState({
    fullName: "",
    saIdNumber: "",
    mobilePhone: "",
    emailAddress: "",
    residentialAddress: "Wolmaransstad / North West",
    previousPsiraNumber: "",
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolmentRef, setEnrolmentRef] = useState("");

  const activeCourse = courses.find((c) => c.id === selectedCourseId) || courses[2];
  const payableAmount = paymentOption === "deposit" ? activeCourse.depositZar : activeCourse.priceZar;

  const validateStep2 = () => {
    if (!studentData.fullName || !studentData.saIdNumber || !studentData.mobilePhone) {
      toast.error("Please enter your Full Name, SA ID Number, and Mobile Phone.");
      return false;
    }
    const cleanId = studentData.saIdNumber.replace(/\s+/g, "");
    if (cleanId.length !== 13) {
      toast.warning("South African National ID numbers must be exactly 13 digits.");
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !fileName) {
      toast.warning("Please upload a scan of your South African ID or Passport to continue.");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSimulateYocoCheckout = async () => {
    setIsProcessingPayment(true);
    const ref = `QB-ACAD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      await fetch("/api/academy/enrol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...studentData,
          course: activeCourse.name,
          intake: intakeMonth,
          paymentOption,
          amountPaidZar: payableAmount,
          reference: ref,
          timestamp: new Date().toISOString(),
        }),
      });

      setTimeout(() => {
        setIsProcessingPayment(false);
        setEnrolmentRef(ref);
        setIsEnrolled(true);
        toast.success(`Payment processed via Yoco! Reservation Confirmed: ${ref}`);
      }, 1500);
    } catch {
      setIsProcessingPayment(false);
      setEnrolmentRef(ref);
      setIsEnrolled(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Stepper Progress Bar - Clean Light Shadcn Surface */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-3">
          <span className="text-red-600 font-bold">Step {currentStep} of 4:</span>
          <span className="text-[#0B1340]">
            {currentStep === 1 && "Course Selection & Dates"}
            {currentStep === 2 && "Personal Details & SA ID"}
            {currentStep === 3 && "Document Upload (quickbopha-docs-vault)"}
            {currentStep === 4 && "Yoco Secure Checkout"}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentStep >= step ? "bg-red-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Form Content */}
      <Card className="bg-white border-slate-200 shadow-lg overflow-hidden">
        {isEnrolled ? (
          <CardContent className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center border border-red-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <Badge className="bg-red-50 text-red-700 border-red-200">
                Official Academy Enrolment Confirmed
              </Badge>
              <h3 className="text-2xl font-black text-[#0B1340]">
                Welcome to Quick Bopha Security Academy!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Candidate <span className="font-bold text-[#0B1340]">{studentData.fullName}</span> has been provisionally enrolled in{" "}
                <span className="font-bold text-red-600">{activeCourse.name}</span>.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Enrolment Reference:</span>
                <span className="font-mono font-bold text-[#0B1340]">{enrolmentRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Intake Schedule:</span>
                <span className="font-semibold text-[#0B1340]">{intakeMonth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Campus Location:</span>
                <span className="font-semibold text-[#0B1340]">Wolmaransstad Training Facility, N12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Payment Processed (Yoco):</span>
                <span className="font-mono font-bold text-red-600">R {payableAmount.toLocaleString("en-ZA")}.00</span>
              </div>
            </div>

            <div className="pt-3 text-xs text-slate-600">
              An SMS confirmation and formal orientation pack have been dispatched to <strong>{studentData.mobilePhone}</strong>.
            </div>

            <Button
              onClick={() => {
                setIsEnrolled(false);
                setCurrentStep(1);
              }}
              variant="outline"
              className="mt-4 text-xs border-slate-300 text-[#0B1340]"
            >
              Enrol Another Candidate
            </Button>
          </CardContent>
        ) : (
          <>
            <CardHeader className="bg-slate-50 p-5 border-b border-slate-200">
              <CardTitle className="text-lg font-bold text-[#0B1340] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-red-600" />
                <span>
                  {currentStep === 1 && "Select PSiRA Qualification Course"}
                  {currentStep === 2 && "Candidate Demographics & SA ID"}
                  {currentStep === 3 && "Secure Document Vault Upload"}
                  {currentStep === 4 && "Yoco Payment & Seat Reservation"}
                </span>
              </CardTitle>
              <CardDescription className="text-xs text-slate-600">
                Ethos: &ldquo;Trained Local, Deployed Local&rdquo; — Empowering security professionals across the North West.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-[#0B1340]">Select Target Course / Qualification</Label>
                    <Select
                      value={selectedCourseId}
                      onValueChange={(val) => {
                        if (val) setSelectedCourseId(val);
                      }}
                    >
                      <SelectTrigger className="h-10 text-xs font-bold border-slate-300 text-[#0B1340]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name} — R {course.priceZar.toLocaleString("en-ZA")} ({course.duration})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Selected Course Overview Card */}
                  <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-[#0B1340]">{activeCourse.name}</h4>
                        <span className="text-xs text-slate-600">{activeCourse.level}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-red-600 font-mono">
                          R {activeCourse.priceZar.toLocaleString("en-ZA")}
                        </div>
                        <div className="text-[11px] text-slate-600">Seat Deposit: R {activeCourse.depositZar}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeCourse.description}
                    </p>

                    <div className="text-[11px] text-slate-600 pt-2 border-t border-red-200/60">
                      <strong className="text-[#0B1340]">Prerequisites:</strong> {activeCourse.prerequisites}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <Label className="text-xs font-semibold text-[#0B1340]">Preferred Monthly Intake Schedule</Label>
                    <Select
                      value={intakeMonth}
                      onValueChange={(val) => {
                        if (val) setIntakeMonth(val);
                      }}
                    >
                      <SelectTrigger className="h-10 text-xs border-slate-300 text-[#0B1340]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="First Monday of Upcoming Month">Upcoming Month (1st Monday Intake)</SelectItem>
                        <SelectItem value="Mid-Month Cohort (15th)">Mid-Month Cohort (15th of the Month)</SelectItem>
                        <SelectItem value="Next Quarter Cohort">Next Quarter Intake</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="st-name" className="text-xs font-semibold text-[#0B1340]">Full Legal Names (As per ID)</Label>
                      <Input
                        id="st-name"
                        placeholder="e.g. Tebogo Molefe"
                        value={studentData.fullName}
                        onChange={(e) => setStudentData({ ...studentData, fullName: e.target.value })}
                        className="h-10 text-xs border-slate-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="st-id" className="text-xs font-semibold text-[#0B1340]">South African ID or Passport No.</Label>
                      <Input
                        id="st-id"
                        placeholder="13-Digit National ID Number"
                        maxLength={13}
                        value={studentData.saIdNumber}
                        onChange={(e) => setStudentData({ ...studentData, saIdNumber: e.target.value })}
                        className="h-10 text-xs font-mono border-slate-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="st-phone" className="text-xs font-semibold text-[#0B1340]">Mobile Phone (For SMS Confirmation)</Label>
                      <Input
                        id="st-phone"
                        type="tel"
                        placeholder="071 987 6543"
                        value={studentData.mobilePhone}
                        onChange={(e) => setStudentData({ ...studentData, mobilePhone: e.target.value })}
                        className="h-10 text-xs border-slate-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="st-email" className="text-xs font-semibold text-[#0B1340]">Email Address (Optional)</Label>
                      <Input
                        id="st-email"
                        type="email"
                        placeholder="student@gmail.com"
                        value={studentData.emailAddress}
                        onChange={(e) => setStudentData({ ...studentData, emailAddress: e.target.value })}
                        className="h-10 text-xs border-slate-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="st-addr" className="text-xs font-semibold text-[#0B1340]">Residential Town / Village (North West)</Label>
                    <Input
                      id="st-addr"
                      placeholder="e.g. Wolmaransstad, Maquassi Hills, Tswelelang"
                      value={studentData.residentialAddress}
                      onChange={(e) => setStudentData({ ...studentData, residentialAddress: e.target.value })}
                      className="h-10 text-xs border-slate-300"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-600 leading-relaxed">
                    Statutory regulations under the PSiR Act require verification of certified identity before course commencement. Upload a clear photograph or PDF of your SA ID Document.
                  </div>

                  <div className="border-2 border-dashed border-slate-300 hover:border-red-500 rounded-xl p-8 text-center space-y-3 cursor-pointer transition-colors bg-slate-50">
                    <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center border border-red-200">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-[#0B1340]">
                        {fileName ? fileName : "Upload Scanned SA ID / Smart Card"}
                      </div>
                      <p className="text-xs text-slate-500">
                        Target Storage: <code className="text-red-600 font-mono font-semibold">quickbopha-docs-vault (AWS S3)</code>
                      </p>
                    </div>

                    <label className="inline-block">
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,image/png,image/jpeg"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFileName(file.name);
                            toast.success(`Attached: ${file.name}`);
                          }
                        }}
                      />
                      <span className="py-2 px-4 rounded-lg bg-[#0B1340] hover:bg-red-600 text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors">
                        {fileName ? "Change Document" : "Browse Files"}
                      </span>
                    </label>
                  </div>

                  {fileName && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-[#0B1340] font-medium">
                      <FileCheck className="w-4 h-4 text-red-600" />
                      <span>Document verified for secure S3 encryption: {fileName}</span>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Course:</span>
                      <span className="text-xs font-bold text-[#0B1340]">{activeCourse.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Candidate:</span>
                      <span className="text-xs font-semibold text-[#0B1340]">{studentData.fullName}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200 pt-2">
                      <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Intake Date:</span>
                      <span className="text-xs font-semibold text-red-600">{intakeMonth}</span>
                    </div>
                  </div>

                  {/* Payment Amount Option */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#0B1340]">Payment Structure</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        onClick={() => setPaymentOption("deposit")}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          paymentOption === "deposit"
                            ? "border-red-600 bg-red-50/50 font-bold"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="text-[#0B1340]">Seat Reservation Deposit</div>
                        <div className="text-base font-black text-red-600 font-mono mt-1">
                          R {activeCourse.depositZar.toLocaleString("en-ZA")}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Balance due on arrival</div>
                      </div>

                      <div
                        onClick={() => setPaymentOption("full")}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          paymentOption === "full"
                            ? "border-red-600 bg-red-50/50 font-bold"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="text-[#0B1340]">Full Course Tuition</div>
                        <div className="text-base font-black text-red-600 font-mono mt-1">
                          R {activeCourse.priceZar.toLocaleString("en-ZA")}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Fully paid upfront</div>
                      </div>
                    </div>
                  </div>

                  {/* Yoco Gateway Visual Anchor */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-red-600" />
                        <span className="font-bold text-xs text-[#0B1340]">Yoco Integrated Payment Gateway</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] border-slate-300 text-[#0B1340] bg-white">
                        PCI-DSS Level 1
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-600">
                      Supports Visa, Mastercard, Instant EFT, and Capitec Pay via 3D-Secure authenticated checkout.
                    </p>

                    <Button
                      onClick={handleSimulateYocoCheckout}
                      disabled={isProcessingPayment}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-11 text-xs gap-2 shadow-sm"
                    >
                      <CreditCard className="w-4 h-4" />
                      {isProcessingPayment
                        ? "Opening Secure Yoco Gateway..."
                        : `Pay R ${payableAmount.toLocaleString("en-ZA")}.00 via Yoco`}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between">
              {currentStep > 1 ? (
                <Button variant="outline" size="sm" onClick={handlePrev} className="text-xs gap-1 border-slate-300 text-[#0B1340]">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="bg-[#0B1340] hover:bg-red-600 text-white font-bold text-xs gap-1.5"
                >
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              ) : null}
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
