"use client";

import React from "react";
import { Play, Pause, Square } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { cn } from "@/lib/utils";

export type LaneStatus = "active" | "paused" | "idle" | "blocked" | "error";

interface AgentLaneProps {
  name: string;
  role: string;
  status: LaneStatus;
  lastActivity: string;
  health: number;
  onAction: (action: "start" | "pause" | "resume" | "stop") => void;
}

export const AgentLane: React.FC<AgentLaneProps> = ({
  name,
  role,
  status,
  lastActivity,
  health,
  onAction
}) => {
  const isRunning = status === "active";
  const isPaused = status === "paused";

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white",
            status === "active" ? "bg-blue-600" : "bg-zinc-400 dark:bg-zinc-700"
          )}>
            {name[0]}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white">{name}</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">{role}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Health</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  health > 80 ? "bg-green-500" : health > 50 ? "bg-yellow-500" : "bg-red-500"
                )}
                style={{ width: `${Math.min(100, Math.max(0, health))}%` }}
              />
            </div>
            <span className="text-xs font-medium">{health}%</span>
          </div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Last Activity</p>
          <p className="text-xs font-medium truncate">{lastActivity}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isRunning && !isPaused ? (
          <button 
            onClick={() => onAction("start")}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            aria-label={`Start ${name} lane`}
          >
            <Play className="w-3.5 h-3.5" /> Start
          </button>
        ) : isPaused ? (
          <button 
            onClick={() => onAction("resume")}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
            aria-label={`Resume ${name} lane`}
          >
            <Play className="w-3.5 h-3.5" /> Resume
          </button>
        ) : (
          <button 
            onClick={() => onAction("pause")}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors"
            aria-label={`Pause ${name} lane`}
          >
            <Pause className="w-3.5 h-3.5" /> Pause
          </button>
        )}
        
        <button 
          disabled={status === "idle"}
          onClick={() => onAction("stop")}
          className="px-3 py-2 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Stop ${name} lane`}
        >
          <Square className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
