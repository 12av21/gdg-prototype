using System.ComponentModel.DataAnnotations;
using SCIP.Api.Entities;

namespace SCIP.Api.DTOs
{
    // ─── Auth DTOs ────────────────────────────────────────────────────────────
    public record LoginRequestDto(
        [Required][EmailAddress] string Email,
        [Required][MinLength(6)] string Password
    );

    public record RegisterRequestDto(
        [Required][MaxLength(100)] string Name,
        [Required][EmailAddress] string Email,
        [Required][MinLength(8)] string Password,
        Role Role,
        [MaxLength(100)] string Department
    );

    public record AuthResponseDto(
        string Token,
        string Name,
        string Email,
        string Role,
        string UserId
    );

    // ─── Incident DTOs ────────────────────────────────────────────────────────
    public record CreateIncidentDto(
        [Required][MaxLength(200)] string Title,
        [Required] string Description,
        IncidentSeverity Severity,
        [Required][MaxLength(100)] string Category
    );

    public record UpdateIncidentStatusDto(
        IncidentStatus Status,
        string? AssignedAnalyst
    );

    public record IncidentResponseDto(
        Guid Id,
        string Title,
        string Description,
        IncidentSeverity Severity,
        IncidentStatus Status,
        string Category,
        string ReportedBy,
        string? AssignedAnalyst,
        DateTime CreatedAt,
        DateTime UpdatedAt
    );

    // ─── Knowledge DTOs ───────────────────────────────────────────────────────
    public record UploadDocumentDto(
        [Required][MaxLength(255)] string Title,
        [Required][MaxLength(100)] string Category,
        [Required] string FileType,
        string[] Tags
    );

    // ─── AI & RAG DTOs ────────────────────────────────────────────────────────
    public record AiChatRequestDto(
        [Required][MinLength(5)] string Prompt,
        bool UseRagContext = true
    );

    public record AiChatResponseDto(
        string Response,
        string[] Sources,
        string[] SuggestedActions
    );

    // ─── Analytics DTOs ───────────────────────────────────────────────────────
    public record DashboardStatsDto(
        int OpenIncidents,
        int ResolvedToday,
        int TotalDocuments,
        int AiQueriesTotal,
        double AvgMttrMinutes
    );
}
