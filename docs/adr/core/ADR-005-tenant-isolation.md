# ADR-005 Tenant Isolation Enforcement

## Status: Accepted
## Date: 2026-03-02

## Context
The previous plan allowed runtime-only tenant filtering; this is insufficient for high-risk multi-tenant operations.

## Decision
Enforce tenant isolation at storage and query boundary:
- `tenant_id` as mandatory scope on domain tables.
- PostgreSQL Row-Level Security (RLS) policies for all mutable and read-heavy schemas.
- DB session function sets tenant context on every connection.
- Tenant-aware indexes and migration checks for tenant bleed.

## Consequences
- Tenant leak risks move from application convention to enforceable datastore constraints.
- Tenant bleed tests become deterministic through SQL-level assertions.

## Action
Document proof and gating checks added under `tenant_isolation_proof.md` and `DB_IMPLEMENTATION_CHECKLIST.md`.


