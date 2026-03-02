# ADR-010 Platform Stack Baseline

## Status: Accepted
## Date: 2026-03-02

## Context
Platform stack decisions were split across plan text and a dedicated tech stack file. This ADR consolidates stack commitments and optional future exceptions.

## Decision
- Backend is `.NET 8 (C#)` for phase 1 monolith services.
- Frontend is TypeScript (React/Next.js) in one web shell with route-based access control.
- Data layer is PostgreSQL for transactional state, Redis for short-lived coordination, and object storage for files/media.
- Async execution uses an outbox/inbox pattern over queue-based workers.
- Rust may be introduced only for explicit, measurable performance components as isolated services with stable contracts and migration boundaries.

## Consequences
- No mixed Rust/.NET runtime in phase 1 monolith.
- Integration boundaries and API contracts remain stack-agnostic.
- Vendor/stack optimisation work follows measured evidence and ADR-based boundary approval.

## Action
- `TECH_STACK_DECISION.md` is now a compact pointer to this ADR and ADR-001.
- Stack drift is gated by ADR review before environment or module changes.



