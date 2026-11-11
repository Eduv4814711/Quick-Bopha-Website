export const COMPANY_DETAILS = {
  name: "Quick Bopha Security (Pty) Ltd",
  registrationNumber: "2014/281440/07",
  psiraRegistration: "2639354",
  csdNumber: "MAAA0280738",
  vatNumber: "4020288215",
  incomeTaxNumber: "9586345176",
  tcsPin: "95D136823W",
  tcsExpiry: "08 October 2027",
  payeNumber: "7210835718",
  sdlNumber: "L210835718",
  uifNumber: "U210835718",
  setaCode: "13 (SASSETA) | Chamber 81902",
  popiaRegistration: "2026-068037",
  bbbeeLevel: "Level 1 Contributor (100% Black-Owned)",
  headquarters: {
    town: "Wolmaransstad",
    municipality: "Maquassi Hills Local Municipality",
    district: "Dr Kenneth Kaunda District",
    province: "North West Province",
    country: "South Africa",
    address: "07 Bornman Street, Wolmaransstad, 2630",
    n12Corridor: "N12 Transport Corridor (Wolmaransstad – Maquassi Hills – Klerksdorp – Potchefstroom)",
  },
  leadership: {
    managingDirector: {
      name: "Nkagisang William Dipitso",
      role: "Managing Director (Level 1 Executive Authority)",
      bio: "Visionary security executive spearheading statutory compliance, armed response expansion, corporate governance, and regional economic empowerment across the North West Province and N12 corridor.",
    },
    executiveManager: {
      name: "Aobakwe Nkagisang Dipitso",
      role: "Executive Manager (Level 2 Strategic & GRC Oversight)",
      bio: "Operational strategist overseeing the 9-Pillar Executive Compliance Dashboard, municipal tender governance, financial controls, and enterprise security architecture.",
    },
    operationalManager: {
      name: "Lwandile Njwaqu",
      role: "Operational Manager (Level 3 Field & Control Room Command)",
      bio: "Heads daily guarding deployments, 24/7 Control Room telemetry, site supervisor performance, firearm & equipment registers, and technical operational tender specifications.",
    },
    hrOfficer: {
      name: "Ms. Kgomotso Koloke",
      role: "Human Resources Officer (Workforce & Skills Development)",
      bio: "Leads HR policy architecture, NBCPSS & BCEA Sectoral Determination 6 compliance, PSiRA/SASSETA accredited skills development programs, and local vetting.",
    },
    informationOfficer: {
      name: "Mpho Mapulane",
      role: "Registered POPIA Information Officer (Reg: 2026-068037)",
      bio: "Duly registered with the Information Regulator (South Africa) under Section 55 of POPIA Act 4 of 2013, overseeing data privacy, CCTV/biometric governance, and PAIA compliance.",
    },
  },
  mottoes: {
    primary: "We Guard With Pride",
    secondary: "Trained Local, Deployed Local",
  },
  hotlines: {
    controlRoom: "018 011 9111",
    altPhone: "018 011 9112",
    fax: "086 562 2775",
    whatsappDispatch: "27180119111",
    tollFreeEmergency: "0800 911 247",
  },
  emails: {
    general: "info@quickbophasecurity.co.za",
    compliance: "compliance@quickbopha.co.za",
    accounts: "accounts@quickbopha.co.za",
    tenders: "tenders@quickbopha.co.za",
    academy: "academy@quickbopha.co.za",
  },
  alliances: [
    {
      name: "PSiRA Registered Security Service Provider",
      act: "Private Security Industry Regulation Act 56 of 2001 (Reg No: 2639354)",
      badge: "PSiRA: 2639354",
    },
    {
      name: "National Treasury CSD & SARS Good Standing",
      act: "CSD Supplier No: MAAA0280738 | SARS TCS PIN: 95D136823W | VAT: 4020288215",
      badge: "CSD: MAAA0280738",
    },
    {
      name: "NBCPSS & SASSETA Statutory Compliance",
      act: "National Bargaining Council & SASSETA Code 13 (PAYE / UIF / SDL Registered)",
      badge: "100% Wage Compliant",
    },
    {
      name: "Information Regulator (POPIA) Certified",
      act: "Protection of Personal Information Act 4 of 2013 (Cert No: 2026-068037)",
      badge: "POPIA: 2026-068037",
    },
  ],
};

