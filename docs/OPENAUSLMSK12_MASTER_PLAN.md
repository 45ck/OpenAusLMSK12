# OpenAusLMSK12 Master Implementation Plan (Single Source of Truth)

This document is the single active implementation plan for the repository.
Use this file first for execution decisions, architecture, APIs, data model, delivery gates, and QA/compliance.
Research exists separately under `docs/inital-research/` and is referenced in the appendix.

## Table of Contents
- [Unified Plan Body](#unified-plan-body)
- [Research Discovery](#comprehensive-plan-research-discovery)
- [Research References](#research-references)

## Unified Plan Body

### Merged Document: OPENAUSLMSK12_SYSTEM_BLUEPRINT.md

# OpenAusLMSK12 System Blueprint

## Purpose
OpenAusLMSK12 is the single open architecture blueprint for a unified AU K-12 school platform covering SIS, LMS, operations, welfare, attendance, events, communication, finance, HR, and integrations.

## Operating Model
- Primary product: one platform for all school actors (student, parent/carer, staff, admin, principal).
- Design goal: reduce fragmented vendor ecosystems by consolidating core workflows into modular capabilities.
- Delivery style: modular architecture with a strict core domain model and API-first integration layer.

## Core Platform Modules
1. Identity, Security, and Trust
2. Core People/Household Domain
3. Enrolment Lifecycle
4. Timetabling and Campus Operations
5. Attendance and Duty of Care
6. Wellbeing, Behaviour, and Health
7. Learning Delivery (classes, content, assignments)
8. Assessment and Reporting
9. Communications and Notifications
10. Forms and Workflow Automation
11. Finance and Services
12. HR and Workforce
13. Events and Excursions
14. Analytics and Dashboards
15. Integration Fabric and Open APIs
16. AI and Governance Controls

## System Principles
- Identity-first: every action is attributable.
- Least-privilege by default: strict RBAC and scoped permissions.
- School-safe defaults: sensible privacy and guardian boundaries.
- Evidence-first: every sensitive action has audit evidence.
- Data-first APIs: all modules exchange through typed domain events and contracts.
- AU-first compliance posture: ST4S, ACARA, privacy, retention and safeguarding expectations.

## Data Backbone (single source of truth)
The full canonical domain is represented in these grouped models:
- People and relationships
- Institutional context
- Enrollment and academic structures
- Operational records (attendance, scheduling, incidents)
- Learning and assessment records
- Finance and billing records
- Communications and workflow records
- Compliance events and audit trail

All business modules read/write from the same authoritative model while owning their bounded domains.

## Cross-Module Dependencies
- Attendance needs student/teacher context from core person and schedule modules.
- Assessments and marking depend on timetable, class, and curriculum references.
- Parent visibility depends on household boundaries and consent state.
- Wellbeing actions depend on permissions and student profile markers.
- Finance actions can reference student enrolments and family relationships.
- Analytics consumes all modules through event streams with tenant-level filtering.

## Inbound/Outbound Integration Surface
- Inbound: SIS imports, identity providers, payment rails, communication providers, email/SMS/push.
- Outbound: webhook events, reporting exports, audit extracts, ERP/finance connectors, HR exports, BI feeds.

## Delivery Milestones (full-platform release sequence)
1. Foundation (security + core people + enrolment + basic authentication).
2. Core operations (attendance, timetable, class spaces, messaging).
3. Core academics (assignments, submissions, grading).
4. Wellbeing and compliance baseline.
5. Financial and forms/workflow module.
6. Advanced analytics, integrations, and governance automation.

## How to Read This Blueprint
- Use `ERD_AND_DATA_MODEL.md` first for domain contracts.
- Use `ADR-091 User Journey Execution Governance` and `ADR-085 Web Journey Map And Navigation Matrix` for persona behavior and UX priorities.
- Use `IMPLEMENTATION_ROADMAP.md` for sequencing and acceptance.

## Immediate First Tasks for this Project
1. Approve domain model and governance matrix.
2. Lock RBAC and consent model.
3. Define tenant and relationship boundaries.
4. Implement identity + people + enrolment core.
5. Define API contracts for student, timetable, attendance, class, assignment, grade.
6. Run the first controlled tenant cohort (one internal test school, then one external school), with all required compliance and audit gates enabled.

- `TECH_STACK_DECISION.md` (merged into this plan below)

---

### Merged Document: FULL_SOFTWARE_ENGINEERING_PLAN.md

# OpenAusLMSK12 Full Engineering Plan

## 1) Plan Objective
Create a production-grade AU K-12 school platform by converting research into implementation across all software engineering domains: architecture, data, backend, frontend, security/privacy, integration, observability, QA, and release operations.

The following plan combines all domain experts and current repository design docs:
- `AGENT_REVIEW_SUMMARY.md` (merged into this plan)
- `DB_IMPLEMENTATION_CHECKLIST.md` (merged into this plan)
- `ERD_AND_DATA_MODEL.md` (merged into this plan)
- `IMPLEMENTATION_ROADMAP.md` (merged into this plan)
- `COMPREHENSIVE_IMPLEMENTATION_ARTIFACT.md` (merged into this plan)
- `OPENAUSLMSK12_SYSTEM_BLUEPRINT.md` (merged into this plan)
- `USER_JOURNEY_EXECUTION_GOVERNANCE.md` (merged into this plan)
- `LOW_FIDELITY_PROTOTYPING_STANDARD.md` (merged into this plan)
- `DIGITAL_MODELING_STANDARD.md` (merged into this plan)
- `ADMISSIONS_ENROLMENT_EXECUTION_PACKAGE.md` (merged into this plan)
- `ATTENDANCE_DUTY_OF_CARE_EXECUTION_PACKAGE.md` (merged into this plan)
- `LEARNING_AND_ASSESSMENT_EXECUTION_PACKAGE.md` (merged into this plan)
- `FINANCE_AND_SERVICES_EXECUTION_PACKAGE.md` (merged into this plan)
- `OPERATIONS_EVENTS_EXECUTION_PACKAGE.md` (merged into this plan)
- `WELLBEING_AND_GUARDIANSHIP_EXECUTION_PACKAGE.md` (merged into this plan)

## 2) Team-of-Experts Working Set
1. Architecture and platform boundaries
2. Backend + data/model migration
3. Frontend + UX implementation
4. Security, privacy, and compliance
5. DevOps + SRE (delivery and operations)
6. QA and testing

## 3) Unified Architecture Decisions

- Adopt modular monolith first, extracting services only when justified.
- Use API-first contracts (`/api/v1/...`) with immutable domain events + outbox.
- Enforce tenant boundary at every layer.
- Canonical data model is the source of truth for people/enrolment/timetable/attendance/assessment/finance.
- Everything user-facing is state-machine based (admissions, attendance, workflows, finance, learning, wellbeing).

### Bounded Contexts
- Identity & Trust
- People & Household
- Enrolment & Institutional Structure
- Timetabling & Operations
- Attendance & Duty of Care
- Learning & Content
- Assessment & Reporting
- Wellbeing & Health
- Finance
- HR & Workforce
- Communication & Workflow
- Integration Fabric
- Analytics
- AI Governance (optional)

## 4) Delivery Philosophy
- Governance-first: security, RBAC, audit, consent, and residency before feature breadth.
- Model-first: lock ERD and contracts before integrations.
- Workflow-first: every process with approvals and visibility first-class.
- Evidence-first: every sensitive action has audit and traceability.
- Domain-by-domain rollout from day 1: all domains are in scope immediately; sequencing is constrained by data and safety dependencies, not by deferred feature deferral.

## 4.1) Terminology and Plan Alignment
- Canonical spelling and usage:
  - `enrolment` is the system’s standard spelling (used across all plans and schemas).
  - `year` is the school year context (e.g., 2026 semester/year band); `year_level` is the learning level/grade (e.g., Year 7).
  - `workflow` refers to any stateful process requiring approval or escalation (forms, incidents, events, finance tasks).
  - `journey` is a measurable persona path from a real screen through API to DB state.
- Source-of-truth gate reference:
- This document uses the milestone gate matrix in the "Implementation Roadmap" section below as the single set of go/no-go gates.

## 5) End-to-End Domain Plan

### 5.1 Product and Requirements
- Confirm baseline feature scope from research + blueprint and split into 4 major cohorts:
  - Core School Operations (identity, people, enrolment, attendance, timetable, communications)
  - Learning & Assessment (class/course, assignments, marking)
  - Duty of Care & Compliance (consent, wellbeing, incidents, audit)
  - Services & Finance (forms, events, HR, payments)
- Lock 12+ personas and map allowed actions:
  - Admin, Principal, Teacher, Student, Parent/Carer, HR, Finance, Support Staff.
- Publish canonical feature matrix per role before build starts.

### 5.2 Platform Architecture (High Level)
- Frontdoor/API Gateway enforces authN/authZ, schema checks, rate limits.
- Bounded contexts expose domain APIs and emit business events.
- Event bus for async flows, integrations, and analytics.
- Data stores:
  - OLTP transactional DB (tenant-scoped)
  - Immutable audit/retention store
  - Analytics/warehouse projection store
  - Optional blob storage for attachments
- Shared cross-cutting: policy enforcement, consent evaluation, observability, idempotency, tracing.

### 5.3 Backend and Data
- Implement core entities first:
  - tenant, school, year, person, student/staff/carer, household, consent, enrolment, class_group, timetable_slot, attendance_event, assignment, submission, markbook, invoice/payment.
- Enforce global invariants:
  - tenant isolation, one active enrolment per student-scope, consent-aware access, audited regulated writes.
- Use migration waves (foundation to extensions):
  1. Identity + trust + people backbone
  2. Enrolment + structure
  3. Timetable + attendance + incidents
  4. Learning + assessment
  5. Forms/communications + workflow
  6. Finance and integration + HR/events as separate increments
- Implement command handlers with explicit status transitions and immutable versioning.
- Add event schema registry and consumer idempotency requirements.

### 5.4 API and Contracts
- Create OpenAPI-first contract set per module.
- Provide domain-level endpoints for identity, people, enrolment, timetable, attendance, learning, assessment, wellbeing, comms, finance, workflows, audit.
- Every state-changing endpoint:
  - requires explicit correlation id
  - supports idempotency key
  - emits one or more domain events
  - writes audit event with actor and context.
- Add contract tests:
  - request/response shape validation
  - permission matrix
  - version compatibility for breaking changes.

### 5.5 Frontend and UX
- Build role-based shell first with consistent IA:
  - Dashboard
  - People
  - Enrolment
  - Timetable
  - Attendance
  - Learning
  - Assessment
  - Wellbeing
  - Events
  - Finance
  - HR
  - Communications
  - Analytics
  - Governance
- For each route, implement explicit state transitions (`idle/loading/ready/error/conflict`).
- Implement consent-aware UI visibility.
- Implement offline queue for attendance, incident capture, and form drafts.
- Enforce accessible UI patterns (WCAG 2.2 AA baseline).
- Build reusable component primitives: permission gate, lifecycle chip, timeline, conflict resolver, audit link.

### 5.6 Security, Privacy, and Compliance (Platform-Wide)
- Threat model by trust boundary: external identity providers, tenant boundary, API edge, admin actions, sensitive records.
- Access model:
  - RBAC + ABAC
  - tenant scoping
  - role-based feature flags per module
  - consent-based field redaction
- Encryption: TLS in transit everywhere; encryption at rest for PII and sensitive notes/events.
- Consent model:
  - capture, revoke, scope, expiry
  - propagation engine updates visibility immediately.
- Audit model:
  - immutable append-only events for security-sensitive actions
  - hash chaining or write-once event store option
  - retention policies + legal holds.
- Governance gates:
  - pre-launch threat checks
  - RBAC regression
  - privacy-by-design review
  - data retention and incident-drill evidence.

### 5.7 Integration, Workflow, and AI Controls
- Add integration fabric early:
  - webhook registry, connector adapters, SSO, OneRoster/LTI where needed, and external payroll/payment connectors.
- Webhooks must include signature verification, retry, and dead-letter handling.
- Workflows should always include: trigger, approver, SLA, status, escalation, audit trail.
- AI usage if enabled:
  - tenant/model registry
  - redaction before call
  - prompt/output logging
  - tenant policy for where AI is allowed.

### 5.8 DevOps and SRE
- Environment model:
  - local/dev, integration/staging, UAT, production
  - config/secret separation by environment
- CI/CD:
  - PR checks -> tests -> static checks -> container build -> staging deploy -> staged smoke -> manual release gate.
- Observability:
  - centralized logs, metrics, traces
  - SLOs for login success, attendance processing, assignment submission, event webhook reliability.
- DR and backups:
  - tested restore process per quarter
  - immutable backups, encryption at rest/in transit.
- Release safety:
  - blue-green or canary for API
  - schema migration validation
  - rollback scripts and checkpoints.

### 5.9 QA and Quality Strategy
- Multi-layer test pyramid:
  - unit tests for policy and domain transitions
  - integration tests for DB/API/event contracts
  - contract tests for integrations
  - end-to-end journeys per persona
- Traceability matrix:
  - journeys -> API -> domain event -> DB change -> UI state
- Add dedicated suites:
  - security tests: auth bypass, privilege escalation, tenant bleed, consent leak
  - performance tests: read/write spikes around class start/roll-close windows
  - accessibility tests: baseline and regression
  - chaos tests: webhook failure, payment webhook duplicates, consent revocation mid-flow.
- Release criteria:
  - all critical journey tests pass
  - no unauthorised-read/write regressions
  - audit/event integrity checks and retention policy checks pass.

## 6) Cross-Domain Backlog (Recommended Order)
1. Security, tenancy, and identity trust foundation.
2. People/household and consent data model.
3. Enrolment lifecycle and status transitions.
4. Integration fabric + API contracts.
5. Workflow/approval engine.
6. Attendance + duty-of-care.
7. Timetable and substitutions.
8. Learning delivery core + assignments.
9. Assessment and report flows.
10. Event management + excursions.
11. HR/workforce.
12. Finance and billing.
13. Analytics and advanced reporting.
14. AI-assisted services behind governance controls.

## 7) 18-Week Execution Sequence

### Weeks 1-2: Foundation
- Domain governance and architecture freeze
- Identity + RBAC + MFA + tenant hardening
- Core people/entities + consent model
- Migrations wave A/B

### Weeks 3-6: Operational Core
- Timetable + class/roster
- Attendance and incidents
- Core frontend shell and role routing
- Notifications + messaging baseline

### Weeks 7-10: Learning Core
- Assignment lifecycle
- Student submission + parent visibility
- Markbook + moderation
- Workflow engine integration for approvals

### Weeks 11-14: Expansion
- Finance foundations (invoices/payments/reconciliation)
- Events and excursions module
- HR/workforce baseline
- Integration endpoints with resilience

### Weeks 15-18: Hardening and Scale
- Analytics and snapshot reporting
- DR/backup and failover exercise
- Full security/compliance audit rehearsal
- Performance tuning and launch readiness review

## 8) Risks and Mitigations
- Custody/consent logic drift -> policy service + exhaustive matrix tests.
- Scheduler conflict errors -> constraint checks and overlap tests.
- Attendance/data integrity issues -> strong validation + immutable audit.
- Finance reconciliation complexity -> event-based payment state machine + reconciliation queue.
- Consent revocation timing -> near-real-time permission propagation and sync checks.
- Integration drift -> contract tests + adapter versioning.

## 9) Success Gates (Non-Negotiable)
- Gate sequence is authoritative in the "Implementation Roadmap" milestone matrix in this document.
- Gate A: Security and identity baseline.
- Gate B: Data and contract freeze.
- Gate C: Platform readiness and journey completion.
- Gate D: Compliance and audit integrity.
- Gate E: Production launch readiness.

## 10) Output Artifact Stack to Generate Next
1. API contract files (`openapi/identity.yaml`, `openapi/people.yaml`, etc.).
2. Migration SQL packs (`migrations/` by phase).
3. Frontend route/component map (`frontend/ROUTE_MAP.md`).
4. Security/compliance runbook and incident playbook (`governance/`).
5. QA matrix and story backlog (`qa/traceability-matrix.md`).
6. Release runbook and SLO dashboard configuration (`ops/runbooks.md`).

## 11) Immediate Next Actions (this week)
1. Execute from [ADR-106 Execution Backlog And Workstream Sequencing](adr/platform/IMPLEMENTATION_BACKLOG_AND_WORKSTREAMS.md), with the 18+ issue module backlog already split by waves.
2. Freeze role/permission matrix and consent rules.
3. Create OpenAPI v1 shell for core modules.
4. Start DB wave A migration and API scaffold.
5. Build and ship the first full cross-domain journey suite for Admin + Teacher + Parent + HR + Finance + Wellbeing.

---

### Merged Document: ERD_AND_DATA_MODEL.md

# OpenAusLMSK12 Domain Model and ERD Blueprint

## Canonical Entities (Day-1 Foundation Through Full Platform Delivery)

### Tenant and Institution
- tenant(id, name, region, compliance_profile, created_at, status)
- school(id, tenant_id, name, sector, country='AU', timezone, status)
- campus(id, school_id, code, address, active)
- year(id, tenant_id, label, start_date, end_date, is_active)
- year_level(id, tenant_id, school_id, code, display_name, order_index, starts_at_grade, ends_at_grade, is_active)

### People Domain
- person(id, tenant_id, external_id, full_name, email, phone, date_of_birth, role_hint, status, created_at)
- staff(id, person_id, employee_number, hire_status, position, work_email, user_id)
- student(id, person_id, student_number, year_level_id, start_date, year_entry_code)
- carer(id, person_id, is_contract, preferred_contact_channel)
- user_account(id, person_id, auth_subject, mfa_enabled, password_state, last_login, status)

### Relationships and Household
- household(id, tenant_id, address, created_at)
- person_household(id, person_id, household_id, role_in_household, is_primary, custody_type, is_consent_guardian, active)
- custody_rule(id, student_id, carer_id, scope, active, notes)

### Enrolments and Structure
- program(id, school_id, year_id, level, stage, delivery_mode)
- class_group(id, school_id, program_id, year_id, code, name, subject_code, lead_teacher_id, cohort_type)
- enrolment(id, student_id, school_id, year_id, class_group_id, status, joined_at, left_at)
- staff_assignment(id, staff_id, school_id, class_group_id, role, from_date, to_date, is_primary)

### Timetable and Resources
- room(id, school_id, building, name, capacity, type)
- period(id, school_id, day_of_week, start_time, end_time, duration)
- timetable_slot(id, class_group_id, staff_id, room_id, period_id, recurring_pattern, effective_from, effective_to, canceled_at)
- substitution(id, timetable_slot_id, from_staff_id, to_staff_id, reason, approved_by)

### Attendance and Duty of Care
- attendance_event(id, student_id, school_id, event_date, period_id, status, code, reason, reported_by)
- staff_attendance_event(id, staff_id, event_date, check_in_time, check_out_time, method, verified_by)
- visitor_entry(id, person_name, organisation, visitor_type, expected_arrival, expected_departure, approved_by, purpose)
- incident(id, tenant_id, student_id, category, severity, description, reported_at, status, reported_by)

### Learning and Assessment
- course_term(id, school_id, name, start_date, end_date)
- assignment(id, class_group_id, title, instructions, open_at, due_at, points, submission_type, created_by, status)
- assignment_submission(id, assignment_id, student_id, submitted_at, file_refs, text_response, status, gradebook_entry_id)
- rubric(id, assignment_id, criteria_json)
- lesson(id, class_group_id, title, content_url, term_id, planned_at, owner_staff_id)

### Marking and Outcomes
- outcome(id, code, descriptor, standards_domain, level)
- markbook_entry(id, assignment_id, student_id, marks, outcome_id, reviewed_by, graded_at, feedback)
- moderation_batch(id, markbook_entry_id, workflow_state, reviewer_id, notes)
- report_card_template(id, school_id, name, grading_model, config_json)

### Wellbeing and Health
- wellbeing_plan(id, student_id, plan_type, risk_level, created_by, status, effective_from, effective_to)
- support_case(id, student_id, category, urgency, action_required_by, owner_staff_id, status)
- health_event(id, student_id, type, details, confidentiality_level, notified_parents)

### Finance and Services
- fee_structure(id, school_id, type, frequency, default_terms)
- invoice(id, school_id, household_id, payer_person_id, amount, currency, due_date, status)
- payment(id, invoice_id, transaction_ref, provider, paid_at, method, status)

### Communications and Workflow
- notice(id, school_id, audience_scope, subject, body, published_at, expires_at)
- message(id, sender_id, recipient_type, recipient_id, thread_ref, content, channel, sent_at, status)
- notification_policy(id, event_type, audience_filter, template_ref, channel_list)
- form(id, tenant_id, name, version, schema_json, visibility_rules_json, is_active)
- form_response(id, form_id, entity_type, entity_id, submitted_by, payload_json, status, submitted_at)
- workflow_definition(id, name, trigger, actions_json, owner_module)
- workflow_execution(id, workflow_definition_id, entity_type, entity_id, state, started_at, completed_at)

### Compliance and Audit
- consent(id, person_id, consent_type, scope, granted, granted_at, withdrawn_at, granted_by)
- audit_event(id, actor_id, actor_type, action, resource_type, resource_id, timestamp, diff_json, immutable_hash)
- retention_policy(id, resource_type, retention_days, legal_hold_required)

## High-Level ERD Relationships
- tenant 1..* school 1..* campus
- tenant 1..* person
- person 1..1 staff/student/carer via subtype refs
- person 1..* person_household *..1 household
- household *..* person (through person_household)
- student 1..* enrolment *..1 school/year/class_group
- student 1..1 year_level
- class_group 1..* timetable_slot *..* staff and room
- class_group 1..* assignment *..* assignment_submission
- assignment_submission 0..1 markbook_entry
- enrolment 1..* attendance_event
- student 1..* wellbeing_plan/support_case
- student 1..* invoice through household/person
- staff 1..* staff_assignment
- assignment, attendance, wellbeing, incidents each emit audit_event via event hooks

## Constraints and Invariants
- household and role relationships cannot grant access beyond role/consent boundary.
- one active custodian profile per child for critical safety actions (escalate if conflicting).
- assignment grade cannot be finalised without status audit and reviewer if required by rule.
- all sensitive health/wellbeing events must be consented and redacted in external exports.
- every write to regulated records emits `audit_event`.

## Entity Versioning Pattern
- use soft-delete + effective dating for time-sensitive entities (enrolments, assignments, staff assignments, policies).
- maintain history tables or change logs for enrolment status, role changes, and consent updates.

## Suggested API Contract Boundaries
- /api/v1/identity
- /api/v1/people
- /api/v1/enrolments
- /api/v1/timetable
- /api/v1/attendance
- /api/v1/learning
- /api/v1/assessment
- /api/v1/wellbeing
- /api/v1/finance
- /api/v1/comms
- /api/v1/workflows
- /api/v1/audit

---

### Merged Document: DB_IMPLEMENTATION_CHECKLIST.md

# Database Implementation Checklist

## Migration Order (safe create sequence)
1. tenant
2. retention_policy
3. year
4. school
5. campus
6. year_level
7. form
8. form_response
9. workflow_definition
10. notification_policy
11. person
12. household
13. student
14. staff
15. carer
16. user_account
17. person_household
18. program
19. outcome
20. course_term
21. room
22. period
23. class_group
24. staff_assignment
25. enrolment
26. assignment
27. rubric
28. lesson
29. timetable_slot
30. substitution
31. attendance_event
32. staff_attendance_event
33. visitor_entry
34. incident
35. assignment_submission
36. markbook_entry
37. moderation_batch
38. wellbeing_plan
39. support_case
40. health_event
41. report_card_template
42. fee_structure
43. custody_rule
44. invoice
45. payment
46. notice
47. message
48. workflow_execution
49. consent
50. audit_event

## Required Key Constraints and Notes
- Tenant scoping should be explicit on all operational tables.
- All IDs use immutable PKs plus created/updated timestamps.
- `year_level` is implemented as a lookup/reference table with FK from `student`.
- `form` + `form_response` should be immutable after publish; if form edits are needed, deprecate old version and create a new one.
- Polymorphic fields (`sender_id`, `reported_by`, `verified_by`) should be normalized to concrete refs or validated through app-level + triggers.

## Unique Constraints
- tenant: `(name, region)`
- school: `(tenant_id, name)`
- campus: `(school_id, code)`
- person: `(tenant_id, external_id)`, `(tenant_id, email)`
- staff/student/carer: `person_id`
- user_account: `auth_subject`, `person_id`
- person_household: `(person_id, household_id)`
- custody_rule: `(student_id, carer_id, scope)`
- class_group: `(school_id, code)`
- enrolment: partial unique for active enrolment by `(student_id, school_id, year_id)`
- year_level: `(tenant_id, school_id, code)`
- form: `(tenant_id, name, version)`
- staff_assignment: `(staff_id, class_group_id, from_date, to_date)` with overlap checks
- attendance_event: `(student_id, school_id, event_date, period_id)`
- assignment: `(class_group_id, title)`
- assignment_submission: `(assignment_id, student_id)`
- markbook_entry: `(assignment_id, student_id)`
- form_response: `(form_id, entity_type, entity_id, status)` where status includes `draft|submitted|closed`
- invoice: choose idempotent rule, e.g. `(school_id, household_id, due_date, amount)`
- payment: `(invoice_id, transaction_ref)` and `(transaction_ref)`
- consent: `(person_id, consent_type, scope)`
- retention_policy: `resource_type`

## Critical Indexes
- person: `(tenant_id, email, status)`
- enrolment: `(student_id, status, left_at, joined_at)` and `(school_id, year_id, status)`
- staff_assignment: `(staff_id, from_date, to_date)` and `(class_group_id, role)`
- timetable_slot: `(class_group_id, period_id, effective_from, effective_to)` and `(staff_id, period_id, effective_from, effective_to)` and `(room_id, period_id, effective_from, effective_to)`
- attendance_event: `(student_id, event_date, period_id)`
- staff_attendance_event: `(staff_id, event_date)`
- assignment_submission: `(assignment_id, status, submitted_at)`
- markbook_entry: `(assignment_id, reviewed_by, graded_at)`
- year_level: `(tenant_id, school_id, is_active)` and `(tenant_id, school_id, code, is_active)`
- form_response: `(form_id, entity_type, entity_id, submitted_at)` and `(status, submitted_at)`
- invoice: `(status, due_date, school_id)`
- payment: `(invoice_id, status, paid_at)`
- workflow_execution: `(workflow_definition_id, state, entity_type, started_at)`
- consent: `(person_id, consent_type, scope, withdrawn_at)`
- audit_event: `(resource_type, resource_id, timestamp)`

## Mandatory invariants
1. Tenant boundaries: no cross-tenant reads/writes at DB/query layer.
2. Subtype discipline: one active profile per person for each subtype lane (student/staff/carer) in safety-critical flows.
3. One active enrolment per student per school/year unless policy explicitly permits split timetables.
4. One primary active custody/guardian role per child where scope requires this.
5. Audit emission required for regulated writes including attendance, wellbeing, incidents, consent, grade finalisation and finance status changes.

---

### Merged Document: IMPLEMENTATION_ROADMAP.md

# OpenAusLMSK12 Implementation Roadmap

## Delivery Model
- 3-week planning, then 2-week execution sprints.
- Strict dependencies across layers: foundation -> core workflows -> advanced features.
- Scope posture: all product modules are in scope from Day 1; this roadmap defines sequencing only, not a deferred-features backlog.

## Phase 1: Foundation (Weeks 1-2)
1. Approve product charter and governance model.
2. Implement tenant, school, user identity, auth, RBAC roles.
3. Implement people, household, enrolment, and consent domain tables.
4. Build audit sink and immutable event framework.
5. Define first-party API contracts for core modules.

## Phase 2: Full Operations Core (Weeks 3-6)
1. Timetable and class management.
2. Attendance engine for students and staff.
3. Student class dashboard + assignment creation/submission.
4. Parent portal read paths for attendance and class updates.
5. Basic notifications (email/SMS/push), message logs.

## Phase 3: Learning, Wellbeing, and Reporting Core (Weeks 7-10)
1. Markbook and grade workflow.
2. Behaviour and wellbeing action records.
3. Incident triage and case escalation.
4. Event/visit workflows with consent and attendance.
5. Forms/workflow builder v1 for approvals and notifications.

## Phase 4: Finance, HR, and Integration Expansion (Weeks 11-14)
1. Invoice and payment workflows.
2. API key and app registry, webhook events.
3. First-party integrations (import/export, SIS bridge, reporting bridge).
4. Compliance exports for retention and audits.

## Phase 5: Advanced (Weeks 15-18)
1. Analytics dashboard (attendance, wellbeing, achievement).
2. Modelling insights by cohort/year.
3. AI-assisted lesson and admin assistance with strict controls.
4. Role-gated moderation and policy enforcement.

## Milestone Gate Matrix (source of truth)
- This matrix is the single shared gate set for all planning documents:

| Gate | Name | Exit criteria (all required) | Owner |
| --- | --- | --- | --- |
| A | Security and Identity Baseline | 1) RBAC denies unauthorized actions across 100% of audited negative security test cases; 2) MFA enforced for admin/staff actors; 3) Session timeout policy operational (`<=45m` idle + rotate refresh); 4) No critical/high vulnerabilities in automated baseline scan. | Security + Backend |
| B | Data/Contract Freeze | 1) ERD to migration mapping complete for baseline delivery scope; 2) OpenAPI contracts for `/api/v1/identity`, `/api/v1/people`, `/api/v1/enrolments`, `/api/v1/timetable`, `/api/v1/attendance`, `/api/v1/learning`, `/api/v1/assessment`, `/api/v1/comms`, `/api/v1/workflow-definitions`, `/api/v1/workflow-executions`, `/api/v1/forms`, `/api/v1/audit`, `/api/v1/finance`, `/api/v1/hr`, `/api/v1/integration`; 3) FK/index migration dry-run is clean with zero unresolved references. | Architecture + Backend |
| C | Platform Readiness | 1) Priority journeys from the journey section are end-to-end; 2) Standard critical journeys complete in `<5m`; 3) Journey success rate in smoke test environment `>= 98%`; 4) At least one negative path per critical workflow has an automated assertion. | Product + QA |
| D | Compliance and Audit Integrity | 1) Immutable audit hash chain verified for all sensitive write events in canary pass; 2) Retention + legal hold rules tested for export + delete paths; 3) Consent revocation propagates within `<=2min` in consent-gated views. | Governance + QA |
| E | Production Launch Readiness | 1) Backup restore drill completes for all critical stores in `<= 60m`; 2) Incident drill for one critical and one PII-related scenario; 3) SLO checks healthy for `login success`, `attendance batch`, `assignment submission` for 24h (`>=99.0%`). | SRE |

