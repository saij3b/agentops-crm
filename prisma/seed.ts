import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing
  await prisma.activityEvent.deleteMany({})
  await prisma.agentRun.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.client.deleteMany({})

  // 1. Clients
  await prisma.client.create({
    data: {
      id: 'c1',
      name: 'Alice Smith',
      company: 'TechCorp',
      status: 'active',
      priority: 'high',
    },
  })

  await prisma.client.create({
    data: {
      id: 'c2',
      name: 'Bob Jones',
      company: 'SoftSys',
      status: 'lead',
      priority: 'medium',
    },
  })

  // 2. Projects
  await prisma.project.create({
    data: {
      id: 'p1',
      name: 'Unified Intake',
      clientId: 'c1',
      repo: 'saij3b/agentops-crm',
      status: 'in-progress',
      milestone: 'Phase 1 MVP',
      agentLane: 'main',
    },
  })

  // 3. Agent Runs
  await prisma.agentRun.createMany({
    data: [
      {
        id: 'run-1',
        agent: 'Jules',
        role: 'Senior Builder',
        project: 'AgentOps CRM',
        task: 'Implement Activity Timeline',
        status: 'completed',
        startTime: new Date('2023-10-27T09:00:00Z'),
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
        startTime: new Date('2023-10-27T11:30:00Z'),
        duration: '--',
        failureCount: 0
      }
    ]
  })

  // 4. Activity events
  await prisma.activityEvent.createMany({
    data: [
      {
        id: 'e1',
        type: 'issue_created',
        timestamp: new Date('2023-10-27T08:00:00Z'),
        actorName: 'System',
        targetId: 'ISSUE-10',
        targetTitle: 'Implement Activity Timeline',
        targetType: 'issue'
      },
      {
        id: 'e2',
        type: 'pr_opened',
        timestamp: new Date('2023-10-27T11:30:00Z'),
        actorName: 'Jules',
        targetId: 'PR-5',
        targetTitle: 'feat: activity timeline',
        targetType: 'pull_request'
      }
    ]
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
