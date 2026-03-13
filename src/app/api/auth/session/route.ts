import { NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/auth-config";
import { getSessionUserByRole, isValidUserRole } from "@/lib/auth";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { role?: string } | null;
  const role = body?.role;

  if (!role || !isValidUserRole(role)) {
    return NextResponse.json({ error: "Invalid role selection" }, { status: 400 });
  }

  const sessionUser = getSessionUserByRole(role);
  const response = NextResponse.json({ ok: true, user: sessionUser });

  response.cookies.set(SESSION_COOKIE_NAME, role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

