# ADR-069: Quality And Test Strategy Matrix

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [QUALITY_AND_TEST_STRATEGY_MATRIX.md](QUALITY_AND_TEST_STRATEGY_MATRIX.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# Quality and Test Strategy Matrix

## Purpose

Define what “done” means for each domain before implementation and release. This matrix converts architecture quality into executable tests.

## Test Layers

- Unit: domain logic, validators, state transitions
- Contract: API schemas and error contracts
- Integration: cross-domain interactions and integration adapters
- Journey: persona route + API + DB state convergence
- Resilience: retries, idempotency, failover, rollback
- Security/Privacy: tenant bleed, privilege escalation, consent leak
- Accessibility/Usability: WCAG + critical UX path checks
- Compliance: retention, legal holds, audit integrity

## Matrix

### A) Foundation Trust
- Must pass:
  - tenant isolation tests on all queries and writes
  - role escalation tests (negative)
  - consent revocation propagation test within 2 minutes in canary
  - security failure state tests for auth/session/token anomalies
- Regression focus:
  - cross-tenant reads
  - inherited admin bypasses
  - orphaned app tokens after rotation

### B) People and Household
- Must pass:
  - household graph cardinality and transition tests
  - custody conflict and restricted-access tests
  - relationship transition test matrix
- Regression focus:
  - inconsistent parent/child mapping on import
  - stale guardianship after transfer

### C) Admissions
- Must pass:
  - full lifecycle path (inquiry to archived)
  - duplicate application handling
  - year rollover transitions
- Regression focus:
  - withdrawn/reactivated ambiguity
  - evidence record immutability

### D) Operations and Attendance
- Must pass:
  - scheduling conflict resolution determinism
  - kiosk edit and integrity checks
  - attendance reconciliation and exception state handling
- Regression focus:
  - overlapping substitutions
  - emergency suspension and resume transitions

### E) Learning and Assessment
- Must pass:
  - assignment submit/rework/regrade path
  - moderation + publish path
  - grade visibility by role and consent
- Regression focus:
  - late/invalid submissions
  - duplicate grade updates

### F) Wellbeing and Safety
- Must pass:
  - health/behaviour redaction policy
  - incident handoff and closure chain
  - intervention timeline enforcement
- Regression focus:
  - confidentiality leak through reporting query
  - emergency read override without audit trace

### G) Communications
- Must pass:
  - route-specific notification policy enforcement
  - attachment scanning and secure retention
  - retry/backoff behavior under transient failures
- Regression focus:
  - duplicate sends
  - unauthorized recipient route mismatch

### H) Finance
- Must pass:
  - idempotent payment callback handling
  - reconciliation against invoice and ledger
  - chargeback/reversal path with audit retention
- Regression focus:
  - partial payments and state ambiguity
  - reconciliation race and timeout handling

### I) HR and Workforce
- Must pass:
  - roster/leave conflict resolution
  - staff lifecycle state transitions
  - payroll boundary tests
- Regression focus:
  - role drift across substitutions
  - stale leave status in timetabling

### J) Workflows and Forms
- Must pass:
  - schema validation and conditional logic
  - timeout/SLA escalation
  - compensation on partial failure
- Regression focus:
  - concurrent approvals
  - invalid form migrations

### K) Integration and API
- Must pass:
  - contract compatibility tests for connectors
  - webhook signature/replay tests
  - deprecation path tests
- Regression focus:
  - callback duplication
  - schema mismatch with tenant-specific payloads

### L) AI Governance
- Must pass:
  - prompt/data classification enforcement
  - moderation and escalation flow
  - opt-out/kill-switch enforcement
- Regression focus:
  - unsafe output bypass
  - missing redaction in audit payload

### M) Resilience and Compliance
- Must pass:
  - SLO validation on high-volume windows
  - rollback drill with state consistency checks
  - breach simulation and evidence collection
- Regression focus:
  - migration rollback ambiguity
  - missing legal hold override during delete operations

## Delivery Quality Rule

- A domain cannot move to next milestone until its matrix is green and gate-reviewed.



