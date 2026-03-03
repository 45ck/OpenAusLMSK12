# OpenAusLMSK12 Implementation Ticket Pack (Planning Mode)

This document is planning-only and contains no implementation changes.  
Use it to create issue tickets only after:

- ADR-112 (RG-0) is explicitly PASSed.
- Wave-1 ADR dependencies are accepted.
- Gate packets and evidence artifacts are prepared.
- For each ticket, ADR-119 (journey/prototype gating) and ADR-118 (contradiction closure) are satisfied for the target flow.

## Ticket Standard (from ADR-114)

Each ticket must include:

- Identity: ADR refs, workstream, owner.
- Scope: API routes, entities, UI routes.
- Contracts: contract changes and permission/consent rules.
- Journey requirements: one positive and one exception path.
- Technical constraints: dependencies, idempotency, events, rollback.
- Quality gates: at least one target test layer (unit/integration/journey/security).
- Evidence: which runbook/evidence pack it contributes to.

## Blocking Rule

No ticket may start if its upstream mandatory artifacts are missing.
All tickets here are in **ready state** only for planning and can be converted into issues.

---

## Wave 1: Trust, People, Enrolment (Weeks 1–2)

### OAS-001 Trust Identity API Shell
- **ADR(s)**: ADR-112, ADR-106, ADR-108, ADR-010, ADR-109
- **Workstream**: A (Trust & Identity)
- **Owner**: Domain Lead: Trust
- **Scope**:
  - Backend APIs: `/api/v1/auth/*`, `/api/v1/tenant/*`, `/api/v1/permissions/*`
  - Data: `tenant`, `school`, `user_account`
  - UI: tenant shell and auth session state model
- **Decision Contract**:
  - Enforce tenant binding in all session/token contexts.
  - MFA and session policy checks required for admin/staff high-risk actions.
- **Journey**:
  - Positive: Admin performs first tenant setup and role verification.
  - Exception: Token malformed / tenant mismatch / policy violation.
- **Dependencies**: None (Wave 1 baseline).
- **Quality Targets**:
  - Unit: auth policy helpers and tenant lookup.
  - Integration: tenant bleed tests for protected queries.
  - Security: session misuse and escalation tests.
- **Rollback/Events**:
  - Event audit for auth lifecycle.
  - Correlation IDs on auth/tenant mutations.
- **Evidence**:
  - ADR-112 readiness packet
  - `evidence_matrix_and_gate_checklist.md`

### OAS-002 Tenant Isolation Enforced Data Access
- **ADR(s)**: ADR-005, ADR-006, ADR-109, ADR-112, ADR-108
- **Workstream**: A
- **Owner**: Platform/Data Security Lead
- **Scope**:
  - Data: tenant scoping middleware + repository guard patterns
  - Query layer: all read/write operations in identity and people modules
- **Decision Contract**:
  - Tenant context enforced at API and repository boundaries.
  - Negative-path tests must prove no cross-tenant reads/writes.
- **Journey**:
  - Positive: Admin can only see authorized school/tenant records.
  - Exception: staff attempts cross-tenant admin action denied and logged.
- **Dependencies**: OAS-001
- **Quality Targets**:
  - Contract tests for tenant-bound endpoints.
  - Security tests for tenant bleed and token misuse.
- **Evidence**:
  - Gate A evidence
  - tenant isolation proofs and logs

### OAS-003 Household and Custody Model Baseline
- **ADR(s)**: ADR-112, ADR-106, ADR-030, ADR-024, ADR-050, ADR-082, ADR-113
- **Workstream**: B (People/Household)
- **Owner**: People/Household Domain Lead
- **Scope**:
  - Data: `household`, `person_household`, `custody_rule`, `student`, `carer`
  - APIs: consent and household relation read endpoints
  - UI: household linking route + relationship review
- **Decision Contract**:
  - Read authorization uses household graph + custody state + consent scope.
  - Restricted carers never expose disallowed child records.
- **Journey**:
  - Positive: Admin creates household links and sets custody roles.
  - Exception: conflicting custody scopes blocked with clear reason + audit event.