export const ORGANOGRAM_LEVELS = [
  {
    level: "Level 1",
    role: "Managing Director",
    incumbent: "Nkagisang William Dipitso",
    mandate: "Ultimate statutory accountability, PSiRA Section 20/21 director obligations, strategic capital allocation, and P1 critical crisis authority.",
  },
  {
    level: "Level 2",
    role: "Executive Manager",
    incumbent: "Aobakwe Nkagisang Dipitso",
    mandate: "Direct oversight of the Operational Manager, Safety & Compliance Officer (GRC), Human Resources, and Municipal Tender Governance.",
  },
  {
    level: "Level 3",
    role: "Operational Manager & Departmental Leads",
    incumbent: "Lwandile Njwaqu (Operations) | Ms. Kgomotso Koloke (HR) | Mpho Mapulane (POPIA IO)",
    mandate: "24/7 Control Room command, site risk assessments, SOP enforcement, firearm & asset registers, HR policy compliance, and statutory training.",
  },
  {
    level: "Level 4",
    role: "Control Room Managers, Site Managers & Area Supervisors",
    incumbent: "Regional Command Across Wolmaransstad, Maquassi Hills, Klerksdorp & Potchefstroom",
    mandate: "Shift handovers, hourly check-in verification, P1–P3 incident escalation, roving post inspections, and fleet/equipment sign-off.",
  },
  {
    level: "Level 5",
    role: "PSiRA Registered Security Officers & Tactical Response Units",
    incumbent: "Grade A–E Guarding Personnel, Armed Response Officers & Control Room Operators",
    mandate: "Frontline perimeter protection, access control, Occurrence Book (OB) logging, hourly safety check-ins, and rapid armed intervention.",
  },
];

export const CONTROL_ROOM_ESCALATION_MATRIX = [
  {
    priority: "P1 — Critical",
    classification: "Life-Threatening / Major Site Emergency",
    examples: "Armed threat, active robbery, violent attack, fire/explosion, officer under duress, critical site breach",
    responseWindow: "Immediate (0 Min Delay)",
    notifyChain: "SAPS / Emergency Services + Armed Response + Site Supervisor + Control Manager + Operational Manager + Managing Director",
    protocol: "Continuous live radio/GPS tracking until scene is declared safe; formal Incident Report & Section 24 log before end of shift.",
  },
  {
    priority: "P2 — High",
    classification: "Confirmed Breach / Critical System or Post Failure",
    examples: "Intrusion alarm activation, CCTV/monitoring failure, suspected perimeter breach, critical post uncovered",
    responseWindow: "Within < 5 Minutes",
    notifyChain: "Tactical Response Unit + Area Supervisor + Control Room Manager + Operational Manager",
    protocol: "Immediate roving vehicle dispatch & reliever deployment; client representative notified upon initial verification.",
  },
  {
    priority: "P3 — Medium",
    classification: "Operational Anomaly / Missed Check-In",
    examples: "Single missed hourly check-in without confirmed danger, partial battery/radio fault, single officer absence with standby relief",
    responseWindow: "Within < 15 Minutes",
    notifyChain: "Control Room Manager + Area Supervisor",
    protocol: "Immediate callback verification; if unreachable after 2 attempts, physical welfare check dispatched to site and logged in OB.",
  },
  {
    priority: "P4 — Routine",
    classification: "Administrative / Minor Equipment or Roster Query",
    examples: "Uniform replacement request, minor torch/charger swap, routine shift roster inquiry",
    responseWindow: "Logged During Shift",
    notifyChain: "Duty Control Room Operator + Shift Handover Log",
    protocol: "Recorded in the Equipment Issue & Return Register or Daily Shift Handover Report for standard resolution.",
  },
];

