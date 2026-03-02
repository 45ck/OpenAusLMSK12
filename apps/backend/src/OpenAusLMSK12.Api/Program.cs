var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", () => new
{
    service = "OpenAusLMSK12 API",
    message = "Phase-1 modular monolith backend scaffold is ready."
});

app.MapGet("/health", () => new
{
    status = "ok",
    checkedAt = DateTimeOffset.UtcNow
});

app.Run();