- **Dependencies**: OAS-001, OAS-002
- **Quality Targets**:
  - Unit: graph constraints.
  - Integration: household transition + multiple-carer scenarios.
  - Journey: consent and access matrix route.
- **Rollback/Events**:
  - All relation mutations immutable and append-only.
- **Evidence**:
  - `household_access_model.md`
  - `consent_and_household_access_matrix.md`

### OAS-004 Admission State Machine Delivery
- **ADR(s)**: ADR-002, ADR-038, ADR-112, ADR-106, ADR-013
- **Workstream**: B
- **Owner**: People/Admissions Domain Lead
- **Scope**:
  - Data: `admissions_application`, `enrolment`, `person` transition state
  - APIs: enquiry/application/offer/accept transitions
  - Events: lifecycle transition logs
- **Decision Contract**:
  - Immutable state transition rules; terminal states require evidence.
  - Year transition states cannot skip required evidence steps.
- **Journey**:
  - Positive: Inquiry -> application -> offer -> acceptance.
  - Exception: revoked consent during admissions flow triggers rollback-safe hold.
- **Dependencies**: OAS-003
- **Quality Targets**:
  - Integration: transition contract and state validation.
  - Negative tests: invalid state jumps.
  - Audit coverage for each transition.
- **Evidence**:
  - `admissions_lifecycle_erd.md`
  - `enrolment_lifecycle_state_machine.md`

### OAS-005 Consent Service Baseline
- **ADR(s)**: ADR-024, ADR-030, ADR-044, ADR-066, ADR-112, ADR-117
- **Workstream**: A/B (Trust + People)
- **Owner**: Trust Domain Lead
- **Scope**:
  - Data: `consent`, effective policy snapshot
  - API: consent capture/revoke endpoints + scope evaluation utility
  - UI: consent prompt, status display, propagation state
- **Decision Contract**:
  - Consent revoke applies before next mutation and affects read visibility in <= 2 minutes.
  - Family-scoped exceptions require explicit audit trace.
- **Journey**:
  - Positive: Parent updates consent scope and sees effect in dashboard.
  - Exception: late revocation during workflow pauses operation and surfaces conflict state.
- **Dependencies**: OAS-003
- **Quality Targets**:
  - Unit: scope evaluator.
  - Integration: read/write enforcement for consent states.
  - Security: unauthorized field disclosure tests.
- **Evidence**:
  - `consent_and_household_access_matrix.md`
  - `wellbeing_privacy_and_redaction_model.md`

### Wave 1 Exit Gate Evidence
- ADR-112 RG-0 pass checklist complete.
- ADR-113 dry-run migration strategy approved and documented.
- ADR-114 ticket template completion on all five tickets.
- ADR-115 journey/exception notes added per ticket.
- ADR-116 wave packet draft attached to gate review.

---

## Wave 2: Core Operations & Safety Readiness (Weeks 3–6)

### OAS-006 Timetable and Substitution Fabric
- **ADR(s)**: ADR-032, ADR-065, ADR-080, ADR-072, ADR-109, ADR-117
- **Workstream**: C (Operations Core)
- **Owner**: Operations Domain Lead
- **Scope**:
  - Data: `class_group`, `program`, `room`, `period`, `timetable_slot`, `substitution`
  - API: scheduling conflict check and substitution API set
  - UI: timetable admin and teacher views
- **Decision Contract**:
  - Conflict resolution is deterministic with explicit priority ordering.
- **Journey**:
  - Positive: Teacher publishes schedule and handles substitution.
  - Exception: double-booked room/substitute conflict resolves to explicit conflict state.
- **Dependencies**: Wave 1 completion.
- **Quality Targets**:
  - Integration: conflict matrix and overlap prevention.
  - Journey: core operations exception path.

### OAS-007 Attendance Duty-of-Care Baseline
- **ADR(s)**: ADR-055, ADR-056, ADR-023, ADR-083, ADR-112, ADR-115
- **Workstream**: C
- **Owner**: Attendance/Duty-of-Care Lead
- **Scope**:
  - Data: `attendance_event`, `staff_attendance_event`, exceptions
  - API: roll capture and reconciliation endpoints
  - UI: roll dashboard and exception flow
- **Decision Contract**:
  - Attendance day-close is replay-safe and idempotent.
