import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEFAULT_PASSCODE = process.env.ADMIN_PASSCODE || "QB-EXEC-2026";
const SESSION_COOKIE = "qb_admin_session";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  return NextResponse.json({
    authenticated: session === "authenticated",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const submittedPasscode = (body.passcode || "").trim();

    if (submittedPasscode !== DEFAULT_PASSCODE) {
      return NextResponse.json(
        { authenticated: false, error: "Invalid Executive Passcode." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12, // 12 hours
    });

    return NextResponse.json({
      authenticated: true,
      message: "Executive Admin access granted.",
    });
  } catch {
    return NextResponse.json(
      { authenticated: false, error: "Authentication request failed." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ authenticated: false });
}
