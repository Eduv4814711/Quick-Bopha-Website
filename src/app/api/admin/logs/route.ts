import { NextResponse } from "next/server";
import { readAdminStore } from "@/lib/admin-store";

export async function GET() {
  const store = readAdminStore();
  return NextResponse.json({
    success: true,
    logs: store.auditLogs,
  });
}
