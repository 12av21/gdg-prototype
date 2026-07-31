using SCIP.Api.Entities;

namespace SCIP.Api.Data
{
    public static class DbSeeder
    {
        public static void Seed(ScipDbContext context)
        {
            // Seed Users if empty
            if (!context.Users.Any())
            {
                context.Users.AddRange(
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Name = "Sarah Connor (Admin)",
                        Email = "admin@scip.sec",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
                        Role = Role.Admin,
                        Department = "Security Operations",
                        CreatedAt = DateTime.UtcNow
                    },
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Name = "Alex Mercer (SOC Lead)",
                        Email = "analyst@scip.sec",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
                        Role = Role.Analyst,
                        Department = "Cyber Defense Center",
                        CreatedAt = DateTime.UtcNow
                    }
                );
                context.SaveChanges();
            }

            // Seed Incidents if empty
            if (!context.Incidents.Any())
            {
                context.Incidents.AddRange(
                    new Incident
                    {
                        Id = Guid.NewGuid(),
                        Title = "Suspicious PowerShell Execution Detected",
                        Description = "Obfuscated script executed on Endpoint-WS-402 with parent svchost.exe",
                        Severity = IncidentSeverity.Critical,
                        Status = IncidentStatus.Investigating,
                        Category = "Malware Execution",
                        ReportedBy = "EDR Alert Daemon",
                        AssignedAnalyst = "Alex Mercer",
                        CreatedAt = DateTime.UtcNow.AddHours(-2),
                        UpdatedAt = DateTime.UtcNow
                    },
                    new Incident
                    {
                        Id = Guid.NewGuid(),
                        Title = "Phishing Campaign targeting Finance Dept",
                        Description = "Multiple employees received fake invoice containing macro payload",
                        Severity = IncidentSeverity.High,
                        Status = IncidentStatus.InProgress,
                        Category = "Social Engineering",
                        ReportedBy = "Jane Doe",
                        AssignedAnalyst = "Sarah Connor",
                        CreatedAt = DateTime.UtcNow.AddHours(-5),
                        UpdatedAt = DateTime.UtcNow
                    }
                );
                context.SaveChanges();
            }

            // Seed Documents if empty
            if (!context.Documents.Any())
            {
                context.Documents.AddRange(
                    new DocumentItem
                    {
                        Id = Guid.NewGuid(),
                        Title = "NIST SP 800-61 Rev 2 Incident Handling Guide",
                        Category = "Frameworks",
                        FileType = "PDF",
                        UploadedBy = "SOC Lead",
                        UploadedAt = DateTime.UtcNow.AddDays(-3)
                    },
                    new DocumentItem
                    {
                        Id = Guid.NewGuid(),
                        Title = "MITRE ATT&CK Enterprise Matrix v14",
                        Category = "Threat Intel",
                        FileType = "PDF",
                        UploadedBy = "Security Analyst",
                        UploadedAt = DateTime.UtcNow.AddDays(-2)
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
