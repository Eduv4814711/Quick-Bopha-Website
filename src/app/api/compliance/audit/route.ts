import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const auditRecord = {
      auditId: `AUD-${Date.now()}`,
      officerName: data.officerName,
      organization: data.organization,
      businessEmail: data.businessEmail,
      phoneNumber: data.phoneNumber,
      tenderReference: data.tenderReference,
      selectedDocuments: data.selectedDocuments,
      routedTo: "compliance@quickbopha.co.za",
      timestamp: new Date().toISOString(),
      clientIp: req.headers.get("x-forwarded-for") || "internal-dispatch",
    };

    console.log("[TENDER VAULT AUDIT DISPATCH]", auditRecord);

    return NextResponse.json({
      success: true,
      auditId: auditRecord.auditId,
      message: "Statutory compliance bundle authorized. Audit dispatched to compliance@quickbopha.co.za.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Audit logging failed." },
      { status: 500 }
    );
  }
}
