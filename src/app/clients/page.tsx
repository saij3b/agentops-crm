'use client';

import { useState } from 'react';
import Link from 'next/link';
import { clients } from '@/lib/data';

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h1>
      </div>

      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search clients by name or company..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md dark:bg-zinc-900">
        <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
          {filteredClients.map((client) => (
            <li key={client.id}>
              <Link href={`/clients/${client.id}`} className="block hover:bg-gray-50 dark:hover:bg-zinc-800">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate dark:text-blue-400">
                      {client.name}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {client.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500 dark:text-zinc-400">
                        {client.company}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 dark:text-zinc-400">
                      <p>Priority: {client.priority}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {filteredClients.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500 dark:text-zinc-400">
              No clients found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