### Gate Usage
- Gate decisions are blocking. Phase transitions require the listed gate to be `PASS`.
- Full Engineering Plan section in this document references this same gate matrix.

## Definition of Done (for each feature)
- Domain behavior in data model documented.
- API + event contract written and versioned.
- Permission matrix covered for all user roles.
- Audit event emitted for all sensitive actions.
- End-to-end tests for one positive and one negative path.
- Monitoring + rollback playbook updated.

---

### Merged Document: COMPREHENSIVE_IMPLEMENTATION_ARTIFACT.md

# OpenAusLMSK12 Comprehensive Implementation Artifact

Derived from:
- `OPENAUSLMSK12_SYSTEM_BLUEPRINT.md`
- `ERD_AND_DATA_MODEL.md`
- `IMPLEMENTATION_ROADMAP.md`
- `USER_JOURNEY_EXECUTION_GOVERNANCE.md`
- `LOW_FIDELITY_PROTOTYPING_STANDARD.md`
- `DIGITAL_MODELING_STANDARD.md`
- `GOVERNANCE_AND_OPERATIONS.md`

## 1) Starter API Surface (Grouped by Module)

### Identity, Security, and Trust
- `POST /api/v1/identity/auth/login` – credential/SSO token exchange
- `POST /api/v1/identity/auth/logout` – terminate session
- `POST /api/v1/identity/auth/mfa/challenge`
- `POST /api/v1/identity/auth/mfa/verify`
- `GET /api/v1/identity/roles` – role catalog
- `POST /api/v1/identity/roles/{role}/assignments` – assign role to user (admin only)
- `GET /api/v1/identity/permissions` – effective permission matrix for current actor
- `GET /api/v1/identity/me` – session identity context

