using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SCIP.Api.Services;

namespace SCIP.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Get all platform users. Admin only.
        /// </summary>
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_userService.GetAllUsers());
        }

        /// <summary>
        /// Get a specific user by ID.
        /// </summary>
        [HttpGet("{id}")]
        public IActionResult GetUserById(string id)
        {
            var user = _userService.GetUserById(id);
            if (user == null) return NotFound(new { message = "User not found." });
            return Ok(user);
        }
    }
}
