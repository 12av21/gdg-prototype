using Microsoft.AspNetCore.Mvc;
using SCIP.Api.DTOs;
using SCIP.Api.Entities;

namespace SCIP.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IncidentsController : ControllerBase
    {
        private static readonly List<IncidentResponseDto> Incidents = new()
        {
            new IncidentResponseDto(
                Guid.NewGuid(),
                "Suspicious PowerShell Execution Detected",
                "Obfuscated PowerShell execution identified on Endpoint-WS-402",
                IncidentSeverity.Critical,
                IncidentStatus.Investigating,
                "Malware Execution",
                "EDR Agent",
                "Alex Mercer",
                DateTime.UtcNow.AddHours(-2),
                DateTime.UtcNow
            ),
            new IncidentResponseDto(
                Guid.NewGuid(),
                "Phishing Email Campaign targeting Finance",
                "Multiple employees received fake invoice attachment containing macro payload",
                IncidentSeverity.High,
                IncidentStatus.InProgress,
                "Social Engineering",
                "Jane Doe",
                "Sarah Connor",
                DateTime.UtcNow.AddHours(-5),
                DateTime.UtcNow.AddHours(-1)
            )
        };

        [HttpGet]
        public IActionResult GetIncidents() => Ok(Incidents);

        [HttpPost]
        public IActionResult CreateIncident([FromBody] CreateIncidentDto dto)
        {
            var created = new IncidentResponseDto(
                Guid.NewGuid(),
                dto.Title,
                dto.Description,
                dto.Severity,
                IncidentStatus.New,
                dto.Category,
                User.Identity?.Name ?? "Employee User",
                null,
                DateTime.UtcNow,
                DateTime.UtcNow
            );
            Incidents.Insert(0, created);
            return CreatedAtAction(nameof(GetIncidents), new { id = created.Id }, created);
        }

        [HttpPatch("{id}/status")]
        public IActionResult UpdateStatus(Guid id, [FromBody] UpdateIncidentStatusDto dto)
        {
            var idx = Incidents.FindIndex(i => i.Id == id);
            if (idx == -1) return NotFound();

            var old = Incidents[idx];
            var updated = old with { Status = dto.Status, AssignedAnalyst = dto.AssignedAnalyst ?? old.AssignedAnalyst, UpdatedAt = DateTime.UtcNow };
            Incidents[idx] = updated;
            return Ok(updated);
        }
    }
}
