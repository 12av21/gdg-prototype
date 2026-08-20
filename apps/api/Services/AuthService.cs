using BCrypt.Net;
using SCIP.Api.DTOs;
using SCIP.Api.Entities;

namespace SCIP.Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly IJwtService _jwtService;
        private readonly ScipDbContext _dbContext;

        public AuthService(IJwtService jwtService, ScipDbContext dbContext)
        {
            _jwtService = jwtService;
            _dbContext = dbContext;
        }

        public AuthResponseDto Login(LoginRequestDto request)
        {
            var user = _dbContext.Users
                .FirstOrDefault(u => u.Email.Equals(request.Email, StringComparison.OrdinalIgnoreCase));

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return new AuthResponseDto(
                    null, "Invalid credentials", "", "", Guid.Empty.ToString()
                );
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

            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();

            var token = _jwtService.GenerateToken(newUser);
            return new AuthResponseDto(token, newUser.Name, newUser.Email, newUser.Role.ToString(), newUser.Id.ToString());
        }
    }
}
