"use client";

import React from "react";

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  source?: "live" | "mock";
}

export function StatsCard({ label, value, change, changeType, source }: StatsCardProps) {
  const changeColors = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-500",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 dark:bg-zinc-900 dark:border-zinc-800 relative overflow-hidden">
      {source && (
        <span className={`absolute top-0 right-0 px-2 py-0.5 text-[8px] font-bold uppercase rounded-bl-lg tracking-widest ${
          source === "live" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-400"
        }`}>
          {source}
        </span>
      )}
      <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">{label}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <span className={`text-xs font-semibold ${changeColors[changeType]}`}>
          {change}
        </span>
      </div>
    </div>
  );
}
