# ADR-114: Backlog and Ticket Execution Standard

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-03
- **scope**: delivery discipline and implementation ticketing
- **source-artifact**: [IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS.md](IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS.md), [WORKSTREAMS_AND_OWNERSHIP_PLAN.md](WORKSTREAMS_AND_OWNERSHIP_PLAN.md), [FULL_SOFTWARE_ENGINEERING_PLAN.md](FULL_SOFTWARE_ENGINEERING_PLAN.md), [QUALITY_AND_TEST_STRATEGY_MATRIX.md](QUALITY_AND_TEST_STRATEGY_MATRIX.md)
- **status-gate**: planning readiness review

## Context
The project needs high-confidence ticketing because all domains are implemented in parallel streams and have strict consent, retention, and audit requirements.

## Decision
Every implementable item is split into an execution issue using the following required structure:

- **Identity**: ADR references, domain owner, workstream, and wave.
- **Scope**: explicit API routes, data entities, and UI routes.
- **Contracts**: test-ready OpenAPI entry points, permission matrix rule, and consent rule.
- **User value**: one persona journey + one exception journey.
- **Technical constraints**: dependencies, idempotency points, event emission, rollback expectation.
- **Quality gates**: at least one unit/integration/journey test category listed.
- **Evidence**: which runbook and evidence file the feature contributes to.

Ticket lifecycle rules:
- `To Do`: must include all required fields above.
- `In Progress`: requires design owner + acceptance owner assigned.
- `Done`: requires all mapped acceptance criteria and no unresolved critical findings from test layer.

## Consequences
- Backlog quality becomes machine-auditable via template checks.
- Parallel execution stays coherent across backend, frontend, QA, and compliance.
- Missing journey or contract context blocks story start by process definition, not manual triage.

## Acceptance Criteria
- Every wave in `IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS.md` has at least one ticket using this template.
- No story can be merged without a linked permission and route contract.
- Delivery notes reference evidence for both positive and negative cases.

