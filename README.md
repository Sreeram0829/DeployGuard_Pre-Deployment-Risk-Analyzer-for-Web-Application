# DeployGuard

> **Scan Your Web App Before You Ship.**

DeployGuard is a full-stack developer tool that analyzes a web application's source code and project configuration before deployment. Upload a ZIP, run a static scan, and receive a deployment-readiness report with a score, category breakdown, severity-ranked findings, affected files, evidence, and practical fixes.

## Key features

- Secure ZIP inspection without executing uploaded application code.
- Secret and environment-variable exposure checks.
- Localhost, CORS, environment, package, lockfile, build, framework, Node.js, and asset checks.
- Centralized severity and deployment-readiness scoring.
- Authenticated projects and scan history backed by PostgreSQL + Prisma.
- Responsive dashboard with scan history and finding details.
- Vitest scanner/scoring tests and GitHub Actions CI.
- Deployable to Vercel with Neon PostgreSQL.

## Architecture

```text
ZIP upload
   ↓
Extraction (safe path validation + limits)
   ↓
File discovery
   ↓
File reading
   ↓
Rule execution
   ↓
Typed findings
   ↓
Central scoring engine
   ↓
PostgreSQL / Prisma
   ↓
Next.js report UI
```

The scanner is independent of the UI. A future GitHub repository source can provide an already-available project directory to the same scanner engine.

## Technology stack

- Next.js App Router + React + TypeScript
- Tailwind CSS + shadcn/ui-style components
- Lucide React + Recharts
- PostgreSQL + Prisma ORM
- Auth.js / NextAuth credentials authentication
- Zod validation
- Node.js filesystem APIs, `adm-zip`, `fast-glob`
- Vitest + ESLint + GitHub Actions
- Vercel + Neon PostgreSQL for production

## Folder structure

The repository follows the supplied architecture: application routes live in `src/app`, reusable UI in `src/components`, domain actions in `src/actions`, scanner logic in `src/scanner`, shared types in `src/types`, and configuration in `src/config`.

## Local setup

### 1. Requirements

- Node.js 20+
- PostgreSQL 14+
- npm

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy `.env.example` to `.env` and set a PostgreSQL connection string plus a strong `NEXTAUTH_SECRET`.

### 4. Create the database

Create a local PostgreSQL database named `deployguard`, then run:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

The seed creates a demo account using the email `demo@deployguard.dev` and password `DeployGuard123!`.

### 5. Start the application

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | Application URL used by NextAuth |
| `NEXTAUTH_SECRET` | Session signing secret |
| `MAX_UPLOAD_SIZE_MB` | Maximum ZIP upload size |
| `MAX_EXTRACTED_FILES` | Maximum files extracted from a ZIP |
| `MAX_FILE_SIZE_MB` | Maximum individual inspected file size |

Never commit `.env`. The scanner is designed to detect potentially exposed secrets inside scanned projects; that does not make application environment secrets safe to commit.

## Development commands

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run db:generate
npm run db:push
npm run db:seed
```

## Scanner rules

### Security

- `SEC-001`: probable secret detection
- `SEC-002`: exposed environment-file detection
- `SEC-003`: unsafe CORS detection

### Configuration

- `CFG-001`: hardcoded localhost URL
- `CFG-002`: environment-variable configuration validation
- `CFG-003`: common configuration validation

### Dependencies

- `DEP-001`: package manifest validation
- `DEP-002`: lockfile validation
- `DEP-003`: dependency configuration analysis

### Build

- `BLD-001`: build script validation
- `BLD-002`: framework detection
- `BLD-003`: Node.js version/configuration validation

### Performance

- `PERF-001`: unusually large files
- `PERF-002`: large frontend assets

Rules are intentionally static: DeployGuard reads source/configuration and does not install or execute the uploaded application.

## Scoring

The scoring engine starts at 100 and applies severity-weighted deductions, with category scores calculated independently. Severity weights are centralized in `src/scanner/scoring/severity.ts`; UI components never implement scoring rules themselves.

Severity levels:

- CRITICAL
- HIGH
- MEDIUM
- LOW
- INFO

## Production deployment

### Neon

Create a PostgreSQL database with Neon and set `DATABASE_URL` in Vercel. Run Prisma generation as part of the build and use `prisma migrate deploy` for a migration-based production workflow.

### Vercel

Set the production environment variables in Vercel and deploy the repository. The application is intentionally designed without AWS, Python services, Redis, Kubernetes, or paid AI APIs.

## GitHub workflow

`.github/workflows/ci.yml` installs dependencies, generates Prisma Client, runs lint, TypeScript checks, tests, and the production build. `.github/workflows/deploy.yml` documents a Vercel deployment workflow using repository secrets.

## Screenshots

Place project screenshots in `public/screenshots/` and reference them here as the UI is finalized.

## Limitations / future improvements

- GitHub repository scanning can reuse the scanner engine but is not implemented yet.
- Dependency analysis is configuration-oriented and does not replace a dedicated vulnerability database.
- ZIP scanning is bounded by extraction/file-size limits for safety.
- Large scans may eventually benefit from a background job architecture, but the current version intentionally avoids unnecessary infrastructure.
