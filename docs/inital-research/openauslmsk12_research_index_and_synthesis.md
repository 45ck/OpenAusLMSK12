# OpenAusLMSK12 Research Index & Synthesis Plan

## Scope
This folder contains 19 research documents gathered for the OpenAusLMSK12 project.

## Research Index
- [ai_features_in_australian_k_12_learning_platforms_and_vendors.md](ai_features_in_australian_k_12_learning_platforms_and_vendors.md)
- [comparing_assessment_and_reporting_capabilities_across_major_lms_and_assessment_platforms.md](comparing_assessment_and_reporting_capabilities_across_major_lms_and_assessment_platforms.md)
- [compliance_and_governance_map_for_an_australian_k_12_learning_platform_openauslmsk12.md](compliance_and_governance_map_for_an_australian_k_12_learning_platform_openauslmsk12.md)
- [comprehensive_school_attendance_system_for_australian_schools.md](comprehensive_school_attendance_system_for_australian_schools.md)
- [deep_research_on_school_event_management_systems_for_excursions_camps_sports_consent_payments_attendance_staffing_and_parent_teacher_interviews.md](deep_research_on_school_event_management_systems_for_excursions_camps_sports_consent_payments_attendance_staffing_and_parent_teacher_interviews.md)
- [deep_research_report_on_australian_school_admissions_and_enrolment_platforms_and_end_to_end_workflows.md](deep_research_report_on_australian_school_admissions_and_enrolment_platforms_and_end_to_end_workflows.md)
- [enforcing_commit_and_push_hook_compliance_and_preventing_ai_agent_bypass_in_vibe_ts.md](enforcing_commit_and_push_hook_compliance_and_preventing_ai_agent_bypass_in_vibe_ts.md)
- [financial_modules_for_australian_school_finance_systems.md](financial_modules_for_australian_school_finance_systems.md)
- [implementing_forms_and_workflows_in_modern_systems.md](implementing_forms_and_workflows_in_modern_systems.md)
- [k_12_school_analytics_for_dashboards_longitudinal_views_and_governance.md](k_12_school_analytics_for_dashboards_longitudinal_views_and_governance.md)
- [learning_and_teaching_layers_in_major_lms_platforms.md](learning_and_teaching_layers_in_major_lms_platforms.md)
- [mapping_integration_capabilities_across_vendors_for_an_australian_k_12_lms_initiative.md](mapping_integration_capabilities_across_vendors_for_an_australian_k_12_lms_initiative.md)
- [reverse_engineering_the_core_sis_mis_data_model_in_australian_k_12_schools.md](reverse_engineering_the_core_sis_mis_data_model_in_australian_k_12_schools.md)
- [security_tenancy_and_administration_feature_analysis_of_australian_k_12_platforms.md](security_tenancy_and_administration_feature_analysis_of_australian_k_12_platforms.md)
- [single_user_ai_setups_for_macquarie_ict_research_and_cli_coding_vendor_comparison.md](single_user_ai_setups_for_macquarie_ict_research_and_cli_coding_vendor_comparison.md)
- [single_user_ai_setups_for_research_and_cli_coding_in_macquarie_university_ict.md](single_user_ai_setups_for_research_and_cli_coding_in_macquarie_university_ict.md)
- [staff_facing_hr_and_workforce_management_capabilities.md](staff_facing_hr_and_workforce_management_capabilities.md)
- [timetabling_and_daily_operations_features_across_scheduling_platforms.md](timetabling_and_daily_operations_features_across_scheduling_platforms.md)
- [vaop_open_source_systems_of_record_and_integration_target_study_list.md](vaop_open_source_systems_of_record_and_integration_target_study_list.md)
## Synthesis Summary
OpenAusLMSK12 should be built as a single AU K-12 ecosystem combining SMS + LMS capabilities in modules around:
- Identity, security, tenancy, audit, and integrations
- Core people/sis data domain (students, staff, carers, households, enrolments)
- Operations: attendance, timetabling, events, facility and wellbeing workflows
- Teaching/learning and assessment
- Analytics and reporting with longitudinal insight
- Finance, communications, HR, and platform governance
- Optional, tenant-governed AI

