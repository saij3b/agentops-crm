"use client";

import Link from "next/link";
import type { SessionUser } from "@/lib/types";
import { useWebSockets } from "@/hooks/useWebSockets";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavigationProps {
  sessionUser: SessionUser | null;
  onLogout: () => void | Promise<void>;
}

export default function Navigation({ sessionUser, onLogout }: NavigationProps) {
  const { status } = useWebSockets();

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-slate-800 dark:text-white">AgentOps CRM</h1>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full dark:bg-zinc-800">
          <div
            className={`w-2 h-2 rounded-full ${
              status === "connected"
                ? "bg-green-500 animate-pulse"
                : status === "connecting"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
          />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            {status === "connected" ? "Real-time: Active" : `System: ${status}`}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="hidden sm:flex gap-4 text-sm text-slate-500 dark:text-zinc-400">
          <Link href="/clients" className="hover:text-slate-900 dark:hover:text-white">
            Clients
          </Link>
          <Link href="/projects" className="hover:text-slate-900 dark:hover:text-white">
            Projects
          </Link>
        </div>

        {sessionUser ? (
          <>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{sessionUser.name}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
                {sessionUser.role}
              </span>
            </div>
            <button
              type="button"
              onClick={() => void onLogout()}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
