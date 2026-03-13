"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import Navigation from "./Navigation";
import type { SessionUser } from "@/lib/types";

interface ShellProps {
  children: React.ReactNode;
  sessionUser: SessionUser | null;
}

export default function Shell({ children, sessionUser }: ShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  async function handleLogout() {
    await fetch("/api/auth/session", {
      method: "DELETE",
    });
    window.location.href = "/login";
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navigation sessionUser={sessionUser} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
