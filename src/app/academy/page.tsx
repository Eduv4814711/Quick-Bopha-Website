import React from "react";
import { Clock, GraduationCap, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StatutoryTrustBanner } from "@/components/shared/StatutoryTrustBanner";
import { AcademyEnrolmentStepper } from "@/components/features/AcademyEnrolmentStepper";
import { ACADEMY_COURSES, ACCREDITED_TRAINING_ECOSYSTEM } from "@/lib/constants";

export default function AcademyPage() {
  const trainingCycleSteps = [
    { step: "Step 01", title: "Needs Analysis", desc: "Identifying operational & site-specific competency requirements." },
    { step: "Step 02", title: "Curriculum Design", desc: "Structuring outcomes aligned with PSiRA, SASSETA & QCTO unit standards." },
    { step: "Step 03", title: "Material Validation", desc: "Quality assurance of legal, tactical, and SOP learning modules." },
    { step: "Step 04", title: "Practical Drills", desc: "Instructor-led classroom, firearm range, and simulated post exercises." },
    { step: "Step 05", title: "Summative Assessment", desc: "Rigorous examination & practical verification of candidate mastery." },
    { step: "Step 06", title: "Deployment & Audit", desc: "On-site placement, continuous refresher drills, and skills register updates." },
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
            Division 3 • PSiRA &amp; SASSETA (Code 13) Aligned Training Hub
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B1340] tracking-tight">
            Accredited Security Training Academy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Empowering the youth and workforce of Wolmaransstad, Maquassi Hills, and the North West. Structured under our HR Department&apos;s 6-Step Training Cycle with alignment to PSiRA Grades E–A, SASSETA (SETA Code 13), and QCTO occupational standards.
          </p>
        </div>
      </section>

      <StatutoryTrustBanner />

      {/* ENROLMENT STEPPER SECTION (FEAT-04) */}
      <section id="enrol-now" className="py-16 sm:py-20 bg-slate-50/70 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
            >
              FEAT-04 • Online Registration
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
              Online Candidate Enrolment &amp; Seat Booking
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Complete your registration, upload your SA ID to our POPIA-certified vault (Reg: 2026-068037), and reserve your seat instantly via Yoco.
            </p>
          </div>

          <AcademyEnrolmentStepper />
        </div>
      </section>

      {/* COMPLETE COURSE SYLLABUS & FEE STRUCTURE */}
      <section className="py-16 sm:py-20 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
              Comprehensive Course Catalog &amp; Fees
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              All fees include original PSiRA examination submission, course manuals, and certification processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMY_COURSES.map((course) => (
              <Card
                key={course.id}
                className="bg-white border-slate-200 hover:border-red-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] text-red-700 bg-red-50 border-red-200 font-semibold">
                      {course.level}
                    </Badge>
                    <span className="text-xs font-mono text-slate-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-red-600" /> {course.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#0B1340]">{course.name}</h3>
                    <div className="text-xl font-black text-red-600 font-mono mt-1">
                      R {course.priceZar.toLocaleString("en-ZA")}
                    </div>
                    <div className="text-[11px] text-slate-500">Deposit: R {course.depositZar}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                    <strong className="text-[#0B1340]">Prerequisites:</strong> {course.prerequisites}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ACCREDITED SKILLS DEVELOPMENT ECOSYSTEM & 6-STEP TRAINING CYCLE */}
      <section className="py-16 sm:py-20 bg-slate-50/80 px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
            >
              Statutory Skills Architecture • SDL L210835718
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight flex items-center justify-center gap-2.5">
              <GraduationCap className="w-7 h-7 text-red-600" />
              Statutory Accreditation &amp; 6-Step Training Cycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Compiled and governed by our Human Resources Department (Ms. Kgomotso Koloke), our training ecosystem aligns directly with South Africa&apos;s statutory security and occupational qualification bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ACCREDITED_TRAINING_ECOSYSTEM.map((body) => (
              <Card key={body.code} className="bg-white border-slate-200 shadow-2xs">
                <CardContent className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#0B1340] text-white font-bold text-xs">{body.code}</Badge>
                    <Award className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="text-xs font-extrabold text-[#0B1340] uppercase tracking-wide">
                    {body.authority}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{body.focus}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#0B1340]">
                  Quick Bopha 6-Step Employee Development Methodology
                </h3>
                <p className="text-xs text-slate-600">
                  Every candidate progresses through a structured, auditable competency cycle before site deployment.
                </p>
              </div>
              <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50 text-xs font-semibold w-fit">
                SASSETA Chamber 81902
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {trainingCycleSteps.map((s) => (
                <div key={s.step} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-red-600">{s.step}</div>
                  <div className="text-xs font-bold text-[#0B1340] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>{s.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* "TRAINED LOCAL, DEPLOYED LOCAL" PLACEMENT PIPELINE */}
      <section className="py-12 bg-white px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-[#0B1340]">Guaranteed Local Employment Pipeline</h3>
            <p className="text-xs text-slate-600 max-w-xl">
              Top-performing graduates from Quick Bopha Academy receive immediate placement offers on our static, municipal, and commercial guarding sites along the N12 corridor.
            </p>
          </div>

          <a href="#enrol-now">
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-11 px-6 shadow-sm">
              Enrol Online Today
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
