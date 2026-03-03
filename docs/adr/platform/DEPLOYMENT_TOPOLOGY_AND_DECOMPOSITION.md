---
adr-id: "ADR-107"
title: "Deployment Topology and Service Decomposition"
status: "accepted"
decision-date: "2026-03-02"
scope: "runtime architecture and delivery topology"
source-artifact: "[IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS](IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS.md)"
status-gate: "ADR review + implementation package approval"
domain: "platform"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-107: Deployment Topology and Service Decomposition

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: runtime architecture and delivery topology
- **source-artifact**: [IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS](IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS.md)
- **status-gate**: ADR review + implementation package approval

## Context
Full-platform delivery starts as a modular monolith, but high-volume or regulated modules need a controlled path to isolation once coupling decreases.

## Decision
For phase 1, the platform is deployed as one modular monolith behind one API and one web shell.

- Keep a strict logical separation in phase 1:
  - Command/transactional domain models and mutations.
  - Outbox/inbox event infrastructure for all cross-module state propagation.
  - Read/reporting projections generated from events.
- Do not split any service until all three decomposition criteria are met for a bounded context:
  1) **Sustained load pressure**: production P95 transaction latency > 500ms for 7+ days and queue delay growth above defined SLO.
  2) **Autonomy pressure**: sustained delivery speed loss from coordination boundaries over two consecutive quarters.
  3) **Change volatility**: the candidate domain has stable contracts but independently releasable roadmap and clear ownership.
- Extraction sequence (when criteria are met), in order:
  1. Analytics/reporting and audit projection path.
  2. Notification fan-out adapters (channel providers).
  3. AI/mL workloads that are explicitly tenant-configurable.
  4. Any remaining service candidate.
- Extraction requires a signed package in `INTEGRATION_AND_WEBHOOK_CONTRACTS` with:
  - stable integration contracts,
  - idempotent event handling,
  - migration and rollback scripts,
  - dual-write/read run mode for 2 weeks,
  - explicit performance acceptance checkpoints.

## Architecture Consequences
- Single release train remains for OLTP modules through phase 1.
- Read-heavy AI/analytics can scale separately only after projection ownership is formalised.
- New services are added only with explicit contract versioning and backward compatibility commitments.

## Gates
- `gate-deploy` requires both command-path and projection-path migration runbooks before any production split.
- `gate-observability` requires queue backpressure, replay latency, and dead-letter rates in SLO and alerting.
- `gate-rollback` requires parity checklist between monolith and split mode for 14 days before decommissioning legacy path.
