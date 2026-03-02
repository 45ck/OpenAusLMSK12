# ADR-051: Implementation Roadmap

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# OpenAusLMSK12 Implementation Roadmap

## Delivery Model
- Planning-first, implementation-second with strict contract-first gates.
- No external module scaffold starts until relevant ADRs and data/API contracts are signed.

## Phase 1: Foundation Lock (Weeks 1-2)

- Apply `TECH_STACK_DECISION.md` and accepted ADRs:
  - [ADR-001](../core/ADR-001-backend-runtime-choice.md)
  - [ADR-009](../core/ADR-009-architecture-governance-baseline.md)
  - [ADR-010](../core/ADR-010-platform-stack-baseline.md)
- Implement tenant, school, year, year_level, person, user_account, student, staff, carer.
- Implement household, custody, consent, admissions_application, and enrolment tables.
- Enable document vault baseline (`document`, `document_version`, `document_scan`, `document_retention_state`).
- Implement immutable audit write path and tenant guard middleware.
- Publish baseline OpenAPI for identity, people, admissions, and auth keys.

## Gate A Entry Criteria
- All auth/session/token abuse tests pass.
- Tenant isolation checks pass (including negative tenant-bleed tests).
- No unresolved critical ADRs.

## Phase 2: Core Operations (Weeks 3-6)

- Implement programme/class/timetable/room/period, staff assignment, substitutions.
- Implement attendance and visitor event foundations.
- Implement lesson, assignment, assignment submission and gradebook base flows.
- Implement parent portal route shell and consent-aware enrolment/attendance views.
- Publish baseline webhook/outbox path for operational events.

## Gate B Entry Criteria
- Admissions + household + attendance route contracts linked to permissions matrix.
- Event emission for state transitions in these domains.
- Contract tests pass for tenant-scoped reads and writes.

## Phase 3: Learning, Wellbeing, and Safety (Weeks 7-10)

- Expand markbook moderation and report generation.
- Implement wellbeing/health/incident workflows with field-masking boundaries.
- Implement incident escalation and case handoff.
- Implement event, visit, and evacuation paths with consent-aware attendance views.

## Phase 4: Enterprise Domains (Weeks 11-14)

- Implement finance invoices/payments/reconciliation with idempotent payment callbacks.
- Implement forms, workflow engine, HR/staff lifecycle, and roster/leave.
- Implement integration app registry and OAuth token lifecycle admin APIs.

## Phase 5: Hardening and Release (Weeks 15-18)

- Implement observability and rollback drills for all high-risk paths.
- Complete compliance controls for legal-holds, exports, and deletion.
- Final audit and consent propagation acceptance before production rollout.

## Mandatory Gate Matrix

| Gate | Name | Required Outcomes |
| --- | --- | --- |
| A | Security and Identity Baseline | RBAC/ABAC + MFA + session policies + no critical auth/tenant vulnerabilities |
| B | Data and Contract Freeze | ERD/DB mapping complete + OpenAPI for critical modules + event contracts + index/migration checks |
| C | Platform Readiness | Core journeys complete with negative tests + accessibility gate + performance smoke criteria |
| D | Compliance and Audit Integrity | Consent revocation propagation and legal hold workflows with audit traceability |
| E | Launch Readiness | Restore, rollback, and breach drill evidence plus SLO compliance check |

## Exit Criteria

- No blocked ADR is left open before entering each gate.
- Every high-risk workflow has at least one failure recovery path and compensating action.





