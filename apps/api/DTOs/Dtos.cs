using System;
using SCIP.Api.Entities;

namespace SCIP.Api.DTOs
{
    // Auth DTOs
    public record LoginRequestDto(string Email, string Password);
    public record RegisterRequestDto(string Name, string Email, string Password, Role Role, string Department);
    public record AuthResponseDto(string Token, string Name, string Email, string Role, string UserId);

    // Incident DTOs
    public record CreateIncidentDto(string Title, string Description, IncidentSeverity Severity, string Category);
    public record UpdateIncidentStatusDto(IncidentStatus Status, string? AssignedAnalyst);
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

    // AI & RAG DTOs
    public record AiChatRequestDto(string Prompt, bool UseRagContext = true);
    public record AiChatResponseDto(string Response, string[] Sources, string[] SuggestedActions);
}
