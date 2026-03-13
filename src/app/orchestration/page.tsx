"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AgentLane, LaneStatus } from "@/components/AgentLane";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { activityTimeline as initialActivity } from "@/lib/data";

interface LaneData {
  id: string;
  name: string;
  role: string;
  status: LaneStatus;
  lastActivity: string;
  health: number;
}

export default function OrchestrationPage() {
  const [lanes, setLanes] = useState<LaneData[]>([
    { id: "lane-1", name: "OpenClaw", role: "Orchestrator", status: "active", lastActivity: "Heartbeat check passed", health: 100 },
    { id: "lane-2", name: "Jules", role: "Builder", status: "idle", lastActivity: "Completed issue #4", health: 98 },
    { id: "lane-3", name: "Codex", role: "Reviewer", status: "active", lastActivity: "Reviewing PR #20", health: 95 },
    { id: "lane-4", name: "Intake", role: "Listener", status: "active", lastActivity: "Waiting for events", health: 100 },
  ]);

  const [activities, setActivities] = useState(initialActivity);

  const handleAction = (laneId: string, action: string) => {
    // 1. Update lane status
    setLanes(prev => prev.map(lane => {
      if (lane.id !== laneId) return lane;
      
      let nextStatus: LaneStatus = lane.status;
      if (action === "start" || action === "resume") nextStatus = "active";
      if (action === "pause") nextStatus = "paused";
      if (action === "stop") nextStatus = "idle";
      
      return { ...lane, status: nextStatus, lastActivity: `Manual ${action} triggered` };
    }));

    // 2. Log activity
    const lane = lanes.find(L => L.id === laneId);
    const newActivity: any = {
      id: `evt-${Date.now()}`,
      type: "issue_created", // Use existing type for compatibility
      timestamp: new Date().toISOString(),
      actor: { name: "Admin" },
      target: { id: laneId, title: `${lane?.name} Lane: ${action}`, type: "event" }
    };
    setActivities(prev => [newActivity, ...prev]);
    
    console.log(`[orchestration] Action ${action} triggered for ${lane?.name}`);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Multi-Agent Orchestration</h1>
          <p className="text-slate-500 dark:text-zinc-400">Monitor and manage autonomous agent lanes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lanes.map(lane => (
            <AgentLane 
              key={lane.id}
              {...lane}
              onAction={(action) => handleAction(lane.id, action)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Orchestration Logs</h2>
              <div className="space-y-3">
                {activities.slice(0, 8).map(a => (
                   <div key={a.id} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-zinc-800 last:border-0">
                     <div className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                       <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">
                         {a.target?.title || "System event"}
                       </span>
                     </div>
                     <span className="text-[10px] text-slate-400 font-mono">
                       {new Date(a.timestamp).toLocaleTimeString()}
                     </span>
                   </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Timeline</h2>
            <ActivityTimeline events={activities} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