export const COMPLIANCE_DASHBOARD_PILLARS = [
  {
    pillar: "Pillar 01",
    title: "PSiRA Compliance Tracker",
    metric: "100% Active Registration",
    detail: "Company certificate (Reg: 2639354), annual fees, and 30/60/90-day advance expiry tracking for every deployed officer's PSiRA grade.",
  },
  {
    pillar: "Pillar 02",
    title: "Statutory & Sectoral Scorecard",
    metric: "Zero Default Tolerance",
    detail: "NBCPSS Main Collective Agreement wages, COIDA Letter of Good Standing, UIF (U210835718), SDL (L210835718), PSSPF pension, and SARS TCS (95D136823W).",
  },
  {
    pillar: "Pillar 03",
    title: "Occupational Health & Safety (OHS)",
    metric: "OHS Act 85 of 1993",
    detail: "Site-specific Hazard Identification & Risk Assessments (HIRA), SHE rep appointments, PPE issuance registers, and emergency drill logs.",
  },
  {
    pillar: "Pillar 04",
    title: "Internal Governance & SOP Adherence",
    metric: "20+ Controlled SOPs",
    detail: "Version-controlled Standard Operating Procedures covering Control Room, Equipment Registers, Uniform Issue, Fleet KM, and Use of Force.",
  },
  {
    pillar: "Pillar 05",
    title: "Corrective Action Register (CAR)",
    metric: "≥ 90% On-Time Closure",
    detail: "Independent internal site inspections and audit findings tracked with root-cause analysis, assigned owners, and verified evidence closure.",
  },
  {
    pillar: "Pillar 06",
    title: "Workforce & Firearm Competency",
    metric: "SAPS FCA Act 60 of 2000",
    detail: "Strict pre-deployment verification of SAPS business-purpose firearm competencies, PrDP driving permits, First Aid, and SASSETA skills currency.",
  },
  {
    pillar: "Pillar 07",
    title: "Client & Municipal SLA Assurance",
    metric: "Attendance = Truth",
    detail: "Contractual post manning verification, patrol wand / biometric clock-in compliance, and monthly client SLA audit packs.",
  },
  {
    pillar: "Pillar 08",
    title: "Incident & Section 24 Register",
    metric: "< 48h Root-Cause Report",
    detail: "Formal investigation of all security breaches, use-of-force events, near-misses, and statutory Department of Employment & Labour reporting.",
  },
  {
    pillar: "Pillar 09",
    title: "POPIA & Information Security",
    metric: "Cert No: 2026-068037",
    detail: "Registered Information Officer oversight for visitor logs, biometric access data, CCTV retention schedules, and encrypted tender records.",
  },
];

export const ACCREDITED_TRAINING_ECOSYSTEM = [
  {
    code: "PSiRA",
    authority: "Private Security Industry Regulatory Authority",
    focus: "Mandatory statutory grading (Grades E, D, C, B, A), Specialized Armed Response, Cash-in-Transit (CIT), and Legal Principles.",
  },
  {
    code: "SASSETA (Code 13)",
    authority: "Safety and Security Sector Education & Training Authority",
    focus: "National Certificates in General Security Practices, accredited Learnerships, Skills Programmes, and Workplace Skills Plan (WSP) grants.",
  },
  {
    code: "QCTO",
    authority: "Quality Council for Trades and Occupations",
    focus: "Occupational Certificate: Security Officer (NQF Level 3) integrating structured theory, practical drills, and workplace experience.",
  },
  {
    code: "SAQCC & Services SETA",
    authority: "Technical Electronic Security & Management Qualifications",
    focus: "Alarm & CCTV installation competence, Fire Detection standards, Supervisory Leadership, and Customer Service Excellence.",
  },
];

