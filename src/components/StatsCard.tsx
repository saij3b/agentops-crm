"use client";

import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
}

export function StatsCard({ label, value, change, changeType }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      <div className="flex items-baseline justify-between mt-2">
        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</h3>
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            changeType === "increase" && "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
            changeType === "decrease" && "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
            changeType === "neutral" && "bg-zinc-50 text-zinc-600 dark:bg-zinc-500/10 dark:text-zinc-400"
          )}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
