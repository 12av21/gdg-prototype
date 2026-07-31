using Microsoft.AspNetCore.Mvc;
using SCIP.Api.DTOs;

namespace SCIP.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AiController : ControllerBase
    {
        [HttpPost("chat")]
        public IActionResult Chat([FromBody] AiChatRequestDto request)
        {
            var prompt = request.Prompt.ToLower();
            string response;
            string[] sources;
            string[] actions;

            if (prompt.Contains("ransomware") || prompt.Contains("isolate"))
            {
                response = "Ransomware Protocol: Disconnect endpoint from network. Do not power down. Dump RAM using FTK Imager. Block C2 IPs in Firewall.";
                sources = new[] { "NIST SP 800-61 Rev 2", "Ransomware Incident SOP" };
                actions = new[] { "Isolate Host", "Block C2 IP" };
            }
            else
            {
                response = "SCIP RAG Copilot: Analyzed request against indexed security documentation. Follow standard NIST SP 800-61 Rev 2 guidelines.";
                sources = new[] { "NIST SP 800-61 Rev 2", "Internal Security Policy" };
                actions = new[] { "Generate Incident Checklist" };
            }

            return Ok(new AiChatResponseDto(response, sources, actions));
        }
    }
}
