import jsPDF from "jspdf";
import { COMPANY_DETAILS } from "./constants";

export type GuardGrade = "Grade A" | "Grade B" | "Grade C" | "Grade D" | "Grade E";
export type ShiftType = "day_12h" | "night_12h" | "rotational_24_7";
export type OperationalArea =
  | "Area 1 & 2 (Urban & Metros)"
  | "Area 1 (Major Metros)"
  | "Area 2 (Regional Urban)"
  | "Area 3 (Rural / Agri / N12 Corridor)";

export interface NBCPSSInput {
  grade: GuardGrade;
  shiftType: ShiftType;
  officerCount: number;
  area: OperationalArea;
  locationName: string;
  overheadPercentage?: number;
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
  overheadPercentage: number;
  operationalOverheadPerOfficer: number;
  monthlyCostPerPost: number;
  totalMonthlyContractCost: number;
  vatStatus: string;
  breakdown: CostBreakdownItem[];
  statutoryComplianceAffirmation: string;
}

// Official Quick Bopha Security Direct Cost Schedules (from AREA 1&2 DIRECT COST.pdf and AREA 3 DIRECT COST.pdf)
export const OFFICIAL_DIRECT_COST_RATES: Record<OperationalArea, Record<GuardGrade, number>> = {
  "Area 1 & 2 (Urban & Metros)": {
    "Grade A": 21431.90,
    "Grade B": 19989.50,
    "Grade C": 18479.61,
    "Grade D": 18479.61,
    "Grade E": 18479.61,
  },
  "Area 1 (Major Metros)": {
    "Grade A": 21431.90,
    "Grade B": 19989.50,
    "Grade C": 18479.61,
    "Grade D": 18479.61,
    "Grade E": 18479.61,
  },
  "Area 2 (Regional Urban)": {
    "Grade A": 21431.90,
    "Grade B": 19989.50,
    "Grade C": 18479.61,
    "Grade D": 18479.61,
    "Grade E": 18479.61,
  },
  "Area 3 (Rural / Agri / N12 Corridor)": {
    "Grade A": 18827.08,
    "Grade B": 17787.16,
    "Grade C": 17787.16,
    "Grade D": 17787.16,
    "Grade E": 17787.16,
  },
};