## Canonical Module Boundaries
1. Foundation Service
   - Tenant and school hierarchy
   - RBAC, permissions, MFA, SSO, audit logs
   - API keys/OAuth/Webhooks/events
2. Community Data Hub
   - Identity master data for students/staff/carers
   - Household relationship model and access boundaries
   - Document and profile service (medical, permissions, reports)
3. Admissions & Lifecycle
   - Enquiries, offers, enrolment, transitions, compliance docs
4. Timetable & Operations
   - Scheduling, substitutions, resource booking, meetings, issue tracking
5. Attendance & Duty of Care
   - Roll marking, absences, parental responses, visitor/evacuation workflows
6. Pastoral, Behaviour, Wellbeing
   - Behaviour, welfare plans, health incidents, evidence trails
7. Learning Delivery
   - Course/class structures, calendars, resources, messaging, submissions
8. Assessment & Reporting
   - Tasks, markbook, moderation, outcomes, report packs
9. Finance & Services
   - Billing, invoicing, payments, orders, reconciliation, reporting
10. HR & Workforce
    - Staff directory, leave/rosters, workforce events and logs
11. Forms & Workflow Engine
    - Dynamic forms, approvals, SLAs, automations
12. Integrations Fabric
    - Import/export connectors, event streams, schema validation
13. AI & Safety Layer
    - Tenant-managed AI policy engine, content redaction, moderation
14. Governance & Compliance Layer
    - ST4S/ACARA/NCCD-aligned controls, retention, export packs

## Unified Data Model (high-level)
- Person (user, identity type, status, roles)
- Household (relationships, custody, emergency contacts)
- Enrolment (student-school-year-program-link records)
- Timetable/Calendar (class/session/resource allocations)
- Attendance (student/staff, events, status, reason codes)
- Wellbeing & Behaviour (cases, incidents, plans, actions)
- Learning (classes, assignments, submissions, marks, feedback)
- Assessment (tasks, outcomes, gradebook, moderation)
- Finance (bills, transactions, payment methods, reconciliation)
- Events (excursions, parent interviews, consent, attendance)
- Communication (messages, notifications, audit trail)
- Audit/Compliance (immutable events, retention tags, legal holds)

## Delivery Plan (Synthesis)
### Phase 1: Foundations (MVP)
- Core identity/tenant/security
- People/enrolment/household base domain
- Attendance, timetables, class communication
- Basic LMS surface: classes, assignments, grades
- Core reporting (attendance, progress snapshots)

### Phase 2: School Operations Hardening
- Wellbeing/behaviour, incidents, medical sensitivity controls
- Fees/invoicing and payment flows
- Events with consent/attendance
- Form/workflow engine and notifications
- Integration layer + audit/compliance baseline

### Phase 3: Advanced Platform
- Advanced analytics, longitudinal reporting, cross-domain insights
- Vendor/3rd-party connector marketplace
- HR/workforce and operational expansion
- AI-led lesson and operations assistants with strict controls
- API ecosystem, webhooks, advanced governance automation

## Delivery Principle
Ship as a modular architecture with Foundation + Community Data Hub first, then add bounded domain modules so compliance, data integrity, and auditability remain consistent across all feature areas.

## System Documentation Set
1. [OPENAUSLMSK12_MASTER_PLAN.md](../OPENAUSLMSK12_MASTER_PLAN.md)
2. [COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md](../COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md)
3. [Full coverage and execution plan (in master plan)](../OPENAUSLMSK12_MASTER_PLAN.md)


## Team Review Execution Pack
- [AGENT_REVIEW_SUMMARY.md] *(merged into master plan)*
- [DB_IMPLEMENTATION_CHECKLIST.md] *(merged into master plan)*

## Additional Research Artifacts in Progress
- [COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md](../COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md)
- [domain_permissions_matrix.md](../adr/cross-cutting/domain_permissions_matrix.md)
- [domain_state_machines.md](../adr/platform/domain_state_machines.md)
- [route_structure_and_component_contracts.md](../adr/platform/route_structure_and_component_contracts.md)




## Full Engineering Plan
- [FULL_SOFTWARE_ENGINEERING_PLAN.md] *(merged into master plan)*






