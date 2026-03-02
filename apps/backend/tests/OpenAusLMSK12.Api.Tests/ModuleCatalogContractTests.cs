using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace OpenAusLMSK12.Api.Tests;

public class ModuleCatalogContractTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ModuleCatalogContractTests(WebApplicationFactory<Program> factory)
    {
        ArgumentNullException.ThrowIfNull(factory);
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task HealthEndpointReturns200()
    {
        var response = await _client.GetAsync(new Uri("/health", UriKind.Relative));

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task ModuleCatalogRoutesReturnExpectedShape()
    {
        var v1Response = await _client.GetAsync(new Uri("/api/v1/modules", UriKind.Relative));
        Assert.Equal(HttpStatusCode.OK, v1Response.StatusCode);

        var modulePayload = await v1Response.Content.ReadAsStringAsync();
        using var document = JsonDocument.Parse(modulePayload);
        var root = document.RootElement;
        Assert.True(root.TryGetProperty("domain", out _));
        Assert.True(root.GetProperty("capabilities").GetArrayLength() > 0);
    }

    [Fact]
    public async Task ModuleCatalogRoutesHandleSlugCaseInsensitively()
    {
        var lowercase = await _client.GetAsync(new Uri("/api/v1/modules/Foundation", UriKind.Relative));
        Assert.Equal(HttpStatusCode.OK, lowercase.StatusCode);

        var uppercase = await _client.GetAsync(new Uri("/api/v1/modules/FOUNDATION", UriKind.Relative));
        Assert.Equal(HttpStatusCode.OK, uppercase.StatusCode);

        Assert.Equal(await lowercase.Content.ReadAsStringAsync(), await uppercase.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task ModuleJourneyRouteReturnsJourneyPayload()
    {
        var journeyPayload = await _client.GetAsync(new Uri("/api/v1/modules/foundation/journeys", UriKind.Relative));
        Assert.Equal(HttpStatusCode.OK, journeyPayload.StatusCode);

        var content = await journeyPayload.Content.ReadAsStringAsync();
        using var document = JsonDocument.Parse(content);
        var root = document.RootElement;
        Assert.Equal(JsonValueKind.Array, root.ValueKind);
        Assert.NotEmpty(root.EnumerateArray());
    }

    [Fact]
    public async Task ModuleSlugLookupHasBackwardsCompatibleRoutes()
    {
        var modern = await _client.GetAsync(new Uri("/api/v1/modules/foundation", UriKind.Relative));
        Assert.Equal(HttpStatusCode.OK, modern.StatusCode);

        var legacy = await _client.GetAsync(new Uri("/api/modules/foundation", UriKind.Relative));
        Assert.Equal(HttpStatusCode.OK, legacy.StatusCode);

        var missing = await _client.GetAsync(new Uri("/api/v1/modules/not-a-real-module", UriKind.Relative));
        Assert.Equal(HttpStatusCode.NotFound, missing.StatusCode);
    }
}
