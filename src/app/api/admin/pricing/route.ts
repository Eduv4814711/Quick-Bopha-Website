import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readAdminStore, updateAllPricing } from "@/lib/admin-store";

export async function GET() {
  const store = readAdminStore();
  return NextResponse.json({
    success: true,
    pricing: store.publicGuardPricing,
    serviceCategoriesPricing: store.serviceCategoriesPricing,
    alarmPackagesPricing: store.alarmPackagesPricing,
    academyCoursesPricing: store.academyCoursesPricing,
  });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const updated = updateAllPricing({
      publicGuardPricing: body.pricing || body.publicGuardPricing,
      serviceCategoriesPricing: body.serviceCategoriesPricing,
      alarmPackagesPricing: body.alarmPackagesPricing,
      academyCoursesPricing: body.academyCoursesPricing,
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/alarms");
    revalidatePath("/academy");

    return NextResponse.json({
      success: true,
      pricing: updated.publicGuardPricing,
      serviceCategoriesPricing: updated.serviceCategoriesPricing,
      alarmPackagesPricing: updated.alarmPackagesPricing,
      academyCoursesPricing: updated.academyCoursesPricing,
      message: "All website prices (Guards, Services, Alarms, Academy) updated and published.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update website pricing." },
      { status: 500 }
    );
  }
}
