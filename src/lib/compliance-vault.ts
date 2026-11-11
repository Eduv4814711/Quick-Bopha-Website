import jsPDF from "jspdf";
import { COMPANY_DETAILS } from "./constants";

export interface ComplianceDocument {
  id: string;
  code: string;
  title: string;
  issuingAuthority: string;
  validUntil: string;
  status: "Verified & Active" | "Certified Good Standing";
  description: string;
  fileUrl?: string;
}

export const STATUTORY_DOCUMENTS: ComplianceDocument[] = [
  {
    id: "psira-license",
    code: "PSIRA-CO-2639354",
    title: "PSiRA Corporate Registration Certificate & License",
    issuingAuthority: "Private Security Industry Regulatory Authority (PSiRA)",
    validUntil: "Continuous Standing (Active 2026)",
    status: "Verified & Active",
    description:
      "Official statutory operating license (Reg No: 2639354) under Section 20 & 21 of the PSiR Act 56 of 2001 for Guarding, Armed Response, and Security Operations.",
  },
  {
    id: "sars-tax-pin",
    code: "TCS-PIN-95D136823W",
    title: "SARS Tax Compliance Status (TCS) Good Standing Certificate",
    issuingAuthority: "South African Revenue Service (SARS)",
    validUntil: "08 October 2027",
    status: "Certified Good Standing",
    description:
      "Official SARS TCS Good Standing Certificate (PIN: 95D136823W | Income Tax: 9586345176 | VAT: 4020288215) confirming full corporate tax compliance.",
    fileUrl: "/docs/SARS_Tax_Compliance_Status_2026.pdf",
  },
  {
    id: "popia-cert",
    code: "POPIA-2026-068037",
    title: "POPIA Information Officer Registration Certificate",
    issuingAuthority: "Information Regulator (South Africa)",
    validUntil: "Continuous Standing (Registered 30 Sept 2026)",
    status: "Verified & Active",
    description:
      "Official Certificate No. 2026-068037 under Section 55 of the Protection of Personal Information Act 4 of 2013 (Registered Officer: Mpho Mapulane).",
    fileUrl: "/docs/POPIA_Certificate_2026-068037.pdf",
  },
  {
    id: "csd-bbbee",
    code: "CSD-MAAA0280738",
    title: "National Treasury CSD & B-BBEE Level 1 Procurement Dossier",
    issuingAuthority: "National Treasury Republic of South Africa & CIPC",
    validUntil: "31 December 2026",
    status: "Verified & Active",
    description:
      "Central Supplier Database registration (MAAA0280738), CIPC Company Reg (2014/281440/07), and Level 1 B-BBEE status (135% procurement recognition).",
  },
  {
    id: "sars-emp-sasseta",
    code: "PAYE-7210835718",
    title: "SARS EMP (PAYE / SDL / UIF) & SASSETA Code 13 Registration",
    issuingAuthority: "South African Revenue Service & SASSETA",
    validUntil: "Continuous Standing",
    status: "Certified Good Standing",
    description:
      "Verified employer registration for PAYE (7210835718), Skills Development Levy (L210835718 — SETA 13 SASSETA Chamber 81902), and UIF (U210835718).",
    fileUrl: "/docs/SARS_EMP_PAYE_SDL_UIF_Registration.pdf",
  },
  {
    id: "nbcpss-coida",
    code: "NBCPSS-COIDA-2026",
    title: "NBCPSS Statutory Wage & COIDA Letter of Good Standing",
    issuingAuthority: "NBCPSS & Department of Employment and Labour",
    validUntil: "30 April 2027",
    status: "Certified Good Standing",
    description:
      "Audited compliance with NBCPSS Main Collective Agreement minimum wage tariffs, PSSPF pension remittances, and Compensation Fund (COIDA Act 130 of 1993).",
  },
  {
    id: "control-room-sop",
    code: "QBS-SOP-CR-2026",
    title: "24/7 Control Room Operating Manual, Escalation Matrix & Contingency Plan",
    issuingAuthority: "Quick Bopha Governance, Risk & Compliance (GRC) Division",
    validUntil: "Active SOP Cycle 2026/2027",
    status: "Verified & Active",
    description:
      "Controlled operational dossier containing the P1–P4 Incident Escalation Matrix, UPS/Radio Failover Contingency Plan, Equipment Register SOP, and Duty Checklist.",
    fileUrl: "/docs/Control_Room_Operating_Manual_Escalation_Matrix.pdf",
  },
];

export interface TenderVaultSubmission {
  officerName: string;
  organization: string;
  businessEmail: string;
  phoneNumber: string;
  tenderReference: string;
  selectedDocuments: string[];
}

