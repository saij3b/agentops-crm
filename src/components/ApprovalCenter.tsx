"use client";

import React, { useState } from 'react';
import { ApprovalItem } from '@/lib/types';
import StatusBadge from './StatusBadge';

interface ApprovalCenterProps {
  initialItems: ApprovalItem[];
}

const ApprovalCenter: React.FC<ApprovalCenterProps> = ({ initialItems }) => {
  const [items, setItems] = useState<ApprovalItem[]>(initialItems);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, status: action === 'approve' ? 'approved' : 'rejected' }
          : item
      )
    );
  };

  const pendingItems = items.filter((item) => item.status === 'pending');
  const completedItems = items.filter((item) => item.status !== 'pending');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Approval Center</h2>
        {pendingItems.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-zinc-400">No pending approvals.</p>
        ) : (
          <div className="grid gap-4">
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {item.type}
                    </span>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm text-gray-700 dark:text-zinc-300">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(item.id, 'reject')}
                    className="px-3 py-1 text-sm font-medium text-red-600 border border-red-200 rounded hover:bg-red-50 dark:text-red-400 dark:border-red-900/50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'approve')}
                    className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {completedItems.length > 0 && (
        <div className="flex flex-col gap-4 opacity-60">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Recently Processed</h3>
          <div className="grid gap-2">
            {completedItems.map((item) => (
              <div
                key={item.id}
                className="p-3 border rounded-lg dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 flex items-center justify-between"
              >
                <p className="text-xs text-gray-600 dark:text-zinc-400">{item.description}</p>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalCenter;
