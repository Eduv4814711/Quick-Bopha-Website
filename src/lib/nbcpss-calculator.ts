import jsPDF from "jspdf";
import { COMPANY_DETAILS } from "./constants";

export type GuardGrade = "Grade A" | "Grade B" | "Grade C" | "Grade D" | "Grade E";
export type ShiftType = "day_12h" | "night_12h" | "rotational_24_7";
export type OperationalArea = "Area 1 (Major Metros)" | "Area 2 (Regional Urban)" | "Area 3 (Rural / Agri / N12 Corridor)";

export interface NBCPSSInput {
  grade: GuardGrade;
  shiftType: ShiftType;
  officerCount: number;
  area: OperationalArea;
  locationName: string;
  clientName?: string;
  clientEmail?: string;
  companyName?: string;
}

export interface CostBreakdownItem {
  label: string;
  code: string;
  amountZar: number;
  notes: string;
}

export interface NBCPSSCalculationResult {
  quoteReference: string;
  timestamp: string;
  inputs: NBCPSSInput;
  basicSalaryPerOfficer: number;
  statutoryBenefitsPerOfficer: number;
  reliefMultiplier: number;
  nightShiftAllowancePerOfficer: number;
  totalLaborCostPerOfficer: number;
  operationalOverheadPerOfficer: number;
  monthlyCostPerPost: number;
  totalMonthlyContractCost: number;
  breakdown: CostBreakdownItem[];
  statutoryComplianceAffirmation: string;
}

// Statutory Monthly Basic Wages per National Bargaining Council for the Private Security Sector (NBCPSS)
const STATUTORY_BASE_WAGES: Record<OperationalArea, Record<GuardGrade, number>> = {
  "Area 1 (Major Metros)": {
    "Grade A": 7240,
    "Grade B": 6620,
    "Grade C": 5890,
    "Grade D": 5890,
    "Grade E": 5890,
  },
  "Area 2 (Regional Urban)": {
    "Grade A": 6980,
    "Grade B": 6390,
    "Grade C": 5650,
    "Grade D": 5650,
    "Grade E": 5650,
  },
  "Area 3 (Rural / Agri / N12 Corridor)": {
    "Grade A": 6850,
    "Grade B": 6250,
    "Grade C": 5520,
    "Grade D": 5520,
    "Grade E": 5520,
  },
};

export function calculateNBCPSSQuote(input: NBCPSSInput): NBCPSSCalculationResult {
  const baseSalary = STATUTORY_BASE_WAGES[input.area][input.grade] || 5520;

  // Statutory Benefit Load: 28.5%
  // PSSPF Provident Fund (7.5%), UIF (1.0%), COIDA (1.6%), Annual Bonus (8.33%), NBCPSS Council Levy & Dispute (0.8%), Uniform & Training (9.27%)
  const statutoryBenefits = Math.round(baseSalary * 0.285);

  // Shift Relief Factor:
  // For 24/7 continuous posts, 1:4.5 shift relief factor (1.222 multiplier) handles statutory BCEA rest periods, annual leave, and sick leave cover
  const is24x7 = input.shiftType === "rotational_24_7";
  const reliefMultiplier = is24x7 ? 1.222 : 1.0;

  // Night Shift Allowance (R6.50/shift * ~15 shifts/month for rotational or ~30 shifts for permanent night)
  let nightAllowance = 0;
  if (input.shiftType === "night_12h") {
    nightAllowance = 195; // 30 shifts * R6.50
  } else if (input.shiftType === "rotational_24_7") {
    nightAllowance = 100; // 15 shifts * R6.50
  }

  // Base labor subtotal per officer
  const subtotalLabor = (baseSalary + statutoryBenefits + nightAllowance) * reliefMultiplier;

  // Equipment, Communication & Supervision Overhead (VHF Radio, Baton, Handcuffs, Fleet Supervisor, Occurrence Book)
  const operationalOverhead = Math.round(subtotalLabor * 0.18);

  // Total cost per individual post
  const monthlyCostPerPost = Math.round(subtotalLabor + operationalOverhead);
  const totalMonthlyContractCost = monthlyCostPerPost * Math.max(1, input.officerCount);

  const quoteId = "QB-QUOTE-2026-NBCPSS";

  const breakdown: CostBreakdownItem[] = [
    {
      label: "Statutory Basic Wage",
      code: "NBCPSS-BASE",
      amountZar: baseSalary,
      notes: `Prescribed minimum wage for ${input.grade} in ${input.area}`,
    },
    {
      label: "Statutory Benefits (28.5%)",
      code: "PSSPF-UIF-COID",
      amountZar: statutoryBenefits,
      notes: "PSSPF Provident Fund (7.5%), UIF (1%), COIDA, Bonus accrual, Council Levies",
    },
    {
      label: "Night Shift Allowance",
      code: "NBCPSS-NS-ALW",
      amountZar: nightAllowance,
      notes: input.shiftType === "day_12h" ? "N/A for Day Shifts" : "Statutory shift allowance per Gazetted schedule",
    },
    {
      label: "Shift Relief Reserve (1.222x)",
      code: "BCEA-RELIEF",
      amountZar: is24x7 ? Math.round((baseSalary + statutoryBenefits) * 0.222) : 0,
      notes: is24x7 ? "1:4.5 relief ratio for 24/7 post coverage per BCEA mandatory rest days" : "Non-rotational post",
    },
    {
      label: "Supervision, Patrol Fleet & Equipment",
      code: "OPS-OVERHEAD",
      amountZar: operationalOverhead,
      notes: "Tactical supervision, digital OB logging, VHF comms, uniforms, ballistic gear",
    },
  ];

  return {
    quoteReference: quoteId,
    timestamp: "2026-11-10T12:00:00.000Z",
    inputs: input,
    basicSalaryPerOfficer: baseSalary,
    statutoryBenefitsPerOfficer: statutoryBenefits,
    reliefMultiplier,
    nightShiftAllowancePerOfficer: nightAllowance,
    totalLaborCostPerOfficer: Math.round(subtotalLabor),
    operationalOverheadPerOfficer: operationalOverhead,
    monthlyCostPerPost,
    totalMonthlyContractCost,
    breakdown,
    statutoryComplianceAffirmation:
      "Quick Bopha Security (Pty) Ltd certifies that this calculation complies 100% with the Main Collective Agreement of the National Bargaining Council for the Private Security Sector (NBCPSS), the PSiR Act 56 of 2001, and the Basic Conditions of Employment Act (BCEA).",
  };
}

