---
adr-id: "ADR-113"
title: "Data Migration and Import Control"
status: "accepted"
decision-date: "2026-03-03"
scope: "canonical data model implementation and onboarding cohorts"
source-artifact: "[ERD_AND_DATA_MODEL.md](ERD_AND_DATA_MODEL.md), [DB_IMPLEMENTATION_CHECKLIST.md](DB_IMPLEMENTATION_CHECKLIST.md), [COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md](../../COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md)"
status-gate: "security + trust + data ownership review"
domain: "platform"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-113: Data Migration and Import Control

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-03
- **scope**: canonical data model implementation and onboarding cohorts
- **source-artifact**: [ERD_AND_DATA_MODEL.md](ERD_AND_DATA_MODEL.md), [DB_IMPLEMENTATION_CHECKLIST.md](DB_IMPLEMENTATION_CHECKLIST.md), [COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md](../../COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md)
- **status-gate**: security + trust + data ownership review

## Context
Onboarding a school tenant requires historical data import and day-of-first-use correctness. Existing ADRs define model shape but not a strict migration control flow for messy legacy imports.

## Decision
All tenant onboarding and environment seed operations use a **four-phase data control flow**:

1) **Land**: ingest to staging tables with strict source metadata and checksum.
2) **Validate**: run deterministic transforms and conflict checks:
   - tenant and external id mapping
   - duplicate person/household heuristics
   - enrolment-date/attendance timeline validation
   - consent/custody graph consistency
3) **Map**: apply mapping rules to canonical IDs and write immutable mapping tables.
4) **Commit**: promote into canonical tables only through migration jobs with audit events and rollback handles.

Additional controls:
- Canonical IDs are tenant-scoped ULIDs for core entities (`person`, `student`, `staff`, `household`, `enrolment`, `class_group`, `attendance_event`).
- Enrollment and relationship history is appended, not overwritten.
- All dedupe or override decisions are recorded as migration correction events with an immutable reason code.
- No direct admin edits to canonical tables during commit phase except through migration scripts and approval-gated commands.
- Migration pipelines must support dry-run, dry-commit, and full rollback for each batch.

## Consequences
- Import behavior remains deterministic and reviewable for audit and legal hold cases.
- Tenant onboarding can be repeated in staging until validation is clean.
- Production incidents caused by bad imports become reversible with known state markers and checkpoints.

## Acceptance Criteria
- Migration dry-run produces zero unresolved critical errors before commit.
- A reproducible rollback path exists for each migration batch.
- Every migration batch emits mapping, validation, and correction events in audit logs.
- First external tenant can be onboarded with no hand-edited canonical inserts.

