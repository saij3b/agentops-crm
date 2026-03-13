# AgentOps CRM

Unified dashboard for monitoring autonomous agents and issue lifecycles.

## Phase 1 Implementation

- **Unified Activity Feed**: Real-time visibility into issue creation, agent assignments, branch/PR activity, blocks, and completions.
- **Comprehensive Seed Data**: Realistic multi-entity mock data for all Phase 1 views.
- **Agent Monitoring**: Track agent status and workload.
- **Issue Tracking**: Manage and monitor the status of various tasks.
- **Status**: Currently, all data is **mocked** via `src/lib/data.ts` to demonstrate Phase 1 UI/UX.

## Prerequisites

- **Node.js**: v18.0.0 or higher (Tested on v22.12.0)
- **npm**: v9.0.0 or higher

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/saij3b/agentops-crm
    cd agentops-crm
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Access the dashboard**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Phase 2 Roadmap

- **Live Data Integration**: Connect the dashboard to real-world data sources (GitHub API, Jira, etc.).
- **Interactive Actions**: Allow users to assign agents, create issues, and resolve blocks directly from the UI.
- **Advanced Filtering**: Enable filtering of the activity feed and issue lists by agent, priority, or status.
- **Performance Analytics**: Add charts and graphs to visualize agent efficiency and issue resolution times.
- **Authentication & RBAC**: Implement secure login and role-based access control.