export const TRI_DIVISIONS = [
  {
    id: "guarding",
    title: "Static & Tactical Guarding Services",
    subtitle: "High-Calibre Physical Protection",
    description: "Sovereign physical security, armed escorting, and perimeter defence engineered for commercial, industrial, municipal, and agricultural facilities along the N12 corridor.",
    features: [
      "PSiRA Grade A to C Armed & Unarmed Security Officers",
      "Agricultural farm protection & livestock perimeter monitoring",
      "Mining & heavy commercial infrastructure access control",
      "Executive VIP Close Protection & Rapid Convoy Escort",
      "Special Event Crowd Control & Stadium Asset Management",
      "Digital Occurrence Book (OB) real-time cloud incident logging",
    ],
    href: "/services",
    icon: "ShieldCheck",
  },
  {
    id: "alarms",
    title: "Electronic Alarms & Tactical Response",
    subtitle: "24/7 Monitored Telematics & Armed Interception",
    description: "Ultra-low-latency 24/7 Control Room dispatch, P1–P4 Escalation Matrix governance, AI CCTV analytics, and tactical armed response vehicles based at 07 Bornman Street, Wolmaransstad.",
    features: [
      "P1 Critical (< 0 min delay) & P2 High (< 5 min) Escalation Matrix",
      "AI-powered CCTV surveillance networks with perimeter tripwires",
      "UPS backup power & dual-channel radio/GSM failover continuity",
      "Direct radio telemetry link with SAPS Eyes and Ears (E2)",
      "Mandatory hourly/30-min high-risk guard welfare check-in tracking",
      "1-Click emergency smartphone dispatch & floating panic triggers",
    ],
    href: "/alarms",
    icon: "Radio",
  },
  {
    id: "academy",
    title: "Accredited Training Academy",
    subtitle: "PSiRA & SASSETA Aligned Security Qualifications",
    description: "Empowering regional North West communities through certified security education and our 6-Step HR Training Cycle. Comprehensive coursework from Grade E entry to Tactical Armed Response.",
    features: [
      "PSiRA Grades E, D, C, B, and A full qualification syllabus",
      "SASSETA (SETA Code 13) & QCTO Occupational Security alignment",
      "Accredited Firearm Competency (Handgun, Shotgun, Self-Loading Rifle)",
      "Cash-In-Transit (CIT) & Armed Response tactical procedures",
      "Guaranteed local recruitment funnel: Trained Local, Deployed Local",
      "Instant Yoco card and EFT online seat reservation",
    ],
    href: "/academy",
    icon: "GraduationCap",
  },
];

export interface AcademyCourseItem {
  id: string;
  name: string;
  level: string;
  duration: string;
  priceZar: number;
  depositZar: number;
  prerequisites: string;
  description: string;
}

export const ACADEMY_COURSES: AcademyCourseItem[] = [
  {
    id: "grade-e",
    name: "PSiRA Grade E (Entry Guarding)",
    level: "Foundational Security Practice",
    duration: "1 Week (Full Time)",
    priceZar: 1150,
    depositZar: 350,
    prerequisites: "South African ID / Valid Passport, Minimum Age 18",
    description: "Foundational guarding protocols, patrol inspection, basic legal principles, access register maintenance, and workplace safety compliance.",
  },
  {
    id: "grade-d",
    name: "PSiRA Grade D (Access Control & Patrolling)",
    level: "Operational Patrolling",
    duration: "1 Week (Full Time)",
    priceZar: 1250,
    depositZar: 400,
    prerequisites: "PSiRA Grade E Certificate",
    description: "Gate access management, biometric turnstile operations, vehicle search protocols, emergency radio communication, and incident report writing.",
  },
  {
    id: "grade-c",
    name: "PSiRA Grade C (Armed Protection & Sites)",
    level: "Core Industry Standard",
    duration: "1 Week (Full Time)",
    priceZar: 1450,
    depositZar: 500,
    prerequisites: "PSiRA Grade D Certificate",
    description: "The benchmark standard for commercial, municipal, and industrial guarding. Advanced incident intervention, legal rights of arrest, and site defense.",
  },
  {
    id: "grade-b",
    name: "PSiRA Grade B (Shift Supervisor & Site Commander)",
    level: "Supervisory",
    duration: "2 Weeks (Full Time)",
    priceZar: 1950,
    depositZar: 600,
    prerequisites: "PSiRA Grade C Certificate + 1 Year Experience",
    description: "Shift roster command, incident investigation, officer inspection, client liaison, post inspections, and statutory compliance enforcement.",
  },
  {
    id: "grade-a",
    name: "PSiRA Grade A (Security Risk Manager & Director)",
    level: "Executive & Management",
    duration: "2 Weeks (Full Time)",
    priceZar: 2500,
    depositZar: 800,
    prerequisites: "PSiRA Grade B Certificate",
    description: "Security risk assessment, physical security survey formulation, emergency contingency planning, labor relations, and enterprise contract management.",
  },
  {
    id: "armed-response",
    name: "Tactical Armed Response Specialist",
    level: "Specialized Tactical",
    duration: "2 Weeks (Intensive)",
    priceZar: 2800,
    depositZar: 900,
    prerequisites: "PSiRA Grade C + Firearm Competency (Handgun & Shotgun)",
    description: "Vehicle pursuit tactics, building penetration under alarm trigger, high-stress weapon retention, legal use of lethal force, and tactical disengagement.",
  },
  {
    id: "cit-specialist",
    name: "Cash-In-Transit (CIT) Tactical Escort",
    level: "High-Risk Specialized",
    duration: "2 Weeks (Intensive)",
    priceZar: 3200,
    depositZar: 1000,
    prerequisites: "PSiRA Grade C + Business Firearm Competency",
    description: "Armored bullion transport, drop-box cash transfer drills, ambush counter-measures, high-caliber rifle deployment, and tactical convoy coordination.",
  },
];

