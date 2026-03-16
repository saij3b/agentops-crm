import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import StatusBadge from "@/components/StatusBadge";
import { approvalQueue } from "@/lib/data";
import { getLiveIssues, getLivePullRequests } from "@/lib/github";
import { getAgentRuns, getClients, getProjects, getActivityTimeline } from "@/lib/services";
import type { ActivityEvent, AgentRun, Client, Project, Status } from "@/lib/types";

interface AnalyticsPageProps {
  searchParams?: Promise<{
    q?: string;
    status?: string;
  }>;
}

function includesQuery(values: Array<string | undefined>, query: string) {
  if (!query) {
    return true;
  }

  const normalized = query.toLowerCase();
  return values.some((value) => value?.toLowerCase().includes(normalized));
}

function statusMatches(status: string, activeStatus: string) {
  return !activeStatus || status === activeStatus;
}

function summarizeByStatus<T extends { status: Status }>(items: T[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
}

function filterClients(clients: Client[], query: string) {
  return clients.filter((client) => includesQuery([client.name, client.company, client.priority, client.status], query));
}

function filterProjects(projects: Project[], query: string, activeStatus: string) {
  return projects.filter(
    (project) =>
      includesQuery([project.name, project.repo, project.milestone, project.agentLane], query) &&
      statusMatches(project.status, activeStatus),
  );
}

function filterRuns(runs: AgentRun[], query: string, activeStatus: string) {
  return runs.filter(
    (run) =>
      includesQuery([run.agent, run.role, run.project, run.task], query) &&
      statusMatches(run.status, activeStatus),
  );
}

function filterEvents(events: ActivityEvent[], query: string) {
  return events.filter((event) =>
    includesQuery(
      [
        event.actor.name,
        event.target.title,
        event.target.type,
        event.metadata?.branchName,
        event.metadata?.reason,
        event.metadata?.prNumber?.toString(),
      ],
      query,
    ),
  );
}

export default async function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  const params = (await searchParams) ?? {};
  const query = params.q?.trim() ?? "";
  const activeStatus = params.status?.trim() ?? "";
  const repo = "saij3b/agentops-crm";

  const [clients, projects, runs, timeline, livePRs, liveIssues] = await Promise.all([
    getClients(),
    getProjects(),
    getAgentRuns(),
    getActivityTimeline(),
    getLivePullRequests(repo),
    getLiveIssues(repo),
  ]);

  const matchingClients = filterClients(clients, query);
  const matchingProjects = filterProjects(projects, query, activeStatus);
  const matchingRuns = filterRuns(runs, query, activeStatus);
  const matchingEvents = filterEvents(timeline, query);

  const totalMatches = matchingClients.length + matchingProjects.length + matchingRuns.length + matchingEvents.length;
  const projectStatusSummary = summarizeByStatus(projects);
  const runStatusSummary = summarizeByStatus(runs);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Advanced Search & Analytics</h1>
              <p className="text-sm text-slate-500 dark:text-zinc-400">
                Search across CRM entities and monitor live product signals without leaving the dashboard.
              </p>
            </div>
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-[10px] font-bold uppercase rounded-md tracking-widest">
              Phase 3
            </span>
          </div>

          <form className="grid gap-3 md:grid-cols-[minmax(0,1fr),220px,auto]">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search clients, projects, runs, or timeline activity"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
            <select
              name="status"
              defaultValue={activeStatus}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            >
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In progress</option>
              <option value="on-hold">On hold</option>
              <option value="lead">Lead</option>
            </select>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard label="Search Matches" value={totalMatches.toString()} change={query ? `Query: ${query}` : "No filter"} changeType="neutral" source="mock" />
          <StatsCard label="Live Pull Requests" value={livePRs.length.toString()} change={`${liveIssues.length} open issues`} changeType="neutral" source={livePRs.length || liveIssues.length ? "live" : "mock"} />
          <StatsCard label="Pending Approvals" value={approvalQueue.filter((item) => item.status === "pending").length.toString()} change={`${approvalQueue.length} total`} changeType="neutral" source="mock" />
          <StatsCard label="Tracked Agent Runs" value={runs.length.toString()} change={`${Object.keys(runStatusSummary).length} statuses`} changeType="neutral" source="mock" />
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.35fr,1fr]">
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Search Results</h2>
                <p className="text-sm text-slate-500 dark:text-zinc-400">Filtered results across clients, projects, runs, and recent timeline activity.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Clients</h3>
                <div className="space-y-2">
                  {matchingClients.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-zinc-400">No client matches.</p>
                  ) : (
                    matchingClients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 dark:border-zinc-800">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{client.name}</p>
                          <p className="text-sm text-slate-500 dark:text-zinc-400">{client.company}</p>
                        </div>
                        <StatusBadge status={client.status} />
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Projects</h3>
                <div className="space-y-2">
                  {matchingProjects.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-zinc-400">No project matches.</p>
                  ) : (
                    matchingProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 dark:border-zinc-800">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{project.name}</p>
                          <p className="text-sm text-slate-500 dark:text-zinc-400">{project.repo}</p>
                        </div>
                        <StatusBadge status={project.status} />
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Agent Runs</h3>
                <div className="space-y-2">
                  {matchingRuns.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-zinc-400">No run matches.</p>
                  ) : (
                    matchingRuns.map((run) => (
                      <div key={run.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 dark:border-zinc-800">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{run.task}</p>
                          <p className="text-sm text-slate-500 dark:text-zinc-400">{run.agent} · {run.project}</p>
                        </div>
                        <StatusBadge status={run.status} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Project Status Breakdown</h2>
              <div className="space-y-3">
                {Object.entries(projectStatusSummary).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-zinc-800/60">
                    <span className="text-sm font-medium text-slate-700 dark:text-zinc-200">{status}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{count}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Run Status Breakdown</h2>
              <div className="space-y-3">
                {Object.entries(runStatusSummary).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-zinc-800/60">
                    <span className="text-sm font-medium text-slate-700 dark:text-zinc-200">{status}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{count}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Recent Timeline Matches</h2>
              <div className="space-y-3">
                {matchingEvents.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-zinc-400">No timeline matches.</p>
                ) : (
                  matchingEvents.slice(0, 6).map((event) => (
                    <div key={event.id} className="rounded-xl border border-slate-100 px-4 py-3 dark:border-zinc-800">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{event.target.title}</p>
                      <p className="text-xs text-slate-500 dark:text-zinc-400">
                        {event.actor.name} · {event.type} · {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
