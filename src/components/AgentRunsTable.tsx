"use client";

import React, { useMemo, useState } from "react";
import type { AgentRun } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import { useWebSockets } from "@/hooks/useWebSockets";
import { formatClockTime } from "@/lib/format";

interface AgentRunsTableProps {
  runs: AgentRun[];
}

const AgentRunsTable: React.FC<AgentRunsTableProps> = ({ runs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { lastMessage } = useWebSockets();

  const liveTurn = useMemo<AgentRun | null>(() => {
    if (lastMessage && typeof lastMessage === "object" && lastMessage.type === "AGENT_TURN") {
      return {
        id: "live-turn",
        agent: lastMessage.agent,
        role: "Autonomous Agent",
        project: "AgentOps CRM",
        task: lastMessage.task || `Reviewing ${lastMessage.pr ?? "active work"}`,
        status: lastMessage.status,
        startTime: lastMessage.timestamp,
        duration: "In Progress",
        failureCount: 0,
        linkedPR: lastMessage.pr,
      };
    }

    return null;
  }, [lastMessage]);

  const filteredRuns = runs.filter(
    (run) =>
      run.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      run.task.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const displayRuns = liveTurn ? [liveTurn, ...filteredRuns] : filteredRuns;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          Run Monitor
          {liveTurn && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
        </h2>
        <input
          type="text"
          placeholder="Search by agent or task..."
          className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto border rounded-lg dark:border-zinc-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
          <thead className="bg-gray-50 dark:bg-zinc-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-black dark:divide-zinc-800">
            {displayRuns.map((run) => (
              <tr key={run.id} className={`${run.id === "live-turn" ? "bg-blue-50/50 dark:bg-blue-900/10" : ""} hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-zinc-100">{run.agent}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">{run.project}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">{run.task}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={run.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">
                  {run.id === "live-turn" ? "LIVE" : formatClockTime(run.startTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentRunsTable;
