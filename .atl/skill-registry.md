# Skill Registry - saas-api

## User Skills
| Skill | Trigger | Path |
|-------|---------|------|
| branch-pr | When creating a pull request, opening a PR, or preparing changes for review. | C:\Users\Admin\.gemini\antigravity\skills\branch-pr\SKILL.md |
| go-testing | When writing Go tests, using teatest, or adding test coverage. | C:\Users\Admin\.gemini\antigravity\skills\go-testing\SKILL.md |
| issue-creation | When creating a GitHub issue, reporting a bug, or requesting a feature. | C:\Users\Admin\.gemini\antigravity\skills\issue-creation\SKILL.md |
| judgment-day | When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen". | C:\Users\Admin\.gemini\antigravity\skills\judgment-day\SKILL.md |
| nestjs-best-practices | NestJS best practices and architecture patterns for building production-ready applications. | C:\Users\Admin\Documents\repositorios\sarit\saas-api\.agents\skills\nestjs-best-practices\SKILL.md |
| nodejs-backend-patterns | Build production-ready Node.js backend services with Express/Fastify. | C:\Users\Admin\Documents\repositorios\sarit\saas-api\.agents\skills\nodejs-backend-patterns\SKILL.md |
| nodejs-best-practices | Node.js development principles and decision-making. | C:\Users\Admin\Documents\repositorios\sarit\saas-api\.agents\skills\nodejs-best-practices\SKILL.md |
| prisma-cli | Prisma CLI commands reference covering all available commands, options, and usage patterns. | C:\Users\Admin\Documents\repositorios\sarit\saas-api\.agents\skills\prisma-cli\SKILL.md |
| prisma-client-api | Prisma Client API reference covering model queries, filters, operators, and client methods. | C:\Users\Admin\Documents\repositorios\sarit\saas-api\.agents\skills\prisma-client-api\SKILL.md |
| prisma-database-setup | Guides for configuring Prisma with different database providers. | C:\Users\Admin\Documents\repositorios\sarit\saas-api\.agents\skills\prisma-database-setup\SKILL.md |
| prisma-postgres | Prisma Postgres setup and operations guidance. | C:\Users\Admin\Documents\repositorios\sarit\saas-api\.agents\skills\prisma-postgres\SKILL.md |
| skill-creator | When user asks to create a new skill, add agent instructions, or document patterns for AI. | C:\Users\Admin\.gemini\antigravity\skills\skill-creator\SKILL.md |
| typescript-advanced-types | Master TypeScript's advanced type system including generics, conditional types, etc. | C:\Users\Admin\Documents\repositorios\sarit\saas-api\.agents\skills\typescript-advanced-types\SKILL.md |

## Project Conventions
No project-specific instruction files (CLAUDE.md, etc.) detected.

## Compact Rules
### Project Standards (auto-resolved)
- **Stack**: NestJS v11, Prisma v7, TypeScript v5.
- **Testing**: Jest for unit/int/e2e. Integration tests use Testcontainers.
- **Linting**: ESLint v9, Prettier.
- **Auth**: Passport + JWT.
- **Database**: PostgreSQL (via Prisma).
