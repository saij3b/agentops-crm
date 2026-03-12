import { AgentRun, ApprovalItem } from '../types';

export const mockAgentRuns: AgentRun[] = [
  {
    id: '1',
    agent: 'AutoCoder',
    role: 'Developer',
    project: 'E-commerce API',
    task: 'Implement checkout logic',
    status: 'running',
    startTime: '2023-10-27T10:00:00Z',
    duration: '15m',
    failureCount: 0,
    linkedPR: 'https://github.com/org/repo/pull/123'
  },
  {
    id: '2',
    agent: 'BugHunter',
    role: 'QA',
    project: 'Mobile App',
    task: 'Fix navigation crash',
    status: 'failed',
    startTime: '2023-10-27T09:30:00Z',
    duration: '45m',
    failureCount: 3,
    linkedPR: 'https://github.com/org/repo/pull/124'
  },
  {
    id: '3',
    agent: 'DeployBot',
    role: 'DevOps',
    project: 'Marketing Site',
    task: 'Deploy to production',
    status: 'pending',
    startTime: '2023-10-27T11:00:00Z',
    duration: '5m',
    failureCount: 0
  },
  {
    id: '4',
    agent: 'SecurityScanner',
    role: 'Security',
    project: 'Auth Service',
    task: 'Vulnerability scan',
    status: 'completed',
    startTime: '2023-10-27T08:00:00Z',
    duration: '2h',
    failureCount: 1
  }
];

export const mockApprovalItems: ApprovalItem[] = [
  {
    id: 'a1',
    type: 'merge',
    description: 'Merge PR #123: Implement checkout logic',
    status: 'pending'
  },
  {
    id: 'a2',
    type: 'deploy',
    description: 'Deploy "Marketing Site" to production',
    status: 'pending'
  },
  {
    id: 'a3',
    type: 'secret',
    description: 'Change DATABASE_URL in production environment',
    status: 'pending'
  }
];
