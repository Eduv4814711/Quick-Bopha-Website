import { NextResponse } from "next/server";
import {
  readAdminStore,
  updatePublicGuardPricing,
  PublicGuardRateTier,
} from "@/lib/admin-store";

export async function GET() {
  const store = readAdminStore();
  return NextResponse.json({
    success: true,
    pricing: store.publicGuardPricing,
  });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const tiers = body.pricing as PublicGuardRateTier[];

    if (!Array.isArray(tiers) || tiers.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid pricing payload." },
        { status: 400 }
      );
    }

    const updated = updatePublicGuardPricing(tiers);
    return NextResponse.json({
      success: true,
      pricing: updated,
      message: "Public per-guard pricing updated and published.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update public guard pricing." },
      { status: 500 }
    );
  }
}
