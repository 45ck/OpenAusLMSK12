using System.Text.Json;
using OpenAusLMSK12.Api.Modules;

var builder = WebApplication.CreateBuilder(args);
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();

app.MapGet("/", () => new
{
    service = "OpenAusLMSK12 API",
    message = "OpenAusLMSK12 planning platform backend now exposes module-level planning contracts.",
    stage = DomainModuleCatalog.Catalog.Domain
});

app.MapGet("/health", () => new
{
    status = "ok",
    checkedAt = DateTimeOffset.UtcNow
});
app.MapGet("/api/v1/health", () => new
{
    status = "ok",
    checkedAt = DateTimeOffset.UtcNow
});

static void MapModuleCatalogRoutes(IEndpointRouteBuilder routeBuilder, string apiPrefix)
{
    routeBuilder.MapGet($"{apiPrefix}/modules", () => DomainModuleCatalog.Catalog);
    routeBuilder.MapGet($"{apiPrefix}/modules/{{slug}}", (string slug) => DomainModuleCatalog.GetModuleBySlug(slug));
    routeBuilder.MapGet($"{apiPrefix}/modules/{{slug}}/journeys", (string slug) =>
    {
        var payload = DomainModuleCatalog.Catalog.Capabilities.FirstOrDefault(module =>
            string.Equals(module.Slug, slug, StringComparison.OrdinalIgnoreCase));
        return payload is null
            ? Results.NotFound(new { message = $"Unknown module '{slug}'." })
            : Results.Ok(payload.Journey);
    });
    routeBuilder.MapGet($"{apiPrefix}/engagement/ready-modules", () => DomainModuleCatalog.Catalog.Capabilities
        .Where(capability => capability.Stage is "in_progress" or "ready" or "designed")
        .Select(capability => new
        {
            capability.Id,
            capability.Name,
            capability.Slug,
            capability.Stage
        }));
}

MapModuleCatalogRoutes(app, "/api/v1");
MapModuleCatalogRoutes(app, "/api");

await app.RunAsync().ConfigureAwait(false);
