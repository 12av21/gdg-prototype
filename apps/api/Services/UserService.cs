using SCIP.Api.Entities;

namespace SCIP.Api.Services
{
    public record UserListDto(string Id, string Name, string Email, string Role, string Department, string CreatedAt);

    public interface IUserService
    {
        IEnumerable<UserListDto> GetAllUsers();
        UserListDto? GetUserById(string id);
    }

    public class UserService : IUserService
    {
        private static readonly List<UserListDto> SeedUsers = new()
        {
            new UserListDto(Guid.NewGuid().ToString(), "Sarah Connor", "admin@scip.sec", "Admin", "Security Operations", "2026-01-10"),
            new UserListDto(Guid.NewGuid().ToString(), "Alex Mercer", "analyst@scip.sec", "Analyst", "Cyber Defense Center", "2026-02-14"),
            new UserListDto(Guid.NewGuid().ToString(), "Jane Doe", "employee@scip.sec", "Employee", "Finance Dept", "2026-03-20")
        };

        public IEnumerable<UserListDto> GetAllUsers() => SeedUsers;

        public UserListDto? GetUserById(string id) =>
            SeedUsers.FirstOrDefault(u => u.Id == id);
    }
}
