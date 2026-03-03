# ADR-115: Persona Journey and Exception Coverage Lock

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-03
- **scope**: UX, journey governance, and failure-path design
- **source-artifact**: [USER_JOURNEY_EXECUTION_GOVERNANCE.md](USER_JOURNEY_EXECUTION_GOVERNANCE.md), [LOW_FIDELITY_PROTOTYPING_STANDARD.md](LOW_FIDELITY_PROTOTYPING_STANDARD.md), [DIGITAL_MODELING_STANDARD.md](DIGITAL_MODELING_STANDARD.md), [route_structure_and_component_contracts.md](route_structure_and_component_contracts.md)
- **status-gate**: journey readiness review + accessibility review

## Context
Journey quality in a platform this size fails when exception paths are not specified before build. Consent-aware behavior, custody complexity, and workflow recovery paths are high-risk and need mandatory pre-build confirmation.

## Decision
For every domain, implementation is gated behind two ready artifacts:

1. **Primary journey pack**: one complete positive path per persona.
2. **Exception pack**: one high-impact negative/exceptions path per persona.

Each pack must include:
- low-fidelity prototype notes,
- route + API binding,
- consent/read-level boundaries,
- failure/retry/recovery state transitions,
- visible status model (`idle/loading/ready/error/conflict/readonly`) and user messaging language.

Priority exception journeys must include all of:
- consent revoked mid-flow,
- tenant policy change during operation,
- concurrent edit or stale-state conflict,
- workflow timeout and re-route behavior.

## Consequences
- UX/API contracts and backend contracts stay aligned.
- Accessibility and trust boundaries are validated before build in each domain.
- Emergency and safety-sensitive workflows (attendance, wellbeing, incident, events) are not started with implicit behavior.

## Acceptance Criteria
- Every implementation issue references at least one journey pack.
- Each implemented route that mutates data has explicit conflict and retry behavior documented.
- Accessibility and exception messaging are present before UI development start.

