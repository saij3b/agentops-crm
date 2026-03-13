"use client";

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-black dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                AgentOps CRM
              </Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/clients"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-gray-400 dark:hover:text-gray-300"
              >
                Clients
              </Link>
              <Link
                href="/projects"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-gray-400 dark:hover:text-gray-300"
              >
                Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
