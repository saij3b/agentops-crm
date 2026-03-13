import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import AgentRunsTable from "@/components/AgentRunsTable";
import ApprovalCenter from "@/components/ApprovalCenter";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { approvalQueue } from "@/lib/data";
import { getLiveIssues, getLivePullRequests } from "@/lib/github";
import { getAgentRuns, getActivityTimeline } from "@/lib/services";

export default async function Home() {
  const [runs, timeline, livePRs, liveIssues] = await Promise.all([
    getAgentRuns(),
    getActivityTimeline(),
    getLivePullRequests("saij3b", "agentops-crm"),
    getLiveIssues("saij3b", "agentops-crm"),
  ]);

  const mixedRuns = [
    ...livePRs.map((pr) => ({
      id: pr.id,
      agent: pr.user || "Unknown",
      role: "Contributor",
      project: "AgentOps CRM",
      task: pr.title,
      status: pr.state === "open" ? (pr.isDraft ? "pending" : "running") : "completed",
      startTime: pr.updatedAt,
      duration: "--",
      failureCount: 0,
      linkedPR: pr.url,
    })),
    ...runs,
  ].slice(0, 10);

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold uppercase rounded-md tracking-widest border border-green-200 dark:border-green-800">
          PostgreSQL Ready
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          label="Active Pull Requests"
          value={livePRs.filter((pr) => !pr.isDraft && pr.state === "open").length.toString()}
          change={`Total: ${livePRs.length}`}
          changeType="neutral"
        />
        <StatsCard
          label="Open Issues"
          value={liveIssues.length.toString()}
          change="Live"
          changeType="neutral"
        />
        <StatsCard
          label="Pending Approvals"
          value={approvalQueue.length.toString()}
          change="0"
          changeType="neutral"
        />
        <StatsCard label="Active Agents" value="2" change="+0" changeType="neutral" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Live Activity</h2>
            <AgentRunsTable runs={mixedRuns} />
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
