# ADR-039: Erd And Data Model

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [ERD_AND_DATA_MODEL.md](ERD_AND_DATA_MODEL.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# OpenAusLMSK12 Domain Model and ERD Blueprint

This file is the canonical baseline data model for planning and migration authoring.

## Canonical Data Domains

### Trust and Identity
- tenant(id, name, code, region, compliance_profile, created_at, status)
- tenant_domain_setting(tenant_id, policy_json, residency_region, minimum_mfa, sso_provider, ai_policy_profile, legal_hold_profile, created_at, updated_at)
- school(id, tenant_id, name, sector, country='AU', timezone, is_active)
- campus(id, school_id, code, name, building, capacity, is_active)
- year(id, tenant_id, label, start_date, end_date, is_active)
- year_level(id, tenant_id, school_id, code, display_name, order_index, starts_at_grade, ends_at_grade, is_active)

### People and Household
- person(id, tenant_id, external_id, full_name, email, phone, date_of_birth, role_hint, status, created_at)
- staff(id, person_id, employee_number, hire_status, position, work_email, user_id, is_active)
- student(id, person_id, student_number, year_level_id, status, start_date, year_entry_code)
- carer(id, person_id, is_contract, preferred_contact_channel)
- user_account(id, person_id, auth_subject, mfa_enabled, password_state, last_login, status)
- household(id, tenant_id, address, created_at, active)
- person_household(id, person_id, household_id, role_in_household, is_primary, custody_type, is_consent_guardian, is_active, legal_reference)
- custody_rule(id, student_id, carer_id, scope, start_at, end_at, active, reason, notes)

### Admissions and Enrollment
- admissions_application(id, tenant_id, school_id, person_id, year_id, source_channel, state, state_reason, waitlist_rank, applied_at, offer_at, accepted_at, declined_at, withdrawn_at, transferred_to_school_id, transitioned_by, transitioned_at, evidence_bundle_id, evidence_state_version)
- enrolment(id, tenant_id, student_id, school_id, year_id, class_group_id, status, joined_at, left_at, rollover_from_enrolment_id, rollover_to_enrolment_id)
- enrolment_state_history(id, enrolment_id, from_state, to_state, actor_id, reason_code, evidence_document_id, created_at)

### Timetabling and Operations
- program(id, school_id, year_id, level, stage, delivery_mode)
- class_group(id, school_id, program_id, year_id, code, name, subject_code, lead_teacher_id, cohort_type)
- staff_assignment(id, staff_id, school_id, class_group_id, role, from_date, to_date, is_primary)
- room(id, school_id, building, name, capacity, type)
- period(id, school_id, day_of_week, start_time, end_time, duration)
- timetable_slot(id, class_group_id, staff_id, room_id, period_id, recurring_pattern, effective_from, effective_to, canceled_at)
- substitution(id, timetable_slot_id, from_staff_id, to_staff_id, reason, approved_by)

### Attendance and Duty of Care
- attendance_event(id, tenant_id, school_id, student_id, class_group_id, event_date, period_id, status, code, reason, reported_by, source)
- staff_attendance_event(id, tenant_id, staff_id, event_date, check_in_time, check_out_time, method, verified_by)
- visitor_entry(id, tenant_id, school_id, person_name, organisation, visitor_type, expected_arrival, expected_departure, approved_by, purpose, state)
- incident(id, tenant_id, student_id, school_id, category, severity, description, reported_at, status, reported_by)

### Learning and Assessment
- course_term(id, school_id, name, start_date, end_date)
- lesson(id, class_group_id, title, content_url, term_id, planned_at, owner_staff_id)
- assignment(id, class_group_id, title, instructions, open_at, due_at, points, submission_type, created_by, status)
- assignment_submission(id, assignment_id, student_id, submitted_at, file_refs, text_response, status, gradebook_entry_id)
- outcome(id, code, descriptor, standards_domain, level)
- markbook_entry(id, assignment_id, student_id, marks, outcome_id, reviewed_by, graded_at, feedback)
- moderation_batch(id, markbook_entry_id, workflow_state, reviewer_id, notes)
- report_card_template(id, school_id, name, grading_model, config_json)

### Wellbeing and Health
- wellbeing_plan(id, student_id, plan_type, risk_level, created_by, status, effective_from, effective_to)
- support_case(id, student_id, category, urgency, action_required_by, owner_staff_id, status)
- health_event(id, tenant_id, student_id, care_type, details, confidentiality_level, notified_parents, created_by)

### Finance and Services
- fee_structure(id, school_id, type, frequency, default_terms)
- invoice(id, school_id, household_id, payer_person_id, amount, currency, due_date, status, external_reference)
- payment(id, invoice_id, transaction_ref, provider, paid_at, method, status, settlement_batch)
- financial_event(id, tenant_id, invoice_id, payment_id, event_type, amount_delta, currency, event_ts, actor_id, notes)

### Communications and Workflow
- notice(id, school_id, audience_scope, subject, body, published_at, expires_at)
- message(id, sender_id, recipient_type, recipient_id, thread_ref, content, channel, sent_at, status)
- notification_policy(id, event_type, audience_filter, template_ref, channel_list, tenant_override)
- form(id, tenant_id, name, version, schema_json, visibility_rules_json, is_active)
- form_response(id, form_id, entity_type, entity_id, submitted_by, payload_json, status, submitted_at)
- workflow_definition(id, name, trigger, actions_json, owner_module, status)
- workflow_execution(id, workflow_definition_id, entity_type, entity_id, state, started_at, completed_at, failure_code)

### Integration and Auth
- integration_token(id, tenant_id, integration_name, connector_key, key_fingerprint, secret_state, rotates_at, revoked_at)
- oauth_client(id, tenant_id, client_name, client_id, client_secret_rotating_version, allowed_scopes, callback_uris, created_at, last_rotated_at, status)
- oauth_client_secret(id, oauth_client_id, secret_hash, rotated_at, expires_at, status)

### Compliance and Audit
- consent(id, person_id, consent_type, scope, granted, granted_at, withdrawn_at, granted_by)
- audit_event(id, tenant_id, actor_id, actor_type, action, resource_type, resource_id, timestamp, diff_json, immutable_hash, chain_prev_hash)
- retention_policy(id, tenant_id, resource_type, retention_days, legal_hold_required, legal_basis)

### Document and Attachment (Cross-Domain)
- document(id, tenant_id, owner_person_id, domain, entity_type, entity_id, external_reference, classification, created_by, created_at, updated_at, deleted_at)
- document_version(id, document_id, version_no, storage_key, filename, mime_type, content_hash, size_bytes, created_by, created_at, created_from_event)
- document_scan(id, document_version_id, scanner_vendor, status, result_code, scanned_at, scan_metadata_json)
- document_retention_state(id, document_id, tenant_id, retention_bucket, legal_hold_active, quarantined, expires_at, purge_approved_by, archive_ref)

## Core Entity Relationships
- tenant 1..* school 1..* campus
- tenant 1..* person
- person 1..1 staff/student/carer via subtype refs
- person 1..* person_household *..1 household
- household *..* person through person_household
- student 1..* admissions_application *..1 school/year
- student 1..* enrolment
- enrolment 1..* enrolment_state_history
- student 1..* attendance_event
- class_group 1..* timetable_slot
- class_group 1..* assignment
- assignment_submission 0..1 markbook_entry
- document 0..* document_version and 1..* document_scan/document_retention_state
- student/parent/support_case/health_event/wellbeing_plan consume consent + audit boundaries

## Invariants
- Every person, enrolment, attendance, wellbeing, finance, communication, and document mutation writes audit_event with immutable hash link.
- Tenant boundaries must always be explicit and verified in write/read filters.
- Document/version immutability: updates create new version rows instead of mutating prior payload.
- A `document_scan` status of `blocked` or `quarantine` prevents use in regulated workflows until cleared.
- API credentials require secret lifecycle state transitions, never deleted in-place.



