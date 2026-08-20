using System;
using System.Collections.Generic;
using Pgvector;

namespace SCIP.Api.Entities
{
    public enum Role
    {
        Admin,
        Analyst,
        Employee
    }

    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public Role Role { get; set; } = Role.Employee;
        public string Department { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum IncidentSeverity
    {
        Low,
        Medium,
        High,
        Critical
    }

    public enum IncidentStatus
    {
        New,
        Investigating,
        InProgress,
        Resolved,
        Closed
    }

    public class Incident
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public IncidentSeverity Severity { get; set; } = IncidentSeverity.Medium;
        public IncidentStatus Status { get; set; } = IncidentStatus.New;
        public string Category { get; set; } = string.Empty;
        public string ReportedBy { get; set; } = string.Empty;
        public string? AssignedAnalyst { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public List<IncidentComment> Comments { get; set; } = new();
    }

    public class IncidentComment
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid IncidentId { get; set; }
        public string Author { get; set; } = string.Empty;
        public string CommentText { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class DocumentItem
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string FileType { get; set; } = string.Empty;
        public string StoragePath { get; set; } = string.Empty;
        public string UploadedBy { get; set; } = string.Empty;
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
        public List<VectorEmbedding> Chunks { get; set; } = new();
    }

    public class VectorEmbedding
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid DocumentId { get; set; }
        public string ChunkText { get; set; } = string.Empty;
        public Vector Embedding { get; set; } = null!;
        public int ChunkIndex { get; set; }
    }
}
