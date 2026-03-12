export type Status = 'running' | 'failed' | 'pending' | 'completed' | 'approved' | 'rejected';

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
