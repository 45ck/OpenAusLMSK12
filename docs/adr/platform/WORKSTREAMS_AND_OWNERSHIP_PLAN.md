---
adr-id: "ADR-090"
title: "Workstreams And Ownership Plan"
status: "accepted"
decision-date: "2026-03-02"
scope: "normalized engineering decision record"
source-artifact: "[WORKSTREAMS_AND_OWNERSHIP_PLAN.md](WORKSTREAMS_AND_OWNERSHIP_PLAN.md)"
status-gate: "planning corpus + ADR governance review"
domain: "platform"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-090: Workstreams And Ownership Plan

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [WORKSTREAMS_AND_OWNERSHIP_PLAN.md](WORKSTREAMS_AND_OWNERSHIP_PLAN.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# Workstreams and Ownership Plan

## Purpose

Translate the full plan into coordinated, queueable workstreams with explicit owner lanes and quality gates.

## Team Topology

- Delivery Lead: owns sequencing, gate enforcement, and release readiness.
- Domain Lead (per family): owns model/schema/API for one domain family.
- Domain QA Lead: owns decision criteria, negative cases, and acceptance for each module.
- Platform/Infra Lead: owns CI, deployment, observability, and operational runbooks.
- Security/Compliance Lead: owns cross-cutting controls and legal requirements.

## Workstream Layout

### Workstream A – Trust and Identity
- Bundles: A
- Primary outcomes:
  - tenant isolation proven
  - RBAC + consent boundaries
  - security failure semantics
  - audit event contract
- Inputs: `bundle-1-foundation-trust-and-security-boundary.md`, `domain_permissions_matrix.md`, `tenant_isolation_proof.md`, `authn_authz_contracts.md`.
- Gate: **GATE_A_IDENTITY**

### Workstream B – People, Household, Admissions
- Bundles: B + C
- Primary outcomes:
  - people/household graph correctness
  - legal/custody transitions tested
  - enrolment lifecycle transitions
  - rollover and archival model
- Inputs: bundles 2 and 3, and `household_access_model.md`, `admissions_lifecycle_erd.md`.
- Gate: **GATE_B_FOUNDATION_DATA**

### Workstream C – Operations Core
- Bundles: D + E + O
- Primary outcomes:
  - timetable conflict determinism
  - attendance exception correctness
  - class/content baseline flows
  - core routes/UX contracts
- Inputs: bundle-4, bundle-5, bundle-15, `personas_and_route_matrix.md`, `route_structure_and_component_contracts.md`.
- Gate: **GATE_C_OPERATIONS**

### Workstream D – Welfare, Communications, HR
- Bundles: F + G + I
- Primary outcomes:
  - wellbeing visibility and redaction policy
  - communications delivery reliability
  - workforce roster and absence contracts
- Inputs: bundles 6, 7, 9, `wellbeing_privacy_and_redaction_model.md`, `message_audit_and_retention.md`, `leave_roster_conflict_rules.md`.
- Gate: **GATE_D_SAFETY**

### Workstream E – Finance, Workflow, Integration, AI
- Bundles: H + J + K + L
- Primary outcomes:
  - safe payment lifecycle
  - workflow compensation behavior
  - integration versioning and webhook reliability
  - AI governance and redaction pipeline
- Inputs: bundles 8–12 plus `api_contract_registry.md`, `webhook_reliability_contracts.md`.
- Gate: **GATE_E_ENTERPRISE**

### Workstream F – Resilience and Compliance
- Bundles: M + N
- Primary outcomes:
  - observability + rollback readiness
  - retention and legal-hold correctness
  - incident/breach drill confidence
- Inputs: bundles 13 and 14.
- Gate: **GATE_F_GOVERNANCE**

## Phase Milestones and Delivery Rhythm

### Milestone 1 (Weeks 1-3)
- Complete Workstream A and B
- Freeze core permissions and state machines
- Establish initial API shells for identity, people, enrolment

### Milestone 2 (Weeks 4-7)
- Complete Workstream C
- Validate front-end navigation and first critical journeys
- Publish first integration contract index

### Milestone 3 (Weeks 8-11)
- Complete Workstream D
- Add messaging and workforce operations to canary
- Begin enterprise API consumer tests

### Milestone 4 (Weeks 12-15)
- Complete Workstream E
- Payment and integration contract hardening
- AI governance policy enforcement in staging

### Milestone 5 (Weeks 16-18)
- Complete Workstream F
- Execute disaster, rollback, breach, and legal-hold rehearsal
- Hardening before launch gating

## Gate Definitions

### GATE_A_IDENTITY
- No unresolved cross-tenant access risk.
- Tenant context enforced on all mutable paths.
- authN/authZ tests include negative escalation and token misuse cases.

### GATE_B_FOUNDATION_DATA
- Enrolment state machine and household graph tests are green with edge cases.
- Duplicate person imports are deterministic with conflict policy.

### GATE_C_OPERATIONS
- Attendance/emergency/state changes produce deterministic results under conflict and retry.
- Route contracts map to route components and permissions.

### GATE_D_SAFETY
- Wellbeing and health access requires explicit policy checks; redaction proven in UI and API.
- Messaging failure behavior and retention tests are in place.

### GATE_E_ENTERPRISE
- Reconciliation and webhook reliability tests for duplicate callbacks and retry races.
- AI requests obey classification and telemetry policy.

### GATE_F_GOVERNANCE
- Compliance evidence pack complete for retention/legal-hold.
- Rollback and incident drill demonstrates business continuity and recoverability.

## Definition of Completion (per workstream)

- All bundle artifacts marked:
  - Decision, evidence, constraints, risks, acceptance, implementation impact
  - minimum 5 positive and 5 negative scenarios
  - route/API impact mapping
- Test suites are executable and connected to CI.
- No unresolved medium/high contradictions in design register.

## Coordination Cadence

- Daily: design blockers + risk updates.
- Weekly: gate review by all leads.
- Bi-weekly: evidence pack sync and contradiction reconciliation.
- End of each milestone: release decision by Delivery Lead with all gates signed.



