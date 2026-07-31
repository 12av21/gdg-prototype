# Software Requirements Specification (SRS)
## SCIP - Smart Cybersecurity Intelligence Platform

### 1. Introduction
SCIP is an enterprise-grade cybersecurity management system integrating Security Operations Center (SOC) incident response, RAG-powered vector search knowledge bases, and executive analytics.

### 2. Functional Requirements
- **FR-1 Authentication**: JWT-based auth with RBAC (Admin, Analyst, Employee).
- **FR-2 Incident Management**: CRUD operations, severity tagging, evidence attachments, status workflows.
- **FR-3 RAG AI Copilot**: Contextual question answering over NIST & internal security documentation using Google Gemini + pgvector embeddings.
- **FR-4 Knowledge Base**: File uploads (PDF, DOCX, TXT), automatic chunking, vector indexing.
- **FR-5 Analytics**: Real-time MTTR metrics, threat trends, report exports (PDF/CSV).

### 3. Non-Functional Requirements
- **NFR-1 Response Time**: API response < 500ms; AI response < 3s.
- **NFR-2 Security**: BCrypt password hashing, secure JWT claims, CORS policy, zero hardcoded secrets.
- **NFR-3 Reliability**: Modular Clean Architecture with EF Core and PostgreSQL vector indexing.
