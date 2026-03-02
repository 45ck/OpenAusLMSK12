# ADR-001 Backend Runtime Choice

## Status: Accepted
## Date: 2026-03-02

## Context
Earlier planning text allowed both Rust and .NET in phase 0, which is incompatible with deterministic team/process lock.

## Decision
Use `.NET 8 (C#)` for all phase-1 back-end services in the modular monolith. TypeScript remains the frontend language.

## Rationale
- Faster compliance/security control delivery for RBAC, session, and audit-heavy workflows.
- Fewer cross-runtime interoperability risks during day-one integration.
- Better observability and policy consistency under one governance boundary.

## Consequences
- All core APIs and module boundaries are implemented in one runtime during phase 1.
- Rust is allowed only in explicit phase-2+ isolated services with clear event boundaries.

## Action
`TECH_STACK_DECISION.md` is now the canonical decision document for runtime.


