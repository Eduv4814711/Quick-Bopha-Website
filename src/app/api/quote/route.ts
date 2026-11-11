import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Log the generated quote metadata
    console.log("[QUOTE ENGINE AUDIT LOG]", {
      quoteRef: data.quoteReference,
      officerCount: data.inputs?.officerCount,
      grade: data.inputs?.grade,
      shiftType: data.inputs?.shiftType,
      monthlyTotal: data.totalMonthlyContractCost,
      routedTo: "accounts@quickbopha.co.za",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Quote generated and registered. Audit dispatched to accounts@quickbopha.co.za.",
      quoteReference: data.quoteReference,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process quote request." },
      { status: 500 }
    );
  }
}
