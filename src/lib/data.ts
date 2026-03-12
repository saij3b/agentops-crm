import { Client, Project } from './types';

export const clients: Client[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    company: 'TechCorp',
    status: 'active',
    priority: 'high',
  },
  {
    id: '2',
    name: 'Bob Smith',
    company: 'Innovate LLC',
    status: 'active',
    priority: 'medium',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    company: 'Design Studio',
    status: 'lead',
    priority: 'low',
  },
];

export const projects: Project[] = [
  {
    id: '101',
    name: 'E-commerce Platform',
    clientId: '1',
    repo: 'https://github.com/techcorp/ecommerce',
    status: 'in-progress',
    milestone: 'v1.0 Launch',
    agentLane: 'Backend Team',
    blockers: ['Payment gateway API downtime'],
  },
  {
    id: '102',
    name: 'Mobile App',
    clientId: '1',
    repo: 'https://github.com/techcorp/mobile-app',
    status: 'planning',
    milestone: 'Design Phase',
    agentLane: 'Design Team',
    blockers: [],
  },
  {
    id: '103',
    name: 'CRM Integration',
    clientId: '2',
    repo: 'https://github.com/innovate/crm-sync',
    status: 'on-hold',
    milestone: 'Data Migration',
    agentLane: 'Data Team',
    blockers: ['Awaiting client approval on data mapping'],
  },
];
