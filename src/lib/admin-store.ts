import fs from "node:fs";
import path from "node:path";
import {
  DEFAULT_PUBLIC_GUARD_RATES,
  DEFAULT_SERVICE_CATEGORIES,
  DEFAULT_ALARM_PACKAGES,
  ACADEMY_COURSES,
  PublicGuardRateTier,
  ServiceCategoryItem,
  AlarmPackageItem,
  AcademyCourseItem,
} from "./constants";

export type {
  PublicGuardRateTier,
  ServiceCategoryItem,
  AlarmPackageItem,
  AcademyCourseItem,
};

export {
  DEFAULT_PUBLIC_GUARD_RATES,
  DEFAULT_SERVICE_CATEGORIES,
  DEFAULT_ALARM_PACKAGES,
  ACADEMY_COURSES,
};

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
  serviceCategoriesPricing: ServiceCategoryItem[];
  alarmPackagesPricing: AlarmPackageItem[];
  academyCoursesPricing: AcademyCourseItem[];
  auditLogs: {
    quotes: QuoteAuditItem[];
    tenders: TenderAuditItem[];
    academy: AcademyAuditItem[];
    careers: CareerAuditItem[];
  };
}

const INITIAL_STORE_DATA: AdminStoreData = {
  publicGuardPricing: DEFAULT_PUBLIC_GUARD_RATES,
  serviceCategoriesPricing: DEFAULT_SERVICE_CATEGORIES,
  alarmPackagesPricing: DEFAULT_ALARM_PACKAGES,
  academyCoursesPricing: ACADEMY_COURSES,
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
        monthlyCostPerPost: 17787.16,
        totalMonthlyContractCost: 71148.64,
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
      const parsed = JSON.parse(raw) as Partial<AdminStoreData>;
      const merged: AdminStoreData = {
        publicGuardPricing: parsed.publicGuardPricing?.length
          ? parsed.publicGuardPricing
          : DEFAULT_PUBLIC_GUARD_RATES,
        serviceCategoriesPricing: parsed.serviceCategoriesPricing?.length
          ? parsed.serviceCategoriesPricing
          : DEFAULT_SERVICE_CATEGORIES,
        alarmPackagesPricing: parsed.alarmPackagesPricing?.length
          ? parsed.alarmPackagesPricing
          : DEFAULT_ALARM_PACKAGES,
        academyCoursesPricing: parsed.academyCoursesPricing?.length
          ? parsed.academyCoursesPricing
          : ACADEMY_COURSES,
        auditLogs: parsed.auditLogs || INITIAL_STORE_DATA.auditLogs,
      };
      memoryStore = merged;
      return merged;
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

export function updateAllPricing(payload: {
  publicGuardPricing?: PublicGuardRateTier[];
  serviceCategoriesPricing?: ServiceCategoryItem[];
  alarmPackagesPricing?: AlarmPackageItem[];
  academyCoursesPricing?: AcademyCourseItem[];
}): AdminStoreData {
  const store = readAdminStore();
  if (Array.isArray(payload.publicGuardPricing) && payload.publicGuardPricing.length > 0) {
    store.publicGuardPricing = payload.publicGuardPricing;
  }
  if (Array.isArray(payload.serviceCategoriesPricing) && payload.serviceCategoriesPricing.length > 0) {
    store.serviceCategoriesPricing = payload.serviceCategoriesPricing;
  }
  if (Array.isArray(payload.alarmPackagesPricing) && payload.alarmPackagesPricing.length > 0) {
    store.alarmPackagesPricing = payload.alarmPackagesPricing;
  }
  if (Array.isArray(payload.academyCoursesPricing) && payload.academyCoursesPricing.length > 0) {
    store.academyCoursesPricing = payload.academyCoursesPricing;
  }
  writeAdminStore(store);
  return store;
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
