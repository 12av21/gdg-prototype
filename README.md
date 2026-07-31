# SCIP – Smart Cybersecurity Intelligence Platform 🛡️

AI-powered Security Knowledge & Incident Management Monorepo Platform.

---

## 🏗️ Repository Architecture

SCIP follows a **Modular Monorepo Architecture**:

```text
SCIP/
├── apps/
│   ├── web/                     # React + TypeScript + Vite + Tailwind CSS Frontend
│   ├── api/                     # ASP.NET Core (.NET 8) Web API Backend
│   └── ai-service/              # RAG & AI Processing Service (Gemini + pgvector)
│
├── packages/
│   ├── types/                   # Shared TypeScript DTOs & Interfaces
│   ├── shared/                  # Common Constants & Enums
│   ├── config/                  # Configuration & API URLs
│   ├── database/                # PostgreSQL pgvector Schema & Migrations
│   ├── ui/                      # Reusable Component Utilities
│   ├── auth/                    # JWT Auth Helpers
│   └── utils/                   # Shared Helpers
│
├── docs/                        # SRS, Architecture & API Documentation
├── infrastructure/              # Docker & Nginx Deployment configs
└── docker-compose.yml           # PostgreSQL pgvector & Redis Container Services
```

---

## ⚡ Quick Start

### 1. Run Infrastructure (PostgreSQL + pgvector)
```bash
docker-compose up -d
```

### 2. Frontend Web Application (React + Vite)
```bash
# Navigate to web app
cd apps/web

# Install dependencies & start dev server
npm install
npm run dev
```

### 3. Backend ASP.NET Core Web API (.NET 8)
```bash
cd apps/api
dotnet run
```

---

## 🛡️ Core Features (MVP Complete)

- 🔑 **Authentication & RBAC**: Role-based access control (Admin, Analyst, Employee).
- 🚨 **Incident Management**: Incident CRUD, severity tagging, evidence attachments, status tracking.
- 📚 **RAG Knowledge Base**: Vector document storage with pgvector HNSW indexing.
- 🤖 **AI Security Copilot ⭐**: Context-aware security assistant powered by Gemini & retrieved policy chunks.
- 📊 **Analytics & Reports**: MTTR telemetry, incident metrics, and PDF/CSV exports.
