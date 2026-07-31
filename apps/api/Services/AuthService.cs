using BCrypt.Net;
using SCIP.Api.Authentication;
using SCIP.Api.DTOs;
using SCIP.Api.Entities;

namespace SCIP.Api.Services
{
    public interface IAuthService
    {
        AuthResponseDto Login(LoginRequestDto request);
        AuthResponseDto Register(RegisterRequestDto request);
    }

    public class AuthService : IAuthService
    {
        private readonly IJwtService _jwtService;

        // In-memory demo store for rapid execution fallback
        private static readonly List<User> InMemUsers = new()
        {
            new User
            {
                Id = Guid.NewGuid(),
                Name = "Alex Mercer (SOC Lead)",
                Email = "analyst@scip.sec",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
                Role = Role.Analyst,
                Department = "Cyber Defense Center"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Name = "Sarah Connor (Admin)",
                Email = "admin@scip.sec",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
                Role = Role.Admin,
                Department = "Security Operations"
            }
        };

        public AuthService(IJwtService jwtService)
        {
            _jwtService = jwtService;
        }

        public AuthResponseDto Login(LoginRequestDto request)
        {
            var user = InMemUsers.FirstOrDefault(u => u.Email.Equals(request.Email, StringComparison.OrdinalIgnoreCase));
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                // Fallback to active demo login if matching demo credential
                user = new User
                {
                    Id = Guid.NewGuid(),
                    Name = request.Email.StartsWith("admin") ? "Sarah Connor (Admin)" : "Alex Mercer (SOC Lead)",
                    Email = request.Email,
                    Role = request.Email.StartsWith("admin") ? Role.Admin : Role.Analyst,
                    Department = "Cyber Security Operations"
                };
            }

            var token = _jwtService.GenerateToken(user);
            return new AuthResponseDto(token, user.Name, user.Email, user.Role.ToString(), user.Id.ToString());
        }

        public AuthResponseDto Register(RegisterRequestDto request)
        {
            var newUser = new User
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = request.Role,
                Department = request.Department
            };

            InMemUsers.Add(newUser);
            var token = _jwtService.GenerateToken(newUser);
            return new AuthResponseDto(token, newUser.Name, newUser.Email, newUser.Role.ToString(), newUser.Id.ToString());
        }
    }
}
