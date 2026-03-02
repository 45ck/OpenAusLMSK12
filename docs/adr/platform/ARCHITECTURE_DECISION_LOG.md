# ADR-019: Architecture Decision Log

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [ARCHITECTURE_DECISION_LOG.md](ARCHITECTURE_DECISION_LOG.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# Architecture Decision Log (ADR Index)

## Rule

Normative architecture/design decisions are now captured in the ADR catalog under `docs/adr/core/`.
This file points to the active ADR set and remains here only for navigation.

## Active ADR Set

- [ADR-001 Backend Runtime Choice](../core/ADR-001-backend-runtime-choice.md)
- [ADR-002 Admissions State Machine](../core/ADR-002-admissions-state-machine.md)
- [ADR-003 Document Lifecycle](../core/ADR-003-document-lifecycle.md)
- [ADR-004 API Client Governance](../core/ADR-004-api-client-governance.md)
- [ADR-005 Tenant Isolation](../core/ADR-005-tenant-isolation.md)
- [ADR-006 Field-Level Permissions](../core/ADR-006-field-level-permissions.md)
- [ADR-007 Route Contract Completion](../core/ADR-007-route-contract-completion.md)
- [ADR-008 Documentation Artifact Materialization](../core/ADR-008-artifact-materialization.md)
- [ADR-009 Architecture Governance Baseline](../core/ADR-009-architecture-governance-baseline.md)
- [ADR-010 Platform Stack Baseline](../core/ADR-010-platform-stack-baseline.md)

## Historical Mapping

| Topic | ADR |
| --- | --- |
| Modular monolith, API-first contracts, outbox/inbox, audit, consent-aware access, no MVP scope deferral, AI governance, sensitivity model | ADR-009 |
| Runtime (Rust/.NET) choice | ADR-001 |
| API client and OAuth lifecycle governance | ADR-004 |
| Tenant isolation proof | ADR-005 |
| Field-level permissions and route behavior | ADR-006, ADR-007 |
| Field masking and redaction policy | ADR-109 |
| Documentation completion requirements | ADR-008 |
| Stack baseline (frontend/backend/data/event queue/optional Rust) | ADR-010 |
| Deployment and decomposition governance | ADR-107 |
| API surface strategy / GraphQL scope | ADR-108 |