- **Journey**:
  - Positive: Class attendance complete and closed.
  - Exception: kiosk and parent communication mismatch triggers correction workflow.
- **Dependencies**: OAS-006, OAS-005
- **Quality Targets**:
  - Integration: idempotency and correction replay.
  - Security: no sensitive student read without consent.

### OAS-008 Incident and Visitor Baseline
- **ADR(s)**: ADR-040, ADR-041, ADR-079, ADR-056, ADR-112
- **Workstream**: C
- **Owner**: Safety Operations Lead
- **Scope**:
  - Data: incident records + visitor check-in/evacuation state
  - API: incident + visitor routes + consent-aware reporting
  - UI: incident and evacuation views
- **Decision Contract**:
  - Incident and visitor states are part of the same presence timeline with separate legal contexts.
- **Journey**:
  - Positive: Incident logged and escalated correctly.
- Exception: evacuation event closes with incomplete student check-in; recovery path required.
- **Dependencies**: OAS-007
- **Quality Targets**:
  - Integration: presence timeline join integrity.
  - Contract: payload shape for visitor + evacuation event.

### OAS-009 Communication Routing Baseline
- **ADR(s)**: ADR-025, ADR-059, ADR-061, ADR-068, ADR-084
- **Workstream**: C/D
- **Owner**: Communications Lead
- **Scope**:
  - Data: notices and messages metadata
  - API: template and queue delivery endpoints
  - UI: notice inbox + message trail
- **Decision Contract**:
  - Route-level messaging policy uses consent + role enforcement before send.
- **Journey**:
  - Positive: Parent receives attendance exception notice.
  - Exception: blocked recipient due to scope restrictions with audit log.
- **Dependencies**: OAS-005
- **Quality Targets**:
  - Journey tests for delivery and retry.
  - Contract for delivery status and retention.

### OAS-010 Route and Journey Prototype Set A
- **ADR(s)**: ADR-091, ADR-092, ADR-093, ADR-094, ADR-095, ADR-115, ADR-076
- **Workstream**: C
- **Owner**: UX/Frontend Lead + Domain Leads
- **Scope**:
  - Route map for Admin/Teacher/Parent/Student for waves 1-2.
  - Low-fidelity flow artefacts and exception routes.
- **Decision Contract**:
- Each route has `idle/loading/ready/error/conflict` states and explicit denials.
- **Journey**:
  - Positive: Login to attendance view and student roll flow.
  - Exception: consent revocation occurs mid-route and surfaces locked/conflict state.
- **Dependencies**: OAS-006, OAS-007, OAS-009
- **Quality Targets**:
  - UX acceptance on route-state behavior.
  - Accessibility checks for attendance and alert routes.

### OAS-011 Consent-Aware Read Path Hardening
- **ADR(s)**: ADR-006, ADR-109, ADR-117, ADR-112, ADR-113
- **Workstream**: C/A
- **Owner**: Security/Trust + Data Access Lead
- **Scope**:
  - API read layer for attendance, wellbeing, communications, and enrolment surfaces.
  - Consent propagation cache invalidation and policy check timing.
- **Decision Contract**:
  - Read queries must apply masking or redaction based on consent and custody state.
- **Journey**:
  - Positive: Parent sees only authorized records.
  - Exception: revocation during active session switches to locked/conflict state.
- **Dependencies**: OAS-005
- **Quality Targets**:
  - Integration: field-level redaction tests.
  - Security: sensitive data leakage checks.

### Wave 2 Exit Gate Evidence
- Route coverage for operations journeys complete with exception maps.
- Tenant isolation regression suite includes operations contexts.
- Communication delivery policy, attendance replay safety, and consent propagation proofs captured.

---

## Wave 3: Learning and Academic Core (Weeks 7–10)

### OAS-012 Course and Class Context Integrity
- **ADR(s)**: ADR-021, ADR-057, ADR-076, ADR-111
- **Workstream**: D
- **Owner**: Learning Domain Lead
- **Scope**:
  - Data: `course_term`, `lesson`, `assignment`, class context links
  - API: class/course metadata and assignment assignment
- **Decision Contract**:
  - Learning objects map to canonical class and timetable context.
