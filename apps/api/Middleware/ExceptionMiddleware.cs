using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

namespace SCIP.Api.Middleware
{
    /// <summary>
    /// Global exception handling middleware — catches unhandled exceptions
    /// and returns a structured JSON error response.
    /// </summary>
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception caught by SCIP GlobalExceptionMiddleware");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var error = new
            {
                status = 500,
                message = "An internal server error occurred. Please contact SCIP Support.",
                details = exception.Message
            };

            return context.Response.WriteAsync(JsonSerializer.Serialize(error));
        }
    }

    public static class ExceptionMiddlewareExtensions
    {
        public static IApplicationBuilder UseScipExceptionMiddleware(this IApplicationBuilder builder) =>
            builder.UseMiddleware<ExceptionMiddleware>();
    }
}