export const CORRIDOR_HUBS = [
  {
    name: "Wolmaransstad (Headquarters)",
    role: "Central Command, 24/7 Control Room & Armed Response Base",
    municipality: "Maquassi Hills (07 Bornman Street)",
    responseTime: "< 5 Minutes (P1/P2)",
    officersDeployed: "120+ Active Officers",
  },
  {
    name: "Maquassi Hills / Leeudoringstad",
    role: "Agricultural & Municipal Infrastructure Command",
    municipality: "Maquassi Hills",
    responseTime: "< 8 Minutes",
    officersDeployed: "65+ Active Officers",
  },
  {
    name: "Klerksdorp (Matlosana)",
    role: "Commercial & Mining Hub Support",
    municipality: "City of Matlosana",
    responseTime: "< 10 Minutes",
    officersDeployed: "90+ Active Officers",
  },
  {
    name: "Potchefstroom (JB Marks)",
    role: "Institutional & Industrial Facility Guarding",
    municipality: "JB Marks",
    responseTime: "< 12 Minutes",
    officersDeployed: "50+ Active Officers",
  },
];

export interface PublicGuardRateTier {
  id: string;
  grade: "Grade A" | "Grade B" | "Grade C" | "Grade D / E";
  title: string;
  subtitle: string;
  monthlyPricePerGuardZar: number;
  billingNote: string;
  popular?: boolean;
  features: string[];
}

export const DEFAULT_PUBLIC_GUARD_RATES: PublicGuardRateTier[] = [
  {
    id: "grade-d-e",
    grade: "Grade D / E",
    title: "Access Control & Perimeter Guard",
    subtitle: "PSiRA Grade D & E Certified",
    monthlyPricePerGuardZar: 9450,
    billingNote: "Per guard / month (excl. VAT)",
    popular: false,
    features: [
      "100% NBCPSS statutory wage & PSSPF compliant",
      "Gate access register & biometric turnstile control",
      "Hourly 24/7 Control Room radio welfare check-ins",
      "Full tactical uniform, baton, torch & PPE issued",
      "Digital Occurrence Book (OB) incident logging",
    ],
  },
  {
    id: "grade-c",
    grade: "Grade C",
    title: "Commercial, Municipal & Agri Guard",
    subtitle: "PSiRA Grade C • Core Industry Standard",
    monthlyPricePerGuardZar: 10372,
    billingNote: "Per guard / month (excl. VAT)",
    popular: true,
    features: [
      "100% NBCPSS statutory wage & benefit compliance",
      "Armed or unarmed protection for commercial & farm sites",
      "Live Plethora GPS patrol checkpoint telemetry",
      "24/7 roving Area Supervisor post inspections",
      "Sub-5 min Armed Response & P1/P2 escalation link",
    ],
  },
  {
    id: "grade-b",
    grade: "Grade B",
    title: "Shift Supervisor & Tactical Senior",
    subtitle: "PSiRA Grade B Supervisory Command",
    monthlyPricePerGuardZar: 11350,
    billingNote: "Per guard / month (excl. VAT)",
    popular: false,
    features: [
      "On-site shift roster command & post inspections",
      "High-risk mining, substation & industrial asset defense",
      "SAPS FCA Act 60 of 2000 firearm competency verified",
      "Formal incident investigation & Section 24 reporting",
      "Direct VHF/GSM priority link to Operational Manager",
    ],
  },
  {
    id: "grade-a",
    grade: "Grade A",
    title: "Site Commander & Close Protection",
    subtitle: "PSiRA Grade A Executive Risk Officer",
    monthlyPricePerGuardZar: 12450,
    billingNote: "Per guard / month (excl. VAT)",
    popular: false,
    features: [
      "Senior Site Commander & VIP Close Protection (CPO)",
      "Site-specific HIRA risk assessments & SLA governance",
      "Multi-post command, client liaison & audit pack sign-off",
      "Tactical convoy escort & high-value asset protection",
      "Priority P1 executive escalation line to Managing Director",
    ],
  },
];

