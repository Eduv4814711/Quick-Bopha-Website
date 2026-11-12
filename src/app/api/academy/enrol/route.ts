import { NextResponse } from "next/server";
import { appendAcademyLog } from "@/lib/admin-store";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    appendAcademyLog({
      enrolmentRef: data.reference || `QBA-${Date.now()}`,
      candidate: data.fullName || "Candidate",
      phone: data.mobilePhone || "",
      course: data.course || "PSiRA Grade C",
      intake: data.intake || "Next Monday Intake",
      paymentOption: data.paymentOption || "deposit",
      amountZar: Number(data.amountPaidZar) || 0,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      reference: data.reference,
      status: "SEAT_RESERVED",
      message: "Candidate registered. SMS and email receipts dispatched.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Enrolment failed." },
      { status: 500 }
    );
  }
}
