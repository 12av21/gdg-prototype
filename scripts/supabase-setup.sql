-- ================================================================
-- SCIP Supabase Database Setup Script
-- Copy and paste this entire script into your Supabase SQL Editor
-- ================================================================

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'Employee',
    department VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Incidents table
CREATE TABLE IF NOT EXISTS incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'New',
    category VARCHAR(100) NOT NULL,
    reported_by VARCHAR(100) NOT NULL,
    assigned_analyst VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Documents table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    file_type VARCHAR(20) NOT NULL,
    uploaded_by VARCHAR(100) NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Document Embeddings (pgvector)
CREATE TABLE IF NOT EXISTS document_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    chunk_text TEXT NOT NULL,
    embedding vector(1536)
);

-- 6. HNSW Cosine Similarity Index
CREATE INDEX IF NOT EXISTS document_embeddings_hnsw_idx 
ON document_embeddings USING hnsw (embedding vector_cosine_ops);

-- ================================================================
-- Seed Initial Demo Users
-- ================================================================
INSERT INTO users (name, email, password_hash, role, department)
VALUES 
  ('Sarah Connor', 'admin@scip.sec', '$2a$11$qRz1V4N4JbXW.uA.W1B8.eO/4sW8J1nN9qL5J6K7L8M9N0O1P2Q3R', 'Admin', 'Security Operations'),
  ('Alex Mercer', 'analyst@scip.sec', '$2a$11$qRz1V4N4JbXW.uA.W1B8.eO/4sW8J1nN9qL5J6K7L8M9N0O1P2Q3R', 'Analyst', 'Cyber Defense Center')
ON CONFLICT (email) DO NOTHING;

-- Seed Sample Incidents
INSERT INTO incidents (title, description, severity, status, category, reported_by, assigned_analyst)
VALUES 
  ('Suspicious PowerShell Execution', 'Obfuscated PowerShell execution identified on Endpoint-WS-402', 'Critical', 'Investigating', 'Malware Execution', 'EDR Alert Daemon', 'Alex Mercer'),
  ('Phishing Email Campaign - Finance', 'Multiple employees received fake invoice containing macro payload', 'High', 'In Progress', 'Social Engineering', 'Jane Doe', 'Sarah Connor')
ON CONFLICT DO NOTHING;
