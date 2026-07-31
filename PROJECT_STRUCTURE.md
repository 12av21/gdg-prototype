# PROJECT_STRUCTURE.md

# Smart Cybersecurity Intelligence Platform (SCIP)

**Version:** 1.0

---

# Repository Philosophy

SCIP follows a **modular monorepo architecture**. Each module has a single responsibility and can evolve independently while sharing common libraries.

**Design Principles**

* Clean Architecture
* Domain-Driven Design (DDD)
* SOLID Principles
* Feature-first organization
* Shared reusable packages
* API-first development
* AI-first design

---

# Complete Repository Structure

```text
SCIP/
│
├── apps/
│   ├── web/                     # React Frontend
│   ├── api/                     # ASP.NET Core Backend
│   └── ai-service/              # RAG & AI Processing
│
├── packages/
│   ├── ui/
│   ├── auth/
│   ├── shared/
│   ├── database/
│   ├── config/
│   ├── types/
│   └── utils/
│
├── docs/
│
├── infrastructure/
│
├── tests/
│
├── scripts/
│
├── .github/
│
├── .ai/
│
├── mcp/
│
├── docker-compose.yml
├── README.md
├── LICENSE
└── .gitignore
```

---

# apps/web (Frontend)

```text
web/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   ├── dashboard/
│   │   ├── tables/
│   │   ├── charts/
│   │   ├── modals/
│   │   └── ai/
│   │
│   ├── pages/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── incidents/
│   │   ├── knowledge/
│   │   ├── ai/
│   │   ├── reports/
│   │   ├── users/
│   │   └── settings/
│   │
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   ├── routes/
│   ├── context/
│   ├── store/
│   ├── styles/
│   ├── utils/
│   ├── constants/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
└── vite.config.ts
```

---

# apps/api (Backend)

```text
api/
│
├── Controllers/
├── Services/
├── Interfaces/
├── Repositories/
├── DTOs/
├── Entities/
├── Middleware/
├── Authentication/
├── Authorization/
├── Validators/
├── AI/
├── Database/
├── Configuration/
├── Helpers/
├── Extensions/
├── Logs/
├── Program.cs
└── appsettings.json
```

---

# apps/ai-service

```text
ai-service/
│
├── embeddings/
├── chunking/
├── prompts/
├── retrieval/
├── models/
├── pipelines/
├── evaluators/
├── providers/
├── workers/
└── config/
```

---

# packages

## ui

Reusable UI components.

## auth

Authentication helpers and JWT utilities.

## database

Shared database models and migrations.

## shared

Common constants, helpers, and utilities.

## config

Shared configuration.

## types

Shared TypeScript interfaces and DTO definitions.

## utils

Reusable utility functions.

---

# docs

```text
docs/
│
├── PRD.md
├── SRS.md
├── SOFTWARE_ARCHITECTURE.md
├── DATABASE_DESIGN.md
├── API_SPECIFICATION.md
├── UI_UX_SPEC.md
├── AI_ARCHITECTURE.md
├── SECURITY.md
├── DEPLOYMENT.md
├── ROADMAP.md
├── AGENTS.md
├── PROJECT_STRUCTURE.md
└── CHANGELOG.md
```

---

# infrastructure

```text
infrastructure/
│
├── docker/
├── nginx/
├── deployment/
├── monitoring/
├── backups/
└── environments/
```

---

# tests

```text
tests/
│
├── unit/
├── integration/
├── api/
├── frontend/
├── security/
├── performance/
└── ai/
```

---

# scripts

```text
scripts/
│
├── setup/
├── seed/
├── migrations/
├── deployment/
├── backup/
└── maintenance/
```

---

# .github

```text
.github/
│
├── workflows/
├── ISSUE_TEMPLATE/
├── PULL_REQUEST_TEMPLATE.md
└── CODEOWNERS
```

---

# .ai

```text
.ai/
│
├── agents/
├── prompts/
├── workflows/
├── context/
└── templates/
```

---

# mcp

```text
mcp/
│
├── config/
├── filesystem/
├── postgres/
├── github/
├── docker/
├── browser/
├── memory/
└── logs/
```

---

# Naming Conventions

## Backend

* Controllers: `UserController`
* Services: `IncidentService`
* DTOs: `CreateIncidentDto`
* Entities: `Incident`

## Frontend

* Components: `IncidentCard.tsx`
* Pages: `DashboardPage.tsx`
* Hooks: `useAuth.ts`
* Services: `incidentService.ts`

---

# Module Dependency Rules

* UI must never access the database directly.
* Controllers call Services only.
* Services communicate with Repositories.
* Repositories handle database operations.
* AI Service communicates through defined interfaces.
* Shared packages must not depend on application-specific modules.

---

# Feature Development Order

1. Authentication
2. User Management
3. Dashboard
4. Incident Management
5. Knowledge Base
6. AI Assistant (RAG)
7. Reports & Analytics
8. Notifications
9. Security Hardening
10. Deployment

---

# Coding Standards

* Feature-first folder organization.
* One responsibility per class/component.
* DTOs for API requests and responses.
* Centralized error handling.
* Shared validation rules.
* Consistent logging.
* Comprehensive documentation.

---

# Repository Goals

The repository should remain:

* Easy to navigate
* Scalable
* Testable
* Secure
* Well documented
* Suitable for team collaboration
* Ready for cloud deployment