### Core People and Household
- `GET /api/v1/people` – query people by tenant/school/search
- `POST /api/v1/people` – create person
- `GET /api/v1/people/{person_id}` / `PATCH /api/v1/people/{person_id}`
- `POST /api/v1/people/{person_id}/user-account` – link identity account
- `GET /api/v1/households` / `POST /api/v1/households`
- `POST /api/v1/households/{household_id}/members` – add person-household relationship
- `PATCH /api/v1/households/{household_id}/members/{person_id}` – custody/consent flags
- `POST /api/v1/households/{household_id}/consent` – record/refresh consent
- `GET /api/v1/consents?person_id=` / `POST /api/v1/consents`

### Enrolment and Institutional Structure
- `GET /api/v1/institution/years` / `POST /api/v1/institution/years`
- `GET /api/v1/institution/programs` / `POST /api/v1/institution/programs`
- `GET /api/v1/institution/class-groups` / `POST /api/v1/institution/class-groups`
- `POST /api/v1/enrolments` – create student enrolment
- `PATCH /api/v1/enrolments/{enrolment_id}` – status + effective dates
- `GET /api/v1/enrolments/{student_id}` – student roster/history
- `POST /api/v1/staff-assignments` / `PATCH /api/v1/staff-assignments/{id}`

### Timetabling and Operations
- `GET /api/v1/timetable/rooms` / `POST /api/v1/timetable/rooms`
- `GET /api/v1/timetable/periods` / `POST /api/v1/timetable/periods`
- `GET /api/v1/timetable/slots` / `POST /api/v1/timetable/slots`
- `PATCH /api/v1/timetable/slots/{id}` – substitute/update room or staff
- `POST /api/v1/timetable/slots/{id}/substitutions` – create handover assignment
- `GET /api/v1/timetable/class-groups/{class_group_id}/slots` – class view

