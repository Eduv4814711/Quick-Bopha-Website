import { NextResponse } from "next/server";
import { appendCareerLog } from "@/lib/admin-store";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    appendCareerLog({
      fullName: data.fullName || "Candidate",
      saIdNumber: data.saIdNumber || "",
      phoneNumber: data.phoneNumber || "",
      residentialTown: data.residentialTown || "Wolmaransstad",
      psiraGrade: data.psiraGrade || "Grade C",
      psiraRegNumber: data.psiraRegNumber || "Pending",
      hasFirearmCompetency: Boolean(data.hasFirearmCompetency),
      hasDriversLicense: Boolean(data.hasDriversLicense),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Application logged in recruitment database.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to log career application." },
      { status: 500 }
    );
  }
}

