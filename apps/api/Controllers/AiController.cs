using Microsoft.AspNetCore.Mvc;
using SCIP.Api.DTOs;
using SCIP.Api.Services;

namespace SCIP.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AiController : ControllerBase
    {
        private readonly IAiService _aiService;

        public AiController(IAiService aiService)
        {
            _aiService = aiService;
        }

        /// <summary>
        /// Submit a security query to the RAG-powered AI Security Copilot.
        /// </summary>
        [HttpPost("chat")]
        public IActionResult Chat([FromBody] AiChatRequestDto request)
        {
            var response = _aiService.Chat(request);
            return Ok(response);
        }
    }
}
