"use client";

import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

export function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white p-4 text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
        <span className="font-bold">AgentOps CRM</span>
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="lg:pl-64 min-h-screen">
        {children}
      </main>
    </>
  );
}
