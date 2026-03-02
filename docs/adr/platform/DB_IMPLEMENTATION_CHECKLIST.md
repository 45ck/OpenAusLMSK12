# ADR-034: Db Implementation Checklist

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [DB_IMPLEMENTATION_CHECKLIST.md](DB_IMPLEMENTATION_CHECKLIST.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# OpenAusLMSK12 Database Implementation Checklist

## Migration Order (Foundation to Extension)

1. tenant
2. retention_policy
3. tenant_domain_setting
4. year
5. school
6. campus
7. person
8. year_level
9. form
10. form_response
11. workflow_definition
12. workflow_execution
13. workflow_execution
14. admission / admissions_application
15. student
16. staff
17. carer
18. user_account
19. household
20. person_household
21. custody_rule
22. program
23. class_group
24. enrolment
25. staff_assignment
26. room
27. period
28. timetable_slot
29. substitution
30. attendance_event
31. staff_attendance_event
32. visitor_entry
33. incident
34. outcome
35. course_term
36. lesson
37. assignment
38. assignment_submission
39. markbook_entry
40. moderation_batch
41. wellbeing_plan
42. support_case
43. health_event
44. report_card_template
45. fee_structure
46. invoice
47. payment
48. financial_event
49. notice
50. message
51. notification_policy
52. consent
53. document
54. document_version
55. document_scan
56. document_retention_state
57. integration_token
58. oauth_client
59. oauth_client_secret
60. audit_event

## Required Constraints and Indexes

### Required Constraints
- Tenant_id present on all operational tables unless the table is a pure lookup/auxiliary registry.
- All sensitive entities use immutable audit semantics for lifecycle events that alter permissions, consent, care, wellbeing, finance, or attendance.
- No cross-tenant direct FK violations: any nullable references to tenant-scoped tables must be filtered and validated.
- Every migration wave includes reverse migration notes and data backfill safety checks.

### Unique / Natural Keys
- tenant: `(name, region)`
- school: `(tenant_id, name)`
- campus: `(school_id, code)`
- person: `(tenant_id, external_id)`, `(tenant_id, email)`
- admissions_application: `(tenant_id, person_id, school_id, year_id, state)` with terminal state uniqueness rules
- enrolment: partial unique `(student_id, school_id, year_id)` where `status IN ('active','enrolled')`
- enrolment_state_history: `(enrolment_id, created_at DESC)` unique per transition identity
- document_version: `(document_id, version_no)`
- form: `(tenant_id, name, version)`

### Core Indexes
- person: `(tenant_id, email, status)`
- admissions_application: `(tenant_id, school_id, state)`, `(tenant_id, person_id, year_id)`
- enrolment_state_history: `(enrolment_id, created_at)`
- enrolment: `(student_id, status, joined_at)` and `(school_id, year_id, status)`
- attendance_event: `(tenant_id, student_id, event_date, period_id)`
- staff_assignment: `(staff_id, from_date, to_date)` and `(class_group_id, role)`
- timetable_slot: `(class_group_id, period_id, effective_from, effective_to)`
- document: `(tenant_id, entity_type, entity_id)`
- document_version: `(document_id, created_at)`
- document_retention_state: `(tenant_id, expires_at)` and `(legal_hold_active, purge_approved_by)`
- oauth_client_secret: `(oauth_client_id, status)` and `(expires_at)`

## Guardrails
- Every migration file includes:
  - up and down SQL
  - expected row-count checks for backfilled historical data
  - tenant isolation assertion checks
- Enforce tenant safety at DB schema level where possible (RLS + tenant_id default and helper functions) before application deployment.



