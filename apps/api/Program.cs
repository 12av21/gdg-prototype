using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SCIP.Api.Authentication;
using SCIP.Api.Data;
using SCIP.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// ─── 1. Database ─────────────────────────────────────────────────────────────
var connStr = builder.Configuration.GetConnectionString("DefaultConnection")
              ?? "Host=localhost;Port=5432;Database=scip_db;Username=scip_admin;Password=ScipSecurePassword123!";

builder.Services.AddDbContext<ScipDbContext>(options =>
    options.UseNpgsql(connStr, o => o.UseVector()));

// ─── 2. Clean Architecture Services ─────────────────────────────────────────
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IIncidentService, IncidentService>();
builder.Services.AddScoped<IKnowledgeService, KnowledgeService>();
builder.Services.AddScoped<IAiService, AiService>();
builder.Services.AddScoped<IUserService, UserService>();

// ─── 3. JWT Bearer Authentication ───────────────────────────────────────────
var jwtSecret = builder.Configuration["JwtSettings:Secret"]
                ?? "SCIP_SUPER_SECRET_JWT_KEY_MINIMUM_32_BYTES_LONG_SECURITY_PROTOTYPE_2026";
var key = Encoding.UTF8.GetBytes(jwtSecret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"] ?? "SCIP-Identity-Server",
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JwtSettings:Audience"] ?? "SCIP-Web-Clients",
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// ─── 4. Controllers & API Docs ───────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "SCIP - Smart Cybersecurity Intelligence Platform API",
        Version = "v1.0",
        Description = "ASP.NET Core 8 REST API for cybersecurity incident management and AI RAG operations."
    });

    // Allow JWT Bearer in Swagger UI
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "Enter your SCIP JWT access token."
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme { Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" } },
            Array.Empty<string>()
        }
    });
});

// ─── 5. CORS ─────────────────────────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ─── 6. Build & Configure HTTP Pipeline ─────────────────────────────────────
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SCIP API v1.0");
        c.DocumentTitle = "SCIP – API Explorer";
    });
}

app.UseCors("AllowReactApp");
app.UseScipExceptionMiddleware();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Auto-seed initial database records
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ScipDbContext>();
        context.Database.EnsureCreated();
        DbSeeder.Seed(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogWarning("Database initialization skipped or offline: {Message}", ex.Message);
    }
}

app.Run();