- **Journey**:
  - Positive: Teacher assigns work from class context.
  - Exception: stale class context blocks publish with actionable state.

### OAS-013 Assignment Lifecycle and Media Attachments
- **ADR(s)**: ADR-022, ADR-023, ADR-046, ADR-071
- **Workstream**: D
- **Owner**: Learning/Assessment Lead
- **Scope**:
  - Data: `assignment`, `assignment_submission`
  - API: draft save, submit, reopen, correction workflow
  - UI: submission and grade feedback screens
- **Decision Contract**:
  - Save/retry paths are idempotent and audit-safe.
- **Journey**:
  - Positive: Student submits assignment and teacher reviews.
  - Exception: late submission path with policy-coded late handling.

### OAS-014 Markbook and Moderation Baseline
- **ADR(s)**: ADR-060, ADR-048, ADR-021, ADR-069
- **Workstream**: D
- **Owner**: Assessment Lead
- **Scope**:
  - Data: `markbook_entry`, outcome rubric metadata
  - API: publish/review/reopen grade endpoints
- **Decision Contract**:
  - Moderation preserves original grade state and creates full correction chain.
- **Journey**:
  - Positive: Teacher marks and publishes result with visibility.
  - Exception: moderation rollback and rework route.

### OAS-015 Reporting and Analytics Data Lineage
- **ADR(s)**: ADR-071, ADR-028, ADR-069
- **Workstream**: D/F
- **Owner**: Analytics + Compliance Lead
- **Scope**:
  - Data: report templates and audit linkage
- **Decision Contract**:
  - Reports preserve source-state and evidence IDs.
- **Journey**:
  - Positive: Teacher publishes progress report.
  - Exception: grade visibility policy blocks report for unauthorized role.

### Wave 3 Exit Gate Evidence
- Learning journeys with positive+negative scenarios executed.
- Parent and staff visibility controls validated.
- Markbook moderation and correction audit chain demonstrated.

---

## Wave 4: Community, Workflow, and Enterprise Services (Weeks 11–14)

### OAS-016 Form Schema Registry and Versioning
- **ADR(s)**: ADR-101, ADR-046, ADR-117, ADR-114
- **Workstream**: E (Finance/Workflow)
- **Owner**: Forms Lead
- **Scope**:
  - Data: form schema registry and version map
  - API: forms create/update/publish, render templates
- **Decision Contract**:
  - Published forms are immutable; edits create new versions.
- **Journey**:
  - Positive: Form issued and captured.
  - Exception: template schema mismatch yields safe migration error.

### OAS-017 Workflow Engine and Escalation
- **ADR(s)**: ADR-101, ADR-088, ADR-077, ADR-111
- **Workstream**: E
- **Owner**: Workflow Lead
- **Scope**:
  - Data: `workflow_definition`, `workflow_execution`
  - API: trigger/approve/reject/escalation endpoints
- **Decision Contract**:
  - Every workflow transition writes event + audit trail + SLA clock.
- **Journey**:
  - Positive: Workflow passes through approved path.
  - Exception: SLA timeout escalates per policy.

### OAS-018 HR and Roster Lifecycle
- **ADR(s)**: ADR-089, ADR-058, ADR-072, ADR-080
- **Workstream**: E
- **Owner**: HR/Workforce Lead
- **Scope**:
  - Data: role/leave/staff assignment lifecycle
  - API: roster and leave states
- **Decision Contract**:
  - Roster state and attendance dependencies remain consistent.
- **Journey**:
  - Positive: Substitution approved and reflected in roster.
  - Exception: overlapping leave and substitution conflict.

### OAS-019 Finance and Payment Core
- **ADR(s)**: ADR-044, ADR-045, ADR-066, ADR-067, ADR-046
- **Workstream**: E
- **Owner**: Finance Lead
- **Scope**:
  - Data: `invoice`, `payment`, `fee_structure`
  - API: billing, callback, reversal endpoints
- **Decision Contract**:
  - Payment callbacks are idempotent and event-ordered.
- **Journey**:
  - Positive: Invoice issued, payment received, statement updated.
  - Exception: duplicate callback and reconciliation race.

