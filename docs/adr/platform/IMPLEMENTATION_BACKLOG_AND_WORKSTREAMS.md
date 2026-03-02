# ADR-106: Execution Backlog And Workstream Sequencing

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: implementation queue, sequencing, and issue-level readiness gates across ADR execution packages
- **source-artifact**: [FULL_SOFTWARE_ENGINEERING_PLAN.md](../platform/FULL_SOFTWARE_ENGINEERING_PLAN.md), [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md), [WORKSTREAMS_AND_OWNERSHIP_PLAN.md](WORKSTREAMS_AND_OWNERSHIP_PLAN.md), [USER_JOURNEY_EXECUTION_GOVERNANCE.md](USER_JOURNEY_EXECUTION_GOVERNANCE.md), [ADMISSIONS_ENROLMENT_EXECUTION_PACKAGE](../people/ADMISSIONS_ENROLMENT_EXECUTION_PACKAGE.md), [ATTENDANCE_DUTY_OF_CARE_EXECUTION_PACKAGE](../attendance/ATTENDANCE_DUTY_OF_CARE_EXECUTION_PACKAGE.md), [LEARNING_AND_ASSESSMENT_EXECUTION_PACKAGE](../learning/LEARNING_AND_ASSESSMENT_EXECUTION_PACKAGE.md), [FINANCE_AND_SERVICES_EXECUTION_PACKAGE](../finance/FINANCE_AND_SERVICES_EXECUTION_PACKAGE.md), [OPERATIONS_EVENTS_EXECUTION_PACKAGE](../operations/OPERATIONS_EVENTS_EXECUTION_PACKAGE.md), [WELLBEING_AND_GUARDIANSHIP_EXECUTION_PACKAGE](../trust/WELLBEING_AND_GUARDIANSHIP_EXECUTION_PACKAGE.md), [COMMUNICATIONS_EXECUTION_PACKAGE](../communications/COMMUNICATIONS_EXECUTION_PACKAGE.md), [FORMS_AND_WORKFLOW_EXECUTION_PACKAGE](../cross-cutting/FORMS_AND_WORKFLOW_EXECUTION_PACKAGE.md), [WORKFORCE_EXECUTION_PACKAGE](../workforce/WORKFORCE_EXECUTION_PACKAGE.md), [INTEGRATION_FABRIC_EXECUTION_PACKAGE](../integration/INTEGRATION_FABRIC_EXECUTION_PACKAGE.md), [ANALYTICS_EXECUTION_PACKAGE](ANALYTICS_EXECUTION_PACKAGE.md), [AI_GOVERNANCE_EXECUTION_PACKAGE](../trust/AI_GOVERNANCE_EXECUTION_PACKAGE.md)
- **status-gate**: planning-first, implementation-second governance

## Context
The repo now has complete ADR coverage through execution packages, but the implementation queue is still implicit. This ADR converts that coverage into an execution-ready backlog with explicit dependencies and owner lanes.

## Decision
Adopt an ADR-driven backlog with 5 waves and 30+ issue-ready backlog items. No engineering task enters execution without a signed predecessor ADR and a route/prototype artifact where required by that domain.

## Wave 1: Trust, People, and Enrolment (Weeks 1-2)

### Core objective
Make identity, tenant isolation, household/custody modeling, and admission transitions safe and deterministic.

### Issue set
1. **Trust Foundation API Shell**
   - APIs: `/identity/*`, `/tenant/*`, `/permissions/*`
   - Outcomes: auth token/session hardening, MFA enablement, tenant binding checks.
2. **Tenant Isolation Enforcement**
   - SQL primitives for tenant-scoped reads and writes.
   - Outcomes: RLS/schema partitioning proofs + tenant bleed regression.
3. **Household and Custody Model Migration**
   - DB schema and seed for `household`, `person_household`, `custody_rule`.
   - Outcomes: separated-household constraints in policy lookup.
4. **Admission State Machine Delivery**
   - Implement enquiry -> application -> offer -> acceptance -> rollover flow.
   - Outcomes: immutable transitions and evidentiary audit.
5. **Consent Service Baseline**
   - Consent capture, revoke, scope evaluation APIs.
   - Outcomes: household scoped visibility at read and write time.

### Exit gate
- Gate A and Gate B criteria satisfied for onboarding cohort.

