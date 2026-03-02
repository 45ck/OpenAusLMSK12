using OpenAusLMSK12.Api.Modules;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

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

app.MapGet("/api/modules", () => DomainModuleCatalog.Catalog);
app.MapGet("/api/modules/{slug}", (string slug) => DomainModuleCatalog.GetModuleBySlug(slug));
app.MapGet("/api/modules/{slug}/journeys", (string slug) =>
{
    var payload = DomainModuleCatalog.Catalog.Capabilities.FirstOrDefault(module =>
        string.Equals(module.Slug, slug, StringComparison.OrdinalIgnoreCase));
    return payload is null
        ? Results.NotFound(new { message = $"Unknown module '{slug}'." })
        : Results.Ok(payload.Journey);
});

app.MapGet("/api/engagement/ready-modules", () => DomainModuleCatalog.Catalog.Capabilities
    .Where(capability => capability.Stage is "in_progress" or "ready" or "designed")
    .Select(capability => new
    {
        capability.Id,
        capability.Name,
        capability.Slug,
        capability.Stage
    }));

app.Run();
