"use client";

import React from 'react';
import { ActivityEvent, ActivityType } from '@/lib/types';
import { formatClockTime } from '@/lib/format';

const getEventDescription = (event: ActivityEvent) => {
  switch (event.type) {
    case 'issue_created':
      return `created issue ${event.target.id}`;
    case 'agent_assigned':
      return `was assigned to ${event.target.id}`;
    case 'branch_created':
      return `created branch ${event.metadata?.branchName} for ${event.target.id}`;
    case 'pr_opened':
      return `opened PR #${event.metadata?.prNumber} for ${event.target.id}`;
    case 'issue_blocked':
      return `blocked ${event.target.id}: ${event.metadata?.reason}`;
    case 'issue_completed':
      return `completed ${event.target.id}`;
    default:
      return `performed an action on ${event.target.id}`;
  }
};

const getEventIcon = (type: ActivityType) => {
  switch (type) {
    case 'issue_created':
      return '🆕';
    case 'agent_assigned':
      return '👤';
    case 'branch_created':
      return '🌿';
    case 'pr_opened':
      return '⤴️';
    case 'issue_blocked':
      return '🚫';
    case 'issue_completed':
      return '✅';
    default:
      return '•';
  }
};

interface ActivityTimelineProps {
  events: ActivityEvent[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ events }) => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                    {getEventIcon(event.type)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{event.actor.name}</span>{' '}
                      {getEventDescription(event)}{' '}
                      <span className="font-medium text-gray-900">{event.target.title}</span>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.timestamp}>
                      {formatClockTime(event.timestamp)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
