---
adr-id: "ADR-028"
title: "Comprehensive Implementation Artifact"
status: "accepted"
decision-date: "2026-03-02"
scope: "normalized engineering decision record"
source-artifact: "[COMPREHENSIVE_IMPLEMENTATION_ARTIFACT.md](COMPREHENSIVE_IMPLEMENTATION_ARTIFACT.md)"
status-gate: "planning corpus + ADR governance review"
domain: "platform"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-028: Comprehensive Implementation Artifact

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [COMPREHENSIVE_IMPLEMENTATION_ARTIFACT.md](COMPREHENSIVE_IMPLEMENTATION_ARTIFACT.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# OpenAusLMSK12 Comprehensive Implementation Artifact

## Decision
This artifact consolidates authoritative API and workflow starting points needed before implementation.

## 1) Identity and Security

- `POST /api/v1/identity/auth/login`
- `POST /api/v1/identity/auth/logout`
- `POST /api/v1/identity/auth/token/rotate`
- `POST /api/v1/identity/auth/revoke`
- `POST /api/v1/identity/mfa/challenge`
- `POST /api/v1/identity/mfa/verify`
- `GET  /api/v1/identity/permissions`
- `GET  /api/v1/identity/me`

## 2) Trust and Client Governance

- `GET  /api/v1/integrations/clients`
- `POST /api/v1/integrations/clients`
- `PATCH /api/v1/integrations/clients/{id}`
- `POST /api/v1/integrations/clients/{id}/rotate-secret`
- `POST /api/v1/integrations/clients/{id}/revoke`
- `GET  /api/v1/integrations/tokens`
- `POST /api/v1/integrations/tokens/{id}/revoke`

## 3) Core People and Household

- `GET  /api/v1/people`
- `POST /api/v1/people`
- `GET  /api/v1/people/{person_id}` / `PATCH /api/v1/people/{person_id}`
- `GET  /api/v1/households`
- `POST /api/v1/households`
- `POST /api/v1/households/{household_id}/members`
- `PATCH /api/v1/households/{household_id}/members/{person_id}`
- `POST /api/v1/households/{household_id}/consent`

## 4) Admissions and Rollovers

- `POST /api/v1/enrolments/applications`
- `GET  /api/v1/enrolments/applications/{id}`
- `POST /api/v1/enrolments/applications/{id}/transitions`
- `POST /api/v1/enrolments/applications/{id}/cancel`
- `POST /api/v1/enrolments/{enrolment_id}/transition`

## 5) Timetable, Attendance, and Duty of Care

- `GET /api/v1/timetable/slots`
- `POST /api/v1/timetable/slots`
- `PATCH /api/v1/timetable/slots/{id}`
- `POST /api/v1/timetable/slots/{id}/substitutions`
- `POST /api/v1/attendance/events`
- `POST /api/v1/attendance/rollup`
- `PATCH /api/v1/attendance/events/{id}`
- `POST /api/v1/staff-attendance/events`
- `POST /api/v1/visitors/check-in`

## 6) Learning and Assessment

- `GET /api/v1/learning/assignments`
- `POST /api/v1/learning/assignments`
- `POST /api/v1/learning/assignments/{id}/submissions`
- `GET /api/v1/learning/assignments/{id}/submissions`
- `PATCH /api/v1/learning/assignments/{id}`
- `GET /api/v1/assessment/markbook-entries`
- `POST /api/v1/assessment/markbook-entries`
- `PATCH /api/v1/assessment/markbook-entries/{id}`
- `POST /api/v1/assessment/markbook-entries/{id}/moderate`

## 7) Documents and Evidence

- `POST /api/v1/documents`
- `GET  /api/v1/documents/{id}`
- `POST /api/v1/documents/{id}/versions`
- `GET  /api/v1/documents/{id}/versions`
- `POST /api/v1/documents/{id}/versions/{version_id}/scan/complete`
- `POST /api/v1/documents/{id}/retention`

## 8) Wellbeing and Communications

- `POST /api/v1/wellbeing/support-cases`
- `GET /api/v1/wellbeing/support-cases/{id}`
- `PATCH /api/v1/wellbeing/support-cases/{id}`
- `POST /api/v1/wellbeing/plans`
- `POST /api/v1/messages`
- `POST /api/v1/messages/{id}/acknowledge`

## 9) Finance and HR

- `GET /api/v1/finance/invoices`
- `POST /api/v1/finance/invoices`
- `POST /api/v1/finance/payments`
- `GET /api/v1/finance/payments/{id}`
- `POST /api/v1/hr/staff`
- `POST /api/v1/hr/leave-requests`
- `POST /api/v1/hr/rosters/{id}/coverage`

## 10) Event and Workflow

- `GET /api/v1/events`
- `POST /api/v1/events`
- `POST /api/v1/events/{id}/consent`
- `POST /api/v1/workflows`
- `POST /api/v1/workflows/{id}/state`
- `GET /api/v1/audit/events`
- `GET /api/v1/integration/webhooks`

## Integration and Event Notes

- All mutation routes require idempotency key and correlation ID.
- All state transition routes emit state events and append immutable audit records.
- All sensitive write paths require tenant, consent, and field-level permission checks before mutation.

## Delivery Rule

- No implementation module begins until it is represented in:
  1) this artifact,
  2) `ERD_AND_DATA_MODEL.md`,
  3) `route_structure_and_component_contracts.md`,
  4) `domain_permissions_matrix.md`, and
  5) `api_contract_registry.md`.