export function generateComplianceBundlePDF(submission: TenderVaultSubmission): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const navy = [11, 19, 64];
  const crimson = [217, 27, 36];
  const emerald = [16, 185, 129];
  const slate = [90, 101, 125];

  // Cover / Header Bar
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, 210, 44, "F");

  // Crimson accent stripe
  doc.setFillColor(crimson[0], crimson[1], crimson[2]);
  doc.rect(0, 42, 210, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("QUICK BOPHA SECURITY (PTY) LTD", 14, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("VERIFIED B2B TENDER & STATUTORY COMPLIANCE DOSSIER", 14, 21);
  doc.text(
    `CRNR: ${COMPANY_DETAILS.registrationNumber} | PSiRA: ${COMPANY_DETAILS.psiraRegistration} | CSD: ${COMPANY_DETAILS.csdNumber} | VAT: ${COMPANY_DETAILS.vatNumber}`,
    14,
    27
  );
  doc.text(
    `SARS TCS PIN: ${COMPANY_DETAILS.tcsPin} (Exp: ${COMPANY_DETAILS.tcsExpiry}) | POPIA Cert: ${COMPANY_DETAILS.popiaRegistration}`,
    14,
    33
  );
  doc.text(
    `Headquarters: ${COMPANY_DETAILS.headquarters.address} | 24/7 Control Room: ${COMPANY_DETAILS.hotlines.controlRoom}`,
    14,
    39
  );

  // Security & Audit Authentication Badge
  doc.setFillColor(248, 250, 252);
  doc.rect(14, 49, 182, 34, "F");
  doc.setDrawColor(crimson[0], crimson[1], crimson[2]);
  doc.setLineWidth(0.4);
  doc.rect(14, 49, 182, 34, "S");

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("AUDITED TENDER METADATA & RECIPIENT AUTHENTICATION", 18, 56);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Procurement Officer: ${submission.officerName}`, 18, 63);
  doc.text(`Entity / Municipality: ${submission.organization}`, 18, 69);
  doc.text(`Official Business Email: ${submission.businessEmail}`, 18, 75);

  doc.text(`Tender Ref: ${submission.tenderReference}`, 110, 63);
  doc.text(`Phone: ${submission.phoneNumber}`, 110, 69);
  doc.text(`Audit Timestamp: ${new Date().toISOString()}`, 110, 75);

  // Table of Compiled Documents
  let y = 90;
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(14, y, 182, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("VERIFIED STATUTORY ITEM", 18, y + 5.5);
  doc.text("ISSUING BODY", 104, y + 5.5);
  doc.text("STATUS", 160, y + 5.5);

  y += 13;
  const docsToInclude = STATUTORY_DOCUMENTS.filter((d) => submission.selectedDocuments.includes(d.id));

  docsToInclude.forEach((docItem, index) => {
    doc.setFillColor(index % 2 === 0 ? 255 : 248, index % 2 === 0 ? 255 : 250, index % 2 === 0 ? 255 : 252);
    doc.rect(14, y - 5, 182, 20, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(14, y - 5, 182, 20, "S");

    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(docItem.title, 18, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(slate[0], slate[1], slate[2]);
    doc.text(`Ref: ${docItem.code} | Valid Until: ${docItem.validUntil}`, 18, y + 4.5);
    const desc = doc.splitTextToSize(docItem.description, 132);
    doc.text(desc[0], 18, y + 9);

    doc.setTextColor(navy[0], navy[1], navy[2]);
    const authLines = doc.splitTextToSize(docItem.issuingAuthority, 50);
    doc.text(authLines[0], 104, y);

    doc.setTextColor(emerald[0], emerald[1], emerald[2]);
    doc.setFont("helvetica", "bold");
    doc.text(`[✓] ${docItem.status}`, 154, y);

    y += 22;
  });

  // Statutory Certification
  y += 4;
  doc.setFillColor(248, 250, 252);
  doc.rect(14, y, 182, 30, "F");
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, y, 182, 30, "S");

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("EXECUTIVE GOVERNANCE & STATUTORY AFFIDAVIT", 18, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(
    "Quick Bopha Security (Pty) Ltd (Reg: 2014/281440/07) warrants that all statutory credentials in this bundle are authentic and active.",
    18,
    y + 11.5
  );
  doc.text(
    "Leadership: Managing Director Nkagisang William Dipitso | Executive Manager Aobakwe Nkagisang Dipitso | Operational Manager Lwandile Njwaqu.",
    18,
    y + 16.5
  );
  doc.text(
    `POPIA Information Officer: Mpho Mapulane (Cert: 2026-068037) | SARS PAYE: 7210835718 | UIF: U210835718 | SDL: L210835718 (SASSETA Code 13).`,
    18,
    y + 21.5
  );
  doc.text(
    `Verification Desk: ${COMPANY_DETAILS.emails.general} / ${COMPANY_DETAILS.emails.compliance} | Tel: ${COMPANY_DETAILS.hotlines.controlRoom}`,
    18,
    y + 26.5
  );

  // Footer
  const footerY = 278;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, footerY, 196, footerY);

  doc.setTextColor(slate[0], slate[1], slate[2]);
  doc.setFontSize(7.5);
  doc.text(`Audit Trail Log ID: AUD-${Date.now()} | Dispatched via Quick Bopha Compliance Vault`, 14, footerY + 5);
  doc.text(`Quick Bopha Security (Pty) Ltd — PSiRA Reg: 2639354 | CSD: MAAA0280738 | "We Guard With Pride"`, 14, footerY + 9.5);

  doc.save(`QuickBopha_TenderBundle_${submission.tenderReference.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
}
