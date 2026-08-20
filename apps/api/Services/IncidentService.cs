using SCIP.Api.DTOs;
using SCIP.Api.Entities;

namespace SCIP.Api.Services
{
    public class IncidentService : IIncidentService
    {
        private readonly ScipDbContext _dbContext;

        public IncidentService(ScipDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<IncidentResponseDto> GetAllIncidents()
        {
            return _dbContext.Incidents
                .Select(i => new IncidentResponseDto(
                    i.Id, i.Title, i.Description, i.Severity, i.Status,
                    i.Category, i.ReportedBy, i.EvidenceCount,
                    i.CreatedAt, i.UpdatedAt
                ))
                .ToList();
        }

        public IncidentResponseDto? GetIncidentById(Guid id)
        {
            return _dbContext.Incidents
                .Where(i => i.Id == id)
                .Select(i => new IncidentResponseDto(
                    i.Id, i.Title, i.Description, i.Severity, i.Status,
                    i.Category, i.ReportedBy, i.EvidenceCount,
                    i.CreatedAt, i.UpdatedAt
                ))
                .FirstOrDefault();
        }

        public IncidentResponseDto CreateIncident(CreateIncidentDto dto, string reportedBy)
        {
            var incident = new Incident
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Description = dto.Description,
                Severity = dto.Severity,
                Status = IncidentStatus.New,
                Category = dto.Category,
                ReportedBy = reportedBy,
                EvidenceCount = 0,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _dbContext.Incidents.Add(incident);
            _dbContext.SaveChanges();

            return new IncidentResponseDto(
                incident.Id, incident.Title, incident.Description,
                incident.Severity, incident.Status, incident.Category,
                incident.ReportedBy, incident.EvidenceCount,
                incident.CreatedAt, incident.UpdatedAt
            );
        }

        public IncidentResponseDto? UpdateStatus(Guid id, UpdateIncidentStatusDto dto)
        {
            var incident = _dbContext.Incidents.Find(id);
            if (incident == null) return null;

            incident.Status = dto.Status;
            incident.AssignedAnalyst = dto.AssignedAnalyst ?? incident.AssignedAnalyst;
            incident.UpdatedAt = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new IncidentResponseDto(
                incident.Id, incident.Title, incident.Description,
                incident.Severity, incident.Status, incident.Category,
                incident.ReportedBy, incident.EvidenceCount,
                incident.CreatedAt, incident.UpdatedAt
            );
        }
    }
}
