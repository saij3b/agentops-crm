import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import AgentRunsTable from "@/components/AgentRunsTable";
import ApprovalCenter from "@/components/ApprovalCenter";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { getAgentRuns, getActivityTimeline } from "@/lib/services";
import { approvalQueue } from "@/lib/data";

export default async function Home() {
  const [runs, timeline] = await Promise.all([
    getAgentRuns(),
    getActivityTimeline(),
  ]);

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold uppercase rounded-md tracking-widest border border-green-200 dark:border-green-800">
          PostgreSQL Ready
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard label="Active Projects" value="1" change="+0" changeType="neutral" />
        <StatsCard label="Total Runs" value={runs.length.toString()} change="+3" changeType="positive" />
        <StatsCard label="Pending Approvals" value="1" change="-1" changeType="positive" />
        <StatsCard label="Active Agents" value="2" change="+0" changeType="neutral" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Active Agent Runs</h2>
            <AgentRunsTable runs={runs} />
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
            <ApprovalCenter initialItems={approvalQueue} />
          </section>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">System Activity</h2>
          <ActivityTimeline events={timeline} />
        </div>
      </div>
    </DashboardLayout>
  );
}
