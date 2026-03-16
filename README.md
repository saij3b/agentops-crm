# AgentOps CRM

AgentOps CRM is a Next.js dashboard for tracking autonomous work across clients, projects, approvals, and live operational activity.

## Current delivery path
- Phase 2 foundation: Prisma-backed persistence, GitHub integration, WebSocket monitoring, orchestration controls
- Phase 3 slices: live activity ingestion, app sessions and role-aware approvals, advanced search and analytics
- Remaining polish after this stack: dark mode toggle and final release cleanup

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

Required variables:
- `DATABASE_URL`: PostgreSQL connection string for Prisma
- `GITHUB_TOKEN`: used for the live GitHub issue/PR widgets
- `CRM_API_KEY`: used by `POST /api/events`

## Local development
```bash
npm install
npm run lint
npm run build
npm run dev
```

## Database workflow
Generate the Prisma client and apply migrations against a PostgreSQL database.

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

The application still preserves safe mock fallbacks when `DATABASE_URL` is not configured, so review builds stay stable even without a live database.

## Repository layout
- `src/app`: pages, routes, and layouts
- `src/components`: dashboard UI and interaction components
- `src/lib`: auth, data services, GitHub integration, and shared types
- `prisma`: schema, migration SQL, and seed data
