import Link from 'next/link';
import { notFound } from 'next/navigation';
import { clients, projects } from '@/lib/data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params;
  const client = clients.find((c) => c.id === id);

  if (!client) {
    notFound();
  }

  const linkedProjects = projects.filter((p) => p.clientId === id);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/clients" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          &larr; Back to Clients
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{client.name}</h1>
        <p className="text-xl text-gray-600 dark:text-zinc-400">{client.company}</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg dark:bg-zinc-900 border dark:border-zinc-800">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Client Information</h3>
        </div>
        <div className="border-t border-gray-200 dark:border-zinc-800 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-zinc-800">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white capitalize">{client.status}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-zinc-400">Priority</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white capitalize">{client.priority}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Linked Projects</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md dark:bg-zinc-900 border dark:border-zinc-800">
          <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
            {linkedProjects.map((project) => (
              <li key={project.id}>
                <Link href={`/projects/${project.id}`} className="block hover:bg-gray-50 dark:hover:bg-zinc-800">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate dark:text-blue-400">
                        {project.name}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {project.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
            {linkedProjects.length === 0 && (
              <li className="px-4 py-8 text-center text-gray-500 dark:text-zinc-400">
                No linked projects.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
