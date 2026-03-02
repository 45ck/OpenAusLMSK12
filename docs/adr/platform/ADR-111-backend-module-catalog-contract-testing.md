# ADR-111: Backend Module Catalog Contract Testing

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-03
- **scope**: backend API contracts and quality gates
- **source-artifact**: [ModuleCatalogContractTests.cs](../../apps/backend/tests/OpenAusLMSK12.Api.Tests/ModuleCatalogContractTests.cs)
- **status-gate**: ci + noslop

## Context
The API initially exposed only route-level smoke checks for module catalog endpoints. This created a blind spot in contract quality: path alias behavior, case-insensitive matching, and journey payload shape were untested. For a domain where long-range planning depends on stable API contracts, untested contract drift becomes a release blocker.

## Decision
Introduce explicit backend contract tests for the catalog surface and make them part of the mandatory backend quality checks.

- Keep `/api/v1/modules` and `/api/modules` contract endpoints tested for stable presence and shape.
- Add tests covering:
  - module slug lookup (`/api/v1/modules/{slug}`) including missing-module 404 behavior,
  - case-insensitive slug handling,
  - `/api/v1/modules/{slug}/journeys` payload structure,
  - compatibility behavior for legacy `/api` namespace.
- Run these tests in the backend solution under `apps/backend/tests/OpenAusLMSK12.Api.Tests` as part of `ci:backend` and repository CI flow.

## Consequences
- Backend changes that alter contract shape now fail quickly in local and CI validation.
- Future refactors must keep compatibility routes (`/api/modules/*`) functional.
- The plan can progress from documentation-heavy planning to test-backed implementation while preserving API stability expectations.