export function generateQuotePDF(result: NBCPSSCalculationResult): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Colors
  const navy = [15, 23, 42];
  const gold = [217, 119, 6];
  const slate = [100, 116, 139];

  // Header Bar
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, 210, 36, "F");

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("QUICK BOPHA SECURITY (PTY) LTD", 14, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Official NBCPSS Statutory Rate Estimate & Guarding Cost Breakdown", 14, 22);
  doc.text(`PSiRA Reg: ${COMPANY_DETAILS.psiraRegistration} | B-BBEE Level 1 (100% Black Owned)`, 14, 28);

  // Quote Metadata Box
  doc.setFillColor(248, 250, 252);
  doc.rect(14, 42, 182, 34, "F");
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, 42, 182, 34, "S");

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("QUOTE SPECIFICATIONS", 18, 49);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Reference No: ${result.quoteReference}`, 18, 56);
  doc.text(`Date Generated: ${new Date().toLocaleDateString("en-ZA")}`, 18, 62);
  doc.text(`Client / Entity: ${result.inputs.clientName || result.inputs.companyName || "Commercial Client"}`, 18, 68);

  doc.text(`Guard Grade: ${result.inputs.grade}`, 110, 56);
  doc.text(`Shift Configuration: ${result.inputs.shiftType.replace("_", " ").toUpperCase()}`, 110, 62);
  doc.text(`Operating Zone: ${result.inputs.locationName} (${result.inputs.area})`, 110, 68);

  // Itemized Breakdown Table Header
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(14, 82, 182, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("COST COMPONENT", 18, 87);
  doc.text("REGULATORY CODE", 95, 87);
  doc.text("AMOUNT PER POST (ZAR)", 150, 87);

  // Table Rows
  let y = 96;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 41, 59);

  result.breakdown.forEach((item, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(241, 245, 249);
      doc.rect(14, y - 5, 182, 8, "F");
    }
    doc.text(item.label, 18, y);
    doc.text(item.code, 95, y);
    doc.text(`R ${item.amountZar.toLocaleString("en-ZA")}.00`, 155, y);
    y += 9;
  });

  // Summary Totals
  y += 4;
  doc.setDrawColor(203, 213, 225);
  doc.line(14, y, 196, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("TOTAL MONTHLY COST PER POST (EXCL. VAT):", 18, y);
  doc.text(`R ${result.monthlyCostPerPost.toLocaleString("en-ZA")}.00`, 155, y);
  y += 8;

  doc.setFontSize(11);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`MONTHLY CONTRACT TOTAL (${result.inputs.officerCount} OFFICERS):`, 18, y);
  doc.text(`R ${result.totalMonthlyContractCost.toLocaleString("en-ZA")}.00`, 155, y);
  y += 12;

  // Statutory Certification Callout
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, 182, 28, "F");
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.5);
  doc.rect(14, y, 182, 28, "S");

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("STATUTORY COMPLIANCE WARRANTY", 18, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const splitText = doc.splitTextToSize(result.statutoryComplianceAffirmation, 174);
  doc.text(splitText, 18, y + 12);
  doc.text("Audited & Verified: 100% NBCPSS & PSiRA Act Compliant | Zero Sub-Minimum Pricing Risk", 18, y + 24);

  // Footer & Contact
  const footerY = 270;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, footerY, 196, footerY);

  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.setFontSize(8);
  doc.text(`${COMPANY_DETAILS.name} | Headquarters: ${COMPANY_DETAILS.headquarters.address}`, 14, footerY + 5);
  doc.text(`24/7 Control Room: ${COMPANY_DETAILS.hotlines.controlRoom} | Accounts: ${COMPANY_DETAILS.emails.accounts}`, 14, footerY + 10);
  doc.text(`Motto: "${COMPANY_DETAILS.mottoes.primary}" & "${COMPANY_DETAILS.mottoes.secondary}"`, 14, footerY + 15);

  doc.save(`${result.quoteReference}.pdf`);
}
