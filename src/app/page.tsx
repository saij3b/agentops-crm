import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import AgentRunsTable from "@/components/AgentRunsTable";
import ApprovalCenter from "@/components/ApprovalCenter";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { agentRuns, approvalQueue, activityTimeline } from "@/lib/data";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard label="Active Projects" value="1" change="+0" changeType="neutral" />
        <StatsCard label="Total Runs" value="12" change="+3" changeType="positive" />
        <StatsCard label="Pending Approvals" value="1" change="-1" changeType="positive" />
        <StatsCard label="Active Agents" value="2" change="+0" changeType="neutral" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Active Agent Runs</h2>
            <AgentRunsTable runs={agentRuns} />
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
            <ApprovalCenter initialItems={approvalQueue} />
          </section>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">System Activity</h2>
          <ActivityTimeline events={activityTimeline} />
        </div>
      </div>
    </DashboardLayout>
  );
}
