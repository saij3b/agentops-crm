import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/auth-config";

const PUBLIC_PATHS = new Set(["/login", "/api/events", "/api/auth/session"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionRole = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (pathname === "/login") {
    if (sessionRole) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (!sessionRole) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
