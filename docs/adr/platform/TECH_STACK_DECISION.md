---
adr-id: "ADR-081"
title: "Tech Stack Decision"
status: "accepted"
decision-date: "2026-03-02"
scope: "normalized engineering decision record"
source-artifact: "[TECH_STACK_DECISION.md](TECH_STACK_DECISION.md)"
status-gate: "planning corpus + ADR governance review"
domain: "platform"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-081: Tech Stack Decision

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [TECH_STACK_DECISION.md](TECH_STACK_DECISION.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# OpenAusLMSK12 Tech Stack Decision (Pointer)

## Authoritative Source

The canonical stack decision is now recorded in:
- [ADR-001 Backend Runtime Choice](../core/ADR-001-backend-runtime-choice.md)
- [ADR-010 Platform Stack Baseline](../core/ADR-010-platform-stack-baseline.md)

## Summary
- Backend phase-1: `.NET 8 (C#)` in monolithic implementation.
- Frontend: TypeScript web shell (React/Next.js).
- Data layer: PostgreSQL + Redis + object storage.
- Async/event: outbox/inbox and queue workers.
- Rust: optional phase-2+ isolated service only after measurable bottlenecks and approval.

## Compliance Rule
Any stack change or runtime split not aligned to the linked ADRs requires a new ADR before implementation.






