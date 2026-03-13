"use client";

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
      <div className="lg:hidden flex items-center justify-between p-4 bg-zinc-900 text-white sticky top-0 z-30">
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
