"use client";

import React from "react";
import { useWebSockets } from "@/hooks/useWebSockets";

export default function Navigation() {
  const { status } = useWebSockets();

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-slate-800 dark:text-white">AgentOps CRM</h1>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full dark:bg-zinc-800">
          <div className={`w-2 h-2 rounded-full ${
            status === "connected" ? "bg-green-500 animate-pulse" : 
            status === "connecting" ? "bg-yellow-500" : "bg-red-500"
          }`} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            {status === "connected" ? "Real-time: Active" : `System: ${status}`}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
          SJ
        </div>
      </div>
    </header>
  );
}