## Wave 2: Core Operations & Safety Readiness (Weeks 3-6)

### Core objective
Stand up attendance, timetabling, communications, and wellbeing baselines used by every operational flow.

### Issue set
6. **Timetable + Substitution Service**
7. **Student and Staff Attendance Service**
8. **Incident and Visitor Baselines**
9. **Notification and Message Routing Baseline**
10. **Wellbeing Case + Custody Arbitration Baseline**
11. **Route and Journey Prototype Set A** (`admin`, `teacher`, `parent_carer`, `student`)
12. **Consent-Aware Read Path Hardening** for communication, attendance, wellbeing

### Exit gate
- Route-level journey coverage includes at least 6 negative cases and 3 positive cases per critical journey.

## Wave 3: Learning and Academic Core (Weeks 7-10)

### Core objective
Deliver assignment, submission, marking, and report readiness.

### Issue set
13. **Course/Class/Timetable Cohesion** for academic context.
14. **Assignment Creation and Submission Endpoints** with media attachments and retry-safe saves.
15. **Markbook and Moderation Workflow** with provenance states and feedback.
16. **Assessment Outcome and Reporting Baseline** with export path.
17. **Academic Progress Journey Set B** (`teacher` publish -> student submit -> parent view -> review -> moderate)

### Exit gate
- Journeys in teaching and student domains accepted; grade visibility controls enforced by consent/permission.

## Wave 4: Community, Workflow, and Enterprise Services (Weeks 11-14)

### Core objective
Add forms/workflow automation, workforce, events, finance, and integrations used by real school operations.

### Issue set
18. **Form Schema Registry + Template Versioning**
19. **Workflow Engine Saga + Escalation**
20. **HR Lifecycle and Roster/Coverage Service**
21. **Invoice/Payment/Correction Core**
22. **Operations and Event Lifecycle (excursions/staff swaps)**
23. **Integration Client Registry + OAuth Lifecycle**
24. **Webhook Inbound/Outbound Adapter Skeleton + DLQ**
25. **Import/Export Jobs for SIS and payroll hooks**
26. **Journey Set C** (`finance`, `workforce`, `ops`, `forms`)

### Exit gate
- Reconciliation and webhook reliability checks prove deterministic and auditable.

## Wave 5: Intelligence and Insights (Weeks 15-18)

### Core objective
Enable analytics and AI governance without weakening trust boundaries.

### Issue set
27. **Analytics Projection Pipeline** (OLTP -> projections -> snapshots).
28. **Dashboard APIs** for principal/admin/teacher roles.
29. **Governance Exports and Reproducible Evidence Packs**.
30. **AI Policy Registry + Provider Routing**
31. **AI Moderation + Redaction Guardrails**
32. **AI Journey Set D** (`teacher`, `admin` with explicit policy overrides)

### Exit gate
- Gated launch readiness with retention, legal-hold, rollback rehearsal, and analytics traceability.

## Cross-Wave Supporting Stories (Critical non-sequenced)

33. **Quality Gates and Contract Verification**
- Contract tests, idempotency checks, tenant isolation negative tests, mutation replay checks.

34. **Observability Baseline**
- OpenTelemetry, request tracing, SLO dashboards for login, attendance, webhooks, analytics.

35. **OpenAPI Artifact Generation**
- Publish versioned OpenAPI files and schema snapshots for every release.

36. **Release Packaging**
- Migration scripts, runbooks, rollback and incident drill packs.

## Story Template (for execution tickets)
- **Given/When/Then** behavior
- **API changes**
- **Data model changes**
- **Journey/prototype requirement**
- **Negative cases (min 5)**
- **Security/consent checks**
- **Audit evidence object**
- **Release gate mapping**

## Priority Execution Order
1. Waves 1–2 must be complete before Waves 3–5 start.
2. Integration and forms/workflow service can run in parallel with finance only after consent and identity baselines are stable.
3. Analytics and AI can only start after core operational and workflow telemetry emits stable event schemas.

## Owners
- Product Architect: sequencing and ADR conformance.
- Platform Team: API/schema, migration, integration reliability.
- Frontend Team: journey prototypes and screen contracts.
- QA Team: contract/journey/security matrix.
- Compliance Lead: retention and legal-hold validation.
