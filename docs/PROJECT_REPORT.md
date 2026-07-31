# SCIP – Smart Cybersecurity Intelligence Platform
## MCA Final-Year Project Report

---

### Abstract
The Smart Cybersecurity Intelligence Platform (SCIP) is an AI-powered security management platform designed to streamline Security Operations Center (SOC) incident management, corporate security policy search, and vulnerability remediation. SCIP incorporates Retrieval-Augmented Generation (RAG) using Google Gemini and PostgreSQL pgvector to deliver context-aware, hallucination-free AI security guidance.

---

### 1. Project Objectives
- **Centralized Incident Management**: Provide full lifecycle tracking of cybersecurity threats.
- **RAG-Powered AI Copilot**: Enable natural language querying of NIST standards and internal SOPs.
- **Clean Architecture & Scalability**: Implement ASP.NET Core 8 Web API backend and React + Vite frontend in a monorepo layout.
- **Enterprise Security**: Enforce JWT authentication, BCrypt password hashing, and role-based authorization.

---

### 2. System Architecture & Tech Stack

#### Frontend:
- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Glassmorphism design tokens
- **Icons**: Lucide React

#### Backend:
- **Framework**: ASP.NET Core (.NET 8) Web API
- **ORM**: Entity Framework Core 8
- **Database**: PostgreSQL 16 with `pgvector` HNSW vector index
- **Authentication**: JWT Bearer token authentication

#### AI / RAG Engine:
- **LLM**: Google Gemini 1.5 Flash
- **Embedding Dimensions**: 1536-dimensional vectors
- **Vector Search**: Cosine similarity via `pgvector`

---

### 3. Core Modules & Implementation Results

1. **Authentication & RBAC Module**: Enforces Admin, Analyst, and Employee permission boundaries.
2. **Incident Management Hub**: Triage, severity categorization (`Critical`, `High`, `Medium`), status lifecycle, and evidence logging.
3. **AI Copilot (RAG Engine)**: Answers queries with document chunk citations and actionable investigation checklists.
4. **Knowledge Base**: Automated document ingestion, chunking (500 words with 50-word overlap), and vector indexing.
5. **Analytics & Reports**: Visual telemetry dashboard with export capabilities.

---

### 4. Conclusion
SCIP successfully demonstrates a production-grade integration of modern full-stack web technologies and AI RAG pipelines for cybersecurity intelligence management.
