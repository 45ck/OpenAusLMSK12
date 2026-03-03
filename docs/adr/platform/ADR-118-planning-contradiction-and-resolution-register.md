---
adr-id: "ADR-118"
title: "Planning Contradiction and Resolution Register"
status: "accepted"
decision-date: "2026-03-03"
scope: "architecture governance and implementation readiness"
source-artifact: "[AGENT_REVIEW_SUMMARY.md](../governance/AGENT_REVIEW_SUMMARY.md), [ADR-112](ADR-112-research-and-implementation-readiness-gate.md), [ADR-116](ADR-116-release-handover-and-wave-gates.md)"
status-gate: "planning corpus + ADR governance review"
domain: "platform"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-118: Planning Contradiction and Resolution Register

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-03
- **scope**: architecture governance and implementation readiness
- **source-artifact**: [AGENT_REVIEW_SUMMARY.md](../governance/AGENT_REVIEW_SUMMARY.md), [ADR-112](ADR-112-research-and-implementation-readiness-gate.md), [ADR-116](ADR-116-release-handover-and-wave-gates.md)
- **status-gate**: planning corpus + ADR governance review

## Context
The platform plan spans >14 domain ADR sets with independent domain-specific state transitions and consent, safety, and migration constraints. Reviewers currently have no single, normalized place to log unresolved cross-domain contradictions that can block build readiness.

## Decision
Introduce a normalized ADR-based contradiction protocol with zero separate mutable registers:

1. This ADR is the canonical list for unresolved design contradictions and high-confidence risks during planning.
2. Contradiction entries must be created as ADRs (new numbered ADR files) rather than informal notes.
3. Any ADR that changes interpretation of an earlier decision must be cross-linked here and then linked back to `ADR-116`.
4. A contradiction is considered resolved only when either:
   - the referenced ADR is accepted/rejected, and
   - the resulting decision is referenced in the relevant execution packet.

## Resolution Policy
- **Severity levels**: `critical`, `high`, `medium`, `low`.
- **Ownership**: by domain lead named in affected ADR.
- **Timeline**:
  1. `critical` must be closed before Wave 1 start or any new high-risk story in that workstream.
  2. `high` must be closed before first production-like deployment of that domain.
  3. `medium/low` can continue to `Wave` planning backlog if mitigation tickets are attached.
- **Review cadence**: weekly in gate reviews and before each wave handoff.

## Register Table

| Severity | Contradiction | Impacted ADR(s) | Owner | Resolution State | Evidence Packet |
|---|---|---|---|---|---|
| low | None outstanding | N/A | N/A | closed by policy | N/A |

## Consequences
- Prevents hidden architecture drift between ADRs and execution tickets.
- Creates a deterministic path from planning disagreement to release decision.
- Makes escalation and contradiction closure auditable via ADR IDs alone.

