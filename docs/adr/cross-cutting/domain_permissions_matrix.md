# ADR-036: Domain Permissions Matrix

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [domain_permissions_matrix.md](domain_permissions_matrix.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# Domain Permissions Matrix (Draft)

## Purpose

Define default role permissions before implementation so security, consent, and audit behavior can be validated in design and tests.

## Roles

- `system_admin`
- `school_admin`
- `principal`
- `teacher`
- `student`
- `parent_carer`
- `hr_staff`
- `finance_staff`
- `support_staff`
- `guest_auditor` (read-only, limited)

## Permission Levels

- `none` - denied
- `read` - view only
- `write` - create/update
- `manage` - full lifecycle + delete in policy
- `audit` - can view audit/event details

## Matrix (Initial Draft)

| Domain | system_admin | school_admin | principal | teacher | student | parent_carer | hr_staff | finance_staff | support_staff | guest_auditor |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity.tenancy | manage | none | none | none | none | none | none | none | none | none |
| identity.people | manage | manage | read | read | read(own) | read(own_child) | read | read | read | read |
| identity.permissions | manage | manage | read | read | none | none | none | none | none | none |
| household.family_links | manage | manage | read | read | read(own/linked) | read(own_family) | read | none | read | read |
| enrolment.records | manage | manage | read | read(own) | read(own_school) | read(own_child) | read | none | read | read |
| timetable | manage | manage | write | write | read(own) | read(own_child) | read | none | write | read |
| attendance | manage | manage | write | write(class) | read(own) | read(own_child) | read | none | write | none |
| learning.classes | manage | manage | write | write | read(own) | read(own_child) | read | none | read | read |
| learning.assignments | manage | manage | write | write | write(self) | read(own_child) | read | none | read | read |
| learning.marks | manage | manage | write | write(owned) | read(own) | read(own_child) | none | none | read | none |
| wellbeing | manage | manage | write | write | read(own) | read(own_child) | none | none | read | none |
| events | manage | manage | write | write | read(own) | read(own_child) | read | read | read | none |
| finance.billing | none | manage | manage | none | none | read(own_child) | none | write | none | none |
| finance.payments | none | manage | manage | none | none | read(own_child) | none | write | none | none |
| hr.staff_profile | none | read | read | read | none | none | manage | none | read | none |
| workflows | manage | manage | manage | write | write(own submissions) | write(own) | manage | write | write | none |
| audit | audit | audit | audit | audit(limited) | audit(own activity) | audit(own activity) | audit(limited) | audit(limited) | audit(limited) | audit |

## Rules

- Any `read` or above on sensitive domains (wellbeing/health/incident/discipline/audit) must pass consent and custody constraints.
- `student` and `parent_carer` access for learning/attendance/communications should be scoped by household links and active enrolment.
- Deletions in sensitive domains should be disabled by default; use logical close + immutable event.

## Missing Decisions

- Whether `school_admin` and `finance_staff` can jointly override consent checks in specific emergency workflows.
- Whether `guest_auditor` is external and requires temporary session constraints.
- Whether `hr_staff` can ever access teaching performance and wellbeing artifacts (default: no).

## Required Output

- Convert this matrix into policy files used by API and UI guards.
- Add per-endpoint tests for denied access with explicit error codes.







