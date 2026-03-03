---
adr-id: "ADR-007"
title: "Route Contract Completion"
status: "accepted"
decision-date: "2026-03-02"
scope: "platform"
source-artifact: "ADR 007 route contract completion"
status-gate: "adr governance"
domain: "core"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-007 Route Contract Completion

## Status: Accepted
## Date: 2026-03-02

## Context
Route contracts had structural intent but were not complete at endpoint-level for critical flows.

## Decision
A route matrix for critical paths is required before implementation:
- query route
- permission guard set
- consent scope
- offline/retry behavior
- audit event mapping

## Consequences
- Frontend and API teams can implement against the same contract baseline.
- Regression failures for denied/invalid states are testable early.

## Action
`route_structure_and_component_contracts.md` now includes explicit critical route entries with contract metadata.