export interface ServiceCategoryItem {
  id: string;
  title: string;
  iconName: "Warehouse" | "Tractor" | "HardHat" | "Car";
  startingPriceZar: number;
  billingUnit: string;
  description: string;
  points: string[];
}

export const DEFAULT_SERVICE_CATEGORIES: ServiceCategoryItem[] = [
  {
    id: "static-commercial",
    title: "Static Commercial & Industrial Guarding",
    iconName: "Warehouse",
    startingPriceZar: 9450,
    billingUnit: "per guard / month (excl. VAT)",
    description:
      "24/7 post defence and perimeter security for commercial depots, retail centers, warehouses, and municipal complexes.",
    points: [
      "PSiRA Grade A, B, and C armed or unarmed officers",
      "Biometric turnstile and vehicle scale access control",
      "Digital Occurrence Book (OB) real-time incident transmission",
      "Continuous supervision via roving tactical fleet commanders",
    ],
  },
  {
    id: "agri-rural",
    title: "Agricultural & Rural Farm Security",
    iconName: "Tractor",
    startingPriceZar: 10372,
    billingUnit: "per guard / month (excl. VAT)",
    description:
      "Specialized rural anti-intrusion patrols safeguarding grain silos, livestock herds, and farmsteads along the N12 corridor.",
    points: [
      "Thermal night vision and perimeter spotlight units",
      "Livestock theft mitigation & boundary fence patrols",
      "Direct radio link to local farm watch & SAPS Sector policing",
      "Solar-backed wireless intrusion sensor monitoring",
    ],
  },
  {
    id: "mining-infrastructure",
    title: "Mining Concession & Critical Infrastructure",
    iconName: "HardHat",
    startingPriceZar: 11350,
    billingUnit: "per guard / month (excl. VAT)",
    description:
      "High-security access protocols and asset protection engineered for North West mining operations and municipal utility substations.",
    points: [
      "Gold, diamond, and heavy equipment asset protection",
      "Randomized drug/alcohol breathalyzer gate screening",
      "Strike, protest, and labor dispute crowd de-escalation",
      "Copper cable theft and transformer substation defense",
    ],
  },
  {
    id: "vip-convoy",
    title: "VIP Close Protection & Convoy Escort",
    iconName: "Car",
    startingPriceZar: 3500,
    billingUnit: "per CPO officer / day (or R 12,450 / mo)",
    description:
      "Armed executive escort and VIP transit security across the Dr Kenneth Kaunda District and inter-provincial corridors.",
    points: [
      "Tactical Close Protection Officers (CPOs) with Grade A certification",
      "Armored ballistic vehicle convoys & secure transport",
      "Advance route reconnaissance & counter-ambush planning",
      "Discreet, protocol-trained executive personal protection",
    ],
  },
];

export interface AlarmPackageItem {
  id: string;
  name: string;
  badge: string;
  monthlyPriceZar: number;
  billingUnit: string;
  description: string;
  features: string[];
  popular: boolean;
}

export const DEFAULT_ALARM_PACKAGES: AlarmPackageItem[] = [
  {
    id: "alarm-residential",
    name: "Residential & Family Estate",
    badge: "Homeowners",
    monthlyPriceZar: 495,
    billingUnit: "/ month",
    description:
      "Complete perimeter and interior alarm monitoring with dedicated armed tactical dispatch in Wolmaransstad.",
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
    id: "alarm-agricultural",
    name: "Agricultural Farmstead Security",
    badge: "Most Popular",
    monthlyPriceZar: 850,
    billingUnit: "/ month",
    description:
      "Engineered specifically for farms, smallholdings, and remote homesteads along the N12 corridor.",
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
    id: "alarm-commercial",
    name: "Commercial & Retail Smart Safe",
    badge: "Business & Retail",
    monthlyPriceZar: 1450,
    billingUnit: "/ month",
    description:
      "High-security cash handling, drop-box telematics, and multi-zone intrusion detection for businesses.",
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