### Attendance and Duty of Care
- `POST /api/v1/attendance/events` – mark student attendance event
- `GET /api/v1/attendance/events` – day/class/student filter
- `PATCH /api/v1/attendance/events/{id}` – amend/reason
- `POST /api/v1/attendance/rollup` – batch mark attendance
- `POST /api/v1/staff-attendance/events`
- `GET /api/v1/staff-attendance/events/{staff_id}`
- `POST /api/v1/incidents` – incident record (sensitivity/audit required)

### Learning Delivery
- `GET /api/v1/learning/lessons` / `POST /api/v1/learning/lessons`
- `GET /api/v1/learning/assignments` / `POST /api/v1/learning/assignments`
- `GET /api/v1/learning/assignments/{id}` / `PATCH /api/v1/learning/assignments/{id}`
- `POST /api/v1/learning/assignments/{id}/submissions` – submit work
- `GET /api/v1/learning/assignments/{id}/submissions`

### Assessment and Reporting
- `GET /api/v1/assessment/markbook-entries` / `POST /api/v1/assessment/markbook-entries`
- `PATCH /api/v1/assessment/markbook-entries/{id}` – grade/reviewed_by/feedback
- `POST /api/v1/assessment/marks/{entry_id}/review` – moderation/release check
- `GET /api/v1/assessment/outcomes` – standards/outcome catalog
- `GET /api/v1/reporting/cards` / `POST /api/v1/reporting/cards`

