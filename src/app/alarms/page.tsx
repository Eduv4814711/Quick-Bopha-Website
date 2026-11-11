import React from "react";
import Link from "next/link";
import { Radio, ShieldAlert, PhoneCall, Video, Vault, CheckCircle2, Zap, FileText, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatutoryTrustBanner } from "@/components/shared/StatutoryTrustBanner";
import { COMPANY_DETAILS, CONTROL_ROOM_ESCALATION_MATRIX } from "@/lib/constants";

export default function AlarmsPage() {
  const packages = [
    {
      name: "Residential & Family Estate",
      badge: "Homeowners",
      price: "From R495 / month",
      description: "Complete perimeter and interior alarm monitoring with dedicated armed tactical dispatch in Wolmaransstad.",
      features: [
        "24/7 Control Room active alarm monitoring",
        "Sub-5 minute armed response guarantee in municipal zone",
        "Mobile App panic button & remote arm/disarm",
        "Load-shedding backup battery telemetry",
        "Free monthly test signal verification",
      ],
      popular: false,
    },
    {
      name: "Agricultural Farmstead Security",
      badge: "Most Popular",
      price: "From R850 / month",
      description: "Engineered specifically for farms, smallholdings, and remote homesteads along the N12 corridor.",
      features: [
        "Solar-powered outdoor perimeter motion beams",
        "Long-range radio repeater telemetry (No GSM dead zones)",
        "Dedicated Farm Watch & rural response vehicle dispatch",
        "Livestock enclosure gate sensor integration",
        "SAPS Eyes & Ears (E2) coordinated incident response",
      ],
      popular: true,
    },
    {
      name: "Commercial & Retail Smart Safe",
      badge: "Business & Retail",
      price: "From R1,450 / month",
      description: "High-security cash handling, drop-box telematics, and multi-zone intrusion detection for businesses.",
      features: [
        "Smart Safe digital cash drop monitoring with tamper alert",
        "Cash-In-Transit (CIT) cash collection coordination",
        "AI CCTV cloud camera health check & perimeter tripwire",
        "Opening & closing schedule violation alerts",
        "Priority VIP tactical armed response",
      ],
      popular: false,
    },
  ];

  const continuityProtocols = [
    {
      title: "Power Failure & Load-Shedding Failover",
      sub: "UPS + Inverter + Manual OB Continuity",
      detail:
        "Automatic switchover to UPS/inverter backup power for all monitoring screens, two-way radios, and routers. If outage exceeds 30 minutes, non-essential loads are shed and the Control Manager activates manual paper Occurrence Book (OB) reconciliation.",
    },
    {
      title: "Multi-Channel Comms Redundancy",
      sub: "VHF Radio ↔ GSM Cellular ↔ Supervisor Relay",
      detail:
        "If a primary radio repeater or cellular network degrades, operators immediately switch to the secondary channel via Area Supervisors. High-risk posts automatically shift to 30-minute welfare check-in intervals.",
    },
    {
      title: "Missed Check-In Welfare Dispatch",
      sub: "2-Call Rule & Mandatory Physical Inspection",
      detail:
        "If an officer misses a scheduled hourly check-in, the Control Room initiates two immediate callback attempts across primary and secondary channels. If unverified within 15 minutes (P3), an Armed Response or Supervisor unit is physically dispatched to the post.",
    },
    {
      title: "Backup Control Point Activation",
      sub: "07 Bornman Street Operations Command",
      detail:
        "Should the primary Control Room desk become unusable due to fire or structural hazard, monitoring transfers immediately to the Backup Control Point using the sealed Emergency Grab-Kit (master site directory, spare radio, power bank, and manual OB).",
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
            Division 2 • 24/7 Control Room &amp; Electronic Systems
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B1340] tracking-tight">
            24/7 Monitoring, Escalation Matrix &amp; Armed Response
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Governed by our audited Control Room Operating Manual and P1–P4 Incident Escalation Matrix at {COMPANY_DETAILS.headquarters.address}, delivering sub-5 minute tactical interception across Wolmaransstad, Maquassi Hills, and the N12 corridor.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a href={`tel:${COMPANY_DETAILS.hotlines.controlRoom.replace(/\s+/g, "")}`}>
              <Button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-11 px-5 gap-2 shadow-sm">
                <PhoneCall className="w-4 h-4" />
                Emergency Line: {COMPANY_DETAILS.hotlines.controlRoom}
              </Button>
            </a>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.hotlines.whatsappDispatch}?text=ALARM%20QUOTE%20REQUEST`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-slate-300 text-[#0B1340] hover:bg-slate-100 text-xs h-11 px-5 font-bold">
                WhatsApp Dispatch Desk
              </Button>
            </a>
          </div>
        </div>
      </section>

      <StatutoryTrustBanner />

      {/* Flagship Technical Capabilities Grid */}
      <section className="py-16 sm:py-20 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
              Electronic Defence Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Integrating digital occurrence telemetry, CCTV AI analytics, and armored tactical vehicles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-slate-200 shadow-xs hover:shadow-md transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B1340] text-white flex items-center justify-center ring-4 ring-red-50">
                  <Radio className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1340]">24/7 Central Control Room</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Headquartered at 07 Bornman Street, Wolmaransstad, our operations desk monitors alarm triggers and hourly guard welfare check-ins with redundant UPS/solar power, GSM failover, and dedicated VHF frequencies.
                </p>
                <div className="pt-2 text-xs font-bold text-red-600 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> 100% Load-Shedding Immune
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-xs hover:shadow-md transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B1340] text-white flex items-center justify-center ring-4 ring-red-50">
                  <Vault className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1340]">Smart Safes &amp; Drop Logistics</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automated cash drop-boxes with real-time deposit telematics, biometric authentication, dye-staining anti-tamper mechanisms, and scheduled armored Cash-In-Transit collection.
                </p>
                <div className="pt-2 text-xs font-bold text-red-600 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> High-Risk Commercial Shield
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-xs hover:shadow-md transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B1340] text-white flex items-center justify-center ring-4 ring-red-50">
                  <Video className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1340]">AI CCTV &amp; Thermal Perimeter</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Intelligent video analytics identifying human and vehicle intrusions before perimeter breach. Eliminates false alarms caused by animals or vegetation movement.
                </p>
                <div className="pt-2 text-xs font-bold text-red-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Instant Off-Site Cloud Verification
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* OFFICIAL P1-P4 CONTROL ROOM ESCALATION MATRIX */}
      <section className="py-16 sm:py-20 bg-slate-50/80 px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
            >
              Standard Operating Procedure • QBS-SOP-CR
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight flex items-center justify-center gap-2.5">
              <AlertTriangle className="w-7 h-7 text-red-600" />
              Control Room Incident Escalation Matrix (P1–P4)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every alarm signal, radio distress call, or missed check-in is classified by priority level with binding response times and mandatory executive escalation chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONTROL_ROOM_ESCALATION_MATRIX.map((level, idx) => (
              <Card
                key={level.priority}
                className={`bg-white shadow-sm overflow-hidden ${
                  idx === 0 ? "border-2 border-red-600 ring-4 ring-red-50" : "border-slate-200"
                }`}
              >
                <div className={`h-2 ${idx === 0 ? "bg-red-600" : idx === 1 ? "bg-[#0B1340]" : "bg-slate-300"}`} />
                <CardContent className="p-6 space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge
                      className={
                        idx === 0
                          ? "bg-red-600 text-white font-bold text-xs"
                          : "bg-[#0B1340] text-white font-bold text-xs"
                      }
                    >
                      {level.priority}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-red-600 flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                      <Clock className="w-3.5 h-3.5" /> Target: {level.responseWindow}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-[#0B1340]">{level.classification}</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      <strong className="text-[#0B1340]">Triggers:</strong> {level.examples}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div>
                      <span className="font-bold text-[#0B1340]">Mandatory Escalation Chain: </span>
                      <span className="text-red-700 font-semibold">{level.notifyChain}</span>
                    </div>
                    <div className="text-slate-600">
                      <span className="font-bold text-[#0B1340]">Action Protocol: </span>
                      {level.protocol}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Business Continuity & Contingency Plan Grid */}
          <div className="pt-6 space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h3 className="text-2xl font-extrabold text-[#0B1340]">
                Business Continuity &amp; Disaster Contingency Plan
              </h3>
              <p className="text-xs text-slate-600">
                Engineered for zero blind spots during Eskom load-shedding, cellular outages, or severe weather events.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {continuityProtocols.map((item) => (
                <div key={item.title} className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="text-xs font-bold text-[#0B1340]">{item.title}</div>
                  <div className="text-[11px] font-mono font-semibold text-red-600">{item.sub}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            {/* Downloadable Control Room SOPs */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-xs font-extrabold text-[#0B1340] uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                  <FileText className="w-4 h-4 text-red-600" />
                  Controlled Control Room SOP Manuals (PDF Downloads)
                </div>
                <p className="text-xs text-slate-600">
                  Inspect our official operational manuals, equipment control registers, and shift handover duty checklists.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <a
                  href="/docs/Control_Room_Operating_Manual_Escalation_Matrix.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-red-50 text-[#0B1340] hover:text-red-700 border border-slate-200 hover:border-red-200 font-semibold transition-colors"
                >
                  Operating Manual &amp; Escalation Matrix ↗
                </a>
                <a
                  href="/docs/Control_Room_Contingency_Plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-red-50 text-[#0B1340] hover:text-red-700 border border-slate-200 hover:border-red-200 font-semibold transition-colors"
                >
                  Contingency Plan ↗
                </a>
                <a
                  href="/docs/Equipment_Control_Room_SOP.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-red-50 text-[#0B1340] hover:text-red-700 border border-slate-200 hover:border-red-200 font-semibold transition-colors"
                >
                  Equipment Register SOP ↗
                </a>
                <a
                  href="/docs/Operational_SOP_Duty_Checklist.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-red-50 text-[#0B1340] hover:text-red-700 border border-slate-200 hover:border-red-200 font-semibold transition-colors"
                >
                  Shift Duty Checklist ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Pricing Grid */}
      <section className="py-16 sm:py-20 bg-white px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge
              variant="outline"
              className="border-red-200 text-red-700 bg-red-50 text-xs uppercase font-semibold"
            >
              Monitoring Packages
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1340] tracking-tight">
              Transparent Alarm Monitoring Plans
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              No hidden fees. Every plan includes 24/7 dedicated tactical response in our operational hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className={`flex flex-col justify-between bg-white shadow-md transition-all ${
                  pkg.popular
                    ? "border-2 border-red-600 ring-4 ring-red-50"
                    : "border-slate-200"
                }`}
              >
                <CardHeader className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <Badge
                      variant={pkg.popular ? "default" : "outline"}
                      className={pkg.popular ? "bg-red-600 text-white border-0" : "border-slate-300 text-[#0B1340]"}
                    >
                      {pkg.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-[#0B1340]">{pkg.name}</CardTitle>
                  <CardDescription className="text-xs text-slate-600 mt-1">{pkg.description}</CardDescription>
                  <div className="pt-4 text-2xl font-black text-red-600 font-mono">
                    {pkg.price}
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4">
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link
                    href={`/contact?plan=${encodeURIComponent(pkg.name)}`}
                    className="w-full"
                  >
                    <Button
                      className={`w-full font-bold text-xs h-10 ${
                        pkg.popular
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-[#0B1340] hover:bg-red-600 text-white"
                      }`}
                    >
                      Connect My Premises
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
