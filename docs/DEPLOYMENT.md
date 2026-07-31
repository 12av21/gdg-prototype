# SCIP – Deployment Guide

## Architecture Overview
```
Vercel (Frontend)  →  Render (ASP.NET Core API)  →  Supabase (PostgreSQL + pgvector)
```

---

## 1. Database: Supabase (Free Tier)

1. Go to https://supabase.com → Create account → New project
2. Name it `scip-db`, choose a strong password, pick a region
3. In **SQL Editor** run the full contents of `scripts/supabase-setup.sql` (or `packages/database/schema.sql`)
4. Under **Settings → Database → Connection String** copy the **URI** format:
   ```
   postgresql://postgres:[password]@[host]:5432/postgres
   ```
5. Save this — you'll need it for Render environment variables

---

## 2. Backend API: Render (Free Tier)

1. Go to https://render.com → Sign up with GitHub
2. Click **New → Web Service** → Connect your GitHub repo
3. Select **Docker** as runtime (uses the `Dockerfile` in root)
4. Name: `scip-api`
5. Add these **Environment Variables** in Render dashboard:

| Key | Value |
|---|---|
| `ASPNETCORE_URLS` | `http://+:8080` |
| `ConnectionStrings__DefaultConnection` | `<Supabase URI>` |
| `JwtSettings__Secret` | Generate 64-char random string |
| `JwtSettings__Issuer` | `SCIP-Identity-Server` |
| `JwtSettings__Audience` | `SCIP-Web-Clients` |
| `JwtSettings__ExpiryMinutes` | `120` |
| `GeminiSettings__ApiKey` | `<Your Google AI Studio API Key>` |

6. Click **Deploy** — Render builds from `Dockerfile`
7. Your API will be available at: `https://scip-api.onrender.com`
8. Verify: open `https://scip-api.onrender.com/api/health`

---

## 3. Frontend: Vercel (Free Tier)

1. Go to https://vercel.com → Sign up with GitHub
2. Click **Add New → Project** → Import your repository
3. Set **Root Directory** to `/` (uses `vercel.json` in root)
4. Add **Environment Variable**:

| Key | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://scip-api.onrender.com/api` |

5. Vercel auto-detects `vercel.json` and uses:
   - Build Command: `npm --prefix apps/web install && npm --prefix apps/web run build`
   - Output Directory: `apps/web/dist`
6. Click Deploy
7. Your app will be at: `https://scip-web.vercel.app`

---

## 4. Update CORS for Production

After getting your Vercel URL, update `apps/api/Program.cs` CORS policy:

```csharp
policy.WithOrigins(
    "http://localhost:3000",
    "https://scip-web.vercel.app"   // ← Add your Vercel URL
)
```

Then push to `main` — Render redeploys automatically.

---

## 5. GitHub Actions CI/CD (Automatic)

Add these **GitHub Repository Secrets**:

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | From Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | From `vercel.json` / Vercel project settings |
| `VERCEL_PROJECT_ID` | From Vercel project settings |
| `VITE_API_BASE_URL` | `https://scip-api.onrender.com/api` |

Every push to `main` will:
1. Build & verify frontend (TypeScript + Vite)
2. Build & verify backend (.NET 8)
3. Auto-deploy to Vercel

---

## 6. Local Development

```bash
# Start PostgreSQL (Docker)
docker-compose up -d

# Frontend (http://localhost:3000)
npm --prefix apps/web run dev

# Backend (requires .NET 8 SDK installed)
cd apps/api
dotnet run
# Swagger UI: http://localhost:5000/swagger
```

---

## Final URLs (after deployment)

| Service | URL |
|---|---|
| **Frontend** | `https://scip-web.vercel.app` |
| **API** | `https://scip-api.onrender.com` |
| **Swagger UI** | `https://scip-api.onrender.com/swagger` |
| **Health Check** | `https://scip-api.onrender.com/api/health` |
