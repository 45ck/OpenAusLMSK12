---
adr-id: "ADR-110"
title: "Module Catalog API Versioning"
status: "accepted"
decision-date: "2026-03-02"
scope: "domain catalog API contract"
source-artifact: "[ADR-108](API_STRATEGY_AND_GRAPHQL_SCOPE.md)"
status-gate: "API-first + compatibility review"
domain: "platform"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-110: Module Catalog API Versioning

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: domain catalog API contract
- **source-artifact**: [ADR-108](API_STRATEGY_AND_GRAPHQL_SCOPE.md)
- **status-gate**: API-first + compatibility review

## Context
The backend module-catalog endpoints were exposing unprefixed paths (`/api/modules...`) while system-wide contract governance requires versioned REST roots (`/api/v1/*`). This created a mismatch between execution code and architectural ADR expectations.

## Decision
Module catalog and engagement endpoints are now registered under `/api/v1/*` with explicit compatibility aliases preserved at `/api/*`:

- `/api/v1/modules`
- `/api/v1/modules/{slug}`
- `/api/v1/modules/{slug}/journeys`
- `/api/v1/engagement/ready-modules`
- `/api/v1/health`

Backward-compatible aliases remain on `/api/*` until clients migrate.

## Consequences
- API contract alignment with ADR-108 is restored.
- Consumers can migrate from legacy paths to versioned paths without an immediate breaking change.
- JSON serialization is normalised to camelCase for contract parity with shared TypeScript contract types.

## Implementation notes
- `System.Text.Json` camelCase policy is set in `apps/backend/src/OpenAusLMSK12.Api/Program.cs`.
- Endpoint registration is centralised through a shared `MapModuleCatalogRoutes(...)` helper to avoid drift between versions.
