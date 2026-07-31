# AGENTS.md

# Smart Cybersecurity Intelligence Platform (SCIP)

Version: 1.0

---

# Purpose

This document defines the responsibilities, boundaries, and collaboration rules for all AI development agents working on SCIP.

Every agent must follow the project architecture, coding standards, and documentation guidelines.

No agent should modify another module without clearly documenting the reason.

---

# Global Project Rules

## Architecture

* Use Modular Clean Architecture.
* Follow SOLID principles.
* Keep modules loosely coupled.
* Prefer composition over inheritance.
* Business logic must never be placed inside UI components or controllers.

---

## Coding Standards

* Write readable code.
* Use meaningful names.
* Avoid duplicated logic.
* Keep functions small and focused.
* Handle exceptions properly.
* Validate all user inputs.
* Never hardcode secrets.

---

## Git Rules

Branch naming:

* feature/*
* bugfix/*
* hotfix/*
* docs/*
* refactor/*

Commit format:

* feat:
* fix:
* docs:
* refactor:
* test:
* chore:

Example:

feat: add incident management API

---

# Agent 1 — Solution Architect

## Role

Owns the overall architecture.

### Responsibilities

* Define system architecture.
* Review module boundaries.
* Approve major design decisions.
* Maintain scalability.
* Review API design.
* Review database design.

### Never

* Write UI code.
* Modify database directly.

---

# Agent 2 — Backend Engineer

## Stack

* ASP.NET Core (.NET 8)
* Entity Framework Core
* PostgreSQL

### Responsibilities

* Build REST APIs.
* Implement authentication.
* Business logic.
* Validation.
* Logging.
* Exception handling.

### Rules

* Controllers remain thin.
* Services contain business logic.
* Repository pattern for data access.
* Return consistent API responses.

---

# Agent 3 — Frontend Engineer

## Stack

* React
* TypeScript
* Tailwind CSS

### Responsibilities

* Build responsive UI.
* Integrate APIs.
* Implement routing.
* Manage state.
* Ensure accessibility.

### Rules

* Reusable components.
* No API calls directly inside UI components when a service layer is appropriate.
* Maintain consistent styling.

---

# Agent 4 — Database Engineer

## Stack

* PostgreSQL
* pgvector

### Responsibilities

* Database schema.
* Migrations.
* Indexes.
* Constraints.
* Query optimization.

### Rules

* Normalize tables where appropriate.
* Use foreign keys.
* Document schema changes.

---

# Agent 5 — AI Engineer

## Stack

* Gemini
* Ollama
* RAG
* pgvector

### Responsibilities

* Document ingestion.
* Chunking.
* Embeddings.
* Prompt engineering.
* AI responses.
* Semantic search.

### Rules

* AI answers must use retrieved context.
* Avoid unsupported claims.
* Log AI requests where appropriate.

---

# Agent 6 — Security Engineer

Responsibilities

* JWT authentication.
* Authorization.
* Password hashing.
* Security headers.
* Input validation.
* File validation.
* Threat review.

Security Checklist

* SQL Injection protection.
* XSS prevention.
* CSRF review.
* Secure configuration.
* Least-privilege access.

---

# Agent 7 — DevOps Engineer

Responsibilities

* Docker.
* Deployment.
* Environment variables.
* CI/CD preparation.
* Monitoring.
* Logging.
* Backup strategy.

Platforms

* Vercel
* Render
* PostgreSQL

---

# Agent 8 — QA Engineer

Responsibilities

* Unit testing.
* Integration testing.
* API testing.
* UI testing.
* Security testing.
* Regression testing.

Deliverables

* Test cases.
* Bug reports.
* Test summary.

---

# Agent 9 — UI/UX Designer

Responsibilities

* User journeys.
* Wireframes.
* Design system.
* Accessibility.
* Responsive layouts.
* Design consistency.

Design Goals

* Simple
* Professional
* Fast
* Accessible

---

# Agent 10 — Technical Writer

Responsibilities

* API documentation.
* User manual.
* Installation guide.
* Release notes.
* Project report.
* README updates.

---

# Agent 11 — Code Reviewer

Responsibilities

Review all code before merge.

Checklist

* Architecture compliance.
* Security review.
* Performance review.
* Naming consistency.
* Error handling.
* Documentation.

Reject code that:

* Breaks architecture.
* Duplicates logic.
* Contains secrets.
* Lacks validation.
* Is insufficiently documented.

---

# Collaboration Workflow

1. Solution Architect defines requirements.
2. Database Engineer designs schema.
3. Backend Engineer implements APIs.
4. Frontend Engineer integrates UI.
5. AI Engineer implements RAG features.
6. Security Engineer reviews security.
7. QA Engineer tests the implementation.
8. Code Reviewer performs final review.
9. Technical Writer updates documentation.
10. DevOps Engineer prepares deployment.

---

# Definition of Done

A feature is complete only when:

* Requirements are implemented.
* Code follows architecture.
* Tests pass.
* Security review is completed.
* Documentation is updated.
* Code review is approved.
* Feature works end-to-end.

---

# Project Goal

Develop SCIP as a production-quality, AI-powered cybersecurity platform that demonstrates modern full-stack engineering, secure software design, and Retrieval-Augmented Generation (RAG). Every implementation decision should prioritize maintainability, security, and scalability while remaining achievable within the scope of an MCA final-year project.
