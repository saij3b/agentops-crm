import { prisma } from './prisma';
import * as mockData from './data';
import { AgentRun, ActivityEvent, Client, Project } from './types';

export async function getAgentRuns(): Promise<AgentRun[]> {
  try {
    const runs = await prisma.agentRun.findMany({
      orderBy: { startTime: 'desc' }
    });
    if (runs.length === 0) return mockData.agentRuns;
    return runs.map(r => ({
      ...r,
      startTime: r.startTime.toISOString(),
      status: r.status as any
    }));
  } catch (e) {
    console.error('DB fetch error (AgentRuns), falling back to mock:', e);
    return mockData.agentRuns;
  }
}

export async function getActivityTimeline(): Promise<ActivityEvent[]> {
  try {
    const events = await prisma.activityEvent.findMany({
      orderBy: { timestamp: 'desc' }
    });
    if (events.length === 0) return mockData.activityTimeline;
    return events.map(e => ({
      id: e.id,
      type: e.type as any,
      timestamp: e.timestamp.toISOString(),
      actor: { name: e.actorName },
      target: { id: e.targetId, title: e.targetTitle, type: e.targetType as any }
    }));
  } catch (e) {
    console.error('DB fetch error (Timeline), falling back to mock:', e);
    return mockData.activityTimeline;
  }
}

export async function getClients(): Promise<Client[]> {
  try {
    const clients = await prisma.client.findMany();
    if (clients.length === 0) return mockData.clients;
    return clients.map(c => ({
      ...c,
      status: c.status as any,
      priority: c.priority as any
    }));
  } catch (e) {
    return mockData.clients;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany();
    if (projects.length === 0) return mockData.projects;
    return projects.map(p => ({
      ...p,
      status: p.status as any,
      blockers: [] // Flattened for now
    }));
  } catch (e) {
    return mockData.projects;
  }
}
