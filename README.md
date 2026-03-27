# AgentOps CRM

AgentOps CRM is a Next.js dashboard for tracking autonomous work across clients, projects, approvals, and live operational activity.

## Current scope
The current implementation now covers:
- consolidated Phase 2 foundation work: Prisma-backed persistence, GitHub integration, WebSocket monitoring, orchestration controls
- Phase 3 product slices: live activity ingestion, app sessions and role-aware approvals, advanced search and analytics
- production-grade PostgreSQL runtime preparation
- persistent dark mode toggle

## Tech stack
- Next.js 15 App Router
- TypeScript
- Tailwind CSS 4
- Prisma ORM
- PostgreSQL-ready schema and migrations

## Environment
Copy `.env.example` to `.env.local` and provide the values you actually use.

```bash
cp .env.example .env.local
```

Environment variables:
- `DATABASE_URL`: required for the real PostgreSQL runtime
- `GITHUB_TOKEN`: enables live GitHub issue/PR data in the UI
- `CRM_API_KEY`: protects `POST /api/events`

The app still preserves safe mock fallbacks when `DATABASE_URL` is not configured, so review builds stay stable without a live database.

## Local development
```bash
npm install
npm run lint
npm run build
npm run dev
```

## Database workflow
Generate the Prisma client, apply migrations, and seed the database against PostgreSQL.

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Repository layout
- `src/app`: pages, routes, and layouts
- `src/components`: dashboard UI and interaction components
- `src/lib`: auth, data services, GitHub integration, theme state, and shared types
- `prisma`: schema, migration SQL, and seed data
