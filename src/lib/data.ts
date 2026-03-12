export type ActivityType =
  | 'issue_created'
  | 'agent_assigned'
  | 'branch_created'
  | 'pr_opened'
  | 'issue_blocked'
  | 'issue_completed';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  timestamp: string;
  actor: {
    name: string;
    avatar?: string;
  };
  target: {
    id: string;
    title: string;
    type: 'issue' | 'pull_request';
  };
  metadata?: {
    branchName?: string;
    prNumber?: number;
    reason?: string;
  };
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'busy' | 'offline';
  avatar?: string;
  activeIssues: number;
}

export interface Issue {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'blocked' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  createdAt: string;
  updatedAt: string;
}

export const agents: Agent[] = [
  {
    id: 'a1',
    name: 'Jules',
    role: 'Senior Engineer',
    status: 'busy',
    activeIssues: 2,
  },
  {
    id: 'a2',
    name: 'Buster',
    role: 'QA Specialist',
    status: 'idle',
    activeIssues: 0,
  },
  {
    id: 'a3',
    name: 'Nova',
    role: 'Frontend Wizard',
    status: 'busy',
    activeIssues: 1,
  },
];

export const issues: Issue[] = [
  {
    id: 'ISSUE-101',
    title: 'Implement Activity Timeline',
    status: 'in_progress',
    priority: 'high',
    assignee: 'a1',
    createdAt: '2023-10-27T09:00:00Z',
    updatedAt: '2023-10-27T10:30:00Z',
  },
  {
    id: 'ISSUE-102',
    title: 'Seed Data Population',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'a1',
    createdAt: '2023-10-27T09:15:00Z',
    updatedAt: '2023-10-27T10:45:00Z',
  },
  {
    id: 'ISSUE-103',
    title: 'Fix Navigation Bug',
    status: 'todo',
    priority: 'low',
    createdAt: '2023-10-27T08:00:00Z',
    updatedAt: '2023-10-27T08:00:00Z',
  },
  {
    id: 'ISSUE-104',
    title: 'API Rate Limiting',
    status: 'blocked',
    priority: 'urgent',
    assignee: 'a3',
    createdAt: '2023-10-26T14:20:00Z',
    updatedAt: '2023-10-27T11:00:00Z',
  },
];

export const activityTimeline: ActivityEvent[] = [
  {
    id: 'e1',
    type: 'issue_created',
    timestamp: '2023-10-27T08:00:00Z',
    actor: { name: 'System' },
    target: { id: 'ISSUE-103', title: 'Fix Navigation Bug', type: 'issue' },
  },
  {
    id: 'e2',
    type: 'issue_created',
    timestamp: '2023-10-27T09:00:00Z',
    actor: { name: 'Project Manager' },
    target: { id: 'ISSUE-101', title: 'Implement Activity Timeline', type: 'issue' },
  },
  {
    id: 'e3',
    type: 'agent_assigned',
    timestamp: '2023-10-27T09:30:00Z',
    actor: { name: 'Jules' },
    target: { id: 'ISSUE-101', title: 'Implement Activity Timeline', type: 'issue' },
  },
  {
    id: 'e4',
    type: 'branch_created',
    timestamp: '2023-10-27T09:45:00Z',
    actor: { name: 'Jules' },
    target: { id: 'ISSUE-101', title: 'Implement Activity Timeline', type: 'issue' },
    metadata: { branchName: 'feat/activity-timeline' },
  },
  {
    id: 'e5',
    type: 'issue_blocked',
    timestamp: '2023-10-27T11:00:00Z',
    actor: { name: 'Nova' },
    target: { id: 'ISSUE-104', title: 'API Rate Limiting', type: 'issue' },
    metadata: { reason: 'Waiting for infra credentials' },
  },
  {
    id: 'e6',
    type: 'pr_opened',
    timestamp: '2023-10-27T11:30:00Z',
    actor: { name: 'Jules' },
    target: { id: 'ISSUE-101', title: 'Implement Activity Timeline', type: 'issue' },
    metadata: { prNumber: 42, branchName: 'feat/activity-timeline' },
  },
  {
    id: 'e7',
    type: 'issue_completed',
    timestamp: '2023-10-27T12:00:00Z',
    actor: { name: 'Buster' },
    target: { id: 'ISSUE-100', title: 'Initial Setup', type: 'issue' },
  },
];
