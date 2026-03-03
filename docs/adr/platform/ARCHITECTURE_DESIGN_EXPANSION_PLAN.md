---
adr-id: "ADR-020"
title: "Architecture Design Expansion Plan"
status: "accepted"
decision-date: "2026-03-02"
scope: "normalized engineering decision record"
source-artifact: "[ARCHITECTURE_DESIGN_EXPANSION_PLAN.md](ARCHITECTURE_DESIGN_EXPANSION_PLAN.md)"
status-gate: "planning corpus + ADR governance review"
domain: "platform"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-020: Architecture Design Expansion Plan

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [ARCHITECTURE_DESIGN_EXPANSION_PLAN.md](ARCHITECTURE_DESIGN_EXPANSION_PLAN.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# Architecture Design Expansion Plan

## Purpose

This document converts the already merged master plan and full engineering plan into explicit, implementation-grade design artifacts. It is intended to remove ambiguity before code starts.

## 1) System Architecture Topology

### 1.1 Deployment Topology

- Single modular monolith at first release, divided into cohesive bounded context modules.
- API edge as the only external ingress.
- Internal calls are module-owned services in-process with explicit transaction and event boundaries.
- Shared cross-cutting services:
  - Auth/session gateway
  - Permission + consent engine
  - Event outbox + idempotency service
  - Audit event writer
  - Attachment safety pipeline
  - Notification and webhook dispatcher

### 1.2 Runtime and Integration Contracts

- Runtime boundary:
  - Public API layer (versioned REST)
  - Domain modules (business invariants and state transitions)
  - Event producer/consumer adapters for async operations
- Storage:
  - OLTP store for source-of-truth entities
  - Audit store for immutable event records (append-only)
  - Object store for files + object metadata + scanning status
- Integration boundary:
  - Connector registry with deprecation policy
  - Signed webhooks with guaranteed delivery semantics
  - Explicit import/export adapters for SIS, LMS, communication, and payment systems

## 2) Domain Boundaries and Responsibilities

### 2.1 Core Identity & Trust
- Owns: tenant setup, accounts, SSO/OIDC connectors, API app registry, roles, scopes, sessions, MFA policy.
- Exposes: identity, authN/authZ, trust events.
- Depends on: consent + policy config.

### 2.2 People and Household
- Owns: person canonical records, household graph, custody settings, emergency contacts, consent capture.
- Exposes: persons, relationships, household membership, access constraints.
- Depends on: identity for actor context and trust labels.

### 2.3 Admissions and Lifecycle
- Owns: inquiry/application/offer/acceptance/transition states.
- Exposes: enrolment state machine transitions and evidence snapshots.
- Depends on: people, trust, year/configuration.

### 2.4 Timetabling and Operations
- Owns: timetable, resource allocations, substitutions, issue/operation queues.
- Exposes: conflict-aware schedules and availability snapshots.
- Depends on: people for staff/student assignment; admissions for cohort existence.

### 2.5 Attendance and Duty of Care
- Owns: student/staff attendance capture, exceptions, emergency attendance states, visitor presence.
- Exposes: attendance streams and event outcomes for reporting/escalation.
- Depends on: timetabling and identity/consent for scope.

### 2.6 Learning and Assessment
- Owns: class content scaffolding, assignments, submissions, marking, moderation, report assembly.
- Exposes: grading and feedback pipelines with visibility rules.
- Depends on: schedule, enrolment, people, wellbeing/incident constraints.

### 2.7 Wellbeing and Safety
- Owns: plans, incidents, health records, interventions, behaviour actions.
- Exposes: sealed records, redaction profiles, escalation events.
- Depends on: people, permissions, emergency and audit services.

### 2.8 Communications and Messaging
- Owns: notice publishing, messaging threads, notification retries, audit retention.
- Exposes: delivery events, failure/retry traces, message metadata.
- Depends on: audit and policy engines for redaction/logging.

### 2.9 Finance and Services
- Owns: invoices, charges, payments, reconciliation, wallet-like services.
- Exposes: ledger transition events and finance audit.
- Depends on: household/enrolment, integrations, audit.

### 2.10 HR and Workforce
- Owns: staff profile lifecycle, leave/rosters, absence coverage.
- Exposes: staffing availability and payroll touchpoints.
- Depends on: identity roles and timetable/attendance signals.

### 2.11 Forms, Workflows, and Compensation
- Owns: form schemas, workflow definitions, execution state, saga compensation.
- Exposes: workflow outcomes and generated artifacts for receiving domains.
- Depends on: all domains through explicit event subscriptions.

### 2.12 Integration Fabric and Events
- Owns: connector registry, inbound/outbound connectors, webhook and event contract management.
- Exposes: versioned integration contracts and registry APIs.
- Depends on: all domains for outbound event generation.

### 2.13 Analytics and Compliance
- Owns: derived projections, snapshot models, evidence packs.
- Exposes: dashboards and compliance exports.
- Depends on: immutable audit stream and domain events.

## 3) Data Integrity Design

- Primary keys: stable UUID-like ids per tenant context.
- Versioning:
  - `version`/`updated_at` on mutable rows
  - optimistic concurrency for high-write records
- State transitions:
  - explicit enums with terminal states in module-specific state tables
  - no implicit transitions without API validation
- Critical invariants:
  - unique active household membership constraints by role and tenure
  - enrolment references must resolve to valid person + school + year
  - attendance write requires resolved timetable or incident exception rule
  - finance writes require traceable billing context + idempotency key

## 4) API Design Constraints

- All mutation endpoints require:
  - authenticated actor
  - tenant context
  - idempotency key for retries
  - explicit status/error contract in response
  - audit event emission
- Read endpoints must include:
  - consent-filtered projection
  - visibility scope metadata (`field_redacted`, `reason`, `policy_id`)
- Error contract categories:
  - `AUTH_*`, `PERM_*`, `CONSENT_*`, `STATE_*`, `VALIDATION_*`, `INTEGRATION_*`
- Versioning:
  - additive changes default
  - breaking changes behind explicit deprecation windows

## 5) Cross-Cutting Safety Rules

- No module can read/write another module's tables directly.
- No role gets implicit inherited privilege; permissions are explicit.
- Sensitive fields are policy-annotated and rendered behind checks.
- Every high-risk mutation path requires a recoverable flow:
  - direct error -> safe state
  - partial writes -> compensation action
  - retry -> idempotent dedupe key
- Parent/guardian revocation is processed as:
  - immediate access lock in query layer
  - asynchronous cache invalidation bounded by 2 minutes
  - audit trail entry with remediation hint

## 6) UX/Frontend Architecture Rules

- Persona shell first:
  - single route root per tenant
  - module route mapping from role/consent scope
- Component contracts:
  - each route has explicit prop contract (`data`, `loading`, `errors`, `consentState`, `canMutate`)
- Critical flows:
  - first class routes: enrolment, attendance close, assignment grading publish, payment reconcile, incident creation/escalation
- Offline:
  - attendance, incident notes, form drafts should allow draft caching
  - sync conflict state with explicit user-facing resolver

## 7) SRE and Release Controls

- Required controls per change window:
  - migration dry run
  - domain event replay validation
  - backward compatibility tests for OpenAPI and public web contracts
  - chaos test for consent revocation and webhook failures
- Deployment policy:
  - canary for API, staged rollout for UI modules
  - rollback via migration checkpoint + release tag
- Incident posture:
  - runbooks map each critical state machine to expected compensations and owner

## 8) Immediate Design Hardening Checklist

- [ ] Lock tenant/year/school cascade rules across all entities.
- [ ] Finalize consent ontology and policy precedence rules.
- [ ] Publish explicit cross-domain event names for each workflow transition.
- [ ] Define per-domain immutable fields and immutable event requirements.
- [ ] Define attachment scanning and quarantining contract.
- [ ] Define finance reconciliation duplicate callback handling.
- [ ] Define webhook event retention and dead-letter rehydration policy.
- [ ] Freeze `domain_permissions_matrix.md` and `domain_state_machines.md`.
- [ ] Complete route component contract for 12 critical journeys.

## 9) Output and Owners

- Architecture: `OPENAUSLMSK12_MASTER_PLAN.md` + this document
- Security/compliance: `compliance_control_registry.md`, `security_failure_state_matrix.md`
- Database: `domain_state_machines.md` + migration artifacts
- Frontend: `route_structure_and_component_contracts.md`



