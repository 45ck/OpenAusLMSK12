# ADR-006 Field-Level Permissions and Route Contracts

## Status: Accepted
## Date: 2026-03-02

## Context
Role-only matrices alone are insufficient where consent/custody and wellbeing masking vary per field.

## Decision
Introduce explicit field-level sensitivity tags and route-specific permission envelopes.

- Sensitive fields are tagged with `public`, `internal`, `restricted`, or `critical`.
- Runtime evaluates both endpoint policy and field policy before returning fields.
- Sensitive route actions require domain-specific `consent_scope` context.

## Consequences
- Authorization decisions become deterministic for child safety/health/finance fields.
- UI receives `field_redacted` metadata and can render compliant fallbacks.

## Action
`domain_permissions_matrix.md` is no longer draft-only; pending decisions now resolved via `field_level_permissions_contract.md`.


