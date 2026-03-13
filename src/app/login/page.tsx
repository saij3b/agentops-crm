"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { appUsers } from "@/lib/data";
import type { UserRole } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState<string | null>(null);

  const nextPath = useMemo(() => searchParams.get("next") || "/", [searchParams]);

  async function handleSignIn(role: UserRole) {
    setSelectedRole(role);
    setError(null);

    try {
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Unable to start a session.");
      }

      router.push(nextPath);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to start a session.";
      setError(message);
      setSelectedRole(null);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl items-center justify-center">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Phase 3 Access Control
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
            Sign in to AgentOps CRM
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
            This slice introduces app-level session gating and role-aware approvals without changing deployment,
            secrets, or infrastructure. Choose the role you want to simulate for this session.
          </p>

          {error ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl">
          {appUsers.map((user) => {
            const isLoading = selectedRole === user.role;

            return (
              <button
                key={user.id}
                type="button"
                onClick={() => handleSignIn(user.role)}
                disabled={selectedRole !== null}
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-cyan-400/60 hover:bg-cyan-400/10 disabled:cursor-wait disabled:opacity-70"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">{user.role}</p>
                    <h2 className="mt-2 text-2xl font-semibold">{user.name}</h2>
                    <p className="mt-1 text-sm text-slate-300">{user.title}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                    {isLoading ? "Signing in" : "Use role"}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{user.description}</p>
              </button>
            );
          })}
        </section>
      </div>
    </div>
  );
}

