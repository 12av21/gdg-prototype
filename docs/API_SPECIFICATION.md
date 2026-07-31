# API Specification – SCIP v1.0

Base URL: `http://localhost:5000/api`
Swagger UI: `http://localhost:5000/swagger`

---

## Authentication

All protected endpoints require a Bearer JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### Auth
| Method | Path | Body | Description |
|---|---|---|---|
| `POST` | `/auth/login` | `{ email, password }` | Returns JWT token and user info |
| `POST` | `/auth/register` | `{ name, email, password, role, department }` | Creates a new user account |

### Incidents
| Method | Path | Body | Description |
|---|---|---|---|
| `GET` | `/incidents` | — | Returns all incidents |
| `GET` | `/incidents/{id}` | — | Returns incident by ID |
| `POST` | `/incidents` | `{ title, description, severity, category }` | Create new incident |
| `PATCH` | `/incidents/{id}/status` | `{ status, assignedAnalyst }` | Update incident status |

### Knowledge Base
| Method | Path | Description |
|---|---|---|
| `GET` | `/knowledge` | Returns all indexed documents |
| `POST` | `/knowledge/upload` | Upload and register a new security document |
| `DELETE` | `/knowledge/{id}` | Remove a document from the KB |

### AI Copilot (RAG)
| Method | Path | Body | Description |
|---|---|---|---|
| `POST` | `/ai/chat` | `{ prompt, useRagContext }` | Query the RAG AI Security Copilot |

### Analytics
| Method | Path | Description |
|---|---|---|
| `GET` | `/analytics/dashboard` | Returns SOC dashboard stats (open incidents, MTTR, AI usage) |
| `GET` | `/analytics/severity-breakdown` | Returns incident count by severity |

### Users (Admin)
| Method | Path | Description |
|---|---|---|
| `GET` | `/users` | Returns all platform users |
| `GET` | `/users/{id}` | Returns user by ID |

### Health
| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Service availability check |
