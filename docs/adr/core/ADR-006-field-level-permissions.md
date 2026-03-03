---
adr-id: "ADR-006"
title: "Field-Level Permissions and Route Contracts"
status: "accepted"
decision-date: "2026-03-02"
scope: "platform"
source-artifact: "ADR 006 field level permissions"
status-gate: "adr governance"
domain: "core"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

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
`domain_permissions_matrix.md` is no longer draft-only; pending decisions now resolved via [ADR-109: Field Permissions Mask Contract](./ADR-109-field-permissions-mask-contract.md).


