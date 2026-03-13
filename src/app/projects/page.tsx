'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/data';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = projects.filter(
    (project) =>
      (project.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || project.status === statusFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="max-w-md flex-1">
          <input
            type="text"
            placeholder="Search projects by name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md dark:bg-zinc-900">
        <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
          {filteredProjects.map((project) => (
            <li key={project.id}>
              <Link href={`/projects/${project.id}`} className="block hover:bg-gray-50 dark:hover:bg-zinc-800">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate dark:text-blue-400">
                      {project.name}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'planning' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500 dark:text-zinc-400">
                        Milestone: {project.milestone}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 dark:text-zinc-400">
                      <p>Lane: {project.agentLane}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {filteredProjects.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500 dark:text-zinc-400">
              No projects found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
