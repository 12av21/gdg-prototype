using SCIP.Api.DTOs;
using SCIP.Api.Entities;

namespace SCIP.Api.Services
{
    public interface IIncidentService
    {
        IEnumerable<IncidentResponseDto> GetAllIncidents();
        IncidentResponseDto? GetIncidentById(Guid id);
        IncidentResponseDto CreateIncident(CreateIncidentDto dto, string reportedBy);
        IncidentResponseDto? UpdateStatus(Guid id, UpdateIncidentStatusDto dto);
    }

    public class IncidentService : IIncidentService
    {
        private static readonly List<IncidentResponseDto> IncidentStore = new()
        {
            new IncidentResponseDto(
                Guid.Parse("11111111-1111-1111-1111-111111111111"),
                "Suspicious PowerShell Execution Detected",
                "Obfuscated PowerShell execution identified on Endpoint-WS-402 with parent svchost.exe",
                IncidentSeverity.Critical,
                IncidentStatus.Investigating,
                "Malware Execution",
                "EDR Alert Daemon",
                "Alex Mercer",
                DateTime.UtcNow.AddHours(-2),
                DateTime.UtcNow
            ),
            new IncidentResponseDto(
                Guid.Parse("22222222-2222-2222-2222-222222222222"),
                "Phishing Email Campaign targeting Finance",
                "Multiple employees received fake invoice attachment containing macro payload",
                IncidentSeverity.High,
                IncidentStatus.InProgress,
                "Social Engineering",
                "Jane Doe",
                "Sarah Connor",
                DateTime.UtcNow.AddHours(-5),
                DateTime.UtcNow.AddHours(-1)
            ),
            new IncidentResponseDto(
                Guid.Parse("33333333-3333-3333-3333-333333333333"),
                "Unusual Inbound Traffic on Port 8443",
                "Spike in inbound TLS traffic from unknown ASN matching known C2 signatures",
                IncidentSeverity.Medium,
                IncidentStatus.New,
                "Network Anomaly",
                "Sentinel Firewall Daemon",
                null,
                DateTime.UtcNow.AddHours(-8),
                DateTime.UtcNow.AddHours(-8)
            )
        };

        public IEnumerable<IncidentResponseDto> GetAllIncidents() => IncidentStore;

        public IncidentResponseDto? GetIncidentById(Guid id) => IncidentStore.FirstOrDefault(i => i.Id == id);

        public IncidentResponseDto CreateIncident(CreateIncidentDto dto, string reportedBy)
        {
            var incident = new IncidentResponseDto(
                Guid.NewGuid(),
                dto.Title,
                dto.Description,
                dto.Severity,
                IncidentStatus.New,
                dto.Category,
                reportedBy,
                null,
                DateTime.UtcNow,
                DateTime.UtcNow
            );

            IncidentStore.Insert(0, incident);
            return incident;
        }

        public IncidentResponseDto? UpdateStatus(Guid id, UpdateIncidentStatusDto dto)
        {
            var idx = IncidentStore.FindIndex(i => i.Id == id);
            if (idx == -1) return null;

            var existing = IncidentStore[idx];
            var updated = existing with
            {
                Status = dto.Status,
                AssignedAnalyst = dto.AssignedAnalyst ?? existing.AssignedAnalyst,
                UpdatedAt = DateTime.UtcNow
            };

            IncidentStore[idx] = updated;
            return updated;
        }
    }
}
