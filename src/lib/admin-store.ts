import fs from "node:fs";
import path from "node:path";

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

export interface QuoteAuditItem {
  id: string;
  quoteReference: string;
  clientName: string;
  clientEmail?: string;
  grade: string;
  shiftType: string;
  officerCount: number;
  area: string;
  monthlyCostPerPost: number;
  totalMonthlyContractCost: number;
  timestamp: string;
}

export interface TenderAuditItem {
  id: string;
  officerName: string;
  organization: string;
  businessEmail: string;
  phoneNumber: string;
  tenderReference: string;
  documentsCount: number;
  timestamp: string;
}

export interface AcademyAuditItem {
  id: string;
  enrolmentRef: string;
  candidate: string;
  phone: string;
  course: string;
  intake: string;
  paymentOption: string;
  amountZar: number;
  timestamp: string;
}

export interface CareerAuditItem {
  id: string;
  fullName: string;
  saIdNumber: string;
  phoneNumber: string;
  residentialTown: string;
  psiraGrade: string;
  psiraRegNumber: string;
  hasFirearmCompetency: boolean;
  hasDriversLicense: boolean;
  timestamp: string;
}

export interface AdminStoreData {
  publicGuardPricing: PublicGuardRateTier[];
  auditLogs: {
    quotes: QuoteAuditItem[];
    tenders: TenderAuditItem[];
    academy: AcademyAuditItem[];
    careers: CareerAuditItem[];
  };
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

const INITIAL_STORE_DATA: AdminStoreData = {
  publicGuardPricing: DEFAULT_PUBLIC_GUARD_RATES,
  auditLogs: {
    quotes: [
      {
        id: "QT-1001",
        quoteReference: "QB-QUOTE-2026-NBCPSS",
        clientName: "Maquassi Commercial Grain Silos",
        clientEmail: "procurement@maquassigrain.co.za",
        grade: "Grade C",
        shiftType: "rotational_24_7",
        officerCount: 4,
        area: "Area 3 (Rural / Agri / N12 Corridor)",
        monthlyCostPerPost: 10372,
        totalMonthlyContractCost: 41488,
        timestamp: "2026-11-10T14:20:00.000Z",
      },
    ],
    tenders: [
      {
        id: "AUD-2001",
        officerName: "Sipho Khumalo",
        organization: "Maquassi Hills Local Municipality",
        businessEmail: "skhumalo@maquassihills.gov.za",
        phoneNumber: "018 596 1000",
        tenderReference: "MHLM/SCM/SEC/2026/04",
        documentsCount: 7,
        timestamp: "2026-11-10T15:10:00.000Z",
      },
    ],
    academy: [
      {
        id: "AC-3001",
        enrolmentRef: "QBA-2026-8419",
        candidate: "Thabo Molefe",
        phone: "082 419 2210",
        course: "PSiRA Grade C (Armed Protection & Sites)",
        intake: "Next Monday Intake (Wolmaransstad Campus)",
        paymentOption: "deposit",
        amountZar: 500,
        timestamp: "2026-11-10T16:05:00.000Z",
      },
    ],
    careers: [
      {
        id: "CR-4001",
        fullName: "Kgosietsile Mokoena",
        saIdNumber: "9408125412081",
        phoneNumber: "073 812 9901",
        residentialTown: "Wolmaransstad",
        psiraGrade: "Grade C",
        psiraRegNumber: "2918471",
        hasFirearmCompetency: true,
        hasDriversLicense: true,
        timestamp: "2026-11-10T16:40:00.000Z",
      },
    ],
  },
};

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "admin-store.json");

let memoryStore: AdminStoreData = structuredClone(INITIAL_STORE_DATA);

export function readAdminStore(): AdminStoreData {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw) as AdminStoreData;
      memoryStore = parsed;
      return parsed;
    }
    writeAdminStore(memoryStore);
    return memoryStore;
  } catch {
    return memoryStore;
  }
}

export function writeAdminStore(data: AdminStoreData): void {
  memoryStore = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Fallback to in-memory store if filesystem is read-only
  }
}

export function updatePublicGuardPricing(tiers: PublicGuardRateTier[]): PublicGuardRateTier[] {
  const store = readAdminStore();
  store.publicGuardPricing = tiers;
  writeAdminStore(store);
  return store.publicGuardPricing;
}

export function appendQuoteLog(item: Omit<QuoteAuditItem, "id">): void {
  const store = readAdminStore();
  store.auditLogs.quotes.unshift({
    id: `QT-${Date.now()}`,
    ...item,
  });
  writeAdminStore(store);
}

export function appendTenderLog(item: Omit<TenderAuditItem, "id">): void {
  const store = readAdminStore();
  store.auditLogs.tenders.unshift({
    id: `AUD-${Date.now()}`,
    ...item,
  });
  writeAdminStore(store);
}

export function appendAcademyLog(item: Omit<AcademyAuditItem, "id">): void {
  const store = readAdminStore();
  store.auditLogs.academy.unshift({
    id: `AC-${Date.now()}`,
    ...item,
  });
  writeAdminStore(store);
}

export function appendCareerLog(item: Omit<CareerAuditItem, "id">): void {
  const store = readAdminStore();
  store.auditLogs.careers.unshift({
    id: `CR-${Date.now()}`,
    ...item,
  });
  writeAdminStore(store);
}
