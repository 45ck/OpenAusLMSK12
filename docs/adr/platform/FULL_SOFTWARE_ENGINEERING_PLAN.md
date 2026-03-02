# ADR-047: Full Software Engineering Plan

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [FULL_SOFTWARE_ENGINEERING_PLAN.md](FULL_SOFTWARE_ENGINEERING_PLAN.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# OpenAusLMSK12 Full Software Engineering Plan

This is the executable planning document for the full platform scope. It is not an MVP plan.

## 1) Executive Statement

Build one production-grade, AU K-12 school platform in which SIS, LMS, attendance,
wellbeing, communications, finance, workforce, and integrations share one canonical
domain model and one governance/control plane.

Execution is full-stack from day 1. No feature area is left out because user journeys
depend on cross-domain integrity.

## 2) Scope and Non-Negotiables

- Multi-tenant and multi-year operation with school/campus/year scope isolation.
- Consent-aware access in all flows, not only for wellbeing/health.
- Audit trails for identity, records changes, messaging, payments, and safety events.
- Compliance and retention behavior by legal category, not by convenience.
- Zero undocumented assumptions for any critical workflow state transition.
- Full data integrity proofs before release: enrolment, attendance, finance, grading,
  wellbeing, communications, and staff events.

## 3) Delivery Philosophy

- Do not implement before domain contracts are signed in the bundle outputs.
- Build in dependency order, not by team preference.
- Use one canonical repo, one deployment target, one event schema set.
- Design every component for rollback, correction, and legal-audit reproducibility.
- Every high-risk flow must include:
  - acceptance fixtures
  - negative test for failure/recovery
  - rollback or compensation path
  - audit trace requirement

## 4) Stack and Architectural Baseline

- Frontend: TypeScript application (React or Next.js), role-aware route shell, and
  domain modules as route groups.
- Backend: strongly-typed API layer and service modules in a modular monolith style.
  Runtime lock is governed by:
  - [ADR-001 Backend Runtime Choice](../core/ADR-001-backend-runtime-choice.md)
  - [ADR-010 Platform Stack Baseline](../core/ADR-010-platform-stack-baseline.md)
- Data:
  - PostgreSQL for core state
  - Redis for cache/locking/queues where required
  - Object storage for attachments with virus/malware checks and retention tagging
- Messaging:
  - Internal domain event bus for side effects and integration dispatch
  - Outbox/inbox for webhook reliability and dedupe/retry
- Integrations:
  - HTTPS + API keys/OAuth with scopes
  - Signed webhooks with replay protection

### API Contract Rules

- REST-first public APIs under `/api/v1/...`
- OpenAPI as source of truth in build validation.
- Strict tenant and request context propagation on every mutation and query.
- No implicit nullable writes on permission-sensitive objects.
- Event schema versioning and compatibility policy is documented before implementation.

### Deployment Topology

- Single production environment per tenant cluster.
- Blue/green or canary for API and web.
- Environment-specific feature flags for high-risk modules (AI, communications, payment retries).

## 5) Full Domain Map and Ownership

### Domain Families

1. Foundation and Trust
2. People and Household
3. Admissions and Lifecycle
4. Timetabling and Operations
5. Attendance and Duty of Care
6. Learning and Learning Content
7. Assessment and Reporting
8. Wellbeing, Behaviour, Health
9. Communications and Notifications
10. Events, Excursions, Visitors
11. Finance and Billing
12. Workforce and HR
13. Forms and Workflow Engine
14. API/Integration and Connector Fabric
15. Analytics and Dashboards
16. AI and Safety Controls
17. Governance, Compliance, and Evidence

### Domain Ownership Pattern

- 1 Domain Owner per family, 1 technical owner, and 1 QA owner.
- Shared contracts are controlled by:
  - `domain_permissions_matrix.md`
  - `domain_state_machines.md`
  - `route_structure_and_component_contracts.md`
- Readiness to start a domain requires bundle outputs and cross-contract sign-off.

## 6) Canonical Data Model (High-Level)

### Core Entities

- Tenant -> Institution -> Campus -> YearConfig
- Person -> Household -> RelationshipRole
- StudentProfile (person-centric), StaffProfile (person-centric), ContractorProfile
- Enrolment, ClassGroup, Subject, Section, TimetableSlot
- AttendanceSession, AttendanceSnapshot
- Assignment, Submission, AssessmentArtifact, Grade, ModerationRecord
- WellbeingPlan, IncidentReport, BehaviourRecord, HealthNote
- MessageThread, MessageAttachment, NotificationAttempt
- EventDefinition, EventParticipant, EventConsentArtifact
- Invoice, Charge, PaymentTransaction, ReconciliationLedger
- PayrollRecord, LeaveRequest, RosterAssignment
- FormDefinition, WorkflowDefinition, WorkflowExecution, SagaTrace
- IntegrationConnector, IntegrationToken, WebhookEndpoint, WebhookDelivery
- AuditEvent, ConsentEvent, SecurityIncident

### Shared Invariants

- Person is the only root for identity operations.
- A person may only belong to one active household view for a given legal context,
  with explicit change history on household transitions.
- Every change to sensitive domains carries `consent_scope_id`, `actor_id`, `source`,
  and immutable event hash.
- No cross-tenant direct FK; all tenant filters enforced by data policy and runtime
  checks in repository layer.

## 7) State Machine Strategy

- Define every workflow state in `domain_state_machines.md` before coding.
- No mutation transitions without:
  - terminal validation
  - audit event
  - compensation action where needed
- Use idempotency keys for all operations that can be retried.

## 8) API and Contract Implementation Blueprint

### Contract Layers

- Public APIs:
  - user, admin, staff, parent, and integration clients
- Internal APIs:
  - domain-to-domain calls inside monolith modules (or service boundaries later)
- Event APIs:
  - immutable event stream for operational reporting and webhook fanout

### Endpoint Families

- Identity and trust
- People and household management
- Admissions lifecycle
- Timetabling and operations
- Attendance and emergency states
- LMS classes, assignment, submission, grading, moderation
- Communications and messaging
- Finance and payments
- HR and roster/leave
- Forms and workflow execution
- Integration registry, webhook, and connector lifecycle
- Compliance and evidence exports

### Error and Failure Conventions

- All API responses use explicit machine-readable error codes.
- Recovery semantics are contractually defined for 409, 422, 410, 429, 500.
- Retry contracts define dedupe keys and timeout boundaries.

## 9) Frontend and UX Architecture

- Persona route map with role-scoped navigation.
- Shared shell: tenant header, context switcher, global alerts, emergency broadcast banner.
- Domain route islands:
  - Administration
  - Teaching
  - Parent/Family
  - Student
  - Support / HR / compliance
- Offline/low-connectivity support for read caching and draft queue.
- Consent-aware rendering: every sensitive field renders through policy service.

### UX Guardrails

- Accessibility baseline: WCAG 2.2 AA across critical workflows.
- Mobile-first layouts for attendance, class updates, and parent interactions.
- Notification UX requires delivery state visibility (`Queued`, `Sent`, `Failed`, `Retried`).

## 10) SRE, Security, and Governance

- SLO targets by domain:
  - auth + permission checks: P99 < 300 ms
  - core list/query flows: P99 < 800 ms
  - submission/grade write paths: P99 < 1500 ms
- Error budget reviewed weekly with gate checkpoints.
- Security controls:
  - MFA and strong auth policy
  - session policy, device policy, token revocation
  - secrets rotation, signed logs, immutable audit chain
  - attachment scanning and file safety policy
- Governance controls:
  - legal hold handling
  - consent revocation propagation target <= 2 min in all consent-gated views
  - privacy boundary between HR, wellbeing, finance, and teaching modules

## 11) Full Delivery Phases (No MVP, complete rollout approach)

### Phase 0 (Week 0): Contract Lock and Environment Setup
- Initialize repo architecture skeleton and linting/build scaffolding.
- Finalize baseline ERD, permission matrix, and route contracts.
- Configure CI, DB migration tooling, OpenAPI validation, and artifact checks.

### Phase 1 (Weeks 1-3): Trust and Identity Foundation
- Bundle A + B + C.
- Deliver tenant hardening, household/consent core, admissions lifecycle state model.
- Blockers to continue: unresolved RBAC/consent contradictions, cross-tenant leaks.

### Phase 2 (Weeks 4-7): Core Operations and Learning Spine
- Bundle D + E + O (timing/operations + LMS + journeys).
- Deliver schedule, attendance, class content, submissions, grading visibility,
  and persona route structure.
- Deliverable requirement: first end-to-end user journeys run in a canary environment.

### Phase 3 (Weeks 8-11): Welfare, Messaging, Workforce
- Bundle F + G + I.
- Ship wellbeing/incident/health model, communication/audit pipeline, and HR lifecycle/rosters.
- Verify incident escalation and absence coverage with negative test set.

### Phase 4 (Weeks 12-15): Monetization and Workflow Intelligence
- Bundle H + J + K + L.
- Deliver finance/billing, workflow engine, integration fabric, AI governance.
- Establish payment and workflow compensation safety gates.

### Phase 5 (Weeks 16-18): Compliance Hardening and Full Release
- Bundle M + N + cross-bundle common artifact completion.
- Execute breach and rollback simulations.
- Final security/privacy review, observability validation, and launch gate.

## 12) Execution Gate Matrix

- Gate A: Data and contract freeze for foundation and person/enrolment domains.
- Gate B: API and event contracts complete for all modules in scope.
- Gate C: Audit and consent propagation verified in test suites.
- Gate D: Resilience and rollback proven with at least two failure scenarios.
- Gate E: Compliance evidence complete with legal hold and deletion behavior.
- Gate F: Full user journey coverage for parent, teacher, student, admin, principal.

Release proceeds only when all gates for a phase are PASS.

## 13) Testing Strategy

- Unit tests for domain logic and validators.
- API contract tests per endpoint family.
- Domain-state-machine tests for each workflow and transition.
- Journey tests for persona-level flows.
- Chaos/retry tests for webhook, payment, and queue failures.
- Security and privacy test suite for consent revocation and unauthorized access.
- Accessibility and usability smoke tests for core navigation paths.

## 14) Repository and Team Work Pattern

- Root folders:
  - `docs/` (plan, research, contracts)
  - `backend/` (API and domain modules)
  - `web/` (frontend app)
  - `infra/` (deploy, observability, policy assets)
  - `tests/` (domain, API, journey, contract, resilience)
- CI policy:
  - docs/lint check for broken links in critical docs
  - API contract build/test gate
  - migration dry-run on every PR
  - security scan and dependency policy check
- Team-of-experts cadence:
  - architecture lead validates contract boundaries
  - data model lead validates invariants
  - security lead validates threat model and controls
  - UX lead validates journey regression
  - operations lead validates rollout and rollback readiness

## 15) Planned Artifacts to Produce Next

3. OpenAPI contract sets for all 17 bundles.
4. Database migration sequence for baseline entities and indexes.
5. Test generators for state-machine fixtures and journey seeds.
6. Deployment bootstrap scripts and environment policy templates.
7. Data retention/retention-delete policy documents by category.

## 16) Current Open Risks

- Missing certainty in imported historic student records and duplicate identity resolution.
- Parent/guardian custody transitions colliding with ongoing incidents or absences.
- Payment reconciliation race conditions across retries and callbacks.
- AI model controls across multiple tenant profiles.
- Integration compatibility drift over time.

Each risk must be resolved or mitigated in the owning bundle before the dependent
phase start.

## 17) Immediate Next Action (this week)

- Finalize this same week's execution list:
  - [ ] Bundle A completion draft
  - [ ] Bundle B completion draft
  - [ ] Bundle C completion draft
- [ ] `domain_state_machines.md` and `domain_permissions_matrix.md` first pass
- [ ] Backend skeleton and CI baseline generated
- [ ] Frontend route skeleton generated from persona matrix

## 18) Design Expansion Pack

Use these three plans to lock all ambiguous design areas before module scaffolding:

- [ARCHITECTURE_DESIGN_EXPANSION_PLAN.md](ARCHITECTURE_DESIGN_EXPANSION_PLAN.md)
- [WORKSTREAMS_AND_OWNERSHIP_PLAN.md](WORKSTREAMS_AND_OWNERSHIP_PLAN.md)
- [ARCHITECTURE_DECISION_LOG.md](ARCHITECTURE_DECISION_LOG.md)
- [QUALITY_AND_TEST_STRATEGY_MATRIX.md](QUALITY_AND_TEST_STRATEGY_MATRIX.md)

### Execution Rule

- No module implementation starts until the owning workstream gate is PASS.
- No frontend route set is considered stable until route contracts are validated against
  consent and permission checks.

## 19) Contradiction and Exception Register

- Record all unresolved contradictions here before implementation:
  - `domain_permissions_matrix.md` and `domain_state_machines.md` can conflict on sensitive actions and lifecycle paths.
  - `route_structure_and_component_contracts.md` may include routes that require stricter permissions than existing grants.
  - any AI-enabled domain (`Bundle L`) requires governance sign-off per tenant policy.

### Exception Protocol

- Add clear rationale, owner, and date for every unresolved contradiction.
- Resolve by:
  1. producing a direct decision in `ARCHITECTURE_DECISION_LOG.md`, or
  2. updating the affected bundle artifact with a rejected/accepted alternative and test impact.

## 20) Reference Plan Links

- [OPENAUSLMSK12_MASTER_PLAN.md](../../OPENAUSLMSK12_MASTER_PLAN.md)
- [COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md](../../COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md)







