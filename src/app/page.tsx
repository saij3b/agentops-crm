import { StatsCard } from "@/components/StatsCard";
import AgentRunsTable from "@/components/AgentRunsTable";
import ApprovalCenter from "@/components/ApprovalCenter";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { agentRuns, approvalQueue, activityTimeline as mockActivityTimeline, projects } from "@/lib/data";
import { getLiveActivity, getRepoStatus } from "@/lib/github";

export default async function Home() {
  const liveEvents = await getLiveActivity(projects);
  const displayEvents = liveEvents.length > 0 ? liveEvents : mockActivityTimeline;

  let openIssues = 0;
  let openPRs = 0;

  if (projects.length > 0) {
    const firstProject = projects[0];
    let repoPath = firstProject.repo;
    if (repoPath.includes('github.com/')) {
      repoPath = repoPath.split('github.com/')[1];
    }
    const [owner, repo] = repoPath.split('/');
    if (owner && repo) {
      const status = await getRepoStatus(owner, repo);
      if (status) {
        openIssues = status.openIssues;
        openPRs = status.openPRs;
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard label="Active Projects" value={projects.length.toString()} change="+0" changeType="neutral" />
        <StatsCard label="Open Issues" value={openIssues.toString()} change={openIssues > 0 ? `+${openIssues}` : "0"} changeType={openIssues > 0 ? "increase" : "neutral"} />
        <StatsCard label="Open PRs" value={openPRs.toString()} change={openPRs > 0 ? `+${openPRs}` : "0"} changeType={openPRs > 0 ? "increase" : "neutral"} />
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
          <ActivityTimeline events={displayEvents} />
        </div>
      </div>
    </div>
  );
}