### Wellbeing, Health, and Compliance
- `POST /api/v1/wellbeing/support-cases` – create welfare case
- `GET /api/v1/wellbeing/support-cases/{id}` / `PATCH /api/v1/wellbeing/support-cases/{id}`
- `POST /api/v1/wellbeing/plans` / `PATCH /api/v1/wellbeing/plans/{id}`
- `POST /api/v1/health-events`
- `GET /api/v1/health-events/{id}`

### Finance and Services
- `GET /api/v1/finance/fee-structures` / `POST /api/v1/finance/fee-structures`
- `GET /api/v1/finance/invoices` / `POST /api/v1/finance/invoices`
- `GET /api/v1/finance/invoices/{id}` / `PATCH /api/v1/finance/invoices/{id}`
- `POST /api/v1/finance/payments` – record and reconcile payments
- `GET /api/v1/finance/payments/{id}`

### HR and Workforce
- `GET /api/v1/hr/staff` / `POST /api/v1/hr/staff`
- `GET /api/v1/hr/roles` / `POST /api/v1/hr/roles`
- `GET /api/v1/hr/leave-requests` / `POST /api/v1/hr/leave-requests`
- `POST /api/v1/hr/leave-requests/{id}/approval`
- `GET /api/v1/hr/rosters` / `PATCH /api/v1/hr/rosters/{id}`

### Communications and Notifications
- `GET /api/v1/comms/notices` / `POST /api/v1/comms/notices`
- `GET /api/v1/comms/messages` / `POST /api/v1/comms/messages`
- `POST /api/v1/comms/messages/{id}/acknowledge` – receipt/read
- `GET /api/v1/comms/notification-policies` / `POST /api/v1/comms/notification-policies`
- `POST /api/v1/comms/notifications/send` – enqueue outbound event

### Events and Visitors
- `GET /api/v1/events` / `POST /api/v1/events`
- `PATCH /api/v1/events/{id}`
- `GET /api/v1/events/{id}/attendance`
- `POST /api/v1/events/{id}/consent` – consent gate updates
- `POST /api/v1/visitors/check-in`
- `POST /api/v1/visitors/evacuate-report`

### Workflow and Forms
- `GET /api/v1/workflow-definitions` / `POST /api/v1/workflow-definitions`
- `GET /api/v1/workflow-definitions/{definition_id}`
- `PATCH /api/v1/workflow-definitions/{definition_id}` – update states/actions with immutable draft/version
- `POST /api/v1/workflow-definitions/{definition_id}/activate`
- `POST /api/v1/workflow-definitions/{definition_id}/archive`
- `POST /api/v1/forms` – define reusable form schema (JSON schema + visibility conditions)
- `GET /api/v1/forms/{form_id}`
- `POST /api/v1/forms/{form_id}/responses` – submit form data
- `GET /api/v1/forms/{form_id}/responses`
- `POST /api/v1/forms/{form_id}/responses/{response_id}/attachments` – upload supporting evidence
- `POST /api/v1/workflow-executions` – start workflow instance (entity_type, entity_id, context)
- `GET /api/v1/workflow-executions/{execution_id}`
- `POST /api/v1/workflow-executions/{execution_id}/transitions`
  - required payload: `{ "to_state": "approved|rejected|escalated|done", "actor_id", "comment", "correlation_id" }`
- `POST /api/v1/workflow-executions/{execution_id}/cancel`
- `GET /api/v1/workflow-executions/{execution_id}/history` – immutable audit-backed timeline

