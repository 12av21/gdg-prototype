# Software Architecture Document
## SCIP - Smart Cybersecurity Intelligence Platform

```mermaid
graph TD
    Client[React + TypeScript Web UI] -->|REST / JSON| API[ASP.NET Core 8 Web API]
    API -->|Services & Repositories| DB[(PostgreSQL + pgvector)]
    API -->|RAG Pipeline| AI[AI Service & Gemini LLM]
    AI -->|Vector Search| DB
```

### Architectural Principles
- **Clean Architecture & SOLID**: Loose coupling between Controllers, Services, and Repositories.
- **Monorepo Design**: Workspace management via `apps/` and `packages/`.
- **RAG Architecture**: PostgreSQL `pgvector` HNSW cosine index + Google Gemini LLM embedding pipeline.
