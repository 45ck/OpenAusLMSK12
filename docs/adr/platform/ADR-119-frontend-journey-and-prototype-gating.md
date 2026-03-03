# ADR-119: Frontend Journey and Prototype Gating

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-03
- **scope**: frontend UX, journey validation, and defect-prevention planning
- **source-artifact**: [USER_JOURNEY_EXECUTION_GOVERNANCE.md](USER_JOURNEY_EXECUTION_GOVERNANCE.md), [LOW_FIDELITY_PROTOTYPING_STANDARD.md](LOW_FIDELITY_PROTOTYPING_STANDARD.md), [DIGITAL_MODELING_STANDARD.md](DIGITAL_MODELING_STANDARD.md), [route_structure_and_component_contracts.md](route_structure_and_component_contracts.md)
- **status-gate**: planning corpus + ADR governance review

## Context
The system includes multiple high-risk interaction channels (attendance, incidents, consent, finance, wellbeing, and staff operations) where implementation bugs are predominantly UX/logic handoff failures between routes, route state, and policy engines. Existing ADRs define journeys and diagrams, but implementation readiness needs an explicit one-step gate.

## Decision
Before any UI story can enter coding, each flow must satisfy the following mandatory package:

1. `journey` entry in scope (`USER_JOURNEY_EXECUTION_GOVERNANCE` with positive and exception paths).
2. `low-fidelity` prototype packet (`LOW_FIDELITY_PROTOTYPING_STANDARD`) containing:
   - state map
   - error/denial behavior
   - offline and interruption behavior
   - at least one exception path for consent/permission and one for concurrency/error state.
3. `route contract` in `route_structure_and_component_contracts.md` (permissions, consent, API dependencies, audit linkage).
4. `diagram proof` in line with `DIGITAL_MODELING_STANDARD` for each high-risk path.

## Required Exceptions Coverage
- Minimum exception cases per flow:
  - permission denied
  - consent revoked mid-flow
  - duplicate submission/idempotency collision
  - stale/locked state recovery
  - workflow timeout or escalation handoff

## Enforcement Rule
- Non-compliant flows are blocked from Wave acceptance in `ADR-116`.
- Compliance proof required in every ticket package and evidence matrix row.

## Consequences
- Prevents speculative UI implementation before domain policy is clarified.
- Reduces rework from mismatched permission, consent, and state transitions.
- Forces journey-level acceptance evidence before production feature sequencing.