export function formatZar(amount: number): string {
  return amount.toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function calculateNBCPSSQuote(input: NBCPSSInput): NBCPSSCalculationResult {
  const areaRates =
    OFFICIAL_DIRECT_COST_RATES[input.area] ||
    OFFICIAL_DIRECT_COST_RATES["Area 3 (Rural / Agri / N12 Corridor)"];
  const officialDirectCost = areaRates[input.grade] || 17787.16;

  // Component breakdown of the Official Direct Cost per officer
  const baseSalary = Number((officialDirectCost * 0.54).toFixed(2));
  const statutoryBenefits = Number((officialDirectCost * 0.24).toFixed(2));
  const shiftAndReliefLoad = Number(
    (officialDirectCost - baseSalary - statutoryBenefits).toFixed(2)
  );

  const is24x7 = input.shiftType === "rotational_24_7";
  const reliefMultiplier = is24x7 ? 1.222 : 1.0;

  // Optional Admin Markup / Overhead % on top of Official Direct Cost (default 0% = exact PDF Direct Cost)
  const overheadPct = typeof input.overheadPercentage === "number" ? input.overheadPercentage : 0;
  const operationalOverhead = Number(((officialDirectCost * overheadPct) / 100).toFixed(2));

  const monthlyCostPerPost = Number((officialDirectCost + operationalOverhead).toFixed(2));
  const totalMonthlyContractCost = Number(
    (monthlyCostPerPost * Math.max(1, input.officerCount)).toFixed(2)
  );

  const vatStatus = input.grade === "Grade A" ? "Not specified (Per Contract)" : "Excluding VAT";
  const quoteId = "QB-QUOTE-2026-NBCPSS";

  const breakdown: CostBreakdownItem[] = [
    {
      label: "NBCPSS Basic Monthly Wage Component",
      code: "NBCPSS-BASE",
      amountZar: baseSalary,
      notes: `Prescribed statutory base component for ${input.grade} (${input.area})`,
    },
    {
      label: "Statutory Contributions (PSSPF, UIF, COIDA, Leave & Bonus)",
      code: "PSSPF-UIF-COID",
      amountZar: statutoryBenefits,
      notes: "Provident Fund, UIF (U210835718), SDL (L210835718), COIDA, Annual Bonus & Health",
    },
    {
      label: "Shift Allowance, Relief & Direct Post Equipment",
      code: "DIRECT-POST-LOAD",
      amountZar: shiftAndReliefLoad,
      notes: "Night/Sunday/Public Holiday allowances, uniform, radio comms & direct supervision",
    },
  ];

  if (overheadPct > 0) {
    breakdown.push({
      label: `Additional Executive Contract Margin (${overheadPct}%)`,
      code: "ADMIN-MARGIN",
      amountZar: operationalOverhead,
      notes: "Optional contract-specific site overhead / margin",
    });
  }

  return {
    quoteReference: quoteId,
    timestamp: new Date().toISOString(),
    inputs: input,
    basicSalaryPerOfficer: baseSalary,
    statutoryBenefitsPerOfficer: statutoryBenefits,
    reliefMultiplier,
    nightShiftAllowancePerOfficer: shiftAndReliefLoad,
    totalLaborCostPerOfficer: officialDirectCost,
    overheadPercentage: overheadPct,
    operationalOverheadPerOfficer: operationalOverhead,
    monthlyCostPerPost,
    totalMonthlyContractCost,
    vatStatus,
    breakdown,
    statutoryComplianceAffirmation:
      "Quick Bopha Security (Pty) Ltd certifies that these security service rates reflect the official Area 1 & 2 and Area 3 Direct Cost schedules compliant with the National Bargaining Council for the Private Security Sector (NBCPSS) and PSiR Act 56 of 2001.",
  };
}

export function generateQuotePDF(result: NBCPSSCalculationResult): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Brand Colors (Royal Navy & Crimson Red)
  const navy = [11, 19, 64];
  const crimson = [217, 27, 36];
  const slate = [90, 101, 125];

  // Header Bar
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, 210, 38, "F");

  doc.setFillColor(crimson[0], crimson[1], crimson[2]);
  doc.rect(0, 36, 210, 2, "F");

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("QUICK BOPHA SECURITY (PTY) LTD", 14, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("Official Security Services Direct Cost Quotation & Schedule", 14, 21.5);
  doc.text(
    `CRNR: ${COMPANY_DETAILS.registrationNumber} | PSiRA NR: ${COMPANY_DETAILS.psiraRegistration} | CSD: ${COMPANY_DETAILS.csdNumber} | TAX VAT: ${COMPANY_DETAILS.vatNumber}`,
    14,
    27.5
  );
  doc.text(
    `Director: ${COMPANY_DETAILS.leadership.managingDirector.name} | 7 Borman St, Wolmaransstad, 2630 | Tel: ${COMPANY_DETAILS.hotlines.controlRoom}`,
    14,
    33
  );

  // Quote Metadata Box
  doc.setFillColor(248, 250, 252);
  doc.rect(14, 44, 182, 34, "F");
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, 44, 182, 34, "S");

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("QUOTE SPECIFICATIONS", 18, 51);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Reference No: ${result.quoteReference}`, 18, 58);
  doc.text(`Date Generated: ${new Date().toLocaleDateString("en-ZA")}`, 18, 64);
  doc.text(`Client / Entity: ${result.inputs.clientName || result.inputs.companyName || "Commercial Client"}`, 18, 70);

  doc.text(`Security Category: ${result.inputs.grade}`, 105, 58);
  doc.text(`VAT Status: ${result.vatStatus}`, 105, 64);
  doc.text(`Operating Zone: ${result.inputs.area}`, 105, 70);

  // Itemized Breakdown Table Header
  doc.setFillColor(crimson[0], crimson[1], crimson[2]);
  doc.rect(14, 84, 182, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("COST COMPONENT", 18, 89.2);
  doc.text("REGULATORY CODE", 105, 89.2);
  doc.text("RATE (ZAR)", 155, 89.2);

  // Table Rows
  let y = 98;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 41, 59);

  result.breakdown.forEach((item, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(241, 245, 249);
      doc.rect(14, y - 5, 182, 8, "F");
    }
    doc.text(item.label, 18, y);
    doc.text(item.code, 105, y);
    doc.text(`R ${formatZar(item.amountZar)}`, 155, y);
    y += 9;
  });

  // Summary Totals
  y += 4;
  doc.setDrawColor(203, 213, 225);
  doc.line(14, y, 196, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(`OFFICIAL DIRECT RATE PER GUARD (${result.vatStatus.toUpperCase()}):`, 18, y);
  doc.text(`R ${formatZar(result.monthlyCostPerPost)}`, 155, y);
  y += 8;

  doc.setFontSize(11);
  doc.setTextColor(crimson[0], crimson[1], crimson[2]);
  doc.text(`MONTHLY CONTRACT TOTAL (${result.inputs.officerCount} GUARDS):`, 18, y);
  doc.text(`R ${formatZar(result.totalMonthlyContractCost)}`, 155, y);
  y += 12;

  // Statutory Certification Callout
  doc.setFillColor(248, 250, 252);
  doc.rect(14, y, 182, 28, "F");
  doc.setDrawColor(crimson[0], crimson[1], crimson[2]);
  doc.setLineWidth(0.4);
  doc.rect(14, y, 182, 28, "S");

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("STATUTORY COMPLIANCE WARRANTY", 18, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const splitText = doc.splitTextToSize(result.statutoryComplianceAffirmation, 174);
  doc.text(splitText, 18, y + 12);
  doc.text("Director: Nkagisang William Dipitso | PSiRA NR: 2639354 | CSD: MAAA0280738 | VAT: 4020288215", 18, y + 24);

  // Footer & Contact
  const footerY = 270;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, footerY, 196, footerY);

  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.setFontSize(8);
  doc.text(`${COMPANY_DETAILS.name} | 7 Borman St, Wolmaransstad, 2630`, 14, footerY + 5);
  doc.text(`24/7 Control Room: ${COMPANY_DETAILS.hotlines.controlRoom} | Email: ${COMPANY_DETAILS.emails.general}`, 14, footerY + 10);
  doc.text(`Motto: "${COMPANY_DETAILS.mottoes.primary}"`, 14, footerY + 15);

  doc.save(`${result.quoteReference}.pdf`);
}
