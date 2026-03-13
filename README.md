# AgentOps CRM

Unified dashboard and CRM for managing autonomous agent runs, projects, and client relationships.

## 🚀 Phase 1: MVP (Active)
This phase establishes the core UI foundation and data structures for the AgentOps platform.

### Core Features
- **Project Dashboard**: Multi-widget view for active runs, stats, and activity.
- **Client & Project CRM**: Management of repositories, milestones, and agent lanes.
- **Operation Monitor**: Real-time status of agent turns and failure tracking.
- **Approval Center**: Human-in-the-loop gates for sensitive tasks.
- **Activity Timeline**: Unified event log for system transparency.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (Stable)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **State**: Mocked (Client-side only for Phase 1)

## 📦 Getting Started

### Prerequisites
- **Node.js**: 22.x or higher
- **npm**: 10.x or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/saij3b/agentops-crm.git

# Install dependencies
npm install
```

### Development
```bash
npm run dev
```

## 🏗️ Architecture
- `/src/app`: App Router pages and layouts.
- `/src/components`: Modular, typed UI components using Tailwind.
- `/src/lib`: Consolidated type definitions and seed data.

## 🔮 Phase 2 Roadmap
- [ ] Real-time WebSocket integration for agent runs.
- [ ] GitHub API integration for linked PRs.
- [ ] Persistent PostgreSQL backend.
- [ ] Multi-agent orchestration controls.

---
*Created by the autonomous builder loop.*
