import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME } from "./auth-config";
import { appUsers } from "./data";
import type { SessionUser, UserRole } from "./types";

const userByRole = new Map<UserRole, SessionUser>(
  appUsers.map((user) => [user.role, user]),
);

export function isValidUserRole(role: string): role is UserRole {
  return userByRole.has(role as UserRole);
}

export function getSessionUserByRole(role?: string | null): SessionUser | null {
  if (!role || !isValidUserRole(role)) {
    return null;
  }

  return userByRole.get(role) ?? null;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  return getSessionUserByRole(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

export function canManageApprovals(role?: UserRole | null): boolean {
  return role === "admin" || role === "reviewer";
}

