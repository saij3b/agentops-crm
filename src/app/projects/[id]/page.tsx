import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, clients } from '@/lib/data';

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

  return (
    <div className="space-y-8">
      <div>
        <Link href="/projects" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          &larr; Back to Projects
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg dark:bg-zinc-900 border dark:border-zinc-800">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Project Details</h3>
        </div>
        <div className="border-t border-gray-200 dark:border-zinc-800 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-zinc-800">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400">Client</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                {client ? (
                  <Link href={`/clients/${client.id}`} className="text-blue-600 hover:underline dark:text-blue-400">
                    {client.name} ({client.company})
                  </Link>
                ) : (
                  'Unknown Client'
                )}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white capitalize">{project.status}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400">Repository</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                  {project.repo}
                </a>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400">Milestone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">{project.milestone}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400">Agent Lane</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">{project.agentLane}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400">Blockers</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                {project.blockers.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {project.blockers.map((blocker, index) => (
                      <li key={index} className="text-red-600 dark:text-red-400">{blocker}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-green-600 dark:text-green-400">None</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
