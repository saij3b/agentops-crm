import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import AgentRunsTable from "@/components/AgentRunsTable";
import ApprovalCenter from "@/components/ApprovalCenter";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { agentRuns, approvalQueue, activityTimeline } from "@/lib/data";
import { getLivePullRequests, getLiveIssues } from "@/lib/github";

export default async function Home() {
  const repo = "saij3b/agentops-crm";
  const livePRs = await getLivePullRequests(repo);
  const liveIssues = await getLiveIssues(repo);
  
  const mixedRuns = [
    ...livePRs.map(pr => ({
      id: pr.id,
      agent: pr.user || "Unknown",
      role: "Contributor",
      project: "AgentOps CRM",
      task: pr.title,
      status: pr.state === "open" ? (pr.isDraft ? "pending" : "running") : "completed",
      startTime: pr.updatedAt,
      duration: "--",
      failureCount: 0,
      linkedPR: pr.url
    })),
    ...agentRuns
  ].slice(0, 10);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard label="Active Pull Requests" value={livePRs.filter(p => !p.isDraft && p.state === "open").length.toString()} change={`Total: ${livePRs.length}`} changeType="neutral" />
        <StatsCard label="Open Issues" value={liveIssues.length.toString()} change="+0" changeType="neutral" />
        <StatsCard label="Pending Approvals" value={approvalQueue.length.toString()} change="0" changeType="neutral" />
        <StatsCard label="Active Agents" value="2" change="+0" changeType="neutral" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Live Activity (Combined)</h2>
            <AgentRunsTable runs={mixedRuns as any} />
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
