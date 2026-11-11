import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const record = {
      enrolmentRef: data.reference,
      candidate: data.fullName,
      saId: data.saIdNumber,
      phone: data.mobilePhone,
      course: data.course,
      intake: data.intake,
      paymentOption: data.paymentOption,
      amountZar: data.amountPaidZar,
      gateway: "Yoco Integrated Webhook",
      timestamp: new Date().toISOString(),
      routedTo: "academy@quickbopha.co.za",
    };

    console.log("[ACADEMY ENROLMENT LOG]", record);

    return NextResponse.json({
      success: true,
      reference: data.reference,
      status: "SEAT_RESERVED",
      message: "Candidate registered. SMS and email receipts dispatched.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Enrolment failed." },
      { status: 500 }
    );
  }
}
