# ADR-004 API Client and OAuth Lifecycle

## Status: Accepted
## Date: 2026-03-02

## Context
The platform requires app integrations, but no concrete secret lifecycle was defined in the original contracts.

## Decision
Define explicit integration client lifecycle:
- `oauth_client` with `draft -> active -> revoked -> suspended` states.
- `oauth_client_secret` with rotating secret versions and expiry.
- Compromise path: immediate revocation + optional global token sweep + incident ticketing.

## API Contract
- `POST /api/v1/integrations/clients/{id}/rotate-secret`
- `POST /api/v1/integrations/clients/{id}/revoke`
- `POST /api/v1/integrations/tokens/{id}/revoke`
- `GET /api/v1/integrations/clients/{id}/evidence`

## Security Controls
- secrets are stored as non-reversible hashes or sealed values with envelope encryption
- active token/session revocation events are immediately propagated to integration adapters
- rate-limited, logged, and audited secret operations

## Action
New API/client endpoints added in `COMPREHENSIVE_IMPLEMENTATION_ARTIFACT.md` and model updates added to `ERD_AND_DATA_MODEL.md`.


