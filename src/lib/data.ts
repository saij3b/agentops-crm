import { Client, Project, AgentRun, ApprovalItem, ActivityEvent, Agent } from './types';

export const clients: Client[] = [
  { id: 'c1', name: 'Alice Smith', company: 'TechCorp', status: 'active', priority: 'high' },
  { id: 'c2', name: 'Bob Jones', company: 'SoftSys', status: 'lead', priority: 'medium' },
];

export const projects: Project[] = [
  { 
    id: 'p1', 
    name: 'Unified Intake', 
    clientId: 'c1', 
    repo: 'saij3b/agentops-crm', 
    status: 'in-progress', 
    milestone: 'Phase 1 MVP', 
    agentLane: 'main', 
    blockers: [] 
  },
];

export const agentRuns: AgentRun[] = [
  {
    id: 'run-1',
    agent: 'Jules',
    role: 'Senior Builder',
    project: 'AgentOps CRM',
    task: 'Implement Activity Timeline',
    status: 'completed',
    startTime: '2023-10-27T09:00:00Z',
    duration: '2h 15m',
    failureCount: 0,
    linkedPR: '#5'
  },
  {
    id: 'run-2',
    agent: 'Codex',
    role: 'Staff Reviewer',
    project: 'AgentOps CRM',
    task: 'Review Activity Timeline',
    status: 'pending',
    startTime: '2023-10-27T11:30:00Z',
    duration: '--',
    failureCount: 0
  }
];

export const approvalQueue: ApprovalItem[] = [
  {
    id: 'app-1',
    type: 'merge',
    description: 'Merge pr-5: Activity Timeline',
    status: 'pending'
  }
];

export const agents: Agent[] = [
  { id: 'a1', name: 'Jules', role: 'Senior Builder', status: 'busy', activeIssues: 2 },
  { id: 'a2', name: 'Codex', role: 'Staff Reviewer', status: 'idle', activeIssues: 1 },
];

export const activityTimeline: ActivityEvent[] = [
  {
    id: 'e1',
    type: 'issue_created',
    timestamp: '2023-10-27T08:00:00Z',
    actor: { name: 'System' },
    target: { id: 'ISSUE-10', title: 'Implement Activity Timeline', type: 'issue' },
  },
  {
    id: 'e2',
    type: 'pr_opened',
    timestamp: '2023-10-27T11:30:00Z',
    actor: { name: 'Jules' },
    target: { id: 'PR-5', title: 'feat: activity timeline', type: 'pull_request' },
    metadata: { prNumber: 5, branchName: 'feat/activity-timeline' },
  },
];

export const navItems = [
  { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { name: 'Clients', href: '/clients', icon: 'Users' },
  { name: 'Projects', href: '/projects', icon: 'FolderKanban' },
  { name: 'Orchestration', href: '/orchestration', icon: 'Radio' },
];
