import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const dispatchRecord = {
      incidentId: `INC-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      incidentType: data.incidentType,
      locationAddress: data.locationAddress,
      gps: data.gps,
      notes: data.notes,
      controlRoomHotline: "018 011 9111",
      timestamp: new Date().toISOString(),
      priority: "CRITICAL_TACTICAL_ALERT",
    };

    console.log("[24/7 CONTROL ROOM DISPATCH ALERT]", dispatchRecord);

    return NextResponse.json({
      success: true,
      incidentId: dispatchRecord.incidentId,
      message: "Emergency telemetry received at Wolmaransstad Control Desk.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Emergency dispatch logging failed." },
      { status: 500 }
    );
  }
}
