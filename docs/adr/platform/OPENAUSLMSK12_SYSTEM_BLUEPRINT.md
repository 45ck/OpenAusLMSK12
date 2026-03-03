---
adr-id: "ADR-064"
title: "Openauslmsk12 System Blueprint"
status: "accepted"
decision-date: "2026-03-02"
scope: "normalized engineering decision record"
source-artifact: "[OPENAUSLMSK12_SYSTEM_BLUEPRINT.md](OPENAUSLMSK12_SYSTEM_BLUEPRINT.md)"
status-gate: "planning corpus + ADR governance review"
domain: "platform"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-064: Openauslmsk12 System Blueprint

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [OPENAUSLMSK12_SYSTEM_BLUEPRINT.md](OPENAUSLMSK12_SYSTEM_BLUEPRINT.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# OpenAusLMSK12 System Blueprint

OpenAusLMSK12 combines SIS, LMS, operations, wellbeing, finance, workforce, and integrations into one modular monolith for phase 1, with architecture references in [ADR-009](../core/ADR-009-architecture-governance-baseline.md).

## Blueprint Principles

- One canonical identity and tenancy plane.
- One canonical people/household/enrolment model.
- One API surface (`/api/v1/...`) with versioned contracts.
- Immutable audit and immutable event provenance for regulated writes.
- Document-first attachment model for all sensitive evidence and communication payloads.
- Consent-aware and role-aware access across API and UI layers.

## Domain Families
1. Trust and Identity
2. People and Household
3. Admissions and Enrollment
4. Timetabling and Operations
5. Attendance and Duty of Care
6. Learning, Assessment, and Reporting
7. Wellbeing and Health
8. Communications
9. Finance and Services
10. Workforce and HR
11. Forms, Workflows, and Evidence
12. Integration Fabric and Events
13. AI Governance and Analytics

## Architecture Baseline

- Backend runtime: `.NET 8` modular monolith (until measurable thresholds justify isolation), per [ADR-001](../core/ADR-001-backend-runtime-choice.md) and [ADR-010](../core/ADR-010-platform-stack-baseline.md).
- Frontend runtime: TypeScript web shell with role/route scoped rendering, per [ADR-010](../core/ADR-010-platform-stack-baseline.md).
- Data: PostgreSQL + Redis + object storage with scan-retention workflows.
- Async: Outbox/inbox for webhook reliability and workflow compensations.






