import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, clients } from '@/lib/data';
import { getLivePullRequests, getLiveIssues } from '@/lib/github';
import StatusBadge from '@/components/StatusBadge';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const client = clients.find((c) => c.id === project.clientId);
  const livePRs = await getLivePullRequests(project.repo);
  const liveIssues = await getLiveIssues(project.repo);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/projects" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          &larr; Back to Projects
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg dark:bg-zinc-900 border dark:border-zinc-800">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Live GitHub Status</h3>
            </div>
            <div className="border-t border-gray-200 dark:border-zinc-800 p-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Active Pull Requests</h4>
                <div className="space-y-3">
                  {livePRs.filter(pr => pr.state === 'open').map(pr => (
                    <div key={pr.id} className="flex items-center justify-between p-3 border rounded-lg dark:border-zinc-800">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{pr.title}</p>
                        <p className="text-xs text-gray-500">#{pr.number} by {pr.user}</p>
                      </div>
                      <StatusBadge status={pr.isDraft ? 'pending' : 'running'} />
                    </div>
                  ))}
                  {livePRs.filter(pr => pr.state === 'open').length === 0 && (
                    <p className="text-sm text-gray-500">No active pull requests.</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Open Issues</h4>
                <div className="space-y-3">
                  {liveIssues.map(issue => (
                    <div key={issue.id} className="flex items-center justify-between p-3 border rounded-lg dark:border-zinc-800">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{issue.title}</p>
                        <p className="text-xs text-gray-500">#{issue.number} by {issue.user}</p>
                      </div>
                      <div className="flex gap-1">
                        {issue.labels.map(label => (
                          <span key={label} className="px-2 py-0.5 text-[10px] bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {liveIssues.length === 0 && (
                    <p className="text-sm text-gray-500">No open issues.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg dark:bg-zinc-900 border dark:border-zinc-800">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Project Specs</h3>
            </div>
            <div className="border-t border-gray-200 dark:border-zinc-800 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-zinc-800">
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400">Client</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {client ? (
                      <Link href={`/clients/${client.id}`} className="text-blue-600 hover:underline dark:text-blue-400">
                        {client.name}
                      </Link>
                    ) : 'Unknown'}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400">Milestone</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{project.milestone}</dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400">Repository</dt>
                  <dd className="mt-1 text-sm text-blue-600 dark:text-blue-400 truncate">
                    <a href={project.repo} target="_blank" rel="noopener noreferrer">{project.repo}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
