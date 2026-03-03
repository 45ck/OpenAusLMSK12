---
adr-id: "ADR-116"
title: "Release Handover and Wave Gate Protocol"
status: "accepted"
decision-date: "2026-03-03"
scope: "staging flow, release confidence, and milestone handover"
source-artifact: "[IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md), [IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS.md](IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS.md), [QUALITY_AND_TEST_STRATEGY_MATRIX.md](QUALITY_AND_TEST_STRATEGY_MATRIX.md), [observability_and_release_readiness_runbook.md](../reliability/observability_and_release_readiness_runbook.md)"
status-gate: "planning + reliability + governance sign-off"
domain: "platform"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-116: Release Handover and Wave Gate Protocol

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-03
- **scope**: staging flow, release confidence, and milestone handover
- **source-artifact**: [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md), [IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS.md](IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS.md), [QUALITY_AND_TEST_STRATEGY_MATRIX.md](QUALITY_AND_TEST_STRATEGY_MATRIX.md), [observability_and_release_readiness_runbook.md](../reliability/observability_and_release_readiness_runbook.md)
- **status-gate**: planning + reliability + governance sign-off

## Context
Monolithic phased delivery requires hard handoffs between workstreams to prevent unstable cross-domain coupling and uncontrolled production exposure.

## Decision
Each milestone handoff requires a signed wave packet containing:

- `Gate A`: Trust and Identity evidence
- `Gate B`: Foundation data evidence (`ERD`, permissions, household graph, migration correctness)
- `Gate C`: Operations evidence (att/timetable/conflict and notification reliability)
- `Gate D`: Safety evidence (wellbeing/incident/finance controls and redaction)
- `Gate E`: Integration and enterprise evidence (webhooks, web API compatibility, billing)
- `Gate F`: Governance evidence (audits, holds, breach/rollback drills, SLO conformance)

Wave handoff protocol:
1. No code moves from "validated" to "released" without gate packet.
2. Each packet includes rollback path, incident owner, and test evidence.
3. Release cannot proceed if any "critical" requirement in packet is `no`.

## Consequences
- Team leads have explicit stop conditions before production rollout.
- Evidence requirements are shared and immutable between waves.
- Auditability and confidence are preserved as domains scale.

## Acceptance Criteria
- `Gate` packet exists for each completed wave and is linked from backlog summary.
- Rollback drill has evidence for at least one critical domain before Wave ≥ 2 release.
- Any unresolved critical exception in packet blocks gate approval.

