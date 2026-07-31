# BUILD_ORDER.md

# SCIP -- Smart Cybersecurity Intelligence Platform

## Purpose

This file is the single source of truth for implementation. Complete
tasks **in order**. Do **not** skip unfinished tasks.

------------------------------------------------------------------------

## Phase 1 -- Repository

-   [x] T001 Create GitHub repository
-   [x] T002 Initialize monorepo
-   [x] T003 Create folder structure
-   [x] T004 Add documentation files
-   [x] T005 Configure Git & .gitignore
-   [x] T006 Configure environment variables
-   [x] T007 Verify project structure

------------------------------------------------------------------------

## Phase 2 -- Frontend Setup

-   [x] T010 Create React + TypeScript app
-   [x] T011 Configure Vite
-   [x] T012 Install Tailwind CSS
-   [x] T013 Configure routing
-   [x] T014 Create layouts
-   [x] T015 Create reusable UI components
-   [x] T016 Create authentication pages
-   [x] T017 Build dashboard shell

Checkpoint: UI prototype works.

------------------------------------------------------------------------

## Phase 3 -- Backend Setup

-   [x] T020 Create ASP.NET Core API
-   [x] T021 Configure Clean Architecture
-   [x] T022 Configure PostgreSQL
-   [x] T023 Configure Entity Framework Core
-   [x] T024 Configure JWT authentication
-   [x] T025 Configure Swagger
-   [x] T026 Health check endpoint

Checkpoint: API starts successfully.

------------------------------------------------------------------------

## Phase 4 -- Database

-   [x] T030 Create Users table
-   [x] T031 Create Roles table
-   [x] T032 Create Incidents table
-   [x] T033 Create Documents table
-   [x] T034 Create AI Chats table
-   [x] T035 Run migrations
-   [x] T036 Seed sample data

Checkpoint: Database ready.

------------------------------------------------------------------------

## Phase 5 -- Authentication

-   [x] T040 Register API
-   [x] T041 Login API
-   [x] T042 Refresh token
-   [x] T043 Protected routes
-   [x] T044 Connect frontend authentication

Checkpoint: Login works.

------------------------------------------------------------------------

## Phase 6 -- Core Modules

-   [x] T050 Dashboard
-   [x] T051 Incident CRUD
-   [x] T052 Knowledge Base
-   [x] T053 File Upload
-   [x] T054 Notifications
-   [x] T055 Reports

Checkpoint: MVP modules complete.

------------------------------------------------------------------------

## Phase 7 -- AI

-   [x] T060 Document parsing
-   [x] T061 Chunking
-   [x] T062 Embeddings
-   [x] T063 pgvector
-   [x] T064 RAG pipeline
-   [x] T065 AI Chat
-   [x] T066 Source citations

Checkpoint: AI answers from uploaded documents.

------------------------------------------------------------------------

## Phase 8 -- Testing

-   [x] T070 Unit tests
-   [x] T071 API tests
-   [x] T072 UI tests
-   [x] T073 Security review
-   [x] T074 Performance review

------------------------------------------------------------------------

## Phase 9 -- Deployment

-   [x] T080 Deploy database
-   [x] T081 Deploy backend
-   [x] T082 Deploy frontend
-   [x] T083 Configure production environment
-   [x] T084 Smoke testing

------------------------------------------------------------------------

## Phase 10 -- Finalization

-   [x] T090 README
-   [x] T091 API documentation
-   [x] T092 User manual
-   [x] T093 Project report
-   [x] T094 PPT
-   [x] T095 Final demo

------------------------------------------------------------------------

## AI Prompt Rule

For every implementation step, use only:

> Complete Task T0XX from BUILD_ORDER.md

Do not ask the AI to build multiple tasks at once.
