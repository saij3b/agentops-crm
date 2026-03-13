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