### Compliance, Audit, and Events Integration
- `GET /api/v1/audit/events` – immutable audit query
- `POST /api/v1/audit/events/search` – filtered compliance export view
- `GET /api/v1/integration/webhooks` / `POST /api/v1/integration/webhooks`
- `GET /api/v1/integration/events` – outbound integration events stream

## 2) Full-Platform Day-1-first Delivery Sequence

### Week 1-2: Foundation and Safety Invariants
1. Confirm domain boundaries, security model, and data ownership rules.
2. Implement tenant, school, year, year_level, person, and RBAC baseline tables.
3. Implement household, consent, enrolment, and custody model.
4. Add immutable audit baseline and compliance guardrails.
5. Publish OpenAPI contract shell for all domain paths listed above.
6. Add Gate A and Gate B checks as blocking milestones.

### Week 3-6: Operational Core in Production Shape
1. Implement class/timetable infrastructure, substitutions, room resources.
2. Implement attendance engine for students and staff, plus incident capture.
3. Implement parent/guardian visibility primitives and consent-aware data filtering.
4. Implement core messaging and notice delivery.
5. Implement learning baseline (lessons/assignments/submissions) and class dashboards.
6. Wire workflow/form primitives into the above paths and emit audit events for each state transition.

### Week 7-10: Learning, Wellbeing, and Reporting Expansion
1. Deliver markbook, outcomes, review, and moderation with immutable audit trails.
2. Deliver wellbeing plans, support case workflows, health-event logs, and intervention escalation.
3. Deliver events/visit consent, attendance, and incident reporting workflows.
4. Expand communication flows for parent, student, and staff communities.
5. Deliver report templates and longitudinal reporting exports.

### Week 11-14: Services and Operations Scale
1. Deliver finance and billing (fee structures, invoices, payments, reconciliation).
2. Deliver HR workforce modules (rosters, leave, staff records) and duty scheduling.
3. Deliver integration fabric (webhooks, import/export adapters, app registry).
4. Expand analytics-ready projections and operational dashboards for leadership.

### Week 15-18: Hardening, Governance, and Launch Readiness
1. Run full production-like compliance and disaster recovery drills.
2. Execute full journey regression across all high-risk modules.
3. Tune critical-path performance and add defensive controls (rate limits, idempotency safeguards, dead-letter queues).
4. Complete launch readiness package: incident playbook, SLO runbooks, release checks.

## 3) Cross-Domain Entity Delivery Priority

### Tier 1: Platform trust and identity (Gate A/B prerequisites)
1. `tenant`
2. `school`
3. `year`
4. `year_level`
5. `person`
6. `user_account`
7. `student`
8. `staff`
9. `carer`
10. `household`
11. `person_household`
12. `consent`
13. `custody_rule`

### Tier 2: Core operational fabric (Weeks 1-6)
14. `program`
15. `class_group`
16. `enrolment`
17. `staff_assignment`
18. `room`
19. `period`
20. `timetable_slot`
21. `substitution`
22. `attendance_event`
23. `staff_attendance_event`
24. `incident`

### Tier 3: Learning and wellbeing runtime (Weeks 7-10)
25. `course_term`
26. `assignment`
27. `assignment_submission`
28. `lesson`
29. `outcome`
30. `rubric`
31. `markbook_entry`
32. `moderation_batch`
33. `wellbeing_plan`
34. `support_case`
35. `health_event`
36. `report_card_template`

### Tier 4: Enterprise services and integrations (Weeks 11-18)
37. `fee_structure`
38. `invoice`
39. `payment`
40. `notice`
41. `message`
42. `notification_policy`
43. `form`
44. `form_response`
45. `workflow_definition`
46. `workflow_execution`
47. `audit_event`

## 4) Delivery Guards and Readiness
- Every sensitive mutation must write audit entries with actor context and immutable hash linkage.
- All consented views must be validated against current household and custody state at read time.
- All workflow transitions must emit deterministic state events and preserve a full action history.
- Expand module implementation by dependency, not by feature desirability, and treat every journey as production-grade from week 1 onward.
- No module-specific deferment is allowed once scope is confirmed.

---

### Merged Document: USER_JOURNEY EXECUTION GOVERNANCE

# User Journey, Prototype, and Diagram Governance

This section is normalized into ADR governance:
- Journey sequencing and ownership: `ADR-091 User Journey Execution Governance`
- Prototype/package requirements: `ADR-092 Low Fidelity Prototyping Standard`
- Diagram standards: `ADR-093 Digital Modeling Standard`
- Domain execution packages:
  - `ADR-094 Admissions and Enrolment Execution Package`
  - `ADR-095 Attendance and Duty of Care Execution Package`
  - `ADR-096 Learning and Assessment Execution Package`
  - `ADR-097 Finance and Services Execution Package`
  - `ADR-098 Operations and Events Execution Package`
  - `ADR-099 Wellbeing and Guardianship Execution Package`
  - `ADR-100 Communications Execution Package`
  - `ADR-101 Forms and Workflow Execution Package`
  - `ADR-102 Workforce Execution Package`
  - `ADR-103 Integration Fabric Execution Package`
  - `ADR-104 Analytics Execution Package`
  - `ADR-105 AI Governance Execution Package`
  - `ADR-106 Execution Backlog And Workstream Sequencing`

## Onboarding Journey
### 1) Tenant and School Setup
- Provision tenant, choose security profile and compliance toggles.
- Configure school/year, staff directory, curriculum maps.
- Set global notification and consent defaults.

### 2) Identity and Access
- Identity provider configured (SSO/OIDC/SAML or local).
- Initial user provisioning via imports and role templates.
- First login and role verification flow with permission checks.

### 3) Household Linking and Enrolments
- Student core records created and linked to school and class.
- Households and carers linked with custody, emergency, and communication rules.
- Parent/carer first-login invitation + verification.

## Core Daily Journey Flows

### Student Journey
1. Login and open daily dashboard.
2. View class timetable and upcoming tasks.
3. Access one assignment and submit work.
4. Receive messages/feedback from teacher.
5. Acknowledge notices and update status/reflect wellbeing check if needed.

### Parent Journey
1. Receive invite link and link to one or more children.
2. See today and week summary.
3. Acknowledge attendance/incident alerts.
4. Review progress and communicate with school.

### Teacher Journey
1. Open class roster and live timetable.
2. Publish assignment and set rubric/submissions.
3. Mark attendance for class.
4. Review submissions and provide feedback.
5. Escalate welfare or behaviour incidents when needed.

### Admin Journey
1. Intake exceptions and complete role corrections.
2. Manage rosters, substitutions, invoices, and events.
3. Resolve policy conflicts and run reporting snapshots.
4. Confirm compliance artifacts and audit exports.

### Principal Journey
1. Check consolidated dashboards.
2. Review risk and attendance anomalies.
3. Assign interventions and monitor outcomes.
4. Review audit and governance status before board reviews.

### Support Staff Journey
1. Open inbound ticket and classify urgency.
2. Trace user/session state and tenant context.
3. Execute remediation runbook.
4. Close with audit trail and satisfaction follow-up.

## Critical Journeys by Priority
1. School provisioning and admin setup
2. Teacher first assignment publish flow
3. Student first submission flow
4. Parent-first linking and consent flow
5. Attendance day-close flow
6. Incident creation and intervention flow
7. Reporting and grade publish flow

## Edge Journeys (Must Build Early)
- Multi-carer account with separated permissions.
- Student transfer/switch-year with history retention.
- Substitute teacher scheduling and handover.
- Visitor check-in and evacuation reporting.
- Consent revoked mid-year.

## Journey Acceptance Criteria
- Each highest-priority journey completes in <5 minutes for standard use case after setup.
- Every persona can see a clear status at each key step.
- All exceptions route into workflow engine with ownership and audit trail.

---

### Merged Document: GOVERNANCE_AND_OPERATIONS.md

# OpenAusLMSK12 Operations and Governance Handbook

