import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { calculateNBCPSSQuote } from "../src/lib/nbcpss-calculator";
import { STATUTORY_DOCUMENTS } from "../src/lib/compliance-vault";
import { DEFAULT_PUBLIC_GUARD_RATES } from "../src/lib/admin-store";
import {
  COMPANY_DETAILS,
  TRI_DIVISIONS,
  ORGANOGRAM_LEVELS,
  CONTROL_ROOM_ESCALATION_MATRIX,
  COMPLIANCE_DASHBOARD_PILLARS,
} from "../src/lib/constants";

console.log("=== RUNNING QUICK BOPHA AUTOMATED VERIFICATION SUITE ===");

// Test 1: Verify Governance Anchors & RAG Statutory Numbers
console.log("\n[TEST 1] Verifying Corporate Identity, Organogram & RAG Statutory Anchors...");
assert.strictEqual(COMPANY_DETAILS.name, "Quick Bopha Security (Pty) Ltd");
assert.strictEqual(COMPANY_DETAILS.registrationNumber, "2014/281440/07");
assert.strictEqual(COMPANY_DETAILS.psiraRegistration, "2639354");
assert.strictEqual(COMPANY_DETAILS.csdNumber, "MAAA0280738");
assert.strictEqual(COMPANY_DETAILS.vatNumber, "4020288215");
assert.strictEqual(COMPANY_DETAILS.tcsPin, "95D136823W");
assert.strictEqual(COMPANY_DETAILS.popiaRegistration, "2026-068037");
assert.strictEqual(COMPANY_DETAILS.leadership.managingDirector.name, "Nkagisang William Dipitso");
assert.strictEqual(COMPANY_DETAILS.leadership.executiveManager.name, "Aobakwe Nkagisang Dipitso");
assert.strictEqual(COMPANY_DETAILS.leadership.operationalManager.name, "Lwandile Njwaqu");
assert.strictEqual(COMPANY_DETAILS.leadership.hrOfficer.name, "Ms. Kgomotso Koloke");
assert.strictEqual(COMPANY_DETAILS.leadership.informationOfficer.name, "Mpho Mapulane");
assert.strictEqual(COMPANY_DETAILS.headquarters.address, "07 Bornman Street, Wolmaransstad, 2630");
assert.strictEqual(COMPANY_DETAILS.hotlines.controlRoom, "018 011 9111");
assert.strictEqual(ORGANOGRAM_LEVELS.length, 5);
assert.strictEqual(CONTROL_ROOM_ESCALATION_MATRIX.length, 4);
assert.strictEqual(COMPLIANCE_DASHBOARD_PILLARS.length, 9);
console.log("✓ Corporate governance anchors, 5-tier organogram, P1-P4 matrix, and 9-pillar GRC verified.");

// Test 2: Verify Tri-Division Revenue Engine
console.log("\n[TEST 2] Verifying Tri-Division Structure...");
assert.strictEqual(TRI_DIVISIONS.length, 3);
assert.deepStrictEqual(
  TRI_DIVISIONS.map((d) => d.id),
  ["guarding", "alarms", "academy"]
);
console.log("✓ Tri-Division structure verified (Guarding, Alarms, Academy).");

// Test 3: NBCPSS Calculation Engine (Grade C, Rotational 24/7 in Area 3 + Custom Admin Overhead)
console.log("\n[TEST 3] Verifying Admin NBCPSS Statutory Rate Calculation (Grade C, 24/7)...");
const quoteArea3GradeC = calculateNBCPSSQuote({
  grade: "Grade C",
  shiftType: "rotational_24_7",
  officerCount: 4,
  area: "Area 3 (Rural / Agri / N12 Corridor)",
  locationName: "Wolmaransstad / Maquassi Hills",
});

