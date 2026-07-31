using Microsoft.AspNetCore.Mvc;
using SCIP.Api.Services;

namespace SCIP.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KnowledgeController : ControllerBase
    {
        private readonly IKnowledgeService _knowledgeService;

        public KnowledgeController(IKnowledgeService knowledgeService)
        {
            _knowledgeService = knowledgeService;
        }

        [HttpGet]
        public IActionResult GetDocuments()
        {
            return Ok(_knowledgeService.GetAllDocuments());
        }

        [HttpPost("upload")]
        public IActionResult UploadDocument([FromForm] string title, [FromForm] string category, [FromForm] string fileType)
        {
            var uploadedBy = User.Identity?.Name ?? "SOC Analyst";
            var doc = _knowledgeService.AddDocument(title, category, fileType, uploadedBy);
            return Ok(doc);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDocument(Guid id)
        {
            // Deletion logic would target DB via IKnowledgeService
            return NoContent();
        }
    }
}
