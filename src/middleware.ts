import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/auth-config";

const PUBLIC_PATHS = new Set(["/login", "/api/events", "/api/auth/session"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionRole = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const host = request.headers.get("host") ?? request.nextUrl.host;
  const protocol = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");

  const buildUrl = (pathnameValue: string) => {
    const url = new URL(`${protocol}://${host}${pathnameValue}`);
    return url;
  };

  if (pathname === "/login") {
    if (sessionRole) {
      return NextResponse.redirect(buildUrl("/"));
    }

    return NextResponse.next();
  }

  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (!sessionRole) {
    const loginUrl = buildUrl("/login");
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
