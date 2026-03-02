# ADR-092: Low-Fidelity Prototyping Standard

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: frontend design and interaction planning
- **source-artifact**: [FULL_SOFTWARE_ENGINEERING_PLAN.md](FULL_SOFTWARE_ENGINEERING_PLAN.md), [TECH_STACK_DECISION.md](TECH_STACK_DECISION.md)
- **status-gate**: planning corpus + ADR governance review

## Context
Many critical workflows are high risk (guardianship, attendance incidents, finance corrections, substitutions). UI misdesign in these flows produces safety or compliance impact even if backend logic is correct.

## Decision
No production work begins on a route or flow until it has an approved low-fidelity prototype package that proves interaction assumptions.

## Minimum Prototype Package (per flow)
1. **Route intent**: who uses it, when, and with what decision outcome.
2. **State map**: initial, waiting, submit, success, conflict, denied, timeout, recovered.
3. **Error/denial model**: explicit messaging for permission and tenant/consent failures.
4. **Offline and interruption behavior**: what remains persisted, what replays.
5. **Primary interaction sequence**: 1–2 minute happy path and 3–4 exception paths.
6. **Accessibility notes**: focus order, labels, keyboard and mobile target size checks.

## Acceptance Criteria for Prototypes
- Must demonstrate route-level failure behavior for:
  - permission denied
  - consent revoked mid-flow
  - duplicate/expired request
  - temporary disconnect and recovery
- Must include a handoff test sheet:
  - API contract required
  - route guard required
  - audit event required
  - user message copy approved
- Must include evidence that each action is mapped to at least one explicit data mutation or read path.

## Implementation Impact
- Frontend development pulls from approved prototypes and not from assumptions.
- Backend story sizing must reference at least one approved prototype per journey.
- UX, backend, QA, and SRE all sign the prototype package before development start.

## Consequences
- Longer planning lead time in the first iteration.
- Fewer runtime UX regressions and fewer policy-related release defects.
- Lower defect coupling between personas and backend contract interpretation.

## Exit Rule
A flow can move to coding only when this prototype package is approved by:
- design owner
- product owner
- security/compliance owner
- QA owner