### OAS-020 Events and Excursions Lifecycle
- **ADR(s)**: ADR-040, ADR-041, ADR-098, ADR-083
- **Workstream**: E/C
- **Owner**: Operations/Event Lead
- **Scope**:
  - Data: event/staff allocation and attendance links.
  - API: event planning, consent capture, attendance workflows.
- **Decision Contract**:
  - Event consent is per-student and can be revoked before attendance lock.
- **Journey**:
  - Positive: Event created and participant attendance confirmed.
  - Exception: consent revoked during event setup.

### OAS-021 Integration and Webhook Fabric
- **ADR(s)**: ADR-108, ADR-110, ADR-111, ADR-017, ADR-086
- **Workstream**: E
- **Owner**: Platform Integrations Lead
- **Scope**:
  - API/webhook versioned registries and connector lifecycle
  - DLQ and retry governance
- **Decision Contract**:
  - Connector contracts carry explicit compatibility and deprecation policy.
- **Journey**:
  - Positive: Integration event delivered and acknowledged.
  - Exception: duplicate callback with idempotent dedupe.

### Wave 4 Exit Gate Evidence
- All enterprise workflows have positive and exception journeys.
- Reconciliation and webhook reliability checks pass at least once per event type.
- Integration contracts and deprecation policy are versioned.

---

## Wave 5: Intelligence and Insights (Weeks 15–18)

### OAS-022 Analytics Projection and Snapshot Pipeline
- **ADR(s)**: ADR-104, ADR-063, ADR-079, ADR-069
- **Workstream**: M/F
- **Owner**: Analytics Lead
- **Scope**:
  - Data projections and snapshot exports.
- **Decision Contract**:
  - Operational analytics must not degrade OLTP latency and must remain tenant filtered.
- **Journey**:
  - Positive: Principal dashboard renders leadership and risk insights.
  - Exception: projection lag triggers stale-data warning and backfill.

### OAS-023 AI Governance and Runtime Controls
- **ADR(s)**: ADR-013, ADR-014, ADR-015, ADR-117
- **Workstream**: E/M
- **Owner**: AI Governance Lead
- **Scope**:
  - Policy registry, provider allowlist, redaction pipeline
- **Decision Contract**:
  - AI remains tenant-configured opt-in and fully auditable.
- **Journey**:
  - Positive: AI feature enabled for allowed tenant/module.
  - Exception: unsafe output path blocked by moderation policy.

### OAS-024 Evidence Pack and Release Readiness
- **ADR(s)**: ADR-062, ADR-112, ADR-116, ADR-052, ADR-053
- **Workstream**: F
- **Owner**: Release/Compliance Lead
- **Scope**:
  - Release packets, breach drill evidence, rollback package.
- **Decision Contract**:
  - Release requires complete wave packet evidence for each critical gate.
- **Journey**:
  - Positive: Wave handoff and rollback drill executed.
  - Exception: unresolved high-risk finding blocks release by protocol.

### Wave 5 Exit Gate Evidence
- Observability and error budget checks complete.
- Governance evidence and legal-hold workflow fully replayed.
- RG-0 + waves readiness gates satisfied for controlled launch.

---

## Cross-Wave Supporting Stories (non-sequenced)

- **OAS-025 Contract and Quality Evidence Automation**  
  - Link every ticket to tests and ADR references.
- **OAS-026 OpenAPI Baseline and Compatibility Management**  
  - Publish OpenAPI snapshots and compatibility notes per release.
- **OAS-027 Data Migration and Incident Rollback Drills**  
  - Validate rollback for migration and consent-state conflict paths.

---

## How to Turn into Issues

For each ticket above:
1. Use template from [ADR-114](adr/platform/ADR-114-backlog-and-ticket-execution-standard.md).
2. Attach required fields:
   - ADR links, Owner, dependencies, routes, API changes, negative tests.
3. Add a manual acceptance checkbox tied to:
   - `[ ] ADR-112` evidence gate
   - `[ ] ADR-113` migration/modeled controls
   - `[ ] ADR-115` journey exception lock
   - `[ ] ADR-116` gate packet readiness
4. Add this pack to a milestone and stop any code ticket from starting if `ADR-112` is still pending.
