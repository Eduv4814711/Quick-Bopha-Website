import { NextResponse } from "next/server";
import { appendTenderLog } from "@/lib/admin-store";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    appendTenderLog({
      officerName: data.officerName || "Procurement Officer",
      organization: data.organization || "Municipal Entity",
      businessEmail: data.businessEmail || "",
      phoneNumber: data.phoneNumber || "",
      tenderReference: data.tenderReference || "RFQ",
      documentsCount: Array.isArray(data.selectedDocuments) ? data.selectedDocuments.length : 7,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      auditId: `AUD-${Date.now()}`,
      message: "Statutory compliance bundle authorized. Audit dispatched to compliance@quickbopha.co.za.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Audit logging failed." },
      { status: 500 }
    );
  }
}