## Security and Access
- RBAC with module-level and action-level permissions.
- MFA and SSO support required for admin and staff roles.
- Device/session controls and privileged action approvals.

## Data Privacy and Residency
- Role-based access rules for sensitive categories:
  - wellbeing
  - health
  - disciplinary
  - finance
- Data residency policy declared per tenant and enforced at storage and integration boundaries.

## Consent and Family Access
- Relationship model supports multiple carers and custody constraints.
- Access matrix determines what each carer can see and do.
- Parent withdraw/revoke consent with propagation to future actions.

## Audit and Compliance
- All important events emitted to immutable log (who/what/when/diff).
- Audit records support retention and legal hold flags.
- Exports are reproducible for regulator-style review.

## Observability
- Trace IDs on core interactions.
- Event logs for attendance, submission, marking, finance, and incident workflows.
- SLA dashboards for login success, notification delivery, and workflow SLA breaches.

## Incident Response
- Severity mapping from critical/data-risk to high.
- 24x7 escalation matrix for critical incidents.
- Pre-approved rollback plan for auth, reporting, and billing components.

## Quality and Adoption Guardrails
- User-facing journey checks before launch.
- Controlled rollouts by tenant cohort with full audit gate completion before expansion.
- Weekly risk review: security, privacy, data quality, and user friction.

---

### Merged Document: TECH_STACK_DECISION.md

# OpenAusLMSK12 Tech Stack Decision

## ADR Grounding
- [ADR-001 Backend Runtime Choice](adr/core/ADR-001-backend-runtime-choice.md)
- [ADR-009 Architecture Governance Baseline](adr/core/ADR-009-architecture-governance-baseline.md)
- [ADR-010 Platform Stack Baseline](adr/core/ADR-010-platform-stack-baseline.md)

## Decision
- **Backend**: `.NET 8 (C#)`
- **Frontend**: `TypeScript` (React/Next.js)
- **Primary Data Layer**: PostgreSQL + Redis (cache/queues) + object storage for files
- **Event/Async Plane**: Message bus or queue (RabbitMQ/Kafka/Service Bus as infra allows)
- **Rust**: **Not in phase-1**. Introduced only for narrow, measured performance-critical components.

## Rationale
1. **Team velocity**: Strong ecosystem for enterprise app delivery with RBAC, auth, auditing, and governance patterns.
2. **Compliance fit**: .NET has mature libraries for enterprise identity, policy enforcement, background tasks, and strong observability hooks.
3. **Research/Delivery scope**: OpenAusLMSK12 is a broad product-system; a single backend stack reduces execution risk.
4. **Type consistency with frontend integration**: TypeScript frontend + typed OpenAPI client gives fast feature throughput.
5. **Controlled optionality**: Rust can be added later for isolated high-throughput paths only (e.g., event ingestion/transform workers).

## Stack Allocation (phase plan)

### Phase 1–2 (Foundation Core)
- Auth, tenancy, people/enrolment, timetable, attendance, learning baseline in `.NET`
- Core UI in TypeScript

### Phase 3–4 (Platform Expansion)
- Finance, HR, workflows, events in `.NET`
- Add robust frontend modules and offline-capable operational screens

### Phase 5+ (Optimization only)
- If metrics show bottlenecks, introduce Rust as a microservice for one of:
  - high-volume telemetry/event ingestion
  - document/media processing
  - heavy report pre-generation pipelines

## Canonical Implementation Rule
- Do not introduce Rust until:
  1) there is a demonstrable performance bottleneck,
  2) a benchmark + load target is approved,
  3) a separate service boundary exists with minimal domain coupling.

## Migration and Delivery Impact
- API-first contracts remain stack-agnostic.
- Frontend remains TypeScript regardless of backend micro-optimization choices.
- Security/compliance/governance controls are implemented first in .NET and mirrored in other services.

## Git Repo Plan Impact
- Backend solution naming should use the school domain context naming, e.g., `OpenAusLMSK12.Api` and `OpenAusLMSK12.Domain`.
- Frontend project naming should align with `OpenAusLMSK12.Web`.
- Add architecture decision record (ADR) entry before final architecture freeze.

---

### Merged Document: TEAM_EXPERT_GAP_REVIEW.md

# Team Expert Gap Review (Architecture, Data, Security, UX, Operations)

## Scope
I reviewed the planning set under `docs/system` and the indexed research synthesis against a full-platform execution target (no MVP carve-outs).  
The goal of this pass is to identify plan gaps before implementation starts.

## Expert Findings by Domain

### 1) Platform/Architecture (Critical)
- Missing explicit decision on deployment topology details beyond “modular monolith first”: no criteria for when and how to split services, no shared interface contracts for split boundaries, no ownership model for shared libraries, and no migration/runbook for modular extraction.
- No explicit operational separation between mutable command path and historical/analytics projection path (OLTP, audit, and reporting). Plan states the concepts but does not define store boundaries and sync ownership.
- “Full-platform from day one” is declared, but no concrete backlog dependency graph exists that covers feature coupling (e.g., admissions + wellbeing + finance + analytics) for every domain.

### 2) Data/Model (High)
- Admissions lifecycle is conceptually required but `inquiry`, `application`, `offer`, `acceptance`, `waitlist`, and transition artifacts are not represented in the ERD, DB checklist, or API surface.
- External assessment integration signals (`student maps`, `NAPLAN`, `PAT`, evidence files) are repeatedly referenced in scope but not modelled as first-class entities or ingestion pipelines.
- Document-centric domains are under-modeled: no `document`/`file_version` entity for medical, medical-consent, compliance, or audit attachments; no per-file retention lifecycle or anti-malware scanning policy.
- Family safety/access is partially modelled, but no explicit `care_team`, `emergency_contact`, `separated_household`, or `access_exception` model to support nuanced legal/family scenarios.

### 3) Security/Compliance (High)
- API key/OAuth app registry is called out in requirements but no concrete schema/API contract exists for OAuth client lifecycle, secret rotation, scope definitions, or token revocation and leakage recovery.
- No explicit secure tenant boundary enforcement mechanism at DB layer (row-level security, tenant-scoped schemas, or explicit partitioning strategy) despite “no cross-tenant reads/writes” being a hard invariant.
- Attachment security is missing in plan detail: no antivirus/malware scan contract, media-content controls, or DLP/classification workflow for messages/forms/health files.
- Incident response and privacy coverage is high-level only; no required timelines/risk tiers for breach notifications, evidence collection, root-cause timeline, and DPA/subprocessor governance.

### 4) Frontend/Journeys & UX (Medium)
- Journey set omits several major actor workflows from the feature catalogue (Student Support, Procurement/Canteen/Shop operations, Parent interviews, volunteer/contractor portals, HR self-service details).
- No mobile-first journey model, offline behavior, or accessibility-by-persona test plan for staff-mobile or parent-mobile scenarios where many schools operate.
- Parent and carer flows do not include consent recovery, contested visibility disputes, or explicit conflict-resolution UX for multi-carer custody disagreement cases.

### 5) QA/Delivery/Operations (Medium)
- No explicit test strategy for **field-level authorization** (the highest-risk requirement in your scope because permissions are not just role-based; they are often consent and scope based).
- No explicit data-quality and reconciliation gates for critical legal/financial workflows (e.g., payment-ledger reconciliation between finance state, invoice state, and payment events).
- No explicit observability playbooks for policy-heavy paths (admission transitions, consent revocation propagation, moderation decisions, emergency overrides).
- No explicit release/upgrade strategy for long historical data migrations from first rollout onward.

### 6) Integration/Events/AI (Medium)
- Integration fabric is defined, but event schema registry and contract governance are not fully detailed for bidirectional integrations (versioning, breaking change policy, replay and replay-protection strategy).
- No API strategy decision for AI at the runtime layer: model routing, policy-as-code, redaction pipeline, prompt/response retention rules, moderation path, or model fallback policy.
- External messaging channels are planned, but no unified provider abstraction contract is defined (delivery receipts, retries, retries-backoff policy, carrier-level failure mapping).

