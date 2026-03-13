import { prisma } from "./prisma";
import * as mockData from "./data";
import type { ActivityEvent, ActivityType, AgentRun, Client, Project, Status } from "./types";

function toStatus(value: string): Status {
  return value as Status;
}

function toActivityType(value: string): ActivityType {
  return value as ActivityType;
}

function parseMetadata(metadata: string | null | undefined): ActivityEvent["metadata"] {
  if (!metadata) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(metadata);
    return typeof parsed === "object" && parsed !== null
      ? (parsed as ActivityEvent["metadata"])
      : { reason: String(parsed) };
  } catch {
    return { reason: metadata };
  }
}

export async function getAgentRuns(): Promise<AgentRun[]> {
  try {
    const runs = await prisma.agentRun.findMany({
      orderBy: { startTime: "desc" },
    });
    if (runs.length === 0) {
      return mockData.agentRuns;
    }

    return runs.map((run) => ({
      id: run.id,
      agent: run.agent,
      role: run.role,
      project: run.project,
      task: run.task,
      status: toStatus(run.status),
      startTime: run.startTime.toISOString(),
      duration: run.duration,
      failureCount: run.failureCount,
      linkedPR: run.linkedPR || undefined,
    }));
  } catch (error) {
    console.error("DB fetch error (AgentRuns), falling back to mock:", error);
    return mockData.agentRuns;
  }
}

export async function getActivityTimeline(): Promise<ActivityEvent[]> {
  try {
    const events = await prisma.activityEvent.findMany({
      orderBy: { timestamp: "desc" },
    });
    if (events.length === 0) {
      return mockData.activityTimeline;
    }

    return events.map((event) => ({
      id: event.id,
      type: toActivityType(event.type),
      timestamp: event.timestamp.toISOString(),
      actor: { name: event.actorName },
      target: {
        id: event.targetId,
        title: event.targetTitle,
        type: event.targetType as ActivityEvent["target"]["type"],
      },
      metadata: parseMetadata(event.metadata),
    }));
  } catch (error) {
    console.error("DB fetch error (Timeline), falling back to mock:", error);
    return mockData.activityTimeline;
  }
}

export async function getClients(): Promise<Client[]> {
  try {
    const clients = await prisma.client.findMany();
    if (clients.length === 0) {
      return mockData.clients;
    }

    return clients.map((client) => ({
      id: client.id,
      name: client.name,
      company: client.company,
      status: client.status as Client["status"],
      priority: client.priority as Client["priority"],
    }));
  } catch {
    return mockData.clients;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany();
    if (projects.length === 0) {
      return mockData.projects;
    }

    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      clientId: project.clientId,
      repo: project.repo,
      status: project.status as Project["status"],
      milestone: project.milestone,
      agentLane: project.agentLane,
      blockers: [],
    }));
  } catch {
    return mockData.projects;
  }
}
