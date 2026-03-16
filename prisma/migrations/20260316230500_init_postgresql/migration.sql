CREATE TABLE "Client" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "company" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "priority" TEXT NOT NULL,
  CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Project" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "clientId" TEXT NOT NULL,
  "repo" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "milestone" TEXT NOT NULL,
  "agentLane" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AgentRun" (
  "id" TEXT NOT NULL,
  "agent" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "project" TEXT NOT NULL,
  "task" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "duration" TEXT NOT NULL,
  "failureCount" INTEGER NOT NULL DEFAULT 0,
  "linkedPR" TEXT,
  CONSTRAINT "AgentRun_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ActivityEvent" (
  "id" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "actorName" TEXT NOT NULL,
  "targetId" TEXT NOT NULL,
  "targetTitle" TEXT NOT NULL,
  "targetType" TEXT NOT NULL,
  "metadata" TEXT,
  CONSTRAINT "ActivityEvent_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Project"
ADD CONSTRAINT "Project_clientId_fkey"
FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "Client_status_idx" ON "Client"("status");
CREATE INDEX "Client_priority_idx" ON "Client"("priority");
CREATE INDEX "Project_clientId_idx" ON "Project"("clientId");
CREATE INDEX "Project_status_idx" ON "Project"("status");
CREATE INDEX "Project_repo_idx" ON "Project"("repo");
CREATE INDEX "AgentRun_status_idx" ON "AgentRun"("status");
CREATE INDEX "AgentRun_startTime_idx" ON "AgentRun"("startTime");
CREATE INDEX "AgentRun_project_idx" ON "AgentRun"("project");
CREATE INDEX "ActivityEvent_timestamp_idx" ON "ActivityEvent"("timestamp");
CREATE INDEX "ActivityEvent_type_idx" ON "ActivityEvent"("type");
CREATE INDEX "ActivityEvent_targetType_targetId_idx" ON "ActivityEvent"("targetType", "targetId");
