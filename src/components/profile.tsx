"use client";

import React from 'react';

export default function Profile() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
          <span className="text-2xl text-zinc-500 dark:text-zinc-400 font-semibold">UP</span>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">User Profile</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">user@example.com</p>

          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 text-sm rounded-full">
              Member
            </span>
            <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-full">
              Developer
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">About</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          This is a scaffold for the user profile page. You can customize this section with bio, preferences, and other user-specific information.
        </p>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button className="px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors">
          Settings
        </button>
        <button className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