## Recommended Immediate Fixes (before Week 1 implementation)
- Add a missing domain set: Admissions/Enrollment Pipeline, Facilities & Asset/Issue Tracking, Document Store + Retention, API Client Registry, and Resource Booking.
- Extend ERD + migration checklist with explicit first-class entities for the above and with:
  - document vault/versioning,
  - consented access exceptions,
  - role+field-level masking policy versions,
  - API client credentials + secret lifecycle.
- Add a dedicated “Field Security & Masking Contract” artifact linking fields to visibility matrices before API development starts.
- Expand journey set with the omitted high-risk flows and define acceptance tests for each.
- Add a non-functional requirements supplement (RLS/DB isolation, key management, incident-response SLAs, event contract versioning, and model governance SLAs) as part of the immutable baseline.

---

### Merged Document: AGENT_REVIEW_SUMMARY.md

# Team Review + Auto-Implementation Summary

## Agent Review Status
- review team was used with independent passes over: research corpus + system design docs + ERD.
- outputs were consolidated into: 1) implementation backlog, 2) comprehensive implementation artifact, 3) migration checklist.

## Consolidated First-Build Order
1. Security, tenancy, and trust foundation (SSO/OIDC/SAML, MFA, RBAC/ABAC, audit sink, residency/DR).
2. Canonical school-domain data backbone (tenant/school, people/household, enrolment, consent, custody).
3. Enrolment lifecycle engine (inquiry->application->offer->admit->transition->withdraw/transfer).
4. Integration fabric and interoperability primitives (API gateway, webhooks/events, mapping, contract registry).
5. Forms and workflow automation engine (approval states, SLAs/escalation, templates, evidence retention).
6. Attendance and duty-of-care module.
7. Timetabling and daily operations service.
8. Learning delivery core.
9. Assessment and reporting module.
10. Event operations module (excursions/sports/interviews with consent/attendance).
11. HR and workforce module.
12. Finance and payment module.

## Why this order
- Governance and trust come first to prevent irreversible security/compliance failures.
- People/enrolment comes second because every other domain depends on authoritative identities.
- Lifecycle and workflow come early because they govern transitions and legal/operational state.
- Core teaching flow comes after data safety, attendance, and scheduling are stable.
- Finance is later because it is hard to make safe without stable households, enrolment, and compliance rails.

## Auto-Implementation Pack
- `COMPREHENSIVE_IMPLEMENTATION_ARTIFACT.md` (merged into this plan)
  - grouped API surface by module
  - domain-by-domain sequence covering all system areas
  - minimal domain entities in dependency order
- `IMPLEMENTATION_ROADMAP.md` (merged into this plan)
  - long-form phased plan and release gates
- `ERD_AND_DATA_MODEL.md` (merged into this plan)
  - domain model and interface boundaries
- `DB_IMPLEMENTATION_CHECKLIST.md` (merged into this plan)
  - migration order, constraints, indexes, invariants
- `COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md` (new)
  - cross-domain research completion checklist and domain evidence matrix
- `domain_permissions_matrix.md` (new)
  - role/action permission baseline and policy test plan
- `domain_state_machines.md` (new)
  - canonical workflow state transitions for core processes
- `route_structure_and_component_contracts.md` (new)
  - persona-based route map and frontend component contract

## Next automatic steps (recommended)
1. Start with items 1-3 from the backlog and validate data-model contracts.
2. Use the comprehensive implementation artifact for sprint planning and assign one owner per module family.
3. Use DB checklist to generate migration skeletons and constraints before feature code.
4. Freeze permissions (`domain_permissions_matrix.md`) and audit contract before onboarding the first production tenant cohort.
5. Address high-priority findings in `TEAM_EXPERT_GAP_REVIEW.md` before implementation lock.

---

## Research References

### Research Toolkit
- [deep_research_agent_kit.md](adr/cross-cutting/deep_research_agent_kit.md)

### Comprehensive Research Discovery
- [COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md](COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md)

### Reference Index
- [ai_features_in_australian_k_12_learning_platforms_and_vendors.md](inital-research/ai_features_in_australian_k_12_learning_platforms_and_vendors.md)
- [comparing_assessment_and_reporting_capabilities_across_major_lms_and_assessment_platforms.md](inital-research/comparing_assessment_and_reporting_capabilities_across_major_lms_and_assessment_platforms.md)
- [compliance_and_governance_map_for_an_australian_k_12_learning_platform_openauslmsk12.md](inital-research/compliance_and_governance_map_for_an_australian_k_12_learning_platform_openauslmsk12.md)
- [comprehensive_school_attendance_system_for_australian_schools.md](inital-research/comprehensive_school_attendance_system_for_australian_schools.md)
- [deep_research_on_school_event_management_systems_for_excursions_camps_sports_consent_payments_attendance_staffing_and_parent_teacher_interviews.md](inital-research/deep_research_on_school_event_management_systems_for_excursions_camps_sports_consent_payments_attendance_staffing_and_parent_teacher_interviews.md)
- [deep_research_report_on_australian_school_admissions_and_enrolment_platforms_and_end_to_end_workflows.md](inital-research/deep_research_report_on_australian_school_admissions_and_enrolment_platforms_and_end_to_end_workflows.md)
- [enforcing_commit_and_push_hook_compliance_and_preventing_ai_agent_bypass_in_vibe_ts.md](inital-research/enforcing_commit_and_push_hook_compliance_and_preventing_ai_agent_bypass_in_vibe_ts.md)
- [financial_modules_for_australian_school_finance_systems.md](inital-research/financial_modules_for_australian_school_finance_systems.md)
- [implementing_forms_and_workflows_in_modern_systems.md](inital-research/implementing_forms_and_workflows_in_modern_systems.md)
- [k_12_school_analytics_for_dashboards_longitudinal_views_and_governance.md](inital-research/k_12_school_analytics_for_dashboards_longitudinal_views_and_governance.md)
- [learning_and_teaching_layers_in_major_lms_platforms.md](inital-research/learning_and_teaching_layers_in_major_lms_platforms.md)
- [mapping_integration_capabilities_across_vendors_for_an_australian_k_12_lms_initiative.md](inital-research/mapping_integration_capabilities_across_vendors_for_an_australian_k_12_lms_initiative.md)
- [openauslmsk12_research_index_and_synthesis.md](inital-research/openauslmsk12_research_index_and_synthesis.md)
- [reverse_engineering_the_core_sis_mis_data_model_in_australian_k_12_schools.md](inital-research/reverse_engineering_the_core_sis_mis_data_model_in_australian_k_12_schools.md)
- [security_tenancy_and_administration_feature_analysis_of_australian_k_12_platforms.md](inital-research/security_tenancy_and_administration_feature_analysis_of_australian_k_12_platforms.md)
- [single_user_ai_setups_for_macquarie_ict_research_and_cli_coding_vendor_comparison.md](inital-research/single_user_ai_setups_for_macquarie_ict_research_and_cli_coding_vendor_comparison.md)
- [single_user_ai_setups_for_research_and_cli_coding_in_macquarie_university_ict.md](inital-research/single_user_ai_setups_for_research_and_cli_coding_in_macquarie_university_ict.md)
- [staff_facing_hr_and_workforce_management_capabilities.md](inital-research/staff_facing_hr_and_workforce_management_capabilities.md)
- [timetabling_and_daily_operations_features_across_scheduling_platforms.md](inital-research/timetabling_and_daily_operations_features_across_scheduling_platforms.md)
- [vaop_open_source_systems_of_record_and_integration_target_study_list.md](inital-research/vaop_open_source_systems_of_record_and_integration_target_study_list.md)

### Priority Research Inputs
- `inital-research/openauslmsk12_research_index_and_synthesis.md`
- `inital-research/compliance_and_governance_map_for_an_australian_k_12_learning_platform_openauslmsk12.md`
- `inital-research/reverse_engineering_the_core_sis_mis_data_model_in_australian_k_12_schools.md`














