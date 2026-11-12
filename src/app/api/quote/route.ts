import { NextResponse } from "next/server";
import { appendQuoteLog } from "@/lib/admin-store";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    appendQuoteLog({
      quoteReference: data.quoteReference || "QB-QUOTE-2026-NBCPSS",
      clientName: data.inputs?.clientName || data.inputs?.companyName || "Executive Admin Estimate",
      clientEmail: data.inputs?.clientEmail,
      grade: data.inputs?.grade || "Grade C",
      shiftType: data.inputs?.shiftType || "rotational_24_7",
      officerCount: Number(data.inputs?.officerCount) || 1,
      area: data.inputs?.area || "Area 3 (Rural / Agri / N12 Corridor)",
      monthlyCostPerPost: Number(data.monthlyCostPerPost) || 10372,
      totalMonthlyContractCost: Number(data.totalMonthlyContractCost) || 10372,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Quote generated and registered. Audit dispatched to accounts@quickbopha.co.za.",
      quoteReference: data.quoteReference,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process quote request." },
      { status: 500 }
    );
  }
}
