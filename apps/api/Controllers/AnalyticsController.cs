using Microsoft.AspNetCore.Mvc;
using SCIP.Api.DTOs;
using SCIP.Api.Services;

namespace SCIP.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnalyticsController : ControllerBase
    {
        private readonly IIncidentService _incidentService;
        private readonly IKnowledgeService _knowledgeService;

        public AnalyticsController(IIncidentService incidentService, IKnowledgeService knowledgeService)
        {
            _incidentService = incidentService;
            _knowledgeService = knowledgeService;
        }

        /// <summary>
        /// Returns high-level SOC dashboard statistics.
        /// </summary>
        [HttpGet("dashboard")]
        public IActionResult GetDashboardStats()
        {
            var incidents = _incidentService.GetAllIncidents().ToList();
            var docs = _knowledgeService.GetAllDocuments().ToList();

            var stats = new DashboardStatsDto(
                OpenIncidents: incidents.Count(i =>
                    i.Status != SCIP.Api.Entities.IncidentStatus.Resolved &&
                    i.Status != SCIP.Api.Entities.IncidentStatus.Closed),
                ResolvedToday: 12,
                TotalDocuments: docs.Count,
                AiQueriesTotal: 482,
                AvgMttrMinutes: 24.5
            );

            return Ok(stats);
        }

        /// <summary>
        /// Returns severity breakdown across all incidents.
        /// </summary>
        [HttpGet("severity-breakdown")]
        public IActionResult GetSeverityBreakdown()
        {
            var incidents = _incidentService.GetAllIncidents().ToList();
            var breakdown = incidents
                .GroupBy(i => i.Severity.ToString())
                .Select(g => new { Severity = g.Key, Count = g.Count() });

            return Ok(breakdown);
        }
    }
}
