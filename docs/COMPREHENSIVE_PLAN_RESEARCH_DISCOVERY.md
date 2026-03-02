# OpenAusLMSK12 Comprehensive Research & Planning Discovery

## Scope

This document turns every plan area in the master implementation plan into an explicit research workstream before implementation starts.
Research is grouped by capability, with current evidence coverage, gaps, and required follow-up artifacts.

## Coverage Matrix (Master Plan -> Research Action)

### 1) Foundation, Identity, and Trust
- **Plan aspects**: multi-tenancy, RBAC/ABAC, SSO, session controls, consent, API trust boundary, audit.
- **Current evidence**:
  - `security_tenancy_and_administration_feature_analysis_of_australian_k_12_platforms.md`
  - `compliance_and_governance_map_for_an_australian_k_12_learning_platform_openauslmsk12.md`
- **Research actions required**:
  - Finalise tenant isolation model by domain (school/year/institution scope) with concrete SQL-level proofs.
  - Publish a formal permission matrix with deny-by-default test cases per role + route + action.
  - Define a consent ontology (family, emergency, behaviour/wellbeing, health) and map to feature flags.

### 2) Canonical Data Modeling
- **Plan aspects**: SIS + LMS single source of truth, entities/invariants, versioning, migration strategy.
- **Current evidence**:
  - `reverse_engineering_the_core_sis_mis_data_model_in_australian_k_12_schools.md`
  - `ERD_AND_DATA_MODEL` content in master plan
  - `deep_research_report_on_australian_school_admissions_and_enrolment_platforms_and_end_to_end_workflows.md`
- **Research actions required**:
  - Produce a domain-by-domain ERD diff for every bounded context (identity, household, enrolment, timetable, attendance, learning, wellbeing, finance).
  - Validate state transitions and cardinality with scenario fixtures from admissions, attendance, and events.
  - Define migration conflict resolution policy for imports (duplicate IDs, family graph anomalies, historical record backfills).

### 3) Admissions & Lifecycle
- **Plan aspects**: inquiry, application, offer, acceptance, waitlist, transition, year changeover, historical records.
- **Current evidence**:
  - `deep_research_report_on_australian_school_admissions_and_enrolment_platforms_and_end_to_end_workflows.md`
- **Research actions required**:
  - Model all enrolment lifecycle states as explicit state machine definitions with terminal conditions.
  - Design legal/audit evidence requirements for each transition.
  - Add year-end rollover and transfer scenarios into research-backed test cases.

### 4) Timetabling, Operations, and Resource Booking
- **Plan aspects**: constraint scheduling, substitutions, room/resource bookings, issue/malfunction workflows, meetings.
- **Current evidence**:
  - `timetabling_and_daily_operations_features_across_scheduling_platforms.md`
  - `implementing_forms_and_workflows_in_modern_systems.md`
- **Research actions required**:
  - Define deterministic conflict-resolution order for scheduling, substitutions, and room collisions.
  - Standardise room/resource booking state machine and cancellation model.
  - Set policy defaults for operational incident capture + SLA escalation.

### 5) Attendance and Duty of Care
- **Plan aspects**: roll marking, kiosk workflows, parental explanations, visitor logs, evacuation, on-site presence.
- **Current evidence**:
  - `comprehensive_school_attendance_system_for_australian_schools.md`
  - `deep_research_on_school_event_management_systems_for_excursions...md`
- **Research actions required**:
  - Complete attendance exception matrix (late/partial/early/evacuation/off-site).
  - Specify kiosk threat/integrity model for badge/QR/failsafe manual edits.
  - Ensure visitor and emergency attendance workflows are separated but queryable from the same student presence model.

### 6) Learning, Content, and Assignment Flow (Web Structure + LMS)
- **Plan aspects**: class/course model, lesson/reuse models, content lifecycle, homework/submissions, rubric feedback, parent visibility.
- **Current evidence**:
  - `learning_and_teaching_layers_in_major_lms_platforms.md`
  - `comparing_assessment_and_reporting_capabilities_across_major_lms_and_assessment_platforms.md`
- **Research actions required**:
  - Define page/route architecture for class pages, assignment composer, submission review, rubric panel, grade history.
  - Finalise front-end component contracts for consent-aware rendering and grade feedback audit markers.
  - Validate re-use and template semantics across terms, classes, and campus boundaries.

### 7) Assessment and Reporting
- **Plan aspects**: tasks, outcomes/progressions, moderation workflow, report cards, longitudinal reporting.
- **Current evidence**:
  - `comparing_assessment_and_reporting_capabilities_across_major_lms_and_assessment_platforms.md`
- **Research actions required**:
  - Define assessment object schema with explicit provenance and moderation metadata.
  - Validate formula support for progression, rolling averages, and retention-safe grade corrections.
  - Specify signed report pack generation and publish/visibility lifecycle.

### 8) Wellbeing, Health, Incident, and Behaviour
- **Plan aspects**: wellbeing plans, health incidents, restricted access, intervention tracking.
- **Current evidence**:
  - `compliance_and_governance_map_for_an_australian_k_12_learning_platform_openauslmsk12.md`
  - `comprehensive_school_attendance_system_for_australian_schools.md`
- **Research actions required**:
  - Formalise sensitive-data redaction policy by field/category.
  - Define signed intervention workflow and staff handoff model.
  - Create mandatory negative test cases for custody/access edge conditions.

### 9) Finance and Billing
- **Plan aspects**: invoicing, payment plans, reconciliation, donations/services, student services ordering.
- **Current evidence**:
  - `financial_modules_for_australian_school_finance_systems.md`
