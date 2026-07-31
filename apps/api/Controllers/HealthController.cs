using Microsoft.AspNetCore.Mvc;

namespace SCIP.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        /// <summary>
        /// Health check endpoint to verify API availability.
        /// </summary>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                status = "Healthy",
                service = "SCIP API v1.0",
                timestamp = DateTime.UtcNow,
                environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development"
            });
        }
    }
}
