using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SCIP.Api.DTOs;
using SCIP.Api.Services;

namespace SCIP.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class IncidentsController : ControllerBase
    {
        private readonly IIncidentService _incidentService;

        public IncidentsController(IIncidentService incidentService)
        {
            _incidentService = incidentService;
        }

        [HttpGet]
        public IActionResult GetIncidents()
        {
            return Ok(_incidentService.GetAllIncidents());
        }

        [HttpGet("{id}")]
        public IActionResult GetIncidentById(Guid id)
        {
            var incident = _incidentService.GetIncidentById(id);
            if (incident == null) return NotFound(new { message = "Incident not found." });
            return Ok(incident);
        }

        [HttpPost]
        public IActionResult CreateIncident([FromBody] CreateIncidentDto dto)
        {
            var reportedBy = User.Identity?.Name ?? "Unknown User";
            var created = _incidentService.CreateIncident(dto, reportedBy);
            return CreatedAtAction(nameof(GetIncidentById), new { id = created.Id }, created);
        }

        [HttpPatch("{id}/status")]
        [Authorize(Roles = "Admin,Analyst")]
        public IActionResult UpdateStatus(Guid id, [FromBody] UpdateIncidentStatusDto dto)
        {
            var updated = _incidentService.UpdateStatus(id, dto);
            if (updated == null) return NotFound(new { message = "Incident not found." });
            return Ok(updated);
        }
    }
}