assert.strictEqual(quoteArea3GradeC.basicSalaryPerOfficer, 5520);
assert.strictEqual(quoteArea3GradeC.statutoryBenefitsPerOfficer, 1573);
assert.strictEqual(quoteArea3GradeC.reliefMultiplier, 1.222);
assert.strictEqual(quoteArea3GradeC.overheadPercentage, 18);
assert.strictEqual(
  quoteArea3GradeC.totalMonthlyContractCost,
  quoteArea3GradeC.monthlyCostPerPost * 4
);

const customOverheadQuote = calculateNBCPSSQuote({
  grade: "Grade C",
  shiftType: "rotational_24_7",
  officerCount: 1,
  area: "Area 3 (Rural / Agri / N12 Corridor)",
  locationName: "Wolmaransstad / Maquassi Hills",
  overheadPercentage: 25,
});
assert.strictEqual(customOverheadQuote.overheadPercentage, 25);
assert.ok(customOverheadQuote.monthlyCostPerPost > quoteArea3GradeC.monthlyCostPerPost);
console.log(`✓ Grade C 24/7 Rate per post (18% overhead): R ${quoteArea3GradeC.monthlyCostPerPost} | (25% overhead): R ${customOverheadQuote.monthlyCostPerPost}`);

// Test 4: Public Per-Guard Pricing Cards & Removal of Estimator from Public Pages
console.log("\n[TEST 4] Verifying Public Guard Pricing Tiers & Admin-Only Estimator Isolation...");
assert.strictEqual(DEFAULT_PUBLIC_GUARD_RATES.length, 4);
assert.deepStrictEqual(
  DEFAULT_PUBLIC_GUARD_RATES.map((r) => r.grade),
  ["Grade D / E", "Grade C", "Grade B", "Grade A"]
);

const homePageSource = fs.readFileSync(path.join(process.cwd(), "src/app/page.tsx"), "utf-8");
const servicesPageSource = fs.readFileSync(path.join(process.cwd(), "src/app/services/page.tsx"), "utf-8");
const adminPageSource = fs.readFileSync(path.join(process.cwd(), "src/app/admin/page.tsx"), "utf-8");

assert.ok(!homePageSource.includes("NBCPSSRateCalculator"), "Home page must not include NBCPSSRateCalculator");
assert.ok(!servicesPageSource.includes("NBCPSSRateCalculator"), "Services page must not include NBCPSSRateCalculator");
assert.ok(homePageSource.includes("PublicGuardPricingCards"), "Home page must render PublicGuardPricingCards");
assert.ok(servicesPageSource.includes("PublicGuardPricingCards"), "Services page must render PublicGuardPricingCards");
assert.ok(adminPageSource.includes("NBCPSSRateCalculator"), "Admin portal must render NBCPSSRateCalculator");
console.log("✓ Public pages display only Per-Guard Pricing Cards; NBCPSS Estimator is isolated to /admin.");

// Test 5: Compliance Vault Document Catalog
console.log("\n[TEST 5] Verifying Statutory Compliance Vault Catalog...");
assert.strictEqual(STATUTORY_DOCUMENTS.length, 7);
const docIds = STATUTORY_DOCUMENTS.map((d) => d.id);
assert.ok(docIds.includes("psira-license"), "Missing PSiRA Corporate License");
assert.ok(docIds.includes("sars-tax-pin"), "Missing SARS Tax Pin");
assert.ok(docIds.includes("popia-cert"), "Missing POPIA Certificate");
assert.ok(docIds.includes("csd-bbbee"), "Missing CSD & B-BBEE Dossier");
assert.ok(docIds.includes("sars-emp-sasseta"), "Missing SARS EMP & SASSETA");
assert.ok(docIds.includes("nbcpss-coida"), "Missing NBCPSS & COIDA");
assert.ok(docIds.includes("control-room-sop"), "Missing Control Room SOP");
console.log("✓ All 7 statutory compliance items verified in vault.");

console.log("\n=======================================================");
console.log(" ALL AUTOMATED UNIT TESTS PASSED SUCCESSFULLY! (5/5) ");
console.log("=======================================================");
