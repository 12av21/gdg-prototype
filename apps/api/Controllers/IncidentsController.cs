using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SCIP.Api.DTOs;
using SCIP.Api.Services;

namespace SCIP.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            var incidents = _incidentService.GetAllIncidents();
            return Ok(incidents);
        }

        [HttpGet("{id}")]
        public IActionResult GetIncidentById(Guid id)
        {
            var incident = _incidentService.GetIncidentById(id);
            if (incident == null) return NotFound();
            return Ok(incident);
        }

        [HttpPost]
        public IActionResult CreateIncident([FromBody] CreateIncidentDto dto)
        {
            var user = User.Identity?.Name ?? "Security Analyst";
            var created = _incidentService.CreateIncident(dto, user);
            return CreatedAtAction(nameof(GetIncidentById), new { id = created.Id }, created);
        }

        [HttpPatch("{id}/status")]
        public IActionResult UpdateStatus(Guid id, [FromBody] UpdateIncidentStatusDto dto)
        {
            var updated = _incidentService.UpdateStatus(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }
    }
}
