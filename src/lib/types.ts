export type Status = 'running' | 'failed' | 'pending' | 'completed' | 'approved' | 'rejected' | 'active' | 'inactive' | 'lead' | 'planning' | 'in-progress' | 'on-hold' | 'todo' | 'blocked' | 'done';

export interface Client {
  id: string;
  name: string;
  company: string;
  status: 'active' | 'inactive' | 'lead';
  priority: 'low' | 'medium' | 'high';
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  repo: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  milestone: string;
  agentLane: string;
  blockers: string[];
}

export interface AgentRun {
  id: string;
  agent: string;
  role: string;
  project: string;
  task: string;
  status: Status;
  startTime: string;
  duration: string;
  failureCount: number;
  linkedPR?: string;
}

export interface ApprovalItem {
  id: string;
  type: 'merge' | 'deploy' | 'secret';
  description: string;
  status: Status;
}

export type UserRole = 'admin' | 'reviewer' | 'viewer';

export interface SessionUser {
  id: string;
  name: string;
  title: string;
  role: UserRole;
  description: string;
}

export type ActivityType =
  | 'issue_created'
  | 'agent_assigned'
  | 'branch_created'
  | 'pr_opened'
  | 'issue_blocked'
  | 'issue_completed'
  | 'lane_action';

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
    type: 'issue' | 'pull_request' | 'agent_lane';
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