- **Research actions required**:
  - Add payment reconciliation sequence diagrams (gateway callback, timeout, retries, partial/refund handling).
  - Define write-protection model for financial audit records vs mutable dashboard views.
  - Validate GST/tax invoicing behavior for services, events, and contribution ledgers.

### 10) HR and Workforce
- **Plan aspects**: staff records, leave, rosters, role changes, payroll integration.
- **Current evidence**:
  - `staff_facing_hr_and_workforce_management_capabilities.md`
- **Research actions required**:
  - Design staff lifecycle states (active, suspended, casual, contract end, leave).
  - Validate roster substitutions against attendance/session staffing constraints.
  - Define privacy boundary between HR and teaching modules.

### 11) Events, Excursions, and Visitor Management
- **Plan aspects**: excursions/sports, consent capture, risk forms, attendance capture, staff allocation.
- **Current evidence**:
  - `deep_research_on_school_event_management_systems_for_excursions_camps_sports_consent_payments_attendance_staffing_and_parent_teacher_interviews.md`
- **Research actions required**:
  - Produce canonical event schema with custody-aware consent, safety checks, incident escalation.
  - Validate interview scheduling and staffing substitution semantics under contention.

### 12) Forms and Workflow Engine
- **Plan aspects**: dynamic forms, approvals, escalations, SLA timers, generated records.
- **Current evidence**:
  - `implementing_forms_and_workflows_in_modern_systems.md`
- **Research actions required**:
  - Standardise form DSL for conditionals, required attachments, signatures, and expiry.
  - Specify workflow engine contract: triggers, guard conditions, escalation tree, completion proof.

### 13) API and Integration Architecture
- **Plan aspects**: OpenAPI contracts, connectors, webhooks, OneRoster/LTI, event streaming.
- **Current evidence**:
  - `mapping_integration_capabilities_across_vendors_for_an_australian_k_12_lms_initiative.md`
  - `vaop_open_source_systems_of_record_and_integration_target_study_list.md`
- **Research actions required**:
  - Finalise contract-first process per domain and versioning policy.
  - Define webhook security profile (signing, replay prevention, DLQ/SLA).
  - Build partner connector acceptance criteria and deprecation policy.

### 14) Governance, Compliance, and Risk
- **Plan aspects**: privacy, records, retention, retention holds, incidents, audit integrity, SOC/ISM controls.
- **Current evidence**:
  - `compliance_and_governance_map_for_an_australian_k_12_learning_platform_openauslmsk12.md`
  - `enforcing_commit_and_push_hook_compliance_and_preventing_ai_agent_bypass_in_vibe_ts.md`
- **Research actions required**:
  - Create compliance control registry with source, owner, and evidence artifact.
  - Define immutable logging model with retention/ legal-hold test cases.
  - Complete breach-response runbook with role assignments.

### 15) AI, Tooling, and Governance
- **Plan aspects**: optional AI, tenant policy, prompt/output controls, safety/abuse boundaries.
- **Current evidence**:
  - `ai_features_in_australian_k_12_learning_platforms_and_vendors.md`
  - `single_user_ai_setups_for_research_and_cli_coding_in_macquarie_university_ict.md`
  - `single_user_ai_setups_for_macquarie_ict_research_and_cli_coding_vendor_comparison.md`
- **Research actions required**:
  - Finalise model strategy (tenant-scoped allowlist, redaction, logging, retention).
  - Define moderation + feedback loop boundaries per tenant and feature.
  - Confirm whether model call telemetry is treated as personal data in this deployment.

### 16) Observability, Testing, and Operations
- **Plan aspects**: SRE, CI/CD, backups, monitoring, release gates, incident handling.
- **Current evidence**:
  - `OPENAUSLMSK12_MASTER_PLAN` (sections 5.8–5.9)
  - `k_12_school_analytics_for_dashboards_longitudinal_views_and_governance.md`
- **Research actions required**:
  - Define SLO/SLI baselines and alert budgets by domain.
  - Prove end-to-end rollback and recovery from migration + webhook failure scenarios.
  - Add chaos scenarios for consent revocation during active workflow execution.

### 17) Web Structure and Frontend Architecture
- **Plan aspects**: navigation, route map, role-gated IA, page templates, accessibility, and offline states.
- **Current evidence**:
  - `timetabling_and_daily_operations_features_across_scheduling_platforms.md` (UI pattern catalogue)
  - `learning_and_teaching_layers_in_major_lms_platforms.md` (information architecture guidance)
- **Research actions required**:
  - Produce canonical route map by persona and tenant context.
  - Define component boundaries: shell, navigation, domain pages, reusable form/workflow blocks.
  - Specify global state model for read/write state, drafts, errors, and conflict resolution.
  - Define mobile-first interaction model and WCAG-compliant component accessibility checklist.

## Research Execution Sequence

1. Week 1: lock foundations (Aspects 1,2,3,6,17) because they determine everything else.
2. Week 2: lock operational domains (4,5,8,11,12) with edge-case coverage.
3. Week 3: lock transactional domains (7,9,10,13).
4. Week 4: lock controls and rollout quality (14,15,16) and connect every aspect to acceptance artifacts.

## Required Deliverables Before Implementation

- `domain_permissions_matrix.md`
- `consent_and_household_access_matrix.md`
- `domain_state_machines.md` (all workflow-state enums)
- `route_structure_and_component_contracts.md`
- `api_contract_registry.md`
- `integration_and_webhook_contracts.md`
- `observability_and_release_readiness_runbook.md`
- `evidence_matrix_and_gate_checklist.md` (mapped to success gates)

## How to Track Coverage

- A feature domain is **ready for build** only when:
  1. Data model + state transitions are documented.
  2. Web/UX contract is defined.
  3. Security and consent behavior is explicit.
  4. Integration contracts are versioned.
  5. Observability + rollback behavior for the domain are documented.





